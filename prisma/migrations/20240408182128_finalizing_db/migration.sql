-- CreateTable
CREATE TABLE "salaries" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "value" DECIMAL NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "inputs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "value" DECIMAL NOT NULL,
    "checking_account_id" TEXT NOT NULL,
    "salary_id" TEXT NOT NULL,
    CONSTRAINT "inputs_checking_account_id_fkey" FOREIGN KEY ("checking_account_id") REFERENCES "checking_accounts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "inputs_salary_id_fkey" FOREIGN KEY ("salary_id") REFERENCES "salaries" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
