import axios from 'axios';
import cheerio from 'cheerio';
import { RequestQueue } from './requestQueue.js';

export class CheerioCrawler {
constructor(options = {}) {
this.maxPages = options.maxPages || 20;
this.onPage = options.onPage;
this.queue = new RequestQueue();
this.pageCount = 0;
}

async addToQueue(url) {
this.queue.add(url);
}

async run() {
while (!this.queue.isEmpty() && this.pageCount < this.maxPages) {
const url = this.queue.next();
try {
console.log('Fetching:', url);
const res = await axios.get(url, { timeout: 15000 });
const html = res.data;
await this.onPage(html, url);
this.pageCount++;
} catch (err) {
console.error(`Failed fetching ${url}:`, err.message);
}
}
}
}