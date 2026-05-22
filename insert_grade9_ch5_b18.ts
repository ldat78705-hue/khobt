import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);

async function insertGrade9Ch5B18() {
  console.log('Khởi tạo kết nối CSDL...');
  
  const categoryId = 'e15e6e95-bb3b-49b2-a90b-22795f2ef700'; // Bài tập cuối chương V.
  const topicName = 'Bài tập cuối chương V.';

  // Fetch an existing user_id to use
  const users = await sql`SELECT user_id FROM public.questions WHERE user_id IS NOT NULL LIMIT 1`;
  const defaultUserId = users.length > 0 ? users[0].user_id : '00000000-0000-0000-0000-000000000000';

  const questions = [
    {
      question_code: 'T9-C5B18-NEW-001',
      content: 'Khẳng định nào sau đây là sai khi nói về đường tròn?',
      answer: 'Đường tròn chỉ có hai trục đối xứng là hai đường kính vuông góc với nhau.',
      solution: 'Đường tròn là một hình có tính đối xứng hoàn hảo. Tâm của đường tròn là tâm đối xứng duy nhất. Bất kỳ đường thẳng nào đi qua tâm (đường thẳng chứa đường kính) đều là một trục đối xứng của đường tròn. Vì có vô số đường kính nên đường tròn có vô số trục đối xứng. Khẳng định "Đường tròn chỉ có hai trục đối xứng" là hoàn toàn sai.',
      difficulty: 'nhan_biet',
      question_type: 'trac_nghiem',
      options: JSON.stringify([
        'Đường tròn có tâm đối xứng là tâm của nó.', 
        'Bất kỳ đường kính nào cũng là một trục đối xứng của đường tròn.', 
        'Đường tròn có vô số trục đối xứng.', 
        'Đường tròn chỉ có hai trục đối xứng là hai đường kính vuông góc với nhau.'
      ]),
      correct_answer: 'Đường tròn chỉ có hai trục đối xứng là hai đường kính vuông góc với nhau.',
      status: 'approved',
      grade: 9
    },
    {
      question_code: 'T9-C5B18-NEW-002',
      content: 'Cho hai đường tròn $(O; 4 \\text{ cm})$ và $(O\'; 7 \\text{ cm})$ có $OO\' = 12 \\text{ cm}$. Số giao điểm của hai đường tròn này là:',
      answer: '0',
      solution: 'Ta có tổng hai bán kính là $R + r = 4 + 7 = 11$ cm. Khoảng cách hai tâm là $OO\' = 12$ cm. Vì $OO\' > R + r$ ($12 > 11$) nên hai đường tròn này nằm hoàn toàn ngoài nhau (không giao nhau). Do đó, số giao điểm của hai đường tròn là 0.',
      difficulty: 'thong_hieu',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['0', '1', '2', 'Vô số']),
      correct_answer: '0',
      status: 'approved',
      grade: 9
    },
    {
      question_code: 'T9-C5B18-NEW-003',
      content: 'Cho đường tròn $(O; 10 \\text{ cm})$ và một dây cung $AB$ dài $12 \\text{ cm}$. Khoảng cách từ tâm $O$ đến dây $AB$ là:',
      answer: '$8$ cm',
      solution: 'Gọi $H$ là chân đường vuông góc từ $O$ đến dây $AB$. Theo tính chất đường kính vuông góc với dây cung, $H$ là trung điểm của $AB$, suy ra $AH = \\frac{12}{2} = 6$ cm. \nXét tam giác vuông $OAH$, áp dụng định lý Pythagore: $OH = \\sqrt{OA^2 - AH^2} = \\sqrt{10^2 - 6^2} = \\sqrt{100 - 36} = \\sqrt{64} = 8$ cm. Khoảng cách cần tìm là $8$ cm.',
      difficulty: 'van_dung',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['$8$ cm', '$6$ cm', '$4$ cm', '$2$ cm']),
      correct_answer: '$8$ cm',
      status: 'approved',
      grade: 9
    },
    {
      question_code: 'T9-C5B18-NEW-004',
      content: 'Hình quạt tròn bán kính $R = 9 \\text{ cm}$ ứng với cung $40^\\circ$. Diện tích của hình quạt tròn đó là:',
      answer: '$9\\pi \\text{ cm}^2$',
      solution: 'Áp dụng công thức tính diện tích hình quạt tròn: $S = \\frac{\\pi R^2 n}{360}$. \nThay số tương ứng với bài toán: $S = \\frac{\\pi \\cdot 9^2 \\cdot 40}{360} = \\frac{81 \\cdot 40 \\pi}{360} = \\frac{3240\\pi}{360} = 9\\pi \\text{ cm}^2$.',
      difficulty: 'van_dung',
      question_type: 'trac_nghiem',
      options: JSON.stringify([
        '$9\\pi \\text{ cm}^2$', 
        '$18\\pi \\text{ cm}^2$', 
        '$2\\pi \\text{ cm}^2$', 
        '$4.5\\pi \\text{ cm}^2$'
      ]),
      correct_answer: '$9\\pi \\text{ cm}^2$',
      status: 'approved',
      grade: 9
    },
    {
      question_code: 'T9-C5B18-NEW-005',
      content: 'Cho hai đường tròn $(O; R)$ và $(O\'; r)$ tiếp xúc ngoài tại $A$ ($R > r$). Kẻ đường kính $AOB$ của $(O)$ và đường kính $AO\'C$ của $(O\').$ Một đường thẳng $d$ đi qua $A$ cắt $(O)$ tại $D$ và cắt $(O\')$ tại $E$. Khẳng định nào sau đây là đúng?',
      answer: '$BD \\parallel CE$',
      solution: 'Vì hai đường tròn tiếp xúc ngoài tại $A$ nên ba điểm $O, A, O\'$ thẳng hàng, suy ra $B, A, C$ thẳng hàng.\nXét tam giác $BDA$ nội tiếp đường tròn $(O)$ có cạnh $BA$ là đường kính nên $\\triangle BDA$ vuông tại $D$, tức là $BD \\perp DE$.\nXét tam giác $CEA$ nội tiếp đường tròn $(O\')$ có cạnh $CA$ là đường kính nên $\\triangle CEA$ vuông tại $E$, tức là $CE \\perp DE$.\nVì hai đường thẳng $BD$ và $CE$ cùng vuông góc với một đường thẳng thứ ba ($DE$) nên chúng song song với nhau. Do đó, $BD \\parallel CE$.',
      difficulty: 'van_dung',
      question_type: 'trac_nghiem',
      options: JSON.stringify([
        '$BD \\parallel CE$', 
        '$BD \\perp CE$', 
        '$D, B, E$ thẳng hàng', 
        '$\\triangle ABD \\sim \\triangle ACE$ với tỉ số đồng dạng $k = \\frac{r}{R}$'
      ]),
      correct_answer: '$BD \\parallel CE$',
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
  
  console.log('✅ Hoàn thành Block cuối: LỚP 9 - CHƯƠNG V - BÀI TẬP CUỐI CHƯƠNG V.');
}

insertGrade9Ch5B18().catch(console.error);
