'use client'

import { useEffect, useRef } from 'react'
import { Lock } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  { title: 'We review your situation', body: 'A free chat about what you buy, sell and hold, and where you stand with HMRC.' },
  { title: 'We handle the complex stuff', body: 'Records, stock, expenses, returns and filings. Done by people who know the hobby.' },
  { title: 'You stay compliant and protected', body: 'Everything submitted correctly and on time, with support if HMRC ever gets in touch.' },
  { title: 'You focus on growing your business', body: 'Spend your time on pulls, shows and deals, not spreadsheets and deadlines.' },
]

export function ProcessTimeline() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          '[data-line-fill]',
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: { trigger: '[data-steps]', start: 'top 60%', end: 'bottom 60%', scrub: true },
          },
        )

        gsap.utils.toArray<HTMLElement>('[data-step]').forEach((step) => {
          ScrollTrigger.create({
            trigger: step,
            start: 'top 60%',
            toggleClass: { targets: step, className: 'is-active' },
          })
          gsap.from(step.querySelector('[data-step-body]'), {
            x: 60,
            opacity: 0,
            ease: 'power3.out',
            scrollTrigger: { trigger: step, start: 'top 85%', end: 'top 55%', scrub: 1 },
          })
        })
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} id="process" className="relative py-28 md:py-40">
      <div className="mx-auto grid max-w-7xl gap-16 px-5 md:px-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand">How it works</p>
          <h2 className="mt-5 font-display text-5xl font-extrabold uppercase leading-[0.88] tracking-tight [font-stretch:75%] md:text-7xl">
            Step-by-step <span className="text-brand">peace of mind.</span>
          </h2>
          <div className="mt-10 flex items-center gap-4 rounded-2xl border border-brand/30 bg-card p-5">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-brand/40 text-brand">
              <Lock className="size-5" aria-hidden />
            </span>
            <p className="text-lg">
              No stress. No guessing. <span className="text-brand">Just clarity.</span>
            </p>
          </div>
        </div>

        <ol data-steps className="relative flex flex-col gap-20 pl-20 md:pl-28">
          <span aria-hidden className="absolute bottom-0 left-7 top-0 w-px bg-white/10 md:left-10" />
          <span
            aria-hidden
            data-line-fill
            className="absolute bottom-0 left-7 top-0 w-px origin-top bg-brand shadow-[0_0_14px_var(--brand)] md:left-10"
          />
          {steps.map((s, i) => (
            <li key={s.title} data-step className="group relative">
              <span className="absolute -left-20 top-0 flex size-14 items-center justify-center rounded-full border border-white/15 bg-background font-display text-2xl font-extrabold text-white/40 transition-all duration-500 group-[.is-active]:border-brand group-[.is-active]:bg-brand group-[.is-active]:text-black group-[.is-active]:shadow-[0_0_30px_var(--brand)] md:-left-28 md:size-20 md:text-3xl">
                {i + 1}
              </span>
              <div data-step-body className="pt-2 md:pt-4">
                <h3 className="font-display text-3xl font-extrabold uppercase leading-none text-white/50 transition-colors duration-500 [font-stretch:80%] group-[.is-active]:text-white md:text-5xl">
                  {s.title}
                </h3>
                <p className="mt-4 max-w-lg text-lg leading-relaxed text-muted-foreground">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
