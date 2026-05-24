const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const crypto = require('crypto');

async function main() {
  const idTK = '69b77502-8f71-4e46-9a39-7cd72b70238d'; // Thống kê
  const idXS = '38848e04-da93-4c2b-bd9a-9adb246ad5ed'; // Xác suất
  const idKhoi = '0cb8da64-8b0c-4858-abdd-8a388f332f3e'; // Nón - Trụ - Cầu
  const idBDT = '6a26c4af-052b-4c6f-b127-1ca2339ef7ee'; // BĐT và cực trị
  const idThucTe = '076fa54f-08ac-4368-a200-9d2c53e066ab'; // Toán thực tế cực trị

  const grade = 9;
  const user_id = '8316c34e-765d-4b8c-9364-b683a17e33f8';
  let allQS = [];

  // Chuyên đề 8. Thống kê
  allQS.push(
    { cat: idTK, code: 'T9-TK-01', content: 'Điểm kiểm tra môn Toán của 10 học sinh như sau: 6; 7; 8; 8; 9; 10; 8; 7; 9; 8. Tính điểm trung bình của nhóm học sinh này.', answer: '$8,0$.', solution: 'Tổng số điểm của 10 học sinh là:\n$6 + 7 + 8 + 8 + 9 + 10 + 8 + 7 + 9 + 8 = 80$.\nĐiểm trung bình là: $\\bar{x} = \\dfrac{80}{10} = 8,0$.' },
    { cat: idTK, code: 'T9-TK-02', content: 'Cho bảng tần số về cân nặng (kg) của 20 học sinh: Có 5 em 40kg, 8 em 42kg, 4 em 45kg và 3 em 50kg. Tìm mốt của dấu hiệu.', answer: '$M_0 = 42$.', solution: 'Mốt của dấu hiệu là giá trị có tần số lớn nhất.\nTrong bảng, cân nặng 42kg có số lượng học sinh nhiều nhất (8 em).\nVậy mốt $M_0 = 42$ (kg).' },
    { cat: idTK, code: 'T9-TK-03', content: 'Tìm số trung vị của mẫu số liệu sau: $12; 15; 18; 14; 20; 16; 17$.', answer: '$16$.', solution: 'Sắp xếp các số liệu theo thứ tự tăng dần:\n$12; 14; 15; 16; 17; 18; 20$.\nMẫu số liệu có $n = 7$ (số lẻ) quan trắc.\nSố trung vị là số ở chính giữa (vị trí thứ 4).\nVậy trung vị là $M_e = 16$.' },
    { cat: idTK, code: 'T9-TK-04', content: 'Trung bình cộng của 4 số là 15. Nếu thêm một số x thì trung bình cộng của 5 số là 16. Tìm x.', answer: '$x = 20$.', solution: 'Tổng của 4 số ban đầu là: $15 \\times 4 = 60$.\nTổng của 5 số (sau khi thêm x) là: $16 \\times 5 = 80$.\nGiá trị của số được thêm vào là: $x = 80 - 60 = 20$.' },
    { cat: idTK, code: 'T9-TK-05', content: 'Một xạ thủ bắn súng 20 lần. Điểm trung bình là 8,5. Trong đó có 5 viên đạt điểm 10, 8 viên đạt điểm 9, x viên điểm 8 và số viên còn lại điểm 7. Tìm x.', answer: '$x = 3$.', solution: 'Tổng số viên đạn là 20. Tổng số điểm là $20 \\times 8,5 = 170$.\nSố viên đạn điểm 7 là: $20 - (5 + 8 + x) = 7 - x$.\nTa có phương trình tổng điểm:\n$5 \\times 10 + 8 \\times 9 + 8 \\times x + 7 \\times (7 - x) = 170$\n$50 + 72 + 8x + 49 - 7x = 170$\n$x + 171 = 170$ \n(Wait, $8x - 7x = x$, and $50+72+49=171$, equation $x+171=170$ gives $x=-1$, which is invalid. Let me fix the problem statement!)\n(If average is 8.6, total is 172. Then $x+171=172 \\Rightarrow x=1$. Or let\'s say average is 8.4, total = 168. Then $x+171=168 \\Rightarrow x=-3$. Let me re-calculate with 20 total. If we have 5x10=50, 8x9=72. 122. We need 170. Remaining 20-13=7 shots. If all 7 are 7, total is 122+49=171 > 170. So average must be less than 8.5? No. The remaining 7 shots can be 8s and 7s. Let $y$ be number of 8s, $z$ be number of 7s. $y+z=7$. $8y+7z = 170-122=48$. $8y+7(7-y)=48 \\Rightarrow y+49=48 \\Rightarrow y=-1$. Impossible. The 5x10, 8x9 already give 122. If average is 8.5, total is 170. Leftover sum = 48 over 7 shots. 48/7 = 6.85, so we need some 6s, not 8s and 7s! Let me rewrite the question completely to ensure 100% accuracy).' }
  );

  allQS[allQS.length - 1] = { 
    cat: idTK, 
    code: 'T9-TK-05', 
    content: 'Một nhóm gồm 10 người có độ tuổi trung bình là 25. Khi có một người rời khỏi nhóm thì độ tuổi trung bình của 9 người còn lại là 24. Hỏi người rời khỏi nhóm bao nhiêu tuổi?', 
    answer: '$34$ tuổi.', 
    solution: 'Tổng số tuổi của 10 người ban đầu là: $10 \\times 25 = 250$ (tuổi).\nTổng số tuổi của 9 người còn lại là: $9 \\times 24 = 216$ (tuổi).\nTuổi của người rời đi là phần chênh lệch giữa hai tổng trên:\n$250 - 216 = 34$ (tuổi).' 
  };

  // Chuyên đề 9. Xác suất
  allQS.push(
    { cat: idXS, code: 'T9-XS-01', content: 'Gieo một con xúc xắc cân đối và đồng chất một lần. Tính xác suất để xuất hiện mặt có số chấm là số nguyên tố.', answer: '$\\dfrac{1}{2}$.', solution: 'Không gian mẫu khi gieo xúc xắc là $\\Omega = \\{1; 2; 3; 4; 5; 6\\}$. Tổng số kết quả có thể xảy ra là 6.\nCác mặt xuất hiện số nguyên tố là: $2, 3, 5$. Có 3 kết quả thuận lợi.\nXác suất là $P = \\dfrac{3}{6} = \\dfrac{1}{2}$.' },
    { cat: idXS, code: 'T9-XS-02', content: 'Một hộp chứa 5 quả cầu đỏ, 3 quả cầu xanh và 2 quả cầu vàng. Lấy ngẫu nhiên một quả cầu từ hộp. Tính xác suất để lấy được quả cầu không phải màu đỏ.', answer: '$\\dfrac{1}{2}$.', solution: 'Tổng số quả cầu trong hộp là: $5 + 3 + 2 = 10$ (quả).\nSố quả cầu không phải màu đỏ (xanh hoặc vàng) là: $3 + 2 = 5$ (quả).\nXác suất lấy được quả không phải màu đỏ là $P = \\dfrac{5}{10} = \\dfrac{1}{2}$.' },
    { cat: idXS, code: 'T9-XS-03', content: 'Gieo đồng thời hai đồng xu cân đối. Tính xác suất để nhận được ít nhất một mặt sấp.', answer: '$\\dfrac{3}{4}$.', solution: 'Các kết quả có thể xảy ra khi gieo 2 đồng xu là: $\\{SS, SN, NS, NN\\}$. Có tất cả 4 kết quả.\nBiến cố "Có ít nhất một mặt sấp" xảy ra ở các trường hợp: $\\{SS, SN, NS\\}$ (3 kết quả).\nXác suất là $P = \\dfrac{3}{4}$.' },
    { cat: idXS, code: 'T9-XS-04', content: 'Chọn ngẫu nhiên một số tự nhiên có hai chữ số. Tính xác suất để số được chọn chia hết cho 9.', answer: '$\\dfrac{1}{9}$.', solution: 'Các số tự nhiên có hai chữ số là từ $10$ đến $99$, tổng cộng có $99 - 10 + 1 = 90$ số.\nCác số có hai chữ số chia hết cho 9 là: $18, 27, 36, ..., 99$.\nSố lượng số chia hết cho 9 là: $(99 - 18) : 9 + 1 = 10$ số.\nXác suất là $P = \\dfrac{10}{90} = \\dfrac{1}{9}$.' },
    { cat: idXS, code: 'T9-XS-05', content: 'Rút ngẫu nhiên một lá bài từ bộ bài tú lơ khơ 52 lá. Tính xác suất rút được một lá Át (A) hoặc một lá K.', answer: '$\\dfrac{2}{13}$.', solution: 'Bộ bài có 52 lá.\nSố lá Át là 4 lá, số lá K là 4 lá.\nTổng số kết quả thuận lợi là $4 + 4 = 8$ lá.\nXác suất rút được là $P = \\dfrac{8}{52} = \\dfrac{2}{13}$.' }
  );

  // Chuyên đề 10. Hình khối (Nón, Trụ, Cầu)
  allQS.push(
    { cat: idKhoi, code: 'T9-KHOI-01', content: 'Một hình trụ có bán kính đáy $r = 5$ cm và chiều cao $h = 10$ cm. Tính diện tích xung quanh của hình trụ (Lấy $\\pi \\approx 3,14$).', answer: '$314 \\text{ cm}^2$.', solution: 'Công thức tính diện tích xung quanh hình trụ là $S_{xq} = 2\\pi r h$.\nThay số: $S_{xq} = 2 \\times 3,14 \\times 5 \\times 10 = 31,4 \\times 10 = 314$ ($\\text{cm}^2$).' },
    { cat: idKhoi, code: 'T9-KHOI-02', content: 'Tính thể tích của một khối cầu có bán kính $r = 3$ cm. (Để kết quả dưới dạng chứa $\\pi$).', answer: '$36\\pi \\text{ cm}^3$.', solution: 'Công thức tính thể tích khối cầu là $V = \\dfrac{4}{3}\\pi r^3$.\nThay $r = 3$ vào công thức:\n$V = \\dfrac{4}{3}\\pi \\times 3^3 = \\dfrac{4}{3}\\pi \\times 27 = 36\\pi$ ($\\text{cm}^3$).' },
    { cat: idKhoi, code: 'T9-KHOI-03', content: 'Một hình nón có chiều cao $h = 4$ cm, bán kính đáy $r = 3$ cm. Tính diện tích toàn phần của hình nón.', answer: '$24\\pi \\text{ cm}^2$.', solution: '**Bước 1: Tính đường sinh $l$**\nÁp dụng định lí Pythagore: $l = \\sqrt{h^2 + r^2} = \\sqrt{4^2 + 3^2} = \\sqrt{25} = 5$ (cm).\n**Bước 2: Tính diện tích toàn phần**\n$S_{tp} = S_{xq} + S_{\\text{đáy}} = \\pi r l + \\pi r^2$\n$S_{tp} = \\pi \\times 3 \\times 5 + \\pi \\times 3^2 = 15\\pi + 9\\pi = 24\\pi$ ($\\text{cm}^2$).' },
    { cat: idKhoi, code: 'T9-KHOI-04', content: 'Một cốc nước hình trụ có bán kính đáy $4$ cm, chiều cao $15$ cm. Cốc đang chứa nước chiếm $\\dfrac{2}{3}$ thể tích cốc. Tính thể tích nước trong cốc (Lấy $\\pi \\approx 3,14$).', answer: '$502,4 \\text{ cm}^3$.', solution: 'Thể tích của toàn bộ cốc hình trụ là:\n$V_{\\text{cốc}} = \\pi r^2 h = 3,14 \\times 4^2 \\times 15 = 3,14 \\times 16 \\times 15 = 753,6$ ($\\text{cm}^3$).\nThể tích nước có trong cốc là:\n$V_{\\text{nước}} = 753,6 \\times \\dfrac{2}{3} = 502,4$ ($\\text{cm}^3$).' },
    { cat: idKhoi, code: 'T9-KHOI-05', content: 'Người ta nung chảy một viên bi sắt hình cầu có bán kính $6$ cm để đúc thành một hình trụ có bán kính đáy $4$ cm. Tính chiều cao của hình trụ mới (giả sử không có hao hụt).', answer: '$18$ cm.', solution: 'Thể tích viên bi hình cầu là:\n$V = \\dfrac{4}{3}\\pi r^3 = \\dfrac{4}{3}\\pi \\times 6^3 = 288\\pi$ ($\\text{cm}^3$).\nThể tích hình trụ cũng bằng $288\\pi$, bán kính $R = 4$ cm. Gọi chiều cao là $h$.\nTa có $\\pi R^2 h = 288\\pi$\n$16\\pi \\times h = 288\\pi \\Rightarrow h = \\dfrac{288}{16} = 18$ (cm).' }
  );

  // Chuyên đề 12. Bất đẳng thức và cực trị
  allQS.push(
    { cat: idBDT, code: 'T9-BDT-01', content: 'Cho hai số thực dương $a, b$. Chứng minh rằng: $\\dfrac{a}{b} + \\dfrac{b}{a} \\ge 2$.', answer: 'Xem lời giải.', solution: 'Vì $a > 0, b > 0$ nên $\\dfrac{a}{b} > 0$ và $\\dfrac{b}{a} > 0$.\nÁp dụng bất đẳng thức Cô-si (Cauchy) cho hai số dương:\n$\\dfrac{a}{b} + \\dfrac{b}{a} \\ge 2\\sqrt{\\dfrac{a}{b} \\cdot \\dfrac{b}{a}} = 2\\sqrt{1} = 2$.\nDấu "=" xảy ra khi $\\dfrac{a}{b} = \\dfrac{b}{a} \\Rightarrow a^2 = b^2 \\Rightarrow a = b$.' },
    { cat: idBDT, code: 'T9-BDT-02', content: 'Cho số thực dương $x$. Tìm giá trị nhỏ nhất của biểu thức $P = x + \\dfrac{4}{x}$.', answer: 'GTNN là $4$, khi $x = 2$.', solution: 'Vì $x > 0$ nên $\\dfrac{4}{x} > 0$.\nÁp dụng bất đẳng thức Cô-si cho hai số dương:\n$P = x + \\dfrac{4}{x} \\ge 2\\sqrt{x \\cdot \\dfrac{4}{x}} = 2\\sqrt{4} = 4$.\nVậy giá trị nhỏ nhất của $P$ là $4$.\nDấu "=" xảy ra khi $x = \\dfrac{4}{x} \\Rightarrow x^2 = 4 \\Rightarrow x = 2$ (do $x > 0$).' },
    { cat: idBDT, code: 'T9-BDT-03', content: 'Tìm giá trị lớn nhất của biểu thức $A = -x^2 + 4x + 5$.', answer: 'GTLN là $9$, khi $x = 2$.', solution: 'Ta biến đổi biểu thức về dạng bình phương:\n$A = -(x^2 - 4x) + 5$\n$A = -(x^2 - 4x + 4 - 4) + 5$\n$A = -(x - 2)^2 + 4 + 5 = 9 - (x - 2)^2$.\nVì $(x - 2)^2 \\ge 0 \\forall x \\Rightarrow -(x - 2)^2 \\le 0 \\forall x$.\nDo đó $A \\le 9 \\forall x$.\nDấu "=" xảy ra khi $x - 2 = 0 \\Rightarrow x = 2$.' },
    { cat: idBDT, code: 'T9-BDT-04', content: 'Cho $x, y$ là các số thực thoả mãn $x + y = 1$. Tìm giá trị nhỏ nhất của biểu thức $M = x^2 + y^2$.', answer: 'GTNN là $\\dfrac{1}{2}$, khi $x = y = \\dfrac{1}{2}$.', solution: 'Áp dụng bất đẳng thức $(x + y)^2 \\le 2(x^2 + y^2)$ (Đây là hệ quả BĐT Bunhiacopxki).\nThay $x + y = 1$ vào ta có:\n$1^2 \\le 2M \\Rightarrow M \\ge \\dfrac{1}{2}$.\nDấu "=" xảy ra khi $x = y$, mà $x + y = 1$ nên $x = y = \\dfrac{1}{2}$.\nVậy GTNN của $M$ là $\\dfrac{1}{2}$.' },
    { cat: idBDT, code: 'T9-BDT-05', content: 'Cho hai số dương $x, y$ thoả mãn $x + y \\le 2$. Tìm giá trị nhỏ nhất của biểu thức $Q = \\dfrac{1}{x} + \\dfrac{1}{y}$.', answer: 'GTNN là $2$, khi $x = y = 1$.', solution: 'Áp dụng bất đẳng thức: $\\dfrac{1}{x} + \\dfrac{1}{y} \\ge \\dfrac{4}{x + y}$.\nDo $x + y \\le 2$ nên $\\dfrac{4}{x + y} \\ge \\dfrac{4}{2} = 2$.\nSuy ra $Q \\ge 2$.\nDấu "=" xảy ra khi $x = y$ và $x + y = 2$, tức là $x = y = 1$.\nVậy GTNN của $Q$ là $2$.' }
  );

  // Chuyên đề 13. Toán thực tế liên quan cực trị
  allQS.push(
    { cat: idThucTe, code: 'T9-TTC-01', content: 'Bác An dùng $40$m lưới thép để rào một mảnh vườn hình chữ nhật. Một cạnh của vườn dựa vào tường (không cần rào lưới). Hỏi mảnh vườn có diện tích lớn nhất là bao nhiêu?', answer: '$200 \\text{ m}^2$.', solution: 'Gọi chiều rộng của vườn là $x$ (m) ($x > 0$).\nPhần rào có 2 chiều rộng và 1 chiều dài nên chiều dài là $40 - 2x$ (m).\nDiện tích vườn là $S = x(40 - 2x) = -2x^2 + 40x$.\nBiến đổi: $S = -2(x^2 - 20x + 100 - 100) = -2(x - 10)^2 + 200$.\nVì $-2(x - 10)^2 \\le 0$ nên $S \\le 200$.\nDiện tích lớn nhất là $200 \\text{ m}^2$ khi $x = 10$ m (Rộng $10$m, Dài $20$m).' },
    { cat: idThucTe, code: 'T9-TTC-02', content: 'Một công ty sản xuất bán $x$ sản phẩm mỗi ngày. Lợi nhuận mỗi ngày (triệu đồng) được tính bởi hàm số $P(x) = -x^2 + 60x - 500$. Hỏi công ty cần bán bao nhiêu sản phẩm để lợi nhuận đạt tối đa?', answer: '$30$ sản phẩm.', solution: 'Ta tìm đỉnh của Parabol $P(x) = -x^2 + 60x - 500$.\nCách 1: Hoành độ đỉnh $x = \\dfrac{-b}{2a} = \\dfrac{-60}{2(-1)} = 30$.\nCách 2: Biến đổi $P(x) = -(x^2 - 60x + 900) - 500 + 900 = -(x - 30)^2 + 400$.\nDo $-(x - 30)^2 \\le 0$ nên $P(x) \\le 400$.\nLợi nhuận lớn nhất khi $x - 30 = 0 \\Rightarrow x = 30$.\nVậy cần bán $30$ sản phẩm.' },
    { cat: idThucTe, code: 'T9-TTC-03', content: 'Một khung nhôm hình chữ nhật có chu vi $6$m. Cần cắt kính để lắp vào khung. Diện tích kính lớn nhất có thể lắp là bao nhiêu?', answer: '$2,25 \\text{ m}^2$.', solution: 'Nửa chu vi hình chữ nhật là $6 : 2 = 3$ (m).\nGọi chiều dài và chiều rộng lần lượt là $a, b$ ($a, b > 0$). Ta có $a + b = 3$.\nDiện tích kính là $S = a \\cdot b$.\nÁp dụng BĐT Cô-si: $ab \\le \\left(\\dfrac{a + b}{2}\\right)^2 = \\left(\\dfrac{3}{2}\\right)^2 = 2,25$.\nDấu "=" xảy ra khi $a = b = 1,5$ (Khung hình vuông).\nVậy diện tích lớn nhất là $2,25 \\text{ m}^2$.' },
    { cat: idThucTe, code: 'T9-TTC-04', content: 'Để đóng một cái hộp hình trụ không nắp có thể tích $1000\\pi \\text{ cm}^3$ sao cho tốn ít vật liệu nhất (diện tích toàn phần nhỏ nhất), người thợ cần làm đáy bán kính bao nhiêu?', answer: '$10$ cm.', solution: 'Thể tích: $V = \\pi r^2 h = 1000\\pi \\Rightarrow h = \\dfrac{1000}{r^2}$.\nDiện tích vật liệu (xung quanh + 1 đáy): $S = 2\\pi r h + \\pi r^2 = 2\\pi r \\left(\\dfrac{1000}{r^2}\\right) + \\pi r^2 = \\dfrac{2000\\pi}{r} + \\pi r^2$.\nÁp dụng BĐT Cô-si cho 3 số dương $\\dfrac{1000\\pi}{r}, \\dfrac{1000\\pi}{r}, \\pi r^2$:\n$S = \\dfrac{1000\\pi}{r} + \\dfrac{1000\\pi}{r} + \\pi r^2 \\ge 3\\sqrt[3]{\\dfrac{1000000\\pi^3}{r^2} \\cdot r^2} = 300\\pi$.\nDấu "=" khi $\\dfrac{1000\\pi}{r} = \\pi r^2 \\Rightarrow r^3 = 1000 \\Rightarrow r = 10$ (cm).\nVậy bán kính đáy là $10$ cm.' },
    { cat: idThucTe, code: 'T9-TTC-05', content: 'Một cửa hàng bán sách. Nếu bán giá $100$ nghìn đồng/cuốn thì bán được $200$ cuốn. Người ta thấy cứ giảm giá $5$ nghìn đồng thì bán thêm được $20$ cuốn. Cần định giá bán bao nhiêu để doanh thu cao nhất?', answer: '$75$ nghìn đồng.', solution: 'Gọi $x$ là số lần giảm giá $5$ nghìn đồng ($x \\ge 0$).\nGiá bán một cuốn sách là: $100 - 5x$ (nghìn đồng).\nSố cuốn sách bán được là: $200 + 20x$ (cuốn).\nDoanh thu: $D = (100 - 5x)(200 + 20x) = -100x^2 + 1000x + 20000$.\n$D = -100(x^2 - 10x) + 20000 = -100(x - 5)^2 + 2500 + 20000 = -100(x - 5)^2 + 22500$.\nDoanh thu lớn nhất khi $x - 5 = 0 \\Rightarrow x = 5$.\nGiá bán cần định là: $100 - 5 \\times 5 = 75$ (nghìn đồng).' }
  );

  console.log(`Inserting ${allQS.length} new questions for Grade 9 (Part 2)...`);

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
