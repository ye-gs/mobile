interface Appointment {
    id?: string;
    doctor: string;
    description: string;
    datetime: Date;
}
interface AppointmentData {
    id: string;
    doctor: string;
    description: string;
    datetime: string;
    slug: string;
}
interface AppointmentMiddleware {
    id: string;
    doctor: string;
    description: string;
    datetime: string;
}

export { Appointment, AppointmentData, AppointmentMiddleware };
