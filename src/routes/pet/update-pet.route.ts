// Rota para atualizar um pet

import type { Request, Response } from 'express';
import { Router } from 'express';
import { z } from "zod";
import { UpdatePet } from "../../service/pet/update-pet"; // Importa a função de atualização de pet

const router = Router();

// Rota PUT para atualizar um pet
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
router.put("/:id", async (req: Request, res: Response): Promise<any> => {
    try {
        // Schema de validação dos dados
        const updatePetSchema = z.object({
            nome: z.string().min(1, 'Nome é obrigatório').optional(),
            especie: z.string().min(1, 'Espécie é obrigatória').optional(),
            dataNascimento: z.string().optional(), // Para manter como string
            descricao: z.string().optional(),
            status: z.enum(['ADOTADO', 'DISPONIVEL'], { errorMap: () => ({ message: 'Status inválido' }) }).optional(),
            tamanho: z.string().optional(),
            peso: z.number().optional(),
            personalidade: z.string().optional(),
            Foto_Pet: z.array(
                z.object({
                    url: z.string().url('URL inválida').optional(),
                })
            ).optional(),
        });

        // Validação dos dados recebidos
        const { id } = req.params;
        const { nome, especie, dataNascimento, descricao, status, tamanho, peso, personalidade, Foto_Pet } = updatePetSchema.parse(req.body);

        // Converte a string de data para um objeto Date
        const dataNascimentoDate = dataNascimento ? new Date(dataNascimento) : undefined;

        // Atualizar um pet
        const pet = await UpdatePet({
            id,
            nome,
            especie,
            data_nascimento: dataNascimentoDate, // Use o objeto Date aqui
            descricao,
            status,
            tamanho,
            peso,
            personalidade,
            Foto_Pet,
        });

        if (!pet) {
            return res.status(404).json({
                error: "Pet não encontrado"
            });
        }

        return res.status(200).json(pet);
    } catch (error) {
        // Tratamento específico para erros de validação do Zod
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                error: "Dados inválidos, verifique os dados e tente novamente.",
                details: error.errors
            });
        }

        // Log do erro para debug
        console.error('Erro ao atualizar pet:', error);

        return res.status(500).json({
            error: "Erro interno do servidor"
        });
    }
});

export default router;
