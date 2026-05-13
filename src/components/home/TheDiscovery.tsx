'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function TheDiscovery() {
  return (
    <section className="py-24 bg-zinc-950/60">
      <div className="max-w-3xl mx-auto px-6">
        <FadeIn>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-zinc-800" />
            <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-zinc-600">The discovery</span>
            <div className="h-px flex-1 bg-zinc-800" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 leading-snug">
            What if your link had a<br />
            <span className="text-[#4ADE80]">front door with a lock?</span>
          </h2>
          <p className="text-zinc-400 text-lg leading-relaxed mb-14">
            pgate turns any file link into a password-protected page. Only the people you trust get through — and you see every attempt.
          </p>
        </FadeIn>

        {/* Password gate mockup */}
        <FadeIn delay={0.2}>
          <div className="rounded-2xl border border-zinc-800 bg-[#0D0D0D] overflow-hidden shadow-2xl max-w-sm mx-auto">
            <div className="bg-zinc-900 px-4 py-3 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-zinc-700" />
                <div className="w-3 h-3 rounded-full bg-zinc-700" />
                <div className="w-3 h-3 rounded-full bg-zinc-700" />
              </div>
              <div className="flex-1 bg-zinc-800 rounded h-5 text-[10px] text-zinc-500 flex items-center px-2">
                pgate.io/sara-portfolio
              </div>
            </div>
            <div className="px-8 py-10 text-center">
              <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 mx-auto mb-4 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#71717a" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </div>
              <div className="text-white font-semibold mb-1">Sara&apos;s Portfolio</div>
              <div className="text-zinc-500 text-sm mb-6">Enter password to view</div>
              <div className="bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-left text-zinc-500 text-sm mb-4">
                ••••••••••
              </div>
              <div className="bg-[#4ADE80] text-[#0D0D0D] font-semibold text-sm py-2.5 rounded-xl">
                View files →
              </div>
            </div>
          </div>
        </FadeIn>

      </div>
    </section>
  )
}
