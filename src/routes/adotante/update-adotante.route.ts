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
            password: z.string()
                .min(8, 'A senha deve ter pelo menos 8 caracteres')
                .regex(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
                .regex(/[a-z]/, 'A senha deve conter pelo menos uma letra minúscula')
                .regex(/[0-9]/, 'A senha deve conter pelo menos um número')
                .regex(/[@$!%*?&]/, 'A senha deve conter pelo menos um caractere especial').optional(),
            telefone: z.string().regex(
                /^(?:\(\d{2}\)\s?)?\d{5}-\d{4}$/,
                'Telefone inválido. O formato deve ser (XX) XXXXX-XXXX ou XXXXX-XXXX.'
            ).optional(),
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
        // Tratamento para erros de validação do Zod
        if (error instanceof z.ZodError) {
            // Mapeando erros para mensagens amigáveis
            const formattedErrors = error.errors.map((err) => ({
                campo: err.path.join('.'),
                mensagem: err.message,
            }));
    
            return res.status(400).json({
                error: "Dados inválidos, verifique os erros abaixo.",
                detalhes: formattedErrors,
            });
        }
    
        // Tratamento para outros erros (como duplicação de e-mail)
        if ((error as { code: string }).code === 'P2002') { // Prisma Unique Constraint Error
            return res.status(409).json({
                error: "O e-mail fornecido já está em uso. Tente novamente com outro.",
            });
        }
    
        // Tratamento genérico para outros erros inesperados
        return res.status(500).json({
            error: "Erro interno no servidor. Por favor, tente novamente mais tarde.",
        });
    }
});

export default router;
