import { prisma } from "../../database/prisma-client";

export async function DeleteAdocao(adocaoId: string): Promise<object | null> {
    try {
        const adocao = await prisma.adocao.findUnique({
            where: { id: adocaoId },
            include: {
                pet: true,
                adotante: true
            }
        });
        if (!adocao) throw new Error("Adoção não encontrada.");

        await prisma.pet.update({
            where: { id: adocao.petId },
            data: { status: "DISPONIVEL" }
        });

        await prisma.adotante.update({
            where: { id: adocao.adotanteId },
            data: { numero_adocoes: adocao.adotante.numero_adocoes - 1 }
        });

        await prisma.adocao.delete({
            where: { id: adocaoId }
        });

        return { message: "Adoção excluída com sucesso!" };
    } catch (error) {
        console.error("Erro ao excluir adoção:", error);
        throw error;
    }
}
