// Service para deletar um pet

// Importar o Prisma client
import { prisma } from "../../database/prisma-client";
// Importar o tipo Pet do Prisma
import type { Pet } from "@prisma/client";

// Função para deletar um pet
export async function DeletePet(id: string): Promise<Pet | null> {
    try {
        // Deletar o pet
        return await prisma.pet.delete({
            where: {
                id
            }
        });
    } catch (error) {
        // Log do erro para debug
        console.error('Erro ao deletar pet:', error);
        return null; // Retorna null em caso de erro
    }
}