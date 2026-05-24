const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const crypto = require('crypto');

async function main() {
  const user_id = '8316c34e-765d-4b8c-9364-b683a17e33f8';
  let allQS = [];

  const addMCQ = (catId, content, optionA, optionB, optionC, optionD, correctKey, solution, topic) => {
    allQS.push({
      cat: catId,
      code: `G9-C34-${crypto.randomBytes(2).toString('hex').toUpperCase()}`,
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

  // ================= BÀI 7. Căn bậc hai và căn thức bậc hai =================
  const b7 = 'd6b4f323-757f-4a92-8720-38ca2f4deba8';
  for (let i = 1; i <= 5; i++) {
    // Điều kiện xác định
    addMCQ(b7, `Điều kiện để $\\sqrt{${i}x - ${i*2}}$ có nghĩa là:`, `$x \\ge 2$`, `$x \\le 2$`, `$x > 2$`, `$x < 2$`, 'A', `Biểu thức $\\sqrt{A}$ có nghĩa khi $A \\ge 0$. Ta có $${i}x - ${i*2} \\ge 0 \\Leftrightarrow ${i}x \\ge ${i*2} \\Leftrightarrow x \\ge 2$.`, 'can_thuc');
    // Hằng đẳng thức
    const a = i+1;
    addMCQ(b7, `Tính giá trị của biểu thức $\\sqrt{(${a} - \\sqrt{${a*a+5}})^2}$.`, `${a} - \\sqrt{${a*a+5}}`, `\\sqrt{${a*a+5}} - ${a}`, `${a} + \\sqrt{${a*a+5}}`, `-\\sqrt{${a*a+5}} - ${a}`, 'B', `Ta có $\\sqrt{A^2} = |A|$. Do $${a} = \\sqrt{${a*a}} < \\sqrt{${a*a+5}}$ nên $${a} - \\sqrt{${a*a+5}} < 0$. Suy ra $\\sqrt{(${a} - \\sqrt{${a*a+5}})^2} = |${a} - \\sqrt{${a*a+5}}| = \\sqrt{${a*a+5}} - ${a}$.`, 'can_thuc');
  }

  // ================= BÀI 8. Khai căn bậc hai với phép nhân và chia =================
  const b8 = '4dd3889a-0416-44a1-8d35-3e18e4a8ab58';
  for (let i = 1; i <= 5; i++) {
    const v1 = i * 2, v2 = i * 8; 
    addMCQ(b8, `Kết quả của phép tính $\\sqrt{${v1}} \\cdot \\sqrt{${v2}}$ là:`, `${Math.sqrt(v1*v2)}`, `${v1*v2}`, `\\sqrt{${v1+v2}}`, `2\\sqrt{${v1*v2}}`, 'A', `Theo quy tắc nhân hai căn thức: $\\sqrt{${v1}} \\cdot \\sqrt{${v2}} = \\sqrt{${v1} \\cdot ${v2}} = \\sqrt{${v1*v2}} = ${Math.sqrt(v1*v2)}$.`, 'can_thuc');
    
    const num = i * 4, den = 25;
    addMCQ(b8, `Rút gọn biểu thức $\\dfrac{\\sqrt{${num}a^2}}{\\sqrt{${den}}}$ (với $a > 0$), ta được:`, `$\\dfrac{${Math.sqrt(num)}a}{5}$`, `$\\dfrac{${Math.sqrt(num)}|a|}{5}$`, `$\\dfrac{${num}a}{25}$`, `$\\dfrac{${Math.sqrt(num)}}{5}$`, 'A', `Ta có $\\dfrac{\\sqrt{${num}a^2}}{\\sqrt{${den}}} = \\sqrt{\\dfrac{${num}a^2}{${den}}} = \\dfrac{\\sqrt{${num}}|a|}{5}$. Vì $a > 0$ nên $|a| = a$. Vậy kết quả là $\\dfrac{${Math.sqrt(num)}a}{5}$.`, 'can_thuc');
  }

  // ================= BÀI 9. Biến đổi đơn giản biểu thức chứa căn =================
  const b9 = '7c1c49ae-9cb0-4fe0-92fb-c18b6fa815f7';
  for (let i = 1; i <= 5; i++) {
    const out = i + 1;
    const inRoot = 3;
    addMCQ(b9, `Đưa thừa số ra ngoài dấu căn của biểu thức $\\sqrt{${out*out * inRoot}}$ ta được:`, `${out}\\sqrt{${inRoot}}`, `${inRoot}\\sqrt{${out}}`, `${out*out}\\sqrt{${inRoot}}`, `${out}\\sqrt{${out*inRoot}}`, 'A', `Ta có $\\sqrt{${out*out * inRoot}} = \\sqrt{${out}^2 \\cdot ${inRoot}} = ${out}\\sqrt{${inRoot}}$.`, 'can_thuc');
    
    addMCQ(b9, `Khử mẫu của biểu thức lấy căn $\\sqrt{\\dfrac{${i}}{${i+1}}}$ ta được:`, `$\\dfrac{\\sqrt{${i*(i+1)}}}{${i+1}}$`, `$\\dfrac{\\sqrt{${i}}}{${i+1}}$`, `$\\dfrac{\\sqrt{${i*(i+1)}}}{${(i+1)*(i+1)}}$`, `$\\dfrac{${i}\\sqrt{${i+1}}}{${i+1}}$`, 'A', `Nhân cả tử và mẫu với ${i+1}: $\\sqrt{\\dfrac{${i}}{${i+1}}} = \\sqrt{\\dfrac{${i} \\cdot ${i+1}}{(${i+1})^2}} = \\dfrac{\\sqrt{${i*(i+1)}}}{${i+1}}$.`, 'can_thuc');
  }

  // ================= BÀI 10. Căn bậc ba =================
  const b10 = '272488a7-d30f-4bc0-9b09-abfaf3636bef';
  for (let i = 1; i <= 5; i++) {
    const val = i + 2;
    addMCQ(b10, `Căn bậc ba của ${val*val*val} là:`, `${val}`, `\\pm ${val}`, `-${val}`, `${val*val}`, 'A', `Vì ${val}^3 = ${val*val*val} nên $\\sqrt[3]{${val*val*val}} = ${val}$. Căn bậc ba của số dương là số dương.`, 'can_thuc');
    
    addMCQ(b10, `Giá trị của biểu thức $\\sqrt[3]{-${i*i*i}} - \\sqrt[3]{${(i+1)*(i+1)*(i+1)}}$ bằng:`, `-${2*i + 1}`, `${2*i + 1}`, `-${1}`, `1`, 'A', `Ta có $\\sqrt[3]{-${i*i*i}} = -${i}$ và $\\sqrt[3]{${(i+1)*(i+1)*(i+1)}} = ${i+1}$. Do đó: $-${i} - ${i+1} = -${2*i+1}$.`, 'can_thuc');
  }

  // ================= BÀI 11. Tỉ số lượng giác góc nhọn =================
  const b11 = 'a36de566-3c04-439f-9997-2f2e0af98edd';
  for (let i = 1; i <= 5; i++) {
    addMCQ(b11, `Cho tam giác $ABC$ vuông tại $A$. Tỉ số lượng giác $\\sin B$ được tính bằng công thức nào?`, `$\\dfrac{AC}{BC}$`, `$\\dfrac{AB}{BC}$`, `$\\dfrac{AC}{AB}$`, `$\\dfrac{AB}{AC}$`, 'A', `Trong tam giác vuông, $\\sin = \\dfrac{\\text{đối}}{\\text{huyền}}$. Góc $B$ có cạnh đối là $AC$, cạnh huyền là $BC$. Do đó $\\sin B = \\dfrac{AC}{BC}$.`, 'luong_giac');
    
    addMCQ(b11, `Khẳng định nào sau đây là ĐÚNG về hệ thức lượng giác cơ bản đối với góc nhọn $\\alpha$?`, `$\\sin^2 \\alpha + \\cos^2 \\alpha = 1$`, `$\\sin^2 \\alpha - \\cos^2 \\alpha = 1$`, `$\\sin \\alpha + \\cos \\alpha = 1$`, `$\\tan \\alpha \\cdot \\cot \\alpha = -1$`, 'A', `Theo định lý Pythagore trong tam giác vuông, ta dễ dàng chứng minh được hệ thức cơ bản $\\sin^2 \\alpha + \\cos^2 \\alpha = 1$.`, 'luong_giac');
  }

  // ================= BÀI 12. Hệ thức giữa cạnh và góc tam giác vuông =================
  const b12 = '9fc7a175-90cf-4a55-808c-60a000bfd400';
  for (let i = 1; i <= 5; i++) {
    addMCQ(b12, `Cho tam giác $ABC$ vuông tại $A$. Khẳng định nào sau đây là ĐÚNG?`, `$b = a \\cdot \\sin B$`, `$b = c \\cdot \\sin B$`, `$b = a \\cdot \\cos B$`, `$b = c \\cdot \\cot C$`, 'A', `Trong tam giác vuông, mỗi cạnh góc vuông bằng cạnh huyền nhân với sin góc đối hoặc côsin góc kề. Do đó $b = a \\cdot \\sin B$ hoặc $b = a \\cdot \\cos C$.`, 'luong_giac');
    
    addMCQ(b12, `Cho tam giác $ABC$ vuông tại $A$, cạnh huyền $BC = ${10 + i}$, góc $\\widehat{C} = 30^\\circ$. Độ dài cạnh $AB$ là:`, `${(10+i)/2}`, `${(10+i)*2}`, `${10+i}\\sqrt{3}`, `\\dfrac{${10+i}\\sqrt{3}}{2}`, 'A', `Trong tam giác vuông, cạnh đối diện với góc $30^\\circ$ bằng nửa cạnh huyền. Do đó $AB = BC \\cdot \\sin 30^\\circ = ${10+i} \\cdot \\dfrac{1}{2} = ${(10+i)/2}$.`, 'luong_giac');
  }

  console.log(`Bắt đầu nạp ${allQS.length} câu MCQs cho G9 C3, C4...`);

  for (const q of allQS) {
    const qid = crypto.randomUUID();
    await sql`
      INSERT INTO public.questions (id, category_id, question_code, content, options, correct_answer, solution, difficulty, grade, topic, question_type, user_id, status, is_public)
      VALUES (${qid}, ${q.cat}, ${q.code}, ${q.content}, ${q.options}::jsonb, ${q.correct_answer}, ${q.solution}, 'thong_hieu', ${q.grade}, ${q.topic}, ${q.type}, ${user_id}, 'approved', true)
    `;
  }

  console.log('Thành công! Đã nạp xong 60 câu trắc nghiệm cho 6 bài thuộc Chương 3 và 4.');
}

main().catch(console.error);
