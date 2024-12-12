import { prisma } from "../../database/prisma-client";
import type { Usuario } from "@prisma/client"; // Tipo de dado para o usuário
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Interface para os dados do usuário
interface LoginUsuarioProps {
    email: string;
    password: string;
}

// Função para login de usuário
export async function LoginUsuario({ email, password }: LoginUsuarioProps): Promise<{ usuario: Usuario, token: string }> {

    // Verifica se o email existe
    const usuarioExists = await prisma.usuario.findUnique({
        where: { email },
        include: {
            enderecos: {
                select: {
                    id: true,
                    rua: true,
                    bairro: true,
                    cidade: true,
                    numero_residencia: true
                }
            },
            petsAdicionados: {
                select: {
                    id: true,
                    nome: true,
                    especie: true,
                    data_nascimento: true,
                    descricao: true,
                    tamanho: true,
                    status: true,
                    peso: true,
                    personalidade: true,
                    Foto_Pet: {  
                        select: {
                            url: true
                        }
                    }
                }
            }
        }
    });

    if (!usuarioExists) {
        throw new Error("Email inválido, tente novamente");
    }

    // Verifica se a senha corresponde ao hash armazenado
    const passwordMatches = await bcrypt.compare(password, usuarioExists.password);
    if (!passwordMatches) {
        throw new Error("Senha inválida, tente novamente");
    }

    // Gerar token JWT para o usuário
    const token = jwt.sign({ id: usuarioExists.id }, "chave_secreta", { expiresIn: "1h" });

    return { usuario: usuarioExists, token };
}
