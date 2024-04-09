export interface CreateCheckingAccountDTO {
  userId: string;
  name: string;
  account: string;
  agency: string;
  bank: string;
  balance: number;
  maintenanceFee: number;
}