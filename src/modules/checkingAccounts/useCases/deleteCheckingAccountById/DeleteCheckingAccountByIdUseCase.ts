import { AppError } from '../../../../errors/AppError'
import { prisma } from '../../../../prisma/client'

export class DeleteCheckingAccountByIdUseCase {
  async execute(id: string): Promise<void> {
    const CheckingAccountExists = await prisma.checkingAccount.findUnique({
      where: {
        id,
      },
    })

    if (!CheckingAccountExists) {
      throw new AppError('CheckingAccount not found')
    }

    await prisma.checkingAccount.delete({
      where: {
        id,
      },
    })
  }
}
