import Nav from '@/components/home/Nav'
import PricingTable from '@/components/home/PricingTable'
import Footer from '@/components/home/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Simple, affordable pricing for pgate. Free forever, upgrade when you need more.',
}

export default function PricingPage() {
  return (
    <main className="bg-[#0D0D0D] min-h-screen">
      <Nav />
      <div className="pt-24">
        <PricingTable />
      </div>
      <Footer />
    </main>
  )
}
