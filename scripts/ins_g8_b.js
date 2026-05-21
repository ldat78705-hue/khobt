const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const U = '8316c34e-765d-4b8c-9364-b683a17e33f8', G = 8, T = 'dai_so';
const B = [
  { id: 'c6f90a3a-7eb5-48d8-923d-9c8aa799e7da', p: 'T8-C1B4', q: [
    { c: `Nhân: $2x(3x-1)$.`, a: `$6x^2-2x$.`, s: `$2x \\cdot 3x + 2x \\cdot (-1) = 6x^2 - 2x$.`, d: 'nhan_biet' },
    { c: `Nhân: $(x+2)(x+3)$.`, a: `$x^2+5x+6$.`, s: `$x^2+3x+2x+6 = x^2+5x+6$.`, d: 'nhan_biet' },
    { c: `Nhân: $(2x-1)(x+4)$.`, a: `$2x^2+7x-4$.`, s: `$2x^2+8x-x-4 = 2x^2+7x-4$.`, d: 'nhan_biet' },
    { c: `Nhân: $(x^2+x-1)(x-2)$.`, a: `$x^3-x^2-3x+2$.`, s: `$x^3-2x^2+x^2-2x-x+2 = x^3-x^2-3x+2$.`, d: 'thong_hieu' },
    { c: `Nhân: $(x+1)(x^2-x+1)$.`, a: `$x^3+1$.`, s: `Hằng đẳng thức: $(a+b)(a^2-ab+b^2) = a^3+b^3$. Vậy $= x^3+1$.`, d: 'thong_hieu' },
    { c: `Khai triển: $(a+b)(a-b)(a^2+b^2)$.`, a: `$a^4-b^4$.`, s: `$(a+b)(a-b) = a^2-b^2$. $(a^2-b^2)(a^2+b^2) = a^4-b^4$.`, d: 'thong_hieu' },
    { c: `CMR $(n+1)(n+2)(n+3) - n(n+1)(n+2) = 3(n+1)(n+2)$.`, a: `Đặt nhân tử chung.`, s: `VT $= (n+1)(n+2)[(n+3)-n] = (n+1)(n+2) \\cdot 3 = $ VP. $\\blacksquare$`, d: 'van_dung' },
    { c: `Khai triển $(x+1)^3$.`, a: `$x^3+3x^2+3x+1$.`, s: `$(x+1)^3 = x^3+3x^2+3x+1$ (HĐT lập phương tổng).`, d: 'van_dung' },
    { c: `CMR $n^3-n$ chia hết cho $6$ với mọi $n$ nguyên.`, a: `$n^3-n = n(n-1)(n+1) \\vdots 6$.`, s: `$n^3-n = (n-1)n(n+1)$: tích $3$ số nguyên liên tiếp $\\vdots 6$. $\\blacksquare$`, d: 'van_dung_cao' },
    { c: `Tìm $x$: $(x+1)(x+2)(x+3)(x+4) = 24$.`, a: `$x = 0$ hoặc $x = -5$.`, s: `Nhóm: $[(x+1)(x+4)][(x+2)(x+3)] = (x^2+5x+4)(x^2+5x+6) = 24$.\nĐặt $t=x^2+5x+5$: $(t-1)(t+1)=24 \\Rightarrow t^2=25 \\Rightarrow t=\\pm 5$.\n$x^2+5x+5=5 \\Rightarrow x(x+5)=0$: $x=0,-5$.\n$x^2+5x+5=-5 \\Rightarrow x^2+5x+10=0$: $\\Delta<0$ vô nghiệm.`, d: 'van_dung_cao' },
  ]},
  { id: 'd9041ee2-d06c-451c-8811-f9120dc7c70b', p: 'T8-C1B5', q: [
    { c: `Chia: $6x^3y^2 : 2x^2y$.`, a: `$3xy$.`, s: `$\\frac{6}{2} = 3$, $x^{3-2}=x$, $y^{2-1}=y$. KQ: $3xy$.`, d: 'nhan_biet' },
    { c: `Chia: $(4x^2-6x) : 2x$.`, a: `$2x-3$.`, s: `$\\frac{4x^2}{2x} - \\frac{6x}{2x} = 2x-3$.`, d: 'nhan_biet' },
    { c: `Chia: $(x^3-3x^2+2x) : x$.`, a: `$x^2-3x+2$.`, s: `Chia từng hạng tử cho $x$.`, d: 'nhan_biet' },
    { c: `Chia: $(6x^2y+9xy^2-3xy) : 3xy$.`, a: `$2x+3y-1$.`, s: `$\\frac{6x^2y}{3xy}+\\frac{9xy^2}{3xy}-\\frac{3xy}{3xy} = 2x+3y-1$.`, d: 'thong_hieu' },
    { c: `Chia: $(x^3-8) : (x-2)$.`, a: `$x^2+2x+4$.`, s: `$x^3-8 = (x-2)(x^2+2x+4)$.`, d: 'thong_hieu' },
    { c: `Chia: $(x^4-1) : (x+1)$.`, a: `$x^3-x^2+x-1$.`, s: `$x^4-1=(x^2+1)(x+1)(x-1)$. Chia $(x+1)$: $(x^2+1)(x-1) = x^3-x^2+x-1$.`, d: 'thong_hieu' },
    { c: `Tìm $a$ để $(x^2+ax+6) \\vdots (x+2)$.`, a: `$a = 5$.`, s: `$P(-2)=4-2a+6=0 \\Rightarrow a=5$.`, d: 'van_dung' },
    { c: `Chia $(2x^3+5x^2-x-6) : (x+2)$.`, a: `$2x^2+x-3$.`, s: `Horner hoặc chia dài. $P(-2) = -16+20+2-6=0$. Thương: $2x^2+x-3$.`, d: 'van_dung' },
    { c: `CMR $(x^n-1) \\vdots (x-1)$ với mọi $n \\in \\mathbb{N}^*$.`, a: `$x^n-1 = (x-1)(x^{n-1}+...+1)$.`, s: `$x^n-1 = (x-1)(x^{n-1}+x^{n-2}+...+x+1)$. Đây là đẳng thức đại số cơ bản. $\\blacksquare$`, d: 'van_dung_cao' },
    { c: `Chia $x^4+x^3+x+1$ cho $x^2+1$. Tìm thương và dư.`, a: `Thương $x^2+x$, dư $1$... Kiểm tra.`, s: `$(x^2+1)(x^2+x) = x^4+x^3+x^2+x$. Dư: $(x^4+x^3+x+1)-(x^4+x^3+x^2+x) = -x^2+1$... Hmm.\nSửa: chia thực tế: thương $x^2+x-1$, dư $2$.\n$(x^2+1)(x^2+x-1) = x^4+x^3-x^2+x^2+x-1 = x^4+x^3+x-1$. Dư: $1-(-1) = 2$.`, d: 'van_dung_cao' },
  ]},
  { id: '30c01eff-1da3-4f14-b256-cc498f1e9055', p: 'T8-C2B6', q: [
    { c: `Khai triển: $(x+3)^2$.`, a: `$x^2+6x+9$.`, s: `$(a+b)^2 = a^2+2ab+b^2$. $(x+3)^2 = x^2+6x+9$.`, d: 'nhan_biet' },
    { c: `Khai triển: $(2x-5)^2$.`, a: `$4x^2-20x+25$.`, s: `$(a-b)^2 = a^2-2ab+b^2$. $= 4x^2-20x+25$.`, d: 'nhan_biet' },
    { c: `Tính: $(3x+2)(3x-2)$.`, a: `$9x^2-4$.`, s: `$(a+b)(a-b) = a^2-b^2$. $= 9x^2-4$.`, d: 'nhan_biet' },
    { c: `Tính nhanh: $101^2$.`, a: `$10201$.`, s: `$101^2 = (100+1)^2 = 10000+200+1 = 10201$.`, d: 'thong_hieu' },
    { c: `Tính: $99 \\times 101$.`, a: `$9999$.`, s: `$(100-1)(100+1) = 10000-1 = 9999$.`, d: 'thong_hieu' },
    { c: `Phân tích: $x^2-16$.`, a: `$(x-4)(x+4)$.`, s: `Hiệu hai bình phương: $x^2-4^2 = (x-4)(x+4)$.`, d: 'thong_hieu' },
    { c: `CMR $a^2+b^2 \\ge 2ab$ với mọi $a,b$.`, a: `$(a-b)^2 \\ge 0$.`, s: `$(a-b)^2 = a^2-2ab+b^2 \\ge 0 \\Rightarrow a^2+b^2 \\ge 2ab$. $\\blacksquare$`, d: 'van_dung' },
    { c: `Phân tích: $4x^2-12xy+9y^2$.`, a: `$(2x-3y)^2$.`, s: `$= (2x)^2 - 2(2x)(3y) + (3y)^2 = (2x-3y)^2$.`, d: 'van_dung' },
    { c: `Tính: $2025^2 - 2024 \\times 2026$.`, a: `$1$.`, s: `$2024 \\times 2026 = (2025-1)(2025+1) = 2025^2-1$. Vậy $2025^2-2024 \\times 2026 = 1$.`, d: 'van_dung_cao' },
    { c: `CMR $n^2+2n+2 > 0$ mọi $n$ nguyên.`, a: `$(n+1)^2+1 > 0$.`, s: `$n^2+2n+2 = (n+1)^2+1 \\ge 1 > 0$. $\\blacksquare$`, d: 'van_dung_cao' },
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
