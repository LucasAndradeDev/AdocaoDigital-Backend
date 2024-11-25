-- DropForeignKey
ALTER TABLE "Adocao" DROP CONSTRAINT "Adocao_adotanteId_fkey";

-- AddForeignKey
ALTER TABLE "Adocao" ADD CONSTRAINT "Adocao_adotanteId_fkey" FOREIGN KEY ("adotanteId") REFERENCES "Adotante"("id") ON DELETE CASCADE ON UPDATE CASCADE;
