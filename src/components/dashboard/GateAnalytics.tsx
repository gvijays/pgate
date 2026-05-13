'use client'
import { useState } from 'react'
import { Gate, GatePassword, GateView, Profile, PLAN_LIMITS } from '@/types'
import { timeAgo, formatDate, truncateUrl } from '@/lib/utils'
import Link from 'next/link'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://pgate.io'

type ExpiryPreset = 'none' | '1d' | '1w' | '30d' | 'custom'

function computeExpiresAt(preset: ExpiryPreset, customDate: string): string | null {
  const now = Date.now()
  if (preset === '1d')     return new Date(now + 1  * 24 * 60 * 60 * 1000).toISOString()
  if (preset === '1w')     return new Date(now + 7  * 24 * 60 * 60 * 1000).toISOString()
  if (preset === '30d')    return new Date(now + 30 * 24 * 60 * 60 * 1000).toISOString()
  if (preset === 'custom' && customDate) return new Date(customDate).toISOString()
  return null
}

function formatExpiryDate(iso: string | null): string | null {
  if (!iso) return null
  return new Date(iso).toLocaleString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric', year: 'numeric',
    hour: 'numeric', minute: '2-digit', hour12: true,
  })
}

function ExpiryBadge({ expiresAt }: { expiresAt: string | null }) {
  if (!expiresAt) return null
  const isExpired = new Date(expiresAt) < new Date()
  const dateStr = new Date(expiresAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  return (
    <span className={`text-[10px] font-medium ${isExpired ? 'text-red-400' : 'text-zinc-500'}`}>
      {isExpired ? '⚠ Expired' : `Expires ${dateStr}`}
    </span>
  )
}

// Preset chip row + split date/time inputs, shown inside add/edit forms
function ExpiryPicker({ preset, customDate, onPresetChange, onCustomDateChange }: {
  preset: ExpiryPreset
  customDate: string        // "YYYY-MM-DDTHH:mm" or ""
  onPresetChange: (p: ExpiryPreset) => void
  onCustomDateChange: (d: string) => void
}) {
  const presets: { key: ExpiryPreset; label: string }[] = [
    { key: 'none',   label: 'No expiry' },
    { key: '1d',     label: '1 day' },
    { key: '1w',     label: '1 week' },
    { key: '30d',    label: '30 days' },
    { key: 'custom', label: 'Custom…' },
  ]

  // Split stored string into parts for the two separate inputs
  const datePart = customDate.length >= 10 ? customDate.slice(0, 10) : ''
  const timePart = customDate.length >= 16 ? customDate.slice(11, 16) : '00:00'
  const today    = new Date().toISOString().slice(0, 10)

  const handleDate = (d: string) => onCustomDateChange(d + 'T' + timePart)
  const handleTime = (t: string) => onCustomDateChange((datePart || today) + 'T' + t)

  const iso       = computeExpiresAt(preset, customDate)
  const humanDate = formatExpiryDate(iso)

  const inputCls = 'w-full bg-zinc-800 border border-zinc-700 text-white text-xs px-3 py-2 rounded-lg outline-none focus:border-[#4ADE80]/40'

  return (
    <div>
      <p className="text-[10px] text-zinc-500 mb-1.5">Expiry</p>
      <div className="flex flex-wrap gap-1.5 mb-2">
        {presets.map(p => (
          <button key={p.key} type="button"
            onClick={() => onPresetChange(p.key)}
            className={`text-[11px] px-2.5 py-1 rounded-lg border font-medium transition-all ${
              preset === p.key
                ? 'bg-[#4ADE80]/10 border-[#4ADE80]/40 text-[#4ADE80]'
                : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:text-zinc-200'
            }`}>
            {p.label}
          </button>
        ))}
      </div>

      {preset === 'custom' && (
        <div className="grid grid-cols-2 gap-2 mb-1.5">
          <input
            type="date"
            value={datePart}
            min={today}
            onChange={e => handleDate(e.target.value)}
            style={{ colorScheme: 'dark' }}
            className={inputCls}
          />
          <input
            type="time"
            value={timePart}
            onChange={e => handleTime(e.target.value)}
            style={{ colorScheme: 'dark' }}
            className={inputCls}
          />
        </div>
      )}

      {preset !== 'none' && humanDate && (
        <p className="text-[10px] text-[#4ADE80]/80 flex items-center gap-1 mt-1">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
          Expires on {humanDate}
        </p>
      )}
    </div>
  )
}

function DeviceIcon({ type }: { type: string }) {
  if (type === 'mobile') return <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
  if (type === 'tablet') return <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
  return <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
}

export default function GateAnalytics({ gate, passwords, views, profile }: {
  gate: Gate; passwords: GatePassword[]; views: GateView[]; profile: Profile | null
}) {
  const plan    = profile?.plan ?? 'free'
  const limits  = PLAN_LIMITS[plan]
  const gateUrl = `${APP_URL}/g/${gate.slug}`
  const [copied, setCopied] = useState(false)
  const [addingPw,      setAddingPw]      = useState(false)
  const [newLabel,      setNewLabel]      = useState('')
  const [newPwd,        setNewPwd]        = useState('')
  const [newExpiry,     setNewExpiry]     = useState<ExpiryPreset>('none')
  const [newCustomDate, setNewCustomDate] = useState('')
  const [editingId,     setEditingId]     = useState<string | null>(null)
  const [editLabel,     setEditLabel]     = useState('')
  const [editPwd,       setEditPwd]       = useState('')
  const [editExpiry,    setEditExpiry]    = useState<ExpiryPreset>('none')
  const [editCustomDate,setEditCustomDate]= useState('')

  const successfulViews = views.filter(v => v.is_successful)
  const failedViews     = views.filter(v => !v.is_successful)

  const copy = async () => {
    await navigator.clipboard.writeText(gateUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const addPassword = async () => {
    if (!newLabel || !newPwd) return
    const expires_at = limits.customExpiry ? computeExpiresAt(newExpiry, newCustomDate) : undefined
    await fetch(`/api/gates/${gate.id}/passwords`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ label: newLabel, password: newPwd, ...(limits.customExpiry && { expires_at }) }),
    })
    setAddingPw(false); setNewLabel(''); setNewPwd(''); setNewExpiry('none'); setNewCustomDate('')
    window.location.reload()
  }

  const startEdit = (pw: GatePassword) => {
    setEditingId(pw.id)
    setEditLabel(pw.label)
    setEditPwd('')
    if (!pw.expires_at) {
      setEditExpiry('none'); setEditCustomDate('')
    } else {
      // Pre-fill as custom showing the existing date
      setEditExpiry('custom')
      // Convert ISO to datetime-local string (local time)
      const local = new Date(pw.expires_at)
      const offset = local.getTimezoneOffset() * 60000
      setEditCustomDate(new Date(local.getTime() - offset).toISOString().slice(0, 16))
    }
  }

  const saveEdit = async (passwordId: string) => {
    const expires_at = limits.customExpiry ? computeExpiresAt(editExpiry, editCustomDate) : undefined
    await fetch(`/api/gates/${gate.id}/passwords`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        passwordId,
        label: editLabel,
        password: editPwd || undefined,
        ...(limits.customExpiry && { expires_at }),
      }),
    })
    setEditingId(null)
    window.location.reload()
  }

  const deletePassword = async (passwordId: string) => {
    if (!confirm('Revoke this password? Recipients using it will lose access.')) return
    await fetch(`/api/gates/${gate.id}/passwords`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ passwordId }),
    })
    window.location.reload()
  }

  return (
    <div className="p-6 sm:p-8 max-w-4xl mx-auto">
      {/* Back */}
      <Link href="/dashboard/gates" className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 mb-6 transition-colors">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
        Back to links
      </Link>

      {/* Gate header */}
      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className={`w-2 h-2 rounded-full ${gate.is_active ? 'bg-[#4ADE80]' : 'bg-zinc-600'}`} />
            <h1 className="text-xl font-bold text-white">{gate.title ?? truncateUrl(gate.target_url)}</h1>
          </div>
          <p className="text-zinc-600 text-sm">{truncateUrl(gate.target_url, 60)}</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button onClick={copy}
            className="text-xs px-3 py-2 rounded-lg font-medium border transition-all bg-zinc-800 border-zinc-700 text-zinc-400 hover:text-zinc-200">
            {copied ? '✓ Copied' : 'Copy link'}
          </button>
          <Link href={`/dashboard/gates/${gate.id}/customize`}
            className="text-xs px-3 py-2 rounded-lg font-medium border bg-zinc-800 border-zinc-700 text-zinc-400 hover:text-zinc-200 transition-colors">
            Customize
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {[
          { label: 'Total views', value: successfulViews.length },
          { label: 'Failed attempts', value: failedViews.length },
          { label: 'Passwords active', value: passwords.filter(p => p.is_active).length },
          { label: 'Created', value: formatDate(gate.created_at) },
        ].map(s => (
          <div key={s.label} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
            <p className="text-xl font-bold text-white">{s.value}</p>
            <p className="text-xs text-zinc-600 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Views feed */}
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-zinc-300">View activity</h2>
            {!limits.fullAnalytics && (
              <Link href="/dashboard/billing" className="text-xs text-amber-400 font-medium hover:text-amber-300 transition-colors">
                ✦ Upgrade for full details →
              </Link>
            )}
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
            {views.length === 0 ? (
              <div className="py-12 text-center text-zinc-600 text-sm">No views yet. Share your gate link.</div>
            ) : (
              <div className="divide-y divide-zinc-800 max-h-[440px] overflow-y-auto">
                {views.map(view => (
                  <div key={view.id} className="px-4 py-3.5">
                    <div className="flex items-start justify-between gap-3">
                      {/* Left: status + label */}
                      <div className="flex items-center gap-3">
                        <div className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold ${view.is_successful ? 'bg-[#4ADE80]/10 text-[#4ADE80]' : 'bg-red-500/10 text-red-400'}`}>
                          {view.is_successful ? '✓' : '✗'}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-zinc-200">
                            {view.password_label ?? (view.is_successful ? 'Unknown password' : 'Wrong password')}
                          </p>
                          {/* Time — always visible */}
                          <p className="text-xs text-zinc-500 mt-0.5">{formatDate(view.viewed_at)} · {timeAgo(view.viewed_at)}</p>
                        </div>
                      </div>

                      {/* Right: location + device (maker+) or locked hint */}
                      {limits.fullAnalytics ? (
                        <div className="flex flex-col items-end gap-1 flex-shrink-0">
                          {(view.city || view.country) ? (
                            <div className="flex items-center gap-1 text-zinc-400">
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                              <span className="text-xs">{view.city ? `${view.city}, ${view.country}` : view.country}</span>
                            </div>
                          ) : (
                            <span className="text-xs text-zinc-700">Location unknown</span>
                          )}
                          <div className="flex items-center gap-1 text-zinc-600">
                            <DeviceIcon type={view.device_type} />
                            <span className="text-xs capitalize">{view.device_type}</span>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-end gap-1 flex-shrink-0 select-none">
                          <div className="flex items-center gap-1 text-zinc-700">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                            <span className="text-xs blur-[3px]">New York, US</span>
                          </div>
                          <div className="flex items-center gap-1 text-zinc-700">
                            <DeviceIcon type="desktop" />
                            <span className="text-xs blur-[3px]">Desktop</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Upgrade nudge for free */}
          {!limits.fullAnalytics && views.length > 0 && (
            <div className="mt-3 bg-zinc-900 border border-amber-500/20 rounded-xl px-4 py-3 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-zinc-300">Location &amp; device data is blurred</p>
                <p className="text-xs text-zinc-600 mt-0.5">Upgrade to Maker to see where and how recipients open your links</p>
              </div>
              <Link href="/dashboard/billing"
                className="text-xs font-semibold bg-amber-400 text-zinc-900 px-3 py-1.5 rounded-lg hover:bg-amber-300 transition-colors flex-shrink-0 ml-4">
                Upgrade
              </Link>
            </div>
          )}
        </div>

        {/* Passwords panel */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold text-zinc-300">Passwords</h2>
              <span className="text-xs text-zinc-600">{passwords.filter(p => p.is_active).length}/{limits.maxPasswordsPerGate}</span>
            </div>
            {passwords.length >= limits.maxPasswordsPerGate ? (
              <Link href="/dashboard/billing" className="text-xs text-amber-400 font-medium hover:text-amber-300 transition-colors">
                ✦ Upgrade for more
              </Link>
            ) : (
              <button onClick={() => setAddingPw(!addingPw)}
                className="text-xs text-[#4ADE80] font-medium hover:text-[#22c55e] transition-colors">
                + Add
              </button>
            )}
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
            {addingPw && (
              <div className="px-4 py-3 border-b border-zinc-800 space-y-2">
                <input value={newLabel} onChange={e => setNewLabel(e.target.value)} placeholder="Label (e.g. Stripe Team)"
                  className="w-full bg-zinc-800 border border-zinc-700 text-white text-xs px-3 py-2 rounded-lg outline-none focus:border-[#4ADE80]/40" />
                <input value={newPwd} onChange={e => setNewPwd(e.target.value)} placeholder="Password"
                  className="w-full bg-zinc-800 border border-zinc-700 text-white font-mono text-xs px-3 py-2 rounded-lg outline-none focus:border-[#4ADE80]/40" />
                {limits.customExpiry ? (
                  <ExpiryPicker
                    preset={newExpiry} customDate={newCustomDate}
                    onPresetChange={setNewExpiry} onCustomDateChange={setNewCustomDate}
                  />
                ) : (
                  <p className="text-[10px] text-zinc-600 flex items-center gap-1">
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                    Auto-expires in 30 days ·{' '}
                    <Link href="/dashboard/billing" className="text-amber-400 hover:text-amber-300">Upgrade for custom expiry</Link>
                  </p>
                )}
                <div className="flex gap-2 pt-1">
                  <button onClick={addPassword} className="flex-1 bg-[#4ADE80] text-[#0D0D0D] text-xs font-semibold py-1.5 rounded-lg">Save</button>
                  <button onClick={() => { setAddingPw(false); setNewExpiry('none'); setNewCustomDate('') }}
                    className="flex-1 border border-zinc-700 text-zinc-500 text-xs py-1.5 rounded-lg">Cancel</button>
                </div>
              </div>
            )}
            <div className="divide-y divide-zinc-800">
              {passwords.map(pw => {
                const pwViews = successfulViews.filter(v => v.password_id === pw.id).length
                const isEditing = editingId === pw.id
                return (
                  <div key={pw.id} className="px-4 py-3.5">
                    {isEditing ? (
                      <div className="space-y-2">
                        <input value={editLabel} onChange={e => setEditLabel(e.target.value)}
                          placeholder="Label" className="w-full bg-zinc-800 border border-zinc-700 text-white text-xs px-3 py-2 rounded-lg outline-none focus:border-[#4ADE80]/40" />
                        <input value={editPwd} onChange={e => setEditPwd(e.target.value)}
                          placeholder="New password (leave blank to keep)" type="password"
                          className="w-full bg-zinc-800 border border-zinc-700 text-white font-mono text-xs px-3 py-2 rounded-lg outline-none focus:border-[#4ADE80]/40" />
                        {limits.customExpiry ? (
                          <ExpiryPicker
                            preset={editExpiry} customDate={editCustomDate}
                            onPresetChange={setEditExpiry} onCustomDateChange={setEditCustomDate}
                          />
                        ) : (
                          <p className="text-[10px] text-zinc-600 flex items-center gap-1">
                            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                            <Link href="/dashboard/billing" className="text-amber-400 hover:text-amber-300">Upgrade for custom expiry</Link>
                          </p>
                        )}
                        <div className="flex gap-2 pt-1">
                          <button onClick={() => saveEdit(pw.id)} className="flex-1 bg-[#4ADE80] text-[#0D0D0D] text-xs font-semibold py-1.5 rounded-lg">Save</button>
                          <button onClick={() => setEditingId(null)} className="flex-1 border border-zinc-700 text-zinc-500 text-xs py-1.5 rounded-lg">Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm font-medium text-zinc-200">{pw.label}</p>
                          <div className="flex items-center gap-2">
                            <div className={`w-1.5 h-1.5 rounded-full ${pw.is_active ? 'bg-[#4ADE80]' : 'bg-zinc-600'}`} />
                            {/* Edit */}
                            <button onClick={() => startEdit(pw)}
                              className="text-zinc-600 hover:text-zinc-300 transition-colors" title="Edit">
                              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                            </button>
                            {/* Delete */}
                            <button onClick={() => deletePassword(pw.id)}
                              className="text-zinc-700 hover:text-red-400 transition-colors" title="Revoke">
                              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/></svg>
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-mono text-zinc-600">••••••••</p>
                          <div className="flex items-center gap-2">
                            <ExpiryBadge expiresAt={pw.expires_at} />
                            <p className="text-xs text-zinc-600">{pwViews} opens</p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
