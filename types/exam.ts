export interface Exam {
    id: string;
    analitos: string[];
    data: Date[];
    ficha: string[];
    limInferior: number[];
    limSuperior: number[];
    resultados: number[];
    refVariaIdade: boolean[];
    unidade: string[];
    valoresReferencia: string[];
    slug: string;
}
