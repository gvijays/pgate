'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function Nav() {
  const [scrolled,   setScrolled]   = useState(false)
  const [loggedIn,   setLoggedIn]   = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getSession().then(({ data }) => {
      setLoggedIn(!!data.session)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setLoggedIn(!!session)
    })
    return () => subscription.unsubscribe()
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
      scrolled ? 'bg-[#0D0D0D]/90 backdrop-blur-md border-zinc-800' : 'bg-transparent border-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="p/gate logo" width={28} height={28} className="rounded-md" />
          <span className="font-typewriter text-white text-[20px]">p/gate</span>
        </Link>

        {/* Links */}
        <div className="hidden sm:flex items-center gap-6">
          <Link href="/#how-it-works" className="text-sm text-zinc-400 hover:text-white transition-colors">How it works</Link>
          <Link href="/pricing" className="text-sm text-zinc-400 hover:text-white transition-colors">Pricing</Link>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-3">
          {loggedIn ? (
            <Link href="/dashboard"
              className="text-sm font-semibold bg-[#4ADE80] text-[#0D0D0D] px-4 py-2 rounded-lg hover:bg-[#22c55e] transition-colors">
              Dashboard →
            </Link>
          ) : (
            <>
              <Link href="/login" className="text-sm text-zinc-400 hover:text-white transition-colors hidden sm:block">
                Log in
              </Link>
              <Link href="/login"
                className="text-sm font-semibold bg-[#4ADE80] text-[#0D0D0D] px-4 py-2 rounded-lg hover:bg-[#22c55e] transition-colors">
                Get started free
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
