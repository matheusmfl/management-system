/*
  Warnings:

  - You are about to drop the `Corretor` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "Corretor_username_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Corretor";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "corretor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_proposta" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "numeroProposta" TEXT NOT NULL,
    "seguradora" TEXT NOT NULL,
    "dataVencimento" DATETIME NOT NULL,
    "corretorId" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    CONSTRAINT "proposta_corretorId_fkey" FOREIGN KEY ("corretorId") REFERENCES "corretor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "proposta_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "client" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_proposta" ("clientId", "corretorId", "dataVencimento", "id", "numeroProposta", "seguradora") SELECT "clientId", "corretorId", "dataVencimento", "id", "numeroProposta", "seguradora" FROM "proposta";
DROP TABLE "proposta";
ALTER TABLE "new_proposta" RENAME TO "proposta";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "corretor_username_key" ON "corretor"("username");
