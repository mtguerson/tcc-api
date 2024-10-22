import { Request, Response } from 'express'
import killProcessByTokenUseCase from './killProcessByTokenUseCase'

class KillProcessByTokenController {
  async handle(req: Request, res: Response) {
    const { token } = req.params

    await killProcessByTokenUseCase.execute(token)

    return res.status(200).json({ message: 'Process killed' })
  }
}

export default new KillProcessByTokenController()
