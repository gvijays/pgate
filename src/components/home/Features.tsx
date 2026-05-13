'use client'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

function FadeSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  )
}

/* ── Feature 1: Know who opened it ── */
function AnalyticsFeature() {
  const views = [
    { label: 'Recruiter A', time: '2 min ago',   country: '🇬🇧', device: 'iPhone',  opens: 3, color: 'text-[#4ADE80]' },
    { label: 'Google HR',   time: '1 hr ago',    country: '🇺🇸', device: 'MacBook', opens: 1, color: 'text-zinc-300' },
    { label: 'Andreessen',  time: '3 days ago',  country: '🇺🇸', device: 'iPhone',  opens: 1, color: 'text-zinc-300' },
  ]
  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <FadeSection>
          <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#4ADE80] mb-4">Analytics</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4 leading-tight">
            Know exactly who<br />opened it. And when.
          </h2>
          <p className="text-zinc-400 text-[15px] leading-relaxed mb-6 max-w-md">
            Every password is named. So when Recruiter A opens your portfolio three times in one afternoon, you know. Not just "someone" — you know exactly who.
          </p>
          <ul className="space-y-3">
            {['Per-password view tracking', 'Timestamp, location & device (Pro)', 'Instant email on every open', 'Weekly digest summary'].map(item => (
              <li key={item} className="flex items-center gap-2.5 text-zinc-300 text-[14px]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ADE80" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                {item}
              </li>
            ))}
          </ul>
        </FadeSection>
        <FadeSection delay={0.1}>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-zinc-800 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-white">Google Portfolio</p>
                <p className="text-xs text-zinc-500 mt-0.5">pgate.io/vijay-portfolio</p>
              </div>
              <span className="text-xs bg-[#4ADE80]/10 text-[#4ADE80] border border-[#4ADE80]/20 px-2.5 py-1 rounded-full font-medium">5 views</span>
            </div>
            <div className="divide-y divide-zinc-800">
              {views.map((v, i) => (
                <div key={i} className="px-5 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-sm">{v.country}</div>
                    <div>
                      <p className={`text-sm font-semibold ${v.color}`}>{v.label}</p>
                      <p className="text-xs text-zinc-600">{v.device} · {v.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-zinc-500">{v.opens}× opened</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeSection>
      </div>
    </section>
  )
}

/* ── Feature 2: Multiple passwords ── */
function PasswordsFeature() {
  const passwords = [
    { label: 'Stripe Team',   pwd: 'STR-K7X2', expiresLabel: 'Jun 14, 2026', expired: false, active: true  },
    { label: 'Y Combinator',  pwd: 'YCB-M9P4', expiresLabel: 'May 31, 2026', expired: false, active: true  },
    { label: 'a16z',          pwd: 'A16-Q3N8', expiresLabel: 'Expired',       expired: true,  active: false },
  ]
  return (
    <section className="py-24 px-4 bg-zinc-950/50">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <FadeSection delay={0.1} >
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden lg:order-first order-last">
            <div className="px-5 py-4 border-b border-zinc-800">
              <p className="text-sm font-semibold text-white">Pitch Deck — Series A</p>
              <p className="text-xs text-zinc-500 mt-0.5">3 passwords · custom expiry per recipient</p>
            </div>
            <div className="divide-y divide-zinc-800">
              {passwords.map((p, i) => (
                <div key={i} className="px-5 py-4 flex items-center justify-between">
                  <div>
                    <p className={`text-sm font-semibold ${p.expired ? 'text-zinc-500' : 'text-zinc-200'}`}>{p.label}</p>
                    <p className="text-xs font-mono text-zinc-600 mt-0.5">{p.pwd}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs flex items-center gap-1 ${p.expired ? 'text-red-400' : 'text-zinc-500'}`}>
                      {p.expired && (
                        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                      )}
                      {!p.expired && (
                        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                      )}
                      {p.expiresLabel}
                    </span>
                    <div className={`w-2 h-2 rounded-full ${p.active ? 'bg-[#4ADE80]' : 'bg-zinc-700'}`} />
                  </div>
                </div>
              ))}
            </div>
            <div className="px-5 py-3 border-t border-zinc-800">
              <button className="text-sm text-[#4ADE80] font-medium flex items-center gap-1.5">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                Add password
              </button>
            </div>
          </div>
        </FadeSection>
        <FadeSection>
          <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#4ADE80] mb-4">Named passwords</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4 leading-tight">
            One link.<br />A separate key<br />for each person.
          </h2>
          <p className="text-zinc-400 text-[15px] leading-relaxed mb-6 max-w-md">
            Don&apos;t share one password with everyone and lose track. Give each recipient their own key — with its own expiry date. When a deal closes or a deadline passes, that password stops working automatically.
          </p>
          <ul className="space-y-3">
            {[
              'Named passwords per recipient',
              'Set expiry: 1 day, 1 week, 30 days, or a custom date & time',
              'Expired passwords show a clear message to the visitor',
              'Revoke one person without affecting others',
            ].map(item => (
              <li key={item} className="flex items-center gap-2.5 text-zinc-300 text-[14px]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ADE80" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                {item}
              </li>
            ))}
          </ul>
        </FadeSection>
      </div>
    </section>
  )
}

/* ── Feature 3: Custom branding ── */
const BRAND_SLIDES = [
  {
    bg: '#0D0D0D',
    card: 'dark' as const,
    cardBg: '#18181b',
    cardBorder: '#3f3f46',
    inputBg: '#27272a',
    inputBorder: '#3f3f46',
    textPrimary: '#ffffff',
    textSecondary: '#71717a',
    btnColor: '#4ADE80',
    btnText: '#0D0D0D',
    initial: 'VS',
    name: 'Vijay Srinivas',
    headline: 'View my portfolio',
    sub: 'Protected · enter your access code',
  },
  {
    bg: '#0f172a',
    card: 'dark' as const,
    cardBg: '#1e293b',
    cardBorder: '#334155',
    inputBg: '#0f172a',
    inputBorder: '#334155',
    textPrimary: '#f1f5f9',
    textSecondary: '#64748b',
    btnColor: '#38bdf8',
    btnText: '#0f172a',
    initial: 'A',
    name: 'Acme Design Co.',
    headline: 'Access the pitch deck',
    sub: 'Confidential · Series A materials',
  },
  {
    bg: '#f8f7f4',
    card: 'light' as const,
    cardBg: '#ffffff',
    cardBorder: '#e4e4e7',
    inputBg: '#f4f4f5',
    inputBorder: '#d4d4d8',
    textPrimary: '#18181b',
    textSecondary: '#a1a1aa',
    btnColor: '#6366f1',
    btnText: '#ffffff',
    initial: 'M',
    name: 'Maya Chen',
    headline: 'Enter to view designs',
    sub: 'Private link · Figma prototype',
  },
  {
    bg: '#1a0a2e',
    card: 'dark' as const,
    cardBg: '#2d1b69',
    cardBorder: '#4c1d95',
    inputBg: '#1a0a2e',
    inputBorder: '#4c1d95',
    textPrimary: '#f5f3ff',
    textSecondary: '#a78bfa',
    btnColor: '#c084fc',
    btnText: '#1a0a2e',
    initial: 'N',
    name: 'Nova Studio',
    headline: 'Access exclusive content',
    sub: 'Members only · enter your code',
  },
]

function BrandingSlider() {
  const [idx, setIdx] = useState(0)
  const [dir, setDir] = useState(1)

  useEffect(() => {
    const t = setInterval(() => {
      setDir(1)
      setIdx(i => (i + 1) % BRAND_SLIDES.length)
    }, 3000)
    return () => clearInterval(t)
  }, [])

  const go = (next: number) => {
    setDir(next > idx ? 1 : -1)
    setIdx(next)
  }

  const s = BRAND_SLIDES[idx]

  return (
    <div className="relative select-none">
      {/* Glow */}
      <div className="absolute -inset-2 rounded-3xl blur-2xl opacity-30" style={{ background: s.btnColor }} />

      {/* Card shell */}
      <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10" style={{ minHeight: 320 }}>
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={idx}
            custom={dir}
            initial={{ opacity: 0, x: dir * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -60 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center justify-center py-12 px-8"
            style={{ background: s.bg, minHeight: 320 }}>

            {/* Logo mark */}
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 text-lg font-bold shadow-lg"
              style={{ background: s.cardBg, border: `1px solid ${s.cardBorder}`, color: s.btnColor }}>
              {s.initial}
            </div>

            {/* Inner card */}
            <div className="w-full max-w-[240px] rounded-2xl p-5 shadow-xl"
              style={{ background: s.cardBg, border: `1px solid ${s.cardBorder}` }}>
              <p className="font-bold text-[15px] text-center mb-0.5" style={{ color: s.textPrimary }}>{s.name}</p>
              <p className="text-[11px] text-center mb-4" style={{ color: s.textSecondary }}>{s.sub}</p>

              {/* Input */}
              <div className="rounded-xl px-3.5 py-2.5 text-[12px] mb-3 flex items-center gap-2"
                style={{ background: s.inputBg, border: `1px solid ${s.inputBorder}`, color: s.textSecondary }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                Access code
              </div>

              {/* Button */}
              <div className="rounded-xl py-2.5 text-center text-[12px] font-semibold"
                style={{ background: s.btnColor, color: s.btnText }}>
                {s.headline} →
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {BRAND_SLIDES.map((sl, i) => (
          <button key={i} onClick={() => go(i)}
            className="w-1.5 h-1.5 rounded-full transition-all duration-300"
            style={{ background: i === idx ? sl.btnColor : '#3f3f46', transform: i === idx ? 'scale(1.4)' : 'scale(1)' }} />
        ))}
      </div>
    </div>
  )
}

function BrandingFeature() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <FadeSection>
          <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#4ADE80] mb-4">Custom branding</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4 leading-tight">
            Your brand.<br />Their first<br />impression.
          </h2>
          <p className="text-zinc-400 text-[15px] leading-relaxed mb-6 max-w-md">
            The page your recipients see is fully yours. Upload your logo, set your colors, write your headline. No pgate branding anywhere — it looks like you built it.
          </p>
          <ul className="space-y-3">
            {['Upload your logo', 'Custom background & card style', 'Custom headline text', 'White-label — no pgate branding'].map(item => (
              <li key={item} className="flex items-center gap-2.5 text-zinc-300 text-[14px]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ADE80" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                {item}
              </li>
            ))}
          </ul>
        </FadeSection>
        <FadeSection delay={0.1}>
          <BrandingSlider />
        </FadeSection>
      </div>
    </section>
  )
}

/* ── Feature 4: Works on everything ── */
const TOOLS = ['Figma', 'Notion', 'Framer', 'Webflow', 'Google Drive', 'Dropbox', 'Loom', 'Canva', 'Google Docs', 'Slides', 'Airtable', 'Linear']

function WorksOnEverything() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <section ref={ref} className="py-24 px-4 bg-zinc-950/50 border-y border-zinc-900">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
          <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#4ADE80] mb-4">Compatibility</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">Password-protect links from any tool</h2>
          <p className="text-zinc-400 text-[15px] mb-12">No integrations. No installs. If it has a URL, you can protect it.</p>
        </motion.div>
        <div className="flex flex-wrap justify-center gap-3">
          {TOOLS.map((tool, i) => (
            <motion.div key={tool}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm font-medium text-zinc-300 hover:border-zinc-600 hover:text-white transition-colors">
              {tool}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Features() {
  return (
    <>
      <AnalyticsFeature />
      <PasswordsFeature />
      <BrandingFeature />
      <WorksOnEverything />
    </>
  )
}
