import { QueryClientProvider } from '@tanstack/react-query'
import { createRootRoute, Outlet } from '@tanstack/react-router'

import { ThemeProvider } from '@/components/theme-provider'
import { queryClient } from '@/lib/query'

function RootLayout() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="better-qr-theme">
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export const Route = createRootRoute({ component: RootLayout })
