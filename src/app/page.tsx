import Nav from '@/components/home/Nav'
import Hero from '@/components/home/Hero'
import Marquee from '@/components/home/Marquee'
import HowItWorks from '@/components/home/HowItWorks'
import Features from '@/components/home/Features'
import PricingTable from '@/components/home/PricingTable'
import Footer from '@/components/home/Footer'

export default function HomePage() {
  return (
    <main className="bg-[#0D0D0D] min-h-screen">
      <Nav />
      <Hero />
      <Marquee />
      <HowItWorks />
      <Features />
      <PricingTable />

      {/* Final CTA */}
      <section className="py-24 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-4">
            Ready to gate<br />
            <span className="text-[#4ADE80]">your first link?</span>
          </h2>
          <p className="text-zinc-400 text-lg mb-8">Free forever. Takes 30 seconds. No card needed.</p>
          <a href="/login"
            className="inline-flex items-center gap-2 bg-[#4ADE80] text-[#0D0D0D] font-semibold text-[15px] px-7 py-4 rounded-xl hover:bg-[#22c55e] transition-colors">
            Create your free gate
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
      </section>

      <Footer />
    </main>
  )
}
