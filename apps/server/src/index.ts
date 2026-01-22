import { websocket } from 'hono/bun'

import { app } from './app'
import { env } from './lib/env'
import { logger } from './lib/logger'

const server = Bun.serve({
  fetch: app.fetch,
  websocket,
  port: env.PORT,
})
logger.info(`server started at ${server.url}`)

function gracefulShutdown() {
  logger.info('received shutdown signal, closing server...')
  server.stop()
  logger.info('server closed gracefully')
  process.exit(0)
}

process.on('SIGINT', gracefulShutdown)
process.on('SIGTERM', gracefulShutdown)
