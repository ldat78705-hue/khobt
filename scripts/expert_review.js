const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

async function expertReview() {
  console.log("Khởi động AI Expert Reviewer Engine...");
  
  // Lấy toàn bộ câu hỏi
  const allQuestions = await sql`SELECT id, content, answer, solution FROM public.questions`;
  console.log(`Đã tải ${allQuestions.length} câu hỏi để rà soát.`);

  let fixCount = 0;

  for (const q of allQuestions) {
    let newContent = q.content;
    let newAnswer = q.answer;
    let newSolution = q.solution;
    let changed = false;

    // 1. Chuyên gia Toán học: Chuẩn hóa ký hiệu
    const replaceMath = (str) => {
      if (!str) return str;
      let s = str;
      // Phân số chuẩn
      s = s.replace(/\\frac{/g, '\\dfrac{');
      // Dấu nhân
      s = s.replace(/(?<!\\)x(?=\s*\d)/g, '\\times'); // Chỉ thay x giữa các số nếu bị lỗi (rất cẩn thận)
      s = s.replace(/\\cdot /g, '\\cdot ');
      // Đơn vị đo lường (thêm khoảng trắng và text)
      s = s.replace(/(\d+)(cm|m|kg|g|l|ml)/g, '$1 \\text{ $2}');
      return s;
    };

    // 2. Giáo viên Ngữ Văn: Chuẩn hóa dấu câu
    const fixPunctuation = (str) => {
      if (!str) return str;
      let s = str.trim();
      // Viết hoa chữ cái đầu
      if (s.length > 0) {
        s = s.charAt(0).toUpperCase() + s.slice(1);
      }
      // Dấu chấm kết thúc
      if (s.length > 0 && !['.', '?', '!'].includes(s.slice(-1))) {
        s += '.';
      }
      // Bỏ khoảng trắng thừa trước dấu chấm, phẩy
      s = s.replace(/\s+\./g, '.').replace(/\s+,/g, ',');
      return s;
    };

    let c = replaceMath(fixPunctuation(q.content));
    let a = replaceMath(fixPunctuation(q.answer));
    let s = replaceMath(fixPunctuation(q.solution));

    if (c !== q.content || a !== q.answer || s !== q.solution) {
      await sql`
        UPDATE public.questions 
        SET content = ${c}, answer = ${a}, solution = ${s}
        WHERE id = ${q.id}
      `;
      fixCount++;
    }
  }

  console.log(`Expert Review Hoàn tất! Đã tinh chỉnh và chuẩn hóa ${fixCount} câu hỏi.`);
}

expertReview().catch(console.error);
