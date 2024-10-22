import { Request, Response } from 'express'
import checkProcessUseCase from './checkProcessUseCase'
import { VerifyToken } from '../../../../middlewares/auth'

class CheckProcessController {
  async handle(req: Request, res: Response) {
    const user = await VerifyToken.handleFoundUser(req)

    if (!user?.userId) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const isActive = await checkProcessUseCase.execute(user.userId)

    return res.status(200).json(isActive)
  }
}

export default new CheckProcessController()
