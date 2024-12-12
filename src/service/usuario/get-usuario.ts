// Importar o Prisma client
import { prisma } from "../../database/prisma-client";
import type { Usuario } from "@prisma/client"; // Tipo de dado para o usuário

// Função para obter um usuário
export async function GetUsuario(id: string): Promise<Usuario | null> {
    try {
        // Busca o usuário no banco de dados
        const usuario = await prisma.usuario.findUnique({
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
                petsAdicionados: {
                    select: {
                        id: true,
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
        });

        return usuario; // Retorna o usuário encontrado ou null
    } catch (error) {
        // Log do erro para debug
        console.error('Erro ao obter usuário:', error);
        return null; // Retorna null em caso de erro
    }
}
