/**
 * XÓA BÀI TRÙNG LẶP (EXACT CONTENT MATCH)
 * 
 * Chỉ xóa bản sao 100% giống — GIỮ bản gốc có question_code ngắn nhất
 */
const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

function normalize(text) {
  return (text || '').replace(/\s+/g, ' ').trim().toLowerCase();
}

async function main() {
  console.log('=== XÓA BÀI TRÙNG LẶP EXACT ===\n');
  
  let totalDeleted = 0;
  
  for (const grade of [4,5,6,7,8,9]) {
    const qs = await sql`
      SELECT id, question_code, content, question_type FROM public.questions
      WHERE grade = ${grade}
      ORDER BY question_code
    `;
    
    // Group by normalized content
    const groups = new Map();
    for (const q of qs) {
      const key = normalize(q.content);
      if (key.length < 10) continue; // Skip very short
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(q);
    }
    
    // Find duplicates (groups > 1)
    const dupGroups = [...groups.values()].filter(g => g.length > 1);
    let gradeDeleted = 0;
    
    for (const group of dupGroups) {
      // Sort: keep one with shortest/cleanest question_code
      group.sort((a, b) => {
        // Prefer non-AUTO codes
        const aAuto = a.question_code.includes('AUTO') || a.question_code.includes('BATCH');
        const bAuto = b.question_code.includes('AUTO') || b.question_code.includes('BATCH');
        if (aAuto !== bAuto) return aAuto ? 1 : -1;
        // Then by code length (shorter = more human-created)
        return (a.question_code || '').length - (b.question_code || '').length;
      });
      
      // Keep first, delete rest
      const keep = group[0];
      const toDelete = group.slice(1);
      
      for (const d of toDelete) {
        await sql`DELETE FROM public.questions WHERE id = ${d.id}`;
        gradeDeleted++;
      }
    }
    
    totalDeleted += gradeDeleted;
    console.log(`Lớp ${grade}: ${qs.length} câu → ${dupGroups.length} nhóm trùng → xóa ${gradeDeleted}`);
  }
  
  console.log(`\nTỔNG ĐÃ XÓA: ${totalDeleted} bản sao trùng lặp`);
  
  // Đếm lại
  const remaining = await sql`SELECT grade, COUNT(*)::int as cnt FROM public.questions GROUP BY grade ORDER BY grade`;
  console.log('\nSỐ CÂU CÒN LẠI:');
  let total = 0;
  for (const r of remaining) {
    console.log(`  Lớp ${r.grade}: ${r.cnt}`);
    total += r.cnt;
  }
  console.log(`  TỔNG: ${total}`);
}

main().catch(err => { console.error('FATAL:', err); process.exit(1); });
