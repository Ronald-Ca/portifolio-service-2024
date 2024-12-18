
export type CurriculumCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    curriculum: string
    fileName: string
    publicId?: string | null
}


export type CurriculumUpdateInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    curriculum?: string
    fileName?: string
    publicId?: string | null
}