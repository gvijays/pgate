import { createAdminClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { getDeviceType, hashIp } from '@/lib/utils'
import { resend, FROM } from '@/lib/resend'
import { GateViewedEmail } from '@/lib/emails/gate-viewed'
import { FailedAttemptEmail } from '@/lib/emails/failed-attempt'
import { PLAN_LIMITS } from '@/types'
import React from 'react'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://pgate.io'

export async function POST(request: Request) {
  const supabase  = await createAdminClient()
  const body      = await request.json()
  const { slug, password } = body

  // Get gate
  const { data: gate } = await supabase.from('gates').select('*').eq('slug', slug).single()
  if (!gate) return NextResponse.json({ success: false })

  // Get active passwords
  const { data: passwords } = await supabase
    .from('gate_passwords')
    .select('*')
    .eq('gate_id', gate.id)
    .eq('is_active', true)

  // Get request metadata
  const forwarded = request.headers.get('x-forwarded-for')
  const ip        = forwarded?.split(',')[0].trim() ?? 'unknown'
  const ua        = request.headers.get('user-agent') ?? ''
  const deviceType = getDeviceType(ua)
  const ipHash    = hashIp(ip)

  // Geo lookup — Vercel headers in prod, ip-api.com fallback otherwise
  let country = request.headers.get('x-vercel-ip-country') ?? null
  let city    = request.headers.get('x-vercel-ip-city') ?? null

  if (!country && ip !== 'unknown' && ip !== '127.0.0.1' && ip !== '::1' && !ip.startsWith('192.168.') && !ip.startsWith('10.')) {
    try {
      const geo = await fetch(`http://ip-api.com/json/${ip}?fields=status,country,countryCode,city`, { signal: AbortSignal.timeout(2000) })
      if (geo.ok) {
        const data = await geo.json()
        if (data.status === 'success') {
          country = data.countryCode ?? null
          city    = data.city ?? null
        }
      }
    } catch { /* best-effort, ignore */ }
  }

  // Check each password
  let matchedPassword = null
  let expiredMatch    = false
  for (const pw of passwords ?? []) {
    const match = await bcrypt.compare(password, pw.password_hash)
    if (!match) continue
    if (pw.expires_at && new Date(pw.expires_at) < new Date()) {
      expiredMatch = true   // correct password, but it has expired
      break
    }
    matchedPassword = pw
    break
  }

  // Record view
  await supabase.from('gate_views').insert({
    gate_id:     gate.id,
    password_id: matchedPassword?.id ?? null,
    viewed_at:   new Date().toISOString(),
    country,
    city,
    device_type: deviceType,
    ip_hash:     ipHash,
    is_successful: !!matchedPassword,
  })

  if (!matchedPassword) {
    // Failed attempt — check if Maker+ and send alert
    const { data: profile } = await supabase.from('profiles').select('*').eq('id', gate.user_id).single()
    const plan    = (profile?.plan ?? 'free') as keyof typeof PLAN_LIMITS
    const limits  = PLAN_LIMITS[plan]
    const { count } = await supabase.from('gate_views').select('id', { count: 'exact', head: true })
      .eq('gate_id', gate.id).eq('is_successful', false).eq('ip_hash', ipHash)

    if (limits.failedAttemptAlerts && profile?.email && (count ?? 0) % 3 === 0) {
      try {
        await resend.emails.send({
          from: FROM,
          to: profile.email,
          subject: `Failed access attempt on: ${gate.title ?? gate.slug}`,
          react: React.createElement(FailedAttemptEmail, {
            ownerName: profile.full_name ?? profile.email,
            gateTitle: gate.title ?? gate.slug,
            gateUrl: `${APP_URL}/dashboard/gates/${gate.id}`,
            attempts: count ?? 1,
            country: country ?? undefined,
          }),
        })
      } catch (e) { console.error('Email error:', e) }
    }
    return NextResponse.json({ success: false, reason: expiredMatch ? 'expired' : 'wrong' })
  }

  // Send view notification email (Maker+)
  try {
    const { data: profile } = await supabase.from('profiles').select('*').eq('id', gate.user_id).single()
    const plan   = (profile?.plan ?? 'free') as keyof typeof PLAN_LIMITS
    const limits = PLAN_LIMITS[plan]

    if (limits.emailNotifications && profile?.email) {
      const isPro = limits.customBranding
      await resend.emails.send({
        from: FROM,
        to: profile.email,
        subject: `${matchedPassword.label} opened your gate: ${gate.title ?? gate.slug}`,
        react: React.createElement(GateViewedEmail, {
          ownerName:      profile.full_name ?? profile.email,
          gateTitle:      gate.title ?? gate.slug,
          gateUrl:        `${APP_URL}/dashboard/gates/${gate.id}`,
          recipientLabel: matchedPassword.label,
          viewedAt:       new Date().toLocaleString('en-US', { timeZone: 'UTC' }) + ' UTC',
          country:        country ?? undefined,
          city:           city ?? undefined,
          device:         deviceType,
          isPro,
        }),
      })
    }
  } catch (e) { console.error('Email error:', e) }

  return NextResponse.json({ success: true, redirectUrl: gate.target_url })
}
