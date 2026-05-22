import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);

async function insertGrade9Ch4B13() {
  console.log('Khởi tạo kết nối CSDL...');
  
  const categoryId = '8b7dcc3d-aa7d-44cd-b756-4de1bfdf71b7'; // Bài tập cuối chương IV.
  const topicName = 'Bài tập cuối chương IV.';

  // Fetch an existing user_id to use
  const users = await sql`SELECT user_id FROM public.questions WHERE user_id IS NOT NULL LIMIT 1`;
  const defaultUserId = users.length > 0 ? users[0].user_id : '00000000-0000-0000-0000-000000000000';

  const questions = [
    {
      question_code: 'T9-C4B13-NEW-001',
      content: 'Cho $\\alpha$ là một góc nhọn bất kỳ. Khẳng định nào sau đây là sai?',
      answer: '$\\tan \\alpha < 0$',
      solution: 'Với một góc nhọn $\\alpha$ (lớn hơn $0^\\circ$ và nhỏ hơn $90^\\circ$), tất cả các tỉ số lượng giác (sin, cos, tan, cot) đều nhận giá trị dương. Do đó, khẳng định $\\tan \\alpha < 0$ là sai. Ngoài ra ta luôn có $0 < \\sin \\alpha < 1$ và $0 < \\cos \\alpha < 1$.',
      difficulty: 'nhan_biet',
      question_type: 'trac_nghiem',
      options: JSON.stringify([
        '$\\sin \\alpha < 1$', 
        '$\\cos \\alpha > 0$', 
        '$\\tan \\alpha < 0$', 
        '$\\cot \\alpha > 0$'
      ]),
      correct_answer: '$\\tan \\alpha < 0$',
      status: 'approved',
      grade: 9
    },
    {
      question_code: 'T9-C4B13-NEW-002',
      content: 'Cho $\\sin \\alpha = \\frac{3}{5}$. Tính $\\cos \\alpha$ (biết $\\alpha$ là góc nhọn).',
      answer: '$\\frac{4}{5}$',
      solution: 'Áp dụng hệ thức cơ bản $\\sin^2 \\alpha + \\cos^2 \\alpha = 1$, ta có $\\left(\\frac{3}{5}\\right)^2 + \\cos^2 \\alpha = 1 \\Leftrightarrow \\frac{9}{25} + \\cos^2 \\alpha = 1 \\Leftrightarrow \\cos^2 \\alpha = \\frac{16}{25}$. Vì $\\alpha$ là góc nhọn nên $\\cos \\alpha > 0$, suy ra $\\cos \\alpha = \\sqrt{\\frac{16}{25}} = \\frac{4}{5}$.',
      difficulty: 'thong_hieu',
      question_type: 'trac_nghiem',
      options: JSON.stringify([
        '$\\frac{4}{5}$', 
        '$\\frac{2}{5}$', 
        '$\\frac{16}{25}$', 
        '$\\frac{4}{3}$'
      ]),
      correct_answer: '$\\frac{4}{5}$',
      status: 'approved',
      grade: 9
    },
    {
      question_code: 'T9-C4B13-NEW-003',
      content: 'Cho tam giác $ABC$ vuông tại $A$ có $AB = 3$ cm, $AC = 4$ cm. Kẻ đường cao $AH$. Độ dài đường cao $AH$ là:',
      answer: '2,4 cm',
      solution: 'Áp dụng định lý Pythagore, $BC = \\sqrt{AB^2 + AC^2} = \\sqrt{3^2 + 4^2} = 5$ cm. Áp dụng hệ thức lượng trong tam giác vuông: $AH \\cdot BC = AB \\cdot AC \\Rightarrow AH \\cdot 5 = 3 \\cdot 4 \\Rightarrow AH = \\frac{12}{5} = 2,4$ cm.',
      difficulty: 'van_dung',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['2,4 cm', '2,5 cm', '5 cm', '1,2 cm']),
      correct_answer: '2,4 cm',
      status: 'approved',
      grade: 9
    },
    {
      question_code: 'T9-C4B13-NEW-004',
      content: 'Rút gọn biểu thức $P = \\tan \\alpha \\cdot \\cos \\alpha + \\cot \\alpha \\cdot \\sin \\alpha$.',
      answer: '$\\sin \\alpha + \\cos \\alpha$',
      solution: 'Ta có hệ thức liên hệ: $\\tan \\alpha = \\frac{\\sin \\alpha}{\\cos \\alpha}$ và $\\cot \\alpha = \\frac{\\cos \\alpha}{\\sin \\alpha}$. Thay vào biểu thức $P$: \n$P = \\left(\\frac{\\sin \\alpha}{\\cos \\alpha} \\cdot \\cos \\alpha\\right) + \\left(\\frac{\\cos \\alpha}{\\sin \\alpha} \\cdot \\sin \\alpha\\right) = \\sin \\alpha + \\cos \\alpha$.',
      difficulty: 'van_dung',
      question_type: 'trac_nghiem',
      options: JSON.stringify([
        '$\\sin \\alpha + \\cos \\alpha$', 
        '1', 
        '2', 
        '$\\sin \\alpha \\cdot \\cos \\alpha$'
      ]),
      correct_answer: '$\\sin \\alpha + \\cos \\alpha$',
      status: 'approved',
      grade: 9
    },
    {
      question_code: 'T9-C4B13-NEW-005',
      content: 'Một máy bay cất cánh với vận tốc $500$ km/h theo phương tạo với mặt đất một góc $25^\\circ$. Hỏi sau $3$ phút kể từ khi cất cánh, máy bay ở độ cao xấp xỉ bao nhiêu mét so với mặt đất? (Làm tròn đến hàng đơn vị).',
      answer: '10565 m',
      solution: 'Đổi $3$ phút = $\\frac{1}{20}$ giờ. Quãng đường máy bay bay được trong 3 phút là: $s = v \\cdot t = 500 \\cdot \\frac{1}{20} = 25$ km = $25000$ m. \nQuãng đường này chính là cạnh huyền của tam giác vuông, trong đó độ cao máy bay là cạnh góc vuông đối diện với góc $25^\\circ$. Độ cao $h = 25000 \\cdot \\sin 25^\\circ \\approx 25000 \\cdot 0,422618 \\approx 10565,45$. Làm tròn đến hàng đơn vị, máy bay ở độ cao $10565$ m.',
      difficulty: 'van_dung',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['10565 m', '10500 m', '105654 m', '25000 m']),
      correct_answer: '10565 m',
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
  
  console.log('✅ Hoàn thành Block cuối: LỚP 9 - CHƯƠNG IV - BÀI TẬP CUỐI CHƯƠNG IV.');
}

insertGrade9Ch4B13().catch(console.error);
