import { z } from 'zod'

export const createSkill = z.object({
    name: z.string().min(3).max(255),
    level: z.number().min(1).max(5),
    experience: z.number().min(1),
    type: z.string(),
    stackId: z.string()
})