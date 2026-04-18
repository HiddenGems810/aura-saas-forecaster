import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Aura SaaS Wealth Forecaster',
    short_name: 'Aura',
    description: 'Project your SaaS MRR and compound wealth trajectory interactively.',
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait-primary',
    background_color: '#050507',
    theme_color: '#d4af37',
    categories: ['finance', 'business', 'productivity'],
    icons: [
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
