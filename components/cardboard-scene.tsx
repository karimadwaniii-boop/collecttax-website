'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const lines = [
  { lead: 'High value', accent: 'TCG assets' },
  { lead: 'Deserve', accent: 'proper records' },
  { lead: 'Proof of purchase', accent: '& tax reports' },
]

export function CardboardScene() {
  const root = useRef<HTMLElement>(null)
  const video = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1,
            onToggle: (self) => {
              if (self.isActive) video.current?.play().catch(() => {})
              else video.current?.pause()
            },
          },
        })

        tl.fromTo(
          '[data-cb-video]',
          { clipPath: 'circle(6% at 50% 50%)' },
          { clipPath: 'circle(80% at 50% 50%)', ease: 'power2.inOut', duration: 1 },
          0,
        )
          .fromTo('[data-cb-media]', { scale: 1.6 }, { scale: 1, ease: 'power2.out', duration: 1 }, 0)
          .to('[data-cb-title]', { scale: 2.6, opacity: 0, ease: 'power2.in', duration: 0.7 }, 0.1)

        lines.forEach((_, i) => {
          const at = 0.9 + i * 0.45
          tl.fromTo(
            `[data-cb-line="${i}"]`,
            { yPercent: 100, opacity: 0, filter: 'blur(12px)' },
            { yPercent: 0, opacity: 1, filter: 'blur(0px)', duration: 0.3 },
            at,
          )
          if (i < lines.length - 1) tl.to(`[data-cb-line="${i}"]`, { yPercent: -100, opacity: 0, duration: 0.25 }, at + 0.35)
        })

        tl.to(`[data-cb-line="${lines.length - 1}"]`, { yPercent: -100, opacity: 0, duration: 0.25 }, 2.25)
          .to('[data-cb-shade]', { opacity: 0.85, duration: 0.4 }, 2.25)
          .fromTo(
            '[data-cb-final]',
            { scale: 0.7, opacity: 0 },
            { scale: 1, opacity: 1, ease: 'back.out(1.6)', duration: 0.4 },
            2.4,
          )
          .to({}, { duration: 0.3 })
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} className="relative h-[420vh] bg-background" aria-label="This isn't just cardboard">
      <div className="sticky top-0 flex h-svh items-center justify-center overflow-hidden">
        <div data-cb-video className="absolute inset-0 will-change-[clip-path]">
          <div data-cb-media className="size-full">
            <video
              ref={video}
              className="size-full object-cover"
              src="/videos/second.mp4"
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden
            />
          </div>
          <div data-cb-shade className="absolute inset-0 bg-black/40 opacity-50" />
        </div>

        <h2
          data-cb-title
          className="pointer-events-none relative z-10 px-5 text-center font-display text-6xl font-extrabold uppercase leading-[0.85] tracking-tight mix-blend-difference [font-stretch:70%] md:text-9xl xl:text-[11rem]"
        >
          This isn&apos;t
          <br />
          just cardboard
        </h2>

        <div className="absolute inset-0 z-10 flex items-center justify-center px-5">
          {lines.map((l, i) => (
            <p
              key={l.lead}
              data-cb-line={i}
              className="absolute text-center font-display text-5xl font-extrabold uppercase leading-[0.9] opacity-0 [font-stretch:75%] [text-shadow:0_8px_40px_rgb(0_0_0/0.8)] md:text-8xl"
            >
              {l.lead}
              <br />
              <span className="text-brand">{l.accent}</span>
            </p>
          ))}

          <div data-cb-final className="absolute max-w-3xl text-center opacity-0">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand">
              When a card is worth more than your first car payment
            </p>
            <p className="mt-6 font-display text-6xl font-extrabold uppercase leading-[0.88] [font-stretch:75%] md:text-8xl">
              You collect.
              <br />
              <span className="text-brand">We handle the tax.</span>
            </p>
            <p className="mx-auto mt-6 max-w-lg text-lg text-white/75">
              HMRC might stop seeing it as &lsquo;just cardboard&rsquo;. Valuations, receipts and reports keep you
              covered.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
