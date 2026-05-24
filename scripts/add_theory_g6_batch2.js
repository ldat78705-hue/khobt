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
      code: `G6-BATCH2-${crypto.randomBytes(2).toString('hex').toUpperCase()}`,
      grade: 6, topic,
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
      code: `G6-BATCH2TF-${crypto.randomBytes(2).toString('hex').toUpperCase()}`,
      grade: 6, topic,
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

  // Bài 8. Quan hệ chia hết và tính chất
  const c8 = '010ee270-e8a7-440f-b9ec-188042821190';

  addMCQ(c8, 'Cho hai số tự nhiên $a$ và $b$ ($b \\neq 0$). Nếu có số tự nhiên $q$ sao cho $a = b \\cdot q$ thì ta nói:', '$a$ chia hết cho $b$', '$b$ chia hết cho $a$', '$a$ là ước của $b$', '$a$ chia $b$ dư $q$', 'A', 'Theo định nghĩa, nếu $a = b \\cdot q$ thì ta nói $a$ chia hết cho $b$, kí hiệu $a \\vdots b$.', 'so_hoc');
  addMCQ(c8, 'Nếu $a$ chia hết cho $b$ thì ta nói $b$ là gì của $a$?', 'Bội', 'Ước', 'Số nguyên tố', 'Số dư', 'B', 'Khi $a \\vdots b$, ta nói $a$ là bội của $b$, và $b$ là ước của $a$.', 'so_hoc');
  addMCQ(c8, 'Tập hợp các ước của 6 được kí hiệu là:', '$\\text{B}(6)$', '$\\text{Ư}(6)$', '$U(6)$', '$\\text{ƯCLN}(6)$', 'B', 'Tập hợp các ước của số tự nhiên $a$ được kí hiệu là $\\text{Ư}(a)$. Tập hợp các ước của $6$ là $\\text{Ư}(6) = \\{1; 2; 3; 6\\}$.', 'so_hoc');
  addMCQ(c8, 'Số nào sau đây vừa là ước của 12, vừa là bội của 3?', '$2$', '$4$', '$6$', '$24$', 'C', 'Các ước của 12 là $\\{1; 2; 3; 4; 6; 12\\}$. Các bội của 3 (nhỏ hơn 24) là $\\{0; 3; 6; 9; 12; 15; ...\\}$. Số vừa là ước của 12 vừa là bội của 3 là số 3, 6, 12. Trong các đáp án, chọn số 6.', 'so_hoc');
  addMCQ(c8, 'Tính chất chia hết của một tổng: Nếu $a \\vdots m$ và $b \\vdots m$ thì:', '$(a + b) \\vdots m$', '$(a - b)$ không chia hết cho $m$', '$(a \\cdot b)$ không chia hết cho $m$', '$(a + b) \\vdots 2m$', 'A', 'Nếu tất cả các số hạng của một tổng đều chia hết cho cùng một số thì tổng đó chia hết cho số đó.', 'so_hoc');
  addMCQ(c8, 'Nếu $a$ không chia hết cho $m$ và $b \\vdots m$ thì tổng $a + b$ có chia hết cho $m$ không?', 'Có chia hết', 'Không chia hết', 'Chỉ chia hết khi $m = 2$', 'Tuỳ thuộc vào giá trị của $a$ và $b$', 'B', 'Tính chất: Nếu chỉ có một số hạng của tổng không chia hết cho $m$, các số hạng còn lại đều chia hết cho $m$ thì tổng KHÔNG chia hết cho $m$.', 'so_hoc');
  addMCQ(c8, 'Tổng $15 + 30 + 45$ chia hết cho số nào dưới đây?', '$2$', '$5$', '$4$', '$7$', 'B', 'Vì $15 \\vdots 5$, $30 \\vdots 5$ và $45 \\vdots 5$ nên tổng $(15 + 30 + 45) \\vdots 5$.', 'so_hoc');
  addMCQ(c8, 'Số $0$ là bội của những số tự nhiên nào?', 'Chỉ là bội của chính nó.', 'Là bội của mọi số tự nhiên khác 0.', 'Là bội của số 1 và số 0.', 'Không là bội của số nào.', 'B', 'Số $0$ chia hết cho mọi số tự nhiên $b \\neq 0$, do đó $0$ là bội của mọi số tự nhiên khác 0.', 'so_hoc');
  addMCQ(c8, 'Số $1$ là ước của những số tự nhiên nào?', 'Chỉ là ước của chính nó.', 'Là ước của mọi số tự nhiên.', 'Chỉ là ước của các số chẵn.', 'Chỉ là ước của các số lẻ.', 'B', 'Mọi số tự nhiên đều chia hết cho 1, nên số 1 là ước của mọi số tự nhiên.', 'so_hoc');
  addMCQ(c8, 'Khẳng định nào sau đây là SAI?', '$20 \\vdots 5$', '$14 \\vdots 7$', '$0 \\vdots 9$', '$5 \\vdots 0$', 'D', 'Không có phép chia cho $0$, nên không thể nói một số chia hết cho $0$. Khẳng định $5 \\vdots 0$ là sai.', 'so_hoc');

  addTF(c8, 'Nếu một số chia hết cho 2 và chia hết cho 3 thì nó chia hết cho 6.', true, 'Đúng. Vì 2 và 3 là hai số nguyên tố cùng nhau, nên nếu số đó chia hết cho cả 2 và 3 thì nó sẽ chia hết cho tích $2 \\cdot 3 = 6$.', 'so_hoc');
  addTF(c8, 'Tổng của hai số không chia hết cho 5 thì không chia hết cho 5.', false, 'Sai. Ví dụ $a = 3$ (không chia hết cho 5) và $b = 2$ (không chia hết cho 5), nhưng tổng $a + b = 3 + 2 = 5$ lại chia hết cho 5.', 'so_hoc');
  addTF(c8, 'Nếu $a \\vdots b$ và $b \\vdots c$ thì $a \\vdots c$.', true, 'Đúng. Đây là tính chất bắc cầu của quan hệ chia hết.', 'so_hoc');
  addTF(c8, 'Mọi số tự nhiên đều có vô số bội.', true, 'Đúng. Tập hợp các bội của một số tự nhiên khác 0 là vô hạn, ta có thể tìm bội bằng cách nhân số đó lần lượt với $0, 1, 2, 3...$', 'so_hoc');
  addTF(c8, 'Tập hợp các ước của 1 là $\\text{Ư}(1) = \\{1; 2; 3;...\\}$.', false, 'Sai. Số 1 chỉ có đúng MỘT ước là chính nó. $\\text{Ư}(1) = \\{1\\}$.', 'so_hoc');


  // Bài 9. Dấu hiệu chia hết
  const c9 = 'e508496c-7b5e-4dd9-9c40-025a2c885747';

  addMCQ(c9, 'Các số có chữ số tận cùng là bao nhiêu thì chia hết cho 2?', '$0, 2, 4, 6, 8$', '$1, 3, 5, 7, 9$', '$0, 5$', 'Chỉ cần là số chẵn hoặc $0, 5$', 'A', 'Dấu hiệu chia hết cho 2: Các số có chữ số tận cùng là chữ số chẵn ($0, 2, 4, 6, 8$) thì chia hết cho 2.', 'so_hoc');
  addMCQ(c9, 'Dấu hiệu nhận biết một số chia hết cho 5 là gì?', 'Số đó có tổng các chữ số chia hết cho 5.', 'Số đó có chữ số tận cùng là 0 hoặc 5.', 'Số đó là số lẻ.', 'Số đó có hai chữ số tận cùng chia hết cho 5.', 'B', 'Dấu hiệu chia hết cho 5: Các số có chữ số tận cùng là $0$ hoặc $5$ thì chia hết cho 5.', 'so_hoc');
  addMCQ(c9, 'Số nào sau đây vừa chia hết cho 2 vừa chia hết cho 5?', '$235$', '$142$', '$1020$', '$995$', 'C', 'Số chia hết cho cả 2 và 5 là số có chữ số tận cùng bắt buộc phải là $0$. Trong các số trên, chỉ có $1020$ có tận cùng là $0$.', 'so_hoc');
  addMCQ(c9, 'Một số chia hết cho 3 khi nào?', 'Chữ số tận cùng là 3, 6 hoặc 9.', 'Tổng các chữ số của số đó chia hết cho 3.', 'Số đó là số lẻ.', 'Tích các chữ số chia hết cho 3.', 'B', 'Dấu hiệu chia hết cho 3: Các số có tổng các chữ số chia hết cho 3 thì chia hết cho 3.', 'so_hoc');
  addMCQ(c9, 'Dấu hiệu nhận biết số chia hết cho 9 là:', 'Số đó có chữ số tận cùng là 9.', 'Số đó có tổng các chữ số chia hết cho 9.', 'Số đó kết thúc bằng 0 hoặc 9.', 'Số đó chia hết cho 3 thì chia hết cho 9.', 'B', 'Dấu hiệu chia hết cho 9: Các số có tổng các chữ số chia hết cho 9 thì chia hết cho 9.', 'so_hoc');
  addMCQ(c9, 'Trong các số sau, số nào chia hết cho 9?', '$123$', '$345$', '$207$', '$908$', 'C', 'Kiểm tra tổng các chữ số: $207$ có $2 + 0 + 7 = 9$. Vì $9 \\vdots 9$ nên số $207 \\vdots 9$.', 'so_hoc');
  addMCQ(c9, 'Trong các số sau, số nào KHÔNG chia hết cho 3?', '$2022$', '$12345$', '$2023$', '$999$', 'C', 'Tổng các chữ số của $2023$ là $2 + 0 + 2 + 3 = 7$. Vì $7$ không chia hết cho $3$ nên $2023$ không chia hết cho $3$.', 'so_hoc');
  addMCQ(c9, 'Số $\\overline{3*5}$ chia hết cho 9 khi dấu * được thay bằng chữ số nào?', '$1$', '$4$', '$7$', '$0$', 'A', 'Để $\\overline{3*5}$ chia hết cho 9 thì $(3 + * + 5) \\vdots 9 \\Leftrightarrow (8 + *) \\vdots 9$. Vì $*$ là chữ số từ $0$ đến $9$, nên $*$ chỉ có thể bằng $1$ (vì $8 + 1 = 9 \\vdots 9$).', 'so_hoc');
  addMCQ(c9, 'Số chia hết cho cả 2, 3, 5 và 9 là:', '$450$', '$120$', '$905$', '$330$', 'A', 'Chia hết cho 2 và 5 $\\rightarrow$ tận cùng là 0. Chia hết cho 3 và 9 $\\rightarrow$ tổng các chữ số chia hết cho 9. Xét số $450$: tận cùng là 0, tổng các chữ số $4 + 5 + 0 = 9 \\vdots 9$. Vậy chọn 450.', 'so_hoc');
  addMCQ(c9, 'Một số chia hết cho 9 thì có chắc chắn chia hết cho 3 không?', 'Có, chắc chắn.', 'Không, chưa chắc.', 'Chỉ đúng với các số chẵn.', 'Chỉ đúng với số có 2 chữ số.', 'A', 'Đúng, vì nếu tổng các chữ số chia hết cho 9 thì chắc chắn tổng đó cũng sẽ chia hết cho 3 (do $9 \\vdots 3$). Do vậy mọi số chia hết cho 9 đều chia hết cho 3.', 'so_hoc');

  addTF(c9, 'Mọi số có chữ số tận cùng là 3 thì chia hết cho 3.', false, 'Sai. Dấu hiệu chia hết cho 3 phụ thuộc vào TỔNG các chữ số chứ không phải chữ số tận cùng. Ví dụ 13 có tận cùng là 3 nhưng không chia hết cho 3.', 'so_hoc');
  addTF(c9, 'Mọi số chia hết cho 3 thì chia hết cho 9.', false, 'Sai. Có những số chia hết cho 3 nhưng KHÔNG chia hết cho 9. Ví dụ: $12$ (chia hết cho 3, không chia hết cho 9).', 'so_hoc');
  addTF(c9, 'Số tự nhiên nhỏ nhất khác 0 chia hết cho cả 2, 3 và 5 là số 30.', true, 'Đúng. Để chia hết cho 2 và 5, tận cùng phải là 0. Số nhỏ nhất khác 0 tận cùng là 0 và chia hết cho 3 là số 30 ($3+0=3$).', 'so_hoc');
  addTF(c9, 'Chữ số $0$ có thể đứng ở hàng cao nhất của một số tự nhiên (ví dụ $\\overline{012}$) để tính chia hết.', false, 'Sai. Theo quy ước viết số tự nhiên, chữ số đứng ở vị trí cao nhất (hàng lớn nhất) bắt buộc phải KHÁC 0.', 'so_hoc');
  addTF(c9, 'Số $123456789$ chia hết cho 9.', true, 'Đúng. Tổng các chữ số: $1+2+3+4+5+6+7+8+9 = 45$. Vì $45 \\vdots 9$ nên số đã cho chia hết cho 9.', 'so_hoc');

  console.log(`Bắt đầu nạp ${allQS.length} câu hỏi lý thuyết G6 BATCH 2...`);

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
