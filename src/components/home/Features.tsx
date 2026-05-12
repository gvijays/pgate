'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

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
    { label: 'Stripe Team', pwd: 'STR-K7X2', expires: '28 days', active: true },
    { label: 'Y Combinator', pwd: 'YCB-M9P4', expires: '14 days', active: true },
    { label: 'a16z',         pwd: 'A16-Q3N8', expires: '7 days',  active: false },
  ]
  return (
    <section className="py-24 px-4 bg-zinc-950/50">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <FadeSection delay={0.1} >
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden lg:order-first order-last">
            <div className="px-5 py-4 border-b border-zinc-800">
              <p className="text-sm font-semibold text-white">Pitch Deck — Series A</p>
              <p className="text-xs text-zinc-500 mt-0.5">3 passwords · 30-day expiry</p>
            </div>
            <div className="divide-y divide-zinc-800">
              {passwords.map((p, i) => (
                <div key={i} className="px-5 py-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-zinc-200">{p.label}</p>
                    <p className="text-xs font-mono text-zinc-500 mt-0.5">{p.pwd}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-zinc-600">Expires {p.expires}</span>
                    <div className={`w-2 h-2 rounded-full ${p.active ? 'bg-[#4ADE80]' : 'bg-zinc-600'}`} />
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
          <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#4ADE80] mb-4">Multiple passwords</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4 leading-tight">
            One link.<br />Different keys for<br />different people.
          </h2>
          <p className="text-zinc-400 text-[15px] leading-relaxed mb-6 max-w-md">
            Don't share one password with everyone and lose track. Give Stripe their own key. Y Combinator their own. Each password maps to a name — so you always know who's looking.
          </p>
          <ul className="space-y-3">
            {['Named passwords per recipient', 'Per-password expiry dates', 'Revoke one without killing the gate', 'Forward detection — know if passwords get shared'].map(item => (
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

/* ── Feature 3: Custom gate page (Pro) ── */
function BrandingFeature() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <FadeSection>
          <div className="flex items-center gap-2 mb-4">
            <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#4ADE80]">Custom gate page</p>
            <span className="text-[10px] font-bold bg-[#4ADE80]/10 text-[#4ADE80] border border-[#4ADE80]/20 px-2 py-0.5 rounded-full">Pro</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4 leading-tight">
            Your brand on<br />the gate page.
          </h2>
          <p className="text-zinc-400 text-[15px] leading-relaxed mb-6 max-w-md">
            The page your recipients see is fully yours. Upload your logo, set your colors, write your headline. No pgate branding. It looks like you built it.
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
          {/* Mock gate page preview */}
          <div className="relative">
            <div className="absolute -inset-1 bg-[#4ADE80]/5 rounded-3xl blur-2xl" />
            <div className="relative bg-[#111] border border-zinc-700 rounded-2xl overflow-hidden" style={{ minHeight: 280 }}>
              {/* Fake branded gate page */}
              <div className="h-1.5 bg-gradient-to-r from-[#4ADE80] to-[#22c55e]" />
              <div className="flex flex-col items-center justify-center py-12 px-8">
                <div className="w-12 h-12 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center mb-4 text-[#4ADE80] font-bold text-lg">V</div>
                <p className="text-white font-bold text-[17px] mb-1">Vijay Srinivas</p>
                <p className="text-zinc-500 text-xs mb-6">Enter the access code to view the portfolio</p>
                <div className="w-full max-w-[220px] bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 flex items-center gap-2 mb-3">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#52525b" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  <span className="text-zinc-600 text-sm">Access code</span>
                </div>
                <div className="w-full max-w-[220px] bg-[#4ADE80] rounded-xl py-3 text-center text-[#0D0D0D] font-semibold text-sm">
                  View Portfolio →
                </div>
              </div>
            </div>
          </div>
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
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">If it has a URL, pgate protects it</h2>
          <p className="text-zinc-400 text-[15px] mb-12">No integrations. No installs. Just paste the link.</p>
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
