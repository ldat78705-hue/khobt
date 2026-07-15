/**
 * SỬA 35 CÂU CÒN LẠI:
 * 1. Câu MCQ bị nhầm type 'tu_luan' → chuyển thành 'trac_nghiem'
 * 2. Câu tự luận thực sự → trích đáp án từ solution
 */
const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

async function main() {
  console.log('=== SỬA 35 CÂU CÒN LẠI ===\n');
  
  const remaining = await sql`
    SELECT id, question_code, content, answer, solution, grade, question_type, options, correct_answer
    FROM public.questions
    WHERE LENGTH(TRIM(answer)) < 3 AND question_type NOT IN ('trac_nghiem', 'dung_sai')
    ORDER BY grade, question_code
  `;
  
  console.log(`Còn: ${remaining.length} câu\n`);
  
  let fixedMCQ = 0, fixedAns = 0, skipped = 0;
  
  for (const q of remaining) {
    const content = q.content || '';
    const ans = (q.answer || '').trim().replace('.', '');
    const sol = q.solution || '';
    
    // Case 1: Content has A. B. C. D. format → This is MCQ
    const hasMCQOptions = /\bA[\.\)]\s/.test(content) && /\bB[\.\)]\s/.test(content);
    
    if (hasMCQOptions && /^[ABCD]$/i.test(ans)) {
      // Parse options from content
      const optMatches = content.match(/([ABCD])[\.\)]\s*([^A-D\n]*?)(?=\s*[ABCD][\.\)]|\s*$)/gs);
      if (optMatches && optMatches.length >= 2) {
        const options = [];
        for (const m of optMatches) {
          const keyMatch = m.match(/^([ABCD])[\.\)]\s*(.*)/s);
          if (keyMatch) {
            options.push({ key: keyMatch[1].toUpperCase(), value: keyMatch[2].trim() });
          }
        }
        
        if (options.length >= 2) {
          // Convert to MCQ
          await sql`UPDATE public.questions SET 
            question_type = 'trac_nghiem',
            correct_answer = ${ans.toUpperCase()},
            options = ${JSON.stringify(options)}::jsonb,
            updated_at = NOW()
          WHERE id = ${q.id}`;
          fixedMCQ++;
          console.log(`✅ [${q.question_code}] L${q.grade}: tu_luan → trac_nghiem (${ans.toUpperCase()})`);
          continue;
        }
      }
    }
    
    // Case 2: Answer is "1" - try extracting from solution
    if (ans === '1' || ans === '2') {
      // Extract real answer from solution
      const patterns = [
        /=\s*(\$[^$]+\$)/,
        /(\d[\d,.]*)\s*(?:\\text|cm|m|dm|ha|kg)/,
        /Đáp\s*số[:\s]*([^\n]+)/i,
      ];
      
      let newAns = null;
      for (const p of patterns) {
        const m = sol.match(p);
        if (m && m[1] && m[1].trim().length > 1) {
          newAns = m[1].trim();
          break;
        }
      }
      
      if (newAns) {
        if (!newAns.endsWith('.')) newAns += '.';
        await sql`UPDATE public.questions SET answer = ${newAns}, updated_at = NOW() WHERE id = ${q.id}`;
        fixedAns++;
        console.log(`✅ [${q.question_code}] L${q.grade}: "${ans}" → "${newAns.slice(0,40)}"`);
        continue;
      }
    }
    
    skipped++;
    // For MCQ-like that we couldn't parse, just set correct_answer
    if (/^[ABCD]$/i.test(ans)) {
      await sql`UPDATE public.questions SET 
        correct_answer = ${ans.toUpperCase()},
        updated_at = NOW()
      WHERE id = ${q.id}`;
      console.log(`ℹ️ [${q.question_code}] L${q.grade}: Set correct_answer="${ans.toUpperCase()}" (giữ tu_luan)`);
    } else {
      console.log(`⚠️ [${q.question_code}] L${q.grade}: Bỏ qua (ans="${ans}")`);
    }
  }
  
  console.log(`\n📊 Chuyển MCQ: ${fixedMCQ} | Sửa đáp án: ${fixedAns} | Bỏ qua: ${skipped}`);
}

main().catch(err => { console.error('FATAL:', err); process.exit(1); });
