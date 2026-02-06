import { z } from 'zod'

export const createExperience = z.object({
    company: z.string().min(3).max(255),
    role: z.string().min(3).max(255),
    yearInitial: z.number().int(),
    yearFinal: z.number().int().optional().nullable(),
    mothInitial: z.string(),
    mothFinal: z.string().optional().nullable(),
    currentJob: z.boolean().optional(),
    modality: z.enum(['on-site', 'hybrid', 'remote']).optional(),
    description: z.string().max(2000).optional().nullable(),
    activities: z.string().array(),
    experienceSkill: z.array(z.string()).optional(),
})