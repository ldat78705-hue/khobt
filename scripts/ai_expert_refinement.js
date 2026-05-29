const { neon } = require('@neondatabase/serverless');
const { GoogleGenerativeAI, SchemaType } = require('@google/generative-ai');
require('dotenv').config({ path: '.env.local' });
const fs = require('fs');

if (!process.env.GEMINI_API_KEY) {
  console.error('[LỖI]: Thiếu GEMINI_API_KEY trong .env.local');
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const SYSTEM_PROMPT = `
Bạn đóng vai trò 3 chuyên gia: Chuyên gia sư phạm, Giáo viên Toán giỏi và Học sinh giỏi Quốc gia.
Nhiệm vụ: Sửa lỗi logic đề bài, đáp án và lời giải của câu hỏi Toán. Đảm bảo:
- Đáp án phải chính xác 100% dựa vào đề bài.
- Nếu là trắc nghiệm (options != null), phải tạo 4 phương án A,B,C,D trong mảng options và correct_answer phải nằm chính xác trong mảng đó.
- Lời giải phải chi tiết, chặt chẽ toán học, không quá ngắn.
- Dùng \`\\dfrac\` thay vì \`\\frac\`, có khoảng trắng sau số nếu có đơn vị (ví dụ \`5 \\text{ cm}\`).
- Trả về JSON với các trường: content, answer, solution, options, correct_answer.
`;

const schema = {
  type: SchemaType.OBJECT,
  properties: {
    content: { type: SchemaType.STRING },
    answer: { type: SchemaType.STRING },
    solution: { type: SchemaType.STRING },
    options: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
    correct_answer: { type: SchemaType.STRING }
  },
  required: ["content", "answer", "solution", "options", "correct_answer"]
};

async function processIssues() {
  console.log("Khởi động AI Expert Refinement...");
  let issues = [];
  try {
    issues = JSON.parse(fs.readFileSync('tailieu/grade9_expert_audit.json', 'utf8'));
  } catch(e) {
    console.error("Không đọc được file grade9_expert_audit.json", e.message);
    return;
  }
  
  if (issues.length === 0) {
    console.log("Không có lỗi nào cần sửa.");
    return;
  }

  let fixed = 0;
  // Giới hạn 20 câu để test trước, tránh quá tải API hoặc thời gian chờ lâu
  const toProcess = issues.slice(0, 20); 
  
  for (const issue of toProcess) {
    console.log(`\nĐang sửa câu: ${issue.code}`);
    const qData = await sql`SELECT id, content, answer, solution, options, correct_answer, question_type FROM public.questions WHERE id = ${issue.id}`;
    if (!qData || qData.length === 0) continue;
    const q = qData[0];

    const prompt = `Câu hỏi hiện tại:
Nội dung: ${q.content}
Đáp án: ${q.answer}
Lời giải: ${q.solution}
Loại: ${q.question_type}
Options: ${JSON.stringify(q.options)}
Correct Answer: ${q.correct_answer}
Các lỗi phát hiện: ${issue.issues.join(', ')}

Hãy đóng 3 vai trò và sửa lại hoàn chỉnh thành JSON.`;

    try {
      const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: schema,
        }
      });
      const responseText = result.response.text();
      const fixedQ = JSON.parse(responseText);

      await sql`
        UPDATE public.questions 
        SET content = ${fixedQ.content}, 
            answer = ${fixedQ.answer}, 
            solution = ${fixedQ.solution},
            options = ${fixedQ.options && fixedQ.options.length > 0 ? fixedQ.options : null},
            correct_answer = ${fixedQ.correct_answer || null},
            updated_at = NOW()
        WHERE id = ${issue.id}
      `;
      console.log(`  => Đã sửa thành công.`);
      fixed++;
    } catch (e) {
      console.error(`  => Lỗi sửa câu ${issue.code}:`, e.message);
    }
    await new Promise(r => setTimeout(r, 2000));
  }
  
  console.log(`\nHoàn thành! Đã sửa ${fixed}/${toProcess.length} câu.`);
}

processIssues().catch(console.error);
