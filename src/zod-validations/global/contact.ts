import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  message: z.string().min(5).max(1000),
  phone: z.string().optional(),
  subject: z.string().optional(),
}); 