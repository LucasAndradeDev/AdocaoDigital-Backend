// Rota para deletar um pet

import type { Request, Response } from 'express';
import { Router } from 'express';
import { z } from "zod";
import { DeletePet } from "../../service/pet/delete-pet"; // Importa a função de deletar pet

const router = Router();

// Rota DELETE para deletar um pet
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
router.delete("/:id", async (req: Request, res: Response): Promise<any> => {
    try {
        // Schema de validação dos dados
        const deletePetSchema = z.object({
            id: z.string().min(1, 'ID é obrigatório'),
        });

        // Validação dos dados recebidos
        const { id } = deletePetSchema.parse(req.params);

        // Deletar um pet
        const pet = await DeletePet(id);

        if (!pet) {
            return res.status(404).json({
                error: "Pet não encontrado"    
            });
        }

        return res.status(200).json({
            pet
        });

    } catch (error) {
        return res.status(400).json({
            error: error
        });
    }
});

export default router;