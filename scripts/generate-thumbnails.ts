/**
 * Thumbnail Generator Script
 * 
 * This script captures screenshots of all your GitHub Pages sites
 * and saves them locally for instant loading.
 * 
 * Run with: npm run generate-thumbnails
 */

import { chromium } from 'playwright';
import { sites } from '../src/config/sites';
import * as fs from 'fs';
import * as path from 'path';

const THUMBNAIL_DIR = path.join(process.cwd(), 'public', 'thumbnails');
const VIEWPORT = { width: 1280, height: 800 };

async function generateThumbnails() {
    console.log('🚀 Starting thumbnail generation...\n');

    // Ensure thumbnail directory exists
    if (!fs.existsSync(THUMBNAIL_DIR)) {
        fs.mkdirSync(THUMBNAIL_DIR, { recursive: true });
        console.log(`📁 Created directory: ${THUMBNAIL_DIR}\n`);
    }

    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({ viewport: VIEWPORT });

    let successCount = 0;
    let errorCount = 0;

    for (const site of sites) {
        const outputPath = path.join(THUMBNAIL_DIR, `${site.id}.png`);

        try {
            console.log(`📸 Capturing: ${site.name}`);
            console.log(`   URL: ${site.url}`);

            const page = await context.newPage();

            // Navigate with timeout
            await page.goto(site.url, {
                waitUntil: 'networkidle',
                timeout: 30000
            });

            // Wait a bit for any animations to settle
            await page.waitForTimeout(1000);

            // Take screenshot
            await page.screenshot({
                path: outputPath,
                type: 'png',
                clip: { x: 0, y: 0, width: VIEWPORT.width, height: VIEWPORT.height }
            });

            await page.close();

            console.log(`   ✅ Saved: ${outputPath}\n`);
            successCount++;

        } catch (error) {
            console.log(`   ❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}\n`);
            errorCount++;
        }
    }

    await browser.close();

    console.log('━'.repeat(50));
    console.log(`\n✨ Thumbnail generation complete!`);
    console.log(`   ✅ Success: ${successCount}`);
    console.log(`   ❌ Errors: ${errorCount}`);
    console.log(`   📁 Location: ${THUMBNAIL_DIR}\n`);
}

generateThumbnails().catch(console.error);
