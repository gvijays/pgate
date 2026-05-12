'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

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
    title: 'Set your passwords',
    body: 'Add named passwords for each recipient — "Google HR", "Andreessen", "Client A". Each gets their own key. You know exactly who opened it.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <rect x="3" y="11" width="18" height="11" rx="2"/>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    ),
  },
  {
    n: '03',
    title: 'Share & track',
    body: 'Share your pgate link. The moment someone opens it, you get an instant email. See who, when, and where — in real time.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
]

export default function HowItWorks() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="how-it-works" ref={ref} className="py-24 px-4 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
        className="text-center mb-16">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#4ADE80] mb-4">How it works</p>
        <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-4">Three steps to protected</h2>
        <p className="text-zinc-400 text-lg max-w-md mx-auto">From URL to gated link in under 30 seconds.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
        {/* Connector line (desktop) */}
        <div className="hidden md:block absolute top-10 left-[calc(16.67%+16px)] right-[calc(16.67%+16px)] h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />

        {STEPS.map((step, i) => (
          <motion.div key={step.n}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.12 }}>
            <div className="relative bg-zinc-900 border border-zinc-800 rounded-2xl p-7 h-full hover:border-zinc-700 transition-colors">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 rounded-xl bg-[#4ADE80]/8 border border-[#4ADE80]/15 flex items-center justify-center text-[#4ADE80]">
                  {step.icon}
                </div>
                <span className="text-[11px] font-bold text-zinc-600 uppercase tracking-[0.1em]">{step.n}</span>
              </div>
              <h3 className="text-[18px] font-bold text-white mb-2">{step.title}</h3>
              <p className="text-zinc-500 text-[14px] leading-relaxed">{step.body}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
