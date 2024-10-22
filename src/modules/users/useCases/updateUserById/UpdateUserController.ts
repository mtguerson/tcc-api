import { Request, Response } from 'express'
import { UpdateUserUseCase } from './UpdateUserUseCase'
import { VerifyToken } from '../../../../middlewares/auth'

export class UpdateUserController {
  async handle(req: Request, res: Response) {
    const { name, email, password, phone, username, token } = req.body
    const user = await VerifyToken.handleFoundUser(req)

    if (!user?.userId) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const updateUserUseCase = new UpdateUserUseCase()

    const result = await updateUserUseCase.execute(user?.userId, {
      name,
      username,
      email,
      password,
      phone,
      token,
    })

    return res.status(200).json(result)
  }
}
