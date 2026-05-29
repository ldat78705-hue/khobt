/**
 * BƯỚC 9: RÀ SOÁT TRÙNG LẶP TOÀN DIỆN + PHÂN TÍCH PHÂN BỐ
 * 
 * A. Tìm và xóa tất cả câu trùng lặp (normalize sâu hơn)
 * B. Thống kê số câu theo từng category
 * C. Tìm category ít bài nhất
 */
const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

// Normalize sâu: bỏ LaTeX formatting, gộp space, lowercase
function deepNormalize(text) {
  if (!text) return '';
  return text
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/\\,/g, '')       // bỏ \,
    .replace(/\\;/g, '')       // bỏ \;
    .replace(/\\!/g, '')       // bỏ \!
    .replace(/\\text\{[^}]*\}/g, '') // bỏ \text{...}
    .replace(/\\\\/g, '')      // bỏ \\
    .replace(/\$/g, '')        // bỏ $
    .replace(/\{/g, '')        // bỏ {
    .replace(/\}/g, '')        // bỏ }
    .replace(/\s+/g, ' ')
    .toLowerCase()
    .trim();
}

async function main() {
  console.log('=== BƯỚC 9: RÀ SOÁT TRÙNG + PHÂN TÍCH PHÂN BỐ ===\n');

  // A. Xóa trùng
  console.log('--- A. TÌM VÀ XÓA TRÙNG LẶP ---\n');
  const allQ = await sql`SELECT id, question_code, content, answer, solution, grade, category_id, question_type, created_at FROM public.questions ORDER BY grade, created_at`;

  const groups = new Map();
  for (const q of allQ) {
    const key = deepNormalize(q.content);
    if (key.length < 10) continue; // bỏ qua câu quá ngắn
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(q);
  }

  let totalDeleted = 0;
  const dupGroups = [];
  for (const [key, qs] of groups) {
    if (qs.length < 2) continue;
    dupGroups.push({ key, questions: qs });
  }

  console.log(`Tổng nhóm trùng: ${dupGroups.length}`);

  for (const group of dupGroups) {
    const qs = group.questions;
    // Chấm điểm
    const scored = qs.map(q => {
      let score = 0;
      if (q.answer && q.answer.trim().length > 0) score += 10;
      if (q.solution && q.solution.trim().length > 10) score += 8;
      if (q.category_id) score += 5;
      if (q.question_code && !q.question_code.startsWith('null')) score += 2;
      return { ...q, score };
    });
    scored.sort((a, b) => b.score - a.score || new Date(a.created_at) - new Date(b.created_at));

    const keep = scored[0];
    const toRemove = scored.slice(1);

    if (dupGroups.length <= 30 || totalDeleted < 10) {
      console.log(`  📝 "${group.key.slice(0, 60)}..." (${qs.length} bản, lớp ${qs[0].grade}) → giữ [${keep.question_code}]`);
    }

    for (const r of toRemove) {
      try {
        await sql`DELETE FROM public.exam_questions WHERE question_id = ${r.id}`;
        await sql`DELETE FROM public.favorites WHERE question_id = ${r.id}`;
        await sql`DELETE FROM public.questions WHERE id = ${r.id}`;
        totalDeleted++;
      } catch(e) {}
    }
  }

  console.log(`\n🗑️ Tổng xóa: ${totalDeleted}`);
  const totalAfter = await sql`SELECT COUNT(*)::int as c FROM public.questions`;
  console.log(`📊 Tổng câu còn: ${totalAfter[0].c}\n`);

  // B. Phân tích phân bố theo category
  console.log('--- B. PHÂN BỐ BÀI TẬP THEO CHƯƠNG/CHỦ ĐỀ ---\n');
  
  const categories = await sql`
    SELECT c.id, c.name, c.grade, c.parent_id, 
           COALESCE(q.cnt, 0)::int as question_count
    FROM public.categories c
    LEFT JOIN (
      SELECT category_id, COUNT(*)::int as cnt 
      FROM public.questions 
      GROUP BY category_id
    ) q ON q.category_id = c.id
    ORDER BY c.grade, c.sort_order, c.name
  `;

  // Group by grade
  const byGrade = {};
  for (const cat of categories) {
    if (!cat.grade) continue;
    if (!byGrade[cat.grade]) byGrade[cat.grade] = [];
    byGrade[cat.grade].push(cat);
  }

  const lowCategories = []; // Categories với ít hơn 5 câu
  
  for (const [grade, cats] of Object.entries(byGrade)) {
    console.log(`\n📚 LỚP ${grade} (${cats.reduce((s, c) => s + c.question_count, 0)} câu)`);
    console.log('-'.repeat(60));
    
    // Group parents and children
    const parents = cats.filter(c => !c.parent_id);
    for (const parent of parents) {
      const children = cats.filter(c => c.parent_id === parent.id);
      const parentTotal = parent.question_count + children.reduce((s, c) => s + c.question_count, 0);
      
      const flag = parentTotal < 5 ? ' 🔴' : (parentTotal < 10 ? ' 🟡' : '');
      console.log(`  📖 ${parent.name}: ${parentTotal} câu${flag}`);
      
      for (const child of children) {
        const cflag = child.question_count < 3 ? ' 🔴' : (child.question_count < 5 ? ' 🟡' : '');
        console.log(`    └─ ${child.name}: ${child.question_count} câu${cflag}`);
        
        if (child.question_count < 5) {
          lowCategories.push({
            id: child.id,
            name: child.name,
            parentName: parent.name,
            grade: parseInt(grade),
            count: child.question_count,
            need: 5 - child.question_count
          });
        }
      }
      
      // Parent without children
      if (children.length === 0 && parent.question_count < 5) {
        lowCategories.push({
          id: parent.id,
          name: parent.name,
          parentName: null,
          grade: parseInt(grade),
          count: parent.question_count,
          need: 5 - parent.question_count
        });
      }
    }
    
    // Orphan categories
    const handled = new Set([...parents.map(p => p.id), ...cats.filter(c => c.parent_id).map(c => c.id)]);
    for (const cat of cats.filter(c => !handled.has(c.id))) {
      const flag = cat.question_count < 5 ? ' 🔴' : '';
      console.log(`  📄 ${cat.name}: ${cat.question_count} câu${flag}`);
    }
  }

  // C. Tóm tắt category cần thêm bài
  console.log(`\n\n--- C. DANH SÁCH CHỦ ĐỀ CẦN THÊM BÀI (< 5 câu) ---\n`);
  lowCategories.sort((a, b) => a.grade - b.grade || a.count - b.count);
  
  for (const lc of lowCategories) {
    const parent = lc.parentName ? ` (${lc.parentName})` : '';
    console.log(`  Lớp ${lc.grade}: "${lc.name}"${parent} → ${lc.count} câu, cần thêm ${lc.need}`);
  }
  console.log(`\nTổng: ${lowCategories.length} chủ đề cần thêm bài`);
  console.log(`Tổng câu cần thêm: ${lowCategories.reduce((s, c) => s + c.need, 0)}`);
}

main().catch(err => { console.error('FATAL:', err); process.exit(1); });
