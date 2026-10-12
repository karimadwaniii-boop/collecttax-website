'use client'

import Link from 'next/link'
import { ArrowLeft, Home, FileQuestion } from 'lucide-react'
import { Wordmark } from '@/components/wordmark'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col justify-center items-center px-5 relative overflow-hidden text-center selection:bg-brand selection:text-black">
      {/* Ambient background glows */}
      <div aria-hidden className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-[500px] rounded-full bg-brand/10 blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-lg rounded-[2.5rem] border border-brand/30 bg-card/60 p-8 md:p-12 backdrop-blur-2xl shadow-[0_20px_80px_-20px_rgba(25,230,25,0.3)]">
        <Wordmark className="text-3xl mx-auto" />

        <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-brand">
          <FileQuestion className="size-4" /> 404 - Card Not Found
        </div>

        <h1 className="mt-6 font-display text-4xl sm:text-5xl font-extrabold uppercase [font-stretch:80%] text-white">
          LOST IN THE <span className="text-brand">BINDER?</span>
        </h1>

        <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
          The page or slab you&apos;re looking for has either been traded away or doesn&apos;t exist. Let&apos;s get you back on track.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-black shadow-[0_0_25px_-5px_rgba(25,230,25,0.6)] hover:scale-105 transition-transform"
          >
            <Home className="size-4" />
            <span>Return to Homepage</span>
          </Link>

          <Link
            href="/services"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white hover:border-brand/40 hover:text-brand transition-colors"
          >
            <ArrowLeft className="size-4" />
            <span>View Services</span>
          </Link>
        </div>
      </div>

      <p className="mt-8 text-xs text-muted-foreground">
        Need urgent help? Email us directly at <a href="mailto:info@collecttax.co.uk" className="text-brand hover:underline">info@collecttax.co.uk</a>
      </p>
    </div>
  )
}
