import type { Request, Response } from 'express';
import { Router } from 'express';
import { ListAdocoes } from "../../service/adocao/list-adocoes";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        const adocoes = await ListAdocoes();
        return res.status(200).json(adocoes);
    } catch (error) {
        console.error('Erro ao listar adoções:', error);
        return res.status(500).json({
            error: "Erro interno do servidor"
        });
    }
});

export default router;
