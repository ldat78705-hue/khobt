import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);

async function insertGrade4Batch2() {
  console.log('Khởi tạo kết nối CSDL...');
  
  const users = await sql`SELECT user_id FROM public.questions WHERE user_id IS NOT NULL LIMIT 1`;
  const defaultUserId = users.length > 0 ? users[0].user_id : '00000000-0000-0000-0000-000000000000';

  const topics = [
    {
      name: 'Bài 17. Xăng-ti-mét vuông',
      questions: [
        { q: 'T4-B17-001', c: 'Đơn vị đo diện tích xăng-ti-mét vuông được viết tắt là gì?', a: '$\\text{cm}^2$', s: 'Xăng-ti-mét vuông là diện tích hình vuông cạnh $1$cm.', d: 'nhan_biet', o: ['$\\text{cm}$', '$\\text{cm}^2$', '$\\text{cm}^3$', '$\\text{m}^2$'] },
        { q: 'T4-B17-002', c: 'Xăng-ti-mét vuông là diện tích của hình vuông có cạnh dài bao nhiêu?', a: '$1\\text{ cm}$', s: 'Định nghĩa đơn vị cm vuông.', d: 'nhan_biet', o: ['$1\\text{ m}$', '$10\\text{ cm}$', '$1\\text{ cm}$', '$1\\text{ mm}$'] },
        { q: 'T4-B17-003', c: 'Kí hiệu $1 \\text{ cm}^2$ đọc là gì?', a: 'Một xăng-ti-mét vuông', s: 'Cách đọc đơn vị đo diện tích.', d: 'thong_hieu', o: ['Một xăng-ti-mét', 'Một xăng-ti-mét khối', 'Một mét vuông', 'Một xăng-ti-mét vuông'] },
        { q: 'T4-B17-004', c: 'Hình chữ nhật có chiều dài $4\\text{cm}$, chiều rộng $3\\text{cm}$. Diện tích là bao nhiêu $\\text{cm}^2$?', a: '$12$', s: '$4 \\times 3 = 12\\text{ cm}^2$.', d: 'thong_hieu', o: ['$7$', '$12$', '$14$', '$10$'] },
        { q: 'T4-B17-005', c: 'Hình vuông có cạnh $5\\text{cm}$ thì diện tích bằng bao nhiêu $\\text{cm}^2$?', a: '$25$', s: '$5 \\times 5 = 25\\text{ cm}^2$.', d: 'van_dung', o: ['$20$', '$25$', '$10$', '$15$'] }
      ]
    },
    {
      name: 'Bài 18. Đề-xi-mét vuông, mét vuông, mi-li-mét vuông',
      questions: [
        { q: 'T4-B18-001', c: 'Kí hiệu của đơn vị mét vuông là gì?', a: '$\\text{m}^2$', s: 'Mét vuông viết tắt là m2.', d: 'nhan_biet', o: ['$\\text{m}$', '$\\text{dm}^2$', '$\\text{m}^2$', '$\\text{m}^3$'] },
        { q: 'T4-B18-002', c: '$1\\text{ m}^2$ bằng bao nhiêu $\\text{dm}^2$?', a: '$100$', s: '$1\\text{m}^2 = 100\\text{dm}^2$.', d: 'nhan_biet', o: ['$10$', '$100$', '$1000$', '$10 000$'] },
        { q: 'T4-B18-003', c: '$1\\text{ dm}^2$ bằng bao nhiêu $\\text{cm}^2$?', a: '$100$', s: '$1\\text{dm}^2 = 100\\text{cm}^2$.', d: 'thong_hieu', o: ['$10$', '$100$', '$1000$', '$10 000$'] },
        { q: 'T4-B18-004', c: '$2\\text{ m}^2$ bằng bao nhiêu $\\text{cm}^2$?', a: '$20 000$', s: '$1\\text{m}^2 = 10 000\\text{cm}^2 \\Rightarrow 2\\text{m}^2 = 20 000\\text{cm}^2$.', d: 'thong_hieu', o: ['$200$', '$2 000$', '$20 000$', '$200 000$'] },
        { q: 'T4-B18-005', c: 'Một hình chữ nhật có diện tích $3\\text{ m}^2$, hỏi diện tích đó bằng bao nhiêu $\\text{dm}^2$?', a: '$300$', s: '$3 \\times 100 = 300\\text{ dm}^2$.', d: 'van_dung', o: ['$30$', '$300$', '$3000$', '$3$'] }
      ]
    },
    {
      name: 'Bài 20. Giây, thế kỉ',
      questions: [
        { q: 'T4-B20-001', c: '$1$ phút bằng bao nhiêu giây?', a: '$60$', s: '1 phút có 60 giây.', d: 'nhan_biet', o: ['$10$', '$60$', '$100$', '$3600$'] },
        { q: 'T4-B20-002', c: '$1$ thế kỉ bằng bao nhiêu năm?', a: '$100$', s: '1 thế kỉ là 100 năm.', d: 'nhan_biet', o: ['$10$', '$100$', '$1000$', '$60$'] },
        { q: 'T4-B20-003', c: '$3$ phút bằng bao nhiêu giây?', a: '$180$', s: '$3 \\times 60 = 180$ giây.', d: 'thong_hieu', o: ['$120$', '$150$', '$180$', '$300$'] },
        { q: 'T4-B20-004', c: 'Năm $2023$ thuộc thế kỉ thứ mấy?', a: 'Thế kỉ $21$ (XXI)', s: 'Từ năm 2001 đến 2100 là thế kỉ 21.', d: 'thong_hieu', o: '[\'Thế kỉ 19\', \'Thế kỉ 20\', \'Thế kỉ 21\', \'Thế kỉ 22\']' },
        { q: 'T4-B20-005', c: '$2$ thế kỉ và $15$ năm bằng bao nhiêu năm?', a: '$215$', s: '$2 \\times 100 + 15 = 215$.', d: 'van_dung', o: ['$2015$', '$215$', '$250$', '$115$'] }
      ]
    },
    {
      name: 'Bài 22. Phép cộng các số có nhiều chữ số',
      questions: [
        { q: 'T4-B22-001', c: 'Khi đặt tính phép cộng các số có nhiều chữ số, ta phải đặt tính như thế nào?', a: 'Các chữ số cùng một hàng phải thẳng cột với nhau', s: 'Nguyên tắc đặt tính.', d: 'nhan_biet', o: ['Các chữ số cùng hàng không cần thẳng cột', 'Tất cả các chữ số phải thẳng cột với nhau', 'Các chữ số cùng một hàng phải thẳng cột với nhau', 'Chữ số hàng đơn vị không cần thẳng cột'] },
        { q: 'T4-B22-002', c: 'Ta thực hiện phép cộng các số có nhiều chữ số theo thứ tự nào?', a: 'Từ phải sang trái', s: 'Tính từ hàng đơn vị trở đi.', d: 'nhan_biet', o: ['Từ trái sang phải', 'Từ phải sang trái', 'Từ giữa sang hai bên', 'Tùy ý'] },
        { q: 'T4-B22-003', c: 'Tính: $12 345 + 54 321 = ?$?', a: '$66 666$', s: 'Cộng nhẩm từng hàng không có nhớ.', d: 'thong_hieu', o: ['$66 666$', '$66 566$', '$77 777$', '$65 656$'] },
        { q: 'T4-B22-004', c: 'Tính: $150 000 + 200 000 = ?$?', a: '$350 000$', s: '$150 + 200 = 350$ nghìn.', d: 'thong_hieu', o: ['$250 000$', '$350 000$', '$450 000$', '$300 000$'] },
        { q: 'T4-B22-005', c: 'Tìm tổng của số LỚN NHẤT có năm chữ số và số $1$:', a: '$100 000$', s: '$99 999 + 1 = 100 000$.', d: 'van_dung', o: ['$10 000$', '$99 998$', '$100 000$', '$99 999$'] }
      ]
    },
    {
      name: 'Bài 23. Phép trừ các số có nhiều chữ số',
      questions: [
        { q: 'T4-B23-001', c: 'Trong phép trừ $A - B = C$, số $A$ được gọi là gì?', a: 'Số bị trừ', s: 'A là số bị trừ, B là số trừ, C là hiệu.', d: 'nhan_biet', o: ['Số trừ', 'Hiệu', 'Số bị trừ', 'Tổng'] },
        { q: 'T4-B23-002', c: 'Khi đặt tính phép trừ, ta thực hiện tính từ hướng nào sang?', a: 'Từ phải sang trái', s: 'Trừ từ hàng đơn vị.', d: 'nhan_biet', o: ['Từ trái sang phải', 'Từ phải sang trái', 'Từ hàng cao nhất', 'Tùy ý'] },
        { q: 'T4-B23-003', c: 'Tính: $99 999 - 11 111 = ?$?', a: '$88 888$', s: 'Trừ nhẩm từng hàng không có nhớ.', d: 'thong_hieu', o: ['$77 777$', '$88 888$', '$88 889$', '$90 000$'] },
        { q: 'T4-B23-004', c: 'Tính: $500 000 - 150 000 = ?$?', a: '$350 000$', s: '$500 - 150 = 350$ nghìn.', d: 'thong_hieu', o: ['$250 000$', '$350 000$', '$450 000$', '$400 000$'] },
        { q: 'T4-B23-005', c: 'Hiệu của số bé nhất có sáu chữ số và số lớn nhất có năm chữ số là bao nhiêu?', a: '$1$', s: '$100 000 - 99 999 = 1$.', d: 'van_dung', o: ['$10$', '$1$', '$9$', '$0$'] }
      ]
    },
    {
      name: 'Bài 24. Tính chất giao hoán và kết hợp của phép cộng',
      questions: [
        { q: 'T4-B24-001', c: 'Tính chất giao hoán của phép cộng được phát biểu thành công thức nào?', a: '$a + b = b + a$', s: 'Đổi chỗ các số hạng thì tổng không đổi.', d: 'nhan_biet', o: ['$a + b = a - b$', '$(a+b)+c = a+(b+c)$', '$a \\times b = b \\times a$', '$a + b = b + a$'] },
        { q: 'T4-B24-002', c: 'Biểu thức $(a + b) + c = a + (b + c)$ thể hiện tính chất gì của phép cộng?', a: 'Tính chất kết hợp', s: 'Nhóm các số hạng.', d: 'nhan_biet', o: ['Tính chất giao hoán', 'Tính chất kết hợp', 'Tính chất phân phối', 'Tính chất giao hoán và kết hợp'] },
        { q: 'T4-B24-003', c: 'Tính nhanh giá trị $25 + 47 + 75 = ?$?', a: '$147$', s: '$(25+75)+47 = 100+47 = 147$.', d: 'thong_hieu', o: ['$147$', '$137$', '$157$', '$127$'] },
        { q: 'T4-B24-004', c: 'Biểu thức $100 + 200 + 300$ có kết quả bằng với biểu thức nào sau đây?', a: '$300 + 100 + 200$', s: 'Theo tính chất giao hoán và kết hợp.', d: 'thong_hieu', o: ['$300 - 100 + 200$', '$300 + 100 - 200$', '$300 + 100 + 200$', '$100 + 200 - 300$'] },
        { q: 'T4-B24-005', c: 'Điền số thích hợp vào chỗ chấm: $x + 125 = 125 + 45$. Giá trị của $x$ là:', a: '$45$', s: 'Tính chất giao hoán.', d: 'van_dung', o: ['$125$', '$45$', '$170$', '$80$'] }
      ]
    },
    {
      name: 'Bài 25. Tìm hai số biết tổng và hiệu của hai số đó',
      questions: [
        { q: 'T4-B25-001', c: 'Công thức tìm số LỚN khi biết tổng và hiệu của hai số là gì?', a: 'Số lớn = (Tổng + Hiệu) : 2', s: 'Cách tìm số lớn.', d: 'nhan_biet', o: ['Số lớn = Tổng - Hiệu', 'Số lớn = (Tổng + Hiệu) : 2', 'Số lớn = (Tổng - Hiệu) : 2', 'Số lớn = (Tổng + Hiệu) $\\times$ 2'] },
        { q: 'T4-B25-002', c: 'Công thức tìm số BÉ khi biết tổng và hiệu của hai số là gì?', a: 'Số bé = (Tổng - Hiệu) : 2', s: 'Cách tìm số bé.', d: 'nhan_biet', o: ['Số bé = (Tổng - Hiệu) : 2', 'Số bé = (Tổng + Hiệu) : 2', 'Số bé = (Tổng - Hiệu) $\\times$ 2', 'Số bé = Tổng - Hiệu'] },
        { q: 'T4-B25-003', c: 'Hai số có tổng là $10$, hiệu là $2$. Số lớn là số nào?', a: '$6$', s: '$(10+2):2 = 12:2 = 6$.', d: 'thong_hieu', o: ['$4$', '$5$', '$6$', '$8$'] },
        { q: 'T4-B25-004', c: 'Hai số có tổng là $20$, hiệu là $4$. Số bé là số nào?', a: '$8$', s: '$(20-4):2 = 16:2 = 8$.', d: 'thong_hieu', o: ['$8$', '$10$', '$12$', '$16$'] },
        { q: 'T4-B25-005', c: 'Lớp 4A có $30$ học sinh, số nam nhiều hơn số nữ $4$ em. Tính số học sinh nữ của lớp 4A?', a: '$13$', s: 'Số nữ (số bé) = $(30 - 4) : 2 = 26 : 2 = 13$.', d: 'van_dung', o: ['$15$', '$13$', '$17$', '$16$'] }
      ]
    },
    {
      name: 'Bài 27. Hai đường thẳng vuông góc',
      questions: [
        { q: 'T4-B27-001', c: 'Hai đường thẳng cắt nhau và tạo thành mấy góc vuông thì được gọi là hai đường thẳng vuông góc?', a: '$4$ góc vuông', s: 'Tạo thành 4 góc vuông.', d: 'nhan_biet', o: ['$1$ góc vuông', '$2$ góc vuông', '$3$ góc vuông', '$4$ góc vuông'] },
        { q: 'T4-B27-002', c: 'Dụng cụ nào thường được dùng để kiểm tra hai đường thẳng có vuông góc hay không?', a: 'Ê-ke', s: 'Ê ke có 1 góc vuông.', d: 'nhan_biet', o: ['Thước thẳng', 'Com-pa', 'Ê-ke', 'Thước cuộn'] },
        { q: 'T4-B27-003', c: 'Hai cạnh kề nhau của một hình vuông có đặc điểm gì?', a: 'Vuông góc với nhau', s: 'Góc hình vuông là góc vuông.', d: 'thong_hieu', o: ['Song song với nhau', 'Vuông góc với nhau', 'Tạo thành góc tù', 'Tạo thành góc nhọn'] },
        { q: 'T4-B27-004', c: 'Kí hiệu hai đường thẳng $a$ và $b$ vuông góc với nhau được viết như thế nào?', a: '$a \\perp b$', s: 'Kí hiệu vuông góc.', d: 'thong_hieu', o: ['$a \\parallel b$', '$a = b$', '$a \\perp b$', '$a \\ne b$'] },
        { q: 'T4-B27-005', c: 'Trong một hình chữ nhật, có tất cả bao nhiêu cặp cạnh vuông góc với nhau?', a: '$4$ cặp', s: 'Có 4 góc vuông nên có 4 cặp cạnh vuông góc.', d: 'van_dung', o: ['$1$ cặp', '$2$ cặp', '$4$ cặp', '$8$ cặp'] }
      ]
    },
    {
      name: 'Bài 29. Hai đường thẳng song song',
      questions: [
        { q: 'T4-B29-001', c: 'Hai đường thẳng song song là hai đường thẳng như thế nào?', a: 'Không bao giờ cắt nhau', s: 'Kéo dài vô tận không cắt nhau.', d: 'nhan_biet', o: ['Cắt nhau tại $1$ điểm', 'Cắt nhau tại $2$ điểm', 'Không bao giờ cắt nhau', 'Vuông góc với nhau'] },
        { q: 'T4-B29-002', c: 'Hai cạnh đối diện của hình chữ nhật có tính chất gì?', a: 'Song song và bằng nhau', s: 'Tính chất hình chữ nhật.', d: 'nhan_biet', o: ['Chỉ song song', 'Chỉ bằng nhau', 'Song song và bằng nhau', 'Vuông góc với nhau'] },
        { q: 'T4-B29-003', c: 'Kí hiệu hai đường thẳng $a$ và $b$ song song với nhau là gì?', a: '$a \\parallel b$', s: 'Kí hiệu song song.', d: 'thong_hieu', o: ['$a \\parallel b$', '$a \\perp b$', '$a = b$', '$a - b = 0$'] },
        { q: 'T4-B29-004', c: 'Nếu đường thẳng $c$ vuông góc với đường thẳng $a$, mà đường thẳng $a$ lại song song với đường thẳng $b$, thì đường thẳng $c$ có quan hệ gì với đường thẳng $b$?', a: 'Vuông góc', s: 'Đường thẳng vuông góc với một trong 2 đường thẳng song song thì cũng vuông góc với đường kia.', d: 'thong_hieu', o: ['Song song', 'Vuông góc', 'Trùng nhau', 'Không cắt nhau'] },
        { q: 'T4-B29-005', c: 'Trong một hình chữ nhật, hai đường chéo có song song với nhau không?', a: 'Không song song (chúng cắt nhau tại trung điểm)', s: 'Hai đường chéo cắt nhau.', d: 'van_dung', o: ['Có song song', 'Không song song (chúng cắt nhau tại trung điểm)', 'Trùng nhau', 'Luôn vuông góc'] }
      ]
    },
    {
      name: 'Bài 31. Hình bình hành. Hình thoi',
      questions: [
        { q: 'T4-B31-001', c: 'Hình bình hành là hình có đặc điểm gì về các cạnh?', a: 'Có hai cặp cạnh đối diện song song và bằng nhau', s: 'Định nghĩa hình bình hành.', d: 'nhan_biet', o: ['Có $4$ cạnh bằng nhau', 'Có hai cặp cạnh đối diện song song và bằng nhau', 'Có $4$ góc vuông', 'Có một cặp cạnh song song'] },
        { q: 'T4-B31-002', c: 'Hình thoi là hình có mấy cạnh bằng nhau?', a: '$4$ cạnh bằng nhau', s: 'Định nghĩa hình thoi.', d: 'nhan_biet', o: ['$2$ cạnh', '$3$ cạnh', '$4$ cạnh bằng nhau', 'Các cạnh không bằng nhau'] },
        { q: 'T4-B31-003', c: 'Trong hình bình hành, hai góc đối diện có tính chất gì?', a: 'Bằng nhau', s: 'Góc đối của hình bình hành bằng nhau.', d: 'thong_hieu', o: ['Bù nhau', 'Bằng nhau', 'Một góc nhọn một góc tù', 'Vuông góc'] },
        { q: 'T4-B31-004', c: 'Hai đường chéo của hình thoi có tính chất đặc biệt gì?', a: 'Vuông góc với nhau và cắt nhau tại trung điểm của mỗi đường', s: 'Tính chất quan trọng của đường chéo hình thoi.', d: 'thong_hieu', o: ['Chỉ cắt nhau', 'Bằng nhau', 'Vuông góc với nhau và cắt nhau tại trung điểm của mỗi đường', 'Song song với nhau'] },
        { q: 'T4-B31-005', c: 'Một hình bình hành có độ dài đáy là $5\\text{cm}$, chiều cao tương ứng là $3\\text{cm}$. Diện tích của hình bình hành là:', a: '$15\\text{ cm}^2$', s: '$S = a \\times h = 5 \\times 3 = 15$.', d: 'van_dung', o: ['$8\\text{ cm}^2$', '$15\\text{ cm}^2$', '$16\\text{ cm}^2$', '$7,5\\text{ cm}^2$'] }
      ]
    }
  ];

  for (const topic of topics) {
    const cats = await sql`SELECT id, name FROM public.categories WHERE name ILIKE ${'%' + topic.name + '%'} AND grade = 4 LIMIT 1`;
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
            ${q.d}, 'trac_nghiem', ${JSON.stringify(q.o)}::jsonb, ${q.a}, 'approved', 4, ${cats[0].name}, ${defaultUserId}
          )
        `;
        console.log(`Đã chèn: ${q.q}`);
      } else {
        console.log(`Bỏ qua: ${q.q}`);
      }
      await new Promise(r => setTimeout(r, 500));
    }
  }
  
  console.log('\n✅ Hoàn thành Batch 2 Lớp 4');
}

insertGrade4Batch2().catch(console.error);
