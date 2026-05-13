'use client'
export const dynamic = 'force-dynamic'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'

/* ── adopt.ai inspired: light mode, navy blue, enterprise, problem-first ── */

const LOGOS = ['Figma', 'Notion', 'Google Drive', 'Dropbox', 'Loom', 'Framer', 'Canva', 'Linear', 'Pitch', 'Airtable']

const PROBLEMS = [
  { icon: '👁️', title: 'You have no idea who opened your link', desc: 'You shared your pitch deck, portfolio, or proposal with 10 people. One replied. You have no idea what the other 9 did.' },
  { icon: '🔑', title: 'One password means zero accountability', desc: 'When everyone uses the same code, you lose the ability to know which person opened it, when, and how many times.' },
  { icon: '⏱️', title: 'Follow-ups are pure guesswork', desc: 'You email to "check in" with no idea if they even looked at what you sent. You are flying blind every single time.' },
  { icon: '🔓', title: 'Shared links can be forwarded to anyone', desc: 'Your confidential file gets sent to someone you never intended. You have no way to know, no way to revoke, no way to track.' },
]

const STEPS = [
  { n: '01', title: 'Paste your URL', desc: 'Works with any link — Figma, Notion, Google Drive, Loom, Framer. If it has a URL, pgate protects it.' },
  { n: '02', title: 'Name each recipient', desc: 'Give every person their own password with a label — "Stripe Team", "John at Google", "Client A". One link, multiple named keys.' },
  { n: '03', title: 'See exactly who opens it', desc: 'The moment someone accesses your link you know — their name, timestamp, device and location. No more guessing.' },
]

const STATS = [
  { n: '< 30s', label: 'to protect any link' },
  { n: '100%', label: 'recipient accountability' },
  { n: '0', label: 'integrations needed' },
  { n: '∞', label: 'links on Pro plan' },
]

const USECASES = [
  { role: 'Designers', headline: 'Know which client reviewed your Figma', metric: '3× faster client sign-off', desc: 'Stop following up blind. See the moment your prototype is opened.' },
  { role: 'Founders', headline: 'Track every investor who opened your deck', metric: '88% less follow-up guesswork', desc: 'Each VC gets their own key. You see who looked — and who did not.' },
  { role: 'Freelancers', headline: 'Deliver work like a professional', metric: '90% of clients open within 24h', desc: 'Password-protected delivery links with open notifications.' },
  { role: 'Creators', headline: 'Gate exclusive content without a paywall', metric: 'Zero setup, instant protection', desc: 'Protect any Notion page, Loom video, or Google Doc in seconds.' },
]

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }} className={className}>
      {children}
    </motion.div>
  )
}

