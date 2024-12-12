import type { Request, Response } from 'express';
import { Router } from 'express';
import { z } from "zod";
import { LoginUsuario } from "../../service/usuario/login-usuario"; // Importa a função de login de usuario

const router = Router();

// Rota para login de usuário
router.post("/", async (req: Request, res: Response): Promise<any> => {
    try {
        // Schema de validação dos dados
        const loginUsuarioSchema = z.object({
            email: z.string().email("Email inválido"),
            password: z.string().min(1, "Senha inválida"),
        });

        // Validação dos dados recebidos
        const { email, password } = loginUsuarioSchema.parse(req.body);

        // Login de usuário, chama a função de login de usuário
        const { usuario, token } = await LoginUsuario({ email, password });

        // Se deu tudo certo, retorna o token e os dados do usuário
        return res.status(200).json({ usuario, token });

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
