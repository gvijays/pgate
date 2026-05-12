import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-zinc-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-md bg-[#4ADE80] flex items-center justify-center">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#0D0D0D" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </div>
              <span className="font-bold text-white text-[16px]">pgate</span>
            </div>
            <p className="text-zinc-600 text-[13px] leading-relaxed max-w-[180px]">
              Gate anything. Know everyone.
            </p>
          </div>

          {/* Product */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.08em] text-zinc-600 mb-3">Product</p>
            <div className="space-y-2">
              {[['How it works', '/#how-it-works'], ['Pricing', '/pricing'], ['Dashboard', '/dashboard'], ['Login', '/login']].map(([label, href]) => (
                <Link key={label} href={href} className="block text-sm text-zinc-500 hover:text-zinc-300 transition-colors">{label}</Link>
              ))}
            </div>
          </div>

          {/* Use cases */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.08em] text-zinc-600 mb-3">Use cases</p>
            <div className="space-y-2">
              {[['Figma links', '/figma'], ['Notion pages', '/notion'], ['Framer sites', '/framer'], ['Pitch decks', '/pitch-deck'], ['Portfolios', '/portfolio']].map(([label, href]) => (
                <Link key={label} href={href} className="block text-sm text-zinc-500 hover:text-zinc-300 transition-colors">{label}</Link>
              ))}
            </div>
          </div>

          {/* More */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.08em] text-zinc-600 mb-3">More</p>
            <div className="space-y-2">
              {[['Password protect link', '/password-protect-a-link'], ['Password protect file', '/password-protect-a-file'], ['Password protect URL', '/password-protect-url'], ['Password protect PDF', '/pdf']].map(([label, href]) => (
                <Link key={label} href={href} className="block text-sm text-zinc-500 hover:text-zinc-300 transition-colors">{label}</Link>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-zinc-900">
          <p className="text-zinc-700 text-xs">© 2025 pgate. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="text-zinc-700 hover:text-zinc-500 text-xs transition-colors">Privacy</Link>
            <Link href="/terms" className="text-zinc-700 hover:text-zinc-500 text-xs transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
