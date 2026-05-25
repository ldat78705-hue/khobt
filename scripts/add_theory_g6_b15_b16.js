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
      code: `G6-B15B16-${crypto.randomBytes(2).toString('hex').toUpperCase()}`,
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
      code: `G6-B15B16TF-${crypto.randomBytes(2).toString('hex').toUpperCase()}`,
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

  // Bài 15. Quy tắc dấu ngoặc
  const b15 = '1e0412bd-0c9c-49a5-9508-7e785d00e63c';

  addMCQ(b15, 'Theo quy tắc dấu ngoặc, khi bỏ dấu ngoặc có dấu "+" đằng trước, ta phải làm gì?', 'Đổi dấu tất cả các số hạng trong ngoặc.', 'Giữ nguyên dấu của các số hạng trong ngoặc.', 'Chỉ đổi dấu số hạng đầu tiên trong ngoặc.', 'Chỉ đổi dấu số hạng cuối cùng trong ngoặc.', 'B', 'Quy tắc bỏ dấu ngoặc: Khi bỏ dấu ngoặc có dấu "+" đằng trước, ta giữ nguyên dấu của các số hạng trong ngoặc.', 'so_hoc');
  addMCQ(b15, 'Khi bỏ dấu ngoặc có dấu "-" đằng trước, ta phải làm gì?', 'Giữ nguyên dấu của tất cả các số hạng.', 'Chỉ đổi dấu số hạng đầu tiên.', 'Đổi dấu tất cả các số hạng trong ngoặc (dấu "+" thành "-", dấu "-" thành "+").', 'Xóa bỏ tất cả các dấu bên trong ngoặc.', 'C', 'Quy tắc bỏ dấu ngoặc: Khi bỏ dấu ngoặc có dấu "-" đằng trước, ta phải đổi dấu tất cả các số hạng trong ngoặc.', 'so_hoc');
  addMCQ(b15, 'Biểu thức $+(a - b + c)$ sau khi bỏ dấu ngoặc sẽ bằng:', '$a - b + c$', '$-a + b - c$', '$a + b - c$', '$-a - b - c$', 'A', 'Vì trước ngoặc là dấu "+", ta giữ nguyên toàn bộ dấu của các số hạng bên trong: $a - b + c$.', 'so_hoc');
  addMCQ(b15, 'Biểu thức $-(x - y + z)$ sau khi bỏ dấu ngoặc sẽ bằng:', '$-x - y + z$', '$-x + y - z$', '$-x - y - z$', '$x - y + z$', 'B', 'Vì trước ngoặc là dấu "-", ta phải đổi dấu toàn bộ: $+x$ thành $-x$, $-y$ thành $+y$, $+z$ thành $-z$. Kết quả: $-x + y - z$.', 'so_hoc');
  addMCQ(b15, 'Biểu thức $a - (b - c)$ tương đương với biểu thức nào sau đây?', '$a - b - c$', '$a + b - c$', '$a - b + c$', '$a + b + c$', 'C', 'Bỏ ngoặc có dấu "-" đằng trước: $a - b + (-(-c)) = a - b + c$.', 'so_hoc');
  addMCQ(b15, 'Kết quả của phép tính $25 - (15 - 8)$ sau khi dùng quy tắc bỏ ngoặc là:', '$25 - 15 - 8 = 2$', '$25 - 15 + 8 = 18$', '$25 + 15 - 8 = 32$', '$25 + 15 + 8 = 48$', 'B', 'Bỏ ngoặc có dấu trừ: $25 - 15 + 8 = 10 + 8 = 18$.', 'so_hoc');
  addMCQ(b15, 'Tính nhanh biểu thức: $45 + (12 - 45)$', '$12$', '$90$', '$-12$', '$0$', 'A', 'Bỏ ngoặc có dấu cộng: $45 + 12 - 45 = (45 - 45) + 12 = 0 + 12 = 12$.', 'so_hoc');
  addMCQ(b15, 'Tính nhanh biểu thức: $(2023 + 55) - 2023$', '$55$', '$-55$', '$4046$', '$0$', 'A', 'Bỏ ngoặc: $2023 + 55 - 2023 = (2023 - 2023) + 55 = 55$.', 'so_hoc');
  addMCQ(b15, 'Khẳng định nào sau đây là ĐÚNG?', '$-(-a) = -a$', '$-(-a) = a$', '$-(+a) = a$', '$+(-a) = a$', 'B', 'Dấu trừ của một số âm (hay số đối của số âm) chính là số dương tương ứng. Vậy $-(-a) = a$.', 'so_hoc');
  addMCQ(b15, 'Biểu thức $10 - [(-5) + 3]$ có giá trị là:', '$12$', '$8$', '$2$', '$18$', 'A', 'Trong ngoặc vuông: $(-5) + 3 = -2$. Biểu thức trở thành $10 - (-2)$. Áp dụng quy tắc bỏ ngoặc: $10 + 2 = 12$.', 'so_hoc');

  addTF(b15, 'Khi đặt một biểu thức vào trong dấu ngoặc có dấu "-" đằng trước, ta cũng phải đổi dấu tất cả các số hạng.', true, 'Đúng. Quy tắc "đặt vào ngoặc" hoàn toàn giống quy tắc "bỏ ngoặc". Nếu đặt dấu "-" đằng trước, mọi số hạng đưa vào phải đổi dấu.', 'so_hoc');
  addTF(b15, 'Biểu thức $- (a + b) + c$ bằng với $-a + b + c$.', false, 'Sai. Bỏ ngoặc có dấu trừ đằng trước: $- (a + b) + c = -a - b + c$.', 'so_hoc');
  addTF(b15, 'Dùng quy tắc dấu ngoặc để nhóm các số hạng hợp lý sẽ giúp việc tính nhẩm nhanh và chính xác hơn.', true, 'Đúng. Đây là mục đích chính của quy tắc dấu ngoặc trong phần số học (ví dụ nhóm các số đối nhau hoặc tròn chục).', 'so_hoc');
  addTF(b15, 'Biểu thức $a + (-b) - (-c)$ bằng với $a - b + c$.', true, 'Đúng. Bỏ ngoặc: $+(-b)$ thành $-b$, và $-(-c)$ thành $+c$. Vậy biểu thức là $a - b + c$.', 'so_hoc');
  addTF(b15, 'Quy tắc bỏ dấu ngoặc chỉ áp dụng được cho biểu thức có tối đa 2 số hạng trong ngoặc.', false, 'Sai. Quy tắc này áp dụng cho bất kỳ số lượng số hạng nào nằm trong dấu ngoặc.', 'so_hoc');


  // Bài 16. Phép nhân số nguyên
  const b16 = 'efc2618a-4c5b-4483-8d2d-818d3ed639ba';

  addMCQ(b16, 'Tích của hai số nguyên cùng dấu luôn là:', 'Số nguyên âm.', 'Số nguyên dương.', 'Số không.', 'Không thể xác định.', 'B', 'Quy tắc: Nhân hai số nguyên cùng dấu (cùng âm hoặc cùng dương) luôn cho kết quả là một số nguyên dương.', 'so_hoc');
  addMCQ(b16, 'Tích của hai số nguyên khác dấu luôn là:', 'Số nguyên âm.', 'Số nguyên dương.', 'Số không.', 'Phụ thuộc vào số lớn hơn.', 'A', 'Quy tắc: Nhân hai số nguyên khác dấu (một dương, một âm) luôn cho kết quả là một số nguyên âm.', 'so_hoc');
  addMCQ(b16, 'Kết quả của phép tính $(-5) \\cdot (-4)$ là:', '$-20$', '$20$', '$-9$', '$9$', 'B', 'Hai số nguyên cùng dấu âm nhân với nhau sẽ ra số dương: $5 \\cdot 4 = 20$.', 'so_hoc');
  addMCQ(b16, 'Kết quả của phép tính $8 \\cdot (-3)$ là:', '$-24$', '$24$', '$-5$', '$11$', 'A', 'Hai số nguyên khác dấu nhân với nhau ra số âm: $-(8 \\cdot 3) = -24$.', 'so_hoc');
  addMCQ(b16, 'Tích của một số nguyên $a$ với $0$ bằng bao nhiêu?', '$a$', '$-a$', '$1$', '$0$', 'D', 'Mọi số nguyên (dù âm hay dương) khi nhân với 0 đều có kết quả bằng 0.', 'so_hoc');
  addMCQ(b16, 'Nhân một số nguyên $a$ với $-1$ ta được kết quả là:', '$a$', '$-a$', '$1$', '$-1$', 'B', 'Nhân một số với $-1$ sẽ cho kết quả là số đối của số đó (tức là $-a$).', 'so_hoc');
  addMCQ(b16, 'Tính chất phân phối của phép nhân đối với phép cộng trong tập số nguyên $\\mathbb{Z}$ được viết là:', '$a \\cdot (b + c) = a \\cdot b + a \\cdot c$', '$a \\cdot (b + c) = a \\cdot b + c$', '$a \\cdot (b \\cdot c) = (a \\cdot b) \\cdot c$', '$a + (b \\cdot c) = (a + b) \\cdot c$', 'A', 'Tính chất phân phối luôn có dạng $a(b + c) = ab + ac$, áp dụng hoàn toàn đúng trong tập hợp số nguyên.', 'so_hoc');
  addMCQ(b16, 'Nếu tích của nhiều số nguyên chứa một CHẴN lần số các thừa số âm thì tích đó mang dấu gì?', 'Dấu dương (+)', 'Dấu âm (-)', 'Dấu tùy ý', 'Bằng 0', 'A', 'Khi nhân các số nguyên, nếu số lượng thừa số mang dấu âm là chẵn, kết quả sẽ mang dấu dương (vì cứ 2 dấu trừ nhân nhau thành dấu cộng).', 'so_hoc');
  addMCQ(b16, 'Nếu tích của nhiều số nguyên chứa một LẺ lần số các thừa số âm thì tích đó mang dấu gì?', 'Dấu dương (+)', 'Dấu âm (-)', 'Dấu tùy ý', 'Bằng 0', 'B', 'Nếu số lượng thừa số mang dấu âm là lẻ, kết quả của tích sẽ mang dấu âm.', 'so_hoc');
  addMCQ(b16, 'Giá trị của biểu thức $(-1)^3$ là:', '$1$', '$-1$', '$3$', '$-3$', 'B', 'Ta có $(-1)^3 = (-1) \\cdot (-1) \\cdot (-1) = -1$ (vì có 3 thừa số âm, là một số lẻ thừa số âm).', 'so_hoc');

  addTF(b16, 'Tích của một số chẵn các thừa số nguyên âm là một số nguyên dương.', true, 'Đúng. Ví dụ tích của 2, 4, 6... thừa số âm sẽ cho kết quả là số dương.', 'so_hoc');
  addTF(b16, 'Bình phương của bất kỳ số nguyên nào cũng đều là số nguyên dương hoặc số 0.', true, 'Đúng. Bình phương của số dương là số dương, bình phương của số âm cũng là số dương (vì âm nhân âm ra dương), bình phương của 0 là 0. ($a^2 \\geq 0 \\forall a \\in \\mathbb{Z}$).', 'so_hoc');
  addTF(b16, 'Phép tính $(-2)^4$ có kết quả là $-16$.', false, 'Sai. $(-2)^4 = (-2) \\cdot (-2) \\cdot (-2) \\cdot (-2) = 16$ (số chẵn thừa số âm ra dương). Không được nhầm với $-2^4 = -16$.', 'so_hoc');
  addTF(b16, 'Nếu $x \\cdot y = 0$ (với $x, y \\in \\mathbb{Z}$) thì bắt buộc cả $x$ và $y$ đều phải bằng 0.', false, 'Sai. Chỉ cần MỘT TRONG HAI số bằng 0 là đủ (tức là $x = 0$ HOẶC $y = 0$). Không bắt buộc cả hai.', 'so_hoc');
  addTF(b16, 'Nếu $a < 0$ và $b > 0$ thì tích $a \\cdot b^2$ luôn nhỏ hơn 0.', true, 'Đúng. $b > 0 \\Rightarrow b^2 > 0$. Vậy tích $a \\cdot b^2$ là tích của một số âm ($a$) và một số dương ($b^2$), kết quả phải là số âm.', 'so_hoc');

  console.log(`Bắt đầu nạp ${allQS.length} câu hỏi lý thuyết G6 Bài 15 và Bài 16...`);

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
