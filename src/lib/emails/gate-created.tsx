import * as React from 'react'

interface GateCreatedProps {
  userName: string
  gateTitle: string
  gateUrl: string
  passwordCount: number
}

export function GateCreatedEmail({ userName, gateTitle, gateUrl, passwordCount }: GateCreatedProps) {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', maxWidth: 520, margin: '0 auto', background: '#fff', padding: '40px 32px' }}>
      <div style={{ marginBottom: 32 }}>
        <span style={{ background: '#0D0D0D', color: '#4ADE80', fontWeight: 700, fontSize: 18, padding: '4px 10px', borderRadius: 6 }}>
          pgate
        </span>
      </div>
      <h1 style={{ fontSize: 24, fontWeight: 700, color: '#09090b', marginBottom: 8 }}>
        Your gate is live 🔐
      </h1>
      <p style={{ color: '#52525b', fontSize: 15, lineHeight: 1.6, marginBottom: 24 }}>
        Hi {userName}, <strong>{gateTitle}</strong> is now protected and ready to share. You have {passwordCount} password{passwordCount !== 1 ? 's' : ''} set up.
      </p>
      <a href={gateUrl}
        style={{ display: 'inline-block', background: '#0D0D0D', color: '#4ADE80', fontWeight: 600, fontSize: 14, padding: '12px 24px', borderRadius: 8, textDecoration: 'none', marginBottom: 24 }}>
        View your gate →
      </a>
      <p style={{ color: '#a1a1aa', fontSize: 13, marginTop: 24 }}>
        Share this link: <a href={gateUrl} style={{ color: '#4ADE80' }}>{gateUrl}</a>
      </p>
      <hr style={{ border: 'none', borderTop: '1px solid #f4f4f5', margin: '24px 0' }} />
      <p style={{ color: '#a1a1aa', fontSize: 12 }}>pgate.io · You&apos;ll be notified when someone opens this gate.</p>
    </div>
  )
}
