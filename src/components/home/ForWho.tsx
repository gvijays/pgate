'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const PERSONAS = [
  {
    emoji: '🎨',
    role: 'Designers',
    headline: 'Share Figma files without sharing everything',
    desc: 'Send your prototype to the right client, not the whole internet. Password-protect your Figma, Framer or Webflow link and know the moment they open it.',
    tags: ['Figma', 'Framer', 'Webflow'],
    gradient: 'from-violet-500/20 to-purple-900/30',
    border: 'border-violet-500/20',
    tagColor: 'bg-violet-500/10 text-violet-300 border-violet-500/20',
  },
  {
    emoji: '🚀',
    role: 'Founders & Solopreneurs',
    headline: 'Know which investor actually read your deck',
    desc: 'Give each VC their own password. See who opened it, when, and how many times. Stop wondering if Andreessen ever looked at your pitch.',
    tags: ['Pitch decks', 'Data rooms', 'Google Drive'],
    gradient: 'from-[#4ADE80]/20 to-emerald-900/30',
    border: 'border-[#4ADE80]/20',
    tagColor: 'bg-[#4ADE80]/10 text-[#4ADE80] border-[#4ADE80]/20',
  },
  {
    emoji: '✍️',
    role: 'Creators & Educators',
    headline: 'Sell access to your content without a paywall platform',
    desc: 'Gated Notion pages, private Loom recordings, exclusive downloads — protect anything with a URL. No subscription tools, no setup.',
    tags: ['Notion', 'Loom', 'Gumroad'],
    gradient: 'from-amber-500/20 to-orange-900/30',
    border: 'border-amber-500/20',
    tagColor: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
  },
  {
    emoji: '💼',
    role: 'Freelancers & Agencies',
    headline: 'Deliver client work the professional way',
    desc: 'No more "I sent the file over email." Give each client a branded, password-protected link. Know when they&apos;ve reviewed it so you can follow up at exactly the right moment.',
    tags: ['Client portals', 'Dropbox', 'Canva'],
    gradient: 'from-sky-500/20 to-blue-900/30',
    border: 'border-sky-500/20',
    tagColor: 'bg-sky-500/10 text-sky-300 border-sky-500/20',
  },
]

export default function ForWho() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-24 px-4 bg-zinc-950/60 border-y border-zinc-900">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16">
          <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#4ADE80] mb-4">Built for</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
            Anyone who shares work<br className="hidden sm:block" /> and needs to know who sees it
          </h2>
          <p className="text-zinc-400 text-[15px] max-w-xl mx-auto">
            If you send important files over a link and have ever wondered "did they even open it?" — pgate is for you.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {PERSONAS.map((p, i) => (
            <motion.div
              key={p.role}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className={`relative rounded-2xl border ${p.border} bg-gradient-to-br ${p.gradient} p-6 overflow-hidden group hover:scale-[1.01] transition-transform duration-300`}>

              {/* Subtle glow in corner */}
              <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-20 blur-2xl bg-white" />

              <div className="flex items-start gap-4">
                <div className="text-3xl flex-shrink-0 mt-0.5">{p.emoji}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold uppercase tracking-[0.08em] text-zinc-500 mb-1">{p.role}</p>
                  <h3 className="text-[15px] font-bold text-white leading-snug mb-2">{p.headline}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-4">{p.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.map(tag => (
                      <span key={tag} className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${p.tagColor}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
