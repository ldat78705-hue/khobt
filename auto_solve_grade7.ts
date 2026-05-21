import { getDb } from "./src/lib/neon/client";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

// Khởi tạo Gemini AI (Yêu cầu có GEMINI_API_KEY trong file .env.local)
const apiKey = process.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

async function autoSolveBatch() {
  const sql = getDb();
  
  const questions = await sql`
    SELECT id, content, grade, topic 
    FROM public.questions 
    WHERE grade = 7 
      AND (solution ILIKE '%Sườn đáp án này được hệ thống tự động phân loại%' OR solution IS NULL OR TRIM(solution) = '')
  `;
  
  console.log(`Bắt đầu tiến trình giải tự động cho ${questions.length} bài tập Lớp 7...`);
  
  if (!genAI) {
    console.error("❌ LỖI: Không tìm thấy GEMINI_API_KEY trong .env.local.");
    console.log("Vui lòng bổ sung GEMINI_API_KEY vào .env.local để hệ thống AI có thể tự động giải toán.");
    process.exit(1);
  }

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });
  let solvedCount = 0;

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    console.log(`\nĐang giải bài ${i + 1}/${questions.length} (ID: ${q.id})...`);
    
    try {
      const prompt = `
Bạn là một giáo viên dạy Toán giỏi cấp THCS (Trung học cơ sở) tại Việt Nam.
Hãy giải chi tiết bài toán sau đây cho học sinh lớp 7.
Tuyệt đối tuân thủ các quy tắc sau:
1. Trình bày các bước lập luận, tính toán rõ ràng, chi tiết, dễ hiểu, logic sư phạm.
2. Viết tất cả các công thức toán học dưới dạng mã LaTeX thuần túy (không dùng \\( \\) hay \\[ \\], chỉ dùng $...$ cho inline và $$...$$ cho block).
3. Đảm bảo chính tả tiếng Việt chuẩn xác, sử dụng dấu phẩy/chấm chính xác.
4. KHÔNG bao gồm các câu giao tiếp thừa như "Chào bạn", "Đây là lời giải". Chỉ in ra phần bài làm bắt đầu bằng "Lời giải:" hoặc "Giải:".

Nội dung bài toán:
${q.content}
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      let text = response.text();
      
      // Cleanup AI output
      text = text.replace(/```latex/gi, '').replace(/```/g, '').trim();
      
      await sql`
        UPDATE public.questions 
        SET solution = ${text}
        WHERE id = ${q.id}
      `;
      
      solvedCount++;
      console.log(`✅ Đã giải xong bài ${q.id}`);
      
      // Delay to avoid hitting API rate limits
      await new Promise(resolve => setTimeout(resolve, 3000));
      
    } catch (error) {
      console.error(`❌ Lỗi khi giải bài ${q.id}:`, error);
      // Wait a bit longer if API limits are hit
      await new Promise(resolve => setTimeout(resolve, 10000));
    }
  }
  
  console.log(`\n🎉 Hoàn tất! Đã giải thành công ${solvedCount}/${questions.length} bài tập.`);
  process.exit(0);
}

autoSolveBatch().catch(console.error);
