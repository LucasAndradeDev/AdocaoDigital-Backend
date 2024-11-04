// Service para obter todos os pets

import { prisma } from "../../database/prisma-client";
import type { Pet } from "@prisma/client";

// Função para obter todos os pets
export async function GetAllPet(): Promise<Pet[]> {
    try {
        // Busca todos os pets no banco de dados, incluindo as fotos
        const pets = await prisma.pet.findMany({
            include: {
                Foto_Pet: true // Inclui as fotos associadas ao pet
            }
        });

        return pets; // Retorna os pets encontrados
    } catch (error) {
        // Log do erro para debug
        console.error('Erro ao obter pets:', error);
        return []; // Retorna um array vazio em caso de erro

    }
} 
