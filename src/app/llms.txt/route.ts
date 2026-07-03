import { SEO_PAGES } from '@/lib/seo-pages'
import { NextResponse } from 'next/server'

export const dynamic = 'force-static'

export function GET() {
  const pageList = Object.values(SEO_PAGES)
    .map(p => `- [Password protect a ${p.brand}](https://pgate.io/password-protect/${p.slug}): ${p.metaDescription}`)
    .join('\n')

  const content = `# pgate

> Password-protect any URL and track exactly who opens it — with per-recipient passwords.

pgate is a secure link-sharing tool that lets you add a password gate in front of any URL (Google Drive, Notion, Figma, PDFs, websites, prototypes). Each recipient gets their own unique password, labelled with their name. When they open the link, you see exactly who it was, when, where, and from what device.

## Key facts

- Works with any URL — Figma, Notion, Google Drive, Dropbox, PDFs, pitch decks, portfolios, websites
- Per-recipient passwords: one password per person, labelled by name
- Access analytics: timestamp, city/country, device type per open
- No account required for recipients — just a password
- Free plan: 2 protected links, 2 passwords each, basic stats
- Pro plan: $15/year (80% off launch price) — unlimited links, 20 passwords per link, custom slugs, full analytics, white-label, custom branding
- No email gate — unlike DocSend, recipients only need a password

## Use cases

- Designers protecting Figma files and portfolios from clients and recruiters
- Founders tracking which investors opened their pitch deck
- Freelancers knowing if a client opened their proposal
- Anyone sharing sensitive documents (pricing, strategy, contracts) with controlled access

## Password-protect guides

${pageList}

## Pages

- [Home](https://pgate.io): Product overview and live demo
- [Pricing](https://pgate.io/pricing): Free and Pro plan details
`

  return new NextResponse(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
