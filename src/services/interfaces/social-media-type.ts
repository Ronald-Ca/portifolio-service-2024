export type SocialMediaCreateInput = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string | null;
    link: string;
    icon: string;
    color: string | null;
}


export type SocialMediaUpdateInput = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string | null;
    link: string;
    icon: string;
    color: string | null;
}