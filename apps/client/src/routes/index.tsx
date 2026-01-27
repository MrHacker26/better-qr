import { createFileRoute } from '@tanstack/react-router'

import { Footer } from '../components/footer'
import { Hero } from '../components/hero'
import { QrGenerator } from '../components/qr-generator'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Hero />
      <div className="container mx-auto px-4 py-12 flex-1">
        <QrGenerator />
      </div>
      <Footer />
    </div>
  )
}
