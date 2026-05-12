import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { customAlphabet } from 'nanoid'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 8)

export function generateSlug() {
  return nanoid()
}

export function generatePassword() {
  return customAlphabet('ABCDEFGHJKLMNPQRSTUVWXYZ23456789', 8)()
}

export function formatDate(date: string | Date) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  }).format(new Date(date))
}

export function timeAgo(date: string | Date) {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000)
  if (seconds < 60) return 'just now'
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`
  return formatDate(date)
}

export function getDeviceType(ua: string): 'mobile' | 'desktop' | 'tablet' | 'unknown' {
  if (/tablet|ipad/i.test(ua)) return 'tablet'
  if (/mobile|android|iphone/i.test(ua)) return 'mobile'
  if (ua) return 'desktop'
  return 'unknown'
}

export function hashIp(ip: string) {
  // Simple hash for privacy — not reversible
  let hash = 0
  for (let i = 0; i < ip.length; i++) {
    const chr = ip.charCodeAt(i)
    hash = ((hash << 5) - hash) + chr
    hash |= 0
  }
  return Math.abs(hash).toString(36)
}

export function truncateUrl(url: string, max = 40) {
  try {
    const u = new URL(url)
    const display = u.hostname + u.pathname
    return display.length > max ? display.slice(0, max) + '…' : display
  } catch {
    return url.length > max ? url.slice(0, max) + '…' : url
  }
}
