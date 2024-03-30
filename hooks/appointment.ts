import { useState, useEffect } from "react";
import {
    doc,
    getDocs,
    setDoc,
    collection,
    deleteDoc,
} from "firebase/firestore";
import { db, auth } from "@/firebase";

interface Appointment {
    id: string;
    date: string;
    // Add other appointment properties here
}

export function useAppointments() {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const currentUser = auth.currentUser!;

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const appointmentsCollection = collection(
                db,
                currentUser.uid,
                "appointments"
            );
            // get all appointments on collection and return
            const appointmentRefs = await getDocs(appointmentsCollection);
            if (appointmentRefs.empty) {
                console.log("Nenhuma consulta encpntrada");
                return [];
            } else {
                const documents = [];
                appointmentRefs.docs.map((doc) => {
                    const document = { [doc.id]: doc.data() };
                    documents.push(document);
                });
            }
        } catch (error) {
            alert("Falha ao buscar consultas: " + error);
        }
    };

    const createAppointment = async (appointment: Appointment) => {
        try {
            const path = `users/${currentUser.uid}/appointments`;
            await setDoc(doc(db, path), appointment);
            setAppointments((prevAppointments) => [
                ...prevAppointments,
                appointment,
            ]);
        } catch (error) {
            alert("Falha ao registrar consulta: " + error);
        }
    };
    const editAppointment = async (id: string, appointment: Appointment) => {
        try {
            const path = `users/${currentUser.uid}/appointments/${id}`;
            await setDoc(doc(db, path), appointment);
            setAppointments((prevAppointments) =>
                prevAppointments.map((prevAppointment) =>
                    prevAppointment.id === id ? appointment : prevAppointment
                )
            );
        } catch (error) {
            alert("Falha ao editar consulta: " + error);
        }
    };
    const deleteAppointment = async (id: string) => {
        try {
            const path = `users/${currentUser.uid}/appointments/${id}`;
            await deleteDoc(doc(db, path));
            setAppointments((prevAppointments) =>
                prevAppointments.filter((appointment) => appointment.id !== id)
            );
        } catch (error) {
            alert("Falha ao registrar consulta" + error);
        }
    };

    return {
        appointments,
        fetchAppointments,
        createAppointment,
        editAppointment,
        deleteAppointment,
    };
}
