import { z } from 'zod'

export const updateGraduation = z.object({
    course: z.string().min(3).max(255).optional(),
    institution: z.string().min(3).max(255).optional(),
    yearInit: z.string().min(4).max(4).optional(),
    yearFinal: z.string().min(4).max(4).optional(),
    city: z.string().min(3).max(255).optional(),
    state: z.string().min(2).max(2).optional(),
    modality: z.enum(["on-site", "remote"]).optional(),
})