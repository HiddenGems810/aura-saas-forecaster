import { MetadataRoute } from 'next';
import { importantPaths, SITE_URL } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date('2026-04-28');

  return importantPaths.map((path) => ({
    url: `${SITE_URL}${path === '/' ? '' : path}`,
    lastModified,
    changeFrequency: path === '/' || path === '/calculator' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : path.includes('/learn/') ? 0.8 : 0.7,
  }));
}
