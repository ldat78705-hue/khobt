import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);

async function insertGrade6Ch4B19() {
  console.log('Khởi tạo kết nối CSDL...');
  
  const categories = await sql`
    SELECT id, name 
    FROM public.categories 
    WHERE name ILIKE '%Bài 19. Hình chữ nhật. Hình thoi. Hình bình hành. Hình thang cân%'
    AND grade = 6
    LIMIT 1
  `;
  
  if (categories.length === 0) {
    console.error('Không tìm thấy danh mục Bài 19.');
    return;
  }
  
  const categoryId = categories[0].id;
  console.log(`Đã tìm thấy ID Danh mục (${categories[0].name}): ${categoryId}`);

  const users = await sql`SELECT user_id FROM public.questions WHERE user_id IS NOT NULL LIMIT 1`;
  const defaultUserId = users.length > 0 ? users[0].user_id : '00000000-0000-0000-0000-000000000000';

  const questions = [
    {
      question_code: 'T6-C4B19-NEW-001',
      content: 'Hình chữ nhật là tứ giác có:',
      answer: '4 góc vuông',
      solution: 'Hình chữ nhật là tứ giác có 4 góc vuông (mỗi góc bằng $90^\\circ$).',
      difficulty: 'nhan_biet',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['4 cạnh bằng nhau', '4 góc vuông', '2 đường chéo vuông góc', 'Các cạnh đối không song song']),
      correct_answer: '4 góc vuông',
      status: 'approved',
      grade: 6
    },
    {
      question_code: 'T6-C4B19-NEW-002',
      content: 'Đặc điểm nào sau đây là của hình thoi?',
      answer: 'Bốn cạnh bằng nhau',
      solution: 'Hình thoi là tứ giác có bốn cạnh bằng nhau.',
      difficulty: 'nhan_biet',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['Bốn góc bằng nhau', 'Bốn cạnh bằng nhau', 'Hai đường chéo bằng nhau', 'Có một góc vuông']),
      correct_answer: 'Bốn cạnh bằng nhau',
      status: 'approved',
      grade: 6
    },
    {
      question_code: 'T6-C4B19-NEW-003',
      content: 'Trong hình bình hành, các cạnh đối có tính chất gì?',
      answer: 'Song song và bằng nhau',
      solution: 'Trong hình bình hành, các cạnh đối vừa song song vừa bằng nhau.',
      difficulty: 'thong_hieu',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['Vuông góc với nhau', 'Cắt nhau', 'Chỉ song song', 'Song song và bằng nhau']),
      correct_answer: 'Song song và bằng nhau',
      status: 'approved',
      grade: 6
    },
    {
      question_code: 'T6-C4B19-NEW-004',
      content: 'Hai đường chéo của hình thoi có đặc điểm gì?',
      answer: 'Vuông góc với nhau và cắt nhau tại trung điểm của mỗi đường',
      solution: 'Trong hình thoi, hai đường chéo vuông góc với nhau và cắt nhau tại trung điểm của mỗi đường.',
      difficulty: 'thong_hieu',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['Bằng nhau', 'Vuông góc với nhau và cắt nhau tại trung điểm của mỗi đường', 'Chỉ cắt nhau tại trung điểm', 'Song song với nhau']),
      correct_answer: 'Vuông góc với nhau và cắt nhau tại trung điểm của mỗi đường',
      status: 'approved',
      grade: 6
    },
    {
      question_code: 'T6-C4B19-NEW-005',
      content: 'Hình thang cân có tính chất nào sau đây?',
      answer: 'Hai góc kề một đáy bằng nhau',
      solution: 'Hình thang cân là hình thang có hai góc kề một đáy bằng nhau. Hai đường chéo của hình thang cân cũng bằng nhau.',
      difficulty: 'van_dung',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['Hai đường chéo vuông góc', 'Hai góc kề một cạnh bên bằng nhau', 'Hai góc kề một đáy bằng nhau', 'Bốn cạnh bằng nhau']),
      correct_answer: 'Hai góc kề một đáy bằng nhau',
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
  
  console.log('✅ Hoàn thành: LỚP 6 - Bài 19');
}

insertGrade6Ch4B19().catch(console.error);
