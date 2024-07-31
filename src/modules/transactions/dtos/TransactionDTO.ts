import { TransactionType as PrismaTransactionType } from "@prisma/client";

export interface TransactionDTO {
  id?: string;
  name: string;
  date: Date;
  value: number;
  balanceAdjustment: boolean;
  type: PrismaTransactionType;
  checkingAccountId?: string;
  creditCardId?: string;
  categoryId?: string;
}
