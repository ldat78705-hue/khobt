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
      code: `G8-L-${crypto.randomBytes(2).toString('hex').toUpperCase()}`,
      grade: 8, topic,
      content,
      options: JSON.stringify([
        { key: 'A', value: optionA },
        { key: 'B', value: optionB },
        { key: 'C', value: optionC },
        { key: 'D', value: optionD }
      ]),
      correct_answer: correctKey,
      solution,
      type: 'trac_nghiem'
    });
  };

  const addTF = (catId, content, isTrue, solution, topic) => {
    allQS.push({
      cat: catId,
      code: `G8-LTF-${crypto.randomBytes(2).toString('hex').toUpperCase()}`,
      grade: 8, topic,
      content,
      options: JSON.stringify([
        { key: 'Đúng', value: 'Khẳng định trên là Đúng.' },
        { key: 'Sai', value: 'Khẳng định trên là Sai.' }
      ]),
      correct_answer: isTrue ? 'Đúng' : 'Sai',
      solution,
      type: 'dung_sai'
    });
  };

  // Grade 8 Missing Categories

  // Bài tập cuối chương I (Đa thức)
  const c1 = 'ff5e6edb-fdde-417a-90e3-fab807db2918';
  addMCQ(c1, 'Bậc của đa thức $P(x, y) = 3x^4y - 5x^2y^3 + 2xy^5 - 7$ là bao nhiêu?', '4', '5', '6', '7', 'C', 'Bậc của đa thức là bậc của hạng tử có bậc cao nhất trong dạng thu gọn của đa thức đó. Bậc của $3x^4y$ là $4+1=5$, bậc của $-5x^2y^3$ là $2+3=5$, bậc của $2xy^5$ là $1+5=6$. Do đó, bậc của đa thức là 6.', 'dai_so');
  addTF(c1, 'Phép chia đa thức $A = 5x^3y^2 - 3x^2y + xy$ cho đơn thức $B = 2x^2y$ là phép chia hết.', false, 'Sai. Để đa thức $A$ chia hết cho đơn thức $B$ thì mọi hạng tử của $A$ đều phải chia hết cho $B$. Hạng tử $xy$ có số mũ của $x$ là 1, nhỏ hơn số mũ của $x$ trong $B$ (là 2), nên $xy$ không chia hết cho $2x^2y$.', 'dai_so');

  // Bài tập cuối chương II (Hằng đẳng thức đáng nhớ)
  const c2 = '035c1226-afa1-4855-9fa3-15febd59e977';
  addMCQ(c2, 'Một học sinh khai triển $(x - 3)^2 = x^2 - 9$. Khẳng định nào sau đây là đúng nhất?', 'Học sinh làm đúng.', 'Học sinh sai vì thiếu hạng tử $-6x$.', 'Học sinh sai vì $(-3)^2 = -9$.', 'Học sinh sai vì $(x - 3)^2 = x^2 - 3x + 9$.', 'B', 'Khai triển đúng của hằng đẳng thức bình phương một hiệu là $(A - B)^2 = A^2 - 2AB + B^2$. Thay $A=x, B=3$ ta được $(x - 3)^2 = x^2 - 2 \\cdot x \\cdot 3 + 3^2 = x^2 - 6x + 9$. Học sinh đã nhầm lẫn với $A^2 - B^2$.', 'dai_so');
  addTF(c2, 'Mọi biểu thức dạng $x^2 + 4x + 5$ luôn luôn nhận giá trị dương với mọi số thực $x$.', true, 'Đúng. Ta có thể phân tích: $x^2 + 4x + 5 = (x^2 + 4x + 4) + 1 = (x + 2)^2 + 1$. Vì $(x + 2)^2 \\ge 0$ với mọi $x$, nên $(x + 2)^2 + 1 \\ge 1 > 0$ với mọi $x$.', 'dai_so');

  // Bài tập cuối chương III (Tứ giác)
  const c3 = '5513a5fc-713e-47fb-90ba-8e8f99b4d882';
  addMCQ(c3, 'Trong các tứ giác sau, hình nào KHÔNG có tâm đối xứng?', 'Hình bình hành', 'Hình chữ nhật', 'Hình thang cân', 'Hình thoi', 'C', 'Hình thang cân chỉ có một trục đối xứng (là đường thẳng đi qua trung điểm của hai đáy), nhưng không có tâm đối xứng. Hình bình hành, hình chữ nhật và hình thoi đều có tâm đối xứng (là giao điểm của hai đường chéo).', 'hinh_hoc');
  addTF(c3, 'Nếu một tứ giác có hai đường chéo vuông góc với nhau thì tứ giác đó chắc chắn là hình thoi.', false, 'Sai. Để là hình thoi, tứ giác đó phải là hình bình hành có hai đường chéo vuông góc (tức là hai đường chéo phải cắt nhau tại trung điểm của mỗi đường). Một tứ giác bất kỳ như hình chiếc diều có 2 đường chéo vuông góc nhưng không phải hình thoi.', 'hinh_hoc');

  // Bài tập cuối chương IV (Định lí Thalès)
  const c4 = '4aefb019-2b6e-49c2-981a-8bc2ddec8838';
  addMCQ(c4, 'Đường trung bình của tam giác có tính chất gì đặc biệt?', 'Đi qua trọng tâm của tam giác.', 'Vuông góc với cạnh đáy.', 'Song song với cạnh thứ ba và bằng nửa cạnh ấy.', 'Chia tam giác thành hai tam giác có diện tích bằng nhau.', 'C', 'Đường trung bình của tam giác là đoạn thẳng nối trung điểm hai cạnh của tam giác. Nó có tính chất: song song với cạnh thứ ba và có độ dài bằng một nửa độ dài cạnh thứ ba đó.', 'hinh_hoc');
  addTF(c4, 'Trong một tam giác, đường phân giác của một góc chia cạnh đối diện thành hai đoạn thẳng tỉ lệ thuận với hai cạnh kề hai đoạn ấy.', true, 'Đúng. Đây chính là nội dung cốt lõi của tính chất đường phân giác trong tam giác (được suy ra từ định lí Thalès).', 'hinh_hoc');

  // Bài tập cuối chương V (Dữ liệu và biểu đồ)
  const c5 = 'b9673cb6-7d68-4d4e-81af-e202c0f63761';
  addMCQ(c5, 'Để biểu diễn tỉ lệ phần trăm các loại trái cây yêu thích của học sinh trong lớp, loại biểu đồ nào là trực quan và phù hợp nhất?', 'Biểu đồ tranh', 'Biểu đồ cột', 'Biểu đồ đoạn thẳng', 'Biểu đồ hình quạt tròn', 'D', 'Biểu đồ hình quạt tròn được sử dụng rất hiệu quả để so sánh các phần với tổng thể, đặc biệt là khi thể hiện số liệu dưới dạng tỉ lệ phần trăm.', 'thong_ke');
  addTF(c5, 'Dữ liệu về chiều cao của học sinh trong lớp (tính bằng cm) là dữ liệu định tính.', false, 'Sai. Chiều cao đo bằng các con số cụ thể và có thể thực hiện phép tính cộng trừ trên đó, do đó đây là dữ liệu ĐỊNH LƯỢNG (số liệu liên tục), không phải định tính.', 'thong_ke');

  // Bài tập cuối chương VI (Phân thức đại số)
  const c6 = 'dd85653e-b62a-411e-8e61-2ea5886d7cef';
  addMCQ(c6, 'Điều kiện xác định của phân thức $\\dfrac{2x + 1}{x^2 - 4}$ là:', '$x \\neq 2$', '$x \\neq -2$', '$x \\neq 2$ và $x \\neq -2$', '$x \\neq 4$', 'C', 'Phân thức có nghĩa khi mẫu số khác 0, tức là $x^2 - 4 \\neq 0 \\Leftrightarrow (x - 2)(x + 2) \\neq 0$. Do đó $x \\neq 2$ và $x \\neq -2$.', 'dai_so');
  addTF(c6, 'Khẳng định $\\dfrac{A}{B} = \\dfrac{-A}{-B}$ là sai vì dấu trừ đã làm thay đổi giá trị của phân thức.', false, 'Sai. Khẳng định $\\dfrac{A}{B} = \\dfrac{-A}{-B}$ là ĐÚNG. Theo quy tắc đổi dấu phân thức, nhân cả tử và mẫu với $-1$ thì giá trị phân thức không thay đổi.', 'dai_so');

  console.log(`Bắt đầu nạp ${allQS.length} câu hỏi lý thuyết Lớp 8...`);

  for (const q of allQS) {
    const qid = crypto.randomUUID();
    await sql`
      INSERT INTO public.questions (id, category_id, question_code, content, options, correct_answer, solution, difficulty, grade, topic, question_type, user_id, status, is_public)
      VALUES (${qid}, ${q.cat}, ${q.code}, ${q.content}, ${q.options}::jsonb, ${q.correct_answer}, ${q.solution}, 'thong_hieu', ${q.grade}, ${q.topic}, ${q.type}, ${user_id}, 'approved', true)
    `;
  }

  console.log('Thành công! Lớp 8 đã nạp xong (Chương I - VI).');
}

main().catch(console.error);
