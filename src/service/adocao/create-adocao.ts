import { prisma } from "../../database/prisma-client";
import type { Adocao, StatusAdocao } from "@prisma/client";

interface CreateAdocaoProps {
    petId: string;
    adotanteId: string;
    data_adocao: Date;
    status: StatusAdocao;
}

async function AdotanteExists(adotanteId: string) {
    const adotante = await prisma.adotante.findUnique({
        where: { id: adotanteId }
    });
    if (!adotante) throw new Error("Adotante inexistente, tente novamente");
    return adotante;
}

async function AdotantePodeAdotar(adotanteId: string) {
    const adotante = await prisma.adotante.findUnique({
        where: { id: adotanteId }
    });
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    if (adotante!.numero_adocoes >= 3) {
        throw new Error("Adotante já adotou 3 pets, tente novamente");
    }
}

async function PetExists(petId: string) {
    const pet = await prisma.pet.findUnique({
        where: { id: petId }
    });
    if (!pet) throw new Error("Pet inexistente, tente novamente");
}

async function PetDisponivel(petId: string) {
    const pet = await prisma.pet.findUnique({
        where: { id: petId }
    });
    if (pet?.status !== "DISPONIVEL") {
        throw new Error("Pet já adotado, procure outro pet");
    }
}

export async function CreateAdocao({
    petId,
    adotanteId,
    data_adocao,
    status
}: CreateAdocaoProps): Promise<object | null> {
    try {
        // Validações
        await PetExists(petId);
        await PetDisponivel(petId);
        const adotante = await AdotanteExists(adotanteId);
        await AdotantePodeAdotar(adotanteId);

        // Criação da adoção
        const adocao = await prisma.adocao.create({
            data: {
                petId,
                adotanteId,
                data_adocao,
                status
            }
        });

        // Atualiza o status do pet para "ADOTADO"
        const petAtualizado = await prisma.pet.update({
            where: { id: petId },
            data: { status: "ADOTADO" }
        });

        // Incrementa o número de adoções do adotante
        const adotanteAtualizado = await prisma.adotante.update({
            where: { id: adotanteId },
            data: { numero_adocoes: adotante.numero_adocoes + 1 }
        });

        // Retorno detalhado do JSON
        return {
            message: "Adoção realizada com sucesso!",
            adocao: {
                id: adocao.id,
                data_adocao: adocao.data_adocao,
                status: adocao.status
            },
            adotante: {
                id: adotanteAtualizado.id,
                nome: adotanteAtualizado.nome,
                sobrenome: adotanteAtualizado.sobrenome,
                email: adotanteAtualizado.email,
                numero_adocoes: adotanteAtualizado.numero_adocoes
            },
            pet: {
                id: petAtualizado.id,
                nome: petAtualizado.nome,
                especie: petAtualizado.especie,
                data_nascimento: petAtualizado.data_nascimento,
                descricao: petAtualizado.descricao,
                tamanho: petAtualizado.tamanho,
                status: petAtualizado.status,
                peso: petAtualizado.peso,
                personalidade: petAtualizado.personalidade
            }
        };
    } catch (error) {
        console.error("Erro ao criar adoção:", error);
        throw error;
    }
}
