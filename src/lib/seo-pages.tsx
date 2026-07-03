import type { ReactNode } from 'react'

export interface SeoStep { title: string; text: string }
export interface SeoFaq  { q: string; a: string }

export interface SeoPage {
  slug: string
  brand: string
  brandColor: string
  logo: ReactNode
  /** <title> — keyword-optimized, no "| pgate" (the layout template adds it) */
  metaTitle: string
  metaDescription: string
  h1: ReactNode
  /** short line under the H1 */
  subhead: string
  /** placeholder shown in the URL field of the create widget */
  placeholder: string
  /** heading for the native-protection explainer; defaults to `{brand}’s built-in password protection` */
  nativeTitle?: string
  /** direct answer to the searcher's question — the "why pgate" paragraph */
  intro: string
  steps: SeoStep[]
  faqs: SeoFaq[]
}

/* ── Brand logomarks (accents only — pgate's design system stays) ── */

const Webflow = () => (
  <svg width="30" height="30" viewBox="0 0 40 40" fill="none" aria-hidden>
    <rect width="40" height="40" rx="9" fill="#146EF5" />
    <path d="M12 13 L17 27 L20 19 L23 27 L28 13" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
)

const Pdf = () => (
  <svg width="30" height="30" viewBox="0 0 40 40" aria-hidden>
    <rect width="40" height="40" rx="9" fill="#E4453A" />
    <text x="20" y="25" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff" fontFamily="Arial, sans-serif">PDF</text>
  </svg>
)

const GoogleDoc = () => (
  <svg width="30" height="30" viewBox="0 0 40 40" aria-hidden>
    <rect x="10" y="5" width="20" height="30" rx="2.5" fill="#4285F4" />
    <rect x="14" y="14" width="12" height="2" rx="1" fill="#fff" />
    <rect x="14" y="19" width="12" height="2" rx="1" fill="#fff" />
    <rect x="14" y="24" width="8" height="2" rx="1" fill="#fff" />
  </svg>
)

const GoogleDrive = () => (
  <svg width="30" height="30" viewBox="0 0 40 40" aria-hidden>
    <path d="M20 7 L6 31 L20 23 Z" fill="#4285F4" />
    <path d="M6 31 L34 31 L20 23 Z" fill="#0F9D58" />
    <path d="M34 31 L20 7 L20 23 Z" fill="#FBBC05" />
  </svg>
)

const GoogleSheet = () => (
  <svg width="30" height="30" viewBox="0 0 40 40" aria-hidden>
    <rect x="10" y="5" width="20" height="30" rx="2.5" fill="#0F9D58" />
    <rect x="14" y="14" width="12" height="12" fill="none" stroke="#fff" strokeWidth="1.5" />
    <line x1="20" y1="14" x2="20" y2="26" stroke="#fff" strokeWidth="1.5" />
    <line x1="14" y1="20" x2="26" y2="20" stroke="#fff" strokeWidth="1.5" />
  </svg>
)

const Dropbox = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="#0061FF" aria-hidden>
    <path d="M6 1.8L0 5.6l6 3.9 6-3.9zM18 1.8l-6 3.8 6 3.9 6-3.9zM0 13.3l6 3.9 6-3.9-6-3.8zM18 5.6l-6 3.9 6 3.9 6-3.9zM6 18.4l6 3.8 6-3.8-6-3.8z" />
  </svg>
)

const Notion = () => (
  <svg width="30" height="30" viewBox="0 0 40 40" aria-hidden>
    <rect width="40" height="40" rx="9" fill="#fff" />
    <path d="M14 12 L14 28 L16.5 28 L16.5 17 L25 28 L27 28 L27 12 L24.5 12 L24.5 22.5 L16.5 12 Z" fill="#0D0D0D" />
  </svg>
)

const WordPress = () => (
  <svg width="30" height="30" viewBox="0 0 40 40" aria-hidden>
    <circle cx="20" cy="20" r="18" fill="none" stroke="#3858E9" strokeWidth="2" />
    <text x="20" y="26" textAnchor="middle" fontSize="17" fontWeight="700" fill="#3858E9" fontFamily="Georgia, serif">W</text>
  </svg>
)

const Website = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4ADE80" strokeWidth="1.8" aria-hidden>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
  </svg>
)

const Netlify = () => (
  <svg width="30" height="30" viewBox="0 0 40 40" aria-hidden>
    <path d="M20 4 L36 20 L20 36 L4 20 Z" fill="#00AD9F" />
    <path d="M20 13 L27 20 L20 27 L13 20 Z" fill="#0D0D0D" />
  </svg>
)

