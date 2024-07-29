/*
  Warnings:

  - Changed the type of `last_digits` on the `credit_cards` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "credit_cards" DROP COLUMN "last_digits",
ADD COLUMN     "last_digits" DECIMAL(65,30) NOT NULL;
