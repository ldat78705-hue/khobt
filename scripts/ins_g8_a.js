const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const U = '8316c34e-765d-4b8c-9364-b683a17e33f8', G = 8, T = 'dai_so';
const B = [
  { id: '8bf09c0e-57fe-48e1-96db-f14d155d1de3', p: 'T8-C1B1', q: [
    { c: `Thu gọn đơn thức: $3x^2y \\cdot 2xy^3$.`, a: `$6x^3y^4$.`, s: `$3 \\cdot 2 = 6$, $x^2 \\cdot x = x^3$, $y \\cdot y^3 = y^4$. KQ: $6x^3y^4$.`, d: 'nhan_biet' },
    { c: `Tìm bậc của đơn thức $-5x^3y^2z$.`, a: `Bậc $6$.`, s: `Bậc $= 3+2+1 = 6$.`, d: 'nhan_biet' },
    { c: `Tính giá trị đơn thức $2x^2y$ tại $x=3, y=-2$.`, a: `$-36$.`, s: `$2(3)^2(-2) = 2 \\cdot 9 \\cdot (-2) = -36$.`, d: 'nhan_biet' },
    { c: `Nhân: $(-4x^3y) \\cdot (3x^2y^2)$.`, a: `$-12x^5y^3$.`, s: `$(-4)(3) = -12$, $x^3 \\cdot x^2 = x^5$, $y \\cdot y^2 = y^3$. KQ: $-12x^5y^3$.`, d: 'thong_hieu' },
    { c: `Hai đơn thức $3x^2y$ và $-5x^2y$ có đồng dạng không?`, a: `Có.`, s: `Cùng phần biến $x^2y$ → đồng dạng.`, d: 'thong_hieu' },
    { c: `Thu gọn: $2x^2y + 5x^2y - 3x^2y$.`, a: `$4x^2y$.`, s: `$(2+5-3)x^2y = 4x^2y$.`, d: 'thong_hieu' },
    { c: `Tìm đơn thức $A$ biết $A \\cdot 3xy^2 = -6x^3y^4$.`, a: `$A = -2x^2y^2$.`, s: `$A = \\frac{-6x^3y^4}{3xy^2} = -2x^2y^2$.`, d: 'van_dung' },
    { c: `Cho $M = 2x^2y$, $N = -3xy^2$. Tính $M^2 \\cdot N$.`, a: `$-12x^5y^4$.`, s: `$M^2 = 4x^4y^2$. $M^2 \\cdot N = 4x^4y^2 \\cdot (-3xy^2) = -12x^5y^4$.`, d: 'van_dung' },
    { c: `Tìm $n$ để đơn thức $3x^ny^2$ có bậc $7$.`, a: `$n = 5$.`, s: `Bậc $= n + 2 = 7 \\Rightarrow n = 5$.`, d: 'van_dung_cao' },
    { c: `CMR nếu $A, B$ là hai đơn thức bậc $m, n$ thì $AB$ có bậc $m+n$.`, a: `Cộng số mũ.`, s: `$A = ax_1^{a_1}...x_k^{a_k}$ bậc $\\sum a_i = m$. $B = bx_1^{b_1}...$ bậc $\\sum b_i = n$.\n$AB$ có bậc $\\sum(a_i+b_i) = m+n$. $\\blacksquare$`, d: 'van_dung_cao' },
  ]},
  { id: 'bd0e2c0a-5424-4cf8-8ced-a0df65d03d4f', p: 'T8-C1B2', q: [
    { c: `Thu gọn đa thức: $3x^2 + 2x - x^2 + 5x - 1$.`, a: `$2x^2 + 7x - 1$.`, s: `$(3-1)x^2 + (2+5)x - 1 = 2x^2 + 7x - 1$.`, d: 'nhan_biet' },
    { c: `Tìm bậc đa thức: $5x^3y - 2x^4 + 3x^2y^2 + 1$.`, a: `Bậc $4$.`, s: `Bậc các hạng tử: $4, 4, 4, 0$. Bậc đa thức $= 4$.`, d: 'nhan_biet' },
    { c: `Tính $P(2)$ với $P(x) = x^3 - 3x + 2$.`, a: `$4$.`, s: `$P(2) = 8 - 6 + 2 = 4$.`, d: 'nhan_biet' },
    { c: `Sắp xếp theo luỹ thừa giảm: $2x - 3x^3 + x^2 + 5$.`, a: `$-3x^3 + x^2 + 2x + 5$.`, s: `Sắp xếp: $-3x^3 + x^2 + 2x + 5$.`, d: 'thong_hieu' },
    { c: `Tìm nghiệm $P(x) = 2x - 6$.`, a: `$x = 3$.`, s: `$2x - 6 = 0 \\Rightarrow x = 3$.`, d: 'thong_hieu' },
    { c: `CMR $P(x) = x^2 + 1$ không có nghiệm.`, a: `$x^2 + 1 > 0$ mọi $x$.`, s: `$x^2 \\ge 0 \\Rightarrow x^2 + 1 \\ge 1 > 0$ mọi $x$. Vậy $P$ không có nghiệm.`, d: 'thong_hieu' },
    { c: `Cho $P = 2x^2 - 3x + 1$, $Q = x^2 + x - 3$. Tính $P + Q$ và $P - Q$.`, a: `$P+Q = 3x^2 - 2x - 2$, $P-Q = x^2 - 4x + 4$.`, s: `$P+Q = 3x^2-2x-2$. $P-Q = x^2-4x+4 = (x-2)^2$.`, d: 'van_dung' },
    { c: `Tìm $a$ để $P(x) = ax^2 + 3x - 5$ có nghiệm $x = 1$.`, a: `$a = 2$.`, s: `$P(1) = a + 3 - 5 = 0 \\Rightarrow a = 2$.`, d: 'van_dung' },
    { c: `Tìm đa thức $P$ bậc 2 biết $P(0)=1, P(1)=0, P(2)=3$.`, a: `$P = 2x^2 - 3x + 1$.`, s: `$P=ax^2+bx+c$. $c=1$, $a+b+1=0$, $4a+2b+1=3$.\n$a+b=-1$, $4a+2b=2 \\Rightarrow 2a+b=1$. Trừ: $a=2, b=-3$.`, d: 'van_dung_cao' },
    { c: `CMR đa thức $P(x) = x^4 + x^2 + 1 > 0$ với mọi $x$.`, a: `$P > 0$.`, s: `$P = (x^2+\\frac{1}{2})^2 + \\frac{3}{4} > 0$ mọi $x$. $\\blacksquare$`, d: 'van_dung_cao' },
  ]},
  { id: 'c40e2f3d-7642-406c-ba9b-15a8863dfb49', p: 'T8-C1B3', q: [
    { c: `Tính: $(3x^2+2x-1)+(x^2-4x+5)$.`, a: `$4x^2-2x+4$.`, s: `$(3+1)x^2+(2-4)x+(-1+5) = 4x^2-2x+4$.`, d: 'nhan_biet' },
    { c: `Tính: $(5x^3-x+2)-(2x^3+3x-1)$.`, a: `$3x^3-4x+3$.`, s: `$5x^3-2x^3-x-3x+2+1 = 3x^3-4x+3$.`, d: 'nhan_biet' },
    { c: `Thu gọn: $2x^2+3x-1+x^2-5x+4$.`, a: `$3x^2-2x+3$.`, s: `$(2+1)x^2+(3-5)x+(-1+4) = 3x^2-2x+3$.`, d: 'nhan_biet' },
    { c: `Tìm $P(x)$ biết $P(x)+(x^2-2x+3) = 3x^2+x-1$.`, a: `$P = 2x^2+3x-4$.`, s: `$P = (3x^2+x-1)-(x^2-2x+3) = 2x^2+3x-4$.`, d: 'thong_hieu' },
    { c: `$P = x^3+2x-1$, $Q = -x^3+x^2+1$. Tính $P+Q$.`, a: `$x^2+2x$.`, s: `$P+Q = x^2+2x = x(x+2)$.`, d: 'thong_hieu' },
    { c: `Tìm $Q$ biết $P-Q = x^2+1$ với $P = 3x^2-x+2$.`, a: `$Q = 2x^2-x+1$.`, s: `$Q = P-(x^2+1) = 3x^2-x+2-x^2-1 = 2x^2-x+1$.`, d: 'thong_hieu' },
    { c: `$A = x^2-2xy+y^2$, $B = x^2+2xy+y^2$. Tính $A+B$ và $A-B$.`, a: `$A+B=2x^2+2y^2$, $A-B=-4xy$.`, s: `$A+B = 2x^2+2y^2$. $A-B = -4xy$.`, d: 'van_dung' },
    { c: `Tìm nghiệm chung $P(x)+Q(x)=0$ và $P(x)-Q(x)=0$.`, a: `Nghiệm chung khi $P(x)=0$ và $Q(x)=0$.`, s: `$P+Q=0$ và $P-Q=0$ cộng lại: $2P=0 \\Rightarrow P=0$. Trừ: $2Q=0 \\Rightarrow Q=0$. Vậy cần $P=Q=0$ cùng lúc.`, d: 'van_dung' },
    { c: `Cho $P+Q = x^2+3x+2$ và $P-Q = x^2-x-2$. Tìm $P, Q$.`, a: `$P = x^2+x$, $Q = 2x+2$.`, s: `$2P = 2x^2+2x \\Rightarrow P = x^2+x$.\n$2Q = 4x+4 \\Rightarrow Q = 2x+2$.`, d: 'van_dung_cao' },
    { c: `CMR $(a+b+c)^2 \\le 3(a^2+b^2+c^2)$ bằng cách khai triển đa thức.`, a: `$\\Leftrightarrow (a-b)^2+(b-c)^2+(c-a)^2 \\ge 0$.`, s: `$3(a^2+b^2+c^2) - (a+b+c)^2 = 2a^2+2b^2+2c^2-2ab-2bc-2ca = (a-b)^2+(b-c)^2+(c-a)^2 \\ge 0$. $\\blacksquare$`, d: 'van_dung_cao' },
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
