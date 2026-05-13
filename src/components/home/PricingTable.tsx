'use client'
import { useState } from 'react'
import Link from 'next/link'
import { PRICING } from '@/types'

const FREE_FEATURES = [
  '2 active gates',
  '2 passwords per gate',
  'View count & failed attempt stats',
  'Passwords auto-expire in 30 days',
  'Powered by pgate branding',
]

const MAKER_FEATURES = [
  '15 active gates',
  '10 passwords per gate',
  'Full analytics — location, device, time',
  'Instant email on every open',
  'Weekly digest summary',
  'Failed attempt alerts',
  'Custom password expiry',
  'Custom gate slug',
]

const PRO_FEATURES = [
  'Unlimited gates',
  '20 passwords per gate',
  'Everything in Maker',
  'Custom gate page branding',
  'Upload your logo + background',
  'White-label — no pgate branding',
  'Custom button colour & headline',
]

function Check() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ADE80" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
  )
}

export default function PricingTable() {
  const [annual, setAnnual] = useState(true)

  return (
    <section id="pricing" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
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
              {annual && <span className="text-[10px] font-bold bg-[#4ADE80] text-[#0D0D0D] px-1.5 py-0.5 rounded-full">Save 67%</span>}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {/* Free */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-7 flex flex-col">
            <div className="mb-6">
              <p className="text-sm font-semibold text-zinc-400 mb-2">Free</p>
              <div className="flex items-end gap-1">
                <span className="text-4xl font-bold text-white">$0</span>
              </div>
              <p className="text-zinc-600 text-xs mt-1">Forever free</p>
            </div>
            <ul className="space-y-2.5 flex-1 mb-7">
              {FREE_FEATURES.map(f => (
                <li key={f} className="flex items-start gap-2.5 text-zinc-400 text-[13px]"><span className="mt-0.5"><Check /></span>{f}</li>
              ))}
            </ul>
            <Link href="/login" className="block text-center border border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-white font-semibold text-sm py-3 rounded-xl transition-colors">
              Get started free
            </Link>
          </div>

          {/* Maker */}
          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-7 flex flex-col relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="bg-[#4ADE80] text-[#0D0D0D] text-[11px] font-bold px-3 py-1 rounded-full">Most popular</span>
            </div>
            <div className="mb-6">
              <p className="text-sm font-semibold text-zinc-300 mb-2">Maker</p>
              <div className="flex items-end gap-1">
                <span className="text-4xl font-bold text-white">
                  ${annual ? PRICING.maker.annualMonthly : PRICING.maker.monthly}
                </span>
                <span className="text-zinc-500 text-sm mb-1">/mo</span>
              </div>
              <p className="text-zinc-600 text-xs mt-1">
                {annual ? `Billed $${PRICING.maker.annual}/yr` : 'Billed monthly'}
              </p>
            </div>
            <ul className="space-y-2.5 flex-1 mb-7">
              {MAKER_FEATURES.map(f => (
                <li key={f} className="flex items-start gap-2.5 text-zinc-300 text-[13px]"><span className="mt-0.5"><Check /></span>{f}</li>
              ))}
            </ul>
            <Link href="/login"
              className="block text-center bg-[#4ADE80] text-[#0D0D0D] hover:bg-[#22c55e] font-semibold text-sm py-3 rounded-xl transition-colors">
              Start Maker
            </Link>
          </div>

          {/* Pro */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-7 flex flex-col">
            <div className="mb-6">
              <p className="text-sm font-semibold text-zinc-400 mb-2">Pro</p>
              <div className="flex items-end gap-1">
                <span className="text-4xl font-bold text-white">
                  ${annual ? PRICING.pro.annualMonthly : PRICING.pro.monthly}
                </span>
                <span className="text-zinc-500 text-sm mb-1">/mo</span>
              </div>
              <p className="text-zinc-600 text-xs mt-1">
                {annual ? `Billed $${PRICING.pro.annual}/yr` : 'Billed monthly'}
              </p>
            </div>
            <ul className="space-y-2.5 flex-1 mb-7">
              {PRO_FEATURES.map(f => (
                <li key={f} className="flex items-start gap-2.5 text-zinc-300 text-[13px]"><span className="mt-0.5"><Check /></span>{f}</li>
              ))}
            </ul>
            <Link href="/login"
              className="block text-center border border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-white font-semibold text-sm py-3 rounded-xl transition-colors">
              Start Pro
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
