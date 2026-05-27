/**
 * BƯỚC 1: XỬ LÝ CÂU HỎI TRÙNG LẶP NỘI DUNG
 * 
 * Logic:
 * - Nhóm các câu có cùng nội dung (content) sau khi chuẩn hóa
 * - Trong mỗi nhóm trùng: giữ bản có dữ liệu đầy đủ nhất (có solution, có category, có answer)
 * - Xóa các bản thừa
 * - KHÔNG xóa câu chỉ "tương tự" — chỉ xóa câu HOÀN TOÀN GIỐNG nhau
 */
const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

async function main() {
  console.log('=== BƯỚC 1: XỬ LÝ CÂU TRÙNG LẶP ===\n');

  const allQ = await sql`SELECT id, question_code, content, answer, solution, grade, category_id, question_type, correct_answer, options, difficulty, created_at FROM public.questions ORDER BY grade, created_at`;

  // Nhóm theo nội dung chuẩn hóa
  const groups = new Map();
  for (const q of allQ) {
    // Chuẩn hóa: trim, gộp khoảng trắng, lowercase
    const key = q.content.trim().replace(/\s+/g, ' ').toLowerCase();
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(q);
  }

  // Lọc chỉ nhóm có >= 2 câu trùng
  const dupGroups = [];
  for (const [key, qs] of groups) {
    if (qs.length >= 2) dupGroups.push({ key: key.slice(0, 100), questions: qs });
  }

  console.log(`Tổng nhóm trùng lặp: ${dupGroups.length}`);
  
  let totalToDelete = 0;
  const idsToDelete = [];

  for (const group of dupGroups) {
    const qs = group.questions;
    
    // Chấm điểm mỗi bản — bản tốt nhất giữ lại
    const scored = qs.map(q => {
      let score = 0;
      if (q.answer && q.answer.trim().length > 0) score += 10;
      if (q.solution && q.solution.trim().length > 10) score += 8;
      if (q.category_id) score += 5;
      if (q.correct_answer && q.correct_answer.trim().length > 0) score += 7;
      if (q.options && Array.isArray(q.options) && q.options.length > 0) {
        // Kiểm tra options có value không
        const hasValues = q.options.some(o => o && o.value && o.value.trim().length > 0);
        if (hasValues) score += 6;
      }
      if (q.difficulty) score += 1;
      // Ưu tiên bản tạo trước (ổn định)
      score += 0; // created_at sẽ dùng làm tie-breaker
      return { ...q, score };
    });

    // Sắp xếp: điểm cao nhất lên đầu, nếu bằng thì bản cũ hơn trước
    scored.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return new Date(a.created_at) - new Date(b.created_at);
    });

    const keep = scored[0];
    const toRemove = scored.slice(1);

    for (const r of toRemove) {
      idsToDelete.push(r.id);
    }
    totalToDelete += toRemove.length;
  }

  console.log(`Tổng câu cần xóa: ${totalToDelete}`);
  console.log(`Giữ lại: ${dupGroups.length} câu (1 bản/nhóm)\n`);

  // Xác nhận trước khi xóa — in mẫu
  console.log('--- MẪU CÁC NHÓM TRÙNG (10 nhóm đầu) ---\n');
  for (const group of dupGroups.slice(0, 10)) {
    const qs = group.questions;
    console.log(`📝 "${group.key}..." (${qs.length} bản, lớp ${qs[0].grade})`);
    for (const q of qs) {
      const hasAns = q.answer && q.answer.trim().length > 0 ? '✅' : '❌';
      const hasSol = q.solution && q.solution.trim().length > 10 ? '✅' : '❌';
      const hasCat = q.category_id ? '✅' : '❌';
      console.log(`   [${q.question_code}] ans:${hasAns} sol:${hasSol} cat:${hasCat}`);
    }
    console.log('');
  }

  // THỰC HIỆN XÓA
  if (idsToDelete.length > 0) {
    console.log(`\n🗑️ Đang xóa ${idsToDelete.length} câu trùng...`);
    
    // Xóa từng batch 50 câu
    const batchSize = 50;
    let deleted = 0;
    for (let i = 0; i < idsToDelete.length; i += batchSize) {
      const batch = idsToDelete.slice(i, i + batchSize);
      // Xóa references trước
      for (const id of batch) {
        await sql`DELETE FROM public.exam_questions WHERE question_id = ${id}`;
        await sql`DELETE FROM public.favorites WHERE question_id = ${id}`;
        try { await sql`DELETE FROM public.likes WHERE question_id = ${id}`; } catch(e) {}
        await sql`DELETE FROM public.questions WHERE id = ${id}`;
      }
      deleted += batch.length;
      console.log(`   Đã xóa ${deleted}/${idsToDelete.length}`);
    }
    
    console.log(`\n✅ Hoàn thành! Đã xóa ${deleted} câu trùng lặp.`);
  }

  // Kiểm tra lại
  const remaining = await sql`SELECT COUNT(*)::int as c FROM public.questions`;
  console.log(`📊 Còn lại: ${remaining[0].c} câu trong database`);
}

main().catch(err => {
  console.error('FATAL:', err);
  process.exit(1);
});
