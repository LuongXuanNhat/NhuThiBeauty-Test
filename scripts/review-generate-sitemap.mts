// scripts/generate-sitemap.mts
import { writeFileSync, readFileSync, existsSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { config } from "dotenv";
config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface ReviewPost {
  id: string;
  name: string;  // Changed from title to name
  date: Date;
  content: string;  // Changed from description to content
}

const createSlug = (name: string): string => {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[đĐ]/g, "d")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
};

// Đọc data từ reviewDataSource.ts
function getReviewDataFromSource(): ReviewPost[] {
  const reviewDataSourcePath = join(
    __dirname,
    "..",
    "src",
    "utils",
    "reviewDataSource.ts"
  );

  if (!existsSync(reviewDataSourcePath)) {
    console.error("❌ File reviewDataSource.ts not found!");
    return [];
  }

  try {
    const sourceContent = readFileSync(reviewDataSourcePath, "utf-8");

    // Extract review data từ export
    const reviewPosts: ReviewPost[] = [];

    // Updated regex to match the actual data structure
    // Look for objects starting with { and containing id, name, content, date
    const objectMatches = sourceContent.match(/{\s*id:\s*\d+[^}]*?}/gs);

    if (objectMatches) {
      for (const objStr of objectMatches) {
        // Extract các field cần thiết với updated field names
        const idMatch = objStr.match(/id:\s*(\d+)/);
        const nameMatch = objStr.match(/name:\s*["']([^"']+)["']/);
        const dateMatch = objStr.match(/date:\s*new Date\(["']([^"']+)["']\)/);
        const contentMatch = objStr.match(/content:\s*["']([^"']*?)["']/s);

        if (idMatch && nameMatch) {
          reviewPosts.push({
            id: idMatch[1],
            name: nameMatch[1],
            date: dateMatch?.[1] ? new Date(dateMatch[1]) : new Date(),
            content: contentMatch?.[1] || "",
          });
        }
      }
    }

    return reviewPosts.sort((a, b) => b.date.getTime() - a.date.getTime());
  } catch (error) {
    console.error("❌ Error reading reviewDataSource.ts:", error);
    return [];
  }
}

async function generateSitemap(): Promise<void> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  console.log("🔍 Reading review data from reviewDataSource.ts...");
  const reviewPosts = getReviewDataFromSource();

  if (reviewPosts.length === 0) {
    console.warn("⚠️  No review posts found in reviewDataSource.ts!");
    return;
  }

  // Tạo sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Review posts -->
${reviewPosts
  .map((review) => {
    const slug = createSlug(review.name);  // Changed from title to name
    const url = `${baseUrl}/reviews/${review.id}/${slug}`;
    const lastmod = review.date.toISOString().split("T")[0];

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
  const publicSitemapPath = join(__dirname, "..", "public/review", "sitemap.xml");  

  // Tạo || Ghi đè file
  writeFileSync(publicSitemapPath, sitemap);

  console.log("✅ Review sitemap generated successfully!");
  console.log(`📁 Public sitemap: ${publicSitemapPath}`);
  console.log(`🔗 Accessible at: ${baseUrl}/sitemap.xml`);
  console.log(`📊 Total review entries: ${reviewPosts.length}`);

  // Hiển thị danh sách review
  console.log("\n📝 Review posts found:");
  reviewPosts.forEach((review) => {
    const slug = createSlug(review.name);  // Changed from title to name
    const url = `${baseUrl}/reviews/${review.id}/${slug}`;
    console.log(`   - ${review.name} (${review.date.toLocaleDateString()})`);  // Changed from title to name
    console.log(`     ${url}`);
  });
}

generateSitemap().catch(console.error);