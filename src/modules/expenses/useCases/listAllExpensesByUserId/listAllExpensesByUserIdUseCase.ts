import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";

export class ListAllExpensesByUserIdUseCase {
  async execute({ userId }: { userId: string }) {
    if (!userId) throw new AppError("User id is required", 400);

    const expenses = await prisma.expense.findMany({
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
    if (!expenses.length) {
      throw new AppError("Not found!", 404);
    }

    return expenses;
  }
}
