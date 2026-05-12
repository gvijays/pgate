import * as React from 'react'

interface FailedAttemptProps {
  ownerName: string
  gateTitle: string
  gateUrl: string
  attempts: number
  country?: string
}

export function FailedAttemptEmail({ ownerName, gateTitle, gateUrl, attempts, country }: FailedAttemptProps) {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', maxWidth: 520, margin: '0 auto', background: '#fff', padding: '40px 32px' }}>
      <div style={{ marginBottom: 32 }}>
        <span style={{ background: '#0D0D0D', color: '#4ADE80', fontWeight: 700, fontSize: 18, padding: '4px 10px', borderRadius: 6 }}>pgate</span>
      </div>
      <h1 style={{ fontSize: 22, fontWeight: 700, color: '#09090b', marginBottom: 8 }}>
        Failed access attempt ⚠️
      </h1>
      <p style={{ color: '#52525b', fontSize: 15, lineHeight: 1.6, marginBottom: 24 }}>
        Hi {ownerName}, someone tried to access <strong>{gateTitle}</strong> with the wrong password — {attempts} time{attempts !== 1 ? 's' : ''}{country ? ` from ${country}` : ''}.
      </p>
      <a href={gateUrl}
        style={{ display: 'inline-block', background: '#0D0D0D', color: '#4ADE80', fontWeight: 600, fontSize: 14, padding: '12px 24px', borderRadius: 8, textDecoration: 'none' }}>
        Check your gate →
      </a>
      <hr style={{ border: 'none', borderTop: '1px solid #f4f4f5', margin: '24px 0' }} />
      <p style={{ color: '#a1a1aa', fontSize: 12 }}>pgate.io</p>
    </div>
  )
}
