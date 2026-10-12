import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Archivo, Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const archivo = Archivo({ subsets: ['latin'], variable: '--font-archivo', axes: ['wdth'] })

export const metadata: Metadata = {
  title: 'CollectTax | Accounting & Tax for Collectors and Traders',
  description:
    'UK tax advisors for trading card and collectibles entrepreneurs. Self Assessment, limited company accounts, bookkeeping, VAT and HMRC support for Pokémon, One Piece, sports card and graded card sellers.',
  generator: 'v0.app',
  keywords: [
    'trading card tax UK',
    'collectibles accountant',
    'Pokemon card seller tax',
    'HMRC online sellers',
    'eBay Vinted seller tax',
    'self assessment collectors',
  ],
  openGraph: {
    title: 'CollectTax | You collect. We handle the tax.',
    description: 'Accounting & tax for collectors and traders across the UK.',
    url: 'https://collecttax.co.uk',
    siteName: 'CollectTax',
    locale: 'en_GB',
    type: 'website',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#050505',
}

import { WhatsAppButton } from '@/components/whatsapp-button'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en-GB" className={`${inter.variable} ${archivo.variable} bg-background`}>
      <body className="antialiased">
        {children}
        <WhatsAppButton />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
