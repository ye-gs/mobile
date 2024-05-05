import { MedMiddleware } from "@/types/med";
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

export const routeAndTransformMeds = (med: MedMiddleware) => {
    router.push({
        pathname: `/meds/${med.id}`,
        params: { ...med },
    });
};
