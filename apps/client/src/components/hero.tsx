import { motion } from 'framer-motion'
import { QrCode, Zap, Shield, Palette, TrendingUp } from 'lucide-react'

import FeatureCard from './feature-card'

export function Hero() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-linear-to-br from-gradient-start/5 via-gradient-mid/5 to-gradient-end/5" />
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-gradient-start/30 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-mid/30 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-5xl mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-info/10 text-info text-sm font-medium"
          >
            <Zap className="size-4" />
            Free Forever. No Expiry. No Limits.
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-black tracking-tight"
          >
            Create{' '}
            <span className="bg-linear-to-r from-gradient-start via-gradient-mid to-gradient-end bg-clip-text text-transparent">
              Permanent
            </span>
            <br />
            QR Codes Instantly
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            Generate beautiful, customizable QR codes that never expire. Perfect
            for businesses, events, and personal use.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-4xl mx-auto"
          >
            <FeatureCard
              icon={<QrCode className="size-6" />}
              title="Instant Generation"
              description="Create QR codes in seconds"
            />
            <FeatureCard
              icon={<Shield className="size-6" />}
              title="No Expiry"
              description="Your QR codes last forever"
            />
            <FeatureCard
              icon={<Palette className="size-6" />}
              title="Customizable"
              description="Colors, sizes, and formats"
            />
            <FeatureCard
              icon={<TrendingUp className="size-6" />}
              title="Track Scans"
              description="Coming soon with auth"
            />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
