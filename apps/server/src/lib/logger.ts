import { pino, type TransportTargetOptions } from 'pino'

import { env } from './env'
import { APP_SERVER_ID } from './id'

const transportTargets: TransportTargetOptions[] = []
transportTargets.push({
  target: 'pino-pretty',
  level: env.NODE_ENV === 'development' ? 'debug' : 'info',
})

export const logger = pino({
  level: env.NODE_ENV === 'development' ? 'debug' : 'info',
  transport: {
    targets: transportTargets,
  },
}).child({ app: 'server', serverId: APP_SERVER_ID })
