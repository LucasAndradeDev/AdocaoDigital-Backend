import type { Request, Response } from 'express';
import { Router } from 'express';
import { z } from "zod";
import { UpdateAdocao } from "../../service/adocao/update-adocao";

const router = Router();

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
router.put("/:id", async (req: Request, res: Response): Promise<any> => {
    try {
        const idSchema = z.string().min(1, "ID de adoção é obrigatório");
        const adocaoId = idSchema.parse(req.params.id);

        const updateAdocaoSchema = z.object({
            status: z.enum(["PENDENTE", "CONCLUÍDA", "CANCELADA"]).nonempty("Status é obrigatório")
        });

        const { status } = updateAdocaoSchema.parse(req.body);

        const adocao = await UpdateAdocao(adocaoId, status);

        return res.status(200).json({
            message: "Adoção atualizada com sucesso!",
            adocao
        });

    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                error: "Dados inválidos, verifique os dados e tente novamente.",
                details: error.errors,
            });
        }

        console.error('Erro ao atualizar adoção:', error);
        return res.status(500).json({
            error: "Erro interno do servidor"
        });
    }
});

export default router;
