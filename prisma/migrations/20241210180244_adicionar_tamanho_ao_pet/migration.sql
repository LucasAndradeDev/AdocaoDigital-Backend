/*
  Warnings:

  - Changed the type of `especie` on the `Pet` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Especie" AS ENUM ('CACHORRO', 'GATO', 'MACACO', 'LAGARTO', 'PASSARO', 'COELHO', 'HAMSTER', 'PEIXE', 'CAVALO', 'PORCO', 'IGUANA', 'SERPENTE', 'TARTARUGA', 'OVELHA', 'GALINHA', 'PATO');

-- AlterTable
ALTER TABLE "Pet" DROP COLUMN "especie",
ADD COLUMN     "especie" "Especie" NOT NULL;
