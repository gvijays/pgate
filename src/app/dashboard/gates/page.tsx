import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import GatesList from '@/components/dashboard/GatesList'

export const dynamic = 'force-dynamic'

export default async function GatesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles').select('*').eq('id', user.id).single()

  const { data: gates } = await supabase
    .from('gates')
    .select(`*, password_count:gate_passwords(count), view_count:gate_views(count)`)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  const processedGates = (gates ?? []).map((g: any) => ({
    ...g,
    password_count: g.password_count?.[0]?.count ?? 0,
    view_count:     g.view_count?.[0]?.count ?? 0,
  })) as import('@/types').Gate[]

  // Fetch recent activity across all gates
  const gateIds = processedGates.map(g => g.id)
  let recentActivity: any[] = []
  if (gateIds.length > 0) {
    const { data: activity } = await supabase
      .from('gate_views')
      .select('id, viewed_at, is_successful, device_type, gate_id, gate_passwords(label), gates(title, slug)')
      .in('gate_id', gateIds)
      .order('viewed_at', { ascending: false })
      .limit(8)
    recentActivity = activity ?? []
  }

  return <GatesList gates={processedGates} profile={profile} recentActivity={recentActivity} />
}
