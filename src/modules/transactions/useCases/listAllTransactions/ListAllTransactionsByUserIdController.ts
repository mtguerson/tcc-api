import { Request, Response } from 'express'
import { ListAllTransactionsByUserIdUseCase } from './ListAllTransactionsByUserIdUseCase'
import { VerifyToken } from '../../../../middlewares/auth'
import { TransactionListQueryParameters } from '../../dtos/TransactionListQueryParameters'

export class ListAllTransactionsByUserIdController {
  async handle(req: Request, res: Response) {
    const user = await VerifyToken.handleFoundUser(req)
    const queryParams: TransactionListQueryParameters = req.query

    if (!user?.userId) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const listAllTransactionsByUserIdUseCase =
      new ListAllTransactionsByUserIdUseCase()

    const result = await listAllTransactionsByUserIdUseCase.execute({
      userId: user?.userId,
      query: queryParams,
    })

    return res.status(200).json(result)
  }
}
