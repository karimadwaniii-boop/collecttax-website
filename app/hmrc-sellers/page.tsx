'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { 
  AlertTriangle, 
  ShieldAlert, 
  Landmark, 
  CheckCircle, 
  HelpCircle, 
  FileWarning, 
  Mail, 
  ArrowRight,
  Calculator,
  Flame,
  BadgeAlert,
  ArrowUpRight
} from 'lucide-react'
import { gsap } from 'gsap'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { SmoothScroll } from '@/components/smooth-scroll'
import { ScrollProgress } from '@/components/scroll-progress'
import { TiltCard } from '@/components/tilt-card'
import { Reveal } from '@/components/reveal'

const triggerFactors = [
  {
    title: '30+ Sales in a Calendar Year',
    desc: 'Under the new OECD digital reporting rules, platforms like eBay, Vinted, and Whatnot are legally required to automatically transmit your total gross transactions directly to HMRC.',
    severity: 'High',
  },
  {
    title: 'Over £1,700 Gross Sales Payouts',
    desc: 'Even if you only sell a small number of high-grade slabs or sealed booster boxes, exceeding roughly €2,000 (~£1,700) triggers mandatory platform HMRC data sharing.',
    severity: 'High',
  },
  {
    title: 'Buying Specifically with Profit Motive',
    desc: 'If you buy cards, hold them for price appreciation, or crack sealed product to sell singles, HMRC classifies this as "Badges of Trade", regardless of whether you consider it a hobby.',
    severity: 'Critical',
  },
  {
    title: 'Card Shows & Bank Transfers',
    desc: 'Regular large bank transfers into personal accounts with references like "Zard", "One Piece Case", or "PSA 10" can trigger anti-money laundering and undisclosed trading flags.',
    severity: 'Medium',
  },
]

const stepsIfContacted = [
  {
    step: '01',
    title: 'Do NOT Ignore the Letter',
    desc: 'HMRC nudge letters often have strict 30-day response deadlines. Ignoring them leads to automated assessments with estimated tax, 30% to 100% penalties, and interest charges.',
  },
  {
    step: '02',
    title: 'Gather All Platform CSVs & Purchase Receipts',
    desc: 'HMRC will see your total gross sales, NOT your actual cost of buying the cards or grading fees. We help reconstruct what you actually paid so you only pay tax on true profit.',
  },
  {
    step: '03',
    title: 'Determine: Hobbyist vs Trader Status',
    desc: 'If you were merely downsizing your personal childhood collection, that may fall under Capital Gains or personal chattels exemption rather than income tax.',
  },
  {
    step: '04',
    title: 'Formal Disclosure & Penalty Mitigation',
    desc: 'CollectTax handles the official correspondence with HMRC. An unprompted voluntary disclosure or prompt professional reply massively reduces or eliminates penalties.',
  },
]

