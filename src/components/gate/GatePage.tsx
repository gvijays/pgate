'use client'
import { useState } from 'react'
import { Gate } from '@/types'
import { motion, AnimatePresence } from 'framer-motion'

export default function GatePage({ gate }: { gate: Gate }) {
  const [password,  setPassword]  = useState('')
  const [loading,   setLoading]   = useState(false)
  const [error,     setError]     = useState('')
  const [attempts,  setAttempts]  = useState(0)
  const [shake,     setShake]     = useState(false)

  const isDark = gate.theme_card_style === 'dark'
  const bg     = gate.theme_bg_color ?? '#0D0D0D'
  const btn    = gate.theme_button_color ?? '#4ADE80'
  const isPro  = gate.theme_hide_branding // proxy for pro (hide_branding only set on pro)

  const triggerShake = () => {
    setShake(true)
    setTimeout(() => setShake(false), 500)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!password.trim()) return
    setLoading(true); setError('')

    try {
      const res = await fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: gate.slug, password }),
      })
      const data = await res.json()

      if (data.success && data.redirectUrl) {
        window.location.href = data.redirectUrl
      } else {
        setAttempts(a => a + 1)
        setError(attempts >= 2 ? `Incorrect password (${attempts + 1} attempts)` : 'Incorrect password')
        triggerShake()
        setPassword('')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: bg }}>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[360px]">

        <motion.div
          animate={shake ? { x: [-8, 8, -6, 6, -3, 0] } : { x: 0 }}
          transition={{ duration: 0.4 }}
          className={`rounded-2xl shadow-2xl p-8 ${isDark ? 'bg-zinc-900 border border-zinc-700' : 'bg-white border border-zinc-200'}`}>

          {/* Logo */}
          <div className="flex justify-center mb-6">
            {gate.theme_logo_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={gate.theme_logo_url} alt="Logo" className="h-12 object-contain" />
            ) : (
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isDark ? 'bg-zinc-800 border border-zinc-700' : 'bg-zinc-100 border border-zinc-200'}`}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={isDark ? '#4ADE80' : '#16a34a'} strokeWidth="1.8">
                  <rect x="3" y="11" width="18" height="11" rx="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </div>
            )}
          </div>

          {/* Headline */}
          <h1 className={`text-[17px] font-bold text-center mb-1 ${isDark ? 'text-white' : 'text-zinc-900'}`}>
            {gate.theme_headline || 'Enter password to view'}
          </h1>
          <p className={`text-xs text-center mb-7 ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
            This content is password protected.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Access code"
                autoFocus
                autoComplete="off"
                className={`w-full text-sm px-4 py-3 rounded-xl outline-none transition-all ${
                  isDark
                    ? 'bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-600 focus:border-[#4ADE80]/40'
                    : 'bg-zinc-50 border border-zinc-200 text-zinc-900 placeholder-zinc-400 focus:border-green-400/60'
                } ${error ? 'border-red-500/50' : ''}`}
              />
              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="text-red-400 text-xs mt-2 text-center">
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <button type="submit" disabled={loading || !password.trim()}
              className="w-full font-semibold text-sm py-3 rounded-xl transition-all disabled:opacity-50"
              style={{ background: btn, color: isDark ? '#0D0D0D' : '#0D0D0D' }}>
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                  Verifying…
                </span>
              ) : (
                'View content →'
              )}
            </button>
          </form>
        </motion.div>

        {/* pgate branding */}
        {!gate.theme_hide_branding && (
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            className="text-center text-[11px] text-zinc-700 mt-4">
            Protected by{' '}
            <a href="https://pgate.io" className="text-[#4ADE80] hover:text-[#22c55e] transition-colors font-medium">pgate</a>
          </motion.p>
        )}
      </motion.div>
    </div>
  )
}
