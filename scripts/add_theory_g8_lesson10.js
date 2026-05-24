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
      code: `G8-B10-${crypto.randomBytes(2).toString('hex').toUpperCase()}`,
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
      code: `G8-B10TF-${crypto.randomBytes(2).toString('hex').toUpperCase()}`,
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

  // Bài 10. Tứ giác
  const c10 = '2f9cdeb3-c6e9-496a-bc41-2d395c05d997';

  // 1
  addMCQ(c10, 'Tổng số đo các góc trong của một tứ giác bất kỳ bằng:', '$180^\\circ$', '$360^\\circ$', '$270^\\circ$', '$540^\\circ$', 'B', 'Theo định lí tổng các góc trong một tứ giác, tổng số đo 4 góc của bất kỳ tứ giác lồi nào cũng luôn luôn bằng $360^\\circ$.', 'hinh_hoc');

  // 2
  addMCQ(c10, 'Tứ giác lồi là tứ giác:', 'Có các góc bằng nhau.', 'Luôn nằm trọn trong một nửa mặt phẳng có bờ là đường thẳng chứa bất kì cạnh nào của tứ giác.', 'Có tổng hai góc đối bằng $180^\\circ$.', 'Có hai đường chéo cắt nhau.', 'B', 'Theo định nghĩa, tứ giác lồi là tứ giác luôn nằm trong một nửa mặt phẳng có bờ là đường thẳng chứa bất kỳ cạnh nào của tứ giác đó.', 'hinh_hoc');

  // 3
  addMCQ(c10, 'Trong tứ giác $ABCD$, hai góc đối nhau là:', '$\\angle A$ và $\\angle B$', '$\\angle A$ và $\\angle C$', '$\\angle B$ và $\\angle C$', '$\\angle C$ và $\\angle D$', 'B', 'Trong tứ giác, hai góc nằm ở hai đỉnh không kề nhau cùng một cạnh được gọi là hai góc đối nhau. Trong $ABCD$, $\\angle A$ đối với $\\angle C$, và $\\angle B$ đối với $\\angle D$.', 'hinh_hoc');

  // 4
  addMCQ(c10, 'Đường chéo của tứ giác là:', 'Đoạn thẳng nối hai đỉnh kề nhau.', 'Đoạn thẳng nối trung điểm hai cạnh đối.', 'Đoạn thẳng nối hai đỉnh đối nhau.', 'Đường vuông góc kẻ từ một đỉnh đến cạnh đối diện.', 'C', 'Đường chéo của tứ giác là đoạn thẳng nối hai đỉnh đối nhau (không cùng nằm trên một cạnh).', 'hinh_hoc');

  // 5
  addMCQ(c10, 'Tứ giác có nhiều nhất bao nhiêu góc nhọn?', '$1$', '$2$', '$3$', '$4$', 'C', 'Vì tổng 4 góc của tứ giác là $360^\\circ$. Nếu tứ giác có 4 góc nhọn (mỗi góc $< 90^\\circ$) thì tổng 4 góc $< 360^\\circ$ (vô lý). Do đó, tứ giác có nhiều nhất 3 góc nhọn (khi đó góc còn lại sẽ là góc tù lớn hơn $90^\\circ$).', 'hinh_hoc');

  // 6
  addMCQ(c10, 'Tứ giác có nhiều nhất bao nhiêu góc tù?', '$1$', '$2$', '$3$', '$4$', 'C', 'Tương tự, nếu tứ giác có 4 góc tù (mỗi góc $> 90^\\circ$) thì tổng 4 góc $> 360^\\circ$ (vô lý). Vậy nó chỉ có nhiều nhất 3 góc tù.', 'hinh_hoc');

  // 7
  addMCQ(c10, 'Cho tứ giác $ABCD$ có $\\angle A = 80^\\circ$, $\\angle B = 100^\\circ$, $\\angle C = 110^\\circ$. Số đo góc $D$ là:', '$70^\\circ$', '$80^\\circ$', '$90^\\circ$', '$100^\\circ$', 'A', 'Tổng các góc của tứ giác là $360^\\circ$. Do đó, $\\angle D = 360^\\circ - (80^\\circ + 100^\\circ + 110^\\circ) = 360^\\circ - 290^\\circ = 70^\\circ$.', 'hinh_hoc');

  // 8
  addMCQ(c10, 'Góc ngoài của tứ giác là góc:', 'Kề bù với một góc trong của tứ giác.', 'Bằng tổng hai góc trong không kề với nó.', 'Đối đỉnh với một góc trong của tứ giác.', 'Bằng góc trong của tứ giác.', 'A', 'Góc ngoài tại một đỉnh của tứ giác là góc kề bù với góc trong tại đỉnh đó. Tổng số đo của một góc trong và góc ngoài tại một đỉnh là $180^\\circ$.', 'hinh_hoc');

  // 9
  addMCQ(c10, 'Tổng các góc ngoài (tại mỗi đỉnh lấy một góc) của một tứ giác lồi là bao nhiêu?', '$180^\\circ$', '$360^\\circ$', '$540^\\circ$', '$720^\\circ$', 'B', 'Với mọi đa giác lồi (kể cả tứ giác), tổng các góc ngoài (mỗi đỉnh chọn 1 góc) luôn luôn bằng $360^\\circ$.', 'hinh_hoc');

  // 10
  addMCQ(c10, 'Đoạn thẳng nối trung điểm hai cạnh đối của tứ giác lồi được gọi là gì?', 'Đường chéo', 'Đường trung trực', 'Đường trung bình', 'Đoạn nối trung điểm (Đường trung tuyến của tứ giác)', 'D', 'Đoạn thẳng nối trung điểm hai cạnh đối của tứ giác không có tên gọi đặc biệt cố định trong mọi sách, nhưng thường được gọi là "đường trung bình của tứ giác" hoặc đơn giản là đoạn nối trung điểm. Tùy sách, đáp án chuẩn nhất là Đoạn nối trung điểm.', 'hinh_hoc');

  // 11
  addTF(c10, 'Một tứ giác lồi có thể có ba góc vuông và một góc nhọn.', false, 'Sai. Nếu tứ giác có ba góc vuông ($90^\\circ \\times 3 = 270^\\circ$) thì góc còn lại bắt buộc phải là $360^\\circ - 270^\\circ = 90^\\circ$ (cũng là góc vuông). Nó không thể là góc nhọn.', 'hinh_hoc');

  // 12
  addTF(c10, 'Một tứ giác không thể có bốn góc đều nhọn.', true, 'Đúng. Nếu 4 góc đều nhọn (nhỏ hơn $90^\\circ$) thì tổng 4 góc nhỏ hơn $360^\\circ$, điều này trái với định lí tổng 4 góc của tứ giác bằng $360^\\circ$.', 'hinh_hoc');

  // 13
  addTF(c10, 'Mọi tứ giác đều có hai đường chéo cắt nhau tại một điểm nằm bên trong tứ giác.', false, 'Sai. Điều này chỉ đúng với tứ giác lồi. Đối với tứ giác lõm (như hình đầu mũi tên), hai đường chéo có thể cắt nhau ở bên ngoài tứ giác.', 'hinh_hoc');

  // 14
  addTF(c10, 'Nếu tổng hai góc kề một cạnh của tứ giác bằng $180^\\circ$ thì tứ giác đó là hình thang.', true, 'Đúng. Nếu tổng hai góc kề một cạnh bằng $180^\\circ$ (hai góc trong cùng phía bù nhau) thì hai cạnh còn lại sẽ song song với nhau. Tứ giác có hai cạnh đối song song là hình thang.', 'hinh_hoc');

  // 15
  addTF(c10, 'Chu vi của một tứ giác là tổng độ dài của bốn cạnh và hai đường chéo.', false, 'Sai. Chu vi của tứ giác (hay bất kỳ đa giác nào) chỉ là tổng độ dài của các cạnh bao quanh (4 cạnh), KHÔNG bao gồm độ dài các đường chéo.', 'hinh_hoc');

  console.log(`Bắt đầu nạp ${allQS.length} câu hỏi lý thuyết Bài 10 (Tứ giác)...`);

  let count = 0;
  for (const q of allQS) {
    const qid = crypto.randomUUID();
    await sql`
      INSERT INTO public.questions (id, category_id, question_code, content, options, correct_answer, solution, difficulty, grade, topic, question_type, user_id, status, is_public)
      VALUES (${qid}, ${q.cat}, ${q.code}, ${q.content}, ${JSON.stringify(q.options)}::jsonb, ${q.correct_answer}, ${q.solution}, 'thong_hieu', ${q.grade}, ${q.topic}, ${q.type}, ${user_id}, 'approved', true)
    `;
    count++;
  }

  console.log(`Thành công! Đã nạp ${count} câu hỏi chất lượng cao cho Bài 10 (Tứ giác).`);
}

main().catch(console.error);
