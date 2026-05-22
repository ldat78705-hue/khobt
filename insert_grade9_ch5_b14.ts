import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);

async function insertGrade9Ch5B14() {
  console.log('Khởi tạo kết nối CSDL...');
  
  const categoryId = 'ef9860a5-4c55-43a4-aed7-672c70232069'; // Bài 14. Cung và dây của một đường tròn.
  const topicName = 'Bài 14. Cung và dây của một đường tròn.';

  // Fetch an existing user_id to use
  const users = await sql`SELECT user_id FROM public.questions WHERE user_id IS NOT NULL LIMIT 1`;
  const defaultUserId = users.length > 0 ? users[0].user_id : '00000000-0000-0000-0000-000000000000';

  const questions = [
    {
      question_code: 'T9-C5B14-NEW-001',
      content: 'Khẳng định nào sau đây là sai khi nói về đường kính và dây cung của đường tròn?',
      answer: 'Đường kính đi qua trung điểm của một dây thì vuông góc với dây đó.',
      solution: 'Khẳng định "Đường kính đi qua trung điểm của một dây thì vuông góc với dây đó" là SAI vì định lý này chỉ đúng với dây KHÔNG ĐI QUA TÂM. Nếu dây bị cắt cũng là đường kính thì hai đường kính cắt nhau tại trung điểm của mỗi đường nhưng không nhất thiết phải vuông góc với nhau.',
      difficulty: 'nhan_biet',
      question_type: 'trac_nghiem',
      options: JSON.stringify([
        'Đường kính là dây cung lớn nhất của đường tròn.', 
        'Trong hai dây, dây nào lớn hơn thì gần tâm hơn.', 
        'Đường kính đi qua trung điểm của một dây thì vuông góc với dây đó.', 
        'Đường kính vuông góc với một dây thì đi qua trung điểm của dây đó.'
      ]),
      correct_answer: 'Đường kính đi qua trung điểm của một dây thì vuông góc với dây đó.',
      status: 'approved',
      grade: 9
    },
    {
      question_code: 'T9-C5B14-NEW-002',
      content: 'Cho đường tròn $(O; R)$ có bán kính $R = 5$ cm. Khoảng cách từ tâm $O$ đến dây cung $AB$ là $3$ cm. Độ dài dây $AB$ bằng:',
      answer: '$8$ cm',
      solution: 'Gọi $H$ là chân đường vuông góc kẻ từ $O$ đến dây $AB$. Khi đó $OH = 3$ cm. Theo định lý quan hệ vuông góc giữa đường kính và dây cung, $H$ là trung điểm của $AB$. Áp dụng định lý Pythagore trong tam giác vuông $OHA$, ta có: $AH = \\sqrt{OA^2 - OH^2} = \\sqrt{5^2 - 3^2} = \\sqrt{16} = 4$ cm. Vậy độ dài dây cung $AB = 2 \\cdot AH = 2 \\cdot 4 = 8$ cm.',
      difficulty: 'thong_hieu',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['$4$ cm', '$5$ cm', '$8$ cm', '$10$ cm']),
      correct_answer: '$8$ cm',
      status: 'approved',
      grade: 9
    },
    {
      question_code: 'T9-C5B14-NEW-003',
      content: 'Trong cùng một đường tròn, hai dây bằng nhau thì:',
      answer: 'Cả A và C đều đúng',
      solution: 'Theo định lý liên hệ giữa cung và dây: "Trong cùng một đường tròn, hai dây bằng nhau thì căng hai cung nhỏ bằng nhau". Mặt khác, theo định lý liên hệ giữa dây và khoảng cách đến tâm: "Hai dây bằng nhau thì cách đều tâm". Do đó cả A và C đều đúng.',
      difficulty: 'thong_hieu',
      question_type: 'trac_nghiem',
      options: JSON.stringify([
        'Căng hai cung nhỏ bằng nhau.', 
        'Căng hai cung bằng nhau.', 
        'Cách đều tâm.', 
        'Cả A và C đều đúng'
      ]),
      correct_answer: 'Cả A và C đều đúng',
      status: 'approved',
      grade: 9
    },
    {
      question_code: 'T9-C5B14-NEW-004',
      content: 'Cho đường tròn $(O; R)$ có hai dây $AB$ và $CD$ không đi qua tâm. Biết khoảng cách từ $O$ đến $AB$ là $OH = 4$ cm, khoảng cách từ $O$ đến $CD$ là $OK = 5$ cm. Khẳng định nào sau đây đúng?',
      answer: '$AB > CD$',
      solution: 'Theo định lý liên hệ giữa khoảng cách từ tâm đến dây: Trong hai dây của một đường tròn, dây nào gần tâm hơn thì dây đó lớn hơn. Vì $OH = 4$ cm $< OK = 5$ cm nên dây $AB$ nằm gần tâm hơn dây $CD$. Do đó độ dài dây $AB > CD$.',
      difficulty: 'van_dung',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['$AB = CD$', '$AB < CD$', '$AB > CD$', 'Không thể so sánh']),
      correct_answer: '$AB > CD$',
      status: 'approved',
      grade: 9
    },
    {
      question_code: 'T9-C5B14-NEW-005',
      content: 'Cho đường tròn $(O; 10 \\text{ cm})$. Hai dây $AB$ và $CD$ song song với nhau và nằm về hai phía của tâm $O$. Biết $AB = 16$ cm và $CD = 12$ cm. Khoảng cách giữa hai dây $AB$ và $CD$ là:',
      answer: '$14$ cm',
      solution: 'Kẻ đường thẳng đi qua tâm $O$ vuông góc với $AB$ tại $H$ và $CD$ tại $K$. Vì $AB \\parallel CD$ nên $H, O, K$ thẳng hàng. \nVì $H$ và $K$ là trung điểm của $AB$ và $CD$, ta có $AH = \\frac{16}{2} = 8$ cm, $CK = \\frac{12}{2} = 6$ cm. \nÁp dụng định lý Pythagore cho các tam giác vuông:\n- $\\Delta OHA$: $OH = \\sqrt{OA^2 - AH^2} = \\sqrt{10^2 - 8^2} = \\sqrt{36} = 6$ cm.\n- $\\Delta OKC$: $OK = \\sqrt{OC^2 - CK^2} = \\sqrt{10^2 - 6^2} = \\sqrt{64} = 8$ cm.\nVì $AB$ và $CD$ nằm về hai phía của $O$ nên khoảng cách giữa hai dây là $HK = OH + OK = 6 + 8 = 14$ cm.',
      difficulty: 'van_dung',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['$14$ cm', '$2$ cm', '$8$ cm', '$6$ cm']),
      correct_answer: '$14$ cm',
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
  
  console.log('✅ Hoàn thành Block: LỚP 9 - CHƯƠNG V - BÀI 14.');
}

insertGrade9Ch5B14().catch(console.error);
