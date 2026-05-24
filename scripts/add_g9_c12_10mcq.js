const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const crypto = require('crypto');

async function main() {
  const user_id = '8316c34e-765d-4b8c-9364-b683a17e33f8';
  let allQS = [];

  const addMCQ = (catId, content, optionA, optionB, optionC, optionD, correctKey, solution, topic) => {
    allQS.push({
      cat: catId,
      code: `G9-L10-${crypto.randomBytes(2).toString('hex').toUpperCase()}`,
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

  // ================= BÀI 1. Khái niệm PT và Hệ PT bậc nhất 2 ẩn =================
  const b1 = '04886195-366d-43d0-a9da-4043475ccfb2';
  for(let i=1; i<=10; i++) {
    let a = i, b = i%2==0 ? 2 : 3, c = a + b;
    addMCQ(b1, `Cặp số $(1; 1)$ có phải là nghiệm của phương trình ${a}x + ${b}y = ${c} không?`, 'Có, vì nó thỏa mãn phương trình.', 'Không, vì nó không thỏa mãn phương trình.', `Chỉ đúng khi $x = ${a}$.`, `Chỉ đúng khi $y = ${b}$.`, 'A', `Thay $x=1, y=1$ vào vế trái ta có: ${a}(1) + ${b}(1) = ${a+b} = ${c}. Bằng vế phải nên $(1; 1)$ là nghiệm.`, 'he_phuong_trinh');
  }

  // ================= BÀI 2. Giải hệ hai phương trình bậc nhất hai ẩn =================
  const b2 = '9d3d76bd-e202-47f2-bd44-fd27e81059b7';
  for(let i=1; i<=10; i++) {
    addMCQ(b2, `Giải hệ phương trình $\\begin{cases} x + y = ${i+2} \\\\ x - y = ${i} \\end{cases}$. Nghiệm của hệ là:`, `$(x; y) = (${i+1}; 1)$`, `$(x; y) = (1; ${i+1})$`, `$(x; y) = (${i}; 2)$`, `$(x; y) = (2; ${i})$`, 'A', `Cộng hai vế của hệ phương trình ta được $2x = ${2*i+2} \\Rightarrow x = ${i+1}$. Thay $x$ vào phương trình $x+y=${i+2}$ ta có $y = 1$. Vậy nghiệm là $(${i+1}; 1)$.`, 'he_phuong_trinh');
  }

  // ================= BÀI 3. Giải bài toán bằng cách lập hệ phương trình =================
  const b3 = '5e72ba56-0fd3-4d2e-a9c7-1eb09a7bfd9d';
  for(let i=1; i<=10; i++) {
    addMCQ(b3, `Tìm hai số biết tổng của chúng bằng ${20+i} và hiệu của chúng bằng ${i}. Hai số đó là:`, `10 và ${10+i}`, `${10+i} và 10`, `15 và ${5+i}`, `${15+i} và 5`, 'B', `Gọi hai số là $x, y$. Hệ phương trình: $x+y=${20+i}$ và $x-y=${i}$. Giải hệ ta được $x=${10+i}, y=10$.`, 'he_phuong_trinh');
  }

  // ================= BÀI 4. Phương trình quy về phương trình bậc nhất một ẩn =================
  const b4 = '35b77b38-8330-4862-9583-9fc30aff47d5';
  for(let i=1; i<=10; i++) {
    addMCQ(b4, `Điều kiện xác định của phương trình $\\dfrac{x+${i}}{x-${i}} = 0$ là:`, `$x \\neq 0$`, `$x \\neq ${i}$`, `$x \\neq -${i}$`, `$x > ${i}$`, 'B', `Phương trình chứa ẩn ở mẫu có nghĩa khi mẫu khác 0, tức là $x - ${i} \\neq 0 \\Leftrightarrow x \\neq ${i}$.`, 'phuong_trinh');
  }

  // ================= BÀI 5. Bất đẳng thức và tính chất =================
  const b5 = '5f573415-dec3-40a8-a24a-7268c223b7f1';
  for(let i=1; i<=10; i++) {
    addMCQ(b5, `Nếu $a > b$, kết luận nào sau đây đúng?`, `$a - ${i} < b - ${i}$`, `$a + ${i} < b + ${i}$`, `$-${i}a < -${i}b$`, `$-${i}a > -${i}b$`, 'C', `Khi nhân cả hai vế với số âm $-${i}$, ta phải đổi chiều bất đẳng thức: $a > b \\Rightarrow -${i}a < -${i}b$.`, 'bat_phuong_trinh');
  }

  // ================= BÀI 6. Bất phương trình bậc nhất một ẩn =================
  const b6 = '85efec08-5622-423f-8291-4bb9831869f6';
  for(let i=1; i<=10; i++) {
    addMCQ(b6, `Nghiệm của bất phương trình $x - ${i} > 0$ là:`, `$x > ${i}$`, `$x < ${i}$`, `$x > -${i}$`, `$x < -${i}$`, 'A', `Chuyển vế đổi dấu: $x - ${i} > 0 \\Leftrightarrow x > ${i}$.`, 'bat_phuong_trinh');
  }

  console.log(`Bắt đầu nạp ${allQS.length} câu hỏi MCQs...`);

  for (const q of allQS) {
    const qid = crypto.randomUUID();
    await sql`
      INSERT INTO public.questions (id, category_id, question_code, content, options, correct_answer, solution, difficulty, grade, topic, question_type, user_id, status, is_public)
      VALUES (${qid}, ${q.cat}, ${q.code}, ${q.content}, ${q.options}::jsonb, ${q.correct_answer}, ${q.solution}, 'thong_hieu', ${q.grade}, ${q.topic}, ${q.type}, ${user_id}, 'approved', true)
    `;
  }

  console.log('Thành công! Nạp đủ 10 câu/bài cho 6 bài đầu tiên của Lớp 9.');
}

main().catch(console.error);
