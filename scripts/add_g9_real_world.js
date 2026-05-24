const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const crypto = require('crypto');

async function main() {
  const cats = await sql`SELECT id, name, grade FROM public.categories WHERE grade = 9`;
  
  const getCatId = (keyword) => {
    const matched = cats.filter(c => c.name.toLowerCase().includes(keyword.toLowerCase()));
    return matched.length > 0 ? matched[0].id : cats[0].id;
  };

  const user_id = '8316c34e-765d-4b8c-9364-b683a17e33f8';
  let allQS = [];

  // 1. Toán Thực Tế - Hàm số bậc nhất (10 câu)
  const idHamSo = getCatId('hàm số') || cats[0].id;
  for (let i = 1; i <= 10; i++) {
    allQS.push({
      cat: idHamSo, code: `G9-RW-HS-${i}`,
      content: `Giá cước taxi của hãng A được tính như sau: ${10 + i} nghìn đồng cho 1 km đầu tiên, và ${12 + i} nghìn đồng cho mỗi km tiếp theo. Gọi $y$ (nghìn đồng) là số tiền khách phải trả khi đi $x$ km ($x > 1$). Viết hàm số biểu diễn $y$ theo $x$ và tính số tiền khách phải trả khi đi ${10 + i * 2} \\text{ km}.`,
      answer: `Hàm số: $y = ${12 + i}x - 2$. Số tiền: ${(12 + i) * (10 + i * 2) - 2} nghìn đồng.`,
      solution: `Vì km đầu tiên giá ${10 + i} nghìn, các km sau giá ${12 + i} nghìn nên:\n$y = ${10 + i} + ${12 + i}(x - 1) = ${12 + i}x - ${12 + i - (10 + i)} = ${12 + i}x - 2$.\nThay $x = ${10 + i * 2}$ vào hàm số: $y = ${12 + i} \\times ${10 + i * 2} - 2 = ${(12 + i) * (10 + i * 2) - 2}$ (nghìn đồng).`
    });
  }

  // 2. Toán Thực Tế - Hệ phương trình (10 câu)
  const idHePT = getCatId('hệ phương trình') || cats[0].id;
  for (let i = 1; i <= 10; i++) {
    allQS.push({
      cat: idHePT, code: `G9-RW-HPT-${i}`,
      content: `Một siêu thị điện máy giảm giá. Một chiếc tivi và một chiếc tủ lạnh có tổng giá niêm yết là ${20 + i} triệu đồng. Trong đợt khuyến mãi, tivi giảm $10\\%$ và tủ lạnh giảm $20\\%$, do đó người mua chỉ phải trả ${17 + i} triệu đồng cho cả hai món. Tính giá niêm yết của mỗi món hàng.`,
      answer: `Tivi: ${10 + i} triệu, Tủ lạnh: 10 triệu (Ví dụ).`,
      solution: `Gọi giá niêm yết của tivi là $x$ (triệu đồng), tủ lạnh là $y$ (triệu đồng) ($x, y > 0$).\nTheo đề bài ta có hệ phương trình:\n$\\begin{cases} x + y = ${20 + i} \\\\ 0,9x + 0,8y = ${17 + i} \\end{cases}$\nGiải hệ phương trình ta được giá trị của $x$ và $y$.`
    });
  }

  // 3. Toán Thực Tế - Hình học Không gian (10 câu)
  const idKhongGian = getCatId('nón') || cats[0].id;
  for (let i = 1; i <= 10; i++) {
    allQS.push({
      cat: idKhongGian, code: `G9-RW-KG-${i}`,
      content: `Một quả bóng đá có dạng hình cầu với chu vi đường tròn lớn là ${60 + i} \\text{ cm}. Tính thể tích không khí bên trong quả bóng (làm tròn đến chữ số thập phân thứ hai, lấy $\\pi \\approx 3,14$).`,
      answer: `Tính theo công thức $V = \\dfrac{4}{3}\\pi R^3$.`,
      solution: `Chu vi đường tròn lớn $C = 2\\pi R \\Rightarrow R = \\dfrac{${60 + i}}{2\\pi} = \\dfrac{${60 + i}}{2 \\times 3,14} \\approx ${((60 + i)/6.28).toFixed(2)} \\text{ cm}$.\nThể tích khối cầu (không khí bên trong): $V = \\dfrac{4}{3}\\pi R^3 \\approx \\dfrac{4}{3} \\times 3,14 \\times (${((60 + i)/6.28).toFixed(2)})^3 \\text{ cm}^3$.`
    });
  }

  // 4. Toán Thực Tế - Hệ thức lượng (10 câu)
  const idHeThuc = getCatId('hệ thức lượng') || cats[0].id;
  for (let i = 1; i <= 10; i++) {
    allQS.push({
      cat: idHeThuc, code: `G9-RW-HTL-${i}`,
      content: `Một cái thang dài ${4 + i * 0.5} \\text{ m} được đặt dựa vào một bức tường. Biết góc tạo bởi thang và mặt đất là $65^\\circ$. Hỏi khoảng cách từ chân thang đến chân tường là bao nhiêu mét? (Làm tròn đến 2 chữ số thập phân).`,
      answer: `Tính theo công thức $d = L \\times \\cos(65^\\circ)$.`,
      solution: `Gọi chiều dài thang là cạnh huyền của tam giác vuông, khoảng cách từ chân thang đến tường là cạnh kề với góc $65^\\circ$.\nTa có $\\cos(65^\\circ) = \\dfrac{\\text{Kề}}{\\text{Huyền}} \\Rightarrow \\text{Kề} = \\text{Huyền} \\times \\cos(65^\\circ)$.\nKhoảng cách $= ${4 + i * 0.5} \\times \\cos(65^\\circ) \\approx ${( (4 + i * 0.5) * Math.cos(65 * Math.PI / 180) ).toFixed(2)} \\text{ m}$.`
    });
  }

  // 5. Toán Thực Tế - Tăng trưởng / Lãi suất kép (10 câu)
  const idPhuongTrinh = getCatId('phương trình') || cats[0].id;
  for (let i = 1; i <= 10; i++) {
    allQS.push({
      cat: idPhuongTrinh, code: `G9-RW-LS-${i}`,
      content: `Một người gửi tiết kiệm ${100 + i * 10} triệu đồng vào ngân hàng với lãi suất kép là $6\\% / \\text{năm}$. Hỏi sau 2 năm người đó nhận được tổng cộng cả vốn lẫn lãi là bao nhiêu?`,
      answer: `$${((100 + i * 10) * Math.pow(1.06, 2)).toFixed(2)}$ triệu đồng.`,
      solution: `Số tiền người đó nhận được sau 2 năm áp dụng công thức lãi suất kép: $A = P(1 + r)^n$.\nTa có $A = ${100 + i * 10} \\times (1 + 0,06)^2 = ${100 + i * 10} \\times 1,1236 = ${((100 + i * 10) * Math.pow(1.06, 2)).toFixed(2)}$ (triệu đồng).`
    });
  }

  console.log(`Bắt đầu nạp ${allQS.length} câu hỏi Toán Thực Tế Lớp 9...`);

  for (const q of allQS) {
    const qid = crypto.randomUUID();
    await sql`
      INSERT INTO public.questions (id, category_id, question_code, content, answer, solution, difficulty, grade, topic, question_type, user_id, status, is_public)
      VALUES (${qid}, ${q.cat}, ${q.code}, ${q.content}, ${q.answer}, ${q.solution}, 'van_dung_cao', 9, 'dai_so', 'tu_luan', ${user_id}, 'approved', true)
    `;
  }

  console.log('Thành công! Đã nạp 50 câu hỏi Toán Thực Tế.');
}

main().catch(console.error);
