// Service para cadastrar um pet
import { prisma } from "../../database/prisma-client";
import type { Pet, StatusPet, Tamanho } from "@prisma/client";
import crypto from "node:crypto";
import { calcularTamanho } from "./size-calculation";

// Enum Especie (com base no seu Prisma)
enum Especie {
  CACHORRO = "CACHORRO",
  GATO = "GATO",
  MACACO = "MACACO",
  LAGARTO = "LAGARTO",
  PASSARO = "PASSARO",
  COELHO = "COELHO",
  HAMSTER = "HAMSTER",
  PEIXE = "PEIXE",
  CAVALO = "CAVALO",
  PORCO = "PORCO",
  IGUANA = "IGUANA",
  SERPENTE = "SERPENTE",
  TARTARUGA = "TARTARUGA",
  OVELHA = "OVELHA",
  GALINHA = "GALINHA",
  PATO = "PATO",
}

// Interface para os dados do pet
interface CreatePetProps {
    nome: string;
    especie: Especie; 
    dataNascimento: Date;
    descricao?: string;
    status: StatusPet | undefined;
    peso: number;
    personalidade?: string;
    Foto_Pet?: {
        url: string;
    }[];
}


// Cria um novo pet
export async function CreatePet({
    nome,
    especie,
    dataNascimento,
    descricao,
    status,
    peso,
    personalidade,
    Foto_Pet
}: CreatePetProps): Promise<Pet> {
    const id = crypto.randomUUID();

    // Cria o pet com fotos associadas, se fornecidas
    const pet = await prisma.pet.create({
        data: {
            id,
            nome,
            especie, 
            data_nascimento: dataNascimento,
            descricao,
            status,
            tamanho: calcularTamanho(especie, peso),
            peso,
            personalidade,
            Foto_Pet: {
                create: Foto_Pet?.map(foto => ({
                    url: foto.url
                })) || []
            }
        },
        include: {
            Foto_Pet: true // Inclui as fotos associadas na resposta
        }
    });

    return pet;
}
