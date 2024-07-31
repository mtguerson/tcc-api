import { CreditCard } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { AppError } from "../../../../errors/AppError";

export class GetCreditCardByUserIdUseCase {
  async execute({ userId }: { userId: string }): Promise<CreditCard[]> {
    const creditCard = await prisma.creditCard.findMany({
      where: {
        userId,
      },
    });

    return creditCard;
  }
}
