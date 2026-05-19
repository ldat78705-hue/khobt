const fs = require('fs');
const tsFile = 'src/lib/demo-data.ts';
let tsContent = fs.readFileSync(tsFile, 'utf8');
const parts = tsContent.split('// === Lớp 4 ===');
const newCats = fs.readFileSync('children_categories_utf8.txt', 'utf8');
tsContent = parts[0] + newCats + '\n\n  // === Lớp 4 ===' + parts[1];
fs.writeFileSync(tsFile, tsContent, 'utf8');
console.log('Injected successfully');
