import type { Request, Response } from 'express';
import { Router } from 'express';
import { z } from "zod";
import { GetUsuario } from "../../service/usuario/get-usuario"; // Importa a função de obter usuario

const router = Router();

// Rota para obter um usuário
router.get("/:id", async (req: Request, res: Response): Promise<any> => {
    try {
        // Schema de validação dos dados
        const getUsuarioSchema = z.object({
            id: z.string().min(1, 'ID é obrigatório'),
        });

        // Validação dos dados recebidos
        const { id } = getUsuarioSchema.parse(req.params);

        // Obter um usuário
        const usuario = await GetUsuario(id);

        if (!usuario) {
            return res.status(404).json({
                error: "Usuário não encontrado"
            });
        }

        return res.status(200).json({
            "Dados do Usuário": usuario
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
        console.error('Erro ao obter usuário:', error);

        return res.status(500).json({
            error: "Erro interno do servidor",
        });
    }
});

export default router;
