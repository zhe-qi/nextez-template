import type { MetadataRoute } from 'next';
import { getBaseUrl } from '@/lib/helpers';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${getBaseUrl()}/`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
    // 添加更多URL
  ];
}
