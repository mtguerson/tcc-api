import processChildService from '../../../../services/process.child.service'

class GetProcessUsageUseCase {
  async execute(telegramToken: string) {
    return await processChildService.getProcessUsageByToken(telegramToken)
  }
}

export default new GetProcessUsageUseCase()
