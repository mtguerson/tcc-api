import { Prisma } from "@prisma/client";
import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";
import { TransactionListQueryParameters } from "../../dtos/TransactionListQueryParameters";

export class ListAllTransactionsByUserIdUseCase {
  async execute({
    userId,
    query,
  }: {
    userId: string;
    query: TransactionListQueryParameters;
  }) {
    if (!userId) throw new AppError("User id is required", 400);

    const filters = [];

    if (query?.categoryId) {
      filters.push({
        categoryId: query.categoryId,
      });
    }

    if (query?.creditCardId) {
      filters.push({
        creditCardId: query.creditCardId,
      });
    }

    if (query?.checkingAccountId) {
      filters.push({
        checkingAccountId: query.checkingAccountId,
      });
    }

    const transactions = await prisma.transaction.findMany({
      where: {
        OR: [
          {
            checkingAccounts: {
              userId,
            },
          },
          {
            creditCards: {
              userId,
            },
          },
        ],
        AND: filters,
      },
      include: {
        checkingAccounts: true,
        categories: true,
        creditCards: true,
      },
      orderBy: {
        date: "desc",
      },
    });
    if (!transactions.length) {
      throw new AppError("Not found!", 404);
    }

    return transactions;
  }
}
