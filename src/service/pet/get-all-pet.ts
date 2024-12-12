import { prisma } from "../../database/prisma-client";
import type { Especie, Pet, Tamanho } from "@prisma/client";

// Tipagem para os filtros
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

// Tipagem para o pet com idade, o Omit retira a propriedade data_nascimento do tipo Pet e adiciona idade
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
                ...(nome && { nome: { contains: nome, mode: "insensitive" } }), // Filtro exato para o campo nome
                ...(especie && { especie: especie as Especie }), // Filtro exato para o enum especie
                ...(status && { status }), // Filtro exato para o enum status
                ...(tamanho && { tamanho: tamanho as Tamanho }), // Filtro exato para o enum tamanho
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
        
        

        const petsWithAge: PetWithAge[] = pets.map((pet) => {
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
        });


        // Verifica se o filtro de idade foi aplicadom ou seja se idadeMinNum ou idadeMaxNum foram fornecidos, após isso realiza a filtragem por idade
        if (idadeMinNum || idadeMaxNum) {
            return petsWithAge.filter((pet) => {
                return (
                    (idadeMinNum ? pet.idade >= idadeMinNum : true) &&  // Se idadeMinNum for fornecido, verifica se a idade do pet é maior ou igual a idadeMinNum
                    (idadeMaxNum ? pet.idade <= idadeMaxNum : true)   // Se idadeMaxNum for fornecido, verifica se a idade do pet é menor ou igual a idadeMaxNum
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
