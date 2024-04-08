-- CreateTable
CREATE TABLE "credit_cards" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "last_digits" TEXT NOT NULL,
    "limit" DECIMAL NOT NULL,
    "closing_date" DATETIME NOT NULL,
    "invoice" DECIMAL NOT NULL,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "credit_cards_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
