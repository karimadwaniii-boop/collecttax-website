'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { 
  FileText, 
  Building2, 
  BookOpen, 
  Percent, 
  Receipt, 
  Briefcase, 
  MessagesSquare, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Package,
  Layers,
  Sparkles,
  ArrowUpRight
} from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { SmoothScroll } from '@/components/smooth-scroll'
import { ScrollProgress } from '@/components/scroll-progress'
import { TiltCard } from '@/components/tilt-card'
import { Reveal } from '@/components/reveal'

gsap.registerPlugin(ScrollTrigger)

const serviceCategories = [
  {
    id: 'self-assessment',
    icon: FileText,
    title: 'Self Assessment / Tax Returns',
    short: 'Personal Tax Returns',
    tag: 'Most Popular',
    image: '/images/slab.png',
    badge: 'Graded Slabs & Singles',
    summary: 'Sole trader returns prepared with TCG stock, marketplace payouts, and card flips properly accounted for without paying tax on phantom profits.',
    whatWeDo: [
      'Accurate reporting of eBay, Vinted, Whatnot, Cardmarket, and cash show income',
      'Stock inventory valuation method that prevents phantom profits on unsold slabs',
      'Full deduction of acquisition costs, grading submissions (PSA/BGS/CGC), and packaging',
      'Avoid £100+ HMRC late filing penalties and automated compliance flags',
      'Trading allowance vs actual expenses calculation to pay the absolute lowest legal tax',
    ],
    idealFor: 'Collectors making side hustle sales or full-time sole trader dealers moving £5,000 to £150,000+ a year.',
  },
  {
    id: 'limited-company',
    icon: Building2,
    title: 'Limited Company Accounts & Corporation Tax',
    short: 'Ltd Company',
    tag: 'Growth & Protection',
    image: '/images/sealed-product.jpg',
    badge: 'Sealed Product & Stock',
    summary: 'Complete statutory accounts, Companies House compliance, and Corporation Tax planning for card shops and high-volume collectible dealers.',
    whatWeDo: [
      'Full statutory accounts preparation for Companies House and HMRC',
      'CT600 Corporation Tax return computation and filing',
      'Tax-efficient director salary and dividend extraction strategies',
      'Company incorporation advice: transitioning safely from Sole Trader to Ltd',
      'Treatment of high-value inventory, loans, and director investments in collections',
    ],
    idealFor: 'Traders with high volume, high inventory value, or six-figure turnover looking to ringfence liability.',
  },
  {
    id: 'bookkeeping',
    icon: BookOpen,
    title: 'Specialist TCG & Slabs Bookkeeping',
    short: 'Bookkeeping',
    tag: 'Stress-Free Records',
    image: '/images/card-shows.jpg',
    badge: 'Expos & Trade Nights',
    summary: 'Clean records of every single pack pull, trade night deal, grading invoice, and payout. No more lost paper receipts or messy spreadsheets.',
    whatWeDo: [
      'Multi-platform reconciliation (eBay Managed Payments, Vinted balances, Stripe, PayPal)',
      'Cash and trade-in transaction logs from card conventions, London Card Show, Birmingham, etc.',
      'Tracking PSA, BGS, CGC, and Ace grading submission costs and batch turnaround times',
      'Receipt and expense categorization through modern digital cloud tools',
      'Monthly / quarterly profit and loss summaries so you always know your true margins',
    ],
    idealFor: 'Anyone tired of messy spreadsheets, lost receipts, and guessing their actual profit.',
  },
  {
    id: 'vat',
    icon: Percent,
    title: 'VAT & Margin Scheme for Second-Hand Collectibles',
    short: 'VAT Solutions',
    tag: 'High Impact',
    image: '/images/market-trends.jpg',
    badge: 'Margin Scheme Compliance',
    summary: 'Crucial VAT guidance so you don’t pay 20% on the entire sale price of vintage cards and slabs.',
    whatWeDo: [
      'VAT Margin Scheme implementation: only pay VAT on the gross profit margin, not total turnover',
      'Mandatory £90,000 rolling turnover threshold monitoring and registration',
      'Import VAT guidance when buying from Japan, USA, or international card sellers',
      'Making Tax Digital (MTD) quarterly VAT return filings',
      'Differentiating brand new sealed product VAT vs second-hand raw / graded cards',
    ],
    idealFor: 'Traders approaching or exceeding £90k turnover where regular VAT could destroy business margins.',
  },
  {
    id: 'expenses',
    icon: Receipt,
    title: 'Allowable Expenses & Deductions Audit',
    short: 'Allowable Expenses',
    tag: 'Money Saver',
    image: '/images/grading-submissions.jpg',
    badge: 'Inspection & Supplies',
    summary: 'Make sure every legitimate cost of running your collectibles enterprise is deducted legally.',
    whatWeDo: [
      'Grading costs (grading fees, insured return shipping, middleman service charges)',
      'Travel, hotel, and mileage expenses to card shows, expos, and private collection viewings',
      'Packaging materials (bubble mailers, top loaders, card savers, team bags, security boxes)',
      'Software subscriptions (Card ladder, TCGplayer app, accounting software, seller tools)',
      'Home office use, mobile phone usage, and storage / safe rental fees',
    ],
    idealFor: 'Sellers wanting to maximize deductions and stop overpaying tax on their collecting activity.',
  },
  {
    id: 'hmrc-letters',
    icon: MessagesSquare,
    title: 'HMRC Investigation & Nudge Letter Support',
    short: 'HMRC Protection',
    tag: 'Urgent Help',
    image: '/images/slab.png',
    badge: 'Official Representation',
    summary: 'Received a "One to Many" nudge letter or compliance query from HMRC? We handle the correspondence calmly.',
    whatWeDo: [
      'Formal review of HMRC enquiry or platform disclosure notification',
      'Historical accounts reconstruction for unfiled previous years',
      'Calculation of true net profit to refute overstated HMRC platform estimates',
      'Direct communication and formal representation with HMRC inspectors on your behalf',
      'Negotiating penalty mitigation and manageable payment plans',
    ],
    idealFor: 'Anyone who received a letter from HMRC regarding online marketplace selling.',
  },
]

