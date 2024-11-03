-- CreateTable
CREATE TABLE "Pet" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "especie" TEXT NOT NULL,
    "data_nascimento" TIMESTAMP(3) NOT NULL,
    "descricao" TEXT,
    "status" TEXT NOT NULL,
    "tamanho" TEXT,
    "peso" DOUBLE PRECISION,
    "personalidade" TEXT,

    CONSTRAINT "Pet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Adotante" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "sobrenome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,

    CONSTRAINT "Adotante_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Endereco" (
    "id" TEXT NOT NULL,
    "adotanteId" TEXT NOT NULL,
    "rua" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "numero_residencia" TEXT NOT NULL,

    CONSTRAINT "Endereco_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Adocao" (
    "id" TEXT NOT NULL,
    "petId" TEXT NOT NULL,
    "adotanteId" TEXT NOT NULL,
    "data_adocao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Adocao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Adotante_email_key" ON "Adotante"("email");

-- AddForeignKey
ALTER TABLE "Endereco" ADD CONSTRAINT "Endereco_adotanteId_fkey" FOREIGN KEY ("adotanteId") REFERENCES "Adotante"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
