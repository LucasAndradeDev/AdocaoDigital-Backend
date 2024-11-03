// Service para atualizar um adotante
import { prisma } from "../../database/prisma-client";
import type { Adotante } from "@prisma/client";
import bcrypt from "bcrypt";

// Interface para os dados do adotante
interface UpdateAdotanteProps {
    id: string;
    nome?: string;
    sobrenome?: string;
    email?: string;
    password?: string;
    telefone?: string;
    endereco?: {
        id?: string;
        rua?: string;
        bairro?: string;
        cidade?: string;
        numero_residencia?: string;
    };
}

// Função para atualizar um adotante
export async function UpdateAdotante({
    id,
    nome,
    sobrenome,
    email,
    password,
    telefone,
    endereco
}: UpdateAdotanteProps): Promise<Adotante | null> { // Use o tipo Adotante para o retorno

    // Verifica se o ID do adotante existe
    const adotanteExists = await prisma.adotante.findUnique({
        where: {
            id
        }
    });

    if (!adotanteExists) {
        throw new Error("Adotante inexistente, tente novamente");
    }

    // Verifica se o email existe
    if (email) { // Se o email for fornecido
        const emailExists = await prisma.adotante.findUnique({ // Verifica se o email existe
            where: {
                email
            }
        });

        if (emailExists && emailExists.id !== id) { // Se o dono do email for diferente do adotante atual
            throw new Error("Email já existe, tente novamente");
        }
    }

    // Interface para os dados para atualização
    interface UpdateData {
        nome?: string;
        sobrenome?: string;
        email?: string;
        password?: string;
        telefone?: string;
    }

    // Prepara os dados para atualização
    const updateData: UpdateData = {
        nome,
        sobrenome,
        email,
        telefone,
    };

    // Verificar se o usuário quer alterar a senha
    if (password) {
        // Hash da senha
        updateData.password = await bcrypt.hash(password, 10); // Adiciona a senha hash ao objeto de atualização
    }

    // Atualização do adotante
    const adotante = await prisma.adotante.update({
        where: {
            id
        },
        data: {
            ...updateData, // Espalha os dados a serem atualizados
            enderecos: {
                update: endereco ? { // Atualiza o endereço somente se fornecido
                    where: {
                        id: endereco.id, // Certifique-se de que o ID do endereço é fornecido
                    },
                    data: {
                        rua: endereco.rua,
                        bairro: endereco.bairro,
                        cidade: endereco.cidade,
                        numero_residencia: endereco.numero_residencia,
                    }
                } : undefined // Se não houver endereço, não atualiza
            }
        }
    });

    console.log("Adotante atualizado com sucesso! Dados:", adotante);

    return adotante; // Retorna o adotante atualizado
}
