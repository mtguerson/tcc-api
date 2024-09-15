import { Request, Response } from 'express'
import { GetCreditCardByUserIdUseCase } from './GetCreditCardByUserIdUseCase'
import { VerifyToken } from '../../../../middlewares/auth'

export class GetCreditCardByUserIdController {
  async handle(req: Request, res: Response) {
    const user = await VerifyToken.handleFoundUser(req)

    if (!user) return res.status(401).json({ message: 'Unauthorized' })

    const getCreditCardByUserIdUseCase = new GetCreditCardByUserIdUseCase()

    const result = await getCreditCardByUserIdUseCase.execute({
      userId: user?.userId,
    })

    return res.status(200).json(result)
  }
}
