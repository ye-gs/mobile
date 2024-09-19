import { getExamsFromCache } from "@/cache/index";
import { auth } from "@/firebase/index";

interface Exam {
  ANALITOS: string[];
  Data?: {            // Data é opcional, já que pode não existir
    seconds: number;
    nanoseconds: number;
  };
}

interface ItemPosition {
  examIndex: number;    // Posição do exame no array de exames
  analyteIndex: number; // Posição do item dentro de ANALITOS
}

interface AnalyteWithSeconds {
  analyteIndex: number;
  examIndex: number;
  seconds?: number;  // seconds agora é opcional
}

// Função que busca os valores de seconds com base nas posições fornecidas
export async function GetSecondsForPositions(positions: ItemPosition[]): Promise<AnalyteWithSeconds[]> {
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
      if (exam && exam.ANALITOS && exam.ANALITOS[analyteIndex] !== undefined) {
        // Verifica se o exame possui uma Data válida com seconds
        if ((exam.Data && exam.Data[examIndex].seconds !== undefined) && (exam.RESULTADOS[examIndex]!== undefined)&&(exam.Unidade[examIndex]!== null)) {
          // Armazena o campo seconds da Data

          results.push({
            analyteIndex,
            examIndex,
            seconds: new Date (exam.Data[examIndex].seconds*1000),  // Retorna o valor de seconds
            resultado: exam.RESULTADOS[examIndex],
            unidade: exam.Unidade[examIndex],
          });
        } else {
          console.warn(`Data ou seconds ausente no exame ${examIndex}`);
          // Caso Data ou seconds não exista, adiciona undefined
          results.push({
            analyteIndex,
            examIndex,
            seconds: undefined,  // Deixa seconds undefined explicitamente
          });
        }
      } else {
        console.warn(`Exame ou ANALITOS ausente no exame ${examIndex}`);
        results.push({
          analyteIndex,
          examIndex,
          seconds: undefined,  // Deixa undefined se o exame não estiver correto
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

// Função que busca os valores de seconds com base nas posições fornecidas
interface Exam {
  ANALITOS: string[];
}

interface ItemPosition {
  examIndex: number;    // Posição do exame no array de exames
  analyteIndex: number; // Posição do item dentro de ANALITOS
}

export async function SearchItem(item: string): Promise<ItemPosition[]> {
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
/*
// Exemplo de uso
SearchItem('VCM').then(resultado => {
  console.log("SearchItem")
  console.log({resultado});  // Exibe [{ examIndex: X, analyteIndex: Y }, ...]
  GetSecondsForPositions(resultado).then(resultado => {
    console.log("GetSecondsForPositions")
    console.log(resultado);  // Exibe [{ analyteIndex: Y, examIndex: X, seconds: Z }, ...]
  }, error => {
    console.error("Erro ao buscar second:", error);
  });
});
// Exemplo de uso
const positions: ItemPosition[] = [
  { examIndex: 1, analyteIndex: 342 },
];

GetSecondsForPositions(positions).then(resultado => {
  console.log(resultado);  // Exibe [{ analyteIndex: 342, examIndex: 1, seconds: 1549843200 }]
});
*/
