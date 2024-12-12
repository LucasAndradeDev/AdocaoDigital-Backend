import { prisma } from "../../database/prisma-client";
import type { StatusAdocao } from "@prisma/client";

interface CreateAdocaoProps {
    petId: string;
    adotanteId: string;
    data_adocao: Date;
    status: StatusAdocao;
}

// Valida existência do adotante
async function validarAdotanteExiste(adotanteId: string) {
    const adotante = await prisma.adotante.findUnique({
        where: { id: adotanteId }
    });
    if (!adotante) throw new Error("Adotante não existe");
    return adotante;
}

// Verifica se adotante pode adotar (máximo 3 pets)
async function validarAdotantePodeAdotar(adotanteId: string) {
    const adotante = await prisma.adotante.findUnique({
        where: { id: adotanteId }
    });
    if (!adotante || adotante.numero_adocoes >= 3) {
        throw new Error("Adotante já adotou 3 pets");
    }
}

// Valida existência do pet
async function validarPetExiste(petId: string) {
    const pet = await prisma.pet.findUnique({
        where: { id: petId }
    });
    if (!pet) throw new Error("Pet não existe");
    return pet;
}

// Verifica se o pet está disponível
async function validarPetDisponivel(petId: string) {
    const pet = await prisma.pet.findUnique({
        where: { id: petId }
    });
    if (pet?.status !== "DISPONIVEL") {
        throw new Error("Pet não está disponível para adoção");
    }
}

// Verifica se adotante já adotou este pet
async function validarNaoAdotadoAnteriormente(petId: string, adotanteId: string) {
    const adocaoExistente = await prisma.adocao.findFirst({
        where: { petId, adotanteId }
    });
    if (adocaoExistente) throw new Error("Adotante já adotou este pet");
}

export async function CreateAdocao({
    petId,
    adotanteId,
    data_adocao,
    status
}: CreateAdocaoProps) {
    // Usa transação de banco de dados para operações atômicas
    return prisma.$transaction(async (tx) => {
        // Valida todas as condições antes de prosseguir
        await validarPetExiste(petId);
        await validarPetDisponivel(petId);
        const adotante = await validarAdotanteExiste(adotanteId);
        await validarAdotantePodeAdotar(adotanteId);
        await validarNaoAdotadoAnteriormente(petId, adotanteId);

        // Cria registro de adoção
        const adocao = await tx.adocao.create({
            data: {
                petId,
                adotanteId,
                data_adocao,
                status
            }
        });

        // Atualiza status do pet
        const petAtualizado = await tx.pet.update({
            where: { id: petId },
            data: { status: "ADOTADO" }
        });

        // Atualiza contagem de adoções do adotante
        const adotanteAtualizado = await tx.adotante.update({
            where: { id: adotanteId },
            data: { numero_adocoes: adotante.numero_adocoes + 1 }
        });

        // Retorna informações detalhadas da adoção
        return {
            mensagem: "Adoção realizada com sucesso!",
            adocao: {
                id: adocao.id,
                dataAdocao: adocao.data_adocao,
                status: adocao.status
            },
            adotante: {
                id: adotanteAtualizado.id,
                nome: adotanteAtualizado.nome,
                sobrenome: adotanteAtualizado.sobrenome,
                email: adotanteAtualizado.email,
                numeroAdocoes: adotanteAtualizado.numero_adocoes
            },
            pet: {
                id: petAtualizado.id,
                nome: petAtualizado.nome,
                especie: petAtualizado.especie,
                dataNascimento: petAtualizado.data_nascimento,
                descricao: petAtualizado.descricao,
                tamanho: petAtualizado.tamanho,
                status: petAtualizado.status,
                peso: petAtualizado.peso,
                personalidade: petAtualizado.personalidade
            }
        };
    });
}