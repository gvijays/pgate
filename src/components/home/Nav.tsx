'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-[#0D0D0D]/90 backdrop-blur-md border-b border-zinc-800' : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-[#4ADE80] flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0D0D0D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
          <span className="font-bold text-white text-[17px] tracking-tight">pgate</span>
        </Link>

        {/* Links */}
        <div className="hidden sm:flex items-center gap-6">
          <Link href="/#how-it-works" className="text-sm text-zinc-400 hover:text-white transition-colors">How it works</Link>
          <Link href="/pricing" className="text-sm text-zinc-400 hover:text-white transition-colors">Pricing</Link>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <Link href="/login" className="text-sm text-zinc-400 hover:text-white transition-colors hidden sm:block">
            Log in
          </Link>
          <Link href="/login"
            className="text-sm font-semibold bg-[#4ADE80] text-[#0D0D0D] px-4 py-2 rounded-lg hover:bg-[#22c55e] transition-colors">
            Get started free
          </Link>
        </div>
      </div>
    </nav>
  )
}
