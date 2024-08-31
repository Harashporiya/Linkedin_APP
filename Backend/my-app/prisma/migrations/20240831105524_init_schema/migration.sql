/*
  Warnings:

  - You are about to drop the column `LastName` on the `CreateAccount` table. All the data in the column will be lost.
  - Added the required column `lastName` to the `CreateAccount` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CreateAccount" DROP COLUMN "LastName",
ADD COLUMN     "lastName" TEXT NOT NULL;
