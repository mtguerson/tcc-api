import { Transaction } from "@prisma/client";
import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";
import { TransactionDTO } from "../../dtos/TransactionDTO";

export class UpdateTransactionByIdUseCase {
  async execute({
    id,
    name,
    date,
    value,
    balanceAdjustment,
    type,
    creditCardId,
    categoryId,
    checkingAccountId,
  }: TransactionDTO): Promise<Transaction> {
    const transactionExists = await prisma.transaction.findUnique({
      where: {
        id,
      },
    });

    if (!transactionExists) {
      throw new AppError("Transaction not found");
    }

    const checkingAccount = await prisma.checkingAccount.findUnique({
      where: {
        id: checkingAccountId,
      },
    });

    if (!checkingAccount) {
      throw new AppError("Checking account not found", 404);
    }

    const transactionUpdated = await prisma.transaction.update({
      where: {
        id,
      },
      data: {
        name,
        balanceAdjustment,
        type,
        date,
        value,
        creditCardId,
        categoryId,
        checkingAccountId,
      },
    });

    return transactionUpdated;
  }
}
