import type { Request, Response } from 'express';
import { Router } from 'express';
import { z } from "zod";
import { CreateAdocao } from "../../service/adocao/create-adocao";

const router = Router();

// Rota para criar uma adoção
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
router.post("/", async (req: Request, res: Response): Promise<any> => {
    try {
        // Schema de validação dos dados
        const createAdocaoSchema = z.object({
            petId: z.string().min(1, 'Pet é obrigatório'),
            adotanteId: z.string().min(1, 'Adotante é obrigatório'),
        });

        // Validação dos dados recebidos
        const { petId, adotanteId } = createAdocaoSchema.parse(req.body);

        // Cria uma nova adoção
        const adocao = await CreateAdocao({
            petId,
            adotanteId,
            data_adocao: new Date(),
            status: "PENDENTE",
        });

        return res.status(201).json({
            adocao
        });

    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                error: "Dados inválidos, verifique os dados e tente novamente.",
                details: error.errors,
            });
        }

        console.error('Erro ao criar adoção:', error);

        return res.status(500).json({
            error: "Erro interno do servidor"
        });
    }
});

export default router;
