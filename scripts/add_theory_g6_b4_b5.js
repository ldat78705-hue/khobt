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
      code: `G6-B4B5-${crypto.randomBytes(2).toString('hex').toUpperCase()}`,
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
      code: `G6-B4B5TF-${crypto.randomBytes(2).toString('hex').toUpperCase()}`,
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

  // Bài 4. Phép cộng và phép trừ số tự nhiên
  const b4 = 'f3347891-e482-44db-ad23-7e0685486a97';

  addMCQ(b4, 'Trong phép cộng $a + b = c$, các số $a$ và $b$ được gọi là gì?', 'Số hạng', 'Tổng', 'Số bị trừ', 'Hiệu', 'A', 'Trong phép cộng hai số tự nhiên, $a$ và $b$ được gọi là các số hạng, và $c$ được gọi là tổng.', 'so_hoc');
  addMCQ(b4, 'Trong phép trừ $a - b = c$ (với $a \\geq b$), số $a$ được gọi là gì?', 'Số trừ', 'Số bị trừ', 'Hiệu', 'Số hạng', 'B', 'Trong phép trừ, $a$ là số bị trừ, $b$ là số trừ, và $c$ là hiệu.', 'so_hoc');
  addMCQ(b4, 'Tính chất giao hoán của phép cộng phát biểu rằng:', '$a + b = b + c$', '$a + b = b + a$', '$(a + b) + c = a + (b + c)$', '$a + 0 = a$', 'B', 'Tính chất giao hoán: Khi đổi chỗ các số hạng trong một tổng thì tổng đó không thay đổi ($a + b = b + a$).', 'so_hoc');
  addMCQ(b4, 'Tính chất kết hợp của phép cộng có công thức là:', '$a + b = b + a$', '$a + 0 = 0 + a = a$', '$(a + b) + c = a + (b + c)$', '$a(b + c) = ab + ac$', 'C', 'Tính chất kết hợp: Muốn cộng một tổng hai số với số thứ ba, ta có thể cộng số thứ nhất với tổng của hai số còn lại.', 'so_hoc');
  addMCQ(b4, 'Để tính nhẩm tổng $97 + 15$, cách làm nào sau đây áp dụng đúng tính chất kết hợp?', '$(97 + 3) + 12 = 100 + 12 = 112$', '$97 + 10 + 5 = 112$', '$(90 + 10) + (7 + 5) = 112$', '$(97 - 3) + 18 = 112$', 'A', 'Tách $15 = 3 + 12$, sau đó kết hợp $(97 + 3) + 12$ để tạo thành số tròn trăm ($100$), việc tính nhẩm sẽ nhanh nhất.', 'so_hoc');
  addMCQ(b4, 'Điều kiện để thực hiện được phép trừ $a - b$ trong tập hợp số tự nhiên là gì?', '$a > b$', '$a < b$', '$a \\geq b$', '$a = b$', 'C', 'Trong tập số tự nhiên $\\mathbb{N}$, phép trừ $a - b$ chỉ thực hiện được khi số bị trừ $a$ lớn hơn hoặc bằng số trừ $b$ ($a \\geq b$).', 'so_hoc');
  addMCQ(b4, 'Tìm số tự nhiên $x$ biết: $x - 45 = 120$', '$x = 75$', '$x = 165$', '$x = 120$', '$x = 45$', 'B', 'Muốn tìm số bị trừ, ta lấy hiệu cộng với số trừ: $x = 120 + 45 = 165$.', 'so_hoc');
  addMCQ(b4, 'Tìm số tự nhiên $x$ biết: $200 - x = 50$', '$x = 250$', '$x = 150$', '$x = 50$', '$x = 100$', 'B', 'Muốn tìm số trừ, ta lấy số bị trừ trừ đi hiệu: $x = 200 - 50 = 150$.', 'so_hoc');
  addMCQ(b4, 'Kết quả của phép tính $a + 0$ là bao nhiêu?', '$0$', '$a$', '$1$', 'Không xác định', 'B', 'Bất kỳ số tự nhiên nào cộng với 0 cũng bằng chính nó.', 'so_hoc');
  addMCQ(b4, 'Nếu $a + b = c$ thì khẳng định nào sau đây là ĐÚNG?', '$a = c + b$', '$b = c - a$', '$c = a - b$', '$a = b - c$', 'B', 'Từ phép cộng $a + b = c$, ta có thể suy ra các phép trừ: $a = c - b$ hoặc $b = c - a$.', 'so_hoc');

  addTF(b4, 'Phép trừ có tính chất giao hoán (tức là $a - b = b - a$).', false, 'Sai. Phép trừ không có tính chất giao hoán. Ví dụ $5 - 3 = 2$ nhưng $3 - 5$ không thực hiện được trong tập số tự nhiên (và kết quả khác nhau).', 'so_hoc');
  addTF(b4, 'Muốn tìm một số hạng chưa biết, ta lấy tổng trừ đi số hạng đã biết.', true, 'Đúng. Đây là quy tắc cơ bản để tìm thành phần chưa biết của phép cộng.', 'so_hoc');
  addTF(b4, 'Trong tập số tự nhiên, mọi phép trừ đều có kết quả.', false, 'Sai. Phép trừ $a - b$ chỉ có kết quả (thực hiện được) khi $a \\geq b$.', 'so_hoc');
  addTF(b4, 'Tính chất kết hợp cho phép ta tính tổng nhiều số hạng theo bất kỳ thứ tự nào.', true, 'Đúng. Việc kết hợp tính chất giao hoán và tính chất kết hợp cho phép ta nhóm các số hạng tùy ý để việc tính toán được thuận lợi nhất.', 'so_hoc');
  addTF(b4, 'Tổng của hai số tự nhiên luôn lớn hơn hoặc bằng mỗi số hạng của nó.', true, 'Đúng. Vì các số tự nhiên luôn lớn hơn hoặc bằng 0, nên khi cộng thêm vào, tổng sẽ không bao giờ nhỏ hơn số ban đầu.', 'so_hoc');


  // Bài 5. Phép nhân và phép chia số tự nhiên
  const b5 = '114c29c4-b3ae-4725-8b58-b395c23247a6';

  addMCQ(b5, 'Phép nhân hai số tự nhiên $a \\cdot b$ là:', 'Tổng của $a$ số hạng, mỗi số hạng bằng $b$.', 'Tích của $a$ và $b$.', 'Tổng của $b$ số hạng, mỗi số hạng bằng $a$.', 'Cả A và C đều đúng.', 'D', 'Bản chất của phép nhân $a \\cdot b$ là tổng của $a$ số hạng $b$, hoặc tổng của $b$ số hạng $a$. (Ví dụ $3 \\cdot 4 = 4+4+4 = 3+3+3+3$).', 'so_hoc');
  addMCQ(b5, 'Trong phép chia có dư $a = b \\cdot q + r$ ($b \\neq 0$), điều kiện của số dư $r$ là gì?', '$0 \\leq r < b$', '$0 < r \\leq b$', '$r < b$', '$r = 0$', 'A', 'Trong phép chia có dư, số dư $r$ phải lớn hơn hoặc bằng 0 và luôn phải nhỏ hơn số chia $b$.', 'so_hoc');
  addMCQ(b5, 'Tính chất phân phối của phép nhân đối với phép cộng được viết như thế nào?', '$a \\cdot (b + c) = a \\cdot b + c$', '$a \\cdot (b + c) = a \\cdot b + a \\cdot c$', '$(a + b) \\cdot c = a + b \\cdot c$', '$a \\cdot b + c = a \\cdot (b + c)$', 'B', 'Tính chất phân phối: $a \\cdot (b + c) = a \\cdot b + a \\cdot c$. Đây là tính chất rất quan trọng để tính nhẩm nhanh.', 'so_hoc');
  addMCQ(b5, 'Khi chia số tự nhiên $a$ cho 0, kết quả là bao nhiêu?', '$0$', '$a$', 'Vô cực', 'Không thực hiện được', 'D', 'Trong toán học, không có phép chia cho số 0. Phép chia cho 0 là vô nghĩa.', 'so_hoc');
  addMCQ(b5, 'Kết quả của phép tính $a \\cdot 1$ là:', '$1$', '$a$', '$0$', 'Không xác định', 'B', 'Mọi số tự nhiên nhân với 1 đều bằng chính nó.', 'so_hoc');
  addMCQ(b5, 'Trong phép chia hết $a : b = q$ (với $b \\neq 0$), $q$ được gọi là:', 'Thương', 'Số bị chia', 'Số dư', 'Số chia', 'A', 'Trong phép chia, $a$ là số bị chia, $b$ là số chia, và kết quả $q$ được gọi là thương.', 'so_hoc');
  addMCQ(b5, 'Để tính nhẩm $25 \\cdot 12$, cách sử dụng tính chất phân phối nào sau đây là ĐÚNG?', '$25 \\cdot (10 + 2) = 250 + 50 = 300$', '$(20 + 5) \\cdot 12 = 20 \\cdot 12 + 5$', '$25 \\cdot 10 + 2 = 252$', '$25 \\cdot 2 \\cdot 6 = 50 \\cdot 6 = 300$', 'A', 'Cách A tách $12 = 10 + 2$ rồi dùng tính chất phân phối $25 \\cdot 10 + 25 \\cdot 2$. Cách D dùng tính chất kết hợp chứ không phải phân phối.', 'so_hoc');
  addMCQ(b5, 'Tìm số tự nhiên $x$ biết $x : 15 = 4$', '$x = 60$', '$x = 19$', '$x = 11$', '$x = 4$', 'A', 'Muốn tìm số bị chia, ta lấy thương nhân với số chia: $x = 4 \\cdot 15 = 60$.', 'so_hoc');
  addMCQ(b5, 'Tìm số tự nhiên $x$ biết $45 : x = 9$', '$x = 5$', '$x = 54$', '$x = 405$', '$x = 36$', 'A', 'Muốn tìm số chia, ta lấy số bị chia chia cho thương: $x = 45 : 9 = 5$.', 'so_hoc');
  addMCQ(b5, 'Phép chia $25$ cho $4$ có số dư là bao nhiêu?', '$0$', '$1$', '$2$', '$3$', 'B', 'Ta có $25 = 4 \\cdot 6 + 1$. Vậy thương là 6 và số dư là 1.', 'so_hoc');

  addTF(b5, 'Tính chất phân phối của phép nhân cũng áp dụng được đối với phép trừ: $a(b - c) = ab - ac$.', true, 'Đúng. Tính chất phân phối của phép nhân đúng cho cả phép cộng và phép trừ.', 'so_hoc');
  addTF(b5, 'Phép chia có tính chất giao hoán ($a : b = b : a$).', false, 'Sai. Phép chia không có tính giao hoán. Ví dụ $4 : 2 = 2$ nhưng $2 : 4$ không ra số tự nhiên 2.', 'so_hoc');
  addTF(b5, 'Một số tự nhiên bất kỳ chia cho 1 luôn bằng chính nó.', true, 'Đúng. Quy tắc chia: $a : 1 = a$.', 'so_hoc');
  addTF(b5, 'Nếu tích của hai số tự nhiên bằng 0 thì chắc chắn có ít nhất một trong hai số đó bằng 0.', true, 'Đúng. Nếu $a \\cdot b = 0$ thì suy ra $a = 0$ hoặc $b = 0$.', 'so_hoc');
  addTF(b5, 'Trong phép chia có dư, số dư có thể lớn hơn số chia.', false, 'Sai. Số dư bắt buộc phải LỚN HƠN HOẶC BẰNG 0 và NHỎ HƠN số chia ($0 \\leq r < b$).', 'so_hoc');

  console.log(`Bắt đầu nạp ${allQS.length} câu hỏi lý thuyết G6 Bài 4 và Bài 5...`);

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
