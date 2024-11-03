import type { Request, Response } from 'express';
import { Router } from 'express';
import { z } from "zod";
import { GetAdotante } from "../../service/adotante/get-adotante"; // Importa a função de obter adotante

const router = Router();

// Rota para obter um adotante
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
router.get("/:id", async (req: Request, res: Response): Promise<any> => {
    try {
        // Schema de validação dos dados
        const getAdotanteSchema = z.object({
            id: z.string().min(1, 'ID é obrigatório'),
        });

        // Validação dos dados recebidos
        const { id } = getAdotanteSchema.parse(req.params);

        // Obter um adotante
        const adotante = await GetAdotante(id);

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
        console.error('Erro ao obter adotante:', error);

        return res.status(500).json({
            error: "Erro interno do servidor",
        });
    }
});

export default router;
