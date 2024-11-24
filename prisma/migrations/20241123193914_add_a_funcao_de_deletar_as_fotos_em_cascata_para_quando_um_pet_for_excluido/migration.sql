-- DropForeignKey
ALTER TABLE "Foto_Pet" DROP CONSTRAINT "Foto_Pet_petId_fkey";

-- AddForeignKey
ALTER TABLE "Foto_Pet" ADD CONSTRAINT "Foto_Pet_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
