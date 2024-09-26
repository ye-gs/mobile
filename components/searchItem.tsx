import { getExamsFromCache } from "@/cache/index";
import { auth } from "@/firebase/index";

interface Exam {
    ANALITOS: string[];
    Data: {
        seconds: number;
        nanoseconds: number;
    }[];
    RESULTADOS?: string[];
    Unidade?: string[];
    "VALORES DE REFERÊNCIA"?: string[];
    "Referência varia com idade"?: string[];
    "Limite superior"?: string[];
    "Limite inferior"?: string[];
    Ficha?: string[];
}

interface ItemPosition {
    examIndex: number; // Posição do exame no array de exames
    analyteIndex: number; // Posição do item dentro de ANALITOS
}

export interface AnalitoInfo {
    analyteIndex: number;
    examIndex: number;
    seconds: number | undefined | Date;
    resultado?: string;
    unidade?: string;
    analitos?: string;
    valorReferencia?: string;
    referenciaIdade?: string;
    limiteSuperior?: string | number;
    limiteInferior?: string | number;
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
    positions: ItemPosition[],
    filters?: {
        resultado?: boolean;
        unidade?: boolean;
        valorReferencia?: boolean;
        referenciaIdade?: boolean;
        limiteSuperior?: boolean;
        limiteInferior?: boolean;
        ficha?: boolean;
        seconds?: boolean;
    }
): Promise<AnalitoInfo[]> {
    const hasFilters = filters && Object.keys(filters).length > 0;

    const {
        resultado = !hasFilters,
        unidade = !hasFilters,
        valorReferencia = !hasFilters,
        referenciaIdade = !hasFilters,
        limiteSuperior = !hasFilters,
        limiteInferior = !hasFilters,
        ficha = !hasFilters,
        seconds = !hasFilters || filters?.seconds === true,
    } = filters || {};

    const userId = auth.currentUser?.uid ?? "";

    try {
        // Recupera os exames do cache e loga os exames
        const exams: Exam[] = await getExamsFromCache(userId);

        const results: AnalitoInfo[] = [];

        // Itera sobre as posições fornecidas
        positions.forEach(({ examIndex, analyteIndex }) => {
            const exam = exams[examIndex];

            if (
                exam &&
                exam.ANALITOS &&
                exam.ANALITOS[analyteIndex] !== undefined
            ) {
                const result: Partial<AnalitoInfo> = {};

                if (seconds && exam.Data && exam.Data[analyteIndex]) {
                    result.seconds = new Date(
                        exam.Data[analyteIndex].seconds * 1000
                    );
                }

                if (
                    resultado &&
                    exam.RESULTADOS &&
                    exam.RESULTADOS[analyteIndex] !== null
                ) {
                    result.resultado = exam.RESULTADOS[analyteIndex];
                } else if (resultado) {
                    return; // Se o valor de resultado for null, pula este item
                }

                if (
                    unidade &&
                    exam.Unidade &&
                    exam.Unidade[analyteIndex] !== null
                ) {
                    result.unidade = exam.Unidade[analyteIndex];
                } else if (unidade) {
                    return; // Se o valor de unidade for null, pula este item
                }

                if (
                    valorReferencia &&
                    exam["VALORES DE REFERÊNCIA"] &&
                    exam["VALORES DE REFERÊNCIA"][analyteIndex] !== null
                ) {
                    result.valorReferencia =
                        exam["VALORES DE REFERÊNCIA"][analyteIndex];
                } else if (valorReferencia) {
                    return; // Se o valor de valorReferencia for null, pula este item
                }

                if (
                    referenciaIdade &&
                    exam["Referência varia com idade"] &&
                    exam["Referência varia com idade"][analyteIndex] !== null
                ) {
                    result.referenciaIdade =
                        exam["Referência varia com idade"][analyteIndex];
                } else if (referenciaIdade) {
                    return; // Se o valor de referenciaIdade for null, pula este item
                }

                if (
                    limiteSuperior &&
                    exam["Limite superior"] &&
                    exam["Limite superior"][analyteIndex] !== null
                ) {
                    result.limiteSuperior =
                        exam["Limite superior"][analyteIndex];
                } else if (limiteSuperior) {
                    return; // Se o valor de limiteSuperior for null, pula este item
                }

                if (
                    limiteInferior &&
                    exam["Limite inferior"] &&
                    exam["Limite inferior"][analyteIndex] !== null
                ) {
                    result.limiteInferior =
                        exam["Limite inferior"][analyteIndex];
                } else if (limiteInferior) {
                    return; // Se o valor de limiteInferior for null, pula este item
                }

                if (ficha && exam.Ficha && exam.Ficha[analyteIndex] !== null) {
                    result.ficha = exam.Ficha[analyteIndex];
                } else if (ficha) {
                    return; // Se o valor de ficha for null, pula este item
                }

                // Só adiciona o resultado se tiver pelo menos um dado relevante
                if (Object.keys(result).length > 0) {
                    results.push(result as AnalitoInfo);
                }
            } else {
                console.warn(
                    `Invalid exam or analyte at position: ${examIndex}, ${analyteIndex}`
                );
            }
        });

        return results;
    } catch (error) {
        console.error("Erro ao buscar exames:", error);
        return [];
    }
}

export async function GetItemInfo(
    item: string,
    filters?: {
        resultado?: boolean;
        unidade?: boolean;
        valorReferencia?: boolean;
        referenciaIdade?: boolean;
        limiteSuperior?: boolean;
        limiteInferior?: boolean;
        ficha?: boolean;
        seconds?: boolean;
    }
) {
    try {
        const resultadoNome = await SearchItemByName(item);
        const resultadoPosicao = await SearchItemByPosition(
            resultadoNome,
            filters
        );
        return resultadoPosicao;
    } catch (error) {
        console.error("Erro ao buscar informações do item:", error);
        throw error; // Re-lança o erro para que o chamador possa lidar com ele
    }
}

// Exemplo de uso da função SearchItemByName com o item "VCM"
if (false) {
    SearchItemByName("VCM").then((resultado) => {
        console.log("SearchItemByName");
        console.log({ resultado }); // Exibe [{ examIndex: X, analyteIndex: Y }, ...]
        SearchItemByPosition(resultado).then((resultado) => {
            console.log("SearchItemByPosition");
            console.log(resultado); // Exibe [{ analyteIndex: Y, examIndex: X, seconds: Z }, ...]
        });
    });
}

// Exemplo de uso da função SearchItemByPosition com posições específicas
const positions: ItemPosition[] = [{ examIndex: 0, analyteIndex: 3 }];

SearchItemByPosition(positions, { resultado: true, seconds: true }).then(
    (resultado) => {
        console.log("SearchItemByPosition Solo");
        console.log(resultado); // Exibe [{ analyteIndex: 342, examIndex: 1, seconds: 1549843200 }]
    }
);

// Suponha que você queira buscar informações sobre o item "VCM"
const item = "PTH";
const filters = {
    resultado: true, // Queremos que o resultado seja incluído
    unidade: true, // Queremos que a unidade seja incluída
    valorReferencia: true, // Queremos o valor de referência
    seconds: true, // Queremos que a data/tempo seja incluída
};

// Exemplo de uso da função GetItemInfo com o item "VCM" e os filtros
GetItemInfo(item, filters)
    .then((resultadoPosicao) => {
        console.log("GetItemInfo resultado:");
        console.log(resultadoPosicao); // Aqui você verá as informações sobre o item "VCM" conforme os filtros fornecidos
    })
    .catch((error) => {
        console.error("Erro ao obter informações do item:", error);
    });
