import { CheckingAccount } from "@prisma/client";
import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";
import { CreateCheckingAccountDTO } from "../../dtos/CreateCheckingAccountDTO";

export class CreateCheckingAccountUseCase {
  async execute({ userId, name, account, agency, bank, balance, maintenanceFee }: CreateCheckingAccountDTO): Promise<CheckingAccount> {
    const userIdExists = await prisma.user.findUnique({
      where: {
        id: userId
      }
    });

    if (!userIdExists) {
      throw new AppError('User not found', 404);
    }

    const checkingAccount = await prisma.checkingAccount.create({
      data: {
        name,
        account,
        agency,
        bank,
        balance,
        maintenanceFee,
        userId
      }
    });

    return checkingAccount;
  }
}