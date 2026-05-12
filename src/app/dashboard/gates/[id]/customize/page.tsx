import { createClient } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'
import GateCustomizer from '@/components/dashboard/GateCustomizer'

export default async function CustomizePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')
  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()
  const { data: gate }    = await supabase.from('gates').select('*').eq('id', id).eq('user_id', user.id).single()
  if (!gate) notFound()

  return <GateCustomizer gate={gate} profile={profile} />
}
