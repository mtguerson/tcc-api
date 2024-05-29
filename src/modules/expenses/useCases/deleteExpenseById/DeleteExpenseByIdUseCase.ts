import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";

export class DeleteExpenseByIdUseCase {
  async execute(id: string): Promise<void> {
    const expenseExists = await prisma.expense.findUnique({
      where: {
        id
      }
    });

    if (!expenseExists) {
      throw new AppError('Expense not found');
    }

    await prisma.expense.delete({
      where: {
        id
      }
    });
  }
}