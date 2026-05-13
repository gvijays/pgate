'use client'
import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { createClient } from '@/lib/supabase/client'
import { motion, AnimatePresence } from 'framer-motion'

const PERKS = [
  {
    icon: '📊',
    title: 'See exactly who opened it',
    desc: 'Timestamp, device, and location — for every single open.',
  },
  {
    icon: '🔑',
    title: 'A separate password per person',
    desc: 'Know it was Sarah from Google, not just "someone". Each recipient gets their own key.',
  },
  {
    icon: '⚡',
    title: 'Instant email the moment it opens',
    desc: 'Get notified in real time — no more refreshing to check.',
  },
  {
    icon: '🔗',
    title: 'Your own vanity URL',
    desc: 'Share links that look like you, not a random string.',
  },
  {
    icon: '♾️',
    title: 'Unlimited protected links',
    desc: 'No cap on free. Create as many as you need.',
  },
]

const STORAGE_KEY = 'pg_anon_count'

interface Props {
  onClose: () => void
  reason?: 'limit' | 'track'
}

export default function LoginModal({ onClose, reason = 'limit' }: Props) {
  const supabase = createClient()
  const [email,   setEmail]   = useState('')
  const [otp,     setOtp]     = useState('')
  const [step,    setStep]    = useState<'login' | 'otp'>('login')
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  const handleGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })
  }

  const handleEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true); setError('')
    const { error } = await supabase.auth.signInWithOtp({ email })
    setLoading(false)
    if (error) { setError(error.message); return }
    setStep('otp')
  }

  const handleOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true); setError('')
    const { error } = await supabase.auth.verifyOtp({ email, token: otp, type: 'email' })
    setLoading(false)
    if (error) { setError(error.message); return }
    window.location.href = '/dashboard'
  }

  if (!mounted) return null

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={onClose}>
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="bg-zinc-900 border border-zinc-700 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl"
          onClick={e => e.stopPropagation()}>

          {/* Header */}
          <div className="relative px-6 pt-6 pb-5 border-b border-zinc-800">
            <button onClick={onClose}
              className="absolute right-4 top-4 text-zinc-600 hover:text-zinc-300 transition-colors p-1">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
            {reason === 'limit' ? (
              <>
                <span className="inline-block text-[11px] font-bold uppercase tracking-[0.1em] text-[#4ADE80] bg-[#4ADE80]/10 border border-[#4ADE80]/20 px-2.5 py-1 rounded-full mb-3">
                  3 free links used
                </span>
                <h2 className="text-xl font-bold text-white">Sign up to keep going — it&apos;s free</h2>
                <p className="text-zinc-500 text-sm mt-1">
                  Your links are live for 7 days. Sign up to make them permanent and see who opens them.
                </p>
              </>
            ) : (
              <>
                <span className="inline-block text-[11px] font-bold uppercase tracking-[0.1em] text-[#4ADE80] bg-[#4ADE80]/10 border border-[#4ADE80]/20 px-2.5 py-1 rounded-full mb-3">
                  Your link is live
                </span>
                <h2 className="text-xl font-bold text-white">You&apos;re flying blind without an account</h2>
                <p className="text-zinc-500 text-sm mt-1">
                  Someone could open your link right now and you&apos;d never know. Sign up — it&apos;s free.
                </p>
              </>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5">

            {/* ── Perks column ── */}
            <div className="sm:col-span-3 px-6 py-5 sm:border-r border-b sm:border-b-0 border-zinc-800 space-y-4">
              {PERKS.map(perk => (
                <div key={perk.title} className="flex items-start gap-3">
                  <span className="text-base leading-none mt-0.5 flex-shrink-0">{perk.icon}</span>
                  <div>
                    <p className="text-sm font-semibold text-white leading-snug">{perk.title}</p>
                    <p className="text-xs text-zinc-500 mt-0.5 leading-relaxed">{perk.desc}</p>
                  </div>
                </div>
              ))}

              {/* Vanity URL visual */}
              <div className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 mt-2">
                <p className="text-[11px] font-semibold text-zinc-600 uppercase tracking-wide mb-2">Vanity URL</p>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[11px] text-zinc-600">Random:</span>
                  <span className="text-xs font-mono text-zinc-600 line-through">pgate.io/g/x7k2m9pq</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-zinc-500">Yours:</span>
                  <span className="text-xs font-mono text-[#4ADE80]">pgate.io/g/vijay-pitch-deck</span>
                </div>
                <p className="text-[11px] text-zinc-600 mt-2">
                  Custom slugs on Maker plan — share links that look professional and on-brand.
                </p>
              </div>
            </div>

            {/* ── Login column ── */}
            <div className="sm:col-span-2 px-6 py-5 flex flex-col justify-center">
              {step === 'login' ? (
                <div className="space-y-3">
                  <button onClick={handleGoogle}
                    className="w-full flex items-center justify-center gap-2.5 bg-white text-zinc-900 font-semibold text-sm py-3 rounded-xl hover:bg-zinc-100 transition-colors">
                    <svg width="16" height="16" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Continue with Google
                  </button>

                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-px bg-zinc-800" />
                    <span className="text-xs text-zinc-600">or</span>
                    <div className="flex-1 h-px bg-zinc-800" />
                  </div>

                  <form onSubmit={handleEmail} className="space-y-2">
                    <input
                      value={email} onChange={e => setEmail(e.target.value)}
                      type="email" required placeholder="you@example.com"
                      className="w-full bg-zinc-800 border border-zinc-700 text-white text-sm px-4 py-3 rounded-xl outline-none focus:border-[#4ADE80]/40 transition-colors placeholder-zinc-600" />
                    <button type="submit" disabled={loading || !email}
                      className="w-full bg-[#4ADE80] text-[#0D0D0D] font-semibold text-sm py-3 rounded-xl hover:bg-[#22c55e] transition-colors disabled:opacity-50">
                      {loading ? 'Sending code...' : 'Continue with email →'}
                    </button>
                  </form>

                  {error && <p className="text-red-400 text-xs">{error}</p>}
                  <p className="text-[11px] text-zinc-600 text-center pt-1">
                    By signing up you agree to our{' '}
                    <a href="/terms" className="underline hover:text-zinc-400">terms</a>.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleOtp} className="space-y-3">
                  <div className="text-center mb-2">
                    <p className="text-sm font-semibold text-white mb-1">Check your email</p>
                    <p className="text-xs text-zinc-500">
                      We sent a code to<br />
                      <span className="text-zinc-300 font-medium">{email}</span>
                    </p>
                  </div>
                  <div className="relative">
                    <input
                      value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 8))}
                      placeholder="········" maxLength={8} autoFocus
                      className="w-full bg-zinc-800 border border-zinc-700 text-white text-center text-2xl font-mono tracking-[0.4em] py-4 pr-12 rounded-xl outline-none focus:border-[#4ADE80]/40 transition-colors placeholder-zinc-700" />
                    <button
                      type="button"
                      tabIndex={-1}
                      onClick={async () => {
                        try {
                          const text = await navigator.clipboard.readText()
                          const digits = text.replace(/\D/g, '').slice(0, 8)
                          if (digits) setOtp(digits)
                        } catch {}
                      }}
                      title="Paste code"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-[#4ADE80] transition-colors p-1">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <rect x="9" y="9" width="13" height="13" rx="2"/>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                      </svg>
                    </button>
                  </div>
                  <button type="submit" disabled={loading || otp.length < 6}
                    className="w-full bg-[#4ADE80] text-[#0D0D0D] font-semibold text-sm py-3 rounded-xl hover:bg-[#22c55e] transition-colors disabled:opacity-50">
                    {loading ? 'Verifying...' : 'Verify & go to dashboard →'}
                  </button>
                  {error && <p className="text-red-400 text-xs">{error}</p>}
                  <button type="button" onClick={() => { setStep('login'); setOtp(''); setError('') }}
                    className="text-xs text-zinc-600 hover:text-zinc-400 w-full text-center transition-colors">
                    ← Use a different email
                  </button>
                </form>
              )}
            </div>
          </div>
          {/* ── TEST ONLY: remove before launch ── */}
          <div className="px-6 py-3 border-t border-zinc-800/60 flex justify-center">
            <button
              onClick={() => {
                try { localStorage.setItem(STORAGE_KEY, '0') } catch {}
                onClose()
              }}
              className="text-[11px] text-zinc-700 hover:text-zinc-500 transition-colors">
              [DEV] Ignore &amp; reset counter
            </button>
          </div>

        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  )
}
