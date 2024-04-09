/*
  Warnings:

  - Added the required column `name` to the `checking_accounts` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_checking_accounts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "account" TEXT NOT NULL,
    "Agency" TEXT NOT NULL,
    "Bank" TEXT NOT NULL,
    "Balance" DECIMAL NOT NULL,
    "maintenance_fee" DECIMAL NOT NULL,
    CONSTRAINT "checking_accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_checking_accounts" ("Agency", "Balance", "Bank", "account", "id", "maintenance_fee", "user_id") SELECT "Agency", "Balance", "Bank", "account", "id", "maintenance_fee", "user_id" FROM "checking_accounts";
DROP TABLE "checking_accounts";
ALTER TABLE "new_checking_accounts" RENAME TO "checking_accounts";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
