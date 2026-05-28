import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);

async function insertGrade6Ch5B21() {
  console.log('Khởi tạo kết nối CSDL...');
  
  const categories = await sql`
    SELECT id, name 
    FROM public.categories 
    WHERE name ILIKE '%Bài 21. Hình có trục đối xứng%'
    AND grade = 6
    LIMIT 1
  `;
  
  if (categories.length === 0) {
    console.error('Không tìm thấy danh mục Bài 21.');
    return;
  }
  
  const categoryId = categories[0].id;
  console.log(`Đã tìm thấy ID Danh mục (${categories[0].name}): ${categoryId}`);

  const users = await sql`SELECT user_id FROM public.questions WHERE user_id IS NOT NULL LIMIT 1`;
  const defaultUserId = users.length > 0 ? users[0].user_id : '00000000-0000-0000-0000-000000000000';

  const questions = [
    {
      question_code: 'T6-C5B21-NEW-001',
      content: 'Đường thẳng $d$ được gọi là trục đối xứng của hình $H$ nếu:',
      answer: 'Hình $H$ gấp theo đường thẳng $d$ thì hai phần của hình chồng khít lên nhau',
      solution: 'Nếu có một đường thẳng $d$ chia hình $H$ thành hai phần mà khi gấp hình theo đường thẳng $d$ thì hai phần đó chồng khít lên nhau, thì đường thẳng $d$ gọi là trục đối xứng của hình $H$.',
      difficulty: 'nhan_biet',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['Hình $H$ gấp theo đường thẳng $d$ thì hai phần của hình chồng khít lên nhau', 'Đường thẳng $d$ chia hình $H$ thành hai phần có diện tích bằng nhau', 'Đường thẳng $d$ đi qua trọng tâm của hình $H$', 'Đường thẳng $d$ chia hình $H$ thành hai phần bằng nhau bất kì']),
      correct_answer: 'Hình $H$ gấp theo đường thẳng $d$ thì hai phần của hình chồng khít lên nhau',
      status: 'approved',
      grade: 6
    },
    {
      question_code: 'T6-C5B21-NEW-002',
      content: 'Hình chữ nhật có bao nhiêu trục đối xứng?',
      answer: '$2$ trục',
      solution: 'Hình chữ nhật có 2 trục đối xứng, đó là hai đường thẳng đi qua trung điểm của các cặp cạnh đối diện.',
      difficulty: 'nhan_biet',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['$1$ trục', '$2$ trục', '$3$ trục', '$4$ trục']),
      correct_answer: '$2$ trục',
      status: 'approved',
      grade: 6
    },
    {
      question_code: 'T6-C5B21-NEW-003',
      content: 'Trong các hình sau, hình nào KHÔNG có trục đối xứng?',
      answer: 'Hình bình hành',
      solution: 'Hình bình hành không có trục đối xứng (trừ trường hợp nó là hình chữ nhật hoặc hình thoi).',
      difficulty: 'thong_hieu',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['Hình chữ nhật', 'Hình thoi', 'Hình thang cân', 'Hình bình hành']),
      correct_answer: 'Hình bình hành',
      status: 'approved',
      grade: 6
    },
    {
      question_code: 'T6-C5B21-NEW-004',
      content: 'Hình tam giác đều có bao nhiêu trục đối xứng?',
      answer: '$3$ trục',
      solution: 'Hình tam giác đều có 3 trục đối xứng là 3 đường cao (đồng thời là trung tuyến, phân giác, trung trực) của tam giác đó.',
      difficulty: 'thong_hieu',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['$1$ trục', '$2$ trục', '$3$ trục', 'Không có trục đối xứng']),
      correct_answer: '$3$ trục',
      status: 'approved',
      grade: 6
    },
    {
      question_code: 'T6-C5B21-NEW-005',
      content: 'Chữ cái in hoa nào sau đây có trục đối xứng?',
      answer: 'Chữ A',
      solution: 'Chữ A in hoa có 1 trục đối xứng dọc ở chính giữa. Các chữ cái N, S, P không có trục đối xứng.',
      difficulty: 'van_dung',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['Chữ N', 'Chữ S', 'Chữ P', 'Chữ A']),
      correct_answer: 'Chữ A',
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
  
  console.log('✅ Hoàn thành: LỚP 6 - Bài 21');
}

insertGrade6Ch5B21().catch(console.error);
