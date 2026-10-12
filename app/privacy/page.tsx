import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { SmoothScroll } from '@/components/smooth-scroll'
import { ShieldCheck, ArrowLeft } from 'lucide-react'

export const metadata = {
  title: 'Privacy Policy | CollectTax UK',
  description: 'How CollectTax processes, protects, and stores collector and client accountancy data under UK GDPR.',
}

export default function PrivacyPolicyPage() {
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
              <ShieldCheck className="size-3.5" /> UK GDPR Compliance
            </span>

            <h1 className="mt-4 font-display text-4xl sm:text-5xl font-extrabold uppercase [font-stretch:80%] text-white">
              PRIVACY <span className="text-brand">POLICY</span>
            </h1>

            <p className="mt-2 text-xs text-muted-foreground">
              Last updated: October 2026 • CollectTax UK (collecttax.co.uk)
            </p>

            <div className="mt-10 space-y-8 text-sm text-zinc-300 leading-relaxed border-t border-white/10 pt-8">
              <section>
                <h2 className="text-xl font-bold uppercase text-white mb-2">1. Who We Are</h2>
                <p>
                  CollectTax (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is a UK-focused accounting and tax advisory service dedicated to trading card collectors, sellers, and resellers. We operate the website <strong className="text-white">collecttax.co.uk</strong>. For the purpose of the UK General Data Protection Regulation (UK GDPR) and Data Protection Act 2018, we act as the data controller of your personal data.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold uppercase text-white mb-2">2. Information We Collect</h2>
                <p className="mb-2">When you submit an enquiry through our consultation form or engage our services, we may collect:</p>
                <ul className="list-disc pl-5 space-y-1 text-zinc-400">
                  <li><strong>Contact Details:</strong> Your full name, email address (<code className="text-brand text-xs">info@collecttax.co.uk</code>), and telephone number.</li>
                  <li><strong>Trading Information:</strong> Platforms traded on (eBay, Whatnot, Vinted, Card Shows), estimated turnover range, and business category (Sole Trader or Ltd Company).</li>
                  <li><strong>HMRC Correspondence:</strong> Information regarding HMRC nudge letters, compliance notices, or Unique Taxpayer References (UTR) provided by you.</li>
                  <li><strong>Trade-In Details:</strong> Details of any PSA/BGS slabs or sealed products offered towards fee settlement.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold uppercase text-white mb-2">3. How We Use Your Data</h2>
                <p>We process your personal information strictly for the following purposes:</p>
                <ul className="list-disc pl-5 space-y-1 text-zinc-400 mt-2">
                  <li>To provide quotes, tax consultations, and accounting services.</li>
                  <li>To prepare and file statutory tax returns with HM Revenue &amp; Customs (HMRC) and Companies House upon formal engagement.</li>
                  <li>To communicate with you regarding your enquiry, filing deadlines, and tax updates.</li>
                  <li>To comply with legal and professional anti-money laundering (AML) regulations in the United Kingdom.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold uppercase text-white mb-2">4. Discretion &amp; Confidentiality</h2>
                <p>
                  We understand that trading card collections represent significant personal wealth. We never sell, rent, or publicly disclose your collection value, trade history, or personal data to third parties. Data is only submitted to HMRC with your explicit written authorization.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold uppercase text-white mb-2">5. Data Retention &amp; Security</h2>
                <p>
                  Your information is stored in secure, encrypted environments. In accordance with HMRC guidelines, accounting records for engaged clients are retained for 6 years following the relevant tax year. Unsuccessful consultation enquiries are securely archived or purged periodically.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold uppercase text-white mb-2">6. Contacting Us</h2>
                <p>
                  If you have questions about this privacy notice or wish to exercise your data rights (access, rectification, erasure), contact our data officer at:
                </p>
                <div className="mt-3 p-4 rounded-2xl bg-white/5 border border-white/10 text-white">
                  <p className="font-bold">CollectTax UK Data Compliance</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Email: <a href="mailto:info@collecttax.co.uk" className="text-brand underline">info@collecttax.co.uk</a></p>
                  <p className="text-xs text-muted-foreground">Domain: collecttax.co.uk</p>
                </div>
              </section>
            </div>
          </div>
        </main>

        <SiteFooter />
      </div>
    </SmoothScroll>
  )
}
