const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env.local' });
const fs = require('fs');

(async () => {
  console.log("Khởi động Master Expert Audit & Auto-Fix (Lớp 4 - Lớp 8)...");
  const sql = neon(process.env.DATABASE_URL);
  
  const grades = [8, 7, 6, 5, 4];
  const allIssues = [];
  let totalFixed = 0;
  
  for (const grade of grades) {
    console.log(`\nĐang quét Lớp ${grade}...`);
    const questions = await sql`
      SELECT q.id, q.question_code, q.content, q.answer, q.solution,
             q.correct_answer, q.options, q.question_type, c.name as category_name
      FROM public.questions q
      JOIN public.categories c ON q.category_id = c.id
      WHERE q.grade = ${grade}
    `;
    
    let gradeIssues = 0;
    let gradeFixed = 0;
    
    for (const q of questions) {
      const code = q.question_code || `ID:${q.id}`;
      const qIssues = [];
      let content = (q.content || '').trim();
      let answer = (q.answer || '').trim();
      let solution = (q.solution || '').trim();
      
      // AUTO-FIX: Formatting (Sư phạm & Thẩm mỹ)
      const applyFixes = (text) => {
        if (!text) return text;
        let t = text;
        t = t.replace(/\\frac{/g, '\\dfrac{'); // Chuẩn hóa phân số
        t = t.replace(/\s+\./g, '.'); // Xóa khoảng trắng dư trước dấu chấm
        t = t.replace(/\s+,/g, ',');  // Xóa khoảng trắng dư trước dấu phẩy
        t = t.replace(/\.\./g, '.');  // Xóa chấm dư
        return t;
      };
      
      let newContent = applyFixes(content);
      let newAnswer = applyFixes(answer);
      let newSolution = applyFixes(solution);
      
      // Viết hoa chữ cái đầu nếu viết thường (Chuyên gia Giáo dục)
      if (newContent.length > 0 && /^[a-z]/.test(newContent.charAt(0))) {
        newContent = newContent.charAt(0).toUpperCase() + newContent.slice(1);
      }
      
      let wasAutoFixed = false;
      if (newContent !== content || newAnswer !== answer || newSolution !== solution) {
        await sql`
          UPDATE public.questions
          SET content = ${newContent}, answer = ${newAnswer}, solution = ${newSolution}
          WHERE id = ${q.id}
        `;
        wasAutoFixed = true;
        gradeFixed++;
        // Cập nhật lại biến để check logic
        content = newContent;
        answer = newAnswer;
        solution = newSolution;
      }
      
      // AUDIT: Logic & Chặt chẽ (Giáo viên Toán giỏi & HSG Quốc gia)
      if (q.question_type === 'trac_nghiem') {
        if (!q.options || q.options.length < 4) {
          qIssues.push("LOGIC MCQ: Thiếu hoặc không đủ 4 phương án");
        } else if (q.correct_answer) {
          const isObjectOptions = q.options.length > 0 && typeof q.options[0] === 'object' && q.options[0] !== null;
          const optMatch = isObjectOptions 
            ? q.options.some(opt => opt.key === q.correct_answer || (typeof opt.value === 'string' && opt.value.trim() === q.correct_answer.trim()))
            : q.options.some(opt => typeof opt === 'string' && typeof q.correct_answer === 'string' && opt.trim() === q.correct_answer.trim());
          
          if (!optMatch) {
            qIssues.push("LOGIC MCQ: Đáp án đúng (correct_answer) không khớp với bất kỳ phương án nào");
          }
        }
      }
      
      if (q.question_type === 'tu_luan' && (!solution || solution.length < 30)) {
        if (solution.length > 0) {
          qIssues.push("LOGIC LỜI GIẢI: Lời giải tự luận quá ngắn (< 30 ký tự)");
        } else {
          qIssues.push("LOGIC LỜI GIẢI: Thiếu hoàn toàn lời giải");
        }
      }
      
      if (solution.includes('Phương pháp giải cơ bản:')) {
        qIssues.push("SƯ PHẠM: Lời giải chứa placeholder AI 'Phương pháp giải cơ bản:'");
      }

      if (qIssues.length > 0) {
        allIssues.push({ id: q.id, code, grade, cat: q.category_name, issues: qIssues, content: content.substring(0, 80).replace(/\n/g, ' ') });
        gradeIssues++;
      }
    }
    console.log(`Lớp ${grade}: Tự động chuẩn hóa form cho ${gradeFixed} câu. Cảnh báo Logic cần xử lý: ${gradeIssues} câu.`);
    totalFixed += gradeFixed;
  }
  
  fs.writeFileSync('tailieu/g4_8_master_audit.json', JSON.stringify(allIssues, null, 2), 'utf-8');
  console.log(`\nHoàn tất! Đã tự động chuẩn hóa tổng cộng ${totalFixed} câu (Lớp 4-8).`);
  console.log(`Phát hiện ${allIssues.length} lỗi logic/sư phạm nặng cần chuyên gia can thiệp. (Đã lưu vào tailieu/g4_8_master_audit.json)`);
})();
