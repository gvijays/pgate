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
    .select(`
      *,
      password_count:gate_passwords(count),
      view_count:gate_views(count)
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const processedGates = (gates ?? []).map((g: any) => ({
    ...g,
    password_count: g.password_count?.[0]?.count ?? 0,
    view_count:     g.view_count?.[0]?.count ?? 0,
  })) as import('@/types').Gate[]

  return <GatesList gates={processedGates} profile={profile} />
}
