import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);

async function insertGrade9Ch4B12() {
  console.log('Khởi tạo kết nối CSDL...');
  
  const categoryId = '9fc7a175-90cf-4a55-808c-60a000bfd400'; // Bài 12. Một số hệ thức giữa cạnh, góc trong tam giác vuông.
  const topicName = 'Bài 12. Một số hệ thức giữa cạnh, góc trong tam giác vuông và ứng dụng.';

  // Fetch an existing user_id to use
  const users = await sql`SELECT user_id FROM public.questions WHERE user_id IS NOT NULL LIMIT 1`;
  const defaultUserId = users.length > 0 ? users[0].user_id : '00000000-0000-0000-0000-000000000000';

  const questions = [
    {
      question_code: 'T9-C4B12-NEW-001',
      content: 'Trong tam giác $ABC$ vuông tại $A$ có các cạnh lần lượt là $a, b, c$. Hệ thức nào sau đây là đúng?',
      answer: '$b = a \\cdot \\sin B$',
      solution: 'Trong tam giác vuông, mỗi cạnh góc vuông bằng cạnh huyền nhân với sin góc đối hoặc côsin góc kề. Cụ thể, độ dài cạnh $b$ (cạnh $AC$) bằng cạnh huyền $a$ (cạnh $BC$) nhân với $\\sin B$ (góc đối) hoặc $\\cos C$ (góc kề). Vậy hệ thức $b = a \\cdot \\sin B$ là chính xác.',
      difficulty: 'nhan_biet',
      question_type: 'trac_nghiem',
      options: JSON.stringify([
        '$b = a \\cdot \\sin B$', 
        '$b = a \\cdot \\cos B$', 
        '$b = c \\cdot \\sin B$', 
        '$b = c \\cdot \\cos C$'
      ]),
      correct_answer: '$b = a \\cdot \\sin B$',
      status: 'approved',
      grade: 9
    },
    {
      question_code: 'T9-C4B12-NEW-002',
      content: 'Cho tam giác vuông có độ dài cạnh huyền là 10, một góc nhọn là $30^\\circ$. Độ dài cạnh góc vuông đối diện với góc $30^\\circ$ là:',
      answer: '$5$',
      solution: 'Theo tính chất nửa tam giác đều, cạnh góc vuông đối diện với góc $30^\\circ$ bằng một nửa cạnh huyền. Áp dụng hệ thức lượng, ta cũng có kết quả tương tự: $\\text{cạnh đối} = \\text{cạnh huyền} \\cdot \\sin 30^\\circ = 10 \\cdot \\frac{1}{2} = 5$.',
      difficulty: 'thong_hieu',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['$5$', '$5\\sqrt{3}$', '$10\\sqrt{3}$', '$20$']),
      correct_answer: '$5$',
      status: 'approved',
      grade: 9
    },
    {
      question_code: 'T9-C4B12-NEW-003',
      content: 'Trong tam giác $ABC$ vuông tại $A$, có $BC = 12$ cm, góc $\\widehat{B} = 60^\\circ$. Độ dài cạnh $AB$ là:',
      answer: '$6$ cm',
      solution: 'Cạnh $AB$ (tức cạnh $c$) là cạnh góc vuông kề với góc $\\widehat{B}$. Theo hệ thức lượng giữa cạnh và góc trong tam giác vuông: $c = a \\cdot \\cos B \\Rightarrow AB = BC \\cdot \\cos 60^\\circ = 12 \\cdot \\frac{1}{2} = 6$ (cm).',
      difficulty: 'thong_hieu',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['$6$ cm', '$6\\sqrt{3}$ cm', '$12\\sqrt{3}$ cm', '$24$ cm']),
      correct_answer: '$6$ cm',
      status: 'approved',
      grade: 9
    },
    {
      question_code: 'T9-C4B12-NEW-004',
      content: 'Một chiếc thang dài 4m dựa vào một bức tường. Biết góc tạo bởi chiếc thang và mặt đất là $65^\\circ$. Hỏi khoảng cách từ chân thang đến chân tường là bao nhiêu? (Làm tròn đến chữ số thập phân thứ hai).',
      answer: '1,69 m',
      solution: 'Bài toán thực tế mô phỏng một tam giác vuông, trong đó chiếc thang là cạnh huyền ($4$ m), góc giữa thang và mặt đất là $65^\\circ$. Khoảng cách từ chân thang đến tường chính là độ dài cạnh kề của góc $65^\\circ$.\nTa có: $\\text{cạnh kề} = \\text{cạnh huyền} \\cdot \\cos 65^\\circ = 4 \\cdot \\cos 65^\\circ \\approx 4 \\cdot 0,4226 = 1,6904$.\nLàm tròn đến chữ số thập phân thứ hai, ta được $1,69$ m.',
      difficulty: 'van_dung',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['1,69 m', '3,63 m', '1,96 m', '2,14 m']),
      correct_answer: '1,69 m',
      status: 'approved',
      grade: 9
    },
    {
      question_code: 'T9-C4B12-NEW-005',
      content: 'Một tháp cao 50m. Tại một thời điểm trong ngày, bóng của tháp trên mặt đất dài 30m. Hỏi lúc đó góc tạo bởi tia nắng mặt trời và mặt đất xấp xỉ bằng bao nhiêu độ? (Làm tròn đến độ).',
      answer: '$59^\\circ$',
      solution: 'Tháp và bóng của nó trên mặt đất tạo thành hai cạnh góc vuông của một tam giác vuông. Cạnh đối của góc tạo bởi tia nắng và mặt đất là chiều cao tháp ($50$ m), cạnh kề là bóng tháp ($30$ m).\nGọi góc đó là $\\alpha$, ta có $\\tan \\alpha = \\frac{\\text{cạnh đối}}{\\text{cạnh kề}} = \\frac{50}{30} = \\frac{5}{3} \\approx 1,6667$.\nSử dụng máy tính bấm $\\text{shift } \\tan$, suy ra $\\alpha \\approx 59^\\circ$.',
      difficulty: 'van_dung',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['$31^\\circ$', '$59^\\circ$', '$53^\\circ$', '$37^\\circ$']),
      correct_answer: '$59^\\circ$',
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
  
  console.log('✅ Hoàn thành Block: LỚP 9 - CHƯƠNG IV - BÀI 12.');
}

insertGrade9Ch4B12().catch(console.error);
