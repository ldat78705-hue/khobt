/**
 * BƯỚC 8B: Xóa trùng lớp 9 - kiểm tra kỹ
 */
const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

async function main() {
  // Tìm nhóm trùng lớp 9
  const g9 = await sql`SELECT id, question_code, content, answer, solution, category_id, created_at 
    FROM public.questions WHERE grade = 9 ORDER BY created_at`;

  const groups = new Map();
  for (const q of g9) {
    const key = q.content.trim().replace(/\s+/g, ' ').toLowerCase();
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(q);
  }

  let totalDeleted = 0;
  for (const [key, qs] of groups) {
    if (qs.length < 2) continue;

    console.log(`\n📝 Nhóm (${qs.length} câu): "${key.slice(0, 80)}..."`);
    
    // Chấm điểm
    const scored = qs.map(q => {
      let score = 0;
      if (q.answer && q.answer.trim().length > 0) score += 10;
      if (q.solution && q.solution.trim().length > 10) score += 8;
      if (q.category_id) score += 5;
      return { ...q, score };
    });
    scored.sort((a, b) => b.score - a.score || new Date(a.created_at) - new Date(b.created_at));

    for (const s of scored) {
      console.log(`  [${s.question_code}] score=${s.score} ans=${(s.answer||'').slice(0,30)} cat=${s.category_id ? '✅' : '❌'}`);
    }

    const keep = scored[0];
    const toRemove = scored.slice(1);

    for (const r of toRemove) {
      try {
        await sql`DELETE FROM public.exam_questions WHERE question_id = ${r.id}`;
        await sql`DELETE FROM public.favorites WHERE question_id = ${r.id}`;
        await sql`DELETE FROM public.questions WHERE id = ${r.id}`;
        totalDeleted++;
      } catch (e) {
        console.log(`  ⚠️ Không xóa [${r.question_code}]: ${e.message}`);
      }
    }
    console.log(`  → Giữ [${keep.question_code}], xóa ${toRemove.length}`);
  }

  console.log(`\n🗑️ Tổng xóa: ${totalDeleted}`);
  const total = await sql`SELECT COUNT(*)::int as c FROM public.questions`;
  console.log(`📊 Tổng câu: ${total[0].c}`);
}

main().catch(err => { console.error('FATAL:', err); process.exit(1); });
