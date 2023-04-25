/*
  Warnings:

  - You are about to drop the `cotacoes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "cotacoes";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "users";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Corretor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "client" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "Name" TEXT NOT NULL,
    "Cpf" INTEGER NOT NULL,
    "Observations" TEXT
);

-- CreateTable
CREATE TABLE "proposta" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "numeroProposta" TEXT NOT NULL,
    "seguradora" TEXT NOT NULL,
    "dataVencimento" DATETIME NOT NULL,
    "corretorId" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    CONSTRAINT "proposta_corretorId_fkey" FOREIGN KEY ("corretorId") REFERENCES "Corretor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "proposta_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "client" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Corretor_username_key" ON "Corretor"("username");
