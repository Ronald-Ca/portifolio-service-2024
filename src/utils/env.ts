import { z } from 'zod';
import 'dotenv/config';

const envSchema = z.object({
  RESEND_API_KEY: z.string().min(1, 'RESEND_API_KEY é obrigatória'),
  RESEND_FROM_EMAIL: z.string(),
  RESEND_TO_EMAIL: z.string().email('RESEND_TO_EMAIL deve ser um email válido'),
  PORT: z.string().transform(val => parseInt(val, 10)).default('3000'),
});

export const env = envSchema.parse(process.env); 