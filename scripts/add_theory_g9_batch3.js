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
      code: `G9-BATCH3-${crypto.randomBytes(2).toString('hex').toUpperCase()}`,
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
      code: `G9-BATCH3TF-${crypto.randomBytes(2).toString('hex').toUpperCase()}`,
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

  // Bài 18. Hàm số y = ax^2 (a ≠ 0)
  const c18 = 'cdd6e10b-1c50-4f44-a1ed-03c77109a62c';

  addMCQ(c18, 'Đồ thị của hàm số $y = ax^2 \\ (a \\neq 0)$ là một đường cong có tên gọi là gì?', 'Đường thẳng', 'Đường tròn', 'Parabol', 'Đường Hypebol', 'C', 'Đồ thị hàm số bậc hai $y = ax^2$ luôn luôn là một đường cong Parabol đi qua gốc tọa độ $O$.', 'ham_so');
  addMCQ(c18, 'Với hàm số $y = ax^2 \\ (a \\neq 0)$, nếu $a > 0$ thì hàm số đồng biến khi nào?', 'Khi $x > 0$', 'Khi $x < 0$', 'Khi $x = 0$', 'Với mọi giá trị của $x$', 'A', 'Nếu $a > 0$, hàm số đồng biến khi $x > 0$ và nghịch biến khi $x < 0$.', 'ham_so');
  addMCQ(c18, 'Với hàm số $y = ax^2 \\ (a \\neq 0)$, nếu $a < 0$ thì hàm số đạt giá trị lớn nhất bằng bao nhiêu?', '$0$', '$a$', 'Không có giá trị lớn nhất', 'Vô cực', 'A', 'Nếu $a < 0$, đồ thị nằm phía dưới trục hoành, nhận gốc tọa độ $O(0; 0)$ làm điểm cao nhất. Nên giá trị lớn nhất của hàm số là $0$ khi $x = 0$.', 'ham_so');
  addMCQ(c18, 'Đồ thị hàm số $y = ax^2 \\ (a \\neq 0)$ nhận trục nào làm trục đối xứng?', 'Trục hoành $Ox$', 'Trục tung $Oy$', 'Đường thẳng $y = x$', 'Đường thẳng $y = -x$', 'B', 'Parabol $y = ax^2$ luôn nhận trục tung (trục $Oy$) làm trục đối xứng.', 'ham_so');
  addMCQ(c18, 'Điểm nào sau đây luôn thuộc đồ thị hàm số $y = ax^2 \\ (a \\neq 0)$?', '$(1; 1)$', '$(a; 0)$', '$(0; 0)$', '$(0; a)$', 'C', 'Thay $x = 0$ vào hàm số, ta luôn được $y = a \\cdot 0^2 = 0$. Vậy đồ thị luôn đi qua gốc tọa độ $O(0; 0)$.', 'ham_so');
  addMCQ(c18, 'Cho hàm số $y = -3x^2$. Khẳng định nào sau đây là đúng?', 'Hàm số đồng biến khi $x > 0$.', 'Hàm số nghịch biến khi $x > 0$.', 'Đồ thị hàm số nằm hoàn toàn phía trên trục hoành.', 'Giá trị nhỏ nhất của hàm số là $0$.', 'B', 'Vì hệ số $a = -3 < 0$ nên đồ thị nằm phía dưới trục hoành, nghịch biến khi $x > 0$ và đồng biến khi $x < 0$.', 'ham_so');
  addMCQ(c18, 'Điểm $A(-2; 4)$ thuộc đồ thị hàm số $y = ax^2$. Giá trị của $a$ là:', '$1$', '$-1$', '$2$', '$-2$', 'A', 'Thay $x = -2, y = 4$ vào phương trình $y = ax^2$, ta có: $4 = a \\cdot (-2)^2 \\Rightarrow 4 = 4a \\Rightarrow a = 1$.', 'ham_so');
  addMCQ(c18, 'Số giao điểm nhiều nhất có thể có của Parabol $y = ax^2$ và một đường thẳng $y = mx + n$ là:', '$0$', '$1$', '$2$', '$3$', 'C', 'Phương trình hoành độ giao điểm là một phương trình bậc hai $ax^2 - mx - n = 0$. Phương trình bậc hai có tối đa 2 nghiệm nên đường thẳng cắt Parabol tại tối đa 2 điểm.', 'ham_so');
  addMCQ(c18, 'Nếu $a > 0$, Parabol $y = ax^2$ quay bề lõm về phía nào?', 'Lên trên', 'Xuống dưới', 'Sang trái', 'Sang phải', 'A', 'Nếu $a > 0$, Parabol có điểm thấp nhất là gốc tọa độ và mở rộng (quay bề lõm) lên phía trên.', 'ham_so');
  addMCQ(c18, 'Cho hai hàm số $y = 2x^2$ và $y = -2x^2$. Đồ thị của chúng có tính chất gì đặc biệt?', 'Trùng nhau.', 'Đối xứng nhau qua trục tung $Oy$.', 'Đối xứng nhau qua trục hoành $Ox$.', 'Cắt nhau tại 2 điểm phân biệt.', 'C', 'Với cùng một hoành độ $x$, tung độ của hai hàm số này đối nhau. Do đó đồ thị của chúng đối xứng nhau qua trục hoành $Ox$.', 'ham_so');

  addTF(c18, 'Đồ thị hàm số $y = x^2$ đi qua điểm $M(3; -9)$.', false, 'Sai. Thay $x = 3$ vào $y = x^2$ ta được $y = 3^2 = 9$. Tung độ phải là 9, không phải -9.', 'ham_so');
  addTF(c18, 'Với mọi giá trị của $a \\neq 0$, đồ thị hàm số $y = ax^2$ luôn nhận $Oy$ làm trục đối xứng.', true, 'Đúng. Đây là tính chất cơ bản của đồ thị hàm số $y = ax^2$.', 'ham_so');
  addTF(c18, 'Nếu $a < 0$, giá trị nhỏ nhất của hàm số $y = ax^2$ là $0$.', false, 'Sai. Nếu $a < 0$, đồ thị quay bề lõm xuống dưới, điểm gốc $O(0; 0)$ là điểm CAO NHẤT, nên $0$ là giá trị LỚN NHẤT chứ không phải nhỏ nhất. Hàm số không có giá trị nhỏ nhất.', 'ham_so');
  addTF(c18, 'Hàm số $y = -x^2$ đồng biến khi $x < 0$.', true, 'Đúng. Vì hệ số $a = -1 < 0$, nên hàm số đồng biến khi $x < 0$ (phía bên trái trục tung, đồ thị đi lên).', 'ham_so');
  addTF(c18, 'Đường thẳng $y = -2$ không có điểm chung với Parabol $y = x^2$.', true, 'Đúng. Phương trình hoành độ giao điểm $x^2 = -2$ vô nghiệm vì $x^2 \\geq 0$, do đó chúng không cắt nhau.', 'ham_so');


  // Chuyên đề 2. Phương trình bậc hai và hệ thức Vi-ét
  const cViet = '36869657-c24e-4024-97b4-465e95d8f3e5';

  addMCQ(cViet, 'Công thức tính biệt thức $\\Delta$ của phương trình bậc hai $ax^2 + bx + c = 0 \\ (a \\neq 0)$ là:', '$\\Delta = b^2 + 4ac$', '$\\Delta = b^2 - 4ac$', '$\\Delta = a^2 - 4bc$', '$\\Delta = -b^2 - 4ac$', 'B', 'Theo định nghĩa, biệt thức Delta kí hiệu là $\\Delta = b^2 - 4ac$.', 'pt_bpt');
  addMCQ(cViet, 'Điều kiện để phương trình bậc hai $ax^2 + bx + c = 0$ có hai nghiệm phân biệt là:', '$\\Delta < 0$', '$\\Delta = 0$', '$\\Delta \\geq 0$', '$\\Delta > 0$', 'D', 'Phương trình bậc hai có hai nghiệm phân biệt khi và chỉ khi biệt thức $\\Delta > 0$.', 'pt_bpt');
  addMCQ(cViet, 'Nếu $\\Delta = 0$ thì phương trình bậc hai có nghiệm kép bằng bao nhiêu?', '$x_1 = x_2 = \\dfrac{b}{2a}$', '$x_1 = x_2 = -\\dfrac{b}{a}$', '$x_1 = x_2 = -\\dfrac{b}{2a}$', '$x_1 = x_2 = \\dfrac{c}{a}$', 'C', 'Khi $\\Delta = 0$, phương trình có nghiệm kép là $x_1 = x_2 = -\\dfrac{b}{2a}$.', 'pt_bpt');
  addMCQ(cViet, 'Theo định lí Vi-ét, nếu phương trình $ax^2 + bx + c = 0$ có hai nghiệm $x_1, x_2$ thì tổng hai nghiệm $S = x_1 + x_2$ bằng:', '$\\dfrac{c}{a}$', '$-\\dfrac{b}{a}$', '$\\dfrac{b}{a}$', '$-\\dfrac{c}{a}$', 'B', 'Hệ thức Vi-ét chỉ ra rằng tổng hai nghiệm của phương trình bậc hai là $S = x_1 + x_2 = -\\dfrac{b}{a}$.', 'pt_bpt');
  addMCQ(cViet, 'Theo định lí Vi-ét, tích hai nghiệm $P = x_1x_2$ của phương trình $ax^2 + bx + c = 0$ bằng:', '$\\dfrac{c}{a}$', '$-\\dfrac{b}{a}$', '$\\dfrac{b}{a}$', '$-\\dfrac{c}{a}$', 'A', 'Hệ thức Vi-ét chỉ ra rằng tích hai nghiệm của phương trình bậc hai là $P = x_1x_2 = \\dfrac{c}{a}$.', 'pt_bpt');
  addMCQ(cViet, 'Nếu hai số $u, v$ có tổng $u + v = S$ và tích $u \\cdot v = P$ thì $u, v$ là hai nghiệm của phương trình nào?', '$X^2 + SX + P = 0$', '$X^2 - SX + P = 0$', '$X^2 - PX + S = 0$', '$X^2 + PX + S = 0$', 'B', 'Theo định lí Vi-ét đảo, hai số có tổng $S$ và tích $P$ sẽ là nghiệm của phương trình $X^2 - SX + P = 0$ (điều kiện $S^2 \\geq 4P$).', 'pt_bpt');
  addMCQ(cViet, 'Nhẩm nghiệm của phương trình: Nếu $a + b + c = 0$ thì phương trình $ax^2 + bx + c = 0$ có một nghiệm là bao nhiêu?', '$1$', '$-1$', '$0$', '$\\dfrac{c}{a}$', 'A', 'Khi tổng các hệ số $a + b + c = 0$, phương trình chắc chắn có một nghiệm là $x_1 = 1$, nghiệm còn lại là $x_2 = \\dfrac{c}{a}$.', 'pt_bpt');
  addMCQ(cViet, 'Nhẩm nghiệm của phương trình: Nếu $a - b + c = 0$ thì phương trình $ax^2 + bx + c = 0$ có một nghiệm là bao nhiêu?', '$1$', '$-1$', '$0$', '$-\\dfrac{c}{a}$', 'B', 'Khi $a - b + c = 0$, phương trình chắc chắn có một nghiệm là $x_1 = -1$, nghiệm còn lại là $x_2 = -\\dfrac{c}{a}$.', 'pt_bpt');
  addMCQ(cViet, 'Biểu thức $x_1^2 + x_2^2$ được biến đổi theo $S$ và $P$ (với $S = x_1+x_2, P=x_1x_2$) là:', '$S^2 + 2P$', '$S^2 - 2P$', '$(S - P)^2$', '$S^2 - P$', 'B', 'Ta có hằng đẳng thức: $x_1^2 + x_2^2 = (x_1 + x_2)^2 - 2x_1x_2 = S^2 - 2P$.', 'pt_bpt');
  addMCQ(cViet, 'Phương trình $ax^2 + bx + c = 0$ có hai nghiệm trái dấu khi và chỉ khi:', '$a \\cdot c > 0$', '$a \\cdot c = 0$', '$a \\cdot c < 0$', '$\\Delta > 0$', 'C', 'Phương trình có hai nghiệm trái dấu khi tích hai nghiệm $P = \\dfrac{c}{a} < 0$, điều này tương đương với $a$ và $c$ trái dấu, tức là $a \\cdot c < 0$. (Khi $ac < 0$ thì $\\Delta = b^2 - 4ac > 0$ luôn được thỏa mãn).', 'pt_bpt');

  addTF(cViet, 'Phương trình bậc hai có tối đa 2 nghiệm phân biệt.', true, 'Đúng. Phương trình bậc hai $ax^2 + bx + c = 0$ chỉ có thể vô nghiệm, có nghiệm kép (1 nghiệm) hoặc có 2 nghiệm phân biệt.', 'pt_bpt');
  addTF(cViet, 'Hệ thức Vi-ét có thể áp dụng cho mọi phương trình bậc hai, kể cả phương trình vô nghiệm.', false, 'Sai. Hệ thức Vi-ét chỉ có thể áp dụng khi phương trình bậc hai CÓ NGHIỆM (tức là $\\Delta \\geq 0$). Nếu phương trình vô nghiệm thì không có $x_1, x_2$ để tính tổng và tích.', 'pt_bpt');
  addTF(cViet, 'Nếu $\\Delta\' < 0$ thì phương trình bậc hai vô nghiệm.', true, 'Đúng. Biệt thức thu gọn $\\Delta\'$ có cùng tính chất về dấu với $\\Delta$. Nếu $\\Delta\' < 0$ thì phương trình vô nghiệm.', 'pt_bpt');
  addTF(cViet, 'Tổng hai nghiệm của phương trình $2x^2 - 4x + 1 = 0$ là $2$.', true, 'Đúng. Theo Vi-ét, tổng hai nghiệm $S = -\\dfrac{b}{a} = -\\dfrac{-4}{2} = \\dfrac{4}{2} = 2$.', 'pt_bpt');
  addTF(cViet, 'Nếu $ac < 0$ thì phương trình bậc hai luôn luôn có hai nghiệm phân biệt trái dấu.', true, 'Đúng. Khi $a$ và $c$ trái dấu ($ac < 0$), ta có $\\Delta = b^2 - 4ac > 0$ vì $-4ac > 0$. Do đó phương trình luôn có 2 nghiệm phân biệt. Lại có tích $P = \\dfrac{c}{a} < 0$ nên hai nghiệm này trái dấu.', 'pt_bpt');

  console.log(`Bắt đầu nạp ${allQS.length} câu hỏi lý thuyết G9 BATCH 3...`);

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
