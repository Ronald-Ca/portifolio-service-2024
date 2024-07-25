import { z } from 'zod'

export const createExperience = z.object({
    company: z.string().min(3).max(255),
    period: z.string().min(3).max(255),
    role: z.string().min(3).max(255),
    activities: z.string().array(),
    stacks: z.string().array(),
})