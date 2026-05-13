'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useInView, AnimatePresence } from 'framer-motion'

/* ─── Fade-in wrapper ─── */
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

/* ─── Nav ─── */
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0D0D0D]/90 backdrop-blur-md border-b border-zinc-800' : 'bg-transparent'}`}>
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-[#4ADE80] flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0D0D0D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
          <span className="font-bold text-white text-[17px] tracking-tight">pgate</span>
        </Link>
        <Link href="/login" className="text-sm font-semibold bg-[#4ADE80] text-[#0D0D0D] px-4 py-2 rounded-lg hover:bg-[#22c55e] transition-colors">
          Get started free
        </Link>
      </div>
    </nav>
  )
}

/* ─── Chapter label ─── */
function Chapter({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="h-px flex-1 bg-zinc-800" />
      <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-zinc-600">{label}</span>
      <div className="h-px flex-1 bg-zinc-800" />
    </div>
  )
}

/* ─── Floating service icon cards ─── */
type IconItem = {
  id: string
  glow: string
  pos: React.CSSProperties
  delay: number
  floatAmp: number
  duration: number
  xl?: boolean   // only show at xl+ (≥1280px) breakpoint
  icon: React.ReactNode
}

const ICONS: IconItem[] = [
  /* ── Left outer column (lg+) ── */
  {
    id: 'gdrive', glow: '#4285F4',
    pos: { top: '12%', left: '4%' }, delay: 0.45, floatAmp: 5, duration: 3.4,
    icon: (
      <svg width="24" height="22" viewBox="0 0 24 22" fill="none" aria-label="Google Drive">
        <path d="M12 2L2 20h7l3-6-2-12z" fill="#34A853"/>
        <path d="M12 2l-2 12 3 6h9L12 2z" fill="#FBBC04"/>
        <path d="M9 20l3-6 3 6H9z" fill="#4285F4"/>
      </svg>
    ),
  },
  {
    id: 'notion', glow: '#ffffff',
    pos: { top: '30%', left: '2.5%' }, delay: 0.6, floatAmp: 6, duration: 4.1,
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-label="Notion">
        <rect width="22" height="22" rx="3" fill="#191919"/>
        <path d="M5 5v12M5 5l12 12M17 5v12" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'figma', glow: '#A259FF',
    pos: { top: '48%', left: '4%' }, delay: 0.75, floatAmp: 4, duration: 3.8,
    icon: (
      <svg width="16" height="24" viewBox="0 0 16 24" fill="none" aria-label="Figma">
        <rect x="0" y="0" width="8" height="8" rx="4" fill="#F24E1E"/>
        <rect x="8" y="0" width="8" height="8" rx="4" fill="#FF7262"/>
        <rect x="0" y="8" width="8" height="8" rx="4" fill="#A259FF"/>
        <circle cx="12" cy="12" r="4" fill="#1ABCFE"/>
        <rect x="0" y="16" width="8" height="8" rx="4" fill="#0ACF83"/>
      </svg>
    ),
  },
  {
    id: 'loom', glow: '#625DF5',
    pos: { top: '65%', left: '2.5%' }, delay: 0.9, floatAmp: 7, duration: 4.4,
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-label="Loom">
        <circle cx="11" cy="11" r="11" fill="#625DF5"/>
        <path d="M8.5 8l6 3-6 3V8z" fill="white"/>
      </svg>
    ),
  },
  {
    id: 'pdf', glow: '#E53935',
    pos: { top: '80%', left: '5%' }, delay: 1.05, floatAmp: 4, duration: 3.1,
    icon: (
      <svg width="18" height="22" viewBox="0 0 18 22" fill="none" aria-label="PDF">
        <rect width="18" height="22" rx="2" fill="#E53935"/>
        <text x="2.5" y="15" fontFamily="Arial, sans-serif" fontSize="8" fontWeight="bold" fill="white">PDF</text>
      </svg>
    ),
  },

  /* ── Left inner (xl+ only, closer to center) ── */
  {
    id: 'dropbox', glow: '#0061FF', xl: true,
    pos: { top: '22%', left: '16%' }, delay: 0.55, floatAmp: 5, duration: 3.6,
    icon: (
      <svg width="22" height="20" viewBox="0 0 22 20" fill="none" aria-label="Dropbox">
        <path d="M5.5 0L0 3.5 5.5 7 11 3.5z" fill="#0061FF"/>
        <path d="M16.5 0 11 3.5 16.5 7 22 3.5z" fill="#0061FF"/>
        <path d="M0 10.5 5.5 14 11 10.5 5.5 7z" fill="#0061FF"/>
        <path d="M16.5 7 11 10.5 16.5 14 22 10.5z" fill="#0061FF"/>
        <path d="M5.5 15.5 11 12 16.5 15.5 11 19z" fill="#0061FF"/>
      </svg>
    ),
  },

  /* ── Right outer column (lg+) ── */
  {
    id: 'webflow', glow: '#4353FF',
    pos: { top: '10%', right: '4%' }, delay: 0.5, floatAmp: 6, duration: 3.2,
    icon: (
      <svg width="24" height="18" viewBox="0 0 24 18" fill="none" aria-label="Webflow">
        <path d="M0 0c1.2 3.6 3 9.6 3.6 13.2 1.2-3.6 2.4-7.2 3.6-9.6 1.2 2.4 2.4 6 3.6 9.6C11.4 9.6 13.2 3.6 14.4 0h9.6L17.4 18l-6-10.8L5.4 18 0 0z" fill="#4353FF"/>
      </svg>
    ),
  },
  {
    id: 'framer', glow: '#0055FF',
    pos: { top: '27%', right: '2.5%' }, delay: 0.65, floatAmp: 5, duration: 4.0,
    icon: (
      <svg width="18" height="22" viewBox="0 0 18 22" fill="none" aria-label="Framer">
        <path d="M0 0H18V8H9L18 16H9V22L0 14V8H9Z" fill="#0055FF"/>
      </svg>
    ),
  },
  {
    id: 'gdocs', glow: '#4285F4',
    pos: { top: '45%', right: '4%' }, delay: 0.8, floatAmp: 4, duration: 3.7,
    icon: (
      <svg width="18" height="22" viewBox="0 0 18 22" fill="none" aria-label="Google Docs">
        <rect width="18" height="22" rx="2" fill="#4285F4"/>
        <rect x="3.5" y="7" width="11" height="1.5" rx="0.75" fill="white" opacity="0.9"/>
        <rect x="3.5" y="10.5" width="11" height="1.5" rx="0.75" fill="white" opacity="0.9"/>
        <rect x="3.5" y="14" width="7" height="1.5" rx="0.75" fill="white" opacity="0.9"/>
      </svg>
    ),
  },
  {
    id: 'sheets', glow: '#34A853',
    pos: { top: '62%', right: '2.5%' }, delay: 0.95, floatAmp: 6, duration: 4.2,
    icon: (
      <svg width="18" height="22" viewBox="0 0 18 22" fill="none" aria-label="Google Sheets">
        <rect width="18" height="22" rx="2" fill="#34A853"/>
        <rect x="3" y="6" width="12" height="10" rx="1" fill="white" opacity="0.15"/>
        <line x1="3" y1="10" x2="15" y2="10" stroke="white" strokeWidth="0.8" opacity="0.7"/>
        <line x1="3" y1="13.5" x2="15" y2="13.5" stroke="white" strokeWidth="0.8" opacity="0.7"/>
        <line x1="8.5" y1="6" x2="8.5" y2="16" stroke="white" strokeWidth="0.8" opacity="0.7"/>
      </svg>
    ),
  },
  {
    id: 'word', glow: '#185ABD',
    pos: { top: '77%', right: '4%' }, delay: 1.1, floatAmp: 4, duration: 3.3,
    icon: (
      <svg width="18" height="22" viewBox="0 0 18 22" fill="none" aria-label="Word">
        <rect width="18" height="22" rx="2" fill="#185ABD"/>
        <path d="M3 7l2.5 10 2.5-7 2.5 7L13 7" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },

  /* ── Right inner (xl+ only) ── */
  {
    id: 'canva', glow: '#00C4CC', xl: true,
    pos: { top: '20%', right: '16%' }, delay: 0.58, floatAmp: 5, duration: 3.9,
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-label="Canva">
        <circle cx="11" cy="11" r="11" fill="#7D2AE8"/>
        <path d="M14.5 8a5 5 0 100 6" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
      </svg>
    ),
  },
]

