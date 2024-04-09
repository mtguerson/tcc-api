/*
  Warnings:

  - You are about to drop the column `Agency` on the `checking_accounts` table. All the data in the column will be lost.
  - You are about to drop the column `Balance` on the `checking_accounts` table. All the data in the column will be lost.
  - You are about to drop the column `Bank` on the `checking_accounts` table. All the data in the column will be lost.
  - Added the required column `agency` to the `checking_accounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `balance` to the `checking_accounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bank` to the `checking_accounts` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_checking_accounts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "account" TEXT NOT NULL,
    "agency" TEXT NOT NULL,
    "bank" TEXT NOT NULL,
    "balance" DECIMAL NOT NULL,
    "maintenance_fee" DECIMAL NOT NULL,
    CONSTRAINT "checking_accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_checking_accounts" ("account", "id", "maintenance_fee", "name", "user_id") SELECT "account", "id", "maintenance_fee", "name", "user_id" FROM "checking_accounts";
DROP TABLE "checking_accounts";
ALTER TABLE "new_checking_accounts" RENAME TO "checking_accounts";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
