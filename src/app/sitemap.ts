import type { MetadataRoute } from 'next';
import { locations } from '@/data/locations';

const SITE_URL = 'https://stormcalculator.razorsharpnetworks.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const seenStates = new Set<string>();
  const statePages: MetadataRoute.Sitemap = locations
    .filter((loc) => {
      if (seenStates.has(loc.stateCode)) return false;
      seenStates.add(loc.stateCode);
      return true;
    })
    .map((loc) => ({
      url: `${SITE_URL}/states/${loc.stateCode.toLowerCase()}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    }));

  const locationPages: MetadataRoute.Sitemap = locations.map((loc) => ({
    url: `${SITE_URL}/${loc.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/calculator`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/answers`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...statePages,
    ...locationPages,
  ];
}
