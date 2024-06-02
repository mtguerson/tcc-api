export interface ExpenseDTO {
  id?: string;
  name: string;
  date: Date;
  value: number;
  checkingAccountId: string;
  creditCardId?: string;
  categoryId?: string;
}
