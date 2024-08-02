import { z } from 'zod'

export const updateExperience = z.object({
    company: z.string().min(3).max(255).optional(),
    period: z.string().min(3).max(255).optional(),
    role: z.string().min(3).max(255).optional(),
    activities: z.string().array().optional(),
})