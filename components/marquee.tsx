'use client'

import { Sparkles, Shield, ArrowUpRight, Check, Flame } from 'lucide-react'

// Line 1: What Collectors Trade & What We Understand (Curated TCG Industry Terms with Badges & Emojis/Icons)
const collectorHighlights = [
  { text: 'Pokémon TCG', tag: 'Specialist' },
  { text: 'PSA & BGS 10 Slabs', tag: 'Graded' },
  { text: 'One Piece Card Game', tag: 'Specialist' },
  { text: 'Sealed Booster Boxes & Cases', tag: 'Inventory' },
  { text: 'Card Shows & Convention Deals', tag: 'Cash & Trades' },
  { text: 'Grading Submissions (PSA/CGC/Ace)', tag: 'Tax Deductible' },
  { text: 'Sports Cards & High-End Grails', tag: 'Asset Protection' },
  { text: 'Collection Buyouts & Flip Deals', tag: 'Stock Valuation' },
]

// Line 2: The Exact Tax, Accountancy & HMRC Solutions Delivered by CollectTax
const taxHighlights = [
  { text: 'Tax Returns / Self Assessment', tag: 'From £500' },
  { text: 'HMRC Platform Reporting (eBay & Vinted)', tag: 'DAC7 Compliant' },
  { text: 'VAT Margin Scheme for Cards', tag: 'Save 20%' },
  { text: 'Allowable Expense Maximisation', tag: 'Grading & Travel' },
  { text: 'Limited Company Incorporation', tag: 'Structure' },
  { text: 'HMRC Nudge Letter Representation', tag: 'Urgent Help' },
  { text: 'Pay Fees in Graded Cards & Slabs', tag: 'Trade-In Option' },
  { text: 'Year-Round Expert Accountant Support', tag: 'Direct Line' },
]

export function Marquee() {
  return (
    <section className="relative overflow-hidden py-6 bg-gradient-to-b from-black via-card/50 to-black border-y border-white/10" aria-label="CollectTax specialisms and accounting services">
      {/* Background Ambient Glow */}
      <div aria-hidden className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] rounded-full bg-brand/5 blur-[120px] pointer-events-none" />

      <div className="flex flex-col gap-3.5 relative z-10">
        
        {/* ROW 1: TCG Industry & Collectibles Specialisms (Brand Neon Banner with Tag Pills) */}
        <div className="relative overflow-hidden py-3 bg-brand text-black shadow-[0_0_35px_-5px_rgba(25,230,25,0.45)]">
          <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
            {[...collectorHighlights, ...collectorHighlights].map((item, i) => (
              <div
                key={i}
                aria-hidden={i >= collectorHighlights.length}
                className="flex items-center gap-4 px-6 select-none cursor-default"
              >
                <span className="font-display text-lg sm:text-xl font-black uppercase tracking-tight [font-stretch:80%] whitespace-nowrap">
                  {item.text}
                </span>
                <span className="inline-flex items-center rounded-full bg-black/20 border border-black/30 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-black">
                  {item.tag}
                </span>
                <span className="inline-block size-1.5 rounded-full bg-black/40" />
              </div>
            ))}
          </div>
        </div>

        {/* ROW 2: Specialist UK Tax Solutions & Client Value (Sleek Dark Obsidian with Neon Borders & Glow) */}
        <div className="relative overflow-hidden py-3 bg-[#0a0a0a] border-y border-white/10 text-white">
          <div className="flex w-max animate-marquee-reverse hover:[animation-play-state:paused]">
            {[...taxHighlights, ...taxHighlights].map((item, i) => (
              <div
                key={i}
                aria-hidden={i >= taxHighlights.length}
                className="flex items-center gap-4 px-6 select-none cursor-default group"
              >
                <span className="font-display text-lg sm:text-xl font-extrabold uppercase tracking-tight [font-stretch:80%] text-white/95 whitespace-nowrap group-hover:text-brand transition-colors">
                  {item.text}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-brand/40 bg-brand/10 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-brand">
                  <Check className="size-3 stroke-[3]" />
                  {item.tag}
                </span>
                <span className="inline-block size-2 rounded-full bg-brand shadow-[0_0_8px_var(--brand)]" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
