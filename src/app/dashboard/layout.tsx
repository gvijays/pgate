import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Sidebar from '@/components/dashboard/Sidebar'
import MobileNav from '@/components/dashboard/MobileNav'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()

  return (
    <div className="flex h-screen bg-[#0D0D0D] overflow-hidden">
      {/* Sidebar — desktop only */}
      <div className="hidden md:flex">
        <Sidebar profile={profile} />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile top bar */}
        <header className="md:hidden flex items-center justify-between px-4 h-12 border-b border-zinc-900 flex-shrink-0">
          <a href="/" className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-[#4ADE80] flex items-center justify-center">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#0D0D0D" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            </div>
            <span className="font-bold text-white text-[15px] tracking-tight">pgate</span>
          </a>
          <span className="text-[11px] text-zinc-600 font-medium">
            {profile?.full_name ?? profile?.email ?? ''}
          </span>
        </header>

        {/* Main content — Onest for all headings inside dashboard */}
        <main className="flex-1 overflow-y-auto pb-20 md:pb-0 [&_h1]:font-sans [&_h2]:font-sans [&_h3]:font-sans [&_h4]:font-sans [&_h5]:font-sans">
          {children}
        </main>
      </div>

      {/* Bottom nav — mobile only */}
      <MobileNav profile={profile} />
    </div>
  )
}
