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
      code: `G9-BATCH1-${crypto.randomBytes(2).toString('hex').toUpperCase()}`,
      grade: 9, topic,
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
      code: `G9-BATCH1TF-${crypto.randomBytes(2).toString('hex').toUpperCase()}`,
      grade: 9, topic,
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

  // Bài 1. Khái niệm phương trình và hệ hai PT bậc nhất 2 ẩn
  const c1 = '04886195-366d-43d0-a9da-4043475ccfb2';

  addMCQ(c1, 'Phương trình bậc nhất hai ẩn có dạng tổng quát là:', '$ax^2 + bx + c = 0$', '$ax + by = c$', '$y = ax + b$', '$ax + b = 0$', 'B', 'Phương trình bậc nhất hai ẩn $x$ và $y$ có dạng tổng quát là $ax + by = c$, trong đó $a, b, c$ là các số thực và $a, b$ không đồng thời bằng 0.', 'pt_bpt');
  addMCQ(c1, 'Trong phương trình $ax + by = c$ (với $a, b$ không đồng thời bằng 0), điều kiện nào sau đây là bắt buộc?', '$a \\neq 0$ và $b \\neq 0$', '$a^2 + b^2 > 0$', '$c \\neq 0$', '$a \\neq 0$ hoặc $b \\neq 0$ hoặc $c \\neq 0$', 'B', 'Điều kiện để $a, b$ không đồng thời bằng 0 thường được viết dưới dạng $a^2 + b^2 > 0$ hoặc $a \\neq 0$ hoặc $b \\neq 0$.', 'pt_bpt');
  addMCQ(c1, 'Nghiệm của phương trình bậc nhất hai ẩn $ax + by = c$ được biểu diễn bởi:', 'Một điểm trên mặt phẳng tọa độ.', 'Một đường thẳng trên mặt phẳng tọa độ.', 'Một Parabol trên mặt phẳng tọa độ.', 'Một đường tròn trên mặt phẳng tọa độ.', 'B', 'Tập nghiệm của phương trình bậc nhất hai ẩn $ax + by = c$ được biểu diễn bởi đường thẳng $ax + by = c$ trên mặt phẳng tọa độ $Oxy$.', 'pt_bpt');
  addMCQ(c1, 'Hệ hai phương trình bậc nhất hai ẩn có dạng:', '$\\begin{cases} ax + by = c \\\\ a\'x + b\'y = c\' \\end{cases}$', '$\\begin{cases} ax^2 + by = c \\\\ a\'x + b\'y = c\' \\end{cases}$', '$\\begin{cases} ax + by + cz = d \\\\ a\'x + b\'y + c\'z = d\' \\end{cases}$', '$\\begin{cases} ax = b \\\\ cx = d \\end{cases}$', 'A', 'Hệ hai phương trình bậc nhất hai ẩn gồm hai phương trình bậc nhất hai ẩn $x, y$. Dạng tổng quát là hệ $\\begin{cases} ax + by = c \\\\ a\'x + b\'y = c\' \\end{cases}$.', 'pt_bpt');
  addMCQ(c1, 'Một hệ phương trình bậc nhất hai ẩn có thể có bao nhiêu nghiệm?', 'Chỉ 1 nghiệm duy nhất.', 'Vô nghiệm hoặc 1 nghiệm duy nhất.', 'Vô nghiệm hoặc vô số nghiệm.', 'Vô nghiệm, 1 nghiệm duy nhất hoặc vô số nghiệm.', 'D', 'Một hệ phương trình bậc nhất hai ẩn (tương ứng với sự tương giao của 2 đường thẳng) có thể: cắt nhau (1 nghiệm), song song (vô nghiệm) hoặc trùng nhau (vô số nghiệm).', 'pt_bpt');
  addMCQ(c1, 'Đường thẳng biểu diễn tập nghiệm của phương trình $0x + 2y = 4$ có đặc điểm gì?', 'Song song với trục $Oy$.', 'Song song hoặc trùng với trục $Ox$.', 'Đi qua gốc tọa độ.', 'Vuông góc với đường thẳng $y = x$.', 'B', 'Ta có $0x + 2y = 4 \\Leftrightarrow 2y = 4 \\Leftrightarrow y = 2$. Đường thẳng $y = 2$ song song với trục hoành $Ox$.', 'pt_bpt');
  addMCQ(c1, 'Đường thẳng biểu diễn tập nghiệm của phương trình $3x + 0y = 6$ có đặc điểm gì?', 'Song song hoặc trùng với trục $Oy$.', 'Song song với trục $Ox$.', 'Đi qua gốc tọa độ.', 'Là đường phân giác của góc phần tư thứ nhất.', 'A', 'Ta có $3x + 0y = 6 \\Leftrightarrow 3x = 6 \\Leftrightarrow x = 2$. Đường thẳng $x = 2$ song song với trục tung $Oy$.', 'pt_bpt');
  addMCQ(c1, 'Cặp số nào sau đây là một nghiệm của phương trình $2x - y = 3$?', '$(1; -1)$', '$(2; 1)$', '$(0; 3)$', '$(-1; 1)$', 'B', 'Thay tọa độ từng cặp số vào phương trình: Với $(2; 1)$ ta có $2(2) - 1 = 4 - 1 = 3$ (Thỏa mãn).', 'pt_bpt');
  addMCQ(c1, 'Hệ phương trình $\\begin{cases} x + y = 2 \\\\ 2x + 2y = 4 \\end{cases}$ có bao nhiêu nghiệm?', 'Vô nghiệm', '$1$ nghiệm', '$2$ nghiệm', 'Vô số nghiệm', 'D', 'Nhận thấy phương trình (2) là gấp đôi phương trình (1). Hai đường thẳng này trùng nhau, do đó hệ có vô số nghiệm.', 'pt_bpt');
  addMCQ(c1, 'Hệ phương trình $\\begin{cases} x - y = 1 \\\\ x - y = 2 \\end{cases}$ có bao nhiêu nghiệm?', 'Vô nghiệm', '$1$ nghiệm', '$2$ nghiệm', 'Vô số nghiệm', 'A', 'Hai phương trình có cùng vế trái nhưng vế phải khác nhau (hai đường thẳng song song). Suy ra hệ vô nghiệm.', 'pt_bpt');

  addTF(c1, 'Phương trình $2x - 0y = 5$ không phải là phương trình bậc nhất hai ẩn vì hệ số của $y$ bằng $0$.', false, 'Sai. Phương trình $ax + by = c$ là phương trình bậc nhất hai ẩn khi $a, b$ không đồng thời bằng 0. Ở đây $a=2 \\neq 0, b=0$ nên nó vẫn là phương trình bậc nhất hai ẩn.', 'pt_bpt');
  addTF(c1, 'Mọi phương trình bậc nhất hai ẩn đều có vô số nghiệm.', true, 'Đúng. Tập nghiệm của phương trình bậc nhất hai ẩn $ax + by = c$ được biểu diễn bởi một đường thẳng, và một đường thẳng có vô số điểm, tương ứng với vô số nghiệm.', 'pt_bpt');
  addTF(c1, 'Cặp số $(x_0; y_0)$ là nghiệm của hệ phương trình nếu nó chỉ cần thỏa mãn một trong hai phương trình của hệ.', false, 'Sai. Cặp số $(x_0; y_0)$ được gọi là nghiệm của hệ phương trình nếu nó là nghiệm chung của CẢ HAI phương trình trong hệ đó.', 'pt_bpt');
  addTF(c1, 'Hai hệ phương trình được gọi là tương đương nếu chúng có cùng tập nghiệm.', true, 'Đúng. Định nghĩa hai hệ phương trình tương đương: Hai hệ phương trình được gọi là tương đương nếu chúng có cùng tập hợp nghiệm (bao gồm cả trường hợp cùng vô nghiệm).', 'pt_bpt');
  addTF(c1, 'Đường thẳng biểu diễn tập nghiệm của phương trình $ax + by = c$ luôn đi qua gốc tọa độ $O(0; 0)$.', false, 'Sai. Đường thẳng đó chỉ đi qua gốc tọa độ khi $c = 0$. Nếu $c \\neq 0$, đường thẳng không đi qua gốc tọa độ.', 'pt_bpt');


  // Bài 7. Căn bậc hai và căn thức bậc hai
  const c7 = 'd6b4f323-757f-4a92-8720-38ca2f4deba8';

  addMCQ(c7, 'Căn bậc hai số học của một số thực không âm $a$ được kí hiệu là:', '$\\pm\\sqrt{a}$', '$\\sqrt{a}$', '$a^2$', '$-\\sqrt{a}$', 'B', 'Với $a \\geq 0$, số thực không âm $x$ thỏa mãn $x^2 = a$ được gọi là căn bậc hai SỐ HỌC của $a$, kí hiệu là $\\sqrt{a}$.', 'dai_so');
  addMCQ(c7, 'Số dương $a$ có bao nhiêu căn bậc hai?', '1', '2', '3', 'Không có', 'B', 'Mọi số dương $a$ đều có đúng hai căn bậc hai là hai số đối nhau: $\\sqrt{a}$ (căn bậc hai số học) và $-\\sqrt{a}$.', 'dai_so');
  addMCQ(c7, 'Khẳng định nào sau đây là ĐÚNG khi nói về số $0$?', 'Số $0$ không có căn bậc hai.', 'Số $0$ có hai căn bậc hai là $0$ và $-0$.', 'Số $0$ có đúng một căn bậc hai là chính nó.', 'Căn bậc hai số học của $0$ không tồn tại.', 'C', 'Số $0$ có đúng một căn bậc hai là $0$, kí hiệu $\\sqrt{0} = 0$.', 'dai_so');
  addMCQ(c7, 'Căn thức bậc hai $\\sqrt{A}$ xác định (có nghĩa) khi và chỉ khi:', '$A > 0$', '$A \\geq 0$', '$A < 0$', '$A \\neq 0$', 'B', 'Căn thức bậc hai $\\sqrt{A}$ có nghĩa khi và chỉ khi biểu thức dưới dấu căn không âm, tức là $A \\geq 0$.', 'dai_so');
  addMCQ(c7, 'Hằng đẳng thức liên quan đến căn bậc hai là:', '$\\sqrt{A^2} = A$', '$\\sqrt{A^2} = -A$', '$\\sqrt{A^2} = |A|$', '$(\\sqrt{A})^2 = |A|$', 'C', 'Với mọi biểu thức $A$, ta luôn có hằng đẳng thức: $\\sqrt{A^2} = |A|$.', 'dai_so');
  addMCQ(c7, 'Điều kiện xác định của biểu thức $\\sqrt{x - 3}$ là:', '$x > 3$', '$x \\geq 3$', '$x < 3$', '$x \\leq 3$', 'B', 'Biểu thức có nghĩa khi $x - 3 \\geq 0 \\Leftrightarrow x \\geq 3$.', 'dai_so');
  addMCQ(c7, 'Điều kiện xác định của biểu thức $\\sqrt{-2x}$ là:', '$x > 0$', '$x \\geq 0$', '$x < 0$', '$x \\leq 0$', 'D', 'Biểu thức có nghĩa khi $-2x \\geq 0$. Chia cả hai vế cho $-2$ (đổi chiều bất phương trình), ta được $x \\leq 0$.', 'dai_so');
  addMCQ(c7, 'Giá trị của biểu thức $\\sqrt{(-5)^2}$ bằng:', '$-5$', '$5$', '$\\pm 5$', '$25$', 'B', 'Ta có $\\sqrt{(-5)^2} = |-5| = 5$. Tuyệt đối không được rút gọn căn với bình phương rồi bỏ quên dấu trị tuyệt đối đối với số âm.', 'dai_so');
  addMCQ(c7, 'Nghiệm của phương trình $x^2 = 7$ là:', '$x = 7$', '$x = \\sqrt{7}$', '$x = \\pm \\sqrt{7}$', 'Phương trình vô nghiệm', 'C', 'Phương trình $x^2 = a$ (với $a > 0$) luôn có 2 nghiệm phân biệt là $x = \\sqrt{a}$ và $x = -\\sqrt{a}$.', 'dai_so');
  addMCQ(c7, 'Khẳng định nào sau đây là SAI?', '$\\sqrt{16} = 4$', 'Căn bậc hai của $16$ là $4$ và $-4$', '$\\sqrt{(-4)^2} = 4$', '$\\sqrt{16} = \\pm 4$', 'D', 'Kí hiệu $\\sqrt{16}$ chỉ "căn bậc hai số học" của 16, tức là phần dương. Do đó $\\sqrt{16} = 4$. Khẳng định $\\sqrt{16} = \\pm 4$ là sai.', 'dai_so');

  addTF(c7, 'Số âm không có căn bậc hai trong tập số thực.', true, 'Đúng. Bình phương của mọi số thực đều lớn hơn hoặc bằng 0, do đó không có số thực nào bình phương lên bằng một số âm.', 'dai_so');
  addTF(c7, 'Hai biểu thức $\\sqrt{A^2}$ và $(\\sqrt{A})^2$ là hoàn toàn giống nhau với mọi giá trị của $A$.', false, 'Sai. Biểu thức $\\sqrt{A^2}$ xác định với mọi số thực $A$ và bằng $|A|$. Còn biểu thức $(\\sqrt{A})^2$ chỉ xác định khi $A \\geq 0$ và khi đó nó bằng $A$.', 'dai_so');
  addTF(c7, 'Căn bậc hai số học của $25$ là $5$ và $-5$.', false, 'Sai. "Căn bậc hai SỐ HỌC" của một số dương chỉ lấy giá trị dương. Vậy căn bậc hai số học của 25 chỉ là 5. Còn "căn bậc hai" (không có chữ số học) của 25 mới là 5 và -5.', 'dai_so');
  addTF(c7, 'Điều kiện xác định của biểu thức $\\dfrac{1}{\\sqrt{x - 1}}$ là $x > 1$.', true, 'Đúng. Căn thức $\\sqrt{x - 1}$ ở dưới mẫu nên biểu thức dưới căn phải dương ngặt: $x - 1 > 0 \\Leftrightarrow x > 1$.', 'dai_so');
  addTF(c7, 'Biểu thức $\\sqrt{x^2 + 1}$ luôn có nghĩa với mọi giá trị của $x$.', true, 'Đúng. Với mọi số thực $x$, ta luôn có $x^2 \\geq 0 \\Rightarrow x^2 + 1 \\geq 1 > 0$. Do đó biểu thức dưới căn luôn dương, căn thức luôn có nghĩa.', 'dai_so');

  console.log(`Bắt đầu nạp ${allQS.length} câu hỏi lý thuyết G9 BATCH 1...`);

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
