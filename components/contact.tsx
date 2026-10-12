'use client'

import { useState, type FormEvent } from 'react'
import { CheckCircle2, Mail, Sparkles, Clock, ShieldCheck, Send, ArrowRight, Lock } from 'lucide-react'
import { Reveal } from './reveal'
import { TiltCard } from './tilt-card'

const fieldClass =
  'w-full rounded-2xl border border-white/10 bg-black/50 px-4 py-3.5 text-white placeholder:text-muted-foreground/60 outline-none backdrop-blur-md transition-all duration-300 focus:border-brand focus:bg-black/70 focus:ring-2 focus:ring-brand/30 hover:border-white/20'

export function Contact() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setErrorMsg('')

    const formData = new FormData(e.currentTarget)
    const payload = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      type: `${formData.get('serviceNeeded')} (${formData.get('type')})`,
      serviceNeeded: formData.get('serviceNeeded') as string,
      message: formData.get('message') as string,
      annualSales: 'Consultation Form Submission',
      tradeInInterest: false,
    }

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setSent(true)
      } else {
        setErrorMsg(data.message || 'Something went wrong. Please try again.')
      }
    } catch (err) {
      setErrorMsg('Network error. Please try again or email us directly.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="relative scroll-mt-20 overflow-hidden border-t border-white/5 py-28 md:py-36">
      {/* Background Ambient Glows */}
      <div aria-hidden className="absolute -left-40 top-1/3 size-[500px] rounded-full bg-brand/10 blur-[150px] pointer-events-none" />
      <div aria-hidden className="absolute right-0 bottom-10 size-[450px] rounded-full bg-brand/10 blur-[130px] pointer-events-none" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-12 items-center">
        
        {/* Left Column (Brand Positioning & Reassurance) */}
        <div className="lg:col-span-5">
          <Reveal>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/40 bg-brand/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-brand backdrop-blur-md">
              <Sparkles className="size-3.5" /> Speak to a Specialist
            </span>

            <h2 className="mt-5 font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight [font-stretch:80%] md:text-6xl text-white">
              Not sure if you need to pay tax on <span className="text-brand drop-shadow-[0_0_30px_rgba(25,230,25,0.4)]">your collection?</span>
            </h2>

            <p className="mt-6 text-base md:text-lg leading-relaxed text-muted-foreground/90">
              Work with advisors who actually understand Pokémon, One Piece, slabs, and card shows. Tell us a little about your selling activity and we will get back to you within 24 hours.
            </p>

            {/* Email Pills with Glassmorphism */}
            <ul className="mt-8 flex flex-col gap-3">
              {[
                { label: 'General & Advice Inquiries', email: 'info@collecttax.co.uk' },
                { label: 'Accounts & Ongoing Clients', email: 'accounts@collecttax.co.uk' },
              ].map((item) => (
                <li key={item.email}>
                  <a
                    href={`mailto:${item.email}`}
                    className="group flex items-center justify-between rounded-2xl border border-white/10 bg-card/40 p-4 backdrop-blur-xl transition-all duration-300 hover:border-brand/50 hover:bg-brand/5 hover:shadow-[0_0_25px_-5px_rgba(25,230,25,0.2)]"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex size-10 items-center justify-center rounded-xl border border-brand/30 bg-black/40 text-brand group-hover:bg-brand group-hover:text-black transition-colors">
                        <Mail className="size-4" />
                      </span>
                      <div>
                        <span className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{item.label}</span>
                        <span className="block text-sm font-bold text-white group-hover:text-brand transition-colors">{item.email}</span>
                      </div>
                    </div>
                    <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-brand" />
                  </a>
                </li>
              ))}
            </ul>

            {/* Micro Guarantees */}
            <div className="mt-8 flex items-center gap-6 text-xs text-muted-foreground border-t border-white/10 pt-6">
              <span className="flex items-center gap-2">
                <Clock className="size-4 text-brand" /> 24h Response Time
              </span>
              <span className="flex items-center gap-2">
                <Lock className="size-4 text-brand" /> 100% Confidential
              </span>
            </div>
          </Reveal>
        </div>

        {/* Right Column: Premium Glassmorphic Form Card */}
        <div className="lg:col-span-7">
          <Reveal delay={100}>
            <TiltCard max={3} className="rounded-[2.5rem]">
              <div className="relative overflow-hidden rounded-[2.5rem] border border-brand/40 bg-card/50 p-7 md:p-12 backdrop-blur-2xl shadow-[0_30px_100px_-20px_rgba(0,0,0,0.9)] transition-all duration-500 hover:border-brand/60">
                
                {/* Specular Top Glass Glare Line */}
                <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/60 to-transparent" />
                <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-brand/10 blur-3xl" />

                {sent ? (
                  <div className="flex min-h-[440px] flex-col items-center justify-center text-center p-6 relative z-10" role="status">
                    <span className="flex size-16 items-center justify-center rounded-full bg-brand/20 border border-brand text-brand shadow-[0_0_30px_rgba(25,230,25,0.4)]">
                      <CheckCircle2 className="size-10" />
                    </span>
                    <h3 className="mt-6 font-display text-3xl md:text-4xl font-extrabold uppercase [font-stretch:80%] text-white">
                      Enquiry Received
                    </h3>
                    <p className="mt-3 max-w-sm text-muted-foreground text-sm leading-relaxed">
                      Thanks for reaching out! A specialist CollectTax advisor will review your message and reply back shortly.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSent(false)}
                      className="mt-6 rounded-full border border-white/20 bg-white/5 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:border-brand hover:text-brand transition-colors backdrop-blur-md"
                    >
                      Send Another Note
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-4">
                    <div className="border-b border-white/10 pb-3">
                      <h3 className="font-display text-2xl font-extrabold uppercase [font-stretch:85%] text-white">
                        Discovery Consultation
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Tell us roughly what you buy and sell. No accountant jargon required.
                      </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-white/80">Full Name</label>
                        <input id="name" name="name" required autoComplete="name" className={fieldClass} placeholder="Alex Davies" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-white/80">Email Address</label>
                        <input id="email" name="email" type="email" required autoComplete="email" className={fieldClass} placeholder="alex@example.com" />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-white/80">
                          Phone Number <span className="text-muted-foreground text-[10px] lowercase">(optional)</span>
                        </label>
                        <input id="phone" name="phone" type="tel" autoComplete="tel" className={fieldClass} placeholder="07123 456789" />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="serviceNeeded" className="text-xs font-bold uppercase tracking-wider text-brand">Accountancy Service Needed</label>
                        <select id="serviceNeeded" name="serviceNeeded" required defaultValue="Self Assessment Tax Return (From £500)" className={`${fieldClass} border-brand/40`}>
                          <option className="bg-[#090909]">Self Assessment Tax Return (From £500)</option>
                          <option className="bg-[#090909]">HMRC Nudge Letter / Audit Representation</option>
                          <option className="bg-[#090909]">VAT Registration &amp; Margin Scheme</option>
                          <option className="bg-[#090909]">Limited Company / Full Accounts (£1,800)</option>
                          <option className="bg-[#090909]">Card Show Cash &amp; Inventory Bookkeeping</option>
                          <option className="bg-[#090909]">General TCG Accounting Consultation</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="type" className="text-xs font-bold uppercase tracking-wider text-white/80">What Best Describes You?</label>
                      <select id="type" name="type" required defaultValue="" className={fieldClass}>
                        <option value="" disabled className="bg-[#090909]">Select an option</option>
                        <option className="bg-[#090909]">Collector selling occasionally</option>
                        <option className="bg-[#090909]">Side hustle seller (eBay/Vinted/Whatnot)</option>
                        <option className="bg-[#090909]">Full-time trader / sole trader</option>
                        <option className="bg-[#090909]">Limited company / Card shop</option>
                        <option className="bg-[#090909]">I received an HMRC letter</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-white/80">
                        Tell Us About Your Setup
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={3}
                        required
                        className={fieldClass}
                        placeholder="e.g. Selling Pokémon slabs & sealed boxes, roughly £20k turnover, attend London Card Show..."
                      />
                    </div>

                    {errorMsg && (
                      <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-xs text-red-400">
                        {errorMsg}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="mt-2 flex items-center justify-center gap-2 rounded-full bg-brand py-4 font-bold text-black shadow-[0_0_35px_-5px_rgba(25,230,25,0.65)] transition-transform duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="size-4" />
                      <span>{loading ? 'Submitting to Specialist...' : 'Send Consultation Enquiry'}</span>
                    </button>

                    <p className="text-center text-[11px] text-muted-foreground">
                      Your business. Your privacy. Handled with 100% discretion by CollectTax UK.
                    </p>
                  </form>
                )}
              </div>
            </TiltCard>
          </Reveal>
        </div>

      </div>
    </section>
  )
}
