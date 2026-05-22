import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);

async function insertGrade9Ch1B3() {
  console.log('Khởi tạo kết nối CSDL...');
  
  const categoryId = '5e72ba56-0fd3-4d2e-a9c7-1eb09a7bfd9d'; // Bài 3. Giải bài toán bằng cách lập hệ phương trình.
  const topicName = 'Bài 3. Giải bài toán bằng cách lập hệ phương trình.';

  // Fetch an existing user_id to use
  const users = await sql`SELECT user_id FROM public.questions WHERE user_id IS NOT NULL LIMIT 1`;
  const defaultUserId = users.length > 0 ? users[0].user_id : '00000000-0000-0000-0000-000000000000';

  const questions = [
    {
      question_code: 'T9-C1B3-NEW-001',
      content: 'Bước đầu tiên trong quy trình giải bài toán bằng cách lập hệ phương trình là gì?',
      answer: 'Chọn ẩn số và đặt điều kiện thích hợp cho ẩn',
      solution: 'Quy trình giải bài toán bằng cách lập hệ phương trình gồm 3 bước. Bước 1 là lập hệ phương trình, trong đó việc đầu tiên phải làm là chọn ẩn số và đặt điều kiện thích hợp cho các ẩn đó. Do đó phương án đúng là Chọn ẩn số và đặt điều kiện thích hợp cho ẩn.',
      difficulty: 'nhan_biet',
      question_type: 'trac_nghiem',
      options: JSON.stringify([
        'Giải hệ phương trình', 
        'Lập hệ phương trình', 
        'Chọn ẩn số và đặt điều kiện thích hợp cho ẩn', 
        'Kiểm tra điều kiện và kết luận'
      ]),
      correct_answer: 'Chọn ẩn số và đặt điều kiện thích hợp cho ẩn',
      status: 'approved',
      grade: 9
    },
    {
      question_code: 'T9-C1B3-NEW-002',
      content: 'Hai số nguyên có tổng bằng 15 và hiệu bằng 3. Gọi hai số đó là $x$ và $y$ ($x > y$). Hệ phương trình diễn tả bài toán trên là:',
      answer: '$\\begin{cases} x + y = 15 \\\\ x - y = 3 \\end{cases}$',
      solution: 'Tổng của hai số là 15 nên ta có phương trình $x + y = 15$. Hiệu của hai số là 3 (với $x > y$) nên ta có phương trình $x - y = 3$. Hệ phương trình lập được là: $\\begin{cases} x + y = 15 \\\\ x - y = 3 \\end{cases}$.',
      difficulty: 'thong_hieu',
      question_type: 'trac_nghiem',
      options: JSON.stringify([
        '$\\begin{cases} x + y = 15 \\\\ x - y = 3 \\end{cases}$', 
        '$\\begin{cases} x + y = 3 \\\\ x - y = 15 \\end{cases}$', 
        '$\\begin{cases} x - y = 15 \\\\ x + y = 3 \\end{cases}$', 
        '$\\begin{cases} xy = 15 \\\\ x/y = 3 \\end{cases}$'
      ]),
      correct_answer: '$\\begin{cases} x + y = 15 \\\\ x - y = 3 \\end{cases}$',
      status: 'approved',
      grade: 9
    },
    {
      question_code: 'T9-C1B3-NEW-003',
      content: 'Một mảnh vườn hình chữ nhật có chu vi là 40m. Chiều dài hơn chiều rộng 4m. Nếu gọi chiều dài là $x$ (m) và chiều rộng là $y$ (m) ($x > y > 0$). Hệ phương trình nào sau đây đúng?',
      answer: '$\\begin{cases} 2(x + y) = 40 \\\\ x - y = 4 \\end{cases}$',
      solution: 'Chu vi hình chữ nhật là $2 \\times (\\text{chiều dài} + \\text{chiều rộng})$, do đó $2(x + y) = 40$. Chiều dài hơn chiều rộng 4m nên $x - y = 4$. Hệ phương trình đúng là $\\begin{cases} 2(x + y) = 40 \\\\ x - y = 4 \\end{cases}$.',
      difficulty: 'thong_hieu',
      question_type: 'trac_nghiem',
      options: JSON.stringify([
        '$\\begin{cases} x + y = 40 \\\\ x - y = 4 \\end{cases}$', 
        '$\\begin{cases} 2(x + y) = 40 \\\\ x - y = 4 \\end{cases}$', 
        '$\\begin{cases} x + y = 40 \\\\ y - x = 4 \\end{cases}$', 
        '$\\begin{cases} 2(x + y) = 40 \\\\ y - x = 4 \\end{cases}$'
      ]),
      correct_answer: '$\\begin{cases} 2(x + y) = 40 \\\\ x - y = 4 \\end{cases}$',
      status: 'approved',
      grade: 9
    },
    {
      question_code: 'T9-C1B3-NEW-004',
      content: 'Hai vòi nước cùng chảy vào một bể không có nước thì sau 4 giờ đầy bể. Nếu vòi 1 chảy một mình trong 2 giờ và vòi 2 chảy một mình trong 3 giờ thì được $\\frac{7}{12}$ bể. Gọi thời gian vòi 1 và vòi 2 chảy một mình đầy bể lần lượt là $x$ và $y$ (giờ). Phương trình nào sau đây thể hiện giả thiết "cùng chảy sau 4 giờ đầy bể"?',
      answer: '$\\frac{1}{x} + \\frac{1}{y} = \\frac{1}{4}$',
      solution: 'Trong 1 giờ, vòi 1 chảy được $\\frac{1}{x}$ bể, vòi 2 chảy được $\\frac{1}{y}$ bể. Cả hai vòi cùng chảy trong 4 giờ thì đầy bể, nghĩa là 1 giờ cả hai vòi chảy được $\\frac{1}{4}$ bể. Do đó ta có phương trình: $\\frac{1}{x} + \\frac{1}{y} = \\frac{1}{4}$.',
      difficulty: 'van_dung',
      question_type: 'trac_nghiem',
      options: JSON.stringify([
        '$x + y = 4$', 
        '$4x + 4y = 1$', 
        '$\\frac{1}{x} + \\frac{1}{y} = \\frac{1}{4}$', 
        '$\\frac{4}{x} + \\frac{4}{y} = 4$'
      ]),
      correct_answer: '$\\frac{1}{x} + \\frac{1}{y} = \\frac{1}{4}$',
      status: 'approved',
      grade: 9
    },
    {
      question_code: 'T9-C1B3-NEW-005',
      content: 'Một số có hai chữ số. Tổng của hai chữ số đó là 10. Nếu đổi chỗ hai chữ số cho nhau thì được một số mới lớn hơn số ban đầu là 18. Tìm số ban đầu.',
      answer: '46',
      solution: 'Gọi chữ số hàng chục là $x$, hàng đơn vị là $y$ ($0 < x \\le 9, 0 \\le y \\le 9, x, y \\in \\mathbb{N}$). Tổng hai chữ số là 10 nên $x + y = 10$. Số ban đầu là $10x + y$, số mới là $10y + x$. Số mới lớn hơn số ban đầu 18 nên: $(10y + x) - (10x + y) = 18 \\Leftrightarrow 9y - 9x = 18 \\Leftrightarrow y - x = 2$. Giải hệ $\\begin{cases} x + y = 10 \\\\ -x + y = 2 \\end{cases}$ ta được $x = 4, y = 6$. Vậy số cần tìm là 46.',
      difficulty: 'van_dung',
      question_type: 'trac_nghiem',
      options: JSON.stringify(['28', '37', '46', '64']),
      correct_answer: '46',
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
  
  console.log('✅ Hoàn thành Block 3: LỚP 9 - CHƯƠNG I - BÀI 3.');
}

insertGrade9Ch1B3().catch(console.error);
