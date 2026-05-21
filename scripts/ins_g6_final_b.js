const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const U = '8316c34e-765d-4b8c-9364-b683a17e33f8', G = 6;
const B = [
  { id: '444b0570-e454-4530-82bf-973bf3440ec2', p: 'T6-C6B23', t: 'dai_so', q: [
    { c: `Thế nào là mở rộng (rút gọn) phân số?`, a: `Nhân (chia) cả tử và mẫu với cùng một số $\\neq 0$.`, s: `Mở rộng: $\\frac{a}{b} = \\frac{a \\cdot k}{b \\cdot k}$. Rút gọn: $\\frac{a}{b} = \\frac{a : k}{b : k}$ ($k \\neq 0$).`, d: 'nhan_biet' },
    { c: `Hai phân số bằng nhau khi nào?`, a: `$\\frac{a}{b} = \\frac{c}{d}$ khi $a \\cdot d = b \\cdot c$.`, s: `$\\frac{a}{b} = \\frac{c}{d} \\Leftrightarrow a \\cdot d = b \\cdot c$ ($b, d \\neq 0$).`, d: 'nhan_biet' },
    { c: `Mở rộng $\\frac{2}{3}$ với mẫu $12$.`, a: `$\\frac{8}{12}$.`, s: `$\\frac{2}{3} = \\frac{2 \\times 4}{3 \\times 4} = \\frac{8}{12}$.`, d: 'nhan_biet' },
    { c: `Rút gọn $\\frac{12}{18}$.`, a: `$\\frac{2}{3}$.`, s: `$\\text{ƯCLN}(12, 18) = 6$. $\\frac{12}{18} = \\frac{12:6}{18:6} = \\frac{2}{3}$.`, d: 'thong_hieu' },
    { c: `$\\frac{3}{5}$ và $\\frac{6}{10}$ có bằng nhau không?`, a: `Có.`, s: `$3 \\times 10 = 30 = 5 \\times 6$. Vậy bằng nhau.`, d: 'thong_hieu' },
    { c: `Rút gọn $\\frac{24}{36}$ về phân số tối giản.`, a: `$\\frac{2}{3}$.`, s: `$\\text{ƯCLN}(24, 36) = 12$. $\\frac{24:12}{36:12} = \\frac{2}{3}$.`, d: 'thong_hieu' },
    { c: `Tìm $x$: $\\frac{x}{6} = \\frac{3}{9}$.`, a: `$x = 2$.`, s: `$\\frac{3}{9} = \\frac{1}{3}$. $\\frac{x}{6} = \\frac{1}{3} \\Rightarrow x = \\frac{6}{3} = 2$.`, d: 'van_dung' },
    { c: `Tìm $x$: $\\frac{4}{x} = \\frac{12}{15}$.`, a: `$x = 5$.`, s: `$\\frac{12}{15} = \\frac{4}{5}$. $\\frac{4}{x} = \\frac{4}{5} \\Rightarrow x = 5$.`, d: 'van_dung' },
    { c: `Rút gọn $\\frac{45}{105}$.`, a: `$\\frac{3}{7}$.`, s: `$\\text{ƯCLN}(45, 105) = 15$. $\\frac{45:15}{105:15} = \\frac{3}{7}$.`, d: 'van_dung_cao' },
    { c: `Tìm $a, b$ biết $\\frac{a}{7} = \\frac{3}{b}$ và $a + b = 10$.`, a: `$a = 3, b = 7$.`, s: `$ab = 21$. $a + b = 10$. PT: $t^2 - 10t + 21 = 0 \\Rightarrow t = 3$ hoặc $t = 7$. Vậy $a = 3, b = 7$.`, d: 'van_dung_cao' },
  ]},
  { id: 'b8dae277-3070-4d2a-ba0f-9cf2e5444819', p: 'T6-C7B28', t: 'dai_so', q: [
    { c: `Số thập phân là gì?`, a: `Số viết dưới dạng có dấu phẩy phân cách phần nguyên và phần thập phân.`, s: `VD: $3{,}14$ có phần nguyên $3$ và phần thập phân $14$ (hàng phần trăm).`, d: 'nhan_biet' },
    { c: `Viết $\\frac{3}{10}$ dưới dạng số thập phân.`, a: `$0{,}3$.`, s: `$\\frac{3}{10} = 0{,}3$.`, d: 'nhan_biet' },
    { c: `Viết $0{,}25$ dưới dạng phân số tối giản.`, a: `$\\frac{1}{4}$.`, s: `$0{,}25 = \\frac{25}{100} = \\frac{1}{4}$.`, d: 'nhan_biet' },
    { c: `So sánh $0{,}35$ và $0{,}4$.`, a: `$0{,}35 < 0{,}4$.`, s: `$0{,}35 = 0{,}350$, $0{,}4 = 0{,}400$. $350 < 400$ nên $0{,}35 < 0{,}4$.`, d: 'thong_hieu' },
    { c: `Viết $\\frac{7}{4}$ dưới dạng số thập phân.`, a: `$1{,}75$.`, s: `$\\frac{7}{4} = 7 : 4 = 1{,}75$.`, d: 'thong_hieu' },
    { c: `Sắp xếp tăng dần: $0{,}5$; $0{,}45$; $0{,}505$.`, a: `$0{,}45 < 0{,}5 < 0{,}505$.`, s: `$0{,}450 < 0{,}500 < 0{,}505$.`, d: 'thong_hieu' },
    { c: `Viết $2{,}6$ dưới dạng phân số.`, a: `$\\frac{13}{5}$.`, s: `$2{,}6 = \\frac{26}{10} = \\frac{13}{5}$.`, d: 'van_dung' },
    { c: `Làm tròn $3{,}1416$ đến hàng phần trăm.`, a: `$3{,}14$.`, s: `Hàng phần nghìn $= 1 < 5$ nên giữ nguyên: $3{,}14$.`, d: 'van_dung' },
    { c: `$\\frac{1}{3}$ viết dưới dạng số thập phân là gì?`, a: `$0{,}333\\ldots = 0{,}(3)$.`, s: `Số thập phân vô hạn tuần hoàn: $0{,}333\\ldots$`, d: 'van_dung_cao' },
    { c: `Viết $0{,}125$ dưới dạng phân số tối giản.`, a: `$\\frac{1}{8}$.`, s: `$0{,}125 = \\frac{125}{1000} = \\frac{1}{8}$.`, d: 'van_dung_cao' },
  ]},
  { id: '13ce7646-d9c8-47ca-931c-583a4b8d7ad0', p: 'T6-C8B32', t: 'hinh_hoc', q: [
    { c: `Điểm được kí hiệu bằng gì?`, a: `Chữ cái in hoa: $A$, $B$, $C$, ...`, s: `Điểm kí hiệu bằng chữ cái in hoa và biểu diễn bằng dấu chấm.`, d: 'nhan_biet' },
    { c: `Đường thẳng được kí hiệu bằng gì?`, a: `Chữ cái thường ($a, b, d, ...$) hoặc hai điểm ($AB$).`, s: `Đường thẳng kéo dài vô tận hai phía, không có điểm đầu và điểm cuối.`, d: 'nhan_biet' },
    { c: `Khi nào ta nói "điểm $A$ thuộc đường thẳng $d$"?`, a: `Khi $A$ nằm trên $d$.`, s: `$A \\in d$: $A$ nằm trên đường thẳng $d$.`, d: 'nhan_biet' },
    { c: `Qua $2$ điểm phân biệt có bao nhiêu đường thẳng?`, a: `Đúng $1$.`, s: `Tiên đề: Qua $2$ điểm phân biệt có duy nhất $1$ đường thẳng.`, d: 'thong_hieu' },
    { c: `Ba điểm thẳng hàng là gì?`, a: `$3$ điểm cùng nằm trên $1$ đường thẳng.`, s: `$A, B, C$ thẳng hàng nếu cùng thuộc một đường thẳng.`, d: 'thong_hieu' },
    { c: `Hai đường thẳng phân biệt có thể có mấy điểm chung?`, a: `$0$ hoặc $1$.`, s: `$0$ điểm chung: song song. $1$ điểm chung: cắt nhau.`, d: 'thong_hieu' },
    { c: `Có $3$ điểm không thẳng hàng. Vẽ được bao nhiêu đường thẳng qua $2$ điểm?`, a: `$3$.`, s: `$AB, AC, BC$. Tổng $C_3^2 = 3$ đường thẳng.`, d: 'van_dung' },
    { c: `Có $4$ điểm, không có $3$ điểm nào thẳng hàng. Vẽ được mấy đường thẳng?`, a: `$6$.`, s: `$C_4^2 = \\frac{4 \\times 3}{2} = 6$ đường thẳng.`, d: 'van_dung' },
    { c: `$5$ đường thẳng đôi một cắt nhau (không có $3$ đường đồng quy). Có bao nhiêu giao điểm?`, a: `$10$.`, s: `$C_5^2 = 10$ giao điểm.`, d: 'van_dung_cao' },
    { c: `Đường thẳng $a$ có $3$ điểm $A, B, C$ ($B$ nằm giữa $A$ và $C$). Có bao nhiêu tia trên đường thẳng $a$ gốc $B$?`, a: `$2$ tia: $BA$ và $BC$.`, s: `$B$ chia đường thẳng thành $2$ tia đối nhau: tia $BA$ và tia $BC$.`, d: 'van_dung_cao' },
  ]},
  { id: '14959dfc-00fc-4091-8630-053ad4d76bd2', p: 'T6-BTCN', t: 'dai_so', q: [
    { c: `Tính: $(-12) + 8$.`, a: `$-4$.`, s: `$(-12) + 8 = -(12 - 8) = -4$.`, d: 'nhan_biet' },
    { c: `Tính: $\\frac{3}{4} + \\frac{1}{6}$.`, a: `$\\frac{11}{12}$.`, s: `$\\frac{9}{12} + \\frac{2}{12} = \\frac{11}{12}$.`, d: 'nhan_biet' },
    { c: `Tìm $x$: $2x - 5 = 11$.`, a: `$x = 8$.`, s: `$2x = 16 \\Rightarrow x = 8$.`, d: 'thong_hieu' },
    { c: `Rút gọn: $\\frac{36}{48}$.`, a: `$\\frac{3}{4}$.`, s: `$\\text{ƯCLN}(36,48)=12$. $\\frac{36:12}{48:12}=\\frac{3}{4}$.`, d: 'thong_hieu' },
    { c: `Tính: $1{,}5 \\times 0{,}4$.`, a: `$0{,}6$.`, s: `$1{,}5 \\times 0{,}4 = 0{,}6$.`, d: 'thong_hieu' },
    { c: `Hình chữ nhật dài $8$ cm, rộng $5$ cm. Tính chu vi và diện tích.`, a: `$C = 26$ cm, $S = 40$ cm².`, s: `$C = 2(8+5) = 26$ cm. $S = 8 \\times 5 = 40$ cm².`, d: 'van_dung' },
    { c: `Tính: $(-3)^2 + |{-5}|$.`, a: `$14$.`, s: `$9 + 5 = 14$.`, d: 'van_dung' },
    { c: `Một lớp có $\\frac{2}{5}$ HS nam. Lớp $40$ HS. Tính số HS nam.`, a: `$16$ HS.`, s: `$\\frac{2}{5} \\times 40 = 16$ HS.`, d: 'van_dung' },
    { c: `Tìm $x \\in \\mathbb{Z}$: $|x| \\leq 3$.`, a: `$x \\in \\{-3, -2, -1, 0, 1, 2, 3\\}$.`, s: `$-3 \\leq x \\leq 3$, $x$ nguyên: $7$ giá trị.`, d: 'van_dung_cao' },
    { c: `Tìm ƯCLN và BCNN của $12$ và $18$.`, a: `$\\text{ƯCLN} = 6$, $\\text{BCNN} = 36$.`, s: `$12 = 2^2 \\cdot 3$, $18 = 2 \\cdot 3^2$. $\\text{ƯCLN} = 2 \\cdot 3 = 6$. $\\text{BCNN} = 2^2 \\cdot 3^2 = 36$.`, d: 'van_dung_cao' },
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
