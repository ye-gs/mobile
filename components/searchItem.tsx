import { getExamsFromCache } from "@/cache/index";
import { auth } from "@/firebase/index";

interface Exam {
    ANALITOS: string[];
    Data?: {
        // Data é opcional, já que pode não existir
        seconds: number;
        nanoseconds: number;
    };
    RESULTADOS?: string[];
    Unidade?: string[];
    "VALORES DE REFERÊNCIA"?: string[];
    "Referência varia com idade"?: string[];
    "Limite superior"?: any;
    "Limite inferior"?: string[];
    Ficha?: string[];
}

interface ItemPosition {
    examIndex: number; // Posição do exame no array de exames
    analyteIndex: number; // Posição do item dentro de ANALITOS
}

interface AnalyteWithSeconds {
    analyteIndex: number;
    examIndex: number;
    seconds?: number;
    resultado?: string;
    unidade?: string;
    analitos?: string;
    valorReferencia?: string;
    referenciaIdade?: string;
    limiteSuperior?: any;
    limiteInferior?: any;
    ficha?: string;
}

export async function SearchItemByName(item: string): Promise<ItemPosition[]> {
    const userId = auth.currentUser?.uid ?? "";

    try {
        // Recupera os exames do cache (aguardando a Promise resolver)
        const exams: Exam[] = await getExamsFromCache(userId);

        // Armazena as posições onde o item foi encontrado
        const positions: ItemPosition[] = [];

        // Itera sobre os exames e busca o item em cada ANALITOS
        exams.forEach((exam, examIndex) => {
            exam.ANALITOS.forEach((analyte, analyteIndex) => {
                if (analyte === item) {
                    // Armazena a posição do exame e a posição dentro de ANALITOS
                    positions.push({ examIndex, analyteIndex });
                }
            });
        });

        // Retorna as posições onde o item foi encontrado
        return positions;
    } catch (error) {
        console.error("Erro ao buscar exames:", error);
        return [];
    }
}

export async function SearchItemByPosition(
    positions: ItemPosition[]
): Promise<AnalyteWithSeconds[]> {
    const userId = auth.currentUser?.uid ?? "";

    try {
        // Recupera os exames do cache (aguardando a Promise resolver)
        const exams: Exam[] = await getExamsFromCache(userId);

        // Armazena os resultados com os valores de seconds
        const results: AnalyteWithSeconds[] = [];

        // Itera sobre as posições fornecidas
        positions.forEach(({ examIndex, analyteIndex }) => {
            const exam = exams[examIndex];

            // Verifica se o exame e ANALITOS existem
            if (
                exam &&
                exam.ANALITOS &&
                exam.ANALITOS[analyteIndex] !== undefined
            ) {
                // Verifica se o exame possui uma Data válida com seconds
                if (
                    exam.Data &&
                    exam.Data[analyteIndex].seconds !== undefined &&
                    exam.RESULTADOS &&
                    exam.RESULTADOS[analyteIndex] !== undefined &&
                    exam.Unidade &&
                    exam.Unidade[analyteIndex] !== undefined
                ) {
                    // Armazena o campo seconds da Data
                    results.push({
                        analyteIndex,
                        examIndex,
                        seconds: new Date(exam.Data[examIndex].seconds),
                        resultado: exam.RESULTADOS[analyteIndex],
                        unidade: exam.Unidade[analyteIndex],
                        analitos: exam.ANALITOS[analyteIndex],
                        valorReferencia: exam["VALORES DE REFERÊNCIA"]
                            ? exam["VALORES DE REFERÊNCIA"][analyteIndex]
                            : undefined,
                        referenciaIdade: exam["Referência varia com idade"]
                            ? exam["Referência varia com idade"][analyteIndex]
                            : undefined,
                        limiteSnferior: exam["Limite superior"]
                            ? exam["Limite superior"][analyteIndex]
                            : undefined,
                        limiteInferior: exam["Limite inferior"]
                            ? exam["Limite inferior"][analyteIndex]
                            : undefined,
                        ficha: exam.Ficha
                            ? exam.Ficha[analyteIndex]
                            : undefined,
                    });
                } else {
                    console.warn(
                        `Data ou seconds ausente no exame ${examIndex}`
                    );
                    // Caso Data ou seconds não exista, adiciona undefined
                    results.push({
                        analyteIndex,
                        examIndex,
                        seconds: undefined, // Deixa seconds undefined explicitamente
                    });
                }
            } else {
                console.warn(`Exame ou ANALITOS ausente no exame ${examIndex}`);
                results.push({
                    analyteIndex,
                    examIndex,
                    seconds: undefined, // Deixa undefined se o exame não estiver correto
                });
            }
        });

        // Retorna os resultados com os valores de seconds
        return results;
    } catch (error) {
        console.error("Erro ao buscar exames:", error);
        return [];
    }
}

export async function GetItemInfo(item: string) {
    try {
        const resultadoNome = await SearchItemByName(item);
        const resultadoPosicao = await SearchItemByPosition(resultadoNome);
        return resultadoPosicao;
    } catch (error) {
        console.error("Erro ao buscar informações do item:", error);
        throw error; // Re-lança o erro para que o chamador possa lidar com ele
    }
}

/*
// Exemplo de uso da função SearchItemByName com o item "VCM"
SearchItemByName("VCM").then((resultado) => {
    console.log("SearchItemByName");
    console.log({ resultado }); // Exibe [{ examIndex: X, analyteIndex: Y }, ...]
    SearchItemByPosition(resultado).then(
        (resultado) => {
            console.log("SearchItemByPosition");
            console.log(resultado); // Exibe [{ analyteIndex: Y, examIndex: X, seconds: Z }, ...]
        },
    );
});

// Exemplo de uso da função SearchItemByPosition com posições específicas
const positions: ItemPosition[] = [{ examIndex: 1, analyteIndex: 342 }];

SearchItemByPosition(positions).then((resultado) => {
  console.log("SearchItemByPosition Solo");
    console.log(resultado); // Exibe [{ analyteIndex: 342, examIndex: 1, seconds: 1549843200 }]
});
*/
