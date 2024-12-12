/*
  Warnings:

  - You are about to drop the column `adotanteId` on the `Endereco` table. All the data in the column will be lost.
  - You are about to drop the `Adotante` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `usuarioId` to the `Endereco` table without a default value. This is not possible if the table is not empty.
  - Added the required column `responsavel` to the `Pet` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Adocao" DROP CONSTRAINT "Adocao_adotanteId_fkey";

-- DropForeignKey
ALTER TABLE "Endereco" DROP CONSTRAINT "Endereco_adotanteId_fkey";

-- AlterTable
ALTER TABLE "Endereco" DROP COLUMN "adotanteId",
ADD COLUMN     "usuarioId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Pet" ADD COLUMN     "responsavel" TEXT NOT NULL;

-- DropTable
DROP TABLE "Adotante";

-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "sobrenome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "data_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "numero_adocoes" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_responsavel_fkey" FOREIGN KEY ("responsavel") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Endereco" ADD CONSTRAINT "Endereco_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Adocao" ADD CONSTRAINT "Adocao_adotanteId_fkey" FOREIGN KEY ("adotanteId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
