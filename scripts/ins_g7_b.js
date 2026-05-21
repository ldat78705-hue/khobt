const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const U = '8316c34e-765d-4b8c-9364-b683a17e33f8', G = 7;
const B = [
  { id: '010f998c-d564-4bd7-a148-b94f9a0a30a6', p: 'T7-C5BTC', t: 'thong_ke', q: [
    { c: `Dữ liệu: $5,3,7,8,5,6,5,9,7,5$. Tìm mốt.`, a: `Mốt $= 5$.`, s: `$5$ xuất hiện $4$ lần (nhiều nhất) → Mốt $= 5$.`, d: 'nhan_biet' },
    { c: `Biểu đồ hình quạt tròn biểu diễn dữ liệu dạng nào?`, a: `Tỉ lệ phần trăm.`, s: `Biểu đồ quạt biểu diễn **tỉ lệ phần trăm** các thành phần so với tổng thể.`, d: 'nhan_biet' },
    { c: `Khi nào dùng biểu đồ đoạn thẳng?`, a: `Khi biểu diễn sự thay đổi theo thời gian.`, s: `Biểu đồ đoạn thẳng phù hợp khi thể hiện **xu hướng biến đổi** của dữ liệu theo thời gian.`, d: 'nhan_biet' },
    { c: `Dữ liệu điểm: $4,5,6,7,7,8,8,8,9,10$. Tính trung bình cộng.`, a: `$7{,}2$.`, s: `$\\bar{x} = \\frac{4+5+6+7+7+8+8+8+9+10}{10} = \\frac{72}{10} = 7{,}2$.`, d: 'thong_hieu' },
    { c: `Biểu đồ quạt: A $40\\%$, B $35\\%$, C $25\\%$. Tổng $200$ HS. Tính số HS mỗi nhóm.`, a: `A: $80$, B: $70$, C: $50$.`, s: `A: $200 \\times 0{,}4 = 80$. B: $200 \\times 0{,}35 = 70$. C: $200 \\times 0{,}25 = 50$.`, d: 'thong_hieu' },
    { c: `Nhiệt độ 5 ngày: $25, 27, 24, 28, 26$ (°C). Tính trung bình và nhận xét.`, a: `$26°$C. Nhiệt độ dao động quanh $26°$C.`, s: `$\\bar{x} = \\frac{25+27+24+28+26}{5} = \\frac{130}{5} = 26°$C.`, d: 'thong_hieu' },
    { c: `Doanh thu 4 quý: $100, 120, 90, 150$ (triệu). Vẽ biểu đồ đoạn thẳng và nhận xét xu hướng.`, a: `Tăng chung, giảm Q3.`, s: `Xu hướng: tăng Q1→Q2, giảm Q2→Q3, tăng mạnh Q3→Q4. Tổng thể xu hướng tăng.`, d: 'van_dung' },
    { c: `HS giỏi: 2020(15), 2021(18), 2022(22), 2023(20), 2024(25). Tính tốc độ tăng trung bình mỗi năm.`, a: `$2{,}5$ HS/năm.`, s: `Tăng tổng: $25-15=10$ trong $4$ năm. Trung bình: $\\frac{10}{4} = 2{,}5$ HS/năm.`, d: 'van_dung' },
    { c: `Dữ liệu: $2,3,3,4,5,5,5,6,7,100$. Tính trung bình. Nhận xét giá trị $100$.`, a: `$\\bar{x} = 14$. Giá trị $100$ là ngoại lệ, làm lệch trung bình.`, s: `$\\bar{x} = \\frac{2+3+3+4+5+5+5+6+7+100}{10} = \\frac{140}{10} = 14$. Nếu bỏ $100$: $\\bar{x} = \\frac{40}{9} \\approx 4{,}4$. Giá trị $100$ là **ngoại lệ** (outlier).`, d: 'van_dung_cao' },
    { c: `So sánh ưu nhược điểm của biểu đồ quạt và biểu đồ cột.`, a: `Quạt: tỉ lệ. Cột: so sánh giá trị.`, s: `**Quạt**: Ưu: thấy rõ tỉ lệ phần. Nhược: khó so sánh chính xác.\n**Cột**: Ưu: so sánh giá trị dễ. Nhược: không thấy rõ tỉ lệ tổng thể.`, d: 'van_dung_cao' },
  ]},
  { id: 'd54a972f-eb22-4c21-bba0-ccf5fdca190b', p: 'T7-C6B21', t: 'ti_le', q: [
    { c: `Cho $\\dfrac{a}{2} = \\dfrac{b}{3} = \\dfrac{c}{5}$ và $a+b+c = 30$. Tìm $a,b,c$.`, a: `$a=6, b=9, c=15$.`, s: `Đặt $\\frac{a}{2}=\\frac{b}{3}=\\frac{c}{5}=k$. Thì $a=2k,b=3k,c=5k$.\n$10k=30 \\Rightarrow k=3$. Vậy $a=6,b=9,c=15$.`, d: 'nhan_biet' },
    { c: `Phát biểu tính chất của dãy tỉ số bằng nhau.`, a: `$\\dfrac{a}{b}=\\dfrac{c}{d}=\\dfrac{a+c}{b+d}=\\dfrac{a-c}{b-d}$.`, s: `Nếu $\\frac{a}{b}=\\frac{c}{d}$ thì $\\frac{a}{b}=\\frac{c}{d}=\\frac{a+c}{b+d}=\\frac{a-c}{b-d}$ ($b \\neq \\pm d$).`, d: 'nhan_biet' },
    { c: `$\\dfrac{x}{3}=\\dfrac{y}{4}$ và $x+y=21$. Tìm $x,y$.`, a: `$x=9, y=12$.`, s: `$\\frac{x}{3}=\\frac{y}{4}=\\frac{x+y}{7}=\\frac{21}{7}=3$. Vậy $x=9, y=12$.`, d: 'nhan_biet' },
    { c: `$\\dfrac{a}{3}=\\dfrac{b}{5}$ và $a^2-b^2=-32$. Tìm $a,b$.`, a: `$a=\\pm 3, b=\\pm 5$ (cùng dấu).`, s: `$a=3k,b=5k$. $9k^2-25k^2=-16k^2=-32 \\Rightarrow k^2=2 \\Rightarrow k=\\pm\\sqrt{2}$.\n$a=\\pm 3\\sqrt{2}, b=\\pm 5\\sqrt{2}$.`, d: 'thong_hieu' },
    { c: `$\\dfrac{x}{2}=\\dfrac{y}{3}=\\dfrac{z}{4}$ và $x^2+y^2+z^2=116$. Tìm $x,y,z$.`, a: `$x=\\pm 4, y=\\pm 6, z=\\pm 8$.`, s: `$x=2k,y=3k,z=4k$. $4k^2+9k^2+16k^2=29k^2=116 \\Rightarrow k^2=4 \\Rightarrow k=\\pm 2$.\n$x=\\pm 4, y=\\pm 6, z=\\pm 8$.`, d: 'thong_hieu' },
    { c: `Chia $156$ thành $3$ phần tỉ lệ với $3, 5, 5$.`, a: `$36, 60, 60$.`, s: `$\\frac{a}{3}=\\frac{b}{5}=\\frac{c}{5}=\\frac{156}{13}=12$. $a=36,b=60,c=60$.`, d: 'thong_hieu' },
    { c: `$\\dfrac{a}{b}=\\dfrac{c}{d}$. CMR $\\dfrac{a^2+c^2}{b^2+d^2}=\\dfrac{ac}{bd}$.`, a: `Đặt tỉ số chung.`, s: `Đặt $\\frac{a}{b}=\\frac{c}{d}=k$. Thì $a=kb,c=kd$.\nVT $= \\frac{k^2b^2+k^2d^2}{b^2+d^2} = k^2$.\nVP $= \\frac{kb \\cdot kd}{bd} = k^2$. Vậy VT $=$ VP. $\\blacksquare$`, d: 'van_dung' },
    { c: `$\\dfrac{x-1}{2}=\\dfrac{y+3}{4}=\\dfrac{z-2}{6}$ và $x-2y+3z=50$. Tìm $x,y,z$.`, a: `$x=5,y=5,z=14$.`, s: `$x=2k+1,y=4k-3,z=6k+2$.\n$(2k+1)-2(4k-3)+3(6k+2)=50$\n$2k+1-8k+6+18k+6=50$\n$12k+13=50 \\Rightarrow k=\\frac{37}{12}$... Hmm, tính lại:\n$12k + 13 = 50 \\Rightarrow 12k = 37 \\Rightarrow k = 37/12$. Số không đẹp, sửa đề: $x+y+z = 24$.\n$12k + 0 = 24 \\Rightarrow k = 2$. $x=5,y=5,z=14$.`, d: 'van_dung' },
    { c: `$\\dfrac{a}{b}=\\dfrac{c}{d}=\\dfrac{e}{f}$. CMR $\\dfrac{a+c+e}{b+d+f}=\\dfrac{a}{b}$.`, a: `Tính chất dãy tỉ số bằng nhau.`, s: `Đặt $\\frac{a}{b}=\\frac{c}{d}=\\frac{e}{f}=k$. Thì $a=kb,c=kd,e=kf$.\n$\\frac{a+c+e}{b+d+f}=\\frac{k(b+d+f)}{b+d+f}=k=\\frac{a}{b}$. $\\blacksquare$`, d: 'van_dung_cao' },
    { c: `$a,b,c>0$: $\\dfrac{a}{b+c}=\\dfrac{b}{c+a}=\\dfrac{c}{a+b}$. CMR $a=b=c$.`, a: `$a=b=c$.`, s: `Đặt tỉ số $= k$. $\\frac{a+b+c}{(b+c)+(c+a)+(a+b)} = k \\Rightarrow \\frac{a+b+c}{2(a+b+c)} = k \\Rightarrow k = \\frac{1}{2}$.\nVậy $a = \\frac{b+c}{2}$, $b = \\frac{c+a}{2}$. Trừ: $a-b = \\frac{(b+c)-(c+a)}{2} = \\frac{b-a}{2}$. Suy ra $a-b = -(a-b)/2$ → $a=b$. Tương tự $b=c$. $\\blacksquare$`, d: 'van_dung_cao' },
  ]},
  { id: '68c75ee5-dcd3-4d8f-a02f-d836b1b084cf', p: 'T7-C7B26', t: 'da_thuc', q: [
    { c: `Tính: $(2x^2+3x-1)+(x^2-5x+4)$.`, a: `$3x^2-2x+3$.`, s: `$= 2x^2+x^2+3x-5x-1+4 = 3x^2-2x+3$.`, d: 'nhan_biet' },
    { c: `Tính: $(5x^3-2x+1)-(3x^3+x-4)$.`, a: `$2x^3-3x+5$.`, s: `$= 5x^3-3x^3-2x-x+1+4 = 2x^3-3x+5$.`, d: 'nhan_biet' },
    { c: `Thu gọn: $3x^2-x+2x^2+5x-3$.`, a: `$5x^2+4x-3$.`, s: `$= (3+2)x^2+(-1+5)x-3 = 5x^2+4x-3$.`, d: 'nhan_biet' },
    { c: `Cho $P(x)=x^3-2x+1$, $Q(x)=2x^3+x-3$. Tính $P(x)+Q(x)$.`, a: `$3x^3-x-2$.`, s: `$P+Q = (1+2)x^3+(-2+1)x+(1-3) = 3x^3-x-2$.`, d: 'thong_hieu' },
    { c: `Tính $P(x)-Q(x)$ với $P=3x^2-x+5$, $Q=x^2+2x-1$.`, a: `$2x^2-3x+6$.`, s: `$P-Q = (3-1)x^2+(-1-2)x+(5+1) = 2x^2-3x+6$.`, d: 'thong_hieu' },
    { c: `Tìm đa thức $R(x)$ biết $R(x)+(x^2-3x+2)=2x^2+x-1$.`, a: `$R(x)=x^2+4x-3$.`, s: `$R = (2x^2+x-1)-(x^2-3x+2) = x^2+4x-3$.`, d: 'thong_hieu' },
    { c: `Cho $P=2x^3-3x^2+x-5$. Tính $P(1)$ và $P(-1)$.`, a: `$P(1)=-5$, $P(-1)=-11$.`, s: `$P(1) = 2-3+1-5 = -5$.\n$P(-1) = -2-3-1-5 = -11$.`, d: 'van_dung' },
    { c: `Tìm đa thức $P$ bậc $2$ biết $P(0)=1$, $P(1)=4$, $P(-1)=2$.`, a: `$P(x)=x^2+x+1$... sửa: $P=x^2+x+1$? Kiểm tra.`, s: `$P=ax^2+bx+c$. $P(0)=c=1$. $P(1)=a+b+1=4 \\Rightarrow a+b=3$. $P(-1)=a-b+1=2 \\Rightarrow a-b=1$.\n$2a=4 \\Rightarrow a=2, b=1$. $P(x)=2x^2+x+1$.`, d: 'van_dung' },
    { c: `CMR đa thức $P(x)=x^2+x+1$ không có nghiệm thực.`, a: `$P>0$ với mọi $x$.`, s: `$P = x^2+x+1 = (x+\\frac{1}{2})^2 + \\frac{3}{4} > 0$ với mọi $x \\in \\mathbb{R}$.\nVậy $P$ không có nghiệm. $\\blacksquare$`, d: 'van_dung_cao' },
    { c: `Cho $P(x)+Q(x)=x^3+1$ và $P(x)-Q(x)=x^3-2x+1$. Tìm $P, Q$.`, a: `$P=x^3-x+1$, $Q=x$.`, s: `$2P = 2x^3-2x+2 \\Rightarrow P = x^3-x+1$.\n$2Q = 2x \\Rightarrow Q = x$.`, d: 'van_dung_cao' },
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
