/*
  Warnings:

  - You are about to alter the column `balance` on the `checking_accounts` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `maintenance_fee` on the `checking_accounts` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `limit` on the `credit_cards` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `invoice` on the `credit_cards` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to drop the column `cpf` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `expenses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `inputs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `salaries` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[username]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Made the column `username` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "transaction_type" AS ENUM ('INCOME', 'OUTCOME');

-- DropForeignKey
ALTER TABLE "categories" DROP CONSTRAINT "categories_user_id_fkey";

-- DropForeignKey
ALTER TABLE "checking_accounts" DROP CONSTRAINT "checking_accounts_user_id_fkey";

-- DropForeignKey
ALTER TABLE "credit_cards" DROP CONSTRAINT "credit_cards_user_id_fkey";

-- DropForeignKey
ALTER TABLE "expenses" DROP CONSTRAINT "expenses_category_id_fkey";

-- DropForeignKey
ALTER TABLE "expenses" DROP CONSTRAINT "expenses_checking_account_id_fkey";

-- DropForeignKey
ALTER TABLE "expenses" DROP CONSTRAINT "expenses_credit_card_id_fkey";

-- DropForeignKey
ALTER TABLE "inputs" DROP CONSTRAINT "inputs_checking_account_id_fkey";

-- DropForeignKey
ALTER TABLE "inputs" DROP CONSTRAINT "inputs_salary_id_fkey";

-- DropIndex
DROP INDEX "users_cpf_key";

-- AlterTable
ALTER TABLE "checking_accounts" ALTER COLUMN "balance" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "maintenance_fee" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "credit_cards" ALTER COLUMN "limit" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "invoice" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "cpf",
ADD COLUMN     "token" TEXT,
ALTER COLUMN "username" SET NOT NULL;

-- DropTable
DROP TABLE "expenses";

-- DropTable
DROP TABLE "inputs";

-- DropTable
DROP TABLE "salaries";

-- CreateTable
CREATE TABLE "transactions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "credit_card_id" TEXT,
    "category_id" TEXT,
    "checking_account_id" TEXT NOT NULL,
    "balance_adjustment" BOOLEAN NOT NULL,
    "type" "transaction_type" NOT NULL,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- AddForeignKey
ALTER TABLE "credit_cards" ADD CONSTRAINT "credit_cards_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_checking_account_id_fkey" FOREIGN KEY ("checking_account_id") REFERENCES "checking_accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_credit_card_id_fkey" FOREIGN KEY ("credit_card_id") REFERENCES "credit_cards"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "checking_accounts" ADD CONSTRAINT "checking_accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
