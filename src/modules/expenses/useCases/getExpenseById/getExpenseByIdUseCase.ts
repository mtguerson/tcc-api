import { Expense } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { AppError } from "../../../../errors/AppError";

export class GetExpenseByIdUseCase {
  async execute({ id }: { id: string }): Promise<Expense[]> {
    const expense = await prisma.expense.findMany({
      where: {
        id,
      },
    });

    if (expense.length === 0) {
      throw new AppError("Not found!", 404);
    }

    return expense;
  }
}
