const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const U = '8316c34e-765d-4b8c-9364-b683a17e33f8', G = 9, T = 'dai_so';
const B = [
  { id: '04886195-366d-43d0-a9da-4043475ccfb2', p: 'T9-C1B1', q: [
    { c: `Phương trình bậc nhất hai ẩn có dạng tổng quát là gì?`, a: `$ax + by = c$ với $a^2 + b^2 \\neq 0$.`, s: `Dạng tổng quát: $ax + by = c$, trong đó $a, b$ không đồng thời bằng $0$.`, d: 'nhan_biet' },
    { c: `Tìm $3$ nghiệm của phương trình $2x + y = 5$.`, a: `$(0; 5)$, $(1; 3)$, $(2; 1)$.`, s: `$x=0: y=5$. $x=1: y=3$. $x=2: y=1$.`, d: 'nhan_biet' },
    { c: `Biểu diễn tập nghiệm của PT $x + y = 4$ trên mặt phẳng toạ độ là hình gì?`, a: `Đường thẳng $y = 4 - x$.`, s: `Tập nghiệm là đường thẳng đi qua $(0; 4)$ và $(4; 0)$.`, d: 'nhan_biet' },
    { c: `Kiểm tra cặp $(2; 1)$ có là nghiệm của PT $3x - 2y = 4$ không.`, a: `Có.`, s: `$3 \\cdot 2 - 2 \\cdot 1 = 6 - 2 = 4$ ✓.`, d: 'thong_hieu' },
    { c: `PT $0 \\cdot x + 3y = 9$ có nghiệm tổng quát là gì?`, a: `$(x; 3)$ với $x \\in \\mathbb{R}$.`, s: `$3y = 9 \\Rightarrow y = 3$. Nghiệm tổng quát: $(x; 3)$ với mọi $x \\in \\mathbb{R}$.`, d: 'thong_hieu' },
    { c: `Hệ hai PT bậc nhất hai ẩn có dạng gì?`, a: `$\\begin{cases} a_1x + b_1y = c_1 \\\\ a_2x + b_2y = c_2 \\end{cases}$`, s: `Nghiệm của hệ là cặp $(x; y)$ đồng thời thoả mãn cả hai PT.`, d: 'thong_hieu' },
    { c: `Giải hệ: $\\begin{cases} x + y = 5 \\\\ x - y = 1 \\end{cases}$`, a: `$x = 3, y = 2$.`, s: `Cộng: $2x = 6 \\Rightarrow x = 3$. Thay: $y = 5 - 3 = 2$.`, d: 'van_dung' },
    { c: `Hai đường thẳng $x + y = 3$ và $2x + 2y = 6$ có quan hệ gì?`, a: `Trùng nhau.`, s: `$2x + 2y = 6 \\Leftrightarrow x + y = 3$. Hai PT tương đương → đường thẳng trùng nhau → hệ vô số nghiệm.`, d: 'van_dung' },
    { c: `Tìm $m$ để cặp $(1; m)$ là nghiệm của PT $2x + 3y = 8$.`, a: `$m = 2$.`, s: `$2(1) + 3m = 8 \\Rightarrow 3m = 6 \\Rightarrow m = 2$.`, d: 'van_dung_cao' },
    { c: `Tìm $a, b$ sao cho đường thẳng $ax + by = 10$ đi qua $A(2; 3)$ và $B(5; 0)$.`, a: `$a = 2, b = 2$.`, s: `$\\begin{cases} 2a + 3b = 10 \\\\ 5a = 10 \\end{cases}$. $a = 2$, $4 + 3b = 10 \\Rightarrow b = 2$. Kiểm tra: $2(5)+2(0)=10$ ✓.`, d: 'van_dung_cao' },
  ]},
  { id: '9d3d76bd-e202-47f2-bd44-fd27e81059b7', p: 'T9-C1B2', q: [
    { c: `Phương pháp thế dùng để giải hệ PT như thế nào?`, a: `Rút một ẩn theo ẩn kia rồi thay vào PT còn lại.`, s: `Bước 1: Rút $x$ (hoặc $y$) từ một PT. Bước 2: Thay vào PT kia. Bước 3: Giải PT một ẩn.`, d: 'nhan_biet' },
    { c: `Giải hệ bằng phương pháp thế: $\\begin{cases} y = 2x - 1 \\\\ 3x + y = 9 \\end{cases}$`, a: `$x = 2, y = 3$.`, s: `Thay $y = 2x - 1$: $3x + 2x - 1 = 9 \\Rightarrow 5x = 10 \\Rightarrow x = 2, y = 3$.`, d: 'nhan_biet' },
    { c: `Phương pháp cộng đại số dùng để giải hệ PT như thế nào?`, a: `Nhân hệ số rồi cộng/trừ để khử một ẩn.`, s: `Nhân các PT với hệ số phù hợp sao cho cộng/trừ vế với vế khử được một ẩn.`, d: 'nhan_biet' },
    { c: `Giải hệ: $\\begin{cases} 2x + 3y = 12 \\\\ 4x - 3y = 6 \\end{cases}$`, a: `$x = 3, y = 2$.`, s: `Cộng: $6x = 18 \\Rightarrow x = 3$. Thay: $6 + 3y = 12 \\Rightarrow y = 2$.`, d: 'thong_hieu' },
    { c: `Giải hệ: $\\begin{cases} x + 2y = 7 \\\\ 3x - y = 7 \\end{cases}$`, a: `$x = 3, y = 2$.`, s: `Từ PT1: $x = 7 - 2y$. Thay PT2: $21 - 6y - y = 7 \\Rightarrow 7y = 14 \\Rightarrow y = 2, x = 3$.`, d: 'thong_hieu' },
    { c: `Khi nào hệ PT bậc nhất hai ẩn vô nghiệm?`, a: `Khi $\\frac{a_1}{a_2} = \\frac{b_1}{b_2} \\neq \\frac{c_1}{c_2}$.`, s: `Đồ thị hai đường thẳng song song → không giao nhau → vô nghiệm.`, d: 'thong_hieu' },
    { c: `Giải hệ: $\\begin{cases} 5x + 3y = 11 \\\\ 3x + 5y = 13 \\end{cases}$`, a: `$x = 1, y = 2$.`, s: `Cộng: $8(x+y)=24 \\Rightarrow x+y=3$. Trừ: $2(x-y)=-2 \\Rightarrow x-y=-1$. Suy ra $x=1, y=2$.`, d: 'van_dung' },
    { c: `Tìm $m$ để hệ $\\begin{cases} mx + y = 3 \\\\ x + my = 3 \\end{cases}$ có nghiệm duy nhất.`, a: `$m \\neq \\pm 1$.`, s: `$\\frac{m}{1} \\neq \\frac{1}{m} \\Rightarrow m^2 \\neq 1 \\Rightarrow m \\neq \\pm 1$.`, d: 'van_dung' },
    { c: `Giải hệ: $\\begin{cases} \\frac{x}{2} + \\frac{y}{3} = 2 \\\\ \\frac{x}{4} - \\frac{y}{6} = 0 \\end{cases}$`, a: `$x = 2, y = 3$.`, s: `PT1 $\\times 6$: $3x+2y=12$. PT2 $\\times 12$: $3x-2y=0$. Cộng: $6x=12 \\Rightarrow x=2, y=3$.`, d: 'van_dung_cao' },
    { c: `Giải hệ: $\\begin{cases} 2x + 5y = 1 \\\\ 3x - 2y = -12 \\end{cases}$`, a: `$x = -\\frac{58}{19}, y = \\frac{27}{19}$.`, s: `PT1$\\times 2$+PT2$\\times 5$: $4x+10y+15x-10y=2-60 \\Rightarrow 19x=-58 \\Rightarrow x=-\\frac{58}{19}$. $y=\\frac{1-2(-\\frac{58}{19})}{5}=\\frac{\\frac{135}{19}}{5}=\\frac{27}{19}$.`, d: 'van_dung_cao' },
  ]},
  { id: '5e72ba56-0fd3-4d2e-a9c7-1eb09a7bfd9d', p: 'T9-C1B3', q: [
    { c: `Tổng hai số bằng $15$, hiệu bằng $3$. Tìm hai số đó.`, a: `$9$ và $6$.`, s: `$\\begin{cases} x+y=15 \\\\ x-y=3 \\end{cases}$. $2x=18 \\Rightarrow x=9, y=6$.`, d: 'nhan_biet' },
    { c: `Nêu các bước giải bài toán bằng cách lập hệ phương trình.`, a: `Chọn ẩn → lập hệ → giải → kết luận.`, s: `1) Chọn ẩn, đặt ĐK. 2) Biểu diễn các đại lượng theo ẩn. 3) Lập hệ PT. 4) Giải hệ. 5) Đối chiếu ĐK và kết luận.`, d: 'nhan_biet' },
    { c: `Tuổi cha gấp $3$ lần tuổi con. Sau $10$ năm, tuổi cha gấp $2$ lần tuổi con. Tìm tuổi mỗi người hiện nay.`, a: `Con $10$ tuổi, cha $30$ tuổi.`, s: `$\\begin{cases} x=3y \\\\ x+10=2(y+10) \\end{cases}$. $3y+10=2y+20 \\Rightarrow y=10, x=30$.`, d: 'thong_hieu' },
    { c: `Một lớp có $40$ học sinh. Số nữ nhiều hơn nam $4$ em. Tìm số nam, nữ.`, a: `Nam $18$, nữ $22$.`, s: `$\\begin{cases} x+y=40 \\\\ y-x=4 \\end{cases}$. $2y=44 \\Rightarrow y=22, x=18$.`, d: 'thong_hieu' },
    { c: `Một xe đi từ $A$ đến $B$ với vận tốc $40$ km/h, rồi từ $B$ về $A$ với vận tốc $60$ km/h. Tổng thời gian là $5$ giờ. Tính $AB$.`, a: `$AB = 120$ km.`, s: `$\\frac{d}{40}+\\frac{d}{60}=5$. $\\frac{3d+2d}{120}=5 \\Rightarrow 5d=600 \\Rightarrow d=120$ km.`, d: 'thong_hieu' },
    { c: `Một số có hai chữ số, tổng hai chữ số bằng $9$. Đổi chỗ hai chữ số, số mới lớn hơn số cũ $27$. Tìm số đó.`, a: `$36$.`, s: `$\\begin{cases} a+b=9 \\\\ (10b+a)-(10a+b)=27 \\end{cases}$. $9(b-a)=27 \\Rightarrow b-a=3$. $a=3, b=6$. Số: $36$.`, d: 'van_dung' },
    { c: `Hỗn hợp $10$ kg gồm gạo loại $I$ giá $15\\,000$ đ/kg và loại $II$ giá $20\\,000$ đ/kg, tổng trị giá $170\\,000$ đ. Tính khối lượng mỗi loại.`, a: `Loại I: $6$ kg, loại II: $4$ kg.`, s: `$\\begin{cases} x+y=10 \\\\ 15000x+20000y=170000 \\end{cases}$. Rút gọn: $3x+4y=34$. $x=10-y$: $30-3y+4y=34 \\Rightarrow y=4, x=6$.`, d: 'van_dung' },
    { c: `Chu vi hình chữ nhật là $28$ cm. Chiều dài hơn chiều rộng $4$ cm. Tìm các kích thước.`, a: `Dài $9$ cm, rộng $5$ cm.`, s: `$\\begin{cases} 2(x+y)=28 \\\\ x-y=4 \\end{cases}$. $x+y=14$, $x-y=4 \\Rightarrow x=9$ cm, $y=5$ cm.`, d: 'van_dung' },
    { c: `Hai canô đi ngược chiều từ $A$ và $B$ cách nhau $90$ km, gặp nhau sau $1{,}5$ giờ. Đi cùng chiều, canô nhanh đuổi kịp chậm sau $9$ giờ. Tìm vận tốc mỗi canô.`, a: `$v_1=35$ km/h, $v_2=25$ km/h.`, s: `$\\begin{cases} 1{,}5(v_1+v_2)=90 \\\\ 9(v_1-v_2)=90 \\end{cases}$. $v_1+v_2=60, v_1-v_2=10 \\Rightarrow v_1=35$ km/h, $v_2=25$ km/h.`, d: 'van_dung_cao' },
    { c: `Hai công nhân làm chung xong việc trong $12$ ngày. Người $1$ làm $3$ ngày và người $2$ làm $6$ ngày được $\\frac{1}{3}$ công việc. Tìm số ngày mỗi người làm một mình.`, a: `Người 1: $18$ ngày, người 2: $36$ ngày.`, s: `Đặt $x, y$ là năng suất/ngày. $\\begin{cases} x+y=\\frac{1}{12} \\\\ 3x+6y=\\frac{1}{3} \\end{cases}$. PT2: $x+2y=\\frac{1}{9}$. Trừ PT1: $y=\\frac{1}{9}-\\frac{1}{12}=\\frac{1}{36}$. $x=\\frac{1}{12}-\\frac{1}{36}=\\frac{1}{18}$. Người 1: $18$ ngày, người 2: $36$ ngày. Kiểm tra: $\\frac{1}{18}+\\frac{1}{36}=\\frac{3}{36}=\\frac{1}{12}$ ✓.`, d: 'van_dung_cao' },
  ]},
  { id: 'c450ac94-ada5-4e02-9b14-ea4ece00711d', p: 'T9-C1BTC', q: [
    { c: `Giải hệ: $\\begin{cases} x+y=10 \\\\ x-y=4 \\end{cases}$`, a: `$x=7, y=3$.`, s: `Cộng: $2x=14 \\Rightarrow x=7, y=3$.`, d: 'nhan_biet' },
    { c: `Kiểm tra $(2; -1)$ có là nghiệm của hệ $\\begin{cases} x+y=1 \\\\ 2x-y=5 \\end{cases}$`, a: `Có.`, s: `PT1: $2+(-1)=1$ ✓. PT2: $4-(-1)=5$ ✓.`, d: 'nhan_biet' },
    { c: `Giải hệ: $\\begin{cases} 3x-2y=1 \\\\ x+2y=7 \\end{cases}$`, a: `$x=2, y=\\frac{5}{2}$.`, s: `Cộng: $4x=8 \\Rightarrow x=2$. $2+2y=7 \\Rightarrow y=\\frac{5}{2}$.`, d: 'thong_hieu' },
    { c: `Hệ $\\begin{cases} 2x+4y=10 \\\\ x+2y=5 \\end{cases}$ có bao nhiêu nghiệm?`, a: `Vô số nghiệm.`, s: `PT1 $= 2 \\times$ PT2. Hai PT tương đương → vô số nghiệm.`, d: 'thong_hieu' },
    { c: `Tổng $2$ số bằng $100$, số lớn gấp $3$ lần số nhỏ. Tìm $2$ số.`, a: `$25$ và $75$.`, s: `$\\begin{cases} x+y=100 \\\\ x=3y \\end{cases}$. $4y=100 \\Rightarrow y=25, x=75$.`, d: 'thong_hieu' },
    { c: `Giải hệ: $\\begin{cases} \\frac{x}{2}+\\frac{y}{3}=5 \\\\ \\frac{x}{3}+\\frac{y}{2}=5 \\end{cases}$`, a: `$x=6, y=6$.`, s: `Cộng: $\\frac{5x+5y}{6}=10 \\Rightarrow x+y=12$. Trừ: $\\frac{x-y}{6}=0 \\Rightarrow x=y$. $\\Rightarrow x=y=6$.`, d: 'van_dung' },
    { c: `Diện tích HCN là $54$ cm². Chiều dài gấp $1{,}5$ lần chiều rộng. Tìm các kích thước.`, a: `Rộng $6$ cm, dài $9$ cm.`, s: `$\\begin{cases} xy=54 \\\\ x=1{,}5y \\end{cases}$. $1{,}5y^2=54 \\Rightarrow y^2=36 \\Rightarrow y=6$ cm. $x=9$ cm. Kiểm tra: $6 \\times 9 = 54$ cm² ✓.`, d: 'van_dung' },
    { c: `Tìm $m$ để hệ $\\begin{cases} x+y=m \\\\ 2x-y=1 \\end{cases}$ có nghiệm $x>0, y>0$.`, a: `$m > \\frac{1}{2}$.`, s: `$3x=m+1 \\Rightarrow x=\\frac{m+1}{3}$. $y=\\frac{2m-1}{3}$. $x>0$: $m>-1$. $y>0$: $m>\\frac{1}{2}$. Vậy $m>\\frac{1}{2}$.`, d: 'van_dung_cao' },
    { c: `Giải hệ: $\\begin{cases} 2x+3y=7 \\\\ 3x+2y=8 \\end{cases}$`, a: `$x=2, y=1$.`, s: `Cộng: $5x+5y=15 \\Rightarrow x+y=3$. Trừ: $x-y=1$. $\\Rightarrow x=2, y=1$. Kiểm tra: $4+3=7$ ✓, $6+2=8$ ✓.`, d: 'van_dung_cao' },
    { c: `Hai xe khởi hành cùng lúc từ $A$ và $B$ cách nhau $180$ km, đi ngược chiều, gặp nhau sau $2$ giờ. Vận tốc xe đi từ $A$ lớn hơn xe từ $B$ là $10$ km/h. Tìm vận tốc mỗi xe.`, a: `$v_A=50$ km/h, $v_B=40$ km/h.`, s: `$\\begin{cases} 2(v_1+v_2)=180 \\\\ v_1-v_2=10 \\end{cases}$. $v_1+v_2=90, v_1-v_2=10 \\Rightarrow v_1=50$ km/h, $v_2=40$ km/h. Kiểm tra: $2(50+40)=180$ ✓.`, d: 'van_dung_cao' },
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
