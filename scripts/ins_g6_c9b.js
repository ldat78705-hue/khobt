const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const U = '8316c34e-765d-4b8c-9364-b683a17e33f8', G = 6;
const B = [
  { id: '6caa006a-02df-4116-8fa5-262dead21762', p: 'T6-C9B41', t: 'thong_ke', q: [
    { c: `Biểu đồ cột kép khác biểu đồ cột đơn ở điểm nào?`, a: `Mỗi hạng mục có 2 cột song song để so sánh.`, s: `Biểu đồ cột kép dùng **hai cột** cạnh nhau cho mỗi hạng mục, giúp so sánh hai bộ dữ liệu (VD: nam/nữ, kỳ 1/kỳ 2).`, d: 'nhan_biet' },
    { c: `Đọc biểu đồ cột kép: Lớp 6A nam 18, nữ 15; 6B nam 16, nữ 19. Lớp nào nhiều HS hơn?`, a: `6B (35 HS).`, s: `6A: $18+15=33$. 6B: $16+19=35$. Lớp 6B nhiều hơn.`, d: 'nhan_biet' },
    { c: `Khi nào nên dùng biểu đồ cột kép?`, a: `Khi cần so sánh 2 nhóm dữ liệu cùng hạng mục.`, s: `Dùng biểu đồ cột kép khi cần so sánh hai bộ dữ liệu có cùng các hạng mục. VD: so sánh kết quả học tập HK1 và HK2.`, d: 'nhan_biet' },
    { c: `Bán hàng T1: A(50), B(30); T2: A(60), B(45). Vẽ biểu đồ cột kép và nhận xét.`, a: `Cả A và B đều tăng, A tăng nhiều hơn.`, s: `Biểu đồ 2 nhóm (T1, T2), mỗi nhóm 2 cột (A, B).\nNhận xét: A tăng $10$ ($20\\%$), B tăng $15$ ($50\\%$). B tăng nhanh hơn theo tỉ lệ.`, d: 'thong_hieu' },
    { c: `HS giỏi: 2023 nam 12, nữ 15; 2024 nam 14, nữ 18. Tính tỉ lệ tăng của mỗi nhóm.`, a: `Nam tăng $16{,}7\\%$, nữ tăng $20\\%$.`, s: `Nam: $\\frac{14-12}{12} \\approx 16{,}7\\%$. Nữ: $\\frac{18-15}{15} = 20\\%$.`, d: 'thong_hieu' },
    { c: `Từ biểu đồ cột kép: Toán nam(7.5), nữ(8.0); Văn nam(6.5), nữ(7.8); Anh nam(7.0), nữ(7.2). Nhận xét giới tính nào có điểm TB cao hơn.`, a: `Nữ cao hơn ở cả 3 môn.`, s: `So sánh: Toán: nữ $>$ nam ($8{,}0 > 7{,}5$). Văn: nữ $>$ nam ($7{,}8 > 6{,}5$). Anh: nữ $>$ nam ($7{,}2 > 7{,}0$). Nhận xét: Nữ có điểm TB cao hơn nam ở cả 3 môn.`, d: 'thong_hieu' },
    { c: `Lập bảng dữ liệu và vẽ biểu đồ cột kép so sánh số HS giỏi HK1 và HK2 của 4 lớp: 6A(10,14), 6B(8,12), 6C(12,11), 6D(9,15).`, a: `Bảng + biểu đồ.`, s: `| Lớp | HK1 | HK2 |\n|---|---|---|\n| 6A | 10 | 14 |\n| 6B | 8 | 12 |\n| 6C | 12 | 11 |\n| 6D | 9 | 15 |\n\nNhận xét: 6A, 6B, 6D tăng; 6C giảm $1$.`, d: 'van_dung' },
    { c: `Biểu đồ cột kép: Doanh thu Q1(100,80), Q2(120,90), Q3(110,95), Q4(140,100) (SP A, B). Quý nào chênh lệch A-B lớn nhất?`, a: `Q4 (chênh 40).`, s: `Chênh lệch: Q1: $20$, Q2: $30$, Q3: $15$, Q4: $40$. Lớn nhất: Q4.`, d: 'van_dung' },
    { c: `Giải thích tại sao biểu đồ cột kép không nên dùng quá 3 loại cột cho mỗi hạng mục.`, a: `Khó đọc, khó so sánh.`, s: `Khi có quá 3 loại cột, biểu đồ trở nên rối, khó phân biệt màu sắc và so sánh. Nên dùng biểu đồ khác (chồng, đường) khi có nhiều nhóm.`, d: 'van_dung_cao' },
    { c: `Từ biểu đồ cột kép, hãy tính và so sánh tốc độ tăng trưởng: Năm 1(100,200), Năm 2(150,240), Năm 3(200,260).`, a: `Nhóm A tăng $100\\%$, B tăng $30\\%$.`, s: `A: từ $100$ lên $200$, tăng $100\\%$.\nB: từ $200$ lên $260$, tăng $30\\%$.\nA tăng trưởng nhanh hơn nhiều dù giá trị tuyệt đối B luôn lớn hơn.`, d: 'van_dung_cao' },
  ]},
  { id: '2db00700-438a-4f62-add0-43a0e5dd4cd8', p: 'T6-C9B42', t: 'xac_suat', q: [
    { c: `Gieo xúc xắc 1 lần. Các kết quả có thể xảy ra là gì?`, a: `$1, 2, 3, 4, 5, 6$.`, s: `Xúc xắc có $6$ mặt. Các kết quả có thể: $\\{1, 2, 3, 4, 5, 6\\}$.`, d: 'nhan_biet' },
    { c: `Tung đồng xu 1 lần. Có bao nhiêu kết quả có thể?`, a: `$2$ kết quả: Sấp hoặc Ngửa.`, s: `Đồng xu có $2$ mặt. Kết quả: $\\{S, N\\}$ (Sấp, Ngửa).`, d: 'nhan_biet' },
    { c: `Nêu một sự kiện chắc chắn và một sự kiện không thể khi gieo xúc xắc.`, a: `Chắc chắn: "Ra mặt $\\le 6$". Không thể: "Ra mặt $7$".`, s: `**Chắc chắn**: "Mặt xuất hiện nhỏ hơn hoặc bằng $6$" (luôn đúng).\n**Không thể**: "Xuất hiện mặt $7$" (xúc xắc chỉ có mặt $1$-$6$).`, d: 'nhan_biet' },
    { c: `Rút 1 bi từ túi có 3 bi đỏ, 2 bi xanh. Sự kiện "rút được bi đỏ" là chắc chắn, có thể xảy ra, hay không thể?`, a: `Có thể xảy ra (ngẫu nhiên).`, s: `Túi có cả bi đỏ lẫn bi xanh nên sự kiện "rút bi đỏ" **có thể xảy ra** nhưng không chắc chắn → sự kiện ngẫu nhiên.`, d: 'thong_hieu' },
    { c: `Gieo xúc xắc. Sự kiện A: "Mặt chẵn". Liệt kê kết quả thuận lợi cho A.`, a: `$\\{2, 4, 6\\}$.`, s: `Mặt chẵn: $2, 4, 6$. Có $3$ kết quả thuận lợi trên tổng $6$ kết quả.`, d: 'thong_hieu' },
    { c: `Quay kim trên bàn quay chia $4$ phần bằng nhau (đỏ, xanh, vàng, tím). Kim dừng ở phần nào cũng được. Liệt kê không gian mẫu.`, a: `$\\{$đỏ, xanh, vàng, tím$\\}$.`, s: `Không gian mẫu $= \\{$đỏ, xanh, vàng, tím$\\}$, gồm $4$ phần tử.`, d: 'thong_hieu' },
    { c: `Rút 1 lá bài từ bộ 52 lá. Liệt kê các kết quả thuận lợi cho sự kiện "rút được lá Ách".`, a: `$4$ lá Ách.`, s: `Bộ bài có $4$ lá Ách (♠, ♥, ♦, ♣). Có $4$ kết quả thuận lợi.`, d: 'van_dung' },
    { c: `Gieo 2 xúc xắc. Có bao nhiêu kết quả có thể? Liệt kê các kết quả có tổng bằng $7$.`, a: `$36$ kết quả. Tổng $7$: $(1,6),(2,5),(3,4),(4,3),(5,2),(6,1)$.`, s: `Tổng kết quả: $6 \\times 6 = 36$.\nCác cặp tổng $7$: $(1,6), (2,5), (3,4), (4,3), (5,2), (6,1)$ → $6$ cặp.`, d: 'van_dung' },
    { c: `Cho ví dụ về một trò chơi trong đó sự kiện có 3 kết quả đồng khả năng.`, a: `VD: rút bi từ túi 3 bi khác màu.`, s: `VD: Túi có $3$ bi: đỏ, xanh, vàng. Rút ngẫu nhiên $1$ bi. Ba kết quả đỏ/xanh/vàng đồng khả năng (cùng xác suất $\\frac{1}{3}$).`, d: 'van_dung_cao' },
    { c: `Phân biệt sự kiện "đồng khả năng" và sự kiện "ngẫu nhiên". Cho ví dụ.`, a: `Ngẫu nhiên: có thể xảy ra hoặc không. Đồng khả năng: cùng khả năng.`, s: `**Ngẫu nhiên**: Sự kiện có thể xảy ra hoặc không (VD: gieo xúc xắc ra $6$).\n**Đồng khả năng**: Các kết quả có cùng khả năng xảy ra (VD: $6$ mặt xúc xắc cân đối).\nNếu xúc xắc bị lệch tâm → vẫn ngẫu nhiên nhưng không đồng khả năng.`, d: 'van_dung_cao' },
  ]},
  { id: '403d31c7-c02c-4c0a-9e17-d6ee84990d69', p: 'T6-C9B43', t: 'xac_suat', q: [
    { c: `Gieo đồng xu $20$ lần, mặt ngửa xuất hiện $12$ lần. Tính xác suất thực nghiệm của mặt ngửa.`, a: `$\\dfrac{12}{20} = 0{,}6$.`, s: `XS thực nghiệm $= \\dfrac{\\text{số lần ngửa}}{\\text{tổng số lần gieo}} = \\dfrac{12}{20} = 0{,}6 = 60\\%$.`, d: 'nhan_biet' },
    { c: `Xác suất thực nghiệm là gì?`, a: `Tỉ số giữa số lần sự kiện xảy ra và tổng số lần thử.`, s: `**Xác suất thực nghiệm** của một sự kiện $= \\dfrac{\\text{số lần sự kiện xảy ra}}{\\text{tổng số lần thực hiện thí nghiệm}}$.`, d: 'nhan_biet' },
    { c: `Gieo xúc xắc $60$ lần, mặt $6$ xuất hiện $8$ lần. Tính XS thực nghiệm ra mặt $6$.`, a: `$\\dfrac{8}{60} = \\dfrac{2}{15} \\approx 0{,}133$.`, s: `$P = \\dfrac{8}{60} = \\dfrac{2}{15} \\approx 13{,}3\\%$.`, d: 'nhan_biet' },
    { c: `Gieo đồng xu $100$ lần, ngửa $47$ lần. XS thực nghiệm gần với XS lý thuyết $\\dfrac{1}{2}$ không?`, a: `Gần ($0{,}47 \\approx 0{,}5$).`, s: `XS thực nghiệm $= 0{,}47$, XS lý thuyết $= 0{,}5$. Chênh lệch $= 0{,}03 = 3\\%$ → khá gần.`, d: 'thong_hieu' },
    { c: `Rút bi từ túi $50$ lần (có hoàn lại). Kết quả: đỏ 18, xanh 20, vàng 12. Ước đoán tỉ lệ bi trong túi.`, a: `Đỏ $\\approx 36\\%$, xanh $\\approx 40\\%$, vàng $\\approx 24\\%$.`, s: `Đỏ: $\\frac{18}{50} = 36\\%$, xanh: $\\frac{20}{50} = 40\\%$, vàng: $\\frac{12}{50} = 24\\%$.`, d: 'thong_hieu' },
    { c: `Tại sao khi gieo đồng xu $10$ lần có thể ra $8$ lần ngửa, nhưng gieo $1000$ lần thì tỉ lệ ngửa gần $50\\%$?`, a: `Quy luật số lớn.`, s: `Đây là **quy luật số lớn**: khi số lần thử nghiệm tăng, XS thực nghiệm tiến gần XS lý thuyết. Với ít lần thử, dao động ngẫu nhiên lớn.`, d: 'thong_hieu' },
    { c: `Gieo xúc xắc $120$ lần. Kết quả: 1(22), 2(18), 3(20), 4(19), 5(21), 6(20). Xúc xắc có cân đối không?`, a: `Có vẻ cân đối.`, s: `XS lý thuyết mỗi mặt: $\\frac{1}{6} \\approx 16{,}7\\%$, tức khoảng $20$ lần.\nKết quả dao động $18$-$22$, rất gần $20$ → xúc xắc có vẻ cân đối.`, d: 'van_dung' },
    { c: `Một máy sản xuất kiểm tra $500$ sản phẩm, có $15$ phế phẩm. Ước tính trong lô $10000$ sản phẩm có bao nhiêu phế phẩm?`, a: `$300$ phế phẩm.`, s: `Tỉ lệ phế phẩm $= \\frac{15}{500} = 3\\%$.\nƯớc tính: $10000 \\times 3\\% = 300$ phế phẩm.`, d: 'van_dung' },
    { c: `Gieo đồng xu $n$ lần. Tỉ lệ ngửa lần lượt: $n=10$ → $0{,}3$; $n=100$ → $0{,}45$; $n=1000$ → $0{,}498$. Nhận xét.`, a: `$n$ càng lớn, XS thực nghiệm càng gần $0{,}5$.`, s: `Khi $n$ tăng: $0{,}3 \\to 0{,}45 \\to 0{,}498$, tiến dần về $0{,}5$. Minh họa quy luật số lớn.`, d: 'van_dung_cao' },
    { c: `Phân biệt xác suất lý thuyết và xác suất thực nghiệm. Khi nào hai giá trị này bằng nhau?`, a: `Hai giá trị bằng nhau khi $n \\to \\infty$ (giới hạn).`, s: `**XS lý thuyết**: tính bằng lập luận (VD: $\\frac{1}{6}$ cho xúc xắc).\n**XS thực nghiệm**: tính từ thí nghiệm thực tế.\nTheo quy luật số lớn, khi $n \\to \\infty$, XS thực nghiệm hội tụ về XS lý thuyết. Trong thực tế, chúng chỉ xấp xỉ nhau.`, d: 'van_dung_cao' },
  ]},
];
async function main() {
  let total = 0;
  for (const b of B) {
    console.log('=== '+b.p+' ===');
    let c = 0;
    for (const q of b.q) {
      const code = b.p+'-'+String(c+1).padStart(3,'0');
      await sql`INSERT INTO public.questions (content,answer,solution,grade,topic,difficulty,question_type,category_id,status,is_public,question_code,user_id) VALUES (${q.c},${q.a},${q.s},${G},${b.t},${q.d},'tu_luan',${b.id},'approved',true,${code},${U})`;
      c++; console.log('OK: '+code);
    }
    total += c;
  }
  console.log('Total: '+total);
}
main().catch(console.error);
