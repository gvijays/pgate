import { createAdminClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

function getPlanFromPriceId(priceId: string): string {
  const map: Record<string, string> = {
    [process.env.NEXT_PUBLIC_PADDLE_MAKER_MONTHLY!]: 'maker_monthly',
    [process.env.NEXT_PUBLIC_PADDLE_MAKER_ANNUAL!]:  'maker_annual',
    [process.env.NEXT_PUBLIC_PADDLE_PRO_MONTHLY!]:   'pro_monthly',
    [process.env.NEXT_PUBLIC_PADDLE_PRO_ANNUAL!]:    'pro_annual',
  }
  return map[priceId] ?? 'maker_monthly'
}

function getPlanTier(subscriptionPlan: string): 'free' | 'maker' | 'pro' {
  if (subscriptionPlan.startsWith('pro')) return 'pro'
  if (subscriptionPlan.startsWith('maker')) return 'maker'
  return 'free'
}

export async function POST(request: Request) {
  const body = await request.text()
  const event = JSON.parse(body)
  const supabase = await createAdminClient()

  const type = event.event_type
  const data = event.data

  if (!data) return NextResponse.json({ ok: true })

  // Get user by email from Paddle customer
  const customerEmail = data?.customer?.email ?? data?.billing_details?.email
  let userId: string | null = null

  if (customerEmail) {
    const { data: users } = await supabase.auth.admin.listUsers()
    const user = users?.users.find(u => u.email === customerEmail)
    userId = user?.id ?? null
  }

  if (!userId) {
    console.error('Paddle webhook: could not match user for email', customerEmail)
    return NextResponse.json({ ok: true })
  }

  if (type === 'subscription.created' || type === 'subscription.updated') {
    const priceId  = data.items?.[0]?.price?.id
    const plan     = getPlanFromPriceId(priceId)
    const planTier = getPlanTier(plan)

    await supabase.from('subscriptions').upsert({
      user_id:                userId,
      paddle_subscription_id: data.id,
      paddle_customer_id:     data.customer_id,
      price_id:               priceId,
      plan,
      status:                 data.status,
      current_period_end:     data.current_billing_period?.ends_at ?? null,
      updated_at:             new Date().toISOString(),
    }, { onConflict: 'paddle_subscription_id' })

    await supabase.from('profiles').update({ plan: planTier }).eq('id', userId)
  }

  if (type === 'subscription.cancelled' || type === 'subscription.paused') {
    await supabase.from('subscriptions')
      .update({ status: data.status === 'paused' ? 'paused' : 'cancelled', updated_at: new Date().toISOString() })
      .eq('paddle_subscription_id', data.id)

    // Downgrade to free on cancel
    if (type === 'subscription.cancelled') {
      await supabase.from('profiles').update({ plan: 'free' }).eq('id', userId)
    }
  }

  return NextResponse.json({ ok: true })
}
