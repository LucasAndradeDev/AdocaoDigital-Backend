// Service para obter os dados de um pet

import { prisma } from "../../database/prisma-client";
import type { Pet } from "@prisma/client";

// Função para obter os dados de um pet
export async function GetPetById(id: string): Promise<Pet | null> {
    try {
        // Busca o pet no banco de dados, incluindo as fotos
        const pet = await prisma.pet.findUnique({
            where: {
                id
            },
            include: {
                Foto_Pet: true // Inclui as fotos associadas ao pet
            }
        });

        return pet; // Retorna o pet encontrado ou null
    } catch (error) {
        // Log do erro para debug
        console.error('Erro ao obter pet:', error);
        return null; // Retorna null em caso de erro
    }
}
