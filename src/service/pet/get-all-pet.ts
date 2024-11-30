import { prisma } from "../../database/prisma-client";
import type { Pet } from "@prisma/client";

type PetFilters = {
    nome?: string;
    especie?: string;
    status?: "ADOTADO" | "DISPONIVEL";
    tamanho?: "PEQUENO" | "MEDIO" | "GRANDE";
    personalidade?: string;
    idadeMin?: number;
    idadeMax?: number;
    pesoMin?: number;
    pesoMax?: number;
};

type PetWithAge = Omit<Pet, "data_nascimento"> & { idade: number };

// Função para obter todos os pets
export async function GetAllPet(filters: PetFilters): Promise<PetWithAge[]> {
    try {
        const { nome, especie, status, tamanho, personalidade, idadeMin, idadeMax, pesoMin, pesoMax } = filters;

        // Converte idadeMin e idadeMax para número caso sejam passados como string
        const idadeMinNum = idadeMin ? Number(idadeMin) : undefined;
        const idadeMaxNum = idadeMax ? Number(idadeMax) : undefined;

        // Depuração dos filtros
        console.log("Depuração dos filtros:", filters);

        // Filtragem condicional, garantindo que cada filtro seja aplicado apenas se o valor existir
        const pets = await prisma.pet.findMany({
            where: {
                ...(nome && { nome: { contains: nome, mode: "insensitive" } }),
                ...(especie && { especie: { contains: especie, mode: "insensitive" } }),
                ...(status && { status }), // Filtro exato para o enum status
                ...(tamanho && { tamanho }), // Filtro exato para o enum tamanho
                ...(personalidade && { personalidade: { contains: personalidade, mode: "insensitive" } }),
                ...(pesoMin && { peso: { gte: pesoMin } }), // Filtro para peso mínimo
                ...(pesoMax && { peso: { lte: pesoMax } }), // Filtro para peso máximo
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

        // Adiciona a idade calculada aos pets
        const petsWithAge: PetWithAge[] = pets.map((pet) => {
            const birthDate = new Date(pet.data_nascimento);
            const today = new Date();

            let idade = today.getFullYear() - birthDate.getFullYear();

            // Ajusta a idade se o aniversário ainda não passou neste ano
            if (
                today.getMonth() < birthDate.getMonth() ||
                (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())
            ) {
                idade -= 1;
            }

            const { data_nascimento, ...rest } = pet;
            return {
                ...rest,
                idade, // Adiciona a idade calculada
            };
        });

        // Verifica se o filtro de idade foi aplicado e realiza a filtragem por idade
        if (idadeMinNum || idadeMaxNum) {
            return petsWithAge.filter((pet) => {
                return (
                    (idadeMinNum ? pet.idade >= idadeMinNum : true) &&
                    (idadeMaxNum ? pet.idade <= idadeMaxNum : true)
                );
            });
        }


        console.log("Pets encontrados:", petsWithAge);

        return petsWithAge;
    } catch (error) {
        // Log do erro para depuração
        console.error("Erro ao obter pets:", error);
        return []; // Retorna um array vazio em caso de erro
    }
}
