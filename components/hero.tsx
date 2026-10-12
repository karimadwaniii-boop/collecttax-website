import Image from 'next/image'
import { ArrowRight, ShieldCheck, TrendingUp } from 'lucide-react'
import { TiltCard } from './tilt-card'

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 md:pt-36">
      <div aria-hidden className="grid-bg absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
      <div aria-hidden className="absolute -top-40 right-0 size-[640px] rounded-full bg-brand/15 blur-[140px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 pb-20 md:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:pb-28">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-brand">
            <span className="size-1.5 rounded-full bg-brand" aria-hidden />
            UK tax advisors for the TCG world
          </p>

          <h1 className="mt-6 font-display text-5xl font-extrabold leading-[0.95] tracking-tight text-balance [font-stretch:80%] sm:text-6xl lg:text-7xl xl:text-8xl">
            ACCOUNTING &amp; TAX FOR <span className="text-brand">COLLECTORS</span> AND{' '}
            <span className="text-brand">TRADERS.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">
            Pokémon, One Piece, sports cards, slabs and sealed. We speak your language, handle the complicated
            HMRC stuff, and keep your collecting business protected.
          </p>

          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Core services">
            {['Tax Returns', 'Limited Companies', 'Bookkeeping', 'VAT', 'Expenses', 'Business Advice'].map((s) => (
              <li key={s} className="rounded-full border border-white/10 px-3 py-1 text-sm text-white/80">
                {s}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand px-7 py-4 font-semibold text-black transition-transform hover:scale-[1.03]"
            >
              Speak to a specialist
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center rounded-full border border-white/15 px-7 py-4 font-semibold text-white transition-colors hover:border-brand hover:text-brand"
            >
              See our services
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm lg:max-w-md">
          <div className="animate-float">
            <TiltCard className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/[0.02] p-3 shadow-[0_40px_120px_-20px_rgb(25_230_25/0.35)]">
              <Image
                src="/images/slab.png"
                alt="A graded trading card in a protective slab"
                width={640}
                height={860}
                priority
                className="aspect-[3/4] w-full rounded-2xl object-cover [transform:translateZ(40px)]"
              />
            </TiltCard>
          </div>

          <div className="absolute -left-4 top-10 hidden rounded-2xl border border-white/10 bg-card/90 p-4 backdrop-blur md:-left-16 md:block">
            <div className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-xl bg-brand/15 text-brand">
                <TrendingUp className="size-4" />
              </span>
              <div>
                <p className="text-xs text-muted-foreground">Stock valuation</p>
                <p className="font-display text-lg font-bold">Tracked</p>
              </div>
            </div>
          </div>
          <div className="absolute -right-2 bottom-12 hidden rounded-2xl border border-brand/30 bg-card/90 p-4 backdrop-blur md:-right-10 md:block">
            <div className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-xl bg-brand text-black">
                <ShieldCheck className="size-4" />
              </span>
              <div>
                <p className="text-xs text-muted-foreground">HMRC status</p>
                <p className="font-display text-lg font-bold text-brand">Compliant</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
