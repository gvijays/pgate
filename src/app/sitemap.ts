import { MetadataRoute } from 'next'
import { SEO_SLUGS } from '@/lib/seo-pages'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://pgate.io'
  const now = new Date()

  const seoPages: MetadataRoute.Sitemap = SEO_SLUGS.map(slug => ({
    url: `${base}/password-protect/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    {
      url: base,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${base}/pricing`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...seoPages,
    {
      url: `${base}/login`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ]
}
