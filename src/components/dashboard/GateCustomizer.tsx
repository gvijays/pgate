'use client'
import { useState, useEffect } from 'react'
import { Gate, Profile, PLAN_LIMITS } from '@/types'
import Link from 'next/link'


function LivePreview({ theme }: { theme: { bg: string; bgImageUrl: string; cardStyle: string; logoUrl: string; headline: string; buttonColor: string; hideBranding: boolean } }) {
  const isDark = theme.cardStyle === 'dark'
  const bgStyle = theme.bgImageUrl
    ? { backgroundImage: `url(${theme.bgImageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : { background: theme.bg }
  return (
    <div className="rounded-2xl overflow-hidden border border-zinc-700 flex items-center justify-center p-8"
      style={{ ...bgStyle, minHeight: 320 }}>
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

const PRESET_THEMES = [
  { name: 'Midnight', bg: '#0D0D0D', cardStyle: 'dark' as const, buttonColor: '#4ADE80' },
  { name: 'Ocean',    bg: '#0f172a', cardStyle: 'dark' as const, buttonColor: '#38bdf8' },
  { name: 'Ivory',    bg: '#f8f7f4', cardStyle: 'light' as const, buttonColor: '#6366f1' },
]

export default function GateCustomizer({ gate, profile }: { gate: Gate; profile: Profile | null }) {
  const plan   = profile?.plan ?? 'free'
  const limits = PLAN_LIMITS[plan]
  const isPro  = limits.customBranding

  const [bg,           setBg]           = useState(gate.theme_bg_color ?? '#0D0D0D')
  const [cardStyle,    setCardStyle]    = useState<'dark' | 'light'>(gate.theme_card_style ?? 'dark')
  const [logoUrl,      setLogoUrl]      = useState(gate.theme_logo_url ?? '')
  const [bgImageUrl,   setBgImageUrl]   = useState(gate.theme_bg_image_url ?? '')
  const [bgUploading,  setBgUploading]  = useState(false)
  const [headline,     setHeadline]     = useState(gate.theme_headline ?? '')
  const [buttonColor,  setButtonColor]  = useState(gate.theme_button_color ?? '#4ADE80')
  const [hideBranding, setHideBranding] = useState(gate.theme_hide_branding ?? false)
  const [saving,       setSaving]       = useState(false)
  const [toast,        setToast]        = useState<'saved' | 'error' | null>(null)

  const handleBgImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setBgUploading(true)
    const form = new FormData()
    form.append('file', file)
    form.append('gateId', gate.id)
    try {
      const res = await fetch('/api/upload/bg-image', { method: 'POST', body: form })
      const data = await res.json()
      if (res.ok) setBgImageUrl(data.url)
      else setToast('error')
    } catch { setToast('error') }
    setBgUploading(false)
    e.target.value = ''
  }

  useEffect(() => {
    if (toast) { const t = setTimeout(() => setToast(null), 2500); return () => clearTimeout(t) }
  }, [toast])

  const save = async () => {
    setSaving(true)
    try {
      const res = await fetch(`/api/gates/${gate.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          theme_bg_color: bg,
          theme_card_style: cardStyle,
          theme_logo_url: isPro ? (logoUrl || null) : null,
          theme_bg_image_url: isPro ? (bgImageUrl || null) : null,
          theme_headline: isPro ? (headline || null) : null,
          theme_button_color: isPro ? buttonColor : '#4ADE80',
          theme_hide_branding: isPro ? hideBranding : false,
        }),
      })
      setToast(res.ok ? 'saved' : 'error')
    } catch {
      setToast('error')
    }
    setSaving(false)
  }

  return (
    <div className="p-6 sm:p-8 max-w-5xl mx-auto">

      {/* Toast */}
      <div className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${toast ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
        {toast === 'saved' && (
          <div className="flex items-center gap-2 bg-zinc-800 border border-zinc-700 text-white text-sm font-medium px-4 py-2.5 rounded-xl shadow-xl">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ADE80" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            Changes saved
          </div>
        )}
        {toast === 'error' && (
          <div className="flex items-center gap-2 bg-zinc-800 border border-red-500/40 text-white text-sm font-medium px-4 py-2.5 rounded-xl shadow-xl">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            Save failed — check console
          </div>
        )}
      </div>

      <Link href="/dashboard/gates"
        className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 mb-6 transition-colors">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
        Back to links
      </Link>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-bold text-white">Customize gate page</h1>
          <p className="text-zinc-500 text-sm mt-0.5">What your recipients see when they visit your gate link.</p>
        </div>
        <div className="flex items-center gap-2">
          <a href={`${process.env.NEXT_PUBLIC_APP_URL ?? 'https://pgate.io'}/g/${gate.slug}`}
            target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm font-medium bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-600 px-3 py-2.5 rounded-xl transition-colors whitespace-nowrap">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            <span className="hidden sm:inline">View link</span>
          </a>
          <button onClick={save} disabled={saving}
            className="bg-[#4ADE80] text-[#0D0D0D] font-semibold text-sm px-4 py-2.5 rounded-xl hover:bg-[#22c55e] transition-colors disabled:opacity-50 whitespace-nowrap">
            {saving ? 'Saving…' : 'Save'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="space-y-6">
          {/* Background — free for everyone */}
          <div>
            <label className="block text-xs font-semibold text-zinc-400 mb-1.5">Background color</label>
            <div className="flex items-center gap-3">
              <input type="color" value={bg} onChange={e => setBg(e.target.value)}
                className="w-10 h-10 rounded-lg border border-zinc-700 cursor-pointer bg-zinc-800" />
              <input type="text" value={bg} onChange={e => setBg(e.target.value)}
                className="flex-1 bg-zinc-800 border border-zinc-700 text-white text-sm px-3 py-2 rounded-lg font-mono outline-none" />
            </div>
          </div>

          {/* Paid fields — blurred overlay for free users */}
          <div className="relative mt-8 pt-6 border-t border-zinc-800">
            <div className={!isPro ? 'blur-[2px] pointer-events-none select-none opacity-60' : ''}>

              {/* Preset themes */}
              <div className="mb-6">
                <label className="block text-xs font-semibold text-zinc-400 mb-2">Preset themes</label>
                <div className="grid grid-cols-3 gap-2">
                  {PRESET_THEMES.map(t => (
                    <button key={t.name} onClick={() => { setBg(t.bg); setCardStyle(t.cardStyle); setButtonColor(t.buttonColor) }}
                      className={`rounded-xl overflow-hidden border transition-all ${bg === t.bg && buttonColor === t.buttonColor ? 'border-[#4ADE80]/60 ring-1 ring-[#4ADE80]/30' : 'border-zinc-700 hover:border-zinc-500'}`}>
                      <div className="h-10 flex items-center justify-center" style={{ background: t.bg }}>
                        <div className={`w-6 h-3 rounded-sm`} style={{ background: t.buttonColor }} />
                      </div>
                      <div className="py-1 bg-zinc-900">
                        <p className="text-[10px] font-medium text-zinc-400 text-center">{t.name}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Card style */}
              <div className="mb-6">
                <label className="block text-xs font-semibold text-zinc-400 mb-1.5">Card style</label>
                <div className="flex gap-2">
                  {(['dark', 'light'] as const).map(s => (
                    <button key={s} onClick={() => setCardStyle(s)}
                      className={`flex-1 py-2 rounded-xl text-sm font-medium border transition-all capitalize ${cardStyle === s ? 'border-[#4ADE80]/50 bg-[#4ADE80]/8 text-[#4ADE80]' : 'border-zinc-700 text-zinc-500'}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Headline */}
              <div className="mb-6">
                <label className="block text-xs font-semibold text-zinc-400 mb-1.5">Headline text</label>
                <input value={headline} onChange={e => setHeadline(e.target.value)}
                  placeholder="Enter password to view"
                  className="w-full bg-zinc-800 border border-zinc-700 text-white text-sm px-4 py-2.5 rounded-xl outline-none placeholder-zinc-600" />
              </div>

              {/* Button color */}
              <div className="mb-6">
                <label className="block text-xs font-semibold text-zinc-400 mb-1.5">Button color</label>
                <div className="flex items-center gap-3">
                  <input type="color" value={buttonColor} onChange={e => setButtonColor(e.target.value)}
                    className="w-10 h-10 rounded-lg border border-zinc-700 cursor-pointer bg-zinc-800" />
                  <input type="text" value={buttonColor} onChange={e => setButtonColor(e.target.value)}
                    className="flex-1 bg-zinc-800 border border-zinc-700 text-white text-sm px-3 py-2 rounded-lg font-mono outline-none" />
                </div>
              </div>

              {/* Logo URL */}
              <div className="mb-6">
                <label className="block text-xs font-semibold text-zinc-400 mb-1.5">Logo URL</label>
                <input value={logoUrl} onChange={e => setLogoUrl(e.target.value)}
                  placeholder="https://your-logo-url.com/logo.png"
                  className="w-full bg-zinc-800 border border-zinc-700 text-white text-sm px-4 py-2.5 rounded-xl outline-none placeholder-zinc-600" />
              </div>

              {/* Background image upload */}
              <div className="mb-6">
                <label className="block text-xs font-semibold text-zinc-400 mb-1.5">Background image</label>
                <p className="text-[10px] text-zinc-600 mb-2">Recommended: 1920×1080px · JPG, PNG or WebP · max 5 MB</p>

                {bgImageUrl ? (
                  <div className="relative rounded-xl overflow-hidden border border-zinc-700 group">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={bgImageUrl} alt="Background" className="w-full h-24 object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <label className="cursor-pointer text-[11px] font-semibold bg-zinc-800 text-zinc-200 px-3 py-1.5 rounded-lg hover:bg-zinc-700 transition-colors">
                        Replace
                        <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={handleBgImageUpload} disabled={bgUploading} />
                      </label>
                      <button onClick={() => setBgImageUrl('')}
                        className="text-[11px] font-semibold bg-red-500/20 text-red-400 px-3 py-1.5 rounded-lg hover:bg-red-500/30 transition-colors">
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <label className={`flex flex-col items-center justify-center gap-2 w-full h-24 rounded-xl border-2 border-dashed border-zinc-700 hover:border-zinc-500 transition-colors cursor-pointer ${bgUploading ? 'opacity-50 pointer-events-none' : ''}`}>
                    {bgUploading ? (
                      <div className="flex items-center gap-2 text-zinc-500">
                        <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                        <span className="text-xs">Uploading…</span>
                      </div>
                    ) : (
                      <>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#52525b" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                        <span className="text-xs text-zinc-500">Click to upload image</span>
                      </>
                    )}
                    <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={handleBgImageUpload} disabled={bgUploading} />
                  </label>
                )}
              </div>

              {/* White-label */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-zinc-300">Hide pgate branding</p>
                  <p className="text-xs text-zinc-600 mt-0.5">Remove &quot;Protected by pgate&quot; from the page</p>
                </div>
                <button onClick={() => setHideBranding(!hideBranding)}
                  className={`w-10 h-5 rounded-full transition-colors relative ${hideBranding ? 'bg-[#4ADE80]' : 'bg-zinc-700'}`}>
                  <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${hideBranding ? 'left-[calc(100%-18px)]' : 'left-0.5'}`} />
                </button>
              </div>
            </div>

            {/* Upgrade overlay */}
            {!isPro && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-zinc-950/30 rounded-xl">
                <div className="text-center">
                  <p className="text-sm font-semibold text-white mb-1">Unlock full customization</p>
                  <p className="text-xs text-zinc-500">Themes, card style, button color, logo &amp; branding</p>
                </div>
                <Link href="/dashboard/billing"
                  className="bg-amber-400 text-zinc-900 font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-amber-300 transition-colors">
                  Upgrade to unlock →
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Live preview */}
        <div>
          <p className="text-xs font-semibold text-zinc-500 uppercase tracking-[0.08em] mb-3">Live preview</p>
          <LivePreview theme={{ bg, bgImageUrl: isPro ? bgImageUrl : '', cardStyle, logoUrl, headline, buttonColor, hideBranding: hideBranding && isPro }} />
          <p className="text-xs text-zinc-700 text-center mt-2">This is what your recipients will see</p>
        </div>
      </div>
    </div>
  )
}
