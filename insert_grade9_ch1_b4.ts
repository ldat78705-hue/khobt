import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);

async function insertGrade9Ch1B4() {
  console.log('Khởi tạo kết nối CSDL...');
  
  const categoryId = 'c450ac94-ada5-4e02-9b14-ea4ece00711d'; // Bài tập cuối chương I.
  const topicName = 'Bài tập cuối chương I.';

  // Fetch an existing user_id to use
  const users = await sql`SELECT user_id FROM public.questions WHERE user_id IS NOT NULL LIMIT 1`;
  const defaultUserId = users.length > 0 ? users[0].user_id : '00000000-0000-0000-0000-000000000000';

  const questions = [
    {
      question_code: 'T9-C1B4-NEW-001',
      content: 'Cho phương trình $2x - y = 3$. Trong các cặp số sau, cặp nào là nghiệm của phương trình?',
      answer: 'Cả A và B',
      solution: 'Thay tọa độ $(1; -1)$: $2(1) - (-1) = 2 + 1 = 3$ (thỏa mãn). Thay tọa độ $(2; 1)$: $2(2) - 1 = 4 - 1 = 3$ (thỏa mãn). Vậy cả hai cặp số trên đều là nghiệm của phương trình đã cho. Do đó, phương án đúng là Cả A và B.',
      difficulty: 'nhan_biet',
      question_type: 'trac_nghiem',
      options: JSON.stringify([
        '$(1; -1)$', 
        '$(2; 1)$', 
        '$(0; 3)$', 
        'Cả A và B'
      ]),
      correct_answer: 'Cả A và B',
      status: 'approved',
      grade: 9
    },
    {
      question_code: 'T9-C1B4-NEW-002',
      content: 'Không giải hệ, hãy cho biết số nghiệm của hệ phương trình $\\begin{cases} x - 2y = 3 \\\\ -2x + 4y = -6 \\end{cases}$.',
      answer: 'Vô số nghiệm',
      solution: 'Xét tỉ số các hệ số của hệ phương trình: $\\frac{1}{-2} = \\frac{-2}{4} = \\frac{3}{-6} = -\\frac{1}{2}$. Do đó hai đường thẳng biểu diễn hai phương trình của hệ trùng nhau, suy ra hệ có vô số nghiệm.',
      difficulty: 'thong_hieu',
      question_type: 'trac_nghiem',
      options: JSON.stringify([
        'Vô nghiệm', 
        'Vô số nghiệm', 
        'Có nghiệm duy nhất', 
        'Có hai nghiệm'
      ]),
      correct_answer: 'Vô số nghiệm',
      status: 'approved',
      grade: 9
    },
    {
      question_code: 'T9-C1B4-NEW-003',
      content: 'Cho hệ phương trình $\\begin{cases} mx + y = 5 \\\\ 2x - y = 1 \\end{cases}$. Tìm giá trị của $m$ để hệ có nghiệm duy nhất.',
      answer: '$m \\neq -2$',
      solution: 'Hệ phương trình có nghiệm duy nhất khi và chỉ khi tỉ số các hệ số tương ứng không bằng nhau: $\\frac{m}{2} \\neq \\frac{1}{-1} \\Leftrightarrow \\frac{m}{2} \\neq -1 \\Leftrightarrow m \\neq -2$.',
      difficulty: 'van_dung',
      question_type: 'trac_nghiem',
      options: JSON.stringify([
        '$m = -2$', 
        '$m \\neq -2$', 
        '$m = 2$', 
        '$m \\neq 2$'
      ]),
      correct_answer: '$m \\neq -2$',
      status: 'approved',
      grade: 9
    },
    {
      question_code: 'T9-C1B4-NEW-004',
      content: 'Giải hệ phương trình $\\begin{cases} \\frac{2}{x} + \\frac{1}{y} = 3 \\\\ \\frac{1}{x} - \\frac{1}{y} = 0 \\end{cases}$ (với $x \\neq 0, y \\neq 0$). Nghiệm $(x; y)$ của hệ là:',
      answer: '$(1; 1)$',
      solution: 'Đặt $u = \\frac{1}{x}, v = \\frac{1}{y}$ hệ trở thành $\\begin{cases} 2u + v = 3 \\\\ u - v = 0 \\end{cases}$. Cộng vế theo vế ta được $3u = 3 \\Rightarrow u = 1$. Thay $u = 1$ vào phương trình hai ta có $1 - v = 0 \\Rightarrow v = 1$. Suy ra $\\frac{1}{x} = 1 \\Rightarrow x = 1$ và $\\frac{1}{y} = 1 \\Rightarrow y = 1$ (thỏa mãn điều kiện). Vậy nghiệm của hệ là $(1; 1)$.',
      difficulty: 'van_dung',
      question_type: 'trac_nghiem',
      options: JSON.stringify([
        '$(1; 1)$', 
        '$(1; -1)$', 
        '$(3; 3)$', 
        '$(1; 3)$'
      ]),
      correct_answer: '$(1; 1)$',
      status: 'approved',
      grade: 9
    },
    {
      question_code: 'T9-C1B4-NEW-005',
      content: 'Một chiếc ca nô đi xuôi dòng $44$ km rồi ngược dòng $27$ km hết $3$ giờ $30$ phút. Biết vận tốc dòng nước là $2$ km/h. Vận tốc thực của ca nô là bao nhiêu?',
      answer: '20 km/h',
      solution: 'Gọi vận tốc thực của ca nô là $x$ km/h ($x > 2$). Vận tốc xuôi dòng là $x + 2$, vận tốc ngược dòng là $x - 2$. Thời gian xuôi dòng là $\\frac{44}{x+2}$, thời gian ngược dòng là $\\frac{27}{x-2}$. Đổi $3$ giờ $30$ phút $= 3,5$ giờ $= \\frac{7}{2}$ giờ. Ta có phương trình: $\\frac{44}{x+2} + \\frac{27}{x-2} = \\frac{7}{2}$. Bằng cách quy đồng và giải phương trình, ta tìm được $x = 20$ (thỏa mãn). Vậy vận tốc thực là $20$ km/h.',
      difficulty: 'van_dung',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['18 km/h', '20 km/h', '22 km/h', '24 km/h']),
      correct_answer: '20 km/h',
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
  
  console.log('✅ Hoàn thành Block cuối cùng: LỚP 9 - CHƯƠNG I - BÀI TẬP CUỐI CHƯƠNG I.');
}

insertGrade9Ch1B4().catch(console.error);
