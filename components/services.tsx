import { BookOpen, Briefcase, Building2, FileText, MessagesSquare, Percent, Receipt } from 'lucide-react'
import { Reveal } from './reveal'
import { SectionHeading } from './section-heading'

const services = [
  {
    icon: FileText,
    title: 'Tax Returns / Self Assessment',
    body: 'Sole trader returns prepared properly, with your card sales, purchases and stock movements reflected accurately.',
  },
  {
    icon: Building2,
    title: 'Limited Company Accounts',
    body: 'Year-end accounts, Corporation Tax and Companies House filings for collectibles businesses trading as a company.',
  },
  {
    icon: BookOpen,
    title: 'Bookkeeping',
    body: 'Clean records of every pull, flip and show deal, from marketplace payouts to grading fees and postage.',
  },
  {
    icon: Percent,
    title: 'VAT',
    body: 'Registration, threshold monitoring and margin scheme guidance for second-hand goods and collectibles.',
  },
  {
    icon: Receipt,
    title: 'Expenses & Tax Advice',
    body: 'Claim what you are entitled to: grading, supplies, travel to shows, platform fees, storage and more.',
  },
  {
    icon: Briefcase,
    title: 'Business & Trader Accounting',
    body: 'Sole trader or limited company? Business structure guidance as your collecting turns into a real business.',
  },
  {
    icon: MessagesSquare,
    title: 'HMRC Letters & Compliance',
    body: 'Received a nudge letter or compliance check? We help you respond calmly, correctly and on time.',
  },
]

export function Services() {
  return (
    <section id="services" className="relative scroll-mt-20 border-t border-white/5 bg-card/40 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Services"
          title={
            <>
              Everything your <span className="text-brand">collecting business</span> needs.
            </>
          }
          description="Specialist accounting built around how collectors and traders actually buy, sell and hold stock."
        />

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <Reveal
              as="li"
              key={s.title}
              delay={i * 60}
              className={i === 0 ? 'sm:col-span-2 lg:row-span-2' : ''}
            >
              <article
                className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-background p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 ${
                  i === 0 ? 'justify-end bg-gradient-to-br from-brand/20 via-background to-background md:p-10' : ''
                }`}
              >
                <span className="flex size-12 items-center justify-center rounded-xl border border-brand/30 bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-black">
                  <s.icon className="size-5" aria-hidden />
                </span>
                <h3 className={`mt-6 font-display font-bold ${i === 0 ? 'text-3xl md:text-4xl' : 'text-xl'}`}>{s.title}</h3>
                <p className={`mt-3 leading-relaxed text-muted-foreground ${i === 0 ? 'max-w-md text-lg' : 'text-sm'}`}>
                  {s.body}
                </p>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
