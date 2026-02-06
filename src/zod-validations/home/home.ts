import { z } from 'zod'

export const createHome = z.object({
    title: z.string().min(3).max(255),
    role: z.string().min(3).max(255),
    description: z.string().min(3).max(255),
    colorBackground: z.string().optional(),
    mainSkills: z.array(z.string()).optional(),
})

export const updateHome = createHome.partial()