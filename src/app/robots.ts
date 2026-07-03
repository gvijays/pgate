import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // General crawlers
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/dashboard/', '/api/'],
      },
      // OpenAI / ChatGPT
      {
        userAgent: 'GPTBot',
        allow: ['/', '/blog/', '/pricing', '/password-protect/'],
        disallow: ['/dashboard/', '/api/'],
      },
      // Anthropic / Claude
      {
        userAgent: 'ClaudeBot',
        allow: ['/', '/blog/', '/pricing', '/password-protect/'],
        disallow: ['/dashboard/', '/api/'],
      },
      // Perplexity
      {
        userAgent: 'PerplexityBot',
        allow: ['/', '/blog/', '/pricing', '/password-protect/'],
        disallow: ['/dashboard/', '/api/'],
      },
      // Google AI / Gemini
      {
        userAgent: 'Google-Extended',
        allow: ['/', '/blog/', '/pricing', '/password-protect/'],
        disallow: ['/dashboard/', '/api/'],
      },
      // Meta AI
      {
        userAgent: 'FacebookBot',
        allow: ['/', '/blog/', '/pricing', '/password-protect/'],
        disallow: ['/dashboard/', '/api/'],
      },
    ],
    sitemap: 'https://pgate.io/sitemap.xml',
  }
}
