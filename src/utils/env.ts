import { z } from 'zod';
import 'dotenv/config';

const envSchema = z.object({
  RESEND_API_KEY: z.string().min(1, 'RESEND_API_KEY é obrigatória'),
  RESEND_FROM_EMAIL: z.string(),
  RESEND_TO_EMAIL: z.string().email('RESEND_TO_EMAIL deve ser um email válido'),
  PORT: z.string().transform(val => parseInt(val, 10)).default('3000'),
  DATABASE_URL: z.string().min(1, 'DATABASE_URL é obrigatória'),
  AUTH_SECRET: z.string().min(1, 'AUTH_SECRET é obrigatória'),
  CLOUD_NAME: z.string().min(1, 'CLOUD_NAME é obrigatória'),
  CLOUD_API_KEY: z.string().min(1, 'CLOUD_API_KEY é obrigatória'),
  CLOUD_API_SECRET: z.string().min(1, 'CLOUD_API_SECRET é obrigatória'),
  CORS_ORIGINS: z.string().optional().default('*'),
});

export const env = envSchema.parse(process.env); 