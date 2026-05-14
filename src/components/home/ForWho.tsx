'use client'
import { motion, useInView } from 'framer-motion'
import { useRef, useCallback } from 'react'

/* ── SVG icons (Linear-style, clean 1.5px strokes) ── */
function IconDesign() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z"/>
      <path d="M2 17l10 5 10-5"/>
      <path d="M2 12l10 5 10-5"/>
    </svg>
  )
}

function IconRocket() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
    </svg>
  )
}

function IconPlay() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2"/>
      <path d="m10 8 5 3-5 3V8z" fill="currentColor" stroke="none"/>
      <path d="M8 21h8M12 17v4"/>
    </svg>
  )
}

function IconBriefcase() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2"/>
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
      <line x1="12" y1="12" x2="12" y2="12"/>
      <path d="M2 12h20"/>
    </svg>
  )
}

const PERSONAS = [
  {
    Icon: IconDesign,
    role: 'Designers',
    headline: 'Share Figma files without sharing everything',
    desc: 'Send your prototype to the right client, not the whole internet. Password-protect your Figma, Framer or Webflow link and know the moment they open it.',
    tags: ['Figma', 'Framer', 'Webflow'],
    glow: 'rgba(139, 92, 246, 0.18)',
  },
  {
    Icon: IconRocket,
    role: 'Founders & Solopreneurs',
    headline: 'Know which investor actually read your deck',
    desc: 'Give each VC their own password. See who opened it, when, and how many times. Stop wondering if Andreessen ever looked at your pitch.',
    tags: ['Pitch decks', 'Data rooms', 'Google Drive'],
    glow: 'rgba(74, 222, 128, 0.15)',
  },
  {
    Icon: IconPlay,
    role: 'Creators & Educators',
    headline: 'Sell access to your content without a paywall platform',
    desc: 'Gated Notion pages, private Loom recordings, exclusive downloads — protect anything with a URL. No subscription tools, no setup.',
    tags: ['Notion', 'Loom', 'Gumroad'],
    glow: 'rgba(251, 146, 60, 0.15)',
  },
  {
    Icon: IconBriefcase,
    role: 'Freelancers & Agencies',
    headline: 'Deliver client work the professional way',
    desc: 'No more "I sent the file over email." Give each client a branded, password-protected link. Know when they\'ve reviewed it so you can follow up at the right moment.',
    tags: ['Client portals', 'Dropbox', 'Canva'],
    glow: 'rgba(56, 189, 248, 0.15)',
  },
]

/* ── Spotlight card ── */
function SpotlightCard({
  persona,
  inView,
  delay = 0,
}: {
  persona: typeof PERSONAS[number]
  inView: boolean
  delay?: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    card.style.setProperty('--mx', `${x}px`)
    card.style.setProperty('--my', `${y}px`)
    card.style.setProperty('--spotlight-opacity', '1')
  }, [])

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current
    if (!card) return
    card.style.setProperty('--spotlight-opacity', '0')
  }, [])

  const { Icon } = persona

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative rounded-2xl border border-zinc-800 bg-[#111113] p-6 overflow-hidden group cursor-default"
      style={
        {
          '--mx': '50%',
          '--my': '50%',
          '--spotlight-opacity': '0',
        } as React.CSSProperties
      }
    >
      {/* Mouse-following spotlight */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-500"
        style={{
          opacity: 'var(--spotlight-opacity)',
          background: `radial-gradient(260px circle at var(--mx) var(--my), ${persona.glow}, transparent 70%)`,
        }}
      />

      {/* Top-right ambient glow (always subtle) */}
      <div
        className="pointer-events-none absolute -top-12 -right-12 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: persona.glow }}
      />

      {/* Content */}
      <div className="relative flex items-start gap-4">
        {/* Icon chip */}
        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-zinc-200 group-hover:border-zinc-700 transition-colors duration-300">
          <Icon />
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-bold uppercase tracking-[0.09em] text-zinc-600 mb-1">{persona.role}</p>
          <h3 className="text-[15px] font-semibold text-white leading-snug mb-2">{persona.headline}</h3>
          <p className="text-zinc-500 text-sm leading-relaxed mb-4">{persona.desc}</p>
          <div className="flex flex-wrap gap-1.5">
            {persona.tags.map(tag => (
              <span
                key={tag}
                className="text-[11px] font-medium px-2 py-0.5 rounded-full border border-zinc-800 bg-zinc-900/50 text-zinc-500 group-hover:border-zinc-700 group-hover:text-zinc-400 transition-colors duration-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function ForWho() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-16 px-4 border-y border-zinc-900/60">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14"
        >
          <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#4ADE80] mb-4">Built for</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
            Anyone who shares work<br className="hidden sm:block" /> and needs to know who sees it
          </h2>
          <p className="text-zinc-500 text-[15px] max-w-xl mx-auto">
            If you send important files over a link and have ever wondered "did they even open it?" — pgate is for you.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {PERSONAS.map((p, i) => (
            <SpotlightCard
              key={p.role}
              persona={p}
              inView={inView}
              delay={i * 0.08}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.38 }}
          className="text-center mt-12"
        >
          <a
            href="/login"
            className="inline-flex items-center gap-2 bg-[#4ADE80] text-[#0D0D0D] font-semibold text-[15px] px-7 py-3.5 rounded-xl hover:bg-[#22c55e] transition-colors"
          >
            Get started free
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
          <p className="text-zinc-600 text-sm mt-3">Free plan · No credit card · 2-minute setup</p>
        </motion.div>
      </div>
    </section>
  )
}
