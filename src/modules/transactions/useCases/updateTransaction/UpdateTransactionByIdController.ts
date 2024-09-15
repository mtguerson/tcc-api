import { Request, Response } from 'express'
import { UpdateTransactionByIdUseCase } from './UpdateTransactionByIdUseCase'

export class UpdateTransactionByIdController {
  async handle(req: Request, res: Response) {
    const { id } = req.params
    const {
      name,
      date,
      balanceAdjustment,
      value,
      type,
      creditCardId,
      categoryId,
      checkingAccountId,
    } = req.body

    const updateTransactionByIdUseCase = new UpdateTransactionByIdUseCase()

    const result = await updateTransactionByIdUseCase.execute({
      id,
      name,
      balanceAdjustment,
      type,
      date,
      value,
      checkingAccountId,
      creditCardId,
      categoryId,
    })

    return res.status(200).json(result)
  }
}
