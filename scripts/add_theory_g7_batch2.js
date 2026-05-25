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
      code: `G7-BATCH2-${crypto.randomBytes(2).toString('hex').toUpperCase()}`,
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
      code: `G7-BATCH2TF-${crypto.randomBytes(2).toString('hex').toUpperCase()}`,
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

  // Bài 2. Cộng, trừ, nhân, chia số hữu tỉ.
  const c2 = '5a3b7039-cf13-4036-8636-bc99a9542345';

  addMCQ(c2, 'Để cộng hoặc trừ hai số hữu tỉ viết dưới dạng phân số, ta phải làm gì trước tiên?', 'Cộng tử với tử, cộng mẫu với mẫu.', 'Quy đồng mẫu số dương.', 'Nhân chéo hai tử số.', 'Rút gọn các tử số.', 'B', 'Để cộng hay trừ hai số hữu tỉ viết dưới dạng phân số, trước hết ta phải quy đồng mẫu số của chúng về cùng một mẫu số dương.', 'so_hoc');
  addMCQ(c2, 'Kết quả của phép cộng $\\dfrac{1}{2} + \\left(\\dfrac{-3}{4}\\right)$ là:', '$\\dfrac{-1}{4}$', '$\\dfrac{1}{4}$', '$\\dfrac{-2}{6}$', '$\\dfrac{-5}{4}$', 'A', 'Quy đồng mẫu số chung là 4: $\\dfrac{2}{4} + \\left(\\dfrac{-3}{4}\\right) = \\dfrac{2 - 3}{4} = \\dfrac{-1}{4}$.', 'so_hoc');
  addMCQ(c2, 'Phép cộng số hữu tỉ KHÔNG có tính chất nào sau đây?', 'Giao hoán', 'Kết hợp', 'Phân phối đối với phép chia', 'Cộng với số 0', 'C', 'Phép cộng số hữu tỉ có tính giao hoán, kết hợp, cộng với số 0 và cộng với số đối. Không có tính phân phối đối với phép chia.', 'so_hoc');
  addMCQ(c2, 'Khi nhân hai số hữu tỉ dưới dạng phân số, ta thực hiện như thế nào?', 'Nhân tử với tử, giữ nguyên mẫu.', 'Nhân tử với tử, nhân mẫu với mẫu.', 'Quy đồng mẫu số rồi nhân tử với tử.', 'Nhân chéo hai phân số.', 'B', 'Quy tắc nhân hai phân số: Ta nhân các tử với nhau và nhân các mẫu với nhau: $\\dfrac{a}{b} \\cdot \\dfrac{c}{d} = \\dfrac{a \\cdot c}{b \\cdot d}$.', 'so_hoc');
  addMCQ(c2, 'Kết quả của phép nhân $\\dfrac{-3}{5} \\cdot \\dfrac{10}{-9}$ là:', '$\\dfrac{-2}{3}$', '$\\dfrac{2}{3}$', '$\\dfrac{30}{45}$', '$\\dfrac{1}{3}$', 'B', 'Ta có: $\\dfrac{-3}{5} \\cdot \\dfrac{10}{-9} = \\dfrac{-3 \\cdot 10}{5 \\cdot (-9)} = \\dfrac{-30}{-45} = \\dfrac{2}{3}$.', 'so_hoc');
  addMCQ(c2, 'Phân số nghịch đảo của $\\dfrac{-4}{7}$ là:', '$\\dfrac{4}{7}$', '$\\dfrac{7}{4}$', '$\\dfrac{-7}{4}$', '$\\dfrac{4}{-7}$', 'C', 'Số nghịch đảo của $\\dfrac{a}{b}$ là $\\dfrac{b}{a}$. Vậy nghịch đảo của $\\dfrac{-4}{7}$ là $\\dfrac{7}{-4} = \\dfrac{-7}{4}$.', 'so_hoc');
  addMCQ(c2, 'Khi chia hai số hữu tỉ $\\dfrac{a}{b}$ cho $\\dfrac{c}{d}$ (với $\\dfrac{c}{d} \\neq 0$), ta thực hiện:', 'Nhân $\\dfrac{a}{b}$ với $\\dfrac{c}{d}$', 'Nhân $\\dfrac{a}{b}$ với $\\dfrac{d}{c}$', 'Chia $a$ cho $c$ và $b$ cho $d$', 'Cộng $\\dfrac{a}{b}$ với $\\dfrac{d}{c}$', 'B', 'Quy tắc chia phân số: Ta lấy phân số thứ nhất nhân với phân số nghịch đảo của phân số thứ hai.', 'so_hoc');
  addMCQ(c2, 'Giá trị của biểu thức $1,5 - \\dfrac{3}{4}$ là:', '$\\dfrac{3}{4}$', '$0,25$', '$0,5$', '$\\dfrac{1}{4}$', 'A', 'Ta có $1,5 = \\dfrac{3}{2} = \\dfrac{6}{4}$. Vậy $\\dfrac{6}{4} - \\dfrac{3}{4} = \\dfrac{3}{4}$.', 'so_hoc');
  addMCQ(c2, 'Tích của một số hữu tỉ khác 0 với số nghịch đảo của nó luôn bằng:', '$0$', '$1$', '$-1$', 'Chính số đó', 'B', 'Theo định nghĩa, tích của một số với số nghịch đảo của nó luôn luôn bằng 1.', 'so_hoc');
  addMCQ(c2, 'Giá trị của $x$ trong phép tính $x : \\dfrac{1}{2} = \\dfrac{-3}{4}$ là:', '$\\dfrac{-3}{8}$', '$\\dfrac{-3}{2}$', '$\\dfrac{-8}{3}$', '$\\dfrac{3}{8}$', 'A', 'Ta có $x = \\dfrac{-3}{4} \\cdot \\dfrac{1}{2} = \\dfrac{-3}{8}$.', 'so_hoc');

  addTF(c2, 'Mọi số hữu tỉ đều có số nghịch đảo.', false, 'Sai. Số 0 là một số hữu tỉ nhưng nó không có số nghịch đảo (vì không có phép chia cho 0).', 'so_hoc');
  addTF(c2, 'Khi trừ hai số hữu tỉ âm, kết quả luôn là một số âm.', false, 'Sai. Ví dụ: $(-2) - (-5) = -2 + 5 = 3$. Kết quả là số dương.', 'so_hoc');
  addTF(c2, 'Tích của hai số hữu tỉ cùng dấu luôn là một số hữu tỉ dương.', true, 'Đúng. Tích của hai số cùng dương là số dương. Tích của hai số cùng âm cũng là số dương.', 'so_hoc');
  addTF(c2, 'Thương của $\\dfrac{0}{5}$ cho $\\dfrac{2}{3}$ là không xác định.', false, 'Sai. Phép chia $\\dfrac{0}{5} : \\dfrac{2}{3} = 0 \\cdot \\dfrac{3}{2} = 0$. Nó hoàn toàn xác định và bằng 0.', 'so_hoc');
  addTF(c2, 'Tính chất phân phối của phép nhân đối với phép cộng: $a \\cdot (b + c) = a \\cdot b + a \\cdot c$ đúng với mọi số hữu tỉ.', true, 'Đúng. Đây là tính chất phân phối cơ bản, áp dụng cho cả số tự nhiên, số nguyên, số hữu tỉ và số thực.', 'so_hoc');


  // Bài 9. Hai đường thẳng song song và dấu hiệu nhận biết.
  const c9 = '8f5300e2-039e-45f7-b075-59ff45cf6641';

  addMCQ(c9, 'Hai đường thẳng phân biệt không có điểm chung được gọi là:', 'Hai đường thẳng cắt nhau.', 'Hai đường thẳng trùng nhau.', 'Hai đường thẳng song song.', 'Hai đường thẳng vuông góc.', 'C', 'Định nghĩa: Hai đường thẳng song song là hai đường thẳng không có điểm chung nào dù kéo dài đến vô tận.', 'hinh_hoc');
  addMCQ(c9, 'Dấu hiệu nhận biết hai đường thẳng song song: Nếu một đường thẳng cắt hai đường thẳng phân biệt và trong các góc tạo thành có một cặp góc so le trong...', 'bù nhau thì hai đường thẳng song song.', 'bằng nhau thì hai đường thẳng song song.', 'phụ nhau thì hai đường thẳng song song.', 'kề nhau thì hai đường thẳng song song.', 'B', 'Nếu một đường thẳng cắt hai đường thẳng phân biệt và tạo ra một cặp góc so le trong bằng nhau thì hai đường thẳng đó song song.', 'hinh_hoc');
  addMCQ(c9, 'Dấu hiệu nhận biết hai đường thẳng song song: Nếu đường thẳng c cắt hai đường thẳng a và b, tạo thành một cặp góc đồng vị...', 'bằng nhau thì a song song với b.', 'có tổng bằng $180^\\circ$ thì a song song với b.', 'nhọn thì a song song với b.', 'vuông thì a song song với b.', 'A', 'Nếu một đường thẳng cắt hai đường thẳng và trong các góc tạo thành có một cặp góc đồng vị bằng nhau thì hai đường thẳng đó song song.', 'hinh_hoc');
  addMCQ(c9, 'Cho hai đường thẳng song song bị cắt bởi một cát tuyến. Hai góc trong cùng phía sẽ:', 'Bằng nhau.', 'Bù nhau.', 'Phụ nhau.', 'Kề bù.', 'B', 'Tính chất: Nếu hai đường thẳng song song bị cắt bởi một đường thẳng thứ ba thì hai góc trong cùng phía bù nhau (có tổng bằng $180^\\circ$).', 'hinh_hoc');
  addMCQ(c9, 'Tiên đề Euclid về đường thẳng song song phát biểu rằng:', 'Qua một điểm nằm ngoài đường thẳng, có vô số đường thẳng song song với nó.', 'Qua một điểm nằm ngoài đường thẳng, chỉ có duy nhất một đường thẳng song song với nó.', 'Qua một điểm nằm ngoài đường thẳng, có thể vẽ được hai đường thẳng song song với nó.', 'Không thể vẽ được đường thẳng song song qua một điểm.', 'B', 'Tiên đề Euclid: Qua một điểm nằm ngoài một đường thẳng, chỉ có một đường thẳng song song với đường thẳng đó.', 'hinh_hoc');
  addMCQ(c9, 'Nếu $a \\perp c$ và $b \\perp c$ (trong cùng một mặt phẳng) thì:', '$a \\perp b$', '$a \\parallel b$', '$a$ trùng $b$', '$a$ cắt $b$', 'B', 'Tính chất từ vuông góc đến song song: Hai đường thẳng phân biệt cùng vuông góc với một đường thẳng thứ ba thì chúng song song với nhau.', 'hinh_hoc');
  addMCQ(c9, 'Nếu $a \\parallel b$ và đường thẳng $c$ vuông góc với $a$ thì:', '$c \\parallel b$', '$c \\perp b$', '$c$ không cắt $b$', '$c$ trùng $b$', 'B', 'Một đường thẳng vuông góc với một trong hai đường thẳng song song thì nó cũng vuông góc với đường thẳng kia.', 'hinh_hoc');
  addMCQ(c9, 'Hai đường thẳng cùng song song với đường thẳng thứ ba thì:', 'Chúng cắt nhau.', 'Chúng vuông góc với nhau.', 'Chúng song song với nhau.', 'Chúng chéo nhau.', 'C', 'Tính chất ba đường thẳng song song (tính chất bắc cầu): Nếu $a \\parallel c$ và $b \\parallel c$ thì $a \\parallel b$.', 'hinh_hoc');
  addMCQ(c9, 'Một cát tuyến cắt hai đường thẳng song song tạo ra mấy cặp góc so le trong?', '1 cặp', '2 cặp', '3 cặp', '4 cặp', 'B', 'Một đường thẳng cắt hai đường thẳng tạo ra 4 góc ở mỗi giao điểm. Có chính xác 2 cặp góc so le trong và 4 cặp góc đồng vị.', 'hinh_hoc');
  addMCQ(c9, 'Trong các cặp góc sau đây, cặp góc nào KHÔNG phải là dấu hiệu để nhận biết hai đường thẳng song song khi bằng nhau?', 'Hai góc so le trong bằng nhau.', 'Hai góc đồng vị bằng nhau.', 'Hai góc so le ngoài bằng nhau.', 'Hai góc trong cùng phía bằng nhau.', 'D', 'Hai góc trong cùng phía phải BÙ NHAU (tổng bằng $180^\\circ$) mới suy ra song song. Nếu chúng chỉ bằng nhau (mà không vuông góc) thì không suy ra song song được.', 'hinh_hoc');

  addTF(c9, 'Hai đoạn thẳng song song là hai đoạn thẳng không cắt nhau.', false, 'Sai. Hai đoạn thẳng không cắt nhau chưa chắc đã song song (chúng có thể nằm ở hai đường thẳng cắt nhau nhưng các đoạn thẳng đó ngắn chưa đủ để cắt). Chỉ hai đường thẳng không có điểm chung mới song song.', 'hinh_hoc');
  addTF(c9, 'Nếu một đường thẳng cắt hai đường thẳng tạo thành một cặp góc so le trong bằng nhau thì các cặp góc đồng vị cũng bằng nhau.', true, 'Đúng. Khi có cặp góc so le trong bằng nhau thì hai đường thẳng song song, từ đó suy ra tất cả các cặp góc đồng vị đều bằng nhau.', 'hinh_hoc');
  addTF(c9, 'Theo tiên đề Euclid, có thể vẽ được hai đường thẳng đi qua $M$ và song song với $d$.', false, 'Sai. Tiên đề Euclid khẳng định chỉ có DUY NHẤT MỘT đường thẳng đi qua điểm $M$ nằm ngoài $d$ và song song với $d$.', 'hinh_hoc');
  addTF(c9, 'Hai góc trong cùng phía được tạo bởi một cát tuyến cắt hai đường thẳng song song thì luôn bằng $90^\\circ$.', false, 'Sai. Hai góc trong cùng phía BÙ NHAU (có tổng là $180^\\circ$), chúng không nhất thiết phải cùng bằng $90^\\circ$ (chỉ khi cát tuyến vuông góc với 2 đường thẳng thì mới bằng $90^\\circ$).', 'hinh_hoc');
  addTF(c9, 'Cho 3 đường thẳng $a, b, c$. Nếu $a$ cắt $b$ và $b \\parallel c$ thì $a$ cắt $c$.', true, 'Đúng. Nếu $a$ không cắt $c$ thì $a \\parallel c$. Theo tiên đề Euclid, qua giao điểm của $a$ và $b$ chỉ có một đường thẳng song song với $c$, vô lí. Vậy $a$ phải cắt $c$.', 'hinh_hoc');

  console.log(`Bắt đầu nạp ${allQS.length} câu hỏi lý thuyết G7 BATCH 2...`);

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
