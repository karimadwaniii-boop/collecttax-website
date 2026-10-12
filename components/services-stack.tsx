'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { BookOpen, Briefcase, Building2, FileText, MessagesSquare, Percent, Receipt, ArrowUpRight, CheckCircle2 } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    icon: FileText,
    title: 'Tax Returns / Self Assessment',
    body: 'Sole trader returns prepared specifically for card flippers and collectors. True acquisition costs, grading submissions, and stock movements accounted for without paying tax on phantom profits.',
    image: '/images/slab.png',
    tags: ['Self Assessment', 'eBay & Vinted Payouts', 'HMRC Deadlines'],
    bullets: ['Marketplace gross sales reconciliation', 'PSA/BGS grading fee deductions', 'Trading allowance vs actual expenses'],
  },
  {
    icon: Building2,
    title: 'Limited Company Accounts',
    body: 'Year-end statutory accounts, Companies House filings, and Corporation Tax planning for card shops, breaker channels, and high-volume dealers trading under a limited company structure.',
    image: '/images/sealed-product.jpg',
    tags: ['Year-end Accounts', 'Corporation Tax', 'Director Dividends'],
    bullets: ['Company registration & setup', 'High-value inventory valuation', 'Tax-efficient profit extraction'],
  },
  {
    icon: BookOpen,
    title: 'TCG Bookkeeping & Slabs',
    body: 'Clean digital bookkeeping of every pack pull, flip, card show cash transaction, and platform payout. No more lost paper receipts or messy end-of-year spreadsheets.',
    image: '/images/card-shows.jpg',
    tags: ['Show Cash Deals', 'Whatnot Streams', 'Live Stock Records'],
    bullets: ['Card show table & cash deal logs', 'Courier & packaging expenses', 'Monthly profit margin visibility'],
  },
  {
    icon: Percent,
    title: 'VAT & Margin Scheme',
    body: 'Crucial VAT planning for collectibles. We implement the HMRC Margin Scheme so you only pay VAT on your gross profit margin instead of 20% on the entire sale price of vintage cards.',
    image: '/images/market-trends.jpg',
    tags: ['Margin Scheme', '£90,000 Threshold', 'MTD Returns'],
    bullets: ['Margin scheme calculation', 'Rolling £90k turnover tracking', 'Quarterly MTD VAT submission'],
  },
  {
    icon: Receipt,
    title: 'Expenses & Tax Deductions',
    body: 'Make sure every legitimate expense is claimed: PSA/BGS/Ace grading fees, insured couriers, vendor tables, travel mileage to card expos, packaging materials, and storage costs.',
    image: '/images/grading-submissions.jpg',
    tags: ['Grading Submissions', 'Show Mileage', 'Packaging & Safes'],
    bullets: ['45p/mile travel to shows & buys', 'Card savers, top loaders & bubble wrap', 'Home office & storage deductions'],
  },
  {
    icon: Briefcase,
    title: 'Business Structure & Growth',
    body: 'Should you stay as a Sole Trader or incorporate as a Limited Company? We provide clear advice as your card collecting evolves into a serious commercial venture.',
    image: '/images/real-charizard.jpg',
    tags: ['Sole Trader vs Ltd', 'Asset Ringfencing', 'Growth Strategy'],
    bullets: ['Liability ringfencing for high-value stock', 'Scale without surprise tax bills', 'Commercial banking guidance'],
  },
  {
    icon: MessagesSquare,
    title: 'HMRC Letters & Compliance',
    body: 'Received an HMRC nudge letter regarding online marketplace sales? We act as your official HMRC tax agents, reply directly to inspectors, reconstruct your accounts, and resolve enquiries.',
    image: '/images/slab.png',
    tags: ['Nudge Letters', 'Full Representation', 'Penalty Mitigation'],
    bullets: ['Direct formal liaison with HMRC', 'Unprompted disclosure handling', 'Penalties wiped or mitigated'],
  },
]

