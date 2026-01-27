import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'

import {
  generateQrCodeImage,
  normalizeQrContent,
  validateQrContent,
} from '../lib/qr-generator'
import { generateQrCodeSchema } from '../lib/schemas'

export const qrRoutes = new Hono().post(
  '/generate',
  zValidator('json', generateQrCodeSchema),
  async (c) => {
    const input = c.req.valid('json')

    if (!validateQrContent(input.content, input.type)) {
      return c.json(
        {
          success: false,
          error: `Invalid ${input.type} format`,
        },
        400,
      )
    }

    const normalizedContent = normalizeQrContent(input.content, input.type)

    try {
      const qrDataUrl = await generateQrCodeImage({
        content: normalizedContent,
        size: input.size,
        format: input.format,
        backgroundColor: input.backgroundColor,
        foregroundColor: input.foregroundColor,
        errorCorrectionLevel: input.errorCorrectionLevel,
      })

      return c.json({
        success: true,
        data: {
          qrCode: qrDataUrl,
          content: normalizedContent,
          type: input.type,
          size: input.size,
          format: input.format,
        },
      })
    } catch {
      return c.json(
        {
          success: false,
          error: 'Failed to generate QR code',
        },
        500,
      )
    }
  },
)
