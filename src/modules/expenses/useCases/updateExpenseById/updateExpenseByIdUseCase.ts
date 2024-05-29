import { Expense } from "@prisma/client";
import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";
import { ExpenseDTO } from "../../dtos/ExpenseDTO";

export class UpdateExpenseByIdUseCase {
  async execute({ id, name, date, value, creditCardId, categoryId }: ExpenseDTO): Promise<Expense> {
    const expenseExists = await prisma.expense.findUnique({
      where: {
        id
      }
    });

    if (!expenseExists) {
      throw new AppError('Expense not found');
    }
    const expenseUpdated = await prisma.expense.update({
      where: {
        id
      },
      data: {
        name,
        date,
        value,
        creditCardId,
        categoryId
      }
    });

    return expenseUpdated;
  }
}