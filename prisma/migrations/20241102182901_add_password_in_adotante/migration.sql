/*
  Warnings:

  - Added the required column `password` to the `Adotante` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Adotante" ADD COLUMN     "password" TEXT NOT NULL;
