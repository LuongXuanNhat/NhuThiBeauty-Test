// src/app/stories/sitemap.xml/route.ts
import { NextResponse } from "next/server";
import { blogDataSource } from "@/utils/blogDataSource";

const createSlug = (title: string): string => {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[đĐ]/g, "d")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
};

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://your-domain.com";

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${blogDataSource
  .map((blog) => {
    const slug = createSlug(blog.title);
    const url = `${baseUrl}/stories/${blog.id}/${slug}`;
    const lastmod = blog.date?.toISOString().split("T")[0];

    return `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
  })
  .join("\n")}
</urlset>`;

  return new NextResponse(sitemap, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}

// Script để generate sitemap tĩnh (optional)
export async function generateStaticSitemap() {
  const fs = require("fs");
  const path = require("path");

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://your-domain.com";

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${blogDataSource
  .map((blog) => {
    const slug = createSlug(blog.title);
    const url = `${baseUrl}/stories/${blog.id}/${slug}`;
    const lastmod = blog.date?.toISOString().split("T")[0];

    return `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
  })
  .join("\n")}
</urlset>`;

  const sitemapPath = path.join(process.cwd(), "public", "stories-sitemap.xml");
  fs.writeFileSync(sitemapPath, sitemap);
  console.log(
    "✅ Sitemap generated successfully at public/stories-sitemap.xml"
  );
}
