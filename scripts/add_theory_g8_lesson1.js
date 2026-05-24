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
      code: `G8-B1-${crypto.randomBytes(2).toString('hex').toUpperCase()}`,
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
      code: `G8-B1TF-${crypto.randomBytes(2).toString('hex').toUpperCase()}`,
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

  // Bài 1. Đơn thức
  const c1 = '8bf09c0e-57fe-48e1-96db-f14d155d1de3';

  // 1
  addMCQ(c1, 'Trong các biểu thức đại số sau, biểu thức nào là đơn thức?', '$10x - y$', '$\\dfrac{10}{x}$', '$10x^2y^3$', '$x + 10$', 'C', 'Đơn thức là biểu thức đại số chỉ gồm một số, hoặc một biến, hoặc một tích giữa các số và các biến. Biểu thức $10x^2y^3$ là tích của số $10$ và các biến $x, y$ nên nó là đơn thức. Các biểu thức còn lại chứa phép cộng, trừ hoặc chia cho biến nên không phải đơn thức.', 'dai_so');
  
  // 2
  addMCQ(c1, 'Biểu thức nào sau đây KHÔNG phải là đơn thức?', '$-5$', '$x$', '$\\dfrac{1}{2}xyz$', '$2x + y$', 'D', 'Biểu thức $2x + y$ chứa phép tính cộng giữa các biến nên nó là một đa thức (gồm 2 đơn thức), không phải là một đơn thức.', 'dai_so');
  
  // 3
  addMCQ(c1, 'Hệ số của đơn thức $-3x^2y^4$ là:', '$3$', '$-3$', '$2$', '$4$', 'B', 'Trong đơn thức thu gọn, phần số đứng trước các biến được gọi là hệ số. Hệ số của đơn thức $-3x^2y^4$ là $-3$.', 'dai_so');
  
  // 4
  addMCQ(c1, 'Phần biến của đơn thức $\\dfrac{1}{5}x^3y^2z$ là:', '$x^3y^2z$', '$\\dfrac{1}{5}$', '$x, y, z$', '$xyz$', 'A', 'Phần biến của đơn thức là toàn bộ phần chữ (bao gồm cả số mũ của chúng) sau khi đã tách phần hệ số. Vậy phần biến là $x^3y^2z$.', 'dai_so');
  
  // 5
  addMCQ(c1, 'Bậc của đơn thức $5x^2y^3z$ là bao nhiêu?', '$2$', '$3$', '$5$', '$6$', 'D', 'Bậc của đơn thức có hệ số khác 0 là tổng số mũ của tất cả các biến có trong đơn thức đó. Ta có mũ của $x$ là $2$, mũ của $y$ là $3$, mũ của $z$ là $1$. Tổng bậc là $2 + 3 + 1 = 6$.', 'dai_so');
  
  // 6
  addMCQ(c1, 'Bậc của một số thực khác 0 (ví dụ số $2024$) được quy ước là:', '$0$', '$1$', 'Không có bậc', 'Bằng chính số đó', 'A', 'Một số thực khác $0$ được coi là một đơn thức có bậc bằng $0$ (vì ta có thể coi nó nhân với biến mũ 0, ví dụ $2024x^0$).', 'dai_so');
  
  // 7
  addMCQ(c1, 'Số $0$ được gọi là:', 'Đơn thức bậc 1', 'Đơn thức bậc 0', 'Đơn thức không có bậc', 'Không phải là đơn thức', 'C', 'Số $0$ cũng là một đơn thức, nhưng nó đặc biệt được quy ước là đơn thức KHÔNG CÓ BẬC.', 'dai_so');
  
  // 8
  addMCQ(c1, 'Hai đơn thức đồng dạng là hai đơn thức:', 'Có hệ số khác 0 và có cùng phần biến.', 'Có hệ số giống nhau.', 'Có cùng bậc.', 'Có hệ số giống nhau và phần biến giống nhau.', 'A', 'Theo định nghĩa, hai đơn thức đồng dạng là hai đơn thức có hệ số khác 0 và CÙNG PHẦN BIẾN.', 'dai_so');
  
  // 9
  addMCQ(c1, 'Đơn thức nào sau đây đồng dạng với đơn thức $-4x^2y$ ?', '$4xy^2$', '$\\dfrac{1}{2}x^2y$', '$-4x^2y^2$', '$-4xy$', 'B', 'Để đồng dạng với $-4x^2y$, đơn thức phải có phần biến chính xác là $x^2y$. Trong các đáp án, chỉ có $\\dfrac{1}{2}x^2y$ là có phần biến $x^2y$.', 'dai_so');
  
  // 10
  addMCQ(c1, 'Kết quả của phép tính $3x^2y + 5x^2y$ là:', '$8x^4y^2$', '$15x^2y$', '$8x^2y$', '$15x^4y^2$', 'C', 'Khi cộng hai đơn thức đồng dạng, ta cộng các hệ số với nhau và giữ nguyên phần biến: $(3 + 5)x^2y = 8x^2y$.', 'dai_so');
  
  // 11
  addMCQ(c1, 'Kết quả của phép nhân hai đơn thức $(-2xy^2) \\cdot (3x^2y)$ là:', '$-6x^2y^2$', '$-6x^3y^3$', '$-5x^3y^3$', '$6x^3y^3$', 'B', 'Khi nhân hai đơn thức, ta nhân các hệ số với nhau và nhân các phần biến cùng loại với nhau: $(-2 \\cdot 3) \\cdot (x \\cdot x^2) \\cdot (y^2 \\cdot y) = -6x^3y^3$.', 'dai_so');
  
  // 12
  addTF(c1, 'Biểu thức $\\dfrac{2}{x}$ là một đơn thức vì nó không chứa phép cộng trừ.', false, 'Sai. Đơn thức không được chứa phép CHIA CHO BIẾN. Biểu thức $\\dfrac{2}{x}$ chứa biến $x$ ở dưới mẫu số nên nó không phải là đơn thức (nó là một phân thức đại số).', 'dai_so');

  // 13
  addTF(c1, 'Mọi số thực đều là một đơn thức.', true, 'Đúng. Mỗi số thực dương, âm hay số 0 đều được coi là một đơn thức. Chúng được gọi là đơn thức hằng.', 'dai_so');

  // 14
  addTF(c1, 'Hai đơn thức có cùng bậc thì chắc chắn đồng dạng với nhau.', false, 'Sai. Hai đơn thức có cùng bậc chưa chắc đã đồng dạng. Ví dụ: $x^2y$ (bậc 3) và $xy^2$ (bậc 3) có cùng bậc nhưng phần biến khác nhau hoàn toàn nên không đồng dạng.', 'dai_so');

  // 15
  addTF(c1, 'Đơn thức $-x^2yz^3$ có hệ số là $0$.', false, 'Sai. Khi không viết số cụ thể trước biến và có dấu trừ, hệ số của đơn thức được hiểu là $-1$, không phải $0$. Nếu hệ số là $0$ thì toàn bộ đơn thức bằng $0$.', 'dai_so');

  console.log(`Bắt đầu nạp ${allQS.length} câu hỏi lý thuyết Bài 1 (Đơn thức)...`);

  let count = 0;
  for (const q of allQS) {
    const qid = crypto.randomUUID();
    await sql`
      INSERT INTO public.questions (id, category_id, question_code, content, options, correct_answer, solution, difficulty, grade, topic, question_type, user_id, status, is_public)
      VALUES (${qid}, ${q.cat}, ${q.code}, ${q.content}, ${JSON.stringify(q.options)}::jsonb, ${q.correct_answer}, ${q.solution}, 'thong_hieu', ${q.grade}, ${q.topic}, ${q.type}, ${user_id}, 'approved', true)
    `;
    count++;
  }

  console.log(`Thành công! Đã nạp ${count} câu hỏi chất lượng cao cho Bài 1 (Đơn thức).`);
}

main().catch(console.error);
