import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import {
  CheckCircle2,
  Download,
  Link as LinkIcon,
  QrCode,
  Share2,
  Sparkles,
} from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from './ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Input } from './ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

import { honoClient } from '@/lib/hono'
import { cn, type WithBasicProps } from '@/lib/utils'

const qrGeneratorSchema = z.object({
  content: z.url().min(1, 'URL is required'),
  type: z
    .enum(['url', 'text', 'email', 'phone', 'sms', 'wifi', 'vcard'])
    .default('url'),
  size: z.number().min(100).max(2000).default(300),
  format: z.enum(['png', 'svg']).default('png'),
  backgroundColor: z.string().default('#ffffff'),
  foregroundColor: z.string().default('#000000'),
  errorCorrectionLevel: z.enum(['L', 'M', 'Q', 'H']).default('M'),
})

type QrGeneratorInput = z.input<typeof qrGeneratorSchema>
type QrGeneratorOutput = z.output<typeof qrGeneratorSchema>

type QrGeneratorProps = WithBasicProps<{
  onGenerate?: (qrCode: string) => void
}>

export function QrGenerator({
  onGenerate,
  className,
  style,
}: QrGeneratorProps) {
  const [qrCode, setQrCode] = useState<string | null>(null)
  const [isCopied, setIsCopied] = useState(false)

  const form = useForm<QrGeneratorInput>({
    resolver: zodResolver(qrGeneratorSchema),
    defaultValues: {
      content: '',
      type: 'url',
      size: 300,
      format: 'png',
      backgroundColor: '#ffffff',
      foregroundColor: '#000000',
      errorCorrectionLevel: 'M',
    },
  })

  const generateQrMutation = useMutation({
    mutationFn: async (values: QrGeneratorOutput) => {
      const res = await honoClient.api.qr.generate.$post({
        json: { ...values },
      })
      return res.json()
    },
    onSuccess: (data) => {
      if (data.success) {
        setQrCode(data.data.qrCode)
        onGenerate?.(data.data.qrCode)
      }
    },
  })

  function handleDownloadQrCode() {
    if (!qrCode) {
      return
    }

    const format = form.getValues('format')
    const link = document.createElement('a')
    link.href = qrCode
    link.download = `qr-code-${Date.now()}.${format}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  async function handleShareQrCode() {
    if (!qrCode) {
      return
    }

    const format = form.getValues('format')
    const url = form.getValues('content')

    try {
      const response = await fetch(qrCode)
      const blob = await response.blob()
      const file = new File([blob], `qr-code.${format}`, {
        type: `image/${format}`,
      })

      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: 'QR Code',
          text: `QR Code for: ${url}`,
          files: [file],
        })
      } else {
        // Fallback: copy URL to clipboard
        await navigator.clipboard.writeText(url)
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 2000)
      }
    } catch {
      // Error sharing QR code
    }
  }

  return (
    <div className={cn('w-full max-w-4xl mx-auto', className)} style={style}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-card rounded-3xl shadow-2xl p-8 border"
      >
        <div className="grid md:grid-cols-2 gap-8">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((values) =>
                generateQrMutation.mutate(values as QrGeneratorOutput),
              )}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold flex items-center gap-2">
                      <LinkIcon className="size-5" />
                      Enter URL
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="https://example.com"
                          className="text-lg h-14 pr-12"
                          {...field}
                        />
                        {field.value ? (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute right-3 top-1/2 -translate-y-1/2"
                          >
                            <CheckCircle2 className="size-6 text-success" />
                          </motion.div>
                        ) : null}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="format"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Format</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="png">PNG</SelectItem>
                          <SelectItem value="svg">SVG</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="size"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Size</FormLabel>
                      <Select
                        onValueChange={(value) =>
                          field.onChange(parseInt(value))
                        }
                        defaultValue={(field.value ?? 300).toString()}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="200">200px</SelectItem>
                          <SelectItem value="300">300px</SelectItem>
                          <SelectItem value="400">400px</SelectItem>
                          <SelectItem value="500">500px</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="submit"
                disabled={generateQrMutation.isPending}
                className="w-full h-14 text-lg font-semibold bg-linear-to-r from-gradient-start to-gradient-mid hover:opacity-90 transition-opacity"
                size="lg"
                loading={generateQrMutation.isPending}
                icon={
                  generateQrMutation.isPending ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    >
                      <Sparkles className="size-5!" />
                    </motion.div>
                  ) : (
                    <QrCode className="size-5!" />
                  )
                }
              >
                {generateQrMutation.isPending
                  ? 'Generating...'
                  : 'Generate QR Code'}
              </Button>

              {qrCode ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-2"
                >
                  <Button
                    type="button"
                    onClick={handleDownloadQrCode}
                    variant="outline"
                    className="flex-1 h-12"
                    size="lg"
                    icon={<Download className="size-4" />}
                  >
                    Download
                  </Button>
                  <Button
                    type="button"
                    onClick={handleShareQrCode}
                    variant="outline"
                    className="flex-1 h-12"
                    size="lg"
                    icon={<Share2 className="size-4" />}
                  >
                    {isCopied ? 'Copied!' : 'Share'}
                  </Button>
                </motion.div>
              ) : null}
            </form>
          </Form>

          <div className="flex items-center justify-center">
            <AnimatePresence mode="wait">
              {qrCode ? (
                <motion.div
                  key="qr-code"
                  initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                  transition={{ duration: 0.5, type: 'spring' }}
                  className="relative"
                >
                  <div className="absolute -inset-4 bg-linear-to-r from-gradient-start to-gradient-mid rounded-2xl blur-xl opacity-50" />
                  <div className="relative bg-card p-6 rounded-2xl shadow-xl">
                    <img
                      src={qrCode}
                      alt="Generated QR Code"
                      className="w-full h-auto max-w-sm rounded-lg"
                    />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-2xl"
                >
                  <QrCode className="size-24 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground text-center">
                    Your QR code will appear here
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
