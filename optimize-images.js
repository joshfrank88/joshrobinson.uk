const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

// Configuration
const ASSETS_DIR = './assets';
const OUTPUT_DIR = './assets/optimized';
const QUALITY = 85; // WebP quality (0-100)
const SIZES = {
    small: 400,    // Mobile
    medium: 800,   // Tablet
    large: 1200,   // Desktop
    xlarge: 1920   // High-DPI displays
};

// Supported image formats
const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png'];

async function ensureDirectoryExists(dir) {
    try {
        await fs.access(dir);
    } catch {
        await fs.mkdir(dir, { recursive: true });
    }
}

async function getImageFiles(dir) {
    const files = await fs.readdir(dir);
    return files.filter(file => {
        const ext = path.extname(file).toLowerCase();
        return SUPPORTED_FORMATS.includes(ext);
    });
}

async function optimizeImage(inputPath, outputPath, width, height = null) {
    try {
        const image = sharp(inputPath);
        
        // Resize image
        if (width && height) {
            image.resize(width, height, { fit: 'cover', position: 'center' });
        } else if (width) {
            image.resize(width, null, { fit: 'inside' });
        }
        
        // Convert to WebP with optimization
        await image
            .webp({ 
                quality: QUALITY,
                effort: 6, // Higher effort = better compression
                nearLossless: true
            })
            .toFile(outputPath);
            
        console.log(`✅ Optimized: ${path.basename(inputPath)} -> ${width}w`);
        
    } catch (error) {
        console.error(`❌ Error optimizing ${inputPath}:`, error.message);
    }
}

async function createResponsiveImages(inputPath, filename) {
    const nameWithoutExt = path.parse(filename).name;
    
    // Create WebP versions at different sizes
    for (const [size, width] of Object.entries(SIZES)) {
        const outputFilename = `${nameWithoutExt}-${size}.webp`;
        const outputPath = path.join(OUTPUT_DIR, outputFilename);
        
        await optimizeImage(inputPath, outputPath, width);
    }
    
    // Create original size WebP
    const originalWebP = `${nameWithoutExt}.webp`;
    const originalPath = path.join(OUTPUT_DIR, originalWebP);
    await optimizeImage(inputPath, originalPath);
}

async function main() {
    console.log('🚀 Starting image optimization...');
    
    // Ensure output directory exists
    await ensureDirectoryExists(OUTPUT_DIR);
    
    // Get all image files
    const imageFiles = await getImageFiles(ASSETS_DIR);
    console.log(`📁 Found ${imageFiles.length} images to optimize`);
    
    // Process each image
    for (const filename of imageFiles) {
        const inputPath = path.join(ASSETS_DIR, filename);
        console.log(`\n🔄 Processing: ${filename}`);
        
        await createResponsiveImages(inputPath, filename);
    }
    
    console.log('\n🎉 Image optimization complete!');
    console.log(`📁 Optimized images saved to: ${OUTPUT_DIR}`);
    console.log('\n📱 Responsive image sizes created:');
    Object.entries(SIZES).forEach(([size, width]) => {
        console.log(`   • ${size}: ${width}px wide`);
    });
    console.log('   • Original: Full resolution');
}

// Run the optimization
main().catch(console.error);
