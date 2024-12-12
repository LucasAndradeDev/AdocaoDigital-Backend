import { Tamanho } from "@prisma/client"; // Importar o enum Tamanho
import type { Especie } from "@prisma/client"; // Importar o enum Especie

// Função para calcular o tamanho de um animal com base na espécie e no peso
export function calcularTamanho(especie: Especie, peso: number): Tamanho {
    /**
     * Mapeamento das categorias de tamanho por espécie.
     * Cada espécie possui limites de peso associados a uma categoria:
     * PEQUENO, MÉDIO e GRANDE.
     */

    const tamanhoPorEspecie: { [keyEspecie: string]: { [keyPeso: number]: Tamanho } } = {
        CACHORRO: {
            0: Tamanho.PEQUENO,    // Raças pequenas ou filhotes
            10: Tamanho.MEDIO,     // Raças médias (ex: Beagle, Cocker Spaniel)
            20: Tamanho.GRANDE,    // Raças grandes (ex: Labrador, Pastores)
        },
        GATO: {
            0: Tamanho.PEQUENO,    // Filhotes e raças pequenas
            3: Tamanho.MEDIO,      // Gatos domésticos de porte médio
            6: Tamanho.GRANDE,     // Gatos de raças grandes (ex: Maine Coon)
        },
        // Outras espécies seguem o mesmo padrão
        MACACO: { 0: Tamanho.PEQUENO, 8: Tamanho.MEDIO, 20: Tamanho.GRANDE },
        LAGARTO: { 0: Tamanho.PEQUENO, 1: Tamanho.MEDIO, 5: Tamanho.GRANDE },
        PASSARO: { 0: Tamanho.PEQUENO, 1: Tamanho.MEDIO, 5: Tamanho.GRANDE },
        COELHO: { 0: Tamanho.PEQUENO, 1: Tamanho.MEDIO, 5: Tamanho.GRANDE },
        HAMSTER: { 0: Tamanho.PEQUENO, 1: Tamanho.MEDIO, 5: Tamanho.GRANDE },
        PEIXE: { 0: Tamanho.PEQUENO, 2: Tamanho.MEDIO, 7: Tamanho.GRANDE },
        CAVALO: { 0: Tamanho.PEQUENO, 300: Tamanho.MEDIO, 600: Tamanho.GRANDE },
        PORCO: { 0: Tamanho.PEQUENO, 20: Tamanho.MEDIO, 200: Tamanho.GRANDE },
        IGUANA: { 0: Tamanho.PEQUENO, 1: Tamanho.MEDIO, 5: Tamanho.GRANDE },
        SERPENTE: { 0: Tamanho.PEQUENO, 5: Tamanho.MEDIO, 20: Tamanho.GRANDE },
        TARTARUGA: { 0: Tamanho.PEQUENO, 2: Tamanho.MEDIO, 10: Tamanho.GRANDE },
        OVELHA: { 0: Tamanho.PEQUENO, 30: Tamanho.MEDIO, 60: Tamanho.GRANDE },
        GALINHA: { 0: Tamanho.PEQUENO, 3: Tamanho.MEDIO, 5: Tamanho.GRANDE },
        PATO: { 0: Tamanho.PEQUENO, 2: Tamanho.MEDIO, 5: Tamanho.GRANDE },
    };

    /**
    * Verifica se a espécie fornecida está definida no mapeamento `tamanhoPorEspecie` 
    * e lança um erro se não estiver.
    */
    const especieProcurada = tamanhoPorEspecie[especie];
    if (!especieProcurada) {
        throw new Error(`Espécie não reconhecida: ${especie}`);
    }

    /**
     * Ordena as categorias de peso em ordem decrescente.
     * Isso facilita encontrar a maior categoria que o peso atende.
     */
    const categoriasDeTamanho = Object.entries(especieProcurada)
        .sort(([peso1], [peso2]) => Number(peso2) - Number(peso1)); // Ordena os pesos em ordem decrescente

    // Itera pelas categorias para encontrar o tamanho correspondente ao peso
    for (const [pesoCategoria, tamanho] of categoriasDeTamanho) {
        if (peso >= Number(pesoCategoria)) {
            return tamanho; // Retorna a categoria correspondente
        }
    }

    // Caso nenhum tamanho seja encontrado, assume a menor categoria disponível
    return especieProcurada[0];
}
