import { Request, Response } from 'express'
import { CreateCategoryUseCase } from './CreateCategoryUseCase'
import { VerifyToken } from '../../../../middlewares/auth'

export class CreateCategoryController {
  async handle(req: Request, res: Response) {
    const { name } = req.body

    const user = await VerifyToken.handleFoundUser(req)

    if (!user?.userId) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const createCategoryUseCase = new CreateCategoryUseCase()

    const result = await createCategoryUseCase.execute({
      userId: user.userId,
      name,
    })

    return res.status(201).json(result)
  }
}
