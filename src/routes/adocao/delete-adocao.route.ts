import type { Request, Response } from 'express';
import { Router } from 'express';
import { z } from "zod";
import { DeleteAdocao } from "../../service/adocao/delete-adocao";

const router = Router();

router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const idSchema = z.string().min(1, "ID de adoção é obrigatório");
        const adocaoId = idSchema.parse(req.params.id);

        const result = await DeleteAdocao(adocaoId);

        return res.status(200).json(result);

    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                error: "Dados inválidos, verifique os dados e tente novamente.",
                details: error.errors,
            });
        }

        console.error('Erro ao excluir adoção:', error);
        return res.status(500).json({
            error: "Erro interno do servidor"
        });
    }
});

export default router;
