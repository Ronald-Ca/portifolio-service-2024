export type SkillType = 'skill' | 'competence'
export type SkillLevel = 1 | 2 | 3 | 4 | 5

export type SkillCreateInput = {
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
    name: string;
    level: SkillLevel;
    experience: number;
    type: SkillType;
    icon: string;
    color?: string | null;
}

export type SkillUpdateInput = {
    name?: string;
    level?: SkillLevel;
    experience?: number;
    type?: SkillType;
    icon?: string;
    color?: string | null;
}