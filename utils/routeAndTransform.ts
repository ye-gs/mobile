import { MedMiddleware } from "@/types/med";
import { Exam } from "@/types/exam";
import { AppointmentMiddleware } from "@/types/appointment";
import { router } from "expo-router";

export const routeAndTransformAppointments = (
    appointment: AppointmentMiddleware
) => {
    router.push({
        pathname: `/appointments/${appointment.id}`,
        params: { ...appointment },
    });
};
export const routeAndTransformExams = (exam: Exam) => {
    router.push({
        pathname: `/exams/${exam.id}`,
    });
};
export const routeAndTransformMeds = (med: MedMiddleware) => {
    router.push({
        pathname: `/meds/${med.id}`,
        params: { ...med },
    });
};
