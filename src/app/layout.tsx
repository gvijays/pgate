import type { Metadata } from 'next'
import { Fraunces, Onest } from 'next/font/google'
import '@fontsource-variable/jetbrains-mono'
import './globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  axes: ['opsz'],          // optical size axis for display sizes
  variable: '--font-heading',
  display: 'swap',
})

const onest = Onest({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: { default: 'pgate — Password-protect any link and track who opens it', template: '%s | pgate' },
  description: 'Password-protect any URL in seconds. Works with Figma, Notion, Google Drive, and more. Give each recipient their own password — see exactly who opened it.',
  keywords: ['password protect link', 'password protect URL', 'password protect Figma', 'password protect Google Drive', 'secure link sharing', 'track who opened link', 'named password sharing', 'secure file sharing'],
  metadataBase: new URL('https://pgate.io'),
  alternates: { canonical: 'https://pgate.io' },
  openGraph: {
    title: 'pgate — Password-protect any link and track who opens it',
    description: 'Works with Figma, Notion, Google Drive, and anything with a URL. Each recipient gets their own password — you always know exactly who opened it.',
    siteName: 'pgate',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'pgate — Password-protect any link' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'pgate — Password-protect any link',
    description: 'Works with Figma, Notion, Google Drive, and more. Know exactly who opened it, when, and from where.',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${fraunces.variable} ${onest.variable} font-sans antialiased`}>{children}</body>
    </html>
  )
}
