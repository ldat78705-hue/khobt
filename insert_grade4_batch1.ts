import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);

async function insertGrade4Batch1() {
  console.log('Khởi tạo kết nối CSDL...');
  
  const users = await sql`SELECT user_id FROM public.questions WHERE user_id IS NOT NULL LIMIT 1`;
  const defaultUserId = users.length > 0 ? users[0].user_id : '00000000-0000-0000-0000-000000000000';

  const topics = [
    {
      name: 'Bài 1. Ôn tập các số đến 100 000',
      questions: [
        { q: 'T4-B1-001', c: 'Số $99 999$ đọc là gì?', a: 'Chín mươi chín nghìn chín trăm chín mươi chín', s: 'Cách đọc số có 5 chữ số.', d: 'nhan_biet', o: ['Chín chín nghìn chín trăm chín mươi chín', 'Chín mươi chín nghìn chín trăm chín chín', 'Chín mươi chín nghìn chín trăm chín mươi chín', 'Chín trăm chín mươi chín nghìn'] },
        { q: 'T4-B1-002', c: 'Số liền sau của số $99 999$ là số nào?', a: '$100 000$', s: '$99 999 + 1 = 100 000$.', d: 'nhan_biet', o: ['$99 998$', '$100 000$', '$1 000 000$', '$99 999$'] },
        { q: 'T4-B1-003', c: 'Số bé nhất có năm chữ số là số nào?', a: '$10 000$', s: 'Số tự nhiên nhỏ nhất có 5 chữ số là 10 000.', d: 'thong_hieu', o: ['$99 999$', '$10 000$', '$11 111$', '$10 001$'] },
        { q: 'T4-B1-004', c: 'Trong số $85 412$, chữ số $8$ thuộc hàng nào?', a: 'Hàng chục nghìn', s: 'Từ phải qua trái: đv, chục, trăm, nghìn, chục nghìn.', d: 'thong_hieu', o: ['Hàng nghìn', 'Hàng chục nghìn', 'Hàng trăm', 'Hàng chục'] },
        { q: 'T4-B1-005', c: 'Số lớn nhất có năm chữ số khác nhau là số nào?', a: '$98 765$', s: 'Chọn các chữ số lớn nhất xếp từ trái sang phải: 9, 8, 7, 6, 5.', d: 'van_dung', o: ['$99 999$', '$98 765$', '$10 234$', '$89 765$'] }
      ]
    },
    {
      name: 'Bài 2. Ôn tập các phép tính trong phạm vi 100 000',
      questions: [
        { q: 'T4-B2-001', c: 'Phép tính $12 000 + 34 000$ có kết quả là bao nhiêu?', a: '$46 000$', s: '$12 + 34 = 46$ nghìn.', d: 'nhan_biet', o: ['$46 000$', '$45 000$', '$44 000$', '$56 000$'] },
        { q: 'T4-B2-002', c: 'Kết quả của phép trừ $50 000 - 15 000$ là:', a: '$35 000$', s: '$50 - 15 = 35$ nghìn.', d: 'nhan_biet', o: ['$45 000$', '$25 000$', '$35 000$', '$30 000$'] },
        { q: 'T4-B2-003', c: 'Tính $15 000 \\times 4$:', a: '$60 000$', s: '$15 \\times 4 = 60$ nghìn.', d: 'thong_hieu', o: ['$45 000$', '$50 000$', '$60 000$', '$75 000$'] },
        { q: 'T4-B2-004', c: 'Tính $85 000 : 5$:', a: '$17 000$', s: '$85 : 5 = 17$ nghìn.', d: 'thong_hieu', o: ['$15 000$', '$16 000$', '$17 000$', '$18 000$'] },
        { q: 'T4-B2-005', c: 'Tìm $x$ biết $x - 12 500 = 34 500$:', a: '$x = 47 000$', s: '$x = 34 500 + 12 500 = 47 000$.', d: 'van_dung', o: ['$x = 22 000$', '$x = 46 000$', '$x = 47 000$', '$x = 48 000$'] }
      ]
    },
    {
      name: 'Bài 3. Số chẵn, số lẻ',
      questions: [
        { q: 'T4-B3-001', c: 'Các số chẵn có chữ số tận cùng là chữ số nào?', a: '$0, 2, 4, 6, 8$', s: 'Dấu hiệu nhận biết số chẵn.', d: 'nhan_biet', o: ['$1, 3, 5, 7, 9$', '$0, 1, 2, 3, 4$', '$0, 2, 4, 6, 8$', '$5, 6, 7, 8, 9$'] },
        { q: 'T4-B3-002', c: 'Các số tự nhiên có chữ số tận cùng là $1, 3, 5, 7, 9$ được gọi là gì?', a: 'Số lẻ', s: 'Định nghĩa số lẻ.', d: 'nhan_biet', o: ['Số chẵn', 'Số nguyên tố', 'Số lẻ', 'Số tròn chục'] },
        { q: 'T4-B3-003', c: 'Trong các số $124, 255, 308, 491$, số nào là số lẻ?', a: '$255$ và $491$', s: 'Các số có tận cùng là $5$ và $1$ là số lẻ.', d: 'thong_hieu', o: ['$124$ và $308$', '$255$ và $308$', '$255$ và $491$', '$124$ và $491$'] },
        { q: 'T4-B3-004', c: 'Số chẵn bé nhất có ba chữ số là số nào?', a: '$100$', s: 'Số bé nhất có 3 chữ số là $100$ và $100$ là số chẵn.', d: 'thong_hieu', o: ['$102$', '$100$', '$111$', '$998$'] },
        { q: 'T4-B3-005', c: 'Tổng của một số chẵn và một số lẻ luôn là số gì?', a: 'Số lẻ', s: 'Ví dụ: $2 + 3 = 5$ (số lẻ).', d: 'van_dung', o: ['Số chẵn', 'Số lẻ', 'Số $0$', 'Không xác định được'] }
      ]
    },
    {
      name: 'Bài 4. Biểu thức số',
      questions: [
        { q: 'T4-B4-001', c: 'Trong một biểu thức không có dấu ngoặc, chỉ có phép cộng và phép nhân, ta thực hiện phép tính nào trước?', a: 'Phép nhân trước, phép cộng sau', s: 'Nhân chia trước, cộng trừ sau.', d: 'nhan_biet', o: ['Từ trái sang phải', 'Phép cộng trước, phép nhân sau', 'Phép nhân trước, phép cộng sau', 'Tùy ý'] },
        { q: 'T4-B4-002', c: 'Giá trị của biểu thức $15 + 5 \\times 3$ là bao nhiêu?', a: '$30$', s: '$15 + (5 \\times 3) = 15 + 15 = 30$.', d: 'nhan_biet', o: ['$60$', '$30$', '$45$', '$23$'] },
        { q: 'T4-B4-003', c: 'Tính giá trị của biểu thức $(20 + 30) \\times 2$:', a: '$100$', s: 'Thực hiện trong ngoặc trước: $50 \\times 2 = 100$.', d: 'thong_hieu', o: ['$80$', '$100$', '$50$', '$60$'] },
        { q: 'T4-B4-004', c: 'Tính giá trị biểu thức $100 - 20 : 4$:', a: '$95$', s: 'Chia trước, trừ sau: $100 - 5 = 95$.', d: 'thong_hieu', o: ['$20$', '$95$', '$80$', '$75$'] },
        { q: 'T4-B4-005', c: 'Tìm $x$ trong biểu thức $x \\times 2 + 10 = 30$:', a: '$x = 10$', s: '$x \\times 2 = 30 - 10 = 20 \\Rightarrow x = 10$.', d: 'van_dung', o: ['$x = 5$', '$x = 20$', '$x = 10$', '$x = 15$'] }
      ]
    },
    {
      name: 'Bài 7. Góc, đơn vị đo góc',
      questions: [
        { q: 'T4-B7-001', c: 'Đơn vị thường dùng để đo góc là gì?', a: 'Độ ($^\\circ$)', s: 'Độ là đơn vị đo góc.', d: 'nhan_biet', o: ['Xăng-ti-mét (cm)', 'Mi-li-lít (ml)', 'Ki-lô-gam (kg)', 'Độ ($^\\circ$)'] },
        { q: 'T4-B7-002', c: 'Dụng cụ nào được dùng để đo góc?', a: 'Thước đo góc', s: 'Thước đo góc (thước đo độ).', d: 'nhan_biet', o: ['Thước thẳng', 'Thước ê-ke', 'Thước đo góc', 'Com-pa'] },
        { q: 'T4-B7-003', c: 'Một góc vuông có số đo bằng bao nhiêu độ?', a: '$90^\\circ$', s: 'Góc vuông bằng $90$ độ.', d: 'thong_hieu', o: ['$60^\\circ$', '$90^\\circ$', '$180^\\circ$', '$45^\\circ$'] },
        { q: 'T4-B7-004', c: 'Góc có số đo bằng hai góc vuông được gọi là góc gì?', a: 'Góc bẹt', s: 'Góc bẹt bằng $180$ độ (bằng 2 góc vuông).', d: 'thong_hieu', o: ['Góc nhọn', 'Góc tù', 'Góc vuông', 'Góc bẹt'] },
        { q: 'T4-B7-005', c: 'Kim giờ và kim phút của đồng hồ lúc $3$ giờ đúng tạo thành một góc bao nhiêu độ?', a: '$90^\\circ$', s: 'Tạo thành góc vuông $90^\\circ$.', d: 'van_dung', o: ['$60^\\circ$', '$90^\\circ$', '$120^\\circ$', '$180^\\circ$'] }
      ]
    },
    {
      name: 'Bài 8. Góc nhọn, góc tù, góc bẹt',
      questions: [
        { q: 'T4-B8-001', c: 'Góc có số đo bé hơn $90^\\circ$ được gọi là góc gì?', a: 'Góc nhọn', s: 'Góc nhọn lớn hơn 0 và nhỏ hơn 90 độ.', d: 'nhan_biet', o: ['Góc tù', 'Góc vuông', 'Góc nhọn', 'Góc bẹt'] },
        { q: 'T4-B8-002', c: 'Góc có số đo lớn hơn $90^\\circ$ và bé hơn $180^\\circ$ được gọi là góc gì?', a: 'Góc tù', s: 'Định nghĩa góc tù.', d: 'nhan_biet', o: ['Góc nhọn', 'Góc tù', 'Góc vuông', 'Góc bẹt'] },
        { q: 'T4-B8-003', c: 'Góc bẹt có số đo bằng bao nhiêu độ?', a: '$180^\\circ$', s: 'Góc bẹt tạo thành một đường thẳng.', d: 'thong_hieu', o: ['$90^\\circ$', '$180^\\circ$', '$360^\\circ$', '$120^\\circ$'] },
        { q: 'T4-B8-004', c: 'Góc có số đo $120^\\circ$ là góc gì?', a: 'Góc tù', s: 'Vì $90^\\circ < 120^\\circ < 180^\\circ$.', d: 'thong_hieu', o: ['Góc nhọn', 'Góc vuông', 'Góc tù', 'Góc bẹt'] },
        { q: 'T4-B8-005', c: 'Góc tạo bởi kim giờ và kim phút lúc $6$ giờ đúng là góc gì?', a: 'Góc bẹt', s: 'Hai kim thẳng hàng tạo thành góc $180^\\circ$.', d: 'van_dung', o: ['Góc vuông', 'Góc nhọn', 'Góc bẹt', 'Góc tù'] }
      ]
    },
    {
      name: 'Bài 10. Các số có sáu chữ số. Số 1 000 000',
      questions: [
        { q: 'T4-B10-001', c: 'Số $100 000$ đọc là gì?', a: 'Một trăm nghìn', s: 'Cách đọc số tròn nghìn.', d: 'nhan_biet', o: ['Mười nghìn', 'Một trăm nghìn', 'Một triệu', 'Một nghìn'] },
        { q: 'T4-B10-002', c: 'Số Một triệu ($1 000 000$) có tất cả bao nhiêu chữ số $0$?', a: '$6$ chữ số $0$', s: 'Số 1 000 000 có 1 chữ số 1 và 6 chữ số 0.', d: 'nhan_biet', o: ['$4$ chữ số $0$', '$5$ chữ số $0$', '$6$ chữ số $0$', '$7$ chữ số $0$'] },
        { q: 'T4-B10-003', c: 'Số liền sau của số $999 999$ là số nào?', a: '$1 000 000$', s: '$999 999 + 1 = 1 000 000$.', d: 'thong_hieu', o: ['$999 998$', '$1 000 000$', '$1 000 001$', '$100 000$'] },
        { q: 'T4-B10-004', c: 'Trong số $524 316$, chữ số $5$ thuộc hàng nào?', a: 'Hàng trăm nghìn', s: 'Vị trí thứ 6 từ phải sang là hàng trăm nghìn.', d: 'thong_hieu', o: ['Hàng chục nghìn', 'Hàng nghìn', 'Hàng trăm nghìn', 'Hàng trăm'] },
        { q: 'T4-B10-005', c: 'Viết số bé nhất có sáu chữ số khác nhau:', a: '$102 345$', s: 'Chọn số nhỏ nhất đứng đầu là 1, tiếp theo là 0, 2, 3, 4, 5.', d: 'van_dung', o: ['$123 456$', '$100 000$', '$102 345$', '$102 346$'] }
      ]
    },
    {
      name: 'Bài 11. Hàng và lớp',
      questions: [
        { q: 'T4-B11-001', c: 'Lớp đơn vị gồm các hàng nào?', a: 'Hàng đơn vị, hàng chục, hàng trăm', s: 'Cấu tạo lớp đơn vị.', d: 'nhan_biet', o: ['Hàng nghìn, hàng chục nghìn', 'Hàng đơn vị, hàng chục', 'Hàng đơn vị, hàng chục, hàng trăm', 'Hàng trăm, hàng nghìn'] },
        { q: 'T4-B11-002', c: 'Lớp nghìn gồm các hàng nào?', a: 'Hàng nghìn, hàng chục nghìn, hàng trăm nghìn', s: 'Cấu tạo lớp nghìn.', d: 'nhan_biet', o: ['Hàng trăm, hàng nghìn', 'Hàng nghìn, hàng chục nghìn, hàng trăm nghìn', 'Hàng chục nghìn, hàng trăm nghìn', 'Hàng triệu, hàng chục triệu'] },
        { q: 'T4-B11-003', c: 'Trong số $374 582$, chữ số $7$ thuộc lớp nào?', a: 'Lớp nghìn', s: 'Chữ số $7$ ở hàng chục nghìn thuộc lớp nghìn.', d: 'thong_hieu', o: ['Lớp đơn vị', 'Lớp nghìn', 'Lớp triệu', 'Lớp trăm'] },
        { q: 'T4-B11-004', c: 'Số $543 210$ có chữ số thuộc hàng trăm nghìn là chữ số mấy?', a: '$5$', s: 'Chữ số $5$ ở đầu tiên bên trái.', d: 'thong_hieu', o: ['$4$', '$3$', '$5$', '$2$'] },
        { q: 'T4-B11-005', c: 'Một số có chữ số hàng trăm nghìn là $9$, các chữ số còn lại đều là $0$. Số đó viết là:', a: '$900 000$', s: 'Chín trăm nghìn.', d: 'van_dung', o: ['$90 000$', '$900 000$', '$9 000 000$', '$900$'] }
      ]
    },
    {
      name: 'Bài 14. Làm tròn số đến hàng chục nghìn',
      questions: [
        { q: 'T4-B14-001', c: 'Để làm tròn một số đến hàng chục nghìn, ta phải xét chữ số ở hàng nào?', a: 'Hàng nghìn', s: 'Xét chữ số ngay sau hàng chục nghìn.', d: 'nhan_biet', o: ['Hàng chục', 'Hàng trăm', 'Hàng nghìn', 'Hàng trăm nghìn'] },
        { q: 'T4-B14-002', c: 'Khi làm tròn đến hàng chục nghìn, nếu chữ số hàng nghìn là $5, 6, 7, 8, 9$ thì ta làm tròn như thế nào?', a: 'Làm tròn lên (cộng thêm 1 vào hàng chục nghìn và đổi các chữ số sau thành 0)', s: 'Quy tắc làm tròn số lớn hơn hoặc bằng 5.', d: 'nhan_biet', o: ['Làm tròn xuống', 'Giữ nguyên số', 'Làm tròn lên', 'Bỏ các số đó đi'] },
        { q: 'T4-B14-003', c: 'Làm tròn số $54 321$ đến hàng chục nghìn ta được số nào?', a: '$50 000$', s: 'Chữ số hàng nghìn là 4 < 5, làm tròn xuống.', d: 'thong_hieu', o: ['$60 000$', '$50 000$', '$54 000$', '$55 000$'] },
        { q: 'T4-B14-004', c: 'Làm tròn số $86 500$ đến hàng chục nghìn ta được số nào?', a: '$90 000$', s: 'Chữ số hàng nghìn là 6 > 5, làm tròn lên.', d: 'thong_hieu', o: ['$80 000$', '$86 000$', '$87 000$', '$90 000$'] },
        { q: 'T4-B14-005', c: 'Một số khi làm tròn đến hàng chục nghìn thì được $70 000$. Số đó LỚN NHẤT có thể là số nào?', a: '$74 999$', s: 'Nếu là $75 000$ thì sẽ làm tròn lên $80 000$.', d: 'van_dung', o: ['$79 999$', '$75 000$', '$74 999$', '$69 999$'] }
      ]
    },
    {
      name: 'Bài 15. Làm quen với số La Mã',
      questions: [
        { q: 'T4-B15-001', c: 'Kí hiệu chữ I trong số La Mã tương ứng với số nào trong hệ thập phân?', a: '$1$', s: 'I là $1$.', d: 'nhan_biet', o: ['$1$', '$5$', '$10$', '$50$'] },
        { q: 'T4-B15-002', c: 'Kí hiệu chữ V trong số La Mã tương ứng với số nào?', a: '$5$', s: 'V là $5$.', d: 'nhan_biet', o: ['$1$', '$5$', '$10$', '$50$'] },
        { q: 'T4-B15-003', c: 'Kí hiệu chữ X trong số La Mã tương ứng với số nào?', a: '$10$', s: 'X là $10$.', d: 'thong_hieu', o: ['$5$', '$10$', '$100$', '$50$'] },
        { q: 'T4-B15-004', c: 'Số La Mã IV biểu diễn số mấy?', a: '$4$', s: 'V là 5, I đứng trước V là trừ đi 1, vậy bằng 4.', d: 'thong_hieu', o: ['$4$', '$6$', '$5$', '$14$'] },
        { q: 'T4-B15-005', c: 'Viết số $12$ bằng số La Mã:', a: 'XII', s: '$10 + 2 = X + II = XII$.', d: 'van_dung', o: ['IIX', 'XII', 'IXI', 'VVII'] }
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
  
  console.log('\n✅ Hoàn thành Batch 1 Lớp 4');
}

insertGrade4Batch1().catch(console.error);
