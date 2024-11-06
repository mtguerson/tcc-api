import { AppError } from '../../../../errors/AppError'
import { prisma } from '../../../../prisma/client'
import processChildService from '../../../../services/process.child.service'
import jwt from 'jsonwebtoken'
import { jwtInfo } from '../../../../types/jwtInfo'
class StartChatBotUseCase {
  async execute(userId: string) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })

    if (!user) {
      throw new AppError('User not found')
    }

    if (!user.token || !user.username) {
      throw new AppError('User does not have a token or username')
    }

    if (processChildService.isProcessRunningByToken(user.token)) {
      throw new AppError('Chatbot is already running', 400)
    }

    const jwtUserInfo: jwtInfo = {
      userId: user.id,
      email: user.email,
      name: user.name,
      username: user.username,
      isAdmin: user.isAdmin,
    }

    const token = jwt.sign(jwtUserInfo, `${process.env.JWT_SECRET}`, {
      expiresIn: '1d',
    })

    processChildService.startNewProcess(user.token, user.username, token)
  }
}

export default new StartChatBotUseCase()
