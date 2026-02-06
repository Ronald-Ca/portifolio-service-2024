export type ExperienceCreateInput = {
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
    company: string;
    role: string;
    yearInitial: number;
    mothInitial: string;
    yearFinal?: number | null;
    mothFinal?: string | null;
    currentJob?: boolean;
    modality?: string | null;
    description?: string | null;
    activities: string[];
}

export type ExperienceUpdateInput = {
    createdAt?: Date;
    updatedAt?: Date;
    company?: string;
    role?: string;
    yearInitial?: number;
    mothInitial?: string;
    yearFinal?: number | null;
    mothFinal?: string | null;
    currentJob?: boolean;
    modality?: string | null;
    description?: string | null;
    activities?: string[];
}