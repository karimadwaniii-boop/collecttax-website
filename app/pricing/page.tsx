'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { 
  Check, 
  HelpCircle, 
  Square, 
  Box, 
  Layers, 
  Star, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Flame,
  CreditCard,
  ArrowUpRight
} from 'lucide-react'
import { gsap } from 'gsap'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { SmoothScroll } from '@/components/smooth-scroll'
import { ScrollProgress } from '@/components/scroll-progress'
import { TiltCard } from '@/components/tilt-card'
import { Reveal } from '@/components/reveal'

const packagesList = [
  {
    name: 'Starter Collector / Hobbyist',
    price: '£500',
    frequency: 'per tax year',
    tag: 'Starting Tier',
    image: '/images/slab.png',
    badge: 'Singles & Slabs',
    desc: 'For collectors with casual marketplace sales crossing the £1,000 allowance or starting a serious side hustle.',
    features: [
      'Full UK Self Assessment tax return preparation & filing',
      'eBay, Vinted & Whatnot gross sales vs true profit calculation',
      'Basic allowable expense audit (packaging, shipping, fees)',
      'HMRC registration assistance (Unique Taxpayer Reference / UTR)',
      'Email support throughout the tax year',
    ],
    popular: false,
    cta: 'Select Starter Plan',
  },
  {
    name: 'Pro Trader & Flipper',
    price: '£950',
    frequency: 'per tax year',
    tag: 'Most Popular',
    image: '/images/sealed-product.jpg',
    badge: 'Shows & Sealed Stock',
    desc: 'For active TCG sellers attending card shows, submitting PSA/BGS slabs, and buying collections.',
    features: [
      'Comprehensive Sole Trader accounts & Self Assessment',
      'Card show cash deal reconciliation & receipt capture',
      'PSA, BGS, CGC & Ace grading expense deductions & inventory tracking',
      'Quarterly check-ins on turnover & profit margins',
      'HMRC correspondence & nudge letter protection',
      'VAT threshold monitoring (£90,000 threshold)',
    ],
    popular: true,
    cta: 'Select Pro Trader',
  },
  {
    name: 'Limited Company / High-Volume',
    price: '£1,800',
    frequency: 'per year (or £150/mo)',
    tag: 'Full Business Suite',
    image: '/images/market-trends.jpg',
    badge: 'Corporate & Breakers',
    desc: 'For established card shops, breaker channels, and collectible companies trading under a Ltd structure.',
    features: [
      'Full statutory accounts for Companies House',
      'CT600 Corporation Tax calculation & filing',
      'Director payroll & tax-efficient dividend planning',
      'VAT Margin Scheme quarterly filings for second-hand collectibles',
      'Dedicated senior accountant with WhatsApp support',
      'High-value inventory & storage accounting strategy',
    ],
    popular: false,
    cta: 'Select Limited Company',
  },
]

const tradeInAssets = [
  { icon: Square, title: 'PSA / BGS / CGC Slabs', desc: 'Graded cards with established market value (e.g. vintage Pokémon, modern alt arts, sports grails)', image: '/images/slab.png' },
  { icon: Box, title: 'Sealed Product', desc: 'Booster boxes, ETBs, cases, and premium collection boxes with verified authenticity', image: '/images/sealed-product.jpg' },
  { icon: Layers, title: 'Raw Singles', desc: 'High-end near mint raw vintage cards, promo cards, and chase cards', image: '/images/real-charizard.jpg' },
  { icon: Star, title: 'Card Show Trades', desc: 'Convention tables, show deals, and cash settlements reconciled accurately', image: '/images/card-shows.jpg' },
]

