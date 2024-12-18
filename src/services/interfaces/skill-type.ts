export type SkillCreateInput = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    level: number;
    experience: number;
    type: string;
    icon: string;
    color: string | null;
}

export type SkillUpdateInput = {
    name?: string;
    level?: number;
    experience?: number;
    type?: string;
    icon?: string;
    color?: string | null;
}