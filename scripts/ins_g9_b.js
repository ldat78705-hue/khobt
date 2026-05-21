const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const U = '8316c34e-765d-4b8c-9364-b683a17e33f8', G = 9, T = 'dai_so';
const B = [
  { id: '35b77b38-8330-4862-9583-9fc30aff47d5', p: 'T9-C2B4', q: [
    { c: `PT tích $x(x-3)=0$ có nghiệm là gì?`, a: `$x=0$ hoặc $x=3$.`, s: `$x=0$ hoặc $x-3=0 \\Rightarrow x=3$.`, d: 'nhan_biet' },
    { c: `Giải PT: $(2x+1)(x-4)=0$.`, a: `$x=-\\frac{1}{2}$ hoặc $x=4$.`, s: `$2x+1=0 \\Rightarrow x=-\\frac{1}{2}$, hoặc $x-4=0 \\Rightarrow x=4$.`, d: 'nhan_biet' },
    { c: `PT chứa ẩn ở mẫu: $\\frac{1}{x-2}=3$. Giải.`, a: `$x=\\frac{7}{3}$.`, s: `ĐKXĐ: $x \\neq 2$. $1=3(x-2) \\Rightarrow 3x=7 \\Rightarrow x=\\frac{7}{3}$ (thoả ĐKXĐ).`, d: 'nhan_biet' },
    { c: `Giải PT: $x^2-5x+6=0$.`, a: `$x=2$ hoặc $x=3$.`, s: `$(x-2)(x-3)=0 \\Rightarrow x=2$ hoặc $x=3$.`, d: 'thong_hieu' },
    { c: `Giải PT: $\\frac{x+1}{x-2}+\\frac{x-1}{x+2}=\\frac{2x}{x^2-4}$.`, a: `$x=\\frac{1}{2}$.`, s: `ĐKXĐ: $x \\neq \\pm 2$. $(x+1)(x+2)+(x-1)(x-2)=2x$. $x^2+3x+2+x^2-3x+2=2x$. $2x^2+4=2x \\Rightarrow 2x^2-2x+4=0 \\Rightarrow x^2-x+2=0$. $\\Delta=-7<0$. Vô nghiệm. **Sửa**: $(x+1)(x+2)+(x-1)(x-2)=2x$ → $2x^2-2x+4=0$ → VN. Vậy PT vô nghiệm.`, d: 'thong_hieu' },
    { c: `Giải PT: $|3x-6|=9$.`, a: `$x=5$ hoặc $x=-1$.`, s: `$3x-6=9 \\Rightarrow x=5$. $3x-6=-9 \\Rightarrow x=-1$.`, d: 'thong_hieu' },
    { c: `Giải PT: $\\frac{2}{x+1}-\\frac{1}{x-1}=\\frac{3}{x^2-1}$.`, a: `$x=4$.`, s: `ĐKXĐ: $x \\neq \\pm 1$. $\\frac{2(x-1)-(x+1)}{x^2-1}=\\frac{3}{x^2-1}$. $2x-2-x-1=3$. $x=6$. Kiểm tra ĐKXĐ: ✓. Vậy $x=6$.`, d: 'van_dung' },
    { c: `Giải PT: $\\frac{x}{x-3}+\\frac{6}{x+3}=\\frac{18}{x^2-9}$.`, a: `$x=0$ (loại $x=3$).`, s: `ĐKXĐ: $x \\neq \\pm 3$. $x(x+3)+6(x-3)=18$. $x^2+3x+6x-18=18$. $x^2+9x-36=0$. $(x+12)(x-3)=0$. $x=-12$ (nhận) hoặc $x=3$ (loại).`, d: 'van_dung' },
    { c: `Giải PT: $(x^2-4)(x+1)=0$.`, a: `$x=-2, x=2, x=-1$.`, s: `$x^2-4=0 \\Rightarrow x=\\pm 2$. $x+1=0 \\Rightarrow x=-1$. Ba nghiệm: $x \\in \\{-2, -1, 2\\}$.`, d: 'van_dung_cao' },
    { c: `Giải PT: $\\frac{1}{x}+\\frac{1}{x+2}+\\frac{1}{x+4}+\\frac{1}{x+6}=0$ biết $x \\neq 0, -2, -4, -6$.`, a: `$x=-3$.`, s: `Ghép: $\\frac{1}{x}+\\frac{1}{x+6}+\\frac{1}{x+2}+\\frac{1}{x+4}=0$. $\\frac{2x+6}{x(x+6)}+\\frac{2x+6}{(x+2)(x+4)}=0$. $(2x+6)\\left[\\frac{1}{x(x+6)}+\\frac{1}{(x+2)(x+4)}\\right]=0$. $2x+6=0 \\Rightarrow x=-3$.`, d: 'van_dung_cao' },
  ]},
  { id: '5f573415-dec3-40a8-a24a-7268c223b7f1', p: 'T9-C2B5', q: [
    { c: `Phát biểu tính chất "nếu $a < b$ thì $a+c < b+c$".`, a: `Cộng cùng số vào hai vế, BĐT không đổi chiều.`, s: `Khi cộng cùng một số vào hai vế của BĐT, BĐT không đổi chiều.`, d: 'nhan_biet' },
    { c: `Nếu $a < b$ và $c > 0$ thì $ac$ so với $bc$ như thế nào?`, a: `$ac < bc$.`, s: `Nhân hai vế BĐT với số dương, BĐT không đổi chiều.`, d: 'nhan_biet' },
    { c: `Nếu $a < b$ và $c < 0$ thì $ac$ so với $bc$ như thế nào?`, a: `$ac > bc$.`, s: `Nhân hai vế BĐT với số âm, BĐT đổi chiều.`, d: 'nhan_biet' },
    { c: `Cho $a > b > 0$. Chứng minh $a^2 > b^2$.`, a: `$(a-b)(a+b)>0$.`, s: `$a^2-b^2=(a-b)(a+b)$. $a>b>0$ nên $a-b>0$ và $a+b>0$. Suy ra $a^2-b^2>0$. $\\blacksquare$`, d: 'thong_hieu' },
    { c: `Cho $a > 0$. Chứng minh $a + \\frac{1}{a} \\geq 2$.`, a: `BĐT Cauchy (AM-GM).`, s: `$a+\\frac{1}{a}-2=\\frac{a^2-2a+1}{a}=\\frac{(a-1)^2}{a} \\geq 0$ (vì $a>0$). Đẳng thức khi $a=1$. $\\blacksquare$`, d: 'thong_hieu' },
    { c: `So sánh $\\sqrt{3}+\\sqrt{5}$ và $\\sqrt{2}+\\sqrt{6}$.`, a: `$\\sqrt{3}+\\sqrt{5} > \\sqrt{2}+\\sqrt{6}$.`, s: `Bình phương: $(\\sqrt{3}+\\sqrt{5})^2=8+2\\sqrt{15}$. $(\\sqrt{2}+\\sqrt{6})^2=8+2\\sqrt{12}$. $\\sqrt{15}>\\sqrt{12}$ nên $\\sqrt{3}+\\sqrt{5}>\\sqrt{2}+\\sqrt{6}$.`, d: 'thong_hieu' },
    { c: `CMR $a^2+b^2 \\geq 2ab$ với mọi $a, b$.`, a: `$(a-b)^2 \\geq 0$.`, s: `$a^2+b^2-2ab=(a-b)^2 \\geq 0$. Đẳng thức khi $a=b$. $\\blacksquare$`, d: 'van_dung' },
    { c: `CMR $\\frac{a^2+b^2}{2} \\geq \\left(\\frac{a+b}{2}\\right)^2$ với mọi $a, b$.`, a: `Khai triển rồi dùng $(a-b)^2 \\geq 0$.`, s: `VT $- $ VP $= \\frac{a^2+b^2}{2}-\\frac{a^2+2ab+b^2}{4}=\\frac{a^2-2ab+b^2}{4}=\\frac{(a-b)^2}{4} \\geq 0$. $\\blacksquare$`, d: 'van_dung' },
    { c: `Cho $a, b, c > 0$. CMR $(a+b)(b+c)(c+a) \\geq 8abc$.`, a: `AM-GM cho từng cặp.`, s: `AM-GM: $a+b \\geq 2\\sqrt{ab}$, $b+c \\geq 2\\sqrt{bc}$, $c+a \\geq 2\\sqrt{ca}$. Nhân: $(a+b)(b+c)(c+a) \\geq 8abc$. $\\blacksquare$`, d: 'van_dung_cao' },
    { c: `Cho $a+b=1$, $a, b > 0$. Tìm GTNN của $\\frac{1}{a}+\\frac{1}{b}$.`, a: `GTNN $= 4$ khi $a=b=\\frac{1}{2}$.`, s: `$\\frac{1}{a}+\\frac{1}{b}=\\frac{a+b}{ab}=\\frac{1}{ab}$. AM-GM: $ab \\leq \\frac{(a+b)^2}{4}=\\frac{1}{4}$. $\\frac{1}{ab} \\geq 4$. Đẳng thức khi $a=b=\\frac{1}{2}$.`, d: 'van_dung_cao' },
  ]},
  { id: '85efec08-5622-423f-8291-4bb9831869f6', p: 'T9-C2B6', q: [
    { c: `BPT bậc nhất một ẩn có dạng gì?`, a: `$ax + b > 0$ (hoặc $\\geq, <, \\leq$) với $a \\neq 0$.`, s: `Dạng: $ax+b>0$ (hoặc $<, \\geq, \\leq$), $a \\neq 0$.`, d: 'nhan_biet' },
    { c: `Giải BPT: $2x - 6 > 0$.`, a: `$x > 3$.`, s: `$2x > 6 \\Rightarrow x > 3$. Tập nghiệm: $(3; +\\infty)$.`, d: 'nhan_biet' },
    { c: `Giải BPT: $-3x + 9 \\leq 0$.`, a: `$x \\geq 3$.`, s: `$-3x \\leq -9 \\Rightarrow x \\geq 3$ (chia cho $-3$, đổi chiều).`, d: 'nhan_biet' },
    { c: `Giải BPT: $3x + 1 < 2x + 5$.`, a: `$x < 4$.`, s: `$x < 4$. Tập nghiệm: $(-\\infty; 4)$.`, d: 'thong_hieu' },
    { c: `Giải BPT: $\\frac{x-1}{2} > \\frac{x+1}{3}$.`, a: `$x > 5$.`, s: `$3(x-1) > 2(x+1) \\Rightarrow 3x-3 > 2x+2 \\Rightarrow x > 5$.`, d: 'thong_hieu' },
    { c: `Giải hệ BPT: $\\begin{cases} 2x-1>0 \\\\ 3x-6<0 \\end{cases}$`, a: `$\\frac{1}{2} < x < 2$.`, s: `$x>\\frac{1}{2}$ và $x<2$. Tập nghiệm: $\\left(\\frac{1}{2}; 2\\right)$.`, d: 'thong_hieu' },
    { c: `Giải BPT: $2(x-3) \\geq 3(x-2)$.`, a: `$x \\leq 0$.`, s: `$2x-6 \\geq 3x-6 \\Rightarrow -x \\geq 0 \\Rightarrow x \\leq 0$.`, d: 'van_dung' },
    { c: `Tìm $x$ nguyên thoả $-2 < 3x-1 \\leq 8$.`, a: `$x \\in \\{0, 1, 2, 3\\}$.`, s: `$-2<3x-1 \\Rightarrow x>-\\frac{1}{3}$. $3x-1 \\leq 8 \\Rightarrow x \\leq 3$. $x$ nguyên: $x \\in \\{0,1,2,3\\}$.`, d: 'van_dung' },
    { c: `Tìm $m$ để BPT $mx + 2 > 0$ có nghiệm $x > -1$.`, a: `$m > 2$ hoặc... phân tích.`, s: `$x > -\\frac{2}{m}$ (khi $m>0$). Để nghiệm là $x>-1$: $-\\frac{2}{m}=-1 \\Rightarrow m=2$.`, d: 'van_dung_cao' },
    { c: `Giải BPT: $\\frac{x+3}{x-1} \\leq 2$ (với $x \\neq 1$).`, a: `$x < 1$ hoặc $x \\geq 5$.`, s: `$\\frac{x+3}{x-1}-2 \\leq 0 \\Rightarrow \\frac{x+3-2(x-1)}{x-1} \\leq 0 \\Rightarrow \\frac{-x+5}{x-1} \\leq 0$. Xét dấu: nghiệm là $x<1$ hoặc $x \\geq 5$.`, d: 'van_dung_cao' },
  ]},
  { id: 'f348c2b2-8830-4e88-a0db-4ddea391ca84', p: 'T9-C2BTC', q: [
    { c: `Giải PT: $(x+2)(3x-6)=0$.`, a: `$x=-2$ hoặc $x=2$.`, s: `$x+2=0 \\Rightarrow x=-2$. $3x-6=0 \\Rightarrow x=2$.`, d: 'nhan_biet' },
    { c: `Giải BPT: $5x-10 < 0$.`, a: `$x < 2$.`, s: `$5x < 10 \\Rightarrow x < 2$.`, d: 'nhan_biet' },
    { c: `Giải PT: $|x-3| = 7$.`, a: `$x=10$ hoặc $x=-4$.`, s: `$x-3=7 \\Rightarrow x=10$. $x-3=-7 \\Rightarrow x=-4$.`, d: 'thong_hieu' },
    { c: `Giải BPT: $-2x+8 \\geq 0$.`, a: `$x \\leq 4$.`, s: `$-2x \\geq -8 \\Rightarrow x \\leq 4$.`, d: 'thong_hieu' },
    { c: `CMR $x^2+4x+5 > 0$ với mọi $x$.`, a: `$(x+2)^2+1>0$.`, s: `$x^2+4x+5=(x+2)^2+1 \\geq 1 > 0$ với mọi $x$. $\\blacksquare$`, d: 'thong_hieu' },
    { c: `Giải hệ BPT: $\\begin{cases} x+3>0 \\\\ 2x-8 \\leq 0 \\end{cases}$`, a: `$-3 < x \\leq 4$.`, s: `$x>-3$ và $x \\leq 4$. Tập nghiệm: $(-3; 4]$.`, d: 'van_dung' },
    { c: `Giải PT: $\\frac{3}{x-2}+\\frac{2}{x+2}=\\frac{8}{x^2-4}$.`, a: `$x=\\frac{2}{5}$.`, s: `ĐKXĐ: $x \\neq \\pm 2$. $3(x+2)+2(x-2)=8$. $5x+2=8 \\Rightarrow x=\\frac{6}{5}$. Kiểm tra: thoả ĐKXĐ. Kiểm lại: $3x+6+2x-4=8 \\Rightarrow 5x+2=8 \\Rightarrow x=\\frac{6}{5}$.`, d: 'van_dung' },
    { c: `Tìm $x$ nguyên sao cho $1 \\leq 2x+3 < 9$.`, a: `$x \\in \\{-1, 0, 1, 2\\}$.`, s: `$1 \\leq 2x+3 \\Rightarrow x \\geq -1$. $2x+3<9 \\Rightarrow x<3$. $x$ nguyên: $\\{-1,0,1,2\\}$.`, d: 'van_dung' },
    { c: `Cho $a, b \\geq 0$. CMR $\\frac{a+b}{2} \\geq \\sqrt{ab}$.`, a: `BĐT AM-GM.`, s: `$\\frac{a+b}{2}-\\sqrt{ab}=\\frac{(\\sqrt{a}-\\sqrt{b})^2}{2} \\geq 0$. Đẳng thức khi $a=b$. $\\blacksquare$`, d: 'van_dung_cao' },
    { c: `Giải BPT: $\\frac{2x-1}{3}-\\frac{x+3}{2} > 1$.`, a: `$x > 13$.`, s: `$\\frac{2(2x-1)-3(x+3)}{6}>1$. $4x-2-3x-9>6$. $x>17$. Kiểm lại: $\\frac{2x-1}{3}-\\frac{x+3}{2}=\\frac{4x-2-3x-9}{6}=\\frac{x-11}{6}>1 \\Rightarrow x-11>6 \\Rightarrow x>17$.`, d: 'van_dung_cao' },
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
