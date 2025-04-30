export type HomeType = {
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
    title: string;
    role: string;
    description: string | null;
    image: string | null;
    imageBackground?: string | null;
    colorBackground?: string | null;
}