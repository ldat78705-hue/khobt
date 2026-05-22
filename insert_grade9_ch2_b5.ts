import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);

async function insertGrade9Ch2B5() {
  console.log('Khởi tạo kết nối CSDL...');
  
  const categoryId = '5f573415-dec3-40a8-a24a-7268c223b7f1'; // Bài 5. Bất đẳng thức và tính chất.
  const topicName = 'Bài 5. Bất đẳng thức và tính chất.';

  // Fetch an existing user_id to use
  const users = await sql`SELECT user_id FROM public.questions WHERE user_id IS NOT NULL LIMIT 1`;
  const defaultUserId = users.length > 0 ? users[0].user_id : '00000000-0000-0000-0000-000000000000';

  const questions = [
    {
      question_code: 'T9-C2B5-NEW-001',
      content: 'Khẳng định nào sau đây là đúng về tính chất của bất đẳng thức?',
      answer: 'Nếu $a > b$ và $c > 0$ thì $ac > bc$',
      solution: 'Theo tính chất cơ bản của bất đẳng thức, khi nhân hai vế của một bất đẳng thức với cùng một số dương thì ta được một bất đẳng thức mới cùng chiều với bất đẳng thức đã cho. Do đó, nếu $a > b$ và $c > 0$ thì $ac > bc$. Các phương án còn lại đều sai.',
      difficulty: 'nhan_biet',
      question_type: 'trac_nghiem',
      options: JSON.stringify([
        'Nếu $a > b$ thì $a + c < b + c$', 
        'Nếu $a > b$ thì $a - c < b - c$', 
        'Nếu $a > b$ và $c > 0$ thì $ac > bc$', 
        'Nếu $a > b$ và $c > 0$ thì $ac < bc$'
      ]),
      correct_answer: 'Nếu $a > b$ và $c > 0$ thì $ac > bc$',
      status: 'approved',
      grade: 9
    },
    {
      question_code: 'T9-C2B5-NEW-002',
      content: 'Cho $x > y$. Bất đẳng thức nào sau đây luôn đúng?',
      answer: '$2x + 1 > 2y + 1$',
      solution: 'Nhân cả hai vế của $x > y$ với số dương $2$, ta được $2x > 2y$. Cộng cả hai vế với $1$, ta được bất đẳng thức cùng chiều: $2x + 1 > 2y + 1$. Các phương án còn lại đều bị sai chiều.',
      difficulty: 'thong_hieu',
      question_type: 'trac_nghiem',
      options: JSON.stringify([
        '$2x + 1 > 2y + 1$', 
        '$-x > -y$', 
        '$x - 3 < y - 3$', 
        '$-2x + 5 > -2y + 5$'
      ]),
      correct_answer: '$2x + 1 > 2y + 1$',
      status: 'approved',
      grade: 9
    },
    {
      question_code: 'T9-C2B5-NEW-003',
      content: 'Cho $a < b$. Khẳng định nào sau đây sai?',
      answer: '$-4a < -4b$',
      solution: 'Nhân cả hai vế của bất đẳng thức $a < b$ với số âm $-4$, theo tính chất ta phải đổi chiều bất đẳng thức thành $-4a > -4b$. Do đó, khẳng định $-4a < -4b$ là sai.',
      difficulty: 'thong_hieu',
      question_type: 'trac_nghiem',
      options: JSON.stringify([
        '$a - 2 < b - 2$', 
        '$3a < 3b$', 
        '$-4a < -4b$', 
        '$5 - a > 5 - b$'
      ]),
      correct_answer: '$-4a < -4b$',
      status: 'approved',
      grade: 9
    },
    {
      question_code: 'T9-C2B5-NEW-004',
      content: 'Cho $a < b$. Hãy so sánh $2a - 3$ và $2b - 1$.',
      answer: '$2a - 3 < 2b - 1$',
      solution: 'Từ giả thiết $a < b$, nhân hai vế với số dương $2$ ta được $2a < 2b$. Trừ cả hai vế cho $3$, ta có $2a - 3 < 2b - 3$. Mặt khác, hiển nhiên ta có $-3 < -1$ nên $2b - 3 < 2b - 1$. Theo tính chất bắc cầu, ta suy ra $2a - 3 < 2b - 1$.',
      difficulty: 'van_dung',
      question_type: 'trac_nghiem',
      options: JSON.stringify([
        '$2a - 3 < 2b - 1$', 
        '$2a - 3 > 2b - 1$', 
        '$2a - 3 = 2b - 1$', 
        'Không thể so sánh'
      ]),
      correct_answer: '$2a - 3 < 2b - 1$',
      status: 'approved',
      grade: 9
    },
    {
      question_code: 'T9-C2B5-NEW-005',
      content: 'Biết rằng với mọi số thực $x$, ta luôn có $x^2 - 4x + 5 > 0$. Dựa vào biến đổi hằng đẳng thức, giá trị nhỏ nhất của $x^2 - 4x + 5$ là bao nhiêu?',
      answer: '$1$',
      solution: 'Ta biến đổi biểu thức về dạng hằng đẳng thức: $x^2 - 4x + 5 = x^2 - 4x + 4 + 1 = (x - 2)^2 + 1$. Vì bình phương của một số luôn không âm nên $(x - 2)^2 \\ge 0$ với mọi $x$. Suy ra $(x - 2)^2 + 1 \\ge 1 > 0$. Dấu "=" xảy ra khi $x = 2$. Vậy giá trị nhỏ nhất của biểu thức là $1$.',
      difficulty: 'van_dung',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['$0$', '$1$', '$4$', '$5$']),
      correct_answer: '$1$',
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
  
  console.log('✅ Hoàn thành Block: LỚP 9 - CHƯƠNG II - BÀI 5.');
}

insertGrade9Ch2B5().catch(console.error);
