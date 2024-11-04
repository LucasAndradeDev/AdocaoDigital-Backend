import { prisma } from "../../database/prisma-client";

export async function GetAdocaoById(adocaoId: string): Promise<object | null> {
    try {
        const adocao = await prisma.adocao.findUnique({
            where: { id: adocaoId },
            include: {
                pet: true,
                adotante: true
            }
        });

        if (!adocao) throw new Error("Adoção não encontrada.");

        return {
            id: adocao.id,
            data_adocao: adocao.data_adocao,
            status: adocao.status,
            pet: adocao.pet,
            adotante: adocao.adotante
        };
    } catch (error) {
        console.error("Erro ao obter adoção:", error);
        throw error;
    }
}
