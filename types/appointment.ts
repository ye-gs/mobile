interface Appointment {
    id?: string;
    doctor: string;
    description: string;
    datetime: Date;
    isBookmarked: boolean;
}
interface AppointmentData {
    id: string;
    doctor: string;
    description: string;
    datetime: string;
    slug: string;
    isBookmarked: boolean | number;
}
interface AppointmentMiddleware {
    id: string;
    doctor: string;
    description: string;
    datetime: string;
    isBookmarked: number;
}

export { Appointment, AppointmentData, AppointmentMiddleware };
