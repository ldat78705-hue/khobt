const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const crypto = require('crypto');

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

  // ================= CHƯƠNG I =================
  const bai1 = '04886195-366d-43d0-a9da-4043475ccfb2';
  addMCQ(bai1, 'Phương trình bậc nhất hai ẩn $ax + by = c$ có bao nhiêu nghiệm nếu $a \\neq 0$ hoặc $b \\neq 0$?', 'Vô nghiệm.', 'Có duy nhất một nghiệm.', 'Có hai nghiệm.', 'Có vô số nghiệm.', 'D', 'Phương trình bậc nhất hai ẩn $ax + by = c$ ($a^2 + b^2 > 0$) luôn có vô số nghiệm. Tập nghiệm được biểu diễn bởi một đường thẳng trên mặt phẳng tọa độ.', 'he_phuong_trinh');
  addTF(bai1, 'Cặp số $(1; -2)$ là một nghiệm của phương trình $3x - 2y = 7$.', true, 'Đúng. Thay $x = 1, y = -2$ vào phương trình ta có: $3(1) - 2(-2) = 3 + 4 = 7$ (thoả mãn).', 'he_phuong_trinh');

  const bai2 = '9d3d76bd-e202-47f2-bd44-fd27e81059b7';
  addMCQ(bai2, 'Hệ phương trình $\\begin{cases} x + y = 3 \\\\ x - y = 1 \\end{cases}$ có nghiệm $(x; y)$ là:', '$(1; 2)$', '$(2; 1)$', '$(3; 0)$', '$(0; 3)$', 'B', 'Cộng hai phương trình vế theo vế ta được $2x = 4 \\Rightarrow x = 2$. Thay vào phương trình đầu ta có $2 + y = 3 \\Rightarrow y = 1$. Vậy nghiệm là $(2; 1)$.', 'he_phuong_trinh');
  addTF(bai2, 'Hệ phương trình $\\begin{cases} 2x - y = 4 \\\\ 4x - 2y = 5 \\end{cases}$ có vô số nghiệm.', false, 'Sai. Ta thấy $\\dfrac{2}{4} = \\dfrac{-1}{-2} \\neq \\dfrac{4}{5}$. Do đó hệ phương trình này VÔ NGHIỆM, hai đường thẳng song song với nhau.', 'he_phuong_trinh');

  const bai3 = '5e72ba56-0fd3-4d2e-a9c7-1eb09a7bfd9d';
  addMCQ(bai3, 'Trong bài toán "vừa gà vừa chó có 36 con", nếu gọi số gà là $x$ và số chó là $y$ (điều kiện $x, y \\in \\mathbb{N}^*$), ta lập được phương trình nào sau đây?', '$x + y = 36$', '$2x + y = 36$', '$x + 4y = 36$', '$2x + 4y = 36$', 'A', 'Số lượng gà và chó tổng cộng là 36 con nên ta có phương trình về số con là $x + y = 36$.', 'he_phuong_trinh');
  addTF(bai3, 'Khi gọi $x$ là vận tốc của canô lúc nước yên lặng, và $y$ là vận tốc dòng nước, thì vận tốc canô lúc xuôi dòng là $x - y$.', false, 'Sai. Vận tốc lúc xuôi dòng phải bằng vận tốc canô cộng với vận tốc dòng nước, tức là $v_{\\text{xuôi}} = x + y$.', 'he_phuong_trinh');

  // ================= CHƯƠNG II =================
  const bai4 = '35b77b38-8330-4862-9583-9fc30aff47d5';
  addMCQ(bai4, 'Nghiệm của phương trình $(x - 2)(2x + 5) = 0$ là:', '$x = 2$ hoặc $x = 5$', '$x = -2$ hoặc $x = \\dfrac{5}{2}$', '$x = 2$ hoặc $x = -\\dfrac{5}{2}$', '$x = -2$ hoặc $x = -\\dfrac{5}{2}$', 'C', 'Phương trình tích $(x - 2)(2x + 5) = 0 \\Leftrightarrow x - 2 = 0$ hoặc $2x + 5 = 0 \\Leftrightarrow x = 2$ hoặc $x = -\\dfrac{5}{2}$.', 'phuong_trinh');
  addTF(bai4, 'Phương trình $\\dfrac{x^2 - 1}{x - 1} = 2$ có tập nghiệm là $S = \\{1\\}$.', false, 'Sai. Điều kiện xác định là $x \\neq 1$. Rút gọn ta được $x + 1 = 2 \\Rightarrow x = 1$ (loại). Do đó phương trình này vô nghiệm.', 'phuong_trinh');

  const bai5 = '5f573415-dec3-40a8-a24a-7268c223b7f1';
  addMCQ(bai5, 'Khẳng định nào sau đây là SAI về tính chất của bất đẳng thức? (Giả sử $a < b$)', '$a + c < b + c$', '$a - c < b - c$', '$a \\cdot c < b \\cdot c$ (với $c > 0$)', '$a \\cdot c < b \\cdot c$ (với $c < 0$)', 'D', 'Khi nhân cả hai vế của bất đẳng thức với cùng một số âm ($c < 0$), ta phải đổi chiều bất đẳng thức. Đúng phải là $a \\cdot c > b \\cdot c$.', 'bat_phuong_trinh');
  addTF(bai5, 'Nếu $a > b$ thì $-2a + 5 < -2b + 5$.', true, 'Đúng. Nhân hai vế với số âm $-2$ làm đổi chiều: $-2a < -2b$. Cộng thêm 5 vào hai vế không làm đổi chiều: $-2a + 5 < -2b + 5$.', 'bat_phuong_trinh');

  const bai6 = '85efec08-5622-423f-8291-4bb9831869f6';
  addMCQ(bai6, 'Tập nghiệm của bất phương trình $-3x > 12$ là:', '$x > -4$', '$x < -4$', '$x > 4$', '$x < 4$', 'B', 'Chia hai vế cho số âm $-3$, ta phải đổi chiều bất phương trình: $x < \\dfrac{12}{-3} \\Leftrightarrow x < -4$.', 'bat_phuong_trinh');
  addTF(bai6, 'Hai bất phương trình $x > 2$ và $2x > 4$ là hai bất phương trình tương đương.', true, 'Đúng. Nhân hai vế của $x > 2$ với 2 (số dương) ta được $2x > 4$. Tập nghiệm của hai bất phương trình này giống hệt nhau là $(2; +\\infty)$.', 'bat_phuong_trinh');

  // ================= CHƯƠNG III =================
  const bai7 = 'd6b4f323-757f-4a92-8720-38ca2f4deba8';
  addMCQ(bai7, 'Căn bậc hai số học của 16 là:', '$-4$', '$4$', '$\\pm 4$', '$256$', 'B', 'Căn bậc hai số học của một số $a$ không âm là số $x$ không âm sao cho $x^2 = a$. Vì vậy $\\sqrt{16} = 4$. (Chú ý: $\\pm 4$ là "căn bậc hai", nhưng không phải "căn bậc hai SỐ HỌC").', 'can_thuc');
  addTF(bai7, 'Biểu thức $\\sqrt{2x - 4}$ có nghĩa khi và chỉ khi $x \\ge 2$.', true, 'Đúng. Biểu thức có nghĩa khi $2x - 4 \\ge 0 \\Leftrightarrow 2x \\ge 4 \\Leftrightarrow x \\ge 2$.', 'can_thuc');

  const bai8 = '4dd3889a-0416-44a1-8d35-3e18e4a8ab58';
  addMCQ(bai8, 'Với hai số không âm $a, b$, kết quả của phép tính $\\sqrt{a} \\cdot \\sqrt{b}$ là:', '$\\sqrt{a+b}$', '$\\sqrt{ab}$', '$\\dfrac{\\sqrt{a}}{b}$', '$\\sqrt{a} + \\sqrt{b}$', 'B', 'Theo quy tắc nhân hai căn thức bậc hai: $\\sqrt{a} \\cdot \\sqrt{b} = \\sqrt{a \\cdot b}$ với $a \\ge 0, b \\ge 0$.', 'can_thuc');
  addTF(bai8, 'Khẳng định $\\sqrt{16 + 9} = \\sqrt{16} + \\sqrt{9}$ là đúng.', false, 'Sai. $\\sqrt{16 + 9} = \\sqrt{25} = 5$. Trong khi đó $\\sqrt{16} + \\sqrt{9} = 4 + 3 = 7$. Hai kết quả này hoàn toàn khác nhau.', 'can_thuc');

  console.log(`Bắt đầu nạp ${allQS.length} câu hỏi lý thuyết chính xác 100% theo chuẩn BÀI HỌC...`);

  for (const q of allQS) {
    const qid = crypto.randomUUID();
    await sql`
      INSERT INTO public.questions (id, category_id, question_code, content, options, correct_answer, solution, difficulty, grade, topic, question_type, user_id, status, is_public)
      VALUES (${qid}, ${q.cat}, ${q.code}, ${q.content}, ${q.options}::jsonb, ${q.correct_answer}, ${q.solution}, 'thong_hieu', ${q.grade}, ${q.topic}, ${q.type}, ${user_id}, 'approved', true)
    `;
  }

  console.log('Thành công! Đã nạp dữ liệu chuẩn cho Lớp 9 - Chương I, II, III.');
}

main().catch(console.error);
