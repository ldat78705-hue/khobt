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
      code: `G8-BATCH2-${crypto.randomBytes(2).toString('hex').toUpperCase()}`,
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
      code: `G8-BATCH2TF-${crypto.randomBytes(2).toString('hex').toUpperCase()}`,
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

  // Bài 6. Hiệu hai bình phương. Bình phương của một tổng hay một hiệu.
  const c6 = '30c01eff-1da3-4f14-b256-cc498f1e9055';

  addMCQ(c6, 'Hằng đẳng thức $(A + B)^2$ bằng biểu thức nào dưới đây?', '$A^2 + B^2$', '$A^2 - 2AB + B^2$', '$A^2 + 2AB + B^2$', '$A^2 - B^2$', 'C', 'Theo hằng đẳng thức đáng nhớ số 1 (Bình phương của một tổng): $(A + B)^2 = A^2 + 2AB + B^2$.', 'dai_so');
  addMCQ(c6, 'Hằng đẳng thức $(A - B)^2$ bằng biểu thức nào dưới đây?', '$A^2 - B^2$', '$A^2 + 2AB - B^2$', '$A^2 - 2AB + B^2$', '$(A - B)(A + B)$', 'C', 'Theo hằng đẳng thức đáng nhớ số 2 (Bình phương của một hiệu): $(A - B)^2 = A^2 - 2AB + B^2$.', 'dai_so');
  addMCQ(c6, 'Khai triển của hằng đẳng thức $A^2 - B^2$ là:', '$(A - B)^2$', '$(A - B)(A + B)$', '$(A + B)^2$', '$A^2 - 2AB + B^2$', 'B', 'Theo hằng đẳng thức đáng nhớ số 3 (Hiệu hai bình phương): $A^2 - B^2 = (A - B)(A + B)$.', 'dai_so');
  addMCQ(c6, 'Khai triển $(x + 3)^2$ ta được kết quả là:', '$x^2 + 9$', '$x^2 + 3x + 9$', '$x^2 + 6x + 9$', '$x^2 + 6x + 6$', 'C', 'Áp dụng $(A + B)^2 = A^2 + 2AB + B^2$ với $A = x, B = 3$: $(x + 3)^2 = x^2 + 2\\cdot x \\cdot 3 + 3^2 = x^2 + 6x + 9$.', 'dai_so');
  addMCQ(c6, 'Biểu thức $x^2 - 4$ được viết dưới dạng tích là:', '$(x - 2)^2$', '$(x - 4)(x + 4)$', '$(x - 2)(x + 2)$', '$(x + 2)^2$', 'C', 'Ta có $x^2 - 4 = x^2 - 2^2$. Áp dụng hiệu hai bình phương: $x^2 - 2^2 = (x - 2)(x + 2)$.', 'dai_so');
  addMCQ(c6, 'Khai triển $(2x - 1)^2$ ta được kết quả là:', '$4x^2 - 1$', '$4x^2 - 4x + 1$', '$2x^2 - 4x + 1$', '$4x^2 - 2x + 1$', 'B', 'Áp dụng $(A - B)^2 = A^2 - 2AB + B^2$ với $A = 2x, B = 1$: $(2x - 1)^2 = (2x)^2 - 2\\cdot 2x \\cdot 1 + 1^2 = 4x^2 - 4x + 1$.', 'dai_so');
  addMCQ(c6, 'Rút gọn biểu thức $(x + y)^2 - 2xy$ ta được:', '$x^2 + y^2$', '$x^2 - y^2$', '$(x - y)^2$', '$x^2 + 2y^2$', 'A', 'Ta có $(x + y)^2 - 2xy = (x^2 + 2xy + y^2) - 2xy = x^2 + y^2$.', 'dai_so');
  addMCQ(c6, 'Tính nhanh giá trị của biểu thức $51^2$ dựa vào hằng đẳng thức:', '$2601$', '$2501$', '$2511$', '$2611$', 'A', 'Ta có $51^2 = (50 + 1)^2 = 50^2 + 2\\cdot 50\\cdot 1 + 1^2 = 2500 + 100 + 1 = 2601$.', 'dai_so');
  addMCQ(c6, 'Biểu thức nào sau đây bằng với $(y - x)^2$?', '$(x - y)^2$', '$(x + y)^2$', '$-(x - y)^2$', '$x^2 - y^2$', 'A', 'Ta có $(y - x)^2 = [-(x - y)]^2 = (-1)^2 \\cdot (x - y)^2 = (x - y)^2$. Bình phương của hai số đối nhau luôn bằng nhau.', 'dai_so');
  addMCQ(c6, 'Giá trị của biểu thức $45^2 - 5^2$ là:', '$2000$', '$1600$', '$2500$', '$4000$', 'A', 'Áp dụng hằng đẳng thức hiệu hai bình phương: $45^2 - 5^2 = (45 - 5)(45 + 5) = 40 \\cdot 50 = 2000$.', 'dai_so');

  addTF(c6, 'Bình phương của một tổng luôn bằng tổng các bình phương. Tức là $(A + B)^2 = A^2 + B^2$.', false, 'Sai. Theo hằng đẳng thức, $(A + B)^2 = A^2 + 2AB + B^2$. Thiếu đi lượng $2AB$ nên khẳng định là sai (trừ khi $A=0$ hoặc $B=0$).', 'dai_so');
  addTF(c6, 'Biểu thức $x^2 - 6x + 9$ là bình phương của một hiệu.', true, 'Đúng. Ta nhận thấy $x^2 - 6x + 9 = x^2 - 2\\cdot x \\cdot 3 + 3^2 = (x - 3)^2$, đây chính là bình phương của hiệu $x - 3$.', 'dai_so');
  addTF(c6, 'Với mọi $x, y$, ta luôn có $(x - y)^2 = -(y - x)^2$.', false, 'Sai. Hai số đối nhau khi bình phương lên sẽ bằng nhau, tức là $(x - y)^2 = (y - x)^2$. Viết có dấu trừ đằng trước là hoàn toàn sai.', 'dai_so');
  addTF(c6, 'Hiệu hai bình phương của $x$ và $y$ được viết là $(x - y)^2$.', false, 'Sai. "Hiệu hai bình phương" là $x^2 - y^2$. Còn $(x - y)^2$ được gọi là "Bình phương của một hiệu".', 'dai_so');
  addTF(c6, 'Biểu thức $(x-5)(x+5)$ khai triển ra bằng $x^2 - 25$.', true, 'Đúng. Đây là dạng $(A-B)(A+B) = A^2 - B^2$. Thay $A=x, B=5$ ta được $x^2 - 5^2 = x^2 - 25$.', 'dai_so');

  // Bài 21. Phân thức đại số
  const c21 = 'fc3e7715-ce7b-4e6a-bc89-20862d22a3e8';

  addMCQ(c21, 'Phân thức đại số là một biểu thức có dạng $\\dfrac{A}{B}$, trong đó $A$ và $B$ là:', 'Các số thực, $B \\neq 0$', 'Các đơn thức, $B \\neq 0$', 'Các đa thức, $B$ là đa thức khác đa thức $0$', 'Các đa thức, $A$ là đa thức khác đa thức $0$', 'C', 'Định nghĩa phân thức đại số: Phân thức đại số là biểu thức có dạng $\\dfrac{A}{B}$, trong đó $A, B$ là các đa thức và $B$ phải khác đa thức $0$.', 'dai_so');
  addMCQ(c21, 'Điều kiện xác định của phân thức $\\dfrac{x + 1}{x - 2}$ là:', '$x \\neq -1$', '$x \\neq 2$', '$x > 2$', '$x \\neq 0$', 'B', 'Điều kiện xác định của một phân thức là mẫu thức phải khác $0$. Do đó $x - 2 \\neq 0 \\Leftrightarrow x \\neq 2$.', 'dai_so');
  addMCQ(c21, 'Đa thức $0$ có được coi là một phân thức đại số không?', 'Không, vì tử số bằng $0$', 'Có, vì nó có dạng $\\dfrac{0}{1}$', 'Chỉ khi mẫu số bằng $0$', 'Không, vì đa thức khác phân thức', 'B', 'Mọi đa thức đều được coi là một phân thức đại số có mẫu thức bằng $1$. Số $0$ (hay đa thức $0$) có thể viết thành $\\dfrac{0}{1}$, nên nó là một phân thức.', 'dai_so');
  addMCQ(c21, 'Hai phân thức $\\dfrac{A}{B}$ và $\\dfrac{C}{D}$ bằng nhau khi nào?', '$A \\cdot C = B \\cdot D$', '$A + D = B + C$', '$A \\cdot D = B \\cdot C$', '$A - B = C - D$', 'C', 'Theo định nghĩa hai phân thức bằng nhau: $\\dfrac{A}{B} = \\dfrac{C}{D}$ nếu $A \\cdot D = B \\cdot C$ (tích chéo bằng nhau).', 'dai_so');
  addMCQ(c21, 'Phân thức nghịch đảo của phân thức $\\dfrac{x - 3}{x + 2}$ (với $x \\neq 3, x \\neq -2$) là:', '$\\dfrac{-(x - 3)}{x + 2}$', '$\\dfrac{x + 2}{x - 3}$', '$\\dfrac{-x - 3}{x + 2}$', '$\\dfrac{3 - x}{x + 2}$', 'B', 'Phân thức nghịch đảo của $\\dfrac{A}{B}$ là $\\dfrac{B}{A}$. Vậy nghịch đảo của $\\dfrac{x - 3}{x + 2}$ là $\\dfrac{x + 2}{x - 3}$.', 'dai_so');
  addMCQ(c21, 'Khi rút gọn phân thức $\\dfrac{2x}{4x^2}$ (với $x \\neq 0$), ta được kết quả là:', '$\\dfrac{1}{2x}$', '$\\dfrac{x}{2}$', '$\\dfrac{1}{2}$', '$2x$', 'A', 'Chia cả tử và mẫu cho nhân tử chung là $2x$, ta được: $\\dfrac{2x : 2x}{4x^2 : 2x} = \\dfrac{1}{2x}$.', 'dai_so');
  addMCQ(c21, 'Điều kiện xác định của phân thức $\\dfrac{5}{x^2 - 1}$ là:', '$x \\neq 1$', '$x \\neq -1$', '$x \\neq 1$ và $x \\neq -1$', '$x > 1$', 'C', 'Mẫu thức là $x^2 - 1$. Điều kiện xác định là $x^2 - 1 \\neq 0 \\Leftrightarrow x^2 \\neq 1 \\Leftrightarrow x \\neq 1$ và $x \\neq -1$.', 'dai_so');
  addMCQ(c21, 'Để quy đồng mẫu thức nhiều phân thức, ta cần tìm:', 'Nhân tử chung', 'Mẫu thức chung', 'Tử thức chung', 'Bội chung lớn nhất', 'B', 'Quy đồng mẫu thức là quá trình biến đổi các phân thức đã cho thành các phân thức bằng chúng và có chung một mẫu thức. Mẫu đó gọi là Mẫu thức chung.', 'dai_so');
  addMCQ(c21, 'Phép tính $\\dfrac{A}{B} + \\dfrac{C}{B}$ bằng:', '$\\dfrac{A \\cdot C}{B}$', '$\\dfrac{A + C}{B^2}$', '$\\dfrac{A + C}{2B}$', '$\\dfrac{A + C}{B}$', 'D', 'Khi cộng hai phân thức cùng mẫu thức, ta cộng các tử thức với nhau và giữ nguyên mẫu thức: $\\dfrac{A}{B} + \\dfrac{C}{B} = \\dfrac{A + C}{B}$.', 'dai_so');
  addMCQ(c21, 'Muốn trừ phân thức $\\dfrac{A}{B}$ cho phân thức $\\dfrac{C}{D}$, ta làm thế nào?', 'Lấy $\\dfrac{A}{B}$ nhân với $\\dfrac{D}{C}$', 'Cộng $\\dfrac{A}{B}$ với phân thức đối của $\\dfrac{C}{D}$', 'Trừ tử cho tử, mẫu cho mẫu', 'Cộng tử với tử, trừ mẫu cho mẫu', 'B', 'Phép trừ phân thức được đưa về phép cộng với phân thức đối: $\\dfrac{A}{B} - \\dfrac{C}{D} = \\dfrac{A}{B} + \\left(-\\dfrac{C}{D}\\right)$.', 'dai_so');

  addTF(c21, 'Mỗi đa thức đều được coi là một phân thức đại số.', true, 'Đúng. Mỗi đa thức $A$ có thể được viết dưới dạng $\\dfrac{A}{1}$. Vì mẫu thức là $1$ (khác đa thức 0) nên nó là phân thức.', 'dai_so');
  addTF(c21, 'Phân thức đối của $\\dfrac{A}{B}$ là $\\dfrac{B}{A}$.', false, 'Sai. Phân thức đối của $\\dfrac{A}{B}$ là $-\\dfrac{A}{B}$ hoặc $\\dfrac{-A}{B}$. Còn $\\dfrac{B}{A}$ được gọi là phân thức nghịch đảo.', 'dai_so');
  addTF(c21, 'Giá trị của phân thức bằng $0$ khi và chỉ khi tử thức bằng $0$ và mẫu thức khác $0$.', true, 'Đúng. Phân thức $\\dfrac{A}{B} = 0$ khi tử $A = 0$ đồng thời mẫu $B \\neq 0$ (để phân thức có nghĩa).', 'dai_so');
  addTF(c21, 'Hai phân thức $\\dfrac{-x}{-y}$ và $\\dfrac{x}{y}$ là hai phân thức bằng nhau (với $y \\neq 0$).', true, 'Đúng. Tính chất cơ bản của phân thức: Nếu đổi dấu cả tử và mẫu của một phân thức thì được phân thức mới bằng phân thức đã cho.', 'dai_so');
  addTF(c21, 'Điều kiện xác định của phân thức chỉ cần tử thức khác 0 là đủ.', false, 'Sai. Điều kiện xác định của phân thức đại số là MẪU THỨC phải khác $0$. Tử thức có thể bằng $0$ hoặc khác $0$ tùy ý.', 'dai_so');

  console.log(`Bắt đầu nạp ${allQS.length} câu hỏi lý thuyết BATCH 2 (Bài 6 & Bài 21)...`);

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