const allowableExpenses = [
  { title: 'Grading Services', desc: 'PSA, BGS, CGC, Ace grading fees + insured courier', image: '/images/grading-submissions.jpg' },
  { title: 'Card Show Expenses', desc: 'Vendor table hire, train/flight tickets, hotels, mileage (45p/mile)', image: '/images/card-shows.jpg' },
  { title: 'Packing & Supplies', desc: 'Bubble wrap, hard cases, top loaders, semi-rigids, boxes, labels', image: '/images/sealed-product.jpg' },
  { title: 'Platform Fees', desc: 'eBay final value fees, Whatnot commission, Stripe/PayPal processing', image: '/images/market-trends.jpg' },
  { title: 'Collection Buyouts', desc: 'Driving to view or buy large collections across the UK', image: '/images/real-charizard.jpg' },
  { title: 'Hardware & Security', desc: 'Card safes, security cameras, label printers, display cases', image: '/images/slab.png' },
]

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState(serviceCategories[0].id)
  const currentService = serviceCategories.find((s) => s.id === activeTab) || serviceCategories[0]
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-page-title]', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      })
      gsap.from('[data-stat-card]', {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power2.out',
        delay: 0.3,
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
          {/* Animated Hero Section */}
          <div ref={heroRef} className="relative mx-auto max-w-7xl px-5 md:px-8">
            <div aria-hidden className="absolute -left-32 top-0 size-96 rounded-full bg-brand/15 blur-[140px] pointer-events-none" />
            <div aria-hidden className="absolute right-0 top-20 size-72 rounded-full bg-brand/10 blur-[120px] pointer-events-none" />
            
            <div className="max-w-3xl" data-page-title>
              <p className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand backdrop-blur">
                <Sparkles className="size-3.5" /> Specialist Accountancy Services
              </p>
              <h1 className="mt-6 font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight [font-stretch:75%] sm:text-6xl md:text-7xl">
                BUILT FOR <span className="text-brand">COLLECTORS &amp; TRADERS</span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed">
                Standard high-street accountants treat a £10,000 Charizard slab like regular shop stock and get confused by grading fees. We specialise exclusively in the TCG and collectibles market.
              </p>
            </div>

            {/* Quick Stats Grid with Interactive Tilt */}
            <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 border-y border-white/10 py-8">
              {[
                { val: '100%', label: 'TCG & Collectibles Focused', brand: true },
                { val: '£500', label: 'Starting Annual Package', brand: false },
                { val: 'MARGIN', label: 'VAT Scheme Specialists', brand: true },
                { val: 'ALL SHOWS', label: 'Cash & Trade Deal Support', brand: false },
              ].map((stat, i) => (
                <div key={i} data-stat-card className="group p-3 rounded-2xl hover:bg-white/[0.02] transition-colors">
                  <p className={`font-display text-3xl font-extrabold md:text-4xl transition-transform group-hover:scale-105 ${stat.brand ? 'text-brand' : 'text-white'}`}>
                    {stat.val}
                  </p>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Deep-Dive Tabs with 3D Tilt Card */}
          <section className="mx-auto max-w-7xl px-5 md:px-8 mt-20">
            <Reveal className="text-center max-w-2xl mx-auto">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">Explore our core solutions</p>
              <h2 className="mt-3 font-display text-3xl md:text-5xl font-extrabold uppercase [font-stretch:80%]">
                EVERY CORNER OF YOUR <span className="text-brand">TRADING FINANCES</span> COVERED
              </h2>
            </Reveal>

            {/* Service Selector Buttons */}
            <Reveal delay={100} className="mt-10 flex flex-wrap justify-center gap-2.5">
              {serviceCategories.map((s) => {
                const Icon = s.icon
                const isSelected = activeTab === s.id
                return (
                  <button
                    key={s.id}
                    onClick={() => setActiveTab(s.id)}
                    type="button"
                    className={`flex items-center gap-2.5 rounded-full px-5 py-3 text-sm font-semibold transition-all ${
                      isSelected
                        ? 'bg-brand text-black shadow-[0_0_25px_-5px_rgba(25,230,25,0.6)] scale-105'
                        : 'border border-white/10 bg-card text-muted-foreground hover:border-brand/40 hover:text-white'
                    }`}
                  >
                    <Icon className="size-4" />
                    <span>{s.short}</span>
                  </button>
                )
              })}
            </Reveal>

            {/* Active Service Card: 2-Column Split With Prominent Right Image Showcase */}
            <div className="mt-8">
              <TiltCard max={3} className="rounded-[2.5rem]">
                <div className="rounded-[2.5rem] border border-brand/40 bg-card/60 p-8 md:p-12 shadow-[0_30px_100px_-20px_rgba(25,230,25,0.25)] backdrop-blur-2xl relative overflow-hidden">
                  
                  {/* Specular Top Line */}
                  <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/60 to-transparent" />
                  <div aria-hidden className="absolute -right-20 -bottom-20 size-80 rounded-full bg-brand/15 blur-3xl pointer-events-none" />

                  <div className="grid gap-10 lg:grid-cols-12 items-center relative z-10">
                    
                    {/* Left Column (Details & Checkpoints) */}
                    <div className="lg:col-span-7 flex flex-col justify-between h-full">
                      <div>
                        <span className="inline-block rounded-full bg-brand/20 border border-brand/40 px-3.5 py-1 text-xs font-bold text-brand uppercase tracking-wider mb-4 backdrop-blur-md">
                          {currentService.tag}
                        </span>
                        <h3 className="font-display text-3xl md:text-4xl font-extrabold uppercase leading-tight [font-stretch:80%] text-white">
                          {currentService.title}
                        </h3>
                        <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                          {currentService.summary}
                        </p>
                      </div>

                      <div className="mt-6 rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur-md">
                        <p className="text-xs uppercase font-bold tracking-[0.2em] text-brand mb-3">
                          What is handled in this service:
                        </p>
                        <ul className="flex flex-col gap-3">
                          {currentService.whatWeDo.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-brand/20 text-brand border border-brand/40">
                                <CheckCircle2 className="size-3" />
                              </span>
                              <span className="text-sm text-white/90 leading-snug">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap gap-4 items-center justify-between">
                        <div>
                          <p className="text-[11px] uppercase font-bold text-brand tracking-wider">Ideal for:</p>
                          <p className="text-xs text-white/80 mt-0.5 max-w-md">{currentService.idealFor}</p>
                        </div>
                        <Link
                          href="/contact"
                          className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-bold text-black transition-transform hover:scale-105 shadow-[0_0_20px_-4px_rgba(25,230,25,0.5)]"
                        >
                          <span>Get Quote for This</span>
                          <ArrowRight className="size-4" />
                        </Link>
                      </div>
                    </div>

                    {/* Right Column (Prominent Clean Image Frame) */}
                    <div className="lg:col-span-5 relative h-80 sm:h-96 lg:h-[460px] w-full overflow-hidden rounded-3xl border border-white/15 bg-black/60 shadow-2xl backdrop-blur-md">
                      <Image
                        src={currentService.image}
                        alt={currentService.title}
                        fill
                        className="object-contain p-6 scale-100 transition-transform duration-700 hover:scale-105 drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]"
                        sizes="(max-width: 1024px) 100vw, 450px"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <div className="pointer-events-none absolute right-4 bottom-4 rounded-full border border-brand/40 bg-black/80 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-brand backdrop-blur-md shadow-md">
                        {currentService.badge}
                      </div>
                    </div>

                  </div>
                </div>
              </TiltCard>
            </div>
          </section>

          {/* Expenses You Can Deduct Section with Visual Cards */}
          <section className="mx-auto max-w-7xl px-5 md:px-8 mt-24">
            <div className="rounded-[2.5rem] border border-white/10 bg-card/50 p-8 md:p-14 relative overflow-hidden backdrop-blur-2xl">
              <div aria-hidden className="absolute -top-40 -right-40 size-[500px] rounded-full bg-brand/10 blur-[150px] pointer-events-none" />

              <Reveal className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Maximise Your Deductions</p>
                <h2 className="mt-3 font-display text-3xl md:text-5xl font-extrabold uppercase [font-stretch:80%]">
                  WHAT CAN TCG TRADERS <span className="text-brand">ACTUALLY CLAIM?</span>
                </h2>
                <p className="mt-4 text-muted-foreground text-base leading-relaxed">
                  Most collectors leave thousands of pounds on the table because high-street accountants don&apos;t know what constitutes a business expense in the card game sector.
                </p>
              </Reveal>

              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {allowableExpenses.map((exp, idx) => (
                  <Reveal key={exp.title} delay={idx * 60}>
                    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/60 p-6 backdrop-blur-md hover:border-brand/50 hover:shadow-[0_15px_40px_-10px_rgba(25,230,25,0.2)] transition-all hover:-translate-y-1">
                      
                      {/* Subtle Background Art */}
                      <div className="absolute right-0 top-0 size-32 overflow-hidden opacity-15 pointer-events-none group-hover:opacity-30 transition-opacity">
                        <Image src={exp.image} alt={exp.title} fill className="object-cover" sizes="120px" />
                      </div>

                      <div className="relative z-10">
                        <div className="flex size-11 items-center justify-center rounded-xl bg-brand/10 border border-brand/30 text-brand mb-4 group-hover:bg-brand group-hover:text-black transition-colors">
                          <Receipt className="size-5" />
                        </div>
                        <h4 className="font-display text-xl font-bold uppercase [font-stretch:85%] group-hover:text-brand transition-colors text-white">{exp.title}</h4>
                        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{exp.desc}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={200} className="mt-12 p-6 rounded-2xl border border-brand/40 bg-brand/10 flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-md">
                <div>
                  <h4 className="font-display text-xl font-bold uppercase [font-stretch:85%] text-white">
                    Not sure if you need to pay tax on your collection?
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Book a quick discovery call. We review your sales, buying patterns, and HMRC obligations.
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="shrink-0 flex items-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-bold text-black transition-transform hover:scale-105 shadow-[0_0_20px_-4px_rgba(25,230,25,0.5)]"
                >
                  <span>Speak to our tax team</span>
                  <ArrowUpRight className="size-4" />
                </Link>
              </Reveal>
            </div>
          </section>
        </main>

        <SiteFooter />
      </div>
    </SmoothScroll>
  )
}
