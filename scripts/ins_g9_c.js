const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const U = '8316c34e-765d-4b8c-9364-b683a17e33f8', G = 9, T = 'dai_so';
const B = [
  { id: 'd6b4f323-757f-4a92-8720-38ca2f4deba8', p: 'T9-C3B7', q: [
    { c: `Căn bậc hai số học của $a \\geq 0$ là gì?`, a: `Số $x \\geq 0$ sao cho $x^2 = a$, kí hiệu $\\sqrt{a}$.`, s: `$\\sqrt{a}$ là số không âm mà bình phương bằng $a$.`, d: 'nhan_biet' },
    { c: `Tính $\\sqrt{49}$.`, a: `$7$.`, s: `$7^2 = 49$ nên $\\sqrt{49} = 7$.`, d: 'nhan_biet' },
    { c: `$\\sqrt{a^2} = ?$`, a: `$|a|$.`, s: `$\\sqrt{a^2} = |a|$ với mọi $a \\in \\mathbb{R}$.`, d: 'nhan_biet' },
    { c: `Tính $\\sqrt{(-5)^2}$.`, a: `$5$.`, s: `$\\sqrt{(-5)^2} = \\sqrt{25} = 5 = |-5|$.`, d: 'thong_hieu' },
    { c: `Biểu thức $\\sqrt{x-3}$ xác định khi nào?`, a: `$x \\geq 3$.`, s: `$x - 3 \\geq 0 \\Rightarrow x \\geq 3$.`, d: 'thong_hieu' },
    { c: `So sánh $3$ và $\\sqrt{10}$.`, a: `$3 < \\sqrt{10}$.`, s: `$3^2 = 9 < 10 = (\\sqrt{10})^2$. Vì cả hai dương nên $3 < \\sqrt{10}$.`, d: 'thong_hieu' },
    { c: `Tìm $x$ biết $\\sqrt{x} = 5$.`, a: `$x = 25$.`, s: `$\\sqrt{x} = 5 \\Rightarrow x = 25$. Kiểm tra: $\\sqrt{25} = 5$ ✓.`, d: 'van_dung' },
    { c: `Tìm $x$ biết $\\sqrt{2x+1} = 3$.`, a: `$x = 4$.`, s: `ĐK: $x \\geq -\\frac{1}{2}$. $2x+1 = 9 \\Rightarrow x = 4$ (thoả ĐK).`, d: 'van_dung' },
    { c: `Rút gọn $\\sqrt{(x-2)^2}$ khi $x < 2$.`, a: `$2 - x$.`, s: `$\\sqrt{(x-2)^2} = |x-2| = 2-x$ (vì $x < 2$ nên $x-2 < 0$).`, d: 'van_dung_cao' },
    { c: `Tìm ĐKXĐ của $\\frac{1}{\\sqrt{x-1}}$.`, a: `$x > 1$.`, s: `$x - 1 > 0$ (phải dương nghiêm ngặt vì ở mẫu) $\\Rightarrow x > 1$.`, d: 'van_dung_cao' },
  ]},
  { id: '4dd3889a-0416-44a1-8d35-3e18e4a8ab58', p: 'T9-C3B8', q: [
    { c: `$\\sqrt{a \\cdot b} = ?$ (với $a, b \\geq 0$).`, a: `$\\sqrt{a} \\cdot \\sqrt{b}$.`, s: `$\\sqrt{ab} = \\sqrt{a} \\cdot \\sqrt{b}$ với $a, b \\geq 0$.`, d: 'nhan_biet' },
    { c: `$\\sqrt{\\frac{a}{b}} = ?$ (với $a \\geq 0, b > 0$).`, a: `$\\frac{\\sqrt{a}}{\\sqrt{b}}$.`, s: `$\\sqrt{\\frac{a}{b}} = \\frac{\\sqrt{a}}{\\sqrt{b}}$ với $a \\geq 0, b > 0$.`, d: 'nhan_biet' },
    { c: `Tính $\\sqrt{4 \\cdot 9}$.`, a: `$6$.`, s: `$\\sqrt{36} = 6$. Hoặc $\\sqrt{4} \\cdot \\sqrt{9} = 2 \\cdot 3 = 6$.`, d: 'nhan_biet' },
    { c: `Tính $\\sqrt{12} \\cdot \\sqrt{3}$.`, a: `$6$.`, s: `$\\sqrt{12 \\cdot 3} = \\sqrt{36} = 6$.`, d: 'thong_hieu' },
    { c: `Rút gọn $\\sqrt{50}$.`, a: `$5\\sqrt{2}$.`, s: `$\\sqrt{50} = \\sqrt{25 \\cdot 2} = 5\\sqrt{2}$.`, d: 'thong_hieu' },
    { c: `Tính $\\frac{\\sqrt{48}}{\\sqrt{3}}$.`, a: `$4$.`, s: `$\\sqrt{\\frac{48}{3}} = \\sqrt{16} = 4$.`, d: 'thong_hieu' },
    { c: `Rút gọn $\\sqrt{18} + \\sqrt{50} - \\sqrt{8}$.`, a: `$6\\sqrt{2}$.`, s: `$3\\sqrt{2} + 5\\sqrt{2} - 2\\sqrt{2} = 6\\sqrt{2}$.`, d: 'van_dung' },
    { c: `Tính $\\sqrt{3} \\cdot \\sqrt{12} \\cdot \\sqrt{\\frac{1}{9}}$.`, a: `$2$.`, s: `$\\sqrt{3 \\cdot 12 \\cdot \\frac{1}{9}} = \\sqrt{\\frac{36}{9}} = \\sqrt{4} = 2$.`, d: 'van_dung' },
    { c: `Rút gọn $\\frac{\\sqrt{28} + \\sqrt{63}}{\\sqrt{7}}$.`, a: `$5$.`, s: `$\\frac{2\\sqrt{7}+3\\sqrt{7}}{\\sqrt{7}} = \\frac{5\\sqrt{7}}{\\sqrt{7}} = 5$.`, d: 'van_dung_cao' },
    { c: `CMR $\\sqrt{2} + \\sqrt{6} < 2\\sqrt{3}$ (không dùng máy tính).`, a: `Bình phương hai vế.`, s: `VT²$= 8 + 2\\sqrt{12}$. VP²$= 12$. Cần CM $8+2\\sqrt{12}<12$, tức $\\sqrt{12}<2$, tức $12<4$. Sai! Thực ra $\\sqrt{12}=2\\sqrt{3} \\approx 3{,}46$. VT²$\\approx 14{,}93$. VP²$=12$. Vậy VT$>$VP. **Sửa**: $\\sqrt{2}+\\sqrt{6} > 2\\sqrt{3}$. CMR đúng: $(\\sqrt{2}+\\sqrt{6})^2=8+2\\sqrt{12}=8+4\\sqrt{3} \\approx 14{,}93 > 12 = (2\\sqrt{3})^2$. $\\blacksquare$`, d: 'van_dung_cao' },
  ]},
  { id: '7c1c49ae-9cb0-4fe0-92fb-c18b6fa815f7', p: 'T9-C3B9', q: [
    { c: `Trục căn thức ở mẫu $\\frac{a}{\\sqrt{b}}$ ($b > 0$) ta được gì?`, a: `$\\frac{a\\sqrt{b}}{b}$.`, s: `$\\frac{a}{\\sqrt{b}} = \\frac{a\\sqrt{b}}{b}$.`, d: 'nhan_biet' },
    { c: `Trục căn thức $\\frac{1}{\\sqrt{3}}$.`, a: `$\\frac{\\sqrt{3}}{3}$.`, s: `$\\frac{1}{\\sqrt{3}} = \\frac{\\sqrt{3}}{3}$.`, d: 'nhan_biet' },
    { c: `Đưa thừa số vào trong dấu căn: $3\\sqrt{5} = ?$`, a: `$\\sqrt{45}$.`, s: `$3\\sqrt{5} = \\sqrt{9 \\cdot 5} = \\sqrt{45}$.`, d: 'nhan_biet' },
    { c: `Trục căn thức $\\frac{2}{\\sqrt{5}-\\sqrt{3}}$.`, a: `$\\sqrt{5}+\\sqrt{3}$.`, s: `$\\frac{2(\\sqrt{5}+\\sqrt{3})}{(\\sqrt{5})^2-(\\sqrt{3})^2} = \\frac{2(\\sqrt{5}+\\sqrt{3})}{2} = \\sqrt{5}+\\sqrt{3}$.`, d: 'thong_hieu' },
    { c: `Rút gọn $\\frac{6}{\\sqrt{2}}$.`, a: `$3\\sqrt{2}$.`, s: `$\\frac{6\\sqrt{2}}{2} = 3\\sqrt{2}$.`, d: 'thong_hieu' },
    { c: `Rút gọn $\\sqrt{75} - \\sqrt{48} + \\sqrt{27}$.`, a: `$4\\sqrt{3}$.`, s: `$5\\sqrt{3} - 4\\sqrt{3} + 3\\sqrt{3} = 4\\sqrt{3}$.`, d: 'thong_hieu' },
    { c: `Rút gọn $P = \\frac{\\sqrt{x}+1}{\\sqrt{x}-1} - \\frac{\\sqrt{x}-1}{\\sqrt{x}+1}$ ($x \\geq 0, x \\neq 1$).`, a: `$\\frac{4\\sqrt{x}}{x-1}$.`, s: `$P = \\frac{(\\sqrt{x}+1)^2-(\\sqrt{x}-1)^2}{(\\sqrt{x}-1)(\\sqrt{x}+1)} = \\frac{4\\sqrt{x}}{x-1}$.`, d: 'van_dung' },
    { c: `Rút gọn $A = \\frac{1}{\\sqrt{2}+1} + \\frac{1}{\\sqrt{3}+\\sqrt{2}}$.`, a: `$\\sqrt{3}-1$.`, s: `$\\frac{\\sqrt{2}-1}{1} + \\frac{\\sqrt{3}-\\sqrt{2}}{1} = \\sqrt{3}-1$.`, d: 'van_dung' },
    { c: `Cho $P = \\left(\\frac{1}{\\sqrt{x}-1}-\\frac{1}{\\sqrt{x}}\\right) : \\frac{1}{\\sqrt{x}(\\sqrt{x}-1)}$ ($x>0, x \\neq 1$). Rút gọn $P$.`, a: `$P = 1$.`, s: `$\\frac{1}{\\sqrt{x}-1}-\\frac{1}{\\sqrt{x}} = \\frac{\\sqrt{x}-(\\sqrt{x}-1)}{\\sqrt{x}(\\sqrt{x}-1)} = \\frac{1}{\\sqrt{x}(\\sqrt{x}-1)}$. $P = \\frac{1}{\\sqrt{x}(\\sqrt{x}-1)} \\cdot \\sqrt{x}(\\sqrt{x}-1) = 1$.`, d: 'van_dung_cao' },
    { c: `Rút gọn $\\frac{x-9}{\\sqrt{x}+3}$ ($x \\geq 0, x \\neq 9$).`, a: `$\\sqrt{x}-3$.`, s: `$\\frac{(\\sqrt{x}-3)(\\sqrt{x}+3)}{\\sqrt{x}+3} = \\sqrt{x}-3$.`, d: 'van_dung_cao' },
  ]},
  { id: '272488a7-d30f-4bc0-9b09-abfaf3636bef', p: 'T9-C3B10', q: [
    { c: `Căn bậc ba của $a$ là gì?`, a: `Số $x$ sao cho $x^3 = a$, kí hiệu $\\sqrt[3]{a}$.`, s: `$\\sqrt[3]{a}$ là số thực duy nhất mà lập phương bằng $a$.`, d: 'nhan_biet' },
    { c: `Tính $\\sqrt[3]{27}$.`, a: `$3$.`, s: `$3^3 = 27$ nên $\\sqrt[3]{27} = 3$.`, d: 'nhan_biet' },
    { c: `Tính $\\sqrt[3]{-8}$.`, a: `$-2$.`, s: `$(-2)^3 = -8$ nên $\\sqrt[3]{-8} = -2$.`, d: 'nhan_biet' },
    { c: `$\\sqrt[3]{a \\cdot b} = ?$`, a: `$\\sqrt[3]{a} \\cdot \\sqrt[3]{b}$.`, s: `$\\sqrt[3]{ab} = \\sqrt[3]{a} \\cdot \\sqrt[3]{b}$ với mọi $a, b$.`, d: 'thong_hieu' },
    { c: `Tính $\\sqrt[3]{-125}$.`, a: `$-5$.`, s: `$(-5)^3 = -125$ nên $\\sqrt[3]{-125} = -5$.`, d: 'thong_hieu' },
    { c: `So sánh $\\sqrt[3]{7}$ và $2$.`, a: `$\\sqrt[3]{7} < 2$.`, s: `$2^3 = 8 > 7$. Vì hàm $y=x^3$ đồng biến nên $\\sqrt[3]{7} < \\sqrt[3]{8} = 2$.`, d: 'thong_hieu' },
    { c: `Tính $\\sqrt[3]{54} + \\sqrt[3]{-16}$.`, a: `$\\sqrt[3]{2}$.`, s: `$\\sqrt[3]{54} = 3\\sqrt[3]{2}$. $\\sqrt[3]{-16} = -2\\sqrt[3]{2}$. Tổng $= \\sqrt[3]{2}$.`, d: 'van_dung' },
    { c: `Giải PT $x^3 = 64$.`, a: `$x = 4$.`, s: `$x = \\sqrt[3]{64} = 4$.`, d: 'van_dung' },
    { c: `Tính $\\sqrt[3]{\\frac{8}{27}}$.`, a: `$\\frac{2}{3}$.`, s: `$\\frac{\\sqrt[3]{8}}{\\sqrt[3]{27}} = \\frac{2}{3}$.`, d: 'van_dung_cao' },
    { c: `Giải PT $\\sqrt[3]{2x-1} = 3$.`, a: `$x = 14$.`, s: `$2x-1 = 27 \\Rightarrow 2x = 28 \\Rightarrow x = 14$. Kiểm tra: $\\sqrt[3]{27} = 3$ ✓.`, d: 'van_dung_cao' },
  ]},
  { id: '9794852a-e151-48ec-b15f-282297f05ea5', p: 'T9-C3BTC', q: [
    { c: `Tính $\\sqrt{81}$.`, a: `$9$.`, s: `$9^2 = 81$ nên $\\sqrt{81} = 9$.`, d: 'nhan_biet' },
    { c: `Tính $\\sqrt[3]{-1}$.`, a: `$-1$.`, s: `$(-1)^3 = -1$.`, d: 'nhan_biet' },
    { c: `Rút gọn $\\sqrt{72}$.`, a: `$6\\sqrt{2}$.`, s: `$\\sqrt{72} = \\sqrt{36 \\cdot 2} = 6\\sqrt{2}$.`, d: 'thong_hieu' },
    { c: `Trục căn thức $\\frac{4}{\\sqrt{2}}$.`, a: `$2\\sqrt{2}$.`, s: `$\\frac{4\\sqrt{2}}{2} = 2\\sqrt{2}$.`, d: 'thong_hieu' },
    { c: `Tìm $x$: $\\sqrt{x+5} = 3$.`, a: `$x = 4$.`, s: `$x+5 = 9 \\Rightarrow x = 4$. ĐK: $x \\geq -5$ ✓.`, d: 'thong_hieu' },
    { c: `Rút gọn $2\\sqrt{3} + \\sqrt{12} - \\sqrt{27}$.`, a: `$\\sqrt{3}$.`, s: `$2\\sqrt{3} + 2\\sqrt{3} - 3\\sqrt{3} = \\sqrt{3}$.`, d: 'van_dung' },
    { c: `Trục căn thức $\\frac{3}{\\sqrt{7}-2}$.`, a: `$\\sqrt{7}+2$.`, s: `$\\frac{3(\\sqrt{7}+2)}{7-4} = \\frac{3(\\sqrt{7}+2)}{3} = \\sqrt{7}+2$.`, d: 'van_dung' },
    { c: `Rút gọn $\\sqrt{(2-\\sqrt{5})^2}$.`, a: `$\\sqrt{5}-2$.`, s: `$|2-\\sqrt{5}| = \\sqrt{5}-2$ (vì $\\sqrt{5} \\approx 2{,}24 > 2$).`, d: 'van_dung' },
    { c: `Cho $P = \\frac{\\sqrt{x}}{\\sqrt{x}-2} + \\frac{2}{\\sqrt{x}+2} - \\frac{4\\sqrt{x}}{x-4}$ ($x \\geq 0, x \\neq 4$). Rút gọn.`, a: `$P = 1$.`, s: `$P = \\frac{\\sqrt{x}(\\sqrt{x}+2)+2(\\sqrt{x}-2)-4\\sqrt{x}}{(\\sqrt{x}-2)(\\sqrt{x}+2)} = \\frac{x+2\\sqrt{x}+2\\sqrt{x}-4-4\\sqrt{x}}{x-4} = \\frac{x-4}{x-4} = 1$.`, d: 'van_dung_cao' },
    { c: `So sánh $\\sqrt[3]{25}$ và $3$.`, a: `$\\sqrt[3]{25} < 3$.`, s: `$3^3 = 27 > 25$. Vì hàm $y = x^3$ đồng biến: $\\sqrt[3]{25} < 3$.`, d: 'van_dung_cao' },
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
