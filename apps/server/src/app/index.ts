import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { HTTPException } from 'hono/http-exception'

import { env } from '../lib/env'
import { getErrorMessage } from '../lib/utils'
import { qrRoutes } from '../routes/qr'

export const app = new Hono()
  .basePath('/api')
  .onError((error, c) => {
    if (error instanceof HTTPException) {
      const errorMessage =
        error.message ?? 'Something went wrong. Please try again later.'
      const statusCode = error.status ?? 500
      return c.json({ error: errorMessage }, statusCode)
    }
    const errorMessage = getErrorMessage(error)
    return c.json({ error: errorMessage }, 500)
  })
  .use(
    cors({
      origin: env.CORS_ORIGIN,
      credentials: true,
    }),
  )
  .route('/qr', qrRoutes)

export type App = typeof app
export default app
