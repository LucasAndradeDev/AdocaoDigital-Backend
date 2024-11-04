// Service para cadastrar um pet
import { prisma } from "../../database/prisma-client";
import type { Pet , StatusPet } from "@prisma/client";
import crypto from "node:crypto";

// Interface para os dados do pet
interface CreatePetProps {
    nome: string;
    especie: string;
    dataNascimento: Date;
    descricao?: string;
    status: StatusPet;
    tamanho?: string;
    peso?: number;
    personalidade?: string;
    Foto_Pet?: {
        url: string;
    }[];
}

// Cria um novo pet
export async function CreatePet({ nome, especie, dataNascimento, descricao, status, tamanho, peso, personalidade, Foto_Pet }: CreatePetProps): Promise<Pet> {
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
            tamanho,
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
