/**
 * Thumbnail Optimizer Script
 * 
 * Converts PNG screenshots to optimized WebP format
 * Run with: npm run optimize-thumbnails
 */

import sharp from 'sharp';
import * as fs from 'fs';
import * as path from 'path';

const THUMBNAIL_DIR = path.join(process.cwd(), 'public', 'thumbnails');
const TARGET_WIDTH = 400; // Small enough for fast loading, big enough for quality
const QUALITY = 75;

async function optimizeThumbnails() {
    console.log('🔧 Optimizing thumbnails...\n');

    const files = fs.readdirSync(THUMBNAIL_DIR).filter(f => f.endsWith('.png'));

    let totalOriginal = 0;
    let totalOptimized = 0;

    for (const file of files) {
        const inputPath = path.join(THUMBNAIL_DIR, file);
        const outputPath = path.join(THUMBNAIL_DIR, file.replace('.png', '.webp'));

        try {
            const originalSize = fs.statSync(inputPath).size;
            totalOriginal += originalSize;

            await sharp(inputPath)
                .resize(TARGET_WIDTH, null, { withoutEnlargement: true })
                .webp({ quality: QUALITY })
                .toFile(outputPath);

            const newSize = fs.statSync(outputPath).size;
            totalOptimized += newSize;

            const reduction = Math.round((1 - newSize / originalSize) * 100);
            console.log(`✅ ${file} → ${file.replace('.png', '.webp')}`);
            console.log(`   ${(originalSize / 1024).toFixed(0)}KB → ${(newSize / 1024).toFixed(0)}KB (${reduction}% smaller)\n`);

            // Delete the original PNG
            fs.unlinkSync(inputPath);

        } catch (error) {
            console.log(`❌ ${file}: ${error instanceof Error ? error.message : 'Unknown error'}\n`);
        }
    }

    console.log('━'.repeat(50));
    console.log(`\n✨ Optimization complete!`);
    console.log(`   Total: ${(totalOriginal / 1024).toFixed(0)}KB → ${(totalOptimized / 1024).toFixed(0)}KB`);
    console.log(`   Saved: ${((totalOriginal - totalOptimized) / 1024).toFixed(0)}KB (${Math.round((1 - totalOptimized / totalOriginal) * 100)}% reduction)\n`);
}

optimizeThumbnails().catch(console.error);
