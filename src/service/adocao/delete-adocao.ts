import { prisma } from "../../database/prisma-client";

export async function DeleteAdocao(adocaoId: string): Promise<object | null> {
    try {
        // Busca a adoção no banco de dados
        const adocao = await prisma.adocao.findUnique({
            where: { id: adocaoId },
            include: {
                pet: true,
                adotante: true
            }
        });
        // Verifica se a adoção existe
        if (!adocao) throw new Error("Adoção não encontrada.");

        // Atualiza o status do pet para DISPONIVEL
        await prisma.pet.update({
            where: { id: adocao.petId },
            data: { status: "DISPONIVEL" }
        });

        // Atualiza o numero de adocoes do adotante, subtraindo 1
        await prisma.adotante.update({
            where: { id: adocao.adotanteId },
            data: { numero_adocoes: adocao.adotante.numero_adocoes - 1 }
        });

        // Exclui a adoção
        await prisma.adocao.delete({
            where: { id: adocaoId }
        });

        return { message: "Adoção excluída com sucesso!" };
    } catch (error) {
        console.error("Erro ao excluir adoção:", error);
        throw error;
    }
}
