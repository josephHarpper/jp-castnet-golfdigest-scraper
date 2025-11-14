import fs from 'fs';

export function exportDataset(records, outPath) {
try {
fs.writeFileSync(outPath, JSON.stringify(records, null, 2), 'utf-8');
} catch (err) {
console.error('Failed writing dataset:', err.message);
}
}