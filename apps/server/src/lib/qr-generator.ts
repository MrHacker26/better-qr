import QRCode from 'qrcode'
import { match } from 'ts-pattern'

import { EMAIL_REGEX, PHONE_REGEX } from './constants'

type QRCodeContentType =
  | 'url'
  | 'text'
  | 'email'
  | 'phone'
  | 'sms'
  | 'wifi'
  | 'vcard'
type QRCodeFormat = 'png' | 'svg' | 'jpeg'
type QRCodeErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H'

type GenerateQrCodeOptions = {
  content: string
  size?: number
  format?: QRCodeFormat
  backgroundColor?: string
  foregroundColor?: string
  errorCorrectionLevel?: QRCodeErrorCorrectionLevel
}

export async function generateQrCodeImage(
  options: GenerateQrCodeOptions,
): Promise<string> {
  const {
    content,
    size = 300,
    format = 'png',
    backgroundColor = '#ffffff',
    foregroundColor = '#000000',
    errorCorrectionLevel = 'M',
  } = options

  const qrOptions: QRCode.QRCodeToDataURLOptions = {
    width: size,
    margin: 1,
    color: {
      dark: foregroundColor,
      light: backgroundColor,
    },
    errorCorrectionLevel,
  }

  try {
    if (format === 'svg') {
      const svgString = await QRCode.toString(content, {
        type: 'svg',
        width: size,
        margin: 1,
        color: {
          dark: foregroundColor,
          light: backgroundColor,
        },
        errorCorrectionLevel,
      })

      return `data:image/svg+xml;base64,${Buffer.from(svgString).toString('base64')}`
    } else {
      return await QRCode.toDataURL(content, qrOptions)
    }
  } catch {
    throw new Error('Failed to generate QR code image')
  }
}

export function validateQrContent(
  content: string,
  type: QRCodeContentType,
): boolean {
  return match(type)
    .with('url', () => {
      try {
        new URL(content)
        return true
      } catch {
        try {
          new URL(`https://${content}`)
          return true
        } catch {
          return false
        }
      }
    })
    .with('email', () => {
      return EMAIL_REGEX.test(content)
    })
    .with('phone', () => {
      return PHONE_REGEX.test(content)
    })
    .otherwise(() => true)
}

export function normalizeQrContent(
  content: string,
  type: QRCodeContentType,
): string {
  if (type === 'url') {
    try {
      new URL(content)
      return content
    } catch {
      return `https://${content}`
    }
  }

  return content
}
