import { Request, Response } from 'express'
import { VerifyToken } from '../../../../middlewares/auth'
import endChatBotUseCase from './endChatBotUseCase'

class EndChatBotController {
  async handle(req: Request, res: Response) {
    const user = await VerifyToken.handleFoundUser(req)

    if (!user?.userId) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    await endChatBotUseCase.execute(user.userId)

    return res.status(200).json({ message: 'Chatbot ended' })
  }
}

export default new EndChatBotController()
