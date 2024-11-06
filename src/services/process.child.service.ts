import { spawn, ChildProcessWithoutNullStreams } from 'child_process'
import { AppError } from '../errors/AppError'
import path from 'path'
import pidusage from 'pidusage'
import { cpu, mem } from 'node-os-utils'

type ProcessChildInfo = {
  child: ChildProcessWithoutNullStreams
  telegramToken: string
  username: string
}

class ProcessChildService {
  // Mapa para armazenar os processos filhos com seus tokens
  private processes: Map<string, ProcessChildInfo> = new Map()

  public async startNewProcess(
    telegramToken: string,
    username: string,
    userToken: string,
  ) {
    // Verifica se já existe um processo para este token
    if (this.processes.has(telegramToken)) {
      throw new AppError('Chatobt is already running', 400)
    }

    // Inicia um novo processo filho
    const child = spawn(
      'node',
      [
        path.join(__dirname, '../chatbot/index.js'),
        telegramToken,
        username,
        userToken,
      ],
      {
        detached: true,
      },
    )

    // Armazena o processo no mapa
    this.processes.set(telegramToken, {
      child,
      telegramToken,
      username,
    })

    // Ouvir a saída padrão do processo filho
    child.stdout.on('data', (data) => {
      console.log(`(${telegramToken}): ${data}`)
    })

    // Captura erros no processo filho (stderr)
    child.stderr.on('error', (data) => {
      console.error(`(${telegramToken}): ${data}`)
    })

    // Ouvir o evento de saída do processo filho
    child.on('exit', () => {
      console.log(`Processo com token ${telegramToken} finalizado`)
      this.processes.delete(telegramToken)
    })

    // Desanexar o processo filho
    child.unref()
  }

  private isProcessRunning(childPid: number) {
    try {
      // Tenta enviar um sinal 0 para verificar se o processo está rodando
      process.kill(childPid, 0)
      return true
    } catch {
      return false
    }
  }

  public killAllProcesses() {
    this.processes.forEach((child, telegramToken) => {
      if (child.child.pid && this.isProcessRunning(child.child.pid)) {
        process.kill(-child.child.pid) // Finaliza o processo filho pelo grupo de processos
        console.log(`Processo com token ${telegramToken} finalizado`)
      }
    })
    this.processes.clear() // Limpa a lista de processos
  }

  public isProcessRunningByToken(telegramToken?: string) {
    if (!telegramToken) return false

    const child = this.processes.get(telegramToken)

    if (!child?.child.pid) return false

    return this.isProcessRunning(child?.child.pid)
  }

  public killProcessByToken(telegramToken: string) {
    const child = this.processes.get(telegramToken)

    if (!child) return

    if (child?.child.pid && this.isProcessRunning(child?.child.pid)) {
      process.kill(-child?.child.pid) // Finaliza o processo filho pelo grupo de processos
      console.log(`Processo com token ${telegramToken} finalizado`)
    }

    this.processes.delete(telegramToken)
  }

  public getProcesses() {
    return Array.from(this.processes.values())
  }

  public async getProcessUsageByToken(telegramToken: string) {
    const child = this.processes.get(telegramToken)

    if (!child?.child.pid) {
      throw new AppError('Process not found', 404)
    }

    try {
      const stats = await pidusage(child.child.pid)
      return {
        ...stats,
        username: child.username,
        telegramToken: child.telegramToken,
      } // stats contém uso de CPU, memória, tempo de execução, etc.
    } catch (error) {
      throw new AppError('Failed to get process stats', 500)
    }
  }

  public async getGlobalProcessUsage() {
    const cpuUsage = await cpu.usage()
    const memoryUsage = await mem.info()

    return {
      totalProcesses: this.processes.size,
      cpu: cpuUsage,
      memory: memoryUsage,
    }
  }
}

// Instância única da classe de serviço
const processChildService = new ProcessChildService()

// Captura sinais de término para finalizar todos os processos filhos
process.on('SIGINT', () => {
  processChildService.killAllProcesses()
  process.exit()
})

process.on('SIGTERM', () => {
  processChildService.killAllProcesses()
  process.exit()
})

export default processChildService
