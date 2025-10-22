import type { Route } from "./+types/robots[.]txt";

export function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const baseUrl = `${url.protocol}//${url.host}`;
  
  const robotsTxt = `User-agent: *
Allow: /

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Disallow admin and private areas
Disallow: /admin/
Disallow: /resume-pdf/

# Allow all other content
Allow: /about
Allow: /portfolio
Allow: /contact`;

  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}



