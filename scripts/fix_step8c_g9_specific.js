const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

async function main() {
  // Tìm câu chứa "cho biểu thức $p" ở lớp 9
  const g9p = await sql`SELECT id, question_code, content, grade 
    FROM public.questions 
    WHERE grade = 9 AND LOWER(content) LIKE '%cho biểu thức%' AND LOWER(content) LIKE '%dfrac%sqrt%'
    ORDER BY question_code`;
  
  console.log(`Câu "cho biểu thức P" lớp 9: ${g9p.length}`);
  const groups = new Map();
  for (const q of g9p) {
    // Normalize nhẹ hơn - chỉ trim + gộp space
    const key = q.content.trim().replace(/\s+/g, ' ');
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(q);
  }
  
  for (const [key, qs] of groups) {
    if (qs.length >= 2) {
      console.log(`\n📝 Nhóm (${qs.length} câu):`);
      for (const q of qs) console.log(`  [${q.question_code}]`);
      
      // Xóa bản thừa, giữ bản đầu
      for (let i = 1; i < qs.length; i++) {
        try {
          await sql`DELETE FROM public.exam_questions WHERE question_id = ${qs[i].id}`;
          await sql`DELETE FROM public.favorites WHERE question_id = ${qs[i].id}`;
          await sql`DELETE FROM public.questions WHERE id = ${qs[i].id}`;
          console.log(`  🗑️ Xóa [${qs[i].question_code}]`);
        } catch(e) {}
      }
    }
  }

  // Tìm câu "cân nặng" lớp 9
  const g9w = await sql`SELECT id, question_code, content 
    FROM public.questions 
    WHERE grade = 9 AND LOWER(content) LIKE '%cân nặng%' AND LOWER(content) LIKE '%9a%'
    ORDER BY question_code`;
  
  console.log(`\nCâu "cân nặng 9a" lớp 9: ${g9w.length}`);
  if (g9w.length >= 2) {
    for (let i = 1; i < g9w.length; i++) {
      try {
        await sql`DELETE FROM public.exam_questions WHERE question_id = ${g9w[i].id}`;
        await sql`DELETE FROM public.favorites WHERE question_id = ${g9w[i].id}`;
        await sql`DELETE FROM public.questions WHERE id = ${g9w[i].id}`;
        console.log(`  🗑️ Xóa [${g9w[i].question_code}]`);
      } catch(e) {}
    }
  }

  const total = await sql`SELECT COUNT(*)::int as c FROM public.questions`;
  console.log(`\n📊 Tổng: ${total[0].c}`);
}

main().catch(err => { console.error('FATAL:', err); process.exit(1); });
