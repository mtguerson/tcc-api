import { Request, Response } from 'express'
import { DeleteTransactionByIdUseCase } from './DeleteTransactionByIdUseCase'

export class DeleteTransactionByIdController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    const deleteTransactionByIdUseCase = new DeleteTransactionByIdUseCase()

    const result = await deleteTransactionByIdUseCase.execute(id)

    return res.status(200).json(result)
  }
}
