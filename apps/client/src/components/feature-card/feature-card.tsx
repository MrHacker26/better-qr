import { motion } from 'motion/react'

import type { WithBasicProps } from '@/lib/utils'
import { cn } from '@/lib/utils'

type FeatureCardProps = WithBasicProps<{
  icon: React.ReactNode
  title: string
  description: string
}>

export default function FeatureCard({
  icon,
  title,
  description,
  className,
  style,
}: FeatureCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      className={cn(
        'bg-card/80 backdrop-blur-sm rounded-2xl p-6 border shadow-lg',
        className,
      )}
      style={style}
    >
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-linear-to-br from-gradient-start to-gradient-mid text-white mb-3">
        {icon}
      </div>
      <div className="font-bold text-lg mb-1">{title}</div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </motion.div>
  )
}
