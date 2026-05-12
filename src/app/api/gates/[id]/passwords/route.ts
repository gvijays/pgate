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

  const { label, password } = await request.json()
  const hash = await bcrypt.hash(password, 10)
  const expiresAt = limits.customExpiry ? null : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()

  const { error } = await supabase.from('gate_passwords').insert({
    gate_id: id, label, password_hash: hash, expires_at: expiresAt,
  })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
