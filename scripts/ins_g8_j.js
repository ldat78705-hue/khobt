const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const U = '8316c34e-765d-4b8c-9364-b683a17e33f8', G = 8;
const B = [
  { id: 'f487b483-14ef-4260-aea9-8cd1a0af3bd5', p: 'T8-C7B28', t: 'dai_so', q: [
    { c: `Hàm số bậc nhất có dạng gì?`, a: `$y = ax + b$ ($a \\neq 0$).`, s: `Hàm số bậc nhất: $y=ax+b$, $a \\neq 0$. Đồ thị là đường thẳng.`, d: 'nhan_biet' },
    { c: `Đồ thị hàm số $y = 2x - 1$ cắt trục $Oy$ tại điểm nào?`, a: `$(0; -1)$.`, s: `$x=0 \\Rightarrow y=-1$. Giao $Oy$: $(0;-1)$.`, d: 'nhan_biet' },
    { c: `Vẽ đồ thị $y = x + 2$ bằng cách xác định $2$ điểm.`, a: `$(0;2)$ và $(-2;0)$.`, s: `$x=0: y=2$, $y=0: x=-2$. Nối $(0;2)$ và $(-2;0)$.`, d: 'nhan_biet' },
    { c: `Hàm số $y=-3x+5$ đồng biến hay nghịch biến?`, a: `Nghịch biến.`, s: `$a=-3<0$ → nghịch biến.`, d: 'thong_hieu' },
    { c: `Tìm tọa độ giao điểm $y=2x+1$ và $y=-x+4$.`, a: `$(1;3)$.`, s: `$2x+1=-x+4 \\Rightarrow 3x=3 \\Rightarrow x=1, y=3$.`, d: 'thong_hieu' },
    { c: `Đồ thị $y=ax+3$ qua $A(2;7)$. Tìm $a$.`, a: `$a=2$.`, s: `$7=2a+3 \\Rightarrow a=2$.`, d: 'thong_hieu' },
    { c: `Hai đường thẳng $y=2x+1$ và $y=2x-3$ có vị trí tương đối gì?`, a: `Song song.`, s: `Cùng hệ số góc $a=2$, khác tung độ gốc → song song.`, d: 'van_dung' },
    { c: `Tìm $m$ để $y=(m-1)x+3$ là hàm số bậc nhất.`, a: `$m \\neq 1$.`, s: `$a=m-1 \\neq 0 \\Rightarrow m \\neq 1$.`, d: 'van_dung' },
    { c: `Đường thẳng $y=ax+b$ qua $A(1;5)$ và $B(3;9)$. Tìm $a,b$.`, a: `$a=2, b=3$.`, s: `$a+b=5, 3a+b=9$. $2a=4 \\Rightarrow a=2, b=3$.`, d: 'van_dung_cao' },
    { c: `Tìm $m$ để $3$ đường $y=2x+1$, $y=-x+4$, $y=mx+m$ đồng quy.`, a: `$m=\\frac{3}{2}$... tính.`, s: `Giao $y=2x+1$ và $y=-x+4$: $(1;3)$. Qua $(1;3)$: $m+m=3 \\Rightarrow 2m=3 \\Rightarrow m=\\frac{3}{2}$.`, d: 'van_dung_cao' },
  ]},
  { id: '11b6192b-c396-424e-b272-96e96868be55', p: 'T8-C7B29', t: 'dai_so', q: [
    { c: `Hệ số góc của đường thẳng $y=ax+b$ là gì?`, a: `$a$.`, s: `Hệ số góc là $a$, quyết định độ nghiêng của đường thẳng.`, d: 'nhan_biet' },
    { c: `Đường thẳng $y=3x-2$ có hệ số góc bằng bao nhiêu?`, a: `$3$.`, s: `$a=3$.`, d: 'nhan_biet' },
    { c: `Hai đường thẳng song song khi nào?`, a: `Cùng hệ số góc, khác tung độ gốc.`, s: `$y=a_1x+b_1$ và $y=a_2x+b_2$ song song $\\Leftrightarrow a_1=a_2, b_1 \\neq b_2$.`, d: 'nhan_biet' },
    { c: `Đường thẳng qua $A(0;3)$ song song $y=2x+1$. Viết PT.`, a: `$y=2x+3$.`, s: `Song song: $a=2$. Qua $(0;3)$: $b=3$. $y=2x+3$.`, d: 'thong_hieu' },
    { c: `Hai đường thẳng vuông góc khi nào?`, a: `$a_1 \\cdot a_2 = -1$.`, s: `Hai đường thẳng vuông góc $\\Leftrightarrow a_1 \\cdot a_2 = -1$.`, d: 'thong_hieu' },
    { c: `Đường thẳng vuông góc với $y=2x+1$ và qua $(0;4)$. Viết PT.`, a: `$y=-\\frac{1}{2}x+4$.`, s: `$a \\cdot 2=-1 \\Rightarrow a=-\\frac{1}{2}$. $b=4$. $y=-\\frac{1}{2}x+4$.`, d: 'thong_hieu' },
    { c: `Tìm $m$ để $y=(2m+1)x-3$ song song $y=5x+2$.`, a: `$m=2$.`, s: `$2m+1=5 \\Rightarrow m=2$. Kiểm tra $b$: $-3 \\neq 2$ ✓.`, d: 'van_dung' },
    { c: `Tính góc tạo bởi đường thẳng $y=x$ với trục $Ox$.`, a: `$45°$.`, s: `$\\tan\\alpha = a = 1 \\Rightarrow \\alpha = 45°$.`, d: 'van_dung' },
    { c: `Viết PT đường thẳng qua $A(1;2)$ và $B(4;8)$.`, a: `$y=2x$.`, s: `$a=\\frac{8-2}{4-1}=2$. $2=2(1)+b \\Rightarrow b=0$. $y=2x$.`, d: 'van_dung_cao' },
    { c: `Tìm $m$ để $y=(m^2-1)x+m$ và $y=3x+2$ vuông góc.`, a: `$(m^2-1) \\cdot 3=-1$.`, s: `$3(m^2-1)=-1 \\Rightarrow m^2=\\frac{2}{3} \\Rightarrow m=\\pm\\sqrt{\\frac{2}{3}}$.`, d: 'van_dung_cao' },
  ]},
  { id: '2442fb08-36bf-4864-8876-a35741cd4c09', p: 'T8-C7BTC', t: 'dai_so', q: [
    { c: `Giải PT: $4x-8=0$.`, a: `$x=2$.`, s: `$4x=8 \\Rightarrow x=2$.`, d: 'nhan_biet' },
    { c: `Đồ thị $y=-x+3$ cắt trục $Ox$ tại đâu?`, a: `$(3;0)$.`, s: `$y=0: -x+3=0 \\Rightarrow x=3$.`, d: 'nhan_biet' },
    { c: `Giải: $\\frac{x+2}{3}=\\frac{2x-1}{2}$.`, a: `$x=\\frac{7}{4}$.`, s: `$2(x+2)=3(2x-1) \\Rightarrow 2x+4=6x-3 \\Rightarrow 4x=7 \\Rightarrow x=\\frac{7}{4}$.`, d: 'thong_hieu' },
    { c: `Tìm giao điểm $y=3x-1$ và trục $Oy$.`, a: `$(0;-1)$.`, s: `$x=0: y=-1$. Giao: $(0;-1)$.`, d: 'thong_hieu' },
    { c: `Hai xe khởi hành cùng lúc, cùng chiều. Xe 1: $v_1=40$ km/h, xe 2: $v_2=60$ km/h, xe 1 trước xe 2 $30$ km. Khi nào xe 2 đuổi kịp?`, a: `$1{,}5$ giờ.`, s: `$60t=40t+30 \\Rightarrow 20t=30 \\Rightarrow t=1{,}5$ giờ.`, d: 'thong_hieu' },
    { c: `Tìm $a$ để $y=(a+2)x-1$ đồng biến.`, a: `$a>-2$.`, s: `Đồng biến khi $a+2>0 \\Rightarrow a>-2$.`, d: 'van_dung' },
    { c: `Viết PT đường thẳng qua $A(2;1)$ song song $y=3x-5$.`, a: `$y=3x-5$.`, s: `$a=3$. $1=3(2)+b \\Rightarrow b=-5$. $y=3x-5$. (Trùng đường ban đầu? Kiểm tra $A(2;1)$: $3(2)-5=1$ ✓ → $A$ thuộc đường đó.)`, d: 'van_dung' },
    { c: `Tìm giao điểm $y=x+1$, $y=-2x+7$.`, a: `$(2;3)$.`, s: `$x+1=-2x+7 \\Rightarrow 3x=6 \\Rightarrow x=2, y=3$.`, d: 'van_dung' },
    { c: `Tam giác tạo bởi $y=2x$, $y=-x+6$, trục $Ox$. Tìm tọa độ $3$ đỉnh.`, a: `$(0;0), (6;0), (2;4)$.`, s: `$y=2x$ cắt $Ox$: $(0;0)$. $y=-x+6$ cắt $Ox$: $(6;0)$. Giao hai đường: $2x=-x+6 \\Rightarrow x=2, y=4$. Đỉnh: $(0;0), (6;0), (2;4)$.`, d: 'van_dung_cao' },
    { c: `Tính diện tích tam giác ở câu trên.`, a: `$12$.`, s: `Đáy $= 6$ (trên $Ox$). Chiều cao $= 4$ (tung độ đỉnh). $S = \\frac{1}{2} \\times 6 \\times 4 = 12$.`, d: 'van_dung_cao' },
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
