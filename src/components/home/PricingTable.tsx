'use client'
import { useRef, useCallback } from 'react'
import Link from 'next/link'

const FREE_FEATURES = [
  '2 active links',
  '2 passwords per link',
  'View count & failed attempt stats',
  'Passwords auto-expire in 30 days',
  'pgate branding on gate page',
]

const PRO_FEATURES = [
  'Unlimited active links',
  '20 passwords per link',
  'Custom link slug — pgate.io/your-name',
  'Full analytics — location, device, timestamp',
  'Instant email on every open',
  'Weekly digest summary',
  'Failed attempt alerts',
  'Custom password expiry per recipient',
  'Custom gate page branding',
  'Upload your logo + background image',
  'White-label — zero pgate branding',
  'Custom button colour & headline text',
]

function Check() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ADE80" strokeWidth="2.5" strokeLinecap="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  )
}

function PricingCard({
  children, className, glow = 'rgba(74,222,128,0.10)',
}: { children: React.ReactNode; className?: string; glow?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current; if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
    el.style.setProperty('--so', '1')
  }, [])
  const onLeave = useCallback(() => { ref.current?.style.setProperty('--so', '0') }, [])

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
      className={`relative flex flex-col ${className ?? ''}`}
      style={{ '--mx': '50%', '--my': '50%', '--so': '0' } as React.CSSProperties}>
      <div className="pointer-events-none absolute inset-0 rounded-2xl overflow-hidden transition-opacity duration-500"
        style={{ opacity: 'var(--so)', background: `radial-gradient(280px circle at var(--mx) var(--my), ${glow}, transparent 70%)` }} />
      {children}
    </div>
  )
}

export default function PricingTable() {
  return (
    <section id="pricing" className="py-16 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#4ADE80] mb-4">Pricing</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-4">Simple. Affordable.</h2>
          <p className="text-zinc-400 text-lg">Start free. Upgrade when you need more.</p>
        </div>

        {/* Cards — Free gets 2fr, Pro gets 3fr */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-5 items-stretch">

          {/* ── Free ── */}
          <PricingCard className="md:col-span-2 bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
            <div className="mb-1">
              <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-zinc-500 mb-4">Free</p>
              <div className="flex items-start gap-1 mb-1">
                <span className="text-2xl font-bold text-zinc-400 mt-2">$</span>
                <span className="text-7xl font-bold text-white leading-none tracking-tight">0</span>
              </div>
              <p className="text-zinc-600 text-xs mt-2 mb-8">Forever free · no credit card</p>
            </div>
            <ul className="space-y-3 flex-1 mb-8">
              {FREE_FEATURES.map(f => (
                <li key={f} className="flex items-start gap-2.5 text-zinc-400 text-[13px] leading-snug">
                  <span className="mt-0.5 flex-shrink-0"><Check /></span>{f}
                </li>
              ))}
            </ul>
            <Link href="/login"
              className="block text-center border border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-white font-semibold text-[14px] py-3.5 rounded-xl transition-colors">
              Get started free
            </Link>
          </PricingCard>

          {/* ── Pro ── */}
          <PricingCard className="md:col-span-3 bg-zinc-900 border border-[#4ADE80]/30 rounded-2xl p-8 relative" glow="rgba(74,222,128,0.12)">
            {/* Badge */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
              <span className="bg-[#4ADE80] text-[#0D0D0D] text-[11px] font-bold px-3.5 py-1 rounded-full shadow-lg">
                Launch offer
              </span>
            </div>
            {/* Top glow line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-[#4ADE80]/40 to-transparent" />

            {/* Price row */}
            <div className="flex flex-wrap items-end gap-4 mb-6">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#4ADE80] mb-3">Pro</p>
                <div className="flex items-start gap-1">
                  <span className="text-2xl font-bold text-zinc-400 mt-1.5">$</span>
                  <span className="text-6xl font-bold text-white leading-none tracking-tight">15</span>
                  <span className="text-zinc-500 text-sm ml-1 mb-1 self-end">/year</span>
                </div>
              </div>
              <div className="flex flex-col gap-1.5 pb-1">
                <div className="flex items-center gap-2">
                  <span className="text-zinc-600 text-sm line-through">$75/yr</span>
                  <span className="text-[11px] font-bold text-[#4ADE80] bg-[#4ADE80]/10 px-2 py-0.5 rounded-full">80% off</span>
                </div>
                <p className="text-zinc-600 text-xs">Billed annually · cancel anytime</p>
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-zinc-800 mb-6" />

            {/* Features in 2 columns */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 mb-8 flex-1">
              {PRO_FEATURES.map(f => (
                <li key={f} className="flex items-start gap-2.5 text-zinc-300 text-[13px] leading-snug">
                  <span className="mt-0.5 flex-shrink-0"><Check /></span>{f}
                </li>
              ))}
            </ul>

            <Link href="/login"
              className="block text-center bg-[#4ADE80] text-[#0D0D0D] hover:bg-[#22c55e] font-bold text-[14px] py-3.5 rounded-xl transition-colors shadow-[0_0_20px_rgba(74,222,128,0.2)]">
              Get started with Pro →
            </Link>
          </PricingCard>

        </div>
      </div>
    </section>
  )
}