function FloatingIcons() {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      {ICONS.map((item) => (
        <motion.div
          key={item.id}
          className={`absolute ${item.xl ? 'hidden xl:block' : 'hidden lg:block'}`}
          style={item.pos}
          initial={{ opacity: 0, y: 20, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: item.delay, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            animate={{ y: [-item.floatAmp, item.floatAmp] }}
            transition={{
              delay: item.delay + 0.65,
              repeat: Infinity,
              repeatType: 'mirror',
              duration: item.duration,
              ease: 'easeInOut',
            }}
            className="w-12 h-12 rounded-2xl bg-zinc-900/90 border border-zinc-800 flex items-center justify-center backdrop-blur-sm"
            style={{ boxShadow: `0 4px 24px ${item.glow}18, 0 1px 4px rgba(0,0,0,0.5)` }}
          >
            {item.icon}
          </motion.div>
        </motion.div>
      ))}
    </div>
  )
}

/* ─── Story Hero ─── */
function StoryHero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-20 text-center relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#4ADE80]/8 rounded-full blur-[120px] pointer-events-none" />

      {/* Floating service icons */}
      <FloatingIcons />

      <FadeIn className="mb-6 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/50 text-[12px] text-zinc-400">
          <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] animate-pulse" />
          A story about protecting what matters
        </div>
      </FadeIn>

      <FadeIn delay={0.1} className="mb-6 max-w-3xl relative z-10">
        <h1 className="text-4xl sm:text-6xl font-bold text-white leading-[1.1] tracking-tight">
          You put in the work.<br />
          <span className="text-[#4ADE80]">Don&apos;t let it slip away.</span>
        </h1>
      </FadeIn>

      <FadeIn delay={0.2} className="mb-10 max-w-xl relative z-10">
        <p className="text-lg text-zinc-400 leading-relaxed">
          A creative&#39;s guide to sharing files without losing control — and how pgate makes it effortless.
        </p>
      </FadeIn>

      <FadeIn delay={0.3} className="relative z-10">
        <Link href="/login"
          className="inline-flex items-center gap-2 bg-[#4ADE80] text-[#0D0D0D] font-semibold px-6 py-3 rounded-xl hover:bg-[#22c55e] transition-colors text-[15px]">
          Start for free
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </Link>
      </FadeIn>

      {/* Scroll indicator */}
      <FadeIn delay={0.6} className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#52525b" strokeWidth="2"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
        </motion.div>
      </FadeIn>
    </section>
  )
}

