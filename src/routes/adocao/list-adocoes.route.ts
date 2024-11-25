import type { Request, Response } from 'express';
import { Router } from 'express';
import { ListAdocoes } from "../../service/adocao/list-adocoes";

const router = Router();

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
router.get("/", async (req: Request, res: Response): Promise<any> => {
    try {
        // Busca todas as adoções
        const adocoes = await ListAdocoes();
        return res.status(200).json(adocoes);
    } catch (error) {
        // Log do erro para debug
        console.error('Erro ao listar adoções:', error);
        return res.status(500).json({
            error: "Erro interno do servidor"
        });
    }
});

export default router;
