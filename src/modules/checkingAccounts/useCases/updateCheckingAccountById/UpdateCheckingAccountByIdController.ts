import { Request, Response } from 'express'
import { UpdateCheckingAccountByIdUseCase } from './UpdateCheckingAccountByIdUseCase'

export class UpdateCheckingAccountByIdController {
  async handle(req: Request, res: Response) {
    const { id } = req.params
    const { userId, name, account, agency, bank, balance, maintenanceFee } =
      req.body

    const updateCheckingAccountByIdUseCase =
      new UpdateCheckingAccountByIdUseCase()

    const result = await updateCheckingAccountByIdUseCase.execute({
      userId,
      id,
      name,
      account,
      agency,
      bank,
      balance,
      maintenanceFee,
    })

    return res.status(200).json(result)
  }
}
