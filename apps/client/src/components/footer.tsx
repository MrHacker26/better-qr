import { QrCode } from 'lucide-react'

import { GithubIcon } from './ui/icons'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-linear-to-br from-gradient-start to-gradient-mid rounded-xl flex items-center justify-center">
                <QrCode className="size-6 text-white" />
              </div>
              <span className="text-xl font-bold">Better QR</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Create permanent QR codes that never expire. Free forever.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="#features"
                  className="hover:text-primary transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="hover:text-primary transition-colors"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#docs"
                  className="hover:text-primary transition-colors"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a href="#api" className="hover:text-primary transition-colors">
                  API
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="#about"
                  className="hover:text-primary transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#blog"
                  className="hover:text-primary transition-colors"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#privacy"
                  className="hover:text-primary transition-colors"
                >
                  Privacy
                </a>
              </li>
              <li>
                <a
                  href="#terms"
                  className="hover:text-primary transition-colors"
                >
                  Terms
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="flex gap-4">
              <a
                href="https://github.com/MrHacker26"
                target="_blank"
                rel="noopener noreferrer"
                className="size-10 rounded-lg bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
              >
                <GithubIcon className="size-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {currentYear} Better QR. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
