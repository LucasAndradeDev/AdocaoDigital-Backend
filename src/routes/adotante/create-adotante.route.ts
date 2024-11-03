import type { Request, Response } from 'express';
import { Router } from 'express';
import { z } from "zod";
import { CreateAdotante } from "../../service/adotante/create-adotante"; // Importa a função de criação de adotante

const router = Router();

// Rota para criar um adotante
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
router.post("/", async (req: Request, res: Response): Promise<any> => {
    try {
        // Schema de validação dos dados
        const createAdotanteSchema = z.object({
            nome: z.string().min(1, 'Nome é obrigatório'),
            sobrenome: z.string().min(1, 'Sobrenome é obrigatório'),
            email: z.string().email('Email inválido'),
            password: z.string().min(8, 'Senha é obrigatória'),
            telefone: z.string().min(1, 'Telefone é obrigatório'),
            endereco: z.object({
                rua: z.string().min(1, 'Rua é obrigatória'),
                bairro: z.string().min(1, 'Bairro é obrigatório'),
                cidade: z.string().min(1, 'Cidade é obrigatória'),
                numero_residencia: z.string().min(1, 'Número da residência é obrigatório'),
            })
        });

        // Validação dos dados recebidos
        const { nome, sobrenome, email, password, telefone, endereco } = createAdotanteSchema.parse(req.body);

        console.log(req.body);

        // Cria um novo adotante com endereço
        const adotante = await CreateAdotante({
            nome,
            sobrenome,
            email,
            password,
            telefone,
            endereco, // Passa o endereço para ser criado junto com o adotante
        });

        return res.status(201).json({
            message: "Adotante criado com sucesso!",
            adotante // Retorna os dados do adotante criado
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
        console.error('Erro ao criar adotante:', error);

        return res.status(500).json({
            error: "Erro interno do servidor"
        });
    }
});

export default router;
