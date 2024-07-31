import { CheckingAccount } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { AppError } from "../../../../errors/AppError";

export class GetCheckingAccountByUserIdUseCase {
  async execute({ userId }: { userId: string }): Promise<CheckingAccount[]> {
    const checkingAccount = await prisma.checkingAccount.findMany({
      where: {
        userId,
      },
    });

    if (checkingAccount.length === 0) {
      throw new AppError("Not found!", 404);
    }

    return checkingAccount;
  }
}
