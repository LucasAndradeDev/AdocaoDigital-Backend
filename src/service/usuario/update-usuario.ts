import { prisma } from "../../database/prisma-client";
import type { Usuario } from "@prisma/client";
import bcrypt from "bcrypt";

// Interface para os dados do usuário
interface UpdateUsuarioProps {
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

// Função para atualizar um usuário
export async function UpdateUsuario({
    id,
    nome,
    sobrenome,
    email,
    password,
    telefone,
    endereco
}: UpdateUsuarioProps): Promise<Usuario | null> { // Use o tipo Usuario para o retorno

    // Verifica se o ID do usuário existe
    const usuarioExists = await prisma.usuario.findUnique({
        where: {
            id
        }
    });

    if (!usuarioExists) {
        throw new Error("Usuário inexistente, tente novamente");
    }

    // Verifica se o email existe
    if (email) { // Se o email for fornecido
        const emailExists = await prisma.usuario.findUnique({ // Verifica se o email existe
            where: {
                email
            }
        });

        if (emailExists && emailExists.id !== id) { // Se o dono do email for diferente do usuário atual
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

    // Atualização do usuário
    const usuario = await prisma.usuario.update({
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

    console.log("Usuário atualizado com sucesso! Dados:", usuario);

    return usuario; // Retorna o usuário atualizado
}
