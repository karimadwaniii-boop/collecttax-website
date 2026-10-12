'use client'

import { useEffect, useRef } from 'react'
import { Check, Landmark, Mail } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const statement =
  'If you buy and sell cards, slabs or sealed products for profit, even as a side hustle, HMRC may already class you as trading. It is not if they find out. It is when.'
const highlight = new Set(['trading.', 'when.', 'HMRC'])

const platforms = ['eBay', 'Vinted', 'PayPal', 'Whatnot & marketplaces', 'Banks & payment providers']

const facts = [
  { value: 30, prefix: '', suffix: '+', label: 'sales a year', body: 'Platforms report seller income to HMRC past 30 sales or about £1,700 a year.' },
  { value: 1000, prefix: '£', suffix: '', label: 'trading allowance', body: 'Go over it from trading and you will usually need to file Self Assessment.' },
  { value: 90, prefix: '£', suffix: 'k', label: 'VAT threshold', body: 'Turnover above this means VAT registration becomes compulsory.' },
]

export function HmrcScroll() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          '[data-word]',
          { opacity: 0.12 },
          {
            opacity: 1,
            stagger: 0.1,
            ease: 'none',
            scrollTrigger: { trigger: '[data-statement]', start: 'top 80%', end: 'bottom 45%', scrub: true },
          },
        )

        gsap.from('[data-platform]', {
          x: 80,
          opacity: 0,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: '[data-platforms]', start: 'top 75%', end: 'top 35%', scrub: 1 },
        })

        gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
          const target = Number(el.dataset.count)
          const obj = { v: 0 }
          gsap.to(obj, {
            v: target,
            duration: 1.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
            onUpdate: () => {
              el.textContent = Math.round(obj.v).toLocaleString('en-GB')
            },
          })
        })
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} id="hmrc" className="relative overflow-hidden py-28 md:py-40">
      <div aria-hidden className="absolute left-1/2 top-0 size-[620px] -translate-x-1/2 rounded-full bg-brand/10 blur-[160px]" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand">HMRC is cracking down on online sellers</p>
        <p
          data-statement
          className="mt-8 font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight [font-stretch:80%] md:text-6xl xl:text-7xl"
        >
          {statement.split(' ').map((w, i) => (
            <span key={i} data-word className={`inline-block pr-[0.25em] ${highlight.has(w) ? 'text-brand' : ''}`}>
              {w}
            </span>
          ))}
        </p>

        <div className="mt-24 grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h3 className="font-display text-4xl font-extrabold uppercase leading-[0.9] [font-stretch:75%] md:text-6xl">
              Sold £10k this year? <span className="text-brand">HMRC can see more</span> than you think.
            </h3>
            <p className="mt-6 flex items-center gap-3 text-lg font-semibold text-brand">
              <Mail className="size-5" aria-hidden />
              Don&apos;t wait for that letter to find out.
            </p>
            <div className="mt-6">
              <a
                href="/hmrc-sellers"
                className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-brand hover:bg-brand hover:text-black transition-all"
              >
                <span>Read Full HMRC Guidance &amp; Calculator</span>
                <span>&rarr;</span>
              </a>
            </div>
          </div>

          <div data-platforms className="rounded-3xl border border-brand/30 bg-card p-6 md:p-8">
            <p className="inline-flex rounded-full bg-brand px-4 py-1 text-sm font-bold uppercase tracking-wide text-black">
              Platforms share data
            </p>
            <p className="mt-4 text-muted-foreground">HMRC works with third parties and has access to data from:</p>
            <ul className="mt-4 divide-y divide-white/10">
              {platforms.map((p) => (
                <li key={p} data-platform className="flex items-center justify-between py-4">
                  <span className="flex items-center gap-3 text-lg text-white">
                    <Landmark className="size-4 text-muted-foreground" aria-hidden />
                    {p}
                  </span>
                  <Check className="size-5 text-brand" aria-label="Shares data" />
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-white/70">
              Digital trail. Real consequences. <span className="font-semibold text-brand">Don&apos;t risk it.</span>
            </p>
          </div>
        </div>

        <ul className="mt-20 grid gap-4 md:grid-cols-3">
          {facts.map((f) => (
            <li key={f.label} className="rounded-2xl border border-white/10 bg-background p-7 transition-colors hover:border-brand/50">
              <p className="font-display text-6xl font-extrabold text-brand [font-stretch:75%]">
                {f.prefix}
                <span data-count={f.value}>{f.value.toLocaleString('en-GB')}</span>
                {f.suffix}
              </p>
              <p className="mt-1 text-sm font-semibold uppercase tracking-widest">{f.label}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-muted-foreground">
          Based on current UK rules, which may change. Speak to us for advice specific to you.
        </p>
      </div>
    </section>
  )
}
