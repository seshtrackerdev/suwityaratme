import type { Route } from "./+types/sitemap[.]xml";

export function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const baseUrl = `${url.protocol}//${url.host}`;
  
  // Get current date in ISO format
  const lastmod = new Date().toISOString().split('T')[0];
  
  // Define your site's pages with their priorities and change frequencies
  const pages = [
    { path: '', priority: '1.0', changefreq: 'weekly' }, // Home page
    { path: '/about', priority: '0.9', changefreq: 'monthly' },
    { path: '/portfolio', priority: '0.9', changefreq: 'weekly' },
    { path: '/contact', priority: '0.8', changefreq: 'monthly' },
    { path: '/resume-pdf', priority: '0.6', changefreq: 'monthly' },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${baseUrl}${page.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}


