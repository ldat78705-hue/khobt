const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const crypto = require('crypto');

async function main() {
  const idTK = '69b77502-8f71-4e46-9a39-7cd72b70238d'; // Thống kê
  const idXS = '38848e04-da93-4c2b-bd9a-9adb246ad5ed'; // Xác suất
  const idKhoi = '0cb8da64-8b0c-4858-abdd-8a388f332f3e'; // Nón - Trụ - Cầu
  const idThucTe = '076fa54f-08ac-4368-a200-9d2c53e066ab'; // Toán thực tế cực trị

  const user_id = '8316c34e-765d-4b8c-9364-b683a17e33f8';
  let allQS = [];

  // Chuyên đề 8: Thống kê (Vận dụng cao)
  allQS.push(
    { grade: 9, cat: idTK, code: 'T9-TK-06', content: 'Điểm kiểm tra của hai xạ thủ A và B bắn 5 viên đạn lần lượt là: A(8, 9, 10, 9, 9) và B(10, 7, 10, 8, 10). Hỏi xạ thủ nào có phong độ bắn ổn định hơn? (Dùng phương sai để giải thích).', answer: 'Xạ thủ A ổn định hơn.', solution: 'Điểm trung bình của A: $\\bar{x}_A = (8+9+10+9+9)/5 = 9$.\nĐiểm trung bình của B: $\\bar{x}_B = (10+7+10+8+10)/5 = 9$.\nHai người có cùng điểm trung bình. Ta xét phương sai:\n$s_A^2 = \\dfrac{(8-9)^2 + 3(9-9)^2 + (10-9)^2}{5} = \\dfrac{1 + 0 + 1}{5} = 0,4$.\n$s_B^2 = \\dfrac{(7-9)^2 + (8-9)^2 + 3(10-9)^2}{5} = \\dfrac{4 + 1 + 3}{5} = 1,6$.\nVì $s_A^2 < s_B^2$ nên độ phân tán điểm của A nhỏ hơn. Xạ thủ A ổn định hơn.' },
    { grade: 9, cat: idTK, code: 'T9-TK-07', content: 'Một lớp có 40 học sinh. Trong một biểu đồ hình quạt tròn biểu diễn môn thể thao yêu thích, hình quạt biểu diễn môn Bóng đá có góc ở tâm là $126^\\circ$. Hỏi có bao nhiêu học sinh thích Bóng đá?', answer: '$14$ học sinh.', solution: 'Cả đường tròn có góc ở tâm là $360^\\circ$ tương ứng với 40 học sinh (100%).\nTỉ lệ học sinh thích Bóng đá là: $\\dfrac{126}{360} = \\dfrac{7}{20}$ (chiếm $35\\%$).\nSố học sinh thích Bóng đá là: $40 \\times \\dfrac{7}{20} = 14$ (học sinh).' },
    { grade: 9, cat: idTK, code: 'T9-TK-08', content: 'Trung bình cộng của một dãy gồm 5 số tự nhiên liên tiếp là 20. Tính số lớn nhất trong dãy đó.', answer: '$22$.', solution: 'Gọi 5 số tự nhiên liên tiếp là $x-2, x-1, x, x+1, x+2$.\nTrung bình cộng của chúng là: $\\dfrac{x-2+x-1+x+x+1+x+2}{5} = \\dfrac{5x}{5} = x$.\nTheo đề bài, trung bình cộng bằng 20 $\\Rightarrow x = 20$.\nSố lớn nhất trong dãy là $x + 2 = 22$.' },
    { grade: 9, cat: idTK, code: 'T9-TK-09', content: 'Bảng tần số bị khuyết một chỗ: Giá trị(x): 5, 7, 8, 10. Tần số(n): 2, 4, $m$, 1. Biết số trung bình của dấu hiệu là 7,4. Tìm tần số $m$.', answer: '$m = 3$.', solution: 'Tổng số tần số $N = 2 + 4 + m + 1 = 7 + m$.\nTổng các tích: $5 \\times 2 + 7 \\times 4 + 8 \\times m + 10 \\times 1 = 10 + 28 + 8m + 10 = 48 + 8m$.\nSố trung bình: $\\dfrac{48 + 8m}{7 + m} = 7,4$.\nSuy ra: $48 + 8m = 7,4(7 + m) \\Rightarrow 48 + 8m = 51,8 + 7,4m$.\n$0,6m = 3,8 \\Rightarrow m = \\dfrac{38}{6}$ (không nguyên, vô lý, vậy đề bị lỗi số? Đợi đã, 7.4*7 = 51.8. 51.8-48 = 3.8. 3.8/0.6 = 6.33. Vậy đề tôi ra chưa chuẩn. Đổi đề: trung bình là 7,5). (Let me recompute: $\\dfrac{48+8m}{7+m} = 7,5 \\Rightarrow 48+8m = 52,5 + 7,5m \\Rightarrow 0,5m = 4,5 \\Rightarrow m = 9$). I will modify it directly inside the data push.' },
    { grade: 9, cat: idTK, code: 'T9-TK-10', content: 'Điểm tổng kết các môn học của Lan là: 8,0; 8,5; 9,0; 7,5; 8,5. Lan cần môn học cuối cùng đạt ít nhất bao nhiêu điểm để điểm trung bình 6 môn đạt loại Giỏi (từ 8,5 trở lên)?', answer: 'Ít nhất $9,5$ điểm.', solution: 'Gọi điểm môn cuối cùng là $x$.\nTổng điểm 6 môn: $8,0 + 8,5 + 9,0 + 7,5 + 8,5 + x = 41,5 + x$.\nTrung bình: $\\dfrac{41,5 + x}{6} \\ge 8,5$.\n$41,5 + x \\ge 51 \\Rightarrow x \\ge 51 - 41,5 = 9,5$.\nVậy Lan cần đạt ít nhất $9,5$ điểm.' }
  );
  // Correcting T9-TK-09:
  allQS[allQS.length - 2].content = 'Bảng tần số bị khuyết: Giá trị(x): 5, 7, 8, 10. Tần số(n): 2, 4, $m$, 1. Biết số trung bình cộng là $7,5$. Tìm tần số $m$.';
  allQS[allQS.length - 2].answer = '$m = 9$.';
  allQS[allQS.length - 2].solution = 'Tổng tần số $N = 7 + m$.\nTổng các giá trị là: $5 \\times 2 + 7 \\times 4 + 8m + 10 = 48 + 8m$.\nSố trung bình: $\\dfrac{48 + 8m}{7 + m} = 7,5$.\n$48 + 8m = 7,5(7 + m) \\Rightarrow 48 + 8m = 52,5 + 7,5m$.\n$0,5m = 4,5 \\Rightarrow m = 9$.';

  // Chuyên đề 9: Xác suất (Vận dụng cao)
  allQS.push(
    { grade: 9, cat: idXS, code: 'T9-XS-06', content: 'Gieo đồng thời hai con xúc xắc cân đối. Tính xác suất để tổng số chấm trên hai mặt xuất hiện bằng 7.', answer: '$\\dfrac{1}{6}$.', solution: 'Không gian mẫu có $6 \\times 6 = 36$ kết quả.\nCác kết quả có tổng bằng 7 là: $(1;6), (6;1), (2;5), (5;2), (3;4), (4;3)$. Có 6 kết quả thuận lợi.\nXác suất là $P = \\dfrac{6}{36} = \\dfrac{1}{6}$.' },
    { grade: 9, cat: idXS, code: 'T9-XS-07', content: 'Gieo đồng thời 3 đồng xu cân đối. Tính xác suất để có đúng 2 đồng xu xuất hiện mặt sấp.', answer: '$\\dfrac{3}{8}$.', solution: 'Không gian mẫu: $2 \\times 2 \\times 2 = 8$ kết quả: $\\{SSS, SSN, SNS, SNN, NSS, NSN, NNS, NNN\\}$.\nBiến cố "đúng 2 mặt Sấp" gồm: $\\{SSN, SNS, NSS\\}$ (3 kết quả).\nXác suất là $P = \\dfrac{3}{8}$.' },
    { grade: 9, cat: idXS, code: 'T9-XS-08', content: 'Một hộp đựng 4 viên bi xanh và 3 viên bi đỏ. Lấy lần lượt hai viên bi từ hộp và KHÔNG hoàn lại. Tính xác suất để lấy được hai viên bi đều là bi đỏ.', answer: '$\\dfrac{1}{7}$.', solution: 'Lần 1 lấy bi đỏ: Có 3 bi đỏ trong tổng số 7 bi $\\Rightarrow$ Xác suất $P_1 = \\dfrac{3}{7}$.\nVì không hoàn lại, hộp còn 6 bi, trong đó có 2 bi đỏ. Lần 2 lấy bi đỏ: $P_2 = \\dfrac{2}{6} = \\dfrac{1}{3}$.\nXác suất lấy 2 bi đỏ liên tiếp là: $P = P_1 \\times P_2 = \\dfrac{3}{7} \\times \\dfrac{1}{3} = \\dfrac{1}{7}$.' },
    { grade: 9, cat: idXS, code: 'T9-XS-09', content: 'Trò chơi Vòng quay may mắn có một vòng tròn chia làm 12 cung bằng nhau, được đánh số từ 1 đến 12. Xác suất quay vào cung nào cũng như nhau. Tính xác suất để mũi tên chỉ vào số nguyên tố.', answer: '$\\dfrac{5}{12}$.', solution: 'Các số trên vòng quay là từ 1 đến 12 (12 kết quả có thể).\nCác số nguyên tố trong phạm vi này là: $2, 3, 5, 7, 11$. Có 5 số.\nXác suất là $P = \\dfrac{5}{12}$.' },
    { grade: 9, cat: idXS, code: 'T9-XS-10', content: 'Một người tung một đồng xu 100 lần thì thấy có 45 lần mặt ngửa. Hãy ước lượng xác suất thực nghiệm của sự kiện "mặt sấp xuất hiện" và so sánh với xác suất lí thuyết.', answer: '$0,55$.', solution: 'Số lần mặt sấp xuất hiện là: $100 - 45 = 55$ (lần).\nXác suất thực nghiệm ra mặt sấp là: $\\dfrac{55}{100} = 0,55 = 55\\%$.\nXác suất lí thuyết khi tung đồng xu cân đối là $50\\%$. Xác suất thực nghiệm lớn hơn lí thuyết một chút do tính ngẫu nhiên của thí nghiệm.' }
  );

  // Chuyên đề 10: Nón - Trụ - Cầu (Vận dụng cao)
  allQS.push(
    { grade: 9, cat: idKhoi, code: 'T9-KHOI-06', content: 'Thiết diện qua trục của một hình trụ là một hình vuông có cạnh bằng $8$ cm. Tính diện tích toàn phần của hình trụ đó.', answer: '$96\\pi \\text{ cm}^2$.', solution: 'Thiết diện qua trục là hình vuông cạnh 8cm nên chiều cao hình trụ $h = 8$ cm, và đường kính đáy $2r = 8$ cm $\\Rightarrow r = 4$ cm.\nDiện tích xung quanh: $S_{xq} = 2\\pi r h = 2\\pi(4)(8) = 64\\pi$ ($\\text{cm}^2$).\nDiện tích hai đáy: $S_{\\text{đáy}} = 2\\pi r^2 = 2\\pi(4^2) = 32\\pi$ ($\\text{cm}^2$).\nDiện tích toàn phần: $S_{tp} = 64\\pi + 32\\pi = 96\\pi$ ($\\text{cm}^2$).' },
    { grade: 9, cat: idKhoi, code: 'T9-KHOI-07', content: 'Cho tam giác $ABC$ vuông tại $A$, $AB = 3$ cm, $AC = 4$ cm. Quay tam giác này một vòng quanh cạnh góc vuông $AB$, ta được một hình nón. Tính thể tích hình nón sinh ra.', answer: '$16\\pi \\text{ cm}^3$.', solution: 'Khi quay quanh trục $AB$, ta được hình nón có chiều cao $h = AB = 3$ cm, bán kính đáy $r = AC = 4$ cm.\nThể tích hình nón: $V = \\dfrac{1}{3}\\pi r^2 h = \\dfrac{1}{3}\\pi (4^2)(3) = 16\\pi$ ($\\text{cm}^3$).' },
    { grade: 9, cat: idKhoi, code: 'T9-KHOI-08', content: 'Một xí nghiệp cần làm $100$ chiếc nón lá dạng hình nón. Biết bán kính đáy nón là $20$ cm, đường sinh là $30$ cm. Tính tổng diện tích lá cần dùng (Bỏ qua mép nối, lấy $\\pi \\approx 3,14$).', answer: '$18,84 \\text{ m}^2$.', solution: 'Diện tích lá cho 1 chiếc nón là diện tích xung quanh hình nón: $S_{xq} = \\pi r l$.\n$S_{xq} = 3,14 \\times 20 \\times 30 = 1884$ ($\\text{cm}^2$).\nDiện tích cho 100 chiếc: $1884 \\times 100 = 188400$ ($\\text{cm}^2$).\nĐổi ra mét vuông: $188400 \\text{ cm}^2 = 18,84$ ($\\text{m}^2$).' },
    { grade: 9, cat: idKhoi, code: 'T9-KHOI-09', content: 'Một quả bóng rổ có thể tích là $288\\pi \\text{ cm}^3$. Tính diện tích bề mặt da của quả bóng rổ đó.', answer: '$144\\pi \\text{ cm}^2$.', solution: 'Quả bóng rổ là hình cầu. Thể tích $V = \\dfrac{4}{3}\\pi r^3 = 288\\pi$.\n$\\Rightarrow r^3 = \\dfrac{288 \\times 3}{4} = 216 \\Rightarrow r = 6$ (cm).\nDiện tích mặt cầu (bề mặt quả bóng): $S = 4\\pi r^2 = 4\\pi \\times 6^2 = 4\\pi \\times 36 = 144\\pi$ ($\\text{cm}^2$).' },
    { grade: 9, cat: idKhoi, code: 'T9-KHOI-10', content: 'Một chi tiết máy gồm một hình trụ và một nửa hình cầu úp ở trên. Bán kính đáy hình trụ là $3$ cm, chiều cao trụ là $5$ cm. Tính thể tích tổng thể của chi tiết máy.', answer: '$63\\pi \\text{ cm}^3$.', solution: 'Thể tích phần hình trụ: $V_1 = \\pi r^2 h = \\pi(3^2)(5) = 45\\pi$ ($\\text{cm}^3$).\nThể tích nửa hình cầu bán kính $r = 3$ là: $V_2 = \\dfrac{1}{2} \\left(\\dfrac{4}{3}\\pi r^3\\right) = \\dfrac{2}{3}\\pi(3^3) = 18\\pi$ ($\\text{cm}^3$).\nThể tích tổng: $V = 45\\pi + 18\\pi = 63\\pi$ ($\\text{cm}^3$).' }
  );

  // Chuyên đề 13: Thực tế cực trị (Vận dụng cao)
  allQS.push(
    { grade: 9, cat: idThucTe, code: 'T9-TTC-06', content: 'Bác Ba muốn rào một mảnh vườn hình chữ nhật ven sông (chỉ cần rào 3 cạnh, cạnh còn lại giáp sông). Bác có $60$m lưới rào. Tính diện tích lớn nhất mảnh vườn có thể rào được.', answer: '$450 \\text{ m}^2$.', solution: 'Gọi cạnh vuông góc với sông là $x$ (m) ($x > 0$).\nChiều dài lưới rào cho 3 cạnh là $2x + y = 60 \\Rightarrow$ cạnh song song với sông là $y = 60 - 2x$.\nDiện tích: $S = x(60 - 2x) = 60x - 2x^2 = -2(x^2 - 30x) = -2(x - 15)^2 + 450$.\nVì $-2(x - 15)^2 \\le 0 \\Rightarrow S \\le 450$.\nGTLN là $450 \\text{ m}^2$ đạt được khi $x = 15$ (m), cạnh kia là $30$ (m).' },
    { grade: 9, cat: idThucTe, code: 'T9-TTC-07', content: 'Một quán cà phê bán một loại nước ép với giá $40$ nghìn đồng/ly thì trung bình mỗi ngày bán được $300$ ly. Cứ giảm giá $2$ nghìn đồng thì bán thêm được $40$ ly. Quán nên định giá bao nhiêu để doanh thu cao nhất?', answer: '$27,5$ nghìn đồng.', solution: 'Gọi số lần giảm giá $2$ nghìn đồng là $x$ ($x \\ge 0$).\nGiá bán: $40 - 2x$, Số ly bán: $300 + 40x$.\nDoanh thu $D = (40 - 2x)(300 + 40x) = -80x^2 + 1000x + 12000$.\nXét hàm số bậc 2, đỉnh đạt tại $x = \\dfrac{-b}{2a} = \\dfrac{-1000}{-160} = 6,25$.\nNên giảm giá $6,25$ lần, tức là giảm $6,25 \\times 2 = 12,5$ nghìn đồng.\nGiá bán tối ưu: $40 - 12,5 = 27,5$ nghìn đồng.' },
    { grade: 9, cat: idThucTe, code: 'T9-TTC-08', content: 'Cần xây một bể chứa nước hình hộp chữ nhật không nắp có thể tích $32 \\text{ m}^3$. Đáy bể là hình vuông. Để chi phí xây dựng (tỉ lệ với diện tích toàn phần) là nhỏ nhất, chiều cao của bể phải bằng bao nhiêu?', answer: '$2$ m.', solution: 'Gọi cạnh đáy hình vuông là $x$ (m), chiều cao là $h$ (m).\nThể tích $V = x^2 h = 32 \\Rightarrow h = \\dfrac{32}{x^2}$.\nDiện tích vật liệu (1 đáy + 4 mặt bên): $S = x^2 + 4xh = x^2 + \\dfrac{128}{x} = x^2 + \\dfrac{64}{x} + \\dfrac{64}{x}$.\nÁp dụng BĐT Cô-si cho 3 số: $S \\ge 3\\sqrt[3]{x^2 \\cdot \\dfrac{64}{x} \\cdot \\dfrac{64}{x}} = 3\\sqrt[3]{4096} = 3 \\times 16 = 48$.\nDấu "=" khi $x^2 = \\dfrac{64}{x} \\Rightarrow x^3 = 64 \\Rightarrow x = 4$ (m).\nChiều cao bể: $h = \\dfrac{32}{4^2} = \\dfrac{32}{16} = 2$ (m).' },
    { grade: 9, cat: idThucTe, code: 'T9-TTC-09', content: 'Từ một tấm bìa hình vuông cạnh $12$ cm, người ta cắt bỏ 4 hình vuông nhỏ bằng nhau ở 4 góc rồi gấp lên thành một cái hộp không nắp. Tính cạnh hình vuông nhỏ bị cắt để hộp có thể tích lớn nhất.', answer: '$2$ cm.', solution: 'Gọi độ dài cạnh hình vuông bị cắt ở 4 góc là $x$ ($0 < x < 6$).\nĐáy hộp là hình vuông có cạnh $12 - 2x$, chiều cao hộp là $x$.\nThể tích hộp: $V = x(12 - 2x)^2 = \\dfrac{1}{4} \\cdot 4x(12 - 2x)(12 - 2x)$.\nÁp dụng BĐT Cô-si cho 3 số: $4x, 12-2x, 12-2x$ (có tổng không đổi $= 24$):\n$4x(12-2x)(12-2x) \\le \\left(\\dfrac{4x + 12-2x + 12-2x}{3}\\right)^3 = \\left(\\dfrac{24}{3}\\right)^3 = 512$.\n$V \\le \\dfrac{512}{4} = 128$.\nDấu "=" khi $4x = 12 - 2x \\Rightarrow 6x = 12 \\Rightarrow x = 2$.' },
    { grade: 9, cat: idThucTe, code: 'T9-TTC-10', content: 'Một ô tô cần đi từ $A$ đến $B$ dài $120$ km. Nếu xe chạy nhanh hơn dự định $10$ km/h thì đến sớm hơn $1$ giờ. Để tốn ít thời gian nhất mà không vi phạm tốc độ tối đa $60$ km/h, xe nên chạy với vận tốc bao nhiêu?', answer: '$60$ km/h.', solution: 'Tìm vận tốc dự định $x$:\n$\\dfrac{120}{x} - \\dfrac{120}{x+10} = 1 \\Rightarrow 120(x+10) - 120x = x^2 + 10x \\Rightarrow x^2 + 10x - 1200 = 0$.\nGiải ra $x = 30$ (km/h).\nThực tế, để tốn ÍT thời gian nhất ($t = \\dfrac{120}{v}$ đạt Min) thì vận tốc $v$ phải đạt Max.\nGiới hạn tốc độ là $60$ km/h nên $v$ lớn nhất có thể là $60$ km/h.\n(Bài này mang tính mẹo tư duy hàm nghịch biến: Thời gian tỷ lệ nghịch với vận tốc).' }
  );

  console.log(`Inserting ${allQS.length} ENRICHMENT questions (Part 3)...`);

  for (const q of allQS) {
    const qid = crypto.randomUUID();
    const topic = 'dai_so'; // Nón trụ cầu belongs to hinh_hoc, wait! Let me update topic dynamically.
    const isGeo = q.cat === idKhoi ? 'hinh_hoc' : 'dai_so';
    await sql`
      INSERT INTO public.questions (id, category_id, question_code, content, answer, solution, difficulty, grade, topic, question_type, user_id, status, is_public)
      VALUES (${qid}, ${q.cat}, ${q.code}, ${q.content}, ${q.answer}, ${q.solution}, 'van_dung_cao', ${q.grade}, ${isGeo}, 'tu_luan', ${user_id}, 'approved', true)
    `;
    console.log(`Inserted ${q.code}`);
  }

  console.log('Done!');
}

main().catch(console.error);
