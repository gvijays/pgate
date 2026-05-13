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

const PAIN_POINTS = [
  { icon: '📧', text: 'You email a Dropbox link. It gets forwarded. Twice.' },
  { icon: '🤷', text: 'No idea who opened it. Or when. Or how many times.' },
  { icon: '🚨', text: 'Your client shares your proposal with a competitor.' },
  { icon: '😓', text: 'You ask for the link back. Awkward. Ineffective.' },
]

export default function TheProblem() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-24">
      <FadeIn>
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px flex-1 bg-zinc-800" />
          <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-zinc-600">The problem</span>
          <div className="h-px flex-1 bg-zinc-800" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 leading-snug">
          Sharing a file used to mean<br />
          <span className="text-zinc-500">losing control of it forever.</span>
        </h2>
        <p className="text-zinc-400 text-lg leading-relaxed mb-14">
          You&apos;ve been there. A link goes out, then it spirals. You have no visibility, no protection, and no way to take it back.
        </p>
      </FadeIn>

      <div className="relative pl-6 border-l border-zinc-800 space-y-10">
        {PAIN_POINTS.map((item, i) => (
          <FadeIn key={i} delay={i * 0.1}>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-xl flex-shrink-0">
                {item.icon}
              </div>
              <p className="text-zinc-300 text-[17px] leading-relaxed pt-1.5">{item.text}</p>
            </div>
          </FadeIn>
        ))}
        <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-zinc-700 border border-zinc-600" />
        <div className="absolute -left-[5px] bottom-0 w-2.5 h-2.5 rounded-full bg-[#4ADE80]" />
      </div>
    </section>
  )
}
