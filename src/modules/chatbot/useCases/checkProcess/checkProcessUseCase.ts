import { AppError } from '../../../../errors/AppError'
import { prisma } from '../../../../prisma/client'
import processChildService from '../../../../services/process.child.service'

class CheckProcessUseCase {
  async execute(userId: string) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })

    if (!user) {
      throw new AppError('User not found')
    }

    return processChildService.isProcessRunningByToken(user.token as string)
  }
}

export default new CheckProcessUseCase()
