import Image from 'next/image'
import { Check, Landmark, Mail } from 'lucide-react'
import { Reveal } from './reveal'
import { SectionHeading } from './section-heading'

const platforms = ['eBay', 'Vinted', 'PayPal', 'Whatnot & other marketplaces', 'Banks & payment providers']

const facts = [
  {
    stat: '30+',
    label: 'sales a year',
    body: 'Digital platforms now report seller income to HMRC once you pass 30 sales or around £1,700 in a calendar year.',
  },
  {
    stat: '£1,000',
    label: 'trading allowance',
    body: 'Go over it from trading activity and you will usually need to register and file a Self Assessment return.',
  },
  {
    stat: '£90k',
    label: 'VAT threshold',
    body: 'Turnover above the VAT registration threshold means VAT registration becomes compulsory.',
  },
]

export function Hmrc() {
  return (
    <section id="hmrc" className="relative scroll-mt-20 overflow-hidden py-24 md:py-32">
      <div aria-hidden className="absolute left-1/2 top-1/3 size-[520px] -translate-x-1/2 rounded-full bg-brand/10 blur-[140px]" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="HMRC & online sellers"
              title={
                <>
                  Sold £10k this year? HMRC <span className="text-brand">can see more</span> than you think.
                </>
              }
              description="If you buy and sell cards, slabs or sealed products for profit, even as a side hustle, HMRC may already class you as trading. It's not if they find out. It's when."
            />
            <Reveal delay={150} className="mt-8 flex items-center gap-3 text-lg font-semibold text-brand">
              <Mail className="size-5" aria-hidden />
              Don&apos;t wait for that letter to find out.
            </Reveal>
          </div>

          <Reveal delay={100}>
            <div className="rounded-3xl border border-brand/30 bg-card p-6 md:p-8">
              <p className="inline-flex rounded-full bg-brand px-4 py-1 text-sm font-bold uppercase tracking-wide text-black">
                Platforms share data
              </p>
              <p className="mt-4 text-muted-foreground">HMRC works with third parties and has access to data from:</p>
              <ul className="mt-5 divide-y divide-white/10">
                {platforms.map((p) => (
                  <li key={p} className="flex items-center justify-between py-3.5">
                    <span className="flex items-center gap-3 text-white">
                      <Landmark className="size-4 text-muted-foreground" aria-hidden />
                      {p}
                    </span>
                    <Check className="size-5 text-brand" aria-label="Shares data" />
                  </li>
                ))}
              </ul>
              <p className="mt-5 rounded-xl border border-white/10 bg-background px-4 py-3 text-sm text-white/80">
                Digital trail. Real consequences. <span className="font-semibold text-brand">Don&apos;t risk it.</span>
              </p>
            </div>
          </Reveal>
        </div>

        <ul className="mt-16 grid gap-4 md:grid-cols-3">
          {facts.map((f, i) => (
            <Reveal as="li" key={f.label} delay={i * 100}>
              <div className="h-full rounded-2xl border border-white/10 bg-background p-6">
                <p className="font-display text-5xl font-extrabold text-brand [font-stretch:80%]">{f.stat}</p>
                <p className="mt-1 text-sm font-semibold uppercase tracking-widest text-white">{f.label}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </ul>
        <p className="mt-4 text-xs text-muted-foreground">
          Figures based on current UK rules and may change. Every situation is different, so speak to us for advice specific to you.
        </p>

        <Reveal className="mt-24 grid overflow-hidden rounded-3xl border border-white/10 bg-card md:grid-cols-2">
          <div className="flex flex-col justify-center p-8 md:p-12">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">This isn&apos;t just cardboard</p>
            <h3 className="mt-4 font-display text-3xl font-extrabold uppercase leading-[0.95] tracking-tight text-balance [font-stretch:80%] md:text-5xl">
              High value TCG assets deserve <span className="text-brand">proper records.</span>
            </h3>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              When a single card is worth more than your first car payment, HMRC might stop seeing it as &lsquo;just
              cardboard&rsquo;. Proof of purchase, valuations and tax reports keep you covered.
            </p>
            <p className="mt-8 font-display text-2xl font-extrabold uppercase tracking-tight [font-stretch:80%]">
              You collect. <span className="text-brand">We handle the tax.</span>
            </p>
          </div>
          <div className="relative min-h-80 bg-white">
            <Image
              src="/images/mascot.png"
              alt="CollectTax mascot holding a graded card slab and a tax spreadsheet"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-contain p-4"
            />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
