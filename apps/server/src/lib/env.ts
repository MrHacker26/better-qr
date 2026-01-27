import 'dotenv/config'
import z from 'zod'

export const env = z
  .object({
    NODE_ENV: z.enum(['development', 'production', 'test']).optional(),
    PORT: z.coerce.number().optional().default(4000),
    DATABASE_URL: z.string().min(1),
    CORS_ORIGIN: z.url(),
  })
  .parse(process.env)
