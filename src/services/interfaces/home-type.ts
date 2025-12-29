export type MainSkill = {
    id: string;
    name: string;
    icon: string;
    color: string | null;
}

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
    mainSkills?: string[];
}

export type HomeWithSkills = Omit<HomeType, 'mainSkills'> & {
    mainSkills: MainSkill[];
}