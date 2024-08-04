import { z } from 'zod'

export const updateProject = z.object({
    name: z.string().min(3).max(255).optional(),
    description: z.string().min(3).max(255).optional(),
    link: z.string().min(3).max(255).optional(),
    stackIds: z.string().array().optional()
})