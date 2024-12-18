export type ExperienceCreateInput = {
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
    company: string;
    role: string;
    yearInitial: number;
    mothInitial: string;
    yearFinal: number;
    mothFinal: string;
    activities: string[];
}

export type ExperienceUpdateInput = {
    createdAt?: Date;
    updatedAt?: Date;
    company?: string;
    role?: string;
    yearInitial?: number;
    mothInitial?: string;
    yearFinal?: number;
    mothFinal?: string;
    activities?: string[];
}