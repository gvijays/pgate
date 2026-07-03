import { SEO_PAGES, SEO_SLUGS } from '@/lib/seo-pages'
import { notFound } from 'next/navigation'
import Nav from '@/components/home/Nav'
import Footer from '@/components/home/Footer'
import ProtectWidget from '@/components/home/ProtectWidget'
import type { Metadata } from 'next'

export function generateStaticParams() {
  return SEO_SLUGS.map(tool => ({ tool }))
}

export function generateMetadata({ params }: { params: { tool: string } }): Metadata {
  const page = SEO_PAGES[params.tool]
  if (!page) return {}
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: `https://pgate.io/password-protect/${page.slug}` },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      type: 'website',
      images: [{ url: '/og-image.png' }],
    },
    twitter: { card: 'summary_large_image', title: page.metaTitle, description: page.metaDescription },
  }
}

export default function ToolPage({ params }: { params: { tool: string } }) {
  const page = SEO_PAGES[params.tool]
  if (!page) notFound()

  const base = 'https://pgate.io'

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: page.faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: page.metaTitle,
    description: page.metaDescription,
    step: page.steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.title,
      text: s.text,
    })),
  }

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.metaTitle,
    description: page.metaDescription,
    url: `${base}/password-protect/${page.slug}`,
  }

  return (
    <main className="bg-[#0D0D0D] min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <Nav />

      {/* ── Hero: brand badge + headline + create widget ── */}
      <section className="relative px-4 pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(74,222,128,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(74,222,128,0.03)_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-3xl pointer-events-none"
          style={{ background: `${page.brandColor}14` }}
        />

        <div className="relative z-10 max-w-2xl mx-auto text-center w-full">
          {/* Circular brand badge */}
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-7"
            style={{ background: `${page.brandColor}1a`, border: `1px solid ${page.brandColor}40` }}
          >
            {page.logo}
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1] mb-5 text-white">
            {page.h1}
          </h1>
          <p className="text-zinc-400 text-base sm:text-lg max-w-xl mx-auto leading-relaxed mb-10">
            {page.subhead}
          </p>

          {/* Interactive create widget — same as home page */}
          <ProtectWidget animate={false} />
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="px-4 py-14">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-10 text-center">
            Frequently asked questions
          </h2>
          <div className="space-y-4">
            {page.faqs.map(f => (
              <div key={f.q} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                <p className="font-semibold text-white mb-2 text-[15px]">{f.q}</p>
                <p className="text-zinc-400 text-[14px] leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="px-4 py-14">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#4ADE80] mb-3 text-center">How it works</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-10 text-center">
            Three steps. Thirty seconds.
          </h2>
          <div className="space-y-4">
            {page.steps.map((s, i) => (
              <div key={s.title} className="flex gap-4 bg-zinc-900/60 border border-zinc-800 rounded-xl p-5">
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#18181b] border-2 border-[#4ADE80] flex items-center justify-center text-[#4ADE80] font-bold text-sm">
                  {i + 1}
                </div>
                <div className="pt-1">
                  <p className="font-semibold text-white mb-1.5 text-[15px]">{s.title}</p>
                  <p className="text-zinc-400 text-[14px] leading-relaxed">{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Brand's built-in protection (the "why pgate" answer) ── */}
      <section className="px-4 py-14">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-6 text-center">
            {page.brand}’s built-in password protection
          </h2>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-7 sm:p-9">
            <p className="text-zinc-300 text-[16px] sm:text-[17px] leading-[1.8]">{page.intro}</p>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="relative px-4 py-20 text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-[#4ADE80]/8 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative max-w-xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-5 leading-tight">
            Lock your {page.brand} link<br /><span className="text-[#4ADE80]">in under a minute.</span>
          </h2>
          <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
            Free to start. No installs. Just paste, protect, and see who opens it.
          </p>
          <a href="/login"
            className="inline-flex items-center gap-2 bg-[#4ADE80] text-[#0D0D0D] font-semibold text-[15px] px-7 py-3.5 rounded-xl hover:bg-[#22c55e] transition-colors">
            Get started free
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </a>
        </div>
      </section>

      <Footer />
    </main>
  )
}
