import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);

async function insertGrade5Batch5() {
  console.log('Khởi tạo kết nối CSDL...');
  
  const users = await sql`SELECT user_id FROM public.questions WHERE user_id IS NOT NULL LIMIT 1`;
  const defaultUserId = users.length > 0 ? users[0].user_id : '00000000-0000-0000-0000-000000000000';

  const topics = [
    {
      name: 'Bài 63: Thu thập, phân loại, sắp xếp các số liệu',
      questions: [
        { q: 'T5-B63-001', c: 'Mục đích chính của việc thu thập số liệu thống kê là gì?', a: 'Để có thông tin chính xác về một vấn đề cần quan tâm', s: 'Thu thập số liệu giúp nắm bắt thông tin.', d: 'nhan_biet', o: ['Để tạo ra các biểu đồ đẹp mắt', 'Để làm cho bài toán phức tạp hơn', 'Để có thông tin chính xác về một vấn đề cần quan tâm', 'Không có mục đích gì'] },
        { q: 'T5-B63-002', c: 'Sau khi thu thập được các số liệu, bước tiếp theo ta thường làm gì?', a: 'Phân loại và sắp xếp số liệu', s: 'Xử lý số liệu thô.', d: 'nhan_biet', o: ['Phân loại và sắp xếp số liệu', 'Vẽ ngay biểu đồ', 'Cộng tất cả lại', 'Xóa số liệu đi'] },
        { q: 'T5-B63-003', c: 'Bảng số liệu thống kê giúp chúng ta điều gì?', a: 'Nhìn rõ được tổng thể các số liệu đã thu thập và phân loại', s: 'Giúp thông tin dễ đọc, dễ so sánh.', d: 'thong_hieu', o: ['Biết trước kết quả tương lai', 'Nhìn rõ được tổng thể các số liệu đã thu thập và phân loại', 'Giấu kín thông tin', 'Tính được chính xác tỉ số phần trăm'] },
        { q: 'T5-B63-004', c: 'Khi sắp xếp dãy số liệu $12, 5, 10, 8$ theo thứ tự từ bé đến lớn ta được dãy nào?', a: '$5, 8, 10, 12$', s: '$5 < 8 < 10 < 12$.', d: 'van_dung', o: ['$12, 10, 8, 5$', '$5, 10, 8, 12$', '$5, 8, 10, 12$', '$8, 5, 10, 12$'] },
        { q: 'T5-B63-005', c: 'Một tổ có $4$ bạn chiều cao lần lượt là: $140\\text{cm}, 138\\text{cm}, 145\\text{cm}, 142\\text{cm}$. Bạn cao nhất có chiều cao là:', a: '$145\\text{cm}$', s: 'Số lớn nhất trong dãy là $145$.', d: 'van_dung', o: ['$138\\text{cm}$', '$140\\text{cm}$', '$142\\text{cm}$', '$145\\text{cm}$'] }
      ]
    },
    {
      name: 'Bài 64: Biểu đồ hình quạt tròn',
      questions: [
        { q: 'T5-B64-001', c: 'Biểu đồ hình quạt tròn biểu diễn các phần của một tổng thể bằng hình gì?', a: 'Các hình quạt tròn', s: 'Tên gọi đã thể hiện: hình quạt tròn.', d: 'nhan_biet', o: ['Các cột hình chữ nhật', 'Các đoạn thẳng', 'Các hình quạt tròn', 'Các hình tam giác'] },
        { q: 'T5-B64-002', c: 'Cả hình tròn trong biểu đồ hình quạt tròn tương ứng với bao nhiêu phần trăm?', a: '$100\\%$', s: 'Cả hình tròn đại diện cho tổng số (100%).', d: 'nhan_biet', o: ['$10\\%$', '$50\\%$', '$100\\%$', '$360\\%$'] },
        { q: 'T5-B64-003', c: 'Trong biểu đồ hình quạt tròn, phần chiếm $50\\%$ sẽ được biểu diễn bằng phần hình nào?', a: 'Một nửa hình tròn', s: '$50\\% = 1/2$.', d: 'thong_hieu', o: ['Một phần tư hình tròn', 'Một nửa hình tròn', 'Cả hình tròn', 'Một góc vuông'] },
        { q: 'T5-B64-004', c: 'Trong biểu đồ hình quạt tròn, nếu một thành phần chiếm $25\\%$ thì nó bằng bao nhiêu phần của hình tròn?', a: '$\\frac{1}{4}$ hình tròn', s: '$25\\% = 25/100 = 1/4$.', d: 'thong_hieu', o: ['$\\frac{1}{2}$ hình tròn', '$\\frac{1}{3}$ hình tròn', '$\\frac{1}{4}$ hình tròn', '$\\frac{1}{5}$ hình tròn'] },
        { q: 'T5-B64-005', c: 'Biểu đồ hình quạt tròn cho biết có $40\\%$ số học sinh thích chơi bóng đá. Hỏi trong $200$ học sinh thì có bao nhiêu bạn thích bóng đá?', a: '$80$ bạn', s: '$200 \\times 40 / 100 = 80$.', d: 'van_dung', o: ['$40$ bạn', '$80$ bạn', '$100$ bạn', '$120$ bạn'] }
      ]
    },
    {
      name: 'Bài 65: Tỉ số của số lần lặp lại một sự kiện so với tổng số lần thực hiện',
      questions: [
        { q: 'T5-B65-001', c: 'Tỉ số của số lần lặp lại một sự kiện so với tổng số lần thực hiện được tính bằng công thức nào?', a: 'Số lần sự kiện xảy ra chia cho tổng số lần thực hiện', s: 'Định nghĩa xác suất thực nghiệm.', d: 'nhan_biet', o: ['Tổng số lần thực hiện chia cho số lần sự kiện xảy ra', 'Số lần sự kiện xảy ra nhân với tổng số lần thực hiện', 'Số lần sự kiện xảy ra chia cho tổng số lần thực hiện', 'Số lần sự kiện xảy ra cộng tổng số lần'] },
        { q: 'T5-B65-002', c: 'Nếu tung một đồng xu $10$ lần và mặt sấp xuất hiện $6$ lần, tỉ số của số lần xuất hiện mặt sấp là bao nhiêu?', a: '$\\frac{6}{10}$ (hoặc $\\frac{3}{5}$)', s: '$6 / 10$.', d: 'thong_hieu', o: ['$\\frac{4}{10}$', '$\\frac{6}{10}$ (hoặc $\\frac{3}{5}$)', '$\\frac{10}{6}$', '$\\frac{1}{2}$'] },
        { q: 'T5-B65-003', c: 'Gieo xúc xắc $20$ lần, mặt $1$ chấm xuất hiện $4$ lần. Tỉ số của số lần xuất hiện mặt $1$ chấm so với tổng số lần gieo là:', a: '$\\frac{4}{20}$ (hoặc $\\frac{1}{5}$)', s: '$4 / 20 = 1 / 5$.', d: 'thong_hieu', o: ['$\\frac{1}{4}$', '$\\frac{4}{20}$ (hoặc $\\frac{1}{5}$)', '$\\frac{20}{4}$', '$\\frac{1}{6}$'] },
        { q: 'T5-B65-004', c: 'Quay một vòng quay $50$ lần, mũi tên chỉ vào ô màu đỏ $15$ lần. Tỉ số phần trăm mũi tên chỉ vào ô màu đỏ là bao nhiêu?', a: '$30\\%$', s: '$15 / 50 = 30 / 100 = 30\\%$.', d: 'van_dung', o: ['$15\\%$', '$30\\%$', '$50\\%$', '$45\\%$'] },
        { q: 'T5-B65-005', c: 'Một bạn bốc ngẫu nhiên một viên bi từ hộp rồi trả lại, lặp lại $100$ lần. Bi xanh xuất hiện $45$ lần. Tỉ số số lần bốc được bi xanh là:', a: '$\\frac{45}{100}$ (hoặc $45\\%$)', s: '$45/100$.', d: 'van_dung', o: ['$\\frac{55}{100}$', '$\\frac{45}{100}$ (hoặc $45\\%$)', '$\\frac{100}{45}$', '$\\frac{1}{2}$'] }
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
  
  console.log('\n✅ Hoàn thành Batch 5 Lớp 5 (Đã xong toàn bộ Lớp 5)');
}

insertGrade5Batch5().catch(console.error);
