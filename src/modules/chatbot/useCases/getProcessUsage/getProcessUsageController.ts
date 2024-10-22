import { Request, Response } from 'express'
import getProcessUsageUseCase from './getProcessUsageUseCase'

class GetProcessUsageController {
  async handle(req: Request, res: Response) {
    const { token } = req.params

    const usageInfo = await getProcessUsageUseCase.execute(token)

    return res.status(200).json(usageInfo)
  }
}

export default new GetProcessUsageController()
