import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);

async function insertGrade9Ch3B11() {
  console.log('Khởi tạo kết nối CSDL...');
  
  const categoryId = '9794852a-e151-48ec-b15f-282297f05ea5'; // Bài tập cuối chương III.
  const topicName = 'Bài tập cuối chương III.';

  // Fetch an existing user_id to use
  const users = await sql`SELECT user_id FROM public.questions WHERE user_id IS NOT NULL LIMIT 1`;
  const defaultUserId = users.length > 0 ? users[0].user_id : '00000000-0000-0000-0000-000000000000';

  const questions = [
    {
      question_code: 'T9-C3B11-NEW-001',
      content: 'Điều kiện xác định của biểu thức $\\sqrt{\\frac{-5}{2x - 1}}$ là:',
      answer: '$x < \\frac{1}{2}$',
      solution: 'Biểu thức dưới dấu căn cần thỏa mãn $\\frac{-5}{2x - 1} \\ge 0$. Vì tử số $-5 < 0$ nên để phân thức không âm thì mẫu số phải nhỏ hơn 0 (mẫu số không được bằng 0). Do đó $2x - 1 < 0 \\Leftrightarrow 2x < 1 \\Leftrightarrow x < \\frac{1}{2}$.',
      difficulty: 'nhan_biet',
      question_type: 'trac_nghiem',
      options: JSON.stringify([
        '$x > \\frac{1}{2}$', 
        '$x < \\frac{1}{2}$', 
        '$x \\ge \\frac{1}{2}$', 
        '$x \\le \\frac{1}{2}$'
      ]),
      correct_answer: '$x < \\frac{1}{2}$',
      status: 'approved',
      grade: 9
    },
    {
      question_code: 'T9-C3B11-NEW-002',
      content: 'Rút gọn biểu thức $A = \\sqrt{4 + 2\\sqrt{3}} - \\sqrt{3}$ ta được:',
      answer: '1',
      solution: 'Ta biến đổi biểu thức dưới dấu căn lớn thành hằng đẳng thức: $4 + 2\\sqrt{3} = 3 + 2\\sqrt{3} \\cdot 1 + 1 = (\\sqrt{3} + 1)^2$. Khi đó $\\sqrt{4 + 2\\sqrt{3}} = \\sqrt{(\\sqrt{3} + 1)^2} = |\\sqrt{3} + 1| = \\sqrt{3} + 1$. Thay vào $A$ ta được: $A = (\\sqrt{3} + 1) - \\sqrt{3} = 1$.',
      difficulty: 'thong_hieu',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['1', '2', '$\\sqrt{3} + 1$', '$2\\sqrt{3}$']),
      correct_answer: '1',
      status: 'approved',
      grade: 9
    },
    {
      question_code: 'T9-C3B11-NEW-003',
      content: 'Giá trị của biểu thức $B = (\\sqrt{12} - 2\\sqrt{27} + \\sqrt{3})\\sqrt{3}$ là:',
      answer: '-9',
      solution: 'Ta đưa các thừa số ra ngoài dấu căn ở phần trong ngoặc trước:\n- $\\sqrt{12} = \\sqrt{4 \\cdot 3} = 2\\sqrt{3}$\n- $2\\sqrt{27} = 2\\sqrt{9 \\cdot 3} = 2 \\cdot 3\\sqrt{3} = 6\\sqrt{3}$\nKhi đó $B = (2\\sqrt{3} - 6\\sqrt{3} + \\sqrt{3})\\sqrt{3} = (-3\\sqrt{3})\\sqrt{3} = -3 \\cdot (\\sqrt{3})^2 = -3 \\cdot 3 = -9$.',
      difficulty: 'thong_hieu',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['-9', '9', '12', '-12']),
      correct_answer: '-9',
      status: 'approved',
      grade: 9
    },
    {
      question_code: 'T9-C3B11-NEW-004',
      content: 'Cho biểu thức $P = \\left( \\frac{1}{\\sqrt{x} - 1} - \\frac{1}{\\sqrt{x}} \\right) : \\frac{1}{\\sqrt{x} - x}$ với $x > 0, x \\neq 1$. Giá trị của $P$ là:',
      answer: '$P = -1$',
      solution: 'Xét phần trong ngoặc đầu tiên, quy đồng ta được: $\\frac{1}{\\sqrt{x} - 1} - \\frac{1}{\\sqrt{x}} = \\frac{\\sqrt{x} - (\\sqrt{x} - 1)}{\\sqrt{x}(\\sqrt{x} - 1)} = \\frac{1}{\\sqrt{x}(\\sqrt{x} - 1)}$. \nMặt khác, phân thức thứ hai được biến đổi thành: $\\frac{1}{\\sqrt{x} - x} = \\frac{1}{\\sqrt{x}(1 - \\sqrt{x})} = \\frac{-1}{\\sqrt{x}(\\sqrt{x} - 1)}$.\nThực hiện phép chia: $P = \\frac{1}{\\sqrt{x}(\\sqrt{x} - 1)} : \\frac{-1}{\\sqrt{x}(\\sqrt{x} - 1)} = -1$.',
      difficulty: 'van_dung',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['$P = 1$', '$P = -1$', '$P = x$', '$P = \\sqrt{x}$']),
      correct_answer: '$P = -1$',
      status: 'approved',
      grade: 9
    },
    {
      question_code: 'T9-C3B11-NEW-005',
      content: 'Tìm $x$ thỏa mãn phương trình $\\sqrt{x^2 - 4x + 4} + \\sqrt{x^2 - 6x + 9} = 1$.',
      answer: '$2 \\le x \\le 3$',
      solution: 'Biến đổi phương trình thành: $\\sqrt{(x - 2)^2} + \\sqrt{(x - 3)^2} = 1 \\Leftrightarrow |x - 2| + |x - 3| = 1$.\nTa có bất đẳng thức về giá trị tuyệt đối: $|a| + |b| \\ge |a + b|$. Áp dụng vào bài toán, ta coi $|x - 3| = |3 - x|$, suy ra $|x - 2| + |3 - x| \\ge |(x - 2) + (3 - x)| = |1| = 1$.\nDấu "=" xảy ra khi và chỉ khi hai số cùng dấu, tức là $(x - 2)(3 - x) \\ge 0 \\Leftrightarrow 2 \\le x \\le 3$. \nVậy phương trình có vô số nghiệm là mọi số thực thỏa mãn $2 \\le x \\le 3$.',
      difficulty: 'van_dung',
      question_type: 'trac_nghiem',
      options: JSON.stringify([
        '$2 \\le x \\le 3$', 
        '$x = 2$ hoặc $x = 3$', 
        '$x \\le 2$ hoặc $x \\ge 3$', 
        'Vô nghiệm'
      ]),
      correct_answer: '$2 \\le x \\le 3$',
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
  
  console.log('✅ Hoàn thành Block cuối cùng: LỚP 9 - CHƯƠNG III - BÀI TẬP CUỐI CHƯƠNG III.');
}

insertGrade9Ch3B11().catch(console.error);
