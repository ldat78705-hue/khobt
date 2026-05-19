const fs = require('fs');

function slugify(text) {
  return text.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function parseGrade(grade, file) {
  const content = fs.readFileSync(file, 'utf-8');
  const lines = content.split('\n').map(l => l.trim()).filter(Boolean);
  
  let currentChapter = 0;
  let currentChapterId = '';
  let sortOrder = 1;
  const categories = [];

  for (const line of lines) {
    if (line.toUpperCase().startsWith('CHƯƠNG') || line.toUpperCase().startsWith('CHỦ ĐỀ')) {
      currentChapter++;
      currentChapterId = `c${grade}-${currentChapter}`;
      sortOrder = 1; 
    } else {
      const id = `${currentChapterId}-${sortOrder}`;
      const slug = slugify(line + ' toan ' + grade);
      const icon = line.startsWith('Bài tập cuối') ? 'check-circle' : (line.startsWith('Luyện tập') ? 'pen-tool' : 'book-open');
      const cat = `  { id: '${id}', name: '${line.replace(/'/g, "\\'")}', slug: '${slug}', description: '${line.replace(/'/g, "\\'")}', parent_id: '${currentChapterId}', grade: ${grade}, icon: '${icon}', color: '#94A3B8', sort_order: ${sortOrder}, is_active: true, created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },`;
      categories.push(cat);
      sortOrder++;
    }
  }
  return categories.join('\n');
}

const out = '// === LỚP 7 (BÀI HỌC) ===\n' + parseGrade(7, 'grade7.txt') + 
  '\n// === LỚP 8 (BÀI HỌC) ===\n' + parseGrade(8, 'grade8.txt') + 
  '\n// === LỚP 9 (BÀI HỌC) ===\n' + parseGrade(9, 'grade9.txt') + 
  '\n// === LỚP 5 (BÀI HỌC) ===\n' + parseGrade(5, 'grade5.txt');

fs.writeFileSync('children_categories_utf8.txt', out, 'utf8');
