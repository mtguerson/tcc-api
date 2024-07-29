import { CreditCard } from "@prisma/client";
import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";
import { CreditCardDTO } from "../../dtos/CreditCardDTO";

export class UpdateCreditCardByIdUseCase {
  async execute({ userId, id, closingDate, invoice, lastDigits, limit, name }: CreditCardDTO): Promise<CreditCard> {
    const creditCardExists = await prisma.creditCard.findUnique({
      where: {
        id
      }
    });

    if (!creditCardExists) {
      throw new AppError('Checking Account not found');
    }

    if (creditCardExists.name !== name) {
      const creditCardNameExists = await prisma.creditCard.findFirst({
        where: {
          userId,
          name,
          NOT: {
            id
          }
        }
      });

      if (creditCardNameExists) {
        throw new AppError('Another account with this name already exists for this user');
      }
    }

    const creditCardUpdated = await prisma.creditCard.update({
      where: {
        id
      },
      data: {
        name,
        closingDate,
        invoice,
        lastDigits,
        limit,
      }
    });

    return creditCardUpdated;
  }
}