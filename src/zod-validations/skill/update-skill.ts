import { z } from 'zod'

export const updateExperience = z.object({
    name: z.string().min(3).max(255).optional(),
    level: z.number().min(1).max(5).optional(),
    experience: z.number().min(1).optional(),
    type: z.string().array().optional(),
})