'use client'

import { useState, useEffect, useRef, type FormEvent, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { 
  CheckCircle2, 
  Mail, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  Phone,
  Send,
  MessageSquare,
  ArrowUpRight
} from 'lucide-react'
import { gsap } from 'gsap'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { SmoothScroll } from '@/components/smooth-scroll'
import { ScrollProgress } from '@/components/scroll-progress'
import { TiltCard } from '@/components/tilt-card'
import { Reveal } from '@/components/reveal'

const fieldClass =
  'w-full rounded-xl border border-input bg-background/80 px-4 py-3.5 text-white placeholder:text-muted-foreground/70 outline-none transition-all focus:border-brand focus:ring-2 focus:ring-brand/30'

function ContactFormInner() {
  const searchParams = useSearchParams()
  const preselectedPackage = searchParams ? searchParams.get('package') : null

  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceNeeded: preselectedPackage || 'Self Assessment Tax Return',
    type: 'Collector selling occasionally',
    annualSales: 'Under £10,000',
    tradeInInterest: false,
    message: preselectedPackage ? `Interested in the ${preselectedPackage} package.` : '',
  })

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setErrorMsg('')

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setSent(true)
      } else {
        setErrorMsg(data.message || 'Error sending enquiry. Please try again.')
      }
    } catch (err) {
      setErrorMsg('Network error. Please try again or email us directly.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid gap-12 lg:grid-cols-12 items-start">
      {/* Left Column: Direct Info & Guarantees */}
      <div className="lg:col-span-5 flex flex-col gap-6">
        <Reveal>
          <div className="rounded-3xl border border-white/10 bg-card p-8">
            <h3 className="font-display text-2xl font-bold uppercase [font-stretch:85%]">
              Official Channels
            </h3>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
              Both inboxes are monitored daily by our specialist accountancy staff.
            </p>

            <ul className="mt-6 flex flex-col gap-3">
              {[
                { label: 'General & Client Enquiries', email: 'info@collecttax.co.uk' },
                { label: 'Accounts & Billing Department', email: 'accounts@collecttax.co.uk' },
              ].map((item) => (
                <li key={item.email}>
                  <a
                    href={`mailto:${item.email}`}
                    className="group flex flex-col gap-1 rounded-2xl border border-white/10 bg-background/60 p-4 transition-all hover:border-brand/40 hover:shadow-[0_4px_20px_-4px_rgba(25,230,25,0.2)]"
                  >
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">{item.label}</span>
                    <span className="flex items-center gap-2 text-base font-semibold text-white group-hover:text-brand transition-colors">
                      <Mail className="size-4 text-brand" />
                      {item.email}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* Guarantees Box with 3D Tilt */}
        <Reveal delay={100}>
          <TiltCard max={4} className="rounded-3xl">
            <div className="rounded-3xl border border-brand/20 bg-card/60 p-8 flex flex-col gap-4 backdrop-blur shadow-[0_10px_30px_-10px_rgba(25,230,25,0.15)]">
              <h4 className="font-display text-xl font-bold uppercase [font-stretch:85%] text-white">
                Our Service Commitment
              </h4>
              <div className="flex items-start gap-3">
                <Clock className="size-5 text-brand shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-white">Rapid 24-Hour Response</p>
                  <p className="text-xs text-muted-foreground mt-0.5">We respond to every submission within 1 business day.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck className="size-5 text-brand shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-white">100% Confidentiality</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Your collection size, flips, and earnings remain private.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Sparkles className="size-5 text-brand shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-white">Trade-In Accepted</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Option to pay your fee in graded slabs or sealed booster boxes.</p>
                </div>
              </div>
            </div>
          </TiltCard>
        </Reveal>
      </div>

      {/* Right Column: Interactive Form with 3D Tilt */}
      <div className="lg:col-span-7">
        <TiltCard max={3} className="rounded-3xl">
          <div className="rounded-3xl border border-white/10 bg-card/90 p-6 md:p-10 shadow-[0_20px_80px_-20px_rgba(0,0,0,0.8)] backdrop-blur">
            {sent ? (
              <div className="flex min-h-[460px] flex-col items-center justify-center text-center p-6" role="status">
                <span className="flex size-16 items-center justify-center rounded-full bg-brand/20 border border-brand text-brand">
                  <CheckCircle2 className="size-10" />
                </span>
                <h3 className="mt-6 font-display text-3xl md:text-4xl font-extrabold uppercase [font-stretch:80%]">
                  Enquiry Received
                </h3>
                <p className="mt-3 max-w-md text-muted-foreground text-base leading-relaxed">
                  Thank you for reaching out to CollectTax. A specialist advisor will review your notes and respond to <strong className="text-white">{formData.email}</strong> shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="mt-8 rounded-full border border-white/20 px-6 py-2.5 text-sm font-medium text-white hover:border-brand hover:text-brand transition-colors"
                >
                  Submit Another Query
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="border-b border-white/10 pb-4">
                  <h3 className="font-display text-2xl font-bold uppercase [font-stretch:85%]">
                    Tell Us About Your Setup
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Fill in what you can. No jargon required.
                  </p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-sm font-medium">Your Name</label>
                    <input
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      autoComplete="name"
                      className={fieldClass}
                      placeholder="e.g. Alex Davies"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      autoComplete="email"
                      className={fieldClass}
                      placeholder="alex@gmail.com"
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="phone" className="text-sm font-medium">
                      Phone Number <span className="text-muted-foreground text-xs">(optional)</span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      autoComplete="tel"
                      className={fieldClass}
                      placeholder="07123 456789"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="serviceNeeded" className="text-sm font-semibold text-brand">
                      Accountancy Service Needed <span className="text-xs text-white/70">*</span>
                    </label>
                    <select
                      id="serviceNeeded"
                      name="serviceNeeded"
                      required
                      value={formData.serviceNeeded}
                      onChange={(e) => setFormData({ ...formData, serviceNeeded: e.target.value })}
                      className={`${fieldClass} border-brand/40 bg-brand/5`}
                    >
                      <option className="bg-[#090909]">Self Assessment Tax Return (From £500)</option>
                      <option className="bg-[#090909]">HMRC Nudge Letter / Audit Representation</option>
                      <option className="bg-[#090909]">VAT Registration &amp; Margin Scheme Setup</option>
                      <option className="bg-[#090909]">Limited Company / Full Accounts (£1,800)</option>
                      <option className="bg-[#090909]">Card Show Cash Deals &amp; Inventory Bookkeeping</option>
                      <option className="bg-[#090909]">General TCG Accounting Consultation</option>
                    </select>
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="type" className="text-sm font-medium">What best describes you?</label>
                    <select
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className={fieldClass}
                    >
                      <option className="bg-[#090909]">Collector selling occasionally</option>
                      <option className="bg-[#090909]">Side hustle seller (eBay/Vinted/Whatnot)</option>
                      <option className="bg-[#090909]">Full-time trader / sole trader</option>
                      <option className="bg-[#090909]">Limited company / Card shop</option>
                      <option className="bg-[#090909]">Received an HMRC nudge letter</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="annualSales" className="text-sm font-medium">Rough Annual Sales / Turnover</label>
                    <select
                      id="annualSales"
                      name="annualSales"
                      value={formData.annualSales}
                      onChange={(e) => setFormData({ ...formData, annualSales: e.target.value })}
                      className={fieldClass}
                    >
                      <option className="bg-[#090909]">Under £1,000 (Within allowance)</option>
                      <option className="bg-[#090909]">£1,000 - £10,000 (Self Assessment range)</option>
                      <option className="bg-[#090909]">£10,000 - £50,000 (Active trader)</option>
                      <option className="bg-[#090909]">£50,000 - £90,000 (Approaching VAT threshold)</option>
                      <option className="bg-[#090909]">£90,000+ (High volume / VAT registered)</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Your Situation &amp; Items Traded
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={fieldClass}
                    placeholder="e.g. I sell Pokémon slabs on eBay and trade at London Card Show. Not sure if I need to register for Self Assessment..."
                  />
                </div>

                <div className="flex items-center gap-3 py-1">
                  <input
                    id="tradeInInterest"
                    type="checkbox"
                    checked={formData.tradeInInterest}
                    onChange={(e) => setFormData({ ...formData, tradeInInterest: e.target.checked })}
                    className="size-4 rounded accent-brand cursor-pointer"
                  />
                  <label htmlFor="tradeInInterest" className="text-xs md:text-sm text-white/80 cursor-pointer">
                    I am interested in paying fees via trading cards / slabs trade-in
                  </label>
                </div>

                {errorMsg && (
                  <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-xs text-red-400">
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-3 flex items-center justify-center gap-2 rounded-full bg-brand px-8 py-4 font-semibold text-black transition-transform hover:scale-102 shadow-[0_0_25px_-5px_rgba(25,230,25,0.6)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="size-4" />
                  <span>{loading ? 'Submitting to Specialists...' : 'Send Consultation Enquiry'}</span>
                </button>

                <p className="text-center text-xs text-muted-foreground mt-1">
                  Your business. Your privacy. Handled professionally by CollectTax UK.
                </p>
              </form>
            )}
          </div>
        </TiltCard>
      </div>
    </div>
  )
}

export default function ContactPage() {
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
          {/* Hero Header */}
          <div ref={heroRef} className="relative mx-auto max-w-7xl px-5 md:px-8">
            <div aria-hidden className="absolute -left-32 top-0 size-96 rounded-full bg-brand/15 blur-[140px] pointer-events-none" />

            <div className="max-w-3xl" data-page-title>
              <p className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand backdrop-blur">
                <MessageSquare className="size-3.5" /> Book a Consultation
              </p>
              <h1 className="mt-6 font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight [font-stretch:75%] sm:text-6xl md:text-7xl">
                NOT SURE IF YOU NEED TO <span className="text-brand">PAY TAX?</span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed">
                Work with advisors who understand your passion and your business. Send us a message below and we will get back to you, usually within one working day.
              </p>
            </div>
          </div>

          {/* Contact Form & Direct Contacts */}
          <section className="mx-auto max-w-7xl px-5 md:px-8 mt-16">
            <Suspense fallback={<div className="text-center py-20 text-muted-foreground">Loading form...</div>}>
              <ContactFormInner />
            </Suspense>
          </section>
        </main>

        <SiteFooter />
      </div>
    </SmoothScroll>
  )
}
