import { Request, Response } from 'express'
import getProcessRunningUseCase from './getProcessRunningUseCase'

class GetProcessRunningController {
  async handle(req: Request, res: Response) {
    const processes = await getProcessRunningUseCase.execute()

    return res.status(200).json(processes)
  }
}

export default new GetProcessRunningController()
