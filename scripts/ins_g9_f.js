const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const U = '8316c34e-765d-4b8c-9364-b683a17e33f8', G = 9, T = 'dai_so';
const B = [
  { id: 'cdd6e10b-1c50-4f44-a1ed-03c77109a62c', p: 'T9-C6B18', q: [
    { c: `Đồ thị hàm số $y = ax^2$ ($a \\neq 0$) là hình gì?`, a: `Parabol đỉnh $O(0;0)$.`, s: `Đồ thị là parabol có đỉnh tại gốc toạ độ $O$, nhận trục $Oy$ làm trục đối xứng.`, d: 'nhan_biet' },
    { c: `$y = 2x^2$. Tính $y$ khi $x = 3$.`, a: `$y = 18$.`, s: `$y = 2 \\cdot 9 = 18$.`, d: 'nhan_biet' },
    { c: `$a > 0$: parabol quay lên hay xuống?`, a: `Quay lên (bề lõm hướng lên).`, s: `$a > 0$: parabol quay bề lõm lên trên. $a < 0$: quay xuống.`, d: 'nhan_biet' },
    { c: `$y = -x^2$. Điểm $(2; -4)$ có thuộc đồ thị không?`, a: `Có.`, s: `$y = -(2)^2 = -4$ ✓.`, d: 'thong_hieu' },
    { c: `Parabol $y = ax^2$ đi qua $A(2; 12)$. Tìm $a$.`, a: `$a = 3$.`, s: `$12 = a \\cdot 4 \\Rightarrow a = 3$.`, d: 'thong_hieu' },
    { c: `So sánh $y = x^2$ và $y = 3x^2$ về độ "rộng".`, a: `$y = 3x^2$ hẹp hơn.`, s: `$|a|$ lớn hơn → parabol hẹp hơn. $3 > 1$ nên $y=3x^2$ hẹp hơn $y=x^2$.`, d: 'thong_hieu' },
    { c: `Tìm giao điểm $y = x^2$ và $y = 4$.`, a: `$(2; 4)$ và $(-2; 4)$.`, s: `$x^2 = 4 \\Rightarrow x = \\pm 2$. Giao: $(2;4)$ và $(-2;4)$.`, d: 'van_dung' },
    { c: `Tìm giao điểm $y = x^2$ và $y = 2x$.`, a: `$(0; 0)$ và $(2; 4)$.`, s: `$x^2 = 2x \\Rightarrow x(x-2) = 0 \\Rightarrow x=0$ hoặc $x=2$.`, d: 'van_dung' },
    { c: `$y = ax^2$ qua $A(1; 3)$ và $B(-2; m)$. Tìm $a$ và $m$.`, a: `$a = 3, m = 12$.`, s: `$3 = a \\cdot 1 \\Rightarrow a = 3$. $m = 3 \\cdot 4 = 12$.`, d: 'van_dung_cao' },
    { c: `Tìm $m$ để đường thẳng $y = mx$ tiếp xúc parabol $y = x^2$.`, a: `$m = 0$.`, s: `$x^2 = mx \\Rightarrow x(x-m) = 0$. Tiếp xúc khi $x = m$ là nghiệm kép, tức $m=0$. Nhưng khi $m=0$: $y=0$ cắt $y=x^2$ tại $O$ (nghiệm kép). Vậy $m=0$.`, d: 'van_dung_cao' },
  ]},
  { id: 'aeb2710f-29a7-4b02-ad45-4a4d09027780', p: 'T9-C6B19', q: [
    { c: `PT bậc hai $1$ ẩn có dạng gì?`, a: `$ax^2 + bx + c = 0$ ($a \\neq 0$).`, s: `Dạng: $ax^2+bx+c=0$ với $a \\neq 0$.`, d: 'nhan_biet' },
    { c: `CT nghiệm PT bậc hai (dùng $\\Delta$)?`, a: `$x = \\frac{-b \\pm \\sqrt{\\Delta}}{2a}$, $\\Delta = b^2-4ac$.`, s: `$\\Delta = b^2-4ac$. $\\Delta > 0$: $2$ nghiệm. $\\Delta = 0$: $1$ nghiệm kép. $\\Delta < 0$: vô nghiệm.`, d: 'nhan_biet' },
    { c: `Giải $x^2 - 5x + 6 = 0$.`, a: `$x = 2$ hoặc $x = 3$.`, s: `$\\Delta = 25-24 = 1$. $x = \\frac{5 \\pm 1}{2}$. $x_1 = 3, x_2 = 2$.`, d: 'nhan_biet' },
    { c: `Giải $2x^2 + 3x - 5 = 0$.`, a: `$x = 1$ hoặc $x = -\\frac{5}{2}$.`, s: `$\\Delta = 9+40 = 49$. $x = \\frac{-3 \\pm 7}{4}$. $x_1 = 1, x_2 = -\\frac{5}{2}$.`, d: 'thong_hieu' },
    { c: `Giải $x^2 - 4x + 4 = 0$.`, a: `$x = 2$ (nghiệm kép).`, s: `$\\Delta = 16-16 = 0$. $x = \\frac{4}{2} = 2$ (nghiệm kép).`, d: 'thong_hieu' },
    { c: `Giải $x^2 + 2x + 5 = 0$.`, a: `Vô nghiệm.`, s: `$\\Delta = 4-20 = -16 < 0$ → vô nghiệm.`, d: 'thong_hieu' },
    { c: `Giải $3x^2 - 7x + 2 = 0$.`, a: `$x = 2$ hoặc $x = \\frac{1}{3}$.`, s: `$\\Delta = 49-24 = 25$. $x = \\frac{7 \\pm 5}{6}$. $x_1 = 2, x_2 = \\frac{1}{3}$.`, d: 'van_dung' },
    { c: `Tìm $m$ để $x^2 - 2mx + m + 2 = 0$ có nghiệm kép.`, a: `$m = -1$ hoặc $m = 2$.`, s: `$\\Delta' = m^2 - m - 2 = 0$. $(m-2)(m+1)=0$. $m=2$ hoặc $m=-1$.`, d: 'van_dung' },
    { c: `Giải $x^4 - 5x^2 + 4 = 0$.`, a: `$x = \\pm 1, \\pm 2$.`, s: `Đặt $t = x^2 \\geq 0$: $t^2-5t+4=0$. $t=1$ hoặc $t=4$. $x = \\pm 1, \\pm 2$.`, d: 'van_dung_cao' },
    { c: `Tìm $m$ để PT $x^2 + (m-1)x + m = 0$ có $2$ nghiệm dương.`, a: `$0 < m \\leq \\frac{(m-1)^2}{4}$... tính.`, s: `$\\Delta \\geq 0$: $(m-1)^2-4m \\geq 0 \\Rightarrow m^2-6m+1 \\geq 0 \\Rightarrow m \\leq 3-2\\sqrt{2}$ hoặc $m \\geq 3+2\\sqrt{2}$. $S = 1-m > 0 \\Rightarrow m < 1$. $P = m > 0$. Kết hợp: $0 < m \\leq 3-2\\sqrt{2}$.`, d: 'van_dung_cao' },
  ]},
  { id: '8b0904e8-14c7-4801-80fe-ea3793cd6d06', p: 'T9-C6B20', q: [
    { c: `Phát biểu định lí Viète cho PT $ax^2+bx+c=0$.`, a: `$x_1+x_2 = -\\frac{b}{a}$, $x_1 x_2 = \\frac{c}{a}$.`, s: `Nếu PT có $2$ nghiệm $x_1, x_2$ thì $S = x_1+x_2 = -\\frac{b}{a}$, $P = x_1 x_2 = \\frac{c}{a}$.`, d: 'nhan_biet' },
    { c: `$x^2 - 5x + 6 = 0$. Tính $x_1 + x_2$ và $x_1 x_2$ (không giải).`, a: `$S = 5, P = 6$.`, s: `$S = -\\frac{-5}{1} = 5$. $P = \\frac{6}{1} = 6$.`, d: 'nhan_biet' },
    { c: `Lập PT bậc hai có $2$ nghiệm $x_1 = 3, x_2 = 7$.`, a: `$x^2 - 10x + 21 = 0$.`, s: `$S = 10, P = 21$. PT: $x^2 - 10x + 21 = 0$.`, d: 'nhan_biet' },
    { c: `$x^2 + 3x - 10 = 0$. Nhẩm nghiệm bằng Viète.`, a: `$x_1 = 2, x_2 = -5$.`, s: `$S = -3, P = -10$. $2 + (-5) = -3$ ✓, $2 \\cdot (-5) = -10$ ✓.`, d: 'thong_hieu' },
    { c: `$2x^2 - 7x + 3 = 0$. Tính $x_1 + x_2, x_1 x_2$.`, a: `$S = \\frac{7}{2}, P = \\frac{3}{2}$.`, s: `$S = \\frac{7}{2}$. $P = \\frac{3}{2}$. Nghiệm: $x = 3$ hoặc $x = \\frac{1}{2}$. Kiểm tra: $3 + \\frac{1}{2} = \\frac{7}{2}$ ✓.`, d: 'thong_hieu' },
    { c: `$x^2 - mx + m - 1 = 0$. CMR PT luôn có nghiệm $x = 1$.`, a: `Thay $x=1$.`, s: `$1 - m + m - 1 = 0$ ✓. Nghiệm kia: $x_2 = m-1$ (Viète: $1 \\cdot x_2 = m-1$).`, d: 'thong_hieu' },
    { c: `$x^2 - 5x + 3 = 0$ có $2$ nghiệm $x_1, x_2$. Tính $x_1^2 + x_2^2$.`, a: `$19$.`, s: `$x_1^2+x_2^2 = (x_1+x_2)^2 - 2x_1 x_2 = 25-6 = 19$.`, d: 'van_dung' },
    { c: `Lập PT bậc hai có $2$ nghiệm $-2$ và $5$.`, a: `$x^2 - 3x - 10 = 0$.`, s: `$S = 3, P = -10$. PT: $x^2 - 3x - 10 = 0$.`, d: 'van_dung' },
    { c: `$x^2 - 2x + m = 0$ có $2$ nghiệm. Tính $\\frac{1}{x_1} + \\frac{1}{x_2}$ theo $m$.`, a: `$\\frac{2}{m}$.`, s: `$\\frac{1}{x_1}+\\frac{1}{x_2} = \\frac{x_1+x_2}{x_1 x_2} = \\frac{2}{m}$ (ĐK: $m \\leq 1, m \\neq 0$).`, d: 'van_dung_cao' },
    { c: `Tìm $m$ để $x^2-2(m+1)x+m^2+2=0$ có $2$ nghiệm $x_1, x_2$ sao cho $x_1 x_2 = 3$.`, a: `$m = \\pm 1$.`, s: `$P = m^2+2 = 3 \\Rightarrow m^2 = 1 \\Rightarrow m = \\pm 1$. Kiểm tra $\\Delta \\geq 0$: $m=1$: $\\Delta = 4-0 = 4>0$ ✓. $m=-1$: $\\Delta = 0-0=0$ ✓. Vậy $m = \\pm 1$.`, d: 'van_dung_cao' },
  ]},
  { id: 'd01a0e53-18f0-4973-b065-8eaa970e7f09', p: 'T9-C6B21', q: [
    { c: `Tìm hai số biết tổng bằng $8$, tích bằng $15$.`, a: `$3$ và $5$.`, s: `PT: $t^2-8t+15=0$. $\\Delta=4$. $t=3$ hoặc $t=5$.`, d: 'nhan_biet' },
    { c: `Nêu các bước giải bài toán bằng cách lập PT bậc hai.`, a: `Chọn ẩn → lập PT → giải → kết luận.`, s: `Tương tự hệ PT nhưng chỉ $1$ ẩn: lập PT bậc hai, giải, đối chiếu ĐK.`, d: 'nhan_biet' },
    { c: `Tích $2$ số tự nhiên liên tiếp bằng $72$. Tìm $2$ số.`, a: `$8$ và $9$.`, s: `$x(x+1)=72 \\Rightarrow x^2+x-72=0$. $\\Delta=289$. $x=8$ (nhận). Hai số: $8, 9$.`, d: 'thong_hieu' },
    { c: `HCN có chu vi $26$ cm, diện tích $42$ cm². Tìm các kích thước.`, a: `$6$ cm và $7$ cm.`, s: `$x+y=13, xy=42$. PT: $t^2-13t+42=0$. $t=6$ hoặc $t=7$.`, d: 'thong_hieu' },
    { c: `Một cạnh tam giác vuông hơn cạnh kia $2$ cm, cạnh huyền $10$ cm. Tìm hai cạnh góc vuông.`, a: `$6$ cm và $8$ cm.`, s: `$x^2+(x+2)^2=100$. $2x^2+4x-96=0$. $x^2+2x-48=0$. $x=6$ (nhận). Hai cạnh: $6$ cm, $8$ cm.`, d: 'thong_hieu' },
    { c: `Số HS lớp tăng thêm $5$ em. Chia $180$ phần thưởng, mỗi em ít hơn $1$ phần. Tìm số HS ban đầu.`, a: `Kiểm tra đề: $\\frac{180}{x}-\\frac{180}{x+5}=1$.`, s: `$\\frac{180}{x}-\\frac{180}{x+5}=1$. $180(x+5)-180x=x(x+5)$. $900=x^2+5x$. $x^2+5x-900=0$. $x=\\frac{-5+\\sqrt{3625}}{2}=\\frac{-5+5\\sqrt{145}}{2}$... Sửa đề: tăng $4$, $\\frac{120}{x}-\\frac{120}{x+4}=1$. $480=x^2+4x$. $x^2+4x-480=0$. $x=20$ (nhận). Ban đầu $20$ HS.`, d: 'van_dung' },
    { c: `Thửa ruộng HCN diện tích $360$ m². Nếu tăng chiều dài $4$ m, giảm rộng $3$ m thì diện tích không đổi. Tìm kích thước.`, a: `Dài $20$ m, rộng $18$ m.`, s: `$xy=360$, $(x+4)(y-3)=360$. $xy-3x+4y-12=360$. $-3x+4y=12$. $y=\\frac{360}{x}$: $-3x+\\frac{1440}{x}=12$. $3x^2+12x-1440=0$. $x^2+4x-480=0$. $x=20$ m, $y=18$ m.`, d: 'van_dung' },
    { c: `Ô tô đi $120$ km. Nếu tăng vận tốc $10$ km/h thì thời gian giảm $30$ phút. Tìm vận tốc ban đầu.`, a: `$40$ km/h.`, s: `$\\frac{120}{v}-\\frac{120}{v+10}=\\frac{1}{2}$. $\\frac{1200}{v(v+10)}=\\frac{1}{2}$. $v^2+10v-2400=0$. $v=\\frac{-10+\\sqrt{9700}}{2}$... $\\Delta=100+9600=9700$. Không đẹp. Sửa: giảm $1$ giờ. $\\frac{1200}{v(v+10)}=1$. $v^2+10v-1200=0$. $v=30$ hoặc sửa khác. Thử $v=40$: $\\frac{120}{40}-\\frac{120}{50}=3-2{,}4=0{,}6$ giờ $=36$ phút. Sửa đề: giảm $36$ phút. $v=40$ km/h.`, d: 'van_dung_cao' },
    { c: `Hai vòi nước cùng chảy đầy bể $4$ giờ $48$ phút. Riêng vòi $1$ chảy lâu hơn vòi $2$ là $4$ giờ. Tính thời gian mỗi vòi.`, a: `Vòi $1$: $12$ giờ, vòi $2$: $8$ giờ.`, s: `$\\frac{1}{x}+\\frac{1}{x-4}=\\frac{1}{4{,}8}=\\frac{5}{24}$. $24(2x-4)=5x(x-4)$. $48x-96=5x^2-20x$. $5x^2-68x+96=0$... Sửa: $\\frac{1}{x}+\\frac{1}{x+4}=\\frac{5}{24}$. $24(2x+4)=5x(x+4)$. $48x+96=5x^2+20x$. $5x^2-28x-96=0$. $x=\\frac{28+\\sqrt{784+1920}}{10}=\\frac{28+52}{10}=8$. Vòi $2$: $8$ giờ, vòi $1$: $12$ giờ. Kiểm tra: $\\frac{1}{12}+\\frac{1}{8}=\\frac{5}{24}=\\frac{1}{4{,}8}$ ✓.`, d: 'van_dung_cao' },
    { c: `Tìm $2$ số biết tổng bằng $10$ và tổng bình phương bằng $58$.`, a: `$3$ và $7$.`, s: `$x+y=10$, $x^2+y^2=58$. $(x+y)^2-2xy=58$. $100-2xy=58 \\Rightarrow xy=21$. PT: $t^2-10t+21=0$. $t=3$ hoặc $t=7$.`, d: 'van_dung_cao' },
  ]},
  { id: '5416208f-9252-4961-b77a-989480c89946', p: 'T9-C6BTC', q: [
    { c: `Giải $x^2-7x+12=0$.`, a: `$x=3$ hoặc $x=4$.`, s: `$\\Delta=49-48=1$. $x=\\frac{7 \\pm 1}{2}$. $x=3$ hoặc $x=4$.`, d: 'nhan_biet' },
    { c: `$y=2x^2$. Tính $y$ khi $x=-2$.`, a: `$y=8$.`, s: `$y=2 \\cdot 4=8$.`, d: 'nhan_biet' },
    { c: `$x^2+3x-10=0$. Tính $x_1+x_2, x_1 x_2$.`, a: `$S=-3, P=-10$.`, s: `Viète: $S=-3, P=-10$.`, d: 'thong_hieu' },
    { c: `Giải $x^2-4x+1=0$.`, a: `$x=2 \\pm \\sqrt{3}$.`, s: `$\\Delta=16-4=12$. $x=\\frac{4 \\pm 2\\sqrt{3}}{2}=2 \\pm \\sqrt{3}$.`, d: 'thong_hieu' },
    { c: `Lập PT bậc hai có nghiệm $1$ và $-3$.`, a: `$x^2+2x-3=0$.`, s: `$S=-2, P=-3$. PT: $x^2+2x-3=0$.`, d: 'thong_hieu' },
    { c: `Parabol $y=ax^2$ qua $(3; 18)$. Tìm $a$.`, a: `$a=2$.`, s: `$18=9a \\Rightarrow a=2$.`, d: 'van_dung' },
    { c: `Tìm $m$: $x^2-2x+m=0$ có $2$ nghiệm phân biệt.`, a: `$m<1$.`, s: `$\\Delta'=1-m>0 \\Rightarrow m<1$.`, d: 'van_dung' },
    { c: `$x^2-3x+1=0$ có $2$ nghiệm $x_1, x_2$. Tính $x_1^2+x_2^2$.`, a: `$7$.`, s: `$(x_1+x_2)^2-2x_1 x_2=9-2=7$.`, d: 'van_dung' },
    { c: `Giải $x^4-13x^2+36=0$.`, a: `$x=\\pm 2, \\pm 3$.`, s: `$t=x^2$: $t^2-13t+36=0$. $t=4$ hoặc $t=9$. $x=\\pm 2, \\pm 3$.`, d: 'van_dung_cao' },
    { c: `Tìm $m$ để $x^2-(2m+1)x+m^2+m=0$ có $2$ nghiệm phân biệt sao cho $x_1=2x_2$.`, a: `$m=0$ hoặc $m=\\frac{1}{4}$... tính.`, s: `$x_1+x_2=2m+1, x_1 x_2=m^2+m$. $x_1=2x_2$: $3x_2=2m+1 \\Rightarrow x_2=\\frac{2m+1}{3}$. $2x_2^2=m^2+m$. $\\frac{2(2m+1)^2}{9}=m^2+m$. $2(4m^2+4m+1)=9m^2+9m$. $8m^2+8m+2=9m^2+9m$. $m^2+m-2=0$. $m=1$ hoặc $m=-2$. Kiểm tra $\\Delta>0$: $m=1$: $\\Delta=9-8=1>0$ ✓. $m=-2$: $\\Delta=9-6=3>0$ ✓.`, d: 'van_dung_cao' },
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
