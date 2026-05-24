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
      code: `G7-BATCH1-${crypto.randomBytes(2).toString('hex').toUpperCase()}`,
      grade: 7, topic,
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
      code: `G7-BATCH1TF-${crypto.randomBytes(2).toString('hex').toUpperCase()}`,
      grade: 7, topic,
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

  // Bài 1. Tập hợp các số hữu tỉ
  const c1 = '8581288c-9ebf-4d2b-9bd8-76080f212fdb';

  addMCQ(c1, 'Tập hợp các số hữu tỉ được kí hiệu là:', '$\\mathbb{N}$', '$\\mathbb{Z}$', '$\\mathbb{Q}$', '$\\mathbb{R}$', 'C', 'Tập hợp các số tự nhiên là $\\mathbb{N}$, số nguyên là $\\mathbb{Z}$, số thực là $\\mathbb{R}$. Tập hợp các số hữu tỉ được kí hiệu là $\\mathbb{Q}$.', 'so_hoc');
  addMCQ(c1, 'Số hữu tỉ là số có thể viết được dưới dạng phân số $\\dfrac{a}{b}$ với điều kiện gì?', '$a, b \\in \\mathbb{Z}$', '$a, b \\in \\mathbb{Z}, b \\neq 0$', '$a, b \\in \\mathbb{N}, b \\neq 0$', '$a, b \\in \\mathbb{R}, b \\neq 0$', 'B', 'Định nghĩa: Số hữu tỉ là số viết được dưới dạng phân số $\\dfrac{a}{b}$ với $a, b \\in \\mathbb{Z}$ và $b \\neq 0$.', 'so_hoc');
  addMCQ(c1, 'Số nào sau đây KHÔNG phải là số hữu tỉ?', '$-3$', '$0$', '$\\dfrac{2}{5}$', 'Tất cả đều là số hữu tỉ', 'D', '$-3 = \\dfrac{-3}{1}$; $0 = \\dfrac{0}{1}$; $\\dfrac{2}{5}$ đều viết được dưới dạng phân số nên chúng đều là số hữu tỉ.', 'so_hoc');
  addMCQ(c1, 'Trong các số hữu tỉ sau, số nào là số hữu tỉ âm?', '$\\dfrac{-3}{-4}$', '$\\dfrac{5}{7}$', '$\\dfrac{0}{-2}$', '$\\dfrac{-2}{5}$', 'D', 'Ta có: $\\dfrac{-3}{-4} = \\dfrac{3}{4} > 0$; $\\dfrac{0}{-2} = 0$ (không âm không dương). Chỉ có $\\dfrac{-2}{5} < 0$ là số hữu tỉ âm.', 'so_hoc');
  addMCQ(c1, 'Phân số nào sau đây biểu diễn số hữu tỉ $\\dfrac{1}{2}$?', '$\\dfrac{2}{4}$', '$\\dfrac{3}{5}$', '$\\dfrac{-1}{2}$', '$\\dfrac{1}{-2}$', 'A', 'Ta có $\\dfrac{2}{4}$ rút gọn bằng $\\dfrac{1}{2}$, nên nó biểu diễn cùng một số hữu tỉ.', 'so_hoc');
  addMCQ(c1, 'Số thập phân $0,75$ được viết dưới dạng phân số tối giản là:', '$\\dfrac{75}{100}$', '$\\dfrac{3}{4}$', '$\\dfrac{4}{3}$', '$\\dfrac{1}{2}$', 'B', 'Ta có $0,75 = \\dfrac{75}{100}$. Chia cả tử và mẫu cho $25$, ta được phân số tối giản $\\dfrac{3}{4}$.', 'so_hoc');
  addMCQ(c1, 'Hỗn số $2\\dfrac{1}{3}$ được viết dưới dạng số hữu tỉ là:', '$\\dfrac{5}{3}$', '$\\dfrac{6}{3}$', '$\\dfrac{7}{3}$', '$\\dfrac{3}{7}$', 'C', 'Ta có $2\\dfrac{1}{3} = \\dfrac{2 \\times 3 + 1}{3} = \\dfrac{7}{3}$.', 'so_hoc');
  addMCQ(c1, 'Số $0$ có phải là số hữu tỉ dương không?', 'Có, nó lớn hơn các số âm.', 'Không, nó là số hữu tỉ âm.', 'Không, nó không là số hữu tỉ dương cũng không là số hữu tỉ âm.', 'Số $0$ không phải là số hữu tỉ.', 'C', 'Số $0$ là số hữu tỉ nhưng nó mang tính chất trung gian, không âm cũng không dương.', 'so_hoc');
  addMCQ(c1, 'Số nguyên dương nào nhỏ nhất trong tập hợp $\\mathbb{Q}$?', '$0$', '$1$', 'Không có số nhỏ nhất', 'Không xác định được', 'B', 'Số nguyên dương nhỏ nhất vẫn là số $1$, mặc dù trong tập $\\mathbb{Q}$ (hay tập số thực) không có "số hữu tỉ dương nhỏ nhất".', 'so_hoc');
  addMCQ(c1, 'Chọn khẳng định đúng về trục số:', 'Điểm biểu diễn số hữu tỉ âm nằm bên phải điểm $0$.', 'Điểm biểu diễn số hữu tỉ dương nằm bên trái điểm $0$.', 'Số hữu tỉ càng lớn thì điểm biểu diễn càng xa gốc tọa độ về bên phải.', 'Số $0$ không thể biểu diễn trên trục số.', 'C', 'Trên trục số nằm ngang, chiều dương hướng từ trái sang phải. Số càng lớn thì vị trí của nó càng nằm xa về bên phải.', 'so_hoc');

  addTF(c1, 'Mọi số nguyên đều là số hữu tỉ.', true, 'Đúng. Mọi số nguyên $a$ đều có thể viết được dưới dạng phân số $\\dfrac{a}{1}$, do đó nó là số hữu tỉ.', 'so_hoc');
  addTF(c1, 'Số thập phân vô hạn không tuần hoàn cũng là số hữu tỉ.', false, 'Sai. Số thập phân vô hạn KHÔNG tuần hoàn (như $\\pi$, $\\sqrt{2}$) là SỐ VÔ TỈ, không thể viết được dưới dạng phân số $\\dfrac{a}{b}$.', 'so_hoc');
  addTF(c1, 'Tập hợp các số hữu tỉ bao gồm số hữu tỉ âm, số hữu tỉ dương và số $0$.', true, 'Đúng. Tập hợp số hữu tỉ $\\mathbb{Q}$ được chia làm 3 phần rời nhau: số hữu tỉ dương, số hữu tỉ âm và số $0$.', 'so_hoc');
  addTF(c1, 'Phân số $\\dfrac{-3}{-5}$ biểu diễn một số hữu tỉ âm.', false, 'Sai. Phân số $\\dfrac{-3}{-5}$ có tử và mẫu cùng dấu, nên giá trị của nó là $\\dfrac{3}{5} > 0$, tức là số hữu tỉ dương.', 'so_hoc');
  addTF(c1, 'Giữa hai số hữu tỉ bất kỳ luôn có vô số số hữu tỉ khác.', true, 'Đúng. Tập số hữu tỉ có tính chất trù mật, nghĩa là giữa hai số hữu tỉ phân biệt bất kỳ, ta luôn có thể tìm được vô số số hữu tỉ khác nằm giữa chúng.', 'so_hoc');


  // Bài 8. Góc ở vị trí đặc biệt. Tia phân giác của một góc.
  const c8 = '31b201a0-599a-4659-82b1-37f5d2913357';

  addMCQ(c8, 'Hai góc kề bù là hai góc:', 'Vừa kề nhau, vừa bù nhau.', 'Cùng chung một đỉnh.', 'Có tổng số đo bằng $90^\\circ$.', 'Có một cạnh chung.', 'A', 'Định nghĩa: Hai góc kề bù là hai góc vừa kề nhau (có một cạnh chung, hai cạnh còn lại nằm trên hai nửa mặt phẳng đối nhau) vừa bù nhau (tổng bằng $180^\\circ$).', 'hinh_hoc');
  addMCQ(c8, 'Tổng số đo của hai góc kề bù bằng:', '$90^\\circ$', '$180^\\circ$', '$360^\\circ$', '$100^\\circ$', 'B', 'Vì hai góc bù nhau nên tổng số đo của chúng luôn bằng $180^\\circ$.', 'hinh_hoc');
  addMCQ(c8, 'Hai góc đối đỉnh là hai góc:', 'Có chung một đỉnh.', 'Có tổng số đo bằng $180^\\circ$.', 'Mỗi cạnh của góc này là tia đối của một cạnh của góc kia.', 'Hai góc bằng nhau.', 'C', 'Định nghĩa: Hai góc đối đỉnh là hai góc mà mỗi cạnh của góc này là tia đối của một cạnh của góc kia.', 'hinh_hoc');
  addMCQ(c8, 'Tính chất của hai góc đối đỉnh là:', 'Chúng kề bù với nhau.', 'Chúng có tổng bằng $180^\\circ$.', 'Chúng bằng nhau.', 'Chúng có tổng bằng $90^\\circ$.', 'C', 'Định lí: Hai góc đối đỉnh thì bằng nhau.', 'hinh_hoc');
  addMCQ(c8, 'Nếu hai đường thẳng cắt nhau tạo thành một góc $90^\\circ$ thì hai đường thẳng đó:', 'Song song.', 'Trùng nhau.', 'Vuông góc.', 'Tạo thành hai góc đối đỉnh bù nhau.', 'C', 'Định nghĩa: Hai đường thẳng cắt nhau và trong các góc tạo thành có một góc vuông ($90^\\circ$) được gọi là hai đường thẳng vuông góc.', 'hinh_hoc');
  addMCQ(c8, 'Tia phân giác của một góc là:', 'Tia nằm trong góc đó.', 'Tia tạo với một cạnh của góc một góc $90^\\circ$.', 'Tia nằm trong góc và chia góc đó thành hai góc bằng nhau.', 'Tia đối của một cạnh của góc.', 'C', 'Tia phân giác của một góc là tia nằm trong góc và tạo với hai cạnh của góc đó hai góc bằng nhau (hay chia góc làm đôi).', 'hinh_hoc');
  addMCQ(c8, 'Cho góc $\\widehat{xOy} = 60^\\circ$. Tia $Oz$ là tia phân giác của góc $\\widehat{xOy}$. Số đo góc $\\widehat{xOz}$ là:', '$120^\\circ$', '$30^\\circ$', '$60^\\circ$', '$90^\\circ$', 'B', 'Vì $Oz$ là tia phân giác nên $\\widehat{xOz} = \\dfrac{\\widehat{xOy}}{2} = \\dfrac{60^\\circ}{2} = 30^\\circ$.', 'hinh_hoc');
  addMCQ(c8, 'Cho hai góc kề bù $\\widehat{xOy}$ và $\\widehat{yOz}$, biết $\\widehat{xOy} = 40^\\circ$. Tính $\\widehat{yOz}$.', '$140^\\circ$', '$50^\\circ$', '$40^\\circ$', '$180^\\circ$', 'A', 'Vì hai góc kề bù có tổng bằng $180^\\circ$ nên $\\widehat{yOz} = 180^\\circ - 40^\\circ = 140^\\circ$.', 'hinh_hoc');
  addMCQ(c8, 'Hai đường thẳng $xx\'$ và $yy\'$ cắt nhau tại $O$. Nếu $\\widehat{xOy} = 50^\\circ$ thì góc $\\widehat{x\'Oy\'}$ bằng:', '$40^\\circ$', '$130^\\circ$', '$50^\\circ$', '$90^\\circ$', 'C', 'Góc $\\widehat{x\'Oy\'}$ và góc $\\widehat{xOy}$ là hai góc đối đỉnh. Hai góc đối đỉnh thì bằng nhau nên $\\widehat{x\'Oy\'} = 50^\\circ$.', 'hinh_hoc');
  addMCQ(c8, 'Đường trung trực của một đoạn thẳng là đường thẳng:', 'Đi qua trung điểm của đoạn thẳng đó.', 'Vuông góc với đoạn thẳng đó.', 'Vuông góc với đoạn thẳng đó tại trung điểm của nó.', 'Song song với đoạn thẳng đó.', 'C', 'Đường thẳng vuông góc với một đoạn thẳng tại trung điểm của nó được gọi là đường trung trực của đoạn thẳng đó.', 'hinh_hoc');

  addTF(c8, 'Hai góc bằng nhau thì đối đỉnh.', false, 'Sai. Hai góc đối đỉnh thì bằng nhau, nhưng hai góc bằng nhau chưa chắc đã đối đỉnh (ví dụ hai góc cùng bằng $30^\\circ$ nhưng nằm rời rạc nhau).', 'hinh_hoc');
  addTF(c8, 'Hai góc kề bù luôn có một góc nhọn và một góc tù.', false, 'Sai. Nếu hai góc kề bù cùng bằng $90^\\circ$ thì không có góc nhọn hay góc tù nào cả (cả hai đều là góc vuông).', 'hinh_hoc');
  addTF(c8, 'Đường trung trực của đoạn thẳng $AB$ chia mặt phẳng thành hai phần chứa các điểm cách đều $A$ và $B$.', true, 'Đúng. Mọi điểm nằm trên đường trung trực của đoạn thẳng $AB$ đều cách đều hai mút $A$ và $B$.', 'hinh_hoc');
  addTF(c8, 'Nếu $Oz$ là tia phân giác của $\\widehat{xOy}$ thì $\\widehat{xOz} + \\widehat{zOy} = \\widehat{xOy}$.', true, 'Đúng. Vì tia phân giác luôn phải nằm GIỮA hai cạnh của góc, nên ta luôn có hệ thức cộng góc này.', 'hinh_hoc');
  addTF(c8, 'Hai đường thẳng cắt nhau tạo thành 4 cặp góc đối đỉnh.', false, 'Sai. Hai đường thẳng cắt nhau tạo thành 4 góc, và trong đó chỉ có 2 CẶP góc đối đỉnh.', 'hinh_hoc');

  console.log(`Bắt đầu nạp ${allQS.length} câu hỏi lý thuyết G7 BATCH 1...`);

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
