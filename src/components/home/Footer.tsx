import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-zinc-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between gap-10 mb-12">
          {/* Brand */}
          <div className="max-w-[200px]">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-md bg-[#4ADE80] flex items-center justify-center">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#0D0D0D" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </div>
              <span className="font-bold text-white text-[16px]">pgate</span>
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

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-zinc-900">
          <p className="text-zinc-700 text-xs">© 2025 pgate. All rights reserved.</p>
          <p className="text-zinc-700 text-xs">Built for people who share things that matter.</p>
        </div>
      </div>
    </footer>
  )
}