export function ServicesStack() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const cards = gsap.utils.toArray<HTMLElement>('[data-stack-card]')
        cards.forEach((card, i) => {
          if (i === cards.length - 1) return
          gsap.to(card.querySelector('[data-stack-inner]'), {
            scale: 0.94 + i * 0.008,
            filter: 'brightness(0.45)',
            ease: 'none',
            scrollTrigger: { trigger: cards[i + 1], start: 'top bottom', end: 'top 25%', scrub: true },
          })
        })
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} id="services" className="relative border-t border-white/5 bg-background py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        
        {/* Section Heading */}
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand">Services</p>
          <h2 className="mt-5 font-display text-5xl font-extrabold uppercase leading-[0.9] tracking-tight [font-stretch:75%] md:text-7xl">
            Everything your <span className="text-brand">collecting business</span> needs.
          </h2>
          <div className="mt-6 flex justify-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-brand hover:bg-brand hover:text-black transition-all"
            >
              <span>Explore Detailed Service Breakdowns &amp; Deductions</span>
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>

        {/* Stacked Cards Container */}
        <ul className="mt-16 flex flex-col gap-8">
          {services.map((s, i) => (
            <li key={s.title} data-stack-card className="sticky" style={{ top: `${92 + i * 16}px` }}>
              <article
                data-stack-inner
                className="group relative flex min-h-[460px] origin-top flex-col justify-between overflow-hidden rounded-[2.5rem] border border-brand/30 bg-[#070707]/90 p-8 shadow-[0_-20px_60px_-20px_rgb(0_0_0/0.95)] backdrop-blur-2xl md:min-h-[480px] md:p-12 transition-all duration-500 hover:border-brand/60 hover:shadow-[0_20px_80px_-20px_rgba(25,230,25,0.25)]"
              >
                {/* 2-Column Split: Text Left + Featured Visual Showcase Right */}
                <div className="grid h-full gap-8 lg:grid-cols-12 items-center relative z-10">
                  
                  {/* Left Column (Content, Highlights & Action) */}
                  <div className="lg:col-span-7 flex flex-col justify-between h-full">
                    <div>
                      {/* Top Header Badge */}
                      <div className="flex items-center gap-3">
                        <span className="flex size-14 items-center justify-center rounded-2xl bg-brand text-black shadow-[0_0_20px_rgba(25,230,25,0.4)]">
                          <s.icon className="size-6" aria-hidden />
                        </span>
                        <div>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-brand">Service #{String(i + 1).padStart(2, '0')}</span>
                          <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase leading-tight [font-stretch:80%] text-white group-hover:text-brand transition-colors">
                            {s.title}
                          </h3>
                        </div>
                      </div>

                      <p className="mt-5 text-sm md:text-base leading-relaxed text-muted-foreground/90">
                        {s.body}
                      </p>

                      {/* Bullet Highlights */}
                      <ul className="mt-5 flex flex-col gap-2.5">
                        {s.bullets.map((b, idx) => (
                          <li key={idx} className="flex items-center gap-2.5 text-xs md:text-sm text-white/90">
                            <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-brand/20 text-brand border border-brand/40">
                              <CheckCircle2 className="size-3" />
                            </span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Bottom Tags & Inquiry Link */}
                    <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5">
                      <ul className="flex flex-wrap gap-2">
                        {s.tags.map((t) => (
                          <li key={t} className="rounded-full border border-brand/30 bg-black/40 px-3 py-1 text-xs font-semibold text-brand backdrop-blur">
                            {t}
                          </li>
                        ))}
                      </ul>
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white hover:border-brand hover:text-brand hover:bg-brand/10 transition-all"
                      >
                        <span>Inquire about this</span>
                        <ArrowUpRight className="size-3.5 text-brand" />
                      </Link>
                    </div>
                  </div>

                  {/* Right Column: Prominent, Crystal-Clear Image Showcase Frame */}
                  <div className="lg:col-span-5 relative h-64 sm:h-72 lg:h-full min-h-[260px] w-full overflow-hidden rounded-2xl border border-white/10 bg-black/70 shadow-2xl group-hover:border-brand/40 transition-all">
                    <Image
                      src={s.image}
                      alt={s.title}
                      fill
                      className="object-contain p-4 scale-100 transition-transform duration-700 ease-out group-hover:scale-105 drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
                      sizes="(max-width: 1024px) 100vw, 420px"
                    />
                    {/* Subtle Top & Bottom Gradient Edge to blend seamlessly */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="pointer-events-none absolute right-3 bottom-3 rounded-full border border-brand/30 bg-black/80 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-brand backdrop-blur-md">
                      CollectTax Verified
                    </div>
                  </div>

                </div>

                {/* Subtle Ambient Card Glow */}
                <div aria-hidden className="pointer-events-none absolute -right-24 -bottom-24 size-80 rounded-full bg-brand/10 blur-3xl" />
              </article>
            </li>
          ))}
        </ul>

      </div>
    </section>
  )
}
