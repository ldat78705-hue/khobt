import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);

async function insertGrade9Ch5B17() {
  console.log('Khởi tạo kết nối CSDL...');
  
  const categoryId = 'edfa77f0-914a-48bc-b5da-f7d5fe189b9f'; // Bài 17. Vị trí tương đối của hai đường tròn.
  const topicName = 'Bài 17. Vị trí tương đối của hai đường tròn.';

  // Fetch an existing user_id to use
  const users = await sql`SELECT user_id FROM public.questions WHERE user_id IS NOT NULL LIMIT 1`;
  const defaultUserId = users.length > 0 ? users[0].user_id : '00000000-0000-0000-0000-000000000000';

  const questions = [
    {
      question_code: 'T9-C5B17-NEW-001',
      content: 'Hai đường tròn $(O; R)$ và $(O\'; r)$ với $R > r$ cắt nhau khi và chỉ khi đoạn nối tâm $OO\'$ thỏa mãn điều kiện:',
      answer: '$R - r < OO\' < R + r$',
      solution: 'Theo tính chất vị trí tương đối của hai đường tròn, hai đường tròn cắt nhau tại hai điểm phân biệt khi và chỉ khi độ dài đoạn nối tâm lớn hơn hiệu hai bán kính và nhỏ hơn tổng hai bán kính, tức là bất đẳng thức $R - r < OO\' < R + r$ xảy ra.',
      difficulty: 'nhan_biet',
      question_type: 'trac_nghiem',
      options: JSON.stringify([
        '$OO\' > R + r$', 
        '$OO\' = R + r$', 
        '$R - r < OO\' < R + r$', 
        '$OO\' < R - r$'
      ]),
      correct_answer: '$R - r < OO\' < R + r$',
      status: 'approved',
      grade: 9
    },
    {
      question_code: 'T9-C5B17-NEW-002',
      content: 'Cho hai đường tròn $(O; 5 \\text{ cm})$ và $(O\'; 3 \\text{ cm})$ có khoảng cách hai tâm $OO\' = 8$ cm. Khẳng định nào sau đây là đúng?',
      answer: 'Hai đường tròn tiếp xúc ngoài',
      solution: 'Ta có tổng hai bán kính là $R + r = 5 + 3 = 8$ cm. Nhận thấy đoạn nối tâm $OO\' = 8$ cm, bằng chính xác tổng hai bán kính ($OO\' = R + r$). Do đó, hai đường tròn này tiếp xúc ngoài với nhau.',
      difficulty: 'thong_hieu',
      question_type: 'trac_nghiem',
      options: JSON.stringify([
        'Hai đường tròn cắt nhau', 
        'Hai đường tròn tiếp xúc ngoài', 
        'Hai đường tròn tiếp xúc trong', 
        'Hai đường tròn ngoài nhau'
      ]),
      correct_answer: 'Hai đường tròn tiếp xúc ngoài',
      status: 'approved',
      grade: 9
    },
    {
      question_code: 'T9-C5B17-NEW-003',
      content: 'Hai đường tròn $(O; R)$ và $(O\'; r)$ tiếp xúc trong với nhau ($R > r$). Khi đó số điểm chung của hai đường tròn là:',
      answer: '1',
      solution: 'Cho dù là tiếp xúc trong hay tiếp xúc ngoài, khái niệm "tiếp xúc" có nghĩa là hai đường tròn có duy nhất 1 điểm chung (được gọi là tiếp điểm). Điểm này nằm trên đường thẳng nối tâm $OO\'$.',
      difficulty: 'thong_hieu',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['0', '1', '2', 'Vô số']),
      correct_answer: '1',
      status: 'approved',
      grade: 9
    },
    {
      question_code: 'T9-C5B17-NEW-004',
      content: 'Cho hai đường tròn $(O; R)$ và $(O\'; r)$ cắt nhau tại hai điểm $A$ và $B$. Đường nối tâm $OO\'$ có tính chất gì đối với đoạn thẳng $AB$?',
      answer: 'Là đường trung trực của đoạn thẳng $AB$',
      solution: 'Theo định lý về tính chất đường nối tâm của hai đường tròn cắt nhau: "Đường nối tâm là đường trung trực của dây chung". Dây chung ở đây chính là đoạn thẳng $AB$. Vì vậy $OO\'$ vuông góc với $AB$ tại trung điểm của $AB$.',
      difficulty: 'van_dung',
      question_type: 'trac_nghiem',
      options: JSON.stringify([
        'Song song với $AB$', 
        'Đi qua $A$ và $B$', 
        'Là đường trung trực của đoạn thẳng $AB$', 
        'Là đường phân giác của góc tạo bởi $OA$ và $OB$'
      ]),
      correct_answer: 'Là đường trung trực của đoạn thẳng $AB$',
      status: 'approved',
      grade: 9
    },
    {
      question_code: 'T9-C5B17-NEW-005',
      content: 'Cho hai đường tròn $(O; 4 \\text{ cm})$ và $(O\'; 3 \\text{ cm})$ tiếp xúc ngoài tại $A$. Kẻ một tiếp tuyến chung ngoài tiếp xúc với $(O)$ tại $B$ và tiếp xúc với $(O\')$ tại $C$. Tính độ dài đoạn thẳng $BC$.',
      answer: '$4\\sqrt{3}$ cm',
      solution: 'Kẻ $O\'H \\perp OB$ tại $H$. Ta có tứ giác $BCO\'H$ là hình chữ nhật (có 3 góc vuông tại $B, C, H$). Suy ra độ dài $BC = O\'H$ và $HB = O\'C = 3$ cm. \nĐoạn $OH = OB - HB = 4 - 3 = 1$ cm.\nĐoạn nối tâm $OO\' = R + r = 4 + 3 = 7$ cm (vì hai đường tròn tiếp xúc ngoài).\nÁp dụng định lý Pythagore trong $\\Delta OHO\'$ vuông tại $H$: \n$O\'H = \\sqrt{OO\'^2 - OH^2} = \\sqrt{7^2 - 1^2} = \\sqrt{49 - 1} = \\sqrt{48} = 4\\sqrt{3}$ cm.\nVậy độ dài tiếp tuyến chung ngoài $BC = O\'H = 4\\sqrt{3}$ cm.',
      difficulty: 'van_dung',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['$7$ cm', '$5$ cm', '$2\\sqrt{7}$ cm', '$4\\sqrt{3}$ cm']),
      correct_answer: '$4\\sqrt{3}$ cm',
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
  
  console.log('✅ Hoàn thành Block: LỚP 9 - CHƯƠNG V - BÀI 17.');
}

insertGrade9Ch5B17().catch(console.error);
