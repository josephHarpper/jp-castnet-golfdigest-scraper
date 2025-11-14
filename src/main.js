import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { CheerioCrawler } from './crawler/cheerioCrawler.js';
import { parseProduct } from './extractors/productParser.js';
import { exportDataset } from './datasets/exporter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// load input
const inputPath = path.join(__dirname, '..', 'data', 'sample-input.json');
const input = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));

async function run() {
console.log('Starting Golfdigest scraper…');

const results = [];
const crawler = new CheerioCrawler({
maxPages: input.maxPages || 20,
onPage: async (html, url) => {
try {
const product = parseProduct(html, url);
console.log('Extracted:', product.title);
results.push(product);
} catch (err) {
console.error('Error parsing product:', err.message);
}
}
});

for (const startUrl of input.startUrls) {
await crawler.addToQueue(startUrl);
}

await crawler.run();

const outPath = path.join(__dirname, '..', 'data', 'sample-output.json');
exportDataset(results, outPath);
console.log(`Scraping complete. Saved ${results.length} products.`);
}

run().catch(console.error);