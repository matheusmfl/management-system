/*
  Warnings:

  - Added the required column `date` to the `cotacoes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `security` to the `cotacoes` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_cotacoes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "clientName" TEXT NOT NULL,
    "clientCpf" INTEGER NOT NULL,
    "userVendorId" TEXT NOT NULL,
    "observations" TEXT,
    "security" TEXT NOT NULL,
    "date" INTEGER NOT NULL,
    CONSTRAINT "cotacoes_userVendorId_fkey" FOREIGN KEY ("userVendorId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_cotacoes" ("clientCpf", "clientName", "id", "observations", "userVendorId") SELECT "clientCpf", "clientName", "id", "observations", "userVendorId" FROM "cotacoes";
DROP TABLE "cotacoes";
ALTER TABLE "new_cotacoes" RENAME TO "cotacoes";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
