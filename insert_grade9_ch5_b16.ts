import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);

async function insertGrade9Ch5B16() {
  console.log('Khởi tạo kết nối CSDL...');
  
  const categoryId = '0c1f8bcc-7de1-4dee-986f-abaf281a99a7'; // Bài 16. Vị trí tương đối của đường thẳng và đường tròn.
  const topicName = 'Bài 16. Vị trí tương đối của đường thẳng và đường tròn.';

  // Fetch an existing user_id to use
  const users = await sql`SELECT user_id FROM public.questions WHERE user_id IS NOT NULL LIMIT 1`;
  const defaultUserId = users.length > 0 ? users[0].user_id : '00000000-0000-0000-0000-000000000000';

  const questions = [
    {
      question_code: 'T9-C5B16-NEW-001',
      content: 'Cho đường thẳng $a$ và đường tròn $(O; R)$. Gọi $d$ là khoảng cách từ tâm $O$ đến đường thẳng $a$. Đường thẳng $a$ là tiếp tuyến của đường tròn $(O; R)$ khi và chỉ khi:',
      answer: '$d = R$',
      solution: 'Vị trí tương đối của đường thẳng và đường tròn được xác định qua $d$ và $R$. Đường thẳng là tiếp tuyến của đường tròn (tức là tiếp xúc, có đúng một điểm chung) khi và chỉ khi khoảng cách từ tâm đến đường thẳng bằng bán kính của đường tròn, tức là $d = R$.',
      difficulty: 'nhan_biet',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['$d > R$', '$d < R$', '$d = R$', '$d \\le R$']),
      correct_answer: '$d = R$',
      status: 'approved',
      grade: 9
    },
    {
      question_code: 'T9-C5B16-NEW-002',
      content: 'Nếu đường thẳng $a$ cắt đường tròn $(O; R)$ tại hai điểm phân biệt thì:',
      answer: '$d < R$',
      solution: 'Đường thẳng cắt đường tròn tại hai điểm phân biệt (đường thẳng và đường tròn giao nhau, đường thẳng được gọi là cát tuyến) khi và chỉ khi khoảng cách từ tâm đến đường thẳng nhỏ hơn bán kính của đường tròn, tức là $d < R$.',
      difficulty: 'thong_hieu',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['$d > R$', '$d = R$', '$d < R$', '$d \\ge R$']),
      correct_answer: '$d < R$',
      status: 'approved',
      grade: 9
    },
    {
      question_code: 'T9-C5B16-NEW-003',
      content: 'Từ một điểm $A$ nằm ngoài đường tròn $(O; R)$, kẻ hai tiếp tuyến $AB$ và $AC$ đến đường tròn (với $B, C$ là các tiếp điểm). Khẳng định nào sau đây là SAI?',
      answer: '$\\triangle ABC$ là tam giác đều',
      solution: 'Theo tính chất hai tiếp tuyến cắt nhau, ta có: $AB = AC$, tia $AO$ là phân giác của $\\widehat{BAC}$, tia $OA$ là phân giác của $\\widehat{BOC}$. Vì $AB = AC$ nên $\\triangle ABC$ chỉ là tam giác cân tại $A$. Khẳng định $\\triangle ABC$ là tam giác đều là sai (trừ trường hợp đặc biệt $\\widehat{BAC} = 60^\\circ$).',
      difficulty: 'thong_hieu',
      question_type: 'trac_nghiem',
      options: JSON.stringify([
        '$AB = AC$', 
        'Tia $OA$ là phân giác của góc $\\widehat{BOC}$', 
        'Tia $AO$ là phân giác của góc $\\widehat{BAC}$', 
        '$\\triangle ABC$ là tam giác đều'
      ]),
      correct_answer: '$\\triangle ABC$ là tam giác đều',
      status: 'approved',
      grade: 9
    },
    {
      question_code: 'T9-C5B16-NEW-004',
      content: 'Cho đường tròn $(O; 6 \\text{ cm})$. Từ điểm $M$ cách $O$ một khoảng $10$ cm, kẻ tiếp tuyến $MT$ với đường tròn ($T$ là tiếp điểm). Độ dài đoạn tiếp tuyến $MT$ là:',
      answer: '$8$ cm',
      solution: 'Vì $MT$ là tiếp tuyến của đường tròn $(O)$ tại $T$ nên $MT \\perp OT$. Do đó, tam giác $MTO$ là tam giác vuông tại $T$. Áp dụng định lý Pythagore: $MT = \\sqrt{MO^2 - OT^2} = \\sqrt{10^2 - 6^2} = \\sqrt{100 - 36} = \\sqrt{64} = 8$ cm.',
      difficulty: 'van_dung',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['$4$ cm', '$16$ cm', '$8$ cm', '$11,66$ cm']),
      correct_answer: '$8$ cm',
      status: 'approved',
      grade: 9
    },
    {
      question_code: 'T9-C5B16-NEW-005',
      content: 'Cho đường tròn $(O; R)$ và một điểm $A$ cách $O$ một khoảng $2R$. Kẻ tiếp tuyến $AB$ với đường tròn ($B$ là tiếp điểm). Số đo của góc tạo bởi tiếp tuyến $AB$ và bán kính $OB$ bằng bao nhiêu?',
      answer: '$90^\\circ$',
      solution: 'Theo định nghĩa và tính chất của tiếp tuyến, tiếp tuyến của một đường tròn luôn vuông góc với bán kính đi qua tiếp điểm. Do đó góc tạo bởi tiếp tuyến $AB$ và bán kính $OB$ tại tiếp điểm $B$ luôn luôn bằng $90^\\circ$, bất kể khoảng cách $OA$ bằng bao nhiêu. (Lưu ý: Dữ kiện khoảng cách $OA = 2R$ là để bẫy học sinh nhầm lẫn tính góc $\\widehat{OAB} = 30^\\circ$).',
      difficulty: 'van_dung',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['$30^\\circ$', '$45^\\circ$', '$60^\\circ$', '$90^\\circ$']),
      correct_answer: '$90^\\circ$',
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
  
  console.log('✅ Hoàn thành Block: LỚP 9 - CHƯƠNG V - BÀI 16.');
}

insertGrade9Ch5B16().catch(console.error);