export default function Home3() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <div className="bg-white text-[#1a1a2e] min-h-screen font-sans">

      {/* ── Nav ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${scrolled ? 'bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm' : 'bg-white'}`}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-[#1a2b6d] flex items-center justify-center">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            </div>
            <span className="font-bold text-[#1a1a2e] text-[17px] tracking-tight">pgate</span>
          </Link>
          <div className="hidden sm:flex items-center gap-7">
            {['How it works', 'Use cases', 'Pricing'].map(l => (
              <a key={l} href="#" className="text-sm text-gray-500 hover:text-[#1a1a2e] transition-colors">{l}</a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm text-gray-500 hover:text-[#1a1a2e] hidden sm:block transition-colors">Log in</Link>
            <Link href="/login" className="text-sm font-semibold bg-[#1a2b6d] text-white px-4 py-2 rounded-lg hover:bg-[#14215a] transition-colors">
              Request demo
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-block text-xs font-bold uppercase tracking-[0.12em] text-[#1a2b6d] bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-full mb-6">
              Link protection & recipient tracking
            </span>
            <h1 className="text-5xl sm:text-6xl font-bold text-[#1a1a2e] tracking-tight leading-[1.08] mb-6">
              Stop sharing links blindly.<br />
              <span className="text-[#1a2b6d]">Start knowing who opens them.</span>
            </h1>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
              Password-protect any URL in seconds. Give each recipient their own named key. Get notified the moment they open it — with timestamp, device, and location.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/login"
                className="w-full sm:w-auto text-sm font-semibold bg-[#1a2b6d] text-white px-7 py-3.5 rounded-lg hover:bg-[#14215a] transition-colors flex items-center justify-center gap-2">
                Get started free
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
              <Link href="/login"
                className="w-full sm:w-auto text-sm font-semibold text-[#1a2b6d] border border-[#1a2b6d]/30 px-7 py-3.5 rounded-lg hover:bg-blue-50 transition-colors text-center">
                Request a demo →
              </Link>
            </div>
          </motion.div>

          {/* Mock dashboard preview */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-14 bg-white rounded-2xl border border-gray-200 shadow-2xl overflow-hidden text-left">
            <div className="bg-gray-50 border-b border-gray-100 px-5 py-3 flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-300" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-300" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-300" />
              <span className="text-xs text-gray-400 ml-2 font-mono">pgate.io/dashboard</span>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-bold text-gray-800">Series A Pitch Deck</p>
                  <p className="text-xs text-gray-400">pitch.com/acme-series-a</p>
                </div>
                <span className="text-xs bg-blue-50 text-[#1a2b6d] border border-blue-100 px-2.5 py-1 rounded-full font-semibold">7 views</span>
              </div>
              <div className="space-y-2">
                {[
                  { name: 'Stripe Ventures', time: '2 min ago', loc: '🇺🇸 San Francisco', device: 'MacBook', opens: 3, active: true },
                  { name: 'a16z Team', time: '1 hr ago', loc: '🇺🇸 Menlo Park', device: 'iPhone', opens: 2, active: true },
                  { name: 'Y Combinator', time: '3 days ago', loc: '🇺🇸 Mountain View', device: 'MacBook', opens: 1, active: false },
                ].map((r, i) => (
                  <div key={i} className="flex items-center justify-between py-2.5 px-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${r.active ? 'bg-[#1a2b6d]' : 'bg-gray-300'}`} />
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{r.name}</p>
                        <p className="text-xs text-gray-400">{r.loc} · {r.device}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-medium text-gray-500">{r.opens}× opened</p>
                      <p className="text-xs text-gray-400">{r.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Logo strip ── */}
      <section className="py-10 border-y border-gray-100 bg-white overflow-hidden">
        <p className="text-center text-xs font-bold uppercase tracking-[0.12em] text-gray-400 mb-6">Works with any link from</p>
        <div className="flex gap-10 animate-[marquee_20s_linear_infinite] whitespace-nowrap w-max px-10">
          {[...LOGOS, ...LOGOS].map((l, i) => (
            <span key={i} className="text-sm font-semibold text-gray-300 hover:text-gray-500 transition-colors">{l}</span>
          ))}
        </div>
      </section>

      {/* ── Problems ── */}
      <section className="py-24 px-4 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <FadeIn className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#1a2b6d] mb-3">The problem</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a2e] tracking-tight">Your team is sharing files with zero visibility</h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {PROBLEMS.map((p, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-2xl mb-3">{p.icon}</div>
                  <h3 className="text-[15px] font-bold text-[#1a1a2e] mb-2">{p.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{p.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <FadeIn className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#1a2b6d] mb-3">How it works</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a2e] tracking-tight">Running in 30 seconds</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STEPS.map((s, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="relative">
                  <div className="text-5xl font-black text-blue-50 mb-3 leading-none select-none">{s.n}</div>
                  <h3 className="text-lg font-bold text-[#1a1a2e] mb-2">{s.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-20 px-4 bg-[#1a2b6d]">
        <div className="max-w-5xl mx-auto">
          <FadeIn className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Impact that speaks for itself</h2>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((s, i) => (
              <FadeIn key={i} delay={i * 0.07}>
                <div className="text-center p-6 rounded-2xl bg-white/10 border border-white/10">
                  <p className="text-4xl font-black text-white mb-2">{s.n}</p>
                  <p className="text-sm text-blue-200">{s.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Use cases ── */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <FadeIn className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#1a2b6d] mb-3">Use cases</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a2e] tracking-tight">Built for everyone who shares important work</h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {USECASES.map((u, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <div className="bg-slate-50 rounded-2xl border border-gray-100 p-6 hover:border-[#1a2b6d]/20 transition-colors group">
                  <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#1a2b6d] mb-2">{u.role}</p>
                  <h3 className="text-[15px] font-bold text-[#1a1a2e] mb-1">{u.headline}</h3>
                  <p className="text-sm font-semibold text-[#1a2b6d] mb-2">{u.metric}</p>
                  <p className="text-sm text-gray-500 leading-relaxed">{u.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-4 bg-slate-50 border-t border-gray-100">
        <FadeIn>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-[#1a1a2e] tracking-tight mb-4">
              Stop scaling headcount.<br />Start scaling visibility.
            </h2>
            <p className="text-gray-500 text-[15px] mb-8">Free to start. No credit card. Works in 30 seconds.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/login"
                className="text-sm font-semibold bg-[#1a2b6d] text-white px-7 py-3.5 rounded-lg hover:bg-[#14215a] transition-colors">
                Get started free →
              </Link>
              <Link href="/login"
                className="text-sm font-semibold border border-[#1a2b6d]/30 text-[#1a2b6d] px-7 py-3.5 rounded-lg hover:bg-blue-50 transition-colors">
                Request a demo
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── Footer ── */}
      <footer className="py-10 px-4 border-t border-gray-100 bg-white">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-[#1a2b6d] flex items-center justify-center">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            </div>
            <span className="font-bold text-[#1a1a2e] text-sm">pgate</span>
          </Link>
          <p className="text-xs text-gray-400">© 2026 pgate. All rights reserved.</p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}
