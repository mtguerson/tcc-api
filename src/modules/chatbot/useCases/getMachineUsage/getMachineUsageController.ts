import { Request, Response } from 'express'
import getMachineUsageUseCase from './getMachineUsageUseCase'

class GetMachineUsageController {
  async handle(_: Request, res: Response) {
    const globalUsage = await getMachineUsageUseCase.execute()

    return res.status(200).json(globalUsage)
  }
}

export default new GetMachineUsageController()
