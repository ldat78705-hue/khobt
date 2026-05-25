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
      code: `G6-B2B3-${crypto.randomBytes(2).toString('hex').toUpperCase()}`,
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
      code: `G6-B2B3TF-${crypto.randomBytes(2).toString('hex').toUpperCase()}`,
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

  // Bài 2. Cách ghi số tự nhiên
  const b2 = '2b72ed00-ceba-4922-b2d6-34bed4a4d18d';

  addMCQ(b2, 'Hệ thập phân sử dụng bao nhiêu chữ số để ghi tất cả các số tự nhiên?', '9 chữ số', '10 chữ số', 'Vô số chữ số', '8 chữ số', 'B', 'Hệ thập phân sử dụng đúng 10 chữ số là 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 để ghi mọi số tự nhiên.', 'so_hoc');
  addMCQ(b2, 'Trong cách ghi số tự nhiên ở hệ thập phân, giá trị của mỗi chữ số phụ thuộc vào:', 'Độ lớn của chữ số đó.', 'Số lượng chữ số của số tự nhiên đó.', 'Vị trí của nó trong số đó.', 'Khoảng cách giữa các chữ số.', 'C', 'Trong hệ thập phân, mỗi chữ số nằm ở những vị trí (hàng) khác nhau thì có giá trị khác nhau (gọi là giá trị theo vị trí).', 'so_hoc');
  addMCQ(b2, 'Cứ mười đơn vị ở một hàng thì làm thành mấy đơn vị ở hàng liền trước nó?', '1 đơn vị', '10 đơn vị', '100 đơn vị', '0 đơn vị', 'A', 'Quy tắc hệ thập phân: Cứ mười đơn vị ở một hàng thì làm thành một đơn vị ở hàng liền trước nó (hàng lớn hơn tiếp theo).', 'so_hoc');
  addMCQ(b2, 'Số tự nhiên lớn nhất có 3 chữ số khác nhau là:', '$999$', '$987$', '$102$', '$989$', 'B', 'Để số có 3 chữ số là lớn nhất, chữ số hàng trăm phải là 9, hàng chục là 8, hàng đơn vị là 7 (vì các chữ số phải KHÁC NHAU). Vậy là 987.', 'so_hoc');
  addMCQ(b2, 'Kí hiệu $\\overline{ab}$ mang ý nghĩa gì?', 'Tích của $a$ và $b$ (tức là $a \\cdot b$).', 'Số tự nhiên có hai chữ số, chữ số hàng chục là $a$, hàng đơn vị là $b$.', 'Số tự nhiên có hai chữ số, hàng chục là $b$, hàng đơn vị là $a$.', 'Tổng của $a$ và $b$.', 'B', 'Kí hiệu $\\overline{ab}$ (với $a \\neq 0$) dùng để chỉ số tự nhiên có hai chữ số, trong đó $a$ là chữ số hàng chục và $b$ là chữ số hàng đơn vị.', 'so_hoc');
  addMCQ(b2, 'Khai triển số tự nhiên $\\overline{abc}$ thành tổng giá trị các chữ số của nó là:', '$a + b + c$', '$100a + 10b + c$', '$a \\cdot 100 + b \\cdot 10 + c \\cdot 0$', '$1000a + 100b + 10c$', 'B', 'Vì $a$ ở hàng trăm, $b$ ở hàng chục, $c$ ở hàng đơn vị nên $\\overline{abc} = a \\cdot 100 + b \\cdot 10 + c$.', 'so_hoc');
  addMCQ(b2, 'Số La Mã $\\text{XXIV}$ tương ứng với số tự nhiên nào?', '$26$', '$24$', '$25$', '$14$', 'B', 'Trong chữ số La Mã, $\\text{X} = 10, \\text{IV} = 4$. Vậy $\\text{XXIV} = 10 + 10 + 4 = 24$.', 'so_hoc');
  addMCQ(b2, 'Số 19 được viết bằng chữ số La Mã là:', '$\\text{XVIIII}$', '$\\text{IXX}$', '$\\text{XIX}$', '$\\text{XXI}$', 'C', 'Số $19 = 10 + 9$, trong đó 10 là $\\text{X}$, 9 là $\\text{IX}$. Vậy viết là $\\text{XIX}$.', 'so_hoc');
  addMCQ(b2, 'Hệ đếm La Mã có đặc điểm gì khác với hệ thập phân?', 'Có chữ số 0.', 'Giá trị của chữ số không phụ thuộc vào vị trí.', 'Giá trị của chữ số phụ thuộc vào vị trí.', 'Sử dụng 10 chữ số cơ bản.', 'B', 'Trong hệ La Mã, mỗi kí tự (ví dụ X, V, I) có một giá trị cố định, giá trị này thay đổi (cộng/trừ) khi kết hợp nhưng về cơ bản không phải là hệ đếm theo vị trí (như hàng chục, hàng trăm) như hệ thập phân. Hệ La Mã cũng KHÔNG có chữ số 0.', 'so_hoc');
  addMCQ(b2, 'Để viết các số La Mã từ 1 đến 30, người ta dùng bao nhiêu chữ số La Mã cơ bản?', '2', '3', '4', '5', 'B', 'Chỉ dùng 3 chữ số cơ bản là: $\\text{I}$ (1), $\\text{V}$ (5), $\\text{X}$ (10).', 'so_hoc');

  addTF(b2, 'Chữ số đầu tiên bên trái của một số tự nhiên có nhiều chữ số luôn phải khác 0.', true, 'Đúng. Ví dụ không có số tự nhiên nào viết là $012$ (khi viết chuẩn, ta chỉ viết là $12$). Chữ số ở hàng cao nhất bắt buộc phải khác 0.', 'so_hoc');
  addTF(b2, 'Hệ chữ số La Mã có chữ số 0.', false, 'Sai. Hệ số La Mã không có kí hiệu nào đại diện cho số 0.', 'so_hoc');
  addTF(b2, 'Số tự nhiên nhỏ nhất có bốn chữ số là $1000$.', true, 'Đúng. Số lớn nhất có ba chữ số là $999$, số tự nhiên liền sau nó là $1000$, là số nhỏ nhất có bốn chữ số.', 'so_hoc');
  addTF(b2, 'Trong số $2023$, chữ số $2$ có giá trị là hai nghìn.', false, 'Sai. Có hai chữ số 2. Chữ số 2 đầu tiên ở hàng nghìn có giá trị là $2000$. Chữ số 2 thứ hai ở hàng chục có giá trị là $20$. Khẳng định này không đầy đủ và gây hiểu nhầm.', 'so_hoc');
  addTF(b2, 'Số $\\text{IX}$ trong hệ La Mã có nghĩa là $10 - 1 = 9$.', true, 'Đúng. Theo quy tắc viết số La Mã, chữ số nhỏ (I) đứng trước chữ số lớn (X) mang ý nghĩa trừ đi giá trị của chữ số nhỏ đó.', 'so_hoc');

  // Bài 3. Thứ tự trong tập hợp các số tự nhiên
  const b3 = 'b89132d0-27fb-481b-a80b-7fecf91d1107';

  addMCQ(b3, 'Tia số là hình biểu diễn tập hợp nào?', 'Tập hợp số nguyên', 'Tập hợp số hữu tỉ', 'Tập hợp số tự nhiên', 'Tập hợp số thực', 'C', 'Tia số gốc 0, với các điểm cách đều nhau được dùng để biểu diễn trực quan tập hợp các số tự nhiên $\\mathbb{N}$.', 'so_hoc');
  addMCQ(b3, 'Trên tia số nằm ngang, điểm biểu diễn số tự nhiên $a$ nằm bên trái điểm biểu diễn số tự nhiên $b$ khi nào?', 'Khi $a = b$', 'Khi $a < b$', 'Khi $a > b$', 'Khi $a \\leq b$', 'B', 'Theo quy ước, trên tia số từ trái sang phải, điểm nằm bên trái biểu diễn số nhỏ hơn. Vậy $a$ nằm bên trái $b$ nghĩa là $a < b$.', 'so_hoc');
  addMCQ(b3, 'Cho hai số tự nhiên $a$ và $b$. Khẳng định nào sau đây là tính chất bắc cầu?', 'Nếu $a < b$ và $b < c$ thì $a < c$', 'Nếu $a < b$ thì $b > a$', 'Nếu $a = b$ và $b = c$ thì $a = c$', 'Nếu $a \\leq b$ thì $a < b$ hoặc $a = b$', 'A', 'Tính chất bắc cầu chỉ ra sự liên kết qua một số trung gian: Nếu $a < b$ và $b < c$ thì $a < c$.', 'so_hoc');
  addMCQ(b3, 'Số liền sau của số tự nhiên $x$ là số nào?', '$x - 1$', '$x + 1$', '$2x$', '$x + 2$', 'B', 'Mỗi số tự nhiên có một số liền sau duy nhất. Số liền sau của $x$ là số lớn hơn $x$ một đơn vị, tức là $x + 1$.', 'so_hoc');
  addMCQ(b3, 'Số tự nhiên nào KHÔNG CÓ số liền trước?', 'Số 1', 'Số 10', 'Số 0', 'Không có số nào', 'C', 'Trong tập hợp các số tự nhiên $\\mathbb{N}$, số 0 là số nhỏ nhất nên nó không có số tự nhiên nào liền trước nó.', 'so_hoc');
  addMCQ(b3, 'Tập hợp các số tự nhiên thỏa mãn $12 \\leq x < 15$ là:', '$\\{12; 13; 14\\}$', '$\\{13; 14\\}$', '$\\{12; 13; 14; 15\\}$', '$\\{13; 14; 15\\}$', 'A', 'Vì có dấu "$\\leq 12$" nên ta lấy số 12. Vì dấu "$< 15$" nên không lấy số 15. Các số tự nhiên nằm trong khoảng này là 12, 13, 14.', 'so_hoc');
  addMCQ(b3, 'Khẳng định nào sau đây là SAI?', 'Mọi số tự nhiên đều có số liền sau.', 'Số lớn nhất có hai chữ số là 99.', 'Tập hợp các số tự nhiên là hữu hạn.', 'Số liền trước của 100 là 99.', 'C', 'Tập hợp các số tự nhiên $\\mathbb{N}$ kéo dài vô tận, do đó nó là tập hợp vô hạn, không phải hữu hạn.', 'so_hoc');
  addMCQ(b3, 'Cho ba số tự nhiên liên tiếp tăng dần. Nếu số ở giữa là $a$ thì hai số còn lại là:', '$a - 1$ và $a + 2$', '$a - 1$ và $a + 1$', '$a$ và $a + 1$', '$a - 2$ và $a - 1$', 'B', 'Vì là ba số tự nhiên liên tiếp tăng dần, số đứng trước $a$ sẽ là $a - 1$, và số đứng sau $a$ sẽ là $a + 1$.', 'so_hoc');
  addMCQ(b3, 'Tập hợp $A = \\{x \\in \\mathbb{N} \\mid 5 < x \\leq 8\\}$ có bao nhiêu phần tử?', '2 phần tử', '3 phần tử', '4 phần tử', 'Vô số phần tử', 'B', 'Các phần tử của $A$ là $\\{6; 7; 8\\}$. Vậy tập $A$ có 3 phần tử.', 'so_hoc');
  addMCQ(b3, 'Trên tia số, khoảng cách giữa hai điểm biểu diễn số tự nhiên liên tiếp bằng:', '0', '1 đơn vị', 'Tùy ý', '1 cm', 'B', 'Theo quy ước vẽ tia số, khoảng cách giữa hai điểm biểu diễn hai số tự nhiên liên tiếp luôn bằng 1 đơn vị dài.', 'so_hoc');

  addTF(b3, 'Số 0 là số tự nhiên nhỏ nhất.', true, 'Đúng. Tập hợp các số tự nhiên $\\mathbb{N} = \\{0; 1; 2; 3;...\\}$. Số nhỏ nhất là 0.', 'so_hoc');
  addTF(b3, 'Tồn tại số tự nhiên lớn nhất.', false, 'Sai. Do mỗi số tự nhiên bất kỳ đều có một số liền sau lớn hơn nó 1 đơn vị, nên không bao giờ có số tự nhiên lớn nhất. Tập $\\mathbb{N}$ là vô hạn.', 'so_hoc');
  addTF(b3, 'Giữa hai số tự nhiên liên tiếp không có số tự nhiên nào khác.', true, 'Đúng. Ví dụ giữa số 5 và số 6 không tồn tại bất kỳ một số tự nhiên nào khác (chỉ có số thập phân/số hữu tỉ không thuộc $\\mathbb{N}$).', 'so_hoc');
  addTF(b3, 'Ba số $a, a+1, a+2$ là ba số tự nhiên liên tiếp tăng dần (với $a \\in \\mathbb{N}$).', true, 'Đúng. Khoảng cách giữa các số này là 1 đơn vị và chúng được sắp xếp theo thứ tự từ bé đến lớn.', 'so_hoc');
  addTF(b3, 'Nếu $x < y$ thì điểm biểu diễn số $x$ nằm bên phải điểm biểu diễn số $y$ trên tia số.', false, 'Sai. Nếu $x < y$ thì trên tia số nằm ngang, điểm $x$ phải nằm bên TRÁI điểm $y$.', 'so_hoc');


  console.log(`Bắt đầu nạp ${allQS.length} câu hỏi lý thuyết G6 Bài 2 và Bài 3...`);

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
