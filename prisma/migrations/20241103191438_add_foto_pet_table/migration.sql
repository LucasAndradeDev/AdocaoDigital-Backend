-- CreateTable
CREATE TABLE "Foto_Pet" (
    "id" TEXT NOT NULL,
    "petId" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Foto_Pet_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Foto_Pet" ADD CONSTRAINT "Foto_Pet_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
