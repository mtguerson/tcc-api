import { Transaction } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { AppError } from "../../../../errors/AppError";

export class GetTransactionByIdUseCase {
  async execute({ id }: { id: string }): Promise<Transaction[]> {
    const transaction = await prisma.transaction.findMany({
      where: {
        id,
      },
    });

    if (transaction.length === 0) {
      throw new AppError("Not found!", 404);
    }

    return transaction;
  }
}
