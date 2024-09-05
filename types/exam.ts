import { Timestamp } from "firebase/firestore";

export interface Exam {
    id: string;
    analitos: string[];
    data: Timestamp[];
    ficha: string[];
    limInferior: number[];
    limSuperior: number[];
    resultados: number[];
    refVariaIdade: boolean[];
    unidade: string[];
    valoresReferencia: string[];
    slug: string;
}
