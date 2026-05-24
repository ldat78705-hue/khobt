const fs = require('fs');
const { neon } = require('@neondatabase/serverless');

const lines = fs.readFileSync('d:/khode/.env.local', 'utf8').split(/\r?\n/);
let u = '';
for (const l of lines) {
  if (l.startsWith('DATABASE_URL=')) {
    let v = l.substring(13).trim();
    if (v[0] === '"') v = v.slice(1, -1);
    u = v;
  }
}
const sql = neon(u);

async function main() {
  const categories = await sql`SELECT * FROM categories WHERE grade IN (6, 7, 8, 9) ORDER BY grade ASC, sort_order ASC`;
  
  const questions = await sql`
    SELECT category_id, question_type 
    FROM questions 
    WHERE question_type IN ('trac_nghiem', 'dung_sai')
  `;

  const countMap = {};
  questions.forEach(q => {
    if (q.category_id) {
      countMap[q.category_id] = (countMap[q.category_id] || 0) + 1;
    }
  });

  const parents = categories.filter(c => !c.parent_id);
  
  let totalMissing = 0;
  
  const report = [];

  for (const grade of [6, 7, 8, 9]) {
    report.push(`\n=== LỚP ${grade} ===`);
    const gradeParents = parents.filter(c => c.grade === grade);
    
    for (const p of gradeParents) {
      report.push(`\n[CHƯƠNG] ${p.name}`);
      const children = categories.filter(c => c.parent_id === p.id);
      
      for (const child of children) {
        const count = countMap[child.id] || 0;
        if (count < 10) {
          report.push(`  - [BÀI HỌC] ${child.name} (ID: ${child.id}) -> Có: ${count} câu lý thuyết (Cần thêm)`);
          totalMissing++;
        } else {
          report.push(`  - [BÀI HỌC] ${child.name} (ID: ${child.id}) -> Có: ${count} câu lý thuyết (Đủ)`);
        }
      }
    }
  }

  fs.writeFileSync('audit_theory_thcs.txt', report.join('\n'));
  console.log(`Audit hoàn tất. Ghi báo cáo vào audit_theory_thcs.txt.`);
  console.log(`Số bài học cần bổ sung lý thuyết: ${totalMissing}`);
}

main().catch(console.error);
