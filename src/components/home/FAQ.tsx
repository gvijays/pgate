'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const FAQS = [
  {
    q: 'What types of links can I protect?',
    a: 'Any publicly accessible URL — Figma files, Notion pages, Google Drive documents, PDFs, Framer prototypes, pitch decks, portfolios, and more. If it has a URL, pgate can protect it.',
  },
  {
    q: 'How do per-recipient passwords work?',
    a: 'When you create a protected link, you can add multiple passwords — one for each person you\'re sharing with. Label them by name (e.g. "Google HR", "Client A"). When someone opens the link, you see exactly which label was used, so you always know who it was.',
  },
  {
    q: 'Do my recipients need to create an account?',
    a: 'No. Your recipients just visit the link, enter the password you gave them, and land on your content instantly. No sign-ups, no apps, no friction.',
  },
  {
    q: 'What analytics do I get?',
    a: 'For every open, you see: which recipient opened it, the timestamp, their device type, browser, and approximate location (city/country). On the Maker plan you get the full analytics dashboard.',
  },
  {
    q: 'Does it work with Google Drive or Notion?',
    a: 'Yes. Paste your Google Drive, Docs, Sheets, or Notion URL into pgate. Anyone who gets your pgate link will need the password to pass through — even if the original document is public.',
  },
  {
    q: 'Is pgate free to use?',
    a: 'Yes. The free plan lets you create up to 2 protected links with 2 passwords each. Upgrade to Maker ($9/mo) for 25 links, 10 passwords per link, custom slugs, and full analytics.',
  },
]

function Item({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-zinc-800 last:border-0">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group">
        <span className="text-[15px] font-medium text-zinc-200 group-hover:text-white transition-colors">{q}</span>
        <span className={`flex-shrink-0 w-6 h-6 rounded-full border border-zinc-700 flex items-center justify-center transition-all ${open ? 'bg-[#4ADE80]/10 border-[#4ADE80]/30' : 'group-hover:border-zinc-500'}`}>
          <svg
            width="10" height="10" viewBox="0 0 24 24" fill="none"
            stroke={open ? '#4ADE80' : '#71717a'} strokeWidth="2.5"
            className={`transition-transform duration-200 ${open ? 'rotate-45' : ''}`}>
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}>
            <p className="text-zinc-400 text-[14px] leading-relaxed pb-5">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#4ADE80] mb-3">FAQ</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Common questions
          </h2>
        </div>
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl px-6">
          {FAQS.map(({ q, a }) => <Item key={q} q={q} a={a} />)}
        </div>
      </div>
    </section>
  )
}
