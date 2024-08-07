import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";

export class DeleteTransactionByIdUseCase {
  async execute(id: string): Promise<void> {
    const transactionExists = await prisma.transaction.findUnique({
      where: {
        id,
      },
    });

    if (!transactionExists) {
      throw new AppError("Transaction not found");
    }

    await prisma.transaction.delete({
      where: {
        id,
      },
    });
  }
}
