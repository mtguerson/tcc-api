import { AppError } from '../../../../errors/AppError'
import { prisma } from '../../../../prisma/client'
import processChildService from '../../../../services/process.child.service'

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

    processChildService.startNewProcess(user.token, user.username)
  }
}

export default new StartChatBotUseCase()
