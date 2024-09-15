import { CheckingAccount } from '@prisma/client'
import { AppError } from '../../../../errors/AppError'
import { prisma } from '../../../../prisma/client'
import { CheckingAccountDTO } from '../../dtos/CheckingAccountDTO'

export class CreateCheckingAccountUseCase {
  async execute({
    userId,
    name,
    account,
    agency,
    bank,
    balance,
    maintenanceFee,
  }: CheckingAccountDTO): Promise<CheckingAccount> {
    const userIdExists = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })

    if (!userIdExists) {
      throw new AppError('User not found')
    }

    const checkingAccountNameExists = await prisma.checkingAccount.findFirst({
      where: {
        userId,
        name,
      },
    })

    if (checkingAccountNameExists) {
      throw new AppError('Checking account name already exists')
    }

    const checkingAccount = await prisma.checkingAccount.create({
      data: {
        userId,
        name,
        account,
        agency,
        bank,
        balance,
        maintenanceFee,
      },
    })

    return checkingAccount
  }
}
