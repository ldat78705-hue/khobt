const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const crypto = require('crypto');

async function main() {
  const cats = await sql`SELECT id, name, grade FROM public.categories`;
  
  const getCatId = (grade, keyword) => {
    const matched = cats.filter(c => c.grade === grade && c.name.toLowerCase().includes(keyword.toLowerCase()));
    if (matched.length > 0) return matched[0].id;
    const fallback = cats.find(c => c.grade === grade && c.parent_id !== null);
    return fallback ? fallback.id : cats[0].id;
  };

  const user_id = '8316c34e-765d-4b8c-9364-b683a17e33f8';
  let allQS = [];

  // Hàm tạo câu trắc nghiệm
  const addMCQ = (grade, topic_kw, content, optionA, optionB, optionC, optionD, correctKey, solution, topic) => {
    allQS.push({
      cat: getCatId(grade, topic_kw),
      code: `G${grade}-MCQ-${crypto.randomBytes(2).toString('hex').toUpperCase()}`,
      grade, topic,
      content,
      options: JSON.stringify([
        { key: 'A', value: optionA },
        { key: 'B', value: optionB },
        { key: 'C', value: optionC },
        { key: 'D', value: optionD }
      ]),
      correct_answer: correctKey,
      solution
    });
  };

  // ================= LỚP 6: Số học (Dấu hiệu chia hết) =================
  addMCQ(6, 'chia hết', 'Khẳng định nào sau đây là đúng về dấu hiệu chia hết cho 9?', 'Số có tổng các chữ số chia hết cho 9 thì chia hết cho 9.', 'Số có chữ số tận cùng là 9 thì chia hết cho 9.', 'Số chia hết cho 3 thì chia hết cho 9.', 'Số chẵn thì chia hết cho 9.', 'A', 'Theo dấu hiệu chia hết, số có tổng các chữ số chia hết cho 9 thì số đó chia hết cho 9.', 'so_hoc');
  addMCQ(6, 'ước', 'Số nguyên tố là gì?', 'Số tự nhiên lớn hơn 1, chỉ có hai ước là 1 và chính nó.', 'Số tự nhiên lớn hơn 1, có nhiều hơn 2 ước.', 'Số tự nhiên chia hết cho 2.', 'Số tự nhiên chẵn lớn hơn 2.', 'A', 'Số nguyên tố là số tự nhiên lớn hơn 1, chỉ có hai ước là 1 và chính nó.', 'so_hoc');
  addMCQ(6, 'phân số', 'Trong các phân số sau, phân số nào tối giản?', '$\\dfrac{2}{4}$', '$\\dfrac{3}{9}$', '$\\dfrac{5}{7}$', '$\\dfrac{15}{20}$', 'C', 'Phân số $\\dfrac{5}{7}$ có ƯCLN(5, 7) = 1 nên là phân số tối giản.', 'phan_so');

  // ================= LỚP 7: Đại số (Tỉ lệ thức, Đa thức) =================
  addMCQ(7, 'tỉ lệ thức', 'Từ đẳng thức $a \\cdot d = b \\cdot c$ ($a, b, c, d \\neq 0$), ta lập được tỉ lệ thức nào sau đây?', '$\\dfrac{a}{b} = \\dfrac{c}{d}$', '$\\dfrac{a}{c} = \\dfrac{b}{d}$', '$\\dfrac{d}{b} = \\dfrac{c}{a}$', 'Tất cả các đáp án trên đều đúng.', 'D', 'Từ $ad=bc$, ta chia hai vế cho $bd$ thì được $\\dfrac{a}{b} = \\dfrac{c}{d}$; chia cho $cd$ thì được $\\dfrac{a}{c} = \\dfrac{b}{d}$; chia cho $ab$ thì được $\\dfrac{d}{b} = \\dfrac{c}{a}$. Vậy tất cả đều đúng.', 'dai_so');
  addMCQ(7, 'đa thức', 'Bậc của đa thức $M = x^3 y^2 - 5x^4 + 2$ là bao nhiêu?', '2', '3', '4', '5', 'D', 'Hạng tử $x^3 y^2$ có bậc là $3+2=5$. Hạng tử $-5x^4$ có bậc 4. Vậy bậc lớn nhất của đa thức là 5.', 'da_thuc');
  addMCQ(7, 'tam giác', 'Tổng ba góc trong một tam giác bằng bao nhiêu độ?', '$90^\\circ$', '$180^\\circ$', '$360^\\circ$', '$270^\\circ$', 'B', 'Định lý: Tổng ba góc trong một tam giác luôn bằng $180^\\circ$.', 'tam_giac');

  // ================= LỚP 8: Hằng đẳng thức, Tứ giác =================
  addMCQ(8, 'hằng đẳng', 'Khai triển của hằng đẳng thức $(A + B)^2$ là:', '$A^2 + B^2$', '$A^2 - 2AB + B^2$', '$A^2 + 2AB + B^2$', '$A^2 - B^2$', 'C', 'Theo hằng đẳng thức đáng nhớ: $(A + B)^2 = A^2 + 2AB + B^2$.', 'bieu_thuc');
  addMCQ(8, 'tứ giác', 'Tổng các góc của một tứ giác lồi bằng bao nhiêu?', '$180^\\circ$', '$360^\\circ$', '$540^\\circ$', '$90^\\circ$', 'B', 'Tổng các góc của một tứ giác lồi bằng $360^\\circ$.', 'hinh_hoc');
  addMCQ(8, 'phân thức', 'Điều kiện xác định của phân thức $\\dfrac{A}{B}$ là:', '$A \\neq 0$', '$A \\ge 0$', '$B \\neq 0$', '$B > 0$', 'C', 'Một phân thức đại số được xác định khi mẫu thức của nó khác 0, tức là $B \\neq 0$.', 'bieu_thuc');

  // ================= LỚP 9: Căn thức, Hàm số, Đường tròn =================
  addMCQ(9, 'căn', 'Điều kiện để $\\sqrt{A}$ có nghĩa là:', '$A < 0$', '$A \\le 0$', '$A \\neq 0$', '$A \\ge 0$', 'D', 'Căn bậc hai số học của biểu thức $A$ có nghĩa khi và chỉ khi $A$ không âm ($A \\ge 0$).', 'can_thuc');
  addMCQ(9, 'hàm số', 'Hàm số bậc nhất $y = ax + b$ ($a \\neq 0$) đồng biến khi nào?', '$a > 0$', '$a < 0$', '$b > 0$', '$b < 0$', 'A', 'Hàm số $y = ax + b$ đồng biến trên $\\mathbb{R}$ khi $a > 0$ và nghịch biến khi $a < 0$.', 'ham_so');
  addMCQ(9, 'đường tròn', 'Góc nội tiếp chắn nửa đường tròn là góc gì?', 'Góc nhọn', 'Góc vuông', 'Góc tù', 'Góc bẹt', 'B', 'Định lý: Góc nội tiếp chắn nửa đường tròn là góc vuông ($90^\\circ$).', 'duong_tron');

  console.log(`Bắt đầu nạp ${allQS.length} câu trắc nghiệm lý thuyết...`);

  for (const q of allQS) {
    const qid = crypto.randomUUID();
    await sql`
      INSERT INTO public.questions (id, category_id, question_code, content, options, correct_answer, solution, difficulty, grade, topic, question_type, user_id, status, is_public)
      VALUES (${qid}, ${q.cat}, ${q.code}, ${q.content}, ${q.options}::jsonb, ${q.correct_answer}, ${q.solution}, 'nhan_biet', ${q.grade}, ${q.topic}, 'trac_nghiem', ${user_id}, 'approved', true)
    `;
  }

  console.log('Thành công! Đã nạp trắc nghiệm lý thuyết.');
}

main().catch(console.error);
