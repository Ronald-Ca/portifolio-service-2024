export type HomeCreateInput = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    role: string;
    description: string | null;
    image: string | null;
}

export type HomeUpdateInput = {
    createdAt: Date;
    updatedAt: Date;
    title: string;
    role: string;
    description: string | null;
    image: string | null;
}