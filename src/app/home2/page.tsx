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

/* ─── Story Hero ─── */
function StoryHero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-20 text-center relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#4ADE80]/8 rounded-full blur-[120px] pointer-events-none" />

      <FadeIn className="mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/50 text-[12px] text-zinc-400">
          <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] animate-pulse" />
          A story about protecting what matters
        </div>
      </FadeIn>

      <FadeIn delay={0.1} className="mb-6 max-w-3xl">
        <h1 className="text-4xl sm:text-6xl font-bold text-white leading-[1.1] tracking-tight">
          You put in the work.<br />
          <span className="text-[#4ADE80]">Don&apos;t let it slip away.</span>
        </h1>
      </FadeIn>

      <FadeIn delay={0.2} className="mb-10 max-w-xl">
        <p className="text-lg text-zinc-400 leading-relaxed">
          A creative&#39;s guide to sharing files without losing control — and how pgate makes it effortless.
        </p>
      </FadeIn>

      <FadeIn delay={0.3}>
        <Link href="/login"
          className="inline-flex items-center gap-2 bg-[#4ADE80] text-[#0D0D0D] font-semibold px-6 py-3 rounded-xl hover:bg-[#22c55e] transition-colors text-[15px]">
          Start for free
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </Link>
      </FadeIn>

      {/* Scroll indicator */}
      <FadeIn delay={0.6} className="absolute bottom-10 left-1/2 -translate-x-1/2">
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
