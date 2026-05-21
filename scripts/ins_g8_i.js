const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const U = '8316c34e-765d-4b8c-9364-b683a17e33f8', G = 8, T = 'dai_so';
const B = [
  { id: 'a573d790-eeab-4cce-8435-238ea39bbdf9', p: 'T8-C7B25', q: [
    { c: `Phương trình bậc nhất một ẩn có dạng gì?`, a: `$ax + b = 0$ ($a \\neq 0$).`, s: `PT bậc nhất một ẩn: $ax+b=0$ ($a \\neq 0$), nghiệm $x = -\\frac{b}{a}$.`, d: 'nhan_biet' },
    { c: `Giải PT: $2x - 6 = 0$.`, a: `$x = 3$.`, s: `$2x = 6 \\Rightarrow x = 3$.`, d: 'nhan_biet' },
    { c: `Giải PT: $3x + 9 = 0$.`, a: `$x = -3$.`, s: `$3x = -9 \\Rightarrow x = -3$.`, d: 'nhan_biet' },
    { c: `Giải PT: $5x - 3 = 2x + 6$.`, a: `$x = 3$.`, s: `$3x = 9 \\Rightarrow x = 3$.`, d: 'thong_hieu' },
    { c: `Giải PT: $\\frac{x}{2} - 1 = \\frac{x}{3} + 2$.`, a: `$x = 18$.`, s: `$\\frac{x}{2}-\\frac{x}{3}=3 \\Rightarrow \\frac{x}{6}=3 \\Rightarrow x=18$.`, d: 'thong_hieu' },
    { c: `Giải PT: $2(x-3) = 4x + 2$.`, a: `$x = -4$.`, s: `$2x-6=4x+2 \\Rightarrow -2x=8 \\Rightarrow x=-4$.`, d: 'thong_hieu' },
    { c: `Giải PT: $\\frac{2x+1}{3} = \\frac{x-2}{2}$.`, a: `$x = -7$.`, s: `$2(2x+1)=3(x-2) \\Rightarrow 4x+2=3x-6 \\Rightarrow x=-8$. Kiểm tra: $\\frac{-15}{3}=-5$, $\\frac{-10}{2}=-5$. Đúng $x=-8$.`, d: 'van_dung' },
    { c: `Giải PT: $|2x-1| = 5$.`, a: `$x = 3$ hoặc $x = -2$.`, s: `$2x-1=5 \\Rightarrow x=3$ hoặc $2x-1=-5 \\Rightarrow x=-2$.`, d: 'van_dung' },
    { c: `Giải PT: $\\frac{x+1}{x-2} = \\frac{3}{x-2} + 2$.`, a: `Vô nghiệm.`, s: `ĐKXĐ: $x \\neq 2$. $x+1=3+2(x-2) \\Rightarrow x+1=2x-1 \\Rightarrow x=2$. Loại. Vô nghiệm.`, d: 'van_dung_cao' },
    { c: `Giải PT: $\\frac{1}{x-1}+\\frac{2}{x+1}=\\frac{x}{x^2-1}$.`, a: `$x = -1$ (loại). Kiểm tra lại.`, s: `ĐKXĐ: $x \\neq \\pm 1$. $\\frac{x+1+2(x-1)}{x^2-1}=\\frac{x}{x^2-1}$. $3x-1=x \\Rightarrow x=\\frac{1}{2}$. Thỏa ĐKXĐ.`, d: 'van_dung_cao' },
  ]},
  { id: 'd67ec853-e283-4b22-b32b-945eab72aed2', p: 'T8-C7B26', q: [
    { c: `Các bước giải bài toán bằng cách lập PT?`, a: `Chọn ẩn, lập PT, giải, kết luận.`, s: `1) Chọn ẩn, đặt ĐK. 2) Biểu diễn các đại lượng theo ẩn. 3) Lập PT. 4) Giải PT. 5) Đối chiếu ĐK, kết luận.`, d: 'nhan_biet' },
    { c: `Một số cộng thêm $5$ được $12$. Tìm số đó.`, a: `$7$.`, s: `$x + 5 = 12 \\Rightarrow x = 7$.`, d: 'nhan_biet' },
    { c: `Tổng hai số là $20$, hiệu là $4$. Tìm hai số.`, a: `$12$ và $8$.`, s: `$x + y = 20$, $x - y = 4$. $x = 12, y = 8$.`, d: 'nhan_biet' },
    { c: `Tuổi mẹ gấp $3$ lần tuổi con. Tổng hai tuổi là $48$. Tìm tuổi mỗi người.`, a: `Con $12$, mẹ $36$.`, s: `$x + 3x = 48 \\Rightarrow 4x = 48 \\Rightarrow x = 12$. Con $12$ tuổi, mẹ $36$ tuổi.`, d: 'thong_hieu' },
    { c: `Một ô tô đi $120$ km hết $2$ giờ. Tính vận tốc.`, a: `$60$ km/h.`, s: `$v = \\frac{s}{t} = \\frac{120}{2} = 60$ km/h.`, d: 'thong_hieu' },
    { c: `Mua $5$ quyển vở và $3$ cây bút hết $47000$ đ. Mỗi quyển vở $5000$ đ. Tính giá mỗi cây bút.`, a: `$\\approx 7333$ đ.`, s: `$5 \\times 5000 + 3x = 47000 \\Rightarrow 3x = 22000 \\Rightarrow x \\approx 7333$ đ.`, d: 'thong_hieu' },
    { c: `Hai vòi nước chảy đầy bể trong $6$ giờ. Vòi $1$ chảy đầy trong $10$ giờ. Vòi $2$ chảy đầy trong bao lâu?`, a: `$15$ giờ.`, s: `$\\frac{1}{10}+\\frac{1}{x}=\\frac{1}{6} \\Rightarrow \\frac{1}{x}=\\frac{1}{6}-\\frac{1}{10}=\\frac{1}{15} \\Rightarrow x=15$.`, d: 'van_dung' },
    { c: `Quãng đường $AB = 180$ km. Xe 1 đi từ $A$, xe 2 đi từ $B$ cùng lúc ngược chiều. Vận tốc xe 1 là $40$ km/h, xe 2 là $50$ km/h. Sau bao lâu gặp nhau?`, a: `$2$ giờ.`, s: `$40t + 50t = 180 \\Rightarrow 90t = 180 \\Rightarrow t = 2$ giờ.`, d: 'van_dung' },
    { c: `Một mảnh đất HCN có chu vi $56$ m, chiều dài hơn chiều rộng $4$ m. Tính diện tích.`, a: `$180$ m².`, s: `$2(x+x+4)=56 \\Rightarrow x=12$. Chiều rộng $12$, dài $16$. $S=192$ m².`, d: 'van_dung_cao' },
    { c: `Một số có hai chữ số, chữ số hàng chục gấp đôi chữ số hàng đơn vị. Đổi chỗ hai chữ số, số mới kém số cũ $27$. Tìm số.`, a: `$63$.`, s: `Hàng đơn vị $a$, hàng chục $2a$. $\\overline{2a \\cdot a} = 20a+a=21a$. Đổi: $10a+2a=12a$. $21a-12a=27 \\Rightarrow a=3$. Số $= 63$.`, d: 'van_dung_cao' },
  ]},
  { id: 'f06eba8b-9f39-442f-a758-ceafe95ec4d4', p: 'T8-C7B27', q: [
    { c: `Hàm số là gì?`, a: `Quy tắc mỗi giá trị $x$ ứng đúng một giá trị $y$.`, s: `Hàm số $y = f(x)$: với mỗi giá trị $x$ thuộc tập xác định, có duy nhất một giá trị $y$ tương ứng.`, d: 'nhan_biet' },
    { c: `Đồ thị hàm số là gì?`, a: `Tập hợp các điểm $(x; y)$ trên mp tọa độ.`, s: `Đồ thị hàm số $y=f(x)$ là tập hợp các điểm $M(x; f(x))$ trên mặt phẳng $Oxy$.`, d: 'nhan_biet' },
    { c: `Cho $y = 2x + 1$. Tính $y$ khi $x = 3$.`, a: `$y = 7$.`, s: `$y = 2(3)+1 = 7$.`, d: 'nhan_biet' },
    { c: `Hàm số $y = 3x - 2$ đồng biến hay nghịch biến?`, a: `Đồng biến ($a=3>0$).`, s: `$a = 3 > 0$ → hàm số đồng biến.`, d: 'thong_hieu' },
    { c: `Cho $f(x)=x^2-1$. Tính $f(2), f(-1)$.`, a: `$f(2)=3, f(-1)=0$.`, s: `$f(2)=4-1=3$, $f(-1)=1-1=0$.`, d: 'thong_hieu' },
    { c: `Tìm tập xác định $y = \\frac{1}{x-2}$.`, a: `$x \\neq 2$.`, s: `$x - 2 \\neq 0 \\Rightarrow x \\neq 2$. TXĐ: $\\mathbb{R} \\setminus \\{2\\}$.`, d: 'thong_hieu' },
    { c: `Vẽ đồ thị $y = 2x$. Điểm nào thuộc đồ thị: $A(1;2), B(2;3)$?`, a: `$A$ thuộc, $B$ không.`, s: `$A(1;2)$: $y=2(1)=2$ ✓. $B(2;3)$: $y=2(2)=4 \\neq 3$ ✗.`, d: 'van_dung' },
    { c: `Đồ thị $y=f(x)$ đi qua $A(1;3)$ và $B(-1;-1)$. Biết $f(x)=ax+b$. Tìm $a, b$.`, a: `$a=2, b=1$.`, s: `$a+b=3, -a+b=-1$. Trừ: $2a=4 \\Rightarrow a=2, b=1$. $f(x)=2x+1$.`, d: 'van_dung' },
    { c: `Cho $y = |x|$. Vẽ đồ thị và nhận xét tính chất.`, a: `Hình chữ V, đỉnh gốc tọa độ.`, s: `$x \\geq 0$: $y=x$. $x<0$: $y=-x$. Đồ thị hình chữ V, đối xứng qua $Oy$, hàm chẵn.`, d: 'van_dung_cao' },
    { c: `Cho $f(x)=x^2-4x+3$. Tìm $x$ để $f(x)=0$.`, a: `$x=1$ hoặc $x=3$.`, s: `$x^2-4x+3=0 \\Rightarrow (x-1)(x-3)=0 \\Rightarrow x=1$ hoặc $x=3$.`, d: 'van_dung_cao' },
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
