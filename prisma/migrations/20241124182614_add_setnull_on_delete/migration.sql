/*
  Warnings:

  - Added the required column `tamanho` to the `Pet` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Tamanho" AS ENUM ('PEQUENO', 'MEDIO', 'GRANDE');

-- DropForeignKey
ALTER TABLE "Adocao" DROP CONSTRAINT "Adocao_petId_fkey";

-- AlterTable
ALTER TABLE "Pet" DROP COLUMN "tamanho",
ADD COLUMN     "tamanho" "Tamanho" NOT NULL;

-- AddForeignKey
ALTER TABLE "Adocao" ADD CONSTRAINT "Adocao_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