export default function HmrcSellersPage() {
  const [salesCount, setSalesCount] = useState<number>(45)
  const [annualRevenue, setAnnualRevenue] = useState<number>(3500)
  const [intent, setIntent] = useState<'profit' | 'downsizing'>('profit')
  const heroRef = useRef<HTMLDivElement>(null)

  const isReportedByPlatforms = salesCount >= 30 || annualRevenue >= 1700
  const isOverTradingAllowance = annualRevenue > 1000
  const likelyTrading = intent === 'profit' || (annualRevenue > 3000 && salesCount > 25)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-page-title]', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      })
      gsap.from('[data-alert-banner]', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        delay: 0.3,
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
          <div ref={heroRef} className="relative mx-auto max-w-7xl px-5 md:px-8">
            <div aria-hidden className="absolute -right-32 top-10 size-96 rounded-full bg-brand/15 blur-[140px] pointer-events-none" />

            <div className="max-w-3xl" data-page-title>
              <p className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-red-400 backdrop-blur">
                <ShieldAlert className="size-3.5" /> HMRC Online Seller Scrutiny
              </p>
              <h1 className="mt-6 font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight [font-stretch:75%] sm:text-6xl md:text-7xl">
                HMRC &amp; ONLINE <span className="text-brand">COLLECTOR TAX RULES</span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed">
                If you buy, sell, flip, or grade trading cards and collectibles, HMRC&apos;s new automatic platform data-sharing powers mean your transactions are visible. Here is everything UK sellers need to know.
              </p>
            </div>

            {/* Alert Notice Banner with Pulsing Effect */}
            <div data-alert-banner className="mt-10 rounded-2xl border border-brand/40 bg-card/90 p-6 md:p-8 backdrop-blur flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-[0_10px_40px_-15px_rgba(25,230,25,0.2)]">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-brand/10 border border-brand/30 text-brand shrink-0">
                  <Landmark className="size-6" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold uppercase [font-stretch:85%] text-white">
                    The New HMRC Digital Reporting Powers (DAC7 / OECD)
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                    Platforms including eBay UK, Vinted, Etsy, and Whatnot are now mandated by UK law to report seller accounts, bank details, and gross earnings directly to HM Revenue &amp; Customs.
                  </p>
                </div>
              </div>
              <Link
                href="/contact"
                className="shrink-0 flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-black transition-transform hover:scale-105 shadow-[0_0_20px_-4px_rgba(25,230,25,0.5)]"
              >
                <span>Get HMRC Support</span>
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </div>

          {/* Interactive Self-Assessment Status Checker with 3D Tilt Card */}
          <section className="mx-auto max-w-7xl px-5 md:px-8 mt-20">
            <TiltCard max={4} className="rounded-3xl">
              <div className="rounded-3xl border border-brand/30 bg-card/90 p-8 md:p-12 shadow-[0_30px_90px_-20px_rgba(0,0,0,0.8)] backdrop-blur relative overflow-hidden">
                <div aria-hidden className="absolute -left-20 -top-20 size-80 rounded-full bg-brand/10 blur-3xl pointer-events-none" />

                <div className="max-w-2xl relative z-10">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-brand">
                    <Calculator className="size-4" /> Interactive Self-Check Tool
                  </span>
                  <h2 className="mt-3 font-display text-3xl md:text-4xl font-extrabold uppercase [font-stretch:80%]">
                    CHECK YOUR HMRC <span className="text-brand">REPORTING POSITION</span>
                  </h2>
                  <p className="mt-3 text-sm md:text-base text-muted-foreground">
                    Move the sliders to match your current card selling volume over the past 12 months.
                  </p>
                </div>

                <div className="mt-10 grid gap-10 lg:grid-cols-12 items-center relative z-10">
                  <div className="lg:col-span-6 flex flex-col gap-6">
                    <div className="p-4 rounded-2xl border border-white/10 bg-background/60">
                      <div className="flex justify-between text-sm font-semibold mb-2">
                        <span>Number of items sold per year:</span>
                        <span className="text-brand font-mono text-base font-bold">{salesCount} items</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="150"
                        value={salesCount}
                        onChange={(e) => setSalesCount(Number(e.target.value))}
                        className="w-full accent-brand cursor-pointer h-2 bg-white/10 rounded-lg"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-2">
                        <span>1 sale</span>
                        <span className="text-brand font-medium">30 (Platform threshold)</span>
                        <span>150+</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl border border-white/10 bg-background/60">
                      <div className="flex justify-between text-sm font-semibold mb-2">
                        <span>Estimated gross sales / payouts (£):</span>
                        <span className="text-brand font-mono text-base font-bold">£{annualRevenue.toLocaleString()}</span>
                      </div>
                      <input
                        type="range"
                        min="200"
                        max="50000"
                        step="200"
                        value={annualRevenue}
                        onChange={(e) => setAnnualRevenue(Number(e.target.value))}
                        className="w-full accent-brand cursor-pointer h-2 bg-white/10 rounded-lg"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-2">
                        <span>£200</span>
                        <span className="text-brand font-medium">£1,000 (Tax-free allowance)</span>
                        <span>£50k+</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">What was your primary intent?</label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setIntent('profit')}
                          className={`p-3.5 rounded-xl border text-left text-xs font-semibold transition-all ${
                            intent === 'profit'
                              ? 'border-brand bg-brand/10 text-white shadow-[0_0_15px_-3px_rgba(25,230,25,0.4)]'
                              : 'border-white/10 bg-background text-muted-foreground hover:border-white/20'
                          }`}
                        >
                          <p className="font-bold text-sm text-white mb-0.5">Making a Profit / Flipping</p>
                          Bought cards/boxes with the intention of reselling higher
                        </button>
                        <button
                          type="button"
                          onClick={() => setIntent('downsizing')}
                          className={`p-3.5 rounded-xl border text-left text-xs font-semibold transition-all ${
                            intent === 'downsizing'
                              ? 'border-brand bg-brand/10 text-white shadow-[0_0_15px_-3px_rgba(25,230,25,0.4)]'
                              : 'border-white/10 bg-background text-muted-foreground hover:border-white/20'
                          }`}
                        >
                          <p className="font-bold text-sm text-white mb-0.5">Clearing Personal Collection</p>
                          Selling items accumulated as a private collector
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Result Box */}
                  <div className="lg:col-span-6 rounded-2xl border border-brand/40 bg-background/90 p-6 md:p-8 flex flex-col justify-between backdrop-blur">
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <BadgeAlert className={`size-5 ${likelyTrading ? 'text-amber-400' : 'text-brand'}`} />
                        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                          HMRC Assessment Position
                        </span>
                      </div>

                      <h3 className="font-display text-2xl md:text-3xl font-extrabold uppercase [font-stretch:85%]">
                        {likelyTrading ? (
                          <span className="text-amber-400">Trading Activity Indicated</span>
                        ) : (
                          <span className="text-brand">Likely Private Collector Exemption</span>
                        )}
                      </h3>

                      <div className="mt-4 flex flex-col gap-3 text-sm">
                        <div className="flex items-center justify-between py-2.5 border-b border-white/5">
                          <span className="text-muted-foreground">Platforms reporting to HMRC:</span>
                          <span className={isReportedByPlatforms ? 'text-red-400 font-bold' : 'text-brand font-medium'}>
                            {isReportedByPlatforms ? 'YES (Triggered)' : 'Below Reporting Cap'}
                          </span>
                        </div>

                        <div className="flex items-center justify-between py-2.5 border-b border-white/5">
                          <span className="text-muted-foreground">£1,000 Trading Allowance:</span>
                          <span className={isOverTradingAllowance ? 'text-amber-400 font-bold' : 'text-brand font-medium'}>
                            {isOverTradingAllowance ? 'Exceeded' : 'Within Allowance'}
                          </span>
                        </div>

                        <div className="flex items-center justify-between py-2.5">
                          <span className="text-muted-foreground">Self Assessment Requirement:</span>
                          <span className="font-bold text-white">
                            {likelyTrading && isOverTradingAllowance ? 'Mandatory UK Tax Return' : 'Review Recommended'}
                          </span>
                        </div>
                      </div>

                      <p className="mt-4 text-xs text-muted-foreground leading-relaxed">
                        *Important: Even if HMRC sees your gross sales, you only pay tax on your true profit after deducting cost of cards, grading fees, and shipping.
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/10">
                      <Link
                        href="/contact"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand py-4 text-sm font-semibold text-black transition-transform hover:scale-102 shadow-[0_0_20px_-4px_rgba(25,230,25,0.5)]"
                      >
                        <span>Speak to an expert about your numbers</span>
                        <ArrowRight className="size-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard>
          </section>

          {/* 4 Triggers of HMRC Enquiries */}
          <section className="mx-auto max-w-7xl px-5 md:px-8 mt-24">
            <Reveal className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">The Reality of UK Card Trading</p>
              <h2 className="mt-3 font-display text-3xl md:text-5xl font-extrabold uppercase [font-stretch:80%]">
                THE 4 BIGGEST <span className="text-brand">HMRC TRIGGERS</span> FOR COLLECTORS
              </h2>
            </Reveal>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {triggerFactors.map((item, idx) => (
                <Reveal key={item.title} delay={idx * 80}>
                  <div className="group rounded-2xl border border-white/10 bg-card p-6 md:p-8 hover:border-brand/40 hover:shadow-[0_10px_30px_-10px_rgba(25,230,25,0.2)] transition-all hover:-translate-y-1">
                    <div className="flex items-center justify-between mb-4">
                      <span className="flex size-9 items-center justify-center rounded-xl bg-brand/10 border border-brand/30 text-brand group-hover:bg-brand group-hover:text-black transition-colors">
                        <AlertTriangle className="size-4" />
                      </span>
                      <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Impact: <span className="text-white">{item.severity}</span>
                      </span>
                    </div>
                    <h3 className="font-display text-xl font-bold uppercase [font-stretch:85%] group-hover:text-brand transition-colors">{item.title}</h3>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* What to do if you received an HMRC Letter */}
          <section className="mx-auto max-w-7xl px-5 md:px-8 mt-24">
            <div className="rounded-3xl border border-brand/30 bg-card/60 p-8 md:p-14 relative overflow-hidden">
              <div aria-hidden className="absolute -right-32 top-10 size-96 rounded-full bg-brand/10 blur-[130px] pointer-events-none" />

              <Reveal className="max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full bg-brand/10 border border-brand/40 px-3 py-1 text-xs font-bold text-brand uppercase tracking-wider mb-4">
                  <Mail className="size-3.5" /> Action Plan
                </div>
                <h2 className="font-display text-3xl md:text-5xl font-extrabold uppercase [font-stretch:80%]">
                  RECEIVED AN <span className="text-brand">HMRC NUDGE LETTER?</span>
                </h2>
                <p className="mt-4 text-muted-foreground text-base md:text-lg leading-relaxed">
                  HMRC sends letters stating: <em>&quot;We have information that you received income from online marketplace sales...&quot;</em> Here is our 4-step protocol to resolve it without panic.
                </p>
              </Reveal>

              <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {stepsIfContacted.map((s, idx) => (
                  <Reveal key={s.step} delay={idx * 70}>
                    <div className="group rounded-2xl border border-white/10 bg-background p-6 flex flex-col justify-between hover:border-brand/40 transition-all hover:-translate-y-1">
                      <div>
                        <span className="font-display text-4xl font-extrabold text-brand/30 group-hover:text-brand transition-colors">{s.step}</span>
                        <h4 className="mt-3 font-display text-lg font-bold uppercase [font-stretch:85%]">{s.title}</h4>
                        <p className="mt-3 text-xs md:text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={200} className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-white/10 pt-8">
                <div>
                  <p className="font-display text-xl font-bold uppercase [font-stretch:85%]">
                    Need representation with HMRC immediately?
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    We act as your authorized HMRC tax agent and speak to them directly.
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="shrink-0 flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-black transition-transform hover:scale-105 shadow-[0_0_20px_-4px_rgba(25,230,25,0.5)]"
                >
                  <span>Book HMRC Consultation</span>
                  <ArrowUpRight className="size-4" />
                </Link>
              </Reveal>
            </div>
          </section>
        </main>

        <SiteFooter />
      </div>
    </SmoothScroll>
  )
}
