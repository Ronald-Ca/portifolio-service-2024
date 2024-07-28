import { z } from 'zod'

export const updateStack = z.object({
    name: z.string().min(3).max(255).optional(),
    icon: z.string().min(3).max(255).optional(),
    color: z.string().min(3).max(255).optional(),
})