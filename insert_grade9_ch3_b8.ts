import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);

async function insertGrade9Ch3B8() {
  console.log('Khởi tạo kết nối CSDL...');
  
  const categoryId = '4dd3889a-0416-44a1-8d35-3e18e4a8ab58'; // Bài 8. Khai căn bậc hai với phép nhân và phép chia.
  const topicName = 'Bài 8. Khai căn bậc hai với phép nhân và phép chia.';

  // Fetch an existing user_id to use
  const users = await sql`SELECT user_id FROM public.questions WHERE user_id IS NOT NULL LIMIT 1`;
  const defaultUserId = users.length > 0 ? users[0].user_id : '00000000-0000-0000-0000-000000000000';

  const questions = [
    {
      question_code: 'T9-C3B8-NEW-001',
      content: 'Khẳng định nào sau đây là đúng với $A \\ge 0, B \\ge 0$?',
      answer: '$\\sqrt{A \\cdot B} = \\sqrt{A} \\cdot \\sqrt{B}$',
      solution: 'Theo quy tắc khai phương một tích, với hai số hoặc biểu thức không âm $A$ và $B$, ta luôn có $\\sqrt{A \\cdot B} = \\sqrt{A} \\cdot \\sqrt{B}$. Các quy tắc phân tách phép cộng như $\\sqrt{A+B} = \\sqrt{A}+\\sqrt{B}$ là hoàn toàn sai lệch.',
      difficulty: 'nhan_biet',
      question_type: 'trac_nghiem',
      options: JSON.stringify([
        '$\\sqrt{A \\cdot B} = \\sqrt{A} + \\sqrt{B}$', 
        '$\\sqrt{A \\cdot B} = \\sqrt{A} \\cdot \\sqrt{B}$', 
        '$\\sqrt{A + B} = \\sqrt{A} + \\sqrt{B}$', 
        'Cả A, B, C đều đúng'
      ]),
      correct_answer: '$\\sqrt{A \\cdot B} = \\sqrt{A} \\cdot \\sqrt{B}$',
      status: 'approved',
      grade: 9
    },
    {
      question_code: 'T9-C3B8-NEW-002',
      content: 'Giá trị của biểu thức $\\sqrt{16 \\cdot 25}$ là:',
      answer: '20',
      solution: 'Áp dụng quy tắc khai phương một tích: $\\sqrt{16 \\cdot 25} = \\sqrt{16} \\cdot \\sqrt{25} = 4 \\cdot 5 = 20$. (Cũng có thể tính trực tiếp $\\sqrt{400} = 20$).',
      difficulty: 'thong_hieu',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['20', '9', '41', '400']),
      correct_answer: '20',
      status: 'approved',
      grade: 9
    },
    {
      question_code: 'T9-C3B8-NEW-003',
      content: 'Rút gọn biểu thức $\\frac{\\sqrt{108}}{\\sqrt{3}}$ ta được kết quả là:',
      answer: '$6$',
      solution: 'Áp dụng quy tắc chia hai căn thức bậc hai (của hai số dương): $\\frac{\\sqrt{108}}{\\sqrt{3}} = \\sqrt{\\frac{108}{3}} = \\sqrt{36} = 6$.',
      difficulty: 'thong_hieu',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['$6$', '$36$', '$\\sqrt{105}$', '$105$']),
      correct_answer: '$6$',
      status: 'approved',
      grade: 9
    },
    {
      question_code: 'T9-C3B8-NEW-004',
      content: 'Rút gọn biểu thức $M = \\sqrt{3a^3} \\cdot \\sqrt{12a}$ với $a \\ge 0$.',
      answer: '$6a^2$',
      solution: 'Áp dụng quy tắc nhân các căn thức (vì $a \\ge 0$ nên các biểu thức dưới dấu căn đều không âm): $M = \\sqrt{3a^3 \\cdot 12a} = \\sqrt{36a^4}$. Vì $a^2 \\ge 0$ với mọi $a$, nên khai phương ta được $M = \\sqrt{36} \\cdot \\sqrt{(a^2)^2} = 6 \\cdot |a^2| = 6a^2$.',
      difficulty: 'van_dung',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['$36a^2$', '$6a^2$', '$6a$', '$36a$']),
      correct_answer: '$6a^2$',
      status: 'approved',
      grade: 9
    },
    {
      question_code: 'T9-C3B8-NEW-005',
      content: 'Tìm $x$ thỏa mãn $\\sqrt{9(x - 1)} = 21$.',
      answer: '$x = 50$',
      solution: 'Điều kiện: $x \\ge 1$. Ta có: $\\sqrt{9(x - 1)} = 21 \\Leftrightarrow \\sqrt{9} \\cdot \\sqrt{x - 1} = 21 \\Leftrightarrow 3\\sqrt{x - 1} = 21 \\Leftrightarrow \\sqrt{x - 1} = 7$. Bình phương hai vế (vì hai vế đều không âm) ta được: $x - 1 = 49 \\Leftrightarrow x = 50$ (thỏa mãn điều kiện).',
      difficulty: 'van_dung',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['$x = 8$', '$x = 48$', '$x = 50$', '$x = 5$']),
      correct_answer: '$x = 50$',
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
  
  console.log('✅ Hoàn thành Block: LỚP 9 - CHƯƠNG III - BÀI 8.');
}

insertGrade9Ch3B8().catch(console.error);
