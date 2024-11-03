-- AddForeignKey
ALTER TABLE "Adocao" ADD CONSTRAINT "Adocao_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Adocao" ADD CONSTRAINT "Adocao_adotanteId_fkey" FOREIGN KEY ("adotanteId") REFERENCES "Adotante"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
