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
      code: `G9-BATCH5-${crypto.randomBytes(2).toString('hex').toUpperCase()}`,
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
      code: `G9-BATCH5TF-${crypto.randomBytes(2).toString('hex').toUpperCase()}`,
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

  // Bài 4. Phương trình quy về phương trình bậc nhất một ẩn
  const c4 = '35b77b38-8330-4862-9583-9fc30aff47d5';

  addMCQ(c4, 'Phương trình tích có dạng tổng quát là:', '$A(x) \\cdot B(x) = 0$', '$A(x) + B(x) = 0$', '$A(x) / B(x) = 0$', '$A(x) - B(x) = 0$', 'A', 'Phương trình tích là phương trình có dạng $A(x) \\cdot B(x) = 0$, trong đó $A(x)$ và $B(x)$ là các biểu thức đại số.', 'pt_bpt');
  addMCQ(c4, 'Nghiệm của phương trình $A(x) \\cdot B(x) = 0$ là:', 'Chỉ là nghiệm của $A(x) = 0$.', 'Chỉ là nghiệm của $B(x) = 0$.', 'Tất cả các nghiệm của $A(x) = 0$ và $B(x) = 0$.', 'Nghiệm chung của $A(x) = 0$ và $B(x) = 0$.', 'C', 'Một tích bằng 0 khi ít nhất một trong các thừa số bằng 0. Vậy nghiệm của phương trình tích là hợp của tất cả các nghiệm của từng thừa số.', 'pt_bpt');
  addMCQ(c4, 'Phương trình $(x - 2)(x + 3) = 0$ có các nghiệm là:', '$x = 2$', '$x = -3$', '$x = 2$ hoặc $x = -3$', '$x = -2$ hoặc $x = 3$', 'C', '$(x - 2)(x + 3) = 0 \\Leftrightarrow x - 2 = 0$ hoặc $x + 3 = 0 \\Leftrightarrow x = 2$ hoặc $x = -3$.', 'pt_bpt');
  addMCQ(c4, 'Để giải phương trình chứa ẩn ở mẫu, bước ĐẦU TIÊN ta cần làm là gì?', 'Quy đồng mẫu hai vế.', 'Khử mẫu hai vế.', 'Tìm điều kiện xác định (ĐKXĐ) của phương trình.', 'Chuyển vế và đổi dấu.', 'C', 'Trước khi thực hiện bất kỳ phép biến đổi nào đối với phương trình chứa ẩn ở mẫu, ta bắt buộc phải tìm Điều kiện xác định để mẫu thức khác 0.', 'pt_bpt');
  addMCQ(c4, 'Điều kiện xác định của phương trình $\\dfrac{2x}{x - 1} = \\dfrac{3}{x + 2}$ là:', '$x \\neq 1$', '$x \\neq -2$', '$x \\neq 1$ và $x \\neq -2$', '$x \\neq -1$ và $x \\neq 2$', 'C', 'Mẫu thức phải khác 0, tức là $x - 1 \\neq 0 \\Rightarrow x \\neq 1$ và $x + 2 \\neq 0 \\Rightarrow x \\neq -2$.', 'pt_bpt');
  addMCQ(c4, 'Sau khi giải xong một phương trình chứa ẩn ở mẫu, ta cần phải làm gì trước khi kết luận nghiệm?', 'Tính tổng các nghiệm.', 'Kiểm tra xem các giá trị tìm được có thỏa mãn ĐKXĐ hay không.', 'Quy đồng lại một lần nữa.', 'Làm tròn nghiệm.', 'B', 'Sau khi tìm được $x$, bắt buộc phải đối chiếu với Điều kiện xác định (ĐKXĐ) ban đầu. Nếu thỏa mãn mới được nhận là nghiệm.', 'pt_bpt');
  addMCQ(c4, 'Phương trình $\\dfrac{x^2 - 1}{x - 1} = 0$ có tập nghiệm là:', '$S = \\{1; -1\\}$', '$S = \\{1\\}$', '$S = \\{-1\\}$', '$S = \\emptyset$', 'C', 'ĐKXĐ: $x \\neq 1$. Khử mẫu: $x^2 - 1 = 0 \\Leftrightarrow x = 1$ (loại vì vi phạm ĐKXĐ) hoặc $x = -1$ (nhận). Vậy $S = \\{-1\\}$.', 'pt_bpt');
  addMCQ(c4, 'Phương trình $x(x - 2) = x$ có thể được quy về phương trình bậc nhất hoặc phương trình tích bằng cách nào ĐÚNG NHẤT?', 'Chia cả hai vế cho $x$.', 'Chuyển vế: $x(x - 2) - x = 0$ rồi đặt nhân tử chung.', 'Nhân bung: $x^2 - 2x = x$ rồi chia hai vế cho $x$.', 'Bỏ $x$ ở cả hai vế.', 'B', 'Không được chia hai vế cho ẩn (sẽ làm mất nghiệm). Cách đúng nhất là chuyển vế và đặt nhân tử chung: $x(x - 2 - 1) = 0 \\Leftrightarrow x(x - 3) = 0$.', 'pt_bpt');
  addMCQ(c4, 'Số nghiệm của phương trình $\\dfrac{2}{x} = 0$ là:', '$0$ (Vô nghiệm)', '$1$', '$2$', 'Vô số nghiệm', 'A', 'Một phân thức bằng 0 khi tử số bằng 0 và mẫu khác 0. Ở đây tử số là 2 (khác 0) nên phương trình không thể xảy ra (vô nghiệm).', 'pt_bpt');
  addMCQ(c4, 'Phương trình $|x - 2| = 3$ quy về hai phương trình nào?', '$x - 2 = 3$ và $x - 2 = -3$', '$x - 2 = 3$ và $-x - 2 = 3$', '$x - 2 = 3$ và $x + 2 = -3$', '$x = 3$ và $x = -3$', 'A', 'Phương trình chứa dấu giá trị tuyệt đối $|A| = B$ (với $B \\geq 0$) tương đương với $A = B$ hoặc $A = -B$. Vậy $x - 2 = 3$ hoặc $x - 2 = -3$.', 'pt_bpt');

  addTF(c4, 'Khi giải phương trình, nếu chia cả hai vế cho một biểu thức chứa ẩn thì có thể làm mất nghiệm của phương trình.', true, 'Đúng. Nếu biểu thức đó có thể bằng 0, việc chia cho nó sẽ bỏ sót trường hợp biểu thức đó bằng 0, dẫn đến mất nghiệm.', 'pt_bpt');
  addTF(c4, 'Tất cả các giá trị của $x$ làm cho tử số bằng 0 đều là nghiệm của phương trình chứa ẩn ở mẫu.', false, 'Sai. Chỉ những giá trị làm cho tử số bằng 0 VÀ thỏa mãn điều kiện xác định (mẫu khác 0) mới được công nhận là nghiệm.', 'pt_bpt');
  addTF(c4, 'Phương trình $x^2 + 1 = 0$ có thể phân tích thành phương trình tích trong tập số thực.', false, 'Sai. Biểu thức $x^2 + 1$ luôn lớn hơn 0 với mọi số thực $x$, nên nó vô nghiệm và không thể phân tích thành nhân tử (bậc 1) trong tập số thực.', 'pt_bpt');
  addTF(c4, 'Nghiệm của phương trình $\\dfrac{x}{x-2} = \\dfrac{2}{x-2}$ là $x = 2$.', false, 'Sai. ĐKXĐ là $x \\neq 2$. Khử mẫu ta được $x = 2$. Nhưng giá trị này vi phạm ĐKXĐ nên bị loại. Phương trình vô nghiệm.', 'pt_bpt');
  addTF(c4, 'Phương trình $x^3 - x = 0$ có đúng 3 nghiệm phân biệt.', true, 'Đúng. Đặt nhân tử chung: $x(x^2 - 1) = 0 \\Leftrightarrow x(x - 1)(x + 1) = 0$. Phương trình có 3 nghiệm là $0, 1, -1$.', 'pt_bpt');


  // Bài 5. Bất đẳng thức và tính chất
  const c5 = '5f573415-dec3-40a8-a24a-7268c223b7f1';

  addMCQ(c5, 'Hệ thức có dạng $a < b$ (hoặc $a > b, a \\leq b, a \\geq b$) được gọi là:', 'Đẳng thức', 'Phương trình', 'Bất đẳng thức', 'Bất phương trình', 'C', 'Hệ thức so sánh hai biểu thức (hai số) bằng các dấu $<, >, \\leq, \\geq$ được gọi là bất đẳng thức.', 'pt_bpt');
  addMCQ(c5, 'Tính chất liên hệ giữa thứ tự và phép cộng phát biểu rằng: Nếu $a < b$ thì với mọi số $c$ ta có:', '$a + c > b + c$', '$a + c < b + c$', '$a + c = b + c$', '$a - c > b - c$', 'B', 'Khi cộng cùng một số vào hai vế của một bất đẳng thức, ta được một bất đẳng thức mới CÙNG CHIỀU với bất đẳng thức đã cho: $a + c < b + c$.', 'pt_bpt');
  addMCQ(c5, 'Tính chất liên hệ giữa thứ tự và phép nhân: Nếu $a < b$ và $c > 0$ (c dương) thì:', '$ac > bc$', '$ac < bc$', '$ac = bc$', '$\\dfrac{a}{c} > \\dfrac{b}{c}$', 'B', 'Khi nhân hai vế của bất đẳng thức với cùng một số DƯƠNG, ta được bất đẳng thức mới CÙNG CHIỀU với bất đẳng thức đã cho.', 'pt_bpt');
  addMCQ(c5, 'Tính chất liên hệ giữa thứ tự và phép nhân: Nếu $a < b$ và $c < 0$ (c âm) thì:', '$ac < bc$', '$ac > bc$', '$ac \\leq bc$', '$ac = bc$', 'B', 'Khi nhân hai vế của bất đẳng thức với cùng một số ÂM, ta PHẢI ĐỔI CHIỀU bất đẳng thức đó. Do đó $a < b \\Rightarrow ac > bc$.', 'pt_bpt');
  addMCQ(c5, 'Cho $a > b$. Khẳng định nào sau đây là ĐÚNG?', '$-a > -b$', '$-2a < -2b$', '$a - 5 < b - 5$', '$3a < 3b$', 'B', 'Nhân hai vế của $a > b$ với số âm $-2$, ta phải đổi chiều bất đẳng thức thành $-2a < -2b$.', 'pt_bpt');
  addMCQ(c5, 'Cho bất đẳng thức $-4x > 12$. Để tìm $x$, ta làm thế nào?', 'Chia 2 vế cho 4 và giữ nguyên chiều.', 'Chia 2 vế cho -4 và đổi chiều.', 'Cộng 4 vào 2 vế.', 'Trừ 12 ở 2 vế.', 'B', 'Để tìm $x$, ta chia hai vế cho số âm $-4$, do đó phải đổi chiều bất đẳng thức: $x < -3$.', 'pt_bpt');
  addMCQ(c5, 'Tính chất bắc cầu của bất đẳng thức: Nếu $a < b$ và $b < c$ thì:', '$a > c$', '$a = c$', '$a < c$', 'Không có kết luận.', 'C', 'Theo tính chất bắc cầu, nếu số thứ nhất nhỏ hơn số thứ hai, số thứ hai nhỏ hơn số thứ ba, thì số thứ nhất nhỏ hơn số thứ ba ($a < c$).', 'pt_bpt');
  addMCQ(c5, 'Nếu $x \\geq 3$ thì biểu thức $2x - 1$ sẽ thỏa mãn điều kiện nào?', '$2x - 1 \\geq 5$', '$2x - 1 \\leq 5$', '$2x - 1 > 5$', '$2x - 1 = 5$', 'A', 'Ta có $x \\geq 3$. Nhân 2 vế với 2 (số dương, không đổi chiều): $2x \\geq 6$. Trừ 2 vế cho 1: $2x - 1 \\geq 5$.', 'pt_bpt');
  addMCQ(c5, 'Cho hai số $a, b$ bất kì. Bất đẳng thức nào sau đây LUÔN ĐÚNG?', '$a^2 \\geq 0$', '$a > 0$', '$a^2 + b^2 < 0$', '$(a - b)^2 < 0$', 'A', 'Bình phương của một số thực bất kì luôn luôn không âm. Vậy $a^2 \\geq 0$ luôn đúng.', 'pt_bpt');
  addMCQ(c5, 'Kí hiệu $a \\leq b$ có nghĩa là gì?', '$a$ lớn hơn $b$', '$a$ nhỏ hơn $b$', '$a$ nhỏ hơn hoặc bằng $b$', '$a$ bằng $b$', 'C', 'Kí hiệu $\\leq$ được đọc là "nhỏ hơn hoặc bằng" (không lớn hơn).', 'pt_bpt');

  addTF(c5, 'Nếu cộng cùng một số âm vào hai vế của một bất đẳng thức thì ta phải đổi chiều bất đẳng thức đó.', false, 'Sai. Phép CỘNG (dù là cộng số dương hay cộng số âm) KHÔNG làm đổi chiều bất đẳng thức. Chỉ có phép NHÂN/CHIA với số âm mới làm đổi chiều.', 'pt_bpt');
  addTF(c5, 'Với mọi số thực $x$, ta luôn có $x^2 + 1 > 0$.', true, 'Đúng. Vì $x^2 \\geq 0$ với mọi $x$, nên $x^2 + 1 \\geq 1 > 0$.', 'pt_bpt');
  addTF(c5, 'Nếu $a > b$ thì $\\dfrac{1}{a} < \\dfrac{1}{b}$.', false, 'Sai. Bất đẳng thức này chỉ đúng khi $a$ và $b$ cùng dấu (cùng dương hoặc cùng âm). Ví dụ $a = 2 > b = -3$, nhưng $\\dfrac{1}{2} > \\dfrac{1}{-3}$.', 'pt_bpt');
  addTF(c5, 'Từ bất đẳng thức $m < n$, nhân 2 vế với số 0 ta được $0 < 0$.', false, 'Sai. Khi nhân hai vế với số 0, ta được $0 = 0$, không phải $0 < 0$. (Tính chất nhân chỉ áp dụng cho $c > 0$ hoặc $c < 0$).', 'pt_bpt');
  addTF(c5, 'Bất đẳng thức $a \\geq b$ được gọi là bất đẳng thức không ngặt.', true, 'Đúng. Bất đẳng thức có chứa dấu bằng ($\\geq, \\leq$) gọi là bất đẳng thức không ngặt. Bất đẳng thức không chứa dấu bằng ($>, <$) gọi là ngặt.', 'pt_bpt');

  console.log(`Bắt đầu nạp ${allQS.length} câu hỏi lý thuyết G9 BATCH 5...`);

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
