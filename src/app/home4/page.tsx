'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'

/* ─── Fade-in wrapper ─── */
function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const TEAL = '#0DB8B1'
const TEAL_DARK = '#0a9a93'
const TEAL_BG = '#f0fdfc'

/* ─── Nav ─── */
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: TEAL }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
          <span className="font-bold text-gray-900 text-[17px] tracking-tight">pgate</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/#how-it-works" className="text-sm text-gray-600 hover:text-gray-900 transition-colors font-medium">How it works</Link>
          <Link href="/pricing" className="text-sm text-gray-600 hover:text-gray-900 transition-colors font-medium">Pricing</Link>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/login" className="text-sm text-gray-600 hover:text-gray-900 transition-colors font-medium hidden sm:block">
            Log in
          </Link>
          <Link href="/login"
            className="text-sm font-semibold text-white px-4 py-2 rounded-lg transition-colors"
            style={{ background: TEAL }}>
            Get started free
          </Link>
        </div>
      </div>
    </nav>
  )
}

/* ─── Hero ─── */
function Hero() {
  return (
    <section className="pt-28 pb-20 px-6" style={{ background: `linear-gradient(160deg, ${TEAL_BG} 0%, #ffffff 60%)` }}>
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        {/* Left copy */}
        <div>
          <FadeIn className="mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[12px] font-semibold border"
              style={{ borderColor: `${TEAL}40`, background: `${TEAL}10`, color: TEAL }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: TEAL }} />
              2025 — Trusted by 10,000+ creators
            </div>
          </FadeIn>

          <FadeIn delay={0.08} className="mb-6">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-[1.1] tracking-tight">
              Control your links<br />
              with <span style={{ color: TEAL }}>confidence</span><br />
              &amp; ease
            </h1>
          </FadeIn>

          <FadeIn delay={0.15} className="mb-8">
            <p className="text-lg text-gray-500 leading-relaxed max-w-md">
              Password-protect any file link in 60 seconds. Know who opens it, when, and from where. Free forever on the starter plan.
            </p>
          </FadeIn>

          <FadeIn delay={0.22} className="flex flex-col sm:flex-row gap-3 mb-12">
            <Link href="/login"
              className="inline-flex items-center justify-center gap-2 text-white font-semibold px-6 py-3.5 rounded-xl text-[15px] transition-colors"
              style={{ background: TEAL }}>
              Get started free
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <Link href="/pricing"
              className="inline-flex items-center justify-center gap-2 border border-gray-200 text-gray-700 font-medium px-6 py-3.5 rounded-xl text-[15px] hover:border-gray-300 hover:bg-gray-50 transition-colors">
              Request a demo
            </Link>
          </FadeIn>

          {/* Social proof */}
          <FadeIn delay={0.3} className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {['🧑‍🎨', '👩‍💼', '🧑‍💻', '👩‍🎤'].map((emoji, i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-sm"
                  style={{ background: ['#fce7f3','#dbeafe','#dcfce7','#fef9c3'][i] }}>
                  {emoji}
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500">
              <span className="font-semibold text-gray-800">4.9 ★</span> from 200+ reviews
            </p>
          </FadeIn>
        </div>

        {/* Right — product mockup */}
        <FadeIn delay={0.2} className="relative">
          <div className="rounded-2xl border border-gray-200 bg-white shadow-2xl overflow-hidden">
            {/* Browser chrome */}
            <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 bg-white border border-gray-200 rounded-md h-6 flex items-center px-3 text-[11px] text-gray-400">
                pgate.io/g/my-brand-deck
              </div>
            </div>

            {/* Dashboard content */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="text-[13px] font-semibold text-gray-900">Brand Deck Q4</div>
                  <div className="text-[11px] text-gray-400 mt-0.5">pgate.io/g/brand-deck-q4</div>
                </div>
                <div className="px-2.5 py-1 rounded-full text-[11px] font-semibold" style={{ background: `${TEAL}15`, color: TEAL }}>
                  3 passwords
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  { label: 'Total views', val: '247' },
                  { label: 'Unique openers', val: '18' },
                  { label: 'Blocked attempts', val: '4' },
                ].map((s, i) => (
                  <div key={i} className="rounded-xl border border-gray-100 bg-gray-50 p-3 text-center">
                    <div className="text-xl font-bold text-gray-900">{s.val}</div>
                    <div className="text-[10px] text-gray-400 mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Activity feed */}
              <div className="space-y-2.5">
                {[
                  { flag: '🇺🇸', loc: 'New York, US', device: 'Desktop', time: '2m ago', pass: 'client-a' },
                  { flag: '🇬🇧', loc: 'London, UK', device: 'Mobile', time: '1h ago', pass: 'agency-b' },
                  { flag: '🇯🇵', loc: 'Tokyo, JP', device: 'Desktop', time: '3h ago', pass: 'client-a' },
                ].map((row, i) => (
                  <div key={i} className="flex items-center gap-3 text-[12px] py-2 border-b border-gray-50 last:border-0">
                    <span className="text-base">{row.flag}</span>
                    <span className="text-gray-700 font-medium flex-1">{row.loc}</span>
                    <span className="text-gray-400">{row.device}</span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono" style={{ background: `${TEAL}15`, color: TEAL }}>
                      {row.pass}
                    </span>
                    <span className="text-gray-400">{row.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Floating badge */}
          <div className="absolute -bottom-4 -left-4 bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-lg flex items-center gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm" style={{ background: `${TEAL}20` }}>🛡️</div>
            <div>
              <div className="text-[12px] font-semibold text-gray-900">Access blocked</div>
              <div className="text-[10px] text-gray-400">Wrong password · Tokyo</div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

/* ─── Logo strip ─── */
function LogoStrip() {
  const logos = ['Notion', 'Figma', 'Google Drive', 'Dropbox', 'Loom', 'Canva', 'Miro', 'Linear']
  return (
    <section className="py-12 border-y border-gray-100 bg-white overflow-hidden">
      <p className="text-center text-xs font-semibold tracking-widest uppercase text-gray-400 mb-8">
        Works with every platform you already use
      </p>
      <div className="flex gap-10 items-center" style={{ animation: 'marquee 22s linear infinite', width: 'max-content' }}>
        {[...logos, ...logos].map((l, i) => (
          <span key={i} className="text-gray-300 font-semibold text-sm whitespace-nowrap select-none hover:text-gray-500 transition-colors cursor-default">
            {l}
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
    </section>
  )
}

/* ─── Feature rows ─── */
function Features() {
  const features = [
    {
      tag: 'Access control',
      title: 'One link. Multiple passwords.',
      desc: 'Issue individual passwords to each client, team, or stakeholder. Know exactly who opened what — and revoke access any time.',
      icon: '🔑',
      extras: ['Per-recipient passwords', 'Revoke any time', 'Password attempt log'],
    },
    {
      tag: 'Analytics',
      title: 'Real-time visibility into who reads your work.',
      desc: 'See every view with location, device, and timestamp. Know when a client opened your proposal so you can follow up at the right moment.',
      icon: '📍',
      extras: ['Location + device tracking', 'View timestamps', 'Per-password attribution'],
    },
    {
      tag: 'Customization',
      title: 'Your brand. Your link.',
      desc: 'Match your gate page to your brand with custom colors, logo, and themes. Upgrade to use a custom background image.',
      icon: '🎨',
      extras: ['Custom colors & themes', 'Background images', 'Powered-by branding (Maker+)'],
    },
  ]
  return (
    <section className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <FadeIn className="text-center mb-20">
          <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: TEAL }}>Features</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-snug">
            Everything you need.<br />Nothing you don&apos;t.
          </h2>
        </FadeIn>

        <div className="space-y-24">
          {features.map((f, i) => (
            <FadeIn key={i} delay={0.1}>
              <div className={`grid lg:grid-cols-2 gap-14 items-center ${i % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                {/* Copy */}
                <div className={i % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <span className="text-xs font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full mb-4 inline-block"
                    style={{ background: `${TEAL}15`, color: TEAL }}>
                    {f.tag}
                  </span>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-snug">{f.title}</h3>
                  <p className="text-gray-500 text-[15px] leading-relaxed mb-6">{f.desc}</p>
                  <ul className="space-y-2.5">
                    {f.extras.map((e, j) => (
                      <li key={j} className="flex items-center gap-2.5 text-[14px] text-gray-700">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                        {e}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Visual card */}
                <div className={`rounded-2xl border border-gray-100 p-8 flex items-center justify-center aspect-video ${i % 2 === 1 ? 'lg:col-start-1' : ''}`}
                  style={{ background: `linear-gradient(135deg, ${TEAL}08 0%, ${TEAL}18 100%)` }}>
                  <div className="text-6xl">{f.icon}</div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Trust / Security ─── */
function TrustBar() {
  const badges = [
    { icon: '🔒', label: 'Encrypted in transit' },
    { icon: '☁️', label: 'Supabase hosted' },
    { icon: '🌍', label: 'GDPR friendly' },
    { icon: '⚡', label: 'Edge-deployed' },
    { icon: '🛡️', label: 'Access logs kept 90d' },
  ]
  return (
    <section className="py-16 border-y border-gray-100 bg-gray-50">
      <div className="max-w-5xl mx-auto px-6">
        <p className="text-center text-xs font-semibold tracking-widest uppercase text-gray-400 mb-10">
          Built with security in mind
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          {badges.map((b, i) => (
            <div key={i} className="flex items-center gap-2.5 bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm">
              <span className="text-lg">{b.icon}</span>
              <span className="text-sm font-medium text-gray-700">{b.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Testimonials ─── */
function Testimonials() {
  const cards = [
    {
      quote: 'Saved me 15 hours of back-and-forth. I stopped chasing clients to confirm they opened proposals.',
      name: 'Alex M.',
      role: 'Brand strategist',
      stat: '15h saved / month',
      emoji: '🧑‍💼',
    },
    {
      quote: '0 leaked decks since switching to pgate. My investors appreciate the professionalism.',
      name: 'Riya P.',
      role: 'Startup founder',
      stat: '0 leaked files',
      emoji: '👩‍💻',
    },
    {
      quote: 'My clients used to screenshot and share my work without permission. That era is over.',
      name: 'Lukas B.',
      role: 'Freelance designer',
      stat: '100% controlled access',
      emoji: '🧑‍🎨',
    },
  ]
  return (
    <section className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <FadeIn className="text-center mb-14">
          <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: TEAL }}>Testimonials</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Loved by creators worldwide.</h2>
        </FadeIn>

        <div className="grid sm:grid-cols-3 gap-6">
          {cards.map((c, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="border border-gray-100 rounded-2xl p-6 bg-white hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, j) => (
                      <svg key={j} width="14" height="14" viewBox="0 0 24 24" fill={TEAL} stroke="none">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                      </svg>
                    ))}
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: `${TEAL}15`, color: TEAL }}>
                    {c.stat}
                  </span>
                </div>
                <p className="text-gray-700 text-[14px] leading-relaxed mb-5">&ldquo;{c.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-lg">{c.emoji}</div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">{c.name}</div>
                    <div className="text-xs text-gray-400">{c.role}</div>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Pricing teaser ─── */
function PricingTeaser() {
  return (
    <section className="py-20" style={{ background: `linear-gradient(160deg, ${TEAL_BG} 0%, #ffffff 100%)` }}>
      <div className="max-w-3xl mx-auto px-6 text-center">
        <FadeIn>
          <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: TEAL }}>Simple pricing</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Start free. Upgrade when ready.</h2>
          <p className="text-gray-500 text-lg mb-10 max-w-md mx-auto">
            The free plan is genuinely useful. Pay only when you need more links, more passwords, or analytics insights.
          </p>
        </FadeIn>

        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { name: 'Free', price: '$0', features: ['2 gates', '2 passwords each', 'Basic analytics'] },
            { name: 'Maker', price: '$9/mo', features: ['10 gates', '10 passwords each', 'Location + device analytics'], highlight: true },
            { name: 'Pro', price: '$19/mo', features: ['Unlimited gates', '20 passwords each', 'Priority support'] },
          ].map((plan, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className={`rounded-2xl border p-6 text-left ${plan.highlight ? 'border-[#0DB8B1] shadow-lg' : 'border-gray-200 bg-white'}`}
                style={plan.highlight ? { background: `${TEAL}08` } : {}}>
                {plan.highlight && (
                  <div className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: TEAL }}>Most popular</div>
                )}
                <div className="text-lg font-bold text-gray-900 mb-1">{plan.name}</div>
                <div className="text-2xl font-black text-gray-900 mb-5">{plan.price}</div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-gray-600">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href={i === 0 ? '/login' : '/pricing'}
                  className={`block text-center text-sm font-semibold py-2.5 rounded-xl transition-colors ${plan.highlight ? 'text-white' : 'border border-gray-200 text-gray-700 hover:bg-gray-50'}`}
                  style={plan.highlight ? { background: TEAL } : {}}>
                  {i === 0 ? 'Get started free' : 'Get started'}
                </Link>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3} className="mt-6">
          <Link href="/pricing" className="text-sm font-medium hover:underline" style={{ color: TEAL }}>
            See full feature comparison →
          </Link>
        </FadeIn>
      </div>
    </section>
  )
}

/* ─── Final CTA ─── */
function FinalCTA() {
  return (
    <section className="py-24 text-center px-6" style={{ background: TEAL }}>
      <FadeIn>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
          Ready to protect your links?
        </h2>
        <p className="text-white/80 text-lg mb-10 max-w-md mx-auto">
          Set up your first password-protected link in under 2 minutes. No credit card required.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/login"
            className="inline-flex items-center justify-center gap-2 bg-white font-semibold px-7 py-3.5 rounded-xl text-[15px] hover:bg-gray-100 transition-colors"
            style={{ color: TEAL }}>
            Start for free
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
          <Link href="/pricing"
            className="inline-flex items-center justify-center gap-2 border border-white/40 text-white font-medium px-7 py-3.5 rounded-xl text-[15px] hover:bg-white/10 transition-colors">
            View pricing
          </Link>
        </div>
      </FadeIn>
    </section>
  )
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white py-10 px-6">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: TEAL }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          </div>
          <span className="font-bold text-gray-900 text-[15px] tracking-tight">pgate</span>
        </div>
        <div className="flex gap-6">
          <Link href="/" className="text-sm text-gray-400 hover:text-gray-700 transition-colors">Home</Link>
          <Link href="/pricing" className="text-sm text-gray-400 hover:text-gray-700 transition-colors">Pricing</Link>
          <Link href="/login" className="text-sm text-gray-400 hover:text-gray-700 transition-colors">Sign up</Link>
        </div>
        <p className="text-xs text-gray-300">© 2025 pgate. All rights reserved.</p>
      </div>
    </footer>
  )
}

/* ─── Page ─── */
export default function Home4() {
  return (
    <div className="bg-white min-h-screen text-gray-900">
      <Nav />
      <Hero />
      <LogoStrip />
      <Features />
      <TrustBar />
      <Testimonials />
      <PricingTeaser />
      <FinalCTA />
      <Footer />
    </div>
  )
}
