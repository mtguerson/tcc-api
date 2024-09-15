import { Request, Response } from 'express'
import { GetCheckingAccountByUserIdUseCase } from './GetCheckingAccountByUserIdUseCase'
import { VerifyToken } from '../../../../middlewares/auth'

export class GetCheckingAccountByUserIdController {
  async handle(req: Request, res: Response) {
    const user = await VerifyToken.handleFoundUser(req)

    if (!user) return res.status(401).json({ message: 'Unauthorized' })

    const getCheckingAccountByUserIdUseCase =
      new GetCheckingAccountByUserIdUseCase()

    const result = await getCheckingAccountByUserIdUseCase.execute({
      userId: user?.userId,
    })

    return res.status(200).json(result)
  }
}
