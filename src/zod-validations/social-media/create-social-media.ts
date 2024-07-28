import { z } from 'zod'

export const createSocialMedia = z.object({
    name: z.string().min(3).max(255),
    link: z.string().min(3).max(255),
    icon: z.string().min(3).max(255),
    color: z.string().min(3).max(255),
})