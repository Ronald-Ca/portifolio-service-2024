import { z } from 'zod'

export const createAbout = z.object({
    person: z.string().min(3).max(255),
    education: z.string().min(3).max(255),
    address: z.string().min(3).max(255),
})