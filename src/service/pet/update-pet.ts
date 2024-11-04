// Service para atualizar um pet

import { prisma } from "../../database/prisma-client";
import type { Pet , StatusPet } from "@prisma/client";

// Interface para os dados do pet
interface UpdatePetData {
    id: string;
    nome?: string;
    especie?: string;
    data_nascimento?: Date;
    descricao?: string;
    status?: StatusPet;
    tamanho?: string;
    peso?: number;
    personalidade?: string;
    Foto_Pet?: { url?: string }[];
}

// Função para atualizar um pet
export async function UpdatePet({ id, nome, especie, data_nascimento, descricao, status, tamanho, peso, personalidade, Foto_Pet }: UpdatePetData): Promise<Pet | null> {
    // Verifica se o pet existe
    const pet = await prisma.pet.findUnique({
        where: {
            id
        }
    });

    if (!pet) {
        return null; // Retorna null se o pet não existir
    }

    // Atualiza os dados do pet
    const updatedPet = await prisma.pet.update({
        where: {
            id
        },
        data: {
            nome,
            especie,
            data_nascimento,
            descricao,
            status,
            tamanho,
            peso,
            personalidade,
            Foto_Pet: {
                create: Foto_Pet?.filter(foto => foto.url !== undefined) // Filtra fotos com url definido
                .map(foto => ({
                    // biome-ignore lint/style/noNonNullAssertion: <explanation>
                    url: foto.url! // Aqui podemos usar a asserção de não-nulo
                })) || []
            }
        }
    });

    return updatedPet; // Retorna o pet atualizado
}
