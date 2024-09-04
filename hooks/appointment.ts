import { useState, useEffect } from "react";
import { doc, getDocs, setDoc, collection, deleteDoc, addDoc } from "firebase/firestore";
import { db, auth } from "@/firebase";
import { Appointment } from "@/types/appointment";

export function useAppointments() {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const currentUser = auth.currentUser!;

    useEffect(() => {
        fetchAppointments();
    }, []);
    const refreshAppointments = () => {
        return appointments;
    };
    const fetchAppointments = async () => {
        const newAppointments: Appointment[] = [];
        try {
            const appointmentsCollection = collection(
                db,
                "users/",
                currentUser.uid,
                "appointments"
            );
            // get all appointments on collection and return
            const appointmentRefs = await getDocs(appointmentsCollection);
            if (appointmentRefs.empty) {
                setAppointments([]);
            } else {
                appointmentRefs.docs.map((doc) => {
                    const data = doc.data();
                    newAppointments.push({
                        id: doc.id,
                        datetime: data.datetime.toDate(),
                        doctor: data.doctor,
                        description: data.description,
                        isBookmarked: data.isBookmarked,
                    });
                });
                setAppointments(newAppointments);
            }
        } catch (error) {
            alert("Falha ao buscar consultas: " + error);
        }
    };

    const createAppointment = async (appointment: Appointment) => {
        try {
            const path = `users/${currentUser.uid}/appointments`;
            const colRef = collection(db, path);
            await addDoc(colRef, appointment);
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
            await setDoc(doc(db, path), { ...appointment, id });
            setAppointments((prevAppointments) =>
                prevAppointments.map((prevAppointment) =>
                    prevAppointment.id === id
                        ? { ...appointment, id }
                        : prevAppointment
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
        refreshAppointments,
        createAppointment,
        editAppointment,
        deleteAppointment,
    };
}
