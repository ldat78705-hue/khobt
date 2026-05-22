import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);

async function insertGrade9Ch3B7() {
  console.log('Khởi tạo kết nối CSDL...');
  
  const categoryId = 'd6b4f323-757f-4a92-8720-38ca2f4deba8'; // Bài 7. Căn bậc hai và căn thức bậc hai.
  const topicName = 'Bài 7. Căn bậc hai và căn thức bậc hai.';

  // Fetch an existing user_id to use
  const users = await sql`SELECT user_id FROM public.questions WHERE user_id IS NOT NULL LIMIT 1`;
  const defaultUserId = users.length > 0 ? users[0].user_id : '00000000-0000-0000-0000-000000000000';

  const questions = [
    {
      question_code: 'T9-C3B7-NEW-001',
      content: 'Căn bậc hai số học của 16 là:',
      answer: '4',
      solution: 'Căn bậc hai số học của một số không âm $a$ là số không âm $x$ sao cho $x^2 = a$. Vì $4 \\ge 0$ và $4^2 = 16$ nên căn bậc hai số học của 16 là 4. Ký hiệu là $\\sqrt{16} = 4$. Chú ý phân biệt với "căn bậc hai" có cả hai giá trị $\\pm 4$.',
      difficulty: 'nhan_biet',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['4', '-4', '$\\pm 4$', '256']),
      correct_answer: '4',
      status: 'approved',
      grade: 9
    },
    {
      question_code: 'T9-C3B7-NEW-002',
      content: 'Điều kiện xác định của biểu thức $\\sqrt{2x - 4}$ là:',
      answer: '$x \\ge 2$',
      solution: 'Biểu thức $\\sqrt{A}$ xác định (có nghĩa) khi và chỉ khi biểu thức dưới dấu căn không âm, tức là $A \\ge 0$. Do đó ta cần $2x - 4 \\ge 0 \\Leftrightarrow 2x \\ge 4 \\Leftrightarrow x \\ge 2$.',
      difficulty: 'thong_hieu',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['$x > 2$', '$x \\ge 2$', '$x < 2$', '$x \\le 2$']),
      correct_answer: '$x \\ge 2$',
      status: 'approved',
      grade: 9
    },
    {
      question_code: 'T9-C3B7-NEW-003',
      content: 'Tính giá trị của biểu thức $P = \\sqrt{(-5)^2}$.',
      answer: '5',
      solution: 'Theo hằng đẳng thức $\\sqrt{A^2} = |A|$, ta có $\\sqrt{(-5)^2} = |-5| = 5$. Tuyệt đối không nhầm lẫn bằng $-5$.',
      difficulty: 'thong_hieu',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['-5', '5', '$\\pm 5$', '25']),
      correct_answer: '5',
      status: 'approved',
      grade: 9
    },
    {
      question_code: 'T9-C3B7-NEW-004',
      content: 'Rút gọn biểu thức $A = \\sqrt{(2 - \\sqrt{5})^2} - \\sqrt{5}$.',
      answer: '-2',
      solution: 'Ta có $\\sqrt{(2 - \\sqrt{5})^2} = |2 - \\sqrt{5}|$. Vì $2 = \\sqrt{4} < \\sqrt{5}$ nên $2 - \\sqrt{5} < 0$, dẫn đến $|2 - \\sqrt{5}| = \\sqrt{5} - 2$. Thay vào biểu thức ta được $A = (\\sqrt{5} - 2) - \\sqrt{5} = -2$.',
      difficulty: 'van_dung',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['2', '$2\\sqrt{5} - 2$', '-2', '$2\\sqrt{5}$']),
      correct_answer: '-2',
      status: 'approved',
      grade: 9
    },
    {
      question_code: 'T9-C3B7-NEW-005',
      content: 'Tìm $x$ biết $\\sqrt{4x^2 - 12x + 9} = 5$.',
      answer: '$x = 4$ hoặc $x = -1$',
      solution: 'Ta biến đổi biểu thức dưới dấu căn thành hằng đẳng thức: $4x^2 - 12x + 9 = (2x - 3)^2$. Phương trình trở thành $\\sqrt{(2x - 3)^2} = 5 \\Leftrightarrow |2x - 3| = 5$.\n- Trường hợp 1: $2x - 3 = 5 \\Leftrightarrow 2x = 8 \\Leftrightarrow x = 4$.\n- Trường hợp 2: $2x - 3 = -5 \\Leftrightarrow 2x = -2 \\Leftrightarrow x = -1$.\nVậy nghiệm của phương trình là $x = 4$ hoặc $x = -1$.',
      difficulty: 'van_dung',
      question_type: 'trac_nghiem',
      options: JSON.stringify([
        '$x = 4$', 
        '$x = 4$ hoặc $x = -1$', 
        '$x = -1$', 
        '$x = 4$ hoặc $x = 1$'
      ]),
      correct_answer: '$x = 4$ hoặc $x = -1$',
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
  
  console.log('✅ Hoàn thành Block: LỚP 9 - CHƯƠNG III - BÀI 7.');
}

insertGrade9Ch3B7().catch(console.error);
