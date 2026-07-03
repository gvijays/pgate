import Link from 'next/link'
import Image from 'next/image'
import { SEO_PAGES } from '@/lib/seo-pages'

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

export default function Footer() {
  return (
    <footer className="border-t border-zinc-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between gap-10 mb-12">
          {/* Brand */}
          <div className="max-w-[200px]">
            <div className="flex items-center gap-2 mb-3">
              <Image src="/logo.png" alt="p/gate logo" width={24} height={24} className="rounded-md" />
              <span className="font-typewriter text-white text-[18px]">p/gate</span>
            </div>
            <p className="text-zinc-600 text-[13px] leading-relaxed">
              Password-protect any link.<br />Know exactly who opens it.
            </p>
          </div>

          <div className="flex gap-16">
            {/* Product */}
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.08em] text-zinc-600 mb-4">Product</p>
              <div className="space-y-3">
                {[
                  ['How it works', '/#how-it-works'],
                  ['Pricing',      '/pricing'],
                  ['Blog',         '/blog'],
                  ['Dashboard',    '/dashboard'],
                  ['Sign up free', '/login'],
                ].map(([label, href]) => (
                  <Link key={label} href={href} className="block text-sm text-zinc-500 hover:text-zinc-300 transition-colors">{label}</Link>
                ))}
              </div>
            </div>

            {/* Use cases */}
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.08em] text-zinc-600 mb-4">Use cases</p>
              <div className="space-y-3">
                {[
                  ['Designers',           '/#for-who'],
                  ['Founders',            '/#for-who'],
                  ['Creators',            '/#for-who'],
                  ['Freelancers',         '/#for-who'],
                ].map(([label, href]) => (
                  <Link key={label} href={href} className="block text-sm text-zinc-500 hover:text-zinc-300 transition-colors">{label}</Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Password-protect anything — internal link grid */}
        <div className="pt-8 border-t border-zinc-900 mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.08em] text-zinc-600 mb-4">Password-protect anything</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-x-6 gap-y-2.5">
            {Object.values(SEO_PAGES).map(p => (
              <Link key={p.slug} href={`/password-protect/${p.slug}`}
                className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors">
                {cap(p.brand)}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-zinc-900">
          <p className="text-zinc-700 text-xs">© 2026 pgate. All rights reserved.</p>
          <p className="text-zinc-700 text-xs">Built for people who share things that matter.</p>
        </div>
      </div>
    </footer>
  )
}
