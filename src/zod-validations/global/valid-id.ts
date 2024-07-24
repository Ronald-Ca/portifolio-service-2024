import { z } from 'zod'

export const validId = z.object({
    id: z.string()
})