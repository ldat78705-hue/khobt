const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env.local' });
const fs = require('fs');

(async () => {
  console.log("Khởi động Deep Audit (Rà soát chuyên sâu vòng 2) cho Lớp 9...");
  const sql = neon(process.env.DATABASE_URL);
  
  const questions = await sql`
    SELECT q.id, q.question_code, q.content, q.answer, q.solution,
           q.correct_answer, q.options, q.question_type, c.name as category_name
    FROM public.questions q
    JOIN public.categories c ON q.category_id = c.id
    WHERE q.grade = 9
  `;
  
  const issues = [];
  
  for (const q of questions) {
    const code = q.question_code || `ID:${q.id}`;
    const qIssues = [];
    const content = (q.content || '').trim();
    const solution = (q.solution || '').trim();
    const answer = (q.answer || '').trim();
    const allText = (content + ' ' + solution + ' ' + answer);

    // 1. CHUYÊN GIA SƯ PHẠM (Ngữ pháp, format, trình bày)
    if (content.length > 0 && !/^[A-ZĐÁÀẢÃẠÂẤẦẨẪẬĂẮẰẲẴẶÉÈẺẼẸÊẾỀỂỄỆÍÌỈĨỊÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÚÙỦŨỤƯỨỪỬỮỰÝỲỶỸỴ]/.test(content)) {
      // Bỏ qua nếu bắt đầu bằng thẻ HTML hoặc công thức toán
      if (!content.startsWith('<') && !content.startsWith('$') && !content.startsWith('Cho') && !content.startsWith('Tìm') && !content.startsWith('Giải')) {
        qIssues.push("SƯ PHẠM: Câu không bắt đầu bằng chữ viết hoa chuẩn");
      }
    }
    if (content.includes('..') || content.includes(' ,') || content.includes(' .')) {
      qIssues.push("SƯ PHẠM: Dấu câu lặp hoặc dư khoảng trắng");
    }
    
    // 2. GIÁO VIÊN TOÁN (Logic, Đáp án, Phương pháp)
    if (solution.includes('Phương pháp giải cơ bản:')) {
      qIssues.push("GIÁO VIÊN: Lời giải đang là placeholder AI (Phương pháp giải cơ bản)");
    }
    if (content.length < 20) {
      qIssues.push("GIÁO VIÊN: Nội dung câu hỏi quá ngắn (< 20 ký tự)");
    }
    if (q.question_type === 'tu_luan' && !solution) {
      qIssues.push("GIÁO VIÊN: Câu tự luận hoàn toàn trống lời giải");
    }
    if (q.question_type === 'trac_nghiem') {
       const isObjectOptions = q.options && q.options.length > 0 && typeof q.options[0] === 'object' && q.options[0] !== null;
       let hasEmptyOpt = false;
       if (isObjectOptions) {
          hasEmptyOpt = q.options.some(o => !o.value || o.value.trim() === '');
       } else if (q.options) {
          hasEmptyOpt = q.options.some(o => !o || o.trim() === '');
       }
       if (hasEmptyOpt) {
          qIssues.push("GIÁO VIÊN MCQ: Tồn tại phương án trống");
       }
    }

    // 3. HSG TOÁN QUỐC GIA (Chặt chẽ)
    if (allText.includes('\\frac') && !allText.includes('\\dfrac')) {
      // Ưu tiên dfrac cho THCS
      qIssues.push("HSG TOÁN: Dùng \\frac thay vì \\dfrac (kém thẩm mỹ)");
    }
    if (allText.includes('x') && allText.includes('y') && allText.includes('z') && content.includes('tam giác')) {
      // Just a stub
    }

    if (qIssues.length > 0) {
      issues.push({ id: q.id, code, cat: q.category_name, issues: qIssues, content: content.substring(0, 80).replace(/\n/g, ' ') });
    }
  }

  console.log(`Đã rà soát vòng 2 cho ${questions.length} câu hỏi Lớp 9.`);
  console.log(`Phát hiện ${issues.length} câu hỏi vi phạm các quy tắc ngặt nghèo.`);

  fs.writeFileSync('tailieu/grade9_deep_audit.json', JSON.stringify(issues, null, 2), 'utf-8');
})();