const YouTube = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" aria-hidden>
    <rect x="1" y="5" width="22" height="14" rx="4" fill="#FF0000" />
    <path d="M10 8.5 L16 12 L10 15.5 Z" fill="#fff" />
  </svg>
)

const Framer = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="#0099FF" aria-hidden>
    <path d="M4 2h16v7H12zM4 9h8l8 7H12v7L4 16z" />
  </svg>
)

const Figma = () => (
  <svg width="24" height="24" viewBox="0 0 38 57" aria-hidden>
    <path fill="#1abcfe" d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" />
    <path fill="#0acf83" d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" />
    <path fill="#ff7262" d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" />
    <path fill="#f24e1e" d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" />
    <path fill="#a259ff" d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" />
  </svg>
)

const Wix = () => (
  <svg width="30" height="30" viewBox="0 0 40 40" aria-hidden>
    <text x="20" y="26" textAnchor="middle" fontSize="14" fontWeight="800" fontStyle="italic" fill="#fff" fontFamily="Arial, sans-serif">Wix</text>
  </svg>
)

const Loom = () => (
  <svg width="28" height="28" viewBox="0 0 40 40" stroke="#625DF5" strokeWidth="2.6" strokeLinecap="round" aria-hidden>
    <line x1="20" y1="7" x2="20" y2="33" />
    <line x1="7" y1="20" x2="33" y2="20" />
    <line x1="10.8" y1="10.8" x2="29.2" y2="29.2" />
    <line x1="29.2" y1="10.8" x2="10.8" y2="29.2" />
  </svg>
)

const WeTransfer = () => (
  <svg width="30" height="30" viewBox="0 0 40 40" aria-hidden>
    <circle cx="20" cy="20" r="13" fill="#409FFF" />
  </svg>
)

/* ── Page data ── */

