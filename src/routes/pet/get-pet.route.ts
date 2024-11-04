// Rota para obter um pet

import type { Request, Response } from 'express';
import { Router } from 'express';
import { z } from "zod";
import { GetPetById } from "../../service/pet/get-pet"; // Importa a função de obter pet

const router = Router();

// Rota para obter um pet
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
router.get("/:id", async (req: Request, res: Response): Promise<any> => {
    try {
        // Schema de validação dos dados
        const getPetSchema = z.object({
            id: z.string().min(1, 'ID é obrigatório'),
        });

        // Validação dos dados recebidos
        const { id } = getPetSchema.parse(req.params);

        // Obter um pet
        const pet = await GetPetById(id);

        if (!pet) {
            return res.status(404).json({
                error: "Pet não encontrado"    
            });
        }

        return res.status(200).json({
            "Dados do Pet": pet
        });
    } catch (error) {
        // Tratamento específico para erros de validação do Zod
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                error: "Dados inválidos, verifique os dados e tente novamente.",
                details: error.errors,
            });
        }

        // Retorna um erro genérico do servidor
        return res.status(500).json({
            error: "Erro interno do servidor"
        });
    }
});

export default router;