import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);

async function insertGrade9Ch3B9() {
  console.log('Khởi tạo kết nối CSDL...');
  
  const categoryId = '7c1c49ae-9cb0-4fe0-92fb-c18b6fa815f7'; // Bài 9. Biến đổi đơn giản và rút gọn biểu thức chứa căn thức bậc hai.
  const topicName = 'Bài 9. Biến đổi đơn giản và rút gọn biểu thức chứa căn thức bậc hai.';

  // Fetch an existing user_id to use
  const users = await sql`SELECT user_id FROM public.questions WHERE user_id IS NOT NULL LIMIT 1`;
  const defaultUserId = users.length > 0 ? users[0].user_id : '00000000-0000-0000-0000-000000000000';

  const questions = [
    {
      question_code: 'T9-C3B9-NEW-001',
      content: 'Đưa thừa số ra ngoài dấu căn của biểu thức $\\sqrt{18}$ ta được:',
      answer: '$3\\sqrt{2}$',
      solution: 'Ta tách số 18 thành tích của một số chính phương và một số nguyên: $\\sqrt{18} = \\sqrt{9 \\cdot 2} = \\sqrt{3^2 \\cdot 2} = 3\\sqrt{2}$.',
      difficulty: 'nhan_biet',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['$9\\sqrt{2}$', '$3\\sqrt{2}$', '$2\\sqrt{3}$', '$6\\sqrt{3}$']),
      correct_answer: '$3\\sqrt{2}$',
      status: 'approved',
      grade: 9
    },
    {
      question_code: 'T9-C3B9-NEW-002',
      content: 'Rút gọn biểu thức $2\\sqrt{50} - 3\\sqrt{8} + \\sqrt{18}$ ta được kết quả là:',
      answer: '$7\\sqrt{2}$',
      solution: 'Đưa các thừa số ra ngoài dấu căn:\n- $2\\sqrt{50} = 2\\sqrt{25 \\cdot 2} = 2 \\cdot 5\\sqrt{2} = 10\\sqrt{2}$\n- $3\\sqrt{8} = 3\\sqrt{4 \\cdot 2} = 3 \\cdot 2\\sqrt{2} = 6\\sqrt{2}$\n- $\\sqrt{18} = \\sqrt{9 \\cdot 2} = 3\\sqrt{2}$\nThay vào biểu thức ta có: $10\\sqrt{2} - 6\\sqrt{2} + 3\\sqrt{2} = (10 - 6 + 3)\\sqrt{2} = 7\\sqrt{2}$.',
      difficulty: 'thong_hieu',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['$3\\sqrt{2}$', '$5\\sqrt{2}$', '$7\\sqrt{2}$', '$9\\sqrt{2}$']),
      correct_answer: '$7\\sqrt{2}$',
      status: 'approved',
      grade: 9
    },
    {
      question_code: 'T9-C3B9-NEW-003',
      content: 'Trục căn thức ở mẫu của biểu thức $\\frac{2}{\\sqrt{3} - 1}$ ta được:',
      answer: '$\\sqrt{3} + 1$',
      solution: 'Trục căn thức bằng cách nhân lượng liên hợp $\\sqrt{3} + 1$ vào cả tử và mẫu: \n$\\frac{2}{\\sqrt{3} - 1} = \\frac{2(\\sqrt{3} + 1)}{(\\sqrt{3} - 1)(\\sqrt{3} + 1)} = \\frac{2(\\sqrt{3} + 1)}{3 - 1} = \\frac{2(\\sqrt{3} + 1)}{2} = \\sqrt{3} + 1$.',
      difficulty: 'thong_hieu',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['$\\sqrt{3} + 1$', '$\\sqrt{3} - 1$', '$\\frac{\\sqrt{3} + 1}{2}$', '$2(\\sqrt{3} + 1)$']),
      correct_answer: '$\\sqrt{3} + 1$',
      status: 'approved',
      grade: 9
    },
    {
      question_code: 'T9-C3B9-NEW-004',
      content: 'Cho biểu thức $P = \\left( \\frac{\\sqrt{x}}{\\sqrt{x} - 2} - \\frac{\\sqrt{x}}{\\sqrt{x} + 2} \\right) \\cdot \\frac{x - 4}{\\sqrt{x}}$ với $x > 0, x \\neq 4$. Rút gọn $P$ ta được:',
      answer: '$P = 4$',
      solution: 'Xét phần biểu thức trong ngoặc, ta quy đồng mẫu thức chung là $(\\sqrt{x}-2)(\\sqrt{x}+2) = x-4$:\n$\\frac{\\sqrt{x}(\\sqrt{x} + 2) - \\sqrt{x}(\\sqrt{x} - 2)}{x - 4} = \\frac{(x + 2\\sqrt{x}) - (x - 2\\sqrt{x})}{x - 4} = \\frac{4\\sqrt{x}}{x - 4}$. \nThay lại vào $P$, ta có: $P = \\frac{4\\sqrt{x}}{x - 4} \\cdot \\frac{x - 4}{\\sqrt{x}}$. Rút gọn chéo ta được $P = 4$.',
      difficulty: 'van_dung',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['$P = 4$', '$P = 2$', '$P = \\sqrt{x}$', '$P = 4\\sqrt{x}$']),
      correct_answer: '$P = 4$',
      status: 'approved',
      grade: 9
    },
    {
      question_code: 'T9-C3B9-NEW-005',
      content: 'Tìm các giá trị của $x$ để biểu thức $A = \\frac{\\sqrt{x} + 1}{\\sqrt{x} - 1}$ có giá trị nguyên (với $x \\ge 0, x \\neq 1, x \\in \\mathbb{Z}$).',
      answer: '$x \\in \\{0; 4; 9\\}$',
      solution: 'Ta biến đổi $A = \\frac{\\sqrt{x} - 1 + 2}{\\sqrt{x} - 1} = 1 + \\frac{2}{\\sqrt{x} - 1}$. Để $A \\in \\mathbb{Z}$ thì $\\frac{2}{\\sqrt{x} - 1}$ phải là số nguyên, suy ra $\\sqrt{x} - 1$ là ước của $2$. Ư$(2) = \\{\\pm 1, \\pm 2\\}$.\n- Nếu $\\sqrt{x} - 1 = 1 \\Rightarrow \\sqrt{x} = 2 \\Rightarrow x = 4$.\n- Nếu $\\sqrt{x} - 1 = -1 \\Rightarrow \\sqrt{x} = 0 \\Rightarrow x = 0$.\n- Nếu $\\sqrt{x} - 1 = 2 \\Rightarrow \\sqrt{x} = 3 \\Rightarrow x = 9$.\n- Nếu $\\sqrt{x} - 1 = -2 \\Rightarrow \\sqrt{x} = -1$ (Loại vì $\\sqrt{x} \\ge 0$).\nVậy các giá trị thỏa mãn là $x \\in \\{0; 4; 9\\}$.',
      difficulty: 'van_dung',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['$x \\in \\{2; 4\\}$', '$x \\in \\{0; 2; 3; 9\\}$', '$x \\in \\{0; 4; 9\\}$', '$x \\in \\{0; 2; 4\\}$']),
      correct_answer: '$x \\in \\{0; 4; 9\\}$',
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
  
  console.log('✅ Hoàn thành Block: LỚP 9 - CHƯƠNG III - BÀI 9.');
}

insertGrade9Ch3B9().catch(console.error);
