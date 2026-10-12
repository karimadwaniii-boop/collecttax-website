'use client'

import Link from 'next/link'
import { Box, Check, Layers, Square, Star, Sparkles, ArrowRight, ShieldCheck, ArrowUpRight } from 'lucide-react'
import { Reveal } from './reveal'
import { SectionHeading } from './section-heading'
import { TiltCard } from './tilt-card'

const included = [
  'Full Self Assessment tax position review',
  'eBay, Vinted & Whatnot gross sales vs actual profit',
  'PSA / BGS grading fees & legitimate deductions',
  'Show weekend cash deals & trade-in logs',
  'Sole trader & Limited company structure advice',
  'HMRC nudge letter guidance & compliance shield',
  'Inventory & stock valuation at year end',
  'Direct year-round specialist support',
]

const tradeIn = [
  { icon: Square, label: 'PSA / BGS Slabs', highlight: 'Graded' },
  { icon: Box, label: 'Sealed Product', highlight: 'Boxes' },
  { icon: Layers, label: 'Trading Cards', highlight: 'Singles' },
  { icon: Star, label: 'Collectibles', highlight: 'Grails' },
]

export function Packages() {
  return (
    <section id="packages" className="relative scroll-mt-20 overflow-hidden py-28 md:py-36">
      {/* Dynamic Background Glows */}
      <div aria-hidden className="absolute -right-40 top-20 size-[550px] rounded-full bg-brand/15 blur-[150px] pointer-events-none" />
      <div aria-hidden className="absolute -left-40 bottom-10 size-[500px] rounded-full bg-brand/10 blur-[130px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          center
          eyebrow="Flat Transparent Pricing"
          title={
            <>
              Support packages that <span className="text-brand">cover it all.</span>
            </>
          }
        />

        <Reveal className="mx-auto mt-16 max-w-5xl">
          <TiltCard max={4} className="rounded-[2.5rem]">
            {/* Glassmorphic Container with Backdrop Blur, Glowing Border & Gradient */}
            <div className="relative overflow-hidden rounded-[2.5rem] border border-brand/40 bg-card/60 backdrop-blur-2xl shadow-[0_30px_100px_-20px_rgba(25,230,25,0.25)] transition-all duration-500 hover:border-brand/60">
              
              {/* Glass Glare & Specular Reflection Line */}
              <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/60 to-transparent" />
              
              <div className="grid md:grid-cols-12 items-stretch">
                
                {/* LEFT COLUMN: Pricing & Trade-In (Frosted Glass Panel) */}
                <div className="md:col-span-5 flex flex-col justify-between gap-8 border-b md:border-b-0 md:border-r border-white/10 bg-gradient-to-b from-brand/15 via-white/[0.03] to-transparent p-8 lg:p-12">
                  <div>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/40 bg-brand/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-brand backdrop-blur-md">
                      <Sparkles className="size-3" /> All-Inclusive Base
                    </span>
                    
                    <div className="mt-6">
                      <p className="text-xs font-semibold uppercase tracking-widest text-white/70">Packages start from</p>
                      <div className="mt-2 flex items-baseline gap-2">
                        <span className="font-display text-6xl lg:text-7xl font-black leading-none text-brand [font-stretch:75%] tracking-tight drop-shadow-[0_0_35px_rgba(25,230,25,0.5)]">
                          £500
                        </span>
                        <span className="text-sm font-bold uppercase tracking-wider text-white/80">
                          / tax year
                        </span>
                      </div>
                      <p className="mt-2 text-xs text-muted-foreground">
                        Transparent flat fee • Zero hidden accountant hours
                      </p>
                    </div>
                  </div>

                  {/* Unique Trade-In Glass Container */}
                  <div className="rounded-2xl border border-white/10 bg-black/40 p-5 backdrop-blur-md shadow-inner">
                    <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-white/80">
                      <span className="h-px flex-1 bg-brand/30" />
                      <span>Or Settle In</span>
                      <span className="h-px flex-1 bg-brand/30" />
                    </div>

                    <ul className="mt-4 grid grid-cols-2 gap-2.5">
                      {tradeIn.map((t) => (
                        <li
                          key={t.label}
                          className="group/item flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-2.5 transition-all hover:border-brand/40 hover:bg-brand/5"
                        >
                          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-brand/30 bg-black/50 text-brand group-hover/item:bg-brand group-hover/item:text-black transition-colors">
                            <t.icon className="size-4" aria-hidden />
                          </span>
                          <span className="text-left leading-tight">
                            <span className="block text-xs font-bold text-white group-hover/item:text-brand transition-colors">
                              {t.label}
                            </span>
                            <span className="block text-[10px] text-muted-foreground">{t.highlight}</span>
                          </span>
                        </li>
                      ))}
                    </ul>

                    <p className="mt-3.5 text-center text-[11px] leading-relaxed text-muted-foreground">
                      We understand real market liquid value behind what you collect.
                    </p>
                  </div>
                </div>

                {/* RIGHT COLUMN: Checklist & Actions (Dark Frosted Glass Panel) */}
                <div className="md:col-span-7 flex flex-col justify-between bg-black/30 p-8 lg:p-12 backdrop-blur-md">
                  <div>
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <div>
                        <h3 className="font-display text-2xl lg:text-3xl font-extrabold uppercase [font-stretch:80%] text-white">
                          Every Package Includes
                        </h3>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Tailored exclusively for the UK TCG &amp; collectibles industry
                        </p>
                      </div>
                      <ShieldCheck className="size-6 text-brand" />
                    </div>

                    <ul className="mt-6 flex flex-col gap-3">
                      {included.map((item) => (
                        <li key={item} className="group/item flex items-center gap-3 text-sm text-white/90">
                          <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-brand/20 text-brand border border-brand/40 group-hover/item:bg-brand group-hover/item:text-black transition-colors">
                            <Check className="size-3 stroke-[3]" aria-hidden />
                          </span>
                          <span className="leading-snug text-white/95 group-hover/item:text-white transition-colors">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Buttons with Glassmorphic styling */}
                  <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-3">
                    <Link
                      href="/pricing"
                      className="group flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-4 text-sm font-bold text-black transition-transform hover:scale-[1.03] shadow-[0_0_30px_-5px_rgba(25,230,25,0.6)]"
                    >
                      <span>Compare All Plans &amp; FAQ</span>
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-4 text-sm font-semibold text-white backdrop-blur-md hover:border-brand hover:text-brand transition-all"
                    >
                      <span>Custom Quote</span>
                      <ArrowUpRight className="size-4" />
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          </TiltCard>
        </Reveal>
      </div>
    </section>
  )
}
