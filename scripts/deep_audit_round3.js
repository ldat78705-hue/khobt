/**
 * RÀ SOÁT LẦN 3:
 * 1. Dọn dẹp boilerplate filler trong đáp án (giữ đáp án thực)
 * 2. Near-duplicate detection
 * 3. Kiểm tra 2 câu quá dài
 * 4. Kiểm tra đáp án có LaTeX hỏng render
 */
const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

// ======= NEAR-DUPLICATE =======

function normalizeForDup(text) {
  return (text || '')
    .replace(/\s+/g, ' ')
    .replace(/\$[^$]*\$/g, 'M') // Replace math with placeholder
    .replace(/[^\wÀ-ỹM]/g, '') // Remove punctuation
    .toLowerCase()
    .trim();
}

function jaccard(a, b) {
  const setA = new Set(a.split(/\s+/));
  const setB = new Set(b.split(/\s+/));
  const intersection = new Set([...setA].filter(x => setB.has(x)));
  const union = new Set([...setA, ...setB]);
  return union.size === 0 ? 0 : intersection.size / union.size;
}

async function main() {
  console.log('=== RÀ SOÁT SÂU LẦN 3 ===\n');
  console.log('Bắt đầu:', new Date().toISOString());

  // ===== 1. BOILERPLATE FILLER CLEANUP =====
  console.log('\n--- 1. BOILERPLATE FILLER ---\n');
  
  const withBoiler = await sql`
    SELECT id, question_code, answer, grade FROM public.questions
    WHERE answer LIKE '%Thực hiện phép tính theo yêu cầu bài toán%'
       OR answer LIKE '%kết quả chính xác của phép tính là đáp án đã cho%'
    ORDER BY grade, question_code
  `;
  console.log(`Câu có boilerplate trong answer: ${withBoiler.length}`);
  
  let cleaned = 0;
  for (const q of withBoiler) {
    let ans = q.answer || '';
    const orig = ans;
    
    // Remove boilerplate patterns
    ans = ans.replace(/^Thực hiện phép tính theo yêu cầu bài toán:\s*/g, '');
    ans = ans.replace(/\s*Như vậy, kết quả chính xác của phép tính là đáp án đã cho\.\s*/g, '');
    ans = ans.trim();
    
    if (ans !== orig && ans.length >= 2) {
      await sql`UPDATE public.questions SET answer = ${ans}, updated_at = NOW() WHERE id = ${q.id}`;
      cleaned++;
    }
  }
  console.log(`Đã dọn boilerplate: ${cleaned} câu`);

  // Dọn boilerplate trong solution 
  const solBoiler = await sql`
    SELECT id, question_code, solution FROM public.questions
    WHERE solution LIKE '%Bước giải toán trên được thực hiện chi tiết từng bước%'
    ORDER BY question_code
  `;
  console.log(`\nSolution có boilerplate: ${solBoiler.length}`);
  
  let solCleaned = 0;
  for (const q of solBoiler) {
    let sol = q.solution || '';
    const orig = sol;
    
    // Remove trailing boilerplate
    sol = sol.replace(/\s*Bước giải toán trên được thực hiện chi tiết từng bước[^]*$/s, '');
    sol = sol.trim();
    
    if (sol !== orig && sol.length >= 10) {
      await sql`UPDATE public.questions SET solution = ${sol}, updated_at = NOW() WHERE id = ${q.id}`;
      solCleaned++;
    }
  }
  console.log(`Đã dọn boilerplate solution: ${solCleaned} câu`);

  // ===== 2. NEAR-DUPLICATE DETECTION =====
  console.log('\n--- 2. NEAR-DUPLICATE DETECTION ---\n');
  
  let totalDups = 0;
  for (const grade of [4,5,6,7,8,9]) {
    const qs = await sql`
      SELECT id, question_code, content FROM public.questions
      WHERE grade = ${grade}
      ORDER BY question_code
    `;
    
    const normalized = qs.map(q => ({
      id: q.id,
      code: q.question_code,
      norm: normalizeForDup(q.content),
      content: (q.content || '').slice(0, 80),
    }));
    
    // Check each pair (O(n²) but with early termination)
    const dupPairs = [];
    for (let i = 0; i < normalized.length; i++) {
      for (let j = i + 1; j < normalized.length; j++) {
        // Quick length check
        const lenRatio = Math.min(normalized[i].norm.length, normalized[j].norm.length) / 
                         Math.max(normalized[i].norm.length, normalized[j].norm.length);
        if (lenRatio < 0.7) continue;
        
        // Exact match
        if (normalized[i].norm === normalized[j].norm) {
          dupPairs.push([normalized[i], normalized[j], 1.0]);
          continue;
        }
        
        // Jaccard similarity > 0.85
        if (normalized[i].norm.length > 20) {
          const sim = jaccard(normalized[i].norm, normalized[j].norm);
          if (sim > 0.85) {
            dupPairs.push([normalized[i], normalized[j], sim]);
          }
        }
      }
    }
    
    if (dupPairs.length > 0) {
      totalDups += dupPairs.length;
      console.log(`  Lớp ${grade}: ${dupPairs.length} cặp near-duplicate`);
      for (const [a, b, sim] of dupPairs.slice(0, 5)) {
        console.log(`    [${a.code}] ↔ [${b.code}] (${(sim*100).toFixed(0)}%): "${a.content.slice(0,50)}..."`);
      }
      if (dupPairs.length > 5) console.log(`    ... và ${dupPairs.length - 5} cặp nữa`);
    } else {
      console.log(`  Lớp ${grade}: 0 near-duplicate`);
    }
  }
  console.log(`\n  Tổng near-duplicate: ${totalDups} cặp`);

  // ===== 3. KIỂM TRA 2 CÂU QUÁ DÀI =====
  console.log('\n--- 3. CÂU QUÁ DÀI ---\n');
  const longQs = await sql`
    SELECT question_code, content, grade, LENGTH(content) as len FROM public.questions
    WHERE LENGTH(content) > 3000 ORDER BY len DESC
  `;
  for (const q of longQs) {
    // Kiểm tra có phải 1 bài hay nhiều bài gộp
    const subQuestions = (q.content.match(/(?:câu|bài|phần)\s*\d/gi) || []).length;
    console.log(`  [${q.question_code}] L${q.grade}: ${q.len}c, ~${subQuestions} câu con`);
    console.log(`    Đầu: "${(q.content||'').slice(0,100)}"`);
  }

  // ===== 4. ĐÁP ÁN CÓ $ NHƯNG KHÔNG CÓ NỘI DUNG TOÁN =====
  console.log('\n--- 4. ĐÁP ÁN TRỐNG SAU KHI BỎ BOILERPLATE ---\n');
  const emptyAfterClean = await sql`
    SELECT question_code, answer, grade FROM public.questions
    WHERE LENGTH(TRIM(answer)) < 3 OR answer IS NULL
  `;
  console.log(`Câu đáp án < 3 ký tự sau dọn: ${emptyAfterClean.length}`);
  for (const q of emptyAfterClean) {
    console.log(`  [${q.question_code}] L${q.grade}: "${q.answer}"`);
  }

  console.log('\n\nHoàn thành:', new Date().toISOString());
}

main().catch(err => { console.error('FATAL:', err); process.exit(1); });
