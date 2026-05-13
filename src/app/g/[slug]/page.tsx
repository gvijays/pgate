import { createAdminClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import GatePage from '@/components/gate/GatePage'

export const dynamic = 'force-dynamic'

export default async function PublicGatePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createAdminClient()

  const { data: gate } = await supabase
    .from('gates')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single()

  if (!gate) notFound()

  // Check expiry
  if (gate.expires_at && new Date(gate.expires_at) < new Date()) notFound()

  return <GatePage gate={gate} />
}
