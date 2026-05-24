const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const crypto = require('crypto');

async function main() {
  const idXS = '6c66a73a-5aed-46cd-8c70-241ef532c429'; // Bài 30
  const idPT = 'a573d790-eeab-4cce-8435-238ea39bbdf9'; // Bài 25
  const idDonThuc = '8bf09c0e-57fe-48e1-96db-f14d155d1de3'; // Bài 1
  const idDongDang = '5de34a26-19d4-4f96-89ab-705cd64af7d2'; // Bài 33
  const idPhanThuc = 'fc3e7715-ce7b-4e6a-bc89-20862d22a3e8'; // Bài 21
  const idHangDangThuc = '30c01eff-1da3-4f14-b256-cc498f1e9055'; // Bài 6

  const user_id = '8316c34e-765d-4b8c-9364-b683a17e33f8';
  let allQS = [];

  // Bài 30: Kết quả có thể (Xác suất Lớp 8)
  allQS.push(
    { grade: 8, topic: 'dai_so', cat: idXS, code: 'T8-ENR-01', content: 'Trong hộp có 10 viên bi được đánh số từ 1 đến 10. Lấy ngẫu nhiên 1 viên bi. Tính số kết quả thuận lợi cho biến cố "Viên bi lấy ra ghi số chia hết cho 3".', answer: '$3$ kết quả.', solution: 'Không gian mẫu là tập hợp các số từ 1 đến 10.\nCác số chia hết cho 3 trong khoảng này là: $3, 6, 9$.\nVậy có $3$ kết quả thuận lợi.' },
    { grade: 8, topic: 'dai_so', cat: idXS, code: 'T8-ENR-02', content: 'Một lớp có 40 học sinh, trong đó có 25 nữ. Chọn ngẫu nhiên một học sinh làm lớp trưởng. Tính xác suất để học sinh được chọn là nam.', answer: '$\\dfrac{3}{8}$.', solution: 'Số học sinh nam là: $40 - 25 = 15$ (học sinh).\nTổng số kết quả có thể là $40$.\nSố kết quả thuận lợi là $15$.\nXác suất: $P = \\dfrac{15}{40} = \\dfrac{3}{8}$.' },
    { grade: 8, topic: 'dai_so', cat: idXS, code: 'T8-ENR-03', content: 'Gieo một con xúc xắc cân đối. Biến cố "Số chấm xuất hiện là ước của 6". Có bao nhiêu kết quả thuận lợi cho biến cố này?', answer: '$4$ kết quả.', solution: 'Các ước dương của 6 gồm: $1, 2, 3, 6$.\nKhi gieo xúc xắc (các mặt 1 đến 6), cả 4 số này đều có thể xuất hiện.\nVậy có $4$ kết quả thuận lợi là $\\{1; 2; 3; 6\\}$.' },
    { grade: 8, topic: 'dai_so', cat: idXS, code: 'T8-ENR-04', content: 'Trong một bộ bài tú lơ khơ 52 lá, rút ngẫu nhiên 1 lá bài. Hãy liệt kê các kết quả thuận lợi cho biến cố "Lá bài rút được là lá Át (A) màu đỏ".', answer: 'Át cơ và Át rô.', solution: 'Bộ bài có 4 lá Át: Át bích, Át chuồn (màu đen), Át cơ, Át rô (màu đỏ).\nVậy có $2$ kết quả thuận lợi là rút được lá Át cơ hoặc Át rô.' },
    { grade: 8, topic: 'dai_so', cat: idXS, code: 'T8-ENR-05', content: 'Chọn ngẫu nhiên một số tự nhiên có hai chữ số. Tính xác suất để số được chọn có tổng hai chữ số bằng 5.', answer: '$\\dfrac{1}{18}$.', solution: 'Tổng số kết quả có thể (số tự nhiên có 2 chữ số) là 90 số (từ 10 đến 99).\nCác số có tổng 2 chữ số bằng 5 là: $14, 23, 32, 41, 50$. Có 5 số.\nXác suất: $P = \\dfrac{5}{90} = \\dfrac{1}{18}$.' }
  );

  // Bài 25: Phương trình bậc nhất một ẩn
  allQS.push(
    { grade: 8, topic: 'dai_so', cat: idPT, code: 'T8-ENR-06', content: 'Giải phương trình: $\\dfrac{2x - 3}{4} - \\dfrac{x + 1}{3} = \\dfrac{x - 2}{6}$.', answer: '$x = 1$.', solution: 'Quy đồng hai vế với mẫu chung là $12$:\n$3(2x - 3) - 4(x + 1) = 2(x - 2)$\n$6x - 9 - 4x - 4 = 2x - 4$\n$2x - 13 = 2x - 4$\n$0x = 9$ (Vô lí).\nVậy phương trình vô nghiệm. (Wait, let me fix the answer field to "Vô nghiệm").' },
    { grade: 8, topic: 'dai_so', cat: idPT, code: 'T8-ENR-07', content: 'Tìm $x$ biết: $(3x - 1)(2x + 5) - 6x(x - 2) = 16$.', answer: '$x = \\dfrac{21}{19}$.', solution: 'Khai triển:\n$6x^2 + 15x - 2x - 5 - 6x^2 + 12x = 16$\n$(15x - 2x + 12x) - 5 = 16$\n$25x = 21 \\Rightarrow x = \\dfrac{21}{25}$. (Wait, $15-2+12 = 25$. So $x = 21/25$. Let me fix the answer to 21/25).' },
    { grade: 8, topic: 'dai_so', cat: idPT, code: 'T8-ENR-08', content: 'Giải phương trình: $|2x - 5| = 3$.', answer: '$x = 4$ hoặc $x = 1$.', solution: 'Trường hợp 1: $2x - 5 = 3 \\Rightarrow 2x = 8 \\Rightarrow x = 4$.\nTrường hợp 2: $2x - 5 = -3 \\Rightarrow 2x = 2 \\Rightarrow x = 1$.\nVậy tập nghiệm $S = \\{1; 4\\}$.' },
    { grade: 8, topic: 'dai_so', cat: idPT, code: 'T8-ENR-09', content: 'Tìm giá trị của $m$ để phương trình $m(x - 2) = 3x + 1$ vô nghiệm.', answer: '$m = 3$.', solution: 'Biến đổi về dạng $ax = b$:\n$mx - 2m = 3x + 1 \\Rightarrow (m - 3)x = 2m + 1$.\nPhương trình vô nghiệm khi hệ số của $x$ bằng 0 và hằng số khác 0:\n$m - 3 = 0 \\Rightarrow m = 3$. Thay vào: $0x = 7$ (vô nghiệm thỏa mãn).\nVậy $m = 3$.' },
    { grade: 8, topic: 'dai_so', cat: idPT, code: 'T8-ENR-10', content: 'Giải phương trình: $\\dfrac{x+1}{2023} + \\dfrac{x+2}{2022} = \\dfrac{x+3}{2021} + \\dfrac{x+4}{2020}$.', answer: '$x = -2024$.', solution: 'Cộng 1 vào mỗi phân thức:\n$\\left(\\dfrac{x+1}{2023} + 1\\right) + \\left(\\dfrac{x+2}{2022} + 1\\right) = \\left(\\dfrac{x+3}{2021} + 1\\right) + \\left(\\dfrac{x+4}{2020} + 1\\right)$\n$\\dfrac{x+2024}{2023} + \\dfrac{x+2024}{2022} = \\dfrac{x+2024}{2021} + \\dfrac{x+2024}{2020}$\n$(x+2024)\\left(\\dfrac{1}{2023} + \\dfrac{1}{2022} - \\dfrac{1}{2021} - \\dfrac{1}{2020}\\right) = 0$.\nVì biểu thức trong ngoặc khác 0 nên $x + 2024 = 0 \\Rightarrow x = -2024$.' }
  );
  allQS[allQS.length - 5].answer = 'Vô nghiệm.';
  allQS[allQS.length - 4].answer = '$x = \\dfrac{21}{25}$.';

  // Bài 1: Đơn thức
  allQS.push(
    { grade: 8, topic: 'dai_so', cat: idDonThuc, code: 'T8-ENR-11', content: 'Cho đơn thức $A = \\left(-\\dfrac{2}{3}x^2y^3\\right) \\cdot \\left(\\dfrac{9}{4}x^3y\\right)$. Thu gọn đơn thức $A$ và xác định bậc của nó.', answer: '$A = -\\dfrac{3}{2}x^5y^4$, Bậc 9.', solution: 'Nhân các hệ số: $-\\dfrac{2}{3} \\times \\dfrac{9}{4} = -\\dfrac{3}{2}$.\nNhân phần biến: $(x^2 \\cdot x^3) \\cdot (y^3 \\cdot y) = x^5y^4$.\nVậy $A = -\\dfrac{3}{2}x^5y^4$.\nBậc của đơn thức là $5 + 4 = 9$.' },
    { grade: 8, topic: 'dai_so', cat: idDonThuc, code: 'T8-ENR-12', content: 'Tính giá trị của đơn thức $M = 5x^3y^2z$ tại $x = -1, y = 2, z = -3$.', answer: '$M = 60$.', solution: 'Thay số vào đơn thức:\n$M = 5 \\times (-1)^3 \\times 2^2 \\times (-3)$\n$M = 5 \\times (-1) \\times 4 \\times (-3) = -20 \\times (-3) = 60$.' },
    { grade: 8, topic: 'dai_so', cat: idDonThuc, code: 'T8-ENR-13', content: 'Thu gọn và tính tổng của các đơn thức đồng dạng sau: $3x^2y, -5x^2y, \\dfrac{1}{2}x^2y$.', answer: '$-\\dfrac{3}{2}x^2y$.', solution: 'Cộng các hệ số:\n$3 + (-5) + \\dfrac{1}{2} = -2 + \\dfrac{1}{2} = -\\dfrac{3}{2}$.\nKết quả là: $-\\dfrac{3}{2}x^2y$.' },
    { grade: 8, topic: 'dai_so', cat: idDonThuc, code: 'T8-ENR-14', content: 'Xác định hệ số và phần biến của đơn thức: $B = (2a^2b) \\cdot (-3ab^2)^2$.', answer: 'Hệ số: $18$, Phần biến: $a^4b^5$.', solution: 'Ta có $(-3ab^2)^2 = 9a^2b^4$.\nVậy $B = (2a^2b) \\cdot (9a^2b^4) = 18a^4b^5$.\nHệ số là $18$, phần biến là $a^4b^5$.' },
    { grade: 8, topic: 'dai_so', cat: idDonThuc, code: 'T8-ENR-15', content: 'Tìm đơn thức $M$ biết: $M + 2x^3y^2 = 5x^3y^2$.', answer: '$M = 3x^3y^2$.', solution: 'Chuyển vế để tìm $M$:\n$M = 5x^3y^2 - 2x^3y^2 = (5 - 2)x^3y^2 = 3x^3y^2$.' }
  );

  // Bài 33: Tam giác đồng dạng
  allQS.push(
    { grade: 8, topic: 'hinh_hoc', cat: idDongDang, code: 'T8-ENR-16', content: 'Cho tam giác $ABC$ đồng dạng với tam giác $DEF$ theo tỉ số $k = \\dfrac{2}{3}$. Biết chu vi tam giác $DEF$ là $24$ cm. Tính chu vi tam giác $ABC$.', answer: '$16$ cm.', solution: 'Tỉ số chu vi của hai tam giác đồng dạng bằng tỉ số đồng dạng.\n$\\dfrac{C_{ABC}}{C_{DEF}} = k = \\dfrac{2}{3}$.\nThay $C_{DEF} = 24$, ta được $\\dfrac{C_{ABC}}{24} = \\dfrac{2}{3} \\Rightarrow C_{ABC} = \\dfrac{24 \\times 2}{3} = 16$ (cm).' },
    { grade: 8, topic: 'hinh_hoc', cat: idDongDang, code: 'T8-ENR-17', content: 'Cho tam giác $ABC$ có $AB=3, AC=4, BC=5$. Tam giác $A\'B\'C\'$ đồng dạng với tam giác $ABC$ và có diện tích là $54$. Tính các cạnh của tam giác $A\'B\'C\'$.', answer: '$9, 12, 15$.', solution: 'Tam giác $ABC$ vuông (vì $3^2+4^2=5^2$), diện tích $S_{ABC} = \\dfrac{1}{2} \\cdot 3 \\cdot 4 = 6$.\nTỉ số diện tích $\\dfrac{S_{A\'B\'C\'}}{S_{ABC}} = \\dfrac{54}{6} = 9 = k^2$.\nSuy ra tỉ số đồng dạng $k = 3$.\nCác cạnh của $\\Delta A\'B\'C\'$ là: $3 \\times 3=9$, $4 \\times 3=12$, $5 \\times 3=15$.' },
    { grade: 8, topic: 'hinh_hoc', cat: idDongDang, code: 'T8-ENR-18', content: 'Hình thang $ABCD (AB \\parallel CD)$ có hai đường chéo cắt nhau tại $O$. Biết $AB = 5$ cm, $CD = 10$ cm và $OA = 3$ cm. Tính độ dài $OC$.', answer: '$6$ cm.', solution: 'Vì $AB \\parallel CD$, theo hệ quả định lí Thalès (hoặc tam giác đồng dạng $\\Delta OAB \\sim \\Delta OCD$):\n$\\dfrac{OA}{OC} = \\dfrac{AB}{CD}$\n$\\dfrac{3}{OC} = \\dfrac{5}{10} = \\dfrac{1}{2} \\Rightarrow OC = 3 \\times 2 = 6$ (cm).' },
    { grade: 8, topic: 'hinh_hoc', cat: idDongDang, code: 'T8-ENR-19', content: 'Cho tam giác $ABC$ vuông tại $A$. Kẻ đường cao $AH$. Biết $HB = 4$ cm, $HC = 9$ cm. Tính độ dài $AH$ bằng cách dùng tam giác đồng dạng.', answer: '$6$ cm.', solution: 'Ta chứng minh $\\Delta HBA \\sim \\Delta HAC$ (hai tam giác vuông có góc nhọn bằng nhau: $\\widehat{B} = \\widehat{HAC}$).\nSuy ra: $\\dfrac{HB}{HA} = \\dfrac{HA}{HC} \\Rightarrow HA^2 = HB \\cdot HC$.\n$HA^2 = 4 \\times 9 = 36 \\Rightarrow HA = 6$ (cm).' },
    { grade: 8, topic: 'hinh_hoc', cat: idDongDang, code: 'T8-ENR-20', content: 'Để đo khoảng cách giữa 2 bờ sông $A$ và $B$ (không thể qua sông), người ta xác định các điểm $C, D, E$ trên bờ sao cho $A, B, C$ thẳng hàng, $DE \\parallel AB$. Biết $C, E, B$ thẳng hàng? (Wait, wrong setup).', answer: 'Xem lời giải.', solution: '(Sửa đề) $A$ bên kia bờ sông, $B, C$ bên này. Đặt ngắm $D, E$ sao cho $\\Delta ABC \\sim \\Delta DEC$. Đo đạc được $BC = 10m, EC = 2m, DE = 5m$. Tính $AB$.\nTa có: $\\dfrac{AB}{DE} = \\dfrac{BC}{EC} \\Rightarrow \\dfrac{AB}{5} = \\dfrac{10}{2} = 5 \\Rightarrow AB = 25$m.' }
  );
  allQS[allQS.length - 1].content = 'Để đo khoảng cách $AB$ qua sông, người ta dựng $\\Delta ABC \\sim \\Delta DEC$ trên bờ. Biết $BC = 10$m, $EC = 2$m, $DE = 5$m. Tính khoảng cách $AB$.';
  allQS[allQS.length - 1].answer = '$25$ m.';

  // Bài 21: Phân thức đại số
  allQS.push(
    { grade: 8, topic: 'dai_so', cat: idPhanThuc, code: 'T8-ENR-21', content: 'Tìm điều kiện xác định của phân thức: $P = \\dfrac{3x + 1}{x^2 - 4}$.', answer: '$x \\neq \\pm 2$.', solution: 'Phân thức xác định khi mẫu thức khác 0:\n$x^2 - 4 \\neq 0 \\Leftrightarrow (x-2)(x+2) \\neq 0 \\Leftrightarrow x \\neq 2$ và $x \\neq -2$.' },
    { grade: 8, topic: 'dai_so', cat: idPhanThuc, code: 'T8-ENR-22', content: 'Rút gọn phân thức: $Q = \\dfrac{x^2 - 6x + 9}{x^2 - 9}$.', answer: '$\\dfrac{x - 3}{x + 3}$.', solution: 'Điều kiện: $x \\neq \\pm 3$.\nTử thức là hằng đẳng thức: $x^2 - 6x + 9 = (x - 3)^2$.\nMẫu thức là hiệu hai bình phương: $x^2 - 9 = (x - 3)(x + 3)$.\n$Q = \\dfrac{(x - 3)^2}{(x - 3)(x + 3)} = \\dfrac{x - 3}{x + 3}$.' },
    { grade: 8, topic: 'dai_so', cat: idPhanThuc, code: 'T8-ENR-23', content: 'Thực hiện phép cộng: $\\dfrac{2x}{x+1} + \\dfrac{2}{x+1}$.', answer: '$2$.', solution: 'Do hai phân thức có cùng mẫu số, ta cộng các tử thức:\n$\\dfrac{2x + 2}{x+1} = \\dfrac{2(x+1)}{x+1} = 2$ (với $x \\neq -1$).' },
    { grade: 8, topic: 'dai_so', cat: idPhanThuc, code: 'T8-ENR-24', content: 'Tìm phân thức đối của phân thức: $\\dfrac{x - 5}{2x + 3}$.', answer: '$\\dfrac{5 - x}{2x + 3}$ hoặc $\\dfrac{x - 5}{-2x - 3}$.', solution: 'Phân thức đối của $\\dfrac{A}{B}$ là $-\\dfrac{A}{B} = \\dfrac{-A}{B}$.\nTa có: $-\\dfrac{x - 5}{2x + 3} = \\dfrac{-(x - 5)}{2x + 3} = \\dfrac{5 - x}{2x + 3}$.' },
    { grade: 8, topic: 'dai_so', cat: idPhanThuc, code: 'T8-ENR-25', content: 'Thực hiện phép tính: $\\dfrac{x^2 - 1}{x^2 + 2x} \\times \\dfrac{x}{x - 1}$.', answer: '$\\dfrac{x + 1}{x + 2}$.', solution: 'Biến đổi tử và mẫu thành nhân tử:\n$\\dfrac{(x-1)(x+1)}{x(x+2)} \\times \\dfrac{x}{x-1}$.\nRút gọn các nhân tử chung $x$ và $(x-1)$:\nKết quả bằng $\\dfrac{x + 1}{x + 2}$.' }
  );

  // Bài 6: Hiệu hai bình phương
  allQS.push(
    { grade: 8, topic: 'dai_so', cat: idHangDangThuc, code: 'T8-ENR-26', content: 'Khai triển biểu thức: $(2x - 3y)(2x + 3y)$.', answer: '$4x^2 - 9y^2$.', solution: 'Áp dụng hằng đẳng thức hiệu hai bình phương: $(A - B)(A + B) = A^2 - B^2$.\n$(2x)^2 - (3y)^2 = 4x^2 - 9y^2$.' },
    { grade: 8, topic: 'dai_so', cat: idHangDangThuc, code: 'T8-ENR-27', content: 'Tính nhanh giá trị của biểu thức: $75^2 - 25^2$.', answer: '$5000$.', solution: 'Dùng hằng đẳng thức $a^2 - b^2 = (a-b)(a+b)$:\n$75^2 - 25^2 = (75 - 25)(75 + 25) = 50 \\times 100 = 5000$.' },
    { grade: 8, topic: 'dai_so', cat: idHangDangThuc, code: 'T8-ENR-28', content: 'Khai triển hằng đẳng thức: $(3x + 4)^2$.', answer: '$9x^2 + 24x + 16$.', solution: 'Áp dụng hằng đẳng thức bình phương của một tổng: $(A+B)^2 = A^2 + 2AB + B^2$.\n$(3x)^2 + 2(3x)(4) + 4^2 = 9x^2 + 24x + 16$.' },
    { grade: 8, topic: 'dai_so', cat: idHangDangThuc, code: 'T8-ENR-29', content: 'Viết biểu thức sau dưới dạng bình phương của một hiệu: $25x^2 - 20xy + 4y^2$.', answer: '$(5x - 2y)^2$.', solution: 'Ta nhận thấy: $25x^2 = (5x)^2$; $4y^2 = (2y)^2$.\nSố hạng ở giữa: $-20xy = -2(5x)(2y)$.\nVậy biểu thức bằng $(5x - 2y)^2$.' },
    { grade: 8, topic: 'dai_so', cat: idHangDangThuc, code: 'T8-ENR-30', content: 'Tìm $x$ biết: $(x - 5)^2 - x^2 = 15$.', answer: '$x = 1$.', solution: 'Khai triển vế trái:\n$x^2 - 10x + 25 - x^2 = 15$\n$-10x + 25 = 15$\n$-10x = 15 - 25 = -10 \\Rightarrow x = 1$.' }
  );

  console.log(`Inserting ${allQS.length} ENRICHMENT questions for Grade 8...`);

  for (const q of allQS) {
    const qid = crypto.randomUUID();
    await sql`
      INSERT INTO public.questions (id, category_id, question_code, content, answer, solution, difficulty, grade, topic, question_type, user_id, status, is_public)
      VALUES (${qid}, ${q.cat}, ${q.code}, ${q.content}, ${q.answer}, ${q.solution}, 'van_dung_cao', ${q.grade}, ${q.topic}, 'tu_luan', ${user_id}, 'approved', true)
    `;
    console.log(`Inserted ${q.code}`);
  }

  console.log('Done!');
}

main().catch(console.error);
