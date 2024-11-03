// Service para deletar um adotante

// Importar o Prisma client
import { prisma } from "../../database/prisma-client";

// Tipo para a resposta da função
interface DeleteResponse {
    success: boolean;
    message: string;
}

// Função para deletar um adotante
export async function DeleteAdotante(
    id: string
): Promise<DeleteResponse> { // Retorna um objeto com a mensagem
    try {
        // Verifica se o ID do adotante existe
        const adotanteExists = await prisma.adotante.findUnique({
            where: {
                id
            }
        });

        if (!adotanteExists) {
            throw new Error("Adotante inexistente, tente novamente");
        }

        // Deletar endereços relacionados antes de deletar o adotante
        await prisma.endereco.deleteMany({
            where: {
                adotanteId: id // Assumindo que o campo que relaciona o endereço ao adotante é 'adotanteId'
            }
        });

        // Deletar o adotante
        await prisma.adotante.delete({
            where: {
                id
            }
        });

        console.log("Adotante deletado com sucesso! ID:", id);
        return { success: true, message: `Adotante deletado com sucesso! ID: ${id}` }; // Retorna a mensagem em um objeto
    } catch (error) {
        // Verificação se o erro é uma instância de Error
        if (error instanceof Error) {
            console.error('Erro ao deletar adotante:', error.message);
        } else {
            console.error('Erro desconhecido ao deletar adotante:', error);
        }
        throw error; // Relança o erro para ser tratado na camada da rota
    }
}
