// Service para obter os dados de um pet

import { prisma } from "../../database/prisma-client";
import type { Pet } from "@prisma/client";


// Tipagem para o pet com idade, o Omit retira a propriedade data_nascimento do tipo Pet e adiciona idade
type PetWithAge = Omit<Pet, "data_nascimento"> & { idade: number };

// Função para obter os dados de um pet
export async function GetPetById(id: string): Promise<PetWithAge | null> {
    try {
        // Busca o pet no banco de dados, incluindo as fotos
        const pet = await prisma.pet.findUnique({
            where: {
                id
            },
            include: {
                Foto_Pet: true,
                adocoes: {
                    include: {
                        adotante: {
                            select: {
                                nome: true,
                            },
                        },
                    },
                },

            }
        });

        // Retornar pet com a idade calculada
        if (pet) {
            const birthDate = new Date(pet.data_nascimento);  // Cria um objeto Date com a data de nascimento do pet
            const today = new Date();  // Cria um objeto Date com a data atual

            let idade = today.getFullYear() - birthDate.getFullYear();  // Calcula a diferença de anos entre a data de hoje e a data de nascimento

            // Ajusta a idade se o aniversário ainda não passou neste ano
            if (
                today.getMonth() < birthDate.getMonth() ||  // Se o mês atual for menor que o mês de nascimento
                (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())  // Ou, se for o mesmo mês, mas o dia atual for anterior ao dia de nascimento
            ) {
                idade -= 1;  // Se ainda não fez aniversário este ano, subtrai 1 da idade
            }

            const { data_nascimento, ...rest } = pet;  // Desestrutura o objeto `pet` e remove a propriedade `data_nascimento`
            return {
                ...rest,  // Retorna o objeto do pet sem a data de nascimento
                idade,  // Adiciona a idade calculada
            };
            
        }

        return pet; // Retorna o pet encontrado ou null
    } catch (error) {
        // Log do erro para debug
        console.error('Erro ao obter pet:', error);
        return null; // Retorna null em caso de erro
    }
}
