import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);

async function insertGrade5Batch1() {
  console.log('Khởi tạo kết nối CSDL...');
  
  const users = await sql`SELECT user_id FROM public.questions WHERE user_id IS NOT NULL LIMIT 1`;
  const defaultUserId = users.length > 0 ? users[0].user_id : '00000000-0000-0000-0000-000000000000';

  const topics = [
    {
      name: 'Bài 1: Ôn tập số tự nhiên',
      questions: [
        { q: 'T5-B1-001', c: 'Số $123 456 789$ có bao nhiêu lớp?', a: '$3$ lớp', s: 'Đó là lớp triệu, lớp nghìn, lớp đơn vị.', d: 'nhan_biet', o: ['$2$ lớp', '$3$ lớp', '$4$ lớp', '$9$ lớp'] },
        { q: 'T5-B1-002', c: 'Trong số $987 654 321$, chữ số $8$ thuộc hàng nào?', a: 'Hàng chục triệu', s: 'Vị trí thứ $8$ từ phải sang trái.', d: 'thong_hieu', o: ['Hàng triệu', 'Hàng chục triệu', 'Hàng trăm triệu', 'Hàng trăm nghìn'] },
        { q: 'T5-B1-003', c: 'Số lớn nhất có sáu chữ số khác nhau là số nào?', a: '$987 654$', s: 'Xếp các chữ số lớn nhất từ trái sang phải.', d: 'thong_hieu', o: ['$999 999$', '$987 654$', '$102 345$', '$123 456$'] },
        { q: 'T5-B1-004', c: 'Dãy số tự nhiên liên tiếp bắt đầu từ số nào?', a: 'Số $0$', s: 'Dãy số tự nhiên là $0, 1, 2, 3,...$', d: 'nhan_biet', o: ['Số $1$', 'Số $0$', 'Không có số bắt đầu', 'Số lớn nhất'] },
        { q: 'T5-B1-005', c: 'Số liền trước của $1 000 000$ là số nào?', a: '$999 999$', s: '$1 000 000 - 1 = 999 999$.', d: 'van_dung', o: ['$1 000 001$', '$999 999$', '$999 998$', '$100 000$'] }
      ]
    },
    {
      name: 'Bài 2: Ôn tập các phép tính với số tự nhiên',
      questions: [
        { q: 'T5-B2-001', c: 'Biểu thức $a + b = b + a$ thể hiện tính chất gì?', a: 'Tính chất giao hoán của phép cộng', s: 'Đổi chỗ hai số hạng tổng không đổi.', d: 'nhan_biet', o: ['Tính chất kết hợp của phép cộng', 'Tính chất giao hoán của phép cộng', 'Tính chất giao hoán của phép nhân', 'Tính chất phân phối'] },
        { q: 'T5-B2-002', c: 'Tính: $125 \\times 8 = ?$?', a: '$1000$', s: '$125 \\times 8 = 1000$.', d: 'thong_hieu', o: ['$100$', '$1000$', '$10 000$', '$1250$'] },
        { q: 'T5-B2-003', c: 'Tính: $1000 : 8 = ?$?', a: '$125$', s: 'Ngược lại của phép tính trên.', d: 'thong_hieu', o: ['$120$', '$125$', '$135$', '$150$'] },
        { q: 'T5-B2-004', c: 'Tìm $x$ biết $x - 200 = 500$:', a: '$700$', s: '$x = 500 + 200 = 700$.', d: 'van_dung', o: ['$300$', '$700$', '$500$', '$1000$'] },
        { q: 'T5-B2-005', c: 'Biểu thức $(a + b) \\times c$ bằng biểu thức nào dưới đây?', a: '$a \\times c + b \\times c$', s: 'Tính chất nhân một tổng với một số.', d: 'van_dung', o: ['$a + b \\times c$', '$a \\times b + c$', '$a \\times c + b \\times c$', '$a \\times c + b$'] }
      ]
    },
    {
      name: 'Bài 3: Ôn tập phân số',
      questions: [
        { q: 'T5-B3-001', c: 'Phân số lớn hơn $1$ khi nào?', a: 'Tử số lớn hơn mẫu số', s: 'Điều kiện để phân số $> 1$.', d: 'nhan_biet', o: ['Tử số bé hơn mẫu số', 'Tử số lớn hơn mẫu số', 'Tử số bằng mẫu số', 'Mẫu số bằng $0$'] },
        { q: 'T5-B3-002', c: 'Rút gọn phân số $\\frac{10}{15}$ ta được phân số nào?', a: '$\\frac{2}{3}$', s: 'Chia tử và mẫu cho $5$.', d: 'thong_hieu', o: ['$\\frac{1}{2}$', '$\\frac{5}{3}$', '$\\frac{2}{3}$', '$\\frac{3}{5}$'] },
        { q: 'T5-B3-003', c: 'Quy đồng mẫu số $\\frac{1}{2}$ và $\\frac{1}{4}$, mẫu số chung nhỏ nhất là bao nhiêu?', a: '$4$', s: '$4$ chia hết cho $2$ và $4$.', d: 'thong_hieu', o: ['$2$', '$4$', '$6$', '$8$'] },
        { q: 'T5-B3-004', c: 'Trong các phân số $\\frac{2}{3}, \\frac{4}{5}, \\frac{7}{6}, \\frac{3}{3}$, phân số nào lớn hơn $1$?', a: '$\\frac{7}{6}$', s: 'Phân số có tử số $>$ mẫu số.', d: 'van_dung', o: ['$\\frac{2}{3}$', '$\\frac{4}{5}$', '$\\frac{7}{6}$', '$\\frac{3}{3}$'] },
        { q: 'T5-B3-005', c: 'Phân số nào sau đây bằng phân số $\\frac{3}{4}$?', a: '$\\frac{6}{8}$', s: 'Nhân tử và mẫu với $2$.', d: 'van_dung', o: ['$\\frac{4}{3}$', '$\\frac{6}{8}$', '$\\frac{5}{4}$', '$\\frac{9}{16}$'] }
      ]
    },
    {
      name: 'Bài 4: Phân số thập phân',
      questions: [
        { q: 'T5-B4-001', c: 'Phân số thập phân là phân số có mẫu số là các số nào?', a: '$10, 100, 1000, ...$', s: 'Định nghĩa phân số thập phân.', d: 'nhan_biet', o: ['$10, 20, 30, ...$', '$10, 100, 1000, ...$', '$2, 4, 6, 8, ...$', 'Bất kì số nào'] },
        { q: 'T5-B4-002', c: 'Phân số $\\frac{3}{10}$ được đọc là gì?', a: 'Ba phần mười', s: 'Cách đọc phân số thập phân.', d: 'nhan_biet', o: ['Ba mười', 'Mười phần ba', 'Ba phần mười', 'Ba phẩy mười'] },
        { q: 'T5-B4-003', c: 'Phân số $\\frac{1}{2}$ viết thành phân số thập phân là phân số nào?', a: '$\\frac{5}{10}$', s: 'Nhân cả tử và mẫu với $5$.', d: 'thong_hieu', o: ['$\\frac{10}{20}$', '$\\frac{5}{10}$', '$\\frac{2}{10}$', '$\\frac{50}{10}$'] },
        { q: 'T5-B4-004', c: 'Phân số $\\frac{7}{25}$ viết thành phân số thập phân có mẫu số là $100$ là phân số nào?', a: '$\\frac{28}{100}$', s: 'Nhân tử và mẫu với $4$.', d: 'van_dung', o: ['$\\frac{14}{100}$', '$\\frac{21}{100}$', '$\\frac{28}{100}$', '$\\frac{35}{100}$'] },
        { q: 'T5-B4-005', c: 'Phân số thập phân $\\frac{25}{100}$ rút gọn thành phân số tối giản là:', a: '$\\frac{1}{4}$', s: 'Chia tử và mẫu cho $25$.', d: 'van_dung', o: ['$\\frac{1}{2}$', '$\\frac{1}{4}$', '$\\frac{1}{5}$', '$\\frac{5}{20}$'] }
      ]
    },
    {
      name: 'Bài 5: Ôn tập các phép tính với phân số',
      questions: [
        { q: 'T5-B5-001', c: 'Muốn cộng hai phân số cùng mẫu số, ta làm thế nào?', a: 'Cộng hai tử số với nhau và giữ nguyên mẫu số', s: 'Quy tắc cộng phân số.', d: 'nhan_biet', o: ['Cộng hai mẫu số', 'Cộng hai tử số với nhau và giữ nguyên mẫu số', 'Nhân hai tử số', 'Nhân hai mẫu số'] },
        { q: 'T5-B5-002', c: 'Tính: $\\frac{1}{4} + \\frac{2}{4} = ?$?', a: '$\\frac{3}{4}$', s: '$(1+2)/4 = 3/4$.', d: 'thong_hieu', o: ['$\\frac{3}{8}$', '$\\frac{3}{4}$', '$\\frac{1}{4}$', '$\\frac{2}{4}$'] },
        { q: 'T5-B5-003', c: 'Tính: $\\frac{3}{5} \\times \\frac{2}{3} = ?$?', a: '$\\frac{2}{5}$', s: '$(3 \\times 2)/(5 \\times 3) = 6/15 = 2/5$.', d: 'thong_hieu', o: ['$\\frac{5}{8}$', '$\\frac{6}{15}$ (hoặc $\\frac{2}{5}$)', '$\\frac{6}{8}$', '$\\frac{1}{5}$'] },
        { q: 'T5-B5-004', c: 'Tính: $\\frac{1}{2} : \\frac{1}{4} = ?$?', a: '$2$', s: '$1/2 \\times 4/1 = 4/2 = 2$.', d: 'van_dung', o: ['$\\frac{1}{8}$', '$2$', '$\\frac{1}{2}$', '$4$'] },
        { q: 'T5-B5-005', c: 'Giá trị $\\frac{2}{3}$ của $12$ là bao nhiêu?', a: '$8$', s: '$12 \\times 2/3 = 8$.', d: 'van_dung', o: ['$6$', '$8$', '$10$', '$4$'] }
      ]
    },
    {
      name: 'Bài 7: Hỗn số',
      questions: [
        { q: 'T5-B7-001', c: 'Hỗn số gồm có mấy phần?', a: 'Hai phần: phần nguyên và phần phân số', s: 'Định nghĩa hỗn số.', d: 'nhan_biet', o: ['Chỉ phần nguyên', 'Hai phần: phần nguyên và phần phân số', 'Chỉ phần phân số', 'Phần thập phân và phần nguyên'] },
        { q: 'T5-B7-002', c: 'Phần phân số của hỗn số bao giờ cũng thỏa mãn điều kiện gì?', a: 'Nhỏ hơn $1$', s: 'Tính chất của hỗn số hợp lệ.', d: 'nhan_biet', o: ['Lớn hơn $1$', 'Nhỏ hơn $1$', 'Bằng $1$', 'Nhỏ hơn $0$'] },
        { q: 'T5-B7-003', c: 'Hỗn số $2\\frac{1}{3}$ được chuyển thành phân số nào?', a: '$\\frac{7}{3}$', s: '$(2 \\times 3 + 1) / 3 = 7/3$.', d: 'thong_hieu', o: ['$\\frac{5}{3}$', '$\\frac{6}{3}$', '$\\frac{7}{3}$', '$\\frac{2}{3}$'] },
        { q: 'T5-B7-004', c: 'Phân số $\\frac{5}{2}$ viết dưới dạng hỗn số là:', a: '$2\\frac{1}{2}$', s: '$5 : 2 = 2$ dư $1$.', d: 'thong_hieu', o: ['$1\\frac{1}{2}$', '$2\\frac{1}{2}$', '$3\\frac{1}{2}$', '$2\\frac{2}{5}$'] },
        { q: 'T5-B7-005', c: 'Hỗn số $3\\frac{3}{4}$ bằng phân số nào sau đây?', a: '$\\frac{15}{4}$', s: '$(3 \\times 4 + 3) / 4 = 15/4$.', d: 'van_dung', o: ['$\\frac{12}{4}$', '$\\frac{15}{4}$', '$\\frac{10}{4}$', '$\\frac{9}{4}$'] }
      ]
    },
    {
      name: 'Bài 10: Khái niệm số thập phân',
      questions: [
        { q: 'T5-B10-001', c: 'Số thập phân gồm mấy phần?', a: 'Hai phần: phần nguyên và phần thập phân', s: 'Cấu tạo số thập phân.', d: 'nhan_biet', o: ['Một phần', 'Hai phần: phần nguyên và phần thập phân', 'Ba phần', 'Hai phần: phần nguyên và phần phân số'] },
        { q: 'T5-B10-002', c: 'Hai phần của số thập phân được phân cách bởi dấu gì?', a: 'Dấu phẩy', s: 'Theo chuẩn Tiếng Việt dùng dấu phẩy.', d: 'nhan_biet', o: ['Dấu chấm', 'Dấu phẩy', 'Dấu gạch ngang', 'Dấu hai chấm'] },
        { q: 'T5-B10-003', c: 'Phân số thập phân $\\frac{1}{10}$ viết dưới dạng số thập phân là gì?', a: '$0,1$', s: 'Một phần mười là 0,1.', d: 'thong_hieu', o: ['$1,0$', '$0,1$', '$0,01$', '$0,001$'] },
        { q: 'T5-B10-004', c: 'Số thập phân $2,35$ có phần nguyên là bao nhiêu?', a: '$2$', s: 'Phần đứng trước dấu phẩy là phần nguyên.', d: 'thong_hieu', o: ['$2$', '$35$', '$3$', '$5$'] },
        { q: 'T5-B10-005', c: 'Chữ số $5$ trong số thập phân $12,354$ thuộc hàng nào?', a: 'Hàng phần trăm', s: 'Chữ số thứ hai sau dấu phẩy.', d: 'van_dung', o: ['Hàng phần mười', 'Hàng phần trăm', 'Hàng phần nghìn', 'Hàng chục'] }
      ]
    },
    {
      name: 'Bài 11: So sánh các số thập phân',
      questions: [
        { q: 'T5-B11-001', c: 'Khi so sánh hai số thập phân, ta so sánh phần nào trước?', a: 'Phần nguyên', s: 'Nguyên tắc so sánh từ trái sang phải.', d: 'nhan_biet', o: ['Phần thập phân', 'Hàng đơn vị', 'Phần nguyên', 'Hàng phần mười'] },
        { q: 'T5-B11-002', c: 'Nếu phần nguyên của hai số thập phân bằng nhau, ta tiếp tục so sánh đến phần nào?', a: 'Phần thập phân (lần lượt từ phần mười, phần trăm,...)', s: 'Quy tắc so sánh.', d: 'nhan_biet', o: ['Hàng đơn vị', 'Phần thập phân (lần lượt từ phần mười, phần trăm,...)', 'Phần nguyên tiếp', 'Không so sánh được nữa'] },
        { q: 'T5-B11-003', c: 'So sánh hai số $4,5$ và $4,05$, kết quả là:', a: '$4,5 > 4,05$', s: 'Phần mười $5 > 0$.', d: 'thong_hieu', o: ['$4,5 < 4,05$', '$4,5 = 4,05$', '$4,5 > 4,05$', 'Không so sánh được'] },
        { q: 'T5-B11-004', c: 'Số $3,20$ so với số $3,2$ như thế nào?', a: 'Bằng nhau', s: 'Thêm hoặc bớt chữ số 0 ở tận cùng bên phải phần thập phân thì giá trị không đổi.', d: 'thong_hieu', o: ['$3,20 > 3,2$', '$3,20 < 3,2$', 'Bằng nhau', 'Số $3,20$ lớn hơn $10$ lần'] },
        { q: 'T5-B11-005', c: 'Sắp xếp các số $1,2 ; 1,02 ; 1,21$ theo thứ tự từ bé đến lớn:', a: '$1,02 ; 1,2 ; 1,21$', s: '$1,02 < 1,20 < 1,21$.', d: 'van_dung', o: ['$1,2 ; 1,02 ; 1,21$', '$1,02 ; 1,21 ; 1,2$', '$1,21 ; 1,2 ; 1,02$', '$1,02 ; 1,2 ; 1,21$'] }
      ]
    },
    {
      name: 'Bài 12: Viết số đo đại lượng dưới dạng số thập phân',
      questions: [
        { q: 'T5-B12-001', c: '$1\\text{dm}$ bằng bao nhiêu phần của mét?', a: '$\\frac{1}{10}\\text{m}$ (hay $0,1\\text{m}$)', s: '$1\\text{m} = 10\\text{dm}$.', d: 'nhan_biet', o: ['$\\frac{1}{100}\\text{m}$', '$\\frac{1}{10}\\text{m}$ (hay $0,1\\text{m}$)', '$\\frac{1}{1000}\\text{m}$', '$10\\text{m}$'] },
        { q: 'T5-B12-002', c: '$2\\text{m } 5\\text{dm}$ viết dưới dạng số thập phân (đơn vị mét) là:', a: '$2,5\\text{m}$', s: '$2 + 5/10 = 2,5$.', d: 'thong_hieu', o: ['$2,05\\text{m}$', '$2,5\\text{m}$', '$25\\text{m}$', '$0,25\\text{m}$'] },
        { q: 'T5-B12-003', c: '$3\\text{kg } 50\\text{g}$ viết dưới dạng số thập phân (đơn vị ki-lô-gam) là:', a: '$3,05\\text{kg}$', s: '$3 + 50/1000 = 3,05$.', d: 'thong_hieu', o: ['$3,5\\text{kg}$', '$3,50\\text{kg}$', '$3,05\\text{kg}$', '$3,005\\text{kg}$'] },
        { q: 'T5-B12-004', c: '$45\\text{cm}$ viết dưới dạng số thập phân (đơn vị mét) là:', a: '$0,45\\text{m}$', s: '$45/100 = 0,45$.', d: 'van_dung', o: ['$4,5\\text{m}$', '$0,45\\text{m}$', '$0,045\\text{m}$', '$45\\text{m}$'] },
        { q: 'T5-B12-005', c: '$12$ tạ viết dưới dạng số thập phân (đơn vị tấn) là:', a: '$1,2$ tấn', s: '$12/10 = 1,2$ tấn.', d: 'van_dung', o: ['$0,12$ tấn', '$1,2$ tấn', '$120$ tấn', '$12$ tấn'] }
      ]
    },
    {
      name: 'Bài 13: Làm tròn số thập phân',
      questions: [
        { q: 'T5-B13-001', c: 'Làm tròn số thập phân $3,14$ đến hàng đơn vị ta được số nào?', a: '$3$', s: 'Chữ số phần mười là 1 < 5, làm tròn xuống.', d: 'nhan_biet', o: ['$3$', '$4$', '$3,1$', '$3,2$'] },
        { q: 'T5-B13-002', c: 'Làm tròn số thập phân $5,8$ đến hàng đơn vị ta được số nào?', a: '$6$', s: 'Phần mười là 8 > 5, làm tròn lên.', d: 'nhan_biet', o: ['$5$', '$6$', '$5,8$', '$5,9$'] },
        { q: 'T5-B13-003', c: 'Làm tròn số $12,345$ đến hàng phần mười ta được số nào?', a: '$12,3$', s: 'Hàng phần trăm là 4 < 5.', d: 'thong_hieu', o: ['$12,3$', '$12,4$', '$12,35$', '$12$'] },
        { q: 'T5-B13-004', c: 'Làm tròn số $4,567$ đến hàng phần trăm ta được số nào?', a: '$4,57$', s: 'Hàng phần nghìn là 7 > 5, cộng 1 vào hàng phần trăm.', d: 'thong_hieu', o: ['$4,56$', '$4,57$', '$4,6$', '$4,5$'] },
        { q: 'T5-B13-005', c: 'Số $9,99$ làm tròn đến hàng phần mười ta được số nào?', a: '$10,0$', s: 'Phần trăm là 9, làm tròn lên thành 10 phần mười tức là 1,0. Tổng là 10,0.', d: 'van_dung', o: ['$9,9$', '$10,0$', '$9,0$', '$9,10$'] }
      ]
    }
  ];

  for (const topic of topics) {
    const cats = await sql`SELECT id, name FROM public.categories WHERE name ILIKE ${'%' + topic.name + '%'} AND grade = 5 LIMIT 1`;
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
            ${q.d}, 'trac_nghiem', ${JSON.stringify(q.o)}::jsonb, ${q.a}, 'approved', 5, ${cats[0].name}, ${defaultUserId}
          )
        `;
        console.log(`Đã chèn: ${q.q}`);
      } else {
        console.log(`Bỏ qua: ${q.q}`);
      }
      await new Promise(r => setTimeout(r, 500));
    }
  }
  
  console.log('\n✅ Hoàn thành Batch 1 Lớp 5');
}

insertGrade5Batch1().catch(console.error);
