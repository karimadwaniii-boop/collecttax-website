import Link from 'next/link'
import { Wordmark } from './wordmark'

export function SiteFooter() {
  return (
    <footer className="border-t border-white/5 bg-card/60 relative overflow-hidden">
      <div aria-hidden className="absolute left-1/2 bottom-0 size-[500px] -translate-x-1/2 translate-y-1/2 rounded-full bg-brand/5 blur-[120px]" />
      
      <div className="relative mx-auto max-w-7xl px-5 py-16 md:px-8">
        <div className="grid gap-12 lg:grid-cols-4 pb-12 border-b border-white/10">
          <div className="lg:col-span-2 flex flex-col items-start gap-4">
            <Link href="/" aria-label="CollectTax home">
              <Wordmark tagline className="text-3xl sm:text-4xl text-left" />
            </Link>
            <p className="max-w-md text-sm text-muted-foreground leading-relaxed mt-2">
              The UK&apos;s specialist tax advisors and accountants for trading card and collectibles traders. Pokémon, One Piece, sports cards, PSA/BGS slabs, sealed boxes, and show traders.
            </p>
            <div className="flex flex-wrap gap-3 mt-2">
              <a 
                href="mailto:info@collecttax.co.uk"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white hover:border-brand hover:text-brand transition-colors"
              >
                info@collecttax.co.uk
              </a>
              <a 
                href="mailto:accounts@collecttax.co.uk"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white hover:border-brand hover:text-brand transition-colors"
              >
                accounts@collecttax.co.uk
              </a>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand mb-4">Pages</p>
            <ul className="flex flex-col gap-2.5 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">Services Breakdown</Link>
              </li>
              <li>
                <Link href="/hmrc-sellers" className="hover:text-white transition-colors">HMRC &amp; Online Sellers Guide</Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-white transition-colors">Pricing &amp; Packages</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">Contact / Book a Chat</Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand mb-4">TCG Specialisms</p>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li>Pokémon &amp; One Piece TCG</li>
              <li>PSA, BGS &amp; CGC Graded Slabs</li>
              <li>Sealed Product &amp; Booster Boxes</li>
              <li>Card Shows &amp; Cash Settlements</li>
              <li>eBay, Vinted &amp; Whatnot Accounts</li>
              <li>Trading Allowance &amp; VAT Margins</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex flex-wrap items-center gap-3">
            <p>
              {'\u00A9'} {new Date().getFullYear()} CollectTax. All rights reserved.
            </p>
            <span>•</span>
            <Link href="/privacy" className="hover:text-brand transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-brand transition-colors">Terms of Service</Link>
            <span>•</span>
            <Link 
              href="/admin" 
              className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-brand transition-colors font-medium hover:underline"
            >
              <span className="size-1.5 rounded-full bg-brand animate-pulse" />
              <span>Admin Portal</span>
            </Link>
          </div>
          <p className="text-center sm:text-right max-w-md">
            General guidance only. Not formal personalized financial or legal advice until officially engaged.
          </p>
        </div>
      </div>
    </footer>
  )
}
