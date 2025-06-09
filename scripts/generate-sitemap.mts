// scripts/generate-sitemap.mts
import { writeFileSync, readFileSync, existsSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { config } from "dotenv";
config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface BlogPost {
  id: string;
  title: string;
  date: Date;
  description: string;
}

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

// Đọc data từ blogDataSource.ts
function getBlogDataFromSource(): BlogPost[] {
  const blogDataSourcePath = join(
    __dirname,
    "..",
    "src",
    "utils",
    "blogDataSource.ts"
  );

  if (!existsSync(blogDataSourcePath)) {
    console.error("❌ File blogDataSource.ts not found!");
    return [];
  }

  try {
    const sourceContent = readFileSync(blogDataSourcePath, "utf-8");

    // Extract blog data từ export
    const blogPosts: BlogPost[] = [];

    // Tìm các object trong array
    const objectMatches = sourceContent.match(/{\s*id:\s*\d+[^}]*}/g);

    if (objectMatches) {
      for (const objStr of objectMatches) {
        // Extract các field cần thiết
        const idMatch = objStr.match(/id:\s*(\d+)/);
        const titleMatch = objStr.match(/title:\s*["']([^"']+)["']/);
        const dateMatch = objStr.match(/date:\s*new Date\(["']([^"']+)["']\)/);
        const descriptionMatch =
          objStr.match(/subTitle:\s*["']([^"']+)["']/) ||
          objStr.match(/description:\s*["']([^"']+)["']/);

        if (idMatch && titleMatch) {
          blogPosts.push({
            id: idMatch[1],
            title: titleMatch[1],
            date: dateMatch?.[1] ? new Date(dateMatch[1]) : new Date(),
            description: descriptionMatch?.[1] || "",
          });
        }
      }
    }

    return blogPosts.sort((a, b) => b.date.getTime() - a.date.getTime());
  } catch (error) {
    console.error("❌ Error reading blogDataSource.ts:", error);
    return [];
  }
}

async function generateSitemap(): Promise<void> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  console.log("🔍 Reading blog data from blogDataSource.ts...");
  const blogPosts = getBlogDataFromSource();

  if (blogPosts.length === 0) {
    console.warn("⚠️  No blog posts found in blogDataSource.ts!");
    return;
  }

  // Tạo sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Blog posts -->
${blogPosts
  .map((blog) => {
    const slug = createSlug(blog.title);
    const url = `${baseUrl}/stories/${blog.id}/${slug}`;
    const lastmod = blog.date.toISOString().split("T")[0];

    return `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
  })
  .join("\n")}
</urlset>`;

  // Tạo sitemap trong public folder
  const publicSitemapPath = join(
    __dirname,
    "..",
    "src/pages/stories",
    "sitemap.xml"
  );

  // Tạo || Ghi đè file
  writeFileSync(publicSitemapPath, sitemap);

  console.log("✅ Blog sitemap generated successfully!");
  console.log(`📁 Public sitemap: ${publicSitemapPath}`);
  console.log(`🔗 Accessible at: ${baseUrl}/sitemap.xml`);
  console.log(`📊 Total blog entries: ${blogPosts.length}`);

  // Hiển thị danh sách blog
  console.log("\n📝 Blog posts found:");
  blogPosts.forEach((blog) => {
    const slug = createSlug(blog.title);
    const url = `${baseUrl}/stories/${blog.id}/${slug}`;
    console.log(`   - ${blog.title} (${blog.date.toLocaleDateString()})`);
    console.log(`     ${url}`);
  });
}

generateSitemap().catch(console.error);
