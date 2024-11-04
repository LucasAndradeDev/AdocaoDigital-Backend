import type { Request, Response } from 'express';
import { Router } from 'express';
import { z } from "zod";
import { GetAdocaoById } from "../../service/adocao/get-adocao-by-id";

const router = Router();

router.get("/:id", async (req: Request, res: Response) => {
    try {
        const idSchema = z.string().min(1, "ID de adoção é obrigatório");
        const adocaoId = idSchema.parse(req.params.id);

        const adocao = await GetAdocaoById(adocaoId);

        if (!adocao) {
            return res.status(404).json({
                error: "Adoção não encontrada."
            });
        }

        return res.status(200).json(adocao);

    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                error: "Dados inválidos, verifique os dados e tente novamente.",
                details: error.errors,
            });
        }

        console.error('Erro ao obter adoção:', error);
        return res.status(500).json({
            error: "Erro interno do servidor"
        });
    }
});

export default router;
