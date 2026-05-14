export type Plan = 'free' | 'maker' | 'pro'

export interface Profile {
  id: string
  email: string | null
  full_name: string | null
  avatar_url: string | null
  vanity_slug: string | null
  plan: Plan
  created_at: string
  updated_at: string
}

export interface Gate {
  id: string
  user_id: string
  title: string | null
  target_url: string
  slug: string
  is_active: boolean
  expires_at: string | null
  theme_bg_color: string
  theme_card_style: 'light' | 'dark'
  theme_logo_url: string | null
  theme_bg_image_url: string | null
  theme_headline: string | null
  theme_button_color: string
  theme_hide_branding: boolean
  created_at: string
  updated_at: string
  // joined
  password_count?: number
  view_count?: number
  last_viewed_at?: string | null
}

export interface GatePassword {
  id: string
  gate_id: string
  label: string
  password_hash: string
  password: string | null
  expires_at: string | null
  is_active: boolean
  created_at: string
}

export interface GateView {
  id: string
  gate_id: string
  password_id: string | null
  viewed_at: string
  country: string | null
  city: string | null
  device_type: 'mobile' | 'desktop' | 'tablet' | 'unknown'
  ip_hash: string | null
  is_successful: boolean
  // joined
  password_label?: string | null
}

export interface Subscription {
  id: string
  user_id: string
  paddle_subscription_id: string | null
  paddle_customer_id: string | null
  price_id: string | null
  plan: 'maker_monthly' | 'maker_annual' | 'pro_monthly' | 'pro_annual' | null
  status: 'active' | 'cancelled' | 'past_due' | 'paused' | 'trialing'
  current_period_end: string | null
  created_at: string
  updated_at: string
}

export interface PlanLimits {
  maxGates: number
  maxPasswordsPerGate: number
  fullAnalytics: boolean
  customExpiry: boolean
  customSlug: boolean
  customBranding: boolean
  whiteLabel: boolean
  emailNotifications: boolean
  weeklyDigest: boolean
  failedAttemptAlerts: boolean
}

export const PLAN_LIMITS: Record<Plan, PlanLimits> = {
  free: {
    maxGates: 2,
    maxPasswordsPerGate: 2,
    fullAnalytics: false,
    customExpiry: false,
    customSlug: false,
    customBranding: false,
    whiteLabel: false,
    emailNotifications: false,
    weeklyDigest: false,
    failedAttemptAlerts: false,
  },
  maker: {
    maxGates: 15,
    maxPasswordsPerGate: 10,
    fullAnalytics: true,
    customExpiry: true,
    customSlug: true,
    customBranding: false,
    whiteLabel: false,
    emailNotifications: true,
    weeklyDigest: true,
    failedAttemptAlerts: true,
  },
  pro: {
    maxGates: Infinity,
    maxPasswordsPerGate: 20,
    fullAnalytics: true,
    customExpiry: true,
    customSlug: true,
    customBranding: true,
    whiteLabel: true,
    emailNotifications: true,
    weeklyDigest: true,
    failedAttemptAlerts: true,
  },
}

export const PRICING = {
  maker: { monthly: 6, annual: 24, annualMonthly: 2 },
  pro:   { monthly: 10, annual: 36, annualMonthly: 3 },
}

export const PADDLE_PRICES = {
  maker_monthly: process.env.NEXT_PUBLIC_PADDLE_MAKER_MONTHLY!,
  maker_annual:  process.env.NEXT_PUBLIC_PADDLE_MAKER_ANNUAL!,
  pro_monthly:   process.env.NEXT_PUBLIC_PADDLE_PRO_MONTHLY!,
  pro_annual:    process.env.NEXT_PUBLIC_PADDLE_PRO_ANNUAL!,
}
