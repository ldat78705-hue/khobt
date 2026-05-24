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
      code: `G9-BATCH2-${crypto.randomBytes(2).toString('hex').toUpperCase()}`,
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
      code: `G9-BATCH2TF-${crypto.randomBytes(2).toString('hex').toUpperCase()}`,
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

  // Bài 11. Tỉ số lượng giác của góc nhọn
  const c11 = 'a36de566-3c04-439f-9997-2f2e0af98edd';

  addMCQ(c11, 'Cho tam giác vuông có một góc nhọn $\\alpha$. Tỉ số giữa cạnh đối và cạnh huyền được gọi là:', '$\\sin \\alpha$', '$\\cos \\alpha$', '$\\tan \\alpha$', '$\\cot \\alpha$', 'A', 'Theo định nghĩa tỉ số lượng giác của góc nhọn trong tam giác vuông: $\\sin = \\text{đối} / \\text{huyền}$.', 'luong_giac');
  addMCQ(c11, 'Cho tam giác vuông có một góc nhọn $\\alpha$. Tỉ số giữa cạnh kề và cạnh huyền được gọi là:', '$\\sin \\alpha$', '$\\cos \\alpha$', '$\\tan \\alpha$', '$\\cot \\alpha$', 'B', 'Theo định nghĩa tỉ số lượng giác của góc nhọn trong tam giác vuông: $\\cos = \\text{kề} / \\text{huyền}$.', 'luong_giac');
  addMCQ(c11, 'Cho tam giác vuông có một góc nhọn $\\alpha$. Tỉ số giữa cạnh đối và cạnh kề được gọi là:', '$\\sin \\alpha$', '$\\cos \\alpha$', '$\\tan \\alpha$', '$\\cot \\alpha$', 'C', 'Theo định nghĩa tỉ số lượng giác của góc nhọn trong tam giác vuông: $\\tan = \\text{đối} / \\text{kề}$.', 'luong_giac');
  addMCQ(c11, 'Với mọi góc nhọn $\\alpha$, khẳng định nào sau đây là sai?', '$\\sin \\alpha > 0$', '$\\cos \\alpha > 0$', '$\\sin \\alpha > 1$', '$\\tan \\alpha > 0$', 'C', 'Trong tam giác vuông, cạnh đối và cạnh kề luôn nhỏ hơn cạnh huyền. Do đó $\\sin \\alpha$ và $\\cos \\alpha$ luôn nhỏ hơn 1. Khẳng định $\\sin \\alpha > 1$ là sai.', 'luong_giac');
  addMCQ(c11, 'Công thức liên hệ giữa $\\sin \\alpha$, $\\cos \\alpha$ và $\\tan \\alpha$ là:', '$\\tan \\alpha = \\dfrac{\\cos \\alpha}{\\sin \\alpha}$', '$\\tan \\alpha = \\sin \\alpha \\cdot \\cos \\alpha$', '$\\tan \\alpha = \\dfrac{\\sin \\alpha}{\\cos \\alpha}$', '$\\tan \\alpha = \\sin \\alpha + \\cos \\alpha$', 'C', 'Theo tính chất tỉ số lượng giác, ta có: $\\tan \\alpha = \\dfrac{\\sin \\alpha}{\\cos \\alpha}$.', 'luong_giac');
  addMCQ(c11, 'Hệ thức cơ bản nào sau đây luôn đúng với mọi góc nhọn $\\alpha$?', '$\\sin^2 \\alpha - \\cos^2 \\alpha = 1$', '$\\sin \\alpha + \\cos \\alpha = 1$', '$\\sin^2 \\alpha + \\cos^2 \\alpha = 1$', '$\\tan^2 \\alpha + \\cot^2 \\alpha = 1$', 'C', 'Áp dụng định lí Pythagore trong tam giác vuông, ta có thể chứng minh được hằng đẳng thức lượng giác cơ bản: $\\sin^2 \\alpha + \\cos^2 \\alpha = 1$.', 'luong_giac');
  addMCQ(c11, 'Nếu hai góc nhọn $\\alpha$ và $\\beta$ phụ nhau (tức là $\\alpha + \\beta = 90^\\circ$) thì:', '$\\sin \\alpha = \\sin \\beta$', '$\\sin \\alpha = \\cos \\beta$', '$\\tan \\alpha = \\tan \\beta$', '$\\sin \\alpha + \\cos \\beta = 1$', 'B', 'Nếu hai góc phụ nhau thì sin góc này bằng côsin góc kia, tang góc này bằng côtang góc kia. Tức là $\\sin \\alpha = \\cos \\beta$.', 'luong_giac');
  addMCQ(c11, 'Giá trị của $\\sin 30^\\circ$ là:', '$\\dfrac{1}{2}$', '$\\dfrac{\\sqrt{3}}{2}$', '$\\dfrac{\\sqrt{2}}{2}$', '$1$', 'A', 'Theo bảng giá trị lượng giác của các góc đặc biệt, $\\sin 30^\\circ = \\dfrac{1}{2}$.', 'luong_giac');
  addMCQ(c11, 'Giá trị của $\\tan 45^\\circ$ là:', '$\\dfrac{\\sqrt{3}}{3}$', '$1$', '$\\sqrt{3}$', 'Không xác định', 'B', 'Với góc $45^\\circ$, tam giác vuông trở thành tam giác vuông cân, cạnh đối bằng cạnh kề. Do đó $\\tan 45^\\circ = 1$.', 'luong_giac');
  addMCQ(c11, 'Khi góc $\\alpha$ tăng từ $0^\\circ$ đến $90^\\circ$ thì:', '$\\sin \\alpha$ giảm, $\\cos \\alpha$ tăng', '$\\sin \\alpha$ tăng, $\\cos \\alpha$ giảm', 'Cả $\\sin \\alpha$ và $\\cos \\alpha$ đều tăng', 'Cả $\\sin \\alpha$ và $\\cos \\alpha$ đều giảm', 'B', 'Khi góc nhọn $\\alpha$ tăng, cạnh đối dài ra so với cạnh huyền (sin tăng) và cạnh kề ngắn lại so với cạnh huyền (cos giảm).', 'luong_giac');

  addTF(c11, 'Tỉ số lượng giác $\\sin \\alpha$ và $\\cos \\alpha$ có thể nhận giá trị bằng 1 đối với góc nhọn $\\alpha$ trong tam giác vuông.', false, 'Sai. Trong tam giác vuông, cạnh huyền là cạnh lớn nhất. Vì cạnh đối và cạnh kề luôn NGẮN HƠN cạnh huyền nên tỉ số của chúng với cạnh huyền (sin và cos) luôn nhỏ hơn 1.', 'luong_giac');
  addTF(c11, 'Tỉ số lượng giác $\\tan \\alpha$ của góc nhọn có thể nhận giá trị lớn hơn 1.', true, 'Đúng. Nếu góc $\\alpha > 45^\\circ$ thì cạnh đối dài hơn cạnh kề, khi đó $\\tan \\alpha = \\text{đối} / \\text{kề} > 1$.', 'luong_giac');
  addTF(c11, 'Hai góc nhọn có số đo bằng nhau khi và chỉ khi $\\sin$ của chúng bằng nhau.', true, 'Đúng. Trong khoảng từ $0^\\circ$ đến $90^\\circ$, hàm số $\\sin \\alpha$ đồng biến. Mỗi giá trị của sin tương ứng với duy nhất một góc nhọn.', 'luong_giac');
  addTF(c11, 'Với mọi góc nhọn $\\alpha$, ta luôn có $\\sin \\alpha \\cdot \\cos \\alpha = 1$.', false, 'Sai. Tích $\\sin \\alpha \\cdot \\cos \\alpha$ không bằng 1. Hằng đẳng thức đúng là $\\sin^2 \\alpha + \\cos^2 \\alpha = 1$.', 'luong_giac');
  addTF(c11, 'Biết $\\sin \\alpha = 0,6$. Không cần tính góc $\\alpha$, ta có thể tính được $\\cos \\alpha = 0,8$.', true, 'Đúng. Áp dụng $\\sin^2 \\alpha + \\cos^2 \\alpha = 1$, ta có $0,6^2 + \\cos^2 \\alpha = 1 \\Rightarrow \\cos^2 \\alpha = 1 - 0,36 = 0,64$. Vì góc nhọn nên $\\cos \\alpha > 0$, suy ra $\\cos \\alpha = 0,8$.', 'luong_giac');

  // Bài 13. Mở đầu về đường tròn
  const c13 = '961fcfb8-7f7d-4955-a150-3a28793a207e';

  addMCQ(c13, 'Đường tròn tâm $O$ bán kính $R$ (với $R > 0$) là hình gồm các điểm:', 'Cách điểm $O$ một khoảng nhỏ hơn $R$.', 'Cách điểm $O$ một khoảng bằng $R$.', 'Cách điểm $O$ một khoảng lớn hơn $R$.', 'Cách điểm $O$ một khoảng nhỏ hơn hoặc bằng $R$.', 'B', 'Theo định nghĩa, đường tròn tâm $O$ bán kính $R$ là tập hợp tất cả các điểm cách tâm $O$ một khoảng ĐÚNG BẰNG $R$.', 'hinh_hoc');
  addMCQ(c13, 'Tập hợp các điểm có khoảng cách đến tâm $O$ nhỏ hơn hoặc bằng bán kính $R$ được gọi là:', 'Đường tròn tâm $O$ bán kính $R$.', 'Hình tròn tâm $O$ bán kính $R$.', 'Vòng tròn tâm $O$ bán kính $R$.', 'Nửa đường tròn tâm $O$ bán kính $R$.', 'B', 'Hình tròn bao gồm tất cả các điểm nằm TRÊN đường tròn và NẰM BÊN TRONG đường tròn đó (khoảng cách $\\leq R$).', 'hinh_hoc');
  addMCQ(c13, 'Một đường tròn được xác định duy nhất khi biết:', 'Tâm và bán kính.', 'Một điểm nằm trên đường tròn.', 'Hai điểm nằm trên đường tròn.', 'Độ dài của một dây cung.', 'A', 'Một đường tròn hoàn toàn được xác định (duy nhất) khi biết vị trí của Tâm và độ dài Bán kính.', 'hinh_hoc');
  addMCQ(c13, 'Qua ba điểm không thẳng hàng, ta vẽ được bao nhiêu đường tròn?', 'Không vẽ được đường tròn nào.', 'Vẽ được đúng 1 đường tròn.', 'Vẽ được đúng 2 đường tròn.', 'Vẽ được vô số đường tròn.', 'B', 'Định lí sự xác định đường tròn: Qua ba điểm không thẳng hàng, ta vẽ được một và chỉ một đường tròn. Tâm của đường tròn này là giao điểm 3 đường trung trực của tam giác tạo bởi 3 điểm đó.', 'hinh_hoc');
  addMCQ(c13, 'Tâm đường tròn ngoại tiếp một tam giác vuông nằm ở vị trí nào?', 'Bên trong tam giác.', 'Bên ngoài tam giác.', 'Trung điểm của cạnh huyền.', 'Trên cạnh góc vuông.', 'C', 'Đối với tam giác vuông, tâm đường tròn ngoại tiếp luôn luôn nằm tại TRUNG ĐIỂM của cạnh huyền.', 'hinh_hoc');
  addMCQ(c13, 'Đường tròn có bao nhiêu trục đối xứng?', '1', '2', '4', 'Vô số', 'D', 'Bất kỳ đường thẳng nào đi qua tâm của đường tròn đều là một trục đối xứng của đường tròn đó. Do đó, đường tròn có vô số trục đối xứng.', 'hinh_hoc');
  addMCQ(c13, 'Đường tròn có bao nhiêu tâm đối xứng?', '0', '1', '2', 'Vô số', 'B', 'Đường tròn là hình có duy nhất 1 tâm đối xứng, đó chính là TÂM của đường tròn.', 'hinh_hoc');
  addMCQ(c13, 'Cho đường tròn $(O; R)$ và một điểm $M$. Biết $OM > R$, vị trí của điểm $M$ so với đường tròn là:', 'Nằm trên đường tròn.', 'Nằm bên trong đường tròn.', 'Nằm bên ngoài đường tròn.', 'Trùng với tâm $O$.', 'C', 'Nếu khoảng cách từ tâm đến điểm lớn hơn bán kính ($OM > R$) thì điểm đó nằm bên ngoài đường tròn.', 'hinh_hoc');
  addMCQ(c13, 'Đường kính của một đường tròn là:', 'Đoạn thẳng nối tâm và một điểm trên đường tròn.', 'Dây cung không đi qua tâm.', 'Dây cung đi qua tâm.', 'Đoạn thẳng lớn nhất bên ngoài đường tròn.', 'C', 'Dây cung là đoạn thẳng nối hai điểm trên đường tròn. Dây cung đặc biệt ĐI QUA TÂM được gọi là đường kính.', 'hinh_hoc');
  addMCQ(c13, 'So sánh độ dài đường kính và dây cung trong một đường tròn, ta có:', 'Đường kính luôn ngắn hơn dây cung.', 'Đường kính là dây cung lớn nhất.', 'Đường kính luôn bằng hai lần mọi dây cung.', 'Đường kính và dây cung không có mối liên hệ.', 'B', 'Trong các dây của một đường tròn, dây lớn nhất là đường kính.', 'hinh_hoc');

  addTF(c13, 'Hai đường tròn phân biệt có thể cắt nhau tại 3 điểm.', false, 'Sai. Hai đường tròn phân biệt cắt nhau tối đa tại 2 điểm. Nếu chúng có từ 3 điểm chung trở lên thì chúng phải trùng nhau.', 'hinh_hoc');
  addTF(c13, 'Tâm đường tròn ngoại tiếp tam giác tù luôn nằm bên ngoài tam giác.', true, 'Đúng. Đối với tam giác nhọn, tâm nằm bên trong; tam giác vuông, tâm là trung điểm cạnh huyền; tam giác tù, tâm nằm bên ngoài tam giác.', 'hinh_hoc');
  addTF(c13, 'Nếu $A, B$ là hai điểm thuộc đường tròn $(O)$ thì đoạn thẳng $AB$ đi qua tâm $O$.', false, 'Sai. Đoạn thẳng $AB$ chỉ là một dây cung. Nó chỉ đi qua tâm $O$ trong trường hợp đặc biệt khi $AB$ là đường kính.', 'hinh_hoc');
  addTF(c13, 'Đường tròn là một đa giác có vô số cạnh.', false, 'Sai. Về mặt hình học sơ cấp, đường tròn là tập hợp các điểm cách đều một điểm cho trước, nó là đường cong khép kín, không phải là đa giác. Đa giác cấu tạo từ các đoạn thẳng.', 'hinh_hoc');
  addTF(c13, 'Bốn đỉnh của một hình chữ nhật luôn cùng nằm trên một đường tròn.', true, 'Đúng. Hình chữ nhật có hai đường chéo bằng nhau và cắt nhau tại trung điểm mỗi đường. Giao điểm này cách đều 4 đỉnh, do đó nó là tâm đường tròn đi qua 4 đỉnh của hình chữ nhật.', 'hinh_hoc');

  console.log(`Bắt đầu nạp ${allQS.length} câu hỏi lý thuyết G9 BATCH 2...`);

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
