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
      code: `G9-BATCH4-${crypto.randomBytes(2).toString('hex').toUpperCase()}`,
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
      code: `G9-BATCH4TF-${crypto.randomBytes(2).toString('hex').toUpperCase()}`,
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

  // Bài 27. Góc nội tiếp
  const c27 = 'de6eff7c-5049-442b-a019-ccda3152b146';

  addMCQ(c27, 'Góc nội tiếp là góc:', 'Có đỉnh nằm ngoài đường tròn.', 'Có đỉnh nằm trên đường tròn và hai cạnh chứa hai dây cung của đường tròn đó.', 'Có đỉnh trùng với tâm đường tròn.', 'Có hai cạnh tiếp xúc với đường tròn.', 'B', 'Theo định nghĩa, góc nội tiếp là góc có đỉnh nằm trên đường tròn và hai cạnh của góc chứa hai dây cung của đường tròn.', 'hinh_hoc');
  addMCQ(c27, 'Số đo của góc nội tiếp bằng:', 'Số đo của cung bị chắn.', 'Nửa số đo của góc ở tâm cùng chắn một cung.', 'Gấp đôi số đo của cung bị chắn.', 'Nửa số đo của cung lớn.', 'B', 'Định lí: Trong một đường tròn, số đo của góc nội tiếp bằng nửa số đo của cung bị chắn. Và do đó nó bằng nửa số đo của góc ở tâm cùng chắn cung đó.', 'hinh_hoc');
  addMCQ(c27, 'Trong một đường tròn, hai góc nội tiếp cùng chắn một cung thì:', 'Có tổng bằng $180^\\circ$', 'Bằng nhau', 'Góc này gấp đôi góc kia', 'Có tổng bằng $360^\\circ$', 'B', 'Hệ quả: Các góc nội tiếp cùng chắn một cung hoặc chắn các cung bằng nhau thì bằng nhau.', 'hinh_hoc');
  addMCQ(c27, 'Góc nội tiếp chắn nửa đường tròn là:', 'Góc nhọn', 'Góc tù', 'Góc vuông', 'Góc bẹt', 'C', 'Góc nội tiếp chắn nửa đường tròn (cung $180^\\circ$) có số đo bằng một nửa cung bị chắn, tức là $\\dfrac{180^\\circ}{2} = 90^\\circ$ (góc vuông).', 'hinh_hoc');
  addMCQ(c27, 'Góc tạo bởi tia tiếp tuyến và dây cung có số đo bằng:', 'Số đo của góc nội tiếp cùng chắn cung đó.', 'Số đo của góc ở tâm cùng chắn cung đó.', 'Gấp đôi số đo của cung bị chắn.', 'Nửa số đo của góc nội tiếp.', 'A', 'Định lí: Số đo của góc tạo bởi tia tiếp tuyến và dây cung bằng nửa số đo của cung bị chắn. Do đó nó bằng số đo của góc nội tiếp cùng chắn cung đó.', 'hinh_hoc');
  addMCQ(c27, 'Cho đường tròn $(O)$, $\\widehat{BAC}$ là góc nội tiếp chắn cung $BC$. Nếu $\\widehat{BAC} = 40^\\circ$ thì số đo cung nhỏ $BC$ là:', '$20^\\circ$', '$40^\\circ$', '$80^\\circ$', '$140^\\circ$', 'C', 'Vì số đo góc nội tiếp bằng nửa số đo cung bị chắn nên $\\text{sđ}\\overparen{BC} = 2 \\cdot \\widehat{BAC} = 2 \\cdot 40^\\circ = 80^\\circ$.', 'hinh_hoc');
  addMCQ(c27, 'Cho tứ giác nội tiếp đường tròn. Tổng số đo hai góc đối diện của tứ giác đó bằng:', '$90^\\circ$', '$180^\\circ$', '$270^\\circ$', '$360^\\circ$', 'B', 'Trong một tứ giác nội tiếp, tổng số đo hai góc đối diện luôn luôn bằng $180^\\circ$.', 'hinh_hoc');
  addMCQ(c27, 'Nếu tứ giác $ABCD$ có tổng hai góc đối $\\widehat{A} + \\widehat{C} = 180^\\circ$ thì:', 'Tứ giác $ABCD$ là hình vuông.', 'Tứ giác $ABCD$ là hình thang.', 'Tứ giác $ABCD$ nội tiếp được đường tròn.', 'Tứ giác $ABCD$ là hình bình hành.', 'C', 'Đấu hiệu nhận biết: Tứ giác có tổng hai góc đối bằng $180^\\circ$ thì tứ giác đó nội tiếp được trong một đường tròn.', 'hinh_hoc');
  addMCQ(c27, 'Hình nào sau đây luôn luôn nội tiếp được trong một đường tròn?', 'Hình thoi', 'Hình chữ nhật', 'Hình bình hành', 'Hình thang', 'B', 'Hình chữ nhật có 4 góc vuông, do đó tổng hai góc đối bằng $90^\\circ + 90^\\circ = 180^\\circ$. Vậy nó luôn nội tiếp được trong đường tròn (tâm là giao điểm hai đường chéo).', 'hinh_hoc');
  addMCQ(c27, 'Dấu hiệu nào sau đây KHÔNG chứng minh được một tứ giác nội tiếp?', 'Tứ giác có tổng hai góc đối bằng $180^\\circ$.', 'Tứ giác có góc ngoài tại một đỉnh bằng góc trong tại đỉnh đối diện.', 'Tứ giác có hai đỉnh kề nhau cùng nhìn cạnh chứa hai đỉnh còn lại dưới một góc $\\alpha$.', 'Tứ giác có hai đường chéo vuông góc.', 'D', 'Hai đường chéo vuông góc không đảm bảo tứ giác nội tiếp (ví dụ hình thoi không phải là hình vuông thì không nội tiếp được đường tròn).', 'hinh_hoc');

  addTF(c27, 'Mọi hình thang cân đều nội tiếp được đường tròn.', true, 'Đúng. Hình thang cân có tính chất tổng hai góc đối diện bằng $180^\\circ$, do đó nó luôn nội tiếp được đường tròn.', 'hinh_hoc');
  addTF(c27, 'Tâm đường tròn ngoại tiếp của tứ giác nội tiếp luôn nằm bên trong tứ giác đó.', false, 'Sai. Tâm đường tròn có thể nằm ngoài tứ giác (ví dụ tứ giác có 1 góc tù rất lớn) hoặc nằm trên một cạnh của tứ giác (nếu có một cạnh là đường kính).', 'hinh_hoc');
  addTF(c27, 'Nếu $\\widehat{A}$ và $\\widehat{B}$ là hai góc nội tiếp cùng chắn một cung của đường tròn thì $\\widehat{A} = \\widehat{B}$.', true, 'Đúng. Hai góc nội tiếp cùng chắn một cung thì bằng nhau.', 'hinh_hoc');
  addTF(c27, 'Số đo của góc ở tâm gấp đôi số đo của góc nội tiếp cùng chắn một cung.', true, 'Đúng. Vì góc ở tâm có số đo bằng đúng số đo cung bị chắn, còn góc nội tiếp bằng nửa số đo cung đó.', 'hinh_hoc');
  addTF(c27, 'Hình bình hành luôn nội tiếp được trong một đường tròn.', false, 'Sai. Hình bình hành chỉ nội tiếp được khi nó là hình chữ nhật (hoặc hình vuông). Hình bình hành thông thường có 2 góc nhọn và 2 góc tù, tổng 2 góc đối không bằng $180^\\circ$.', 'hinh_hoc');


  // Bài 31. Hình trụ và hình nón
  const c31 = '8e983753-201a-4a9f-857f-4fac0eb3cbc1';

  addMCQ(c31, 'Hình được tạo thành khi quay một hình chữ nhật một vòng quanh một cạnh cố định của nó là:', 'Hình cầu', 'Hình nón', 'Hình trụ', 'Hình chóp', 'C', 'Khi quay hình chữ nhật một vòng quanh một cạnh của nó, hai cạnh kề với cạnh đó sẽ vạch ra hai hình tròn đáy, cạnh đối diện vạch ra mặt xung quanh của HÌNH TRỤ.', 'hinh_khong_gian');
  addMCQ(c31, 'Hình được tạo thành khi quay một tam giác vuông một vòng quanh một cạnh góc vuông cố định của nó là:', 'Hình trụ', 'Hình nón', 'Hình chóp', 'Hình cầu', 'B', 'Khi quay tam giác vuông quanh một cạnh góc vuông, cạnh góc vuông kia vạch ra mặt đáy (hình tròn), cạnh huyền vạch ra mặt xung quanh của HÌNH NÓN.', 'hinh_khong_gian');
  addMCQ(c31, 'Công thức tính diện tích xung quanh của hình trụ có bán kính đáy $r$ và chiều cao $h$ là:', '$S = \\pi rh$', '$S = 2\\pi rh$', '$S = \\pi r^2 h$', '$S = 4\\pi r^2$', 'B', 'Diện tích xung quanh của hình trụ bằng chu vi đáy nhân với chiều cao: $S_{xq} = 2\\pi r \\cdot h$.', 'hinh_khong_gian');
  addMCQ(c31, 'Công thức tính thể tích của hình trụ có bán kính đáy $r$ và chiều cao $h$ là:', '$V = \\dfrac{1}{3}\\pi r^2 h$', '$V = \\pi rh$', '$V = \\pi r^2 h$', '$V = 2\\pi r^2 h$', 'C', 'Thể tích của hình trụ bằng diện tích đáy nhân với chiều cao: $V = \\pi r^2 \\cdot h$.', 'hinh_khong_gian');
  addMCQ(c31, 'Công thức tính diện tích xung quanh của hình nón có bán kính đáy $r$ và đường sinh $l$ là:', '$S = 2\\pi rl$', '$S = \\pi rl$', '$S = \\pi r^2 l$', '$S = \\dfrac{1}{3}\\pi r^2 l$', 'B', 'Diện tích xung quanh của hình nón được tính bằng công thức: $S_{xq} = \\pi r l$.', 'hinh_khong_gian');
  addMCQ(c31, 'Thể tích của hình nón có bán kính đáy $r$ và chiều cao $h$ được tính bằng công thức:', '$V = \\pi r^2 h$', '$V = \\dfrac{1}{3}\\pi r^2 h$', '$V = \\dfrac{4}{3}\\pi r^3$', '$V = \\pi rl$', 'B', 'Thể tích của hình nón bằng một phần ba thể tích của hình trụ có cùng đáy và chiều cao: $V = \\dfrac{1}{3}\\pi r^2 h$.', 'hinh_khong_gian');
  addMCQ(c31, 'Mối liên hệ giữa đường sinh $l$, chiều cao $h$ và bán kính đáy $r$ của hình nón là:', '$l = h + r$', '$l^2 = h^2 + r^2$', '$l = h^2 + r^2$', '$h^2 = l^2 + r^2$', 'B', 'Đường sinh $l$, chiều cao $h$ và bán kính đáy $r$ tạo thành một tam giác vuông. Theo định lí Pythagore: $l^2 = h^2 + r^2$.', 'hinh_khong_gian');
  addMCQ(c31, 'Thể tích của hình cầu có bán kính $R$ là:', '$V = \\dfrac{4}{3}\\pi R^3$', '$V = 4\\pi R^2$', '$V = \\dfrac{3}{4}\\pi R^3$', '$V = \\pi R^3$', 'A', 'Công thức tính thể tích của hình cầu là $V = \\dfrac{4}{3}\\pi R^3$.', 'hinh_khong_gian');
  addMCQ(c31, 'Diện tích mặt cầu có bán kính $R$ là:', '$S = 4\\pi R^3$', '$S = \\pi R^2$', '$S = 4\\pi R^2$', '$S = 2\\pi R^2$', 'C', 'Công thức tính diện tích mặt cầu là $S = 4\\pi R^2$.', 'hinh_khong_gian');
  addMCQ(c31, 'Mặt cắt của một hình cầu cắt bởi một mặt phẳng là hình gì?', 'Một hình elip.', 'Một đa giác.', 'Luôn luôn là một hình tròn.', 'Một đường thẳng.', 'C', 'Khi cắt hình cầu bởi một mặt phẳng bất kỳ, phần giao nhau (mặt cắt) luôn luôn là một hình tròn.', 'hinh_khong_gian');

  addTF(c31, 'Đường sinh của hình trụ luôn bằng chiều cao của hình trụ đó.', true, 'Đúng. Trong hình trụ, các đường sinh song song với trục và bằng chiều cao của hình trụ.', 'hinh_khong_gian');
  addTF(c31, 'Đường sinh của hình nón luôn lớn hơn chiều cao của hình nón đó.', true, 'Đúng. Trong tam giác vuông tạo bởi đường sinh, bán kính và chiều cao, đường sinh là cạnh huyền nên luôn lớn hơn cạnh góc vuông (chiều cao $h$).', 'hinh_khong_gian');
  addTF(c31, 'Hai hình trụ có cùng thể tích thì chắc chắn có cùng chiều cao.', false, 'Sai. Thể tích $V = \\pi r^2 h$. Có thể tăng chiều cao $h$ và giảm bán kính $r$ một cách thích hợp để giữ nguyên thể tích. Do đó chúng không nhất thiết phải có cùng chiều cao.', 'hinh_khong_gian');
  addTF(c31, 'Diện tích toàn phần của hình trụ bằng diện tích xung quanh cộng với diện tích của HAI mặt đáy.', true, 'Đúng. Hình trụ có hai mặt đáy là hai hình tròn, nên $S_{tp} = S_{xq} + 2S_{\\text{đáy}}$.', 'hinh_khong_gian');
  addTF(c31, 'Mặt phẳng đi qua tâm của hình cầu sẽ cắt hình cầu theo một hình tròn lớn nhất.', true, 'Đúng. Mặt cắt đi qua tâm của hình cầu tạo ra "đường tròn lớn" (great circle) có bán kính đúng bằng bán kính của hình cầu, đây là mặt cắt có diện tích lớn nhất.', 'hinh_khong_gian');

  console.log(`Bắt đầu nạp ${allQS.length} câu hỏi lý thuyết G9 BATCH 4...`);

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
