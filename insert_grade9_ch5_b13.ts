import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);

async function insertGrade9Ch5B13() {
  console.log('Khởi tạo kết nối CSDL...');
  
  const categoryId = '961fcfb8-7f7d-4955-a150-3a28793a207e'; // Bài 13. Mở đầu về đường tròn.
  const topicName = 'Bài 13. Mở đầu về đường tròn.';

  // Fetch an existing user_id to use
  const users = await sql`SELECT user_id FROM public.questions WHERE user_id IS NOT NULL LIMIT 1`;
  const defaultUserId = users.length > 0 ? users[0].user_id : '00000000-0000-0000-0000-000000000000';

  const questions = [
    {
      question_code: 'T9-C5B13-NEW-001',
      content: 'Đường tròn tâm $O$ bán kính $R$ (ký hiệu $(O; R)$) là hình gồm các điểm:',
      answer: 'Cách $O$ một khoảng bằng $R$',
      solution: 'Theo định nghĩa, đường tròn tâm $O$ bán kính $R$ là tập hợp tất cả các điểm cách tâm $O$ một khoảng đúng bằng $R$. Khái niệm hình tròn mới là tập hợp các điểm cách $O$ một khoảng nhỏ hơn hoặc bằng $R$.',
      difficulty: 'nhan_biet',
      question_type: 'trac_nghiem',
      options: JSON.stringify([
        'Cách $O$ một khoảng bằng $R$', 
        'Cách $O$ một khoảng nhỏ hơn $R$', 
        'Cách $O$ một khoảng lớn hơn $R$', 
        'Cách $O$ một khoảng nhỏ hơn hoặc bằng $R$'
      ]),
      correct_answer: 'Cách $O$ một khoảng bằng $R$',
      status: 'approved',
      grade: 9
    },
    {
      question_code: 'T9-C5B13-NEW-002',
      content: 'Cho đường tròn $(O; 5 \\text{ cm})$. Điểm $A$ cách $O$ một khoảng $4 \\text{ cm}$. Khẳng định nào sau đây là đúng?',
      answer: 'Điểm $A$ nằm trong đường tròn $(O)$',
      solution: 'Để xác định vị trí tương đối của một điểm đối với đường tròn, ta so sánh khoảng cách từ tâm đến điểm đó với bán kính. Vì khoảng cách $OA = 4 \\text{ cm} < 5 \\text{ cm} = R$, nên điểm $A$ nằm bên trong đường tròn tâm $O$.',
      difficulty: 'thong_hieu',
      question_type: 'trac_nghiem',
      options: JSON.stringify([
        'Điểm $A$ nằm trên đường tròn $(O)$', 
        'Điểm $A$ nằm trong đường tròn $(O)$', 
        'Điểm $A$ nằm ngoài đường tròn $(O)$', 
        'Điểm $A$ trùng với tâm $O$'
      ]),
      correct_answer: 'Điểm $A$ nằm trong đường tròn $(O)$',
      status: 'approved',
      grade: 9
    },
    {
      question_code: 'T9-C5B13-NEW-003',
      content: 'Trong một đường tròn, đường kính dài $10$ cm. Bán kính của đường tròn đó là:',
      answer: '$5$ cm',
      solution: 'Đường kính của một đường tròn luôn dài gấp đôi bán kính ($d = 2R$). Vậy bán kính $R = \\frac{d}{2} = \\frac{10}{2} = 5 \\text{ cm}$.',
      difficulty: 'thong_hieu',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['$20$ cm', '$10$ cm', '$5$ cm', '$2.5$ cm']),
      correct_answer: '$5$ cm',
      status: 'approved',
      grade: 9
    },
    {
      question_code: 'T9-C5B13-NEW-004',
      content: 'Cho tam giác $ABC$ vuông tại $A$, có $AB = 6$ cm, $AC = 8$ cm. Tâm đường tròn ngoại tiếp tam giác $ABC$ nằm ở đâu và có bán kính bằng bao nhiêu?',
      answer: 'Tâm là trung điểm $BC$, $R = 5$ cm',
      solution: 'Tâm đường tròn ngoại tiếp tam giác vuông luôn là trung điểm của cạnh huyền. Áp dụng định lý Pythagore tính cạnh huyền: $BC = \\sqrt{AB^2 + AC^2} = \\sqrt{6^2 + 8^2} = 10$ cm. Bán kính đường tròn ngoại tiếp là $R = \\frac{BC}{2} = \\frac{10}{2} = 5$ cm. Tâm là trung điểm của $BC$.',
      difficulty: 'van_dung',
      question_type: 'trac_nghiem',
      options: JSON.stringify([
        'Tâm là trung điểm $BC$, $R = 5$ cm', 
        'Tâm là trung điểm $AB$, $R = 3$ cm', 
        'Tâm là trung điểm $AC$, $R = 4$ cm', 
        'Tâm $A$, $R = 10$ cm'
      ]),
      correct_answer: 'Tâm là trung điểm $BC$, $R = 5$ cm',
      status: 'approved',
      grade: 9
    },
    {
      question_code: 'T9-C5B13-NEW-005',
      content: 'Khẳng định nào sau đây phản ánh đúng tính chất đối xứng của đường tròn?',
      answer: 'Đường tròn có đúng một tâm đối xứng và vô số trục đối xứng.',
      solution: 'Đường tròn là hình có tâm đối xứng duy nhất (chính là tâm của đường tròn) và có vô số trục đối xứng (bất kỳ đường thẳng nào đi qua tâm, hay chứa đường kính của đường tròn, đều là một trục đối xứng).',
      difficulty: 'van_dung',
      question_type: 'trac_nghiem',
      options: JSON.stringify([
        'Đường tròn có đúng một tâm đối xứng và một trục đối xứng.', 
        'Đường tròn có đúng một tâm đối xứng và vô số trục đối xứng.', 
        'Đường tròn có vô số tâm đối xứng và vô số trục đối xứng.', 
        'Đường tròn không có tâm đối xứng, chỉ có trục đối xứng.'
      ]),
      correct_answer: 'Đường tròn có đúng một tâm đối xứng và vô số trục đối xứng.',
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
  
  console.log('✅ Hoàn thành Block: LỚP 9 - CHƯƠNG V - BÀI 13.');
}

insertGrade9Ch5B13().catch(console.error);
