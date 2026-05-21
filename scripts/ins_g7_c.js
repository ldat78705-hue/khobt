const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const U = '8316c34e-765d-4b8c-9364-b683a17e33f8', G = 7;
const B = [
  { id: '3a2797cb-2631-4b6b-9535-b846bb7eaaa3', p: 'T7-C7B28', t: 'da_thuc', q: [
    { c: `Thực hiện phép chia: $(6x^2+x-2):(2x-1)$.`, a: `$3x+2$.`, s: `Chia đa thức: $6x^2:2x=3x$. $3x(2x-1)=6x^2-3x$. Dư: $4x-2$. $4x:2x=2$. $2(2x-1)=4x-2$. Dư $0$.\nVậy $(6x^2+x-2):(2x-1)=3x+2$.`, d: 'nhan_biet' },
    { c: `Tính: $(x^3-8):(x-2)$.`, a: `$x^2+2x+4$.`, s: `$x^3-8 = (x-2)(x^2+2x+4)$. Thương: $x^2+2x+4$.`, d: 'nhan_biet' },
    { c: `Chia $x^2+5x+6$ cho $x+2$.`, a: `$x+3$.`, s: `$x^2+5x+6 = (x+2)(x+3)$. Thương: $x+3$.`, d: 'nhan_biet' },
    { c: `Chia $2x^3-3x^2+x+1$ cho $x-1$. Tìm thương và dư.`, a: `Thương $2x^2-x$, dư $1$.`, s: `$2x^3:x=2x^2$. $2x^2(x-1)=2x^3-2x^2$. Dư: $-x^2+x+1$.\n$-x^2:x=-x$. $-x(x-1)=-x^2+x$. Dư: $1$.\nThương $2x^2-x$, dư $1$.`, d: 'thong_hieu' },
    { c: `Kiểm tra $x^2-4x+3$ có chia hết cho $x-1$ không.`, a: `Có.`, s: `$P(1) = 1-4+3 = 0$. Theo định lý Bézout, $P(x) \\vdots (x-1)$.\n$x^2-4x+3 = (x-1)(x-3)$.`, d: 'thong_hieu' },
    { c: `Tìm $a$ để $x^3+ax+2$ chia hết cho $x+1$.`, a: `$a = 3$.`, s: `$P(-1) = -1-a+2 = 1-a = 0 \\Rightarrow a = 1$... Kiểm tra: $-1+(-1)a+2=0 \\Rightarrow 1-a=0 \\Rightarrow a=1$.\nSửa đáp án: $a=1$.`, d: 'thong_hieu' },
    { c: `Chia $x^4-1$ cho $x-1$.`, a: `$x^3+x^2+x+1$.`, s: `$x^4-1 = (x-1)(x^3+x^2+x+1)$.`, d: 'van_dung' },
    { c: `Tìm $a,b$ để $x^3+ax^2+bx+6$ chia hết cho cả $x-1$ và $x+2$.`, a: `$a = -1, b = -6$.`, s: `$P(1) = 1+a+b+6 = 0 \\Rightarrow a+b=-7$.\n$P(-2) = -8+4a-2b+6 = 0 \\Rightarrow 4a-2b=2 \\Rightarrow 2a-b=1$.\n$a+b=-7$ và $2a-b=1 \\Rightarrow 3a=-6 \\Rightarrow a=-2, b=-5$.\nKiểm tra: $P(1)=1-2-5+6=0$ ✓. $P(-2)=-8+8+10+6 \\neq 0$. Tính lại: $P(-2)=-8+4(-2)-2(-5)+6=-8-8+10+6=0$ ✓.`, d: 'van_dung' },
    { c: `CMR nếu $P(x)$ bậc $n$ chia hết cho $(x-a)$ thì $P(a)=0$.`, a: `Định lý Bézout.`, s: `$P(x) = (x-a)Q(x) + R$ với $R$ hằng số. Thay $x=a$: $P(a) = 0 \\cdot Q(a) + R = R$. Nếu $P(x) \\vdots (x-a)$ thì $R=0$, tức $P(a)=0$. $\\blacksquare$`, d: 'van_dung_cao' },
    { c: `Chia $x^{100}-1$ cho $x-1$. Viết kết quả.`, a: `$x^{99}+x^{98}+\\ldots+x+1$.`, s: `$x^n - 1 = (x-1)(x^{n-1}+x^{n-2}+\\ldots+x+1)$.\nVới $n=100$: thương $= x^{99}+x^{98}+\\ldots+x+1$ (100 số hạng).`, d: 'van_dung_cao' },
  ]},
  { id: 'd1a8dd78-0a7c-447e-b76f-99c949d8e7f6', p: 'T7-C8B30', t: 'xac_suat', q: [
    { c: `Gieo xúc xắc 1 lần. Tính xác suất ra mặt $6$.`, a: `$\\dfrac{1}{6}$.`, s: `Có $6$ kết quả đồng khả năng. $P(\\text{mặt } 6) = \\frac{1}{6}$.`, d: 'nhan_biet' },
    { c: `Rút 1 bi từ túi 4 đỏ, 6 xanh. Tính XS rút bi đỏ.`, a: `$\\dfrac{2}{5}$.`, s: `$P = \\frac{4}{10} = \\frac{2}{5}$.`, d: 'nhan_biet' },
    { c: `Gieo đồng xu 2 lần. Liệt kê không gian mẫu.`, a: `$\\{SS, SN, NS, NN\\}$.`, s: `$4$ kết quả: $SS, SN, NS, NN$.`, d: 'nhan_biet' },
    { c: `Gieo xúc xắc. Tính XS ra mặt chẵn.`, a: `$\\dfrac{1}{2}$.`, s: `Mặt chẵn: $2,4,6$ → $3$ kết quả. $P = \\frac{3}{6} = \\frac{1}{2}$.`, d: 'thong_hieu' },
    { c: `Gieo 2 xúc xắc. Tính XS tổng bằng $7$.`, a: `$\\dfrac{1}{6}$.`, s: `Tổng $36$ kết quả. Tổng $7$: $(1,6),(2,5),(3,4),(4,3),(5,2),(6,1)$ → $6$ cặp.\n$P = \\frac{6}{36} = \\frac{1}{6}$.`, d: 'thong_hieu' },
    { c: `Rút 1 lá từ 52 lá bài. Tính XS rút được quân Ách hoặc quân K.`, a: `$\\dfrac{2}{13}$.`, s: `$4$ Ách $+ 4$ K $= 8$ lá. $P = \\frac{8}{52} = \\frac{2}{13}$.`, d: 'thong_hieu' },
    { c: `Chọn ngẫu nhiên 1 số từ $1$ đến $20$. Tính XS số đó là số nguyên tố.`, a: `$\\dfrac{2}{5}$.`, s: `Số NT từ $1$-$20$: $2,3,5,7,11,13,17,19$ → $8$ số.\n$P = \\frac{8}{20} = \\frac{2}{5}$.`, d: 'van_dung' },
    { c: `Gieo 2 đồng xu. Tính XS được ít nhất 1 mặt ngửa.`, a: `$\\dfrac{3}{4}$.`, s: `$P(\\text{ít nhất 1 N}) = 1 - P(\\text{SS}) = 1 - \\frac{1}{4} = \\frac{3}{4}$.`, d: 'van_dung' },
    { c: `Túi có $n$ bi đỏ và $3$ bi xanh. Biết XS rút bi đỏ $= \\frac{2}{5}$. Tìm $n$.`, a: `$n = 2$.`, s: `$\\frac{n}{n+3} = \\frac{2}{5} \\Rightarrow 5n = 2n+6 \\Rightarrow 3n=6 \\Rightarrow n=2$.`, d: 'van_dung_cao' },
    { c: `Gieo xúc xắc 2 lần. Tính XS lần 2 lớn hơn lần 1.`, a: `$\\dfrac{5}{12}$.`, s: `Tổng $36$ cặp. Lần 2 > lần 1: $(1,2),(1,3),...(5,6)$.\nSố cặp $= \\binom{6}{2} = 15$. $P = \\frac{15}{36} = \\frac{5}{12}$.`, d: 'van_dung_cao' },
  ]},
  { id: '7841c4e4-ed0c-4955-ad6e-8a894df9d4a0', p: 'T7-C8BTC', t: 'xac_suat', q: [
    { c: `Sự kiện "mặt trời mọc ở phía Đông" là sự kiện gì?`, a: `Sự kiện chắc chắn.`, s: `Mặt trời luôn mọc ở phía Đông → **sự kiện chắc chắn** (XS = 1).`, d: 'nhan_biet' },
    { c: `Gieo xúc xắc. XS ra mặt $\\le 6$ bằng bao nhiêu?`, a: `$1$.`, s: `Tất cả mặt đều $\\le 6$ → sự kiện chắc chắn, $P = 1$.`, d: 'nhan_biet' },
    { c: `XS của sự kiện không thể bằng bao nhiêu?`, a: `$0$.`, s: `Sự kiện không thể có $P = 0$.`, d: 'nhan_biet' },
    { c: `Gieo xúc xắc. Tính XS ra số $\\le 4$.`, a: `$\\dfrac{2}{3}$.`, s: `Kết quả thuận lợi: $1,2,3,4$ → $4$ kết quả. $P = \\frac{4}{6} = \\frac{2}{3}$.`, d: 'thong_hieu' },
    { c: `Quay bàn quay chia $8$ phần bằng nhau, đánh số $1$-$8$. XS ra số chẵn?`, a: `$\\dfrac{1}{2}$.`, s: `Số chẵn: $2,4,6,8$ → $4$ phần. $P = \\frac{4}{8} = \\frac{1}{2}$.`, d: 'thong_hieu' },
    { c: `Nếu $P(A) = 0{,}3$ thì $P(\\overline{A})$ bằng bao nhiêu?`, a: `$0{,}7$.`, s: `$P(\\overline{A}) = 1 - P(A) = 1 - 0{,}3 = 0{,}7$.`, d: 'thong_hieu' },
    { c: `Rút 2 bi từ túi 3 đỏ, 2 xanh. Tính XS cả 2 bi cùng màu đỏ.`, a: `$\\dfrac{3}{10}$.`, s: `Tổng cách chọn: $\\binom{5}{2}=10$. Chọn 2 đỏ: $\\binom{3}{2}=3$.\n$P = \\frac{3}{10}$.`, d: 'van_dung' },
    { c: `Chọn ngẫu nhiên 2 số khác nhau từ $\\{1,2,3,4,5\\}$. Tính XS tổng $> 6$.`, a: `$\\dfrac{2}{5}$.`, s: `Tổng cách: $\\binom{5}{2}=10$. Tổng $>6$: $(2,5),(3,4),(3,5),(4,5)$ → $4$ cặp.\n$P = \\frac{4}{10} = \\frac{2}{5}$.`, d: 'van_dung' },
    { c: `Hai sự kiện $A, B$ xung khắc. $P(A)=0{,}4$, $P(B)=0{,}3$. Tính $P(A \\cup B)$.`, a: `$0{,}7$.`, s: `$A, B$ xung khắc: $P(A \\cup B) = P(A) + P(B) = 0{,}4 + 0{,}3 = 0{,}7$.`, d: 'van_dung_cao' },
    { c: `Gieo xúc xắc 3 lần. Tính XS ít nhất 1 lần ra mặt $6$.`, a: `$\\dfrac{91}{216}$.`, s: `$P(\\text{không ra 6}) = (\\frac{5}{6})^3 = \\frac{125}{216}$.\n$P(\\text{ít nhất 1 lần 6}) = 1 - \\frac{125}{216} = \\frac{91}{216}$.`, d: 'van_dung_cao' },
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
