export type GraduationType = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string

    course: string
    institution: string
    yearInit: string
    yearFinal?: string
    city?: string
    state?: string
    modality?: string
}