export const SEO_PAGES: Record<string, SeoPage> = {

  webflow: {
    slug: 'webflow', brand: 'Webflow', brandColor: '#146EF5', logo: <Webflow />,
    metaTitle: 'Password Protect a Webflow Page',
    metaDescription: 'Add a password to any Webflow page in seconds — even on the free plan. Give each recipient their own password and see exactly who opens it, when, and from where.',
    h1: (<>Password-protect<br /><span style={{ color: '#4ADE80' }}>your Webflow page</span></>),
    subhead: 'One password per recipient. See exactly who opens your Webflow page.',
    placeholder: 'https://your-site.webflow.io/page...',
    intro: "Webflow's built-in password protection only works on paid Site plans, and it locks the whole page behind a single shared password — you never know who actually opened it. pgate works with any Webflow link, including free sites. Give each person their own password, labelled by name, and see every open with location and device.",
    steps: [
      { title: 'Paste your Webflow link', text: 'Copy your Webflow page or project URL and paste it into pgate — no changes to your Webflow settings.' },
      { title: 'Set a password per recipient', text: 'Add a password for each person and label it with their name, so you always know who’s who.' },
      { title: 'Share and track', text: 'Send the pgate link. See exactly who opens your Webflow page, when, and from what device.' },
    ],
    faqs: [
      { q: 'Does Webflow let you password protect a page for free?', a: 'No. Webflow’s built-in password protection requires a paid Site plan and uses one shared password for everyone. pgate works with any Webflow link — including free sites — and gives each recipient their own password.' },
      { q: 'Can I see who opened my Webflow page?', a: 'Yes. pgate shows every open with a timestamp, city and country, and device type. Webflow’s native protection shows you nothing.' },
      { q: 'Do I need to change my Webflow settings?', a: 'No. Leave your Webflow page exactly as it is. pgate simply wraps the link with a password gate.' },
      { q: 'Is pgate free?', a: 'Yes. pgate is free to start with no credit card. Pro is $15/year for unlimited links and full analytics.' },
    ],
  },

  pdf: {
    slug: 'pdf', brand: 'PDF', brandColor: '#E4453A', logo: <Pdf />,
    metaTitle: 'Password Protect a PDF',
    metaDescription: 'Password protect a PDF by locking the link, not the file. Give each recipient their own password and see exactly who opened your PDF, when, and from where.',
    h1: (<>Password-protect<br /><span style={{ color: '#4ADE80' }}>your PDF</span></>),
    subhead: 'Lock the link to your PDF. See exactly who opens it.',
    placeholder: 'https://yoursite.com/document.pdf',
    nativeTitle: 'Why not just password-protect the PDF file?',
    intro: "Most PDF tools lock the file itself with a password you have to email separately — and once someone has the file, they can forward it to anyone, and PDF passwords are easy to strip. pgate takes a different approach: keep your PDF wherever it already lives (Google Drive, Dropbox, your own site) and wrap the link with a password. Give each recipient their own, and see exactly who opened it, when, and from where.",
    steps: [
      { title: 'Paste your PDF link', text: 'Upload your PDF anywhere — Drive, Dropbox, your site — and paste its link into pgate.' },
      { title: 'Set a password per recipient', text: 'Add a password for each person and label it with their name.' },
      { title: 'Share and track', text: 'Send the pgate link. See exactly who opened your PDF, when, and from what device.' },
    ],
    faqs: [
      { q: 'Is this different from password-protecting the PDF file itself?', a: 'Yes. Instead of encrypting the file (which can be stripped, and forces you to share the password separately), pgate puts a password in front of the link. You keep control and see who opens it.' },
      { q: 'Can I see who opened my PDF?', a: 'Yes. pgate logs every open with a timestamp, city and country, and device type.' },
      { q: 'Does the recipient need an account?', a: 'No. They just enter the password you set — no signup, no app.' },
      { q: 'Is pgate free?', a: 'Yes. pgate is free to start with no credit card. Pro is $15/year for unlimited links and full analytics.' },
    ],
  },

  'google-doc': {
    slug: 'google-doc', brand: 'Google Doc', brandColor: '#4285F4', logo: <GoogleDoc />,
    metaTitle: 'Password Protect a Google Doc',
    metaDescription: 'Google Docs has no built-in password. pgate adds a real password to any Google Doc link — one per recipient — and shows you exactly who opened it.',
    h1: (<>Password-protect<br /><span style={{ color: '#4ADE80' }}>your Google Doc</span></>),
    subhead: 'Add a password to your Google Doc. See exactly who opens it.',
    placeholder: 'https://docs.google.com/document/d/...',
    intro: "Google Docs has no built-in way to add a password — anyone with the link can open it, and 'restricted' sharing forces recipients to sign in with a Google account you've whitelisted. pgate adds a real password to your Doc link: no Google account needed on their end, a separate password per recipient, and a log of every open.",
    steps: [
      { title: 'Paste your Google Doc link', text: 'Set your Doc to “anyone with the link”, copy the URL, and paste it into pgate.' },
      { title: 'Set a password per recipient', text: 'Add a password for each person and label it with their name.' },
      { title: 'Share and track', text: 'Send the pgate link. See exactly who opened your Doc, when, and from what device.' },
    ],
    faqs: [
      { q: 'Can you password protect a Google Doc?', a: 'Not natively — Google Docs has no password option. pgate adds one by wrapping your Doc link with a password gate.' },
      { q: 'Does the recipient need a Google account?', a: 'No. Unlike Google’s “restricted” sharing, pgate only requires the password you set — no Google login.' },
      { q: 'Can I see who opened my Google Doc?', a: 'Yes. pgate logs every open with a timestamp, location, and device type.' },
      { q: 'Is pgate free?', a: 'Yes. pgate is free to start with no credit card. Pro is $15/year for unlimited links and full analytics.' },
    ],
  },

  'google-drive': {
    slug: 'google-drive', brand: 'Google Drive', brandColor: '#4285F4', logo: <GoogleDrive />,
    metaTitle: 'Google Drive Password Protect a Folder',
    metaDescription: 'Google Drive has no password option for files or folders. pgate wraps any Drive link with a password — one per recipient — and shows you who opened it.',
    h1: (<>Password-protect<br /><span style={{ color: '#4ADE80' }}>your Google Drive</span></>),
    subhead: 'Add a password to your Drive link. See exactly who opens it.',
    placeholder: 'https://drive.google.com/drive/folders/...',
    intro: "Google Drive doesn't let you put a password on a folder or file — sharing is all-or-nothing, either by Google account or 'anyone with the link'. pgate wraps your Drive link with a password gate. Each recipient gets their own password, and you see who opened it, when, and from where.",
    steps: [
      { title: 'Paste your Drive link', text: 'Set your file or folder to “anyone with the link”, copy the URL, and paste it into pgate.' },
      { title: 'Set a password per recipient', text: 'Add a password for each person and label it with their name.' },
      { title: 'Share and track', text: 'Send the pgate link. See exactly who opened your Drive link, when, and from what device.' },
    ],
    faqs: [
      { q: 'Can you password protect a Google Drive folder?', a: 'Not natively — Drive has no password feature. pgate adds one by wrapping your Drive link with a password gate.' },
      { q: 'Does the recipient need a Google account?', a: 'No. They only enter the password you set — no Google login required.' },
      { q: 'Can I see who opened my Drive link?', a: 'Yes. pgate logs every open with a timestamp, location, and device type.' },
      { q: 'Is pgate free?', a: 'Yes. pgate is free to start with no credit card. Pro is $15/year for unlimited links and full analytics.' },
    ],
  },

  'google-sheets': {
    slug: 'google-sheets', brand: 'Google Sheet', brandColor: '#0F9D58', logo: <GoogleSheet />,
    metaTitle: 'Password Protect a Google Sheet',
    metaDescription: 'Google Sheets can lock cells but has no password to open. pgate adds a password to any Sheet link — one per recipient — and shows you who opened it.',
    h1: (<>Password-protect<br /><span style={{ color: '#4ADE80' }}>your Google Sheet</span></>),
    subhead: 'Add a password to your Sheet link. See exactly who opens it.',
    placeholder: 'https://docs.google.com/spreadsheets/d/...',
    intro: "Google Sheets can lock individual cells from editing, but it has no password to open — anyone with the link can view the whole sheet. pgate adds a password in front of your Sheet link, with a different password per person and a record of every open.",
    steps: [
      { title: 'Paste your Sheet link', text: 'Set your Sheet to “anyone with the link”, copy the URL, and paste it into pgate.' },
      { title: 'Set a password per recipient', text: 'Add a password for each person and label it with their name.' },
      { title: 'Share and track', text: 'Send the pgate link. See exactly who opened your Sheet, when, and from what device.' },
    ],
    faqs: [
      { q: 'Can you password protect a Google Sheet?', a: 'Google Sheets can lock cells from editing, but there’s no password to open a sheet. pgate adds one by wrapping your Sheet link with a password gate.' },
      { q: 'Does the recipient need a Google account?', a: 'No. They only enter the password you set — no Google login required.' },
      { q: 'Can I see who opened my Sheet?', a: 'Yes. pgate logs every open with a timestamp, location, and device type.' },
      { q: 'Is pgate free?', a: 'Yes. pgate is free to start with no credit card. Pro is $15/year for unlimited links and full analytics.' },
    ],
  },

  dropbox: {
    slug: 'dropbox', brand: 'Dropbox', brandColor: '#0061FF', logo: <Dropbox />,
    metaTitle: 'Password Protect a Dropbox Link',
    metaDescription: 'Dropbox only allows link passwords on paid plans. pgate wraps any Dropbox link with a password — even on free accounts — and shows you who opened it.',
    h1: (<>Password-protect<br /><span style={{ color: '#4ADE80' }}>your Dropbox link</span></>),
    subhead: 'Add a password to your Dropbox link. See exactly who opens it.',
    placeholder: 'https://dropbox.com/s/your-file...',
    intro: "Dropbox only lets you password-protect a shared link on its paid Professional and Business plans (from $16.58/month), and even then it's one shared password with no analytics. pgate works with any Dropbox link, including free accounts — a separate password per recipient, and you see exactly who opened it, when, and from where.",
    steps: [
      { title: 'Paste your Dropbox link', text: 'Create a shared link in Dropbox, copy it, and paste it into pgate.' },
      { title: 'Set a password per recipient', text: 'Add a password for each person and label it with their name.' },
      { title: 'Share and track', text: 'Send the pgate link. See exactly who opened your Dropbox file, when, and from what device.' },
    ],
    faqs: [
      { q: 'Why can’t I password protect a Dropbox link for free?', a: 'Dropbox restricts link passwords to paid Professional and Business plans. pgate works with any Dropbox link — including free accounts — and gives each recipient their own password.' },
      { q: 'Can I see who opened my Dropbox link?', a: 'Yes. pgate logs every open with a timestamp, location, and device type — something Dropbox’s native protection doesn’t offer.' },
      { q: 'Do I need to change my Dropbox settings?', a: 'No. Keep your Dropbox share link as-is. pgate simply wraps it with a password gate.' },
      { q: 'Is pgate free?', a: 'Yes. pgate is free to start with no credit card. Pro is $15/year for unlimited links and full analytics.' },
    ],
  },

  squarespace: {
    slug: 'squarespace', brand: 'Squarespace', brandColor: '#ffffff', logo: (
      <svg width="28" height="28" viewBox="0 0 40 40" fill="none" stroke="#fff" strokeWidth="2.2" aria-hidden>
        <rect x="8" y="8" width="16" height="16" rx="3" /><rect x="16" y="16" width="16" height="16" rx="3" />
      </svg>
    ),
    metaTitle: 'Password Protect a Squarespace Page',
    metaDescription: 'Squarespace’s page password is one shared password on paid plans, with no analytics. pgate wraps any Squarespace URL with a per-recipient password and shows who opened it.',
    h1: (<>Password-protect<br /><span style={{ color: '#4ADE80' }}>your Squarespace page</span></>),
    subhead: 'One password per recipient. See exactly who opens your Squarespace page.',
    placeholder: 'https://your-site.squarespace.com/...',
    intro: "Squarespace's page password is a single shared password for the whole page, available only on paid plans, and it tells you nothing about who visited. pgate wraps any Squarespace URL with a password — one per recipient — and shows you every open with location and device.",
    steps: [
      { title: 'Paste your Squarespace link', text: 'Copy your Squarespace page URL and paste it into pgate — no plan upgrade needed.' },
      { title: 'Set a password per recipient', text: 'Add a password for each person and label it with their name.' },
      { title: 'Share and track', text: 'Send the pgate link. See exactly who opened your page, when, and from what device.' },
    ],
    faqs: [
      { q: 'Does Squarespace let you password protect a page?', a: 'Squarespace offers a single shared page password on paid plans, with no visitor analytics. pgate works with any Squarespace URL and gives each recipient their own password.' },
      { q: 'Can I see who opened my Squarespace page?', a: 'Yes. pgate logs every open with a timestamp, location, and device type.' },
      { q: 'Do I need to change my Squarespace settings?', a: 'No. Leave your page as-is. pgate simply wraps the link with a password gate.' },
      { q: 'Is pgate free?', a: 'Yes. pgate is free to start with no credit card. Pro is $15/year for unlimited links and full analytics.' },
    ],
  },

  notion: {
    slug: 'notion', brand: 'Notion', brandColor: '#ffffff', logo: <Notion />,
    metaTitle: 'Password Protect a Notion Page',
    metaDescription: 'Notion has no password option for shared pages. pgate adds a password to any Notion link — one per recipient — and shows you exactly who opened it.',
    h1: (<>Password-protect<br /><span style={{ color: '#4ADE80' }}>your Notion page</span></>),
    subhead: 'Add a password to your Notion page. See exactly who opens it.',
    placeholder: 'https://notion.so/your-page...',
    intro: "Notion's 'Share to web' makes a page public to anyone with the link — there's no password option unless you're on an enterprise plan. pgate adds a password to your Notion link, gives each person their own, and logs who opened it, when, and from where.",
    steps: [
      { title: 'Paste your Notion link', text: 'Enable “Share to web” on your Notion page, copy the link, and paste it into pgate.' },
      { title: 'Set a password per recipient', text: 'Add a password for each person and label it with their name.' },
      { title: 'Share and track', text: 'Send the pgate link. See exactly who opened your Notion page, when, and from what device.' },
    ],
    faqs: [
      { q: 'Can you password protect a Notion page?', a: 'Not on standard plans — Notion’s public sharing has no password. pgate adds one by wrapping your Notion link with a password gate.' },
      { q: 'Does the recipient need a Notion account?', a: 'No. They only enter the password you set — no Notion login required.' },
      { q: 'Can I see who opened my Notion page?', a: 'Yes. pgate logs every open with a timestamp, location, and device type.' },
      { q: 'Is pgate free?', a: 'Yes. pgate is free to start with no credit card. Pro is $15/year for unlimited links and full analytics.' },
    ],
  },

  wordpress: {
    slug: 'wordpress', brand: 'WordPress', brandColor: '#3858E9', logo: <WordPress />,
    metaTitle: 'Password Protect a WordPress Page',
    metaDescription: 'WordPress’s built-in page password is one shared password with no analytics. pgate wraps any WordPress URL with a per-recipient password and shows who opened it.',
    h1: (<>Password-protect<br /><span style={{ color: '#4ADE80' }}>your WordPress page</span></>),
    subhead: 'One password per recipient. See exactly who opens your WordPress page.',
    placeholder: 'https://yoursite.com/your-page...',
    intro: "WordPress has a built-in page password, but it's one shared password, offers no analytics, and often needs a plugin for anything more. pgate wraps any WordPress URL with a password — a separate one per recipient — and shows you exactly who opened it, when, and from where.",
    steps: [
      { title: 'Paste your WordPress link', text: 'Copy your WordPress page or post URL and paste it into pgate — no plugin required.' },
      { title: 'Set a password per recipient', text: 'Add a password for each person and label it with their name.' },
      { title: 'Share and track', text: 'Send the pgate link. See exactly who opened your page, when, and from what device.' },
    ],
    faqs: [
      { q: 'Does WordPress let you password protect a page?', a: 'WordPress has a built-in page password, but it’s one shared password with no analytics. pgate gives each recipient their own password and shows you who opened it.' },
      { q: 'Do I need a plugin?', a: 'No. pgate works with any WordPress URL — no plugin, no theme changes.' },
      { q: 'Can I see who opened my WordPress page?', a: 'Yes. pgate logs every open with a timestamp, location, and device type.' },
      { q: 'Is pgate free?', a: 'Yes. pgate is free to start with no credit card. Pro is $15/year for unlimited links and full analytics.' },
    ],
  },

  website: {
    slug: 'website', brand: 'website', brandColor: '#4ADE80', logo: <Website />,
    metaTitle: 'Password Protect a Website',
    metaDescription: 'Password protect any web page without server config or plugins. Paste the URL, set a password per recipient, and see exactly who opens it.',
    h1: (<>Password-protect<br /><span style={{ color: '#4ADE80' }}>any website</span></>),
    subhead: 'Add a password to any web page. See exactly who opens it.',
    placeholder: 'https://yoursite.com/page...',
    nativeTitle: 'Adding a password to a web page — the hard way',
    intro: "Adding a password to a web page usually means editing server config, .htaccess files, or installing a plugin — and none of that tells you who visited. pgate skips all of it: paste any URL, set a password, and share the pgate link. Give each visitor their own password and see exactly who opens it, when, and from where.",
    steps: [
      { title: 'Paste your URL', text: 'Copy any web page URL and paste it into pgate — no server access needed.' },
      { title: 'Set a password per recipient', text: 'Add a password for each person and label it with their name.' },
      { title: 'Share and track', text: 'Send the pgate link. See exactly who opened your page, when, and from what device.' },
    ],
    faqs: [
      { q: 'How do I password protect a web page without coding?', a: 'Paste the URL into pgate and set a password — no .htaccess, server config, or plugins. pgate wraps the link with a password gate.' },
      { q: 'Can I use a different password for each person?', a: 'Yes. Give every recipient their own password, labelled by name, so you always know who opened it.' },
      { q: 'Can I see who opened my page?', a: 'Yes. pgate logs every open with a timestamp, location, and device type.' },
      { q: 'Is pgate free?', a: 'Yes. pgate is free to start with no credit card. Pro is $15/year for unlimited links and full analytics.' },
    ],
  },

  netlify: {
    slug: 'netlify', brand: 'Netlify', brandColor: '#00AD9F', logo: <Netlify />,
    metaTitle: 'Password Protect a Netlify Site',
    metaDescription: 'Netlify’s password protection is paid-plan only and site-wide. pgate wraps any Netlify URL with a per-recipient password and shows you exactly who opened it.',
    h1: (<>Password-protect<br /><span style={{ color: '#4ADE80' }}>your Netlify site</span></>),
    subhead: 'One password per recipient. See exactly who opens your Netlify site.',
    placeholder: 'https://your-site.netlify.app/...',
    intro: "Netlify's password protection is site-wide with a single password, available only on paid plans, and it tells you nothing about who visited. pgate wraps any Netlify URL with a password — one per recipient — and logs every open with device and location.",
    steps: [
      { title: 'Paste your Netlify link', text: 'Copy your Netlify site or deploy URL and paste it into pgate — no plan upgrade needed.' },
      { title: 'Set a password per recipient', text: 'Add a password for each person and label it with their name.' },
      { title: 'Share and track', text: 'Send the pgate link. See exactly who opened your site, when, and from what device.' },
    ],
    faqs: [
      { q: 'Does Netlify offer free password protection?', a: 'No. Netlify’s site-wide password protection is a paid feature. pgate works with any Netlify URL and gives each recipient their own password.' },
      { q: 'Can I see who opened my Netlify site?', a: 'Yes. pgate logs every open with a timestamp, location, and device type.' },
      { q: 'Do I need to change my Netlify config?', a: 'No. Leave your deploy as-is. pgate simply wraps the link with a password gate.' },
      { q: 'Is pgate free?', a: 'Yes. pgate is free to start with no credit card. Pro is $15/year for unlimited links and full analytics.' },
    ],
  },

  youtube: {
    slug: 'youtube', brand: 'YouTube', brandColor: '#FF0000', logo: <YouTube />,
    metaTitle: 'Password Protect a YouTube Video',
    metaDescription: 'YouTube has no password option — only Public, Unlisted, or Private. pgate wraps any YouTube link with a password and shows you exactly who watched.',
    h1: (<>Password-protect<br /><span style={{ color: '#4ADE80' }}>your YouTube video</span></>),
    subhead: 'Add a password to your YouTube link. See exactly who watches it.',
    placeholder: 'https://youtube.com/watch?v=...',
    intro: "YouTube only offers Public, Unlisted, or Private — and 'Private' forces viewers to sign in with a Google account you've added. There's no password option. pgate wraps your YouTube link with a password so anyone with it can watch, and you see exactly who did, when, and from where.",
    steps: [
      { title: 'Paste your YouTube link', text: 'Set your video to Unlisted, copy the link, and paste it into pgate.' },
      { title: 'Set a password per recipient', text: 'Add a password for each person and label it with their name.' },
      { title: 'Share and track', text: 'Send the pgate link. See exactly who opened your video, when, and from what device.' },
    ],
    faqs: [
      { q: 'Can you password protect a YouTube video?', a: 'Not natively — YouTube only has Public, Unlisted, and Private. pgate adds a password by wrapping your YouTube link with a password gate.' },
      { q: 'Does the viewer need a Google account?', a: 'No. Unlike YouTube’s “Private” setting, pgate only requires the password you set — no Google login.' },
      { q: 'Can I see who watched my video?', a: 'Yes. pgate logs every open with a timestamp, location, and device type.' },
      { q: 'Is pgate free?', a: 'Yes. pgate is free to start with no credit card. Pro is $15/year for unlimited links and full analytics.' },
    ],
  },

  framer: {
    slug: 'framer', brand: 'Framer', brandColor: '#0099FF', logo: <Framer />,
    metaTitle: 'Framer Password Protect: Add a Page Password',
    metaDescription: 'Framer’s password protection is a single shared password on paid plans, with no view analytics. pgate wraps any Framer link with a per-recipient password.',
    h1: (<>Password-protect<br /><span style={{ color: '#4ADE80' }}>your Framer site</span></>),
    subhead: 'One password per recipient. See exactly who opens your Framer site.',
    placeholder: 'https://your-site.framer.website/...',
    intro: "Framer's password protection is a single shared password on paid plans, with no analytics on who visited. pgate wraps any Framer link with a password — a separate one per recipient — and shows you exactly who opened your site, when, and from where.",
    steps: [
      { title: 'Paste your Framer link', text: 'Copy your Framer site or page URL and paste it into pgate — no plan upgrade needed.' },
      { title: 'Set a password per recipient', text: 'Add a password for each person and label it with their name.' },
      { title: 'Share and track', text: 'Send the pgate link. See exactly who opened your site, when, and from what device.' },
    ],
    faqs: [
      { q: 'Does Framer let you password protect a page?', a: 'Framer offers a single shared password on paid plans, with no visitor analytics. pgate works with any Framer link and gives each recipient their own password.' },
      { q: 'Can I see who opened my Framer site?', a: 'Yes. pgate logs every open with a timestamp, location, and device type.' },
      { q: 'Do I need to change my Framer settings?', a: 'No. Leave your site as-is. pgate simply wraps the link with a password gate.' },
      { q: 'Is pgate free?', a: 'Yes. pgate is free to start with no credit card. Pro is $15/year for unlimited links and full analytics.' },
    ],
  },

  figma: {
    slug: 'figma', brand: 'Figma', brandColor: '#F24E1E', logo: <Figma />,
    metaTitle: 'Password Protect a Figma File',
    metaDescription: 'Figma sharing has no password — only email invites or “anyone with the link”. pgate adds a password to any Figma link and shows you who opened it.',
    h1: (<>Password-protect<br /><span style={{ color: '#4ADE80' }}>your Figma file</span></>),
    subhead: 'Add a password to your Figma link. See exactly who opens it.',
    placeholder: 'https://figma.com/file/your-design...',
    intro: "Figma sharing is by email invite or 'anyone with the link' — there's no password, and a link can be forwarded to anyone. pgate adds a password to your Figma link, gives each recipient their own, and logs every open with location and device.",
    steps: [
      { title: 'Paste your Figma link', text: 'Set your file to “anyone with the link”, copy the URL, and paste it into pgate.' },
      { title: 'Set a password per recipient', text: 'Add a password for each person and label it with their name.' },
      { title: 'Share and track', text: 'Send the pgate link. See exactly who opened your Figma file, when, and from what device.' },
    ],
    faqs: [
      { q: 'Can you password protect a Figma file?', a: 'Not natively — Figma sharing has no password. pgate adds one by wrapping your Figma link with a password gate.' },
      { q: 'Does the recipient need a Figma account?', a: 'No. They only enter the password you set — no Figma login required to open the gate.' },
      { q: 'Can I see who opened my Figma file?', a: 'Yes. pgate logs every open with a timestamp, location, and device type.' },
      { q: 'Is pgate free?', a: 'Yes. pgate is free to start with no credit card. Pro is $15/year for unlimited links and full analytics.' },
    ],
  },

  wix: {
    slug: 'wix', brand: 'Wix', brandColor: '#ffffff', logo: <Wix />,
    metaTitle: 'Password Protect a Wix Page',
    metaDescription: 'Wix’s page password is one shared password on paid plans, with no analytics. pgate wraps any Wix URL with a per-recipient password and shows who opened it.',
    h1: (<>Password-protect<br /><span style={{ color: '#4ADE80' }}>your Wix page</span></>),
    subhead: 'One password per recipient. See exactly who opens your Wix page.',
    placeholder: 'https://your-site.wixsite.com/...',
    intro: "Wix's password protection is a single shared password per page on paid plans, with no analytics on who visited. pgate wraps any Wix link with a password — one per recipient — and shows you who opened it, when, and from where.",
    steps: [
      { title: 'Paste your Wix link', text: 'Copy your Wix page URL and paste it into pgate — no plan upgrade needed.' },
      { title: 'Set a password per recipient', text: 'Add a password for each person and label it with their name.' },
      { title: 'Share and track', text: 'Send the pgate link. See exactly who opened your page, when, and from what device.' },
    ],
    faqs: [
      { q: 'How do I password protect a Wix site?', a: 'Wix offers a single shared page password on paid plans. pgate works with any Wix URL and gives each recipient their own password, plus analytics.' },
      { q: 'Can I see who opened my Wix page?', a: 'Yes. pgate logs every open with a timestamp, location, and device type.' },
      { q: 'Do I need to change my Wix settings?', a: 'No. Leave your page as-is. pgate simply wraps the link with a password gate.' },
      { q: 'Is pgate free?', a: 'Yes. pgate is free to start with no credit card. Pro is $15/year for unlimited links and full analytics.' },
    ],
  },

  loom: {
    slug: 'loom', brand: 'Loom', brandColor: '#625DF5', logo: <Loom />,
    metaTitle: 'Password Protect a Loom Video',
    metaDescription: 'Loom’s password protection is paid-plan only. pgate wraps any Loom link with a per-recipient password and shows you exactly who watched.',
    h1: (<>Password-protect<br /><span style={{ color: '#4ADE80' }}>your Loom video</span></>),
    subhead: 'Add a password to your Loom link. See exactly who watches it.',
    placeholder: 'https://loom.com/share/...',
    intro: "Loom's password protection is limited to paid plans, and it's one shared password with only basic view data. pgate wraps any Loom link with a password — a separate one per recipient — so you know exactly who watched, when, and from where.",
    steps: [
      { title: 'Paste your Loom link', text: 'Copy your Loom share link and paste it into pgate — no plan upgrade needed.' },
      { title: 'Set a password per recipient', text: 'Add a password for each person and label it with their name.' },
      { title: 'Share and track', text: 'Send the pgate link. See exactly who opened your video, when, and from what device.' },
    ],
    faqs: [
      { q: 'Does Loom offer free password protection?', a: 'No. Loom’s password protection is a paid feature. pgate works with any Loom link and gives each recipient their own password.' },
      { q: 'Can I see who watched my Loom video?', a: 'Yes. pgate logs every open with a timestamp, location, and device type.' },
      { q: 'Does the viewer need a Loom account?', a: 'No. They only enter the password you set — no Loom login required.' },
      { q: 'Is pgate free?', a: 'Yes. pgate is free to start with no credit card. Pro is $15/year for unlimited links and full analytics.' },
    ],
  },

  wetransfer: {
    slug: 'wetransfer', brand: 'WeTransfer', brandColor: '#409FFF', logo: <WeTransfer />,
    metaTitle: 'Password Protect a WeTransfer Link',
    metaDescription: 'WeTransfer only offers link passwords on its paid Pro plan. pgate wraps any WeTransfer link with a per-recipient password and shows you who opened it.',
    h1: (<>Password-protect<br /><span style={{ color: '#4ADE80' }}>your WeTransfer link</span></>),
    subhead: 'Add a password to your WeTransfer link. See exactly who opens it.',
    placeholder: 'https://we.tl/your-transfer...',
    intro: "WeTransfer only offers password protection on its paid Pro plan, and it's one password for the whole transfer. pgate wraps any WeTransfer link with a password — one per recipient — and logs who opened it, when, and from where.",
    steps: [
      { title: 'Paste your WeTransfer link', text: 'Copy your WeTransfer link and paste it into pgate — no Pro plan needed.' },
      { title: 'Set a password per recipient', text: 'Add a password for each person and label it with their name.' },
      { title: 'Share and track', text: 'Send the pgate link. See exactly who opened your transfer, when, and from what device.' },
    ],
    faqs: [
      { q: 'Does WeTransfer offer free password protection?', a: 'No. WeTransfer’s link password is a paid Pro feature. pgate works with any WeTransfer link and gives each recipient their own password.' },
      { q: 'Can I see who opened my WeTransfer link?', a: 'Yes. pgate logs every open with a timestamp, location, and device type.' },
      { q: 'Do I need to change my WeTransfer settings?', a: 'No. Keep your transfer link as-is. pgate simply wraps it with a password gate.' },
      { q: 'Is pgate free?', a: 'Yes. pgate is free to start with no credit card. Pro is $15/year for unlimited links and full analytics.' },
    ],
  },

}

export const SEO_SLUGS = Object.keys(SEO_PAGES)
