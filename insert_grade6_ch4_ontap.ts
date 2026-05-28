import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);

async function insertGrade6Ch4OnTap() {
  console.log('Khởi tạo kết nối CSDL...');
  
  const categories = await sql`
    SELECT id, name 
    FROM public.categories 
    WHERE name ILIKE '%Ôn tập chương IV%'
    AND grade = 6
    LIMIT 1
  `;
  
  if (categories.length === 0) {
    console.error('Không tìm thấy danh mục Ôn tập chương IV.');
    return;
  }
  
  const categoryId = categories[0].id;
  console.log(`Đã tìm thấy ID Danh mục (${categories[0].name}): ${categoryId}`);

  const users = await sql`SELECT user_id FROM public.questions WHERE user_id IS NOT NULL LIMIT 1`;
  const defaultUserId = users.length > 0 ? users[0].user_id : '00000000-0000-0000-0000-000000000000';

  const questions = [
    {
      question_code: 'T6-C4OT-NEW-001',
      content: 'Hình bình hành có bao nhiêu cặp cạnh đối song song?',
      answer: '$2$ cặp',
      solution: 'Hình bình hành là tứ giác có $2$ cặp cạnh đối song song.',
      difficulty: 'nhan_biet',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['$1$ cặp', '$2$ cặp', '$3$ cặp', '$4$ cặp']),
      correct_answer: '$2$ cặp',
      status: 'approved',
      grade: 6
    },
    {
      question_code: 'T6-C4OT-NEW-002',
      content: 'Trong hình lục giác đều, ba đường chéo chính có đặc điểm gì?',
      answer: 'Bằng nhau và cắt nhau tại một điểm',
      solution: 'Hình lục giác đều có 3 đường chéo chính bằng nhau và chúng cắt nhau tại một điểm chung.',
      difficulty: 'thong_hieu',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['Không bằng nhau', 'Bằng nhau và cắt nhau tại một điểm', 'Chỉ cắt nhau tại trung điểm của 2 đường', 'Song song với nhau']),
      correct_answer: 'Bằng nhau và cắt nhau tại một điểm',
      status: 'approved',
      grade: 6
    },
    {
      question_code: 'T6-C4OT-NEW-003',
      content: 'Một mảnh vườn hình chữ nhật có chiều dài $15$m, chiều rộng $10$m. Diện tích của mảnh vườn là:',
      answer: '$150\\text{ m}^2$',
      solution: 'Diện tích hình chữ nhật bằng tích chiều dài và chiều rộng: $15 \\times 10 = 150$ (m$^2$).',
      difficulty: 'van_dung',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['$25\\text{ m}^2$', '$50\\text{ m}^2$', '$150\\text{ m}^2$', '$300\\text{ m}^2$']),
      correct_answer: '$150\\text{ m}^2$',
      status: 'approved',
      grade: 6
    },
    {
      question_code: 'T6-C4OT-NEW-004',
      content: 'Đặc điểm nào sau đây là ĐÚNG với hình thoi?',
      answer: 'Hai đường chéo vuông góc với nhau',
      solution: 'Hình thoi có hai đường chéo vuông góc với nhau và cắt nhau tại trung điểm mỗi đường.',
      difficulty: 'thong_hieu',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['Hai đường chéo bằng nhau', 'Bốn góc vuông', 'Hai đường chéo vuông góc với nhau', 'Chỉ có 2 cạnh bằng nhau']),
      correct_answer: 'Hai đường chéo vuông góc với nhau',
      status: 'approved',
      grade: 6
    },
    {
      question_code: 'T6-C4OT-NEW-005',
      content: 'Hình tam giác đều có bao nhiêu cạnh bằng nhau?',
      answer: '$3$',
      solution: 'Hình tam giác đều là tam giác có 3 cạnh bằng nhau và 3 góc bằng nhau.',
      difficulty: 'nhan_biet',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['$2$', '$3$', '$4$', 'Không có cạnh nào bằng nhau']),
      correct_answer: '$3$',
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
  
  console.log('✅ Hoàn thành: LỚP 6 - Ôn tập chương IV');
}

insertGrade6Ch4OnTap().catch(console.error);
