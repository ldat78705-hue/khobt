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
      code: `G6-L-${crypto.randomBytes(2).toString('hex').toUpperCase()}`,
      grade: 6, topic,
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
      code: `G6-LTF-${crypto.randomBytes(2).toString('hex').toUpperCase()}`,
      grade: 6, topic,
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

  // Grade 6 Missing Categories

  // Ôn tập chương I (Tập hợp các số tự nhiên)
  const c1 = '6d45e172-f8ef-4dd7-89d9-7014a13df01e';
  addMCQ(c1, 'Thứ tự thực hiện các phép tính đối với biểu thức KHÔNG có dấu ngoặc là:', 'Cộng trừ $\\rightarrow$ Nhân chia $\\rightarrow$ Luỹ thừa', 'Nhân chia $\\rightarrow$ Cộng trừ $\\rightarrow$ Luỹ thừa', 'Luỹ thừa $\\rightarrow$ Nhân chia $\\rightarrow$ Cộng trừ', 'Nhân chia $\\rightarrow$ Luỹ thừa $\\rightarrow$ Cộng trừ', 'C', 'Quy tắc thứ tự thực hiện phép tính (không có ngoặc): Lũy thừa trước, rồi đến Nhân/Chia, cuối cùng là Cộng/Trừ. Thực hiện từ trái sang phải nếu cùng độ ưu tiên.', 'so_hoc');
  addTF(c1, 'Phần tử $x$ thuộc tập hợp $A$ được kí hiệu là $x \\subset A$.', false, 'Sai. Kí hiệu phần tử $x$ thuộc tập hợp $A$ là $x \\in A$. Kí hiệu $\\subset$ dùng để chỉ "tập hợp con" (tập hợp nằm trong tập hợp), không dùng cho phần tử.', 'so_hoc');

  // Ôn tập chương II (Tính chia hết)
  const c2 = '2660ebe9-4fad-4be3-a73b-a450166316ce';
  addMCQ(c2, 'Một số tự nhiên chia hết cho 2 và 5 thì chữ số tận cùng của nó là:', '0', '2', '5', '0 hoặc 5', 'A', 'Số chia hết cho 2 có tận cùng là số chẵn (0, 2, 4, 6, 8). Số chia hết cho 5 có tận cùng là 0 hoặc 5. Để chia hết cho cả 2 và 5, chữ số tận cùng bắt buộc phải là 0.', 'so_hoc');
  addTF(c2, 'Mọi số nguyên tố đều là số lẻ.', false, 'Sai. Số 2 là số nguyên tố và là một số chẵn. Đây là số nguyên tố chẵn duy nhất.', 'so_hoc');

  // Ôn tập chương III (Số nguyên)
  const c3 = '518aeec1-fb2f-479c-94c1-59de0d70dee1';
  addMCQ(c3, 'Khi bỏ dấu ngoặc có dấu "-" đằng trước, ta phải làm gì với các số hạng bên trong ngoặc?', 'Giữ nguyên dấu tất cả các số hạng.', 'Đổi dấu số hạng đầu tiên, giữ nguyên các số hạng còn lại.', 'Đổi dấu tất cả các số hạng bên trong ngoặc.', 'Không có quy tắc cố định.', 'C', 'Quy tắc dấu ngoặc: Khi bỏ dấu ngoặc có dấu trừ "-" đằng trước, ta bắt buộc phải đổi dấu TẤT CẢ các số hạng bên trong ngoặc (dấu "+" thành "-", dấu "-" thành "+").', 'so_hoc');
  addTF(c3, 'Tích của hai số nguyên âm luôn luôn là một số nguyên dương.', true, 'Đúng. Theo quy tắc nhân hai số nguyên cùng dấu (cụ thể là hai số âm), tích của chúng là một số nguyên dương.', 'so_hoc');

  // Ôn tập chương IV (Hình phẳng)
  const c4 = '31c9b1ca-adfd-438d-8049-8a0b2d7233a9';
  addMCQ(c4, 'Đặc điểm nào sau đây KHÔNG phải là của hình bình hành?', 'Các cạnh đối song song và bằng nhau.', 'Các góc đối bằng nhau.', 'Hai đường chéo bằng nhau.', 'Hai đường chéo cắt nhau tại trung điểm mỗi đường.', 'C', 'Hình bình hành có hai đường chéo cắt nhau tại trung điểm của mỗi đường, nhưng chúng KHÔNG BẰNG NHAU (trừ phi nó là hình chữ nhật hoặc hình vuông).', 'hinh_hoc');
  addTF(c4, 'Diện tích của hình thoi bằng nửa tích độ dài hai đường chéo.', true, 'Đúng. Công thức tính diện tích hình thoi là $S = \\dfrac{1}{2} d_1 d_2$, trong đó $d_1, d_2$ là độ dài hai đường chéo vuông góc với nhau.', 'hinh_hoc');

  console.log(`Bắt đầu nạp ${allQS.length} câu hỏi lý thuyết Lớp 6...`);

  for (const q of allQS) {
    const qid = crypto.randomUUID();
    await sql`
      INSERT INTO public.questions (id, category_id, question_code, content, options, correct_answer, solution, difficulty, grade, topic, question_type, user_id, status, is_public)
      VALUES (${qid}, ${q.cat}, ${q.code}, ${q.content}, ${q.options}::jsonb, ${q.correct_answer}, ${q.solution}, 'thong_hieu', ${q.grade}, ${q.topic}, ${q.type}, ${user_id}, 'approved', true)
    `;
  }

  console.log('Thành công! Lớp 6 đã nạp xong (Chương I - IV).');
}

main().catch(console.error);
