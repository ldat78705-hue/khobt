import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);

async function insertGrade5Batch4() {
  console.log('Khởi tạo kết nối CSDL...');
  
  const users = await sql`SELECT user_id FROM public.questions WHERE user_id IS NOT NULL LIMIT 1`;
  const defaultUserId = users.length > 0 ? users[0].user_id : '00000000-0000-0000-0000-000000000000';

  const topics = [
    {
      name: 'Bài 50: Diện tích xung quanh và diện tích toàn phần của hình hộp chữ nhật',
      questions: [
        { q: 'T5-B50-001', c: 'Diện tích xung quanh của hình hộp chữ nhật bằng đại lượng nào nhân với chiều cao?', a: 'Chu vi đáy', s: '$S_{xq} = C_{đáy} \\times h$.', d: 'nhan_biet', o: ['Diện tích đáy', 'Chu vi đáy', 'Chiều dài', 'Chiều rộng'] },
        { q: 'T5-B50-002', c: 'Diện tích toàn phần của hình hộp chữ nhật bằng tổng diện tích xung quanh và diện tích mấy mặt đáy?', a: '$2$ mặt đáy', s: 'Hình hộp chữ nhật có 2 mặt đáy.', d: 'nhan_biet', o: ['$1$ mặt đáy', '$2$ mặt đáy', '$4$ mặt đáy', '$6$ mặt đáy'] },
        { q: 'T5-B50-003', c: 'Hình hộp chữ nhật có chu vi đáy $20\\text{cm}$, chiều cao $5\\text{cm}$. Diện tích xung quanh là bao nhiêu?', a: '$100\\text{ cm}^2$', s: '$20 \\times 5 = 100$.', d: 'thong_hieu', o: ['$50\\text{ cm}^2$', '$100\\text{ cm}^2$', '$25\\text{ cm}^2$', '$200\\text{ cm}^2$'] },
        { q: 'T5-B50-004', c: 'Mặt đáy hình hộp chữ nhật có chiều dài $4\\text{cm}$, chiều rộng $3\\text{cm}$. Diện tích một mặt đáy là bao nhiêu?', a: '$12\\text{ cm}^2$', s: '$4 \\times 3 = 12$.', d: 'thong_hieu', o: ['$7\\text{ cm}^2$', '$14\\text{ cm}^2$', '$12\\text{ cm}^2$', '$24\\text{ cm}^2$'] },
        { q: 'T5-B50-005', c: 'Hình hộp chữ nhật có diện tích xung quanh là $100\\text{ cm}^2$, diện tích một mặt đáy là $12\\text{ cm}^2$. Diện tích toàn phần là bao nhiêu?', a: '$124\\text{ cm}^2$', s: '$100 + 12 \\times 2 = 124$.', d: 'van_dung', o: ['$112\\text{ cm}^2$', '$124\\text{ cm}^2$', '$224\\text{ cm}^2$', '$100\\text{ cm}^2$'] }
      ]
    },
    {
      name: 'Bài 51: Diện tích xung quanh và diện tích toàn phần của hình lập phương',
      questions: [
        { q: 'T5-B51-001', c: 'Diện tích xung quanh của hình lập phương bằng diện tích một mặt nhân với mấy?', a: '$4$', s: 'Hình lập phương có 4 mặt xung quanh.', d: 'nhan_biet', o: ['$2$', '$4$', '$6$', '$8$'] },
        { q: 'T5-B51-002', c: 'Diện tích toàn phần của hình lập phương bằng diện tích một mặt nhân với mấy?', a: '$6$', s: 'Hình lập phương có 6 mặt bằng nhau.', d: 'nhan_biet', o: ['$4$', '$6$', '$8$', '$12$'] },
        { q: 'T5-B51-003', c: 'Hình lập phương có cạnh $5\\text{cm}$. Diện tích một mặt là bao nhiêu?', a: '$25\\text{ cm}^2$', s: '$5 \\times 5 = 25$.', d: 'thong_hieu', o: ['$20\\text{ cm}^2$', '$25\\text{ cm}^2$', '$10\\text{ cm}^2$', '$125\\text{ cm}^2$'] },
        { q: 'T5-B51-004', c: 'Diện tích xung quanh của hình lập phương có cạnh $5\\text{cm}$ là bao nhiêu?', a: '$100\\text{ cm}^2$', s: '$25 \\times 4 = 100$.', d: 'thong_hieu', o: ['$100\\text{ cm}^2$', '$150\\text{ cm}^2$', '$125\\text{ cm}^2$', '$50\\text{ cm}^2$'] },
        { q: 'T5-B51-005', c: 'Hình lập phương có diện tích toàn phần là $150\\text{ cm}^2$. Cạnh của hình lập phương đó là bao nhiêu?', a: '$5\\text{cm}$', s: 'Diện tích $1$ mặt $= 150 : 6 = 25$. Suy ra cạnh $= 5$.', d: 'van_dung', o: ['$4\\text{cm}$', '$5\\text{cm}$', '$6\\text{cm}$', '$25\\text{cm}$'] }
      ]
    },
    {
      name: 'Bài 52: Thể tích của hình hộp chữ nhật',
      questions: [
        { q: 'T5-B52-001', c: 'Thể tích hình hộp chữ nhật được tính bằng tích của ba kích thước nào (cùng đơn vị đo)?', a: 'Chiều dài, chiều rộng, chiều cao', s: 'Công thức $V = a \\times b \\times c$.', d: 'nhan_biet', o: ['Chiều dài, chiều rộng, chu vi đáy', 'Chiều dài, chiều rộng, diện tích đáy', 'Chiều dài, chiều rộng, chiều cao', 'Đáy lớn, đáy bé, chiều cao'] },
        { q: 'T5-B52-002', c: 'Hình hộp chữ nhật có chiều dài $5\\text{cm}$, chiều rộng $4\\text{cm}$, chiều cao $3\\text{cm}$. Thể tích là bao nhiêu?', a: '$60\\text{ cm}^3$', s: '$5 \\times 4 \\times 3 = 60$.', d: 'thong_hieu', o: ['$12\\text{ cm}^3$', '$60\\text{ cm}^3$', '$94\\text{ cm}^3$', '$20\\text{ cm}^3$'] },
        { q: 'T5-B52-003', c: 'Hình hộp chữ nhật có diện tích đáy $20\\text{ m}^2$, chiều cao $4\\text{m}$. Thể tích là bao nhiêu?', a: '$80\\text{ m}^3$', s: '$20 \\times 4 = 80$.', d: 'thong_hieu', o: ['$24\\text{ m}^3$', '$80\\text{ m}^3$', '$160\\text{ m}^3$', '$40\\text{ m}^3$'] },
        { q: 'T5-B52-004', c: 'Một hình hộp chữ nhật có thể tích $120\\text{ cm}^3$, chiều dài $6\\text{cm}$, chiều rộng $4\\text{cm}$. Chiều cao của hình hộp đó là bao nhiêu?', a: '$5\\text{cm}$', s: '$h = 120 : (6 \\times 4) = 120 : 24 = 5$.', d: 'van_dung', o: ['$4\\text{cm}$', '$5\\text{cm}$', '$6\\text{cm}$', '$10\\text{cm}$'] },
        { q: 'T5-B52-005', c: 'Thể tích một bể bơi dài $50\\text{m}$, rộng $20\\text{m}$, sâu $2\\text{m}$ là bao nhiêu?', a: '$2 000\\text{ m}^3$', s: '$50 \\times 20 \\times 2 = 2000$.', d: 'van_dung', o: ['$1 000\\text{ m}^3$', '$2 000\\text{ m}^3$', '$100\\text{ m}^3$', '$4 000\\text{ m}^3$'] }
      ]
    },
    {
      name: 'Bài 53: Thể tích của hình lập phương',
      questions: [
        { q: 'T5-B53-001', c: 'Công thức tính thể tích hình lập phương có cạnh $a$ là gì?', a: '$V = a \\times a \\times a$', s: 'Thể tích bằng lập phương của cạnh.', d: 'nhan_biet', o: ['$V = a \\times a \\times 4$', '$V = a \\times a \\times 6$', '$V = a \\times a \\times a$', '$V = a \\times 3$'] },
        { q: 'T5-B53-002', c: 'Hình lập phương có cạnh $4\\text{cm}$. Thể tích là bao nhiêu?', a: '$64\\text{ cm}^3$', s: '$4 \\times 4 \\times 4 = 64$.', d: 'thong_hieu', o: ['$16\\text{ cm}^3$', '$64\\text{ cm}^3$', '$48\\text{ cm}^3$', '$12\\text{ cm}^3$'] },
        { q: 'T5-B53-003', c: 'Hình lập phương có cạnh $10\\text{dm}$. Thể tích là bao nhiêu lít? (Biết $1\\text{dm}^3 = 1$ lít)', a: '$1 000$ lít', s: '$10 \\times 10 \\times 10 = 1000\\text{ dm}^3 = 1000$ lít.', d: 'thong_hieu', o: ['$100$ lít', '$1 000$ lít', '$10 000$ lít', '$30$ lít'] },
        { q: 'T5-B53-004', c: 'Một khối gỗ hình lập phương có cạnh $5\\text{cm}$. Thể tích khối gỗ đó là bao nhiêu?', a: '$125\\text{ cm}^3$', s: '$5 \\times 5 \\times 5 = 125$.', d: 'van_dung', o: ['$25\\text{ cm}^3$', '$125\\text{ cm}^3$', '$150\\text{ cm}^3$', '$100\\text{ cm}^3$'] },
        { q: 'T5-B53-005', c: 'Một hình lập phương có thể tích $27\\text{ cm}^3$. Cạnh của hình lập phương đó là bao nhiêu?', a: '$3\\text{cm}$', s: '$3 \\times 3 \\times 3 = 27$.', d: 'van_dung', o: ['$2\\text{cm}$', '$3\\text{cm}$', '$4\\text{cm}$', '$9\\text{cm}$'] }
      ]
    },
    {
      name: 'Bài 56: Các đơn vị đo thời gian',
      questions: [
        { q: 'T5-B56-001', c: '$1$ năm thường (không nhuận) có bao nhiêu ngày?', a: '$365$ ngày', s: 'Kiến thức chung.', d: 'nhan_biet', o: ['$360$ ngày', '$364$ ngày', '$365$ ngày', '$366$ ngày'] },
        { q: 'T5-B56-002', c: '$1$ năm nhuận có bao nhiêu ngày?', a: '$366$ ngày', s: 'Kiến thức chung.', d: 'nhan_biet', o: ['$365$ ngày', '$366$ ngày', '$367$ ngày', '$360$ ngày'] },
        { q: 'T5-B56-003', c: '$2$ năm $3$ tháng bằng bao nhiêu tháng?', a: '$27$ tháng', s: '$2 \\times 12 + 3 = 27$.', d: 'thong_hieu', o: ['$15$ tháng', '$24$ tháng', '$27$ tháng', '$30$ tháng'] },
        { q: 'T5-B56-004', c: '$1,5$ giờ bằng bao nhiêu phút?', a: '$90$ phút', s: '$1,5 \\times 60 = 90$.', d: 'thong_hieu', o: ['$60$ phút', '$90$ phút', '$150$ phút', '$75$ phút'] },
        { q: 'T5-B56-005', c: '$120$ phút bằng bao nhiêu giờ?', a: '$2$ giờ', s: '$120 : 60 = 2$.', d: 'van_dung', o: ['$1,5$ giờ', '$2$ giờ', '$2,5$ giờ', '$3$ giờ'] }
      ]
    },
    {
      name: 'Bài 57: Cộng, trừ số đo thời gian',
      questions: [
        { q: 'T5-B57-001', c: 'Khi cộng hai số đo thời gian, nếu số đo phút lớn hơn hoặc bằng $60$, ta phải làm gì?', a: 'Đổi phần nguyên của phút sang giờ', s: '$60$ phút $= 1$ giờ.', d: 'nhan_biet', o: ['Giữ nguyên', 'Trừ đi $100$', 'Đổi phần nguyên của phút sang giờ', 'Chia cho $10$'] },
        { q: 'T5-B57-002', c: 'Tính: $2$ giờ $15$ phút $+$ $1$ giờ $30$ phút = ?', a: '$3$ giờ $45$ phút', s: '$2+1=3, 15+30=45$.', d: 'thong_hieu', o: ['$3$ giờ $15$ phút', '$3$ giờ $45$ phút', '$4$ giờ', '$4$ giờ $45$ phút'] },
        { q: 'T5-B57-003', c: 'Tính: $3$ giờ $20$ phút $-$ $1$ giờ $10$ phút = ?', a: '$2$ giờ $10$ phút', s: '$3-1=2, 20-10=10$.', d: 'thong_hieu', o: ['$2$ giờ $10$ phút', '$2$ giờ $30$ phút', '$4$ giờ $30$ phút', '$1$ giờ $10$ phút'] },
        { q: 'T5-B57-004', c: 'Tính: $4$ giờ $15$ phút $-$ $2$ giờ $30$ phút = ?', a: '$1$ giờ $45$ phút', s: 'Đổi thành $3$ giờ $75$ phút trừ đi $2$ giờ $30$ phút bằng $1$ giờ $45$ phút.', d: 'van_dung', o: ['$1$ giờ $45$ phút', '$2$ giờ $15$ phút', '$2$ giờ $45$ phút', '$1$ giờ $15$ phút'] },
        { q: 'T5-B57-005', c: 'Tính: $1$ năm $6$ tháng $+$ $2$ năm $8$ tháng = ?', a: '$4$ năm $2$ tháng', s: '$3$ năm $14$ tháng $= 4$ năm $2$ tháng.', d: 'van_dung', o: ['$3$ năm $4$ tháng', '$4$ năm $2$ tháng', '$3$ năm $14$ tháng', '$4$ năm $4$ tháng'] }
      ]
    },
    {
      name: 'Bài 58: Nhân, chia số đo thời gian với một số',
      questions: [
        { q: 'T5-B58-001', c: 'Tính: $1$ giờ $15$ phút $\\times 3 = ?$?', a: '$3$ giờ $45$ phút', s: '$1 \\times 3=3, 15 \\times 3=45$.', d: 'nhan_biet', o: ['$3$ giờ $15$ phút', '$3$ giờ $45$ phút', '$4$ giờ $45$ phút', '$3$ giờ $30$ phút'] },
        { q: 'T5-B58-002', c: 'Tính: $2$ giờ $20$ phút $\\times 4 = ?$?', a: '$9$ giờ $20$ phút', s: '$8$ giờ $80$ phút $= 9$ giờ $20$ phút.', d: 'thong_hieu', o: ['$8$ giờ $80$ phút', '$8$ giờ $20$ phút', '$9$ giờ $20$ phút', '$9$ giờ $40$ phút'] },
        { q: 'T5-B58-003', c: 'Tính: $6$ giờ $30$ phút $: 3 = ?$?', a: '$2$ giờ $10$ phút', s: '$6:3=2, 30:3=10$.', d: 'thong_hieu', o: ['$2$ giờ $15$ phút', '$2$ giờ $10$ phút', '$3$ giờ $10$ phút', '$2$ giờ $30$ phút'] },
        { q: 'T5-B58-004', c: 'Tính: $7$ giờ $15$ phút $: 5 = ?$?', a: '$1$ giờ $27$ phút', s: '$7\\text{h }15\\text{p} = 435\\text{p}$. $435 : 5 = 87\\text{p} = 1\\text{h }27\\text{p}$.', d: 'van_dung', o: ['$1$ giờ $25$ phút', '$1$ giờ $27$ phút', '$1$ giờ $15$ phút', '$2$ giờ $7$ phút'] },
        { q: 'T5-B58-005', c: 'Tính: $2$ phút $30$ giây $\\times 2 = ?$?', a: '$5$ phút', s: '$4$ phút $60$ giây $= 5$ phút.', d: 'van_dung', o: ['$4$ phút $30$ giây', '$5$ phút', '$4$ phút $60$ giây', '$5$ phút $30$ giây'] }
      ]
    },
    {
      name: 'Bài 59: Vận tốc của một chuyển động đều',
      questions: [
        { q: 'T5-B59-001', c: 'Kí hiệu của đại lượng vận tốc thường được viết là chữ gì?', a: '$v$', s: 'Velocity.', d: 'nhan_biet', o: ['$s$', '$t$', '$v$', '$m$'] },
        { q: 'T5-B59-002', c: 'Công thức tính vận tốc khi biết quãng đường $s$ và thời gian $t$ là gì?', a: '$v = s : t$', s: 'Vận tốc bằng quãng đường chia thời gian.', d: 'nhan_biet', o: ['$v = s \\times t$', '$v = s : t$', '$v = t : s$', '$v = s + t$'] },
        { q: 'T5-B59-003', c: 'Một ô tô đi được quãng đường $100\\text{km}$ trong $2$ giờ. Vận tốc của ô tô là bao nhiêu?', a: '$50\\text{ km/h}$', s: '$100 : 2 = 50$.', d: 'thong_hieu', o: ['$200\\text{ km/h}$', '$50\\text{ km/h}$', '$20\\text{ km/h}$', '$102\\text{ km/h}$'] },
        { q: 'T5-B59-004', c: 'Một người chạy quãng đường $400\\text{m}$ trong $100$ giây. Vận tốc chạy của người đó là:', a: '$4\\text{ m/s}$', s: '$400 : 100 = 4$.', d: 'thong_hieu', o: ['$40\\text{ m/s}$', '$400\\text{ m/s}$', '$4\\text{ m/s}$', '$0,25\\text{ m/s}$'] },
        { q: 'T5-B59-005', c: 'Một xe máy đi quãng đường $45\\text{km}$ hết $1$ giờ $30$ phút. Vận tốc của xe máy là:', a: '$30\\text{ km/h}$', s: '$1\\text{h }30\\text{p} = 1,5\\text{h}$. $v = 45 : 1,5 = 30$.', d: 'van_dung', o: ['$45\\text{ km/h}$', '$30\\text{ km/h}$', '$22,5\\text{ km/h}$', '$35\\text{ km/h}$'] }
      ]
    },
    {
      name: 'Bài 60: Quãng đường, thời gian của một chuyển động đều',
      questions: [
        { q: 'T5-B60-001', c: 'Công thức tính quãng đường $s$ khi biết vận tốc $v$ và thời gian $t$ là gì?', a: '$s = v \\times t$', s: 'Quãng đường bằng vận tốc nhân thời gian.', d: 'nhan_biet', o: ['$s = v : t$', '$s = t : v$', '$s = v \\times t$', '$s = v + t$'] },
        { q: 'T5-B60-002', c: 'Công thức tính thời gian $t$ khi biết quãng đường $s$ và vận tốc $v$ là gì?', a: '$t = s : v$', s: 'Thời gian bằng quãng đường chia vận tốc.', d: 'nhan_biet', o: ['$t = s \\times v$', '$t = s : v$', '$t = v : s$', '$t = s - v$'] },
        { q: 'T5-B60-003', c: 'Một xe máy đi với vận tốc $40\\text{ km/h}$ trong $2$ giờ. Quãng đường xe máy đã đi là bao nhiêu?', a: '$80\\text{ km}$', s: '$40 \\times 2 = 80$.', d: 'thong_hieu', o: ['$20\\text{ km}$', '$42\\text{ km}$', '$80\\text{ km}$', '$800\\text{ km}$'] },
        { q: 'T5-B60-004', c: 'Quãng đường dài $120\\text{km}$, một ô tô đi với vận tốc $60\\text{ km/h}$. Thời gian ô tô đi hết quãng đường là:', a: '$2$ giờ', s: '$120 : 60 = 2$.', d: 'thong_hieu', o: ['$0,5$ giờ', '$2$ giờ', '$72$ giờ', '$720$ giờ'] },
        { q: 'T5-B60-005', c: 'Một người đi xe đạp với vận tốc $30\\text{ km/h}$, đi từ $7$ giờ đến $9$ giờ $30$ phút. Quãng đường người đó đã đi là:', a: '$75\\text{ km}$', s: 'Thời gian đi là $2,5$ giờ. $s = 30 \\times 2,5 = 75$.', d: 'van_dung', o: ['$60\\text{ km}$', '$75\\text{ km}$', '$90\\text{ km}$', '$105\\text{ km}$'] }
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
  
  console.log('\n✅ Hoàn thành Batch 4 Lớp 5');
}

insertGrade5Batch4().catch(console.error);
