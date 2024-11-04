// Rota de login de adotante
import type { Request, Response } from 'express';
import { Router } from 'express';
import { z } from "zod";
import { LoginAdotante } from "../../service/adotante/login-adotante"; // Importa a função de login de adotante

const router = Router();

// Rota para login de adotante
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
router.post("/", async (req: Request, res: Response): Promise<any> => {
    try {
        // Schema de validação dos dados
        const loginAdotanteSchema = z.object({
            email: z.string().email("Email inválido"),
            password: z.string().min(1, "Senha inválida"),
        });

        // Validação dos dados recebidos
        const { email, password } = loginAdotanteSchema.parse(req.body);

        // Login de adotante, chama a função de login de adotante
        const { adotante, token } = await LoginAdotante({ email, password });

        // Se deu tudo certo, retorna o token e os dados do adotante
        return res.status(200).json({ adotante, token });

    } catch (error) {
        // Tratamento específico para erros de validação do Zod
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                error: "Dados inválidos, verifique os dados e tente novamente.",
                details: error.errors,
            });
        }

        // Retorna um erro genérico do servidor
        return res.status(500).json({
            error: "Erro interno do servidor"
        });
    }
});

export default router;
