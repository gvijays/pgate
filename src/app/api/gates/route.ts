import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { PLAN_LIMITS } from '@/types'
import { resend, FROM } from '@/lib/resend'
import { GateCreatedEmail } from '@/lib/emails/gate-created'
import React from 'react'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://pgate.io'

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()
  const plan   = (profile?.plan ?? 'free') as keyof typeof PLAN_LIMITS
  const limits = PLAN_LIMITS[plan]

  // Check gate limit
  const { count } = await supabase.from('gates').select('id', { count: 'exact', head: true }).eq('user_id', user.id)
  if ((count ?? 0) >= limits.maxGates) {
    return NextResponse.json({ error: 'Gate limit reached. Upgrade to create more.' }, { status: 403 })
  }

  const body = await request.json()
  const { url, title, slug, passwords } = body

  if (!url || !slug) return NextResponse.json({ error: 'URL and slug are required' }, { status: 400 })

  // Create gate
  const { data: gate, error: gateErr } = await supabase.from('gates').insert({
    user_id: user.id, title, target_url: url, slug, is_active: true,
  }).select().single()

  if (gateErr) {
    if (gateErr.code === '23505') return NextResponse.json({ error: 'That slug is already taken. Try another.' }, { status: 409 })
    return NextResponse.json({ error: gateErr.message }, { status: 500 })
  }

  // Create passwords
  const pwCount = Math.min(passwords?.length ?? 0, limits.maxPasswordsPerGate)
  for (let i = 0; i < pwCount; i++) {
    const pw = passwords[i]
    const hash = await bcrypt.hash(pw.password, 10)
    const expiresAt = limits.customExpiry ? null : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    await supabase.from('gate_passwords').insert({
      gate_id: gate.id, label: pw.label, password_hash: hash, expires_at: expiresAt,
    })
  }

  // Send confirmation email
  const gateUrl = `${APP_URL}/dashboard/gates/${gate.id}`
  const publicUrl = `${APP_URL}/g/${gate.slug}`
  try {
    await resend.emails.send({
      from: FROM,
      to: user.email!,
      subject: `Your gate is live: ${title || slug}`,
      react: React.createElement(GateCreatedEmail, {
        userName: profile?.full_name ?? user.email ?? 'there',
        gateTitle: title || slug,
        gateUrl: publicUrl,
        passwordCount: pwCount,
      }),
    })
  } catch (e) { console.error('Email error:', e) }

  return NextResponse.json({ gate, url: publicUrl })
}
