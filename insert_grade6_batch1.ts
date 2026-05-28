import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);

async function insertGrade6Batch1() {
  console.log('Khởi tạo kết nối CSDL...');
  
  const users = await sql`SELECT user_id FROM public.questions WHERE user_id IS NOT NULL LIMIT 1`;
  const defaultUserId = users.length > 0 ? users[0].user_id : '00000000-0000-0000-0000-000000000000';

  const topics = [
    {
      name: 'Bài 22. Hình có tâm đối xứng',
      questions: [
        { q: 'T6-C5B22-001', c: 'Hình nào sau đây có tâm đối xứng?', a: 'Hình chữ nhật', s: 'Hình chữ nhật có tâm đối xứng là giao điểm của hai đường chéo.', d: 'nhan_biet', o: ['Hình thang cân', 'Hình tam giác đều', 'Hình chữ nhật', 'Hình thang vuông'] },
        { q: 'T6-C5B22-002', c: 'Tâm đối xứng của hình tròn là:', a: 'Tâm của hình tròn', s: 'Tâm của hình tròn chính là tâm đối xứng của nó.', d: 'nhan_biet', o: ['Một điểm bất kì trên đường tròn', 'Tâm của hình tròn', 'Không có tâm đối xứng', 'Giao điểm của hai dây cung bất kì'] },
        { q: 'T6-C5B22-003', c: 'Hình bình hành có bao nhiêu tâm đối xứng?', a: '$1$', s: 'Hình bình hành có 1 tâm đối xứng là giao điểm của hai đường chéo.', d: 'thong_hieu', o: ['$0$', '$1$', '$2$', '$4$'] },
        { q: 'T6-C5B22-004', c: 'Chữ cái in hoa nào sau đây có tâm đối xứng?', a: 'Chữ H', s: 'Chữ H có tâm đối xứng. Các chữ A, M, K không có tâm đối xứng.', d: 'thong_hieu', o: ['Chữ A', 'Chữ M', 'Chữ K', 'Chữ H'] },
        { q: 'T6-C5B22-005', c: 'Trong các hình: Hình vuông, hình thoi, hình tam giác đều, hình lục giác đều, hình nào KHÔNG có tâm đối xứng?', a: 'Hình tam giác đều', s: 'Hình tam giác đều không có tâm đối xứng (nó chỉ có 3 trục đối xứng).', d: 'van_dung', o: ['Hình vuông', 'Hình thoi', 'Hình tam giác đều', 'Hình lục giác đều'] }
      ]
    },
    {
      name: 'Ôn tập chương V',
      questions: [
        { q: 'T6-C5OT-001', c: 'Hình nào vừa có trục đối xứng vừa có tâm đối xứng?', a: 'Hình vuông', s: 'Hình vuông có 4 trục đối xứng và 1 tâm đối xứng.', d: 'nhan_biet', o: ['Hình tam giác đều', 'Hình bình hành', 'Hình vuông', 'Hình thang cân'] },
        { q: 'T6-C5OT-002', c: 'Hình lục giác đều có bao nhiêu trục đối xứng?', a: '$6$ trục', s: 'Hình lục giác đều có 6 trục đối xứng (3 đường chéo chính và 3 đường nối trung điểm các cạnh đối diện).', d: 'nhan_biet', o: ['$3$ trục', '$4$ trục', '$6$ trục', '$8$ trục'] },
        { q: 'T6-C5OT-003', c: 'Biển báo giao thông hình tròn có tâm đối xứng không?', a: 'Có (nếu họa tiết bên trong cũng có tâm đối xứng)', s: 'Bản thân hình tròn có tâm đối xứng. Biển báo sẽ có tâm đối xứng nếu họa tiết bên trong cũng đối xứng qua tâm.', d: 'thong_hieu', o: ['Luôn luôn không có', 'Luôn luôn có', 'Có (nếu họa tiết bên trong cũng có tâm đối xứng)', 'Chỉ biển báo hình tam giác mới có'] },
        { q: 'T6-C5OT-004', c: 'Trục đối xứng của hình thang cân là:', a: 'Đường thẳng đi qua trung điểm của hai đáy', s: 'Hình thang cân có 1 trục đối xứng là đường thẳng đi qua trung điểm hai đáy.', d: 'thong_hieu', o: ['Đường chéo', 'Đường thẳng đi qua trung điểm của hai đáy', 'Đường thẳng đi qua hai đỉnh đối diện', 'Đường thẳng nối trung điểm hai cạnh bên'] },
        { q: 'T6-C5OT-005', c: 'Chữ cái in hoa nào vừa có trục đối xứng vừa có tâm đối xứng?', a: 'Chữ O', s: 'Chữ O (như hình tròn hoặc elip) vừa có trục đối xứng vừa có tâm đối xứng.', d: 'van_dung', o: ['Chữ A', 'Chữ N', 'Chữ O', 'Chữ C'] }
      ]
    },
    {
      name: 'Bài 23. Mở rộng phân số. Phân số bằng nhau',
      questions: [
        { q: 'T6-C6B23-001', c: 'Phân số $\\frac{a}{b}$ tồn tại khi:', a: '$a, b \\in \\mathbb{Z}$ và $b \\neq 0$', s: 'Phân số có dạng $\\frac{a}{b}$ với $a, b \\in \\mathbb{Z}$ và $b \\neq 0$.', d: 'nhan_biet', o: ['$a, b \\in \\mathbb{Z}$', '$a, b \\in \\mathbb{N}$', '$a, b \\in \\mathbb{Z}$ và $b \\neq 0$', '$a \\neq 0$'] },
        { q: 'T6-C6B23-002', c: 'Hai phân số $\\frac{a}{b}$ và $\\frac{c}{d}$ bằng nhau khi nào?', a: '$a \\cdot d = b \\cdot c$', s: 'Theo định nghĩa hai phân số bằng nhau: $\\frac{a}{b} = \\frac{c}{d}$ khi $a \\cdot d = b \\cdot c$.', d: 'nhan_biet', o: ['$a \\cdot c = b \\cdot d$', '$a \\cdot d = b \\cdot c$', '$a + d = b + c$', '$a - d = b - c$'] },
        { q: 'T6-C6B23-003', c: 'Phân số nào sau đây bằng phân số $\\frac{-3}{4}$?', a: '$\\frac{-6}{8}$', s: 'Ta có $\\frac{-3}{4} = \\frac{-3 \\times 2}{4 \\times 2} = \\frac{-6}{8}$.', d: 'thong_hieu', o: ['$\\frac{3}{-4}$', '$\\frac{-6}{8}$', '$\\frac{6}{-8}$', 'Cả 3 phân án trên đều đúng'] },
        { q: 'T6-C6B23-004', c: 'Tìm $x$ biết $\\frac{x}{5} = \\frac{-2}{10}$:', a: '$x = -1$', s: 'Ta có $x \\cdot 10 = 5 \\cdot (-2) \\Rightarrow 10x = -10 \\Rightarrow x = -1$.', d: 'thong_hieu', o: ['$x = 1$', '$x = -1$', '$x = 2$', '$x = -2$'] },
        { q: 'T6-C6B23-005', c: 'Tử số và mẫu số của phân số $\\frac{-15}{20}$ cùng chia hết cho số lớn nhất là bao nhiêu để được phân số tối giản?', a: '$5$', s: 'ƯCLN của $15$ và $20$ là $5$. Cùng chia cho 5 ta được phân số tối giản $\\frac{-3}{4}$.', d: 'van_dung', o: ['$2$', '$3$', '$4$', '$5$'] }
      ]
    },
    {
      name: 'Bài 24. So sánh phân số. Hỗn số dương',
      questions: [
        { q: 'T6-C6B24-001', c: 'Trong hai phân số có cùng mẫu dương, phân số nào lớn hơn?', a: 'Phân số có tử lớn hơn', s: 'Quy tắc: Trong hai phân số có cùng mẫu dương, phân số nào có tử lớn hơn thì lớn hơn.', d: 'nhan_biet', o: ['Phân số có tử lớn hơn', 'Phân số có tử bé hơn', 'Hai phân số bằng nhau', 'Không thể so sánh'] },
        { q: 'T6-C6B24-002', c: 'Hỗn số $2\\frac{1}{3}$ được viết dưới dạng phân số là:', a: '$\\frac{7}{3}$', s: 'Ta có $2\\frac{1}{3} = \\frac{2 \\times 3 + 1}{3} = \\frac{7}{3}$.', d: 'nhan_biet', o: ['$\\frac{5}{3}$', '$\\frac{7}{3}$', '$\\frac{6}{3}$', '$\\frac{2}{3}$'] },
        { q: 'T6-C6B24-003', c: 'So sánh hai phân số $\\frac{-3}{5}$ và $\\frac{-2}{5}$:', a: '$\\frac{-3}{5} < \\frac{-2}{5}$', s: 'Vì mẫu chung là $5 > 0$ và $-3 < -2$ nên $\\frac{-3}{5} < \\frac{-2}{5}$.', d: 'thong_hieu', o: ['$\\frac{-3}{5} < \\frac{-2}{5}$', '$\\frac{-3}{5} > \\frac{-2}{5}$', '$\\frac{-3}{5} = \\frac{-2}{5}$', 'Không thể so sánh'] },
        { q: 'T6-C6B24-004', c: 'Phân số $\\frac{11}{4}$ viết dưới dạng hỗn số là:', a: '$2\\frac{3}{4}$', s: 'Ta có $11 : 4 = 2$ dư $3$. Vậy $\\frac{11}{4} = 2\\frac{3}{4}$.', d: 'thong_hieu', o: ['$3\\frac{1}{4}$', '$2\\frac{1}{4}$', '$2\\frac{3}{4}$', '$1\\frac{3}{4}$'] },
        { q: 'T6-C6B24-005', c: 'Sắp xếp các phân số $\\frac{1}{2}; \\frac{-1}{3}; \\frac{5}{6}$ theo thứ tự tăng dần:', a: '$\\frac{-1}{3}; \\frac{1}{2}; \\frac{5}{6}$', s: 'Quy đồng mẫu 6: $\\frac{1}{2} = \\frac{3}{6}; \\frac{-1}{3} = \\frac{-2}{6}; \\frac{5}{6}$. So sánh tử: $-2 < 3 < 5$.', d: 'van_dung', o: ['$\\frac{-1}{3}; \\frac{1}{2}; \\frac{5}{6}$', '$\\frac{1}{2}; \\frac{-1}{3}; \\frac{5}{6}$', '$\\frac{-1}{3}; \\frac{5}{6}; \\frac{1}{2}$', '$\\frac{5}{6}; \\frac{1}{2}; \\frac{-1}{3}$'] }
      ]
    },
    {
      name: 'Bài 25. Phép cộng và phép trừ phân số',
      questions: [
        { q: 'T6-C6B25-001', c: 'Muốn cộng hai phân số cùng mẫu số, ta làm thế nào?', a: 'Cộng tử với tử và giữ nguyên mẫu', s: 'Quy tắc cộng hai phân số cùng mẫu: Cộng các tử số với nhau và giữ nguyên mẫu số.', d: 'nhan_biet', o: ['Cộng tử với tử, mẫu với mẫu', 'Cộng tử với tử và giữ nguyên mẫu', 'Nhân tử với tử và giữ nguyên mẫu', 'Giữ nguyên tử, cộng mẫu với mẫu'] },
        { q: 'T6-C6B25-002', c: 'Số đối của phân số $\\frac{-4}{7}$ là:', a: '$\\frac{4}{7}$', s: 'Số đối của phân số $\\frac{-4}{7}$ là phân số $\\frac{4}{7}$.', d: 'nhan_biet', o: ['$\\frac{-7}{4}$', '$\\frac{4}{7}$', '$\\frac{7}{4}$', '$\\frac{-4}{7}$'] },
        { q: 'T6-C6B25-003', c: 'Kết quả của phép tính $\\frac{2}{5} + \\frac{-3}{5}$ là:', a: '$\\frac{-1}{5}$', s: 'Ta có $\\frac{2}{5} + \\frac{-3}{5} = \\frac{2 + (-3)}{5} = \\frac{-1}{5}$.', d: 'thong_hieu', o: ['$\\frac{1}{5}$', '$\\frac{-1}{5}$', '$\\frac{5}{5}$', '$\\frac{-5}{5}$'] },
        { q: 'T6-C6B25-004', c: 'Tính $\\frac{1}{2} - \\frac{1}{3}$:', a: '$\\frac{1}{6}$', s: 'Quy đồng mẫu chung 6: $\\frac{3}{6} - \\frac{2}{6} = \\frac{1}{6}$.', d: 'thong_hieu', o: ['$\\frac{1}{6}$', '$\\frac{2}{6}$', '$\\frac{-1}{6}$', '$\\frac{5}{6}$'] },
        { q: 'T6-C6B25-005', c: 'Tìm $x$ biết $x + \\frac{1}{4} = \\frac{3}{8}$:', a: '$x = \\frac{1}{8}$', s: 'Ta có $x = \\frac{3}{8} - \\frac{1}{4} = \\frac{3}{8} - \\frac{2}{8} = \\frac{1}{8}$.', d: 'van_dung', o: ['$x = \\frac{5}{8}$', '$x = \\frac{1}{8}$', '$x = \\frac{-1}{8}$', '$x = \\frac{1}{4}$'] }
      ]
    }
  ];

  for (const topic of topics) {
    const cats = await sql`SELECT id, name FROM public.categories WHERE name ILIKE ${'%' + topic.name + '%'} AND grade = 6 LIMIT 1`;
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
            ${q.d}, 'trac_nghiem', ${JSON.stringify(q.o)}::jsonb, ${q.a}, 'approved', 6, ${cats[0].name}, ${defaultUserId}
          )
        `;
        console.log(`Đã chèn: ${q.q}`);
      } else {
        console.log(`Bỏ qua: ${q.q}`);
      }
      await new Promise(r => setTimeout(r, 500));
    }
  }
  
  console.log('\n✅ Hoàn thành Batch 1 Lớp 6');
}

insertGrade6Batch1().catch(console.error);
