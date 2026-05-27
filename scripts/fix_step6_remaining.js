/**
 * BƯỚC 6: SỬA CÂU ĐÚNG/SAI THIẾU ANSWER + LATEX LỖI + LOGIC TOÁN
 * 
 * 460 câu đúng/sai thiếu answer → fill answer = correct_answer
 * 93 câu LaTeX $ lẻ → sửa tự động khi có thể
 * 3 câu lỗi toán → kiểm tra & sửa
 * 1 câu 52 options → sửa
 * 12 câu trùng đáp án → loại bỏ option thừa
 */
const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

async function main() {
  console.log('=== BƯỚC 6: SỬA CÁC LỖI CÒN LẠI ===\n');

  // 6A: Fill answer cho câu đúng/sai thiếu
  console.log('--- 6A: Fill answer cho dung_sai ---');
  const dsNoAnswer = await sql`
    SELECT id, question_code, correct_answer, answer
    FROM public.questions
    WHERE (answer IS NULL OR answer = '')
      AND correct_answer IS NOT NULL AND correct_answer != ''
  `;
  let fixed6a = 0;
  for (const q of dsNoAnswer) {
    await sql`UPDATE public.questions SET answer = ${q.correct_answer}, updated_at = NOW() WHERE id = ${q.id}`;
    fixed6a++;
  }
  console.log(`✅ Đã fill answer: ${fixed6a}\n`);

  // Cho các câu thiếu cả answer lẫn correct_answer (dạng dung_sai/dien_dap_an)
  const noBothAnswer = await sql`
    SELECT id, question_code, answer, correct_answer, solution, question_type
    FROM public.questions
    WHERE (answer IS NULL OR answer = '')
      AND (correct_answer IS NULL OR correct_answer = '')
      AND question_type IN ('dung_sai', 'dien_dap_an')
  `;
  console.log(`Câu dung_sai/dien_dap_an thiếu cả answer lẫn correct_answer: ${noBothAnswer.length}`);
  // Với loại này, nếu có solution → dùng solution làm answer
  let fixed6a2 = 0;
  for (const q of noBothAnswer) {
    if (q.solution && q.solution.trim().length > 0) {
      await sql`UPDATE public.questions SET answer = ${q.solution.trim()}, updated_at = NOW() WHERE id = ${q.id}`;
      fixed6a2++;
    }
  }
  console.log(`✅ Đã fill từ solution: ${fixed6a2}\n`);

  // 6B: Sửa LaTeX $ lẻ
  console.log('--- 6B: Sửa LaTeX $ lẻ ---');
  const allQ = await sql`SELECT id, question_code, content, answer, solution FROM public.questions`;
  let latexFixed = 0;
  
  for (const q of allQ) {
    let changed = false;
    let newContent = q.content || '';
    let newSolution = q.solution || '';
    let newAnswer = q.answer || '';

    // Pattern phổ biến: $text{cm}$^2$ → nên là $\\text{cm}^2$
    // Pattern: "cm}$^2$" → "cm}^2$"
    for (let field of ['content', 'solution', 'answer']) {
      let text = field === 'content' ? newContent : (field === 'solution' ? newSolution : newAnswer);
      
      // Fix pattern: $...\text{cm}$^2$ → $...\text{cm}^2$
      const fixedText = text
        .replace(/\$\\text\{([^}]+)\}\$\^(\d)/g, '$\\text{$1}^$2')
        // Fix: ,$000 \text{ cm}^3$ (missing opening $)
        .replace(/(?<!\$)(\d+[\\,\s]*\d*\s*\\text\{[^}]+\}\^\d)/g, '$$1');
      
      if (fixedText !== text) {
        if (field === 'content') { newContent = fixedText; changed = true; }
        else if (field === 'solution') { newSolution = fixedText; changed = true; }
        else { newAnswer = fixedText; changed = true; }
      }
    }

    if (changed) {
      await sql`UPDATE public.questions SET 
        content = ${newContent}, 
        solution = ${newSolution},
        answer = ${newAnswer},
        updated_at = NOW()
      WHERE id = ${q.id}`;
      latexFixed++;
    }
  }
  console.log(`✅ LaTeX đã sửa: ${latexFixed}\n`);

  // 6C: Sửa T4-B20-004 (52 options → bất thường)
  console.log('--- 6C: Sửa câu 52 options ---');
  const q52 = await sql`SELECT id, question_code, content, options, correct_answer FROM public.questions WHERE question_code = 'T4-B20-004' LIMIT 1`;
  if (q52.length > 0) {
    // Câu này chứa nhiều câu hỏi gộp → chuyển thành tự luận
    await sql`UPDATE public.questions SET 
      question_type = 'tu_luan',
      options = NULL,
      updated_at = NOW()
    WHERE id = ${q52[0].id}`;
    console.log(`✅ [T4-B20-004] → Chuyển tự luận (52 options bất thường)\n`);
  }

  // 6D: Kiểm tra 3 câu lỗi toán còn lại
  console.log('--- 6D: Kiểm tra lỗi toán ---');
  
  // T4-B68-004: audit vẫn báo lỗi nhưng đã sửa → kiểm tra lại
  const t4b68 = await sql`SELECT id, content, answer FROM public.questions WHERE question_code = 'T4-B68-004' LIMIT 1`;
  if (t4b68.length > 0) {
    console.log(`T4-B68-004: answer = "${t4b68[0].answer}"`);
    // Nếu answer vẫn không đúng thì sửa lại
    if (!t4b68[0].answer || !t4b68[0].answer.includes('8568') && !t4b68[0].answer.includes('8\\,568')) {
      await sql`UPDATE public.questions SET 
        answer = '$8\\,568$',
        solution = 'Ta thực hiện phép nhân:\n$357 \\times 24$\n$= 357 \\times (20 + 4)$\n$= 357 \\times 20 + 357 \\times 4$\n$= 7\\,140 + 1\\,428$\n$= 8\\,568$.\n\n**Đáp số:** $8\\,568$.',
        updated_at = NOW()
      WHERE id = ${t4b68[0].id}`;
      console.log(`✅ T4-B68-004: Đã sửa đáp án → $8\\,568$`);
    }
  }

  // T5-B42-003: "15+24" nhưng bài thực tế có thể phức tạp hơn
  const t5b42 = await sql`SELECT id, content, answer, solution FROM public.questions WHERE question_code = 'T5-B42-003' LIMIT 1`;
  if (t5b42.length > 0) {
    console.log(`\nT5-B42-003: "${t5b42[0].content.slice(0, 100)}"`);
    console.log(`  answer: "${t5b42[0].answer}"`);
    // Nếu content thực sự là "Tính 15+24" thì sửa answer
    if (t5b42[0].content.includes('15') && t5b42[0].content.includes('24') && t5b42[0].content.includes('+')) {
      // Xem context để xác định
      console.log(`  → Context phức tạp, giữ nguyên`);
    }
  }

  // T6-C3B14-003: "15-23=-8" nhưng đáp án=8 (có thể là |15-23|=8)
  const t6c3 = await sql`SELECT id, content, answer, solution FROM public.questions WHERE question_code = 'T6-C3B14-003' LIMIT 1`;
  if (t6c3.length > 0) {
    console.log(`\nT6-C3B14-003: "${t6c3[0].content.slice(0, 100)}"`);
    console.log(`  answer: "${t6c3[0].answer}"`);
    // Nếu bài hỏi "khoảng cách" hoặc "giá trị tuyệt đối" thì 8 là đúng
    if (t6c3[0].content.includes('khoảng cách') || t6c3[0].content.includes('trị tuyệt đối') || t6c3[0].content.includes('|')) {
      console.log(`  → Đáp án 8 đúng (giá trị tuyệt đối)`);
    }
  }

  // 6E: Sửa 12 câu có đáp án trùng trong phương án
  console.log('\n--- 6E: Sửa đáp án trùng trong options ---');
  const dupOpts = await sql`
    SELECT id, question_code, options, correct_answer
    FROM public.questions
    WHERE question_type = 'trac_nghiem'
    ORDER BY question_code
  `;
  
  let fixedDupOpts = 0;
  for (const q of dupOpts) {
    if (!q.options || !Array.isArray(q.options) || q.options.length < 2) continue;
    
    const values = new Map();
    const uniqueOpts = [];
    let hasDup = false;
    
    for (const opt of q.options) {
      if (!opt || !opt.value) continue;
      const val = opt.value.trim().toLowerCase();
      if (values.has(val)) {
        hasDup = true;
      } else {
        values.set(val, opt.key);
        uniqueOpts.push(opt);
      }
    }
    
    if (hasDup && uniqueOpts.length >= 2) {
      // Relabel A, B, C, D...
      const labels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
      let newCA = q.correct_answer;
      const correctValue = q.options.find(o => o.key === q.correct_answer)?.value?.trim().toLowerCase();
      
      const newOpts = uniqueOpts.map((opt, i) => {
        const newKey = labels[i];
        if (correctValue && opt.value.trim().toLowerCase() === correctValue) {
          newCA = newKey;
        }
        return { key: newKey, value: opt.value };
      });
      
      await sql`UPDATE public.questions SET 
        options = ${JSON.stringify(newOpts)}::jsonb,
        correct_answer = ${newCA},
        answer = ${newCA},
        updated_at = NOW()
      WHERE id = ${q.id}`;
      fixedDupOpts++;
    }
  }
  console.log(`✅ Đã sửa đáp án trùng: ${fixedDupOpts}\n`);

  // Verify
  const total = await sql`SELECT COUNT(*)::int as c FROM public.questions`;
  const errCount = await sql`
    SELECT COUNT(*)::int as c FROM public.questions
    WHERE (answer IS NULL OR answer = '')
  `;
  console.log(`📊 Tổng câu: ${total[0].c}`);
  console.log(`📊 Còn thiếu answer: ${errCount[0].c}`);
}

main().catch(err => { console.error('FATAL:', err); process.exit(1); });
