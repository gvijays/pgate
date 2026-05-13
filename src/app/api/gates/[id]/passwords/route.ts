import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { PLAN_LIMITS } from '@/types'

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: profile } = await supabase.from('profiles').select('plan').eq('id', user.id).single()
  const limits = PLAN_LIMITS[(profile?.plan ?? 'free') as keyof typeof PLAN_LIMITS]

  const { count } = await supabase.from('gate_passwords').select('id', { count: 'exact', head: true }).eq('gate_id', id).eq('is_active', true)
  if ((count ?? 0) >= limits.maxPasswordsPerGate) {
    return NextResponse.json({ error: 'Password limit reached for your plan.' }, { status: 403 })
  }

  const { label, password, expires_at: clientExpiresAt } = await request.json()
  const hash = await bcrypt.hash(password, 10)

  // Free plan: force 30-day auto-expiry (upgrade nudge). Maker/Pro: use what the user chose (null = never).
  const expiresAt = limits.customExpiry
    ? (clientExpiresAt ?? null)
    : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()

  const { error } = await supabase.from('gate_passwords').insert({
    gate_id: id, label, password_hash: hash, expires_at: expiresAt,
  })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const { passwordId, label, password } = body
  if (!passwordId) return NextResponse.json({ error: 'passwordId required' }, { status: 400 })

  // Verify ownership via gate
  const { data: gate } = await supabase.from('gates').select('id').eq('id', id).eq('user_id', user.id).single()
  if (!gate) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { data: profile } = await supabase.from('profiles').select('plan').eq('id', user.id).single()
  const limits = PLAN_LIMITS[(profile?.plan ?? 'free') as keyof typeof PLAN_LIMITS]

  const update: Record<string, unknown> = {}
  if (label !== undefined) update.label = label
  if (password) update.password_hash = await bcrypt.hash(password, 10)
  // Only Maker/Pro can update expiry; key presence in body (even null) means intent to update
  if (limits.customExpiry && 'expires_at' in body) {
    update.expires_at = body.expires_at ?? null
  }

  const { error } = await supabase.from('gate_passwords').update(update).eq('id', passwordId)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { passwordId } = await request.json()
  if (!passwordId) return NextResponse.json({ error: 'passwordId required' }, { status: 400 })

  const { data: gate } = await supabase.from('gates').select('id').eq('id', id).eq('user_id', user.id).single()
  if (!gate) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { error } = await supabase.from('gate_passwords').update({ is_active: false }).eq('id', passwordId)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