/* ─── The Problem ─── */
function TheProblem() {
  const items = [
    { icon: '📧', text: 'You email a Dropbox link. It gets forwarded. Twice.' },
    { icon: '🤷', text: 'No idea who opened it. Or when. Or how many times.' },
    { icon: '🚨', text: 'Your client shares your proposal with a competitor.' },
    { icon: '😓', text: 'You ask for the link back. Awkward. Ineffective.' },
  ]
  return (
    <section className="max-w-3xl mx-auto px-6 py-24">
      <FadeIn>
        <Chapter label="The problem" />
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 leading-snug">
          Sharing a file used to mean<br />
          <span className="text-zinc-500">losing control of it forever.</span>
        </h2>
        <p className="text-zinc-400 text-lg leading-relaxed mb-14">
          You&apos;ve been there. A link goes out, then it spirals. You have no visibility, no protection, and no way to take it back.
        </p>
      </FadeIn>

      <div className="relative pl-6 border-l border-zinc-800 space-y-10">
        {items.map((item, i) => (
          <FadeIn key={i} delay={i * 0.1}>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-xl flex-shrink-0">
                {item.icon}
              </div>
              <p className="text-zinc-300 text-[17px] leading-relaxed pt-1.5">{item.text}</p>
            </div>
          </FadeIn>
        ))}
        {/* Timeline dot */}
        <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-zinc-700 border border-zinc-600" />
        <div className="absolute -left-[5px] bottom-0 w-2.5 h-2.5 rounded-full bg-[#4ADE80]" />
      </div>
    </section>
  )
}

