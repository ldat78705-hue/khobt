const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const U = '8316c34e-765d-4b8c-9364-b683a17e33f8', G = 8, T = 'dai_so';
const B = [
  { id: 'fc3e7715-ce7b-4e6a-bc89-20862d22a3e8', p: 'T8-C6B21', q: [
    { c: `Phân thức đại số là gì?`, a: `Biểu thức dạng $\\frac{A}{B}$ với $A, B$ là đa thức, $B \\neq 0$.`, s: `Phân thức đại số là biểu thức có dạng $\\frac{A}{B}$ trong đó $A, B$ là các đa thức và $B \\neq 0$.`, d: 'nhan_biet' },
    { c: `Biểu thức nào là phân thức đại số: a) $\\frac{3x+1}{x-2}$; b) $\\frac{5}{3}$; c) $2x+1$?`, a: `Cả $3$ đều là.`, s: `a) $\\frac{3x+1}{x-2}$: phân thức. b) $\\frac{5}{3}$: phân thức (đa thức bậc $0$). c) $2x+1 = \\frac{2x+1}{1}$: phân thức.`, d: 'nhan_biet' },
    { c: `Tìm điều kiện xác định của $\\frac{x+3}{x-5}$.`, a: `$x \\neq 5$.`, s: `$x - 5 \\neq 0 \\Rightarrow x \\neq 5$.`, d: 'nhan_biet' },
    { c: `Tìm ĐKXĐ: $\\frac{2x}{x^2-4}$.`, a: `$x \\neq \\pm 2$.`, s: `$x^2 - 4 \\neq 0 \\Rightarrow (x-2)(x+2) \\neq 0 \\Rightarrow x \\neq 2, x \\neq -2$.`, d: 'thong_hieu' },
    { c: `Hai phân thức $\\frac{A}{B}$ và $\\frac{C}{D}$ bằng nhau khi nào?`, a: `$AD = BC$.`, s: `$\\frac{A}{B} = \\frac{C}{D} \\Leftrightarrow A \\cdot D = B \\cdot C$.`, d: 'thong_hieu' },
    { c: `CMR $\\frac{x^2-1}{x+1} = x-1$ (với $x \\neq -1$).`, a: `Phân tích tử.`, s: `$\\frac{x^2-1}{x+1} = \\frac{(x-1)(x+1)}{x+1} = x-1$ (với $x \\neq -1$). $\\blacksquare$`, d: 'thong_hieu' },
    { c: `Tìm ĐKXĐ: $\\frac{x+1}{x^2-3x+2}$.`, a: `$x \\neq 1, x \\neq 2$.`, s: `$x^2-3x+2 = (x-1)(x-2) \\neq 0 \\Rightarrow x \\neq 1, x \\neq 2$.`, d: 'van_dung' },
    { c: `Chứng minh $\\frac{x^2+2x+1}{x^2-1} = \\frac{x+1}{x-1}$ ($x \\neq \\pm 1$).`, a: `Phân tích HĐT.`, s: `$\\frac{(x+1)^2}{(x+1)(x-1)} = \\frac{x+1}{x-1}$. $\\blacksquare$`, d: 'van_dung' },
    { c: `Cho $\\frac{x^2-9}{x^2+6x+9}$. Rút gọn.`, a: `$\\frac{x-3}{x+3}$.`, s: `$\\frac{(x-3)(x+3)}{(x+3)^2} = \\frac{x-3}{x+3}$ ($x \\neq -3$).`, d: 'van_dung_cao' },
    { c: `Tìm $x$ để $\\frac{x^2-4}{x^2-4x+4} = 0$.`, a: `$x = -2$.`, s: `Tử $= 0$: $(x-2)(x+2)=0 \\Rightarrow x=2$ hoặc $x=-2$. Mẫu $\\neq 0$: $(x-2)^2 \\neq 0 \\Rightarrow x \\neq 2$. Vậy $x = -2$.`, d: 'van_dung_cao' },
  ]},
  { id: 'e8623ea1-37ef-42c0-b688-59d745a29994', p: 'T8-C6B22', q: [
    { c: `Phát biểu tính chất cơ bản của phân thức.`, a: `Nhân/chia cả tử và mẫu cho cùng đa thức khác $0$.`, s: `$\\frac{A}{B} = \\frac{A \\cdot M}{B \\cdot M}$ và $\\frac{A}{B} = \\frac{A : N}{B : N}$ ($M, N \\neq 0$).`, d: 'nhan_biet' },
    { c: `Rút gọn $\\frac{6x^2}{3x}$.`, a: `$2x$.`, s: `$\\frac{6x^2}{3x} = \\frac{6x^2 : 3x}{3x : 3x} = 2x$ ($x \\neq 0$).`, d: 'nhan_biet' },
    { c: `Quy đồng mẫu: $\\frac{1}{x}$ và $\\frac{1}{x+1}$.`, a: `MTC $= x(x+1)$.`, s: `$\\frac{1}{x} = \\frac{x+1}{x(x+1)}$, $\\frac{1}{x+1} = \\frac{x}{x(x+1)}$.`, d: 'nhan_biet' },
    { c: `Rút gọn $\\frac{x^2-4}{x+2}$.`, a: `$x-2$.`, s: `$\\frac{(x-2)(x+2)}{x+2} = x-2$ ($x \\neq -2$).`, d: 'thong_hieu' },
    { c: `Rút gọn $\\frac{3x^2+6x}{3x}$.`, a: `$x+2$.`, s: `$\\frac{3x(x+2)}{3x} = x+2$ ($x \\neq 0$).`, d: 'thong_hieu' },
    { c: `Quy đồng: $\\frac{2}{x-1}$ và $\\frac{3}{x+1}$.`, a: `MTC $= (x-1)(x+1)$.`, s: `$\\frac{2(x+1)}{(x-1)(x+1)}$ và $\\frac{3(x-1)}{(x-1)(x+1)}$.`, d: 'thong_hieu' },
    { c: `Rút gọn $\\frac{x^3-x}{x^2-1}$.`, a: `$x$.`, s: `$\\frac{x(x^2-1)}{(x-1)(x+1)} = \\frac{x(x-1)(x+1)}{(x-1)(x+1)} = x$ ($x \\neq \\pm 1$).`, d: 'van_dung' },
    { c: `Rút gọn $\\frac{x^2-6x+9}{x^2-9}$.`, a: `$\\frac{x-3}{x+3}$.`, s: `$\\frac{(x-3)^2}{(x-3)(x+3)} = \\frac{x-3}{x+3}$ ($x \\neq 3, x \\neq -3$).`, d: 'van_dung' },
    { c: `Tìm $x$ nguyên để $\\frac{x+3}{x-1}$ có giá trị nguyên.`, a: `$x \\in \\{-3,-1,0,2,3,5\\}$.`, s: `$\\frac{x+3}{x-1} = 1 + \\frac{4}{x-1}$. Nguyên khi $(x-1) | 4$. $x-1 \\in \\{\\pm 1, \\pm 2, \\pm 4\\}$. $x \\in \\{-3,-1,0,2,3,5\\}$.`, d: 'van_dung_cao' },
    { c: `CMR $\\frac{a^2+b^2}{ab} \\geq 2$ với $a, b > 0$.`, a: `BĐT AM-GM.`, s: `$\\frac{a^2+b^2}{ab} = \\frac{a}{b}+\\frac{b}{a} \\geq 2\\sqrt{\\frac{a}{b} \\cdot \\frac{b}{a}} = 2$ (AM-GM). Đẳng thức khi $a=b$. $\\blacksquare$`, d: 'van_dung_cao' },
  ]},
  { id: '4a63ce27-01de-4f2a-ae68-03882cde1043', p: 'T8-C6B23', q: [
    { c: `Muốn cộng hai phân thức cùng mẫu, ta làm thế nào?`, a: `Cộng tử, giữ mẫu.`, s: `$\\frac{A}{B} + \\frac{C}{B} = \\frac{A+C}{B}$.`, d: 'nhan_biet' },
    { c: `Tính $\\frac{3}{x} + \\frac{5}{x}$.`, a: `$\\frac{8}{x}$.`, s: `$\\frac{3+5}{x} = \\frac{8}{x}$.`, d: 'nhan_biet' },
    { c: `Phép trừ phân thức: $\\frac{A}{B} - \\frac{C}{B} = ?$`, a: `$\\frac{A-C}{B}$.`, s: `$\\frac{A}{B} - \\frac{C}{B} = \\frac{A-C}{B}$.`, d: 'nhan_biet' },
    { c: `Tính $\\frac{1}{x} + \\frac{1}{x+1}$.`, a: `$\\frac{2x+1}{x(x+1)}$.`, s: `MTC $= x(x+1)$. $\\frac{x+1+x}{x(x+1)} = \\frac{2x+1}{x(x+1)}$.`, d: 'thong_hieu' },
    { c: `Tính $\\frac{x}{x-1} - \\frac{1}{x-1}$.`, a: `$1$.`, s: `$\\frac{x-1}{x-1} = 1$ ($x \\neq 1$).`, d: 'thong_hieu' },
    { c: `Tính $\\frac{2}{x-1} + \\frac{3}{x+1}$.`, a: `$\\frac{5x-1}{(x-1)(x+1)}$.`, s: `$\\frac{2(x+1)+3(x-1)}{(x-1)(x+1)} = \\frac{5x-1}{x^2-1}$.`, d: 'thong_hieu' },
    { c: `Rút gọn $\\frac{x}{x-2} - \\frac{4}{x^2-4}$.`, a: `$\\frac{x^2+2x+4}{(x-2)(x+2)\\cdot...}$ Tính lại.`, s: `$\\frac{x}{x-2} - \\frac{4}{(x-2)(x+2)} = \\frac{x(x+2)-4}{(x-2)(x+2)} = \\frac{x^2+2x-4}{(x-2)(x+2)}$.`, d: 'van_dung' },
    { c: `Tính $\\frac{1}{x} + \\frac{1}{x+1} + \\frac{1}{x+2}$ với $x=1$.`, a: `$\\frac{1}{1}+\\frac{1}{2}+\\frac{1}{3} = \\frac{11}{6}$.`, s: `Thay $x=1$: $1 + \\frac{1}{2} + \\frac{1}{3} = \\frac{6+3+2}{6} = \\frac{11}{6}$.`, d: 'van_dung' },
    { c: `Rút gọn $\\frac{1}{x(x+1)} + \\frac{1}{(x+1)(x+2)}$.`, a: `$\\frac{2}{x(x+2)}$... tính lại.`, s: `$= \\frac{1}{x} - \\frac{1}{x+1} + \\frac{1}{x+1} - \\frac{1}{x+2} = \\frac{1}{x} - \\frac{1}{x+2} = \\frac{2}{x(x+2)}$.`, d: 'van_dung_cao' },
    { c: `Tính $\\frac{1}{1 \\cdot 2} + \\frac{1}{2 \\cdot 3} + \\frac{1}{3 \\cdot 4} + ... + \\frac{1}{99 \\cdot 100}$.`, a: `$\\frac{99}{100}$.`, s: `$\\frac{1}{k(k+1)} = \\frac{1}{k} - \\frac{1}{k+1}$. Tổng $= 1 - \\frac{1}{100} = \\frac{99}{100}$.`, d: 'van_dung_cao' },
  ]},
  { id: '9193d24c-c98d-4af1-90d2-2ab3874c3954', p: 'T8-C6B24', q: [
    { c: `$\\frac{A}{B} \\cdot \\frac{C}{D} = ?$`, a: `$\\frac{AC}{BD}$.`, s: `Nhân tử với tử, mẫu với mẫu: $\\frac{A \\cdot C}{B \\cdot D}$.`, d: 'nhan_biet' },
    { c: `$\\frac{A}{B} : \\frac{C}{D} = ?$`, a: `$\\frac{AD}{BC}$.`, s: `Chia = nhân nghịch đảo: $\\frac{A}{B} \\cdot \\frac{D}{C} = \\frac{AD}{BC}$ ($C \\neq 0$).`, d: 'nhan_biet' },
    { c: `Tính $\\frac{x}{2} \\cdot \\frac{4}{x^2}$.`, a: `$\\frac{2}{x}$.`, s: `$\\frac{4x}{2x^2} = \\frac{2}{x}$ ($x \\neq 0$).`, d: 'nhan_biet' },
    { c: `Tính $\\frac{x^2-1}{x} \\cdot \\frac{x}{x+1}$.`, a: `$x-1$.`, s: `$\\frac{(x-1)(x+1)}{x} \\cdot \\frac{x}{x+1} = x-1$.`, d: 'thong_hieu' },
    { c: `Tính $\\frac{x+1}{x-1} : \\frac{x+1}{x}$.`, a: `$\\frac{x}{x-1}$.`, s: `$\\frac{x+1}{x-1} \\cdot \\frac{x}{x+1} = \\frac{x}{x-1}$.`, d: 'thong_hieu' },
    { c: `Rút gọn $\\frac{x^2-4}{x+3} \\cdot \\frac{x+3}{x-2}$.`, a: `$x+2$.`, s: `$\\frac{(x-2)(x+2)}{x+3} \\cdot \\frac{x+3}{x-2} = x+2$.`, d: 'thong_hieu' },
    { c: `Tính $\\frac{x^2+2x+1}{x^2-1} \\cdot \\frac{x-1}{x+1}$.`, a: `$1$.`, s: `$\\frac{(x+1)^2}{(x-1)(x+1)} \\cdot \\frac{x-1}{x+1} = 1$ ($x \\neq \\pm 1$).`, d: 'van_dung' },
    { c: `Tính $\\frac{x^3-8}{x^2+2x+4} \\cdot \\frac{1}{x-2}$.`, a: `$1$.`, s: `$\\frac{(x-2)(x^2+2x+4)}{x^2+2x+4} \\cdot \\frac{1}{x-2} = 1$.`, d: 'van_dung' },
    { c: `Rút gọn $\\frac{x^2-9}{x^2-6x+9} : \\frac{x+3}{x-3}$.`, a: `$1$.`, s: `$\\frac{(x-3)(x+3)}{(x-3)^2} \\cdot \\frac{x-3}{x+3} = 1$ ($x \\neq 3, x \\neq -3$).`, d: 'van_dung_cao' },
    { c: `Rút gọn $\\left(\\frac{x+1}{x-1} - \\frac{x-1}{x+1}\\right) : \\frac{2x}{x-1}$.`, a: `$\\frac{2}{x+1}$.`, s: `$\\frac{(x+1)^2-(x-1)^2}{(x-1)(x+1)} : \\frac{2x}{x-1} = \\frac{4x}{(x-1)(x+1)} \\cdot \\frac{x-1}{2x} = \\frac{2}{x+1}$.`, d: 'van_dung_cao' },
  ]},
  { id: 'dd85653e-b62a-411e-8e61-2ea5886d7cef', p: 'T8-C6BTC', q: [
    { c: `Rút gọn $\\frac{2x+4}{x^2-4}$.`, a: `$\\frac{2}{x-2}$.`, s: `$\\frac{2(x+2)}{(x-2)(x+2)} = \\frac{2}{x-2}$ ($x \\neq \\pm 2$).`, d: 'nhan_biet' },
    { c: `Tìm ĐKXĐ: $\\frac{3}{x^2+x}$.`, a: `$x \\neq 0, x \\neq -1$.`, s: `$x^2+x = x(x+1) \\neq 0 \\Rightarrow x \\neq 0, x \\neq -1$.`, d: 'nhan_biet' },
    { c: `Tính $\\frac{x+1}{2x} + \\frac{x-1}{2x}$.`, a: `$1$.`, s: `$\\frac{x+1+x-1}{2x} = \\frac{2x}{2x} = 1$.`, d: 'thong_hieu' },
    { c: `Tính $\\frac{3}{x+1} - \\frac{2}{x-1}$.`, a: `$\\frac{x-5}{(x+1)(x-1)}$.`, s: `$\\frac{3(x-1)-2(x+1)}{(x+1)(x-1)} = \\frac{x-5}{x^2-1}$.`, d: 'thong_hieu' },
    { c: `$\\frac{x^2+x}{x+1}$ rút gọn bằng?`, a: `$x$.`, s: `$\\frac{x(x+1)}{x+1} = x$ ($x \\neq -1$).`, d: 'thong_hieu' },
    { c: `Tính $\\frac{x}{x-2} \\cdot \\frac{x-2}{x^2}$.`, a: `$\\frac{1}{x}$.`, s: `$\\frac{x(x-2)}{x^2(x-2)} = \\frac{1}{x}$.`, d: 'van_dung' },
    { c: `Rút gọn $P = \\frac{x}{x-1} - \\frac{1}{x+1} - \\frac{2}{x^2-1}$.`, a: `$\\frac{x+1-2}{...}$... tính.`, s: `$P = \\frac{x(x+1)-(x-1)-2}{(x-1)(x+1)} = \\frac{x^2+x-x+1-2}{(x-1)(x+1)} = \\frac{x^2-1}{(x-1)(x+1)} = 1$.`, d: 'van_dung' },
    { c: `Cho $P = \\frac{x+2}{x-2} - \\frac{x-2}{x+2} + \\frac{16}{x^2-4}$. Rút gọn $P$.`, a: `$\\frac{4(x+2)}{...}$... tính.`, s: `$P = \\frac{(x+2)^2-(x-2)^2+16}{(x-2)(x+2)} = \\frac{8x+16}{x^2-4} = \\frac{8(x+2)}{(x-2)(x+2)} = \\frac{8}{x-2}$.`, d: 'van_dung_cao' },
    { c: `Tìm $x$ nguyên để $P = \\frac{8}{x-2}$ nhận giá trị nguyên.`, a: `$x \\in \\{-6,-2,0,1,3,4,6,10\\}$.`, s: `$(x-2) | 8$. $x-2 \\in \\{\\pm 1, \\pm 2, \\pm 4, \\pm 8\\}$. $x \\in \\{-6,-2,0,1,3,4,6,10\\}$.`, d: 'van_dung_cao' },
    { c: `Rút gọn $\\left(\\frac{1}{x} + \\frac{1}{x+1}\\right) \\cdot \\frac{x(x+1)}{2}$.`, a: `$\\frac{2x+1}{2}$.`, s: `$\\frac{2x+1}{x(x+1)} \\cdot \\frac{x(x+1)}{2} = \\frac{2x+1}{2}$.`, d: 'van_dung_cao' },
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
