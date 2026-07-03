'use client'
import { motion } from 'framer-motion'
import ProtectWidget from './ProtectWidget'

export default function Hero() {
  return (
    <>
      <section className="relative flex flex-col items-center justify-center px-4 pt-28 pb-20 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(74,222,128,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(74,222,128,0.03)_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#4ADE80]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto text-center w-full">

          {/* Badge */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-700 text-zinc-400 text-xs font-medium px-3.5 py-1.5 rounded-full mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] animate-pulse" />
            Secure link sharing with access tracking
          </motion.div>

          {/* Headline */}
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.08 }}
            className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1] mb-6 text-white">
            Password-protect<span className="sm:hidden"><br /></span>{' '}any link<br />
            <span className="text-[#4ADE80]">See who opens it.</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}
            className="text-zinc-400 text-base sm:text-lg max-w-xl mx-auto leading-relaxed mb-10">
            Password-protect any link, file, doc, PDF or website. Set multiple passwords for the same link — one per recipient — and track exactly who opens it.
          </motion.p>

          {/* ── Interactive create widget ── */}
          <ProtectWidget />

        </div>
      </section>
    </>
  )
}
