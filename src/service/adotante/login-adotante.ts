// Service para login de adotante
import { prisma } from "../../database/prisma-client";
import type { Adotante } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Interface para os dados do adotante
interface LoginAdotanteProps {
    email: string;
    password: string;
}

// Função para login de adotante
export async function LoginAdotante({ email, password }: LoginAdotanteProps): Promise<{ adotante: Adotante, token: string }> {

    // Verifica se o email existe
    const adotanteExists = await prisma.adotante.findUnique({
        where: { email }
    });

    if (!adotanteExists) {
        throw new Error("Email inválido, tente novamente");
    }

    // Verifica se a senha corresponde ao hash armazenado
    const passwordMatches = await bcrypt.compare(password, adotanteExists.password);
    if (!passwordMatches) {
        throw new Error("Senha inválida, tente novamente");
    }

    // Gerar token JWT para o adotante
    const token = jwt.sign({ id: adotanteExists.id }, "chave_secreta", { expiresIn: "1h" });

    return { adotante: adotanteExists, token };
}
