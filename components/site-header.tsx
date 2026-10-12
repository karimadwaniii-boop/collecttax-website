'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { Wordmark } from './wordmark'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/hmrc-sellers', label: 'HMRC & Sellers' },
  { href: '/pricing', label: 'Packages' },
  { href: '/about', label: 'Why CollectTax' },
  { href: '/contact', label: 'Contact' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-20 md:px-8">
        <Link href="/" className="text-lg md:text-xl inline-block" aria-label="CollectTax home">
          <Wordmark />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {navLinks.map((l) => {
            const isActive = pathname === l.href
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`text-sm transition-colors hover:text-white ${
                  isActive ? 'text-brand font-semibold' : 'text-muted-foreground'
                }`}
              >
                {l.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden items-center gap-1.5 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-black transition-transform hover:scale-[1.03] sm:inline-flex shadow-[0_0_20px_-4px_rgba(25,230,25,0.4)]"
          >
            <span>Book a free chat</span>
            <ArrowUpRight className="size-4" />
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-10 items-center justify-center rounded-full border border-white/10 lg:hidden text-white hover:border-brand/40"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-white/5 bg-background/95 backdrop-blur-2xl px-5 py-5 lg:hidden">
          <ul className="flex flex-col gap-1.5">
            {navLinks.map((l) => {
              const isActive = pathname === l.href
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={`block rounded-lg px-3 py-3 text-base transition-colors ${
                      isActive
                        ? 'bg-brand/10 font-semibold text-brand border-l-2 border-brand'
                        : 'text-white/90 hover:bg-white/5'
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              )
            })}
            <li className="pt-3">
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 rounded-full bg-brand px-5 py-3.5 text-center font-semibold text-black shadow-[0_0_20px_-4px_rgba(25,230,25,0.4)]"
              >
                <span>Book a free consultation</span>
                <ArrowUpRight className="size-4" />
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
