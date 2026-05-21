const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const U = '8316c34e-765d-4b8c-9364-b683a17e33f8';

const B = [
  // ===== G6 Ôn tập chương I (Tập hợp các STN) =====
  { id: '6d45e172-f8ef-4dd7-89d9-7014a13df01e', p: 'T6-OTC1', g: 6, t: 'dai_so', q: [
    { c: `Viết tập hợp $A$ các số tự nhiên nhỏ hơn $6$.`, a: `$A = \\{0, 1, 2, 3, 4, 5\\}$.`, s: `Các STN $< 6$: $0, 1, 2, 3, 4, 5$.`, d: 'nhan_biet' },
    { c: `Tính: $25 \\times 4 \\times 8$.`, a: `$800$.`, s: `$25 \\times 4 = 100$. $100 \\times 8 = 800$.`, d: 'nhan_biet' },
    { c: `$2^5 = ?$`, a: `$32$.`, s: `$2^5 = 2 \\times 2 \\times 2 \\times 2 \\times 2 = 32$.`, d: 'nhan_biet' },
    { c: `Tìm $x$: $3x + 12 = 27$.`, a: `$x = 5$.`, s: `$3x = 15 \\Rightarrow x = 5$.`, d: 'thong_hieu' },
    { c: `Tính: $15 + 85 + 46 + 54$.`, a: `$200$.`, s: `$(15+85)+(46+54) = 100+100 = 200$.`, d: 'thong_hieu' },
    { c: `Tìm thương và dư: $157 : 11$.`, a: `Thương $14$, dư $3$.`, s: `$11 \\times 14 = 154$. $157 - 154 = 3$.`, d: 'thong_hieu' },
    { c: `Tính nhanh: $4 \\times 25 \\times 7 \\times 5$.`, a: `$3\\,500$.`, s: `$(4 \\times 25)(7 \\times 5) = 100 \\times 35 = 3\\,500$.`, d: 'van_dung' },
    { c: `Tìm $x \\in \\mathbb{N}$: $5 \\leq x \\leq 9$.`, a: `$x \\in \\{5, 6, 7, 8, 9\\}$.`, s: `$5$ giá trị.`, d: 'van_dung' },
    { c: `Tính: $2^3 \\times 5^3$.`, a: `$1\\,000$.`, s: `$(2 \\times 5)^3 = 10^3 = 1\\,000$.`, d: 'van_dung_cao' },
    { c: `Tìm $a$ biết $a : 13 = 5$ dư $7$.`, a: `$a = 72$.`, s: `$a = 13 \\times 5 + 7 = 72$.`, d: 'van_dung_cao' },
  ]},
  // ===== G6 Ôn tập chương II (Chia hết) =====
  { id: '2660ebe9-4fad-4be3-a73b-a450166316ce', p: 'T6-OTC2', g: 6, t: 'dai_so', q: [
    { c: `Nêu dấu hiệu chia hết cho $2$.`, a: `Chữ số tận cùng chẵn ($0, 2, 4, 6, 8$).`, s: `VD: $124$ chia hết cho $2$.`, d: 'nhan_biet' },
    { c: `Nêu dấu hiệu chia hết cho $3$.`, a: `Tổng các chữ số chia hết cho $3$.`, s: `VD: $123$: $1+2+3=6$ chia hết cho $3$ ✓.`, d: 'nhan_biet' },
    { c: `Số nguyên tố là gì?`, a: `Số $> 1$ chỉ có $2$ ước: $1$ và chính nó.`, s: `VD: $2, 3, 5, 7, 11, 13, \\ldots$`, d: 'nhan_biet' },
    { c: `Phân tích $36$ ra thừa số nguyên tố.`, a: `$36 = 2^2 \\times 3^2$.`, s: `$36 = 4 \\times 9 = 2^2 \\times 3^2$.`, d: 'thong_hieu' },
    { c: `Tìm ƯCLN$(24, 36)$.`, a: `$12$.`, s: `$24 = 2^3 \\times 3$. $36 = 2^2 \\times 3^2$. ƯCLN $= 2^2 \\times 3 = 12$.`, d: 'thong_hieu' },
    { c: `Tìm BCNN$(8, 12)$.`, a: `$24$.`, s: `$8 = 2^3$. $12 = 2^2 \\times 3$. BCNN $= 2^3 \\times 3 = 24$.`, d: 'thong_hieu' },
    { c: `Chia $24$ bút đỏ và $36$ bút xanh đều vào các hộp (mỗi hộp số bút bằng nhau). Nhiều nhất chia được mấy hộp?`, a: `$12$ hộp.`, s: `ƯCLN$(24,36) = 12$. Mỗi hộp: $2$ đỏ, $3$ xanh.`, d: 'van_dung' },
    { c: `Tìm số tự nhiên $x$ bé nhất sao cho $x$ chia hết cho cả $6$ và $8$.`, a: `$x = 24$.`, s: `BCNN$(6, 8) = 24$. Nhỏ nhất: $x = 24$.`, d: 'van_dung' },
    { c: `$n + 3$ chia hết cho $n + 1$. Tìm $n \\in \\mathbb{N}$.`, a: `$n \\in \\{0, 1\\}$.`, s: `$n+3 = (n+1)+2$. Cần $(n+1) | 2$. $n+1 \\in \\{1, 2\\}$. $n \\in \\{0, 1\\}$.`, d: 'van_dung_cao' },
    { c: `Tìm STN $a$ biết $a$ chia hết cho $12$, $a$ chia hết cho $18$ và $100 < a < 200$.`, a: `$a = 108$ hoặc $a = 144$ hoặc $a = 180$.`, s: `BCNN$(12,18) = 36$. Bội của $36$ trong $(100,200)$: $108, 144, 180$.`, d: 'van_dung_cao' },
  ]},
  // ===== G6 Ôn tập chương III (Số nguyên) =====
  { id: '518aeec1-fb2f-479c-94c1-59de0d70dee1', p: 'T6-OTC3', g: 6, t: 'dai_so', q: [
    { c: `Tính: $(-5) + 8$.`, a: `$3$.`, s: `$(-5) + 8 = 8 - 5 = 3$.`, d: 'nhan_biet' },
    { c: `Tính: $(-3) - 7$.`, a: `$-10$.`, s: `$(-3) - 7 = -3 + (-7) = -10$.`, d: 'nhan_biet' },
    { c: `Tính: $(-4) \\times (-6)$.`, a: `$24$.`, s: `Âm nhân âm bằng dương: $4 \\times 6 = 24$.`, d: 'nhan_biet' },
    { c: `Tính: $(-2)^3$.`, a: `$-8$.`, s: `$(-2)^3 = (-2) \\times (-2) \\times (-2) = 4 \\times (-2) = -8$.`, d: 'thong_hieu' },
    { c: `Sắp xếp tăng dần: $-5, 3, -1, 0, 7, -8$.`, a: `$-8, -5, -1, 0, 3, 7$.`, s: `Trên trục số từ trái sang phải.`, d: 'thong_hieu' },
    { c: `Tìm $x$: $|x| = 5$.`, a: `$x = 5$ hoặc $x = -5$.`, s: `GTTĐ $= 5$: $x = \\pm 5$.`, d: 'thong_hieu' },
    { c: `Tính: $(-15) + 20 + (-5)$.`, a: `$0$.`, s: `$-15 + 20 - 5 = 20 - 20 = 0$.`, d: 'van_dung' },
    { c: `Tìm $x$: $x + 7 = -3$.`, a: `$x = -10$.`, s: `$x = -3 - 7 = -10$.`, d: 'van_dung' },
    { c: `Tính: $(-3) \\times 5 \\times (-2)$.`, a: `$30$.`, s: `$(-3) \\times 5 = -15$. $(-15) \\times (-2) = 30$.`, d: 'van_dung_cao' },
    { c: `Tìm $x \\in \\mathbb{Z}$: $-3 < x < 4$ và $x$ chia hết cho $2$.`, a: `$x \\in \\{-2, 0, 2\\}$.`, s: `$x \\in \\{-2, -1, 0, 1, 2, 3\\}$. Chia hết cho $2$: $\\{-2, 0, 2\\}$.`, d: 'van_dung_cao' },
  ]},
  // ===== G6 Ôn tập chương IV (Hình phẳng) =====
  { id: '31c9b1ca-adfd-438d-8049-8a0b2d7233a9', p: 'T6-OTC4', g: 6, t: 'hinh_hoc', q: [
    { c: `Chu vi hình vuông cạnh $9$ cm?`, a: `$36$ cm.`, s: `$C = 4 \\times 9 = 36$ cm.`, d: 'nhan_biet' },
    { c: `Diện tích tam giác đều cạnh $6$ cm, chiều cao $5{,}2$ cm?`, a: `$15{,}6$ cm².`, s: `$S = \\frac{6 \\times 5{,}2}{2} = 15{,}6$ cm².`, d: 'nhan_biet' },
    { c: `Chu vi lục giác đều cạnh $5$ cm?`, a: `$30$ cm.`, s: `$C = 6 \\times 5 = 30$ cm.`, d: 'nhan_biet' },
    { c: `Diện tích hình vuông cạnh $11$ cm?`, a: `$121$ cm².`, s: `$S = 11^2 = 121$ cm².`, d: 'thong_hieu' },
    { c: `HCN có chu vi $30$ cm, dài $10$ cm. Tính rộng.`, a: `$5$ cm.`, s: `Rộng $= \\frac{30}{2} - 10 = 5$ cm.`, d: 'thong_hieu' },
    { c: `Hình thang có $2$ đáy $8$ cm, $12$ cm, cao $5$ cm. Tính diện tích.`, a: `$50$ cm².`, s: `$S = \\frac{(8+12) \\times 5}{2} = 50$ cm².`, d: 'thong_hieu' },
    { c: `Mảnh đất HCN dài $25$ m, rộng $18$ m. Tính diện tích (m²).`, a: `$450$ m².`, s: `$S = 25 \\times 18 = 450$ m².`, d: 'van_dung' },
    { c: `Viên gạch vuông cạnh $30$ cm. Lát sàn $3$ m × $4$ m. Cần bao nhiêu viên?`, a: `$\approx 134$ viên.`, s: `$S_{sàn} = 120\\,000$ cm². $S_{gạch} = 900$ cm². Cần $\\frac{120\\,000}{900} \\approx 134$ viên.`, d: 'van_dung' },
    { c: `Tam giác vuông có $2$ cạnh góc vuông $5$ cm, $12$ cm. Tính diện tích.`, a: `$30$ cm².`, s: `$S = \\frac{5 \\times 12}{2} = 30$ cm².`, d: 'van_dung_cao' },
    { c: `Hình vuông có diện tích $64$ cm². Tính cạnh và chu vi.`, a: `Cạnh $8$ cm, chu vi $32$ cm.`, s: `$a = \\sqrt{64} = 8$ cm. $C = 32$ cm.`, d: 'van_dung_cao' },
  ]},
  // ===== G6 Ôn tập chương V (Đối xứng) =====
  { id: 'f5d93d0b-b186-4788-b40f-fad46b58cb20', p: 'T6-OTC5', g: 6, t: 'hinh_hoc', q: [
    { c: `Hình có trục đối xứng là hình gì?`, a: `Hình gấp theo trục thì hai nửa trùng nhau.`, s: `Gấp theo đường thẳng $d$, hai phần trùng khít.`, d: 'nhan_biet' },
    { c: `Hình tròn có bao nhiêu trục đối xứng?`, a: `Vô số.`, s: `Mọi đường kính là trục đối xứng.`, d: 'nhan_biet' },
    { c: `Tam giác cân có mấy trục đối xứng?`, a: `$1$.`, s: `Đường trung trực đáy (đi qua đỉnh).`, d: 'thong_hieu' },
    { c: `Hình bình hành có trục đối xứng không?`, a: `Không (trừ HCN, hình thoi, hình vuông).`, s: `HBH thường chỉ có tâm đối xứng.`, d: 'thong_hieu' },
    { c: `Hình thoi có mấy trục đối xứng?`, a: `$2$.`, s: `$2$ đường chéo.`, d: 'thong_hieu' },
    { c: `Ngũ giác đều có mấy trục đối xứng?`, a: `$5$.`, s: `$5$ trục: mỗi trục qua $1$ đỉnh và trung điểm cạnh đối.`, d: 'van_dung' },
    { c: `Chữ cái nào có trục đối xứng: A, B, C, D, E?`, a: `A, B, C, D, E đều có.`, s: `$A$: trục dọc. $B, C, D, E$: trục ngang.`, d: 'van_dung' },
    { c: `Hình có tâm đối xứng là gì?`, a: `Quay $180°$ quanh tâm, hình trùng chính nó.`, s: `VD: HBH, hình tròn có tâm đối xứng.`, d: 'van_dung' },
    { c: `Hình chữ nhật có tâm đối xứng không?`, a: `Có (giao hai đường chéo).`, s: `Tâm = giao đường chéo. Quay $180°$ → trùng.`, d: 'van_dung_cao' },
    { c: `Hình nào vừa có trục đối xứng vừa có tâm đối xứng?`, a: `Hình vuông, HCN, hình tròn.`, s: `Hình vuông: $4$ trục + $1$ tâm. HCN: $2$ trục + $1$ tâm. Hình tròn: vô số trục + $1$ tâm.`, d: 'van_dung_cao' },
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
