'use client'
import { useState } from 'react'
import { Profile } from '@/types'
import { createClient } from '@/lib/supabase/client'

export default function SettingsForm({ profile }: { profile: Profile | null }) {
  const supabase = createClient()
  const [name,   setName]   = useState(profile?.full_name ?? '')
  const [slug,   setSlug]   = useState(profile?.vanity_slug ?? '')
  const [saving, setSaving] = useState(false)
  const [saved,  setSaved]  = useState(false)
  const [error,  setError]  = useState('')

  const save = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true); setError('')
    const { error } = await supabase.from('profiles').update({
      full_name: name,
      vanity_slug: slug || null,
      updated_at: new Date().toISOString(),
    }).eq('id', profile?.id ?? '')
    setSaving(false)
    if (error) { setError(error.message); return }
    setSaved(true); setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="p-6 sm:p-8 max-w-xl mx-auto">
      <h1 className="text-xl font-bold text-white mb-1">Settings</h1>
      <p className="text-zinc-500 text-sm mb-8">Manage your account.</p>

      <form onSubmit={save} className="space-y-5">
        <div>
          <label className="block text-xs font-semibold text-zinc-400 mb-1.5">Display name</label>
          <input value={name} onChange={e => setName(e.target.value)}
            placeholder="Your name"
            className="w-full bg-zinc-900 border border-zinc-700 text-white text-sm px-4 py-2.5 rounded-xl outline-none focus:border-[#4ADE80]/40 transition-colors placeholder-zinc-600" />
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-400 mb-1.5">Email</label>
          <input value={profile?.email ?? ''} disabled
            className="w-full bg-zinc-900 border border-zinc-800 text-zinc-500 text-sm px-4 py-2.5 rounded-xl cursor-not-allowed" />
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-400 mb-1.5">
            Vanity slug
            <span className="ml-1 text-zinc-600 font-normal">(optional)</span>
          </label>
          <div className="flex items-center bg-zinc-900 border border-zinc-700 rounded-xl overflow-hidden focus-within:border-[#4ADE80]/40 transition-colors">
            <span className="pl-4 text-zinc-600 text-sm whitespace-nowrap">pgate.io/</span>
            <input value={slug} onChange={e => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
              placeholder="yourname" maxLength={30}
              className="flex-1 bg-transparent text-white text-sm pr-4 py-2.5 outline-none placeholder-zinc-700" />
          </div>
        </div>

        {error && <p className="text-red-400 text-xs">{error}</p>}

        <button type="submit" disabled={saving}
          className="bg-[#4ADE80] text-[#0D0D0D] font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-[#22c55e] transition-colors disabled:opacity-50">
          {saved ? '✓ Saved' : saving ? 'Saving…' : 'Save changes'}
        </button>
      </form>
    </div>
  )
}
