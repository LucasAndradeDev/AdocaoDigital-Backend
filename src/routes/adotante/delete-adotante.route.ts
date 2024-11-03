// Rota para deletar um adotante

import type { Request, Response } from 'express';
import { Router } from 'express';
import { z } from "zod";
import { DeleteAdotante } from "../../service/adotante/delete-adotante"; // Importa a função de deletar adotante

const router = Router();

// Rota DELETE para deletar um adotante
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
router.delete("/:id", async (req: Request, res: Response): Promise<any> => {
    try {
        // Schema de validação dos dados
        const deleteAdotanteSchema = z.object({
            id: z.string().min(1, 'ID é obrigatório'),
        });

        // Validação dos dados recebidos
        const { id } = deleteAdotanteSchema.parse(req.params);

        // Deletar um adotante
        const adotante = await DeleteAdotante(id);

        if (!adotante) {
            return res.status(404).json({
                error: "Adotante não encontrado"    
            });
        }

        return res.status(200).json({
            adotante
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
        console.error('Erro ao deletar adotante:', error);

        return res.status(500).json({
            error: "Erro interno do servidor"
        });
    }
});

export default router;