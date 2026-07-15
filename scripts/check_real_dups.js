/**
 * KIỂM TRA NEAR-DUPLICATE CHÍNH XÁC HƠN
 * So sánh toàn bộ content (bao gồm cả LaTeX)
 */
const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

function normalize(text) {
  return (text || '').replace(/\s+/g, ' ').trim();
}

async function main() {
  console.log('=== KIỂM TRA TRÙNG LẶP CHÍNH XÁC ===\n');
  
  let totalExactDups = 0;
  
  for (const grade of [4,5,6,7,8,9]) {
    const qs = await sql`
      SELECT id, question_code, content FROM public.questions
      WHERE grade = ${grade}
      ORDER BY question_code
    `;
    
    // Group by FULL normalized content (including LaTeX)
    const groups = new Map();
    for (const q of qs) {
      const key = normalize(q.content);
      if (key.length < 15) continue;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(q);
    }
    
    const dupGroups = [...groups.values()].filter(g => g.length > 1);
    let count = 0;
    for (const g of dupGroups) count += (g.length - 1);
    
    if (count > 0) {
      totalExactDups += count;
      console.log(`Lớp ${grade}: ${count} bản sao (${dupGroups.length} nhóm)`);
      // In 3 mẫu
      for (const g of dupGroups.slice(0, 3)) {
        console.log(`  Nhóm (${g.length} bản): "${g[0].content.slice(0, 60)}..."`);
        console.log(`    Codes: ${g.map(q => q.question_code).join(', ')}`);
      }
    } else {
      console.log(`Lớp ${grade}: 0 trùng`);
    }
  }
  
  console.log(`\nTỔNG BẢN SAO THỰC SỰ: ${totalExactDups}`);
}

main().catch(console.error);
