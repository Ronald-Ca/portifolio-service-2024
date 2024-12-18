export type ProjectCreateInput = {
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
    name: string;
    image: string;
    video: string | null;
    description: string | null;
    link: string | null;
}

export type ProjectUpdateInput = {
    createdAt?: Date;
    updatedAt?: Date;
    name?: string;
    image?: string;
    video?: string | null;
    description?: string | null;
    link?: string | null;
}