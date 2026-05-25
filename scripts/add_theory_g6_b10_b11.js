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
      code: `G6-B10B11-${crypto.randomBytes(2).toString('hex').toUpperCase()}`,
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
      code: `G6-B10B11TF-${crypto.randomBytes(2).toString('hex').toUpperCase()}`,
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

  // Bài 10. Số nguyên tố
  const b10 = 'eac8ffdd-be29-4da4-94a4-5d57410c088a';

  addMCQ(b10, 'Số nguyên tố là số tự nhiên lớn hơn 1 và:', 'Chỉ có 1 ước là 1.', 'Chỉ có 2 ước là 1 và chính nó.', 'Có nhiều hơn 2 ước.', 'Không có ước nào.', 'B', 'Định nghĩa: Số nguyên tố là số tự nhiên lớn hơn 1, chỉ có hai ước là 1 và chính nó.', 'so_hoc');
  addMCQ(b10, 'Hợp số là số tự nhiên lớn hơn 1 và:', 'Chỉ có 1 ước.', 'Chỉ có 2 ước.', 'Có nhiều hơn 2 ước.', 'Là số chẵn.', 'C', 'Định nghĩa: Hợp số là số tự nhiên lớn hơn 1, có nhiều hơn hai ước.', 'so_hoc');
  addMCQ(b10, 'Số nào sau đây là số nguyên tố?', '$9$', '$15$', '$21$', '$23$', 'D', 'Các số 9, 15, 21 đều có nhiều hơn 2 ước (là hợp số). Chỉ có 23 chỉ chia hết cho 1 và 23 nên nó là số nguyên tố.', 'so_hoc');
  addMCQ(b10, 'Số nguyên tố chẵn duy nhất là số nào?', '$0$', '$2$', '$4$', 'Không có số nguyên tố chẵn', 'B', 'Số 2 là số nguyên tố chẵn duy nhất (các số chẵn lớn hơn 2 đều chia hết cho 2 nên chúng là hợp số).', 'so_hoc');
  addMCQ(b10, 'Số 0 và số 1 là:', 'Số nguyên tố.', 'Hợp số.', 'Cả hai đều không phải là số nguyên tố và không phải là hợp số.', 'Số 0 là hợp số, số 1 là số nguyên tố.', 'C', 'Theo định nghĩa, số nguyên tố và hợp số đều phải là số tự nhiên LỚN HƠN 1. Do đó số 0 và số 1 không phải là số nguyên tố cũng không phải là hợp số.', 'so_hoc');
  addMCQ(b10, 'Phân tích một số tự nhiên lớn hơn 1 ra thừa số nguyên tố là:', 'Viết số đó dưới dạng một tổng của các số nguyên tố.', 'Viết số đó dưới dạng một tích của các số nguyên tố.', 'Viết số đó dưới dạng một hiệu của các số nguyên tố.', 'Viết số đó dưới dạng một thương của các số nguyên tố.', 'B', 'Phân tích ra thừa số nguyên tố là quá trình biểu diễn một số tự nhiên lớn hơn 1 dưới dạng TÍCH của nhiều số nguyên tố.', 'so_hoc');
  addMCQ(b10, 'Cách phân tích số 60 ra thừa số nguyên tố nào sau đây là ĐÚNG?', '$60 = 2 \\cdot 30$', '$60 = 3 \\cdot 20$', '$60 = 2^2 \\cdot 3 \\cdot 5$', '$60 = 4 \\cdot 15$', 'C', 'Các đáp án A, B, D vẫn chứa hợp số (30, 20, 4, 15). Chỉ có đáp án C ($2^2 \\cdot 3 \\cdot 5$) gồm toàn bộ là các số nguyên tố.', 'so_hoc');
  addMCQ(b10, 'Nếu phân tích số $a$ ra thừa số nguyên tố ta được $a = 2^3 \\cdot 3^2$ thì số $a$ bằng bao nhiêu?', '$12$', '$36$', '$72$', '$108$', 'C', 'Ta có $2^3 = 8$ và $3^2 = 9$. Vậy $a = 8 \\cdot 9 = 72$.', 'so_hoc');
  addMCQ(b10, 'Hai số nào sau đây đều là số nguyên tố?', '$2$ và $9$', '$7$ và $15$', '$11$ và $13$', '$5$ và $25$', 'C', 'Cặp 11 và 13 đều là các số nguyên tố (chỉ chia hết cho 1 và chính nó).', 'so_hoc');
  addMCQ(b10, 'Khẳng định nào sau đây là SAI?', 'Mọi số chẵn lớn hơn 2 đều là hợp số.', 'Có vô số số nguyên tố.', 'Tổng của hai số nguyên tố luôn luôn là hợp số.', 'Tích của hai số nguyên tố luôn luôn là hợp số.', 'C', 'Tổng của hai số nguyên tố không nhất thiết là hợp số. Ví dụ $2 + 3 = 5$ (5 vẫn là số nguyên tố).', 'so_hoc');

  addTF(b10, 'Mọi số nguyên tố đều là số lẻ.', false, 'Sai. Số 2 là số chẵn nhưng vẫn là số nguyên tố. Số 2 là số nguyên tố chẵn duy nhất.', 'so_hoc');
  addTF(b10, 'Tích của hai số nguyên tố bất kỳ bao giờ cũng là một hợp số.', true, 'Đúng. Gọi hai số nguyên tố là $p$ và $q$. Tích của chúng là $p \\cdot q$ sẽ có các ước là $1, p, q$ và $pq$ (nhiều hơn 2 ước), nên chắc chắn nó là hợp số.', 'so_hoc');
  addTF(b10, 'Số 2 là số nguyên tố nhỏ nhất.', true, 'Đúng. Số nguyên tố được định nghĩa là số tự nhiên lớn hơn 1, nên số nguyên tố nhỏ nhất là số 2.', 'so_hoc');
  addTF(b10, 'Phân tích số 12 ra thừa số nguyên tố ta viết là $12 = 2 \\cdot 6$.', false, 'Sai. Số 6 là hợp số, việc phân tích chưa triệt để. Phân tích đúng phải là $12 = 2^2 \\cdot 3$.', 'so_hoc');
  addTF(b10, 'Bất kỳ số tự nhiên nào lớn hơn 1 cũng đều có ít nhất một ước là số nguyên tố.', true, 'Đúng. Theo định lí cơ bản của số học, mọi số tự nhiên lớn hơn 1 đều có thể phân tích ra thừa số nguyên tố, nghĩa là nó luôn chia hết cho ít nhất một số nguyên tố.', 'so_hoc');


  // Bài 11. Ước chung. Ước chung lớn nhất
  const b11 = '5864ce3f-7a9a-4278-a36b-3c1d9cbb7456';

  addMCQ(b11, 'Ước chung của hai hay nhiều số là:', 'Số chia hết cho tất cả các số đó.', 'Ước của tất cả các số đó.', 'Bội của tất cả các số đó.', 'Số lớn nhất chia hết cho các số đó.', 'B', 'Định nghĩa: Một số được gọi là ước chung của hai hay nhiều số nếu nó là ước của TẤT CẢ các số đó.', 'so_hoc');
  addMCQ(b11, 'Tập hợp các ước chung của 12 và 18 được kí hiệu là:', '$\\text{ƯC}(12, 18)$', '$\\text{ƯCLN}(12, 18)$', '$\\text{BC}(12, 18)$', '$\\text{BCNN}(12, 18)$', 'A', 'Kí hiệu tập hợp các ước chung của $a$ và $b$ là $\\text{ƯC}(a, b)$.', 'so_hoc');
  addMCQ(b11, 'Ước chung lớn nhất (ƯCLN) của hai hay nhiều số là:', 'Số lớn nhất trong tập hợp các bội chung của các số đó.', 'Số lớn nhất trong tập hợp các ước chung của các số đó.', 'Tích của các số đó.', 'Số nguyên tố lớn nhất.', 'B', 'Định nghĩa: ƯCLN của hai hay nhiều số là số lớn nhất trong tập hợp các ước chung của các số đó.', 'so_hoc');
  addMCQ(b11, 'Hai số có ƯCLN bằng 1 được gọi là:', 'Hai số nguyên tố.', 'Hai số nguyên.', 'Hai số nguyên tố cùng nhau.', 'Hai hợp số.', 'C', 'Hai số nguyên tố cùng nhau là hai số có Ước chung lớn nhất bằng 1. (Ví dụ 8 và 9 là hai số nguyên tố cùng nhau dù cả hai đều là hợp số).', 'so_hoc');
  addMCQ(b11, 'Để tìm ƯCLN của hai hay nhiều số lớn hơn 1, bước đầu tiên ta cần làm gì?', 'Chọn ra các thừa số nguyên tố chung.', 'Chọn ra các thừa số nguyên tố chung và riêng.', 'Phân tích mỗi số ra thừa số nguyên tố.', 'Lập tích các thừa số đã chọn.', 'C', 'Quy tắc 3 bước tìm ƯCLN: Bước 1 luôn là phân tích mỗi số ra thừa số nguyên tố.', 'so_hoc');
  addMCQ(b11, 'Khi tìm ƯCLN bằng cách phân tích ra thừa số nguyên tố, ta lấy tích các thừa số nguyên tố chung với số mũ như thế nào?', 'Số mũ lớn nhất.', 'Số mũ nhỏ nhất.', 'Tổng các số mũ.', 'Hiệu các số mũ.', 'B', 'Quy tắc tìm ƯCLN: Ta chỉ chọn ra các thừa số nguyên tố CHUNG, mỗi thừa số lấy với số mũ NHỎ NHẤT của nó.', 'so_hoc');
  addMCQ(b11, 'ƯCLN của 24 và 36 là bao nhiêu?', '$6$', '$8$', '$12$', '$72$', 'C', 'Phân tích: $24 = 2^3 \\cdot 3$; $36 = 2^2 \\cdot 3^2$. Thừa số chung là 2 và 3, mũ nhỏ nhất tương ứng là 2 và 1. $\\text{ƯCLN} = 2^2 \\cdot 3 = 12$.', 'so_hoc');
  addMCQ(b11, 'Khẳng định nào sau đây là ĐÚNG về mối liên hệ giữa ƯC và ƯCLN?', 'Tập hợp các ƯC của các số chính là tập hợp các bội của ƯCLN của các số đó.', 'Tập hợp các ƯC của các số chính là tập hợp các ước của ƯCLN của các số đó.', 'ƯCLN luôn bằng 1.', 'ƯC luôn lớn hơn ƯCLN.', 'B', 'Tính chất: Để tìm ước chung của các số, ta có thể tìm các ước của ƯCLN của các số đó.', 'so_hoc');
  addMCQ(b11, 'Nếu số $a$ chia hết cho số $b$ thì $\\text{ƯCLN}(a, b)$ là:', '$a$', '$b$', '$1$', '$0$', 'B', 'Nếu $a \\vdots b$ thì $b$ là ước của $a$. Số $b$ cũng là ước của $b$. Do đó $b$ chính là ước chung lớn nhất của $a$ và $b$.', 'so_hoc');
  addMCQ(b11, 'Phân số tối giản là phân số có tử và mẫu là:', 'Hai số nguyên tố.', 'Hai hợp số.', 'Hai số nguyên tố cùng nhau.', 'Hai số chẵn.', 'C', 'Phân số tối giản là phân số không thể rút gọn được nữa, điều này xảy ra khi tử số và mẫu số có ƯCLN bằng 1 (tức là chúng nguyên tố cùng nhau).', 'so_hoc');

  addTF(b11, 'Hai số nguyên tố cùng nhau bắt buộc cả hai số đó phải là số nguyên tố.', false, 'Sai. Hai số nguyên tố cùng nhau chỉ cần có ƯCLN = 1. Ví dụ số 8 và số 9 đều là hợp số, nhưng chúng nguyên tố cùng nhau vì ƯCLN(8, 9) = 1.', 'so_hoc');
  addTF(b11, 'Tập hợp các ước chung của 12 và 18 là $\\{1; 2; 3; 6\\}$.', true, 'Đúng. ƯCLN(12, 18) = 6. Các ước của 6 là 1, 2, 3, 6, đây cũng chính là tập hợp các ước chung của 12 và 18.', 'so_hoc');
  addTF(b11, 'Khi phân tích để tìm ƯCLN, ta nhân tất cả các thừa số nguyên tố chung và riêng lại với nhau.', false, 'Sai. Để tìm ƯCLN, ta CHỈ chọn ra các thừa số nguyên tố CHUNG (không lấy thừa số riêng).', 'so_hoc');
  addTF(b11, 'Số 1 là ước chung của mọi số tự nhiên.', true, 'Đúng. Vì mọi số tự nhiên đều chia hết cho 1, nên 1 là ước chung của bất kỳ tập hợp các số tự nhiên nào.', 'so_hoc');
  addTF(b11, 'Để rút gọn một phân số về phân số tối giản, ta chỉ cần chia cả tử và mẫu cho ƯCLN của chúng.', true, 'Đúng. Chia tử và mẫu cho Ước chung lớn nhất là phương pháp tiêu chuẩn và nhanh nhất để đưa phân số về dạng tối giản.', 'so_hoc');

  console.log(`Bắt đầu nạp ${allQS.length} câu hỏi lý thuyết G6 Bài 10 và Bài 11...`);

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
