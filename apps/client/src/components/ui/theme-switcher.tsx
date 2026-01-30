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
          initial={{ y: -20, opacity: 0, rotate: -90 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 20, opacity: 0, rotate: 90 }}
          transition={{
            duration: 0.2,
            ease: 'easeInOut',
          }}
        >
          {getIcon()}
        </motion.div>
      </AnimatePresence>
    </Button>
  )
}
