import processChildService from '../../../../services/process.child.service'

class GetMachineUsageUseCase {
  async execute() {
    return await processChildService.getGlobalProcessUsage()
  }
}

export default new GetMachineUsageUseCase()
