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
      code: `G7-BATCH3-${crypto.randomBytes(2).toString('hex').toUpperCase()}`,
      grade: 7, topic,
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
      code: `G7-BATCH3TF-${crypto.randomBytes(2).toString('hex').toUpperCase()}`,
      grade: 7, topic,
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

  // Bài 5. Làm quen với số thập phân vô hạn tuần hoàn
  const c5 = '9b8ca99f-9554-4437-b328-63b6fc774d42';

  addMCQ(c5, 'Số thập phân $0,333...$ (số 3 lặp lại mãi mãi) được viết gọn là:', '$0,3$', '$0,(3)$', '$0,33$', '$(0,3)$', 'B', 'Số thập phân vô hạn tuần hoàn có chu kỳ là 3 được viết gọn bằng cách đặt chu kỳ trong dấu ngoặc tròn: $0,(3)$.', 'so_hoc');
  addMCQ(c5, 'Phân số nào sau đây viết được dưới dạng số thập phân hữu hạn?', '$\\dfrac{1}{3}$', '$\\dfrac{5}{6}$', '$\\dfrac{3}{4}$', '$\\dfrac{7}{15}$', 'C', 'Phân số tối giản có mẫu chỉ chứa thừa số nguyên tố 2 và 5 thì viết được dưới dạng STP hữu hạn. Mẫu của $\\dfrac{3}{4}$ là $4 = 2^2$ (chỉ chứa thừa số 2), nên nó viết được dạng STP hữu hạn ($0,75$).', 'so_hoc');
  addMCQ(c5, 'Phân số nào sau đây viết được dưới dạng số thập phân vô hạn tuần hoàn?', '$\\dfrac{1}{2}$', '$\\dfrac{4}{5}$', '$\\dfrac{7}{8}$', '$\\dfrac{2}{3}$', 'D', 'Mẫu của $\\dfrac{2}{3}$ là 3 (chứa thừa số nguyên tố khác 2 và 5) nên nó là số thập phân vô hạn tuần hoàn.', 'so_hoc');
  addMCQ(c5, 'Số thập phân vô hạn tuần hoàn $0,(1)$ khi chuyển sang phân số sẽ bằng bao nhiêu?', '$\\dfrac{1}{10}$', '$\\dfrac{1}{9}$', '$\\dfrac{1}{11}$', '$\\dfrac{1}{3}$', 'B', 'Theo quy tắc chuyển đổi, $0,(1) = \\dfrac{1}{9}$.', 'so_hoc');
  addMCQ(c5, 'Chu kỳ của số thập phân vô hạn tuần hoàn $2,1353535...$ là gì?', '$135$', '$35$', '$53$', '$2$', 'B', 'Phần lặp lại mãi mãi là $35$, do đó chu kỳ của số này là $35$. Viết gọn là $2,1(35)$.', 'so_hoc');
  addMCQ(c5, 'Số $0,123123123...$ được viết gọn là:', '$0,1(23)$', '$0,(12)3$', '$0,(123)$', '$(0,123)$', 'C', 'Chu kỳ lặp lại là $123$ nên số này được viết gọn là $0,(123)$.', 'so_hoc');
  addMCQ(c5, 'Mọi số hữu tỉ đều có thể viết được dưới dạng:', 'Số thập phân vô hạn không tuần hoàn.', 'Số nguyên.', 'Số thập phân hữu hạn hoặc vô hạn tuần hoàn.', 'Số thập phân dương.', 'C', 'Định lí: Mỗi số hữu tỉ được biểu diễn bởi một số thập phân hữu hạn hoặc vô hạn tuần hoàn. Ngược lại, mỗi số thập phân hữu hạn hoặc vô hạn tuần hoàn biểu diễn một số hữu tỉ.', 'so_hoc');
  addMCQ(c5, 'Giá trị của phép tính $\\dfrac{1}{3} + 0,(3)$ là:', '$0,6$', '$0,(6)$', '$1$', '$\\dfrac{2}{3}$', 'B', 'Ta có $0,(3) = \\dfrac{1}{3}$. Vậy $\\dfrac{1}{3} + \\dfrac{1}{3} = \\dfrac{2}{3}$. Mà $\\dfrac{2}{3} = 0,666... = 0,(6)$.', 'so_hoc');
  addMCQ(c5, 'Số thập phân $1,2(5)$ có nghĩa là:', 'Số 2 và 5 cùng lặp lại.', 'Chỉ có số 5 lặp lại vô hạn lần.', 'Chỉ có số 2 lặp lại vô hạn lần.', 'Số 1, 2 và 5 lặp lại vô hạn lần.', 'B', 'Dấu ngoặc tròn bao quanh số nào thì số đó là chu kỳ lặp lại. $1,2(5) = 1,25555...$', 'so_hoc');
  addMCQ(c5, 'Phân số $\\dfrac{-5}{12}$ biểu diễn số thập phân loại nào?', 'Số thập phân hữu hạn.', 'Số thập phân vô hạn tuần hoàn.', 'Số thập phân vô hạn không tuần hoàn.', 'Số nguyên âm.', 'B', 'Mẫu số là $12 = 2^2 \\cdot 3$. Vì mẫu chứa thừa số nguyên tố $3$ (khác 2 và 5) nên phân số này viết được dưới dạng số thập phân vô hạn tuần hoàn.', 'so_hoc');

  addTF(c5, 'Mỗi phân số tối giản đều có thể viết thành một số thập phân vô hạn không tuần hoàn.', false, 'Sai. Phân số (số hữu tỉ) chỉ có thể viết được dưới dạng số thập phân HỮU HẠN hoặc VÔ HẠN TUẦN HOÀN. Số thập phân vô hạn không tuần hoàn là số vô tỉ.', 'so_hoc');
  addTF(c5, 'Số $0,(99)$ bằng chính xác số $1$.', true, 'Đúng. Ta có $0,(99) = 99 \\times 0,(01) = 99 \\times \\dfrac{1}{99} = 1$. (Hoặc $0,(9) = 1$).', 'so_hoc');
  addTF(c5, 'Phân số $\\dfrac{7}{25}$ viết được dưới dạng số thập phân hữu hạn.', true, 'Đúng. Mẫu số $25 = 5^2$ chỉ chứa thừa số nguyên tố 5, do đó nó viết được dưới dạng thập phân hữu hạn ($0,28$).', 'so_hoc');
  addTF(c5, 'Phần chu kỳ của số thập phân vô hạn tuần hoàn luôn bắt đầu ngay sau dấu phẩy.', false, 'Sai. Có những số thập phân vô hạn tuần hoàn tạp (như $0,1(6)$), phần chu kỳ ($6$) không bắt đầu ngay sau dấu phẩy mà đứng sau phần bất thường ($1$).', 'so_hoc');
  addTF(c5, 'Số $2,5$ cũng có thể coi là một số thập phân vô hạn tuần hoàn với chu kỳ là $0$.', true, 'Đúng. Ta có thể viết $2,5 = 2,5000... = 2,5(0)$. Do đó mọi số thập phân hữu hạn đều có thể coi là số thập phân vô hạn tuần hoàn chu kỳ 0.', 'so_hoc');


  // Bài 6. Số vô tỉ. Căn bậc hai số học
  const c6 = 'a24bffff-4c4a-4a5d-bd42-55beddbeefc4';

  addMCQ(c6, 'Số vô tỉ là số viết được dưới dạng:', 'Số thập phân hữu hạn.', 'Số thập phân vô hạn tuần hoàn.', 'Số thập phân vô hạn không tuần hoàn.', 'Phân số.', 'C', 'Định nghĩa: Số vô tỉ là số viết được dưới dạng số thập phân vô hạn không tuần hoàn.', 'so_hoc');
  addMCQ(c6, 'Tập hợp các số vô tỉ được kí hiệu là:', '$\\mathbb{N}$', '$\\mathbb{Q}$', '$\\mathbb{I}$', '$\\mathbb{Z}$', 'C', 'Tập hợp các số vô tỉ được kí hiệu là $\\mathbb{I}$ (Irrationals).', 'so_hoc');
  addMCQ(c6, 'Số nào sau đây là số vô tỉ?', '$0,5$', '$\\sqrt{4}$', '$\\sqrt{2}$', '$\\dfrac{3}{4}$', 'C', 'Ta có $\\sqrt{4} = 2$ là số hữu tỉ. $\\sqrt{2} \\approx 1,4142135...$ là một số thập phân vô hạn không tuần hoàn, do đó nó là số vô tỉ.', 'so_hoc');
  addMCQ(c6, 'Căn bậc hai số học của một số $a$ không âm là số $x$ không âm sao cho:', '$x^2 = a$', '$x = a^2$', '$x^2 = -a$', '$x = \\dfrac{a}{2}$', 'A', 'Định nghĩa: Căn bậc hai số học của một số không âm $a$ là số $x$ không âm sao cho $x^2 = a$.', 'so_hoc');
  addMCQ(c6, 'Căn bậc hai số học của $36$ là:', '$6$ và $-6$', '$6$', '$-6$', '$18$', 'B', 'Căn bậc hai "số học" chỉ lấy giá trị không âm. Do đó $\\sqrt{36} = 6$.', 'so_hoc');
  addMCQ(c6, 'Giá trị của biểu thức $\\sqrt{25} - \\sqrt{9}$ là:', '$16$', '$8$', '$2$', '$4$', 'C', 'Ta có $\\sqrt{25} = 5$ và $\\sqrt{9} = 3$. Vậy $5 - 3 = 2$.', 'so_hoc');
  addMCQ(c6, 'Số $\\pi$ (pi) là số gì?', 'Số nguyên', 'Số hữu tỉ', 'Số thập phân vô hạn tuần hoàn', 'Số vô tỉ', 'D', 'Số $\\pi \\approx 3,14159...$ là một số thập phân vô hạn không tuần hoàn, do đó nó là một số vô tỉ điển hình.', 'so_hoc');
  addMCQ(c6, 'Khẳng định nào sau đây là SAI?', '$\\sqrt{0} = 0$', '$\\sqrt{-4} = -2$', '$\\sqrt{1} = 1$', '$\\sqrt{100} = 10$', 'B', 'Không tồn tại căn bậc hai số học của số âm trong tập số thực. Biểu thức $\\sqrt{-4}$ không có nghĩa.', 'so_hoc');
  addMCQ(c6, 'Độ dài đường chéo của một hình vuông có cạnh bằng $1$ là:', '$1$', '$2$', '$\\sqrt{2}$', '$1,5$', 'C', 'Áp dụng định lí Pythagore, độ dài đường chéo $d = \\sqrt{1^2 + 1^2} = \\sqrt{2}$.', 'so_hoc');
  addMCQ(c6, 'Tập hợp số thực $\\mathbb{R}$ bao gồm:', 'Chỉ các số hữu tỉ.', 'Chỉ các số vô tỉ.', 'Cả số hữu tỉ và số vô tỉ.', 'Các số nguyên dương và nguyên âm.', 'C', 'Tập hợp các số hữu tỉ $\\mathbb{Q}$ và tập hợp các số vô tỉ $\\mathbb{I}$ hợp lại tạo thành tập hợp các số thực $\\mathbb{R}$.', 'so_hoc');

  addTF(c6, 'Căn bậc hai số học của số $16$ là $\\pm 4$.', false, 'Sai. Căn bậc hai số học chỉ nhận giá trị dương (hoặc bằng 0), nên nó chỉ bằng $4$.', 'so_hoc');
  addTF(c6, 'Mọi số thực dương đều có căn bậc hai số học.', true, 'Đúng. Với mọi $a > 0$, ta luôn luôn tìm được duy nhất một số $x > 0$ sao cho $x^2 = a$.', 'so_hoc');
  addTF(c6, 'Số thập phân $1,010010001...$ (số lượng chữ số 0 tăng dần) là số hữu tỉ.', false, 'Sai. Vì quy luật lặp lại thay đổi (số lượng số 0 tăng dần) nên nó KHÔNG tuần hoàn, do đó nó là số vô tỉ.', 'so_hoc');
  addTF(c6, 'Giao của tập hợp số hữu tỉ $\\mathbb{Q}$ và tập hợp số vô tỉ $\\mathbb{I}$ là tập hợp rỗng.', true, 'Đúng. Một số không thể vừa là số thập phân vô hạn tuần hoàn (hữu tỉ) vừa là số thập phân vô hạn không tuần hoàn (vô tỉ). Do đó $\\mathbb{Q} \\cap \\mathbb{I} = \\emptyset$.', 'so_hoc');
  addTF(c6, 'Biểu thức $\\sqrt{x^2}$ luôn luôn bằng $x$ với mọi số thực $x$.', false, 'Sai. Với mọi số thực $x$, ta có $\\sqrt{x^2} = |x|$ (giá trị tuyệt đối của $x$). Nếu $x$ là số âm thì $\\sqrt{x^2} = -x$.', 'so_hoc');

  console.log(`Bắt đầu nạp ${allQS.length} câu hỏi lý thuyết G7 BATCH 3...`);

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
