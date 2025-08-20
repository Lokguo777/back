import * as dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().transform(Number).default('3000'),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string().default('7d'),
  CORS_ORIGIN: z.string().default('http://localhost:3000'),
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug']).default('info'),
});

const envParse = envSchema.safeParse(process.env);

if (!envParse.success) {
  console.error('❌ Invalid environment variables:', envParse.error.flatten().fieldErrors);
  throw new Error('Invalid environment variables');
}

export const env = envParse.data; 