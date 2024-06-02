import { Expense } from "@prisma/client";
import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";
import { ExpenseDTO } from "../../dtos/ExpenseDTO";

export class CreateExpenseUseCase {
  async execute({
    name,
    date,
    value,
    creditCardId,
    categoryId,
    checkingAccountId,
  }: ExpenseDTO): Promise<Expense> {
    if (!checkingAccountId)
      throw new AppError("Checking account id is required", 400);

    const checkingAccountExists = await prisma.checkingAccount.findUnique({
      where: {
        id: checkingAccountId,
      },
    });

    if (!checkingAccountExists) {
      throw new AppError("Checking account not found", 404);
    }

    //only validate if the credit card exists if it was passed
    if (creditCardId) {
      const creditCardExists = await prisma.creditCard.findUnique({
        where: {
          id: creditCardId,
        },
      });

      if (!creditCardExists) {
        throw new AppError("Credit card not found", 404);
      }
    }

    //only validate if the category exists if it was passed
    if (categoryId) {
      const categoryExists = await prisma.category.findUnique({
        where: {
          id: categoryId,
        },
      });

      if (!categoryExists) {
        throw new AppError("Category not found", 404);
      }
    }

    const expense = await prisma.expense.create({
      data: {
        checkingAccountId,
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
