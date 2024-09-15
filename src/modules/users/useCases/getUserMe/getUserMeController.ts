import { Request, Response } from 'express'
import { GetUserMeUseCase } from './getUserMeUseCase'
import { VerifyToken } from '../../../../middlewares/auth'

export class GetUserMeController {
  async handle(req: Request, res: Response) {
    const loginUserUseCase = new GetUserMeUseCase()
    const userId = await VerifyToken.handleFoundUser(req)

    if (!userId) return res.status(401).json({ message: 'Unauthorized' })

    const result = await loginUserUseCase.execute(userId?.userId)

    return res.status(200).json(result)
  }
}
