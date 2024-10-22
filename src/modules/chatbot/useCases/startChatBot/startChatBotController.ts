import { Request, Response } from 'express'
import { VerifyToken } from '../../../../middlewares/auth'
import startChatBotUseCase from './startChatBotUseCase'

class StartChatBotController {
  async handle(req: Request, res: Response) {
    const user = await VerifyToken.handleFoundUser(req)

    if (!user?.userId) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    await startChatBotUseCase.execute(user.userId)

    return res.status(200).json({ message: 'Chatbot started' })
  }
}

export default new StartChatBotController()
