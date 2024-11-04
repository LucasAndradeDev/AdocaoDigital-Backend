/*
  Warnings:

  - The `status` column on the `Pet` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "StatusPet" AS ENUM ('DISPONIVEL', 'ADOTADO');

-- CreateEnum
CREATE TYPE "StatusAdocao" AS ENUM ('PENDENTE', 'APROVADA', 'REJEITADA');

-- AlterTable
ALTER TABLE "Adocao" ADD COLUMN     "status" "StatusAdocao" NOT NULL DEFAULT 'PENDENTE',
ALTER COLUMN "data_adocao" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Adotante" ADD COLUMN     "data_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Pet" DROP COLUMN "status",
ADD COLUMN     "status" "StatusPet" NOT NULL DEFAULT 'DISPONIVEL';
