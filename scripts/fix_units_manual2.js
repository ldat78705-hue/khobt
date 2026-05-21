const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

const fixes = [
  // G8 thêm
  { code: 'T8-C4B15-002', content: `$\\triangle ABC$, $M \\in AB$, $N \\in AC$, $MN \\parallel BC$. Biết $AM=3$ cm, $MB=6$ cm. Tính tỉ số $\\frac{MN}{BC}$.`, answer: `$\\frac{MN}{BC} = \\frac{1}{3}$.`, solution: `$\\frac{AM}{AB}=\\frac{3}{9}=\\frac{1}{3}$. Theo Thales: $\\frac{MN}{BC}=\\frac{AM}{AB}=\\frac{1}{3}$.` },
  
  // G6 B33 thiếu đơn vị
  { code: 'T6-C8B33-006', content: `Vẽ hai tia $Ox$ và $Oy$ đối nhau. Trên tia $Ox$ lấy $A$, $OA = 3$ cm. Trên tia $Oy$ lấy $B$, $OB = 5$ cm. Tính $AB$.`, answer: `$AB = 8$ cm.`, solution: `$A$ và $B$ nằm khác phía so với $O$ trên cùng đường thẳng. $AB = OA + OB = 3 + 5 = 8$ cm.` },

  // Fix thêm các bài G9 C2 có lỗi tính toán nhỏ
  { code: 'T9-C2B5-006', content: `So sánh $\\sqrt{3}+\\sqrt{5}$ và $\\sqrt{2}+\\sqrt{6}$.`, answer: `$\\sqrt{3}+\\sqrt{5} > \\sqrt{2}+\\sqrt{6}$.`, solution: `Bình phương: VT² $= (\\sqrt{3}+\\sqrt{5})^2 = 8+2\\sqrt{15}$. VP² $= (\\sqrt{2}+\\sqrt{6})^2 = 8+2\\sqrt{12}$. Vì $\\sqrt{15} > \\sqrt{12}$ nên VT² $>$ VP². Suy ra $\\sqrt{3}+\\sqrt{5} > \\sqrt{2}+\\sqrt{6}$.` },

  // Fix G9 C6B20-010: kiểm tra lại Delta
  { code: 'T9-C6B20-010', content: `Tìm $m$ để PT $x^2-2(m+1)x+m^2+2=0$ có $2$ nghiệm $x_1, x_2$ sao cho $x_1 x_2 = 3$.`, answer: `$m = \\pm 1$.`, solution: `$P = m^2+2 = 3 \\Rightarrow m^2 = 1 \\Rightarrow m = \\pm 1$. Kiểm tra $\\Delta' \\geq 0$: $\\Delta' = (m+1)^2-(m^2+2) = 2m-1$. $m=1$: $\\Delta'=1>0$ ✓ (2 nghiệm pb). $m=-1$: $\\Delta'=-3<0$ ✗. Vậy $m=1$.` },

  // Fix G9 C6BTC-010: kiểm tra lại đáp án
  { code: 'T9-C6BTC-010', content: `Tìm $m$ để $x^2-(2m+1)x+m^2+m=0$ có $2$ nghiệm phân biệt $x_1, x_2$ sao cho $x_1=2x_2$.`, answer: `$m=1$ hoặc $m=-2$.`, solution: `Viète: $x_1+x_2=2m+1$, $x_1 x_2=m^2+m$. Với $x_1=2x_2$: $3x_2=2m+1$, $2x_2^2=m^2+m$. Từ đó $x_2=\\frac{2m+1}{3}$. $2 \\cdot \\frac{(2m+1)^2}{9}=m^2+m$. $2(4m^2+4m+1)=9(m^2+m)$. $8m^2+8m+2=9m^2+9m$. $m^2+m-2=0$. $(m+2)(m-1)=0$. $m=1$ hoặc $m=-2$. Kiểm tra $\\Delta>0$: $m=1$: $\\Delta=9-8=1>0$ ✓. $m=-2$: $\\Delta=9-6=3>0$ ✓.` },

  // Fix G9 C2B6-009: kiểm tra m
  { code: 'T9-C2B6-009', content: `Tìm $m$ để BPT $mx + 2 > 0$ có tập nghiệm là $x > -1$.`, answer: `$m = 2$.`, solution: `Với $m > 0$: $x > -\\frac{2}{m}$. Để tập nghiệm là $x > -1$: $-\\frac{2}{m} = -1 \\Rightarrow m = 2$. Kiểm tra: $2x+2>0 \\Leftrightarrow x>-1$ ✓.` },
];

async function main() {
  console.log(`Fixing ${fixes.length} questions...`);
  for (const f of fixes) {
    if (f.solution) {
      await sql`UPDATE public.questions SET content=${f.content}, answer=${f.answer}, solution=${f.solution}, updated_at=NOW() WHERE question_code=${f.code}`;
    } else {
      await sql`UPDATE public.questions SET content=${f.content}, answer=${f.answer}, updated_at=NOW() WHERE question_code=${f.code}`;
    }
    console.log(`OK: ${f.code}`);
  }
  console.log('Done!');
}
main().catch(console.error);
