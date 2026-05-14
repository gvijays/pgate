/**
 * Server-side Paddle price fetcher.
 * Fetches live prices from Paddle Billing API and caches for 1 hour.
 * Falls back to hardcoded values if the API is unavailable.
 */

export type PaddlePrices = {
  maker: { monthly: number; annual: number; annualMonthly: number }
  pro:   { monthly: number; annual: number; annualMonthly: number }
}

/** Hardcoded fallback — used if Paddle API is unreachable or price IDs are missing */
const FALLBACK: PaddlePrices = {
  maker: { monthly: 6,  annual: 24, annualMonthly: 2 },
  pro:   { monthly: 10, annual: 36, annualMonthly: 3 },
}

const BASE_URL = 'https://api.paddle.com'

/** Fetch a single price from Paddle and return the amount in major currency units (e.g. dollars) */
async function fetchPrice(priceId: string, apiKey: string): Promise<number | null> {
  try {
    const res = await fetch(`${BASE_URL}/prices/${priceId}`, {
      headers: { Authorization: `Bearer ${apiKey}` },
      // Cache for 1 hour — revalidated in the background by Next.js ISR
      next: { revalidate: 3600 },
    })
    if (!res.ok) return null
    const { data } = await res.json()
    // Paddle returns amount as a string in the smallest currency unit (e.g. cents)
    const raw = parseInt(data?.unit_price?.amount ?? '0', 10)
    return raw / 100
  } catch {
    return null
  }
}

export async function fetchPaddlePrices(): Promise<PaddlePrices> {
  const apiKey        = process.env.PADDLE_API_KEY
  const makerMonthlyId = process.env.NEXT_PUBLIC_PADDLE_MAKER_MONTHLY
  const makerAnnualId  = process.env.NEXT_PUBLIC_PADDLE_MAKER_ANNUAL
  const proMonthlyId   = process.env.NEXT_PUBLIC_PADDLE_PRO_MONTHLY
  const proAnnualId    = process.env.NEXT_PUBLIC_PADDLE_PRO_ANNUAL

  if (!apiKey || !makerMonthlyId || !makerAnnualId || !proMonthlyId || !proAnnualId) {
    console.warn('[paddle-prices] Missing env vars — using fallback pricing')
    return FALLBACK
  }

  const [makerMonthly, makerAnnual, proMonthly, proAnnual] = await Promise.all([
    fetchPrice(makerMonthlyId, apiKey),
    fetchPrice(makerAnnualId,  apiKey),
    fetchPrice(proMonthlyId,   apiKey),
    fetchPrice(proAnnualId,    apiKey),
  ])

  if (!makerMonthly || !makerAnnual || !proMonthly || !proAnnual) {
    console.warn('[paddle-prices] One or more prices failed to load — using fallback pricing')
    return FALLBACK
  }

  return {
    maker: {
      monthly:        makerMonthly,
      annual:         makerAnnual,
      annualMonthly:  Math.round(makerAnnual / 12),
    },
    pro: {
      monthly:        proMonthly,
      annual:         proAnnual,
      annualMonthly:  Math.round(proAnnual / 12),
    },
  }
}
