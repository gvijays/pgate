import * as React from 'react'

interface GateViewedProps {
  ownerName: string
  gateTitle: string
  gateUrl: string
  recipientLabel: string
  viewedAt: string
  country?: string
  city?: string
  device?: string
  isPro: boolean
}

export function GateViewedEmail({
  ownerName, gateTitle, gateUrl, recipientLabel,
  viewedAt, country, city, device, isPro
}: GateViewedProps) {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', maxWidth: 520, margin: '0 auto', background: '#fff', padding: '40px 32px' }}>
      <div style={{ marginBottom: 32 }}>
        <span style={{ background: '#0D0D0D', color: '#4ADE80', fontWeight: 700, fontSize: 18, padding: '4px 10px', borderRadius: 6 }}>
          pgate
        </span>
      </div>
      <h1 style={{ fontSize: 22, fontWeight: 700, color: '#09090b', marginBottom: 8 }}>
        Someone just opened your gate 👁
      </h1>
      <p style={{ color: '#52525b', fontSize: 15, lineHeight: 1.6, marginBottom: 24 }}>
        Hi {ownerName}, <strong>{recipientLabel}</strong> opened <strong>{gateTitle}</strong>.
      </p>
      <div style={{ background: '#f4f4f5', borderRadius: 10, padding: '16px 20px', marginBottom: 24 }}>
        <table style={{ width: '100%', fontSize: 13, color: '#3f3f46' }}>
          <tbody>
            <tr><td style={{ paddingBottom: 8, color: '#71717a' }}>Password used</td><td style={{ fontWeight: 600 }}>{recipientLabel}</td></tr>
            <tr><td style={{ paddingBottom: 8, color: '#71717a' }}>Time</td><td style={{ fontWeight: 600 }}>{viewedAt}</td></tr>
            {isPro && country && <tr><td style={{ paddingBottom: 8, color: '#71717a' }}>Location</td><td style={{ fontWeight: 600 }}>{city ? `${city}, ${country}` : country}</td></tr>}
            {isPro && device && <tr><td style={{ color: '#71717a' }}>Device</td><td style={{ fontWeight: 600, textTransform: 'capitalize' }}>{device}</td></tr>}
          </tbody>
        </table>
      </div>
      {!isPro && (
        <p style={{ color: '#a1a1aa', fontSize: 13, marginBottom: 24 }}>
          📍 Upgrade to Pro to see location and device details.
        </p>
      )}
      <a href={gateUrl}
        style={{ display: 'inline-block', background: '#0D0D0D', color: '#4ADE80', fontWeight: 600, fontSize: 14, padding: '12px 24px', borderRadius: 8, textDecoration: 'none' }}>
        View analytics →
      </a>
      <hr style={{ border: 'none', borderTop: '1px solid #f4f4f5', margin: '24px 0' }} />
      <p style={{ color: '#a1a1aa', fontSize: 12 }}>pgate.io · Manage notifications in your dashboard settings.</p>
    </div>
  )
}
