import { createClient } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'
import GateAnalytics from '@/components/dashboard/GateAnalytics'

export default async function GateAnalyticsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()
  const { data: gate }    = await supabase.from('gates').select('*').eq('id', id).eq('user_id', user.id).single()
  if (!gate) notFound()

  const { data: passwords } = await supabase.from('gate_passwords').select('*').eq('gate_id', id).order('created_at')
  const { data: views }     = await supabase.from('gate_views').select('*, gate_passwords(label)').eq('gate_id', id).order('viewed_at', { ascending: false }).limit(100)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const processedViews = (views ?? []).map((v: any) => ({
    ...v,
    password_label: v.gate_passwords?.label ?? null,
  })) as import('@/types').GateView[]

  return <GateAnalytics gate={gate} passwords={passwords ?? []} views={processedViews} profile={profile} />
}
