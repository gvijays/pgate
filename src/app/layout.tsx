import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Inter({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = JetBrains_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

export const metadata: Metadata = {
  title: { default: 'pgate — Gate anything. Know everyone.', template: '%s | pgate' },
  description: 'Password-protect any URL, file, or link in seconds. Know exactly who opened it, when, and from where.',
  keywords: ['password protect link', 'password protect url', 'password protect file', 'secure link sharing', 'gated content'],
  metadataBase: new URL('https://pgate.io'),
  openGraph: {
    title: 'pgate — Gate anything. Know everyone.',
    description: 'Password-protect any URL in seconds. Know exactly who opened it.',
    siteName: 'pgate',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: 'pgate', description: 'Password-protect any URL in seconds.' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
