import type { Request, Response } from 'express';
import { Router } from 'express';
import { z } from "zod";    
import { GetAllPet } from "../../service/pet/get-all-pet"; // Importa a função de obter todos os pets

const router = Router();

// Definir schema de validação com Zod
const getAllPetSchema = z.object({
    nome: z.string().optional(),
    especie: z.string().optional(),
    status: z.enum(["ADOTADO", "DISPONIVEL"]).optional(),
    tamanho: z.enum(["PEQUENO", "MEDIO", "GRANDE"]).optional(),
    personalidade: z.string().optional(),
    idadeMin: z.coerce.number().optional(),  // Coerce para converter para number
    idadeMax: z.coerce.number().optional(),  
    pesoMin: z.coerce.number().optional(),  // Coerce para converter para number
    pesoMax: z.coerce.number().optional(),
});

// Inferir tipo para os filtros a partir do schema
type GetAllPetFilters = z.infer<typeof getAllPetSchema>;

router.get("/", async (req: Request, res: Response): Promise<void> => {
    try {
        // Validação dos dados na query string
        const filters: GetAllPetFilters = getAllPetSchema.parse(req.query);

        // Obter todos os pets aplicando os filtros
        const pets = await GetAllPet(filters);

        // Verifica se nenhum pet foi encontrado
        if (!pets || pets.length === 0) {
            res.status(404).json({
                error: "Nenhum pet encontrado com os filtros fornecidos",
            });
            return;
        }

        // Retornar os pets encontrados
        res.status(200).json({
            pets,
        });
    } catch (error) {
        // Tratamento específico para erros de validação do Zod
        if (error instanceof z.ZodError) {
            res.status(400).json({
                error: "Dados inválidos, verifique os filtros e tente novamente.",
                details: error.errors,
            });
            return;
        }

        // Log do erro para debug
        console.error('Erro ao obter pets:', error);

        res.status(500).json({
            error: "Erro interno do servidor",
        });
    }
});

export default router;
