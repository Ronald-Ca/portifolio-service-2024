import { z } from 'zod'

export const createProject = z.object({
    name: z.string().min(3).max(255),
    description: z.string().min(3).max(255),
    link: z.string().min(3).max(255),
    skillsId: z.array(z.string())
})