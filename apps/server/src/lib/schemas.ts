import { z } from 'zod'

import { COLOR_REGEX } from './constants'

export const generateQrCodeSchema = z.object({
  content: z
    .string()
    .min(1, 'Content is required')
    .max(2000, 'Content too long'),
  type: z
    .enum(['url', 'text', 'email', 'phone', 'sms', 'wifi', 'vcard'])
    .default('url'),
  size: z.number().min(100).max(2000).default(300),
  format: z.enum(['png', 'svg', 'jpeg']).default('png'),
  backgroundColor: z.string().regex(COLOR_REGEX).default('#ffffff'),
  foregroundColor: z.string().regex(COLOR_REGEX).default('#000000'),
  errorCorrectionLevel: z.enum(['L', 'M', 'Q', 'H']).default('M'),
  title: z.string().max(200).optional(),
  description: z.string().max(500).optional(),
})
