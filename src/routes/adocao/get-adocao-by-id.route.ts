import type { Request, Response } from 'express';
import { Router } from 'express';
import { z } from 'zod';
import { GetAdocaoById } from '../../service/adocao/get-adocao-by-id';

// Definindo o schema de validação de ID fora da rota
const idSchema = z.string().min(1, 'ID de adoção é obrigatório');

const router = Router();

// Rota para pegar uma adoção
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
router.get('/:id', async (req: Request, res: Response): Promise<any> => {
  try {
    // Validação do ID de adoção
    const adocaoId = idSchema.parse(req.params.id);

    // Busca a adoção no banco de dados
    const adocao = await GetAdocaoById(adocaoId);

    // Verifica se a adoção existe
    if (!adocao) {
      return res.status(404).json({
        error: 'Adoção não encontrada.',
        message: `Nenhuma adoção encontrada com o ID ${adocaoId}.`,
      });
    }

    // Retorna a adoção encontrada
    return res.status(200).json(adocao);

  } catch (error) {
    // Verificação se o erro é de validação do Zod
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: 'Dados inválidos',
        message: 'O ID de adoção fornecido é inválido.',
        details: error.errors,
      });
    }

    // Caso o erro seja do tipo Error
    if (error instanceof Error) {
      console.error('Erro ao obter adoção:', error);
      return res.status(500).json({
        error: 'Erro interno do servidor',
        message: 'Ocorreu um erro ao tentar processar sua solicitação.',
      });
    }

    // Caso o erro não seja tratado
    console.error('Erro inesperado:', error);
    return res.status(500).json({
      error: 'Erro desconhecido',
      message: 'Ocorreu um erro inesperado, tente novamente mais tarde.',
    });
  }
});

export default router;
