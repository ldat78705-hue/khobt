import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);

async function insertGrade6Ch3B17() {
  console.log('Khởi tạo kết nối CSDL...');
  
  const categories = await sql`
    SELECT id, name 
    FROM public.categories 
    WHERE name ILIKE '%Bài 17. Phép chia hết. Ước và bội của một số nguyên%'
    AND grade = 6
    LIMIT 1
  `;
  
  if (categories.length === 0) {
    console.error('Không tìm thấy danh mục Bài 17.');
    return;
  }
  
  const categoryId = categories[0].id;
  console.log(`Đã tìm thấy ID Danh mục (${categories[0].name}): ${categoryId}`);

  const users = await sql`SELECT user_id FROM public.questions WHERE user_id IS NOT NULL LIMIT 1`;
  const defaultUserId = users.length > 0 ? users[0].user_id : '00000000-0000-0000-0000-000000000000';

  const questions = [
    {
      question_code: 'T6-C3B17-NEW-001',
      content: 'Trong tập hợp các số nguyên, số $a$ chia hết cho số $b$ (với $b \\neq 0$) khi nào?',
      answer: 'Có số nguyên $q$ sao cho $a = b.q$',
      solution: 'Cho $a, b \\in \\mathbb{Z}$ với $b \\neq 0$. Nếu có số nguyên $q$ sao cho $a = b.q$ thì ta nói $a$ chia hết cho $b$.',
      difficulty: 'nhan_biet',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['Có số nguyên $q$ sao cho $a = b + q$', 'Có số tự nhiên $q$ sao cho $a = b.q$', 'Có số nguyên $q$ sao cho $a = b.q$', 'Có số nguyên $q$ sao cho $b = a.q$']),
      correct_answer: 'Có số nguyên $q$ sao cho $a = b.q$',
      status: 'approved',
      grade: 6
    },
    {
      question_code: 'T6-C3B17-NEW-002',
      content: 'Trong các số sau, số nào là ước của $-12$?',
      answer: '$4$',
      solution: 'Ước của $-12$ là các số nguyên mà $-12$ chia hết cho số đó. Ta thấy $-12$ chia hết cho $4$ (vì $-12 = 4 \\times (-3)$). Các số $5, 7, 8$ không phải là ước của $-12$.',
      difficulty: 'nhan_biet',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['$5$', '$7$', '$4$', '$8$']),
      correct_answer: '$4$',
      status: 'approved',
      grade: 6
    },
    {
      question_code: 'T6-C3B17-NEW-003',
      content: 'Tập hợp tất cả các ước nguyên của $4$ là:',
      answer: '$\\{-4; -2; -1; 1; 2; 4\\}$',
      solution: 'Các ước tự nhiên của $4$ là $1, 2, 4$. Do đó, các ước nguyên của $4$ là $1, -1, 2, -2, 4, -4$.',
      difficulty: 'thong_hieu',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['$\\{1; 2; 4\\}$', '$\\{-4; -2; -1; 1; 2; 4\\}$', '$\\{-4; -2; 0; 2; 4\\}$', '$\\{-4; -1; 1; 4\\}$']),
      correct_answer: '$\\{-4; -2; -1; 1; 2; 4\\}$',
      status: 'approved',
      grade: 6
    },
    {
      question_code: 'T6-C3B17-NEW-004',
      content: 'Biết $x$ là một bội của $5$ và $-12 < x < 0$. Giá trị của $x$ có thể là những số nào sau đây?',
      answer: '$-5, -10$',
      solution: 'Các bội của 5 là: $..., -15, -10, -5, 0, 5, 10, ...$. Vì $-12 < x < 0$ nên $x \\in \\{-10; -5\\}$.',
      difficulty: 'thong_hieu',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['$-5, -10$', '$-5$', '$-10, -15$', '$-5, -10, -15$']),
      correct_answer: '$-5, -10$',
      status: 'approved',
      grade: 6
    },
    {
      question_code: 'T6-C3B17-NEW-005',
      content: 'Tìm tất cả các số nguyên $x$ thỏa mãn $(x + 2)$ là ước của $5$.',
      answer: '$x \\in \\{-7; -3; -1; 3\\}$',
      solution: 'Các ước của 5 là $1, -1, 5, -5$. Ta có các trường hợp:\\n$x + 2 = 1 \\Rightarrow x = -1$\\n$x + 2 = -1 \\Rightarrow x = -3$\\n$x + 2 = 5 \\Rightarrow x = 3$\\n$x + 2 = -5 \\Rightarrow x = -7$\\nVậy $x \\in \\{-7; -3; -1; 3\\}$.',
      difficulty: 'van_dung',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['$x \\in \\{-3; -1; 3; 7\\}$', '$x \\in \\{-7; -3; -1; 3\\}$', '$x \\in \\{-1; 3\\}$', '$x \\in \\{-5; 5\\}$']),
      correct_answer: '$x \\in \\{-7; -3; -1; 3\\}$',
      status: 'approved',
      grade: 6
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
          ${q.difficulty}, ${q.question_type}, ${q.options}::jsonb, ${q.correct_answer}, ${q.status}, ${q.grade}, ${categories[0].name}, ${defaultUserId}
        )
      `;
      console.log(`Đã chèn thành công: ${q.question_code}`);
    } else {
      console.log(`Bỏ qua (đã tồn tại): ${q.question_code}`);
    }
    
    await new Promise(r => setTimeout(r, 1000));
  }
  
  console.log('✅ Hoàn thành: LỚP 6 - Bài 17');
}

insertGrade6Ch3B17().catch(console.error);
