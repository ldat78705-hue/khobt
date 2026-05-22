import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);

async function insertGrade9Ch2B4() {
  console.log('Khởi tạo kết nối CSDL...');
  
  const categoryId = '35b77b38-8330-4862-9583-9fc30aff47d5'; // Bài 4. Phương trình quy về phương trình bậc nhất một ẩn.
  const topicName = 'Bài 4. Phương trình quy về phương trình bậc nhất một ẩn.';

  // Fetch an existing user_id to use
  const users = await sql`SELECT user_id FROM public.questions WHERE user_id IS NOT NULL LIMIT 1`;
  const defaultUserId = users.length > 0 ? users[0].user_id : '00000000-0000-0000-0000-000000000000';

  const questions = [
    {
      question_code: 'T9-C2B4-NEW-001',
      content: 'Phương trình nào sau đây là phương trình tích?',
      answer: '$(x-1)(2x+3) = 0$',
      solution: 'Phương trình tích có dạng $A(x) \\cdot B(x) = 0$. Trong các phương án, phương trình $(x-1)(2x+3) = 0$ có dạng tích của hai đa thức bậc nhất nên nó là phương trình tích.',
      difficulty: 'nhan_biet',
      question_type: 'trac_nghiem',
      options: JSON.stringify([
        '$(x-1)(2x+3) = 0$', 
        '$x^2 + 2x + 1 = 0$', 
        '$\\frac{x}{x-1} = 2$', 
        '$2x + 3 = 0$'
      ]),
      correct_answer: '$(x-1)(2x+3) = 0$',
      status: 'approved',
      grade: 9
    },
    {
      question_code: 'T9-C2B4-NEW-002',
      content: 'Nghiệm của phương trình $(x-3)(2x+1) = 0$ là:',
      answer: '$x = 3$ và $x = -\\frac{1}{2}$',
      solution: '$(x-3)(2x+1) = 0 \\Leftrightarrow x-3=0$ hoặc $2x+1=0$. Suy ra $x=3$ hoặc $x=-\\frac{1}{2}$. Vậy phương trình có nghiệm là $x=3$ và $x=-\\frac{1}{2}$.',
      difficulty: 'thong_hieu',
      question_type: 'trac_nghiem',
      options: JSON.stringify([
        '$x = 3$ và $x = \\frac{1}{2}$', 
        '$x = -3$ và $x = -\\frac{1}{2}$', 
        '$x = 3$ và $x = -\\frac{1}{2}$', 
        '$x = -3$ và $x = \\frac{1}{2}$'
      ]),
      correct_answer: '$x = 3$ và $x = -\\frac{1}{2}$',
      status: 'approved',
      grade: 9
    },
    {
      question_code: 'T9-C2B4-NEW-003',
      content: 'Điều kiện xác định (ĐKXĐ) của phương trình $\\frac{x}{x-2} + \\frac{1}{x+2} = \\frac{4}{x^2-4}$ là:',
      answer: '$x \\neq 2$ và $x \\neq -2$',
      solution: 'Các mẫu thức của phương trình là $x-2$, $x+2$ và $x^2-4=(x-2)(x+2)$. Điều kiện xác định là các mẫu thức đều phải khác 0, tức là $x-2 \\neq 0$ và $x+2 \\neq 0$. Suy ra $x \\neq 2$ và $x \\neq -2$.',
      difficulty: 'thong_hieu',
      question_type: 'trac_nghiem',
      options: JSON.stringify([
        '$x \\neq 2$', 
        '$x \\neq -2$', 
        '$x \\neq 2$ và $x \\neq -2$', 
        '$x \\neq 4$'
      ]),
      correct_answer: '$x \\neq 2$ và $x \\neq -2$',
      status: 'approved',
      grade: 9
    },
    {
      question_code: 'T9-C2B4-NEW-004',
      content: 'Phương trình $\\frac{x+2}{x-2} - \\frac{1}{x} = \\frac{2}{x(x-2)}$ có nghiệm là:',
      answer: '$x = -1$',
      solution: 'ĐKXĐ: $x \\neq 0, x \\neq 2$. Quy đồng và khử mẫu ta được: $x(x+2) - (x-2) = 2 \\Leftrightarrow x^2 + 2x - x + 2 = 2 \\Leftrightarrow x^2 + x = 0 \\Leftrightarrow x(x+1) = 0$. Suy ra $x = 0$ (loại vì không thỏa mãn ĐKXĐ) hoặc $x = -1$ (thỏa mãn). Vậy phương trình có nghiệm duy nhất $x = -1$.',
      difficulty: 'van_dung',
      question_type: 'trac_nghiem',
      options: JSON.stringify([
        '$x = -1$', 
        '$x = 1$', 
        '$x = 0$', 
        '$x = 2$'
      ]),
      correct_answer: '$x = -1$',
      status: 'approved',
      grade: 9
    },
    {
      question_code: 'T9-C2B4-NEW-005',
      content: 'Tìm tập nghiệm của phương trình $x^3 - 3x^2 + 2x = 0$.',
      answer: '$S = \\{0; 1; 2\\}$',
      solution: 'Phân tích đa thức vế trái thành nhân tử: $x(x^2 - 3x + 2) = 0 \\Leftrightarrow x(x-1)(x-2) = 0$. Phương trình tích có các nghiệm: $x = 0$; $x - 1 = 0 \\Rightarrow x = 1$; $x - 2 = 0 \\Rightarrow x = 2$. Vậy tập nghiệm của phương trình là $S = \\{0; 1; 2\\}$.',
      difficulty: 'van_dung',
      question_type: 'trac_nghiem',
      options: JSON.stringify([
        '$S = \\{0; 1; 2\\}$', 
        '$S = \\{1; 2\\}$', 
        '$S = \\{0; -1; -2\\}$', 
        '$S = \\{-1; -2\\}$'
      ]),
      correct_answer: '$S = \\{0; 1; 2\\}$',
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
  
  console.log('✅ Hoàn thành Block: LỚP 9 - CHƯƠNG II - BÀI 4.');
}

insertGrade9Ch2B4().catch(console.error);
