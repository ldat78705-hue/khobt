import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);

async function insertGrade9Ch4B11() {
  console.log('Khởi tạo kết nối CSDL...');
  
  const categoryId = 'a36de566-3c04-439f-9997-2f2e0af98edd'; // Bài 11. Tỉ số lượng giác của góc nhọn.
  const topicName = 'Bài 11. Tỉ số lượng giác của góc nhọn.';

  // Fetch an existing user_id to use
  const users = await sql`SELECT user_id FROM public.questions WHERE user_id IS NOT NULL LIMIT 1`;
  const defaultUserId = users.length > 0 ? users[0].user_id : '00000000-0000-0000-0000-000000000000';

  const questions = [
    {
      question_code: 'T9-C4B11-NEW-001',
      content: 'Cho tam giác $ABC$ vuông tại $A$. Tỉ số lượng giác $\\sin B$ bằng:',
      answer: '$\\frac{AC}{BC}$',
      solution: 'Trong tam giác vuông, $\\sin$ của một góc nhọn bằng tỉ số giữa cạnh đối và cạnh huyền ("Sin đi học"). Đối với góc $B$ trong tam giác vuông $ABC$ (vuông tại $A$), cạnh đối là $AC$ và cạnh huyền là $BC$. Vậy $\\sin B = \\frac{AC}{BC}$.',
      difficulty: 'nhan_biet',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['$\\frac{AC}{BC}$', '$\\frac{AB}{BC}$', '$\\frac{AC}{AB}$', '$\\frac{AB}{AC}$']),
      correct_answer: '$\\frac{AC}{BC}$',
      status: 'approved',
      grade: 9
    },
    {
      question_code: 'T9-C4B11-NEW-002',
      content: 'Giá trị của $\\cos 30^\\circ$ là:',
      answer: '$\\frac{\\sqrt{3}}{2}$',
      solution: 'Theo bảng giá trị lượng giác của các góc đặc biệt thường dùng, $\\cos 30^\\circ = \\frac{\\sqrt{3}}{2}$.',
      difficulty: 'thong_hieu',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['$\\frac{1}{2}$', '$\\frac{\\sqrt{3}}{2}$', '$\\frac{\\sqrt{2}}{2}$', '$\\sqrt{3}$']),
      correct_answer: '$\\frac{\\sqrt{3}}{2}$',
      status: 'approved',
      grade: 9
    },
    {
      question_code: 'T9-C4B11-NEW-003',
      content: 'Khẳng định nào sau đây là đúng với hai góc nhọn phụ nhau $\\alpha$ và $\\beta$ (tức là $\\alpha + \\beta = 90^\\circ$)?',
      answer: '$\\sin \\alpha = \\cos \\beta$',
      solution: 'Theo tính chất của tỉ số lượng giác hai góc phụ nhau: "Sin góc này bằng côsin góc kia, tang góc này bằng côtang góc kia". Do đó $\\sin \\alpha = \\cos \\beta$ là khẳng định đúng.',
      difficulty: 'thong_hieu',
      question_type: 'trac_nghiem',
      options: JSON.stringify([
        '$\\sin \\alpha = \\sin \\beta$', 
        '$\\sin \\alpha = \\cos \\beta$', 
        '$\\tan \\alpha = \\tan \\beta$', 
        '$\\cos \\alpha = -\\cos \\beta$'
      ]),
      correct_answer: '$\\sin \\alpha = \\cos \\beta$',
      status: 'approved',
      grade: 9
    },
    {
      question_code: 'T9-C4B11-NEW-004',
      content: 'Rút gọn biểu thức $P = \\sin^2 35^\\circ + \\sin^2 55^\\circ$.',
      answer: '1',
      solution: 'Ta có $35^\\circ + 55^\\circ = 90^\\circ$ nên hai góc này phụ nhau. Theo tính chất góc phụ nhau ta có $\\sin 55^\\circ = \\cos 35^\\circ$. \nBiểu thức trở thành $P = \\sin^2 35^\\circ + \\cos^2 35^\\circ = 1$ (áp dụng hệ thức cơ bản $\\sin^2 \\alpha + \\cos^2 \\alpha = 1$).',
      difficulty: 'van_dung',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['1', '2', '0', '$\\sin 90^\\circ$']),
      correct_answer: '1',
      status: 'approved',
      grade: 9
    },
    {
      question_code: 'T9-C4B11-NEW-005',
      content: 'Cho tam giác $ABC$ vuông tại $A$, biết $\\tan B = \\frac{3}{4}$ và cạnh $AC = 6$. Tính độ dài cạnh huyền $BC$.',
      answer: '10',
      solution: 'Ta có $\\tan B = \\frac{\\text{cạnh đối}}{\\text{cạnh kề}} = \\frac{AC}{AB} = \\frac{3}{4}$. Biết $AC = 6$, suy ra $\\frac{6}{AB} = \\frac{3}{4} \\Rightarrow AB = \\frac{6 \\cdot 4}{3} = 8$. \nÁp dụng định lý Pythagore trong tam giác vuông $ABC$: $BC = \\sqrt{AB^2 + AC^2} = \\sqrt{8^2 + 6^2} = \\sqrt{64 + 36} = \\sqrt{100} = 10$.',
      difficulty: 'van_dung',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['8', '10', '12', '14']),
      correct_answer: '10',
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
  
  console.log('✅ Hoàn thành Block: LỚP 9 - CHƯƠNG IV - BÀI 11.');
}

insertGrade9Ch4B11().catch(console.error);
