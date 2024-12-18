export type UserCreateInput = {
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
    email: string;
    password: string;
    active?: boolean;
}

export type UserUpdateInput = {
    email?: string;
    password?: string;
    active?: boolean;
}