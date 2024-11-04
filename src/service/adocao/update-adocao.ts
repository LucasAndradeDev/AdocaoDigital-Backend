import { prisma } from "../../database/prisma-client";
import type { StatusAdocao } from "@prisma/client";

export async function UpdateAdocao(
    adocaoId: string,
    status: StatusAdocao
): Promise<object | null> {
    try {
        const adocao = await prisma.adocao.findUnique({ where: { id: adocaoId } });
        if (!adocao) throw new Error("Adoção não encontrada.");

        const adocaoAtualizada = await prisma.adocao.update({
            where: { id: adocaoId },
            data: { status }
        });

        return {
            message: "Adoção atualizada com sucesso!",
            adocao: adocaoAtualizada
        };
    } catch (error) {
        console.error("Erro ao atualizar adoção:", error);
        throw error;
    }
}
