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

  // Hàm tạo câu Đúng/Sai
  const addTF = (topic_kw, content, isTrue, solution, topic) => {
    allQS.push({
      cat: getCatId(topic_kw),
      code: `G9-TF-${crypto.randomBytes(2).toString('hex').toUpperCase()}`,
      grade: 9, topic,
      content,
      options: JSON.stringify([
        { key: 'Đúng', value: 'Khẳng định trên là Đúng.' },
        { key: 'Sai', value: 'Khẳng định trên là Sai.' }
      ]),
      correct_answer: isTrue ? 'Đúng' : 'Sai',
      solution
    });
  };

  // 1. Đại số - Căn thức & Hàm số
  addTF('căn', 'Với mọi số thực $a$, ta luôn có $\\sqrt{a^2} = a$.', false, 'Sai. Theo hằng đẳng thức căn bậc hai, $\\sqrt{a^2} = |a|$. Do đó nếu $a < 0$ thì $\\sqrt{a^2} = -a$, chứ không phải $a$.', 'can_thuc');
  addTF('căn', 'Nếu $x \\ge 0$ và $y \\ge 0$ thì $\\sqrt{x \\times y} = \\sqrt{x} \\times \\sqrt{y}$.', true, 'Đúng. Đây là quy tắc khai phương một tích dành cho các số không âm.', 'can_thuc');
  addTF('căn', 'Biểu thức $\\dfrac{1}{\\sqrt{x} - 2}$ xác định khi và chỉ khi $x > 0$ và $x \\neq 4$.', false, 'Sai. Biểu thức có căn $\\sqrt{x}$ nên cần $x \\ge 0$. Mẫu số $\\sqrt{x} - 2 \\neq 0 \\Leftrightarrow x \\neq 4$. Vậy điều kiện đúng là $x \\ge 0$ và $x \\neq 4$.', 'can_thuc');
  
  addTF('hàm số', 'Hàm số $y = (1 - \\sqrt{2})x + 5$ là hàm số đồng biến trên $\\mathbb{R}$.', false, 'Sai. Hàm số bậc nhất $y = ax + b$ đồng biến khi $a > 0$. Ở đây $a = 1 - \\sqrt{2} < 0$, do đó hàm số nghịch biến.', 'ham_so');
  addTF('hàm số', 'Hai đường thẳng $y = 2x + 3$ và $y = 2x - 5$ song song với nhau.', true, 'Đúng. Hai đường thẳng có cùng hệ số góc $a = 2$ và có tung độ gốc khác nhau ($3 \\neq -5$) nên chúng song song.', 'ham_so');

  // 2. Hình học - Đường tròn & Góc
  addTF('đường tròn', 'Trong một đường tròn, đường kính đi qua trung điểm của một dây cung thì vuông góc với dây cung đó.', false, 'Sai. Mệnh đề này chỉ đúng khi dây cung đó KHÔNG đi qua tâm. Nếu dây cung chính là đường kính thì đường kính kia đi qua trung điểm nhưng không nhất thiết phải vuông góc.', 'duong_tron');
  addTF('đường tròn', 'Góc tạo bởi tia tiếp tuyến và dây cung có số đo bằng nửa số đo cung bị chắn.', true, 'Đúng. Đây là định lý cơ bản về góc tạo bởi tia tiếp tuyến và dây cung.', 'duong_tron');
  addTF('tứ giác', 'Tứ giác có 4 đỉnh cùng nằm trên một đường tròn được gọi là tứ giác nội tiếp.', true, 'Đúng. Đây chính là định nghĩa của tứ giác nội tiếp đường tròn.', 'duong_tron');
  addTF('tứ giác', 'Một tứ giác có tổng hai góc kề nhau bằng $180^\\circ$ thì tứ giác đó nội tiếp được đường tròn.', false, 'Sai. Dấu hiệu nhận biết tứ giác nội tiếp là tổng hai góc ĐỐI NHAU bằng $180^\\circ$, chứ không phải hai góc kề nhau (hai góc kề bù nhau chỉ suy ra hai cạnh song song, ví dụ hình thang).', 'duong_tron');

  // 3. Hình không gian & Vi-ét
  addTF('nón', 'Khi quay một tam giác vuông một vòng quanh một cạnh góc vuông cố định, ta được một hình nón.', true, 'Đúng. Cạnh góc vuông cố định tạo thành chiều cao, cạnh góc vuông kia tạo thành bán kính đáy, cạnh huyền tạo thành đường sinh của hình nón.', 'hinh_khong_gian');
  addTF('vi-ét', 'Phương trình $2x^2 - 5x + 3 = 0$ có tổng hai nghiệm là $S = \\dfrac{5}{2}$ và tích hai nghiệm là $P = \\dfrac{3}{2}$.', true, 'Đúng. Áp dụng định lý Vi-ét: $S = -\\dfrac{b}{a} = -\\dfrac{-5}{2} = \\dfrac{5}{2}$, $P = \\dfrac{c}{a} = \\dfrac{3}{2}$.', 'phuong_trinh');
  addTF('vi-ét', 'Nếu phương trình $ax^2 + bx + c = 0$ có $a$ và $c$ trái dấu thì phương trình luôn có 2 nghiệm phân biệt.', true, 'Đúng. Vì $a$ và $c$ trái dấu nên $ac < 0 \\Rightarrow -4ac > 0 \\Rightarrow \\Delta = b^2 - 4ac > 0$ với mọi $b$. Phương trình luôn có hai nghiệm phân biệt.', 'phuong_trinh');

  console.log(`Bắt đầu nạp ${allQS.length} câu hỏi Đúng/Sai (Định dạng thi mới)...`);

  for (const q of allQS) {
    const qid = crypto.randomUUID();
    await sql`
      INSERT INTO public.questions (id, category_id, question_code, content, options, correct_answer, solution, difficulty, grade, topic, question_type, user_id, status, is_public)
      VALUES (${qid}, ${q.cat}, ${q.code}, ${q.content}, ${q.options}::jsonb, ${q.correct_answer}, ${q.solution}, 'thong_hieu', ${q.grade}, ${q.topic}, 'dung_sai', ${user_id}, 'approved', true)
    `;
  }

  console.log('Thành công! Đã nạp 12 câu Đúng/Sai Lớp 9.');
}

main().catch(console.error);
