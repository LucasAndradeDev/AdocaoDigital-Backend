import z from "zod";

// Definindo o arquivo para centralização das variaveis de ambiente
const envSchema = z.object({
    DATABASE_URL: z.string().url(), // Conferindo se o valor informado é uma URL
});

export const env = envSchema.parse(process.env); // Faz o parse da variavel de ambiente