// Rota para obter todos os pets

import type { Request, Response } from 'express';
import { Router } from 'express';
import { z } from "zod";    
import { GetAllPet } from "../../service/pet/get-all-pet"; // Importa a função de obter todos os pets

const router = Router();

// Rota para obter todos os pets
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
router.get("/", async (req: Request, res: Response): Promise<any> => {
    try {
        // Schema de validação dos dados
        const getAllPetSchema = z.object({});

        // Validação dos dados recebidos
        // biome-ignore lint/correctness/noEmptyPattern: <explanation>
                const { } = getAllPetSchema.parse(req.params);

        // Obter todos os pets
        const pets = await GetAllPet();

        if (!pets) {
            return res.status(404).json({
                error: "Pets não encontrados"    
            });
        }

        // Depuração dos dados
        console.log("Pets:", pets);

        return res.status(200).json({
            "Pets": pets
        });
    } catch (error) {
        // Tratamento específico para erros de validação do Zod
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                error: "Dados inválidos, verifique os dados e tente novamente.",
                details: error.errors
            });
        }

        // Log do erro para debug
        console.error('Erro ao obter pets:', error);

        return res.status(500).json({
            error: "Erro interno do servidor"
        });
    }
});
 
export default router;