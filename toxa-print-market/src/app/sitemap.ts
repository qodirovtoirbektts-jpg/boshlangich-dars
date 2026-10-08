import { MetadataRoute } from 'next';
import { INITIAL_PRODUCTS } from '../data/products';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://toxaprint.uz';
  const currentDate = new Date().toISOString();

  // Asosiy sahifalar
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/#catalog`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/#b2b-section`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  // Barcha mahsulotlar uchun dinamik Google indekslash havolalari
  const productRoutes: MetadataRoute.Sitemap = INITIAL_PRODUCTS.map((product) => ({
    url: `${baseUrl}/?product=${product.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...routes, ...productRoutes];
}
