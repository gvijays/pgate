'use client'
import { useState } from 'react'
import { Gate, Profile, PLAN_LIMITS } from '@/types'
import Link from 'next/link'

function ProBadge() {
  return (
    <span className="inline-flex items-center text-[9px] font-bold bg-[#4ADE80]/10 text-[#4ADE80] border border-[#4ADE80]/20 px-1.5 py-0.5 rounded-full ml-1.5">PRO</span>
  )
}

function LivePreview({ theme }: { theme: { bg: string; cardStyle: string; logoUrl: string; headline: string; buttonColor: string; hideBranding: boolean } }) {
  const isDark = theme.cardStyle === 'dark'
  return (
    <div className="rounded-2xl overflow-hidden border border-zinc-700 flex items-center justify-center p-8"
      style={{ background: theme.bg, minHeight: 320 }}>
      <div className={`w-full max-w-[280px] rounded-2xl p-6 shadow-2xl ${isDark ? 'bg-zinc-900 border border-zinc-700' : 'bg-white border border-zinc-200'}`}>
        {/* Logo */}
        {theme.logoUrl ? (
          <div className="flex justify-center mb-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={theme.logoUrl} alt="Logo" className="h-10 object-contain" />
          </div>
        ) : (
          <div className="flex justify-center mb-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${isDark ? 'bg-zinc-800 border-zinc-700' : 'bg-zinc-100 border-zinc-200'}`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={isDark ? '#71717a' : '#a1a1aa'} strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            </div>
          </div>
        )}
        <p className={`text-sm font-bold text-center mb-1 ${isDark ? 'text-white' : 'text-zinc-900'}`}>
          {theme.headline || 'Enter password to view'}
        </p>
        <p className={`text-xs text-center mb-4 ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>Protected content</p>
        <div className={`w-full rounded-xl px-3 py-2.5 border text-xs mb-3 ${isDark ? 'bg-zinc-800 border-zinc-700 text-zinc-600' : 'bg-zinc-50 border-zinc-200 text-zinc-400'}`}>
          Access code
        </div>
        <div className="w-full rounded-xl py-2.5 text-center text-xs font-semibold text-[#0D0D0D]"
          style={{ background: theme.buttonColor }}>
          View →
        </div>
        {!theme.hideBranding && (
          <p className="text-center text-[9px] mt-3 text-zinc-500">Protected by pgate</p>
        )}
      </div>
    </div>
  )
}

export default function GateCustomizer({ gate, profile }: { gate: Gate; profile: Profile | null }) {
  const plan   = profile?.plan ?? 'free'
  const limits = PLAN_LIMITS[plan]
  const isPro  = limits.customBranding

  const [bg,           setBg]           = useState(gate.theme_bg_color ?? '#0D0D0D')
  const [cardStyle,    setCardStyle]    = useState<'dark' | 'light'>(gate.theme_card_style ?? 'dark')
  const [logoUrl,      setLogoUrl]      = useState(gate.theme_logo_url ?? '')
  const [headline,     setHeadline]     = useState(gate.theme_headline ?? '')
  const [buttonColor,  setButtonColor]  = useState(gate.theme_button_color ?? '#4ADE80')
  const [hideBranding, setHideBranding] = useState(gate.theme_hide_branding ?? false)
  const [saving,       setSaving]       = useState(false)
  const [saved,        setSaved]        = useState(false)

  const save = async () => {
    setSaving(true)
    await fetch(`/api/gates/${gate.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        theme_bg_color: bg,
        theme_card_style: cardStyle,
        theme_logo_url: logoUrl || null,
        theme_headline: headline || null,
        theme_button_color: buttonColor,
        theme_hide_branding: isPro ? hideBranding : false,
      }),
    })
    setSaving(false); setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="p-6 sm:p-8 max-w-5xl mx-auto">
      <Link href={`/dashboard/gates/${gate.id}`}
        className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 mb-6 transition-colors">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
        Back to analytics
      </Link>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-bold text-white">Customize gate page</h1>
          <p className="text-zinc-500 text-sm mt-0.5">What your recipients see when they visit your gate link.</p>
        </div>
        <button onClick={save} disabled={saving}
          className="bg-[#4ADE80] text-[#0D0D0D] font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-[#22c55e] transition-colors disabled:opacity-50">
          {saved ? '✓ Saved' : saving ? 'Saving…' : 'Save changes'}
        </button>
      </div>

      {!isPro && (
        <div className="bg-zinc-900 border border-zinc-700 rounded-xl px-5 py-4 flex items-center justify-between mb-6">
          <div>
            <p className="text-sm font-semibold text-white">Custom branding is a Pro feature</p>
            <p className="text-xs text-zinc-500 mt-0.5">Upgrade to Pro to apply your logo, colors, and remove pgate branding.</p>
          </div>
          <Link href="/dashboard/billing"
            className="text-sm font-semibold bg-[#4ADE80] text-[#0D0D0D] px-4 py-2 rounded-lg hover:bg-[#22c55e] transition-colors">
            Upgrade to Pro
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="space-y-6">
          {/* Background */}
          <div>
            <label className="block text-xs font-semibold text-zinc-400 mb-1.5">Background color</label>
            <div className="flex items-center gap-3">
              <input type="color" value={bg} onChange={e => setBg(e.target.value)} disabled={!isPro}
                className="w-10 h-10 rounded-lg border border-zinc-700 cursor-pointer bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed" />
              <input type="text" value={bg} onChange={e => setBg(e.target.value)} disabled={!isPro}
                className="flex-1 bg-zinc-800 border border-zinc-700 text-white text-sm px-3 py-2 rounded-lg font-mono outline-none disabled:opacity-40" />
              {!isPro && <ProBadge />}
            </div>
          </div>

          {/* Card style */}
          <div>
            <label className="block text-xs font-semibold text-zinc-400 mb-1.5">Card style {!isPro && <ProBadge />}</label>
            <div className="flex gap-2">
              {(['dark', 'light'] as const).map(s => (
                <button key={s} onClick={() => isPro && setCardStyle(s)} disabled={!isPro}
                  className={`flex-1 py-2 rounded-xl text-sm font-medium border transition-all capitalize disabled:opacity-40 disabled:cursor-not-allowed ${cardStyle === s ? 'border-[#4ADE80]/50 bg-[#4ADE80]/8 text-[#4ADE80]' : 'border-zinc-700 text-zinc-500'}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Headline */}
          <div>
            <label className="block text-xs font-semibold text-zinc-400 mb-1.5">Headline text {!isPro && <ProBadge />}</label>
            <input value={headline} onChange={e => setHeadline(e.target.value)} disabled={!isPro}
              placeholder="Enter password to view"
              className="w-full bg-zinc-800 border border-zinc-700 text-white text-sm px-4 py-2.5 rounded-xl outline-none focus:border-[#4ADE80]/40 transition-colors placeholder-zinc-600 disabled:opacity-40" />
          </div>

          {/* Button color */}
          <div>
            <label className="block text-xs font-semibold text-zinc-400 mb-1.5">Button color {!isPro && <ProBadge />}</label>
            <div className="flex items-center gap-3">
              <input type="color" value={buttonColor} onChange={e => setButtonColor(e.target.value)} disabled={!isPro}
                className="w-10 h-10 rounded-lg border border-zinc-700 cursor-pointer bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed" />
              <input type="text" value={buttonColor} onChange={e => setButtonColor(e.target.value)} disabled={!isPro}
                className="flex-1 bg-zinc-800 border border-zinc-700 text-white text-sm px-3 py-2 rounded-lg font-mono outline-none disabled:opacity-40" />
            </div>
          </div>

          {/* Logo URL */}
          <div>
            <label className="block text-xs font-semibold text-zinc-400 mb-1.5">Logo URL {!isPro && <ProBadge />}</label>
            <input value={logoUrl} onChange={e => setLogoUrl(e.target.value)} disabled={!isPro}
              placeholder="https://your-logo-url.com/logo.png"
              className="w-full bg-zinc-800 border border-zinc-700 text-white text-sm px-4 py-2.5 rounded-xl outline-none focus:border-[#4ADE80]/40 transition-colors placeholder-zinc-600 disabled:opacity-40" />
          </div>

          {/* White-label */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-300">Hide pgate branding <ProBadge /></p>
              <p className="text-xs text-zinc-600 mt-0.5">Remove "Protected by pgate" from the gate page</p>
            </div>
            <button onClick={() => isPro && setHideBranding(!hideBranding)} disabled={!isPro}
              className={`w-10 h-5 rounded-full transition-colors relative disabled:opacity-40 disabled:cursor-not-allowed ${hideBranding && isPro ? 'bg-[#4ADE80]' : 'bg-zinc-700'}`}>
              <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${hideBranding && isPro ? 'left-[calc(100%-18px)]' : 'left-0.5'}`} />
            </button>
          </div>
        </div>

        {/* Live preview */}
        <div>
          <p className="text-xs font-semibold text-zinc-500 uppercase tracking-[0.08em] mb-3">Live preview</p>
          <LivePreview theme={{ bg, cardStyle, logoUrl, headline, buttonColor, hideBranding: hideBranding && isPro }} />
          <p className="text-xs text-zinc-700 text-center mt-2">This is what your recipients will see</p>
        </div>
      </div>
    </div>
  )
}
