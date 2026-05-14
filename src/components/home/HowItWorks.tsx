'use client'
import { motion, useInView } from 'framer-motion'
import { useRef, useCallback } from 'react'

const STEPS = [
  {
    n: '01',
    title: 'Paste your URL',
    body: 'Drop in any link — Figma file, Google Doc, Notion page, Framer prototype, anything with a URL. We take it from there.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
      </svg>
    ),
  },
  {
    n: '02',
    title: 'Add a password per person',
    body: 'Create a separate password for each recipient and label it — "Google HR", "a16z", "Client A". No more sharing one password with everyone.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <rect x="3" y="11" width="18" height="11" rx="2"/>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    ),
  },
  {
    n: '03',
    title: 'Share & see who opens it',
    body: 'Send your link. The moment someone opens it, you get an instant notification — with their name, device, location, and the exact time.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
]

/* ── Spotlight step card ── */
function StepCard({ step, inView, delay }: { step: typeof STEPS[number]; inView: boolean; delay: number }) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    el.style.setProperty('--my', `${e.clientY - rect.top}px`)
    el.style.setProperty('--so', '1')
  }, [])

  const handleMouseLeave = useCallback(() => {
    cardRef.current?.style.setProperty('--so', '0')
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.5, delay }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative bg-zinc-900 border border-zinc-800 rounded-2xl p-7 h-full hover:border-zinc-700 transition-colors overflow-hidden group cursor-default"
        style={{ '--mx': '50%', '--my': '50%', '--so': '0' } as React.CSSProperties}
      >
        {/* Spotlight layer */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-500"
          style={{
            opacity: 'var(--so)',
            background: 'radial-gradient(240px circle at var(--mx) var(--my), rgba(74,222,128,0.07), transparent 70%)',
          }}
        />

        <div className="relative flex items-center gap-3 mb-5">
          <div className="w-11 h-11 rounded-xl bg-[#4ADE80]/8 border border-[#4ADE80]/15 flex items-center justify-center text-[#4ADE80] group-hover:bg-[#4ADE80]/12 group-hover:border-[#4ADE80]/25 transition-colors duration-300">
            {step.icon}
          </div>
          <span className="text-[11px] font-bold text-zinc-600 uppercase tracking-[0.1em]">{step.n}</span>
        </div>
        <h3 className="relative text-[18px] font-bold text-white mb-2">{step.title}</h3>
        <p className="relative text-zinc-500 text-[14px] leading-relaxed">{step.body}</p>
      </div>
    </motion.div>
  )
}

export default function HowItWorks() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="how-it-works" ref={ref} className="py-16 px-4 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
        className="text-center mb-16">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#4ADE80] mb-4">How it works</p>
        <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-4">Up and running in 30 seconds</h2>
        <p className="text-zinc-400 text-lg max-w-md mx-auto">Paste a link, set passwords, label them and share it. That&apos;s it.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
        {/* Connector line (desktop) */}
        <div className="hidden md:block absolute top-10 left-[calc(16.67%+16px)] right-[calc(16.67%+16px)] h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />

        {STEPS.map((step, i) => (
          <StepCard key={step.n} step={step} inView={inView} delay={i * 0.12} />
        ))}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.45 }}
        className="text-center mt-14"
      >
        <a
          href="/login"
          className="inline-flex items-center gap-2 bg-[#4ADE80] text-[#0D0D0D] font-semibold text-[15px] px-7 py-3.5 rounded-xl hover:bg-[#22c55e] transition-colors"
        >
          Protect your first link — it&apos;s free
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
        <p className="text-zinc-600 text-sm mt-3">No credit card. No installs. Works with any URL.</p>
      </motion.div>
    </section>
  )
}
