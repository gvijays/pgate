'use client'
import { useState } from 'react'
import { Gate, Profile, PLAN_LIMITS } from '@/types'
import { timeAgo, truncateUrl, cn } from '@/lib/utils'
import Link from 'next/link'
import CreateGateModal from './CreateGateModal'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://pgate.io'

function GateCard({ gate, onCopy }: { gate: Gate; onCopy: (slug: string) => void }) {
  const gateUrl = `${APP_URL}/g/${gate.slug}`
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(gateUrl)
    setCopied(true); onCopy(gate.slug)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 hover:border-zinc-700 transition-colors">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <div className={`w-2 h-2 rounded-full ${gate.is_active ? 'bg-[#4ADE80]' : 'bg-zinc-600'}`} />
            <p className="text-sm font-semibold text-white truncate">{gate.title ?? truncateUrl(gate.target_url)}</p>
          </div>
          <p className="text-xs text-zinc-600 truncate">{truncateUrl(gate.target_url)}</p>
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <button onClick={copy}
            className={cn('text-xs px-2.5 py-1 rounded-lg font-medium transition-all border',
              copied ? 'bg-[#4ADE80]/10 text-[#4ADE80] border-[#4ADE80]/20' : 'bg-zinc-800 text-zinc-400 border-zinc-700 hover:text-zinc-200')}>
            {copied ? 'Copied!' : 'Copy link'}
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-1.5">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#52525b" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          <span className="text-xs text-zinc-500">{gate.view_count ?? 0} views</span>
        </div>
        <div className="flex items-center gap-1.5">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#52525b" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          <span className="text-xs text-zinc-500">{gate.password_count ?? 0} passwords</span>
        </div>
        <span className="text-xs text-zinc-700 ml-auto">{timeAgo(gate.created_at)}</span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <Link href={`/dashboard/gates/${gate.id}`}
          className="flex-1 text-center text-xs font-medium bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-600 py-2 rounded-lg transition-colors">
          Analytics
        </Link>
        <Link href={`/dashboard/gates/${gate.id}/customize`}
          className="flex-1 text-center text-xs font-medium bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-600 py-2 rounded-lg transition-colors">
          Customize
        </Link>
        <a href={gateUrl} target="_blank" rel="noopener noreferrer"
          className="px-3 py-2 bg-zinc-800 border border-zinc-700 text-zinc-500 hover:text-zinc-300 rounded-lg transition-colors">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
        </a>
      </div>
    </div>
  )
}

export default function GatesList({ gates, profile }: { gates: Gate[]; profile: Profile | null }) {
  const [showCreate, setShowCreate] = useState(false)
  const plan   = profile?.plan ?? 'free'
  const limits = PLAN_LIMITS[plan]
  const atLimit = gates.length >= limits.maxGates

  return (
    <div className="p-6 sm:p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-bold text-white">Your Gates</h1>
          <p className="text-zinc-500 text-sm mt-0.5">
            {gates.length} of {limits.maxGates === Infinity ? 'unlimited' : limits.maxGates} gates used
          </p>
        </div>
        <button onClick={() => setShowCreate(true)} disabled={atLimit}
          className={cn(
            'flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors',
            atLimit
              ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed border border-zinc-700'
              : 'bg-[#4ADE80] text-[#0D0D0D] hover:bg-[#22c55e]'
          )}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          {atLimit ? 'Limit reached' : 'New gate'}
        </button>
      </div>

      {/* Upgrade nudge if at limit */}
      {atLimit && plan !== 'pro' && (
        <div className="bg-zinc-900 border border-zinc-700 rounded-xl px-5 py-4 flex items-center justify-between mb-6">
          <div>
            <p className="text-sm font-semibold text-white">You've used all your gates</p>
            <p className="text-xs text-zinc-500 mt-0.5">Upgrade to create more</p>
          </div>
          <Link href="/dashboard/billing"
            className="text-sm font-semibold bg-[#4ADE80] text-[#0D0D0D] px-4 py-2 rounded-lg hover:bg-[#22c55e] transition-colors">
            Upgrade
          </Link>
        </div>
      )}

      {/* Gates grid */}
      {gates.length === 0 ? (
        <div className="border border-dashed border-zinc-800 rounded-2xl py-16 text-center">
          <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto mb-4">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4ADE80" strokeWidth="1.8"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          </div>
          <p className="text-zinc-300 font-semibold mb-1">No gates yet</p>
          <p className="text-zinc-600 text-sm mb-5">Create your first gate to get started.</p>
          <button onClick={() => setShowCreate(true)}
            className="bg-[#4ADE80] text-[#0D0D0D] font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-[#22c55e] transition-colors">
            Create gate
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {gates.map(gate => <GateCard key={gate.id} gate={gate} onCopy={() => {}} />)}
        </div>
      )}

      {showCreate && (
        <CreateGateModal
          profile={profile}
          onClose={() => setShowCreate(false)}
          onCreated={() => { setShowCreate(false); window.location.reload() }}
        />
      )}
    </div>
  )
}
