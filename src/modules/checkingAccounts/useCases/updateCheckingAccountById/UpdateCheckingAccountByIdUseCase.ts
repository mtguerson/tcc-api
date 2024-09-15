import { CheckingAccount } from '@prisma/client'
import { AppError } from '../../../../errors/AppError'
import { prisma } from '../../../../prisma/client'
import { CheckingAccountDTO } from '../../dtos/CheckingAccountDTO'

export class UpdateCheckingAccountByIdUseCase {
  async execute({
    userId,
    id,
    name,
    account,
    agency,
    bank,
    balance,
    maintenanceFee,
  }: CheckingAccountDTO): Promise<CheckingAccount> {
    const checkingAccountExists = await prisma.checkingAccount.findUnique({
      where: {
        id,
      },
    })

    if (!checkingAccountExists) {
      throw new AppError('Checking Account not found')
    }

    if (checkingAccountExists.name !== name) {
      const accountNameExists = await prisma.checkingAccount.findFirst({
        where: {
          userId,
          name,
          NOT: {
            id,
          },
        },
      })

      if (accountNameExists) {
        throw new AppError(
          'Another account with this name already exists for this user',
        )
      }
    }

    const checkingAccountUpdated = await prisma.checkingAccount.update({
      where: {
        id,
      },
      data: {
        name,
        account,
        agency,
        bank,
        balance,
        maintenanceFee,
      },
    })

    if (checkingAccountExists.balance !== balance) {
      const isIncome = checkingAccountExists.balance < balance

      const difference = Math.abs(checkingAccountExists.balance - balance)

      await prisma.transaction.create({
        data: {
          type: isIncome ? 'INCOME' : 'OUTCOME',
          name: 'Atualização do saldo da conta corrente',
          value: difference,
          checkingAccountId: checkingAccountUpdated.id,
          balanceAdjustment: true,
        },
      })
    }

    return checkingAccountUpdated
  }
}
