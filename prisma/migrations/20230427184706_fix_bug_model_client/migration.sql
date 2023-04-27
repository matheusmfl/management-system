/*
  Warnings:

  - You are about to drop the column `Cpf` on the `client` table. All the data in the column will be lost.
  - You are about to drop the column `Name` on the `client` table. All the data in the column will be lost.
  - You are about to drop the column `Observations` on the `client` table. All the data in the column will be lost.
  - Added the required column `cpf` to the `client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `client` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_client" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "cpf" INTEGER NOT NULL,
    "cbservations" TEXT
);
INSERT INTO "new_client" ("id") SELECT "id" FROM "client";
DROP TABLE "client";
ALTER TABLE "new_client" RENAME TO "client";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
