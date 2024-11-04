import { prisma } from "../../database/prisma-client";

export async function ListAdocoes(): Promise<object[]> {
    try {
        const adocoes = await prisma.adocao.findMany({
            include: {
                pet: true,
                adotante: true
            }
        });

        return adocoes.map(adocao => ({
            id: adocao.id,
            data_adocao: adocao.data_adocao,
            status: adocao.status,
            pet: adocao.pet,
            adotante: adocao.adotante
        }));
    } catch (error) {
        console.error("Erro ao listar adoções:", error);
        throw error;
    }
}
