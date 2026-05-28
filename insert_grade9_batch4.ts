import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);

async function insertGrade9Batch4() {
  console.log('Khởi tạo kết nối CSDL...');
  
  const users = await sql`SELECT user_id FROM public.questions WHERE user_id IS NOT NULL LIMIT 1`;
  const defaultUserId = users.length > 0 ? users[0].user_id : '00000000-0000-0000-0000-000000000000';

  const topics = [
    {
      name: 'Luyện tập chung.',
      questions: [
        { q: 'T9-LTC-001', c: 'Tổng các góc trong của một tứ giác lồi luôn bằng bao nhiêu độ?', a: '$360^\\circ$', s: 'Tổng các góc của tứ giác là 360 độ.', d: 'nhan_biet', o: ['$180^\\circ$', '$270^\\circ$', '$360^\\circ$', '$540^\\circ$'] },
        { q: 'T9-LTC-002', c: 'Hình nón có bán kính đáy $r=3$, chiều cao $h=4$ thì đường sinh $l$ bằng bao nhiêu?', a: '$5$', s: '$l = \\sqrt{r^2 + h^2} = \\sqrt{3^2+4^2} = 5$.', d: 'thong_hieu', o: ['$7$', '$5$', '$1$', '$12$'] },
        { q: 'T9-LTC-003', c: 'Cho $\\Delta ABC$ vuông tại $A$. Hệ thức nào sau đây ĐÚNG?', a: '$AB^2 + AC^2 = BC^2$', s: 'Định lí Pythagore.', d: 'thong_hieu', o: ['$AB^2 + BC^2 = AC^2$', '$AB^2 + AC^2 = BC^2$', '$AC^2 + BC^2 = AB^2$', '$AB + AC = BC$'] },
        { q: 'T9-LTC-004', c: 'Giải bất phương trình $-3x > 6$ ta được tập nghiệm là:', a: '$x < -2$', s: 'Chia cho $-3$ phải đổi chiều: $x < -2$.', d: 'thong_hieu', o: ['$x > -2$', '$x < -2$', '$x < 2$', '$x > 2$'] },
        { q: 'T9-LTC-005', c: 'Một hình trụ có chu vi đáy $10\\pi$, chiều cao $5$. Diện tích xung quanh của hình trụ là:', a: '$50\\pi$', s: '$S_{xq} = C \\cdot h = 10\\pi \\cdot 5 = 50\\pi$.', d: 'van_dung', o: ['$25\\pi$', '$50\\pi$', '$100\\pi$', '$10\\pi$'] }
      ]
    },
    {
      name: 'Bài tập ôn thi vào 10',
      questions: [
        { q: 'T9-ON10-001', c: 'Điều kiện để biểu thức $\\sqrt{x-1}$ có nghĩa là gì?', a: '$x \\ge 1$', s: 'Biểu thức trong căn không âm: $x-1 \\ge 0 \\Rightarrow x \\ge 1$.', d: 'nhan_biet', o: ['$x > 1$', '$x \\ge 1$', '$x < 1$', '$x \\le 1$'] },
        { q: 'T9-ON10-002', c: 'Rút gọn biểu thức $A = \\sqrt{4x} - \\sqrt{x}$ (với $x \\ge 0$) ta được kết quả là:', a: '$\\sqrt{x}$', s: '$\\sqrt{4x} = 2\\sqrt{x}$. Vậy $2\\sqrt{x} - \\sqrt{x} = \\sqrt{x}$.', d: 'thong_hieu', o: ['$3\\sqrt{x}$', '$\\sqrt{x}$', '$x$', '$-\\sqrt{x}$'] },
        { q: 'T9-ON10-003', c: 'Hàm số $y = 2x - 3$ đồng biến hay nghịch biến trên $\\mathbb{R}$?', a: 'Đồng biến', s: 'Hệ số $a = 2 > 0$ nên hàm số đồng biến.', d: 'thong_hieu', o: ['Nghịch biến', 'Đồng biến', 'Không đổi', 'Không xác định'] },
        { q: 'T9-ON10-004', c: 'Giải hệ phương trình $\\begin{cases} x+y=5 \\\\ x-y=1 \\end{cases}$, ta được nghiệm $(x; y)$ là:', a: '$(3; 2)$', s: 'Cộng hai pt: $2x=6 \\Rightarrow x=3$. Thay vào được $y=2$.', d: 'thong_hieu', o: ['$(2; 3)$', '$(3; 2)$', '$(4; 1)$', '$(1; 4)$'] },
        { q: 'T9-ON10-005', c: 'Cho đường tròn tâm $O$, từ điểm $M$ ngoài đường tròn kẻ hai tiếp tuyến $MA, MB$ ($A, B$ là các tiếp điểm). Biết $\\widehat{AMB} = 60^\\circ$. Tam giác $MAB$ là tam giác gì?', a: 'Tam giác đều', s: 'Theo tính chất 2 tiếp tuyến cắt nhau, $MA = MB$. Vậy $\\Delta MAB$ cân tại $M$. Lại có $\\widehat{AMB} = 60^\\circ$ nên là tam giác đều.', d: 'van_dung', o: ['Tam giác vuông cân', 'Tam giác tù', 'Tam giác cân nhưng không đều', 'Tam giác đều'] }
      ]
    }
  ];

  for (const topic of topics) {
    const cats = await sql`SELECT id, name FROM public.categories WHERE name ILIKE ${'%' + topic.name + '%'} AND grade = 9 LIMIT 1`;
    if (cats.length === 0) {
      console.log(`Bỏ qua: Không tìm thấy ${topic.name}`);
      continue;
    }
    const catId = cats[0].id;
    console.log(`\nĐang bơm cho ${topic.name}...`);
    
    for (const q of topic.questions) {
      const existing = await sql`SELECT id FROM public.questions WHERE question_code = ${q.q}`;
      if (existing.length === 0) {
        await sql`
          INSERT INTO public.questions (
            category_id, question_code, content, answer, solution, 
            difficulty, question_type, options, correct_answer, status, grade, topic, user_id
          ) VALUES (
            ${catId}, ${q.q}, ${q.c}, ${q.a}, ${q.s},
            ${q.d}, 'trac_nghiem', ${JSON.stringify(q.o)}::jsonb, ${q.a}, 'approved', 9, ${cats[0].name}, ${defaultUserId}
          )
        `;
        console.log(`Đã chèn: ${q.q}`);
      } else {
        console.log(`Bỏ qua: ${q.q}`);
      }
      await new Promise(r => setTimeout(r, 500));
    }
  }
  
  console.log('\n✅ Hoàn thành Batch 4 Lớp 9');
}

insertGrade9Batch4().catch(console.error);
