interface Med {
    id?: string;
    name: string;
    description: string;
    frequency: string;
    time: string;
    isBookmarked: boolean;
}
interface MedData {
    id: string;
    name: string;
    description: string;
    frequency: string;
    time: string;
    slug: string;
    isBookmarked: boolean | number;
}
interface MedMiddleware {
    id: string;
    name: string;
    description: string;
    frequency: string;
    time: string;
    isBookmarked: number;
}

export { Med, MedData, MedMiddleware };
