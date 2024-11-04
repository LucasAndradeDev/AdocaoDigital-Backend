// Rota para cadastrar um pet
import type { Request, Response } from 'express';
import { Router } from 'express';
import { z } from "zod";
import { CreatePet } from "../../service/pet/create-pet";

const router = Router();

// Rota para criar um pet
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
router.post("/", async (req: Request, res: Response): Promise<any> => {
    try {
        // Schema de validação dos dados
        const createPetSchema = z.object({
            nome: z.string().min(1, 'Nome é obrigatório'),
            especie: z.string().min(1, 'Espécie é obrigatória'),
            dataNascimento: z.string().min(1, 'Data de nascimento é obrigatória'),
            descricao: z.string().optional(),
            status: z.enum(['ADOTADO', 'DISPONIVEL'], { errorMap: () => ({ message: 'Status inválido' }) }),
            tamanho: z.string().optional(),
            peso: z.number().optional(),
            personalidade: z.string().optional(),
            Foto_Pet: z.array(
                z.object({
                    url: z.string().url('URL inválida'),
                })
            ).optional(),
        });

        // Validação dos dados recebidos
        const { nome, especie, dataNascimento, descricao, status, tamanho, peso, personalidade, Foto_Pet } = createPetSchema.parse(req.body);

        // Cria um novo pet
        const pet = await CreatePet({
            nome,
            especie,
            dataNascimento: new Date(dataNascimento), // Converte para DateTime
            descricao,
            status,
            tamanho,
            peso,
            personalidade,
            Foto_Pet
        });

        res.status(201).json(pet);
    } catch (error) {
        // Tratamento específico para erros de validação do Zod
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                error: "Dados inválidos, verifique os dados e tente novamente.",
                details: error.errors
            });
        }

        // Log do erro para debug
        console.error('Erro ao criar pet:', error);

        return res.status(500).json({
            error: "Erro interno do servidor"
        });
    }
});

export default router;
