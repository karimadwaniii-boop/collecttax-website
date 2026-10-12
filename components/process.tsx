import { Handshake, Lock, ShieldCheck, Users } from 'lucide-react'
import { Reveal } from './reveal'
import { SectionHeading } from './section-heading'

const steps = [
  { title: 'We review your situation', body: 'A free, no-judgement chat about what you buy, sell and hold.' },
  { title: 'We handle the complex stuff', body: 'Records, returns, structure and HMRC, all sorted by specialists.' },
  { title: 'You stay compliant and protected', body: 'Deadlines met, numbers right, no nasty surprises.' },
  { title: 'You focus on growing your business', body: 'Back to hunting grails, booking shows and building stock.' },
]

const values = [
  { icon: Users, title: 'We understand your world', body: "Because we're in it." },
  { icon: Handshake, title: 'We speak your language', body: 'Not accountant jargon.' },
  { icon: ShieldCheck, title: 'Real guidance', body: 'Built around your business.' },
  { icon: Lock, title: 'Your business. Your privacy.', body: 'Handled professionally.' },
]

export function Process() {
  return (
    <section id="process" className="scroll-mt-20 border-t border-white/5 bg-card/40 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="How it works"
          title={
            <>
              Step-by-step <span className="text-brand">peace of mind.</span>
            </>
          }
          description="No stress. No guessing. Just clarity."
        />

        <ol className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 100}>
              <div className="relative h-full rounded-2xl border border-white/10 bg-background p-6">
                <span className="flex size-12 items-center justify-center rounded-full border-2 border-brand font-display text-xl font-bold text-brand">
                  {i + 1}
                </span>
                <h3 className="mt-6 font-display text-xl font-bold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>

        <div className="mt-24 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <SectionHeading
            eyebrow="Community"
            title={
              <>
                We are part of the <span className="text-brand">TCG community.</span>
              </>
            }
          />
          <ul className="grid gap-4 sm:grid-cols-2">
            {values.map((v, i) => (
              <Reveal as="li" key={v.title} delay={i * 80}>
                <div className="flex h-full items-start gap-4 rounded-2xl border border-white/10 bg-background p-5">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-brand/40 text-brand">
                    <v.icon className="size-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-semibold text-white">{v.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{v.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
