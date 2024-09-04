import { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db, auth } from "@/firebase";
import { Exam } from "@/types/exam";

export function useExams() {
    const [exams, setExams] = useState<Exam[]>([]);
    const currentUser = auth.currentUser!;

    useEffect(() => {
        fetchExams();
    }, []);

    const fetchExams = async () => {
        const newExams: Exam[] = [];
        try {
            const ExamsCollection = collection(
                db,
                "users/",
                currentUser.uid,
                "exams"
            );
            // get all exams on collection and return
            const appointmentRefs = await getDocs(ExamsCollection);
            if (appointmentRefs.empty) {
                setExams([]);
                return;
            }
            appointmentRefs.docs.map((doc) => {
                const data = doc.data();
                newExams.push({
                    id: doc.id,
                    analitos: data.ANALITOS,
                    data: data.Data,
                    ficha: data.Ficha,
                    limInferior: data["Limite inferior"],
                    limSuperior: data["Limite superior"],
                    resultados: data.RESULTADOS,
                    refVariaIdade: data["Referência varia com idade"],
                    unidade: data.Unidade,
                    valoresReferencia: data["VALORES DE REFERÊNCIA"],
                    slug: doc.id,
                });
            });
            setExams(newExams);
        } catch (error) {
            alert("Falha ao buscar consultas: " + error);
        }
    };

    const getExamById = (id: string) => {
        return exams.find((exam) => exam.slug === id);
    };
    return {
        exams,
        getExamById,
    };
}
