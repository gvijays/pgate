'use client'
import { useState, useRef, useCallback } from 'react'
import Link from 'next/link'
import type { PaddlePrices } from '@/lib/paddle-prices'

/** Hardcoded fallback shown while prices load or if Paddle is unavailable */
const FALLBACK_PRICES: PaddlePrices = {
  maker: { monthly: 6,  annual: 24, annualMonthly: 2 },
  pro:   { monthly: 10, annual: 36, annualMonthly: 3 },
}

const FREE_FEATURES = [
  '2 active links',
  '2 passwords per link',
  'View count & failed attempt stats',
  'Passwords auto-expire in 30 days',
  'Powered by pgate branding',
]

const MAKER_FEATURES = [
  '15 active links',
  '10 passwords per link',
  'Custom link slug — e.g. pgate.io/sara-portfolio instead of pgate.io/xK2m9',
  'Full analytics — location, device, time',
  'Instant email on every open',
  'Weekly digest summary',
  'Failed attempt alerts',
  'Custom password expiry',
]

const PRO_FEATURES = [
  'Unlimited links',
  '20 passwords per link',
  'Everything in Maker',
  'Custom link page branding',
  'Upload your logo + background',
  'White-label — no pgate branding',
  'Custom button colour & headline',
]

function Check() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ADE80" strokeWidth="2.5" strokeLinecap="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  )
}

/* ── Spotlight card wrapper ── */
function PricingCard({
  children,
  className,
  glow = 'rgba(74,222,128,0.10)',
}: {
  children: React.ReactNode
  className?: string
  glow?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
    el.style.setProperty('--so', '1')
  }, [])

  const onLeave = useCallback(() => {
    ref.current?.style.setProperty('--so', '0')
  }, [])

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`relative flex flex-col ${className ?? ''}`}
      style={{ '--mx': '50%', '--my': '50%', '--so': '0' } as React.CSSProperties}
    >
      {/* Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl overflow-hidden transition-opacity duration-500"
        style={{
          opacity: 'var(--so)',
          background: `radial-gradient(280px circle at var(--mx) var(--my), ${glow}, transparent 70%)`,
        }}
      />
      {children}
    </div>
  )
}

export default function PricingTable({ prices = FALLBACK_PRICES }: { prices?: PaddlePrices }) {
  const [annual, setAnnual] = useState(true)

  return (
    <section id="pricing" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#4ADE80] mb-4">Pricing</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-4">Simple. Affordable.</h2>
          <p className="text-zinc-400 text-lg mb-8">Start free. Upgrade when you need more.</p>

          {/* Toggle */}
          <div className="inline-flex items-center bg-zinc-900 border border-zinc-800 rounded-full p-1 gap-1">
            <button onClick={() => setAnnual(false)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${!annual ? 'bg-white text-zinc-900' : 'text-zinc-400 hover:text-white'}`}>
              Monthly
            </button>
            <button onClick={() => setAnnual(true)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${annual ? 'bg-white text-zinc-900' : 'text-zinc-400 hover:text-white'}`}>
              Annual
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full transition-all ${annual ? 'bg-[#4ADE80] text-[#0D0D0D]' : 'bg-zinc-700 text-zinc-400'}`}>
                Save 67%
              </span>
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">

          {/* ── Free ── */}
          <PricingCard className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
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

          {/* ── Maker (featured) ── */}
          <PricingCard
            className="bg-zinc-900 border border-[#4ADE80]/30 rounded-2xl p-8 relative"
            glow="rgba(74,222,128,0.12)"
          >
            {/* Badge */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
              <span className="bg-[#4ADE80] text-[#0D0D0D] text-[11px] font-bold px-3.5 py-1 rounded-full shadow-lg">
                Most popular
              </span>
            </div>

            {/* Subtle top glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-[#4ADE80]/40 to-transparent" />

            <div className="mb-1">
              <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#4ADE80] mb-4">Maker</p>
              <div className="flex items-start gap-1 mb-1">
                <span className="text-2xl font-bold text-zinc-400 mt-2">$</span>
                <span className="text-7xl font-bold text-white leading-none tracking-tight">
                  {annual ? prices.maker.annualMonthly : prices.maker.monthly}
                </span>
                <span className="text-zinc-500 text-base mt-auto mb-2">/mo</span>
              </div>
              <p className="text-zinc-600 text-xs mt-2 mb-8">
                {annual ? `Billed $${prices.maker.annual}/yr · save 67%` : 'Billed monthly'}
              </p>
            </div>
            <ul className="space-y-3 flex-1 mb-8">
              {MAKER_FEATURES.map(f => (
                <li key={f} className="flex items-start gap-2.5 text-zinc-300 text-[13px] leading-snug">
                  <span className="mt-0.5 flex-shrink-0"><Check /></span>{f}
                </li>
              ))}
            </ul>
            <Link href="/login"
              className="block text-center bg-[#4ADE80] text-[#0D0D0D] hover:bg-[#22c55e] font-bold text-[14px] py-3.5 rounded-xl transition-colors shadow-[0_0_20px_rgba(74,222,128,0.2)]">
              Start Maker
            </Link>
          </PricingCard>

          {/* ── Pro ── */}
          <PricingCard className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
            <div className="mb-1">
              <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-zinc-500 mb-4">Pro</p>
              <div className="flex items-start gap-1 mb-1">
                <span className="text-2xl font-bold text-zinc-400 mt-2">$</span>
                <span className="text-7xl font-bold text-white leading-none tracking-tight">
                  {annual ? prices.pro.annualMonthly : prices.pro.monthly}
                </span>
                <span className="text-zinc-500 text-base mt-auto mb-2">/mo</span>
              </div>
              <p className="text-zinc-600 text-xs mt-2 mb-8">
                {annual ? `Billed $${prices.pro.annual}/yr` : 'Billed monthly'}
              </p>
            </div>
            <ul className="space-y-3 flex-1 mb-8">
              {PRO_FEATURES.map(f => (
                <li key={f} className="flex items-start gap-2.5 text-zinc-300 text-[13px] leading-snug">
                  <span className="mt-0.5 flex-shrink-0"><Check /></span>{f}
                </li>
              ))}
            </ul>
            <Link href="/login"
              className="block text-center border border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-white font-semibold text-[14px] py-3.5 rounded-xl transition-colors">
              Start Pro
            </Link>
          </PricingCard>

        </div>
      </div>
    </section>
  )
}
