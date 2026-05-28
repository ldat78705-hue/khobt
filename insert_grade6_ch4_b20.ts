import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);

async function insertGrade6Ch4B20() {
  console.log('Khởi tạo kết nối CSDL...');
  
  const categories = await sql`
    SELECT id, name 
    FROM public.categories 
    WHERE name ILIKE '%Bài 20. Chu vi và diện tích của một số tứ giác đã học%'
    AND grade = 6
    LIMIT 1
  `;
  
  if (categories.length === 0) {
    console.error('Không tìm thấy danh mục Bài 20.');
    return;
  }
  
  const categoryId = categories[0].id;
  console.log(`Đã tìm thấy ID Danh mục (${categories[0].name}): ${categoryId}`);

  const users = await sql`SELECT user_id FROM public.questions WHERE user_id IS NOT NULL LIMIT 1`;
  const defaultUserId = users.length > 0 ? users[0].user_id : '00000000-0000-0000-0000-000000000000';

  const questions = [
    {
      question_code: 'T6-C4B20-NEW-001',
      content: 'Công thức tính diện tích hình chữ nhật có hai cạnh là $a$ và $b$ là:',
      answer: '$S = a \\times b$',
      solution: 'Diện tích hình chữ nhật bằng tích hai kích thước (chiều dài và chiều rộng) cùng đơn vị đo: $S = a \\times b$.',
      difficulty: 'nhan_biet',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['$S = a + b$', '$S = a \\times b$', '$S = (a + b) \\times 2$', '$S = a^2 + b^2$']),
      correct_answer: '$S = a \\times b$',
      status: 'approved',
      grade: 6
    },
    {
      question_code: 'T6-C4B20-NEW-002',
      content: 'Công thức tính chu vi hình vuông có cạnh là $a$ là:',
      answer: '$C = 4 \\times a$',
      solution: 'Chu vi hình vuông bằng 4 lần độ dài một cạnh: $C = 4 \\times a$.',
      difficulty: 'nhan_biet',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['$C = a \\times a$', '$C = a + 4$', '$C = 4 \\times a$', '$C = 2 \\times a$']),
      correct_answer: '$C = 4 \\times a$',
      status: 'approved',
      grade: 6
    },
    {
      question_code: 'T6-C4B20-NEW-003',
      content: 'Công thức tính diện tích hình thoi có độ dài hai đường chéo là $m$ và $n$ là:',
      answer: '$S = \\frac{m \\times n}{2}$',
      solution: 'Diện tích hình thoi bằng nửa tích độ dài hai đường chéo: $S = \\frac{m \\times n}{2}$.',
      difficulty: 'thong_hieu',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['$S = m \\times n$', '$S = \\frac{m + n}{2}$', '$S = \\frac{m \\times n}{2}$', '$S = 2 \\times (m + n)$']),
      correct_answer: '$S = \\frac{m \\times n}{2}$',
      status: 'approved',
      grade: 6
    },
    {
      question_code: 'T6-C4B20-NEW-004',
      content: 'Chu vi hình chữ nhật có chiều dài $a = 5$ cm và chiều rộng $b = 3$ cm là:',
      answer: '$16$ cm',
      solution: 'Chu vi hình chữ nhật là $C = 2 \\times (a + b) = 2 \\times (5 + 3) = 2 \\times 8 = 16$ (cm).',
      difficulty: 'thong_hieu',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['$15$ cm', '$8$ cm', '$16$ cm', '$30$ cm']),
      correct_answer: '$16$ cm',
      status: 'approved',
      grade: 6
    },
    {
      question_code: 'T6-C4B20-NEW-005',
      content: 'Một hình thoi có độ dài hai đường chéo lần lượt là $6$ cm và $8$ cm. Diện tích của hình thoi đó là:',
      answer: '$24\\text{ cm}^2$',
      solution: 'Diện tích hình thoi là $S = \\frac{6 \\times 8}{2} = \\frac{48}{2} = 24$ (cm$^2$).',
      difficulty: 'van_dung',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['$48\\text{ cm}^2$', '$24\\text{ cm}^2$', '$14\\text{ cm}^2$', '$28\\text{ cm}^2$']),
      correct_answer: '$24\\text{ cm}^2$',
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
  
  console.log('✅ Hoàn thành: LỚP 6 - Bài 20');
}

insertGrade6Ch4B20().catch(console.error);
