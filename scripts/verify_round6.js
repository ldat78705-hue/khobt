/**
 * RÀ SOÁT LẦN 6 — CONTENT CORRUPTION + FINAL INTEGRITY
 */
const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

async function main() {
  console.log('=== RÀ SOÁT LẦN 6 ===\n');

  // 1. Content có $1 corruption
  console.log('--- 1. CONTENT CÓ $1 CORRUPTION ---\n');
  const contentCorrupt = await sql`
    SELECT question_code, grade, content, answer FROM public.questions
    WHERE content LIKE '%$1%' AND content NOT LIKE '%$10%' AND content NOT LIKE '%$100%'
      AND content NOT LIKE '%$1\\%' AND content NOT LIKE '%$1,%'
    ORDER BY grade, question_code
  `;
  
  // Filter real corruption: "$1$" as standalone, "$1 " not followed by unit
  let realCorrupt = 0;
  for (const q of contentCorrupt) {
    const c = q.content || '';
    // Check if $1 is a valid math value vs corruption
    // Valid: "$1$ cm", "$1$ dm", "$1/2$", "$12$", "$1\\text{}"
    // Invalid: "$1$." standalone, "diện tích $1$" (should be number)
    
    // Pattern: "$1$" followed by period or nothing — likely corruption of a number
    if (/\$1\$\s*[.)\]}]/.test(c) || /diện tích\s+\$1\$/.test(c) || /\$1\$\s*$/.test(c)) {
      // But "$1$ dm²" is valid
      if (!/\$1\$\s*(?:cm|dm|m|km|kg|lít|giờ|phút|ngày|ha|hm)/.test(c)) {
        realCorrupt++;
        if (realCorrupt <= 15) {
          // Find context
          const idx = c.indexOf('$1$');
          if (idx >= 0) {
            const ctx = c.substring(Math.max(0, idx-30), Math.min(c.length, idx+30));
            console.log(`  [${q.question_code}] L${q.grade}: ...${ctx}...`);
          }
        }
      }
    }
  }
  console.log(`\nContent $1 corruption: ${realCorrupt} câu (tổng có $1: ${contentCorrupt.length})`);

  // 2. Answer có $1 corruption  
  console.log('\n--- 2. ANSWER CÓ $1 CORRUPTION ---\n');
  const ansCorrupt = await sql`
    SELECT question_code, grade, answer FROM public.questions
    WHERE answer LIKE '%$1$%' AND LENGTH(TRIM(answer)) < 8
      AND answer NOT LIKE '%$10%' AND answer NOT LIKE '%$100%'
      AND answer NOT LIKE '%$1$ cm%' AND answer NOT LIKE '%$1$ dm%'
      AND answer NOT LIKE '%$1$ m%' AND answer NOT LIKE '%$1$ km%'
  `;
  console.log(`Answer ngắn chứa $1$: ${ansCorrupt.length}`);
  for (const q of ansCorrupt.slice(0,10)) {
    console.log(`  [${q.question_code}] L${q.grade}: "${q.answer}"`);
  }

  // 3. Kiểm tra content có đề bài bị thiếu (kết thúc giữa chừng)
  console.log('\n--- 3. CONTENT KẾT THÚC GIỮA CHỪNG ---\n');
  const truncContent = await sql`
    SELECT question_code, grade, RIGHT(TRIM(content), 30) as ending FROM public.questions
    WHERE question_type = 'tu_luan'
      AND RIGHT(TRIM(content), 1) NOT IN ('.', '?', ')', '}', ':', '!', '$', '"')
      AND RIGHT(TRIM(content), 1) != E'\\n'
      AND LENGTH(content) > 30
    ORDER BY grade
    LIMIT 20
  `;
  console.log(`Content kết thúc giữa chừng: kiểm tra 20 mẫu`);
  for (const q of truncContent) {
    console.log(`  [${q.question_code}] L${q.grade}: ...${q.ending}`);
  }

  // 4. Tổng hợp cuối cùng
  console.log('\n--- 4. TỔNG HỢP ---\n');
  const stats = await sql`
    SELECT
      COUNT(*)::int as total,
      COUNT(CASE WHEN LENGTH(TRIM(content)) > 10 THEN 1 END)::int as good_content,
      COUNT(CASE WHEN LENGTH(TRIM(answer)) > 1 THEN 1 END)::int as good_answer,
      COUNT(CASE WHEN LENGTH(TRIM(solution)) > 10 THEN 1 END)::int as good_solution,
      COUNT(CASE WHEN category_id IS NOT NULL THEN 1 END)::int as has_cat,
      COUNT(CASE WHEN question_code IS NOT NULL THEN 1 END)::int as has_code
    FROM public.questions
  `;
  const s = stats[0];
  console.log(`Tổng: ${s.total}`);
  console.log(`Content > 10c: ${s.good_content} (${(s.good_content/s.total*100).toFixed(1)}%)`);
  console.log(`Answer > 1c: ${s.good_answer} (${(s.good_answer/s.total*100).toFixed(1)}%)`);
  console.log(`Solution > 10c: ${s.good_solution} (${(s.good_solution/s.total*100).toFixed(1)}%)`);
  console.log(`Has category: ${s.has_cat} (${(s.has_cat/s.total*100).toFixed(1)}%)`);
  console.log(`Has code: ${s.has_code} (${(s.has_code/s.total*100).toFixed(1)}%)`);

  console.log('\nHoàn thành:', new Date().toISOString());
}

main().catch(err => { console.error('FATAL:', err); process.exit(1); });
