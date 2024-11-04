import { prisma } from "../../database/prisma-client";
import type { Adotante } from "@prisma/client";

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
                },
                adocoes: {
                    select: {
                        id: true,
                        pet: {  // Busca os dados do pet associado ao adotante
                            select: {
                                nome: true,
                                especie: true,
                                data_nascimento: true,
                                descricao: true,
                                tamanho: true,
                                status: true,
                                peso: true,
                                personalidade: true,
                                Foto_Pet: {  
                                    select: {
                                        url: true
                                    }
                                }
                            }
                        }
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
