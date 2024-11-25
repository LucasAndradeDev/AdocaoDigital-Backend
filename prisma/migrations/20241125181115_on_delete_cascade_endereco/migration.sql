-- DropForeignKey
ALTER TABLE "Endereco" DROP CONSTRAINT "Endereco_adotanteId_fkey";

-- AddForeignKey
ALTER TABLE "Endereco" ADD CONSTRAINT "Endereco_adotanteId_fkey" FOREIGN KEY ("adotanteId") REFERENCES "Adotante"("id") ON DELETE CASCADE ON UPDATE CASCADE;
