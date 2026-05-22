import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);

async function insertGrade9Ch5B15() {
  console.log('Khởi tạo kết nối CSDL...');
  
  const categoryId = '7ca5321e-d762-4b16-96da-ee285ae77372'; // Bài 15. Độ dài của cung tròn. Diện tích hình quạt tròn và hình vành khuyên.
  const topicName = 'Bài 15. Độ dài của cung tròn. Diện tích hình quạt tròn và hình vành khuyên.';

  // Fetch an existing user_id to use
  const users = await sql`SELECT user_id FROM public.questions WHERE user_id IS NOT NULL LIMIT 1`;
  const defaultUserId = users.length > 0 ? users[0].user_id : '00000000-0000-0000-0000-000000000000';

  const questions = [
    {
      question_code: 'T9-C5B15-NEW-001',
      content: 'Công thức tính độ dài cung tròn bán kính $R$, số đo cung là $n^\\circ$ là:',
      answer: '$l = \\frac{\\pi R n}{180}$',
      solution: 'Độ dài đường tròn là $C = 2\\pi R$, tương ứng với góc ở tâm $360^\\circ$. Vậy độ dài cung $1^\\circ$ là $\\frac{2\\pi R}{360} = \\frac{\\pi R}{180}$. Do đó công thức tính độ dài cung tròn $n^\\circ$ là $l = \\frac{\\pi R n}{180}$. (Công thức có mẫu số 360 dùng cho diện tích hình quạt).',
      difficulty: 'nhan_biet',
      question_type: 'trac_nghiem',
      options: JSON.stringify([
        '$l = \\frac{\\pi R n}{360}$', 
        '$l = \\frac{\\pi R n}{180}$', 
        '$l = \\frac{\\pi R^2 n}{360}$', 
        '$l = \\frac{\\pi R^2 n}{180}$'
      ]),
      correct_answer: '$l = \\frac{\\pi R n}{180}$',
      status: 'approved',
      grade: 9
    },
    {
      question_code: 'T9-C5B15-NEW-002',
      content: 'Tính độ dài cung $60^\\circ$ của một đường tròn có bán kính $6$ cm.',
      answer: '$2\\pi$ cm',
      solution: 'Áp dụng công thức tính độ dài cung tròn $l = \\frac{\\pi R n}{180}$, thay $R = 6, n = 60$ ta được $l = \\frac{\\pi \\cdot 6 \\cdot 60}{180} = \\frac{360\\pi}{180} = 2\\pi$ (cm).',
      difficulty: 'thong_hieu',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['$\\pi$ cm', '$2\\pi$ cm', '$3\\pi$ cm', '$12\\pi$ cm']),
      correct_answer: '$2\\pi$ cm',
      status: 'approved',
      grade: 9
    },
    {
      question_code: 'T9-C5B15-NEW-003',
      content: 'Diện tích hình quạt tròn bán kính $R$, cung $n^\\circ$ được tính theo công thức nào sau đây?',
      answer: '$S = \\frac{l R}{2}$',
      solution: 'Diện tích hình quạt tròn được tính bằng công thức cơ bản $S = \\frac{\\pi R^2 n}{360}$. Ngoài ra, vì độ dài cung $l = \\frac{\\pi R n}{180}$, ta có thể viết lại $S = \\frac{\\pi R n \\cdot R}{180 \\cdot 2} = \\frac{l R}{2}$. Trong các phương án, chỉ có $S = \\frac{l R}{2}$ là đúng.',
      difficulty: 'thong_hieu',
      question_type: 'trac_nghiem',
      options: JSON.stringify([
        '$S = \\frac{\\pi R n}{180}$', 
        '$S = \\frac{l R}{2}$', 
        '$S = \\pi R^2$', 
        '$S = \\frac{\\pi R n}{360}$'
      ]),
      correct_answer: '$S = \\frac{l R}{2}$',
      status: 'approved',
      grade: 9
    },
    {
      question_code: 'T9-C5B15-NEW-004',
      content: 'Một hình vành khuyên được tạo bởi hai đường tròn đồng tâm có bán kính lần lượt là $R_1 = 5$ cm và $R_2 = 3$ cm. Diện tích của hình vành khuyên đó là:',
      answer: '$16\\pi \\text{ cm}^2$',
      solution: 'Hình vành khuyên là phần mặt phẳng nằm giữa hai đường tròn đồng tâm. Diện tích hình vành khuyên bằng diện tích hình tròn lớn trừ đi diện tích hình tròn nhỏ. $S = \\pi R_1^2 - \\pi R_2^2 = \\pi(5^2 - 3^2) = \\pi(25 - 9) = 16\\pi$ ($\\text{cm}^2$).',
      difficulty: 'van_dung',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['$16\\pi \\text{ cm}^2$', '$34\\pi \\text{ cm}^2$', '$4\\pi \\text{ cm}^2$', '$8\\pi \\text{ cm}^2$']),
      correct_answer: '$16\\pi \\text{ cm}^2$',
      status: 'approved',
      grade: 9
    },
    {
      question_code: 'T9-C5B15-NEW-005',
      content: 'Một chiếc quạt giấy khi xòe ra hết cỡ tạo thành một hình quạt tròn có bán kính $20$ cm và góc ở tâm là $150^\\circ$. Người ta muốn dán giấy màu lên cả hai mặt của phần cánh quạt. Tính diện tích giấy màu cần dùng (lấy $\\pi \\approx 3,14$).',
      answer: '$1046,7 \\text{ cm}^2$',
      solution: 'Diện tích một mặt của hình quạt giấy là: $S_1 = \\frac{\\pi R^2 n}{360} = \\frac{\\pi \\cdot 20^2 \\cdot 150}{360} = \\frac{400 \\cdot 150 \\pi}{360} = \\frac{500\\pi}{3} \\approx 523,33 \\text{ cm}^2$.\nVì phải dán giấy màu lên CẢ HAI mặt nên diện tích giấy màu tổng cộng cần dùng là: $S = 2 \\cdot S_1 \\approx 2 \\cdot 523,33 = 1046,67 \\approx 1046,7 \\text{ cm}^2$.',
      difficulty: 'van_dung',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['$523,3 \\text{ cm}^2$', '$1046,7 \\text{ cm}^2$', '$1570 \\text{ cm}^2$', '$3140 \\text{ cm}^2$']),
      correct_answer: '$1046,7 \\text{ cm}^2$',
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
  
  console.log('✅ Hoàn thành Block: LỚP 9 - CHƯƠNG V - BÀI 15.');
}

insertGrade9Ch5B15().catch(console.error);
