const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const crypto = require('crypto');

async function main() {
  const idC2 = '36869657-c24e-4024-97b4-465e95d8f3e5'; // PT bậc 2 & Vi-ét
  const idC4 = 'e2674d33-41c2-4db4-91e9-0c304e293cbc'; // Giải toán lập PT
  const idC5 = 'ed16a2c8-e432-4a90-9e90-66481fb89eaf'; // Hàm số bậc hai & Tương giao
  const idC6 = 'd3332fd2-82e1-475e-a018-25e8169d5035'; // Rút gọn biểu thức
  const idC7 = 'c70c9499-c84d-4d26-9315-4030d966e430'; // Hệ thức lượng

  const grade = 9;
  const user_id = '8316c34e-765d-4b8c-9364-b683a17e33f8';
  let allQS = [];

  // Chuyên đề 2. PT Bậc 2 và Vi-ét
  allQS.push(
    { cat: idC2, code: 'T9-VIET-01', content: 'Giải phương trình: $x^2 - 5x + 6 = 0$.', answer: '$x_1 = 2, x_2 = 3$.', solution: 'Ta có $\\Delta = (-5)^2 - 4 \\cdot 1 \\cdot 6 = 25 - 24 = 1 > 0$.\nPhương trình có 2 nghiệm phân biệt:\n$x_1 = \\dfrac{5 + 1}{2} = 3$\n$x_2 = \\dfrac{5 - 1}{2} = 2$.' },
    { cat: idC2, code: 'T9-VIET-02', content: 'Cho phương trình $x^2 - 2mx + m^2 - 1 = 0$. Tìm $m$ để phương trình có hai nghiệm phân biệt.', answer: 'Với mọi $m$.', solution: 'Ta có $\\Delta\' = (-m)^2 - (m^2 - 1) = m^2 - m^2 + 1 = 1 > 0$ với mọi $m$.\nVậy phương trình luôn có hai nghiệm phân biệt với mọi $m$.' },
    { cat: idC2, code: 'T9-VIET-03', content: 'Cho phương trình $x^2 - 7x + 10 = 0$. Không giải phương trình, tính giá trị của biểu thức $A = x_1^2 + x_2^2$.', answer: '$A = 29$.', solution: 'Phương trình có $\\Delta = 49 - 40 = 9 > 0$.\nTheo hệ thức Vi-ét: $x_1 + x_2 = 7$ và $x_1 x_2 = 10$.\nTa có: $A = x_1^2 + x_2^2 = (x_1 + x_2)^2 - 2x_1x_2 = 7^2 - 2 \\cdot 10 = 49 - 20 = 29$.' },
    { cat: idC2, code: 'T9-VIET-04', content: 'Tìm $m$ để phương trình $x^2 - 2(m+1)x + 2m = 0$ có hai nghiệm $x_1, x_2$ thoả mãn $x_1^2 + x_2^2 = 4$.', answer: '$m = 0$.', solution: '$\\Delta\' = (m+1)^2 - 2m = m^2 + 1 > 0 \\forall m$.\nTheo Vi-ét: $x_1 + x_2 = 2(m+1)$, $x_1x_2 = 2m$.\n$x_1^2 + x_2^2 = (x_1+x_2)^2 - 2x_1x_2 = 4(m+1)^2 - 4m = 4m^2 + 4m + 4$.\nTheo đề bài: $4m^2 + 4m + 4 = 4 \\Rightarrow 4m(m+1) = 0 \\Rightarrow m = 0$ hoặc $m = -1$.\nVậy $m \\in \\{0; -1\\}$.' },
    { cat: idC2, code: 'T9-VIET-05', content: 'Lập phương trình bậc hai có hai nghiệm là $2 + \\sqrt{3}$ và $2 - \\sqrt{3}$.', answer: '$x^2 - 4x + 1 = 0$.', solution: 'Gọi hai nghiệm là $x_1$ và $x_2$.\nTổng hai nghiệm: $S = x_1 + x_2 = 2 + \\sqrt{3} + 2 - \\sqrt{3} = 4$.\nTích hai nghiệm: $P = x_1 x_2 = (2 + \\sqrt{3})(2 - \\sqrt{3}) = 4 - 3 = 1$.\nHai số $x_1, x_2$ là nghiệm của phương trình $X^2 - SX + P = 0$.\nVậy phương trình là $X^2 - 4X + 1 = 0$.' }
  );

  // Chuyên đề 4. Giải bài toán bằng cách lập PT
  allQS.push(
    { cat: idC4, code: 'T9-LPT-01', content: 'Một xưởng phải may $3000$ bộ quần áo trong thời gian quy định. Mỗi ngày xưởng may nhiều hơn kế hoạch $30$ bộ nên hoàn thành trước $5$ ngày. Hỏi theo kế hoạch mỗi ngày phải may bao nhiêu bộ?', answer: '$120$ bộ.', solution: 'Gọi số bộ may mỗi ngày theo kế hoạch là $x$ ($x > 0$).\nThời gian quy định: $\\dfrac{3000}{x}$ (ngày).\nThực tế mỗi ngày may: $x + 30$ (bộ).\nThời gian thực tế: $\\dfrac{3000}{x + 30}$ (ngày).\nTa có PT: $\\dfrac{3000}{x} - \\dfrac{3000}{x + 30} = 5$.\nGiải PT ta được $x = 120$ (thoả mãn) hoặc $x = -150$ (loại).' },
    { cat: idC4, code: 'T9-LPT-02', content: 'Một ca nô xuôi dòng $40$ km và ngược dòng $40$ km hết tổng cộng $4$ giờ $30$ phút. Biết vận tốc dòng nước là $2$ km/h. Tính vận tốc riêng của ca nô.', answer: '$18$ km/h.', solution: 'Đổi $4$ giờ $30$ phút = $4,5$ giờ.\nGọi vận tốc riêng của ca nô là $x$ ($x > 2$, km/h).\nVận tốc xuôi dòng: $x + 2$, ngược dòng: $x - 2$.\nTa có PT: $\\dfrac{40}{x+2} + \\dfrac{40}{x-2} = 4,5$.\nGiải PT ta được $x = 18$ hoặc $x = -\\dfrac{2}{9}$ (loại).' },
    { cat: idC4, code: 'T9-LPT-03', content: 'Hai vòi nước cùng chảy vào 1 bể thì sau $6$ giờ đầy bể. Nếu vòi 1 chảy một mình trong $2$ giờ, vòi 2 chảy một mình trong $3$ giờ thì được $\\dfrac{2}{5}$ bể. Hỏi vòi 1 chảy một mình bao lâu đầy bể?', answer: '$10$ giờ.', solution: 'Gọi thời gian vòi 1, vòi 2 chảy một mình đầy bể là $x, y$ ($x, y > 6$, giờ).\nMỗi giờ vòi 1 chảy $\\dfrac{1}{x}$ bể, vòi 2 chảy $\\dfrac{1}{y}$ bể.\nTa có hệ PT: $\\begin{cases} \\dfrac{1}{x} + \\dfrac{1}{y} = \\dfrac{1}{6} \\\\ \\dfrac{2}{x} + \\dfrac{3}{y} = \\dfrac{2}{5} \\end{cases}$\nGiải ra $\\dfrac{1}{x} = \\dfrac{1}{10}, \\dfrac{1}{y} = \\dfrac{1}{15}$.\nVậy vòi 1 chảy một mình hết $10$ giờ.' },
    { cat: idC4, code: 'T9-LPT-04', content: 'Một mảnh đất hình chữ nhật có diện tích $240 \\text{ m}^2$. Nếu tăng chiều rộng $3$m và giảm chiều dài $4$m thì diện tích không đổi. Tính kích thước ban đầu.', answer: 'Dài $20$m, rộng $12$m.', solution: 'Gọi chiều rộng là $x$ (m) ($x > 0$), chiều dài là $\\dfrac{240}{x}$ (m).\nKích thước mới: rộng $x + 3$, dài $\\dfrac{240}{x} - 4$.\nTa có PT: $(x + 3)\\left(\\dfrac{240}{x} - 4\\right) = 240$.\nGiải PT được $x = 12$. Chiều dài: $20$m.' },
    { cat: idC4, code: 'T9-LPT-05', content: 'Theo kế hoạch một đội xe cần chở $120$ tấn hàng. Lúc khởi hành có $2$ xe bị hỏng nên mỗi xe còn lại phải chở thêm $3$ tấn. Hỏi lúc đầu đội có bao nhiêu xe?', answer: '$10$ xe.', solution: 'Gọi số xe lúc đầu là $x$ ($x > 2, x \\in \\mathbb{N}^*$).\nMỗi xe dự định chở: $\\dfrac{120}{x}$ (tấn).\nThực tế số xe là $x - 2$, mỗi xe chở: $\\dfrac{120}{x - 2}$ (tấn).\nPT: $\\dfrac{120}{x - 2} - \\dfrac{120}{x} = 3$.\nGiải PT được $x = 10$ hoặc $x = -8$ (loại).' }
  );

  // Chuyên đề 5. Hàm số bậc hai & Tương giao
  allQS.push(
    { cat: idC5, code: 'T9-PAR-01', content: 'Tìm toạ độ giao điểm của parabol $(P): y = x^2$ và đường thẳng $(d): y = 2x + 3$.', answer: '$(-1; 1)$ và $(3; 9)$.', solution: 'Phương trình hoành độ giao điểm:\n$x^2 = 2x + 3 \\Leftrightarrow x^2 - 2x - 3 = 0$.\nPhương trình có $a - b + c = 1 - (-2) - 3 = 0$ nên có 2 nghiệm $x_1 = -1, x_2 = 3$.\nVới $x = -1 \\Rightarrow y = 1$.\nVới $x = 3 \\Rightarrow y = 9$.\nVậy giao điểm là $(-1; 1)$ và $(3; 9)$.' },
    { cat: idC5, code: 'T9-PAR-02', content: 'Cho parabol $(P): y = \\dfrac{1}{2}x^2$ và đường thẳng $(d): y = x + m$. Tìm $m$ để $(d)$ tiếp xúc $(P)$.', answer: '$m = -\\dfrac{1}{2}$.', solution: 'Phương trình hoành độ giao điểm: $\\dfrac{1}{2}x^2 - x - m = 0 \\Leftrightarrow x^2 - 2x - 2m = 0$.\nĐể $(d)$ tiếp xúc $(P)$ thì $\\Delta\' = 0$.\n$\\Delta\' = (-1)^2 - 1(-2m) = 1 + 2m = 0 \\Rightarrow m = -\\dfrac{1}{2}$.' },
    { cat: idC5, code: 'T9-PAR-03', content: 'Cho parabol $(P): y = x^2$. Tìm điểm $M$ thuộc $(P)$ có hoành độ bằng $2$.', answer: '$M(2; 4)$.', solution: 'Điểm $M$ thuộc $(P)$ và có hoành độ $x = 2$.\nThay $x = 2$ vào hàm số $y = x^2$, ta được $y = 2^2 = 4$.\nVậy toạ độ điểm $M$ là $(2; 4)$.' },
    { cat: idC5, code: 'T9-PAR-04', content: 'Tìm $m$ để $(d): y = mx - 1$ cắt $(P): y = -x^2$ tại hai điểm phân biệt.', answer: 'Với mọi $m \\in \\mathbb{R}$.', solution: 'Phương trình hoành độ giao điểm:\n$-x^2 = mx - 1 \\Leftrightarrow x^2 + mx - 1 = 0$.\nTa có $\\Delta = m^2 - 4(1)(-1) = m^2 + 4 > 0 \\forall m$.\nVậy $(d)$ luôn cắt $(P)$ tại hai điểm phân biệt với mọi $m$.' },
    { cat: idC5, code: 'T9-PAR-05', content: 'Đường thẳng $y = 2x + b$ đi qua điểm $A(1; 5)$ và cắt Parabol $y = ax^2$ tại điểm có hoành độ là $2$. Tìm $a, b$.', answer: '$b = 3, a = \\dfrac{7}{4}$.', solution: 'Vì $y = 2x + b$ đi qua $A(1; 5) \\Rightarrow 5 = 2(1) + b \\Rightarrow b = 3$.\nĐường thẳng là $y = 2x + 3$.\nGiao điểm có hoành độ $x = 2 \\Rightarrow y = 2(2) + 3 = 7$. Điểm cắt là $(2; 7)$.\nĐiểm $(2; 7)$ thuộc Parabol $y = ax^2 \\Rightarrow 7 = a(2^2) \\Rightarrow a = \\dfrac{7}{4}$.' }
  );

  // Chuyên đề 6. Rút gọn biểu thức
  allQS.push(
    { cat: idC6, code: 'T9-RUT-01', content: 'Rút gọn biểu thức: $A = \\sqrt{12} - 2\\sqrt{27} + \\sqrt{75}$.', answer: '$A = \\sqrt{3}$.', solution: 'Ta có:\n$\\sqrt{12} = \\sqrt{4 \\cdot 3} = 2\\sqrt{3}$.\n$2\\sqrt{27} = 2\\sqrt{9 \\cdot 3} = 6\\sqrt{3}$.\n$\\sqrt{75} = \\sqrt{25 \\cdot 3} = 5\\sqrt{3}$.\nThay vào biểu thức: $A = 2\\sqrt{3} - 6\\sqrt{3} + 5\\sqrt{3} = \\sqrt{3}$.' },
    { cat: idC6, code: 'T9-RUT-02', content: 'Trục căn thức ở mẫu: $\\dfrac{4}{\\sqrt{5} - 1}$.', answer: '$\\sqrt{5} + 1$.', solution: 'Nhân cả tử và mẫu với biểu thức liên hợp $\\sqrt{5} + 1$:\n$\\dfrac{4(\\sqrt{5} + 1)}{(\\sqrt{5} - 1)(\\sqrt{5} + 1)} = \\dfrac{4(\\sqrt{5} + 1)}{5 - 1} = \\dfrac{4(\\sqrt{5} + 1)}{4} = \\sqrt{5} + 1$.' },
    { cat: idC6, code: 'T9-RUT-03', content: 'Cho biểu thức $P = \\left(\\dfrac{1}{\\sqrt{x}-1} - \\dfrac{1}{\\sqrt{x}+1}\\right) : \\dfrac{2}{x-1}$ (với $x \\ge 0, x \\neq 1$). Rút gọn $P$.', answer: '$P = 1$.', solution: 'Biến đổi trong ngoặc trước:\n$\\dfrac{\\sqrt{x}+1 - (\\sqrt{x}-1)}{(\\sqrt{x}-1)(\\sqrt{x}+1)} = \\dfrac{2}{x-1}$.\nDo đó $P = \\dfrac{2}{x-1} : \\dfrac{2}{x-1} = 1$.' },
    { cat: idC6, code: 'T9-RUT-04', content: 'Tìm $x$ để biểu thức $\\sqrt{2x - 4}$ có nghĩa.', answer: '$x \\ge 2$.', solution: 'Căn thức bậc hai có nghĩa khi biểu thức dưới dấu căn không âm:\n$2x - 4 \\ge 0 \\Leftrightarrow 2x \\ge 4 \\Leftrightarrow x \\ge 2$.' },
    { cat: idC6, code: 'T9-RUT-05', content: 'Rút gọn: $\\sqrt{(2 - \\sqrt{5})^2} + \\sqrt{5}$.', answer: '$2$.', solution: 'Ta có $\\sqrt{(2 - \\sqrt{5})^2} = |2 - \\sqrt{5}|$.\nVì $\\sqrt{4} < \\sqrt{5}$ nên $2 < \\sqrt{5} \\Rightarrow 2 - \\sqrt{5} < 0$.\nNên $|2 - \\sqrt{5}| = \\sqrt{5} - 2$.\nBiểu thức $= \\sqrt{5} - 2 + \\sqrt{5} = 2\\sqrt{5} - 2$. (Wait, my answer says 2 but math is $2\\sqrt{5}-2$, let me fix solution) \nAh, let\'s change to $\\sqrt{( \\sqrt{5}-2 )^2 } = \\sqrt{5}-2$, so expression is $\\sqrt{5}-2 - \\sqrt{5} = -2$? No, I\'ll rewrite content.' } // Will adjust on insertion
  );
  allQS[allQS.length - 1].content = 'Rút gọn: $\\sqrt{(\\sqrt{5} - 2)^2} - \\sqrt{5}$.';
  allQS[allQS.length - 1].answer = '$-2$.';
  allQS[allQS.length - 1].solution = 'Ta có $\\sqrt{(\\sqrt{5} - 2)^2} = |\\sqrt{5} - 2|$.\nVì $\\sqrt{5} > \\sqrt{4} = 2$ nên $\\sqrt{5} - 2 > 0 \\Rightarrow |\\sqrt{5} - 2| = \\sqrt{5} - 2$.\nBiểu thức $= \\sqrt{5} - 2 - \\sqrt{5} = -2$.';

  // Chuyên đề 7. Hệ thức lượng
  allQS.push(
    { cat: idC7, code: 'T9-HTL-01', content: 'Cho tam giác $ABC$ vuông tại $A$, đường cao $AH$. Biết $AB = 6$ cm, $AC = 8$ cm. Tính độ dài $AH$.', answer: '$AH = 4,8$ cm.', solution: 'Tính $BC$ theo Pythagore: $BC = \\sqrt{6^2 + 8^2} = 10$ (cm).\nÁp dụng hệ thức lượng: $AB \\cdot AC = BC \\cdot AH$\n$6 \\times 8 = 10 \\times AH \\Rightarrow AH = 4,8$ (cm).' },
    { cat: idC7, code: 'T9-HTL-02', content: 'Cho tam giác $ABC$ vuông tại $A$, đường cao $AH$. Biết hình chiếu $BH = 4$ cm, $CH = 9$ cm. Tính đường cao $AH$.', answer: '$AH = 6$ cm.', solution: 'Áp dụng hệ thức lượng liên quan đến đường cao và hình chiếu:\n$AH^2 = BH \\cdot CH$\n$AH^2 = 4 \\times 9 = 36$\n$AH = \\sqrt{36} = 6$ (cm).' },
    { cat: idC7, code: 'T9-HTL-03', content: 'Một cột đèn cao $7$ m có bóng trên mặt đất dài $4$ m. Tính góc tạo bởi tia sáng mặt trời và mặt đất (làm tròn đến phút).', answer: '$60^\\circ 15\'$.', solution: 'Cột đèn và bóng của nó tạo thành 2 cạnh góc vuông của một tam giác vuông.\nGọi $\\alpha$ là góc tia sáng tạo với mặt đất.\nTa có $\\tan \\alpha = \\dfrac{\\text{Đối}}{\\text{Kề}} = \\dfrac{7}{4} = 1,75$.\nBấm máy tính: $\\alpha \\approx 60^\\circ 15\'$.' },
    { cat: idC7, code: 'T9-HTL-04', content: 'Cho tam giác $ABC$ vuông tại $A$, $\\widehat{B} = 30^\\circ$, cạnh huyền $BC = 10$ cm. Tính độ dài cạnh $AC$.', answer: '$AC = 5$ cm.', solution: 'Áp dụng tỉ số lượng giác của góc nhọn trong tam giác vuông:\n$\\sin B = \\dfrac{AC}{BC} \\Rightarrow \\sin 30^\\circ = \\dfrac{AC}{10}$\n$\\dfrac{1}{2} = \\dfrac{AC}{10} \\Rightarrow AC = 5$ (cm).' },
    { cat: idC7, code: 'T9-HTL-05', content: 'Cho tam giác $ABC$ vuông tại $A$, biết $\\tan B = \\dfrac{3}{4}$ và $AC = 6$ cm. Tính $AB$.', answer: '$AB = 8$ cm.', solution: 'Theo định nghĩa tỉ số lượng giác:\n$\\tan B = \\dfrac{\\text{Đối}}{\\text{Kề}} = \\dfrac{AC}{AB}$\n$\\dfrac{3}{4} = \\dfrac{6}{AB} \\Rightarrow AB = \\dfrac{6 \\times 4}{3} = 8$ (cm).' }
  );

  console.log(`Inserting ${allQS.length} new questions for Grade 9...`);

  for (const q of allQS) {
    if (!q.cat) continue;
    const qid = crypto.randomUUID();
    await sql`
      INSERT INTO public.questions (id, category_id, question_code, content, answer, solution, difficulty, grade, topic, question_type, user_id, status, is_public)
      VALUES (${qid}, ${q.cat}, ${q.code}, ${q.content}, ${q.answer}, ${q.solution}, 'van_dung', ${grade}, 'dai_so', 'tu_luan', ${user_id}, 'approved', true)
    `;
    console.log(`Inserted ${q.code}`);
  }

  console.log('Done!');
}

main().catch(console.error);
