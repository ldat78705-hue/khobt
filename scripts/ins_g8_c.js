const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const U = '8316c34e-765d-4b8c-9364-b683a17e33f8', G = 8, T = 'dai_so';
const B = [
  { id: '6ffe5599-48df-4f13-ae23-3c00e719029b', p: 'T8-C2B7', q: [
    { c: `Khai triển $(x+2)^3$.`, a: `$x^3+6x^2+12x+8$.`, s: `$(a+b)^3 = a^3+3a^2b+3ab^2+b^3 = x^3+6x^2+12x+8$.`, d: 'nhan_biet' },
    { c: `Khai triển $(x-3)^3$.`, a: `$x^3-9x^2+27x-27$.`, s: `$(a-b)^3 = a^3-3a^2b+3ab^2-b^3 = x^3-9x^2+27x-27$.`, d: 'nhan_biet' },
    { c: `Tính $(2x+1)^3$.`, a: `$8x^3+12x^2+6x+1$.`, s: `$= (2x)^3+3(2x)^2(1)+3(2x)(1)^2+1 = 8x^3+12x^2+6x+1$.`, d: 'nhan_biet' },
    { c: `Tính nhanh $21^3$.`, a: `$9261$.`, s: `$21^3 = (20+1)^3 = 8000+1200+60+1 = 9261$.`, d: 'thong_hieu' },
    { c: `Phân tích: $8x^3+12x^2+6x+1$.`, a: `$(2x+1)^3$.`, s: `$= (2x)^3+3(2x)^2+3(2x)+1 = (2x+1)^3$.`, d: 'thong_hieu' },
    { c: `CMR $(a+b)^3 = a^3+b^3+3ab(a+b)$.`, a: `Khai triển.`, s: `$(a+b)^3 = a^3+3a^2b+3ab^2+b^3 = a^3+b^3+3ab(a+b)$. $\\blacksquare$`, d: 'thong_hieu' },
    { c: `Tính $(x+1)^3-(x-1)^3$.`, a: `$6x^2+2$.`, s: `$= (x^3+3x^2+3x+1)-(x^3-3x^2+3x-1) = 6x^2+2$.`, d: 'van_dung' },
    { c: `CMR $n^3-n \\vdots 6$ bằng hằng đẳng thức.`, a: `$n^3-n = (n-1)n(n+1) \\vdots 6$.`, s: `$n^3-n = n(n^2-1) = (n-1)n(n+1)$: ba số liên tiếp $\\vdots 2$ và $\\vdots 3$, nên $\\vdots 6$. $\\blacksquare$`, d: 'van_dung' },
    { c: `Tính $1^3+2^3+...+n^3$ biết $= [\\frac{n(n+1)}{2}]^2$. Áp dụng $n=10$.`, a: `$3025$.`, s: `$S = [\\frac{10 \\times 11}{2}]^2 = 55^2 = 3025$.`, d: 'van_dung_cao' },
    { c: `Tìm $x$: $(x+1)^3 = x^3+7$.`, a: `$x = 1$.`, s: `$x^3+3x^2+3x+1 = x^3+7 \\Rightarrow 3x^2+3x-6=0 \\Rightarrow x^2+x-2=0 \\Rightarrow (x+2)(x-1)=0$.\n$x = 1$ hoặc $x = -2$.`, d: 'van_dung_cao' },
  ]},
  { id: '8d2c40ee-7cd7-40ff-929f-f5726d6032c2', p: 'T8-C2B8', q: [
    { c: `Phân tích: $x^3+27$.`, a: `$(x+3)(x^2-3x+9)$.`, s: `$a^3+b^3 = (a+b)(a^2-ab+b^2)$. $= (x+3)(x^2-3x+9)$.`, d: 'nhan_biet' },
    { c: `Phân tích: $8x^3-1$.`, a: `$(2x-1)(4x^2+2x+1)$.`, s: `$= (2x)^3-1^3 = (2x-1)(4x^2+2x+1)$.`, d: 'nhan_biet' },
    { c: `Tính: $(x+2)(x^2-2x+4)$.`, a: `$x^3+8$.`, s: `HĐT tổng hai lập phương: $= x^3+2^3 = x^3+8$.`, d: 'nhan_biet' },
    { c: `Phân tích: $27a^3+8b^3$.`, a: `$(3a+2b)(9a^2-6ab+4b^2)$.`, s: `$= (3a)^3+(2b)^3 = (3a+2b)(9a^2-6ab+4b^2)$.`, d: 'thong_hieu' },
    { c: `Phân tích: $x^3-125$.`, a: `$(x-5)(x^2+5x+25)$.`, s: `$= x^3-5^3 = (x-5)(x^2+5x+25)$.`, d: 'thong_hieu' },
    { c: `Tính $15^3+5^3$ bằng HĐT.`, a: `$4000$.`, s: `$= (15+5)(225-75+25) = 20 \\times 175 = 3500$. Kiểm tra: $3375+125=3500$ ✓.`, d: 'thong_hieu' },
    { c: `CMR $a^3+b^3+c^3-3abc = (a+b+c)(a^2+b^2+c^2-ab-bc-ca)$.`, a: `Khai triển VP.`, s: `Khai triển VP rồi thu gọn = VT. Đây là đẳng thức Schur nổi tiếng. $\\blacksquare$`, d: 'van_dung' },
    { c: `Phân tích: $x^6-1$.`, a: `$(x-1)(x+1)(x^2+x+1)(x^2-x+1)$.`, s: `$x^6-1 = (x^3-1)(x^3+1) = (x-1)(x^2+x+1)(x+1)(x^2-x+1)$.`, d: 'van_dung' },
    { c: `Tìm $x$: $x^3+8=0$.`, a: `$x=-2$.`, s: `$(x+2)(x^2-2x+4)=0$. $x=-2$ (vì $x^2-2x+4=(x-1)^2+3>0$).`, d: 'van_dung_cao' },
    { c: `CMR nếu $a+b+c=0$ thì $a^3+b^3+c^3=3abc$.`, a: `Dùng đẳng thức trên.`, s: `$a^3+b^3+c^3-3abc = (a+b+c)(a^2+b^2+c^2-ab-bc-ca) = 0$ khi $a+b+c=0$. $\\blacksquare$`, d: 'van_dung_cao' },
  ]},
  { id: '5caed3e1-26b6-4b92-88b0-3738dc803d09', p: 'T8-C2B9', q: [
    { c: `Phân tích: $x^2-5x$.`, a: `$x(x-5)$.`, s: `Nhân tử chung: $x(x-5)$.`, d: 'nhan_biet' },
    { c: `Phân tích: $x^2-9$.`, a: `$(x-3)(x+3)$.`, s: `Hiệu hai bình phương: $(x-3)(x+3)$.`, d: 'nhan_biet' },
    { c: `Phân tích: $x^2+6x+9$.`, a: `$(x+3)^2$.`, s: `$= (x+3)^2$.`, d: 'nhan_biet' },
    { c: `Phân tích: $x^2-4x+3$.`, a: `$(x-1)(x-3)$.`, s: `$= x^2-x-3x+3 = x(x-1)-3(x-1) = (x-1)(x-3)$.`, d: 'thong_hieu' },
    { c: `Phân tích: $2x^2+5x+3$.`, a: `$(2x+3)(x+1)$.`, s: `$= 2x^2+2x+3x+3 = 2x(x+1)+3(x+1) = (x+1)(2x+3)$.`, d: 'thong_hieu' },
    { c: `Phân tích: $x^3-x$.`, a: `$x(x-1)(x+1)$.`, s: `$= x(x^2-1) = x(x-1)(x+1)$.`, d: 'thong_hieu' },
    { c: `Phân tích: $x^4-16$.`, a: `$(x^2+4)(x-2)(x+2)$.`, s: `$= (x^2-4)(x^2+4) = (x-2)(x+2)(x^2+4)$.`, d: 'van_dung' },
    { c: `Phân tích: $x^2+4x+4-y^2$.`, a: `$(x+2-y)(x+2+y)$.`, s: `$= (x+2)^2-y^2 = (x+2-y)(x+2+y)$.`, d: 'van_dung' },
    { c: `Phân tích: $x^3+3x^2+3x+1-y^3$.`, a: `$(x+1-y)(x^2+2x+1+xy+y+y^2)$.`, s: `$= (x+1)^3-y^3 = (x+1-y)[(x+1)^2+(x+1)y+y^2]$.`, d: 'van_dung_cao' },
    { c: `CMR $n^4+4$ không nguyên tố với $n > 1$.`, a: `Sophie Germain.`, s: `$n^4+4 = n^4+4n^2+4-4n^2 = (n^2+2)^2-(2n)^2 = (n^2+2n+2)(n^2-2n+2)$.\nVới $n>1$: cả hai thừa số $> 1$, nên $n^4+4$ là hợp số. $\\blacksquare$`, d: 'van_dung_cao' },
  ]},
  { id: 'ff5e6edb-fdde-417a-90e3-fab807db2918', p: 'T8-BTCC1', q: [
    { c: `Tính: $(-3xy^2)(2x^2y)$.`, a: `$-6x^3y^3$.`, s: `$(-3)(2) = -6$, $x \\cdot x^2 = x^3$, $y^2 \\cdot y = y^3$.`, d: 'nhan_biet' },
    { c: `Thu gọn: $5x^2-3x+2x^2+x-1$.`, a: `$7x^2-2x-1$.`, s: `$(5+2)x^2+(-3+1)x-1 = 7x^2-2x-1$.`, d: 'nhan_biet' },
    { c: `Nhân: $(x-3)(x+5)$.`, a: `$x^2+2x-15$.`, s: `$x^2+5x-3x-15 = x^2+2x-15$.`, d: 'nhan_biet' },
    { c: `Khai triển $(2x-3)^2$.`, a: `$4x^2-12x+9$.`, s: `$(a-b)^2 = a^2-2ab+b^2 = 4x^2-12x+9$.`, d: 'thong_hieu' },
    { c: `Phân tích: $3x^2-12$.`, a: `$3(x-2)(x+2)$.`, s: `$= 3(x^2-4) = 3(x-2)(x+2)$.`, d: 'thong_hieu' },
    { c: `Chia: $(x^3+8):(x+2)$.`, a: `$x^2-2x+4$.`, s: `HĐT: $x^3+8=(x+2)(x^2-2x+4)$.`, d: 'thong_hieu' },
    { c: `Phân tích: $x^3-3x^2+3x-1$.`, a: `$(x-1)^3$.`, s: `$= x^3-3x^2 \\cdot 1+3x \\cdot 1^2-1^3 = (x-1)^3$.`, d: 'van_dung' },
    { c: `Tìm $x$: $x^2-5x+6=0$.`, a: `$x=2$ hoặc $x=3$.`, s: `$= (x-2)(x-3) = 0 \\Rightarrow x \\in \\{2,3\\}$.`, d: 'van_dung' },
    { c: `CMR $(a+b+c)^2 = a^2+b^2+c^2+2ab+2bc+2ca$.`, a: `Khai triển.`, s: `$[(a+b)+c]^2 = (a+b)^2+2(a+b)c+c^2 = a^2+2ab+b^2+2ac+2bc+c^2$. $\\blacksquare$`, d: 'van_dung_cao' },
    { c: `Tìm GTNN $P = x^2-4x+7$.`, a: `$P_{\\min} = 3$ khi $x=2$.`, s: `$P = (x-2)^2+3 \\ge 3$. Dấu $=$ khi $x=2$.`, d: 'van_dung_cao' },
  ]},
  { id: '035c1226-afa1-4855-9fa3-15febd59e977', p: 'T8-BTCC2', q: [
    { c: `Khai triển $(a+b)(a-b)$.`, a: `$a^2-b^2$.`, s: `Hiệu hai bình phương.`, d: 'nhan_biet' },
    { c: `Phân tích: $25x^2-16$.`, a: `$(5x-4)(5x+4)$.`, s: `$= (5x)^2-4^2 = (5x-4)(5x+4)$.`, d: 'nhan_biet' },
    { c: `Tính $(x+1)^3$.`, a: `$x^3+3x^2+3x+1$.`, s: `HĐT lập phương tổng.`, d: 'nhan_biet' },
    { c: `Phân tích: $x^3+6x^2+12x+8$.`, a: `$(x+2)^3$.`, s: `$= (x+2)^3$.`, d: 'thong_hieu' },
    { c: `Tính $47 \\times 53$ bằng HĐT.`, a: `$2491$.`, s: `$(50-3)(50+3) = 2500-9 = 2491$.`, d: 'thong_hieu' },
    { c: `Phân tích: $x^2-2xy+y^2-z^2$.`, a: `$(x-y-z)(x-y+z)$.`, s: `$= (x-y)^2-z^2 = (x-y-z)(x-y+z)$.`, d: 'thong_hieu' },
    { c: `Phân tích: $x^3-x^2-x+1$.`, a: `$(x-1)^2(x+1)$.`, s: `$= x^2(x-1)-(x-1) = (x-1)(x^2-1) = (x-1)^2(x+1)$.`, d: 'van_dung' },
    { c: `Tìm $x$: $x^3-4x=0$.`, a: `$x \\in \\{0, \\pm 2\\}$.`, s: `$x(x^2-4)=0 \\Rightarrow x(x-2)(x+2)=0$.`, d: 'van_dung' },
    { c: `CMR $n^2(n^2-1)(n^2-4) \\vdots 360$ với $n \\ge 3$.`, a: `Phân tích thành tích 6 số.`, s: `$= (n-2)(n-1)n^2(n+1)(n+2)$. Chứa tích 5 số gần liên tiếp, luôn $\\vdots 360$. (Chi tiết: $5! = 120$ và thêm nhân tử $3$).`, d: 'van_dung_cao' },
    { c: `Tìm GTNN: $A = x^2+y^2-2x+4y+7$.`, a: `$A_{\\min}=2$ tại $x=1, y=-2$.`, s: `$A = (x-1)^2+(y+2)^2+2 \\ge 2$. Min $= 2$ khi $x=1, y=-2$.`, d: 'van_dung_cao' },
  ]},
];
async function main() {
  let total = 0;
  for (const b of B) {
    console.log('=== '+b.p+' ===');
    let c = 0;
    for (const q of b.q) {
      const code = b.p+'-'+String(c+1).padStart(3,'0');
      await sql`INSERT INTO public.questions (content,answer,solution,grade,topic,difficulty,question_type,category_id,status,is_public,question_code,user_id) VALUES (${q.c},${q.a},${q.s},${G},${T},${q.d},'tu_luan',${b.id},'approved',true,${code},${U})`;
      c++; console.log('OK: '+code);
    }
    total += c;
  }
  console.log('Total: '+total);
}
main().catch(console.error);
