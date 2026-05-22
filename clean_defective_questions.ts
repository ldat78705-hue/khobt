import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);

async function cleanDefectiveQuestions() {
  console.log('Bắt đầu dọn dẹp các câu hỏi lỗi ở Khối 7, 5, 4...');

  // 1. Trắc nghiệm thiếu options hoặc correct_answer
  const updateTracNghiem = await sql`
    UPDATE public.questions
    SET status = 'rejected', updated_at = NOW()
    WHERE grade IN (4, 5, 7)
      AND question_type = 'trac_nghiem'
      AND (
        options IS NULL 
        OR jsonb_array_length(options) < 2
        OR correct_answer IS NULL
        OR trim(correct_answer) = ''
      )
      AND status != 'rejected'
    RETURNING id;
  `;
  console.log(`Đã ẩn ${updateTracNghiem.length} câu trắc nghiệm bị thiếu phương án/đáp án.`);

  // 2. Tự luận thiếu đáp án (answer) hoặc nội dung (content)
  const updateTuLuan = await sql`
    UPDATE public.questions
    SET status = 'rejected', updated_at = NOW()
    WHERE grade IN (4, 5, 7)
      AND (
        content IS NULL OR trim(content) = ''
        OR (question_type = 'tu_luan' AND (answer IS NULL OR trim(answer) = ''))
      )
      AND status != 'rejected'
    RETURNING id;
  `;
  console.log(`Đã ẩn ${updateTuLuan.length} câu hỏi bị thiếu đề bài hoặc đáp án ngắn.`);

  // 3. Câu hỏi thiếu lời giải hoặc lời giải quá ngắn (< 15 ký tự)
  const updateShortSolution = await sql`
    UPDATE public.questions
    SET status = 'rejected', updated_at = NOW()
    WHERE grade IN (4, 5, 7)
      AND (
        solution IS NULL 
        OR length(trim(solution)) < 15
      )
      AND status != 'rejected'
    RETURNING id;
  `;
  console.log(`Đã ẩn ${updateShortSolution.length} câu hỏi bị thiếu lời giải hoặc lời giải quá ngắn.`);

  console.log('✅ Hoàn tất quá trình dọn dẹp (chuyển trạng thái sang "rejected")!');
}

cleanDefectiveQuestions().catch(console.error);
