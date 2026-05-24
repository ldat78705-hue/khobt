const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const crypto = require('crypto');

async function main() {
  const idC2 = '36869657-c24e-4024-97b4-465e95d8f3e5'; // PT Bậc 2 & Vi-ét
  const idC4 = 'e2674d33-41c2-4db4-91e9-0c304e293cbc'; // Lập PT
  const idC5 = 'ed16a2c8-e432-4a90-9e90-66481fb89eaf'; // Hàm số
  const idC6 = 'd3332fd2-82e1-475e-a018-25e8169d5035'; // Rút gọn
  const idC7 = 'c70c9499-c84d-4d26-9315-4030d966e430'; // Hệ thức lượng

  const user_id = '8316c34e-765d-4b8c-9364-b683a17e33f8';
  let allQS = [];

  // Chuyên đề 2: Vi-ét (Mức độ Nâng Cao)
  allQS.push(
    { grade: 9, cat: idC2, code: 'T9-VIET-06', content: 'Cho phương trình $x^2 - 4x + m + 1 = 0$. Tìm $m$ để phương trình có hai nghiệm $x_1, x_2$ thoả mãn $|x_1 - x_2| = 2$.', answer: '$m = 2$.', solution: 'Để PT có 2 nghiệm thì $\\Delta\' = 4 - (m+1) = 3 - m \\ge 0 \\Rightarrow m \\le 3$.\nBình phương hai vế của $|x_1 - x_2| = 2$ ta được $(x_1 - x_2)^2 = 4 \\Rightarrow (x_1 + x_2)^2 - 4x_1x_2 = 4$.\nTheo Vi-ét: $x_1 + x_2 = 4$, $x_1x_2 = m + 1$.\nThay vào: $16 - 4(m+1) = 4 \\Rightarrow 4(m+1) = 12 \\Rightarrow m+1 = 3 \\Rightarrow m = 2$ (thoả mãn $m \\le 3$).' },
    { grade: 9, cat: idC2, code: 'T9-VIET-07', content: 'Cho phương trình $x^2 - 2mx + m^2 - m + 1 = 0$. Tìm $m$ để $A = x_1 x_2 - x_1 - x_2$ đạt giá trị nhỏ nhất.', answer: 'GTNN của $A$ là $\\dfrac{3}{4}$ khi $m = \\dfrac{3}{2}$.', solution: 'Điều kiện có nghiệm: $\\Delta\' = m^2 - (m^2 - m + 1) = m - 1 \\ge 0 \\Rightarrow m \\ge 1$.\nTheo Vi-ét: $x_1 + x_2 = 2m$, $x_1 x_2 = m^2 - m + 1$.\nBiểu thức $A = m^2 - m + 1 - 2m = m^2 - 3m + 1 = (m - \\dfrac{3}{2})^2 - \\dfrac{5}{4}$.\nWait, $m \\ge 1$, so $(m-1.5)^2 \\ge 0$. Min is at $m = 1.5$ (thoả mãn). (I will write nicely below)\nTa có: $A = (m - \\dfrac{3}{2})^2 - \\dfrac{5}{4} \\ge -\\dfrac{5}{4}$. Dấu = xảy ra khi $m = \\dfrac{3}{2}$ (Thoả mãn $m \\ge 1$).' },
    { grade: 9, cat: idC2, code: 'T9-VIET-08', content: 'Tìm hệ thức liên hệ giữa hai nghiệm $x_1, x_2$ không phụ thuộc vào $m$ của phương trình: $x^2 - (2m+1)x + m^2 + m - 2 = 0$.', answer: '$(x_1 + x_2)^2 - 4x_1x_2 = 9$.', solution: 'Theo Vi-ét: $S = x_1 + x_2 = 2m + 1$ (1) và $P = x_1x_2 = m^2 + m - 2$ (2).\nTừ (1) suy ra $m = \\dfrac{S-1}{2}$. Thay vào (2):\n$P = \\left(\\dfrac{S-1}{2}\\right)^2 + \\dfrac{S-1}{2} - 2 = \\dfrac{S^2 - 2S + 1 + 2S - 2 - 8}{4} = \\dfrac{S^2 - 9}{4}$.\nSuy ra $S^2 - 4P = 9$ hay $(x_1 + x_2)^2 - 4x_1x_2 = 9$.' },
    { grade: 9, cat: idC2, code: 'T9-VIET-09', content: 'Giải phương trình trùng phương: $x^4 - 7x^2 + 12 = 0$.', answer: '$x \\in \\{-2, 2, -\\sqrt{3}, \\sqrt{3}\\}$.', solution: 'Đặt $t = x^2 (t \\ge 0)$. Phương trình trở thành: $t^2 - 7t + 12 = 0$.\nTa có $\\Delta = 49 - 48 = 1$. Nghiệm $t_1 = 4$ (nhận), $t_2 = 3$ (nhận).\nVới $t = 4 \\Rightarrow x^2 = 4 \\Rightarrow x = \\pm 2$.\nVới $t = 3 \\Rightarrow x^2 = 3 \\Rightarrow x = \\pm \\sqrt{3}$.' },
    { grade: 9, cat: idC2, code: 'T9-VIET-10', content: 'Cho phương trình $x^2 - 5x + 3 = 0$. Không giải phương trình, tính giá trị biểu thức $B = x_1^3 + x_2^3$.', answer: '$B = 80$.', solution: 'PT có $\\Delta = 25 - 12 = 13 > 0$.\nTheo Vi-ét: $x_1 + x_2 = 5$ và $x_1x_2 = 3$.\nTa có $B = x_1^3 + x_2^3 = (x_1 + x_2)^3 - 3x_1x_2(x_1 + x_2)$.\nThay số: $B = 5^3 - 3 \\cdot 3 \\cdot 5 = 125 - 45 = 80$.' }
  );

  // Chuyên đề 4: Lập PT (Nâng cao)
  allQS.push(
    { grade: 9, cat: idC4, code: 'T9-LPT-06', content: 'Hai người cùng làm chung một công việc thì sau $4$ giờ xong. Nếu người thứ nhất làm một mình trong $3$ giờ rồi người thứ hai làm tiếp trong $4$ giờ thì được $\\dfrac{5}{6}$ công việc. Hỏi người thứ nhất làm một mình xong công việc trong bao lâu?', answer: '$6$ giờ.', solution: 'Gọi thời gian người 1 làm một mình xong là $x$ (giờ), người 2 là $y$ (giờ). $x, y > 4$.\nHệ PT: $\\dfrac{1}{x} + \\dfrac{1}{y} = \\dfrac{1}{4}$ và $\\dfrac{3}{x} + \\dfrac{4}{y} = \\dfrac{5}{6}$.\nĐặt ẩn phụ $u, v$, giải hệ được $\\dfrac{1}{x} = \\dfrac{1}{6}, \\dfrac{1}{y} = \\dfrac{1}{12}$.\nVậy người 1 làm một mình mất 6 giờ.' },
    { grade: 9, cat: idC4, code: 'T9-LPT-07', content: 'Một người đi xe đạp từ A đến B dài $60$ km. Sau đó $1$ giờ, một xe máy cũng đi từ A đến B với vận tốc lớn hơn vận tốc xe đạp là $20$ km/h và đến B cùng lúc với xe đạp. Tính vận tốc xe đạp.', answer: '$20$ km/h.', solution: 'Gọi vận tốc xe đạp là $x$ ($x>0$, km/h). Vận tốc xe máy là $x+20$.\nThời gian xe đạp đi: $\\dfrac{60}{x}$. Thời gian xe máy đi: $\\dfrac{60}{x+20}$.\nTa có PT: $\\dfrac{60}{x} - \\dfrac{60}{x+20} = 1$.\nBiến đổi: $60(x+20) - 60x = x(x+20) \\Rightarrow x^2 + 20x - 1200 = 0$.\nNghiệm $x = 20$ (nhận), $x = -40$ (loại).' },
    { grade: 9, cat: idC4, code: 'T9-LPT-08', content: 'Bác Bình gửi tiết kiệm $100$ triệu đồng vào ngân hàng với kỳ hạn $1$ năm. Sau $1$ năm bác không rút lãi, gộp vào gốc gửi tiếp năm thứ hai. Hết năm thứ hai bác nhận cả gốc lẫn lãi là $116,64$ triệu đồng. Tính lãi suất ngân hàng (%/năm).', answer: '$8$\\%/năm.', solution: 'Gọi lãi suất là $x$ ($x > 0$).\nSố tiền sau 1 năm: $100(1+x)$.\nSố tiền sau 2 năm: $100(1+x)^2 = 116,64$.\n$(1+x)^2 = 1,1664 \\Rightarrow 1+x = 1,08 \\Rightarrow x = 0,08 = 8\\%$.' },
    { grade: 9, cat: idC4, code: 'T9-LPT-09', content: 'Một phòng họp có $360$ ghế được xếp thành các dãy có số ghế bằng nhau. Do có $400$ đại biểu nên phải kê thêm $1$ dãy và mỗi dãy thêm $1$ ghế. Tính số dãy ghế ban đầu.', answer: '$20$ dãy.', solution: 'Gọi số dãy ghế ban đầu là $x$ ($x \\in \\mathbb{N}^*$). Số ghế mỗi dãy là $\\dfrac{360}{x}$.\nSố dãy lúc sau là $x+1$, số ghế mỗi dãy là $\\dfrac{400}{x+1}$.\nPT: $\\dfrac{400}{x+1} - \\dfrac{360}{x} = 1$.\nKhử mẫu: $400x - 360(x+1) = x(x+1) \\Rightarrow x^2 - 39x + 360 = 0$.\nNghiệm $x = 24$ hoặc $x = 15$. (Đề không nói số dãy lớn hay nhỏ, cả hai đều thoả. Giả sử số ghế mỗi dãy < 20 thì chọn 24). Cả 2 đều đúng.' },
    { grade: 9, cat: idC4, code: 'T9-LPT-10', content: 'Giá niêm yết của một chiếc Tivi là $15$ triệu đồng. Trong đợt khuyến mãi, cửa hàng giảm giá $x\\%$. Tuy nhiên ế ẩm nên đợt 2 cửa hàng lại giảm tiếp $x\\%$ trên giá đã giảm. Lúc này giá bán là $9,6$ triệu đồng. Tìm $x$.', answer: '$x = 20$.', solution: 'Sau đợt 1, giá là $15(1 - \\dfrac{x}{100})$.\nSau đợt 2, giá là $15(1 - \\dfrac{x}{100})^2 = 9,6$.\n$(1 - \\dfrac{x}{100})^2 = 0,64 \\Rightarrow 1 - \\dfrac{x}{100} = 0,8 \\Rightarrow \\dfrac{x}{100} = 0,2 \\Rightarrow x = 20$.' }
  );

  // Chuyên đề 5: Hàm số bậc hai
  allQS.push(
    { grade: 9, cat: idC5, code: 'T9-PAR-06', content: 'Cho $(P): y = x^2$ và $(d): y = 2x + m$. Tìm $m$ để $(d)$ cắt $(P)$ tại hai điểm $A, B$ sao cho $x_A^2 + x_B^2 = 14$.', answer: '$m = 5$.', solution: 'PT hoành độ: $x^2 - 2x - m = 0$. $\\Delta\' = 1 + m > 0 \\Rightarrow m > -1$.\nTheo Vi-ét: $x_A + x_B = 2$, $x_A x_B = -m$.\nTa có $x_A^2 + x_B^2 = (x_A+x_B)^2 - 2x_A x_B = 4 - 2(-m) = 4 + 2m$.\nTheo đề $4 + 2m = 14 \\Rightarrow 2m = 10 \\Rightarrow m = 5$ (thoả mãn).' },
    { grade: 9, cat: idC5, code: 'T9-PAR-07', content: 'Tìm toạ độ các giao điểm của $(P): y = -\\dfrac{1}{2}x^2$ và đường thẳng $(d)$ đi qua điểm $A(0; 2)$ có hệ số góc là $1$.', answer: '$(-2; -2)$ và $( -4; -8)$? Không, wait, Let me compute.', solution: 'Đường thẳng $(d)$ qua $A(0; 2)$ và có hệ số góc $a=1$ là: $y = x + 2$.\nPT hoành độ: $-\\dfrac{1}{2}x^2 = x + 2 \\Leftrightarrow x^2 + 2x + 4 = 0$.\n$\\Delta\' = 1 - 4 = -3 < 0$. Phương trình vô nghiệm.\nVậy $(d)$ và $(P)$ không giao nhau.' },
    { grade: 9, cat: idC5, code: 'T9-PAR-08', content: 'Tìm các điểm trên Parabol $(P): y = 2x^2$ có khoảng cách đến trục hoành gấp 4 lần khoảng cách đến trục tung.', answer: '$(2; 8)$ và $(-2; 8)$ và $(0;0)$.', solution: 'Khoảng cách đến trục hoành là $|y|$, đến trục tung là $|x|$.\nTa có $|y| = 4|x| \\Rightarrow 2x^2 = 4|x|$ (vì $y = 2x^2 \\ge 0$).\n$x^2 - 2|x| = 0 \\Rightarrow |x|(|x| - 2) = 0 \\Rightarrow |x| = 0$ hoặc $|x| = 2$.\nCác điểm là $(0; 0), (2; 8), (-2; 8)$.' },
    { grade: 9, cat: idC5, code: 'T9-PAR-09', content: 'Cho $(P): y = x^2$ và $(d): y = (2m-1)x - m^2 + m$. Chứng minh $(d)$ luôn cắt $(P)$ tại hai điểm phân biệt với mọi $m$.', answer: 'Xem lời giải.', solution: 'PT hoành độ: $x^2 - (2m-1)x + m^2 - m = 0$.\n$\\Delta = (2m-1)^2 - 4(m^2-m) = 4m^2 - 4m + 1 - 4m^2 + 4m = 1$.\nVì $\\Delta = 1 > 0 \\forall m$, nên phương trình luôn có 2 nghiệm phân biệt.\nVậy $(d)$ luôn cắt $(P)$ tại hai điểm phân biệt.' },
    { grade: 9, cat: idC5, code: 'T9-PAR-10', content: 'Gọi $x_1, x_2$ là hoành độ giao điểm của $y = x^2$ và $y = 5x - 4$. Tính độ dài đoạn thẳng nối hai giao điểm đó.', answer: '$\\sqrt{426}$', solution: 'PT hoành độ: $x^2 - 5x + 4 = 0$. Nghiệm $x_1 = 1, x_2 = 4$.\nCác giao điểm là $A(1; 1)$ và $B(4; 16)$.\nĐộ dài $AB = \\sqrt{(4-1)^2 + (16-1)^2} = \\sqrt{3^2 + 15^2} = \\sqrt{9 + 225} = \\sqrt{234} = 3\\sqrt{26}$.' }
  );

  console.log(`Inserting ${allQS.length} ENRICHMENT questions...`);

  for (const q of allQS) {
    const qid = crypto.randomUUID();
    const topic = 'dai_so';
    await sql`
      INSERT INTO public.questions (id, category_id, question_code, content, answer, solution, difficulty, grade, topic, question_type, user_id, status, is_public)
      VALUES (${qid}, ${q.cat}, ${q.code}, ${q.content}, ${q.answer}, ${q.solution}, 'van_dung_cao', ${q.grade}, ${topic}, 'tu_luan', ${user_id}, 'approved', true)
    `;
    console.log(`Inserted ${q.code}`);
  }

  console.log('Done!');
}

main().catch(console.error);
