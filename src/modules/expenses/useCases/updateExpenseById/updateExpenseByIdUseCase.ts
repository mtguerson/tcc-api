import { Expense } from "@prisma/client";
import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";
import { ExpenseDTO } from "../../dtos/ExpenseDTO";

export class UpdateExpenseByIdUseCase {
  async execute({
    id,
    name,
    date,
    value,
    creditCardId,
    categoryId,
    checkingAccountId,
  }: ExpenseDTO): Promise<Expense> {
    const expenseExists = await prisma.expense.findUnique({
      where: {
        id,
      },
    });

    if (!expenseExists) {
      throw new AppError("Expense not found");
    }

    const checkingAccount = await prisma.checkingAccount.findUnique({
      where: {
        id: checkingAccountId,
      },
    });

    if (!checkingAccount) {
      throw new AppError("Checking account not found", 404);
    }

    const expenseUpdated = await prisma.expense.update({
      where: {
        id,
      },
      data: {
        name,
        date,
        value,
        creditCardId,
        categoryId,
        checkingAccountId,
      },
    });

    return expenseUpdated;
  }
}
