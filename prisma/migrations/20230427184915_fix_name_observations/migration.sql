/*
  Warnings:

  - You are about to drop the column `cbservations` on the `client` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_client" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "cpf" INTEGER NOT NULL,
    "observations" TEXT
);
INSERT INTO "new_client" ("cpf", "id", "name") SELECT "cpf", "id", "name" FROM "client";
DROP TABLE "client";
ALTER TABLE "new_client" RENAME TO "client";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
