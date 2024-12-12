import type { Request, Response } from 'express';
import { Router } from 'express';
import { z } from "zod";
import { CreateAdocao } from "../../service/adocao/adoptPet";

const router = Router();



// Rota para criar uma adoção
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
router.post("/", async (req: Request, res: Response): Promise<any> => {
    try {
        // Schema de validação dos dados
        const createAdocaoSchema = z.object({
            petId: z.string().min(1, 'ID do pet é obrigatório'),
            adotanteId: z.string().min(1, 'ID do adotante é obrigatório'),
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
            message: "Adoção criada com sucesso!",
            adocao,
        });
    } catch (error) {
        // Erros de validação do Zod
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                message: "Erro de validação",
                errors: error.errors.map(err => ({
                    field: err.path.join('.'),
                    message: err.message,
                })),
            });
        }

        // Tratamento de erros específicos
        if (error instanceof Error) {
            const errorResponses: Record<string, { status: number; error: string; message: string }> = {
                'Adotante não existe': {
                    status: 400,
                    error: 'Adotante não encontrado',
                    message: 'O adotante informado não existe no sistema.',
                },
                'Pet não existe': {
                    status: 400,
                    error: 'Pet não encontrado',
                    message: 'O pet informado não existe no sistema, por favor escolha outro.',
                },
                'Pet não está disponível para adoção': {
                    status: 400,
                    error: 'Pet indisponível',
                    message: 'O pet informado não está disponível para adoção no momento.',
                },
                'Adotante já adotou 3 pets': {
                    status: 400,
                    error: 'Limite de adoções excedido',
                    message: 'O adotante já atingiu o limite de adoções permitido (3 pets).',
                },
            };
            

            const response = errorResponses[error.message];
            if (response) {
                return res.status(response.status).json(response);
            }

            // Caso o erro seja desconhecido, mas ainda seja do tipo Error
            return res.status(500).json({
                Erro: 'Erro interno',
            });
        }

        // Caso o erro não seja tratado
        return res.status(500).json({
            Erro: 'Erro desconhecido',
        
        });
    }
});

export default router;
