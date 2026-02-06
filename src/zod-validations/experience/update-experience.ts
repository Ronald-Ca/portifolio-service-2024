import { z } from 'zod'

export const updateExperience = z.object({
    company: z.string().min(3).max(255).optional(),
    role: z.string().min(3).max(255).optional(),
    yearInitial: z.number().int().optional(),
    yearFinal: z.number().int().optional().nullable(),
    mothInitial: z.string().optional(),
    mothFinal: z.string().optional().nullable(),
    currentJob: z.boolean().optional(),
    modality: z.enum(['on-site', 'hybrid', 'remote']).optional(),
    description: z.string().max(2000).optional().nullable(),
    activities: z.string().array().optional(),
    experienceSkill: z.array(z.string()).optional(),
})