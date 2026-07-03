'use client'
import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import LoginModal from './LoginModal'
import { createClient } from '@/lib/supabase/client'

const PLACEHOLDERS = [
  'https://figma.com/file/your-design...',
  'https://notion.so/your-page...',
  'https://docs.google.com/presentation/...',
  'https://framer.com/projects/...',
  'https://drive.google.com/file/...',
  'https://pitch.com/decks/...',
]

const ANON_LIMIT  = 3
const STORAGE_KEY = 'pg_anon_count'

function getAnonCount()  { try { return parseInt(localStorage.getItem(STORAGE_KEY) ?? '0', 10) } catch { return 0 } }
function bumpAnonCount() { try { localStorage.setItem(STORAGE_KEY, String(getAnonCount() + 1)) } catch {} }
function makePassword()  {
  return Array.from({ length: 8 }, () =>
    'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'[Math.floor(Math.random() * 32)]
  ).join('')
}

export default function Hero() {
  const [url,          setUrl]          = useState('')
  const [password,     setPassword]     = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [urlFocused,   setUrlFocused]   = useState(false)
  const [phIdx,        setPhIdx]        = useState(0)
  const [creating,     setCreating]     = useState(false)
  const [gateUrl,      setGateUrl]      = useState<string | null>(null)
  const [gateId,       setGateId]       = useState<string | null>(null)
  const [createdUrl,   setCreatedUrl]   = useState('')
  const [copied,       setCopied]       = useState(false)
  const [apiError,     setApiError]     = useState<string | null>(null)
  const [modalReason,  setModalReason]  = useState<'limit' | 'track' | null>(null)
  const [loggedIn,     setLoggedIn]     = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getSession().then(({ data }) => setLoggedIn(!!data.session))
  }, [])

  // Cycle placeholder when URL field is idle
  useEffect(() => {
    if (urlFocused || url) return
    const id = setInterval(() => setPhIdx(p => (p + 1) % PLACEHOLDERS.length), 2800)
    return () => clearInterval(id)
  }, [urlFocused, url])


  // ── Button: Password protect this link ──────────────────────────────────
  const handleProtect = useCallback(async () => {
    if (!url.trim() || !password.trim()) return
    if (getAnonCount() >= ANON_LIMIT) { setModalReason('limit'); return }

    setCreating(true)
    setApiError(null)
    try {
      // Same URL as existing gate → update password only (keep same link)
      const finalUrl = normalizeUrl(url)

      if (gateId && finalUrl === createdUrl) {
        const res  = await fetch('/api/gates/anonymous', {
          method:  'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body:    JSON.stringify({ gateId, password: password.trim() }),
        })
        const data = await res.json()
        if (!res.ok) { setApiError(data.error ?? 'Failed to update password'); return }
        // gateUrl stays unchanged — only password behind it changed
      } else {
        // New URL or first time → create fresh gate
        const res  = await fetch('/api/gates/anonymous', {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body:    JSON.stringify({ url: finalUrl, password: password.trim() }),
        })
        const data = await res.json()
        if (!res.ok || !data.slug) { setApiError(data.error ?? 'Failed to create link'); return }
        setGateUrl(`${window.location.origin}/g/${data.slug}`)
        setGateId(data.gateId)
        setCreatedUrl(finalUrl)
        bumpAnonCount()
        if (getAnonCount() >= ANON_LIMIT) {
          setTimeout(() => setModalReason('limit'), 1400)
        }
      }
    } catch (e) { console.error(e); setApiError('Something went wrong. Please try again.') }
    finally { setCreating(false) }
  }, [url, password, gateId, createdUrl])

  // ── Generate → fills password field only, reveals it so user can see ────
  const handleGenerate = () => {
    setPassword(makePassword())
    setShowPassword(true)
    setCopied(false)
  }

  // Normalize URL — add https:// if no protocol given
  const normalizeUrl = (val: string) =>
    val.trim() && !/^https?:\/\//i.test(val.trim()) ? `https://${val.trim()}` : val.trim()

  // ── URL change → clear old result (different URL = needs new gate) ───────
  const handleUrlChange = (val: string) => {
    setUrl(val)
    setGateUrl(null)
    setGateId(null)
    setCreatedUrl('')
    setCopied(false)
  }

  const copy = async () => {
    if (!gateUrl) return
    await navigator.clipboard.writeText(gateUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const canProtect = url.trim().length > 0 && password.trim().length > 0
  const isUpdate   = !!gateId && url.trim() === createdUrl

  return (
    <>
      <section className="relative flex flex-col items-center justify-center px-4 pt-28 pb-20 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(74,222,128,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(74,222,128,0.03)_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#4ADE80]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto text-center w-full">

          {/* Badge */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-700 text-zinc-400 text-xs font-medium px-3.5 py-1.5 rounded-full mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] animate-pulse" />
            Secure link sharing with access tracking
          </motion.div>

          {/* Headline */}
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.08 }}
            className="text-[22px] sm:text-5xl font-bold tracking-tight leading-[1.15] mb-5 text-white">
            Password-protect any link<br />
            <span className="text-[#4ADE80]">— see exactly who opens it.</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}
            className="text-zinc-400 text-lg sm:text-xl max-w-xl mx-auto leading-relaxed mb-6">
            Works with Figma, Notion, Google Drive — any URL.
          </motion.p>

          {/* Per-recipient callout pills */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {[
              { icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#4ADE80" strokeWidth="2.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>, label: 'One password per recipient' },
              { icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#4ADE80" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, label: 'See opens in real time' },
              { icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#4ADE80" strokeWidth="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>, label: 'Location & device tracking' },
            ].map(({ icon, label }) => (
              <span key={label} className="inline-flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs px-3 py-1.5 rounded-full">
                {icon}{label}
              </span>
            ))}
          </motion.div>

          {/* ── Fields ── */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.22 }}
            className="max-w-[520px] mx-auto space-y-3">

            {/* URL field */}
            <div className={`relative rounded-2xl border transition-all duration-200 bg-zinc-900 ${
              urlFocused
                ? 'border-[#4ADE80]/60 shadow-[0_0_0_3px_rgba(74,222,128,0.08)]'
                : 'border-zinc-700 hover:border-zinc-600'
            }`}>
              <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                  stroke={urlFocused || url ? '#4ADE80' : '#52525b'}
                  strokeWidth="2" strokeLinecap="round" className="transition-colors duration-200">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                </svg>
              </div>
              <input
                ref={inputRef}
                value={url}
                onChange={e => handleUrlChange(e.target.value)}
                onFocus={() => setUrlFocused(true)}
                onBlur={() => setUrlFocused(false)}
                className="w-full bg-transparent text-white text-[15px] pl-11 pr-10 py-4 rounded-2xl outline-none placeholder-zinc-600"
                placeholder={PLACEHOLDERS[phIdx]}
              />
              {url && (
                <button
                  type="button"
                  onClick={() => { handleUrlChange(''); setPassword(''); setShowPassword(false) }}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-300 transition-colors p-0.5"
                  tabIndex={-1}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              )}
            </div>

            {/* Password field */}
            <div className="relative rounded-2xl border border-zinc-700 hover:border-zinc-600 bg-zinc-900 transition-colors overflow-hidden">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#52525b" strokeWidth="2" strokeLinecap="round">
                  <rect x="3" y="11" width="18" height="11" rx="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => { setPassword(e.target.value); setCopied(false) }}
                autoComplete="new-password"
                className="w-full bg-transparent text-white text-[15px] pl-11 pr-36 py-4 outline-none placeholder-zinc-600"
                placeholder="Enter your password"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                {password.length > 0 && (
                  <button type="button" onClick={() => setShowPassword(s => !s)}
                    className="text-zinc-600 hover:text-zinc-400 transition-colors p-1" tabIndex={-1}>
                    {showPassword ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                        <line x1="1" y1="1" x2="23" y2="23"/>
                      </svg>
                    ) : (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    )}
                  </button>
                )}
                <button type="button" onClick={handleGenerate}
                  className="text-xs text-zinc-400 hover:text-[#4ADE80] bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 px-2.5 py-1.5 rounded-lg transition-colors font-medium whitespace-nowrap">
                  Generate ↻
                </button>
              </div>
            </div>

            {/* ── CTA button ── */}
            <button
              type="button"
              onClick={handleProtect}
              disabled={!canProtect || creating}
              className="w-full bg-[#4ADE80] text-[#0D0D0D] font-semibold text-[15px] py-4 rounded-2xl hover:bg-[#22c55e] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2">
              {creating ? (
                <>
                  <svg className="animate-spin" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                  </svg>
                  {isUpdate ? 'Updating password…' : 'Creating your link…'}
                </>
              ) : isUpdate ? (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  Update password
                </>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <rect x="3" y="11" width="18" height="11" rx="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                  Password protect this link
                </>
              )}
            </button>

            {/* API error */}
            {apiError && (
              <p className="text-red-400 text-xs text-center">{apiError}</p>
            )}

            {/* ── Result card ── */}
            <AnimatePresence>
              {gateUrl && !creating && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-zinc-900 border border-[#4ADE80]/20 rounded-2xl overflow-hidden">

                  {/* Link row */}
                  <div className="flex items-center gap-3 px-4 py-3.5 border-b border-zinc-800/60">
                    <div className="w-5 h-5 rounded-full bg-[#4ADE80]/15 flex items-center justify-center flex-shrink-0">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#4ADE80" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </div>
                    <span className="text-sm font-mono text-[#4ADE80] truncate flex-1 text-left">{gateUrl}</span>

                    {/* Copy */}
                    <button onClick={copy}
                      title="Copy link"
                      className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg border transition-all ${
                        copied
                          ? 'bg-[#4ADE80]/10 text-[#4ADE80] border-[#4ADE80]/20'
                          : 'bg-zinc-800 text-zinc-400 border-zinc-700 hover:text-white hover:border-zinc-500'
                      }`}>
                      {copied ? (
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      ) : (
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="9" y="9" width="13" height="13" rx="2"/>
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                        </svg>
                      )}
                    </button>

                    {/* Open in new tab */}
                    <a href={gateUrl} target="_blank" rel="noopener noreferrer"
                      title="Open your protected link"
                      className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-[#4ADE80] hover:border-[#4ADE80]/30 transition-all">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                        <polyline points="15 3 21 3 21 9"/>
                        <line x1="10" y1="14" x2="21" y2="3"/>
                      </svg>
                    </a>
                  </div>

                  {/* Nudge */}
                  <div className="px-4 py-3 flex items-center justify-between gap-3">
                    {loggedIn ? (
                      <>
                        <div className="text-left">
                          <p className="text-xs font-semibold text-zinc-300">Link created!</p>
                          <p className="text-[11px] text-zinc-600 mt-0.5">
                            Go to dashboard to add recipient labels &amp; track opens
                          </p>
                        </div>
                        <Link href="/dashboard"
                          className="flex-shrink-0 bg-[#4ADE80] text-[#0D0D0D] font-semibold text-xs px-3.5 py-2 rounded-lg hover:bg-[#22c55e] transition-colors whitespace-nowrap">
                          Dashboard →
                        </Link>
                      </>
                    ) : (
                      <>
                        <div className="text-left">
                          <p className="text-xs font-semibold text-zinc-300">
                            Who opens this? You won&apos;t know without an account.
                          </p>
                          <p className="text-[11px] text-zinc-600 mt-0.5">
                            Free · See device, location &amp; timestamp for every open
                          </p>
                        </div>
                        <button onClick={() => setModalReason('track')}
                          className="flex-shrink-0 bg-[#4ADE80] text-[#0D0D0D] font-semibold text-xs px-3.5 py-2 rounded-lg hover:bg-[#22c55e] transition-colors whitespace-nowrap">
                          Sign up free →
                        </button>
                      </>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>

          {/* Social proof */}
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="text-zinc-600 text-sm mt-8">
            Free forever · No credit card · Works in 30 seconds
          </motion.p>

        </div>
      </section>

      {modalReason && <LoginModal reason={modalReason} onClose={() => setModalReason(null)} />}
    </>
  )
}
