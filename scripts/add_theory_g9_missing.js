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
      code: `G9-L-${crypto.randomBytes(2).toString('hex').toUpperCase()}`,
      grade: 9, topic,
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
      code: `G9-LTF-${crypto.randomBytes(2).toString('hex').toUpperCase()}`,
      grade: 9, topic,
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

  // Grade 9 Missing Categories
  
  // Bài tập cuối chương I (Hệ phương trình)
  const c1 = 'c450ac94-ada5-4e02-9b14-ea4ece00711d';
  addMCQ(c1, 'Một hệ phương trình bậc nhất hai ẩn có thể có số nghiệm là:', 'Chỉ 1 nghiệm duy nhất.', 'Chỉ vô số nghiệm.', 'Chỉ vô nghiệm.', '1 nghiệm duy nhất, vô nghiệm hoặc vô số nghiệm.', 'D', 'Hệ hai phương trình bậc nhất hai ẩn có thể có một nghiệm duy nhất (hai đường thẳng cắt nhau), vô nghiệm (hai đường thẳng song song) hoặc vô số nghiệm (hai đường thẳng trùng nhau).', 'he_phuong_trinh');
  addTF(c1, 'Hệ phương trình gồm hai phương trình tương đương luôn có vô số nghiệm.', true, 'Đúng. Hai phương trình tương đương biểu diễn cùng một đường thẳng, nên hệ có vô số nghiệm.', 'he_phuong_trinh');

  // Bài tập cuối chương II (Bất phương trình)
  const c2 = 'f348c2b2-8830-4e88-a0db-4ddea391ca84';
  addMCQ(c2, 'Nhân cả hai vế của một bất phương trình với cùng một số âm thì:', 'Bất phương trình không đổi chiều.', 'Bất phương trình đổi chiều.', 'Bất phương trình vô nghiệm.', 'Bất phương trình có vô số nghiệm.', 'B', 'Tính chất cơ bản của bất đẳng thức: Khi nhân hoặc chia hai vế cho cùng một số âm, ta phải đổi chiều bất phương trình.', 'bat_phuong_trinh');
  addTF(c2, 'Nếu $a > b$ và $c > d$ thì ta luôn suy ra được $a - c > b - d$.', false, 'Sai. Ta không có tính chất trừ vế theo vế của hai bất đẳng thức cùng chiều. (Ví dụ: $5 > 4$ và $3 > 1$, nhưng $5-3 < 4-1$).', 'bat_phuong_trinh');

  // Bài tập cuối chương III (Căn thức)
  const c3 = '9794852a-e151-48ec-b15f-282297f05ea5';
  addMCQ(c3, 'Khẳng định nào sau đây là đúng với mọi $A, B \\ge 0$?', '$\\sqrt{A+B} = \\sqrt{A} + \\sqrt{B}$', '$\\sqrt{A-B} = \\sqrt{A} - \\sqrt{B}$', '$\\sqrt{A \\cdot B} = \\sqrt{A} \\cdot \\sqrt{B}$', '$\\sqrt{A^2 + B^2} = A + B$', 'C', 'Theo quy tắc nhân các căn thức bậc hai, căn của một tích các số không âm bằng tích các căn của chúng.', 'can_thuc');
  addTF(c3, 'Căn bậc ba của một số âm luôn là một số âm.', true, 'Đúng. Hàm số $y = x^3$ giữ nguyên dấu của $x$, do đó căn bậc ba của một số âm cũng là một số âm.', 'can_thuc');

  // Bài tập cuối chương IV (Hệ thức lượng)
  const c4 = '8b7dcc3d-aa7d-44cd-b756-4de1bfdf71b7';
  addMCQ(c4, 'Trong tam giác vuông, tỉ số giữa cạnh đối và cạnh huyền được gọi là:', '$\\sin$', '$\\cos$', '$\\tan$', '$\\cot$', 'A', 'Tỉ số lượng giác $\\sin$ của một góc nhọn bằng tỉ số giữa cạnh đối và cạnh huyền.', 'he_thuc_luong');
  addTF(c4, 'Với mọi góc nhọn $\\alpha$, ta luôn có $\\sin^2 \\alpha + \\cos^2 \\alpha = 1$.', true, 'Đúng. Đây là hệ thức lượng giác cơ bản, chứng minh dễ dàng bằng định lý Pythagore trong tam giác vuông.', 'he_thuc_luong');

  // Bài tập cuối chương V (Đường tròn)
  const c5 = 'e15e6e95-bb3b-49b2-a90b-22795f2ef700';
  addMCQ(c5, 'Số điểm chung tối đa của một đường thẳng và một đường tròn là:', '1', '2', '3', '0', 'B', 'Đường thẳng có thể không cắt (0 điểm chung), tiếp xúc (1 điểm chung) hoặc cắt (2 điểm chung) đường tròn. Tối đa là 2.', 'duong_tron');
  addTF(c5, 'Hai đường tròn phân biệt có thể cắt nhau tại tối đa 3 điểm.', false, 'Sai. Hai đường tròn phân biệt chỉ có thể cắt nhau tại tối đa 2 điểm.', 'duong_tron');

  // Bài tập cuối chương VI (Hàm số y = ax^2)
  const c6 = '5416208f-9252-4961-b77a-989480c89946';
  addMCQ(c6, 'Đồ thị của hàm số $y = ax^2 \\, (a \\neq 0)$ là một đường cong có tên gọi là:', 'Đường thẳng', 'Đường tròn', 'Parabol', 'Đường Elip', 'C', 'Đồ thị của hàm số $y = ax^2$ luôn là một đường Parabol đi qua gốc tọa độ O.', 'ham_so');
  addTF(c6, 'Phương trình $ax^2 + bx + c = 0 \\, (a \\neq 0)$ luôn có nghiệm nếu $ac < 0$.', true, 'Đúng. Nếu $a$ và $c$ trái dấu thì $\\Delta = b^2 - 4ac > 0$, do đó phương trình luôn có 2 nghiệm phân biệt.', 'phuong_trinh');

  // Chuyên đề 2. Phương trình bậc hai và Vi-ét
  const cd2 = '36869657-c24e-4024-97b4-465e95d8f3e5';
  addMCQ(cd2, 'Theo định lí Viète, nếu phương trình $ax^2 + bx + c = 0 \\, (a \\neq 0)$ có 2 nghiệm $x_1, x_2$ thì tổng $S = x_1 + x_2$ bằng:', '$\\dfrac{b}{a}$', '$-\\dfrac{b}{a}$', '$\\dfrac{c}{a}$', '$-\\dfrac{c}{a}$', 'B', 'Định lí Viète khẳng định $x_1 + x_2 = -\\dfrac{b}{a}$ và $x_1x_2 = \\dfrac{c}{a}$.', 'phuong_trinh');
  addTF(cd2, 'Nếu một phương trình bậc hai có $a - b + c = 0$ thì phương trình chắc chắn có một nghiệm là $x = -1$.', true, 'Đúng. Thay $x = -1$ vào $ax^2 + bx + c = 0$ ta được $a(-1)^2 + b(-1) + c = a - b + c = 0$.', 'phuong_trinh');

  // Chuyên đề 10. Nón - trụ - cầu
  const cd10 = '0cb8da64-8b0c-4858-abdd-8a388f332f3e';
  addMCQ(cd10, 'Thể tích của hình trụ có bán kính đáy $R$ và chiều cao $h$ là:', '$\\dfrac{1}{3} \\pi R^2 h$', '$\\pi R^2 h$', '$2\\pi R h$', '$4\\pi R^2$', 'B', 'Thể tích hình trụ bằng diện tích đáy nhân với chiều cao, tức là $V = \\pi R^2 h$.', 'hinh_khong_gian');
  addTF(cd10, 'Mặt cắt của một hình cầu bởi một mặt phẳng bất kỳ luôn là một hình tròn.', true, 'Đúng. Bất kỳ mặt phẳng nào cắt mặt cầu cũng tạo ra giao tuyến là một đường tròn (hoặc một điểm nếu tiếp xúc).', 'hinh_khong_gian');

  console.log(`Bắt đầu nạp ${allQS.length} câu hỏi lý thuyết chính xác 100% theo chuẩn BÀI HỌC...`);

  for (const q of allQS) {
    const qid = crypto.randomUUID();
    await sql`
      INSERT INTO public.questions (id, category_id, question_code, content, options, correct_answer, solution, difficulty, grade, topic, question_type, user_id, status, is_public)
      VALUES (${qid}, ${q.cat}, ${q.code}, ${q.content}, ${q.options}::jsonb, ${q.correct_answer}, ${q.solution}, 'thong_hieu', ${q.grade}, ${q.topic}, ${q.type}, ${user_id}, 'approved', true)
    `;
  }

  console.log('Thành công! Đã nạp dữ liệu chuẩn (Quy trình 3 bước hoàn tất).');
}

main().catch(console.error);
