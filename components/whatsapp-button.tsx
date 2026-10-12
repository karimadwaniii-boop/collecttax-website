'use client'

import { MessageCircle } from 'lucide-react'

export function WhatsAppButton() {
  // Client's primary WhatsApp number from the group brief (+44 7378 813504)
  const phoneNumber = '447378813504'
  const message = encodeURIComponent('Hi CollectTax, I trade cards/collectibles and would like some tax and accounting advice.')
  const waUrl = `https://wa.me/${phoneNumber}?text=${message}`

  return (
    <aside aria-label="Direct Chat Support">
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 group flex items-center gap-2.5 rounded-full border border-[#25D366]/40 bg-[#0d1f12]/90 px-4 py-3 text-white backdrop-blur-xl shadow-[0_10px_35px_-5px_rgba(37,211,102,0.4)] hover:scale-105 hover:border-[#25D366] transition-all duration-300"
        title="Chat with CollectTax on WhatsApp"
      >
        <span className="relative flex size-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
          <span className="relative inline-flex rounded-full size-3 bg-[#25D366]"></span>
        </span>

        <span className="flex size-7 items-center justify-center rounded-full bg-[#25D366] text-black">
          <MessageCircle className="size-4 fill-current" />
        </span>

        <span className="text-xs font-bold uppercase tracking-wider text-white group-hover:text-[#25D366] transition-colors pr-1 hidden sm:inline-block">
          Chat on WhatsApp
        </span>
      </a>
    </aside>
  )
}
