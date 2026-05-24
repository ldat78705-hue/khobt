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
      code: `G6-BATCH1-${crypto.randomBytes(2).toString('hex').toUpperCase()}`,
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
      code: `G6-BATCH1TF-${crypto.randomBytes(2).toString('hex').toUpperCase()}`,
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

  // Bài 1. Tập hợp
  const c1 = 'df56e4e2-d24d-447e-879e-5d3414b1325e';

  addMCQ(c1, 'Tên của một tập hợp thường được đặt bằng chữ cái gì?', 'Chữ cái in thường', 'Chữ cái in hoa', 'Chữ số', 'Kí tự đặc biệt', 'B', 'Trong toán học, người ta thường đặt tên các tập hợp bằng các chữ cái in hoa như $A, B, C, X, Y...$', 'so_hoc');
  addMCQ(c1, 'Kí hiệu phần tử $x$ thuộc tập hợp $A$ được viết là:', '$x \\subset A$', '$x \\notin A$', '$x \\in A$', '$A \\in x$', 'C', 'Để chỉ phần tử $x$ thuộc tập hợp $A$, ta dùng kí hiệu thuộc ($\\in$), viết là $x \\in A$.', 'so_hoc');
  addMCQ(c1, 'Các phần tử của một tập hợp được viết trong cặp dấu ngoặc nào?', 'Ngoặc tròn ( )', 'Ngoặc vuông [ ]', 'Ngoặc nhọn { }', 'Ngoặc kép " "', 'C', 'Khi viết tập hợp dưới dạng liệt kê, các phần tử được đặt bên trong cặp dấu ngoặc nhọn $\\{ \\}$.', 'so_hoc');
  addMCQ(c1, 'Tập hợp $A$ gồm các số tự nhiên nhỏ hơn 5 được viết là:', '$A = \\{1; 2; 3; 4; 5\\}$', '$A = \\{0; 1; 2; 3; 4\\}$', '$A = \\{0; 1; 2; 3; 4; 5\\}$', '$A = \\{1; 2; 3; 4\\}$', 'B', 'Số tự nhiên bắt đầu từ $0$. Các số tự nhiên nhỏ hơn 5 là $0, 1, 2, 3, 4$. Vậy $A = \\{0; 1; 2; 3; 4\\}$.', 'so_hoc');
  addMCQ(c1, 'Cho tập hợp $M = \\{a, b, c, d\\}$. Khẳng định nào sau đây là SAI?', '$a \\in M$', '$d \\in M$', '$e \\notin M$', '$c \\notin M$', 'D', 'Trong tập hợp $M$ có chứa phần tử $c$, do đó khẳng định $c \\notin M$ (c không thuộc M) là sai.', 'so_hoc');
  addMCQ(c1, 'Tập hợp $\\mathbb{N}^*$ là tập hợp các số tự nhiên:', 'Chẵn', 'Lẻ', 'Khác 0', 'Từ 0 đến 10', 'C', 'Tập hợp $\\mathbb{N}^*$ là tập hợp các số tự nhiên khác 0, tức là $\\mathbb{N}^* = \\{1; 2; 3; ...\\}$.', 'so_hoc');
  addMCQ(c1, 'Cách viết tập hợp $A = \\{x \\in \\mathbb{N} \\mid x < 4\\}$ được gọi là cách viết gì?', 'Liệt kê các phần tử.', 'Chỉ ra tính chất đặc trưng.', 'Mô tả bằng lời.', 'Biểu đồ Ven.', 'B', 'Cách viết sử dụng điều kiện hoặc dấu hiệu nhận biết của các phần tử được gọi là cách chỉ ra tính chất đặc trưng của tập hợp.', 'so_hoc');
  addMCQ(c1, 'Tập hợp rỗng là tập hợp:', 'Có 1 phần tử là số 0.', 'Không có phần tử nào.', 'Có vô số phần tử.', 'Chứa các phần tử rỗng.', 'B', 'Định nghĩa: Tập hợp không chứa phần tử nào được gọi là tập hợp rỗng, kí hiệu là $\\emptyset$.', 'so_hoc');
  addMCQ(c1, 'Kí hiệu tập hợp rỗng là:', '$\\{0\\}$', '$\\emptyset$', '$\\{\\}$', '$\\text{R}$', 'B', 'Tập hợp rỗng được kí hiệu là chữ $\\emptyset$ (phi). Cách viết $\\{0\\}$ là tập hợp có 1 phần tử (số 0).', 'so_hoc');
  addMCQ(c1, 'Tập hợp các chữ cái tiếng Việt có mặt trong từ "TOÁN" là:', '$\\{T; O; A; N\\}$', '$\\{T; O; Á; N\\}$', '$\\{t; o; a; n\\}$', '$\\{T; O; Á\\}$', 'B', 'Tập hợp các chữ cái gồm $T, O, Á, N$. Mỗi chữ cái xuất hiện 1 lần, phân cách nhau bởi dấu chấm phẩy.', 'so_hoc');

  addTF(c1, 'Một phần tử có thể được liệt kê nhiều lần trong một tập hợp.', false, 'Sai. Quy tắc viết tập hợp: Mỗi phần tử chỉ được liệt kê một lần duy nhất, thứ tự liệt kê là tùy ý.', 'so_hoc');
  addTF(c1, 'Tập hợp $\\{1; 2; 3\\}$ và tập hợp $\\{3; 2; 1\\}$ là hai tập hợp khác nhau.', false, 'Sai. Khi liệt kê các phần tử của một tập hợp, thứ tự các phần tử là tùy ý. Do đó hai tập hợp này là một.', 'so_hoc');
  addTF(c1, 'Các phần tử là số trong một tập hợp phải được ngăn cách bởi dấu chấm phẩy (;).', true, 'Đúng. Để tránh nhầm lẫn với dấu phẩy thập phân (trong một số trường hợp), các phần tử là số bắt buộc phải được ngăn cách bởi dấu chấm phẩy (;).', 'so_hoc');
  addTF(c1, 'Số $0$ không thuộc tập hợp các số tự nhiên $\\mathbb{N}$.', false, 'Sai. Tập hợp các số tự nhiên $\\mathbb{N}$ bắt đầu từ số $0$. $\\mathbb{N} = \\{0; 1; 2; 3; ...\\}$.', 'so_hoc');
  addTF(c1, 'Tập hợp các số tự nhiên có hai chữ số có 90 phần tử.', true, 'Đúng. Các số tự nhiên có 2 chữ số là từ 10 đến 99. Số lượng phần tử là: $99 - 10 + 1 = 90$ phần tử.', 'so_hoc');

  // Bài 13. Tập hợp các số nguyên
  const c13 = '45f9f700-53ca-43dc-8651-ac4f4baaaced';

  addMCQ(c13, 'Tập hợp các số nguyên được kí hiệu là:', '$\\mathbb{N}$', '$\\mathbb{Z}$', '$\\mathbb{Q}$', '$\\mathbb{R}$', 'B', 'Tập hợp các số nguyên (bao gồm số nguyên âm, số nguyên dương và số 0) được kí hiệu là chữ $\\mathbb{Z}$.', 'so_hoc');
  addMCQ(c13, 'Số nào sau đây là số nguyên âm?', '$0$', '$5$', '$-3$', '$\\dfrac{1}{2}$', 'C', 'Số mang dấu trừ đằng trước như $-1, -2, -3...$ là các số nguyên âm.', 'so_hoc');
  addMCQ(c13, 'Tập hợp số nguyên $\\mathbb{Z}$ bao gồm các thành phần nào?', 'Số tự nhiên và số nguyên âm.', 'Số nguyên dương và số nguyên âm.', 'Số tự nhiên và số 0.', 'Chỉ gồm các số có dấu trừ.', 'A', 'Tập hợp $\\mathbb{Z}$ gồm các số nguyên âm, số 0 và các số nguyên dương. Tập hợp số 0 và các số nguyên dương chính là tập số tự nhiên $\\mathbb{N}$.', 'so_hoc');
  addMCQ(c13, 'Số đối của số nguyên $a$ là số nào?', '$|a|$', '$-a$', '$\\dfrac{1}{a}$', '$0$', 'B', 'Hai số nguyên đối nhau có tổng bằng $0$. Số đối của số nguyên $a$ là số $-a$.', 'so_hoc');
  addMCQ(c13, 'Số đối của $-7$ là:', '$-7$', '$\\dfrac{1}{7}$', '$7$', '$0$', 'C', 'Số đối của một số nguyên âm là một số nguyên dương. Số đối của $-7$ là $7$.', 'so_hoc');
  addMCQ(c13, 'Khoảng cách từ điểm biểu diễn số nguyên $a$ đến điểm gốc $0$ trên trục số được gọi là gì?', 'Số đối của $a$', 'Giá trị tuyệt đối của $a$', 'Bình phương của $a$', 'Số nghịch đảo của $a$', 'B', 'Định nghĩa: Khoảng cách từ điểm $a$ đến gốc tọa độ $0$ trên trục số là giá trị tuyệt đối của số $a$, kí hiệu là $|a|$.', 'so_hoc');
  addMCQ(c13, 'Khẳng định nào sau đây là ĐÚNG về so sánh hai số nguyên âm?', 'Số nào có giá trị tuyệt đối lớn hơn thì lớn hơn.', 'Số nào có giá trị tuyệt đối lớn hơn thì nhỏ hơn.', 'Hai số nguyên âm luôn bằng nhau.', 'Không thể so sánh hai số nguyên âm.', 'B', 'Quy tắc so sánh 2 số nguyên âm: Số nào có phần tự nhiên (giá trị tuyệt đối) lớn hơn thì số đó NHỎ HƠN. Ví dụ: $-5 < -3$.', 'so_hoc');
  addMCQ(c13, 'Sắp xếp các số sau theo thứ tự tăng dần: $3; -5; 0; -2; 1$', '$-5; -2; 0; 1; 3$', '$-2; -5; 0; 1; 3$', '$3; 1; 0; -2; -5$', '$0; 1; 3; -2; -5$', 'A', 'Các số âm luôn nhỏ hơn 0 và nhỏ hơn các số dương. Trong hai số âm, $-5 < -2$. Vậy thứ tự tăng dần là: $-5; -2; 0; 1; 3$.', 'so_hoc');
  addMCQ(c13, 'Nhiệt độ $-5^\\circ\\text{C}$ có nghĩa là gì?', 'Dưới $0^\\circ\\text{C}$ là $5$ độ.', 'Trên $0^\\circ\\text{C}$ là $5$ độ.', 'Bằng $5$ độ dương.', 'Nhiệt độ đóng băng.', 'A', 'Nhiệt độ có dấu âm ($-$) biểu thị nhiệt độ đo được dưới vạch $0^\\circ\\text{C}$.', 'so_hoc');
  addMCQ(c13, 'Trên trục số nằm ngang, điểm biểu diễn số nguyên âm nằm ở vị trí nào so với gốc $0$?', 'Bên phải gốc 0.', 'Bên trái gốc 0.', 'Trùng với gốc 0.', 'Nằm trên gốc 0.', 'B', 'Theo quy ước vẽ trục số, chiều dương hướng sang phải. Do đó các số âm nằm ở BÊN TRÁI điểm gốc 0.', 'so_hoc');

  addTF(c13, 'Số $0$ là số nguyên dương nhỏ nhất.', false, 'Sai. Số $0$ không phải là số nguyên dương, cũng không phải là số nguyên âm. Số nguyên dương nhỏ nhất là số $1$.', 'so_hoc');
  addTF(c13, 'Mọi số nguyên dương đều lớn hơn mọi số nguyên âm.', true, 'Đúng. Vì mọi số nguyên dương đều lớn hơn $0$, và mọi số nguyên âm đều nhỏ hơn $0$.', 'so_hoc');
  addTF(c13, 'Giá trị tuyệt đối của một số nguyên luôn luôn là một số nguyên dương.', false, 'Sai. Giá trị tuyệt đối của số $0$ bằng $0$, mà $0$ không phải là số nguyên dương. Khẳng định đúng phải là: Giá trị tuyệt đối của một số nguyên luôn luôn KHÔNG ÂM.', 'so_hoc');
  addTF(c13, 'Hai số nguyên đối nhau thì có giá trị tuyệt đối bằng nhau.', true, 'Đúng. Hai số đối nhau nằm ở hai phía và cách đều điểm gốc $0$ trên trục số, nên khoảng cách (giá trị tuyệt đối) của chúng bằng nhau.', 'so_hoc');
  addTF(c13, 'Tập hợp các số nguyên lớn hơn $-3$ và nhỏ hơn $2$ có $4$ phần tử.', true, 'Đúng. Các số nguyên $x$ thỏa mãn $-3 < x < 2$ là: $\\{-2; -1; 0; 1\\}$. Tập hợp này có đúng 4 phần tử.', 'so_hoc');

  console.log(`Bắt đầu nạp ${allQS.length} câu hỏi lý thuyết G6 BATCH 1...`);

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
