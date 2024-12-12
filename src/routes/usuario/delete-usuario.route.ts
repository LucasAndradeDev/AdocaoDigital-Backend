import type { Request, Response } from 'express';
import { Router } from 'express';
import { z } from "zod";
import { DeleteUsuario } from "../../service/usuario/delete-usuario"; // Importa a função de deletar usuario

const router = Router();

// Rota DELETE para deletar um usuário
router.delete("/:id", async (req: Request, res: Response): Promise<any> => {
    try {
        // Schema de validação dos dados
        const deleteUsuario = z.object({
            id: z.string().min(1, 'ID é obrigatório'),
        });

        // Validação dos dados recebidos
        const { id } = deleteUsuario.parse(req.params);

        // Deletar o usuário
        const result = await DeleteUsuario(id);

        if (!result.success) {
            return res.status(404).json({
                error: result.message, // Mensagem de erro específica
            });
        }

        return res.status(200).json({
            message: result.message, // Retorna a mensagem de sucesso ou falha
        });
    } catch (error) {
        // Tratamento específico para erros de validação do Zod
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                error: "Dados inválidos, verifique os dados e tente novamente.",
                details: error.errors,
            });
        }

        // Log do erro para debug
        console.error('Erro ao deletar usuário:', error);

        return res.status(500).json({
            error: "Erro interno do servidor"
        });
    }
});

export default router;
