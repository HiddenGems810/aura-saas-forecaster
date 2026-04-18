import { MetadataRoute } from 'next';

const BASE_URL = 'https://aurarevenue.com';

/**
 * Sitemap priorities:
 *  1.0  — homepage (interactive tool, weekly content updates)
 *  0.8  — high-value 'Helpful Content' sections (SEO signal: deep editorial)
 *  0.5  — legal pages (crawled but low index priority)
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date('2025-01-01'),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: new Date('2025-01-01'),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];
}
