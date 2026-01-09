// ===============================================
// Sitemap Generator for Prole Adventures
// ===============================================
// This generates a sitemap.xml based on defined routes

const BASE_URL = 'https://proleadventures.com';

interface SitemapUrl {
  url: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

const routes: SitemapUrl[] = [
  { url: '/', changefreq: 'weekly', priority: 1.0 },
  { url: '/watch', changefreq: 'weekly', priority: 0.8 },
  { url: '/gear', changefreq: 'monthly', priority: 0.7 },
  { url: '/stories', changefreq: 'weekly', priority: 0.9 },
  { url: '/community', changefreq: 'weekly', priority: 0.8 },
  { url: '/about', changefreq: 'monthly', priority: 0.6 },
  { url: '/contact', changefreq: 'monthly', priority: 0.5 },
  { url: '/privacy-policy', changefreq: 'yearly', priority: 0.3 },
  { url: '/terms', changefreq: 'yearly', priority: 0.3 },
];

export const generateSitemap = (): string => {
  const today = new Date().toISOString().split('T')[0];

  const sitemapUrls = routes.map((route) => {
    return `
  <url>
    <loc>${BASE_URL}${route.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.join('')}
</urlset>`;
};

// Export for use in server/edge function
export default generateSitemap;
