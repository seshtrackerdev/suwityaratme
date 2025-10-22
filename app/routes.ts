import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("about", "routes/about.tsx"),
  route("portfolio", "routes/portfolio.tsx"),
  route("contact", "routes/contact.tsx"),
  route("admin", "routes/admin.tsx"),
  route("resume-pdf", "routes/resume-pdf.tsx"),
  route("robots.txt", "routes/robots[.]txt.tsx"),
  route("sitemap.xml", "routes/sitemap[.]xml.tsx"),
  route("*", "routes/$.tsx")
] satisfies RouteConfig;
