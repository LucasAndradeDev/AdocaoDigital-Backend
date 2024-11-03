// Rota para atualizar um adotante

import type { Request, Response } from 'express';
import { Router } from 'express';
import { z } from "zod";
import { UpdateAdotante } from "../../service/adotante/update-adotante"; // Importa a função de atualização de adotante

const router = Router();

// Rota PUT para atualizar um adotante
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
router.put("/:id", async (req: Request, res: Response): Promise<any> => {
    try {
        // Schema de validação dos dados
        const updateAdotanteSchema = z.object({
            nome: z.string().min(1, 'Nome é obrigatório').optional(),
            sobrenome: z.string().min(1, 'Sobrenome é obrigatório').optional(),
            email: z.string().email('Email inválido').optional(),
            password: z.string().min(8, 'Senha é obrigatória').optional(),
            telefone: z.string().min(1, 'Telefone é obrigatório').optional(),
            endereco: z.object({
                id: z.string().min(1, 'ID do endereço é obrigatório').optional(),
                rua: z.string().min(1, 'Rua é obrigatória').optional(),
                bairro: z.string().min(1, 'Bairro é obrigatório').optional(),
                cidade: z.string().min(1, 'Cidade é obrigatória').optional(),
                numero_residencia: z.string().min(1, 'Número da residência é obrigatório').optional(),
            }).optional()
        });

        // Validação dos dados recebidos
        const { id } = req.params;
        const { nome, sobrenome, email, password, telefone, endereco } = updateAdotanteSchema.parse(req.body);

        // Atualizar um adotante
        const adotante = await UpdateAdotante({
            id,
            nome,
            sobrenome,
            email,
            password,
            telefone,
            endereco
        });

        return res.status(200).json({
            adotante
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
        console.error('Erro ao atualizar adotante:', error);
        
        return res.status(500).json({
            error: "Erro interno do servidor"
        });
    }
});

export default router;
