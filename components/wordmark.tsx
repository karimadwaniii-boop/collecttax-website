import { cn } from '@/lib/utils'

export function Wordmark({ className, tagline = false }: { className?: string; tagline?: boolean }) {
  return (
    <span className={cn('inline-flex flex-col items-center leading-none', className)}>
      <span className="relative font-sans text-[1em] font-light tracking-[0.32em]" aria-label="CollectTax">
        <span className="text-brand" aria-hidden>C</span>
        <span className="relative text-white" aria-hidden>
          O
          <svg
            viewBox="0 0 40 32"
            className="absolute -top-[0.28em] left-[0.05em] h-[1.05em] w-[1.25em] text-brand"
            aria-hidden
          >
            <path
              d="M3 18 L12 28 L38 2 L13 22 Z"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span className="text-white" aria-hidden>LLECT</span>
        <span className="text-brand" aria-hidden>TAX</span>
      </span>
      {tagline && (
        <span className="mt-[0.6em] flex flex-col items-center gap-[0.15em] text-[0.22em] font-bold tracking-normal">
          <span className="text-white">TAX ADVISORS FOR</span>
          <span className="text-brand">Trading Card &amp; Collectibles Entrepreneurs</span>
        </span>
      )}
    </span>
  )
}
