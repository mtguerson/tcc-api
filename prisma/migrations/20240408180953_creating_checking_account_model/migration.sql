-- CreateTable
CREATE TABLE "checking_accounts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "account" TEXT NOT NULL,
    "Agency" TEXT NOT NULL,
    "Bank" TEXT NOT NULL,
    "Balance" DECIMAL NOT NULL,
    "maintenance_fee" DECIMAL NOT NULL,
    CONSTRAINT "checking_accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
