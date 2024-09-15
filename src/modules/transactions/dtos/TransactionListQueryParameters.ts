import { TransactionType } from '@prisma/client'

export interface TransactionListQueryParameters {
  creditCardId?: string
  checkingAccountId?: string
  categoryId?: string
  type?: TransactionType
  showLogs?: boolean
}
