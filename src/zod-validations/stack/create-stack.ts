import { z } from 'zod'

export const createStack = z.object({
    name: z.string().min(3).max(255),
    icon: z.string().min(3).max(255),
    color: z.string().min(3).max(255),
})