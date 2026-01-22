import 'dotenv/config'
import z from 'zod'

export const env = z
  .object({
    NODE_ENV: z.enum(['development', 'production', 'test']).optional(),
    PORT: z.coerce.number().optional().default(4000),
  })
  .parse(process.env)
