import { z } from 'zod'

export const updateSkill = z.object({
    name: z.string().min(1).max(255).optional(),
    level: z.union([
        z.literal(1),
        z.literal(2),
        z.literal(3),
        z.literal(4),
        z.literal(5)
    ]).optional(),
    experience: z.number().min(1).optional(),
    type: z.enum(['skill', 'competence']).optional(),
    icon: z.string().optional(),
    color: z.string().optional(),
})