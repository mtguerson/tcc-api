import { CheckingAccount } from "@prisma/client";
import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";
import { CheckingAccountDTO } from "../../dtos/CheckingAccountDTO";

export class UpdateCheckingAccountByIdUseCase {
  async execute({ userId, id, name, account, agency, bank, balance, maintenanceFee }: CheckingAccountDTO): Promise<CheckingAccount> {
    const checkingAccountExists = await prisma.checkingAccount.findUnique({
      where: {
        id
      }
    });

    if (!checkingAccountExists) {
      throw new AppError('Checking Account not found');
    }

    if (checkingAccountExists.name !== name) {
      const accountNameExists = await prisma.checkingAccount.findFirst({
        where: {
          userId,
          name,
          NOT: {
            id
          }
        }
      });

      if (accountNameExists) {
        throw new AppError('Another account with this name already exists for this user');
      }
    }

    const checkingAccountUpdated = await prisma.checkingAccount.update({
      where: {
        id
      },
      data: {
        name,
        account,
        agency,
        bank,
        balance,
        maintenanceFee
      }
    });

    return checkingAccountUpdated;
  }
}