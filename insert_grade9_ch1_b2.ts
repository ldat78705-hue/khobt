import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);

async function insertGrade9Ch1B2() {
  console.log('Khởi tạo kết nối CSDL...');
  
  const categoryId = '9d3d76bd-e202-47f2-bd44-fd27e81059b7'; // Bài 2. Giải hệ hai phương trình bậc nhất hai ẩn.
  const topicName = 'Bài 2. Giải hệ hai phương trình bậc nhất hai ẩn.';

  // Fetch an existing user_id to use
  const users = await sql`SELECT user_id FROM public.questions WHERE user_id IS NOT NULL LIMIT 1`;
  const defaultUserId = users.length > 0 ? users[0].user_id : '00000000-0000-0000-0000-000000000000';

  const questions = [
    {
      question_code: 'T9-C1B2-NEW-001',
      content: 'Phương pháp thế là phương pháp biểu diễn một ẩn theo ẩn kia từ một phương trình của hệ và thế vào phương trình còn lại. Khẳng định trên đúng hay sai?',
      answer: 'Đúng',
      solution: 'Phương pháp thế là một trong các phương pháp giải hệ phương trình bằng cách biểu diễn một ẩn theo ẩn kia từ một phương trình của hệ, sau đó thế vào phương trình còn lại để thu được phương trình một ẩn. Khẳng định trên là đúng.',
      difficulty: 'nhan_biet',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['Đúng', 'Sai', 'Không thể xác định', 'Cả A, B, C đều sai']),
      correct_answer: 'Đúng',
      status: 'approved',
      grade: 9
    },
    {
      question_code: 'T9-C1B2-NEW-002',
      content: 'Nghiệm của hệ phương trình $\\begin{cases} x - y = 1 \\\\ 2x + y = 5 \\end{cases}$ là:',
      answer: '$(2; 1)$',
      solution: 'Từ phương trình đầu tiên ta có $x = y + 1$. Thế vào phương trình thứ hai ta được $2(y + 1) + y = 5 \\Leftrightarrow 3y + 2 = 5 \\Leftrightarrow 3y = 3 \\Leftrightarrow y = 1$. Thay $y = 1$ vào $x = y + 1$ ta được $x = 1 + 1 = 2$. Vậy nghiệm của hệ là $(2; 1)$.',
      difficulty: 'thong_hieu',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['$(1; 0)$', '$(2; 1)$', '$(3; -1)$', '$(0; -1)$']),
      correct_answer: '$(2; 1)$',
      status: 'approved',
      grade: 9
    },
    {
      question_code: 'T9-C1B2-NEW-003',
      content: 'Hệ phương trình $\\begin{cases} x + 2y = 4 \\\\ -x + y = 2 \\end{cases}$ có nghiệm $(x; y)$ là:',
      answer: '$(0; 2)$',
      solution: 'Cộng hai phương trình vế theo vế ta được: $(x - x) + (2y + y) = 4 + 2 \\Leftrightarrow 3y = 6 \\Leftrightarrow y = 2$. Thay $y = 2$ vào phương trình $x + 2y = 4$ ta được $x + 2(2) = 4 \\Leftrightarrow x = 0$. Vậy hệ có nghiệm là $(0; 2)$.',
      difficulty: 'thong_hieu',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['$(0; 2)$', '$(2; 0)$', '$(1; 1)$', '$(2; -2)$']),
      correct_answer: '$(0; 2)$',
      status: 'approved',
      grade: 9
    },
    {
      question_code: 'T9-C1B2-NEW-004',
      content: 'Gọi $(x; y)$ là nghiệm của hệ phương trình $\\begin{cases} 3x - 2y = 4 \\\\ 2x + y = 5 \\end{cases}$. Tính giá trị của biểu thức $P = x^2 + y^2$.',
      answer: '$P = 5$',
      solution: 'Từ phương trình thứ hai ta có $y = 5 - 2x$. Thế vào phương trình thứ nhất ta được: $3x - 2(5 - 2x) = 4 \\Leftrightarrow 3x - 10 + 4x = 4 \\Leftrightarrow 7x = 14 \\Leftrightarrow x = 2$. Thay $x = 2$ vào $y = 5 - 2x$ ta được $y = 5 - 2(2) = 1$. Nghiệm của hệ là $(2; 1)$. Giá trị của biểu thức $P = x^2 + y^2 = 2^2 + 1^2 = 4 + 1 = 5$.',
      difficulty: 'van_dung',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['$P = 1$', '$P = 5$', '$P = 13$', '$P = 25$']),
      correct_answer: '$P = 5$',
      status: 'approved',
      grade: 9
    },
    {
      question_code: 'T9-C1B2-NEW-005',
      content: 'Xác định tọa độ giao điểm của hai đường thẳng $d_1: y = 2x - 3$ và $d_2: y = -x + 6$.',
      answer: '$(3; 3)$',
      solution: 'Tọa độ giao điểm của hai đường thẳng là nghiệm của hệ phương trình $\\begin{cases} y = 2x - 3 \\\\ y = -x + 6 \\end{cases}$. Từ đó ta có phương trình hoành độ giao điểm: $2x - 3 = -x + 6 \\Leftrightarrow 3x = 9 \\Leftrightarrow x = 3$. Thay $x = 3$ vào $y = -x + 6$ ta được $y = -3 + 6 = 3$. Vậy tọa độ giao điểm là $(3; 3)$.',
      difficulty: 'van_dung',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['$(3; 3)$', '$(3; -3)$', '$(-3; 3)$', '$(-3; -3)$']),
      correct_answer: '$(3; 3)$',
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
  
  console.log('✅ Hoàn thành Block 2: LỚP 9 - CHƯƠNG I - BÀI 2.');
}

insertGrade9Ch1B2().catch(console.error);
