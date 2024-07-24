import { z } from 'zod'

export const updateHome = z.object({
    title: z.string().min(3).max(255).optional(),
    role: z.string().min(3).max(255).optional(),
    description: z.string().min(3).max(255).optional(),
})