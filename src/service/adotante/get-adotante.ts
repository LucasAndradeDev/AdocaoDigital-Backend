// Service para obter um adotante

// Importar o Prisma client
import { prisma } from "../../database/prisma-client";
// Importar o tipo Adotante do Prisma
import type { Adotante } from "@prisma/client";

// Função para obter um adotante
export async function GetAdotante(id: string): Promise<Adotante | null> {
    try {
        // Busca o adotante no banco de dados
        const adotante = await prisma.adotante.findUnique({
            where: {
                id
            },
            include: {
                enderecos: {
                    select: {
                        id: true,
                        rua: true,
                        bairro: true,
                        cidade: true,
                        numero_residencia: true
                    }
                }
            }
        });

        return adotante; // Retorna o adotante encontrado ou null
    } catch (error) {
        // Log do erro para debug
        console.error('Erro ao obter adotante:', error);
        return null; // Retorna null em caso de erro
    }
}
