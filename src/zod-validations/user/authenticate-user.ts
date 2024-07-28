import { z } from 'zod'

export const authenticateUser = z.object({
    email: z.string().min(3).max(255),
    password: z.string().min(6)
})