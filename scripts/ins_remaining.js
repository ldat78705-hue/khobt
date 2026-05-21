const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const U = '8316c34e-765d-4b8c-9364-b683a17e33f8';
const B = [
  // G6 OTC6 Phân số
  { id: '0c20dcfc-d889-4f7d-b65a-d9679bbabe18', p: 'T6-OTC6', g: 6, t: 'dai_so', q: [
    { c: `Rút gọn $\\frac{18}{24}$.`, a: `$\\frac{3}{4}$.`, s: `$\\frac{18:6}{24:6}=\\frac{3}{4}$.`, d: 'nhan_biet' },
    { c: `So sánh $\\frac{3}{5}$ và $\\frac{2}{5}$.`, a: `$\\frac{3}{5}>\\frac{2}{5}$.`, s: `Cùng mẫu, tử $3>2$.`, d: 'nhan_biet' },
    { c: `Tính $\\frac{2}{3}+\\frac{1}{6}$.`, a: `$\\frac{5}{6}$.`, s: `$\\frac{4}{6}+\\frac{1}{6}=\\frac{5}{6}$.`, d: 'thong_hieu' },
    { c: `Tính $\\frac{5}{8}-\\frac{1}{4}$.`, a: `$\\frac{3}{8}$.`, s: `$\\frac{5}{8}-\\frac{2}{8}=\\frac{3}{8}$.`, d: 'thong_hieu' },
    { c: `Tính $\\frac{3}{4}\\times\\frac{2}{9}$.`, a: `$\\frac{1}{6}$.`, s: `$\\frac{6}{36}=\\frac{1}{6}$.`, d: 'thong_hieu' },
    { c: `Tính $\\frac{5}{6}:\\frac{5}{3}$.`, a: `$\\frac{1}{2}$.`, s: `$\\frac{5}{6}\\times\\frac{3}{5}=\\frac{1}{2}$.`, d: 'van_dung' },
    { c: `Tìm $x$: $\\frac{x}{3}=\\frac{8}{12}$.`, a: `$x=2$.`, s: `$\\frac{8}{12}=\\frac{2}{3}$. $x=2$.`, d: 'van_dung' },
    { c: `Lớp $40$ HS, $\\frac{3}{8}$ giỏi. Số HS giỏi?`, a: `$15$ HS.`, s: `$40\\times\\frac{3}{8}=15$.`, d: 'van_dung' },
    { c: `Tính $\\frac{1}{2}+\\frac{1}{3}+\\frac{1}{6}$.`, a: `$1$.`, s: `$\\frac{3+2+1}{6}=1$.`, d: 'van_dung_cao' },
    { c: `Tìm $x$: $\\frac{2}{x}+\\frac{1}{x}=1$, $x\\neq 0$.`, a: `$x=3$.`, s: `$\\frac{3}{x}=1\\Rightarrow x=3$.`, d: 'van_dung_cao' },
  ]},
  // G6 OTC7 Số thập phân
  { id: 'f40e775c-f038-4a0b-91a9-b83a2e0b68b8', p: 'T6-OTC7', g: 6, t: 'dai_so', q: [
    { c: `Viết $\\frac{7}{10}$ dạng STP.`, a: `$0{,}7$.`, s: `$\\frac{7}{10}=0{,}7$.`, d: 'nhan_biet' },
    { c: `Viết $0{,}75$ dạng PS.`, a: `$\\frac{3}{4}$.`, s: `$\\frac{75}{100}=\\frac{3}{4}$.`, d: 'nhan_biet' },
    { c: `Tính $3{,}45+2{,}55$.`, a: `$6$.`, s: `$3{,}45+2{,}55=6{,}00=6$.`, d: 'thong_hieu' },
    { c: `Tính $5{,}2-1{,}35$.`, a: `$3{,}85$.`, s: `$5{,}20-1{,}35=3{,}85$.`, d: 'thong_hieu' },
    { c: `Tính $2{,}5\\times 0{,}4$.`, a: `$1$.`, s: `$2{,}5\\times 0{,}4=1{,}0=1$.`, d: 'thong_hieu' },
    { c: `Tính $7{,}2:0{,}8$.`, a: `$9$.`, s: `$7{,}2:0{,}8=72:8=9$.`, d: 'van_dung' },
    { c: `So sánh $0{,}36$ và $\\frac{1}{3}$.`, a: `$0{,}36>\\frac{1}{3}$.`, s: `$\\frac{1}{3}\\approx 0{,}333\\ldots<0{,}36$.`, d: 'van_dung' },
    { c: `Làm tròn $4{,}567$ đến phần mười.`, a: `$4{,}6$.`, s: `Phần trăm $=6\\geq 5$, làm tròn lên.`, d: 'van_dung' },
    { c: `Tìm $x$: $3{,}2x=16$.`, a: `$x=5$.`, s: `$x=16:3{,}2=5$.`, d: 'van_dung_cao' },
    { c: `Sắp xếp tăng dần: $\\frac{1}{3}$; $0{,}3$; $0{,}35$.`, a: `$0{,}3<\\frac{1}{3}<0{,}35$.`, s: `$0{,}3<0{,}333\\ldots<0{,}35$.`, d: 'van_dung_cao' },
  ]},
  // G6 OTC8 Hình học cơ bản
  { id: 'd7e21159-6dc9-45ed-8313-d07b8b79dff3', p: 'T6-OTC8', g: 6, t: 'hinh_hoc', q: [
    { c: `Qua $2$ điểm phân biệt vẽ được mấy đường thẳng?`, a: `$1$.`, s: `Duy nhất $1$ đường thẳng.`, d: 'nhan_biet' },
    { c: `Đoạn thẳng $AB=5$ cm, $M$ trung điểm. $AM=?$`, a: `$2{,}5$ cm.`, s: `$AM=\\frac{AB}{2}=2{,}5$ cm.`, d: 'nhan_biet' },
    { c: `Hai đường thẳng cắt nhau tạo mấy cặp góc đối đỉnh?`, a: `$2$ cặp.`, s: `$4$ góc, $2$ cặp đối đỉnh.`, d: 'thong_hieu' },
    { c: `Góc kề bù có tổng bằng?`, a: `$180°$.`, s: `Hai góc kề bù có tổng $=180°$.`, d: 'thong_hieu' },
    { c: `$A,B,C$ thẳng hàng, $B$ giữa $A,C$, $AB=3$ cm, $BC=5$ cm. $AC=?$`, a: `$8$ cm.`, s: `$AC=AB+BC=3+5=8$ cm.`, d: 'thong_hieu' },
    { c: `Hai tia $Ox,Oy$ tạo $\\widehat{xOy}=50°$. Góc kề bù bằng?`, a: `$130°$.`, s: `$180°-50°=130°$.`, d: 'van_dung' },
    { c: `$4$ điểm không có $3$ điểm thẳng hàng. Kẻ được mấy đường thẳng?`, a: `$6$.`, s: `$C_4^2=6$.`, d: 'van_dung' },
    { c: `$M$ trung điểm $AB$, $AB=12$ cm. $N$ trung điểm $AM$. $AN=?$`, a: `$3$ cm.`, s: `$AM=6$ cm. $AN=3$ cm.`, d: 'van_dung' },
    { c: `Hai góc đối đỉnh, một góc $= 65°$. Góc kia?`, a: `$65°$.`, s: `Góc đối đỉnh bằng nhau.`, d: 'van_dung_cao' },
    { c: `$5$ đường thẳng đôi một cắt nhau, không $3$ đường đồng quy. Có mấy giao điểm?`, a: `$10$.`, s: `$C_5^2=10$.`, d: 'van_dung_cao' },
  ]},
  // G6 OTC9 Dữ liệu & Xác suất
  { id: 'c4ce2bd3-e41c-465c-95a1-42fdf57ecfca', p: 'T6-OTC9', g: 6, t: 'xac_suat', q: [
    { c: `Tần số là gì?`, a: `Số lần xuất hiện của giá trị trong dãy.`, s: `Tần số = số lần lặp.`, d: 'nhan_biet' },
    { c: `Dãy: $2,3,2,5,3,2$. Tần số $2$?`, a: `$3$.`, s: `$2$ xuất hiện $3$ lần.`, d: 'nhan_biet' },
    { c: `Biểu đồ cột dùng để làm gì?`, a: `Biểu diễn trực quan số liệu thống kê.`, s: `Mỗi cột cao bằng giá trị/tần số.`, d: 'thong_hieu' },
    { c: `Tung đồng xu. $P$(ngửa)?`, a: `$\\frac{1}{2}$.`, s: `$2$ kết quả đồng khả năng.`, d: 'thong_hieu' },
    { c: `Gieo xúc xắc. $P$(mặt $\\leq 3$)?`, a: `$\\frac{1}{2}$.`, s: `$\\{1,2,3\\}$: $\\frac{3}{6}=\\frac{1}{2}$.`, d: 'thong_hieu' },
    { c: `Trung bình cộng: $4,6,8,10,12$?`, a: `$8$.`, s: `$(4+6+8+10+12):5=40:5=8$.`, d: 'van_dung' },
    { c: `Hộp $3$ đỏ, $5$ xanh, $2$ vàng. $P$(đỏ)?`, a: `$\\frac{3}{10}$.`, s: `$\\frac{3}{10}$.`, d: 'van_dung' },
    { c: `Dãy: $5,7,5,8,7,5,9$. Giá trị xuất hiện nhiều nhất?`, a: `$5$ ($3$ lần).`, s: `$5$: $3$; $7$: $2$; $8$: $1$; $9$: $1$.`, d: 'van_dung' },
    { c: `Tung đồng xu $100$ lần, ngửa $48$ lần. Tần suất ngửa?`, a: `$48\\%$.`, s: `$\\frac{48}{100}=48\\%$.`, d: 'van_dung_cao' },
    { c: `Sự kiện chắc chắn có XS bằng?`, a: `$1$.`, s: `XS $=1$: chắc chắn xảy ra.`, d: 'van_dung_cao' },
  ]},
  // G7 Luyện tập chung Số hữu tỉ
  { id: '7517ac98-43db-464f-91dd-7629822136e8', p: 'T7-C1LTC', g: 7, t: 'dai_so', q: [
    { c: `Tính $\\frac{-3}{5}+\\frac{1}{5}$.`, a: `$\\frac{-2}{5}$.`, s: `$\\frac{-3+1}{5}=\\frac{-2}{5}$.`, d: 'nhan_biet' },
    { c: `Tính $(-0{,}5)\\times 4$.`, a: `$-2$.`, s: `$(-0{,}5)\\times 4=-2$.`, d: 'nhan_biet' },
    { c: `$|{-\\frac{7}{3}}|=?$`, a: `$\\frac{7}{3}$.`, s: `GTTĐ bỏ dấu âm.`, d: 'thong_hieu' },
    { c: `Tính $1{,}2:(-0{,}4)$.`, a: `$-3$.`, s: `$1{,}2:0{,}4=3$. Khác dấu: $-3$.`, d: 'thong_hieu' },
    { c: `Tính $(-2)^3+3^2$.`, a: `$1$.`, s: `$-8+9=1$.`, d: 'thong_hieu' },
    { c: `Tìm $x$: $3x-\\frac{1}{2}=\\frac{5}{2}$.`, a: `$x=1$.`, s: `$3x=3\\Rightarrow x=1$.`, d: 'van_dung' },
    { c: `Tính $\\frac{1}{2}\\times\\frac{2}{3}\\times\\frac{3}{4}\\times\\frac{4}{5}$.`, a: `$\\frac{1}{5}$.`, s: `Rút gọn liên hoàn: $\\frac{1}{5}$.`, d: 'van_dung' },
    { c: `Tìm $x$: $|x-1|=3$.`, a: `$x=4$ hoặc $x=-2$.`, s: `$x-1=\\pm 3$.`, d: 'van_dung' },
    { c: `Tính $1-\\frac{1}{2}+\\frac{1}{2}-\\frac{1}{3}+\\frac{1}{3}-\\frac{1}{4}$.`, a: `$\\frac{3}{4}$.`, s: `Triệt tiêu: $1-\\frac{1}{4}=\\frac{3}{4}$.`, d: 'van_dung_cao' },
    { c: `Tìm $x,y$: $|x-2|+|y+1|=0$.`, a: `$x=2,y=-1$.`, s: `GTTĐ $\\geq 0$. Tổng $=0$ khi cả hai $=0$.`, d: 'van_dung_cao' },
  ]},
  // G7 Luyện tập Hình khối
  { id: 'fcd5d496-4507-4a11-a36e-1e5e94e9e2c7', p: 'T7-C10LT', g: 7, t: 'hinh_hoc', q: [
    { c: `CT thể tích hình hộp chữ nhật?`, a: `$V=a\\times b\\times c$.`, s: `$a,b,c$: ba kích thước.`, d: 'nhan_biet' },
    { c: `CT thể tích hình lập phương?`, a: `$V=a^3$.`, s: `$a$: cạnh.`, d: 'nhan_biet' },
    { c: `Hình hộp CN: $5$ cm, $4$ cm, $3$ cm. Tính $V$.`, a: `$60$ cm³.`, s: `$V=5\\times 4\\times 3=60$ cm³.`, d: 'thong_hieu' },
    { c: `Hình lập phương cạnh $6$ cm. Tính $V$.`, a: `$216$ cm³.`, s: `$V=6^3=216$ cm³.`, d: 'thong_hieu' },
    { c: `CT diện tích TP hình hộp CN?`, a: `$S_{tp}=2(ab+bc+ca)$.`, s: `$2$ mặt mỗi loại.`, d: 'thong_hieu' },
    { c: `Hình hộp CN $8\\times 5\\times 4$ cm. Tính $S_{tp}$.`, a: `$184$ cm².`, s: `$2(40+20+32)=184$ cm².`, d: 'van_dung' },
    { c: `Bể cá HCN dài $50$ cm, rộng $30$ cm, cao $40$ cm. Dung tích (lít)?`, a: `$60$ lít.`, s: `$V=60\\,000$ cm³ $=60$ dm³ $=60$ lít.`, d: 'van_dung' },
    { c: `Lập phương $S_{tp}=150$ cm². Tính cạnh.`, a: `$5$ cm.`, s: `$6a^2=150\\Rightarrow a^2=25\\Rightarrow a=5$ cm.`, d: 'van_dung' },
    { c: `Cạnh lập phương tăng gấp đôi. $V$ tăng mấy lần?`, a: `$8$ lần.`, s: `$(2a)^3=8a^3$.`, d: 'van_dung_cao' },
    { c: `Hình hộp CN $V=120$ cm³, đáy $6\\times 5$ cm. Tính chiều cao.`, a: `$4$ cm.`, s: `$h=\\frac{120}{30}=4$ cm.`, d: 'van_dung_cao' },
  ]},
  // G8 Luyện tập chung Hình khối
  { id: 'e1051d89-7b17-4cef-ab66-69d87963d888', p: 'T8-C10LTC', g: 8, t: 'hinh_hoc', q: [
    { c: `CT thể tích lăng trụ đứng?`, a: `$V=S_{đáy}\\times h$.`, s: `$S_{đáy}$: diện tích đáy, $h$: chiều cao.`, d: 'nhan_biet' },
    { c: `CT thể tích hình chóp?`, a: `$V=\\frac{1}{3}S_{đáy}\\times h$.`, s: `Bằng $\\frac{1}{3}$ lăng trụ cùng đáy cùng cao.`, d: 'nhan_biet' },
    { c: `Lăng trụ đứng đáy tam giác vuông ($3\\times 4$ cm), $h=10$ cm. Tính $V$.`, a: `$60$ cm³.`, s: `$S_{đ}=\\frac{3\\times 4}{2}=6$ cm². $V=6\\times 10=60$ cm³.`, d: 'thong_hieu' },
    { c: `Chóp tứ giác đều đáy vuông cạnh $6$ cm, $h=8$ cm. Tính $V$.`, a: `$96$ cm³.`, s: `$S_{đ}=36$ cm². $V=\\frac{1}{3}\\times 36\\times 8=96$ cm³.`, d: 'thong_hieu' },
    { c: `Lăng trụ đứng đáy HCN $5\\times 4$ cm, $h=7$ cm. Tính $V$.`, a: `$140$ cm³.`, s: `$V=20\\times 7=140$ cm³.`, d: 'thong_hieu' },
    { c: `Chóp tam giác đều cạnh đáy $6$ cm, $h=10$ cm. Tính $V$.`, a: `$30\\sqrt{3}$ cm³.`, s: `$S_{đ}=\\frac{\\sqrt{3}}{4}\\times 36=9\\sqrt{3}$ cm². $V=\\frac{1}{3}\\times 9\\sqrt{3}\\times 10=30\\sqrt{3}$ cm³.`, d: 'van_dung' },
    { c: `Bể nước lăng trụ đáy tam giác ($5,12,13$ cm), $h=20$ cm. Dung tích?`, a: `$600$ cm³.`, s: `Vuông: $S_{đ}=\\frac{5\\times 12}{2}=30$ cm². $V=600$ cm³.`, d: 'van_dung' },
    { c: `Kim tự tháp đáy vuông cạnh $230$ m, $h=146$ m. Tính $V$.`, a: `$\\approx 2\\,574\\,467$ m³.`, s: `$V=\\frac{1}{3}\\times 52\\,900\\times 146\\approx 2\\,574\\,467$ m³.`, d: 'van_dung' },
    { c: `Lăng trụ và chóp cùng đáy cùng cao. Tỉ số $V$?`, a: `$V_{chóp}=\\frac{1}{3}V_{lăng trụ}$.`, s: `Theo CT.`, d: 'van_dung_cao' },
    { c: `Chóp tứ giác đều $V=48$ cm³, $h=4$ cm. Tính cạnh đáy.`, a: `$6$ cm.`, s: `$S_{đ}=\\frac{3V}{h}=36$ cm². $a=6$ cm.`, d: 'van_dung_cao' },
  ]},
  // G9 Luyện tập chung Hình khối
  { id: 'b4794ef5-e45c-4841-84a0-cfd2c8b67bcf', p: 'T9-C10LTC', g: 9, t: 'hinh_hoc', q: [
    { c: `Hình trụ $R=5$ cm, $h=10$ cm. Tính $V$.`, a: `$250\\pi$ cm³.`, s: `$V=\\pi\\times 25\\times 10=250\\pi\\approx 785{,}4$ cm³.`, d: 'nhan_biet' },
    { c: `Hình cầu $R=4$ cm. Tính $S$.`, a: `$64\\pi$ cm².`, s: `$S=4\\pi\\times 16=64\\pi\\approx 201{,}1$ cm².`, d: 'nhan_biet' },
    { c: `Hình nón $R=3$ cm, $h=4$ cm. Tính $V$.`, a: `$12\\pi$ cm³.`, s: `$V=\\frac{1}{3}\\pi\\times 9\\times 4=12\\pi\\approx 37{,}7$ cm³.`, d: 'thong_hieu' },
    { c: `Hình cầu $R=6$ cm. Tính $V$.`, a: `$288\\pi$ cm³.`, s: `$V=\\frac{4}{3}\\pi\\times 216=288\\pi$.`, d: 'thong_hieu' },
    { c: `Hình trụ $S_{xq}=60\\pi$ cm², $R=3$ cm. Tính $h$.`, a: `$10$ cm.`, s: `$2\\pi\\times 3\\times h=60\\pi$. $h=10$ cm.`, d: 'thong_hieu' },
    { c: `Lon sữa trụ $R=3{,}5$ cm, $h=15$ cm. Tính dung tích (ml).`, a: `$\\approx 577$ ml.`, s: `$V=\\pi(3{,}5)^2\\times 15=183{,}75\\pi\\approx 577$ ml.`, d: 'van_dung' },
    { c: `Hình nón $R=5$ cm, $l=13$ cm. Tính $h$ và $V$.`, a: `$h=12$ cm, $V=100\\pi$ cm³.`, s: `$h=\\sqrt{169-25}=12$ cm. $V=\\frac{1}{3}\\pi\\times 25\\times 12=100\\pi$.`, d: 'van_dung' },
    { c: `Quả bóng $d=22$ cm. Tính $V$.`, a: `$\\frac{5324}{3}\\pi\\approx 5575$ cm³.`, s: `$R=11$. $V=\\frac{4}{3}\\pi(11)^3=\\frac{5324\\pi}{3}$.`, d: 'van_dung' },
    { c: `$R$ cầu tăng $3$ lần. $V$ tăng mấy lần?`, a: `$27$ lần.`, s: `$V'=\\frac{4}{3}\\pi(3R)^3=27V$.`, d: 'van_dung_cao' },
    { c: `Trụ ngoại tiếp cầu ($R$ cầu $= R$ trụ, $h=2R$). $\\frac{V_{cầu}}{V_{trụ}}=?$`, a: `$\\frac{2}{3}$.`, s: `$\\frac{\\frac{4}{3}\\pi R^3}{2\\pi R^3}=\\frac{2}{3}$.`, d: 'van_dung_cao' },
  ]},
];
async function main() {
  let total = 0;
  for (const b of B) {
    console.log('=== '+b.p+' ===');
    let c = 0;
    for (const q of b.q) {
      const code = b.p+'-'+String(c+1).padStart(3,'0');
      await sql`INSERT INTO public.questions (content,answer,solution,grade,topic,difficulty,question_type,category_id,status,is_public,question_code,user_id) VALUES (${q.c},${q.a},${q.s},${b.g},${b.t},${q.d},'tu_luan',${b.id},'approved',true,${code},${U})`;
      c++; console.log('OK: '+code);
    }
    total += c;
  }
  console.log('Total: '+total);
}
main().catch(console.error);