/* ─── The Discovery ─── */
function TheDiscovery() {
  return (
    <section className="py-24 bg-zinc-950/60">
      <div className="max-w-3xl mx-auto px-6">
        <FadeIn>
          <Chapter label="The discovery" />
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 leading-snug">
            What if your link had a<br />
            <span className="text-[#4ADE80]">front door with a lock?</span>
          </h2>
          <p className="text-zinc-400 text-lg leading-relaxed mb-14">
            pgate turns any file link into a password-protected page. Only the people you trust get through — and you see every attempt.
          </p>
        </FadeIn>

        {/* Password UI mockup */}
        <FadeIn delay={0.2}>
          <div className="rounded-2xl border border-zinc-800 bg-[#0D0D0D] overflow-hidden shadow-2xl max-w-sm mx-auto">
            {/* header bar */}
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

/* ─── The Moment It Clicks ─── */
function TheMoment() {
  const notifications = [
    { time: '2m ago', msg: 'Someone in New York opened your link', icon: '👁️' },
    { time: '5m ago', msg: 'Wrong password attempted — blocked', icon: '🛡️' },
    { time: '1h ago', msg: 'Tokyo visitor downloaded proposal.pdf', icon: '📍' },
  ]
  return (
    <section className="max-w-3xl mx-auto px-6 py-24">
      <FadeIn>
        <Chapter label="The moment it clicks" />
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 leading-snug">
          You know exactly who&apos;s<br />
          <span className="text-[#4ADE80]">reading your work.</span>
        </h2>
        <p className="text-zinc-400 text-lg leading-relaxed mb-14">
          Every view, every location, every device — logged in real time. No more sending links into the void.
        </p>
      </FadeIn>

      <div className="space-y-4">
        {notifications.map((n, i) => (
          <FadeIn key={i} delay={i * 0.12}>
            <div className="flex items-center gap-4 p-4 rounded-xl border border-zinc-800 bg-zinc-950 hover:border-zinc-700 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-xl flex-shrink-0">
                {n.icon}
              </div>
              <div className="flex-1">
                <p className="text-white text-sm font-medium">{n.msg}</p>
                <p className="text-zinc-600 text-xs mt-0.5">{n.time}</p>
              </div>
              <div className="w-2 h-2 rounded-full bg-[#4ADE80]" />
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}

/* ─── Results / Stats ─── */
function Results() {
  const stats = [
    { value: '10k+', label: 'Links protected' },
    { value: '2 min', label: 'Setup time' },
    { value: '0', label: 'Leaked files' },
    { value: '100%', label: 'Founder-built' },
  ]
  return (
    <section className="bg-[#4ADE80] py-20">
      <div className="max-w-4xl mx-auto px-6">
        <FadeIn className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0D0D0D] leading-snug">
            The results speak for themselves.
          </h2>
        </FadeIn>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <FadeIn key={i} delay={i * 0.08} className="text-center">
              <div className="text-4xl font-black text-[#0D0D0D] mb-1">{s.value}</div>
              <div className="text-sm text-[#166534]/80 font-medium">{s.label}</div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── How It Works ─── */
function HowItWorks() {
  const steps = [
    {
      n: '01',
      title: 'Paste your file link',
      desc: 'Google Drive, Notion, Dropbox, Loom — anything with a URL works instantly.',
    },
    {
      n: '02',
      title: 'Set a password (or many)',
      desc: 'Create individual passwords for each recipient. Know exactly who used which one.',
    },
    {
      n: '03',
      title: 'Share your pgate link',
      desc: 'Send the pgate URL. Visitors enter their password and reach your content.',
    },
  ]
  return (
    <section className="max-w-3xl mx-auto px-6 py-24">
      <FadeIn className="text-center mb-16">
        <Chapter label="How it works" />
        <h2 className="text-3xl sm:text-4xl font-bold text-white leading-snug">
          Three steps. That&apos;s it.
        </h2>
      </FadeIn>
      <div className="space-y-12">
        {steps.map((step, i) => (
          <FadeIn key={i} delay={i * 0.12}>
            <div className="flex gap-6 items-start">
              <div className="text-[40px] font-black text-zinc-800 leading-none select-none w-12 flex-shrink-0 text-right">
                {step.n}
              </div>
              <div className="pt-1">
                <h3 className="text-white font-semibold text-xl mb-2">{step.title}</h3>
                <p className="text-zinc-400 text-[15px] leading-relaxed">{step.desc}</p>
              </div>
            </div>
            {i < steps.length - 1 && (
              <div className="ml-[72px] mt-8 h-px bg-zinc-900" />
            )}
          </FadeIn>
        ))}
      </div>
    </section>
  )
}

/* ─── Testimonial ─── */
function Testimonial() {
  return (
    <section className="py-16 bg-zinc-950/60">
      <FadeIn className="max-w-2xl mx-auto px-6 text-center">
        <div className="text-4xl mb-6">💬</div>
        <blockquote className="text-xl sm:text-2xl text-white font-medium leading-relaxed mb-6">
          &ldquo;I sent my brand deck to 6 clients last month. pgate showed me exactly who opened it and when. Closed the deal faster because I knew who was interested.&rdquo;
        </blockquote>
        <div className="text-zinc-500 text-sm">
          <span className="text-zinc-300 font-medium">Priya S.</span> — Brand designer, Mumbai
        </div>
      </FadeIn>
    </section>
  )
}

/* ─── Final CTA ─── */
function FinalCTA() {
  return (
    <section className="py-28 text-center px-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#4ADE80]/6 rounded-full blur-[100px] pointer-events-none" />
      <FadeIn className="relative">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/50 text-[12px] text-zinc-400 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80]" />
          Free forever on the base plan
        </div>
        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
          Your work deserves<br />a front door.
        </h2>
        <p className="text-zinc-400 text-lg mb-10 max-w-md mx-auto leading-relaxed">
          Set up your first protected link in under 2 minutes. No credit card required.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/login"
            className="inline-flex items-center justify-center gap-2 bg-[#4ADE80] text-[#0D0D0D] font-semibold px-7 py-3.5 rounded-xl hover:bg-[#22c55e] transition-colors text-[15px]">
            Start protecting links
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
          <Link href="/pricing"
            className="inline-flex items-center justify-center gap-2 border border-zinc-700 text-zinc-300 font-medium px-7 py-3.5 rounded-xl hover:border-zinc-500 hover:text-white transition-colors text-[15px]">
            See pricing
          </Link>
        </div>
      </FadeIn>
    </section>
  )
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="border-t border-zinc-900 py-10 px-6">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-[#4ADE80] flex items-center justify-center">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#0D0D0D" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          </div>
          <span className="font-bold text-white text-[15px] tracking-tight">pgate</span>
        </div>
        <div className="flex gap-6">
          <Link href="/" className="text-sm text-zinc-600 hover:text-zinc-300 transition-colors">Home</Link>
          <Link href="/pricing" className="text-sm text-zinc-600 hover:text-zinc-300 transition-colors">Pricing</Link>
          <Link href="/login" className="text-sm text-zinc-600 hover:text-zinc-300 transition-colors">Sign up</Link>
        </div>
        <p className="text-xs text-zinc-700">© 2025 pgate. All rights reserved.</p>
      </div>
    </footer>
  )
}

/* ─── Page ─── */
export default function Home2() {
  return (
    <div className="bg-[#0D0D0D] min-h-screen text-white">
      <Nav />
      <StoryHero />
      <TheProblem />
      <TheDiscovery />
      <TheMoment />
      <Results />
      <HowItWorks />
      <Testimonial />
      <FinalCTA />
      <Footer />
    </div>
  )
}
