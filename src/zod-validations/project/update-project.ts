import { z } from 'zod'

export const updateProject = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    link: z.string().optional(),
    projectSkills: z
    .union([z.string(), z.array(z.string())])
    .transform((value) => (Array.isArray(value) ? value : [value])).optional(),
})