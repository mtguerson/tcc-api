import { CreditCard } from "@prisma/client";
import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";
import { CreditCardDTO } from "../../dtos/CreditCardDTO";

export class CreateCreditCardUseCase {
  async execute({
    userId,
    name,
    lastDigits,
    limit,
    closingDate,
    invoice,
  }: CreditCardDTO): Promise<CreditCard> {
    const userIdExists = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!userIdExists) {
      throw new AppError("User not found");
    }

    const creditCardNameExists = await prisma.creditCard.findFirst({
      where: {
        userId,
        name,
      },
    });

    if (creditCardNameExists) {
      throw new AppError("Credit card name already exists");
    }

    const creditCardLastDigitsExists = await prisma.creditCard.findFirst({
      where: {
        userId,
        lastDigits,
      },
    });

    if (creditCardLastDigitsExists) {
      throw new AppError("Credit card already registered");
    }

    const creditCard = await prisma.creditCard.create({
      data: {
        userId,
        name,
        closingDate,
        invoice,
        lastDigits,
        limit,
      },
    });

    return creditCard;
  }
}
