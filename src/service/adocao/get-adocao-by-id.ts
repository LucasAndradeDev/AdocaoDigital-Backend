import { prisma } from "../../database/prisma-client";

// Interface para os dados de adoção
interface Adocao {
    id: string;
    data_adocao: Date;
    status: string;
    pet: object; 
    adotante: object; 
}

// Função para obter uma adoção pelo ID
export async function GetAdocaoById(adocaoId: string): Promise<Adocao | null> {
    try {
        const adocao = await prisma.adocao.findUnique({
            where: { id: adocaoId },
            include: {
                pet: true,
                adotante: true,
            },
        });

        // Verifica se a adoção não foi encontrada 
        if (!adocao) {
            throw new Error(`Adoção não encontrada para o ID ${adocaoId}`);
        }

        // Retorna os dados de adoção
        return {
            id: adocao.id,
            data_adocao: adocao.data_adocao,
            status: adocao.status,
            pet: adocao.pet,
            adotante: adocao.adotante,
        };
    } catch (error) {
        // Log detalhado do erro
        console.error("Erro ao obter adoção:", error);
        throw error; // Lança novamente o erro para ser tratado pelo controller
    }
}
