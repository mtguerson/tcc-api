import { Expense } from "@prisma/client";
import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";
import { ExpenseDTO } from "../../dtos/ExpenseDTO";
import Decimal from "decimal.js";

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

    const checkingAccount = await prisma.checkingAccount.findUnique({
      where: {
        id: checkingAccountId,
      },
    });

    if (!checkingAccount) {
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

    // Convert checkingAccount.balance and value to Decimal and update the balance
    const updatedBalance = new Decimal(checkingAccount.balance).minus(new Decimal(value));
    if (updatedBalance.isNegative()) {
      throw new AppError("Insufficient funds in the checking account", 400);
    }

    await prisma.checkingAccount.update({
      where: {
        id: checkingAccountId,
      },
      data: {
        balance: updatedBalance,
      },
    });

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
