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

export interface FilterInterface{
    analito?: boolean;
    resultado?: boolean;
    unidade?: boolean;
    valorReferencia?: boolean;
    referenciaIdade?: boolean;
    limiteSuperior?: boolean;
    limiteInferior?: boolean;
    ficha?: boolean;
    seconds?: boolean;
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
const userId = auth.currentUser?.uid ?? "";
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
    filters?: FilterInterface
): Promise<AnalitoInfo[]> {
    const hasFilters = filters && Object.keys(filters).length > 0;

    const {
        analito = false, // Valor padrão false, não é obrigatório
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
        const exams: Exam[] = await getExamsFromCache(userId);
        const results: AnalitoInfo[] = [];

        positions.forEach(({ examIndex, analyteIndex }) => {
            const exam = exams[examIndex];

            if (exam && exam.ANALITOS && analyteIndex < exam.ANALITOS.length) {
                const result: Partial<AnalitoInfo> = {};
                
                // Somente adiciona o nome do analito se o filtro estiver ativado
                if (analito) {
                    result.analitos = exam.ANALITOS[analyteIndex];
                }

                // Checagem de seconds
                if (seconds && exam.Data && analyteIndex < exam.Data.length) {
                    result.seconds = new Date(
                        exam.Data[analyteIndex].seconds * 1000
                    );
                }

                // Checagem de resultado
                if (
                    resultado &&
                    exam.RESULTADOS &&
                    analyteIndex < exam.RESULTADOS.length &&
                    exam.RESULTADOS[analyteIndex] !== null
                ) {
                    result.resultado = exam.RESULTADOS[analyteIndex];
                } else if (resultado && !exam.RESULTADOS?.[analyteIndex]) {
                    return;
                }

                // Checagem de unidade
                if (
                    unidade &&
                    exam.Unidade &&
                    analyteIndex < exam.Unidade.length &&
                    exam.Unidade[analyteIndex] !== null
                ) {
                    result.unidade = exam.Unidade[analyteIndex];
                } else if (unidade && !exam.Unidade?.[analyteIndex]) {
                    return;
                }

                // Checagem de valor de referência
                if (
                    valorReferencia &&
                    exam["VALORES DE REFERÊNCIA"] &&
                    analyteIndex < exam["VALORES DE REFERÊNCIA"].length &&
                    exam["VALORES DE REFERÊNCIA"][analyteIndex] !== null
                ) {
                    result.valorReferencia =
                        exam["VALORES DE REFERÊNCIA"][analyteIndex];
                } else if (valorReferencia && !exam["VALORES DE REFERÊNCIA"]?.[analyteIndex]) {
                    return;
                }

                // Checagem de referência por idade
                if (
                    referenciaIdade &&
                    exam["Referência varia com idade"] &&
                    analyteIndex < exam["Referência varia com idade"].length &&
                    exam["Referência varia com idade"][analyteIndex] !== null
                ) {
                    result.referenciaIdade =
                        exam["Referência varia com idade"][analyteIndex];
                } else if (referenciaIdade && !exam["Referência varia com idade"]?.[analyteIndex]) {
                    return;
                }

                // Checagem de limite superior
                if (
                    limiteSuperior &&
                    exam["Limite superior"] &&
                    analyteIndex < exam["Limite superior"].length &&
                    exam["Limite superior"][analyteIndex] !== null
                ) {
                    result.limiteSuperior =
                        exam["Limite superior"][analyteIndex];
                } else if (limiteSuperior && !exam["Limite superior"]?.[analyteIndex]) {
                    return;
                }

                // Checagem de limite inferior
                if (
                    limiteInferior &&
                    exam["Limite inferior"] &&
                    analyteIndex < exam["Limite inferior"].length &&
                    exam["Limite inferior"][analyteIndex] !== null
                ) {
                    result.limiteInferior =
                        exam["Limite inferior"][analyteIndex];
                } else if (limiteInferior && !exam["Limite inferior"]?.[analyteIndex]) {
                    return;
                }

                // Checagem de ficha
                if (
                    ficha &&
                    exam.Ficha &&
                    analyteIndex < exam.Ficha.length &&
                    exam.Ficha[analyteIndex] !== null
                ) {
                    result.ficha = exam.Ficha[analyteIndex];
                } else if (ficha && !exam.Ficha?.[analyteIndex]) {
                    return;
                }

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
    filters?: FilterInterface
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

export async function getExamsFromCacheFiltered(
    userId: string, // Adicionando userId como argumento
    filters?: FilterInterface // O filtro continua sendo opcional
): Promise<Exam[]> {
    const hasFilters = filters && Object.keys(filters).length > 0;

    // Desestruturação dos filtros e aplicação de valores padrão
    const {
        analito = false,
        resultado = !hasFilters,
        unidade = !hasFilters,
        valorReferencia = !hasFilters,
        referenciaIdade = !hasFilters,
        limiteSuperior = !hasFilters,
        limiteInferior = !hasFilters,
        ficha = !hasFilters,
        seconds = !hasFilters || filters?.seconds === true,
    } = filters || {};

    try {
        // Recupera os exames do cache usando o userId fornecido
        const exams: Exam[] = await getExamsFromCache(userId);
        const filteredExams: Exam[] = [];

        // Aplica os filtros aos exames
        exams.forEach((exam) => {
            const filteredExam: Partial<Exam> = {};

            // Aplicando filtro de ANALITOS
            if (analito && exam.ANALITOS) {
                filteredExam.ANALITOS = exam.ANALITOS;
            }

            // Aplicando filtro de seconds (Data)
            if (seconds && exam.Data) {
                filteredExam.Data = exam.Data;
            }

            // Aplicando filtro de RESULTADOS
            if (resultado && exam.RESULTADOS) {
                filteredExam.RESULTADOS = exam.RESULTADOS;
            }

            // Aplicando filtro de Unidade
            if (unidade && exam.Unidade) {
                filteredExam.Unidade = exam.Unidade;
            }

            // Aplicando filtro de VALORES DE REFERÊNCIA
            if (valorReferencia && exam["VALORES DE REFERÊNCIA"]) {
                filteredExam["VALORES DE REFERÊNCIA"] = exam["VALORES DE REFERÊNCIA"];
            }

            // Aplicando filtro de Referência varia com idade
            if (referenciaIdade && exam["Referência varia com idade"]) {
                filteredExam["Referência varia com idade"] = exam["Referência varia com idade"];
            }

            // Aplicando filtro de Limite superior
            if (limiteSuperior && exam["Limite superior"]) {
                filteredExam["Limite superior"] = exam["Limite superior"];
            }

            // Aplicando filtro de Limite inferior
            if (limiteInferior && exam["Limite inferior"]) {
                filteredExam["Limite inferior"] = exam["Limite inferior"];
            }

            // Aplicando filtro de Ficha
            if (ficha && exam.Ficha) {
                filteredExam.Ficha = exam.Ficha;
            }

            // Adiciona o exame filtrado ao array final se houver dados filtrados
            if (Object.keys(filteredExam).length > 0) {
                filteredExams.push(filteredExam as Exam);
            }
        });
        console.log("Exames filtrados:", filteredExams);

        return filteredExams;
    } catch (error) {
        console.error("Erro ao buscar exames filtrados:", error);
        return [];
    }
}


const filtersF = {
    resultado: true, // Queremos ver o resultado
    unidade: true, // Queremos ver a unidade
    valorReferencia: true, // Queremos ver o valor de referência
};

getExamsFromCacheFiltered(userId,filtersF).then((filteredExams) => {
    console.log("Exames filtrados:");
    console.log(filteredExams);
});


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
