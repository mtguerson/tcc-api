import { CreditCard } from '@prisma/client'
import { prisma } from '../../../../prisma/client'

export class GetCreditCardByUserIdUseCase {
  async execute({ userId }: { userId: string }): Promise<CreditCard[]> {
    const creditCard = await prisma.creditCard.findMany({
      where: {
        userId,
      },
    })

    return creditCard
  }
}
