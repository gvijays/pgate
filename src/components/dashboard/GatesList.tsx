'use client'
import { useState } from 'react'
import { Gate, Profile, PLAN_LIMITS } from '@/types'
import { timeAgo, truncateUrl, cn } from '@/lib/utils'
import Link from 'next/link'
import CreateGateModal from './CreateGateModal'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://pgate.io'

/* ── Activity feed ──────────────────────────────── */
type Activity = {
  id: string
  viewed_at: string
  is_successful: boolean
  device_type: string
  gate_id: string
  gate_passwords?: { label: string } | null
  gates?: { title: string | null; slug: string } | null
}

function ActivityFeed({ activities }: { activities: Activity[] }) {
  if (activities.length === 0) return null
  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-zinc-300">Recent activity</h2>
        <span className="text-xs text-zinc-500">Across all links</span>
      </div>
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl divide-y divide-zinc-800 overflow-hidden">
        {activities.map(a => {
          const label   = a.gate_passwords?.label
          const title   = a.gates?.title ?? a.gates?.slug ?? 'Untitled'
          const gateId  = a.gate_id
          return (
            <Link
              key={a.id}
              href={`/dashboard/gates/${gateId}`}
              className="flex items-center gap-3 px-4 py-3 hover:bg-zinc-800/50 transition-colors group"
            >
              {/* Status dot */}
              <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${a.is_successful ? 'bg-[#4ADE80]' : 'bg-red-400'}`} />

              {/* Label + link name */}
              <div className="flex-1 min-w-0 flex items-center gap-1.5">
                <span className={`text-sm font-medium truncate ${a.is_successful ? 'text-zinc-200' : 'text-zinc-500'}`}>
                  {label ?? (a.is_successful ? 'Unknown' : 'Wrong password')}
                </span>
                <span className="text-zinc-500 text-xs flex-shrink-0">on</span>
                <span className="text-xs text-zinc-400 truncate">{title}</span>
              </div>

              {/* Time */}
              <span className="text-xs text-zinc-400 flex-shrink-0">{timeAgo(a.viewed_at)}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

/* ── Gate card ──────────────────────────────────── */
function GateCard({ gate }: { gate: Gate }) {
  const gateUrl = `${APP_URL}/g/${gate.slug}`
  const [copied, setCopied]           = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [deleting, setDeleting]       = useState(false)

  const copy = async (e: React.MouseEvent) => {
    e.preventDefault()
    await navigator.clipboard.writeText(gateUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const deleteGate = async () => {
    setDeleting(true)
    await fetch(`/api/gates/${gate.id}`, { method: 'DELETE' })
    window.location.reload()
  }

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-700 transition-all duration-200 group flex flex-col">
      {/* Top section */}
      <div className="p-5 flex-1">
        {/* Title row */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-0.5 ${gate.is_active ? 'bg-[#4ADE80]' : 'bg-zinc-600'}`} />
            <p className="text-[15px] font-semibold text-white truncate leading-snug">
              {gate.title ?? truncateUrl(gate.target_url, 32)}
            </p>
          </div>
          {/* Icon actions top-right */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <button
              onClick={copy}
              title={copied ? 'Copied!' : 'Copy pgate link'}
              className={cn(
                'w-7 h-7 flex items-center justify-center rounded-lg border transition-all',
                copied
                  ? 'bg-[#4ADE80]/10 border-[#4ADE80]/20 text-[#4ADE80]'
                  : 'border-zinc-800 text-zinc-600 hover:text-zinc-300 hover:border-zinc-700 bg-zinc-900'
              )}
            >
              {copied ? (
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              ) : (
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
              )}
            </button>
            <a
              href={gateUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Open protected link"
              className="w-7 h-7 flex items-center justify-center rounded-lg border border-zinc-800 text-zinc-600 hover:text-zinc-300 hover:border-zinc-700 bg-zinc-900 transition-all"
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
            <button
              onClick={e => { e.preventDefault(); setConfirmDelete(true) }}
              title="Delete link"
              className="w-7 h-7 flex items-center justify-center rounded-lg border border-zinc-800 text-zinc-600 hover:text-red-400 hover:border-red-500/30 bg-zinc-900 transition-all"
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/></svg>
            </button>
          </div>
        </div>

        {/* URLs */}
        <div className="space-y-0.5 mb-4 pl-3.5">
          <p className="text-[12px] font-mono text-[#4ADE80]/70 truncate">
            {APP_URL.replace('https://', '').replace('http://', '')}/g/{gate.slug}
          </p>
          <p className="text-[11px] text-zinc-500 truncate">
            → {truncateUrl(gate.target_url, 44)}
          </p>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 pl-3.5">
          <div className="flex items-center gap-1.5">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#71717a" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            <span className="text-[12px] text-zinc-400">{gate.view_count ?? 0} opens</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#71717a" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            <span className="text-[12px] text-zinc-400">{gate.password_count ?? 0} passwords</span>
          </div>
          <span className="text-[11px] text-zinc-500 ml-auto">{timeAgo(gate.created_at)}</span>
        </div>
      </div>

      {/* Action buttons / delete confirm */}
      {confirmDelete ? (
        <div className="border-t border-red-500/20 bg-red-500/5 px-4 py-3 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-semibold text-red-400">Delete this link?</p>
            <p className="text-[11px] text-zinc-500 mt-0.5">All analytics and passwords will be permanently lost.</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => setConfirmDelete(false)}
              className="text-[11px] font-medium text-zinc-400 hover:text-zinc-200 px-2.5 py-1.5 rounded-lg border border-zinc-700 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={deleteGate}
              disabled={deleting}
              className="text-[11px] font-semibold text-white bg-red-500 hover:bg-red-600 disabled:opacity-50 px-2.5 py-1.5 rounded-lg transition-colors"
            >
              {deleting ? 'Deleting…' : 'Delete'}
            </button>
          </div>
        </div>
      ) : (
        <div className="border-t border-zinc-800 grid grid-cols-3 divide-x divide-zinc-800">
          <Link
            href={`/dashboard/gates/${gate.id}`}
            className="flex items-center justify-center gap-1.5 py-3 text-[12px] font-medium text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-colors"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
            Analytics
          </Link>
          <Link
            href={`/dashboard/gates/${gate.id}?tab=passwords`}
            className="flex items-center justify-center gap-1.5 py-3 text-[12px] font-medium text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-colors"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            Passwords
          </Link>
          <Link
            href={`/dashboard/gates/${gate.id}/customize`}
            className="flex items-center justify-center gap-1.5 py-3 text-[12px] font-medium text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-colors"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
            Customize
          </Link>
        </div>
      )}
    </div>
  )
}

/* ── Main list ──────────────────────────────────── */
export default function GatesList({
  gates,
  profile,
  recentActivity = [],
}: {
  gates: Gate[]
  profile: Profile | null
  recentActivity?: Activity[]
}) {
  const [showCreate, setShowCreate] = useState(false)
  const plan    = profile?.plan ?? 'free'
  const limits  = PLAN_LIMITS[plan]
  const atLimit = gates.length >= limits.maxGates

  return (
    <div className="p-6 sm:p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl font-bold text-white">Your Links</h1>
            {plan === 'free' && (
              <Link href="/dashboard/billing"
                className="text-[11px] font-semibold text-amber-400 border border-amber-500/30 bg-amber-500/10 px-2 py-1 rounded-lg hover:bg-amber-500/20 transition-colors whitespace-nowrap">
                ✦ Upgrade
              </Link>
            )}
          </div>
          <p className="text-zinc-500 text-sm mt-0.5">
            {gates.length} of {limits.maxGates === Infinity ? 'unlimited' : limits.maxGates} links used
          </p>
        </div>
        <div className="flex flex-row items-center gap-1.5">
          <button
            onClick={() => setShowCreate(true)}
            disabled={atLimit}
            className={cn(
              'flex items-center gap-1.5 text-[11px] sm:text-sm font-semibold px-2.5 py-1.5 sm:px-5 sm:py-2.5 rounded-lg sm:rounded-xl transition-colors whitespace-nowrap',
              atLimit
                ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed border border-zinc-700'
                : 'bg-[#4ADE80] text-[#0D0D0D] hover:bg-[#22c55e]'
            )}
          >
            <svg className="hidden sm:block" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            <svg className="sm:hidden" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            {atLimit ? 'Limit reached' : 'New link'}
          </button>
        </div>
      </div>

      {/* Upgrade nudge */}
      {atLimit && plan !== 'pro' && (
        <div className="bg-zinc-900 border border-amber-500/20 rounded-xl px-5 py-4 flex items-center justify-between mb-6">
          <div>
            <p className="text-sm font-semibold text-white">You've used all your links</p>
            <p className="text-xs text-zinc-500 mt-0.5">Upgrade to create more</p>
          </div>
          <Link href="/dashboard/billing"
            className="text-sm font-semibold bg-[#4ADE80] text-[#0D0D0D] px-4 py-2 rounded-lg hover:bg-[#22c55e] transition-colors">
            Upgrade
          </Link>
        </div>
      )}

      {/* Activity feed */}
      <ActivityFeed activities={recentActivity} />

      {/* Links grid or empty state */}
      {gates.length === 0 ? (
        <div className="border border-dashed border-zinc-800 rounded-2xl py-16 text-center">
          <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto mb-4">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4ADE80" strokeWidth="1.8"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          </div>
          <p className="text-zinc-300 font-semibold mb-1">No links yet</p>
          <p className="text-zinc-400 text-sm mb-5">Create your first protected link to get started.</p>
          <button
            onClick={() => setShowCreate(true)}
            className="bg-[#4ADE80] text-[#0D0D0D] font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-[#22c55e] transition-colors"
          >
            Create link
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {gates.map(gate => <GateCard key={gate.id} gate={gate} />)}
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
