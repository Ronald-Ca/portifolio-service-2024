import { z } from 'zod'

export const createAbout = z.object({
    name: z.string().min(3).max(255),
    age: z.preprocess((value) => {
        if (typeof value === 'string') {
            const parsed = parseInt(value, 10)
            return Number.isNaN(parsed) ? undefined : parsed
        }
        return value
    }, z.number().int().positive()),
    city: z.string().min(3).max(255),
    state: z.string().min(2).max(2),
})

export const updateAbout = createAbout.partial()