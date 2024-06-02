/*
  Warnings:

  - Made the column `checking_account_id` on table `expenses` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_expenses" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "value" DECIMAL NOT NULL,
    "credit_card_id" TEXT,
    "category_id" TEXT,
    "checking_account_id" TEXT NOT NULL,
    CONSTRAINT "expenses_credit_card_id_fkey" FOREIGN KEY ("credit_card_id") REFERENCES "credit_cards" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "expenses_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "expenses_checking_account_id_fkey" FOREIGN KEY ("checking_account_id") REFERENCES "checking_accounts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_expenses" ("category_id", "checking_account_id", "credit_card_id", "date", "id", "name", "value") SELECT "category_id", "checking_account_id", "credit_card_id", "date", "id", "name", "value" FROM "expenses";
DROP TABLE "expenses";
ALTER TABLE "new_expenses" RENAME TO "expenses";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
