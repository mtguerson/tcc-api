import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";

export class DeleteCreditCardByIdUseCase {
  async execute(id: string): Promise<void> {
    const creditCardExists = await prisma.creditCard.findUnique({
      where: {
        id
      }
    });

    if (!creditCardExists) {
      throw new AppError('Credit card not found');
    }

    await prisma.creditCard.delete({
      where: {
        id
      }
    });
  }
}