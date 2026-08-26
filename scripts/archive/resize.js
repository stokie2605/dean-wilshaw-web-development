import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const dir = './public/mockups';
const files = fs.readdirSync(dir);

async function convert() {
  for (const file of files) {
    if (file.endsWith('.webp') && !file.includes('-small')) {
      const filePath = path.join(dir, file);
      const outPath = path.join(dir, file.replace('.webp', '-small.webp'));
      
      try {
        await sharp(filePath)
          .resize({ width: 600, withoutEnlargement: true })
          .webp({ quality: 75, effort: 6 })
          .toFile(outPath);
        
        console.log(`Created ${path.basename(outPath)}`);
      } catch (err) {
        console.error(`Error converting ${file}:`, err);
      }
    }
  }
}

convert();
