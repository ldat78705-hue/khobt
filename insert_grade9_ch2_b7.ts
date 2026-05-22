import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);

async function insertGrade9Ch2B7() {
  console.log('Khởi tạo kết nối CSDL...');
  
  const categoryId = 'f348c2b2-8830-4e88-a0db-4ddea391ca84'; // Bài tập cuối chương II.
  const topicName = 'Bài tập cuối chương II.';

  // Fetch an existing user_id to use
  const users = await sql`SELECT user_id FROM public.questions WHERE user_id IS NOT NULL LIMIT 1`;
  const defaultUserId = users.length > 0 ? users[0].user_id : '00000000-0000-0000-0000-000000000000';

  const questions = [
    {
      question_code: 'T9-C2B7-NEW-001',
      content: 'Điều kiện xác định của phương trình $\\frac{2x}{x-3} = \\frac{x+1}{x}$ là:',
      answer: '$x \\neq 3$ và $x \\neq 0$',
      solution: 'Các mẫu thức của phương trình là $x-3$ và $x$. Để phương trình có nghĩa, tất cả các mẫu thức đều phải khác 0. Suy ra $x-3 \\neq 0 \\Leftrightarrow x \\neq 3$ và $x \\neq 0$.',
      difficulty: 'nhan_biet',
      question_type: 'trac_nghiem',
      options: JSON.stringify([
        '$x \\neq 3$', 
        '$x \\neq 0$', 
        '$x \\neq 3$ và $x \\neq 0$', 
        '$x > 3$'
      ]),
      correct_answer: '$x \\neq 3$ và $x \\neq 0$',
      status: 'approved',
      grade: 9
    },
    {
      question_code: 'T9-C2B7-NEW-002',
      content: 'Tập nghiệm của bất phương trình $5 - 2x \\ge 0$ biểu diễn trên trục số là:',
      answer: '$(-\\infty; \\frac{5}{2}]$',
      solution: 'Ta có: $5 - 2x \\ge 0 \\Leftrightarrow -2x \\ge -5$. Chia cả hai vế cho $-2$ và đổi chiều bất phương trình ta được $x \\le \\frac{5}{2}$. Vậy tập nghiệm là nửa khoảng $(-\\infty; \\frac{5}{2}]$.',
      difficulty: 'thong_hieu',
      question_type: 'trac_nghiem',
      options: JSON.stringify([
        '$(-\\infty; \\frac{5}{2}]$', 
        '$[\\frac{5}{2}; +\\infty)$', 
        '$(-\\infty; \\frac{2}{5}]$', 
        '$[\\frac{2}{5}; +\\infty)$'
      ]),
      correct_answer: '$(-\\infty; \\frac{5}{2}]$',
      status: 'approved',
      grade: 9
    },
    {
      question_code: 'T9-C2B7-NEW-003',
      content: 'Phương trình $\\frac{x}{x-2} - \\frac{2}{x} = \\frac{4}{x(x-2)}$ có bao nhiêu nghiệm?',
      answer: '$0$',
      solution: 'ĐKXĐ: $x \\neq 0, x \\neq 2$. Quy đồng mẫu thức và khử mẫu ta được: $x \\cdot x - 2(x - 2) = 4 \\Leftrightarrow x^2 - 2x + 4 = 4 \\Leftrightarrow x^2 - 2x = 0 \\Leftrightarrow x(x - 2) = 0$. Suy ra $x = 0$ (loại do không thỏa mãn ĐKXĐ) hoặc $x = 2$ (loại do không thỏa mãn ĐKXĐ). Vậy phương trình đã cho vô nghiệm (có 0 nghiệm).',
      difficulty: 'van_dung',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['$0$', '$1$', '$2$', '$3$']),
      correct_answer: '$0$',
      status: 'approved',
      grade: 9
    },
    {
      question_code: 'T9-C2B7-NEW-004',
      content: 'Tìm số nguyên $x$ lớn nhất thỏa mãn bất phương trình $\\frac{x-2}{2} - \\frac{x+1}{3} < 1$.',
      answer: '$13$',
      solution: 'Nhân cả hai vế với $6$ (BCNN của 2 và 3, là số dương), ta được: $3(x - 2) - 2(x + 1) < 6 \\Leftrightarrow 3x - 6 - 2x - 2 < 6 \\Leftrightarrow x - 8 < 6 \\Leftrightarrow x < 14$. Số nguyên $x$ lớn nhất thỏa mãn $x < 14$ là $x = 13$.',
      difficulty: 'van_dung',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['$12$', '$13$', '$14$', '$15$']),
      correct_answer: '$13$',
      status: 'approved',
      grade: 9
    },
    {
      question_code: 'T9-C2B7-NEW-005',
      content: 'Gọi $S$ là tập hợp tất cả các nghiệm phân biệt của phương trình $(x^2 - 4)(x^2 - 2x - 3) = 0$. Tổng các phần tử của $S$ bằng:',
      answer: '$2$',
      solution: 'Phương trình tích tương đương với $x^2 - 4 = 0$ hoặc $x^2 - 2x - 3 = 0$. \nTừ phương trình đầu ta có $x = 2$ hoặc $x = -2$. \nTừ phương trình thứ hai, phân tích thành nhân tử $(x+1)(x-3) = 0 \\Rightarrow x = -1$ hoặc $x = 3$. \nTập nghiệm của phương trình là $S = \\{-2; -1; 2; 3\\}$. Tổng các phần tử là: $(-2) + (-1) + 2 + 3 = 2$.',
      difficulty: 'van_dung',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['$1$', '$2$', '$3$', '$4$']),
      correct_answer: '$2$',
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
  
  console.log('✅ Hoàn thành Block cuối: LỚP 9 - CHƯƠNG II - BÀI TẬP CUỐI CHƯƠNG II.');
}

insertGrade9Ch2B7().catch(console.error);
