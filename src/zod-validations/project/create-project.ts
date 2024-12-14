import { z } from 'zod'

export const createProject = z.object({
    name: z.string().min(3).max(255),
    description: z.string(),
    link: z.string(),
    projectSkills: z
        .union([z.string(), z.array(z.string())])
        .transform((value) => (Array.isArray(value) ? value : [value])),
});