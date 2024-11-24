import { prisma } from "../../database/prisma-client";
import type { Pet } from "@prisma/client";

type PetFilters = {
    nome?: string;
    especie?: string;
    status?: "ADOTADO" | "DISPONIVEL";
    tamanho?: string;
    personalidade?: string;
    idadeMin?: number;
    idadeMax?: number;
    pesoMin?: number;
    pesoMax?: number;
};

// Função para obter todos os pets
export async function GetAllPet(filters: PetFilters): Promise<Pet[]> {
    try {
        const { nome, especie, status, tamanho, personalidade, idadeMin, idadeMax, pesoMin, pesoMax } = filters;

        // Converte idadeMin e idadeMax para número caso sejam passados como string
        const idadeMinNum = idadeMin ? Number(idadeMin) : undefined;
        const idadeMaxNum = idadeMax ? Number(idadeMax) : undefined;


        // Depuração dos filtros
        console.log("Depuração dos filtros:", filters);

        // Filtragem condicional, garantindo que cada filtro seja aplicado apenas se o valor existir
        let pets = await prisma.pet.findMany({
            where: {
                ...(nome && { nome: { contains: nome, mode: "insensitive" } }),
                ...(especie && { especie: { contains: especie, mode: "insensitive" } }),
                ...(status && { status }), // Filtro exato para o enum status
                ...(tamanho && { tamanho: { contains: tamanho, mode: "insensitive" } }),
                ...(personalidade && { personalidade: { contains: personalidade, mode: "insensitive" } }),
                ...(pesoMin && { peso: { gte: pesoMin } }),  // Filtro para peso mínimo
                ...(pesoMax && { peso: { lte: pesoMax } }),  // Filtro para peso máximo
            },
        });


        // Depuração dos pets, caso seja passado um filtro de idade	
        // biome-ignore lint/complexity/noForEach: <explanation>
        pets.forEach(pet => {
            console.log("Data de nascimento do pet:", pet.data_nascimento);

            // Converte para o tipo Date
            pet.data_nascimento = new Date(pet.data_nascimento);

            // Pega apenas o dia da data
            const anoNascimento = pet.data_nascimento.getFullYear();
            const anoAtual = new Date().getFullYear();

            const idadePet = anoAtual - anoNascimento;
            console.log("Ano de nascimento:", anoNascimento);
            console.log("Idade do pet:", idadePet);


        });

        // Verifica se o filtro de idade foi aplicado e realiza a filtragem por idade
        if (idadeMinNum || idadeMaxNum) {
            pets = pets.filter(pet => {
                let idadePet = new Date().getFullYear() - new Date(pet.data_nascimento).getFullYear();

                // Ajusta a idade se o aniversário ainda não passou neste ano
                const aniversario = new Date(pet.data_nascimento);
                if (new Date().getMonth() < aniversario.getMonth() || (new Date().getMonth() === aniversario.getMonth() && new Date().getDate() < aniversario.getDate())) {
                    idadePet -= 1;
                }

                return (
                    (idadeMinNum ? idadePet >= idadeMinNum : true) &&
                    (idadeMaxNum ? idadePet <= idadeMaxNum : true)
                );
            });
        }

        console.log("Pets encontrados:", pets);

        return pets;
    } catch (error) {
        // Log do erro para depuração
        console.error("Erro ao obter pets:", error);
        return []; // Retorna um array vazio em caso de erro
    }
}