const faqs = [
  {
    q: 'Can I really pay for my accounting using trading cards or sealed boxes?',
    a: 'Yes! As active participants in the UK collectibles and TCG ecosystem, we understand the liquid value of PSA/BGS slabs, sealed booster boxes, and cards. We agree on an objective market valuation (using recent eBay UK / Cardmarket sold averages) and credit that directly against your fee invoice.',
  },
  {
    q: 'How does your £500 annual package compare to high-street accountants?',
    a: 'Standard accountants will often charge you £300 to £600 just to file a generic return, but they will miss thousands of pounds of legitimate collector deductions (grading invoices, show mileage, platform commissions) and may mistakenly declare your entire gross payout as profit instead of deducting card acquisition costs.',
  },
  {
    q: 'What if I haven’t filed tax returns for previous years?',
    a: 'Don’t panic. We regularly help sellers make unprompted voluntary disclosures to HMRC covering past tax years. Catching up proactively significantly reduces or even eliminates potential fines and penalties.',
  },
  {
    q: 'When do I need to register for VAT on cards?',
    a: 'If your rolling 12-month turnover exceeds £90,000, VAT registration is mandatory. However, on second-hand collectible cards, you can often utilise the HMRC Margin Scheme so you only pay VAT on your gross profit margin, not the full sale price. We set this up for you.',
  },
  {
    q: 'Are your fees tax-deductible?',
    a: 'Yes. Accountancy and tax advisory fees for your sole trader business or limited company are allowable business expenses that reduce your overall taxable profit.',
  },
]

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-page-title]', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <SmoothScroll>
      <ScrollProgress />
      <div className="min-h-screen bg-background text-foreground selection:bg-brand selection:text-black">
        <SiteHeader />

        <main className="pt-28 pb-24 md:pt-36 md:pb-32 overflow-hidden">
          {/* Hero Section */}
          <div ref={heroRef} className="relative mx-auto max-w-7xl px-5 md:px-8 text-center">
            <div aria-hidden className="absolute left-1/2 top-0 size-96 -translate-x-1/2 rounded-full bg-brand/15 blur-[140px] pointer-events-none" />

            <div data-page-title>
              <p className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand backdrop-blur">
                <CreditCard className="size-3.5" /> Transparent &amp; Flat Pricing
              </p>
              <h1 className="mt-6 font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight [font-stretch:75%] sm:text-6xl md:text-7xl">
                PACKAGES THAT <span className="text-brand">COVER IT ALL</span>
              </h1>
              <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed">
                No surprise hourly billing. Packages start from £500/year, with our unique option to settle fees in cash or equivalent value in cards and sealed product.
              </p>
            </div>
          </div>

          {/* Pricing Cards with Glassmorphic Split Containers */}
          <section className="mx-auto max-w-7xl px-5 md:px-8 mt-16">
            <div className="grid gap-8 lg:grid-cols-3 items-stretch">
              {packagesList.map((pkg, idx) => (
                <Reveal key={pkg.name} delay={idx * 80}>
                  <TiltCard max={4} className="h-full">
                    <div
                      className={`relative rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between h-full backdrop-blur-2xl transition-all ${
                        pkg.popular
                          ? 'border-2 border-brand bg-card/70 shadow-[0_30px_90px_-20px_rgba(25,230,25,0.4)]'
                          : 'border border-white/10 bg-card/50 hover:border-brand/40 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)]'
                      }`}
                    >
                      {pkg.popular && (
                        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-brand px-4 py-1 text-xs font-extrabold uppercase tracking-widest text-black shadow-lg">
                          Recommended Choice
                        </span>
                      )}

                      <div>
                        {/* Header & Mini Image Showcase Frame */}
                        <div className="flex justify-between items-start mb-4">
                          <span className="text-xs uppercase font-bold tracking-wider text-brand">{pkg.tag}</span>
                          <span className="text-[10px] font-bold uppercase tracking-wider rounded-full border border-brand/30 bg-brand/10 px-2.5 py-0.5 text-brand">
                            {pkg.badge}
                          </span>
                        </div>

                        <h3 className="font-display text-2xl md:text-3xl font-extrabold uppercase [font-stretch:85%] text-white">{pkg.name}</h3>
                        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{pkg.desc}</p>

                        {/* Image Showcase Frame */}
                        <div className="relative my-5 h-36 w-full overflow-hidden rounded-2xl border border-white/10 bg-black/60 shadow-inner">
                          <Image src={pkg.image} alt={pkg.name} fill className="object-contain p-3 transition-transform duration-500 hover:scale-105" sizes="300px" />
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        </div>

                        <div className="mt-4 pb-5 border-b border-white/10">
                          <div className="flex items-baseline gap-2">
                            <span className="font-display text-5xl md:text-6xl font-extrabold text-brand [font-stretch:75%] drop-shadow-[0_0_25px_rgba(25,230,25,0.4)]">
                              {pkg.price}
                            </span>
                            <span className="text-xs uppercase text-white/80 font-bold">{pkg.frequency}</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">or equivalent value in trading cards / slabs</p>
                        </div>

                        <ul className="mt-5 flex flex-col gap-3">
                          {pkg.features.map((f, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-brand/20 text-brand">
                                <Check className="size-3 stroke-[3]" />
                              </span>
                              <span className="text-xs md:text-sm text-white/90 leading-tight">{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-8 pt-5">
                        <Link
                          href={`/contact?package=${encodeURIComponent(pkg.name)}`}
                          className={`inline-flex w-full items-center justify-center gap-2 rounded-full py-4 text-sm font-bold transition-transform hover:scale-102 ${
                            pkg.popular
                              ? 'bg-brand text-black shadow-[0_0_25px_-5px_rgba(25,230,25,0.7)]'
                              : 'border border-white/20 bg-white/5 text-white hover:border-brand hover:text-brand'
                          }`}
                        >
                          <span>{pkg.cta}</span>
                          <ArrowRight className="size-4" />
                        </Link>
                      </div>
                    </div>
                  </TiltCard>
                </Reveal>
              ))}
            </div>
          </section>

          {/* Trade-in Section with Real Imagery */}
          <section className="mx-auto max-w-7xl px-5 md:px-8 mt-24">
            <TiltCard max={3} className="rounded-[2.5rem]">
              <div className="rounded-[2.5rem] border border-brand/40 bg-card/60 p-8 md:p-14 relative overflow-hidden backdrop-blur-2xl shadow-[0_20px_80px_-20px_rgba(25,230,25,0.25)]">
                <div aria-hidden className="absolute -right-20 top-0 size-80 rounded-full bg-brand/20 blur-[100px] pointer-events-none" />

                <div className="max-w-3xl relative z-10">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-brand">
                    <Sparkles className="size-4" /> Unique CollectTax Trade-In Model
                  </span>
                  <h2 className="mt-3 font-display text-3xl md:text-5xl font-extrabold uppercase [font-stretch:80%] text-white">
                    PAY IN CASH OR PAY IN <span className="text-brand">CARDS &amp; SLABS</span>
                  </h2>
                  <p className="mt-4 text-muted-foreground text-base md:text-lg leading-relaxed">
                    We are collectors ourselves. If you have extra inventory, graded cards, or sealed boxes, we are happy to accept trade-in value against your accountancy invoice.
                  </p>
                </div>

                <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 relative z-10">
                  {tradeInAssets.map((asset) => {
                    const Icon = asset.icon
                    return (
                      <div key={asset.title} className="group overflow-hidden rounded-2xl border border-white/10 bg-black/60 p-5 backdrop-blur-md hover:border-brand/40 transition-all hover:-translate-y-1">
                        <div className="relative mb-4 h-32 w-full overflow-hidden rounded-xl border border-white/10 bg-black/80">
                          <Image src={asset.image} alt={asset.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="240px" />
                        </div>
                        <h4 className="font-display text-lg font-bold uppercase [font-stretch:85%] group-hover:text-brand transition-colors text-white">{asset.title}</h4>
                        <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">{asset.desc}</p>
                      </div>
                    )
                  })}
                </div>

                <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-6 relative z-10">
                  <p className="text-sm text-white/80">
                    Fair market valuations based on real-time eBay UK &amp; Cardmarket market averages.
                  </p>
                  <Link
                    href="/contact"
                    className="shrink-0 flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-bold text-black transition-transform hover:scale-105 shadow-[0_0_20px_-4px_rgba(25,230,25,0.4)]"
                  >
                    <span>Inquire About Trade-In Option</span>
                    <ArrowUpRight className="size-4" />
                  </Link>
                </div>
              </div>
            </TiltCard>
          </section>

          {/* Frequently Asked Questions */}
          <section className="mx-auto max-w-4xl px-5 md:px-8 mt-24">
            <Reveal className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Common Questions</p>
              <h2 className="mt-3 font-display text-3xl md:text-5xl font-extrabold uppercase [font-stretch:80%]">
                FREQUENTLY ASKED <span className="text-brand">QUESTIONS</span>
              </h2>
            </Reveal>

            <div className="mt-12 flex flex-col gap-4">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index
                return (
                  <Reveal key={index} delay={index * 50}>
                    <div className="rounded-2xl border border-white/10 bg-card/60 backdrop-blur-xl overflow-hidden transition-colors hover:border-brand/40">
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                        className="flex w-full items-center justify-between p-6 text-left"
                      >
                        <span className="font-display text-lg md:text-xl font-bold uppercase [font-stretch:85%] pr-4 text-white">
                          {faq.q}
                        </span>
                        <span className={`flex size-8 shrink-0 items-center justify-center rounded-full border border-white/10 text-brand font-mono transition-transform duration-300 ${
                          isOpen ? 'rotate-45 bg-brand text-black border-brand' : ''
                        }`}>
                          +
                        </span>
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-6 text-sm md:text-base text-muted-foreground leading-relaxed border-t border-white/5 pt-4">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </section>
        </main>

        <SiteFooter />
      </div>
    </SmoothScroll>
  )
}
