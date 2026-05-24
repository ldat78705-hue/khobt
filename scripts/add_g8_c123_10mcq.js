const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const crypto = require('crypto');

async function main() {
  const user_id = '8316c34e-765d-4b8c-9364-b683a17e33f8';
  let allQS = [];

  const addMCQ = (catId, content, optionA, optionB, optionC, optionD, correctKey, solution, topic) => {
    allQS.push({
      cat: catId,
      code: `G8-C123-${crypto.randomBytes(2).toString('hex').toUpperCase()}`,
      grade: 8, topic,
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

  const b1 = '8bf09c0e-57fe-48e1-96db-f14d155d1de3'; // Bài 1. Đơn thức.
  const b2 = 'bd0e2c0a-5424-4cf8-8ced-a0df65d03d4f'; // Bài 2. Đa thức.
  const b3 = 'c40e2f3d-7642-406c-ba9b-15a8863dfb49'; // Bài 3. Phép cộng và phép trừ đa thức.
  const b4 = 'c6f90a3a-7eb5-48d8-923d-9c8aa799e7da'; // Bài 4. Phép nhân đa thức.
  const b5 = 'd9041ee2-d06c-451c-8811-f9120dc7c70b'; // Bài 5. Phép chia đa thức cho đơn thức.
  const b6 = '30c01eff-1da3-4f14-b256-cc498f1e9055'; // Bài 6. Hiệu hai bình phương. Bình phương của một tổng hay một hiệu.
  const b7 = '6ffe5599-48df-4f13-ae23-3c00e719029b'; // Bài 7. Lập phương của một tổng hay một hiệu.
  const b8 = '8d2c40ee-7cd7-40ff-929f-f5726d6032c2'; // Bài 8. Tổng và hiệu hai lập hương.
  const b9 = '5caed3e1-26b6-4b92-88b0-3738dc803d09'; // Bài 9. Phân tích đa thức thành nhân tử.
  const b10 = '2f9cdeb3-c6e9-496a-bc41-2d395c05d997'; // Bài 10. Tứ giác.
  const b11 = '11fbf9c1-9ad5-4ce0-8233-baedb0561f90'; // Bài 11. Hình thang cân.
  const b12 = 'b472f2ad-5434-4aa2-8c6d-f1aecc064d82'; // Bài 12. Hình bình hành.
  const b13 = '5e612669-0446-48cd-bae7-97e886399e85'; // Bài 13. Hình chữ nhật.
  const b14 = '8717335e-8ca0-4328-b51f-141d26248244'; // Bài 14. Hình thoi và hình vuông.

  // 1. Đơn thức
  for (let i = 1; i <= 10; i++) {
    addMCQ(b1, `Trong các biểu thức đại số sau, biểu thức nào là đơn thức?`, `$${i}x^2y^3$`, `$x + ${i}$`, `$${i}x - y$`, `$\\dfrac{${i}}{x}$`, 'A', `Đơn thức là biểu thức đại số chỉ gồm một số, hoặc một biến, hoặc một tích giữa các số và các biến.`, 'da_thuc');
  }

  // 2. Đa thức
  for (let i = 1; i <= 10; i++) {
    addMCQ(b2, `Bậc của đa thức $P = x^${i+1}y + x y^2 - ${i}$ là:`, `$${i+2}$`, `$${i+1}$`, `3`, `$${i}$`, 'A', `Bậc của đa thức là bậc của hạng tử có bậc cao nhất. Hạng tử $x^{${i+1}}y$ có bậc là ${i+1} + 1 = ${i+2}.`, 'da_thuc');
  }

  // 3. Cộng trừ đa thức
  for (let i = 1; i <= 10; i++) {
    addMCQ(b3, `Kết quả của phép tính $(x^2 + ${i}x) - (x^2 - ${i}x)$ là:`, `$${2*i}x$`, `$0$`, `$2x^2$`, `$2x^2 + ${2*i}x$`, 'A', `Rút gọn: $x^2 + ${i}x - x^2 + ${i}x = ${2*i}x$.`, 'da_thuc');
  }

  // 4. Nhân đa thức
  for (let i = 1; i <= 10; i++) {
    addMCQ(b4, `Khai triển $(x + ${i})(x + 1)$ ta được:`, `$x^2 + ${i+1}x + ${i}$`, `$x^2 + ${i}x + ${i}$`, `$x^2 + ${i+1}x + 1$`, `$x^2 + x + ${i}$`, 'A', `$(x + ${i})(x + 1) = x^2 + x + ${i}x + ${i} = x^2 + ${i+1}x + ${i}$.`, 'da_thuc');
  }

  // 5. Chia đa thức cho đơn thức
  for (let i = 1; i <= 10; i++) {
    addMCQ(b5, `Kết quả của phép chia $(${2*i}x^3 + ${3*i}x^2) : (${i}x^2)$ là:`, `$2x + 3$`, `$2x^2 + 3$`, `$2x + 3x$`, `$${2*i}x + 3$`, 'A', `Chia từng hạng tử: $$\\dfrac{${2*i}x^3}{${i}x^2} + \\dfrac{${3*i}x^2}{${i}x^2} = 2x + 3.$$`, 'da_thuc');
  }

  // 6. Hiệu hai bình phương
  for (let i = 1; i <= 10; i++) {
    addMCQ(b6, `Theo hằng đẳng thức đáng nhớ, $x^2 - ${i*i}$ bằng:`, `$(x - ${i})(x + ${i})$`, `$(x - ${i})^2$`, `$(x + ${i})^2$`, `$x^2 - ${i}$`, 'A', `$x^2 - ${i*i} = x^2 - ${i}^2 = (x - ${i})(x + ${i})$.`, 'da_thuc');
  }

  // 7. Lập phương
  for (let i = 1; i <= 10; i++) {
    addMCQ(b7, `Khai triển $(x + ${i})^3$ có chứa hạng tử nào sau đây?`, `$3\\cdot x^2 \\cdot ${i}$`, `$x^2 \\cdot ${i}$`, `$3\\cdot x \\cdot ${i}$`, `$x^3 + ${i}$`, 'A', `$(x+a)^3 = x^3 + 3x^2 a + 3x a^2 + a^3$. Hạng tử thứ hai là $3x^2(${i})$.`, 'da_thuc');
  }

  // 8. Tổng hiệu 2 lập phương
  for (let i = 1; i <= 10; i++) {
    addMCQ(b8, `Viết biểu thức $x^3 + ${Math.pow(i, 3)}$ dưới dạng tích ta được:`, `$(x + ${i})(x^2 - ${i}x + ${i*i})$`, `$(x + ${i})(x^2 + ${i}x + ${i*i})$`, `$(x - ${i})(x^2 + ${i}x + ${i*i})$`, `$(x + ${i})^3$`, 'A', `$A^3 + B^3 = (A+B)(A^2 - AB + B^2)$. Thay $A=x, B=${i}$.`, 'da_thuc');
  }

  // 9. Phân tích đa thức thành nhân tử
  for (let i = 1; i <= 10; i++) {
    addMCQ(b9, `Phân tích đa thức $x^2 + ${2*i}x + ${i*i}$ thành nhân tử ta được:`, `$(x + ${i})^2$`, `$(x - ${i})^2$`, `$(x + ${i})(x - ${i})$`, `$x(x + ${2*i}) + ${i*i}$`, 'A', `Đây là hằng đẳng thức bình phương của một tổng: $A^2 + 2AB + B^2 = (A+B)^2$.`, 'da_thuc');
  }

  // 10. Tứ giác
  for (let i = 1; i <= 10; i++) {
    addMCQ(b10, `Tổng các góc trong của một tứ giác luôn bằng:`, `$360^\\circ$`, `$180^\\circ$`, `$540^\\circ$`, `$90^\\circ$`, 'A', `Tổng các góc trong của một tứ giác bất kỳ luôn bằng $360^\\circ$.`, 'hinh_hoc');
  }

  // 11. Hình thang cân
  for (let i = 1; i <= 10; i++) {
    addMCQ(b11, `Trong hình thang cân, hai đường chéo có tính chất gì?`, `Bằng nhau.`, `Vuông góc với nhau.`, `Cắt nhau tại trung điểm mỗi đường.`, `Là các tia phân giác của các góc.`, 'A', `Tính chất đặc trưng của hình thang cân là hai đường chéo bằng nhau.`, 'hinh_hoc');
  }

  // 12. Hình bình hành
  for (let i = 1; i <= 10; i++) {
    addMCQ(b12, `Tứ giác có hai đường chéo cắt nhau tại trung điểm của mỗi đường là hình gì?`, `Hình bình hành.`, `Hình thang cân.`, `Hình thang vuông.`, `Hình diều.`, 'A', `Theo dấu hiệu nhận biết, tứ giác có hai đường chéo cắt nhau tại trung điểm mỗi đường là hình bình hành.`, 'hinh_hoc');
  }

  // 13. Hình chữ nhật
  for (let i = 1; i <= 10; i++) {
    addMCQ(b13, `Hình chữ nhật là tứ giác có:`, `Bốn góc vuông.`, `Bốn cạnh bằng nhau.`, `Hai đường chéo vuông góc.`, `Một góc vuông và bốn cạnh bằng nhau.`, 'A', `Theo định nghĩa, hình chữ nhật là tứ giác có bốn góc vuông.`, 'hinh_hoc');
  }

  // 14. Hình thoi và hình vuông
  for (let i = 1; i <= 10; i++) {
    addMCQ(b14, `Hình thoi có một góc vuông là hình gì?`, `Hình vuông.`, `Hình chữ nhật.`, `Hình bình hành.`, `Hình thang cân.`, 'A', `Theo dấu hiệu nhận biết, hình thoi có một góc vuông là hình vuông.`, 'hinh_hoc');
  }

  console.log(`Bắt đầu nạp ${allQS.length} câu MCQs cho G8 (14 bài đầu)...`);

  for (const q of allQS) {
    const qid = crypto.randomUUID();
    await sql`
      INSERT INTO public.questions (id, category_id, question_code, content, options, correct_answer, solution, difficulty, grade, topic, question_type, user_id, status, is_public)
      VALUES (${qid}, ${q.cat}, ${q.code}, ${q.content}, ${q.options}::jsonb, ${q.correct_answer}, ${q.solution}, 'thong_hieu', ${q.grade}, ${q.topic}, ${q.type}, ${user_id}, 'approved', true)
    `;
  }

  console.log('Thành công! Đã nạp xong 140 câu trắc nghiệm cho 14 bài đầu tiên của Lớp 8.');
}

main().catch(console.error);
