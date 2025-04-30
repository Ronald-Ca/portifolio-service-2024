import { z } from 'zod'

export const createGraduation = z.object({
    course: z.string().min(3).max(255),
    institution: z.string().min(3).max(255),
    yearInit: z.string().min(4).max(4),
    yearFinal: z.string().min(4).max(4).optional(),
    city: z.string().min(3).max(255).optional(),
    state: z.string().min(2).max(2).optional(),
    modality: z.enum(["on-site", "remote", "hybrid"]).optional(),
})