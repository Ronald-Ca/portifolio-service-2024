import { z } from 'zod'

export const createSkill = z.object({
    name: z.string().min(1).max(255),
    level: z.union([
        z.literal(1),
        z.literal(2),
        z.literal(3),
        z.literal(4),
        z.literal(5)
    ]),
    experience: z.number().min(1),
    type: z.enum(['skill', 'competence']),
    icon: z.string(),
    color: z.string().optional(),
})