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
      code: `G6-B6B7-${crypto.randomBytes(2).toString('hex').toUpperCase()}`,
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
      code: `G6-B6B7TF-${crypto.randomBytes(2).toString('hex').toUpperCase()}`,
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

  // Bài 6. Luỹ thừa với số mũ tự nhiên
  const b6 = '9c21dcf7-01fa-4879-99c5-921e7490dd33';

  addMCQ(b6, 'Luỹ thừa bậc $n$ của $a$, kí hiệu là $a^n$, là tích của:', '$n$ thừa số $a$', '$a$ thừa số $n$', '$n$ số hạng $a$', '$a$ số hạng $n$', 'A', 'Định nghĩa: $a^n = a \\cdot a \\cdot ... \\cdot a$ ($n$ thừa số $a$, với $n \\in \\mathbb{N}^*$).', 'so_hoc');
  addMCQ(b6, 'Trong biểu thức $a^n$, $a$ và $n$ được gọi lần lượt là gì?', 'Cơ số và số hạng', 'Số mũ và cơ số', 'Cơ số và số mũ', 'Số hạng và số mũ', 'C', 'Trong luỹ thừa $a^n$, $a$ được gọi là cơ số, $n$ được gọi là số mũ.', 'so_hoc');
  addMCQ(b6, 'Quy ước $a^1$ bằng bao nhiêu?', '$1$', '$0$', '$a$', 'Không xác định', 'C', 'Theo quy ước, luỹ thừa bậc 1 của một số bằng chính số đó: $a^1 = a$.', 'so_hoc');
  addMCQ(b6, 'Quy ước $a^0$ (với $a \\neq 0$) bằng bao nhiêu?', '$1$', '$0$', '$a$', 'Không xác định', 'A', 'Theo quy ước toán học, với mọi số $a \\neq 0$, ta có $a^0 = 1$.', 'so_hoc');
  addMCQ(b6, 'Quy tắc nhân hai luỹ thừa cùng cơ số là:', '$a^m \\cdot a^n = a^{m \\cdot n}$', '$a^m \\cdot a^n = a^{m + n}$', '$a^m \\cdot a^n = (a \\cdot a)^{m + n}$', '$a^m \\cdot a^n = a^{m - n}$', 'B', 'Khi nhân hai luỹ thừa cùng cơ số, ta giữ nguyên cơ số và cộng các số mũ: $a^m \\cdot a^n = a^{m + n}$.', 'so_hoc');
  addMCQ(b6, 'Kết quả của phép tính $2^3 \\cdot 2^4$ dưới dạng một luỹ thừa là:', '$2^{12}$', '$4^7$', '$2^7$', '$4^{12}$', 'C', 'Giữ nguyên cơ số 2, cộng số mũ: $3 + 4 = 7$. Kết quả là $2^7$.', 'so_hoc');
  addMCQ(b6, 'Quy tắc chia hai luỹ thừa cùng cơ số (khác 0) là:', '$a^m : a^n = a^{m - n}$ (với $m \\geq n$)', '$a^m : a^n = a^{m : n}$', '$a^m : a^n = a^{n - m}$', '$a^m : a^n = (a : a)^{m - n}$', 'A', 'Khi chia hai luỹ thừa cùng cơ số (khác 0), ta giữ nguyên cơ số và trừ các số mũ: $a^m : a^n = a^{m - n}$.', 'so_hoc');
  addMCQ(b6, 'Kết quả của phép chia $5^6 : 5^2$ dưới dạng một luỹ thừa là:', '$5^3$', '$1^4$', '$5^4$', '$5^8$', 'C', 'Giữ nguyên cơ số 5, trừ số mũ: $6 - 2 = 4$. Kết quả là $5^4$.', 'so_hoc');
  addMCQ(b6, 'Biểu thức $3 \\cdot 3 \\cdot 3 \\cdot 3$ được viết gọn dưới dạng luỹ thừa là:', '$3^4$', '$4^3$', '$3 \\cdot 4$', '$12$', 'A', 'Tích của 4 thừa số 3 được viết gọn là $3^4$.', 'so_hoc');
  addMCQ(b6, 'Số $10000$ được viết dưới dạng luỹ thừa của $10$ là:', '$10^3$', '$10^4$', '$10^5$', '$10^2$', 'B', 'Số $10000$ có 4 chữ số 0, nên nó bằng $10 \\cdot 10 \\cdot 10 \\cdot 10 = 10^4$.', 'so_hoc');

  addTF(b6, 'Bình phương của một số là luỹ thừa bậc 3 của số đó.', false, 'Sai. Bình phương là luỹ thừa bậc 2 (ví dụ $a^2$). Lập phương mới là luỹ thừa bậc 3 ($a^3$).', 'so_hoc');
  addTF(b6, 'Trong phép tính $2^3$, số 3 chỉ ra rằng ta lấy 3 thừa số 2 nhân với nhau.', true, 'Đúng. $2^3 = 2 \\cdot 2 \\cdot 2$.', 'so_hoc');
  addTF(b6, 'Kết quả của $2^3$ bằng $6$.', false, 'Sai. $2^3 = 2 \\cdot 2 \\cdot 2 = 8$, không phải $2 \\cdot 3 = 6$. Đây là lỗi sai cực kỳ phổ biến của học sinh.', 'so_hoc');
  addTF(b6, 'Khi chia hai luỹ thừa cùng cơ số, ta chia hai cơ số cho nhau và trừ hai số mũ.', false, 'Sai. Quy tắc là GIỮ NGUYÊN cơ số và trừ hai số mũ.', 'so_hoc');
  addTF(b6, 'Mọi số tự nhiên đều có thể viết được dưới dạng luỹ thừa của 10.', false, 'Sai. Chỉ có các số $1, 10, 100, 1000...$ (chữ số 1 đầu tiên và theo sau là các chữ số 0) mới viết được dưới dạng luỹ thừa của 10 một cách tự nhiên.', 'so_hoc');


  // Bài 7. Thứ tự thực hiện các phép tính
  const b7 = '4b603ccb-3fc7-46b3-a76b-8948ede004aa';

  addMCQ(b7, 'Đối với biểu thức không có dấu ngoặc và chỉ có phép cộng, trừ (hoặc chỉ có phép nhân, chia), ta thực hiện phép tính theo thứ tự nào?', 'Từ phải sang trái.', 'Từ trái sang phải.', 'Cộng trước, trừ sau.', 'Nhân trước, chia sau.', 'B', 'Quy tắc: Khi biểu thức chỉ có cộng, trừ (hoặc chỉ nhân, chia), ta thực hiện lần lượt từ trái sang phải.', 'so_hoc');
  addMCQ(b7, 'Đối với biểu thức không có dấu ngoặc, có chứa các phép tính cộng, trừ, nhân, chia, ta thực hiện theo thứ tự nào?', 'Cộng, trừ trước; nhân, chia sau.', 'Từ trái sang phải.', 'Nhân, chia trước; cộng, trừ sau.', 'Thực hiện phép tính lớn nhất trước.', 'C', 'Quy tắc ưu tiên: Nếu có đủ các phép tính cơ bản, ta phải thực hiện phép nhân và phép chia trước, phép cộng và phép trừ sau.', 'so_hoc');
  addMCQ(b7, 'Đối với biểu thức không có dấu ngoặc, chứa cả lũy thừa, nhân, chia, cộng, trừ, thứ tự thực hiện đúng là:', 'Nhân, chia $\\rightarrow$ Lũy thừa $\\rightarrow$ Cộng, trừ', 'Lũy thừa $\\rightarrow$ Nhân, chia $\\rightarrow$ Cộng, trừ', 'Cộng, trừ $\\rightarrow$ Nhân, chia $\\rightarrow$ Lũy thừa', 'Từ trái sang phải', 'B', 'Quy tắc ưu tiên cao nhất: Lũy thừa được thực hiện đầu tiên, sau đó đến nhân chia, và cuối cùng là cộng trừ.', 'so_hoc');
  addMCQ(b7, 'Đối với biểu thức có dấu ngoặc, thứ tự ưu tiên thực hiện các dấu ngoặc là:', 'Ngoặc nhọn $\\{\\} \\rightarrow$ Ngoặc vuông $[] \\rightarrow$ Ngoặc tròn $()$', 'Ngoặc vuông $[] \\rightarrow$ Ngoặc tròn $() \\rightarrow$ Ngoặc nhọn $\\{\\}$', 'Ngoặc tròn $() \\rightarrow$ Ngoặc vuông $[] \\rightarrow$ Ngoặc nhọn $\\{\\}$', 'Ngoặc nào đứng trước thì làm trước', 'C', 'Quy tắc: Ta thực hiện các phép tính trong ngoặc tròn $()$ trước, rồi đến ngoặc vuông $[]$, và cuối cùng là ngoặc nhọn $\\{\\}$.', 'so_hoc');
  addMCQ(b7, 'Kết quả của phép tính $10 + 2 \\cdot 5$ là:', '$60$', '$20$', '$17$', '$100$', 'B', 'Thực hiện phép nhân trước: $2 \\cdot 5 = 10$. Sau đó cộng: $10 + 10 = 20$. Lỗi sai thường gặp là lấy $(10+2)\\cdot5=60$.', 'so_hoc');
  addMCQ(b7, 'Kết quả của phép tính $20 - 4^2$ là:', '$256$', '$12$', '$4$', '$16$', 'C', 'Thực hiện phép lũy thừa trước: $4^2 = 16$. Sau đó trừ: $20 - 16 = 4$.', 'so_hoc');
  addMCQ(b7, 'Kết quả của phép tính $18 : 3 \\cdot 2$ là:', '$3$', '$12$', '$9$', '$1$', 'B', 'Biểu thức chỉ có nhân và chia, ta thực hiện từ trái sang phải. $18 : 3 = 6$, sau đó $6 \\cdot 2 = 12$. Lỗi sai thường gặp là lấy $3\\cdot2=6$ rồi $18:6=3$.', 'so_hoc');
  addMCQ(b7, 'Kết quả của phép tính $2 \\cdot (3 + 4)^2$ là:', '$98$', '$50$', '$28$', '$14$', 'A', 'Thực hiện trong ngoặc trước: $3 + 4 = 7$. Tính lũy thừa: $7^2 = 49$. Cuối cùng nhân: $2 \\cdot 49 = 98$.', 'so_hoc');
  addMCQ(b7, 'Biểu thức $100 - [50 - (20 - 5)]$ có giá trị là:', '$65$', '$35$', '$85$', '$45$', 'A', 'Trong ngoặc tròn: $20 - 5 = 15$. Trong ngoặc vuông: $50 - 15 = 35$. Cuối cùng: $100 - 35 = 65$.', 'so_hoc');
  addMCQ(b7, 'Cách viết nào sau đây là SAI khi bỏ dấu ngoặc?', '$a - (b + c) = a - b - c$', '$a - (b - c) = a - b + c$', '$a + (b - c) = a + b - c$', '$a - (b + c) = a - b + c$', 'D', 'Quy tắc bỏ ngoặc có dấu trừ đằng trước: Phải ĐỔI DẤU tất cả các số hạng bên trong ngoặc. $(+b)$ thành $-b$, $(+c)$ thành $-c$. Viết $a - b + c$ là sai.', 'so_hoc');

  addTF(b7, 'Trong biểu thức chỉ có phép chia, ta có thể tính từ phải sang trái.', false, 'Sai. Phép chia không có tính chất kết hợp. Nếu tính từ phải sang trái sẽ cho kết quả sai. Bắt buộc phải tính từ trái sang phải.', 'so_hoc');
  addTF(b7, 'Phép tính $5 \\cdot 2^3$ bằng $10^3 = 1000$.', false, 'Sai. Phải thực hiện lũy thừa trước: $2^3 = 8$. Sau đó nhân: $5 \\cdot 8 = 40$. Không được lấy cơ số nhân với nhau trước khi tính lũy thừa.', 'so_hoc');
  addTF(b7, 'Quy tắc bỏ dấu ngoặc có dấu "+" đằng trước là giữ nguyên dấu của các số hạng trong ngoặc.', true, 'Đúng. Nếu trước ngoặc là dấu "+", ta chỉ việc bỏ ngoặc và giữ nguyên dấu của tất cả các số hạng.', 'so_hoc');
  addTF(b7, 'Khi thực hiện phép tính, máy tính bỏ túi cũng tuân thủ đúng thứ tự nhân chia trước, cộng trừ sau.', true, 'Đúng. Các máy tính khoa học hiện đại đều được lập trình sẵn để tuân thủ quy tắc ưu tiên toán học (PEMDAS/BODMAS).', 'so_hoc');
  addTF(b7, 'Giá trị của biểu thức $15 - 5 \\cdot 2$ bằng 20.', false, 'Sai. Phải nhân trước: $5 \\cdot 2 = 10$. Sau đó $15 - 10 = 5$. Kết quả bằng 5 chứ không phải 20.', 'so_hoc');

  console.log(`Bắt đầu nạp ${allQS.length} câu hỏi lý thuyết G6 Bài 6 và Bài 7...`);

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
