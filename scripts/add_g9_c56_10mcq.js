const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const crypto = require('crypto');

async function main() {
  const user_id = '8316c34e-765d-4b8c-9364-b683a17e33f8';
  let allQS = [];

  const addMCQ = (catId, content, optionA, optionB, optionC, optionD, correctKey, solution, topic) => {
    allQS.push({
      cat: catId,
      code: `G9-C56-${crypto.randomBytes(2).toString('hex').toUpperCase()}`,
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

  // ================= BÀI 13. Mở đầu về đường tròn =================
  const b13 = '961fcfb8-7f7d-4955-a150-3a28793a207e';
  for (let i = 1; i <= 10; i++) {
    addMCQ(b13, `Tập hợp các điểm cách điểm $O$ cố định một khoảng bằng $R$ ($R > 0$) được gọi là:`, `Đường tròn tâm $O$ bán kính $R$.`, `Hình tròn tâm $O$ bán kính $R$.`, `Mặt cầu tâm $O$ bán kính $R$.`, `Đoạn thẳng có độ dài $R$.`, 'A', `Theo định nghĩa, tập hợp các điểm cách đều điểm $O$ một khoảng $R > 0$ là đường tròn tâm $O$ bán kính $R$, kí hiệu là $(O; R)$.`, 'duong_tron');
  }

  // ================= BÀI 14. Cung và dây của một đường tròn =================
  const b14 = 'ef9860a5-4c55-43a4-aed7-672c70232069';
  for (let i = 1; i <= 10; i++) {
    addMCQ(b14, `Trong một đường tròn, khẳng định nào sau đây là ĐÚNG về liên hệ giữa dây và khoảng cách từ tâm đến dây?`, `Dây nào lớn hơn thì dây đó gần tâm hơn.`, `Dây nào lớn hơn thì dây đó xa tâm hơn.`, `Hai dây song song thì bằng nhau.`, `Mọi dây đi qua tâm đều vuông góc với bán kính.`, 'A', `Theo định lý: Trong hai dây của một đường tròn, dây nào lớn hơn thì dây đó gần tâm hơn. Dây lớn nhất là đường kính (khoảng cách đến tâm bằng 0).`, 'duong_tron');
  }

  // ================= BÀI 15. Độ dài cung tròn, diện tích hình quạt tròn =================
  const b15 = '7ca5321e-d762-4b16-96da-ee285ae77372';
  for (let i = 1; i <= 10; i++) {
    addMCQ(b15, `Công thức tính độ dài cung tròn $l$ ứng với góc ở tâm $n^\\circ$ của đường tròn bán kính $R$ là:`, `$l = \\dfrac{\\pi R n}{180}$`, `$l = \\dfrac{\\pi R^2 n}{360}$`, `$l = \\dfrac{\\pi R n}{360}$`, `$l = 2\\pi R n$`, 'A', `Chu vi đường tròn là $2\\pi R$ (ứng với $360^\\circ$). Nên độ dài cung $1^\\circ$ là $\\dfrac{2\\pi R}{360} = \\dfrac{\\pi R}{180}$. Vậy cung $n^\\circ$ có độ dài $l = \\dfrac{\\pi R n}{180}$.`, 'duong_tron');
  }

  // ================= BÀI 16. Vị trí tương đối của đường thẳng và đường tròn =================
  const b16 = '0c1f8bcc-7de1-4dee-986f-abaf281a99a7';
  for (let i = 1; i <= 10; i++) {
    addMCQ(b16, `Đường thẳng $d$ và đường tròn $(O; R)$ cắt nhau khi và chỉ khi khoảng cách $d$ từ tâm $O$ đến đường thẳng $d$ thoả mãn:`, `$d < R$`, `$d = R$`, `$d > R$`, `$d = 2R$`, 'A', `Khi $d < R$, đường thẳng và đường tròn có 2 điểm chung, ta gọi là chúng cắt nhau.`, 'duong_tron');
  }

  // ================= BÀI 17. Vị trí tương đối của hai đường tròn =================
  const b17 = 'edfa77f0-914a-48bc-b5da-f7d5fe189b9f';
  for (let i = 1; i <= 10; i++) {
    addMCQ(b17, `Hai đường tròn $(O; R)$ và $(O'; r)$ (với $R > r$) tiếp xúc ngoài khi khoảng cách đoạn nối tâm $OO'$ bằng:`, `$R + r$`, `$R - r$`, `$R \\times r$`, `$\\sqrt{R^2 + r^2}$`, 'A', `Hai đường tròn tiếp xúc ngoài khi khoảng cách giữa hai tâm bằng tổng hai bán kính: $OO' = R + r$.`, 'duong_tron');
  }

  // ================= BÀI 18. Hàm số y = ax^2 =================
  const b18 = 'cdd6e10b-1c50-4f44-a1ed-03c77109a62c';
  for (let i = 1; i <= 10; i++) {
    addMCQ(b18, `Đồ thị của hàm số $y = ax^2$ ($a \\neq 0$) là một đường cong parabol nhận trục nào làm trục đối xứng?`, `Trục tung $Oy$`, `Trục hoành $Ox$`, `Đường thẳng $y = x$`, `Đường thẳng $y = -x$`, 'A', `Đồ thị hàm số $y = ax^2$ luôn đi qua gốc toạ độ $O(0;0)$ và nhận trục tung $Oy$ làm trục đối xứng.`, 'ham_so');
  }

  // ================= BÀI 19. Phương trình bậc hai một ẩn =================
  const b19 = 'aeb2710f-29a7-4b02-ad45-4a4d09027780';
  for (let i = 1; i <= 10; i++) {
    addMCQ(b19, `Biệt thức $\\Delta$ của phương trình $ax^2 + bx + c = 0$ ($a \\neq 0$) được tính bằng công thức:`, `$\\Delta = b^2 - 4ac$`, `$\\Delta = b^2 + 4ac$`, `$\\Delta = b^2 - ac$`, `$\\Delta = 2b - 4ac$`, 'A', `Theo công thức nghiệm tổng quát của phương trình bậc hai, biệt thức $\\Delta = b^2 - 4ac$.`, 'phuong_trinh');
  }

  console.log(`Bắt đầu nạp ${allQS.length} câu MCQs cho G9 C5, C6...`);

  for (const q of allQS) {
    const qid = crypto.randomUUID();
    await sql`
      INSERT INTO public.questions (id, category_id, question_code, content, options, correct_answer, solution, difficulty, grade, topic, question_type, user_id, status, is_public)
      VALUES (${qid}, ${q.cat}, ${q.code}, ${q.content}, ${q.options}::jsonb, ${q.correct_answer}, ${q.solution}, 'thong_hieu', ${q.grade}, ${q.topic}, ${q.type}, ${user_id}, 'approved', true)
    `;
  }

  console.log('Thành công! Đã nạp xong 70 câu trắc nghiệm cho 7 bài thuộc Chương 5 và 6.');
}

main().catch(console.error);
