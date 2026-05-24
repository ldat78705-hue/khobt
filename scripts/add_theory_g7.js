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
      code: `G7-L-${crypto.randomBytes(2).toString('hex').toUpperCase()}`,
      grade: 7, topic,
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
      code: `G7-LTF-${crypto.randomBytes(2).toString('hex').toUpperCase()}`,
      grade: 7, topic,
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

  // Luyện tập chung (Chương I)
  const c1_ltc = '7517ac98-43db-464f-91dd-7629822136e8';
  addMCQ(c1_ltc, 'Số hữu tỉ là số có thể viết dưới dạng:', 'Số thập phân hữu hạn.', 'Phân số $\\dfrac{a}{b}$ với $a, b \\in \\mathbb{Z}, b \\neq 0$.', 'Số nguyên dương.', 'Số vô tỉ.', 'B', 'Theo định nghĩa, số hữu tỉ là số có thể viết được dưới dạng phân số $\\dfrac{a}{b}$ với $a, b$ là các số nguyên và $b$ khác $0$. Dạng số thập phân vô hạn tuần hoàn cũng là số hữu tỉ nhưng không phải là cách định nghĩa đầy đủ nhất.', 'so_hoc');
  addTF(c1_ltc, 'Mọi số nguyên đều là số hữu tỉ.', true, 'Đúng. Mọi số nguyên $a$ đều có thể viết dưới dạng phân số $\\dfrac{a}{1}$. Do đó, mọi số nguyên đều là số hữu tỉ.', 'so_hoc');

  // Bài tập cuối chương I
  const c1_btcc = '8492e4b3-cc87-4967-91e9-8a0a379e6dd0';
  addMCQ(c1_btcc, 'Khẳng định nào sau đây là SAI khi nói về luỹ thừa của số hữu tỉ?', '$\\left(\\dfrac{a}{b}\\right)^n = \\dfrac{a^n}{b^n} \\, (b \\neq 0)$', '$x^m \\cdot x^n = x^{m+n}$', '$x^m : x^n = x^{m-n} \\, (x \\neq 0, m \\ge n)$', '$(x^m)^n = x^{m+n}$', 'D', 'Quy tắc đúng của luỹ thừa của luỹ thừa là $(x^m)^n = x^{m \\cdot n}$. Khẳng định D nói rằng $(x^m)^n = x^{m+n}$ là sai.', 'so_hoc');
  addTF(c1_btcc, 'Khi chuyển một số hạng từ vế này sang vế kia của một đẳng thức, ta phải giữ nguyên dấu của số hạng đó.', false, 'Sai. Theo quy tắc chuyển vế, khi chuyển một số hạng từ vế này sang vế kia của một đẳng thức, ta BẮT BUỘC phải đổi dấu số hạng đó.', 'so_hoc');

  // Bài tập cuối chương II (Số thực)
  const c2 = '7b3c6ad3-82a3-4fdc-8aa7-d8e066354d18';
  addMCQ(c2, 'Tập hợp các số thực $\\mathbb{R}$ bao gồm:', 'Chỉ các số hữu tỉ.', 'Chỉ các số vô tỉ.', 'Số hữu tỉ và số nguyên.', 'Số hữu tỉ và số vô tỉ.', 'D', 'Tập hợp các số thực $\\mathbb{R}$ được hợp thành từ tập hợp các số hữu tỉ $\\mathbb{Q}$ và tập hợp các số vô tỉ $\\mathbb{I}$. Tức là $\\mathbb{R} = \\mathbb{Q} \\cup \\mathbb{I}$.', 'so_hoc');
  addTF(c2, 'Căn bậc hai số học của một số thực âm không tồn tại.', true, 'Đúng. Khái niệm căn bậc hai số học $\\sqrt{a}$ chỉ được định nghĩa với số thực $a \\ge 0$. Căn bậc hai số học của số âm không tồn tại trong tập hợp số thực.', 'so_hoc');

  // Bài tập cuối chương III (Góc và đg thẳng song song)
  const c3 = 'fda54110-2d5b-4249-9df0-6d718a094df5';
  addMCQ(c3, 'Tiên đề Euclid về đường thẳng song song khẳng định điều gì?', 'Qua một điểm nằm ngoài một đường thẳng, có vô số đường thẳng song song với đường thẳng đó.', 'Qua một điểm nằm ngoài một đường thẳng, có duy nhất một đường thẳng song song với đường thẳng đó.', 'Hai đường thẳng cùng vuông góc với đường thẳng thứ ba thì song song với nhau.', 'Hai góc so le trong bằng nhau thì hai đường thẳng song song.', 'B', 'Nội dung cốt lõi của Tiên đề Euclid là sự TỒN TẠI DUY NHẤT: Qua một điểm ở ngoài một đường thẳng, chỉ có một đường thẳng song song với đường thẳng đó.', 'hinh_hoc');
  addTF(c3, 'Hai góc kề bù là hai góc có tổng số đo bằng $90^{\\circ}$.', false, 'Sai. Hai góc kề bù là hai góc vừa kề nhau vừa bù nhau, tổng số đo của chúng phải bằng $180^{\\circ}$, không phải $90^{\\circ}$ (kề phụ mới là $90^{\\circ}$).', 'hinh_hoc');

  // Bài tập cuối chương IV (Tam giác bằng nhau)
  const c4 = 'cbc81c53-36e2-4c02-a2cd-bebd6ab70da5';
  addMCQ(c4, 'Nếu $\\Delta ABC$ và $\\Delta DEF$ có $AB = DE, \\angle A = \\angle D, AC = DF$ thì hai tam giác này bằng nhau theo trường hợp nào?', 'Cạnh - Cạnh - Cạnh (c.c.c)', 'Cạnh - Góc - Cạnh (c.g.c)', 'Góc - Cạnh - Góc (g.c.g)', 'Cạnh huyền - góc nhọn', 'B', 'Vì góc A xen giữa hai cạnh AB và AC, góc D xen giữa hai cạnh DE và DF. Do đó, hai tam giác bằng nhau theo trường hợp Cạnh - Góc - Cạnh (c.g.c).', 'hinh_hoc');
  addTF(c4, 'Đường trung trực của một đoạn thẳng là đường thẳng đi qua trung điểm của đoạn thẳng đó.', false, 'Sai (bị thiếu). Đường trung trực của một đoạn thẳng là đường thẳng ĐI QUA TRUNG ĐIỂM và VUÔNG GÓC với đoạn thẳng đó. Thiếu điều kiện vuông góc là sai bản chất.', 'hinh_hoc');

  console.log(`Bắt đầu nạp ${allQS.length} câu hỏi lý thuyết Lớp 7...`);

  for (const q of allQS) {
    const qid = crypto.randomUUID();
    await sql`
      INSERT INTO public.questions (id, category_id, question_code, content, options, correct_answer, solution, difficulty, grade, topic, question_type, user_id, status, is_public)
      VALUES (${qid}, ${q.cat}, ${q.code}, ${q.content}, ${q.options}::jsonb, ${q.correct_answer}, ${q.solution}, 'thong_hieu', ${q.grade}, ${q.topic}, ${q.type}, ${user_id}, 'approved', true)
    `;
  }

  console.log('Thành công! Lớp 7 đã nạp xong (Chương I - IV).');
}

main().catch(console.error);
