import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);

async function insertGrade9Ch1B1() {
  console.log('Khởi tạo kết nối CSDL...');
  
  // Get Category ID for Grade 9, Chapter 1, Lesson 1
  const categories = await sql`
    SELECT id, name 
    FROM public.categories 
    WHERE name ILIKE '%Khái niệm phương trình và hệ hai phương trình bậc nhất hai ẩn%'
    AND grade = 9
    LIMIT 1
  `;
  
  if (categories.length === 0) {
    console.error('Không tìm thấy danh mục Bài 1.');
    return;
  }
  
  const categoryId = categories[0].id;
  console.log(`Đã tìm thấy ID Danh mục (${categories[0].name}): ${categoryId}`);

  // Fetch an existing user_id to use
  const users = await sql`SELECT user_id FROM public.questions WHERE user_id IS NOT NULL LIMIT 1`;
  const defaultUserId = users.length > 0 ? users[0].user_id : '00000000-0000-0000-0000-000000000000';

  const questions = [
    {
      question_code: 'T9-C1B1-NEW-001',
      content: 'Trong các phương trình sau, phương trình nào là phương trình bậc nhất hai ẩn?',
      answer: '$2x + 3y = 5$',
      solution: 'Phương trình bậc nhất hai ẩn $x, y$ có dạng tổng quát là $ax + by = c$ trong đó $a, b$ không đồng thời bằng 0. Đối chiếu các phương án, chỉ có $2x + 3y = 5$ thỏa mãn điều kiện này.',
      difficulty: 'nhan_biet',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['$2x + 3y = 5$', '$x^2 + y = 2$', '$2x + y^2 = 1$', '$x^2 + y^2 = 4$']),
      correct_answer: '$2x + 3y = 5$',
      status: 'approved',
      grade: 9
    },
    {
      question_code: 'T9-C1B1-NEW-002',
      content: 'Cặp số nào sau đây là nghiệm của phương trình $x - 2y = 4$?',
      answer: '$(4; 0)$',
      solution: 'Ta thay lần lượt các tọa độ vào phương trình $x - 2y = 4$:\\n- Thay $(0; 2)$: $0 - 2(2) = -4 \\neq 4$\\n- Thay $(4; 0)$: $4 - 2(0) = 4$ (thỏa mãn).\\nVậy $(4; 0)$ là nghiệm của phương trình.',
      difficulty: 'nhan_biet',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['$(0; 2)$', '$(2; -1)$', '$(4; 0)$', '$(1; 1)$']),
      correct_answer: '$(4; 0)$',
      status: 'approved',
      grade: 9
    },
    {
      question_code: 'T9-C1B1-NEW-003',
      content: 'Hệ phương trình nào sau đây là hệ hai phương trình bậc nhất hai ẩn?',
      answer: '$\\begin{cases} 2x - 3y = 1 \\\\ x + 4y = 5 \\end{cases}$',
      solution: 'Hệ hai phương trình bậc nhất hai ẩn gồm hai phương trình, trong đó mỗi phương trình đều là phương trình bậc nhất hai ẩn dạng $ax + by = c$. Các phương án khác chứa $x^2, y^2, xy$ hoặc $\\frac{1}{x}$ không phải là bậc nhất. Chỉ có phương án chứa $\\begin{cases} 2x - 3y = 1 \\\\ x + 4y = 5 \\end{cases}$ là đúng.',
      difficulty: 'thong_hieu',
      question_type: 'trac_nghiem',
      options: JSON.stringify([
        '$\\begin{cases} x + y = 3 \\\\ x^2 - y = 1 \\end{cases}$',
        '$\\begin{cases} 2x - 3y = 1 \\\\ x + 4y = 5 \\end{cases}$',
        '$\\begin{cases} x + y = 2 \\\\ xy = 1 \\end{cases}$',
        '$\\begin{cases} \\frac{1}{x} + y = 2 \\\\ x - y = 1 \\end{cases}$'
      ]),
      correct_answer: '$\\begin{cases} 2x - 3y = 1 \\\\ x + 4y = 5 \\end{cases}$',
      status: 'approved',
      grade: 9
    },
    {
      question_code: 'T9-C1B1-NEW-004',
      content: 'Cho hệ phương trình $\\begin{cases} x + y = 5 \\\\ 2x - y = 1 \\end{cases}$. Cặp số $(2; 3)$ có phải là nghiệm của hệ không?',
      answer: 'Có',
      solution: 'Thay $x = 2, y = 3$ vào từng phương trình của hệ:\\n- Phương trình 1: $2 + 3 = 5$ (đúng)\\n- Phương trình 2: $2(2) - 3 = 4 - 3 = 1$ (đúng)\\nVì cặp số thỏa mãn cả hai phương trình nên $(2; 3)$ chính là nghiệm của hệ.',
      difficulty: 'thong_hieu',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['Có', 'Không', 'Không thể xác định', 'Cả 3 phương án đều sai']),
      correct_answer: 'Có',
      status: 'approved',
      grade: 9
    },
    {
      question_code: 'T9-C1B1-NEW-005',
      content: 'Tìm $m$ để cặp số $(1; -2)$ là nghiệm của phương trình $mx - 3y = 8$.',
      answer: '$m = 2$',
      solution: 'Để cặp số $(1; -2)$ là nghiệm của phương trình, ta thay $x = 1$ và $y = -2$ vào phương trình:\\n$m(1) - 3(-2) = 8 \\Leftrightarrow m + 6 = 8 \\Leftrightarrow m = 2$.\\nVậy $m = 2$ là giá trị cần tìm.',
      difficulty: 'van_dung',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['$m = 2$', '$m = -2$', '$m = 14$', '$m = -14$']),
      correct_answer: '$m = 2$',
      status: 'approved',
      grade: 9
    }
  ];

  console.log(`Bắt đầu bơm ${questions.length} câu hỏi mới vào Database...`);
  
  for (const q of questions) {
    // Check if question code already exists to avoid duplicates during retries
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
    
    // Yêu cầu sleep 2s theo chỉ thị
    await new Promise(r => setTimeout(r, 2000));
  }
  
  console.log('✅ Hoàn thành Block 1: LỚP 9 - CHƯƠNG I - BÀI 1.');
}

insertGrade9Ch1B1().catch(console.error);
