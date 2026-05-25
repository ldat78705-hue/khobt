const { neon } = require('@neondatabase/serverless');
const crypto = require('crypto');
const fs = require('fs');

const lines = fs.readFileSync('d:/khode/.env.local', 'utf8').split(/\r?\n/);
let u = '';
for (const l of lines) {
  if (l.startsWith('DATABASE_URL=')) {
    let v = l.substring(13).trim();
    if (v[0] === '"') v = v.slice(1, -1);
    u = v;
  }
}
const sql = neon(u);

async function main() {
  const user_id = '8316c34e-765d-4b8c-9364-b683a17e33f8';
  let allQS = [];

  const addMCQ = (catId, content, optionA, optionB, optionC, optionD, correctKey, solution, topic) => {
    allQS.push({
      cat: catId,
      code: `G8-BATCH3-${crypto.randomBytes(2).toString('hex').toUpperCase()}`,
      grade: 8, topic,
      content,
      options: [
        { key: 'A', value: optionA },
        { key: 'B', value: optionB },
        { key: 'C', value: optionC },
        { key: 'D', value: optionD }
      ],
      correct_answer: correctKey,
      solution,
      type: 'trac_nghiem'
    });
  };

  const addTF = (catId, content, isTrue, solution, topic) => {
    allQS.push({
      cat: catId,
      code: `G8-BATCH3TF-${crypto.randomBytes(2).toString('hex').toUpperCase()}`,
      grade: 8, topic,
      content,
      options: [
        { key: 'Đúng', value: 'Khẳng định trên là Đúng.' },
        { key: 'Sai', value: 'Khẳng định trên là Sai.' }
      ],
      correct_answer: isTrue ? 'Đúng' : 'Sai',
      solution,
      type: 'dung_sai'
    });
  };

  // Bài 25. Phương trình bậc nhất một ẩn
  const c25 = 'a573d790-eeab-4cce-8435-238ea39bbdf9';

  addMCQ(c25, 'Phương trình bậc nhất một ẩn có dạng tổng quát là:', '$ax + b = 0 \\ (a \\neq 0)$', '$ax^2 + bx + c = 0$', '$ax + by = c$', '$0x + b = 0$', 'A', 'Phương trình bậc nhất một ẩn là phương trình có dạng $ax + b = 0$, trong đó $x$ là ẩn số, $a$ và $b$ là các số đã cho và $a \\neq 0$.', 'dai_so');
  addMCQ(c25, 'Trong phương trình $2x - 5 = 0$, hệ số $a$ và $b$ lần lượt là:', '$a = 2, b = 5$', '$a = 2, b = -5$', '$a = -5, b = 2$', '$a = 0, b = -5$', 'B', 'So sánh với dạng tổng quát $ax + b = 0$, ta có $a = 2$ và $b = -5$.', 'dai_so');
  addMCQ(c25, 'Phương trình nào sau đây là phương trình bậc nhất một ẩn?', '$0x + 3 = 0$', '$x^2 - 1 = 0$', '$\\dfrac{1}{x} + 2 = 0$', '$3x - 7 = 0$', 'D', 'Chỉ có $3x - 7 = 0$ thỏa mãn điều kiện $a \\neq 0$ và bậc cao nhất của ẩn là 1. Các phương trình còn lại vi phạm ($a=0$, bậc 2, hoặc ẩn ở mẫu).', 'dai_so');
  addMCQ(c25, 'Nghiệm của phương trình bậc nhất một ẩn $ax + b = 0 \\ (a \\neq 0)$ được tính bằng công thức:', '$x = \\dfrac{b}{a}$', '$x = -\\dfrac{b}{a}$', '$x = -\\dfrac{a}{b}$', '$x = a - b$', 'B', 'Từ $ax + b = 0$, chuyển vế ta có $ax = -b$. Vì $a \\neq 0$, chia cả hai vế cho $a$ ta được $x = -\\dfrac{b}{a}$.', 'dai_so');
  addMCQ(c25, 'Phương trình $3x + 6 = 0$ có nghiệm là:', '$x = 2$', '$x = -2$', '$x = 3$', '$x = -3$', 'B', 'Giải phương trình: $3x + 6 = 0 \\Leftrightarrow 3x = -6 \\Leftrightarrow x = -2$.', 'dai_so');
  addMCQ(c25, 'Khẳng định nào sau đây là ĐÚNG về số nghiệm của phương trình bậc nhất một ẩn?', 'Có thể vô nghiệm.', 'Luôn có vô số nghiệm.', 'Luôn có đúng một nghiệm duy nhất.', 'Có thể có 2 nghiệm phân biệt.', 'C', 'Vì điều kiện bắt buộc là $a \\neq 0$, phương trình $ax + b = 0$ LUÔN LUÔN có một nghiệm duy nhất là $x = -\\dfrac{b}{a}$.', 'dai_so');
  addMCQ(c25, 'Hai phương trình được gọi là tương đương khi nào?', 'Có cùng một dạng phương trình.', 'Có cùng số lượng ẩn số.', 'Có cùng tập nghiệm.', 'Có cùng hệ số $a$ và $b$.', 'C', 'Định nghĩa: Hai phương trình có cùng tập nghiệm (bao gồm cả trường hợp cùng vô nghiệm) được gọi là hai phương trình tương đương.', 'dai_so');
  addMCQ(c25, 'Phương trình $x = 2$ tương đương với phương trình nào sau đây?', '$2x = 4$', '$x + 1 = 2$', '$x^2 = 4$', '$x - 2 = 1$', 'A', 'Phương trình $2x = 4$ có tập nghiệm là $\\{2\\}$, giống với phương trình $x = 2$. Phương trình $x^2=4$ có 2 nghiệm $\\{-2; 2\\}$ nên không tương đương.', 'dai_so');
  addMCQ(c25, 'Quy tắc chuyển vế khi giải phương trình phát biểu rằng:', 'Chuyển một hạng tử từ vế này sang vế kia phải đổi dấu hạng tử đó.', 'Chuyển một hạng tử thì giữ nguyên dấu.', 'Chuyển một hạng tử thì phương trình đổi chiều.', 'Có thể nhân cả hai vế với bất kỳ số nào.', 'A', 'Quy tắc chuyển vế: Khi chuyển một hạng tử từ vế này sang vế kia của một phương trình, ta phải đổi dấu hạng tử đó (cộng thành trừ, trừ thành cộng).', 'dai_so');
  addMCQ(c25, 'Nghiệm của phương trình $\\dfrac{1}{2}x - 4 = 0$ là:', '$x = 2$', '$x = 8$', '$x = -8$', '$x = 4$', 'B', 'Chuyển vế: $\\dfrac{1}{2}x = 4$. Nhân 2 vế với 2: $x = 8$.', 'dai_so');

  addTF(c25, 'Phương trình $0x - 5 = 0$ là phương trình bậc nhất một ẩn.', false, 'Sai. Phương trình bậc nhất một ẩn yêu cầu hệ số $a$ phải khác 0. Ở đây $a = 0$ nên nó không phải phương trình bậc nhất một ẩn (đây là phương trình vô nghiệm).', 'dai_so');
  addTF(c25, 'Mọi phương trình bậc nhất một ẩn đều có nghiệm duy nhất.', true, 'Đúng. Phương trình $ax + b = 0$ (với $a \\neq 0$) luôn có nghiệm duy nhất là $x = -\\dfrac{b}{a}$.', 'dai_so');
  addTF(c25, 'Phương trình $x - 1 = 0$ và phương trình $(x - 1)(x + 2) = 0$ là hai phương trình tương đương.', false, 'Sai. Tập nghiệm của $x - 1 = 0$ là $\\{1\\}$. Tập nghiệm của phương trình kia là $\\{1; -2\\}$. Tập nghiệm không giống nhau nên không tương đương.', 'dai_so');
  addTF(c25, 'Nhân cả hai vế của một phương trình với cùng một số khác 0 ta được phương trình mới tương đương với phương trình đã cho.', true, 'Đúng. Đây là quy tắc nhân (hoặc chia) cả hai vế của phương trình cho cùng một số khác 0 để tạo ra phương trình tương đương.', 'dai_so');
  addTF(c25, 'Số $x = 0$ có thể là nghiệm của một phương trình bậc nhất một ẩn.', true, 'Đúng. Nếu $b = 0$, phương trình trở thành $ax = 0$, và vì $a \\neq 0$ nên nó có nghiệm duy nhất $x = 0$.', 'dai_so');

  // Bài 30. Kết quả có thể và kết quả thuận lợi
  const c30 = '6c66a73a-5aed-46cd-8c70-241ef532c429';

  addMCQ(c30, 'Trong một phép thử ngẫu nhiên, tập hợp tất cả các kết quả có thể xảy ra được gọi là:', 'Không gian mẫu', 'Kết quả thuận lợi', 'Biến cố', 'Xác suất', 'A', 'Tập hợp tất cả các kết quả có thể xảy ra của một phép thử ngẫu nhiên được gọi là không gian mẫu của phép thử đó.', 'thong_ke');
  addMCQ(c30, 'Khi gieo một con xúc xắc cân đối và đồng chất, có bao nhiêu kết quả có thể xảy ra?', '2', '4', '6', '8', 'C', 'Xúc xắc có 6 mặt đánh số từ 1 đến 6. Do đó có 6 kết quả có thể xảy ra (xuất hiện mặt 1 chấm, 2 chấm,..., 6 chấm).', 'thong_ke');
  addMCQ(c30, 'Khi tung một đồng xu cân đối và đồng chất, các kết quả có thể xảy ra là:', 'Chỉ xuất hiện mặt Sấp (S).', 'Chỉ xuất hiện mặt Ngửa (N).', 'Xuất hiện mặt Sấp (S) hoặc mặt Ngửa (N).', 'Đồng xu đứng nghiêng.', 'C', 'Khi tung đồng xu, chỉ có 2 kết quả khả dĩ là Sấp (S) hoặc Ngửa (N).', 'thong_ke');
  addMCQ(c30, 'Kết quả thuận lợi cho một biến cố $A$ là gì?', 'Tất cả các kết quả có thể xảy ra của phép thử.', 'Các kết quả của phép thử làm cho biến cố $A$ xảy ra.', 'Kết quả mà người ta mong muốn nhất.', 'Kết quả không bao giờ xảy ra.', 'B', 'Một kết quả của phép thử được gọi là kết quả thuận lợi cho biến cố $A$ nếu kết quả đó làm cho biến cố $A$ xảy ra.', 'thong_ke');
  addMCQ(c30, 'Gieo một con xúc xắc. Gọi $A$ là biến cố "Xuất hiện mặt có số chấm là số chẵn". Các kết quả thuận lợi cho biến cố $A$ là:', 'Mặt 1, 3, 5 chấm.', 'Mặt 2, 4, 6 chấm.', 'Mặt 2, 3, 5 chấm.', 'Mặt 6 chấm.', 'B', 'Các số chẵn trên xúc xắc là 2, 4, 6. Vì vậy các kết quả thuận lợi là xuất hiện mặt 2, 4, 6 chấm.', 'thong_ke');
  addMCQ(c30, 'Trong một hộp có 3 quả bóng xanh, 2 quả bóng đỏ. Rút ngẫu nhiên một quả bóng. Có bao nhiêu kết quả có thể xảy ra đối với màu của quả bóng?', '2', '3', '5', '1', 'A', 'Mặc dù có 5 quả bóng, nhưng câu hỏi hỏi về MÀU của quả bóng. Chỉ có 2 màu là Xanh và Đỏ. Vậy có 2 kết quả có thể xảy ra (Rút được bóng Xanh, hoặc rút được bóng Đỏ).', 'thong_ke');
  addMCQ(c30, 'Rút ngẫu nhiên 1 lá bài từ bộ bài tú lơ khơ 52 lá. Có bao nhiêu kết quả có thể xảy ra cho lá bài được rút?', '4', '13', '52', '2', 'C', 'Mỗi lá bài là khác nhau, nên khi rút ngẫu nhiên 1 lá bài bất kỳ, có tất cả 52 kết quả có thể xảy ra.', 'thong_ke');
  addMCQ(c30, 'Biến cố chắc chắn là biến cố có số lượng kết quả thuận lợi bằng:', '0', '1', 'Một nửa không gian mẫu', 'Số lượng các kết quả có thể xảy ra của phép thử (bằng không gian mẫu)', 'D', 'Biến cố chắc chắn là biến cố LUÔN LUÔN xảy ra. Nghĩa là mọi kết quả của phép thử đều là kết quả thuận lợi cho nó.', 'thong_ke');
  addMCQ(c30, 'Biến cố không thể là biến cố có số lượng kết quả thuận lợi bằng:', '0', '1', 'Không giới hạn', 'Số âm', 'A', 'Biến cố không thể là biến cố KHÔNG BAO GIỜ xảy ra. Do đó nó không có kết quả thuận lợi nào cả (bằng 0).', 'thong_ke');
  addMCQ(c30, 'Một nhóm có 3 nam và 4 nữ. Chọn ngẫu nhiên 1 bạn làm lớp trưởng. Gọi $E$ là biến cố "Chọn được 1 bạn nữ". Số kết quả thuận lợi cho biến cố $E$ là:', '3', '4', '7', '1', 'B', 'Có 4 bạn nữ trong nhóm, mỗi việc chọn trúng 1 bạn nữ cụ thể là một kết quả thuận lợi. Vậy có 4 kết quả thuận lợi.', 'thong_ke');

  addTF(c30, 'Khi gieo xúc xắc, biến cố "Mặt xuất hiện có 7 chấm" là một biến cố không thể.', true, 'Đúng. Xúc xắc chỉ có số chấm từ 1 đến 6, không bao giờ xuất hiện 7 chấm. Đây là biến cố không thể.', 'thong_ke');
  addTF(c30, 'Tập hợp các kết quả thuận lợi của một biến cố luôn là một tập con của Không gian mẫu.', true, 'Đúng. Các kết quả thuận lợi được trích ra từ tập hợp tất cả các kết quả có thể xảy ra (không gian mẫu).', 'thong_ke');
  addTF(c30, 'Khi tung 2 đồng xu cùng lúc, có chính xác 3 kết quả có thể xảy ra: Sấp-Sấp, Ngửa-Ngửa, Sấp-Ngửa.', false, 'Sai. Phải tính thứ tự 2 đồng xu (hoặc coi chúng phân biệt). Có 4 kết quả: Sấp-Sấp, Ngửa-Ngửa, Sấp-Ngửa, và Ngửa-Sấp.', 'thong_ke');
  addTF(c30, 'Gieo một con xúc xắc, biến cố "Mặt xuất hiện có số chấm nhỏ hơn 10" là một biến cố chắc chắn.', true, 'Đúng. Mọi mặt của xúc xắc (1 đến 6) đều nhỏ hơn 10, nên biến cố này luôn luôn xảy ra với mọi kết quả. Nó là biến cố chắc chắn.', 'thong_ke');
  addTF(c30, 'Một hộp có 1 bi đỏ và 1 bi xanh. Lấy ngẫu nhiên 1 viên. Số kết quả thuận lợi để lấy được bi đỏ là 1.', true, 'Đúng. Chỉ có duy nhất 1 viên bi đỏ nên chỉ có đúng 1 kết quả thuận lợi cho biến cố này.', 'thong_ke');

  console.log(`Bắt đầu nạp ${allQS.length} câu hỏi lý thuyết G8 BATCH 3...`);

  let count = 0;
  for (const q of allQS) {
    const qid = crypto.randomUUID();
    await sql`
      INSERT INTO public.questions (id, category_id, question_code, content, options, correct_answer, solution, difficulty, grade, topic, question_type, user_id, status, is_public)
      VALUES (${qid}, ${q.cat}, ${q.code}, ${q.content}, ${JSON.stringify(q.options)}::jsonb, ${q.correct_answer}, ${q.solution}, 'thong_hieu', ${q.grade}, ${q.topic}, ${q.type}, ${user_id}, 'approved', true)
    `;
    count++;
  }

  console.log(`Thành công! Đã nạp ${count} câu hỏi chất lượng cao.`);
}

main().catch(console.error);
