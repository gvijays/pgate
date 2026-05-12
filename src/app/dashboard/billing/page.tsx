import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import BillingPage from '@/components/dashboard/BillingPage'

export default async function Billing() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')
  const { data: profile }      = await supabase.from('profiles').select('*').eq('id', user.id).single()
  const { data: subscription } = await supabase.from('subscriptions').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(1).single()
  return <BillingPage profile={profile} subscription={subscription} />
}
