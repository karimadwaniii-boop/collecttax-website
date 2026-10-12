'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { 
  ShieldCheck, 
  Target, 
  HelpCircle, 
  Zap, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp,
  Layers,
  HeartHandshake,
  Users,
  ArrowUpRight
} from 'lucide-react'
import { gsap } from 'gsap'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { SmoothScroll } from '@/components/smooth-scroll'
import { ScrollProgress } from '@/components/scroll-progress'
import { TiltCard } from '@/components/tilt-card'
import { Reveal } from '@/components/reveal'
import { Wordmark } from '@/components/wordmark'

const comparisonPoints = [
  {
    feature: 'Understands PSA, BGS, CGC Slabs',
    collectTax: 'Yes – We track grading costs, declared values, and slab price fluctuations daily.',
    regular: 'No – They treat them as generic merchandise or don’t understand grading turnaround times.',
  },
  {
    feature: 'Sealed Product Inventory Treatment',
    collectTax: 'Yes – Accurate inventory accounting avoiding unfair phantom tax on held booster boxes.',
    regular: 'No – Often calculate taxes as if your entire stock was liquidated for cash.',
  },
  {
    feature: 'Card Shows & Cash Trade Deals',
    collectTax: 'Yes – We have systems specifically designed for card convention trade nights and vendor tables.',
    regular: 'No – Get confused when you trade 3 slabs for 1 high-end vintage card plus cash.',
  },
  {
    feature: 'eBay, Vinted & Whatnot Payouts',
    collectTax: 'Yes – Direct platform statement reconciliations that deduct all hidden platform fees.',
    regular: 'No – Often take gross payout amounts without reconciling real platform deductions.',
  },
  {
    feature: 'Payment Options',
    collectTax: 'Cash, bank transfer, or equivalent value in trading cards & sealed product.',
    regular: 'Cash / Bank transfer only with billable hourly rates.',
  },
]

