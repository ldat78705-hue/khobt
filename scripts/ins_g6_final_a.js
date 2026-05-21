const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const U = '8316c34e-765d-4b8c-9364-b683a17e33f8', G = 6;
const B = [
  { id: 'df56e4e2-d24d-447e-879e-5d3414b1325e', p: 'T6-C1B1', t: 'dai_so', q: [
    { c: `Tập hợp là gì? Cho ví dụ.`, a: `Tập hợp gồm các phần tử xác định. VD: $A = \\{1, 2, 3\\}$.`, s: `Tập hợp là một nhóm các đối tượng (phần tử) được xác định rõ ràng. Ví dụ: $A = \\{1, 2, 3\\}$ là tập hợp gồm ba số $1, 2, 3$.`, d: 'nhan_biet' },
    { c: `Kí hiệu $\\in$ và $\\notin$ nghĩa là gì?`, a: `$\\in$: thuộc; $\\notin$: không thuộc.`, s: `$a \\in A$: $a$ là phần tử của $A$. $b \\notin A$: $b$ không phải phần tử của $A$.`, d: 'nhan_biet' },
    { c: `Cho $A = \\{2, 4, 6, 8\\}$. Viết bằng cách chỉ ra tính chất đặc trưng.`, a: `$A = \\{x \\in \\mathbb{N} \\mid x$ chẵn, $0 < x \\leq 8\\}$.`, s: `Tính chất: các số tự nhiên chẵn từ $2$ đến $8$.`, d: 'nhan_biet' },
    { c: `Cho $B = \\{x \\in \\mathbb{N} \\mid x < 5\\}$. Liệt kê phần tử.`, a: `$B = \\{0, 1, 2, 3, 4\\}$.`, s: `Các số tự nhiên nhỏ hơn $5$: $0, 1, 2, 3, 4$.`, d: 'thong_hieu' },
    { c: `$A = \\{1, 3, 5\\}$. Điền $\\in$ hoặc $\\notin$: $3 \\ldots A$; $4 \\ldots A$.`, a: `$3 \\in A$; $4 \\notin A$.`, s: `$3$ nằm trong $A$: $3 \\in A$. $4$ không nằm trong $A$: $4 \\notin A$.`, d: 'thong_hieu' },
    { c: `Tập rỗng kí hiệu gì? Có bao nhiêu phần tử?`, a: `$\\varnothing$, có $0$ phần tử.`, s: `Tập rỗng $\\varnothing$ không chứa phần tử nào.`, d: 'thong_hieu' },
    { c: `Viết tập hợp các chữ cái trong từ "TOÁN HỌC".`, a: `$\\{T, O, A, N, H, C\\}$.`, s: `Liệt kê (không lặp): $T, O, A, N, H, C$. (Tổng $6$ phần tử.)`, d: 'van_dung' },
    { c: `Cho $M = \\{x \\in \\mathbb{N} \\mid 3 \\leq x \\leq 10,$ $x$ lẻ$\\}$. Liệt kê.`, a: `$M = \\{3, 5, 7, 9\\}$.`, s: `Số lẻ từ $3$ đến $10$: $3, 5, 7, 9$.`, d: 'van_dung' },
    { c: `Tập hợp $A = \\{0, 2, 4, 6, \\ldots\\}$ là tập hợp gì?`, a: `Tập các số tự nhiên chẵn.`, s: `$A = \\{x \\in \\mathbb{N} \\mid x$ chẵn$\\}$. Tập hợp vô hạn.`, d: 'van_dung_cao' },
    { c: `Cho $A = \\{1, 2, 3\\}$, $B = \\{2, 3, 4\\}$. Tìm phần tử vừa thuộc $A$ vừa thuộc $B$.`, a: `$\\{2, 3\\}$.`, s: `Phần tử chung: $2 \\in A$ và $2 \\in B$; $3 \\in A$ và $3 \\in B$. Giao: $\\{2, 3\\}$.`, d: 'van_dung_cao' },
  ]},
  { id: '45f9f700-53ca-43dc-8651-ac4f4baaaced', p: 'T6-C3B13', t: 'dai_so', q: [
    { c: `Số nguyên gồm những loại số nào?`, a: `Số nguyên dương, số $0$, số nguyên âm.`, s: `$\\mathbb{Z} = \\{\\ldots, -3, -2, -1, 0, 1, 2, 3, \\ldots\\}$.`, d: 'nhan_biet' },
    { c: `Số đối của $5$ là gì?`, a: `$-5$.`, s: `Số đối của $a$ là $-a$: $a + (-a) = 0$. Số đối của $5$ là $-5$.`, d: 'nhan_biet' },
    { c: `Giá trị tuyệt đối của $-7$ bằng bao nhiêu?`, a: `$7$.`, s: `$|-7| = 7$. GTTĐ luôn $\\geq 0$.`, d: 'nhan_biet' },
    { c: `Sắp xếp $-3, 5, 0, -1, 2$ theo thứ tự tăng dần.`, a: `$-3, -1, 0, 2, 5$.`, s: `Trục số: $-3 < -1 < 0 < 2 < 5$.`, d: 'thong_hieu' },
    { c: `So sánh $-8$ và $-3$.`, a: `$-8 < -3$.`, s: `Trên trục số, $-8$ nằm bên trái $-3$ nên $-8 < -3$.`, d: 'thong_hieu' },
    { c: `$|x| = 4$. Tìm $x$.`, a: `$x = 4$ hoặc $x = -4$.`, s: `$|x| = 4 \\Rightarrow x = 4$ hoặc $x = -4$.`, d: 'thong_hieu' },
    { c: `Nhiệt độ buổi sáng $-2°C$, buổi trưa tăng $7°C$. Nhiệt độ trưa?`, a: `$5°C$.`, s: `$-2 + 7 = 5°C$.`, d: 'van_dung' },
    { c: `Tìm số nguyên $x$ biết $-5 < x < 3$.`, a: `$x \\in \\{-4, -3, -2, -1, 0, 1, 2\\}$.`, s: `$7$ số nguyên thoả mãn: từ $-4$ đến $2$.`, d: 'van_dung' },
    { c: `Sắp xếp $|{-5}|, |3|, |{-1}|, |0|$ theo thứ tự giảm dần.`, a: `$5, 3, 1, 0$.`, s: `GTTĐ: $5, 3, 1, 0$. Giảm dần: $5 > 3 > 1 > 0$.`, d: 'van_dung_cao' },
    { c: `Tìm $x \\in \\mathbb{Z}$ biết $|x - 1| = 3$.`, a: `$x = 4$ hoặc $x = -2$.`, s: `$x - 1 = 3 \\Rightarrow x = 4$. $x - 1 = -3 \\Rightarrow x = -2$.`, d: 'van_dung_cao' },
  ]},
  { id: '85ecf00e-8022-47ca-beab-103d2beef8f6', p: 'T6-C4B18', t: 'hinh_hoc', q: [
    { c: `Tam giác đều có đặc điểm gì?`, a: `$3$ cạnh bằng nhau, $3$ góc bằng $60°$.`, s: `Tam giác đều: $3$ cạnh bằng nhau, mỗi góc $= 60°$.`, d: 'nhan_biet' },
    { c: `Hình vuông có đặc điểm gì?`, a: `$4$ cạnh bằng nhau, $4$ góc vuông.`, s: `Hình vuông: $4$ cạnh bằng nhau, $4$ góc $= 90°$.`, d: 'nhan_biet' },
    { c: `Lục giác đều có bao nhiêu cạnh bằng nhau?`, a: `$6$ cạnh bằng nhau.`, s: `Lục giác đều: $6$ cạnh bằng nhau, $6$ góc bằng nhau ($120°$ mỗi góc).`, d: 'nhan_biet' },
    { c: `Chu vi tam giác đều cạnh $5$ cm?`, a: `$15$ cm.`, s: `$C = 3 \\times 5 = 15$ cm.`, d: 'thong_hieu' },
    { c: `Chu vi hình vuông cạnh $7$ cm?`, a: `$28$ cm.`, s: `$C = 4 \\times 7 = 28$ cm.`, d: 'thong_hieu' },
    { c: `Chu vi lục giác đều cạnh $4$ cm?`, a: `$24$ cm.`, s: `$C = 6 \\times 4 = 24$ cm.`, d: 'thong_hieu' },
    { c: `Diện tích hình vuông cạnh $6$ cm?`, a: `$36$ cm².`, s: `$S = 6^2 = 36$ cm².`, d: 'van_dung' },
    { c: `Hình vuông có chu vi $20$ cm. Tính cạnh và diện tích.`, a: `Cạnh $5$ cm, $S = 25$ cm².`, s: `$a = \\frac{20}{4} = 5$ cm. $S = 25$ cm².`, d: 'van_dung' },
    { c: `Ghép $6$ tam giác đều cạnh $a$ thành lục giác đều. Đúng không?`, a: `Đúng.`, s: `Lục giác đều chia thành $6$ tam giác đều bằng nhau có chung đỉnh ở tâm.`, d: 'van_dung_cao' },
    { c: `Nêu $3$ ví dụ về hình lục giác đều trong thực tế.`, a: `Tổ ong, đai ốc, gạch lát nền.`, s: `Tổ ong (tiết diện hình lục giác đều), đai ốc (bu-lông), gạch lát nền hình lục giác.`, d: 'van_dung_cao' },
  ]},
  { id: 'c7bfe0a1-9a55-4666-91da-1fa4238290a4', p: 'T6-C5B21', t: 'hinh_hoc', q: [
    { c: `Hình có trục đối xứng là gì?`, a: `Hình gấp đôi theo trục thì hai phần trùng nhau.`, s: `Nếu gấp hình theo đường thẳng $d$ mà hai phần trùng khít nhau thì $d$ là trục đối xứng.`, d: 'nhan_biet' },
    { c: `Hình tròn có bao nhiêu trục đối xứng?`, a: `Vô số.`, s: `Mọi đường kính đều là trục đối xứng → vô số trục.`, d: 'nhan_biet' },
    { c: `Hình vuông có bao nhiêu trục đối xứng?`, a: `$4$.`, s: `$2$ đường chéo + $2$ đường trung trực các cạnh $= 4$ trục.`, d: 'nhan_biet' },
    { c: `Tam giác đều có mấy trục đối xứng?`, a: `$3$.`, s: `$3$ đường trung trực (cũng là đường cao, trung tuyến, phân giác).`, d: 'thong_hieu' },
    { c: `Hình chữ nhật (không vuông) có mấy trục đối xứng?`, a: `$2$.`, s: `$2$ đường trung trực nối trung điểm hai cạnh đối.`, d: 'thong_hieu' },
    { c: `Chữ cái nào có trục đối xứng: A, B, F, H, M?`, a: `A, B, H, M.`, s: `$A$: trục dọc. $B$: trục ngang. $H$: cả dọc và ngang. $M$: trục dọc. $F$: không có.`, d: 'thong_hieu' },
    { c: `Hình bình hành (không phải HCN) có trục đối xứng không?`, a: `Không.`, s: `Hình bình hành thường không có trục đối xứng (nhưng có tâm đối xứng).`, d: 'van_dung' },
    { c: `Lục giác đều có mấy trục đối xứng?`, a: `$6$.`, s: `$3$ đường chéo chính + $3$ đường nối trung điểm cạnh đối $= 6$ trục.`, d: 'van_dung' },
    { c: `Vẽ hình đối xứng của điểm $A(3; 2)$ qua trục $Ox$.`, a: `$A'(3; -2)$.`, s: `Đối xứng qua $Ox$: giữ $x$, đổi dấu $y$. $A'(3; -2)$.`, d: 'van_dung_cao' },
    { c: `Hình thoi có mấy trục đối xứng?`, a: `$2$.`, s: `$2$ đường chéo là $2$ trục đối xứng.`, d: 'van_dung_cao' },
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
