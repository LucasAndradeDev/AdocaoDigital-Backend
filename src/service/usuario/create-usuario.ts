import { prisma } from "../../database/prisma-client";
import bcrypt from "bcrypt";
import crypto from "node:crypto";

interface EnderecoProps {
    rua: string;
    bairro: string;
    cidade: string;
    numero_residencia: string;
}

interface CreateUsuarioProps {
    nome: string;
    sobrenome: string;
    email: string;
    password: string;
    telefone: string;
    endereco: EnderecoProps;
}

export async function CreateUser({ nome, sobrenome, email, password, telefone, endereco }: CreateUsuarioProps) {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        // Criação do usuário no banco de dados com mais informações
        const usuario = await prisma.usuario.create({
            data: {
                id: crypto.randomUUID(),
                nome,
                sobrenome,
                email,
                password: hashedPassword,
                telefone,
                enderecos: {
                    create: {
                        rua: endereco.rua,
                        bairro: endereco.bairro,
                        cidade: endereco.cidade,
                        numero_residencia: endereco.numero_residencia,
                    },
                },
            },
            include: {
                enderecos: true,           // Inclui os endereços associados
                petsAdicionados: true,     // Inclui os pets do usuário (se houver)
            },
        });

        // Retornando os dados do usuário com mais detalhes
        return {
            id: usuario.id,
            nome: usuario.nome,
            sobrenome: usuario.sobrenome,
            email: usuario.email,
            telefone: usuario.telefone,
            endereco: usuario.enderecos,    // Retorna o endereço do usuário
            petsAdicionados: usuario.petsAdicionados, // Retorna os pets do usuário
            message: 'Usuário criado com sucesso!'  // Mensagem de sucesso
        };
    } catch (error) {
        console.error("Erro ao criar usuário:", error);
        throw new Error("Não foi possível criar o usuário. Verifique os logs.");
    }
}
