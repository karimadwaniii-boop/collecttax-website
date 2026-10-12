import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { SmoothScroll } from '@/components/smooth-scroll'
import { FileText, ArrowLeft } from 'lucide-react'

export const metadata = {
  title: 'Terms of Service | CollectTax UK',
  description: 'Terms and conditions of using the CollectTax website and engaging our specialist accounting services.',
}

export default function TermsPage() {
  return (
    <SmoothScroll>
      <div className="min-h-screen bg-background text-foreground selection:bg-brand selection:text-black">
        <SiteHeader />

        <main className="pt-28 pb-20 md:pt-36 md:pb-28">
          <div className="mx-auto max-w-4xl px-5 md:px-8">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-brand transition-colors mb-8"
            >
              <ArrowLeft className="size-3.5" />
              <span>Back to Home</span>
            </Link>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/40 bg-brand/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-brand">
              <FileText className="size-3.5" /> Terms of Engagement
            </span>

            <h1 className="mt-4 font-display text-4xl sm:text-5xl font-extrabold uppercase [font-stretch:80%] text-white">
              TERMS OF <span className="text-brand">SERVICE</span>
            </h1>

            <p className="mt-2 text-xs text-muted-foreground">
              Last updated: October 2026 • CollectTax UK (collecttax.co.uk)
            </p>

            <div className="mt-10 space-y-8 text-sm text-zinc-300 leading-relaxed border-t border-white/10 pt-8">
              <section>
                <h2 className="text-xl font-bold uppercase text-white mb-2">1. Scope of Website Guidance</h2>
                <p>
                  The informational content provided across collecttax.co.uk, including the HMRC Tax Estimator, margin scheme summaries, and blog posts, is for general educational purposes. It does not constitute formal, individualized tax, financial, or legal advice until a formal Letter of Engagement has been executed.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold uppercase text-white mb-2">2. Client Engagement &amp; Representation</h2>
                <p>
                  Formal representation before HM Revenue &amp; Customs (HMRC) begins only after completion of our client onboarding protocol, including identity verification (AML checks), signing an engagement letter, and 64-8 agent authorization with HMRC.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold uppercase text-white mb-2">3. Accuracy of Records</h2>
                <p>
                  Clients are solely responsible for ensuring that all trade records, invoices, card show cash receipts, grading submission logs, and platform statements (eBay, Whatnot, Vinted) provided to CollectTax are true, complete, and accurate.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold uppercase text-white mb-2">4. Collectibles Trade-In Payment Policy</h2>
                <p>
                  Where a client agrees to settle accountancy fees via graded cards (PSA/BGS/CGC slabs) or authenticated sealed products, valuation is determined by 30-day verified sold marketplace averages (eBay sold listings, PriceCharting) and agreed in writing prior to physical consignment.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold uppercase text-white mb-2">5. Governing Law</h2>
                <p>
                  These terms are governed by and construed in accordance with the laws of England and Wales. Any disputes arising in connection with our services shall be subject to the exclusive jurisdiction of the English courts.
                </p>
              </section>
            </div>
          </div>
        </main>

        <SiteFooter />
      </div>
    </SmoothScroll>
  )
}
