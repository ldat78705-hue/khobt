const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const U = '8316c34e-765d-4b8c-9364-b683a17e33f8', G = 9, T = 'dai_so';
const B = [
  { id: '84df62ce-aa84-4178-a52c-e821a17989cb', p: 'T9-C7B22', q: [
    { c: `Tần số của một giá trị là gì?`, a: `Số lần xuất hiện của giá trị đó.`, s: `Tần số là số lần giá trị xuất hiện trong mẫu dữ liệu.`, d: 'nhan_biet' },
    { c: `Lập bảng tần số cho dãy: $3, 5, 3, 7, 5, 3, 7, 5, 3, 5$.`, a: `$3$: $4$; $5$: $4$; $7$: $2$.`, s: `Đếm: $3$ xuất hiện $4$ lần, $5$ xuất hiện $4$ lần, $7$ xuất hiện $2$ lần. Tổng $= 10$.`, d: 'nhan_biet' },
    { c: `Biểu đồ tần số dạng cột biểu diễn gì?`, a: `Chiều cao cột = tần số.`, s: `Trục hoành: giá trị. Trục tung: tần số. Mỗi cột cao bằng tần số tương ứng.`, d: 'nhan_biet' },
    { c: `Cho bảng tần số: $4$(3), $5$(5), $6$(7), $7$(4), $8$(1). Tìm mốt.`, a: `Mốt $= 6$.`, s: `$6$ có tần số cao nhất ($7$) → Mốt $= 6$.`, d: 'thong_hieu' },
    { c: `Tính trung bình cộng: $4$(3), $5$(5), $6$(7), $7$(4), $8$(1).`, a: `$\\bar{x} = 5{,}75$.`, s: `$\\bar{x} = \\frac{12+25+42+28+8}{20} = \\frac{115}{20} = 5{,}75$.`, d: 'thong_hieu' },
    { c: `Tìm trung vị của dãy $20$ số đã sắp xếp ở câu trên.`, a: `$6$.`, s: `$20$ số: vị trí $10$ và $11$. Số thứ $10$: $6$, thứ $11$: $6$. $Me = \\frac{6+6}{2} = 6$.`, d: 'thong_hieu' },
    { c: `Điểm kiểm tra $10$ HS: $6, 7, 5, 8, 6, 9, 7, 6, 8, 7$. Lập bảng tần số.`, a: `$5$:$1$; $6$:$3$; $7$:$3$; $8$:$2$; $9$:$1$.`, s: `$5$: $1$, $6$: $3$, $7$: $3$, $8$: $2$, $9$: $1$. Tổng $= 10$.`, d: 'van_dung' },
    { c: `Tính trung bình cộng cho dữ liệu câu trên.`, a: `$\\bar{x} = 6{,}9$.`, s: `$\\bar{x} = \\frac{5+18+21+16+9}{10} = \\frac{69}{10} = 6{,}9$.`, d: 'van_dung' },
    { c: `Dữ liệu $30$ HS: điểm $5$(4), $6$(8), $7$(10), $8$(5), $9$(3). Vẽ biểu đồ cột nào cao nhất?`, a: `Cột $7$ (tần số $10$).`, s: `Cột tại $7$ cao nhất (tần số $10$). Mốt $= 7$.`, d: 'van_dung_cao' },
    { c: `Tìm trung vị dữ liệu $30$ HS ở câu trên.`, a: `$Me = 7$.`, s: `Vị trí $15, 16$: cộng dồn $4+8=12$ (đến $6$), $12+10=22$ (đến $7$). Vị trí $15, 16$ đều ở $7$. $Me = 7$.`, d: 'van_dung_cao' },
  ]},
  { id: '6c7bdaaa-f5e3-4625-a19f-a83c825c42b1', p: 'T9-C7B23', q: [
    { c: `Tần số tương đối là gì?`, a: `Tỉ số tần số / tổng số dữ liệu.`, s: `$f = \\frac{\\text{tần số}}{n}$, thường biểu diễn dưới dạng phần trăm.`, d: 'nhan_biet' },
    { c: `Mẫu $20$ HS, điểm $8$ có $6$ HS. Tần số tương đối điểm $8$?`, a: `$30\\%$.`, s: `$f = \\frac{6}{20} = 0{,}3 = 30\\%$.`, d: 'nhan_biet' },
    { c: `Tổng tất cả tần số tương đối bằng bao nhiêu?`, a: `$1$ (hay $100\\%$).`, s: `$\\sum f_i = 1$ (vì $\\sum n_i = n$).`, d: 'nhan_biet' },
    { c: `Biểu đồ tần số tương đối dạng gì?`, a: `Cột hoặc hình quạt tròn.`, s: `Có thể dùng biểu đồ cột (chiều cao = $f$%) hoặc biểu đồ hình quạt tròn.`, d: 'thong_hieu' },
    { c: `Dữ liệu: $A$(8), $B$(12), $C$(5), $D$(5). Tính tần số tương đối mỗi loại.`, a: `$A$:$\\frac{4}{15}$; $B$:$\\frac{2}{5}$; $C$:$\\frac{1}{6}$; $D$:$\\frac{1}{6}$.`, s: `$n=30$. $f_A=\\frac{8}{30}=\\frac{4}{15} \\approx 26{,}7\\%$. $f_B=\\frac{12}{30}=40\\%$. $f_C=f_D=\\frac{5}{30}=\\frac{1}{6} \\approx 16{,}7\\%$.`, d: 'thong_hieu' },
    { c: `Từ biểu đồ hình quạt: $A = 40\\%$, $B = 35\\%$. Tổng $200$ HS. Tính số HS chọn $A$ và $B$.`, a: `$A$: $80$ HS, $B$: $70$ HS.`, s: `$A = 0{,}4 \\times 200 = 80$. $B = 0{,}35 \\times 200 = 70$.`, d: 'thong_hieu' },
    { c: `Khảo sát $50$ HS: Toán($18$), Văn($12$), Anh($15$), Khác($5$). Lập bảng tần số tương đối.`, a: `Toán $36\\%$, Văn $24\\%$, Anh $30\\%$, Khác $10\\%$.`, s: `$f_{Toán}=36\\%$, $f_{Văn}=24\\%$, $f_{Anh}=30\\%$, $f_{Khác}=10\\%$. Tổng $100\\%$ ✓.`, d: 'van_dung' },
    { c: `Sản phẩm loại $A$: $65\\%$, $B$: $25\\%$, $C$: $10\\%$. Lô $2000$ SP. Ước tính số SP mỗi loại.`, a: `$A$: $1300$, $B$: $500$, $C$: $200$.`, s: `$A = 0{,}65 \\times 2000 = 1300$. $B = 500$. $C = 200$. Tổng $= 2000$ ✓.`, d: 'van_dung' },
    { c: `Biểu đồ hình quạt: góc quạt ứng tần số tương đối $25\\%$ là bao nhiêu độ?`, a: `$90°$.`, s: `Góc $= 0{,}25 \\times 360° = 90°$.`, d: 'van_dung_cao' },
    { c: `Tần số tương đối $3$ nhóm: $0{,}4$; $0{,}35$; $x$. Tìm $x$.`, a: `$x = 0{,}25$.`, s: `$0{,}4+0{,}35+x=1 \\Rightarrow x=0{,}25 = 25\\%$.`, d: 'van_dung_cao' },
  ]},
  { id: '0bd2aad4-d21f-4bc5-9d3a-ba8d4b89b39f', p: 'T9-C7B24', q: [
    { c: `Bảng tần số ghép nhóm dùng khi nào?`, a: `Khi dữ liệu nhiều giá trị khác nhau.`, s: `Khi có quá nhiều giá trị riêng lẻ, ta ghép thành các nhóm (khoảng) để dễ phân tích.`, d: 'nhan_biet' },
    { c: `Nhóm $[10; 20)$ chứa giá trị nào: $10$, $15$, $20$?`, a: `$10$ và $15$.`, s: `$[10; 20)$ chứa $10 \\leq x < 20$. $10$ ✓, $15$ ✓, $20$ ✗.`, d: 'nhan_biet' },
    { c: `Biểu đồ tần số ghép nhóm thường dùng dạng nào?`, a: `Biểu đồ cột (histogram).`, s: `Histogram: các cột liền nhau, chiều rộng = độ rộng khoảng, chiều cao = tần số.`, d: 'nhan_biet' },
    { c: `Dữ liệu $20$ HS: $[0;4)$: $3$, $[4;6)$: $7$, $[6;8)$: $6$, $[8;10]$: $4$. Nhóm nào nhiều nhất?`, a: `$[4; 6)$ (tần số $7$).`, s: `$[4;6)$ có tần số cao nhất $= 7$.`, d: 'thong_hieu' },
    { c: `Tính tần số tương đối nhóm $[6; 8)$ ở câu trên.`, a: `$30\\%$.`, s: `$f = \\frac{6}{20} = 0{,}3 = 30\\%$.`, d: 'thong_hieu' },
    { c: `Ước tính trung bình cộng: lấy giá trị đại diện mỗi nhóm là trung điểm. Tính cho dữ liệu trên.`, a: `$\\bar{x} = 5{,}5$.`, s: `Đại diện: $2, 5, 7, 9$. $\\bar{x} = \\frac{3(2)+7(5)+6(7)+4(9)}{20} = \\frac{6+35+42+36}{20} = \\frac{119}{20} = 5{,}95$.`, d: 'thong_hieu' },
    { c: `Chiều cao $30$ HS (cm): $[140;150)$:$5$, $[150;160)$:$12$, $[160;170)$:$10$, $[170;180)$:$3$. Tìm nhóm chứa trung vị.`, a: `$[150; 160)$.`, s: `Cộng dồn: $5, 17, 27, 30$. Vị trí $15, 16$ đều ở nhóm $[150;160)$.`, d: 'van_dung' },
    { c: `Tính tần số tương đối ghép nhóm cho dữ liệu câu trên.`, a: `$16{,}7\\%$; $40\\%$; $33{,}3\\%$; $10\\%$.`, s: `$f_1=\\frac{5}{30} \\approx 16{,}7\\%$, $f_2=40\\%$, $f_3 \\approx 33{,}3\\%$, $f_4=10\\%$. Tổng $=100\\%$.`, d: 'van_dung' },
    { c: `Ước tính trung bình chiều cao ở câu trên.`, a: `$\\approx 157{,}2$ cm.`, s: `$\\bar{x} = \\frac{5(145)+12(155)+10(165)+3(175)}{30} = \\frac{725+1860+1650+525}{30} = \\frac{4760}{30} \\approx 158{,}7$ cm.`, d: 'van_dung_cao' },
    { c: `Khi nào nên dùng bảng ghép nhóm thay vì bảng tần số thường?`, a: `Khi dữ liệu liên tục hoặc có quá nhiều giá trị riêng lẻ.`, s: `Bảng ghép nhóm phù hợp khi: dữ liệu liên tục (chiều cao, cân nặng), hoặc số giá trị khác nhau quá lớn.`, d: 'van_dung_cao' },
  ]},
  { id: 'f6374e86-3edf-4611-9927-4973d9eceb5c', p: 'T9-C7BTC', q: [
    { c: `Dãy $2, 3, 3, 5, 5, 5, 7$. Mốt bằng?`, a: `$5$.`, s: `$5$ xuất hiện nhiều nhất ($3$ lần).`, d: 'nhan_biet' },
    { c: `Trung vị dãy $1, 3, 5, 7, 9$?`, a: `$5$.`, s: `$5$ số, trung vị = số ở vị trí $3$: $Me = 5$.`, d: 'nhan_biet' },
    { c: `Tần số tương đối $12$ trong mẫu $40$?`, a: `$30\\%$.`, s: `$f = \\frac{12}{40} = 0{,}3 = 30\\%$.`, d: 'thong_hieu' },
    { c: `Trung bình cộng $4, 6, 6, 8, 8, 8, 10$?`, a: `$\\approx 7{,}14$.`, s: `$\\bar{x} = \\frac{4+6+6+8+8+8+10}{7} = \\frac{50}{7} \\approx 7{,}14$.`, d: 'thong_hieu' },
    { c: `Nhóm $[20; 30)$ có $15$ giá trị trong $60$. Tần số tương đối?`, a: `$25\\%$.`, s: `$f = \\frac{15}{60} = 25\\%$.`, d: 'thong_hieu' },
    { c: `Điểm $10$ HS: $5, 6, 6, 7, 7, 7, 8, 8, 9, 10$. Tìm mốt, trung vị, trung bình.`, a: `Mốt $=7$; $Me=7$; $\\bar{x}=7{,}3$.`, s: `Mốt: $7$ ($3$ lần). Trung vị: $\\frac{7+7}{2}=7$. $\\bar{x}=\\frac{73}{10}=7{,}3$.`, d: 'van_dung' },
    { c: `Lập bảng tần số ghép nhóm cho $20$ điểm: nhóm $[0;4)$, $[4;6)$, $[6;8)$, $[8;10]$. Dữ liệu: $2,3,4,5,5,6,6,6,7,7,7,7,8,8,8,9,9,10,3,5$.`, a: `$[0;4)$:$3$, $[4;6)$:$4$, $[6;8)$:$7$, $[8;10]$:$6$.`, s: `$[0;4)$: $2,3,3$ = $3$. $[4;6)$: $4,5,5,5$ = $4$. $[6;8)$: $6,6,6,7,7,7,7$ = $7$. $[8;10]$: $8,8,8,9,9,10$ = $6$. Tổng $= 20$ ✓.`, d: 'van_dung' },
    { c: `Góc quạt ứng $35\\%$ trên biểu đồ tròn?`, a: `$126°$.`, s: `$0{,}35 \\times 360° = 126°$.`, d: 'van_dung' },
    { c: `So sánh ưu nhược điểm bảng tần số thường và ghép nhóm.`, a: `Thường: chính xác. Ghép nhóm: tổng quát hơn.`, s: `Bảng thường: chính xác từng giá trị nhưng cồng kềnh khi nhiều giá trị. Ghép nhóm: gọn, tổng quan nhưng mất thông tin chi tiết.`, d: 'van_dung_cao' },
    { c: `Tìm trung vị cho bảng ghép nhóm: $[0;5)$:$8$, $[5;10)$:$12$, $[10;15)$:$6$, $[15;20]$:$4$. ($n=30$).`, a: `$Me$ thuộc $[5; 10)$.`, s: `Cộng dồn: $8, 20, 26, 30$. Vị trí $15, 16$ ở nhóm $[5;10)$. Nội suy: $Me \\approx 5 + \\frac{15-8}{12} \\times 5 \\approx 7{,}92$.`, d: 'van_dung_cao' },
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
