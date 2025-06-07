// app/sitemap.ts
import { home, routes } from "@/config/routes";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const homeEntry = {
    url: `${baseUrl}${home.path}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 1,
  };

  const routeEntries = routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [homeEntry, ...routeEntries];
}
