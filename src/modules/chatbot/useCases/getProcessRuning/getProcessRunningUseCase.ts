import processChildService from '../../../../services/process.child.service'

class GetProcessRunningUseCase {
  async execute() {
    return processChildService.getProcesses()
  }
}

export default new GetProcessRunningUseCase()
