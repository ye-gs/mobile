import { useState, useEffect } from "react";
import {
    doc,
    getDocs,
    setDoc,
    collection,
    deleteDoc,
    addDoc,
} from "firebase/firestore";
import { db, auth } from "@/firebase";
import { Med } from "@/types/med";

export function useMeds() {
    const [meds, setMeds] = useState<Med[]>([]);
    const currentUser = auth.currentUser!;

    useEffect(() => {
        fetchMeds();
    }, []);
    const refreshMeds = () => {
        return meds;
    };
    const fetchMeds = async () => {
        const newMeds: Med[] = [];
        try {
            const medsCollection = collection(
                db,
                "users/",
                currentUser.uid,
                "meds"
            );
            // get all meds on collection and return
            const medRefs = await getDocs(medsCollection);
            if (medRefs.empty) {
                setMeds([]);
            } else {
                medRefs.docs.map((doc) => {
                    const data = doc.data();
                    newMeds.push({
                        id: doc.id,
                        time: data.time,
                        frequency: data.frequency,
                        name: data.name,
                        description: data.description,
                        isBookmarked: data.isBookmarked,
                    });
                });
                setMeds(newMeds);
            }
        } catch (error) {
            alert("Falha ao buscar consultas: " + error);
        }
    };

    const createMed = async (med: Med) => {
        try {
            const path = `users/${currentUser.uid}/meds`;
            const colRef = collection(db, path);
            await addDoc(colRef, med);
            setMeds((prevMeds) => [...prevMeds, med]);
        } catch (error) {
            alert("Falha ao registrar consulta: " + error);
        }
    };
    const editMed = async (id: string, med: Med) => {
        try {
            const path = `users/${currentUser.uid}/meds/${id}`;
            await setDoc(doc(db, path), { ...med, id });
            setMeds((prevMeds) =>
                prevMeds.map((prevMed) =>
                    prevMed.id === id ? { ...med, id } : prevMed
                )
            );
        } catch (error) {
            alert("Falha ao editar consulta: " + error);
        }
    };
    const deleteMed = async (id: string) => {
        try {
            const path = `users/${currentUser.uid}/meds/${id}`;
            await deleteDoc(doc(db, path));
            setMeds((prevMeds) => prevMeds.filter((med) => med.id !== id));
        } catch (error) {
            alert("Falha ao registrar consulta" + error);
        }
    };

    return {
        meds,
        fetchMeds,
        refreshMeds,
        createMed,
        editMed,
        deleteMed,
    };
}
