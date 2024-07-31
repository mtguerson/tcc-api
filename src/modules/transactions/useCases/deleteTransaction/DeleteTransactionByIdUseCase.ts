import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";

export class DeleteTransactionByIdUseCase {
  async execute(id: string): Promise<void> {
    const transactionExists = await prisma.transaction.findUnique({
      where: {
        id,
      },
    });

    if (!transactionExists) {
      throw new AppError("Transaction not found");
    }

    if (transactionExists.creditCardId) {
      const shoudldDecrementInvoice = transactionExists.type === "OUTCOME";

      if (shoudldDecrementInvoice) {
        await prisma.creditCard.update({
          where: {
            id: transactionExists.creditCardId,
          },
          data: {
            invoice: {
              decrement: transactionExists.value,
            },
          },
        });
      }

      if (!shoudldDecrementInvoice) {
        await prisma.creditCard.update({
          where: {
            id: transactionExists.creditCardId,
          },
          data: {
            invoice: {
              increment: transactionExists.value,
            },
          },
        });
      }
    }

    if (transactionExists.checkingAccountId) {
      const shouldDecrementBalance = transactionExists.type === "INCOME";
      if (shouldDecrementBalance) {
        await prisma.checkingAccount.update({
          where: {
            id: transactionExists.checkingAccountId,
          },
          data: {
            balance: {
              decrement: transactionExists.value,
            },
          },
        });
      }

      if (!shouldDecrementBalance) {
        await prisma.checkingAccount.update({
          where: {
            id: transactionExists.checkingAccountId,
          },
          data: {
            balance: {
              increment: transactionExists.value,
            },
          },
        });
      }
    }

    await prisma.transaction.delete({
      where: {
        id,
      },
    });
  }
}
