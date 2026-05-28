import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);

async function insertGrade6Ch4B18() {
  console.log('Khởi tạo kết nối CSDL...');
  
  const categories = await sql`
    SELECT id, name 
    FROM public.categories 
    WHERE name ILIKE '%Bài 18. Hình tam giác đều. Hình vuông. Hình lục giác đều%'
    AND grade = 6
    LIMIT 1
  `;
  
  if (categories.length === 0) {
    console.error('Không tìm thấy danh mục Bài 18.');
    return;
  }
  
  const categoryId = categories[0].id;
  console.log(`Đã tìm thấy ID Danh mục (${categories[0].name}): ${categoryId}`);

  const users = await sql`SELECT user_id FROM public.questions WHERE user_id IS NOT NULL LIMIT 1`;
  const defaultUserId = users.length > 0 ? users[0].user_id : '00000000-0000-0000-0000-000000000000';

  const questions = [
    {
      question_code: 'T6-C4B18-NEW-001',
      content: 'Đặc điểm nào sau đây KHÔNG phải là của hình vuông?',
      answer: 'Bốn góc không bằng nhau',
      solution: 'Hình vuông có 4 cạnh bằng nhau, 4 góc bằng nhau và bằng $90^\\circ$, 2 đường chéo bằng nhau. Do đó phát biểu "Bốn góc không bằng nhau" là sai.',
      difficulty: 'nhan_biet',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['Bốn cạnh bằng nhau', 'Bốn góc bằng nhau', 'Bốn góc không bằng nhau', 'Hai đường chéo bằng nhau']),
      correct_answer: 'Bốn góc không bằng nhau',
      status: 'approved',
      grade: 6
    },
    {
      question_code: 'T6-C4B18-NEW-002',
      content: 'Hình lục giác đều có bao nhiêu đường chéo chính?',
      answer: '$3$',
      solution: 'Hình lục giác đều có 3 đường chéo chính cắt nhau tại một điểm.',
      difficulty: 'nhan_biet',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['$2$', '$3$', '$4$', '$6$']),
      correct_answer: '$3$',
      status: 'approved',
      grade: 6
    },
    {
      question_code: 'T6-C4B18-NEW-003',
      content: 'Chọn phát biểu ĐÚNG về hình tam giác đều:',
      answer: 'Ba cạnh bằng nhau và ba góc bằng nhau',
      solution: 'Hình tam giác đều là hình có 3 cạnh bằng nhau và 3 góc bằng nhau (mỗi góc bằng $60^\\circ$).',
      difficulty: 'thong_hieu',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['Ba cạnh bằng nhau và ba góc không bằng nhau', 'Ba cạnh không bằng nhau và ba góc bằng nhau', 'Ba cạnh bằng nhau và ba góc bằng nhau', 'Chỉ có hai cạnh bằng nhau']),
      correct_answer: 'Ba cạnh bằng nhau và ba góc bằng nhau',
      status: 'approved',
      grade: 6
    },
    {
      question_code: 'T6-C4B18-NEW-004',
      content: 'Trong hình vuông, hai đường chéo có đặc điểm gì?',
      answer: 'Bằng nhau',
      solution: 'Trong hình vuông, hai đường chéo bằng nhau, cắt nhau tại trung điểm của mỗi đường và vuông góc với nhau.',
      difficulty: 'thong_hieu',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['Bằng nhau', 'Không bằng nhau', 'Chỉ cắt nhau chứ không bằng nhau', 'Song song với nhau']),
      correct_answer: 'Bằng nhau',
      status: 'approved',
      grade: 6
    },
    {
      question_code: 'T6-C4B18-NEW-005',
      content: 'Ghép 6 hình tam giác đều có cạnh bằng nhau sao cho mỗi đỉnh của một tam giác đều chung một điểm, ta được hình gì?',
      answer: 'Hình lục giác đều',
      solution: 'Khi ghép 6 hình tam giác đều bằng nhau quanh một đỉnh chung, ta được một hình lục giác đều.',
      difficulty: 'van_dung',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['Hình vuông', 'Hình chữ nhật', 'Hình lục giác đều', 'Hình thoi']),
      correct_answer: 'Hình lục giác đều',
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
  
  console.log('✅ Hoàn thành: LỚP 6 - Bài 18');
}

insertGrade6Ch4B18().catch(console.error);
