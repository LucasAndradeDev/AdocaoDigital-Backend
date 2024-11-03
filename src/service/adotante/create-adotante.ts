// Service para criar um adotante
import { prisma } from "../../database/prisma-client";
import type { Adotante } from "@prisma/client";
import bcrypt from "bcrypt";
import crypto from "node:crypto"; // Importar o módulo crypto

// Interface para os dados do adotante
interface EnderecoProps {
    rua: string;
    bairro: string;
    cidade: string;
    numero_residencia: string;
}

interface CreateAdotanteProps {
    nome: string;
    sobrenome: string;
    email: string;
    password: string;
    telefone: string;
    endereco: EnderecoProps; // Altera para usar a interface EnderecoProps
}

// Função para criar um adotante
export async function CreateAdotante({ nome, sobrenome, email, password, telefone, endereco }: CreateAdotanteProps): Promise<Adotante> {

    // Verifica se o email ja existe
    const emailExists = await prisma.adotante.findUnique({
        where: {
            email
        }
    });

    if (emailExists) {
        throw new Error("Email ja existe, tente novamente");
    }



    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criação do adotante
    const adotante = await prisma.adotante.create({
        data: {
            id: crypto.randomUUID(),
            nome,
            sobrenome,
            email,
            password: hashedPassword,
            telefone,
            enderecos: { // Correção: use 'enderecos' para criar o relacionamento
                create: {
                    rua: endereco.rua, // Acesso correto aos campos de endereço
                    bairro: endereco.bairro,
                    cidade: endereco.cidade,
                    numero_residencia: endereco.numero_residencia,
                }
            }
        },
        include: {
            enderecos: true, // Inclui os dados do endereço no retorno, se necessário
        }
    });

    return adotante;
}
