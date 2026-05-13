import { createAdminClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { generateSlug } from '@/lib/utils'

// Creates a temporary anonymous gate — no login required.
// Expires after 7 days. Used for the homepage "try it" flow.
export async function POST(request: Request) {
  const supabase        = await createAdminClient()
  const { url, password } = await request.json()

  if (!url || !password) {
    return NextResponse.json({ error: 'URL and password are required' }, { status: 400 })
  }

  // Ensure URL has a protocol so redirects don't resolve to /g/domain.com
  const normalizedUrl = /^https?:\/\//i.test(url) ? url : `https://${url}`

  const slug      = generateSlug()
  const hash      = await bcrypt.hash(password, 10)
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()

  const { data: gate, error: gateError } = await supabase
    .from('gates')
    .insert({
      user_id:             null,
      target_url:          normalizedUrl,
      slug,
      is_active:           true,
      expires_at:          expiresAt,
      theme_bg_color:      '#0D0D0D',
      theme_card_style:    'dark',
      theme_button_color:  '#4ADE80',
      theme_hide_branding: false,
    })
    .select()
    .single()

  if (gateError) return NextResponse.json({ error: gateError.message }, { status: 500 })

  await supabase.from('gate_passwords').insert({
    gate_id:       gate.id,
    label:         'Default',
    password_hash: hash,
    expires_at:    expiresAt,
  })

  return NextResponse.json({ slug: gate.slug, gateId: gate.id })
}

// Updates the password on an existing anonymous gate.
// Called when user edits the password field after the link is already created.
export async function PATCH(request: Request) {
  const supabase          = await createAdminClient()
  const { gateId, password } = await request.json()

  if (!gateId || !password) {
    return NextResponse.json({ error: 'gateId and password are required' }, { status: 400 })
  }

  const hash = await bcrypt.hash(password, 10)

  const { error } = await supabase
    .from('gate_passwords')
    .update({ password_hash: hash })
    .eq('gate_id', gateId)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
