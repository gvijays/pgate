'use client'
import { useState } from 'react'
import { Gate, GatePassword, GateView, Profile, PLAN_LIMITS } from '@/types'
import { timeAgo, formatDate, truncateUrl } from '@/lib/utils'
import Link from 'next/link'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://pgate.io'

function DeviceIcon({ type }: { type: string }) {
  if (type === 'mobile') return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
  if (type === 'tablet') return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
  return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
}

export default function GateAnalytics({ gate, passwords, views, profile }: {
  gate: Gate; passwords: GatePassword[]; views: GateView[]; profile: Profile | null
}) {
  const plan    = profile?.plan ?? 'free'
  const limits  = PLAN_LIMITS[plan]
  const gateUrl = `${APP_URL}/g/${gate.slug}`
  const [copied, setCopied] = useState(false)
  const [addingPw, setAddingPw] = useState(false)
  const [newLabel, setNewLabel] = useState('')
  const [newPwd,   setNewPwd]   = useState('')

  const successfulViews = views.filter(v => v.is_successful)
  const failedViews     = views.filter(v => !v.is_successful)

  const copy = async () => {
    await navigator.clipboard.writeText(gateUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const addPassword = async () => {
    if (!newLabel || !newPwd) return
    await fetch(`/api/gates/${gate.id}/passwords`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ label: newLabel, password: newPwd }),
    })
    setAddingPw(false); setNewLabel(''); setNewPwd('')
    window.location.reload()
  }

  return (
    <div className="p-6 sm:p-8 max-w-4xl mx-auto">
      {/* Back */}
      <Link href="/dashboard/gates" className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 mb-6 transition-colors">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
        All gates
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
              <Link href="/dashboard/billing" className="text-xs text-[#4ADE80] font-medium">
                Upgrade for full analytics →
              </Link>
            )}
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
            {views.length === 0 ? (
              <div className="py-12 text-center text-zinc-600 text-sm">No views yet. Share your gate link.</div>
            ) : (
              <div className="divide-y divide-zinc-800 max-h-[440px] overflow-y-auto">
                {views.map(view => (
                  <div key={view.id} className="px-4 py-3.5 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs ${view.is_successful ? 'bg-[#4ADE80]/10 text-[#4ADE80]' : 'bg-red-500/10 text-red-400'}`}>
                        {view.is_successful ? '✓' : '✗'}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-zinc-200">
                          {view.password_label ?? (view.is_successful ? 'Unknown' : 'Wrong password')}
                        </p>
                        <p className="text-xs text-zinc-600">{timeAgo(view.viewed_at)}</p>
                      </div>
                    </div>
                    {limits.fullAnalytics && (
                      <div className="flex items-center gap-2 text-zinc-600">
                        {view.country && <span className="text-xs">{view.city ? `${view.city}, ${view.country}` : view.country}</span>}
                        <DeviceIcon type={view.device_type} />
                      </div>
                    )}
                    {!limits.fullAnalytics && (
                      <span className="text-xs text-zinc-700">Details on Maker+</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Passwords panel */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-zinc-300">Passwords</h2>
            <button onClick={() => setAddingPw(!addingPw)} disabled={passwords.length >= limits.maxPasswordsPerGate}
              className="text-xs text-[#4ADE80] font-medium disabled:text-zinc-700 hover:text-[#22c55e] transition-colors">
              + Add
            </button>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
            {addingPw && (
              <div className="px-4 py-3 border-b border-zinc-800 space-y-2">
                <input value={newLabel} onChange={e => setNewLabel(e.target.value)} placeholder="Label"
                  className="w-full bg-zinc-800 border border-zinc-700 text-white text-xs px-3 py-2 rounded-lg outline-none" />
                <input value={newPwd} onChange={e => setNewPwd(e.target.value)} placeholder="Password"
                  className="w-full bg-zinc-800 border border-zinc-700 text-white font-mono text-xs px-3 py-2 rounded-lg outline-none" />
                <div className="flex gap-2">
                  <button onClick={addPassword} className="flex-1 bg-[#4ADE80] text-[#0D0D0D] text-xs font-semibold py-1.5 rounded-lg">Save</button>
                  <button onClick={() => setAddingPw(false)} className="flex-1 border border-zinc-700 text-zinc-500 text-xs py-1.5 rounded-lg">Cancel</button>
                </div>
              </div>
            )}
            <div className="divide-y divide-zinc-800">
              {passwords.map(pw => {
                const pwViews = successfulViews.filter(v => v.password_id === pw.id).length
                return (
                  <div key={pw.id} className="px-4 py-3.5">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-zinc-200">{pw.label}</p>
                      <div className={`w-1.5 h-1.5 rounded-full ${pw.is_active ? 'bg-[#4ADE80]' : 'bg-zinc-600'}`} />
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-mono text-zinc-600">{pw.password_hash.slice(0, 4)}••••</p>
                      <p className="text-xs text-zinc-600">{pwViews} opens</p>
                    </div>
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
