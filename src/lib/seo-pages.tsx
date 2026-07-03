import type { ReactNode } from 'react'

export interface SeoStep { title: string; text: string }
export interface SeoFaq  { q: string; a: string }

export interface SeoPage {
  slug: string
  brand: string
  brandColor: string
  logo: ReactNode
  /** <title> and H1 driver */
  metaTitle: string
  metaDescription: string
  h1: ReactNode
  /** short line under the H1 */
  subhead: string
  /** placeholder shown in the URL field of the create widget */
  placeholder: string
  /** direct answer to the searcher's question — the "why pgate" paragraph */
  intro: string
  steps: SeoStep[]
  faqs: SeoFaq[]
}

/* ── Brand logomarks (kept as accents only — pgate's design system stays) ── */

function WebflowLogo() {
  return (
    <svg width="34" height="34" viewBox="0 0 40 40" fill="none" aria-hidden>
      <rect width="40" height="40" rx="9" fill="#146EF5" />
      <path d="M12 13 L17 27 L20 19 L23 27 L28 13"
        stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  )
}

/* ── Page data ── */

export const SEO_PAGES: Record<string, SeoPage> = {
  webflow: {
    slug: 'webflow',
    brand: 'Webflow',
    brandColor: '#146EF5',
    logo: <WebflowLogo />,
    metaTitle: 'Password Protect a Webflow Link | pgate',
    metaDescription:
      'Add a password to any Webflow link in seconds — even on the free plan. Give each recipient their own password and see exactly who opens it, when, and from where.',
    h1: (
      <>
        Password-protect<br />
        <span style={{ color: '#4ADE80' }}>your Webflow link</span>
      </>
    ),
    subhead: 'One password per recipient. See exactly who opens your Webflow page.',
    placeholder: 'https://your-site.webflow.io/page...',
    intro:
      "Webflow's built-in password protection only works on paid Site plans, and it locks the whole page behind a single shared password — you never know who actually opened it. pgate works with any Webflow link, including free sites. Give each person their own password, labelled by name, and see every open with location and device.",
    steps: [
      { title: 'Paste your Webflow link', text: 'Copy your Webflow page or project URL and paste it into pgate — no changes to your Webflow settings.' },
      { title: 'Set a password per recipient', text: 'Add a password for each person and label it with their name, so you always know who’s who.' },
      { title: 'Share and track', text: 'Send the pgate link. See exactly who opens your Webflow page, when, and from what device.' },
    ],
    faqs: [
      { q: 'Does Webflow let you password protect a page for free?', a: 'No. Webflow’s built-in password protection requires a paid Site plan and uses one shared password for everyone. pgate works with any Webflow link — including free sites — and gives each recipient their own password.' },
      { q: 'Can I see who opened my Webflow link?', a: 'Yes. pgate shows every open with a timestamp, city and country, and device type. Webflow’s native protection shows you nothing.' },
      { q: 'Do I need to change my Webflow settings?', a: 'No. Leave your Webflow page exactly as it is. pgate simply wraps the link with a password gate.' },
      { q: 'Is pgate free?', a: 'Yes. pgate is free to start with no credit card. Pro is $15/year for unlimited links and full analytics.' },
    ],
  },
}

export const SEO_SLUGS = Object.keys(SEO_PAGES)
