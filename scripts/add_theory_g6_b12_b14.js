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
      code: `G6-B12B14-${crypto.randomBytes(2).toString('hex').toUpperCase()}`,
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
      code: `G6-B12B14TF-${crypto.randomBytes(2).toString('hex').toUpperCase()}`,
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

  // Bài 12. Bội chung. Bội chung nhỏ nhất
  const b12 = 'f1385817-45c4-415d-aea9-014258e59be1';

  addMCQ(b12, 'Bội chung của hai hay nhiều số là:', 'Số lớn nhất chia hết cho các số đó.', 'Số chia hết cho tất cả các số đó.', 'Ước của tất cả các số đó.', 'Tích của các số đó.', 'B', 'Định nghĩa: Một số được gọi là bội chung của hai hay nhiều số nếu nó chia hết cho TẤT CẢ các số đó.', 'so_hoc');
  addMCQ(b12, 'Tập hợp các bội chung của 4 và 6 được kí hiệu là:', '$\\text{ƯC}(4, 6)$', '$\\text{ƯCLN}(4, 6)$', '$\\text{BC}(4, 6)$', '$\\text{BCNN}(4, 6)$', 'C', 'Kí hiệu tập hợp các bội chung của $a$ và $b$ là $\\text{BC}(a, b)$.', 'so_hoc');
  addMCQ(b12, 'Bội chung nhỏ nhất (BCNN) của hai hay nhiều số là:', 'Số nhỏ nhất khác 0 trong tập hợp các bội chung của các số đó.', 'Số nhỏ nhất trong tập hợp các bội chung của các số đó.', 'Tích của các số đó.', 'Số 1.', 'A', 'Định nghĩa: BCNN của hai hay nhiều số là số NHỎ NHẤT KHÁC 0 trong tập hợp các bội chung của các số đó. (Vì số 0 là bội chung của mọi số nhưng không có ý nghĩa khi xét BCNN).', 'so_hoc');
  addMCQ(b12, 'Để tìm BCNN của hai hay nhiều số lớn hơn 1, bước thứ hai ta cần làm gì?', 'Phân tích mỗi số ra thừa số nguyên tố.', 'Chọn ra các thừa số nguyên tố chung.', 'Chọn ra các thừa số nguyên tố chung và riêng.', 'Lập tích các thừa số đã chọn.', 'C', 'Quy tắc 3 bước tìm BCNN: Bước 1 là phân tích, Bước 2 là chọn ra các thừa số nguyên tố CHUNG VÀ RIÊNG.', 'so_hoc');
  addMCQ(b12, 'Khi tìm BCNN bằng cách phân tích ra thừa số nguyên tố, ta lấy các thừa số nguyên tố chung và riêng với số mũ như thế nào?', 'Số mũ lớn nhất.', 'Số mũ nhỏ nhất.', 'Tổng các số mũ.', 'Số mũ bằng 1.', 'A', 'Quy tắc tìm BCNN: Ta chọn ra các thừa số nguyên tố chung và riêng, mỗi thừa số lấy với số mũ LỚN NHẤT của nó.', 'so_hoc');
  addMCQ(b12, 'BCNN của 8 và 12 là bao nhiêu?', '$4$', '$12$', '$24$', '$96$', 'C', 'Phân tích: $8 = 2^3$; $12 = 2^2 \\cdot 3$. Lấy các thừa số $2$ và $3$ với mũ lớn nhất: $2^3 \\cdot 3 = 8 \\cdot 3 = 24$.', 'so_hoc');
  addMCQ(b12, 'Nếu các số đã cho từng đôi một nguyên tố cùng nhau thì BCNN của chúng là:', 'Số lớn nhất trong các số đó.', 'Tích của các số đó.', 'Bằng 1.', 'Bằng 0.', 'B', 'Tính chất đặc biệt: Nếu hai hay nhiều số nguyên tố cùng nhau (ƯCLN bằng 1) thì BCNN của chúng chính bằng tích của chúng.', 'so_hoc');
  addMCQ(b12, 'BCNN của 4, 5 và 11 là:', '$20$', '$55$', '$220$', '$44$', 'C', 'Các số 4, 5, 11 từng đôi một nguyên tố cùng nhau. Do đó BCNN là $4 \\cdot 5 \\cdot 11 = 220$.', 'so_hoc');
  addMCQ(b12, 'Nếu số $a$ chia hết cho số $b$ thì $\\text{BCNN}(a, b)$ là:', '$a$', '$b$', '$a \\cdot b$', '$1$', 'A', 'Nếu $a \\vdots b$ thì $a$ là bội của $b$. Mà $a$ cũng là bội của $a$. Do đó số lớn hơn ($a$) chính là bội chung nhỏ nhất của chúng.', 'so_hoc');
  addMCQ(b12, 'Để quy đồng mẫu số nhiều phân số, ta thường lấy mẫu số chung là gì?', 'Tổng các mẫu số.', 'Tích các mẫu số.', 'BCNN của các mẫu số.', 'ƯCLN của các mẫu số.', 'C', 'Để quy đồng mẫu số các phân số, người ta thường chọn mẫu số chung là Bội chung nhỏ nhất (BCNN) của các mẫu số đó để việc tính toán đơn giản nhất.', 'so_hoc');

  addTF(b12, 'Tập hợp các bội chung của hai số chính là tập hợp các bội của BCNN của hai số đó.', true, 'Đúng. Để tìm bội chung của các số, ta có thể tìm BCNN của chúng, sau đó tìm các bội của BCNN đó.', 'so_hoc');
  addTF(b12, 'BCNN của 10 và 15 là 150.', false, 'Sai. Phân tích: $10 = 2 \\cdot 5$, $15 = 3 \\cdot 5$. BCNN là $2 \\cdot 3 \\cdot 5 = 30$. Tích 150 chỉ là một bội chung, không phải là BCNN.', 'so_hoc');
  addTF(b12, 'Số 0 là BCNN của mọi cặp số tự nhiên.', false, 'Sai. Theo định nghĩa, BCNN là số nhỏ nhất KHÁC 0 trong tập hợp các bội chung.', 'so_hoc');
  addTF(b12, 'Mọi bội chung của 6 và 8 đều phải chia hết cho 24.', true, 'Đúng. Vì BCNN(6, 8) = 24, nên mọi bội chung của 6 và 8 đều là bội của 24, tức là phải chia hết cho 24.', 'so_hoc');
  addTF(b12, 'Để tìm BCNN, ta phân tích ra thừa số nguyên tố rồi chọn các thừa số nguyên tố CHUNG với số mũ nhỏ nhất.', false, 'Sai. Đó là quy tắc tìm ƯCLN. BCNN phải lấy thừa số CHUNG VÀ RIÊNG với số mũ LỚN NHẤT.', 'so_hoc');


  // Bài 14. Phép cộng và phép trừ số nguyên
  const b14 = 'adb5c68f-4fd7-481e-8132-36e96dfaa7bd';

  addMCQ(b14, 'Tổng của hai số nguyên đối nhau luôn bằng bao nhiêu?', '$1$', '$-1$', '$0$', 'Không xác định', 'C', 'Tính chất: Tổng của hai số đối nhau luôn luôn bằng 0. Ví dụ $5 + (-5) = 0$.', 'so_hoc');
  addMCQ(b14, 'Muốn cộng hai số nguyên âm, ta làm thế nào?', 'Cộng hai số đối của chúng rồi đặt dấu "-" trước kết quả.', 'Cộng hai số đối của chúng rồi giữ nguyên dấu "+".', 'Trừ hai số đối của chúng.', 'Lấy số lớn trừ số bé.', 'A', 'Quy tắc: Muốn cộng hai số nguyên âm, ta cộng hai số đối của chúng (cộng hai giá trị phần số tự nhiên) rồi đặt dấu "-" đằng trước.', 'so_hoc');
  addMCQ(b14, 'Kết quả của phép tính $(-15) + (-20)$ là:', '$5$', '$-5$', '$35$', '$-35$', 'D', 'Ta tính: $-(15 + 20) = -35$.', 'so_hoc');
  addMCQ(b14, 'Muốn cộng hai số nguyên khác dấu không đối nhau, bước đầu tiên ta cần làm gì?', 'Cộng hai số đối của chúng.', 'Lấy số đối lớn hơn trừ đi số đối nhỏ hơn.', 'Nhân hai số với nhau.', 'Đổi dấu cả hai số.', 'B', 'Quy tắc: Ta lấy số đối lớn hơn trừ đi số đối nhỏ hơn (lấy phần tự nhiên lớn trừ phần tự nhiên nhỏ).', 'so_hoc');
  addMCQ(b14, 'Dấu của kết quả phép cộng hai số nguyên khác dấu được xác định như thế nào?', 'Luôn là dấu dương (+).', 'Luôn là dấu âm (-).', 'Phụ thuộc vào dấu của số hạng có phần số tự nhiên (số đối) lớn hơn.', 'Phụ thuộc vào dấu của số hạng đứng trước.', 'C', 'Quy tắc: Sau khi lấy phần tự nhiên lớn trừ phần tự nhiên nhỏ, ta đặt trước kết quả dấu của số có phần tự nhiên (số đối) lớn hơn.', 'so_hoc');
  addMCQ(b14, 'Kết quả của phép tính $18 + (-25)$ là:', '$7$', '$-7$', '$43$', '$-43$', 'B', 'Phần số tự nhiên: $25 > 18$. Ta lấy $25 - 18 = 7$. Số mang phần tự nhiên lớn hơn là $-25$ (dấu âm), nên kết quả là $-7$.', 'so_hoc');
  addMCQ(b14, 'Muốn trừ số nguyên $a$ cho số nguyên $b$, ta làm thế nào?', 'Cộng $a$ với $b$.', 'Cộng $a$ với số đối của $b$.', 'Lấy số đối của $a$ trừ đi $b$.', 'Cộng số đối của $a$ với số đối của $b$.', 'B', 'Quy tắc phép trừ số nguyên: $a - b = a + (-b)$. Muốn trừ số nguyên $a$ cho $b$, ta cộng $a$ với số đối của $b$.', 'so_hoc');
  addMCQ(b14, 'Kết quả của phép tính $5 - (-8)$ là:', '$-3$', '$3$', '$13$', '$-13$', 'C', 'Theo quy tắc trừ số nguyên: $5 - (-8) = 5 + 8 = 13$.', 'so_hoc');
  addMCQ(b14, 'Kết quả của phép tính $(-10) - 7$ là:', '$-3$', '$3$', '$17$', '$-17$', 'D', 'Theo quy tắc trừ: $(-10) - 7 = (-10) + (-7) = -17$.', 'so_hoc');
  addMCQ(b14, 'Phép cộng các số nguyên có các tính chất cơ bản nào?', 'Chỉ có tính chất giao hoán.', 'Chỉ có tính chất kết hợp.', 'Giao hoán, kết hợp, cộng với số 0, cộng với số đối.', 'Chỉ có tính chất cộng với số 0.', 'C', 'Phép cộng số nguyên thừa hưởng tính chất giao hoán, kết hợp, cộng với 0 từ số tự nhiên, và có thêm tính chất cộng với số đối.', 'so_hoc');

  addTF(b14, 'Tổng của một số nguyên âm và một số nguyên dương luôn là một số nguyên âm.', false, 'Sai. Tùy thuộc vào số nào có phần tự nhiên lớn hơn. Ví dụ $(-3) + 5 = 2$ (là số nguyên dương).', 'so_hoc');
  addTF(b14, 'Hiệu của hai số nguyên âm luôn luôn là một số nguyên âm.', false, 'Sai. Ví dụ $(-5) - (-10) = -5 + 10 = 5$ (là số dương).', 'so_hoc');
  addTF(b14, 'Trong tập hợp các số nguyên $\\mathbb{Z}$, phép trừ luôn luôn thực hiện được.', true, 'Đúng. Khác với tập số tự nhiên $\\mathbb{N}$, nhờ có quy tắc "cộng với số đối", phép trừ $a - b$ luôn có kết quả trong tập $\\mathbb{Z}$ với mọi $a, b$.', 'so_hoc');
  addTF(b14, 'Khoảng cách giữa hai điểm $a$ và $b$ trên trục số bằng $|a - b|$.', true, 'Đúng. Giá trị tuyệt đối của hiệu hai số nguyên chính là khoảng cách giữa hai điểm biểu diễn chúng trên trục số.', 'so_hoc');
  addTF(b14, 'Phép tính $(-15) - (-15)$ có kết quả bằng $-30$.', false, 'Sai. Phép tính này là một số trừ đi chính nó (hoặc $ -15 + 15 $). Kết quả phải bằng 0.', 'so_hoc');


  console.log(`Bắt đầu nạp ${allQS.length} câu hỏi lý thuyết G6 Bài 12 và Bài 14...`);

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
