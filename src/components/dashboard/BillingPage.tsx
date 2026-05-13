'use client'
import { useEffect } from 'react'
import { Profile, Subscription, PRICING, PLAN_LIMITS } from '@/types'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'

const PADDLE_CLIENT_TOKEN = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN ?? ''
const IS_PADDLE_LIVE = PADDLE_CLIENT_TOKEN && !PADDLE_CLIENT_TOKEN.startsWith('REPLACE')

function usePaddle() {
  useEffect(() => {
    if (!IS_PADDLE_LIVE) return
    const script = document.createElement('script')
    script.src = 'https://cdn.paddle.com/paddle/v2/paddle.js'
    script.async = true
    script.onload = () => {
      const Paddle = (window as unknown as { Paddle: { Setup: (opts: { token: string }) => void } }).Paddle
      Paddle.Setup({ token: PADDLE_CLIENT_TOKEN })
    }
    document.head.appendChild(script)
    return () => { document.head.removeChild(script) }
  }, [])
}

interface Props { profile: Profile | null; subscription: Subscription | null }

function PlanCard({ title, monthlyPrice, annualPrice, annualMonthly, priceIdMonthly, priceIdAnnual, current, features }: {
  title: string; monthlyPrice: number; annualPrice: number; annualMonthly: number;
  priceIdMonthly: string; priceIdAnnual: string; current: boolean; features: string[]
}) {
  const handleUpgrade = (priceId: string) => {
    if (!IS_PADDLE_LIVE) { alert('Payments coming soon! Stay tuned.'); return }
    // Paddle.js checkout — will initialize once client token is set
    if (typeof window !== 'undefined' && (window as unknown as { Paddle?: { Checkout?: { open: (opts: unknown) => void } } }).Paddle?.Checkout) {
      (window as unknown as { Paddle: { Checkout: { open: (opts: unknown) => void } } }).Paddle.Checkout.open({ items: [{ priceId, quantity: 1 }] })
    }
  }

  return (
    <div className={`bg-zinc-900 border rounded-2xl p-6 ${current ? 'border-[#4ADE80]/40' : 'border-zinc-800'}`}>
      <div className="flex items-center justify-between mb-4">
        <p className="font-bold text-white capitalize">{title}</p>
        {current && <span className="text-xs bg-[#4ADE80]/10 text-[#4ADE80] border border-[#4ADE80]/20 px-2 py-0.5 rounded-full font-medium">Current</span>}
      </div>
      <div className="mb-4">
        <span className="text-3xl font-bold text-white">${monthlyPrice}</span>
        <span className="text-zinc-500 text-sm">/mo</span>
        <p className="text-xs text-zinc-600 mt-0.5">or ${annualMonthly}/mo billed ${annualPrice}/yr</p>
      </div>
      <ul className="space-y-1.5 mb-5">
        {features.map(f => (
          <li key={f} className="flex items-center gap-2 text-zinc-400 text-xs">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#4ADE80" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            {f}
          </li>
        ))}
      </ul>
      {!current && (
        <div className="space-y-2">
          <button onClick={() => handleUpgrade(priceIdMonthly)}
            className="w-full bg-[#4ADE80] text-[#0D0D0D] font-semibold text-sm py-2.5 rounded-xl hover:bg-[#22c55e] transition-colors">
            {IS_PADDLE_LIVE ? `Upgrade — $${monthlyPrice}/mo` : 'Upgrade (Coming Soon)'}
          </button>
          <button onClick={() => handleUpgrade(priceIdAnnual)}
            className="w-full border border-zinc-700 text-zinc-400 hover:text-zinc-200 text-sm py-2 rounded-xl transition-colors text-xs">
            {IS_PADDLE_LIVE ? `Annual — $${annualMonthly}/mo (save ${Math.round((1 - annualPrice / (monthlyPrice * 12)) * 100)}%)` : 'Annual plan (Coming Soon)'}
          </button>
        </div>
      )}
    </div>
  )
}

export default function BillingPage({ profile, subscription }: Props) {
  usePaddle()
  const plan    = (profile?.plan ?? 'free') as import('@/types').Plan
  const limits  = PLAN_LIMITS[plan]

  return (
    <div className="p-6 sm:p-8 max-w-3xl mx-auto">
      <h1 className="text-xl font-bold text-white mb-1">Billing</h1>
      <p className="text-zinc-500 text-sm mb-8">Manage your plan and subscription.</p>

      {/* Current plan status */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-white capitalize">{plan} plan</p>
            {subscription?.current_period_end && (
              <p className="text-xs text-zinc-500 mt-0.5">Renews {formatDate(subscription.current_period_end)}</p>
            )}
            {plan === 'free' && <p className="text-xs text-zinc-600 mt-0.5">Free forever</p>}
          </div>
          <div className="text-right">
            <p className="text-xs text-zinc-500">{limits.maxGates === Infinity ? 'Unlimited' : limits.maxGates} gates</p>
            <p className="text-xs text-zinc-500">{limits.maxPasswordsPerGate} passwords/gate</p>
          </div>
        </div>
      </div>

      {/* Upgrade options */}
      {(plan as string) !== 'pro' && (
        <>
          <h2 className="text-sm font-semibold text-zinc-300 mb-4">Upgrade your plan</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {(plan as string) !== 'maker' && (
              <PlanCard
                title="Maker"
                monthlyPrice={PRICING.maker.monthly}
                annualPrice={PRICING.maker.annual}
                annualMonthly={PRICING.maker.annualMonthly}
                priceIdMonthly={process.env.NEXT_PUBLIC_PADDLE_MAKER_MONTHLY ?? ''}
                priceIdAnnual={process.env.NEXT_PUBLIC_PADDLE_MAKER_ANNUAL ?? ''}
                current={plan === 'maker'}
                features={['15 gates', '5 passwords per gate', 'Full analytics', 'Email notifications', 'Custom slugs']}
              />
            )}
            <PlanCard
              title="Pro"
              monthlyPrice={PRICING.pro.monthly}
              annualPrice={PRICING.pro.annual}
              annualMonthly={PRICING.pro.annualMonthly}
              priceIdMonthly={process.env.NEXT_PUBLIC_PADDLE_PRO_MONTHLY ?? ''}
              priceIdAnnual={process.env.NEXT_PUBLIC_PADDLE_PRO_ANNUAL ?? ''}
              current={plan === 'pro'}
              features={['Unlimited gates', '10 passwords per gate', 'Custom gate branding', 'White-label', 'QR codes']}
            />
          </div>
        </>
      )}

      {subscription && (plan as string) !== 'free' && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
          <p className="text-xs font-semibold text-zinc-400 mb-1">Subscription</p>
          <p className="text-xs text-zinc-600">ID: {subscription.paddle_subscription_id}</p>
          <p className="text-xs text-zinc-600 capitalize">Status: {subscription.status}</p>
        </div>
      )}

      {!IS_PADDLE_LIVE && (
        <div className="mt-6 bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-xs text-zinc-500">
          💳 Payments are being set up. Upgrade buttons will go live soon.
        </div>
      )}
    </div>
  )
}
