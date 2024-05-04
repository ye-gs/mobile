import { AppointmentMiddleware } from "@/types/appointment";
import { router } from "expo-router";

export const routeAndTransform = (appointment: AppointmentMiddleware) => {
    router.push({
        pathname: `/appointments/${appointment.id}`,
        params: { ...appointment },
    });
};
