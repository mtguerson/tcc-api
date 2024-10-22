import processChildService from '../../../../services/process.child.service'

class KillProcessByTokenUseCase {
  async execute(token: string) {
    processChildService.killProcessByToken(token)
  }
}

export default new KillProcessByTokenUseCase()
