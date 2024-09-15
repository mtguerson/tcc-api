import { TransactionType } from "@prisma/client";

export interface TransactionListQueryParameters {
<<<<<<< HEAD
  creditCardId?: string
  checkingAccountId?: string
  categoryId?: string
=======
  creditCardId?: string;
  checkingAccountId?: string;
  categoryId?: string;
  type?: TransactionType;
  showLogs?: boolean;
>>>>>>> ccccf26d8ef33e5c3ebc22ba1c86b53fbdd44c52
}
