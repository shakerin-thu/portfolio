import type { MetadataRoute } from 'next';

import { profile } from '@/content/profile';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: profile.name,
    short_name: profile.shortName,
    description: profile.role,
    start_url: '/',
    display: 'standalone',
    background_color: '#050505',
    theme_color: '#050505',
    icons: [
      { src: '/icon.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  };
}
