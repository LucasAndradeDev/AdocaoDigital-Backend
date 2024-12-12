// Service para atualizar um pet
import { prisma } from "../../database/prisma-client"; // Importar o Prisma client
import type { Pet, StatusPet } from "@prisma/client"; // Importar o tipo Pet do Prisma
import { calcularTamanho } from "./size-calculation";

// Enum Especie (com base no seu Prisma)
enum Especie {
    CACHORRO = "CACHORRO",
    GATO = "GATO",
    MACACO = "MACACO",
    LAGARTO = "LAGARTO",
    PASSARO = "PASSARO",
    COELHO = "COELHO",
    HAMSTER = "HAMSTER",
    PEIXE = "PEIXE",
    CAVALO = "CAVALO",
    PORCO = "PORCO",
    IGUANA = "IGUANA",
    SERPENTE = "SERPENTE",
    TARTARUGA = "TARTARUGA",
    OVELHA = "OVELHA",
    GALINHA = "GALINHA",
    PATO = "PATO",
}

// Interface para os dados do pet
interface UpdatePetData {
    id: string;
    nome?: string;
    especie?: Especie;
    data_nascimento?: Date;
    descricao?: string;
    status?: StatusPet;
    peso?: number;
    personalidade?: string;
    Foto_Pet?: { url?: string }[];
}

// Função para atualizar um pet
export async function UpdatePet({
    id,
    nome,
    especie,
    data_nascimento,
    descricao,
    status,
    peso,
    personalidade,
    Foto_Pet
}: UpdatePetData): Promise<Pet | string | null> {
    // Verifica se o pet existe
    const pet = await prisma.pet.findUnique({
        where: {
            id
        },
        include: {
            Foto_Pet: true
        }
    });

    if (!pet) {
        return null; // Retorna null se o pet não existir
    }

    // Verifica se há URLs duplicadas
    if (Foto_Pet) {
        const existingUrls = pet.Foto_Pet.map(foto => foto.url); // URLs existentes no banco
        const newUrls = Foto_Pet.map(foto => foto.url); // URLs fornecidas no body

        // Filtra URLs duplicadas
        const duplicateUrls = newUrls.filter(url => url && existingUrls.includes(url));

        if (duplicateUrls.length > 0) {
            return `As seguintes URLs já existem: ${duplicateUrls.join(", ")}`;
        }
    }

    // Verificar se peso e especie foram fornecidos
    const calcularTamanhoDoPet = peso && especie;

    // Atualiza os dados do pet
    const updatedPet = await prisma.pet.update({
        where: {
            id
        },
        data: {
            nome,
            especie,
            data_nascimento,
            descricao,
            status,
            tamanho: calcularTamanhoDoPet ? calcularTamanho(especie, peso) : pet.tamanho, // Atualiza o tamanho somente se peso e especie foram fornecidos
            peso,
            personalidade,
            Foto_Pet: {
                create: Foto_Pet?.filter(foto => foto.url !== undefined) // Filtra fotos válidas
                    .map(foto => ({
                        // biome-ignore lint/style/noNonNullAssertion: <explanation>
                        url: foto.url! // Asserção de não-nulo
                    })) || []
            }
        },
        include: {
            Foto_Pet: true
        }
    });

    return updatedPet; // Retorna o pet atualizado
}
