import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);

async function insertGrade6Batch2() {
  console.log('Khởi tạo kết nối CSDL...');
  
  const users = await sql`SELECT user_id FROM public.questions WHERE user_id IS NOT NULL LIMIT 1`;
  const defaultUserId = users.length > 0 ? users[0].user_id : '00000000-0000-0000-0000-000000000000';

  const topics = [
    {
      name: 'Bài 26. Phép nhân và phép chia phân số',
      questions: [
        { q: 'T6-C6B26-001', c: 'Muốn nhân hai phân số ta làm thế nào?', a: 'Nhân tử với tử, nhân mẫu với mẫu', s: 'Quy tắc nhân phân số: $\\frac{a}{b} \\times \\frac{c}{d} = \\frac{a \\times c}{b \\times d}$.', d: 'nhan_biet', o: ['Nhân tử với tử, giữ nguyên mẫu', 'Nhân tử với tử, nhân mẫu với mẫu', 'Cộng tử với tử, nhân mẫu với mẫu', 'Nhân chéo hai phân số'] },
        { q: 'T6-C6B26-002', c: 'Kết quả của phép tính $\\frac{2}{3} \\times \\frac{-3}{4}$ là:', a: '$\\frac{-1}{2}$', s: 'Ta có $\\frac{2 \\times (-3)}{3 \\times 4} = \\frac{-6}{12} = \\frac{-1}{2}$.', d: 'thong_hieu', o: ['$\\frac{-1}{2}$', '$\\frac{1}{2}$', '$\\frac{-6}{7}$', '$\\frac{6}{12}$'] },
        { q: 'T6-C6B26-003', c: 'Phân số nghịch đảo của phân số $\\frac{-5}{7}$ là:', a: '$\\frac{-7}{5}$', s: 'Phân số nghịch đảo của $\\frac{a}{b}$ là $\\frac{b}{a}$. Do đó nghịch đảo của $\\frac{-5}{7}$ là $\\frac{7}{-5} = \\frac{-7}{5}$.', d: 'nhan_biet', o: ['$\\frac{5}{7}$', '$\\frac{-7}{5}$', '$\\frac{7}{5}$', '$\\frac{-5}{-7}$'] },
        { q: 'T6-C6B26-004', c: 'Tính $\\frac{4}{5} : \\frac{-2}{3}$ ta được kết quả là:', a: '$\\frac{-6}{5}$', s: '$\\frac{4}{5} : \\frac{-2}{3} = \\frac{4}{5} \\times \\frac{3}{-2} = \\frac{12}{-10} = \\frac{-6}{5}$.', d: 'thong_hieu', o: ['$\\frac{-8}{15}$', '$\\frac{-6}{5}$', '$\\frac{6}{5}$', '$\\frac{-15}{8}$'] },
        { q: 'T6-C6B26-005', c: 'Tính giá trị biểu thức $\\left(\\frac{-1}{2}\\right)^2$:', a: '$\\frac{1}{4}$', s: '$\\left(\\frac{-1}{2}\\right)^2 = \\frac{-1}{2} \\times \\frac{-1}{2} = \\frac{1}{4}$.', d: 'van_dung', o: ['$\\frac{-1}{4}$', '$\\frac{1}{4}$', '$\\frac{1}{2}$', '$\\frac{-1}{2}$'] }
      ]
    },
    {
      name: 'Bài 27. Hai bài toán về phân số',
      questions: [
        { q: 'T6-C6B27-001', c: 'Muốn tìm $\\frac{m}{n}$ của một số $a$ cho trước, ta làm thế nào?', a: 'Tính $a \\times \\frac{m}{n}$', s: 'Quy tắc: Muốn tìm $\\frac{m}{n}$ của số $a$, ta tính $a \\times \\frac{m}{n}$.', d: 'nhan_biet', o: ['Tính $a : \\frac{m}{n}$', 'Tính $a \\times \\frac{m}{n}$', 'Tính $\\frac{m}{n} : a$', 'Tính $a + \\frac{m}{n}$'] },
        { q: 'T6-C6B27-002', c: 'Giá trị $\\frac{3}{4}$ của $20$ là bao nhiêu?', a: '$15$', s: 'Ta tính $20 \\times \\frac{3}{4} = \\frac{20 \\times 3}{4} = 15$.', d: 'thong_hieu', o: ['$10$', '$12$', '$15$', '$18$'] },
        { q: 'T6-C6B27-003', c: 'Muốn tìm một số biết $\\frac{m}{n}$ của nó bằng $a$, ta tính:', a: '$a : \\frac{m}{n}$', s: 'Quy tắc: Muốn tìm một số biết $\\frac{m}{n}$ của nó bằng $a$, ta tính $a : \\frac{m}{n}$.', d: 'nhan_biet', o: ['$a \\times \\frac{m}{n}$', '$\\frac{m}{n} : a$', '$a : \\frac{m}{n}$', '$a - \\frac{m}{n}$'] },
        { q: 'T6-C6B27-004', c: 'Tìm số $x$ biết $\\frac{2}{3}$ của $x$ bằng $12$:', a: '$18$', s: 'Ta có $x = 12 : \\frac{2}{3} = 12 \\times \\frac{3}{2} = 18$.', d: 'thong_hieu', o: ['$8$', '$18$', '$24$', '$36$'] },
        { q: 'T6-C6B27-005', c: 'Một lớp học có $40$ học sinh, trong đó $\\frac{1}{4}$ số học sinh là học sinh giỏi. Hỏi lớp đó có bao nhiêu học sinh giỏi?', a: '$10$', s: 'Số học sinh giỏi là $40 \\times \\frac{1}{4} = 10$ (học sinh).', d: 'van_dung', o: ['$10$', '$20$', '$30$', '$40$'] }
      ]
    },
    {
      name: 'Ôn tập chương VI',
      questions: [
        { q: 'T6-C6OT-001', c: 'Phân số $\\frac{-3}{-4}$ bằng phân số nào sau đây?', a: '$\\frac{3}{4}$', s: 'Khi đổi dấu cả tử và mẫu, ta được phân số bằng phân số đã cho: $\\frac{-3}{-4} = \\frac{3}{4}$.', d: 'nhan_biet', o: ['$\\frac{-3}{4}$', '$\\frac{3}{-4}$', '$\\frac{3}{4}$', '$\\frac{-4}{3}$'] },
        { q: 'T6-C6OT-002', c: 'Rút gọn phân số $\\frac{-12}{18}$ ta được phân số tối giản là:', a: '$\\frac{-2}{3}$', s: 'Chia cả tử và mẫu cho $6$ ta được $\\frac{-12 : 6}{18 : 6} = \\frac{-2}{3}$.', d: 'thong_hieu', o: ['$\\frac{-2}{3}$', '$\\frac{2}{-3}$', '$\\frac{-6}{9}$', '$\\frac{-4}{6}$'] },
        { q: 'T6-C6OT-003', c: 'Tổng $\\frac{-1}{3} + \\frac{1}{2}$ bằng:', a: '$\\frac{1}{6}$', s: 'Quy đồng mẫu 6: $\\frac{-2}{6} + \\frac{3}{6} = \\frac{1}{6}$.', d: 'thong_hieu', o: ['$\\frac{1}{6}$', '$\\frac{-1}{6}$', '$\\frac{5}{6}$', '$\\frac{-5}{6}$'] },
        { q: 'T6-C6OT-004', c: 'Tích $\\frac{-5}{6} \\times \\frac{3}{-10}$ bằng:', a: '$\\frac{1}{4}$', s: 'Ta có $\\frac{-5 \\times 3}{6 \\times (-10)} = \\frac{-15}{-60} = \\frac{1}{4}$.', d: 'thong_hieu', o: ['$\\frac{-1}{4}$', '$\\frac{1}{4}$', '$\\frac{1}{2}$', '$\\frac{-1}{2}$'] },
        { q: 'T6-C6OT-005', c: 'Tính hợp lý biểu thức $\\frac{2}{5} \\times \\frac{3}{7} + \\frac{2}{5} \\times \\frac{4}{7}$ ta được:', a: '$\\frac{2}{5}$', s: 'Áp dụng tính chất phân phối: $\\frac{2}{5} \\times (\\frac{3}{7} + \\frac{4}{7}) = \\frac{2}{5} \\times \\frac{7}{7} = \\frac{2}{5} \\times 1 = \\frac{2}{5}$.', d: 'van_dung', o: ['$\\frac{4}{5}$', '$\\frac{2}{7}$', '$\\frac{2}{5}$', '$\\frac{14}{25}$'] }
      ]
    },
    {
      name: 'Bài 28. Số thập phân',
      questions: [
        { q: 'T6-C7B28-001', c: 'Phân số thập phân $\\frac{-15}{100}$ được viết dưới dạng số thập phân là:', a: '$-0,15$', s: '$\\frac{-15}{100} = -0,15$.', d: 'nhan_biet', o: ['$-1,5$', '$-0,15$', '$0,15$', '$-0,015$'] },
        { q: 'T6-C7B28-002', c: 'Chữ số $3$ trong số thập phân $12,345$ thuộc hàng nào?', a: 'Hàng phần mười', s: 'Chữ số đầu tiên sau dấu phẩy là hàng phần mười. Do đó chữ số 3 thuộc hàng phần mười.', d: 'nhan_biet', o: ['Hàng đơn vị', 'Hàng chục', 'Hàng phần mười', 'Hàng phần trăm'] },
        { q: 'T6-C7B28-003', c: 'So sánh hai số thập phân $-2,5$ và $-2,15$:', a: '$-2,5 < -2,15$', s: 'Ta có $2,5 > 2,15$ nên $-2,5 < -2,15$.', d: 'thong_hieu', o: ['$-2,5 < -2,15$', '$-2,5 > -2,15$', '$-2,5 = -2,15$', 'Không thể so sánh'] },
        { q: 'T6-C7B28-004', c: 'Số thập phân $-3,05$ viết dưới dạng phân số thập phân là:', a: '$\\frac{-305}{100}$', s: '$-3,05 = \\frac{-305}{100}$.', d: 'thong_hieu', o: ['$\\frac{-35}{100}$', '$\\frac{-305}{10}$', '$\\frac{-305}{100}$', '$\\frac{-305}{1000}$'] },
        { q: 'T6-C7B28-005', c: 'Sắp xếp các số $1,2; -0,5; 0; -1,5$ theo thứ tự tăng dần:', a: '$-1,5; -0,5; 0; 1,2$', s: 'Số âm luôn nhỏ hơn 0 và nhỏ hơn số dương. Trong hai số âm, số nào có phần tự nhiên và thập phân (bỏ dấu) lớn hơn thì nhỏ hơn. Ta có $-1,5 < -0,5 < 0 < 1,2$.', d: 'van_dung', o: ['$-0,5; -1,5; 0; 1,2$', '$-1,5; -0,5; 0; 1,2$', '$0; -0,5; -1,5; 1,2$', '$-1,5; 0; -0,5; 1,2$'] }
      ]
    },
    {
      name: 'Bài 29. Tính toán với số thập phân',
      questions: [
        { q: 'T6-C7B29-001', c: 'Tổng của hai số thập phân âm là:', a: 'Một số thập phân âm', s: 'Cộng hai số âm ta thu được một số âm.', d: 'nhan_biet', o: ['Một số thập phân dương', 'Một số thập phân âm', 'Số $0$', 'Không xác định được dấu'] },
        { q: 'T6-C7B29-002', c: 'Tính $2,5 + 3,14$:', a: '$5,64$', s: '$2,5 + 3,14 = 2,50 + 3,14 = 5,64$.', d: 'thong_hieu', o: ['$5,39$', '$5,64$', '$5,19$', '$6,64$'] },
        { q: 'T6-C7B29-003', c: 'Tính tích $(-1,2) \\times 0,5$:', a: '$-0,6$', s: '$(-1,2) \\times 0,5 = -0,6$.', d: 'thong_hieu', o: ['$-0,6$', '$0,6$', '$-6,0$', '$-0,06$'] },
        { q: 'T6-C7B29-004', c: 'Thực hiện phép tính $(-2,4) : 0,6$:', a: '$-4$', s: '$(-2,4) : 0,6 = - (2,4 : 0,6) = -4$.', d: 'thong_hieu', o: ['$-4$', '$4$', '$-0,4$', '$0,4$'] },
        { q: 'T6-C7B29-005', c: 'Tính hợp lý biểu thức $1,2 \\times 3,5 + 1,2 \\times 6,5$:', a: '$12$', s: '$1,2 \\times (3,5 + 6,5) = 1,2 \\times 10 = 12$.', d: 'van_dung', o: ['$12$', '$1,2$', '$120$', '$10$'] }
      ]
    },
    {
      name: 'Bài 30. Làm tròn và ước lượng',
      questions: [
        { q: 'T6-C7B30-001', c: 'Làm tròn số $12,345$ đến hàng phần mười ta được số nào?', a: '$12,3$', s: 'Chữ số hàng phần trăm là $4 < 5$ nên ta giữ nguyên chữ số hàng phần mười. Kết quả là $12,3$.', d: 'nhan_biet', o: ['$12,3$', '$12,4$', '$12,35$', '$12,34$'] },
        { q: 'T6-C7B30-002', c: 'Làm tròn số $15,67$ đến hàng đơn vị ta được:', a: '$16$', s: 'Chữ số hàng phần mười là $6 \\ge 5$ nên ta cộng thêm 1 vào hàng đơn vị. Kết quả là $16$.', d: 'thong_hieu', o: ['$15$', '$16$', '$15,6$', '$15,7$'] },
        { q: 'T6-C7B30-003', c: 'Ước lượng kết quả phép tính $4,9 \\times 6,1$ là khoảng bao nhiêu?', a: '$30$', s: '$4,9 \\approx 5$ và $6,1 \\approx 6$. Tích ước lượng là $5 \\times 6 = 30$.', d: 'thong_hieu', o: ['$24$', '$35$', '$30$', '$28$'] },
        { q: 'T6-C7B30-004', c: 'Làm tròn số $123,456$ với độ chính xác $0,05$ (tức là làm tròn đến hàng phần mười):', a: '$123,5$', s: 'Làm tròn đến hàng phần mười: chữ số hàng phần trăm là $5$ nên cộng 1 vào hàng phần mười $\\Rightarrow 123,5$.', d: 'thong_hieu', o: ['$123,4$', '$123,5$', '$123,45$', '$123,46$'] },
        { q: 'T6-C7B30-005', c: 'Số dân của một tỉnh là $1\\,234\\,567$. Làm tròn đến hàng nghìn ta được:', a: '$1\\,235\\,000$', s: 'Hàng làm tròn là hàng nghìn (chữ số 4). Chữ số ngay sau (hàng trăm) là $5 \\ge 5$ nên cộng thêm 1 vào hàng nghìn. Các chữ số hàng trăm, chục, đơn vị thay bằng chữ số 0. Kết quả là $1\\,235\\,000$.', d: 'van_dung', o: ['$1\\,234\\,000$', '$1\\,235\\,000$', '$1\\,230\\,000$', '$1\\,240\\,000$'] }
      ]
    },
    {
      name: 'Ôn tập chương VII',
      questions: [
        { q: 'T6-C7OT-001', c: 'Số đối của số thập phân $3,14$ là:', a: '$-3,14$', s: 'Số đối của $a$ là $-a$. Do đó số đối của $3,14$ là $-3,14$.', d: 'nhan_biet', o: ['$3,14$', '$-3,14$', '$\\frac{1}{3,14}$', '$-1$'] },
        { q: 'T6-C7OT-002', c: 'Phân số $\\frac{3}{4}$ viết dưới dạng số thập phân là:', a: '$0,75$', s: 'Ta có $3 : 4 = 0,75$.', d: 'thong_hieu', o: ['$0,34$', '$0,43$', '$0,75$', '$3,4$'] },
        { q: 'T6-C7OT-003', c: 'Kết quả của phép tính $1,5 - 2,25$ là:', a: '$-0,75$', s: '$1,5 - 2,25 = 1,50 - 2,25 = -0,75$.', d: 'thong_hieu', o: ['$0,75$', '$-0,75$', '$-1,25$', '$3,75$'] },
        { q: 'T6-C7OT-004', c: 'Làm tròn số $-3,14159$ đến chữ số thập phân thứ hai là:', a: '$-3,14$', s: 'Chữ số thập phân thứ ba là $1 < 5$ nên giữ nguyên chữ số thập phân thứ hai. Kết quả là $-3,14$.', d: 'thong_hieu', o: ['$-3,14$', '$-3,15$', '$-3,1$', '$-3,142$'] },
        { q: 'T6-C7OT-005', c: 'Một thanh gỗ dài $3,5$m. Người ta cắt đi $\\frac{1}{5}$ chiều dài thanh gỗ. Phần còn lại dài bao nhiêu mét?', a: '$2,8$ m', s: 'Phần cắt đi dài $3,5 \\times \\frac{1}{5} = 0,7$ (m). Phần còn lại dài $3,5 - 0,7 = 2,8$ (m).', d: 'van_dung', o: ['$2,5$ m', '$3,0$ m', '$2,8$ m', '$0,7$ m'] }
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
  
  console.log('\n✅ Hoàn thành Batch 2 Lớp 6');
}

insertGrade6Batch2().catch(console.error);
