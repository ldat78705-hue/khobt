import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);

async function insertGrade4Batch3() {
  console.log('Khởi tạo kết nối CSDL...');
  
  const users = await sql`SELECT user_id FROM public.questions WHERE user_id IS NOT NULL LIMIT 1`;
  const defaultUserId = users.length > 0 ? users[0].user_id : '00000000-0000-0000-0000-000000000000';

  const topics = [
    {
      name: 'Bài 38. Nhân với số có một chữ số',
      questions: [
        { q: 'T4-B38-001', c: 'Khi thực hiện phép nhân số có nhiều chữ số với số có một chữ số, ta bắt đầu tính từ hàng nào?', a: 'Hàng đơn vị', s: 'Quy tắc nhân từ phải sang trái.', d: 'nhan_biet', o: ['Hàng lớn nhất', 'Hàng chục', 'Hàng đơn vị', 'Tùy ý'] },
        { q: 'T4-B38-002', c: 'Tính: $123 456 \\times 2 = ?$?', a: '$246 912$', s: 'Nhân nhẩm từ phải sang trái, không nhớ.', d: 'thong_hieu', o: ['$246 812$', '$246 912$', '$246 922$', '$146 912$'] },
        { q: 'T4-B38-003', c: 'Tính: $15 000 \\times 6 = ?$?', a: '$90 000$', s: '$15 \\times 6 = 90$, thêm 3 chữ số 0.', d: 'thong_hieu', o: ['$60 000$', '$75 000$', '$90 000$', '$80 000$'] },
        { q: 'T4-B38-004', c: 'Một cuộn dây dài $2500$m, $3$ cuộn dây như thế dài bao nhiêu mét?', a: '$7500$', s: '$2500 \\times 3 = 7500$.', d: 'van_dung', o: ['$5000$', '$7500$', '$8000$', '$6500$'] },
        { q: 'T4-B38-005', c: 'Tìm $x$ biết $x : 3 = 145$:', a: '$x = 435$', s: '$x = 145 \\times 3 = 435$.', d: 'van_dung', o: ['$x = 335$', '$x = 435$', '$x = 445$', '$x = 345$'] }
      ]
    },
    {
      name: 'Bài 39. Chia cho số có một chữ số',
      questions: [
        { q: 'T4-B39-001', c: 'Phép chia cho $5$ có số dư lớn nhất có thể là bao nhiêu?', a: '$4$', s: 'Số dư luôn nhỏ hơn số chia.', d: 'nhan_biet', o: ['$5$', '$4$', '$3$', '$6$'] },
        { q: 'T4-B39-002', c: 'Tính: $250 : 5 = ?$?', a: '$50$', s: '$25 : 5 = 5$, thêm 0.', d: 'thong_hieu', o: ['$40$', '$50$', '$60$', '$5$'] },
        { q: 'T4-B39-003', c: 'Tính: $120 000 : 4 = ?$?', a: '$30 000$', s: '$120 : 4 = 30$, thêm 3 chữ số 0.', d: 'thong_hieu', o: ['$20 000$', '$30 000$', '$40 000$', '$25 000$'] },
        { q: 'T4-B39-004', c: 'Một số chia cho $7$ được thương là $10$ và dư $5$. Số đó là:', a: '$75$', s: '$10 \\times 7 + 5 = 75$.', d: 'van_dung', o: ['$70$', '$75$', '$65$', '$80$'] },
        { q: 'T4-B39-005', c: 'Có $105$ học sinh xếp đều vào $3$ hàng. Mỗi hàng có bao nhiêu học sinh?', a: '$35$', s: '$105 : 3 = 35$.', d: 'van_dung', o: ['$30$', '$35$', '$40$', '$25$'] }
      ]
    },
    {
      name: 'Bài 40. Tính chất giao hoán và kết hợp của phép nhân',
      questions: [
        { q: 'T4-B40-001', c: 'Công thức biểu thị tính chất giao hoán của phép nhân là gì?', a: '$a \\times b = b \\times a$', s: 'Đổi chỗ thừa số tích không đổi.', d: 'nhan_biet', o: ['$a + b = b + a$', '$a \\times b = b \\times a$', '$(a \\times b) \\times c = a \\times (b \\times c)$', '$a \\times (b + c) = a \\times b + a \\times c$'] },
        { q: 'T4-B40-002', c: 'Công thức biểu thị tính chất kết hợp của phép nhân là gì?', a: '$(a \\times b) \\times c = a \\times (b \\times c)$', s: 'Nhóm các thừa số.', d: 'nhan_biet', o: ['$a \\times b = b \\times a$', '$(a \\times b) \\times c = a \\times (b \\times c)$', '$(a+b)+c = a+(b+c)$', '$a \\times 1 = a$'] },
        { q: 'T4-B40-003', c: 'Tính nhanh giá trị: $25 \\times 7 \\times 4 = ?$?', a: '$700$', s: '$(25 \\times 4) \\times 7 = 100 \\times 7 = 700$.', d: 'thong_hieu', o: ['$700$', '$800$', '$600$', '$500$'] },
        { q: 'T4-B40-004', c: 'Biểu thức $15 \\times 2 \\times 5$ có giá trị bằng biểu thức nào sau đây?', a: '$15 \\times 10$', s: '$15 \\times (2 \\times 5) = 15 \\times 10$.', d: 'thong_hieu', o: ['$15 \\times 7$', '$15 \\times 10$', '$30 \\times 5$', '$15 + 10$'] },
        { q: 'T4-B40-005', c: 'Tìm $x$ biết $12 \\times x = 34 \\times 12$:', a: '$34$', s: 'Sử dụng tính chất giao hoán.', d: 'van_dung', o: ['$12$', '$34$', '$46$', '$0$'] }
      ]
    },
    {
      name: 'Bài 41. Nhân, chia với 10, 100, 1000,…',
      questions: [
        { q: 'T4-B41-001', c: 'Khi nhân một số tự nhiên với $10$, ta làm thế nào?', a: 'Thêm một chữ số $0$ vào bên phải số đó', s: 'Quy tắc nhân với $10$.', d: 'nhan_biet', o: ['Thêm một chữ số $0$ vào bên trái số đó', 'Thêm một chữ số $0$ vào bên phải số đó', 'Bớt một chữ số $0$ ở bên phải số đó', 'Thêm hai chữ số $0$ vào bên phải số đó'] },
        { q: 'T4-B41-002', c: 'Khi chia một số tròn chục cho $10$, ta làm thế nào?', a: 'Bớt một chữ số $0$ ở bên phải số đó', s: 'Quy tắc chia cho $10$.', d: 'nhan_biet', o: ['Thêm một chữ số $0$ vào bên phải số đó', 'Bớt một chữ số $0$ ở bên trái số đó', 'Bớt một chữ số $0$ ở bên phải số đó', 'Bớt hai chữ số $0$'] },
        { q: 'T4-B41-003', c: 'Tính: $450 \\times 100 = ?$?', a: '$45 000$', s: 'Thêm hai số $0$.', d: 'thong_hieu', o: ['$4500$', '$45 000$', '$450 000$', '$45$'] },
        { q: 'T4-B41-004', c: 'Tính: $12 000 : 100 = ?$?', a: '$120$', s: 'Bớt hai số $0$.', d: 'thong_hieu', o: ['$1200$', '$120$', '$12$', '$100$'] },
        { q: 'T4-B41-005', c: 'Tìm $x$ biết $x \\times 10 = 5000$:', a: '$500$', s: '$x = 5000 : 10 = 500$.', d: 'van_dung', o: ['$50$', '$500$', '$5000$', '$5$'] }
      ]
    },
    {
      name: 'Bài 42. Tính chất phân phối của phép nhân đối với phép cộng',
      questions: [
        { q: 'T4-B42-001', c: 'Tính chất phân phối của phép nhân đối với phép cộng được viết dưới dạng nào?', a: '$a \\times (b + c) = a \\times b + a \\times c$', s: 'Định nghĩa tính chất phân phối.', d: 'nhan_biet', o: ['$a \\times (b \\times c) = a \\times b \\times c$', '$a \\times (b + c) = a \\times b + c$', '$a \\times (b + c) = a \\times b + a \\times c$', '$a + (b \\times c) = (a + b) \\times c$'] },
        { q: 'T4-B42-002', c: 'Biểu thức $a \\times (b - c)$ được khai triển như thế nào?', a: '$a \\times b - a \\times c$', s: 'Nhân một số với một hiệu.', d: 'nhan_biet', o: ['$a \\times b - c$', '$a \\times b - a \\times c$', '$a \\times b + a \\times c$', '$a - b \\times c$'] },
        { q: 'T4-B42-003', c: 'Tính: $5 \\times (20 + 4) = ?$?', a: '$120$', s: '$5 \\times 24 = 120$.', d: 'thong_hieu', o: ['$100$', '$120$', '$104$', '$124$'] },
        { q: 'T4-B42-004', c: 'Tính nhanh: $35 \\times 6 + 35 \\times 4 = ?$?', a: '$350$', s: '$35 \\times (6 + 4) = 35 \\times 10 = 350$.', d: 'thong_hieu', o: ['$300$', '$350$', '$400$', '$450$'] },
        { q: 'T4-B42-005', c: 'Tính nhanh: $102 \\times 5 = ?$?', a: '$510$', s: '$(100 + 2) \\times 5 = 500 + 10 = 510$.', d: 'van_dung', o: ['$500$', '$510$', '$520$', '$505$'] }
      ]
    },
    {
      name: 'Bài 43. Nhân với số có hai chữ số',
      questions: [
        { q: 'T4-B43-001', c: 'Khi đặt tính nhân với số có hai chữ số, tích riêng thứ hai được viết như thế nào so với tích riêng thứ nhất?', a: 'Lùi sang bên trái một cột', s: 'Quy tắc viết tích riêng thứ hai.', d: 'nhan_biet', o: ['Thẳng cột với tích riêng thứ nhất', 'Lùi sang bên trái một cột', 'Lùi sang bên phải một cột', 'Viết ở hàng dưới tùy ý'] },
        { q: 'T4-B43-002', c: 'Tính: $12 \\times 15 = ?$?', a: '$180$', s: 'Nhân số có hai chữ số.', d: 'thong_hieu', o: ['$150$', '$180$', '$160$', '$190$'] },
        { q: 'T4-B43-003', c: 'Tính: $200 \\times 35 = ?$?', a: '$7000$', s: '$2 \\times 35 = 70$, thêm hai số $0$.', d: 'thong_hieu', o: ['$6000$', '$7000$', '$8000$', '$7500$'] },
        { q: 'T4-B43-004', c: 'Tính diện tích hình chữ nhật có chiều dài $25\\text{m}$, chiều rộng $12\\text{m}$:', a: '$300\\text{ m}^2$', s: '$25 \\times 12 = 300$.', d: 'van_dung', o: ['$200\\text{ m}^2$', '$250\\text{ m}^2$', '$300\\text{ m}^2$', '$400\\text{ m}^2$'] },
        { q: 'T4-B43-005', c: 'Một quyển vở giá $8000$ đồng. Hỏi mua $15$ quyển vở như thế hết bao nhiêu tiền?', a: '$120 000$ đồng', s: '$8000 \\times 15 = 120 000$.', d: 'van_dung', o: ['$100 000$ đồng', '$120 000$ đồng', '$150 000$ đồng', '$80 000$ đồng'] }
      ]
    },
    {
      name: 'Bài 44. Chia cho số có hai chữ số',
      questions: [
        { q: 'T4-B44-001', c: 'Khi thực hiện phép chia cho số có hai chữ số, ta thực hiện chia từ hướng nào?', a: 'Từ trái sang phải', s: 'Chia từ hàng cao nhất của số bị chia.', d: 'nhan_biet', o: ['Từ phải sang trái', 'Từ trái sang phải', 'Từ giữa sang hai bên', 'Tùy ý'] },
        { q: 'T4-B44-002', c: 'Tính: $150 : 25 = ?$?', a: '$6$', s: 'Nhẩm $25 \\times 4 = 100, 25 \\times 6 = 150$.', d: 'thong_hieu', o: ['$4$', '$5$', '$6$', '$7$'] },
        { q: 'T4-B44-003', c: 'Tính: $360 : 12 = ?$?', a: '$30$', s: '$36 : 12 = 3$, thêm số $0$.', d: 'thong_hieu', o: ['$20$', '$30$', '$40$', '$3$'] },
        { q: 'T4-B44-004', c: 'Một đoàn tàu chở $450$ người, mỗi toa chứa được $45$ người. Hỏi đoàn tàu có bao nhiêu toa?', a: '$10$ toa', s: '$450 : 45 = 10$.', d: 'van_dung', o: ['$9$ toa', '$10$ toa', '$11$ toa', '$12$ toa'] },
        { q: 'T4-B44-005', c: 'Phép chia $456 : 15$ có số dư là bao nhiêu?', a: '$6$', s: '$456 = 15 \\times 30 + 6$.', d: 'van_dung', o: ['$0$', '$5$', '$6$', '$1$'] }
      ]
    },
    {
      name: 'Bài 46. Tìm số trung bình cộng',
      questions: [
        { q: 'T4-B46-001', c: 'Muốn tìm trung bình cộng của nhiều số, ta làm như thế nào?', a: 'Tính tổng các số đó rồi chia tổng cho số các số hạng', s: 'Quy tắc tính TBC.', d: 'nhan_biet', o: ['Lấy số lớn nhất chia cho số bé nhất', 'Tính tổng các số đó', 'Tính tổng các số đó rồi chia tổng cho số các số hạng', 'Nhân tất cả các số lại với nhau'] },
        { q: 'T4-B46-002', c: 'Trung bình cộng của $10$ và $20$ là bao nhiêu?', a: '$15$', s: '$(10 + 20) : 2 = 15$.', d: 'thong_hieu', o: ['$10$', '$15$', '$20$', '$30$'] },
        { q: 'T4-B46-003', c: 'Trung bình cộng của $3$ số: $10, 20, 30$ là bao nhiêu?', a: '$20$', s: '$(10 + 20 + 30) : 3 = 60 : 3 = 20$.', d: 'thong_hieu', o: ['$10$', '$15$', '$20$', '$30$'] },
        { q: 'T4-B46-004', c: 'Trung bình cộng của hai số là $15$, một số là $10$, số còn lại là:', a: '$20$', s: 'Tổng $= 15 \\times 2 = 30$. Số còn lại $= 30 - 10 = 20$.', d: 'van_dung', o: ['$15$', '$20$', '$25$', '$5$'] },
        { q: 'T4-B46-005', c: 'Lớp 4A có $30$ bạn, lớp 4B có $32$ bạn. Trung bình mỗi lớp có bao nhiêu bạn?', a: '$31$ bạn', s: '$(30 + 32) : 2 = 62 : 2 = 31$.', d: 'van_dung', o: ['$30$ bạn', '$31$ bạn', '$32$ bạn', '$33$ bạn'] }
      ]
    },
    {
      name: 'Bài 49. Dãy số liệu',
      questions: [
        { q: 'T4-B49-001', c: 'Dãy số liệu là gì?', a: 'Là tập hợp các số liệu được sắp xếp theo một thứ tự', s: 'Định nghĩa dãy số liệu.', d: 'nhan_biet', o: ['Là một số duy nhất', 'Là tập hợp các chữ cái', 'Là tập hợp các số liệu được sắp xếp theo một thứ tự', 'Là các phép tính cộng trừ'] },
        { q: 'T4-B49-002', c: 'Cho dãy số liệu: $10, 15, 20, 25$. Số thứ ba của dãy số liệu là số nào?', a: '$20$', s: 'Số ở vị trí số 3.', d: 'thong_hieu', o: ['$10$', '$15$', '$20$', '$25$'] },
        { q: 'T4-B49-003', c: 'Cho dãy điểm số của tổ 1: $7, 8, 9, 10, 10$. Có bao nhiêu học sinh đạt điểm $10$?', a: '$2$', s: 'Số 10 xuất hiện 2 lần.', d: 'thong_hieu', o: ['$1$', '$2$', '$3$', '$5$'] },
        { q: 'T4-B49-004', c: 'Dãy số: $1, 3, 5, 7, 9$. Trung bình cộng của dãy số này là:', a: '$5$', s: '$(1+3+5+7+9) : 5 = 25 : 5 = 5$.', d: 'van_dung', o: ['$4$', '$5$', '$6$', '$9$'] },
        { q: 'T4-B49-005', c: 'Cho dãy chiều cao của $4$ bạn: $120\\text{cm}, 130\\text{cm}, 125\\text{cm}, 135\\text{cm}$. Bạn thấp nhất có chiều cao bao nhiêu?', a: '$120\\text{cm}$', s: 'Số nhỏ nhất trong dãy là 120.', d: 'van_dung', o: ['$120\\text{cm}$', '$125\\text{cm}$', '$130\\text{cm}$', '$135\\text{cm}$'] }
      ]
    },
    {
      name: 'Bài 50. Biểu đồ cột',
      questions: [
        { q: 'T4-B50-001', c: 'Biểu đồ cột dùng các cột có hình gì để biểu diễn số liệu?', a: 'Hình chữ nhật', s: 'Mỗi cột là một hình chữ nhật.', d: 'nhan_biet', o: ['Hình vuông', 'Hình chữ nhật', 'Hình tròn', 'Hình tam giác'] },
        { q: 'T4-B50-002', c: 'Chiều cao của mỗi cột trong biểu đồ cột biểu thị đại lượng nào?', a: 'Số liệu cần biểu diễn (tần số, số lượng)', s: 'Cột càng cao thì số lượng càng lớn.', d: 'nhan_biet', o: ['Tên đối tượng', 'Số liệu cần biểu diễn (tần số, số lượng)', 'Thời gian', 'Màu sắc'] },
        { q: 'T4-B50-003', c: 'Nhìn vào biểu đồ cột, cột cao nhất tương ứng với giá trị nào?', a: 'Giá trị lớn nhất', s: 'Tính chất của biểu đồ cột.', d: 'thong_hieu', o: ['Giá trị lớn nhất', 'Giá trị nhỏ nhất', 'Giá trị trung bình', 'Giá trị đầu tiên'] },
        { q: 'T4-B50-004', c: 'Nhìn vào biểu đồ cột, cột thấp nhất tương ứng với giá trị nào?', a: 'Giá trị nhỏ nhất', s: 'Tính chất của biểu đồ cột.', d: 'thong_hieu', o: ['Giá trị lớn nhất', 'Giá trị nhỏ nhất', 'Giá trị trung bình', 'Giá trị cuối cùng'] },
        { q: 'T4-B50-005', c: 'Nếu hai cột trong biểu đồ cột có chiều cao bằng nhau thì số liệu của chúng như thế nào với nhau?', a: 'Bằng nhau', s: 'Cùng chiều cao thì cùng giá trị.', d: 'van_dung', o: ['Khác nhau', 'Bằng nhau', 'Gấp đôi nhau', 'Không so sánh được'] }
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
  
  console.log('\n✅ Hoàn thành Batch 3 Lớp 4');
}

insertGrade4Batch3().catch(console.error);
