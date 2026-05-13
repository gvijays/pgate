import Nav from '@/components/home/Nav'
import Hero from '@/components/home/Hero'
import Marquee from '@/components/home/Marquee'
import TheProblem from '@/components/home/TheProblem'
import TheDiscovery from '@/components/home/TheDiscovery'
import HowItWorks from '@/components/home/HowItWorks'
import ForWho from '@/components/home/ForWho'
import Features from '@/components/home/Features'
import PricingTable from '@/components/home/PricingTable'
import Footer from '@/components/home/Footer'

export default function HomePage() {
  return (
    <main className="bg-[#0D0D0D] min-h-screen">
      <Nav />
      <Hero />
      <Marquee />
      <TheProblem />
      <TheDiscovery />
      <HowItWorks />
      <ForWho />
      <Features />
      <PricingTable />

      {/* Final CTA */}
      <section className="relative py-32 px-4 text-center overflow-hidden">
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-[#4ADE80]/8 rounded-full blur-[100px] pointer-events-none" />
        {/* Subtle grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(74,222,128,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(74,222,128,0.03)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

        <div className="relative max-w-2xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-medium px-3.5 py-1.5 rounded-full mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] animate-pulse" />
            Free forever on the base plan
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-5 leading-tight">
            Your work deserves<br />
            <span className="text-[#4ADE80]">a front door.</span>
          </h2>
          <p className="text-zinc-400 text-lg mb-10 max-w-md mx-auto leading-relaxed">
            Set up your first protected link in under 30 seconds.<br />No credit card. No installs. Just paste and protect.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
            <a href="/login"
              className="inline-flex items-center gap-2 bg-[#4ADE80] text-[#0D0D0D] font-semibold text-[15px] px-7 py-3.5 rounded-xl hover:bg-[#22c55e] transition-colors">
              Get started free
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a href="/pricing"
              className="inline-flex items-center gap-2 border border-zinc-700 text-zinc-300 font-medium text-[15px] px-7 py-3.5 rounded-xl hover:border-zinc-500 hover:text-white transition-colors">
              See pricing
            </a>
          </div>

          {/* Social proof row */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-zinc-600 text-[13px]">
            {['No credit card required', 'Works with any URL', '2-minute setup'].map((item, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#4ADE80" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
