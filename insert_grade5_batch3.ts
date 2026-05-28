import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);

async function insertGrade5Batch3() {
  console.log('Khởi tạo kết nối CSDL...');
  
  const users = await sql`SELECT user_id FROM public.questions WHERE user_id IS NOT NULL LIMIT 1`;
  const defaultUserId = users.length > 0 ? users[0].user_id : '00000000-0000-0000-0000-000000000000';

  const topics = [
    {
      name: 'Bài 36: Tỉ số. Tỉ số phần trăm',
      questions: [
        { q: 'T5-B36-001', c: 'Tỉ số của hai số $a$ và $b$ (với $b \\neq 0$) được viết là gì?', a: '$a : b$ hoặc $\\frac{a}{b}$', s: 'Định nghĩa tỉ số.', d: 'nhan_biet', o: ['$a + b$', '$a - b$', '$a : b$ hoặc $\\frac{a}{b}$', '$a \\times b$'] },
        { q: 'T5-B36-002', c: 'Kí hiệu của phần trăm là gì?', a: '$\\%$', s: 'Kí hiệu phổ biến.', d: 'nhan_biet', o: ['$\\text{pm}$', '$\\%$', '$\\text{pt}$', '$\\text{/100}$'] },
        { q: 'T5-B36-003', c: 'Lớp 5A có $15$ bạn nam và $20$ bạn nữ. Tỉ số của số bạn nam và số bạn nữ là bao nhiêu?', a: '$\\frac{15}{20}$ (hoặc $\\frac{3}{4}$)', s: '$15 / 20$.', d: 'thong_hieu', o: ['$\\frac{20}{15}$', '$\\frac{15}{20}$ (hoặc $\\frac{3}{4}$)', '$\\frac{15}{35}$', '$\\frac{20}{35}$'] },
        { q: 'T5-B36-004', c: 'Viết phân số $\\frac{25}{100}$ dưới dạng tỉ số phần trăm:', a: '$25\\%$', s: 'Phân số có mẫu 100.', d: 'thong_hieu', o: ['$2,5\\%$', '$25\\%$', '$0,25\\%$', '$250\\%$'] },
        { q: 'T5-B36-005', c: 'Tỉ số của $2\\text{m}$ và $50\\text{cm}$ là bao nhiêu?', a: '$\\frac{4}{1}$', s: '$2\\text{m} = 200\\text{cm}$. Tỉ số $200 : 50 = 4/1$.', d: 'van_dung', o: ['$\\frac{2}{50}$', '$\\frac{1}{25}$', '$\\frac{4}{1}$', '$\\frac{1}{4}$'] }
      ]
    },
    {
      name: 'Bài 37: Tỉ lệ bản đồ và ứng dụng',
      questions: [
        { q: 'T5-B37-001', c: 'Tỉ lệ bản đồ $1 : 1 000$ có ý nghĩa là gì?', a: '$1$ đơn vị độ dài trên bản đồ ứng với $1 000$ đơn vị độ dài trên thực tế', s: 'Định nghĩa tỉ lệ bản đồ.', d: 'nhan_biet', o: ['$1$ đơn vị thực tế ứng với $1 000$ đơn vị bản đồ', '$1$ đơn vị độ dài trên bản đồ ứng với $1 000$ đơn vị độ dài trên thực tế', 'Bản đồ dài gấp $1 000$ lần thực tế', 'Thực tế ngắn hơn bản đồ $1 000$ lần'] },
        { q: 'T5-B37-002', c: 'Quãng đường trên bản đồ là $2\\text{cm}$, tỉ lệ bản đồ là $1 : 100 000$. Quãng đường thực tế là bao nhiêu xăng-ti-mét?', a: '$200 000\\text{cm}$', s: '$2 \\times 100 000 = 200 000$.', d: 'thong_hieu', o: ['$20 000\\text{cm}$', '$200 000\\text{cm}$', '$2 000 000\\text{cm}$', '$50 000\\text{cm}$'] },
        { q: 'T5-B37-003', c: 'Đổi $200 000\\text{cm}$ sang ki-lô-mét ta được bao nhiêu?', a: '$2\\text{km}$', s: '$200 000\\text{cm} = 2 000\\text{m} = 2\\text{km}$.', d: 'thong_hieu', o: ['$20\\text{km}$', '$2\\text{km}$', '$0,2\\text{km}$', '$200\\text{km}$'] },
        { q: 'T5-B37-004', c: 'Quãng đường thực tế là $5\\text{km}$. Khi vẽ trên bản đồ tỉ lệ $1 : 100 000$ thì đoạn đường đó dài bao nhiêu xăng-ti-mét?', a: '$5\\text{cm}$', s: '$5\\text{km} = 500 000\\text{cm}$. $500 000 : 100 000 = 5$.', d: 'van_dung', o: ['$0,5\\text{cm}$', '$5\\text{cm}$', '$50\\text{cm}$', '$2\\text{cm}$'] },
        { q: 'T5-B37-005', c: 'Trên bản đồ tỉ lệ $1 : 10 000$, chiều dài một sân bóng là $1\\text{cm}$. Chiều dài thực tế của sân bóng là bao nhiêu mét?', a: '$100\\text{m}$', s: '$1\\text{cm} \\times 10 000 = 10 000\\text{cm} = 100\\text{m}$.', d: 'van_dung', o: ['$10\\text{m}$', '$100\\text{m}$', '$1000\\text{m}$', '$1\\text{m}$'] }
      ]
    },
    {
      name: 'Bài 38: Tìm hai số khi biết tổng và tỉ số của hai số đó',
      questions: [
        { q: 'T5-B38-001', c: 'Bước đầu tiên thường dùng khi giải bài toán tìm hai số khi biết tổng và tỉ số là gì?', a: 'Vẽ sơ đồ hoặc tìm tổng số phần bằng nhau', s: 'Phương pháp giải đặc trưng.', d: 'nhan_biet', o: ['Tìm hiệu hai số', 'Vẽ sơ đồ hoặc tìm tổng số phần bằng nhau', 'Tìm tích hai số', 'Rút gọn phân số'] },
        { q: 'T5-B38-002', c: 'Tổng hai số là $20$, tỉ số của hai số là $\\frac{2}{3}$. Tổng số phần bằng nhau là bao nhiêu?', a: '$5$ phần', s: '$2 + 3 = 5$.', d: 'thong_hieu', o: ['$2$ phần', '$3$ phần', '$5$ phần', '$6$ phần'] },
        { q: 'T5-B38-003', c: 'Tổng hai số là $30$, tỉ số của hai số là $\\frac{1}{2}$. Số bé là bao nhiêu?', a: '$10$', s: 'Tổng số phần là $3$. Số bé $= 30 : 3 \\times 1 = 10$.', d: 'thong_hieu', o: ['$15$', '$10$', '$20$', '$5$'] },
        { q: 'T5-B38-004', c: 'Lớp 5A có $35$ học sinh. Số học sinh nam bằng $\\frac{3}{4}$ số học sinh nữ. Hỏi lớp 5A có bao nhiêu học sinh nam?', a: '$15$ học sinh', s: 'Tổng số phần $= 7$. Số nam $= 35 : 7 \\times 3 = 15$.', d: 'van_dung', o: ['$20$ học sinh', '$15$ học sinh', '$10$ học sinh', '$25$ học sinh'] },
        { q: 'T5-B38-005', c: 'Một hình chữ nhật có nửa chu vi là $10\\text{m}$, chiều dài gấp $4$ lần chiều rộng. Chiều rộng là bao nhiêu?', a: '$2\\text{m}$', s: 'Tổng $= 10$. Tỉ số $4/1$. Tổng số phần $= 5$. Rộng $= 10 : 5 \\times 1 = 2$.', d: 'van_dung', o: ['$2\\text{m}$', '$4\\text{m}$', '$8\\text{m}$', '$5\\text{m}$'] }
      ]
    },
    {
      name: 'Bài 39: Tìm hai số khi biết hiệu và tỉ số của hai số đó',
      questions: [
        { q: 'T5-B39-001', c: 'Bước đầu tiên thường dùng khi giải bài toán tìm hai số khi biết hiệu và tỉ số là gì?', a: 'Tìm hiệu số phần bằng nhau', s: 'Phương pháp giải.', d: 'nhan_biet', o: ['Tìm tổng số phần bằng nhau', 'Tìm hiệu số phần bằng nhau', 'Tìm tích hai số', 'Nhân hai tử số'] },
        { q: 'T5-B39-002', c: 'Hiệu hai số là $10$, tỉ số của hai số là $\\frac{3}{1}$. Hiệu số phần bằng nhau là bao nhiêu?', a: '$2$ phần', s: '$3 - 1 = 2$.', d: 'thong_hieu', o: ['$4$ phần', '$3$ phần', '$2$ phần', '$1$ phần'] },
        { q: 'T5-B39-003', c: 'Hiệu hai số là $15$, tỉ số của hai số là $\\frac{5}{2}$. Giá trị của một phần là bao nhiêu?', a: '$5$', s: 'Hiệu số phần là $3$. Giá trị $1$ phần $= 15 : 3 = 5$.', d: 'thong_hieu', o: ['$3$', '$5$', '$15$', '$7$'] },
        { q: 'T5-B39-004', c: 'Mẹ hơn con $24$ tuổi. Tuổi mẹ gấp $4$ lần tuổi con. Tuổi của con là bao nhiêu?', a: '$8$ tuổi', s: 'Hiệu số phần là $3$. Tuổi con $= 24 : 3 \\times 1 = 8$.', d: 'van_dung', o: ['$6$ tuổi', '$8$ tuổi', '$12$ tuổi', '$32$ tuổi'] },
        { q: 'T5-B39-005', c: 'Chiều dài hơn chiều rộng $5\\text{m}$. Chiều dài bằng $\\frac{3}{2}$ chiều rộng. Chiều rộng là bao nhiêu?', a: '$10\\text{m}$', s: 'Hiệu số phần là $1$. Chiều rộng $= 5 : 1 \\times 2 = 10$.', d: 'van_dung', o: ['$15\\text{m}$', '$10\\text{m}$', '$5\\text{m}$', '$20\\text{m}$'] }
      ]
    },
    {
      name: 'Bài 40: Tìm tỉ số phần trăm của hai số',
      questions: [
        { q: 'T5-B40-001', c: 'Muốn tìm tỉ số phần trăm của hai số $a$ và $b$, ta làm như thế nào?', a: 'Tìm thương $a : b$ rồi nhân với $100$ và viết kí hiệu $\\%$', s: 'Quy tắc.', d: 'nhan_biet', o: ['Lấy $a \\times b$ rồi chia cho $100$', 'Tìm thương $a : b$ rồi nhân với $100$ và viết kí hiệu $\\%$', 'Lấy $a + b$ rồi nhân $100\\%$', 'Chia $100$ cho thương $a:b$'] },
        { q: 'T5-B40-002', c: 'Tìm tỉ số phần trăm của $3$ và $4$:', a: '$75\\%$', s: '$3 : 4 = 0,75 = 75\\%$.', d: 'thong_hieu', o: ['$7,5\\%$', '$75\\%$', '$0,75\\%$', '$34\\%$'] },
        { q: 'T5-B40-003', c: 'Lớp có $40$ học sinh, trong đó có $10$ bạn xếp loại Tốt. Tỉ số phần trăm học sinh Tốt là bao nhiêu?', a: '$25\\%$', s: '$10 : 40 = 0,25 = 25\\%$.', d: 'thong_hieu', o: ['$25\\%$', '$40\\%$', '$10\\%$', '$20\\%$'] },
        { q: 'T5-B40-004', c: 'Một trường có $500$ học sinh, trong đó có $240$ học sinh nữ. Tỉ số phần trăm học sinh nữ là bao nhiêu?', a: '$48\\%$', s: '$240 : 500 = 0,48 = 48\\%$.', d: 'van_dung', o: ['$48\\%$', '$52\\%$', '$24\\%$', '$40\\%$'] },
        { q: 'T5-B40-005', c: 'Giá một món hàng giảm từ $10 000$ đồng xuống còn $8 000$ đồng. Tỉ số phần trăm giá đã giảm so với giá ban đầu là bao nhiêu?', a: '$20\\%$', s: 'Giảm $2000$. Tỉ số phần trăm $= 2000 : 10000 = 20\\%$.', d: 'van_dung', o: ['$80\\%$', '$20\\%$', '$10\\%$', '$25\\%$'] }
      ]
    },
    {
      name: 'Bài 41: Tìm giá trị phần trăm của một số',
      questions: [
        { q: 'T5-B41-001', c: 'Muốn tìm $a\\%$ của $B$, ta làm như thế nào?', a: 'Lấy $B$ chia cho $100$ rồi nhân với $a$ (hoặc $B \\times \\frac{a}{100}$)', s: 'Quy tắc.', d: 'nhan_biet', o: ['Lấy $B \\times a \\times 100$', 'Lấy $B$ chia cho $100$ rồi nhân với $a$', 'Lấy $100$ chia cho $B$ rồi nhân $a$', 'Lấy $B$ cộng với $a$'] },
        { q: 'T5-B41-002', c: 'Tìm $10\\%$ của $200$:', a: '$20$', s: '$200 \\times 10 / 100 = 20$.', d: 'thong_hieu', o: ['$2$', '$20$', '$200$', '$10$'] },
        { q: 'T5-B41-003', c: '$25\\%$ của $40$ lít là bao nhiêu lít?', a: '$10$ lít', s: '$40 \\times 25 / 100 = 10$.', d: 'thong_hieu', o: ['$5$ lít', '$10$ lít', '$20$ lít', '$15$ lít'] },
        { q: 'T5-B41-004', c: 'Một cửa hàng giảm giá $20\\%$ cho một đôi giày giá $300 000$ đồng. Số tiền được giảm là bao nhiêu?', a: '$60 000$ đồng', s: '$300000 \\times 20 / 100 = 60000$.', d: 'van_dung', o: ['$30 000$ đồng', '$60 000$ đồng', '$20 000$ đồng', '$240 000$ đồng'] },
        { q: 'T5-B41-005', c: 'Lãi suất tiết kiệm là $0,5\\%$ một tháng. Gửi $10 000 000$ đồng thì sau một tháng được lãi bao nhiêu tiền?', a: '$50 000$ đồng', s: '$10000000 \\times 0,5 / 100 = 50000$.', d: 'van_dung', o: ['$5 000$ đồng', '$50 000$ đồng', '$500 000$ đồng', '$100 000$ đồng'] }
      ]
    },
    {
      name: 'Bài 45: Thể tích của một hình',
      questions: [
        { q: 'T5-B45-001', c: 'Thể tích của một hình có thể hiểu là gì?', a: 'Là lượng không gian mà hình đó chiếm', s: 'Khái niệm thể tích.', d: 'nhan_biet', o: ['Là độ dài đường bao quanh hình đó', 'Là lượng không gian mà hình đó chiếm', 'Là khối lượng của hình đó', 'Là diện tích các mặt ngoài của hình đó'] },
        { q: 'T5-B45-002', c: 'Để đo thể tích, người ta thường dùng các đơn vị đo nào?', a: '$\\text{cm}^3, \\text{dm}^3, \\text{m}^3$', s: 'Đơn vị đo thể tích.', d: 'nhan_biet', o: ['$\\text{cm}, \\text{dm}, \\text{m}$', '$\\text{cm}^2, \\text{dm}^2, \\text{m}^2$', '$\\text{cm}^3, \\text{dm}^3, \\text{m}^3$', '$\\text{kg}, \\text{g}$'] },
        { q: 'T5-B45-003', c: 'Hình A gồm $5$ hình lập phương nhỏ bằng nhau, hình B gồm $7$ hình lập phương nhỏ như thế. Thể tích hình nào lớn hơn?', a: 'Hình B', s: '$7 > 5$.', d: 'thong_hieu', o: ['Hình A', 'Hình B', 'Bằng nhau', 'Không so sánh được'] },
        { q: 'T5-B45-004', c: 'Hai hình có hình dạng khác nhau nhưng được ghép từ số lượng hình lập phương nhỏ bằng nhau thì thể tích của chúng như thế nào?', a: 'Bằng nhau', s: 'Cùng số lượng hình lập phương nhỏ.', d: 'thong_hieu', o: ['Hình nào cao hơn thì lớn hơn', 'Bằng nhau', 'Hình nào dài hơn thì lớn hơn', 'Khác nhau'] },
        { q: 'T5-B45-005', c: 'Một hình hộp chữ nhật được lấp đầy bởi $12$ khối lập phương có thể tích $1\\text{cm}^3$. Thể tích hình hộp chữ nhật đó là bao nhiêu?', a: '$12\\text{ cm}^3$', s: '$12 \\times 1 = 12$.', d: 'van_dung', o: ['$1\\text{ cm}^3$', '$12\\text{ cm}^3$', '$24\\text{ cm}^3$', '$6\\text{ cm}^3$'] }
      ]
    },
    {
      name: 'Bài 46: Xăng-ti-mét khối. Đề-xi-mét khối',
      questions: [
        { q: 'T5-B46-001', c: 'Kí hiệu xăng-ti-mét khối là gì?', a: '$\\text{cm}^3$', s: 'Kí hiệu.', d: 'nhan_biet', o: ['$\\text{cm}$', '$\\text{cm}^2$', '$\\text{cm}^3$', '$\\text{m}^3$'] },
        { q: 'T5-B46-002', c: 'Kí hiệu đề-xi-mét khối là gì?', a: '$\\text{dm}^3$', s: 'Kí hiệu.', d: 'nhan_biet', o: ['$\\text{dm}$', '$\\text{dm}^2$', '$\\text{dm}^3$', '$\\text{m}^3$'] },
        { q: 'T5-B46-003', c: '$1\\text{ dm}^3$ bằng bao nhiêu $\\text{cm}^3$?', a: '$1 000\\text{ cm}^3$', s: 'Đơn vị liền kề của thể tích gấp $1000$ lần.', d: 'thong_hieu', o: ['$10\\text{ cm}^3$', '$100\\text{ cm}^3$', '$1 000\\text{ cm}^3$', '$10 000\\text{ cm}^3$'] },
        { q: 'T5-B46-004', c: 'Đổi $5\\text{ dm}^3$ ra $\\text{cm}^3$ ta được:', a: '$5 000\\text{ cm}^3$', s: '$5 \\times 1000 = 5000$.', d: 'thong_hieu', o: ['$50\\text{ cm}^3$', '$500\\text{ cm}^3$', '$5 000\\text{ cm}^3$', '$50 000\\text{ cm}^3$'] },
        { q: 'T5-B46-005', c: 'Tính $2\\text{ dm}^3\\ 150\\text{ cm}^3$ bằng bao nhiêu $\\text{cm}^3$?', a: '$2 150\\text{ cm}^3$', s: '$2000 + 150 = 2150$.', d: 'van_dung', o: ['$215\\text{ cm}^3$', '$2 015\\text{ cm}^3$', '$2 150\\text{ cm}^3$', '$2 001\\text{ cm}^3$'] }
      ]
    },
    {
      name: 'Bài 47: Mét khối',
      questions: [
        { q: 'T5-B47-001', c: 'Kí hiệu mét khối là gì?', a: '$\\text{m}^3$', s: 'Kí hiệu.', d: 'nhan_biet', o: ['$\\text{m}$', '$\\text{m}^2$', '$\\text{m}^3$', '$\\text{cm}^3$'] },
        { q: 'T5-B47-002', c: '$1\\text{ m}^3$ bằng bao nhiêu $\\text{dm}^3$?', a: '$1 000\\text{ dm}^3$', s: 'Đơn vị liền kề của thể tích gấp $1000$ lần.', d: 'nhan_biet', o: ['$10\\text{ dm}^3$', '$100\\text{ dm}^3$', '$1 000\\text{ dm}^3$', '$10 000\\text{ dm}^3$'] },
        { q: 'T5-B47-003', c: 'Đổi $1\\text{ m}^3$ sang $\\text{cm}^3$ ta được bao nhiêu?', a: '$1 000 000\\text{ cm}^3$', s: '$1000 \\times 1000 = 1 000 000$.', d: 'thong_hieu', o: ['$1 000\\text{ cm}^3$', '$10 000\\text{ cm}^3$', '$100 000\\text{ cm}^3$', '$1 000 000\\text{ cm}^3$'] },
        { q: 'T5-B47-004', c: '$3,5\\text{ m}^3$ bằng bao nhiêu $\\text{dm}^3$?', a: '$3 500\\text{ dm}^3$', s: '$3,5 \\times 1000 = 3500$.', d: 'thong_hieu', o: ['$350\\text{ dm}^3$', '$3 500\\text{ dm}^3$', '$35\\text{ dm}^3$', '$35 000\\text{ dm}^3$'] },
        { q: 'T5-B47-005', c: 'Một bể nước có thể tích $2\\text{ m}^3$. Hỏi bể đó chứa được tối đa bao nhiêu lít nước? (Biết $1$ lít = $1\\text{ dm}^3$)', a: '$2 000$ lít', s: '$2\\text{ m}^3 = 2 000\\text{ dm}^3 = 2 000$ lít.', d: 'van_dung', o: ['$20$ lít', '$200$ lít', '$2 000$ lít', '$20 000$ lít'] }
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
  
  console.log('\n✅ Hoàn thành Batch 3 Lớp 5');
}

insertGrade5Batch3().catch(console.error);
