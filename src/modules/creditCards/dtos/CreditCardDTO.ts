export interface CreditCardDTO {
  id?: string
  userId: string
  name: string
  lastDigits: number
  limit: number
  closingDate: Date
  invoice: number
}
