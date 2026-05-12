'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Profile, PLAN_LIMITS } from '@/types'
import { generateSlug, generatePassword, cn } from '@/lib/utils'

interface PasswordEntry { label: string; password: string }

export default function CreateGateModal({
  profile, onClose, onCreated,
}: { profile: Profile | null; onClose: () => void; onCreated: () => void }) {
  const supabase = createClient()
  const plan     = profile?.plan ?? 'free'
  const limits   = PLAN_LIMITS[plan]

  const [url,       setUrl]       = useState('')
  const [title,     setTitle]     = useState('')
  const [slug,      setSlug]      = useState('')
  const [loading,   setLoading]   = useState(false)
  const [error,     setError]     = useState('')
  const [passwords, setPasswords] = useState<PasswordEntry[]>([
    { label: 'Recipient 1', password: generatePassword() },
  ])

  const addPassword = () => {
    if (passwords.length >= limits.maxPasswordsPerGate) return
    setPasswords(p => [...p, { label: `Recipient ${p.length + 1}`, password: generatePassword() }])
  }

  const updatePw = (i: number, field: 'label' | 'password', value: string) => {
    setPasswords(p => p.map((pw, idx) => idx === i ? { ...pw, [field]: value } : pw))
  }

  const removePw = (i: number) => {
    if (passwords.length <= 1) return
    setPasswords(p => p.filter((_, idx) => idx !== i))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url.trim()) return
    setLoading(true); setError('')

    try {
      const finalSlug = (limits.customSlug && slug.trim()) ? slug.trim() : generateSlug()
      const res = await fetch('/api/gates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim(), title: title.trim() || null, slug: finalSlug, passwords }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Failed to create gate')
      onCreated()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-zinc-900 border border-zinc-700 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-800">
          <h2 className="text-base font-bold text-white">Create gate</h2>
          <button onClick={onClose} className="text-zinc-500 hover:text-zinc-300 transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-5">
          {/* URL */}
          <div>
            <label className="block text-xs font-semibold text-zinc-400 mb-1.5">URL to protect *</label>
            <input value={url} onChange={e => setUrl(e.target.value)} placeholder="https://figma.com/file/..." required
              className="w-full bg-zinc-800 border border-zinc-700 text-white text-sm px-4 py-2.5 rounded-xl outline-none focus:border-[#4ADE80]/40 transition-colors placeholder-zinc-600" />
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-zinc-400 mb-1.5">Title <span className="text-zinc-600 font-normal">(optional)</span></label>
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Google Portfolio"
              className="w-full bg-zinc-800 border border-zinc-700 text-white text-sm px-4 py-2.5 rounded-xl outline-none focus:border-[#4ADE80]/40 transition-colors placeholder-zinc-600" />
          </div>

          {/* Custom slug — Maker+ */}
          {limits.customSlug ? (
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1.5">Custom slug <span className="text-zinc-600 font-normal">(optional)</span></label>
              <div className="flex items-center bg-zinc-800 border border-zinc-700 rounded-xl overflow-hidden focus-within:border-[#4ADE80]/40 transition-colors">
                <span className="pl-4 text-zinc-600 text-sm whitespace-nowrap">pgate.io/g/</span>
                <input value={slug} onChange={e => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                  placeholder="my-portfolio" maxLength={40}
                  className="flex-1 bg-transparent text-white text-sm pr-4 py-2.5 outline-none placeholder-zinc-700" />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-xs text-zinc-600 bg-zinc-800 rounded-xl px-4 py-3 border border-zinc-700">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              Custom slugs available on Maker plan
            </div>
          )}

          {/* Passwords */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-zinc-400">
                Passwords <span className="text-zinc-600 font-normal">({passwords.length}/{limits.maxPasswordsPerGate})</span>
              </label>
              <button type="button" onClick={addPassword} disabled={passwords.length >= limits.maxPasswordsPerGate}
                className="text-xs text-[#4ADE80] font-medium disabled:text-zinc-700 hover:text-[#22c55e] transition-colors">
                + Add password
              </button>
            </div>
            <div className="space-y-2">
              {passwords.map((pw, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input value={pw.label} onChange={e => updatePw(i, 'label', e.target.value)}
                    placeholder="Label (e.g. Google HR)"
                    className="flex-1 bg-zinc-800 border border-zinc-700 text-white text-xs px-3 py-2.5 rounded-lg outline-none focus:border-[#4ADE80]/40 transition-colors placeholder-zinc-600" />
                  <input value={pw.password} onChange={e => updatePw(i, 'password', e.target.value)}
                    placeholder="Password"
                    className="w-28 bg-zinc-800 border border-zinc-700 text-white font-mono text-xs px-3 py-2.5 rounded-lg outline-none focus:border-[#4ADE80]/40 transition-colors" />
                  <button type="button" onClick={() => removePw(i)} disabled={passwords.length <= 1}
                    className="text-zinc-700 hover:text-zinc-400 disabled:opacity-30 transition-colors flex-shrink-0">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {error && <p className="text-red-400 text-xs">{error}</p>}

          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose}
              className="flex-1 border border-zinc-700 text-zinc-400 hover:text-zinc-200 text-sm font-medium py-2.5 rounded-xl transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={loading || !url.trim()}
              className="flex-1 bg-[#4ADE80] text-[#0D0D0D] font-semibold text-sm py-2.5 rounded-xl hover:bg-[#22c55e] transition-colors disabled:opacity-50">
              {loading ? 'Creating…' : 'Create gate →'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
