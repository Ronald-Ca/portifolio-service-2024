import { z } from 'zod'

export const updateAbout = z.object({
    person: z.string().min(3).max(255).optional(),
    education: z.string().min(3).max(255).optional(),
    address: z.string().min(3).max(255).optional(),
})