import { Request, Response } from 'express'
import { GetCategoryByUserIdUseCase } from './GetCategoryByUserIdUseCase'
import { VerifyToken } from '../../../../middlewares/auth'

export class GetCategoryByUserIdController {
  async handle(req: Request, res: Response) {
    const user = await VerifyToken.handleFoundUser(req)

    if (!user) return res.status(401).json({ message: 'Unauthorized' })

    const getCategoryByUserIdUseCase = new GetCategoryByUserIdUseCase()

    const result = await getCategoryByUserIdUseCase.execute({
      userId: user?.userId,
    })

    return res.status(200).json(result)
  }
}
