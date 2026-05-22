import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);

async function insertGrade9Ch3B10() {
  console.log('Khởi tạo kết nối CSDL...');
  
  const categoryId = '272488a7-d30f-4bc0-9b09-abfaf3636bef'; // Bài 10. Căn bậc ba và căn thức bậc ba.
  const topicName = 'Bài 10. Căn bậc ba và căn thức bậc ba.';

  // Fetch an existing user_id to use
  const users = await sql`SELECT user_id FROM public.questions WHERE user_id IS NOT NULL LIMIT 1`;
  const defaultUserId = users.length > 0 ? users[0].user_id : '00000000-0000-0000-0000-000000000000';

  const questions = [
    {
      question_code: 'T9-C3B10-NEW-001',
      content: 'Căn bậc ba của -8 là:',
      answer: '-2',
      solution: 'Căn bậc ba của một số $a$ là số $x$ sao cho $x^3 = a$. Vì $(-2)^3 = -8$ nên căn bậc ba của -8 là -2. Khác với căn bậc hai, căn bậc ba của số âm vẫn tồn tại và luôn là một số âm.',
      difficulty: 'nhan_biet',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['2', '-2', '$\\pm 2$', 'Không tồn tại']),
      correct_answer: '-2',
      status: 'approved',
      grade: 9
    },
    {
      question_code: 'T9-C3B10-NEW-002',
      content: 'Giá trị của biểu thức $M = \\sqrt[3]{27} - \\sqrt[3]{-64}$ là:',
      answer: '7',
      solution: 'Ta có $\\sqrt[3]{27} = 3$ vì $3^3 = 27$ và $\\sqrt[3]{-64} = -4$ vì $(-4)^3 = -64$. Do đó $M = 3 - (-4) = 3 + 4 = 7$.',
      difficulty: 'thong_hieu',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['-1', '7', '-7', '1']),
      correct_answer: '7',
      status: 'approved',
      grade: 9
    },
    {
      question_code: 'T9-C3B10-NEW-003',
      content: 'Khẳng định nào sau đây là sai?',
      answer: 'Căn bậc ba của một số âm là không xác định',
      solution: 'Căn bậc ba của một số âm vẫn xác định bình thường (ví dụ $\\sqrt[3]{-27} = -3$). Do đó khẳng định "Căn bậc ba của một số âm là không xác định" là khẳng định sai. Các khẳng định khác đều biểu diễn đúng tính chất của căn bậc ba.',
      difficulty: 'thong_hieu',
      question_type: 'trac_nghiem',
      options: JSON.stringify([
        '$\\sqrt[3]{a^3} = a$', 
        '$\\sqrt[3]{ab} = \\sqrt[3]{a} \\cdot \\sqrt[3]{b}$', 
        'Nếu $a < b$ thì $\\sqrt[3]{a} < \\sqrt[3]{b}$', 
        'Căn bậc ba của một số âm là không xác định'
      ]),
      correct_answer: 'Căn bậc ba của một số âm là không xác định',
      status: 'approved',
      grade: 9
    },
    {
      question_code: 'T9-C3B10-NEW-004',
      content: 'Rút gọn biểu thức $A = \\sqrt[3]{24} - 2\\sqrt[3]{3} + \\sqrt[3]{81}$ ta được:',
      answer: '$3\\sqrt[3]{3}$',
      solution: 'Ta đưa các thừa số ra ngoài dấu căn bậc ba bằng cách phân tích thành tích chứa lập phương số:\n$\\sqrt[3]{24} = \\sqrt[3]{8 \\cdot 3} = \\sqrt[3]{2^3 \\cdot 3} = 2\\sqrt[3]{3}$.\n$\\sqrt[3]{81} = \\sqrt[3]{27 \\cdot 3} = \\sqrt[3]{3^3 \\cdot 3} = 3\\sqrt[3]{3}$.\nThay vào biểu thức ta có: $A = 2\\sqrt[3]{3} - 2\\sqrt[3]{3} + 3\\sqrt[3]{3} = 3\\sqrt[3]{3}$.',
      difficulty: 'van_dung',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['$3\\sqrt[3]{3}$', '$\\sqrt[3]{3}$', '$2\\sqrt[3]{3}$', '$4\\sqrt[3]{3}$']),
      correct_answer: '$3\\sqrt[3]{3}$',
      status: 'approved',
      grade: 9
    },
    {
      question_code: 'T9-C3B10-NEW-005',
      content: 'Tìm $x$ thỏa mãn $\\sqrt[3]{x^2 - 1} = 2$.',
      answer: '$x = \\pm 3$',
      solution: 'Lập phương hai vế phương trình ta được: $x^2 - 1 = 2^3 \\Leftrightarrow x^2 - 1 = 8 \\Leftrightarrow x^2 = 9$. \nTừ đó suy ra $x = 3$ hoặc $x = -3$ (hoặc ký hiệu $x = \\pm 3$). Khác với căn bậc hai, phương trình căn bậc ba có đa thức dưới căn không cần điều kiện xác định. Cả hai giá trị đều thỏa mãn.',
      difficulty: 'van_dung',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['$x = 3$', '$x = \\pm 3$', '$x = 9$', '$x = \\pm 9$']),
      correct_answer: '$x = \\pm 3$',
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
  
  console.log('✅ Hoàn thành Block: LỚP 9 - CHƯƠNG III - BÀI 10.');
}

insertGrade9Ch3B10().catch(console.error);
