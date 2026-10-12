import { X } from 'lucide-react'
import { Reveal } from './reveal'
import { SectionHeading } from './section-heading'

const explains = [
  'What a slab is',
  'Why sealed products hold value',
  'Card shows & cash deals',
  'Grading submissions',
  'Market trends',
  'Why stock moves constantly',
]

export function Industry() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
      <div className="grid gap-14 lg:grid-cols-2 lg:items-end">
        <SectionHeading
          eyebrow="Why CollectTax"
          title={
            <>
              Normal accountants <span className="text-brand">don&apos;t get our industry.</span>
            </>
          }
          description="We already live and breathe the TCG world. You shouldn't have to explain the basics before getting proper advice."
        />
        <Reveal delay={150}>
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-muted-foreground">
            You shouldn&apos;t have to explain:
          </p>
          <ul className="grid gap-3 sm:grid-cols-2">
            {explains.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-card px-4 py-4 transition-colors hover:border-brand/40"
              >
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-brand/40 text-brand">
                  <X className="size-3.5" aria-hidden />
                </span>
                <span className="text-white/90">{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
