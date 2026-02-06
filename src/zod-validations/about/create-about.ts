import { z } from 'zod'

const birthDateSchema = z.preprocess(
    (value) => (value === '' ? undefined : value),
    z.string().refine((value) => !Number.isNaN(Date.parse(value)), 'Invalid birthDate'),
)

export const createAbout = z.object({
    name: z.string().min(3).max(255),
    birthDate: birthDateSchema,
    city: z.string().min(3).max(255),
    state: z.string().min(2).max(2),
})

export const updateAbout = createAbout.partial()