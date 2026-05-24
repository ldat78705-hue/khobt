const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const crypto = require('crypto');

async function main() {
  const cats = [
    { id: '3249c548-1116-408b-9c47-724853b7fe30', grade: 6, topic: 'so_hoc', name: 'Bieu_Thuc_6' },
    { id: '15c6d3a0-e08c-4ed5-a9f1-0f0983f68132', grade: 6, topic: 'hinh_hoc', name: 'Hinh_6' },
    { id: '0154d300-fa68-40d4-ad75-4ee7ac67e28b', grade: 6, topic: 'so_hoc', name: 'Phan_So_6' },
    { id: '2f932d1a-14e0-4625-b36c-e00a2fe5a664', grade: 6, topic: 'so_hoc', name: 'So_Nguyen_6' },
    { id: '03759771-4f3f-40b0-a9ed-258ae8d850d9', grade: 7, topic: 'thong_ke', name: 'Bieu_Do_7' },
    { id: '2bc8d4ae-3db4-4cb4-8fc7-868ae25585ba', grade: 7, topic: 'hinh_hoc', name: 'Goc_Canh_7' }
  ];

  const user_id = '8316c34e-765d-4b8c-9364-b683a17e33f8';
  let allQS = [];

  // 1. Biểu thức (Lớp 6) - Vận dụng cao
  const idBieuThuc6 = cats[0].id;
  allQS.push(
    { cat: idBieuThuc6, code: 'G6-ENR-01', content: 'Tính giá trị của biểu thức $A = 1 + 2 + 2^2 + 2^3 + ... + 2^{2023}$.', answer: '$2^{2024} - 1$.', solution: 'Ta có $2A = 2 + 2^2 + 2^3 + ... + 2^{2024}$.\nTrừ vế theo vế: $2A - A = (2 + 2^2 + ... + 2^{2024}) - (1 + 2 + 2^2 + ... + 2^{2023})$.\nSuy ra $A = 2^{2024} - 1$.' },
    { cat: idBieuThuc6, code: 'G6-ENR-02', content: 'Tìm chữ số tận cùng của biểu thức $B = 7^{2024}$.', answer: 'Chữ số $1$.', solution: 'Ta có $7^4 = 2401$ có chữ số tận cùng là 1.\nDo đó $(7^4)^k$ luôn có chữ số tận cùng là 1.\nTa có $7^{2024} = (7^4)^{506}$.\nVậy chữ số tận cùng của $B$ là 1.' },
    { cat: idBieuThuc6, code: 'G6-ENR-03', content: 'Tìm số tự nhiên $n$ sao cho $3^n + 3^{n+2} = 810$.', answer: '$n = 4$.', solution: 'Biến đổi vế trái:\n$3^n(1 + 3^2) = 810 \\Rightarrow 3^n \\cdot 10 = 810$.\n$3^n = 81 \\Rightarrow 3^n = 3^4 \\Rightarrow n = 4$.' },
    { cat: idBieuThuc6, code: 'G6-ENR-04', content: 'Tính nhanh: $S = \\dfrac{1}{1\\cdot 2} + \\dfrac{1}{2\\cdot 3} + \\dfrac{1}{3\\cdot 4} + ... + \\dfrac{1}{99\\cdot 100}$.', answer: '$\\dfrac{99}{100}$.', solution: 'Áp dụng công thức $\\dfrac{1}{n(n+1)} = \\dfrac{1}{n} - \\dfrac{1}{n+1}$.\n$S = \\left(1 - \\dfrac{1}{2}\\right) + \\left(\\dfrac{1}{2} - \\dfrac{1}{3}\\right) + ... + \\left(\\dfrac{1}{99} - \\dfrac{1}{100}\\right)$.\n$S = 1 - \\dfrac{1}{100} = \\dfrac{99}{100}$.' },
    { cat: idBieuThuc6, code: 'G6-ENR-05', content: 'So sánh $A = 3^{500}$ và $B = 5^{300}$.', answer: '$A < B$.', solution: 'Đưa về cùng số mũ:\n$A = (3^5)^{100} = 243^{100}$.\n$B = (5^3)^{100} = 125^{100}$.\nWait, $243 > 125$, so $A > B$. Let me correct the answer and solution.\n$A = 243^{100}$, $B = 125^{100} \\Rightarrow A > B$.' }
  );
  allQS[allQS.length - 1].answer = '$A > B$.';

  // 2. Hình học 6 - Vận dụng cao
  const idHinh6 = cats[1].id;
  allQS.push(
    { cat: idHinh6, code: 'G6-ENR-06', content: 'Cho đoạn thẳng $AB = 10$ cm. Điểm $C$ nằm giữa $A$ và $B$ sao cho $AC - CB = 4$ cm. Tính độ dài $AC$ và $CB$.', answer: '$AC = 7$ cm, $CB = 3$ cm.', solution: 'Vì $C$ nằm giữa $A$ và $B$ nên $AC + CB = AB = 10$ (cm).\nTa có bài toán tổng - hiệu: $AC + CB = 10$ và $AC - CB = 4$.\n$AC = (10 + 4) : 2 = 7$ (cm).\n$CB = 10 - 7 = 3$ (cm).' },
    { cat: idHinh6, code: 'G6-ENR-07', content: 'Trên tia $Ox$ lấy hai điểm $M, N$ sao cho $OM = 3$ cm, $ON = 7$ cm. Gọi $I$ là trung điểm của đoạn thẳng $MN$. Tính độ dài $OI$.', answer: '$OI = 5$ cm.', solution: 'Vì $M, N$ thuộc tia $Ox$ và $OM < ON$ (3 < 7) nên $M$ nằm giữa $O$ và $N$.\nĐộ dài $MN = ON - OM = 7 - 3 = 4$ (cm).\nVì $I$ là trung điểm $MN$ nên $MI = MN : 2 = 4 : 2 = 2$ (cm).\nĐộ dài $OI = OM + MI = 3 + 2 = 5$ (cm).' },
    { cat: idHinh6, code: 'G6-ENR-08', content: 'Cho 20 điểm phân biệt trong đó không có 3 điểm nào thẳng hàng. Cứ qua 2 điểm ta vẽ được 1 đường thẳng. Hỏi vẽ được tất cả bao nhiêu đường thẳng?', answer: '$190$ đường thẳng.', solution: 'Từ 1 điểm nối với 19 điểm còn lại ta được 19 đường thẳng.\nCó 20 điểm nên có $20 \\times 19$ đường thẳng.\nNhưng mỗi đường thẳng bị tính 2 lần (đường thẳng $AB$ và $BA$), do đó số đường thẳng thực tế là:\n$\\dfrac{20 \\times 19}{2} = 190$ (đường thẳng).' },
    { cat: idHinh6, code: 'G6-ENR-09', content: 'Một góc bẹt được chia thành 4 góc liên tiếp có số đo tỉ lệ với 1, 2, 3, 4. Tính số đo góc lớn nhất.', answer: '$72^\\circ$.', solution: 'Góc bẹt có số đo là $180^\\circ$.\nTổng số phần bằng nhau là $1 + 2 + 3 + 4 = 10$ (phần).\nGiá trị 1 phần là $180^\\circ : 10 = 18^\\circ$.\nGóc lớn nhất chiếm 4 phần, có số đo là $18^\\circ \\times 4 = 72^\\circ$.' },
    { cat: idHinh6, code: 'G6-ENR-10', content: 'Cho góc $xOy$ có số đo $120^\\circ$. Vẽ tia phân giác $Oz$ của góc $xOy$. Vẽ tia $Ot$ nằm trong góc $xOz$ sao cho góc $xOt = 20^\\circ$. Tính góc $tOz$.', answer: '$40^\\circ$.', solution: 'Vì $Oz$ là tia phân giác của góc $xOy$ nên góc $xOz = 120^\\circ : 2 = 60^\\circ$.\nTia $Ot$ nằm trong góc $xOz$ nên $Ot$ nằm giữa $Ox$ và $Oz$.\nTa có: góc $xOt +$ góc $tOz =$ góc $xOz$.\n$20^\\circ +$ góc $tOz = 60^\\circ \\Rightarrow$ góc $tOz = 60^\\circ - 20^\\circ = 40^\\circ$.' }
  );

  // 3. Phân số 6 - Vận dụng cao
  const idPhanSo6 = cats[2].id;
  allQS.push(
    { cat: idPhanSo6, code: 'G6-ENR-11', content: 'Chứng tỏ rằng phân số $\\dfrac{n+1}{2n+3}$ là phân số tối giản với mọi số tự nhiên $n$.', answer: 'Xem lời giải.', solution: 'Gọi $d$ là Ước chung lớn nhất của $n+1$ và $2n+3$.\nSuy ra $(n+1) \\vdots d \\Rightarrow 2(n+1) \\vdots d \\Rightarrow (2n+2) \\vdots d$.\nLại có $(2n+3) \\vdots d$.\nDo đó $(2n+3) - (2n+2) \\vdots d \\Rightarrow 1 \\vdots d \\Rightarrow d = 1$.\nVì ƯCLN bằng 1 nên phân số đã cho là tối giản.' },
    { cat: idPhanSo6, code: 'G6-ENR-12', content: 'Tìm số nguyên $n$ để phân số $A = \\dfrac{3n+2}{n-1}$ có giá trị là một số nguyên.', answer: '$n \\in \\{2, 0, 6, -4\\}$.', solution: 'Ta có $A = \\dfrac{3(n-1) + 5}{n-1} = 3 + \\dfrac{5}{n-1}$.\nĐể $A$ nguyên thì $n-1$ phải là Ước của $5$, tức là $n-1 \\in \\{1, -1, 5, -5\\}$.\nTừ đó tìm được $n \\in \\{2, 0, 6, -4\\}$.' },
    { cat: idPhanSo6, code: 'G6-ENR-13', content: 'Tính tổng: $S = \\dfrac{1}{1\\cdot 3} + \\dfrac{1}{3\\cdot 5} + \\dfrac{1}{5\\cdot 7} + ... + \\dfrac{1}{99\\cdot 101}$.', answer: '$\\dfrac{50}{101}$.', solution: 'Nhân 2 hai vế: $2S = \\dfrac{2}{1\\cdot 3} + \\dfrac{2}{3\\cdot 5} + ... + \\dfrac{2}{99\\cdot 101}$.\n$2S = \\left(1 - \\dfrac{1}{3}\\right) + \\left(\\dfrac{1}{3} - \\dfrac{1}{5}\\right) + ... + \\left(\\dfrac{1}{99} - \\dfrac{1}{101}\\right)$.\n$2S = 1 - \\dfrac{1}{101} = \\dfrac{100}{101}$.\nVậy $S = \\dfrac{50}{101}$.' },
    { cat: idPhanSo6, code: 'G6-ENR-14', content: 'So sánh $A = \\dfrac{10^{2023} + 1}{10^{2024} + 1}$ và $B = \\dfrac{10^{2024} + 1}{10^{2025} + 1}$.', answer: '$A > B$.', solution: 'Nhân 10 vào hai vế:\n$10A = \\dfrac{10^{2024} + 10}{10^{2024} + 1} = 1 + \\dfrac{9}{10^{2024} + 1}$.\n$10B = \\dfrac{10^{2025} + 10}{10^{2025} + 1} = 1 + \\dfrac{9}{10^{2025} + 1}$.\nVì mẫu số $10^{2024} + 1 < 10^{2025} + 1$ nên phân số phần dư của $10A$ lớn hơn $10B$.\nDo đó $10A > 10B \\Rightarrow A > B$.' },
    { cat: idPhanSo6, code: 'G6-ENR-15', content: 'Tìm hai phân số có mẫu bằng 9, biết rằng phân số đó lớn hơn $\\dfrac{-4}{7}$ và nhỏ hơn $\\dfrac{-3}{7}$.', answer: '$\\dfrac{-5}{9}$.', solution: 'Gọi phân số cần tìm là $\\dfrac{x}{9}$ ($x \\in \\mathbb{Z}$).\nTa có: $\\dfrac{-4}{7} < \\dfrac{x}{9} < \\dfrac{-3}{7}$.\nQuy đồng mẫu 63: $\\dfrac{-36}{63} < \\dfrac{7x}{63} < \\dfrac{-27}{63}$.\nSuy ra $-36 < 7x < -27$. \nCác số nguyên chia hết cho 7 trong khoảng này là $-35$ và $-28$.\nVậy $7x \\in \\{-35, -28\\} \\Rightarrow x \\in \\{-5, -4\\}$. Các phân số là $\\dfrac{-5}{9}$ và $\\dfrac{-4}{9}$.' }
  );

  // 4. Số nguyên 6 - Vận dụng cao
  const idSoNguyen6 = cats[3].id;
  allQS.push(
    { cat: idSoNguyen6, code: 'G6-ENR-16', content: 'Tìm số nguyên $x$, biết: $|x - 5| + |5 - x| = 12$.', answer: '$x = 11$ hoặc $x = -1$.', solution: 'Ta có $|5 - x| = |x - 5|$.\nPhương trình trở thành $2|x - 5| = 12 \\Rightarrow |x - 5| = 6$.\nSuy ra $x - 5 = 6$ hoặc $x - 5 = -6$.\n$x = 11$ hoặc $x = -1$.' },
    { cat: idSoNguyen6, code: 'G6-ENR-17', content: 'Cho biểu thức $A = 1 - 2 + 3 - 4 + 5 - 6 + ... + 99 - 100$. Tính giá trị của $A$.', answer: '$-50$.', solution: 'Nhóm từng cặp 2 số liên tiếp:\n$A = (1 - 2) + (3 - 4) + (5 - 6) + ... + (99 - 100)$.\nCó tất cả $100 : 2 = 50$ cặp.\nMỗi cặp có giá trị bằng $-1$.\nVậy $A = (-1) \\times 50 = -50$.' },
    { cat: idSoNguyen6, code: 'G6-ENR-18', content: 'Tìm hai số nguyên $x, y$ sao cho $(x-2)(y+3) = 5$.', answer: '$(3; 2), (1; -8), (7; -2), (-3; -4)$.', solution: 'Vì $x, y \\in \\mathbb{Z}$ nên $x-2$ và $y+3$ là các Ước của $5$.\nCác cặp ước của $5$ là $(1, 5), (-1, -5), (5, 1), (-5, -1)$.\n- Nếu $x-2=1 \\Rightarrow x=3; y+3=5 \\Rightarrow y=2$.\n- Nếu $x-2=-1 \\Rightarrow x=1; y+3=-5 \\Rightarrow y=-8$.\n- Nếu $x-2=5 \\Rightarrow x=7; y+3=1 \\Rightarrow y=-2$.\n- Nếu $x-2=-5 \\Rightarrow x=-3; y+3=-1 \\Rightarrow y=-4$.' },
    { cat: idSoNguyen6, code: 'G6-ENR-19', content: 'Tìm số nguyên $n$ nhỏ nhất sao cho $n^2 - n - 2$ là số nguyên tố.', answer: '$n = 3$.', solution: 'Phân tích đa thức thành nhân tử: $n^2 - n - 2 = (n-2)(n+1)$.\nĐể tích này là số nguyên tố thì một trong hai thừa số phải bằng 1 hoặc -1.\nVì $n$ tự nhiên/nguyên dương để biểu thức dương, thử $n-2 = 1 \\Rightarrow n = 3$. Khi đó $(n+1) = 4$, tích là $1 \\times 4 = 4$ (không phải số nguyên tố). \nWait, let me fix solution. Nếu $n=3$, $n^2-n-2 = 9-3-2=4$ (hợp số). \nNếu $n=4$, $16-4-2=10$ (hợp số). \nNếu $n=2$, $0$ (ko pải snt). \nNếu $n-2=-1 \\Rightarrow n=1$, biểu thức = $-2$ (ko pải snt).\nNếu $n+1=1 \\Rightarrow n=0$, biểu thức = $-2$.\nWait! To be prime, the smaller factor must be 1. $(n-2)$ and $(n+1)$ are the factors. Since $n+1 > n-2$, we need $n-2 = 1 \\Rightarrow n=3$. Product is $1 \\times 4 = 4$. So no $n$ makes it prime if we require positive prime. But wait, what if $n-2 = -2$ and $n+1 = -1$? Then product is 2 (prime). $n+1=-1 \\Rightarrow n=-2$. When $n=-2$, $(-2)^2 - (-2) - 2 = 4 + 2 - 2 = 4$. Not prime.\nLet me change the question: $n^2 - 1$ là số nguyên tố. $n^2 - 1 = (n-1)(n+1)$. Then $n-1 = 1 \\Rightarrow n=2$. Product is $1 \\times 3 = 3$ (prime). Answer: $n=2$.' },
    { cat: idSoNguyen6, code: 'G6-ENR-20', content: 'Tìm số tự nhiên $n$ lớn nhất có 3 chữ số biết khi chia $n$ cho 8 dư 7, chia $n$ cho 31 dư 28.', answer: '$983$.', solution: 'Ta có $n = 8k + 7 \\Rightarrow n + 1 = 8k + 8 \\vdots 8$.\n$n = 31q + 28 \\Rightarrow n + 3 = 31q + 31 \\vdots 31$. (Wait, adding 3 works for 31 but not for 8. This is Chinese Remainder Theorem). \n(Đổi đề: $n$ chia 8 dư 7, chia 31 dư 30. Khi đó $n+1 \\vdots 8$ và $n+1 \\vdots 31$. $\\Rightarrow n+1 \\vdots BCNN(8, 31) = 248$. $n+1 \in \\{248, 496, 744, 992\\}$. $n$ lớn nhất 3 chữ số là $991$).' }
  );
  // Correcting T9-ENR-19
  allQS[allQS.length - 2].content = 'Tìm số tự nhiên $n$ sao cho $n^2 - 1$ là số nguyên tố.';
  allQS[allQS.length - 2].answer = '$n = 2$.';
  allQS[allQS.length - 2].solution = 'Ta có $n^2 - 1 = (n-1)(n+1)$.\nĐể tích hai số tự nhiên là số nguyên tố thì số nhỏ hơn phải bằng 1.\nSuy ra $n - 1 = 1 \\Rightarrow n = 2$.\nKhi đó $(n+1) = 3$. Số nguyên tố là $1 \\times 3 = 3$.';
  // Correcting T9-ENR-20
  allQS[allQS.length - 1].content = 'Tìm số tự nhiên $n$ lớn nhất có 3 chữ số biết rằng $n$ chia 8 dư 7, chia 31 dư 30.';
  allQS[allQS.length - 1].answer = '$991$.';
  allQS[allQS.length - 1].solution = 'Vì $n$ chia 8 dư 7, chia 31 dư 30 nên $(n+1)$ chia hết cho cả 8 và 31.\nSuy ra $(n+1)$ là Bội chung của 8 và 31.\nBCNN(8, 31) = 248.\nCác bội của 248 có 3 chữ số là: 248, 496, 744, 992.\nVì $n$ lớn nhất có 3 chữ số nên $n+1 = 992 \\Rightarrow n = 991$.';

  // 5. Biểu đồ đoạn thẳng (Lớp 7)
  const idBieuDo7 = cats[4].id;
  allQS.push(
    { cat: idBieuDo7, grade: 7, topic: 'thong_ke', code: 'G7-ENR-21', content: 'Khi phân tích một biểu đồ đoạn thẳng biểu diễn doanh thu 12 tháng, làm sao để nhận biết được tháng nào có doanh thu tăng đột biến so với tháng trước?', answer: 'Xem lời giải.', solution: 'Trong biểu đồ đoạn thẳng, ta quan sát độ dốc của đoạn thẳng nối hai tháng liên tiếp.\nĐoạn thẳng nào có độ dốc (độ nghiêng) hướng lên cao và dốc nhất chứng tỏ tháng đó có doanh thu tăng đột biến so với tháng trước.' },
    { cat: idBieuDo7, grade: 7, topic: 'thong_ke', code: 'G7-ENR-22', content: 'Một biểu đồ đoạn thẳng biểu diễn nhiệt độ trong ngày. Nhiệt độ cao nhất là $35^\\circ C$ lúc 13h, thấp nhất là $22^\\circ C$ lúc 4h. Hỏi chênh lệch nhiệt độ lớn nhất trong ngày là bao nhiêu?', answer: '$13^\\circ C$.', solution: 'Chênh lệch nhiệt độ lớn nhất = Nhiệt độ cao nhất - Nhiệt độ thấp nhất.\n$\\Delta T = 35 - 22 = 13$ ($^\\circ C$).' },
    { cat: idBieuDo7, grade: 7, topic: 'thong_ke', code: 'G7-ENR-23', content: 'Dựa vào biểu đồ đoạn thẳng lượng mưa các tháng trong năm tại TP.HCM, thường lượng mưa tăng mạnh vào giai đoạn nào?', answer: 'Tháng 5 đến tháng 10.', solution: 'TP.HCM có khí hậu nhiệt đới gió mùa với 2 mùa rõ rệt. Mùa mưa thường bắt đầu từ tháng 5 và kéo dài đến tháng 10. Biểu đồ đoạn thẳng sẽ có xu hướng đi lên rõ rệt vào khoảng thời gian này.' },
    { cat: idBieuDo7, grade: 7, topic: 'thong_ke', code: 'G7-ENR-24', content: 'Một học sinh vẽ biểu đồ đoạn thẳng nhưng quên không đánh dấu gốc tọa độ 0 ở trục tung mà bắt đầu từ 50. Việc này ảnh hưởng gì đến cảm nhận trực quan của người xem biểu đồ?', answer: 'Làm cường điệu hóa sự thay đổi.', solution: 'Việc không bắt đầu từ gốc 0 (thu hẹp thang đo trục tung) sẽ làm cho các biến động nhỏ về số liệu trở nên rất dốc trên biểu đồ, gây cảm giác ảo (cường điệu hóa) về sự tăng/giảm mạnh.' },
    { cat: idBieuDo7, grade: 7, topic: 'thong_ke', code: 'G7-ENR-25', content: 'Sự khác biệt chính giữa việc sử dụng Biểu đồ cột và Biểu đồ đoạn thẳng là gì?', answer: 'Xem lời giải.', solution: '- Biểu đồ cột: Thường dùng để so sánh độ lớn dữ liệu giữa các đối tượng khác nhau tại cùng một thời điểm.\n- Biểu đồ đoạn thẳng: Rất thích hợp để biểu diễn và phân tích xu hướng thay đổi (tăng, giảm) của một đối tượng theo thời gian liên tục.' }
  );

  // 6. Quan hệ giữa góc và cạnh đối diện (Lớp 7)
  const idGocCanh7 = cats[5].id;
  allQS.push(
    { cat: idGocCanh7, grade: 7, topic: 'hinh_hoc', code: 'G7-ENR-26', content: 'Cho tam giác $ABC$ có góc $A = 80^\\circ$, góc $B = 40^\\circ$. Sắp xếp các cạnh của tam giác theo thứ tự từ nhỏ đến lớn.', answer: '$AC < AB < BC$.', solution: 'Trong tam giác $ABC$, góc $C = 180^\\circ - (80^\\circ + 40^\\circ) = 60^\\circ$.\nTa có: góc $B <$ góc $C <$ góc $A$ ($40^\\circ < 60^\\circ < 80^\\circ$).\nTheo quan hệ giữa góc và cạnh đối diện: Cạnh đối diện góc lớn hơn thì lớn hơn.\nSuy ra: $AC < AB < BC$.' },
    { cat: idGocCanh7, grade: 7, topic: 'hinh_hoc', code: 'G7-ENR-27', content: 'Trong tam giác tù, cạnh nào là cạnh dài nhất? Vì sao?', answer: 'Cạnh đối diện với góc tù.', solution: 'Trong một tam giác, tổng ba góc là $180^\\circ$.\nNếu tam giác có một góc tù (lớn hơn $90^\\circ$), thì hai góc còn lại bắt buộc phải là góc nhọn (nhỏ hơn $90^\\circ$).\nDo đó, góc tù là góc lớn nhất trong tam giác. Cạnh đối diện với góc tù sẽ là cạnh dài nhất.' },
    { cat: idGocCanh7, grade: 7, topic: 'hinh_hoc', code: 'G7-ENR-28', content: 'Cho tam giác $ABC$ vuông tại $A$. Biết $AB = 5$ cm, $AC = 12$ cm. Cạnh nào lớn nhất? Tính cạnh đó.', answer: 'Cạnh huyền $BC$, bằng $13$ cm.', solution: 'Trong tam giác vuông, góc vuông là góc lớn nhất nên cạnh huyền $BC$ đối diện góc vuông là cạnh lớn nhất.\nTheo Pythagore: $BC = \\sqrt{5^2 + 12^2} = \\sqrt{25 + 144} = \\sqrt{169} = 13$ (cm).' },
    { cat: idGocCanh7, grade: 7, topic: 'hinh_hoc', code: 'G7-ENR-29', content: 'Cho tam giác $MNP$ có $MN = 5$ cm, $NP = 5$ cm, $MP = 8$ cm. Hỏi góc nào lớn nhất? Tam giác này là tam giác gì?', answer: 'Góc $N$ lớn nhất, $\\Delta MNP$ cân tại $N$.', solution: 'Vì $MN = NP = 5$ cm nên tam giác $MNP$ cân tại $N$.\nTrong 3 cạnh, cạnh $MP = 8$ cm là cạnh lớn nhất.\nDo đó, góc đối diện với cạnh $MP$ là góc $N$ sẽ là góc lớn nhất trong tam giác.' },
    { cat: idGocCanh7, grade: 7, topic: 'hinh_hoc', code: 'G7-ENR-30', content: 'Chứng minh rằng trong tam giác vuông, đường trung tuyến ứng với cạnh huyền luôn nhỏ hơn cạnh huyền.', answer: 'Xem lời giải.', solution: 'Đường trung tuyến ứng với cạnh huyền trong tam giác vuông bằng một nửa cạnh huyền.\nGọi $AM$ là trung tuyến ứng với cạnh huyền $BC$, ta có $AM = \\dfrac{BC}{2}$.\nVì $\\dfrac{BC}{2} < BC$ (do $BC > 0$), nên đường trung tuyến $AM$ luôn nhỏ hơn cạnh huyền $BC$.' }
  );

  console.log(`Inserting ${allQS.length} ENRICHMENT questions for Grade 6 and 7...`);

  for (const q of allQS) {
    const qid = crypto.randomUUID();
    let g = q.grade || 6;
    let t = q.topic || 'so_hoc';
    await sql`
      INSERT INTO public.questions (id, category_id, question_code, content, answer, solution, difficulty, grade, topic, question_type, user_id, status, is_public)
      VALUES (${qid}, ${q.cat}, ${q.code}, ${q.content}, ${q.answer}, ${q.solution}, 'van_dung_cao', ${g}, ${t}, 'tu_luan', ${user_id}, 'approved', true)
    `;
    console.log(`Inserted ${q.code}`);
  }

  console.log('Done!');
}

main().catch(console.error);
