'use client'

import { useEffect, useRef } from 'react'
import { ArrowDown, ArrowRight, ShieldCheck, TrendingUp, FileCheck2 } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const lineOne = ['ACCOUNTING', '&', 'TAX', 'FOR']
const lineTwo = ['COLLECTORS', '&', 'TRADERS.']

const chips = [
  { icon: TrendingUp, label: 'Stock valuation', value: 'Tracked' },
  { icon: FileCheck2, label: 'Self Assessment', value: 'Filed' },
  { icon: ShieldCheck, label: 'HMRC status', value: 'Compliant' },
]

export function VideoHero() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-hero-word]', {
        yPercent: 110,
        opacity: 0,
        duration: 1.1,
        ease: 'expo.out',
        stagger: 0.06,
        delay: 0.2,
      })
      gsap.from('[data-hero-fade]', { y: 24, opacity: 0, duration: 1, ease: 'power3.out', stagger: 0.1, delay: 0.8 })

      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom bottom', scrub: 1 },
        })

        tl.to('[data-hero-word]', { yPercent: -120, opacity: 0, stagger: 0.02, ease: 'power2.in', duration: 0.3 }, 0)
          .to('[data-hero-fade]', { y: -40, opacity: 0, duration: 0.2 }, 0)
          .to('[data-hero-hint]', { opacity: 0, duration: 0.1 }, 0)
          .fromTo(
            '[data-hero-video]',
            { clipPath: 'inset(0% 0% 0% 0% round 0px)', scale: 1.15 },
            { clipPath: 'inset(14% 24% 14% 24% round 28px)', scale: 1, ease: 'power2.inOut', duration: 0.6 },
            0.1,
          )
          .to('[data-hero-shade]', { opacity: 0.15, duration: 0.5 }, 0.1)
          .fromTo('[data-hero-left]', { xPercent: -60, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 0.35 }, 0.4)
          .fromTo('[data-hero-right]', { xPercent: 60, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 0.35 }, 0.45)
          .fromTo(
            '[data-hero-chip]',
            { y: 60, opacity: 0, scale: 0.9 },
            { y: 0, opacity: 1, scale: 1, stagger: 0.06, duration: 0.25 },
            0.65,
          )
          .to({}, { duration: 0.15 })
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} id="top" className="relative h-[320vh]" aria-label="Introduction">
      <div className="sticky top-0 flex h-svh items-center justify-center overflow-hidden">
        <div data-hero-video className="absolute inset-0 will-change-[clip-path,transform]">
          <video
            className="size-full object-cover"
            src="/videos/header.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden
          />
          <div data-hero-shade className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,black_95%)]" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pt-16 text-center md:px-8">
          <p
            data-hero-fade
            className="mx-auto inline-flex items-center gap-2 rounded-full border border-brand/40 bg-black/40 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.25em] text-brand backdrop-blur"
          >
            <span className="size-1.5 animate-pulse rounded-full bg-brand" aria-hidden />
            UK tax advisors for the TCG world
          </p>

          <h1 className="mt-6 font-display text-5xl font-extrabold leading-[0.9] tracking-tight [font-stretch:75%] sm:text-6xl lg:text-7xl xl:text-[6.5rem]">
            <span className="flex flex-wrap justify-center gap-x-[0.25em] overflow-hidden pb-2">
              {lineOne.map((w, i) => (
                <span key={i} data-hero-word className="inline-block">
                  {w}
                </span>
              ))}
            </span>
            <span className="flex flex-wrap justify-center gap-x-[0.25em] overflow-hidden pb-2 text-brand">
              {lineTwo.map((w, i) => (
                <span key={i} data-hero-word className="inline-block">
                  {w}
                </span>
              ))}
            </span>
          </h1>

          <p data-hero-fade className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/80 text-pretty">
            Pokémon, One Piece, sports cards, slabs and sealed. We speak your language and handle the complicated HMRC
            stuff.
          </p>

          <div data-hero-fade className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand px-7 py-4 font-semibold text-black shadow-[0_0_40px_-8px_var(--brand)] transition-transform hover:scale-[1.04]"
            >
              Speak to a specialist
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="/about"
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-black/30 px-7 py-4 font-semibold text-white backdrop-blur transition-colors hover:border-brand hover:text-brand"
            >
              Why CollectTax
            </a>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 z-10 hidden items-center justify-between px-6 md:flex xl:px-12">
          <p
            data-hero-left
            className="max-w-[20vw] font-display text-5xl font-extrabold uppercase leading-[0.9] opacity-0 [font-stretch:75%] xl:text-7xl"
          >
            You
            <br />
            collect.
          </p>
          <p
            data-hero-right
            className="max-w-[20vw] text-right font-display text-5xl font-extrabold uppercase leading-[0.9] text-brand opacity-0 [font-stretch:75%] xl:text-7xl"
          >
            We handle
            <br />
            the tax.
          </p>
        </div>

        <ul className="absolute inset-x-0 bottom-6 z-10 flex flex-wrap justify-center gap-3 px-5 md:bottom-10">
          {chips.map((c) => (
            <li
              key={c.label}
              data-hero-chip
              className="flex items-center gap-3 rounded-2xl border border-brand/30 bg-black/70 px-4 py-3 opacity-0 backdrop-blur-md"
            >
              <span className="flex size-9 items-center justify-center rounded-xl bg-brand text-black">
                <c.icon className="size-4" aria-hidden />
              </span>
              <span className="text-left">
                <span className="block text-xs text-white/60">{c.label}</span>
                <span className="block font-display text-lg font-bold text-brand">{c.value}</span>
              </span>
            </li>
          ))}
        </ul>

        <div
          data-hero-hint
          className="absolute bottom-8 right-6 z-10 hidden flex-col items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/60 [writing-mode:vertical-rl] md:flex xl:right-12"
        >
          Scroll
          <ArrowDown className="size-4 animate-bounce text-brand" aria-hidden />
        </div>
      </div>
    </section>
  )
}
