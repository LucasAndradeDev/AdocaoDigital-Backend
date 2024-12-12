import type { Request, Response } from 'express';
import { Router } from 'express';
import { z } from "zod";
import { CreatePet } from "../../service/pet/create-pet";

// Definindo o enum Especie (as mesmas opções do Prisma)
enum Especie {
  CACHORRO = "CACHORRO",
  GATO = "GATO",
  MACACO = "MACACO",
  LAGARTO = "LAGARTO",
  PASSARO = "PASSARO",
  COELHO = "COELHO",
  HAMSTER = "HAMSTER",
  PEIXE = "PEIXE",
  CAVALO = "CAVALO",
  PORCO = "PORCO",
  IGUANA = "IGUANA",
  SERPENTE = "SERPENTE",
  TARTARUGA = "TARTARUGA",
  OVELHA = "OVELHA",
  GALINHA = "GALINHA",
  PATO = "PATO",
}

const router = Router();

// Rota para criar um pet
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
router.post("/", async (req: Request, res: Response): Promise<any> => {
    try {
        // Schema de validação dos dados
        const createPetSchema = z.object({
            nome: z.string().min(1, 'Nome é obrigatório'),
            especie: z.enum([
                Especie.CACHORRO,
                Especie.GATO,
                Especie.MACACO,
                Especie.LAGARTO,
                Especie.PASSARO,
                Especie.COELHO,
                Especie.HAMSTER,
                Especie.PEIXE,
                Especie.CAVALO,
                Especie.PORCO,
                Especie.IGUANA,
                Especie.SERPENTE,
                Especie.TARTARUGA,
                Especie.OVELHA,
                Especie.GALINHA,
                Especie.PATO,
            ], { errorMap: () => ({ message: 'Espécie inválida' }) }),
            dataNascimento: z.string().min(1, 'Data de nascimento é obrigatória'),
            descricao: z.string().optional(),
            status: z.enum(['ADOTADO', 'DISPONIVEL'], { errorMap: () => ({ message: 'Status inválido' }) }).optional(),
            peso: z.number(),
            personalidade: z.string().optional(),
            Foto_Pet: z.array(
                z.object({
                    url: z.string().url('URL inválida'),
                })
            ).optional(),
        });

        // Validação dos dados recebidos
        const { nome, especie, dataNascimento, descricao, status, peso, personalidade, Foto_Pet } = createPetSchema.parse(req.body);

        // Cria um novo pet
        const pet = await CreatePet({
            nome,
            especie,
            dataNascimento: new Date(dataNascimento), // Converte para DateTime
            descricao,
            status,
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
