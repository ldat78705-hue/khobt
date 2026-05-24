const { neon } = require('@neondatabase/serverless');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const crypto = require('crypto');
require('dotenv').config({ path: '.env.local' });

if (!process.env.GEMINI_API_KEY) {
  console.error('\n[LỖI NGHIÊM TRỌNG]: Không tìm thấy GEMINI_API_KEY trong file .env.local!');
  console.error('Để tôi (Antigravity/Gemini) có thể tự động sinh đề trong lúc sếp đi làm, sếp phải cung cấp API Key.');
  console.error('Vui lòng thêm GEMINI_API_KEY=your_key_here vào cuối file .env.local và chạy lại lệnh này.\n');
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const USER_ID = '8316c34e-765d-4b8c-9364-b683a17e33f8';

const SYSTEM_PROMPT = `
Bạn là một chuyên gia ra đề Toán THCS. Nhiệm vụ của bạn là sinh ra đúng 5 bài tập Vận dụng (Tự luận) cho một chuyên đề cụ thể.
Tuyệt đối tuân thủ các quy tắc định dạng hiển thị:
- Mọi phân số phải dùng \`\\dfrac{a}{b}\`.
- Phải có khoảng trắng giữa số và đơn vị đo (ví dụ: \`5\\text{ cm}\`).
- Lời giải phải chi tiết, giải thích rõ các định lý/quy tắc được sử dụng, độ dài không được dưới 50 ký tự.
- Trả về CHỈ một mảng JSON hợp lệ chứa 5 object. KHÔNG dùng markdown codeblock xung quanh.
Định dạng JSON yêu cầu:
[
  { "content": "Nội dung câu hỏi", "answer": "Đáp án ngắn gọn", "solution": "Lời giải chi tiết từng bước" }
]
`;

async function getCategoriesToFill() {
  // Lấy các danh mục lá (không có danh mục con) thuộc lớp 4, 8, 9
  // Bỏ qua các danh mục đã có đủ câu hỏi
  const query = await sql`
    SELECT c.id, c.name, c.grade 
    FROM public.categories c
    LEFT JOIN public.questions q ON c.id = q.category_id
    WHERE c.parent_id IS NOT NULL 
    AND c.grade IN (4, 8, 9)
    AND NOT EXISTS (
      SELECT 1 FROM public.categories sub WHERE sub.parent_id = c.id
    )
    GROUP BY c.id, c.name, c.grade
    HAVING COUNT(q.id) < 5
    ORDER BY c.grade, c.sort_order
  `;
  return query;
}

async function generateQuestionsForCategory(category) {
  console.log(`\nĐang kết nối Gemini AI để biên soạn cho: [Lớp ${category.grade}] ${category.name}...`);
  
  const prompt = `Hãy sinh 5 bài tập Toán tự luận nâng cao cho chuyên đề: "${category.name}" (Thuộc Lớp ${category.grade} theo SGK Kết nối tri thức).
Trả về Mảng JSON gồm 5 object (content, answer, solution). Bắt buộc tuân thủ quy tắc \\dfrac và khoảng trắng đơn vị đo. Không kèm văn bản nào khác.`;

  try {
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] }
    });

    const responseText = result.response.text().trim();
    // Xoá bỏ markdown codeblock nếu AI lỡ trả về
    let cleanJson = responseText.replace(/^```json\n/, '').replace(/\n```$/, '');
    
    const questions = JSON.parse(cleanJson);
    return questions;
  } catch (error) {
    console.error(`[Lỗi AI Sinh đề cho ${category.name}]:`, error.message);
    return [];
  }
}

async function insertQuestions(categoryId, grade, questions) {
  let inserted = 0;
  for (const q of questions) {
    const qid = crypto.randomUUID();
    const topic = grade === 4 ? 'so_hoc' : (grade === 8 ? 'dai_so' : 'dai_so'); 
    try {
      await sql`
        INSERT INTO public.questions (id, category_id, question_code, content, answer, solution, difficulty, grade, topic, question_type, user_id, status, is_public)
        VALUES (${qid}, ${categoryId}, ${'AUTO-' + Date.now().toString().slice(-6)}, ${q.content}, ${q.answer}, ${q.solution}, 'van_dung', ${grade}, ${topic}, 'tu_luan', ${USER_ID}, 'approved', true)
      `;
      inserted++;
    } catch (e) {
      console.error(`[Lỗi chèn DB]:`, e.message);
    }
  }
  return inserted;
}

async function startAutoAgent() {
  console.log('=== KHỞI ĐỘNG HỆ THỐNG AUTO-GENERATOR (GEMINI AGENT) ===');
  
  const cats = await getCategoriesToFill();
  console.log(`Tìm thấy ${cats.length} chuyên đề (Lớp 4, 8, 9) đang thiếu dữ liệu.`);

  for (const cat of cats) {
    const questions = await generateQuestionsForCategory(cat);
    
    if (questions && questions.length > 0) {
      const inserted = await insertQuestions(cat.id, cat.grade, questions);
      console.log(`=> Đã nạp thành công ${inserted} câu hỏi vào DB cho [${cat.name}].`);
    }
    
    // Nghỉ 5 giây để tránh rate limit
    await new Promise(r => setTimeout(r, 5000));
  }
  
  console.log('\n=== HOÀN TẤT TOÀN BỘ QUY TRÌNH AUTO-GENERATOR ===');
  process.exit(0);
}

startAutoAgent().catch(console.error);
