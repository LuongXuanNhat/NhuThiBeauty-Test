// scripts/generate-all-sitemaps.mts
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function generateAllSitemaps() {
  console.log('🚀 Starting sitemap generation...\n');
  
  try {
    // Generate blog sitemap
    console.log('📝 Generating blog sitemap...');
    await execAsync('tsx scripts/blog-generate-sitemap.mts');
    console.log('✅ Blog sitemap completed!\n');
    
    // Generate review sitemap
    console.log('⭐ Generating review sitemap...');
    await execAsync('tsx scripts/review-generate-sitemap.mts');
    console.log('✅ Review sitemap completed!\n');
    
    console.log('🎉 All sitemaps generated successfully!');
    
  } catch (error) {
    console.error('❌ Error generating sitemaps:', error);
    process.exit(1);
  }
}

generateAllSitemaps();