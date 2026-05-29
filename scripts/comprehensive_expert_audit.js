const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env.local' });
const fs = require('fs');

(async () => {
  console.log("Khởi động AI Expert Rule-based Audit cho Lớp 9...");
  const sql = neon(process.env.DATABASE_URL);
  
  // Lấy toàn bộ câu hỏi Lớp 9
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
    const content = q.content || '';
    const solution = q.solution || '';
    const answer = q.answer || '';
    const allText = (content + ' ' + solution + ' ' + answer).toLowerCase();

    // 1. Chuyên gia Giáo dục (Văn phong, Sư phạm)
    // - Viết hoa chữ cái đầu (đề bài)
    if (content.length > 0) {
      const firstChar = content.trim().charAt(0);
      if (firstChar >= 'a' && firstChar <= 'z') {
        qIssues.push("SƯ PHẠM: Chữ cái đầu câu không viết hoa");
      }
    }
    // - Lỗi dấu câu (khoảng trắng trước dấu phẩy/chấm)
    if (/\s+[,.]/.test(content)) {
      qIssues.push("VĂN PHONG: Khoảng trắng thừa trước dấu câu");
    }

    // 2. Giáo viên Toán (Logic đề, Lời giải chuẩn, MCQ)
    if (q.question_type === 'trac_nghiem') {
      if (!q.options || q.options.length < 4) {
        qIssues.push("LOGIC MCQ: Câu trắc nghiệm thiếu hoặc không đủ 4 phương án");
      } else if (q.correct_answer) {
        // Kiểm tra xem correct_answer có khớp với key trong options không (nếu options là mảng object)
        // Hoặc khớp với value nếu options là mảng chuỗi
        const isObjectOptions = q.options.length > 0 && typeof q.options[0] === 'object' && q.options[0] !== null;
        const optMatch = isObjectOptions 
          ? q.options.some(opt => opt.key === q.correct_answer || (typeof opt.value === 'string' && opt.value.trim() === q.correct_answer.trim()))
          : q.options.some(opt => typeof opt === 'string' && typeof q.correct_answer === 'string' && opt.trim() === q.correct_answer.trim());
        
        if (!optMatch) {
          qIssues.push("LOGIC MCQ: Đáp án đúng (correct_answer) không khớp với bất kỳ phương án nào");
        }
      }
    }
    
    // Câu hỏi tự luận thường có yêu cầu giải thích, nếu solution quá ngắn thì báo
    if (q.question_type === 'tu_luan' && solution.length < 30 && solution.trim().length > 0) {
      qIssues.push("LOGIC LỜI GIẢI: Lời giải tự luận quá ngắn (< 30 ký tự)");
    }

    // 3. HSG Toán Quốc gia (Chặt chẽ toán học, Điều kiện)
    // Bắt một số dấu hiệu có thể thiếu điều kiện
    if ((content.includes('\\frac') || content.includes('\\dfrac')) && content.includes('x') && !allText.includes('điều kiện') && !allText.includes('x \\ne')) {
      // Phân thức chứa x nhưng không thấy chữ "điều kiện" hoặc "x \ne" (Có thể tiềm ẩn thiếu ĐKXĐ)
      // qIssues.push("CHẶT CHẼ TOÁN HỌC: Chứa phân thức nhưng có thể thiếu điều kiện xác định");
      // Sẽ quét bằng AI để chắc chắn hơn, nhưng đây là 1 flag nhẹ.
    }
    
    if (content.includes('\\sqrt{') && content.includes('x') && !allText.includes('điều kiện') && !allText.includes('\\ge')) {
      // Có căn thức chứa biến nhưng thiếu điều kiện x >= ...
      // qIssues.push("CHẶT CHẼ TOÁN HỌC: Chứa căn thức nhưng có thể thiếu ĐKXĐ");
    }

    if (qIssues.length > 0) {
      issues.push({ id: q.id, code, cat: q.category_name, issues: qIssues, content: content.substring(0, 100).replace(/\n/g, ' ') });
    }
  }

  console.log(`Đã rà soát ${questions.length} câu hỏi Lớp 9.`);
  console.log(`Phát hiện ${issues.length} câu hỏi có rủi ro logic/văn phong cần AI xử lý thêm.`);

  fs.writeFileSync('tailieu/grade9_expert_audit.json', JSON.stringify(issues, null, 2), 'utf-8');
  console.log("Đã lưu kết quả Rule-based Audit vào tailieu/grade9_expert_audit.json");
})();
