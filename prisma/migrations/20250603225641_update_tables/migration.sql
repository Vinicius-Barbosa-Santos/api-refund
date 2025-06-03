-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Refunds" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "category" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME,
    CONSTRAINT "Refunds_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Refunds" ("amount", "category", "filename", "id", "name", "user_id") SELECT "amount", "category", "filename", "id", "name", "user_id" FROM "Refunds";
DROP TABLE "Refunds";
ALTER TABLE "new_Refunds" RENAME TO "Refunds";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
