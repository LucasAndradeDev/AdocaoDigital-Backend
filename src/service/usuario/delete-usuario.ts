// Importar o Prisma client
import { prisma } from "../../database/prisma-client";

// Tipo para a resposta da função
interface DeleteResponse {
    success: boolean;
    message: string;
}

// Função para deletar um usuário
export async function DeleteUsuario(
    id: string
): Promise<DeleteResponse> { // Retorna um objeto com a mensagem
    try {
        // Verifica se o ID do usuário existe
        const usuarioExists = await prisma.usuario.findUnique({
            where: {
                id
            }
        });

        if (!usuarioExists) {
            return { success: false, message: "Usuário inexistente, tente novamente" };
        }

        // Deletar endereços relacionados antes de deletar o usuário
        await prisma.endereco.deleteMany({
            where: {
                usuarioId: id // Assumindo que o campo que relaciona o endereço ao usuário é 'usuarioId'
            }
        });

        // Deletar o usuário
        await prisma.usuario.delete({
            where: {
                id
            }
        });

        console.log("Usuário deletado com sucesso! ID:", id);
        return { success: true, message: `Usuário deletado com sucesso! ID: ${id}` }; // Retorna a mensagem em um objeto
    } catch (error) {
        // Verificação se o erro é uma instância de Error
        if (error instanceof Error) {
            console.error('Erro ao deletar usuário:', error.message);
        } else {
            console.error('Erro desconhecido ao deletar usuário:', error);
        }
        throw error; // Relança o erro para ser tratado na camada da rota
    }
}
