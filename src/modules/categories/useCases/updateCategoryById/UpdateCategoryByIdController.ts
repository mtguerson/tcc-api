import { Request, Response } from 'express'
import { UpdateCategoryByIdUseCase } from './UpdateCategoryByIdUseCase'

export class UpdateCategoryByIdController {
  async handle(req: Request, res: Response) {
    const { id } = req.params
    const { userId, name } = req.body

    const updateCategoryByIdUseCase = new UpdateCategoryByIdUseCase()

    const result = await updateCategoryByIdUseCase.execute({
      userId,
      id,
      name,
    })

    return res.status(200).json(result)
  }
}
