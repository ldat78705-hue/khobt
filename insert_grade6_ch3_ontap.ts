import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);

async function insertGrade6Ch3OnTap() {
  console.log('Khởi tạo kết nối CSDL...');
  
  const categories = await sql`
    SELECT id, name 
    FROM public.categories 
    WHERE name ILIKE '%Ôn tập chương III%'
    AND grade = 6
    LIMIT 1
  `;
  
  if (categories.length === 0) {
    console.error('Không tìm thấy danh mục Ôn tập chương III.');
    return;
  }
  
  const categoryId = categories[0].id;
  console.log(`Đã tìm thấy ID Danh mục (${categories[0].name}): ${categoryId}`);

  const users = await sql`SELECT user_id FROM public.questions WHERE user_id IS NOT NULL LIMIT 1`;
  const defaultUserId = users.length > 0 ? users[0].user_id : '00000000-0000-0000-0000-000000000000';

  const questions = [
    {
      question_code: 'T6-C3OT-NEW-001',
      content: 'Tổng của hai số nguyên âm luôn là một:',
      answer: 'Số nguyên âm',
      solution: 'Tổng của hai số nguyên âm luôn là một số nguyên âm. Ví dụ: $(-2) + (-3) = -5$.',
      difficulty: 'nhan_biet',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['Số tự nhiên', 'Số nguyên dương', 'Số nguyên âm', 'Số không']),
      correct_answer: 'Số nguyên âm',
      status: 'approved',
      grade: 6
    },
    {
      question_code: 'T6-C3OT-NEW-002',
      content: 'Kết quả của phép tính $(-5) \\times (-8)$ là:',
      answer: '$40$',
      solution: 'Tích của hai số nguyên cùng dấu luôn là một số nguyên dương. Ta có $(-5) \\times (-8) = 5 \\times 8 = 40$.',
      difficulty: 'thong_hieu',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['$40$', '$-40$', '$13$', '$-13$']),
      correct_answer: '$40$',
      status: 'approved',
      grade: 6
    },
    {
      question_code: 'T6-C3OT-NEW-003',
      content: 'Số đối của số $-(-15)$ là:',
      answer: '$-15$',
      solution: 'Ta có $-(-15) = 15$. Số đối của $15$ là $-15$.',
      difficulty: 'thong_hieu',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['$15$', '$-15$', '$0$', 'Không có số đối']),
      correct_answer: '$-15$',
      status: 'approved',
      grade: 6
    },
    {
      question_code: 'T6-C3OT-NEW-004',
      content: 'Tích của một số nguyên âm và một số nguyên dương là một:',
      answer: 'Số nguyên âm',
      solution: 'Tích của hai số nguyên khác dấu luôn là một số nguyên âm.',
      difficulty: 'nhan_biet',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['Số tự nhiên', 'Số nguyên dương', 'Số nguyên âm', 'Số $0$']),
      correct_answer: 'Số nguyên âm',
      status: 'approved',
      grade: 6
    },
    {
      question_code: 'T6-C3OT-NEW-005',
      content: 'Tính hợp lý biểu thức $125 \\times (-24) + 24 \\times 225$ ta được kết quả là:',
      answer: '$2400$',
      solution: 'Ta có: $125 \\times (-24) + 24 \\times 225 = - (125 \\times 24) + 24 \\times 225 = 24 \\times (225 - 125) = 24 \\times 100 = 2400$.',
      difficulty: 'van_dung',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['$-2400$', '$2400$', '$8400$', '$-8400$']),
      correct_answer: '$2400$',
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
  
  console.log('✅ Hoàn thành: LỚP 6 - Ôn tập chương III');
}

insertGrade6Ch3OnTap().catch(console.error);
