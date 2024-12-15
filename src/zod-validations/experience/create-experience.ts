import { z } from 'zod'

export const createExperience = z.object({
    company: z.string().min(3).max(255),
    role: z.string().min(3).max(255),
    yearInitial: z.number().int(),
    yearFinal: z.number().int(),
    mothInitial: z.string(),
    mothFinal: z.string(),
    activities: z.string().array(),
    experienceSkill: z.array(z.string()).optional(),
})