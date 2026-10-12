'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { Box, CalendarDays, Gem, LineChart, Repeat, Award, Users, Handshake, ShieldCheck, Lock, ArrowUpRight } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const items = [
  {
    icon: Gem,
    title: 'What a slab is',
    body: 'PSA, BGS, CGC. We know a graded 10 is a completely different financial asset to a raw card, with separate valuation, market demand and liquidity.',
    image: '/images/slab.png',
    badge: 'Graded Slabs & Holos',
  },
  {
    icon: Box,
    title: 'Why sealed holds value',
    body: 'Booster boxes and ETBs held as stock, valued properly at year end without triggering unfair phantom profit tax.',
    image: '/images/sealed-product.jpg',
    badge: 'Sealed Product & Boxes',
  },
  {
    icon: CalendarDays,
    title: 'Card shows & cash deals',
    body: 'Show weekends, vendor tables, trades and cash settlements at London Card Show & expos recorded accurately.',
    image: '/images/card-shows.jpg',
    badge: 'Expos & Trade Nights',
  },
  {
    icon: Award,
    title: 'Grading submissions',
    body: 'PSA, BGS and Ace grading fees, insured courier charges and turnaround batches claimed as legitimate business deductions.',
    image: '/images/grading-submissions.jpg',
    badge: 'Grading Inspection & Costs',
  },
  {
    icon: LineChart,
    title: 'Market trends & charts',
    body: 'Spikes, dips and reprints. We understand why your card portfolio fluctuates and how to reflect it on your tax return.',
    image: '/images/market-trends.jpg',
    badge: 'Portfolio & Price Volatility',
  },
  {
    icon: Repeat,
    title: 'Why stock moves constantly',
    body: 'Pulls, flips, multi-card trade swaps and breaker boxes. Dynamic inventory that never sits still in an ordinary warehouse.',
    image: '/images/real-charizard.jpg',
    badge: 'Active Card Inventory',
  },
]

const community = [
  { icon: Users, text: 'We understand your world because we are in it.' },
  { icon: Handshake, text: 'We speak your language. Not accountant jargon.' },
  { icon: ShieldCheck, text: 'Real guidance built around your business.' },
  { icon: Lock, text: 'Your business. Your privacy. Handled professionally.' },
]

export function IndustryScroll() {
  const root = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const el = track.current!
        const distance = () => el.scrollWidth - window.innerWidth

        const tween = gsap.to(el, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        })

        gsap.to('[data-industry-bar]', {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: () => `+=${distance()}`, scrub: true },
        })

        gsap.utils.toArray<HTMLElement>('[data-industry-card]').forEach((card) => {
          gsap.fromTo(
            card,
            { rotate: 3, y: 40, opacity: 0.5 },
            {
              rotate: 0,
              y: 0,
              opacity: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                containerAnimation: tween,
                start: 'left 95%',
                end: 'left 55%',
                scrub: true,
              },
            },
          )
        })
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} id="industry" className="relative overflow-hidden bg-background">
      <div aria-hidden className="grid-bg absolute inset-0 opacity-60" />
      <div className="relative flex h-svh flex-col justify-center">
        <div ref={track} className="flex w-max items-center gap-6 px-5 md:gap-8 md:px-12">
          
          {/* Introductory Heading Card */}
          <div className="flex w-[85vw] shrink-0 flex-col justify-center md:w-[44vw]">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand">Why CollectTax</p>
            <h2 className="mt-5 font-display text-5xl font-extrabold uppercase leading-[0.88] tracking-tight [font-stretch:75%] md:text-7xl xl:text-8xl">
              Normal accountants <span className="text-brand">don&apos;t get our industry.</span>
            </h2>
            <p className="mt-6 max-w-md text-lg text-muted-foreground leading-relaxed">
              You shouldn&apos;t have to explain any of this. We already live and breathe the collectibles and TCG ecosystem.
            </p>
            <p className="mt-8 inline-flex items-center gap-3 text-sm uppercase tracking-[0.25em] text-white/60">
              Scroll horizontally <span className="h-px w-16 bg-brand" aria-hidden />
            </p>
          </div>

          {/* Cards with 100% Exact TCG Matching Pictures */}
          {items.map((item, i) => (
            <article
              key={item.title}
              data-industry-card
              className="group relative flex h-[72vh] max-h-[600px] w-[82vw] shrink-0 flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-[#080808] p-7 md:w-[32vw] md:p-8 transition-all duration-500 hover:border-brand/70 hover:shadow-[0_25px_90px_-20px_rgba(25,230,25,0.35)]"
            >
              {/* Full-bleed Curated Image Layer */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover opacity-60 scale-100 transition-all duration-700 ease-out group-hover:scale-108 group-hover:opacity-75"
                  sizes="(max-width: 768px) 80vw, 32vw"
                />
                {/* Gradient Vignette to keep text readable */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/25" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_30%,rgba(5,5,5,0.92)_100%)]" />
              </div>

              {/* Ambient Glow */}
              <div
                aria-hidden
                className="pointer-events-none absolute -right-20 -top-20 size-60 rounded-full bg-brand/15 blur-3xl transition-opacity group-hover:opacity-100"
              />

              {/* Top Header Badge & Number */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="flex items-center gap-2 rounded-full border border-brand/40 bg-black/80 px-3.5 py-1.5 text-xs font-bold text-brand uppercase tracking-wider backdrop-blur-md shadow-sm">
                  <item.icon className="size-3.5" />
                  {item.badge}
                </span>
                <span className="font-display text-5xl font-black leading-none text-white/30 [font-stretch:75%] group-hover:text-brand/60 transition-colors">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Bottom Text Content with Glass Capsule */}
              <div className="relative z-10 pt-16">
                <div className="inline-block w-full rounded-2xl border border-white/10 bg-black/80 p-5 backdrop-blur-md transition-colors group-hover:border-brand/40">
                  <h3 className="font-display text-2xl md:text-3xl font-extrabold uppercase leading-tight [font-stretch:80%] text-white group-hover:text-brand transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground group-hover:text-white/90 transition-colors">
                    {item.body}
                  </p>
                </div>
              </div>
            </article>
          ))}

          {/* Community Final Slide */}
          <div className="flex w-[85vw] shrink-0 flex-col justify-center rounded-3xl border border-brand/40 bg-gradient-to-br from-brand/15 to-card p-8 md:w-[42vw] md:p-12 shadow-[0_20px_80px_-20px_rgba(25,230,25,0.25)]">
            <span className="inline-block rounded-full bg-brand/20 border border-brand/40 px-3.5 py-1 text-xs font-bold text-brand uppercase tracking-wider w-fit mb-4">
              TCG Born &amp; Bred
            </span>
            <h3 className="font-display text-4xl font-extrabold uppercase leading-[0.9] [font-stretch:75%] md:text-6xl text-white">
              We are part of the <span className="text-brand">TCG community.</span>
            </h3>
            <ul className="mt-8 flex flex-col gap-4">
              {community.map((c) => (
                <li key={c.text} className="flex items-center gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-brand/40 bg-black/40 text-brand">
                    <c.icon className="size-5" aria-hidden />
                  </span>
                  <span className="text-white/90 text-sm md:text-base font-medium">{c.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Horizontal Progress Bar */}
        <div className="absolute inset-x-5 bottom-8 h-1 bg-white/10 md:inset-x-12 rounded-full overflow-hidden" aria-hidden>
          <div data-industry-bar className="h-full origin-left scale-x-0 bg-brand shadow-[0_0_10px_var(--brand)]" />
        </div>
      </div>
    </section>
  )
}
