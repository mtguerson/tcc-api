import { CheckingAccount, CreditCard, Transaction } from "@prisma/client";
import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";
import { TransactionDTO } from "../../dtos/TransactionDTO";
import Decimal from "decimal.js";

export class CreateTransactionUseCase {
  async execute({
    name,
    date,
    value,
    balanceAdjustment,
    type,
    creditCardId,
    categoryId,
    checkingAccountId,
  }: TransactionDTO): Promise<Transaction> {
    let checkingAccount: CheckingAccount | null;
    let creditCard: CreditCard | null;
    if (checkingAccountId) {
      checkingAccount = await prisma.checkingAccount.findUnique({
        where: {
          id: checkingAccountId,
        },
      });

      if (!checkingAccount) {
        throw new AppError("Checking account not found", 404);
      }
    }
    //only validate if the credit card exists if it was passed
    if (creditCardId) {
      creditCard = await prisma.creditCard.findUnique({
        where: {
          id: creditCardId,
        },
      });

      if (!creditCard) {
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

    if (!checkingAccountId && !creditCardId) {
      throw new AppError(
        "You must provide a checking account or credit card",
        400
      );
    }

    if (checkingAccountId && creditCardId) {
      throw new AppError(
        "You must provide only a checking account or credit card",
        400
      );
    }

    const transaction = await prisma.$transaction(async (prisma) => {
      const transactionValueCheckingAccount =
        type === "INCOME" ? value : value * -1;
      const transactionValueCreditCard = type === "INCOME" ? value * -1 : value;

      const transaction = await prisma.transaction.create({
        data: {
          name,
          date,
          value,
          balanceAdjustment,
          type,
          checkingAccountId,
          creditCardId,
          categoryId,
        },
      });

      if (checkingAccountId && checkingAccount) {
        const newCheckingAccountBalance =
          checkingAccount.balance + transactionValueCheckingAccount;
        await prisma.checkingAccount.update({
          where: {
            id: checkingAccountId,
          },
          data: {
            balance: newCheckingAccountBalance,
          },
        });
      }

      if (creditCardId && creditCard) {
        const newCreditCardBalance =
          creditCard.invoice + transactionValueCreditCard;
        await prisma.creditCard.update({
          where: {
            id: creditCardId,
          },
          data: {
            invoice: newCreditCardBalance,
          },
        });
      }

      return transaction;
    });

    return transaction;
  }
}
