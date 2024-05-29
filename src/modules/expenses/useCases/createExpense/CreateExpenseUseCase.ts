import { Expense } from "@prisma/client";
import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";
import { ExpenseDTO } from "../../dtos/ExpenseDTO";

export class CreateExpenseUseCase {
  async execute({ name, date, value, creditCardId, categoryId }: ExpenseDTO): Promise<Expense> {
    const creditCardExists = await prisma.creditCard.findUnique({
      where: {
        id: creditCardId,
      },
    });

    if (!creditCardExists) {
      throw new AppError('Credit card not found', 404);
    }

    const categoryExists = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });

    if (!categoryExists) {
      throw new AppError('Category not found', 404);
    }

    const expense = await prisma.expense.create({
      data: {
        name,
        date,
        value,
        creditCardId,
        categoryId,
      },
    });

    return expense;
  }
}
