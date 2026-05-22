import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);

async function insertGrade9Ch2B6() {
  console.log('Khởi tạo kết nối CSDL...');
  
  const categoryId = '85efec08-5622-423f-8291-4bb9831869f6'; // Bài 6. Bất phương trình bậc nhất một ẩn.
  const topicName = 'Bài 6. Bất phương trình bậc nhất một ẩn.';

  // Fetch an existing user_id to use
  const users = await sql`SELECT user_id FROM public.questions WHERE user_id IS NOT NULL LIMIT 1`;
  const defaultUserId = users.length > 0 ? users[0].user_id : '00000000-0000-0000-0000-000000000000';

  const questions = [
    {
      question_code: 'T9-C2B6-NEW-001',
      content: 'Bất phương trình nào sau đây là bất phương trình bậc nhất một ẩn?',
      answer: '$2x - 3 < 0$',
      solution: 'Bất phương trình bậc nhất một ẩn có dạng $ax + b < 0$ (hoặc $>0, \\le 0, \\ge 0$) với $a \\neq 0$. Trong các phương án, chỉ có $2x - 3 < 0$ thỏa mãn điều kiện với $a=2, b=-3$. Phương trình $x^2+1>0$ là bậc hai, $\\frac{1}{x}+2\\le 0$ chứa ẩn ở mẫu, và $0x+5>0$ có hệ số $a=0$.',
      difficulty: 'nhan_biet',
      question_type: 'trac_nghiem',
      options: JSON.stringify([
        '$2x - 3 < 0$', 
        '$x^2 + 1 > 0$', 
        '$\\frac{1}{x} + 2 \\le 0$', 
        '$0x + 5 > 0$'
      ]),
      correct_answer: '$2x - 3 < 0$',
      status: 'approved',
      grade: 9
    },
    {
      question_code: 'T9-C2B6-NEW-002',
      content: 'Nghiệm của bất phương trình $3x - 6 > 0$ là:',
      answer: '$x > 2$',
      solution: 'Chuyển vế đổi dấu ta được $3x > 6$. Chia cả hai vế cho $3$ (là số dương nên giữ nguyên chiều bất phương trình), ta được $x > 2$.',
      difficulty: 'thong_hieu',
      question_type: 'trac_nghiem',
      options: JSON.stringify([
        '$x > 2$', 
        '$x < 2$', 
        '$x > -2$', 
        '$x < -2$'
      ]),
      correct_answer: '$x > 2$',
      status: 'approved',
      grade: 9
    },
    {
      question_code: 'T9-C2B6-NEW-003',
      content: 'Tập nghiệm của bất phương trình $-2x + 4 \\ge 0$ là:',
      answer: 'Các số nhỏ hơn hoặc bằng $2$',
      solution: 'Ta có $-2x + 4 \\ge 0 \\Leftrightarrow -2x \\ge -4$. Chia cả hai vế cho $-2$ (là số âm nên phải đổi chiều bất phương trình), ta được $x \\le 2$. Vậy tập nghiệm là các số nhỏ hơn hoặc bằng 2.',
      difficulty: 'thong_hieu',
      question_type: 'trac_nghiem',
      options: JSON.stringify([
        'Các số lớn hơn hoặc bằng $2$', 
        'Các số nhỏ hơn hoặc bằng $2$', 
        'Các số lớn hơn $2$', 
        'Các số nhỏ hơn $2$'
      ]),
      correct_answer: 'Các số nhỏ hơn hoặc bằng $2$',
      status: 'approved',
      grade: 9
    },
    {
      question_code: 'T9-C2B6-NEW-004',
      content: 'Số nguyên lớn nhất thỏa mãn bất phương trình $\\frac{2x - 1}{3} > x + 1$ là:',
      answer: '$-5$',
      solution: 'Nhân cả hai vế với số dương $3$ ta được: $2x - 1 > 3(x + 1) \\Leftrightarrow 2x - 1 > 3x + 3 \\Leftrightarrow -1 - 3 > 3x - 2x \\Leftrightarrow -4 > x \\Leftrightarrow x < -4$. Số nguyên lớn nhất mà nhỏ hơn $-4$ là số $-5$.',
      difficulty: 'van_dung',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['$-3$', '$-4$', '$-5$', '$-6$']),
      correct_answer: '$-5$',
      status: 'approved',
      grade: 9
    },
    {
      question_code: 'T9-C2B6-NEW-005',
      content: 'Tìm $m$ để bất phương trình $(m-1)x > 2$ vô nghiệm.',
      answer: '$m = 1$',
      solution: 'Bất phương trình có dạng $ax > b$. Nếu $a \\neq 0$ thì luôn có nghiệm. Bất phương trình vô nghiệm khi và chỉ khi $a = 0$ và mệnh đề $0 \\cdot x > b$ là sai. Áp dụng vào bài toán, ta cần $m-1 = 0 \\Rightarrow m=1$. Khi đó bất phương trình thành $0x > 2 \\Leftrightarrow 0 > 2$ (vô lý với mọi $x$). Vậy $m=1$ làm cho bất phương trình vô nghiệm.',
      difficulty: 'van_dung',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['$m = 1$', '$m = -1$', '$m > 1$', '$m < 1$']),
      correct_answer: '$m = 1$',
      status: 'approved',
      grade: 9
    }
  ];

  console.log(`Bắt đầu bơm ${questions.length} câu hỏi mới vào Database...`);
  
  for (const q of questions) {
    const existing = await sql`SELECT id FROM public.questions WHERE question_code = ${q.question_code}`;
    
    if (existing.length === 0) {
      await sql`
        INSERT INTO public.questions (
          category_id, question_code, content, answer, solution, 
          difficulty, question_type, options, correct_answer, status, grade, topic, user_id
        ) VALUES (
          ${categoryId}, ${q.question_code}, ${q.content}, ${q.answer}, ${q.solution},
          ${q.difficulty}, ${q.question_type}, ${q.options}::jsonb, ${q.correct_answer}, ${q.status}, ${q.grade}, ${topicName}, ${defaultUserId}
        )
      `;
      console.log(`Đã chèn thành công: ${q.question_code}`);
    } else {
      console.log(`Bỏ qua (đã tồn tại): ${q.question_code}`);
    }
    
    await new Promise(r => setTimeout(r, 2000));
  }
  
  console.log('✅ Hoàn thành Block: LỚP 9 - CHƯƠNG II - BÀI 6.');
}

insertGrade9Ch2B6().catch(console.error);
