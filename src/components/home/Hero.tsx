'use client'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const PLACEHOLDERS = [
  'https://figma.com/file/your-design...',
  'https://notion.so/your-portfolio...',
  'https://docs.google.com/presentation/...',
  'https://framer.com/projects/...',
  'https://drive.google.com/file/...',
]

export default function Hero() {
  const [url, setUrl]               = useState('')
  const [focused, setFocused]       = useState(false)
  const [placeholder, setPlaceholder] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (focused || url) return
    const id = setInterval(() => setPlaceholder(p => (p + 1) % PLACEHOLDERS.length), 2800)
    return () => clearInterval(id)
  }, [focused, url])

  useEffect(() => {
    if (url.length > 10) {
      setShowResult(true)
    } else {
      setShowResult(false)
    }
  }, [url])

  const fakeGateUrl = url
    ? `pgate.io/${url.replace(/https?:\/\//, '').split('/')[0].split('.')[0].slice(0, 8)}-${Math.random().toString(36).slice(2, 6)}`
    : ''

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-16 overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(74,222,128,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(74,222,128,0.03)_1px,transparent_1px)] bg-[size:48px_48px]" />
      {/* Radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#4ADE80]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        {/* Badge */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-700 text-zinc-400 text-xs font-medium px-3.5 py-1.5 rounded-full mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] animate-pulse" />
          Password protection for any URL
        </motion.div>

        {/* Headline */}
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.08 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-5 text-white">
          Gate anything.<br />
          <span className="text-[#4ADE80]">Know everyone.</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}
          className="text-zinc-400 text-lg sm:text-xl max-w-xl mx-auto leading-relaxed mb-12">
          Password-protect any URL, file, or link in seconds.
          Know exactly who opened it, when, and from where.
        </motion.p>

        {/* Hero input */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.22 }}
          className="relative max-w-xl mx-auto mb-4">
          <div className={`relative rounded-2xl border transition-all duration-200 ${
            focused
              ? 'border-[#4ADE80]/60 shadow-[0_0_0_3px_rgba(74,222,128,0.08)]'
              : 'border-zinc-700 hover:border-zinc-600'
          } bg-zinc-900`}>
            {/* Lock icon */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke={focused || url ? '#4ADE80' : '#52525b'}
                strokeWidth="2" strokeLinecap="round" className="transition-colors duration-200">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>
            <input
              ref={inputRef}
              value={url}
              onChange={e => setUrl(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              className="w-full bg-transparent text-white text-[15px] pl-11 pr-4 py-4 rounded-2xl outline-none placeholder-zinc-600"
              placeholder={PLACEHOLDERS[placeholder]}
            />
          </div>

          {/* Animated result */}
          <AnimatePresence>
            {showResult && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 4, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="absolute left-0 right-0 top-full mt-2 bg-zinc-900 border border-[#4ADE80]/20 rounded-xl px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-[#4ADE80] animate-pulse" />
                  <span className="text-[13px] text-zinc-400">Protected link ready:</span>
                  <span className="text-[13px] font-mono text-[#4ADE80]">{fakeGateUrl}</span>
                </div>
                <span className="text-[11px] text-zinc-600">Sign up to create</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
          <Link href="/login"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#4ADE80] text-[#0D0D0D] font-semibold text-[15px] px-6 py-3.5 rounded-xl hover:bg-[#22c55e] transition-colors">
            Create your first gate free
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
          <Link href="#how-it-works"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-zinc-400 hover:text-white text-[15px] px-6 py-3.5 rounded-xl border border-zinc-800 hover:border-zinc-600 transition-colors">
            See how it works
          </Link>
        </motion.div>

        {/* Social proof */}
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="text-zinc-600 text-sm mt-8">
          Free forever · No credit card · Takes 30 seconds
        </motion.p>
      </div>
    </section>
  )
}
