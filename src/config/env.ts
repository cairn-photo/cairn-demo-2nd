import { config as loadDotenv } from 'dotenv';
import { z } from 'zod';

loadDotenv();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(3000),
  HOST: z.string().default('0.0.0.0'),
  DATABASE_URL: z.string().min(1).default('postgresql://cairn:cairn@localhost:5432/cairn'),
  JWT_SECRET: z.string().min(16).default('replace-me-replace-me'),
  UPLOAD_DIR: z.string().default('./data/uploads')
});

export type AppEnv = z.infer<typeof envSchema>;

export const loadEnv = (): AppEnv => envSchema.parse(process.env);