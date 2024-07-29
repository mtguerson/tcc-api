import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";

export class ListAllTransactionsByUserIdUseCase {
  async execute({ userId }: { userId: string }) {
    if (!userId) throw new AppError("User id is required", 400);

    const transactions = await prisma.transaction.findMany({
      where: {
        checkingAccounts: {
          userId,
        },
      },
      include: {
        checkingAccounts: true,
        categories: true,
        creditCards: true,
      },
    });
    if (!transactions.length) {
      throw new AppError("Not found!", 404);
    }

    return transactions;
  }
}
