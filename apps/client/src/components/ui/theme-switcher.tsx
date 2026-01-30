import { MonitorIcon, MoonIcon, SunIcon } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

import { useTheme } from '../theme-provider'

import { Button } from './button'

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  function cycleTheme() {
    if (theme === 'light') {
      setTheme('dark')
    } else if (theme === 'dark') {
      setTheme('system')
    } else {
      setTheme('light')
    }
  }

  function getIcon() {
    const iconProps = { className: 'size-5' }
    if (theme === 'light') {
      return <SunIcon {...iconProps} />
    } else if (theme === 'dark') {
      return <MoonIcon {...iconProps} />
    } else {
      return <MonitorIcon {...iconProps} />
    }
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={cycleTheme}
      className="relative overflow-hidden"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={{ scale: 0.8, opacity: 0, rotate: -180 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          exit={{ scale: 0.8, opacity: 0, rotate: 180 }}
          transition={{
            duration: 0.15,
            ease: [0.4, 0, 0.2, 1],
          }}
          className="flex items-center justify-center"
        >
          {getIcon()}
        </motion.div>
      </AnimatePresence>
    </Button>
  )
}