export default function AboutPage() {
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
          <div ref={heroRef} className="relative mx-auto max-w-7xl px-5 md:px-8">
            <div aria-hidden className="absolute -left-20 top-10 size-96 rounded-full bg-brand/15 blur-[140px] pointer-events-none" />

            <div className="max-w-3xl" data-page-title>
              <p className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand backdrop-blur">
                <Users className="size-3.5" /> Our Mission &amp; Background
              </p>
              <h1 className="mt-6 font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight [font-stretch:75%] sm:text-6xl md:text-7xl">
                WE SPEAK <span className="text-brand">COLLECTOR.</span> WE SOLVE <span className="text-brand">TAX.</span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed">
                CollectTax was born out of frustration with ordinary accountants who have zero understanding of the booming UK trading card and collectibles scene.
              </p>
            </div>
          </div>

          {/* The CollectTax Story with 2-Column Split: Text Left + Showcase Right */}
          <section className="mx-auto max-w-7xl px-5 md:px-8 mt-16">
            <div className="grid gap-12 lg:grid-cols-12 items-center">
              
              <div className="lg:col-span-7">
                <TiltCard max={3} className="rounded-[2.5rem]">
                  <div className="rounded-[2.5rem] border border-brand/40 bg-card/60 p-8 md:p-12 relative overflow-hidden backdrop-blur-2xl shadow-[0_20px_80px_-20px_rgba(25,230,25,0.25)]">
                    <div aria-hidden className="absolute -right-20 -bottom-20 size-80 rounded-full bg-brand/15 blur-3xl pointer-events-none" />

                    <h2 className="font-display text-3xl md:text-4xl font-extrabold uppercase [font-stretch:80%] text-white">
                      THE REALITY OF THE <span className="text-brand">TCG INDUSTRY</span>
                    </h2>
                    <div className="mt-6 flex flex-col gap-4 text-base text-muted-foreground leading-relaxed relative z-10">
                      <p>
                        Over the last few years, the UK collectibles market has transformed. Thousands of dedicated individuals are moving serious money buying, grading, holding, and flipping Pokémon, One Piece, sports cards, and sealed booster boxes.
                      </p>
                      <p>
                        Yet, when collectors speak to their local high-street accountant, the same issues always occur:
                      </p>
                      <ul className="flex flex-col gap-2.5 text-white/90 pl-2">
                        <li className="flex items-center gap-2">
                          <span className="size-1.5 rounded-full bg-brand" />
                          They don&apos;t know what a PSA 10 or BGS black label is.
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="size-1.5 rounded-full bg-brand" />
                          They don&apos;t understand trade-ins or card show deals.
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="size-1.5 rounded-full bg-brand" />
                          They can&apos;t advise on whether you are classified as a hobbyist or an active trader.
                        </li>
                      </ul>
                      <p>
                        That&apos;s exactly why <strong className="text-white">CollectTax</strong> was created — to give UK collectors a specialized, modern accountancy partner who speaks their exact language.
                      </p>
                    </div>
                  </div>
                </TiltCard>
              </div>

              {/* Right Showcase Column (Pill Cards with Visuals) */}
              <div className="lg:col-span-5 flex flex-col gap-5">
                {[
                  { icon: Target, title: 'Specialised TCG Focus', desc: '100% focused on cards, slabs, boxes, and show traders.', image: '/images/slab.png' },
                  { icon: ShieldCheck, title: 'Total Privacy & Discretion', desc: 'Strict UK data protection covering all accounts and assets.', image: '/images/card-shows.jpg' },
                  { icon: HeartHandshake, title: 'Community Rooted', desc: 'We attend card conventions and understand market sentiment.', image: '/images/sealed-product.jpg' },
                ].map((item, idx) => (
                  <Reveal key={item.title} delay={idx * 80}>
                    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/60 p-6 backdrop-blur-xl hover:border-brand/50 transition-all hover:-translate-y-1">
                      <div className="flex items-start gap-4 relative z-10">
                        <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand/10 border border-brand/30 text-brand group-hover:bg-brand group-hover:text-black transition-colors">
                          <item.icon className="size-6" />
                        </span>
                        <div>
                          <h3 className="font-display text-xl font-bold uppercase [font-stretch:85%] text-white group-hover:text-brand transition-colors">{item.title}</h3>
                          <p className="mt-1 text-xs md:text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>

            </div>
          </section>

          {/* Head-to-Head Comparison Table with Frosted Glass */}
          <section className="mx-auto max-w-7xl px-5 md:px-8 mt-24">
            <Reveal className="text-center max-w-2xl mx-auto">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">Side-by-side comparison</p>
              <h2 className="mt-3 font-display text-3xl md:text-5xl font-extrabold uppercase [font-stretch:80%]">
                COLLECTTAX VS <span className="text-brand">ORDINARY ACCOUNTANTS</span>
              </h2>
            </Reveal>

            <Reveal delay={150} className="mt-12 overflow-x-auto rounded-[2.5rem] border border-white/10 bg-card/50 backdrop-blur-2xl shadow-[0_20px_80px_-20px_rgba(0,0,0,0.8)] p-2">
              <table className="w-full text-left text-sm border-collapse min-w-[640px]">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="p-6 font-semibold text-white/80">Key Feature / Scenario</th>
                    <th className="p-6 font-bold text-brand bg-brand/10 rounded-t-2xl">CollectTax</th>
                    <th className="p-6 font-semibold text-muted-foreground">High-Street Accountant</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {comparisonPoints.map((row) => (
                    <tr key={row.feature} className="hover:bg-white/[0.03] transition-colors">
                      <td className="p-6 font-medium text-white/90">{row.feature}</td>
                      <td className="p-6 text-white bg-brand/5 border-x border-brand/20 font-medium">
                        {row.collectTax}
                      </td>
                      <td className="p-6 text-muted-foreground">{row.regular}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Reveal>
          </section>

          {/* CTA Section with 3D Tilt */}
          <section className="mx-auto max-w-5xl px-5 md:px-8 mt-24 text-center">
            <TiltCard max={3} className="rounded-[2.5rem]">
              <div className="rounded-[2.5rem] border border-brand/40 bg-card/60 p-10 md:p-16 backdrop-blur-2xl shadow-[0_20px_80px_-20px_rgba(25,230,25,0.3)]">
                <Wordmark className="text-4xl md:text-5xl" />
                <h3 className="mt-6 font-display text-3xl md:text-4xl font-extrabold uppercase [font-stretch:80%] text-white">
                  READY TO WORK WITH ACCOUNTANTS WHO <span className="text-brand">ACTUALLY GET IT?</span>
                </h3>
                <p className="mt-4 max-w-xl mx-auto text-muted-foreground text-base">
                  Book a free consultation today. No obligations, no jargon. Just real advice tailored to your card collection.
                </p>
                <div className="mt-8 flex justify-center">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-full bg-brand px-8 py-4 font-bold text-black transition-transform hover:scale-105 shadow-[0_0_25px_-5px_rgba(25,230,25,0.6)]"
                  >
                    <span>Book your free chat</span>
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>
            </TiltCard>
          </section>
        </main>

        <SiteFooter />
      </div>
    </SmoothScroll>
  )
}
