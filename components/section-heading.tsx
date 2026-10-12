import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Reveal } from './reveal'

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  center = false,
}: {
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  className?: string
  center?: boolean
}) {
  return (
    <Reveal className={cn('max-w-3xl', center && 'mx-auto text-center', className)}>
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">{eyebrow}</p>
      <h2 className="mt-4 font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-balance [font-stretch:80%] md:text-6xl">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground text-pretty">{description}</p>
      )}
    </Reveal>
  )
}
