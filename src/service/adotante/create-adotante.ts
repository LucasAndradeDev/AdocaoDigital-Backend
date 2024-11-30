// Service para criar um adotante
import { prisma } from "../../database/prisma-client";
import type { Adotante } from "@prisma/client";
import bcrypt from "bcrypt"; // Lib para criptografia de senhas
import crypto from "node:crypto"; // Lib para gerar ids unicos e aleatórios

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
    endereco: EnderecoProps; 
}



export async function CreateAdotante({ nome, sobrenome, email, password, telefone, endereco }: CreateAdotanteProps): Promise<Adotante> {
    try {
        console.log("Depurando os dados recebidos no service:", { nome, sobrenome, email, password, telefone, endereco });

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
                enderecos: true,
            },
        });

        console.log("Adotante criado no service:", adotante);

        return adotante;
    } catch (error) {
        console.error("Erro ao criar adotante:", error);
        throw new Error("Não foi possível criar o adotante. Verifique os logs.");
    }
}
