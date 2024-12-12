import type { Request, Response } from 'express';
import { Router } from 'express';
import { z } from "zod";
import { CreateAdotante } from "../../service/adotante/create-adotante";

const router = Router();

// Rota para criar um adotante
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
router.post("/", async (req: Request, res: Response): Promise<any> => { 
    try {
        // Validação do esquema de criação de adotante
        const createAdotanteSchema = z.object({
            nome: z.string().min(1, 'Nome é obrigatório'),
            sobrenome: z.string().min(1, 'Sobrenome é obrigatório'),
            email: z.string().email('Email inválido'),
            password: z.string()
                .min(8, 'A senha deve ter pelo menos 8 caracteres'),
            telefone: z.string().min(1, 'Telefone é obrigatório'),
            endereco: z.object({
                rua: z.string().min(1, 'Rua é obrigatória'),
                bairro: z.string().min(1, 'Bairro é obrigatório'),
                cidade: z.string().min(1, 'Cidade é obrigatória'),
                numero_residencia: z.string().min(1, 'Número da residência é obrigatório'),
            }),
        });

        const nome = req.body.nome;
        const sobrenome = req.body.sobrenome;
        const email = req.body.email;
        const password = req.body.password;
        const telefone = req.body.telefone;
        const { rua, bairro, cidade, numero_residencia } = req.body.endereco;

        // Validação dos dados recebidos
        const { endereco } = createAdotanteSchema.parse({
            nome,
            sobrenome,
            email,
            password,
            telefone,
            endereco: {
                rua,
                bairro,
                cidade,
                numero_residencia,
            },
        });

        // Depurar os dados recebidos
        console.log('Dadaos recebidos:', req.body);

        // Cria um novo adotante com endereço
        const adotante = await CreateAdotante({
            nome,
            sobrenome,
            email,
            password,
            telefone,
            endereco,
        });

        return res.status(201).json({
            adotante
        });

    } catch (error) {
        // Tratamento para erros de validação do Zod
        if (error instanceof z.ZodError) {
            // Depurar os erros de validação
            console.error('Erros de validação:', error.errors);
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
            // Depurar o erro de duplicação de e-mail
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
