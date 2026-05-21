const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const U = '8316c34e-765d-4b8c-9364-b683a17e33f8';

const B = [
  // ======== G4 - Bài 63. Phép nhân phân số ========
  { id: '852ff6cd-36f5-4aa4-a701-b49056b573eb', p: 'T4-B63', g: 4, t: 'dai_so', q: [
    { c: `Muốn nhân hai phân số ta làm thế nào?`, a: `Nhân tử với tử, mẫu với mẫu.`, s: `$\\frac{a}{b} \\times \\frac{c}{d} = \\frac{a \\times c}{b \\times d}$.`, d: 'nhan_biet' },
    { c: `Tính: $\\frac{2}{3} \\times \\frac{4}{5}$.`, a: `$\\frac{8}{15}$.`, s: `$\\frac{2 \\times 4}{3 \\times 5} = \\frac{8}{15}$.`, d: 'nhan_biet' },
    { c: `Tính: $\\frac{1}{4} \\times \\frac{3}{7}$.`, a: `$\\frac{3}{28}$.`, s: `$\\frac{1 \\times 3}{4 \\times 7} = \\frac{3}{28}$.`, d: 'nhan_biet' },
    { c: `Tính: $\\frac{5}{6} \\times \\frac{3}{10}$.`, a: `$\\frac{1}{4}$.`, s: `$\\frac{5 \\times 3}{6 \\times 10} = \\frac{15}{60} = \\frac{1}{4}$.`, d: 'thong_hieu' },
    { c: `Tính: $\\frac{3}{4} \\times 8$.`, a: `$6$.`, s: `$\\frac{3}{4} \\times \\frac{8}{1} = \\frac{24}{4} = 6$.`, d: 'thong_hieu' },
    { c: `Tính: $\\frac{2}{5} \\times \\frac{5}{2}$.`, a: `$1$.`, s: `$\\frac{2 \\times 5}{5 \\times 2} = \\frac{10}{10} = 1$.`, d: 'thong_hieu' },
    { c: `Sợi dây dài $\\frac{3}{4}$ m. Cắt $\\frac{2}{3}$ sợi dây. Đoạn cắt dài bao nhiêu m?`, a: `$\\frac{1}{2}$ m.`, s: `$\\frac{2}{3} \\times \\frac{3}{4} = \\frac{6}{12} = \\frac{1}{2}$ m.`, d: 'van_dung' },
    { c: `HCN có chiều dài $\\frac{3}{5}$ m, rộng $\\frac{1}{3}$ m. Tính diện tích.`, a: `$\\frac{1}{5}$ m².`, s: `$S = \\frac{3}{5} \\times \\frac{1}{3} = \\frac{3}{15} = \\frac{1}{5}$ m².`, d: 'van_dung' },
    { c: `Tính: $\\frac{1}{2} \\times \\frac{2}{3} \\times \\frac{3}{4}$.`, a: `$\\frac{1}{4}$.`, s: `$\\frac{1 \\times 2 \\times 3}{2 \\times 3 \\times 4} = \\frac{6}{24} = \\frac{1}{4}$.`, d: 'van_dung_cao' },
    { c: `Tìm $x$: $\\frac{2}{5} \\times x = \\frac{6}{25}$.`, a: `$x = \\frac{3}{5}$.`, s: `$x = \\frac{6}{25} : \\frac{2}{5} = \\frac{6}{25} \\times \\frac{5}{2} = \\frac{30}{50} = \\frac{3}{5}$.`, d: 'van_dung_cao' },
  ]},
  // ======== G4 - Bài 68. Ôn tập số tự nhiên ========
  { id: '3839aa20-e502-4736-a0e0-b20e1205074d', p: 'T4-B68', g: 4, t: 'dai_so', q: [
    { c: `Số tự nhiên bé nhất là bao nhiêu?`, a: `$0$.`, s: `$\\mathbb{N} = \\{0, 1, 2, 3, \\ldots\\}$. Nhỏ nhất: $0$.`, d: 'nhan_biet' },
    { c: `Có số tự nhiên lớn nhất không?`, a: `Không.`, s: `Dãy số tự nhiên vô hạn, không có số lớn nhất.`, d: 'nhan_biet' },
    { c: `Hai số tự nhiên liên tiếp hơn kém nhau bao nhiêu?`, a: `$1$.`, s: `VD: $5$ và $6$ hơn kém $1$.`, d: 'nhan_biet' },
    { c: `Tính: $357 \\times 24$.`, a: `$8\\,568$.`, s: `$357 \\times 20 = 7\\,140$. $357 \\times 4 = 1\\,428$. $7\\,140 + 1\\,428 = 8\\,568$.`, d: 'thong_hieu' },
    { c: `Tính: $7\\,854 : 6$.`, a: `$1\\,309$.`, s: `$7\\,854 : 6 = 1\\,309$. Kiểm tra: $1\\,309 \\times 6 = 7\\,854$ ✓.`, d: 'thong_hieu' },
    { c: `Tìm $x$: $x \\times 15 = 4\\,500$.`, a: `$x = 300$.`, s: `$x = 4\\,500 : 15 = 300$.`, d: 'thong_hieu' },
    { c: `Cửa hàng có $1\\,250$ quyển vở, bán $\\frac{3}{5}$ số vở. Đã bán bao nhiêu quyển?`, a: `$750$ quyển.`, s: `$\\frac{3}{5} \\times 1\\,250 = 750$ quyển.`, d: 'van_dung' },
    { c: `Tính nhanh: $25 \\times 36$.`, a: `$900$.`, s: `$25 \\times 36 = 25 \\times 4 \\times 9 = 100 \\times 9 = 900$.`, d: 'van_dung' },
    { c: `Tìm ƯCLN$(12, 18)$.`, a: `$6$.`, s: `$12 = 2^2 \\times 3$. $18 = 2 \\times 3^2$. ƯCLN $= 2 \\times 3 = 6$.`, d: 'van_dung_cao' },
    { c: `Tìm số dư khi chia $2\\,024$ cho $7$.`, a: `$1$.`, s: `$2\\,024 : 7 = 289$ dư $1$. Kiểm tra: $289 \\times 7 = 2\\,023$. $2\\,024 - 2\\,023 = 1$.`, d: 'van_dung_cao' },
  ]},
  // ======== G4 - Bài 7. Góc, đơn vị đo góc ========
  { id: 'aef5cd83-ae6c-4be2-acda-ae5706c53f15', p: 'T4-B7', g: 4, t: 'hinh_hoc', q: [
    { c: `Góc là gì?`, a: `Hai tia chung gốc tạo thành một góc.`, s: `Góc gồm đỉnh (gốc chung) và hai cạnh (hai tia).`, d: 'nhan_biet' },
    { c: `Đơn vị đo góc thông dụng là gì?`, a: `Độ (kí hiệu: $°$).`, s: `Đơn vị: độ ($°$).`, d: 'nhan_biet' },
    { c: `Góc vuông bằng bao nhiêu độ?`, a: `$90°$.`, s: `Góc vuông $= 90°$.`, d: 'nhan_biet' },
    { c: `Góc bẹt bằng bao nhiêu độ?`, a: `$180°$.`, s: `Góc bẹt $= 180°$ (hai tia đối nhau).`, d: 'thong_hieu' },
    { c: `Góc nhọn nằm trong khoảng nào?`, a: `$0° < $ góc nhọn $< 90°$.`, s: `Góc nhọn nhỏ hơn $90°$.`, d: 'thong_hieu' },
    { c: `Góc tù nằm trong khoảng nào?`, a: `$90° < $ góc tù $< 180°$.`, s: `Góc tù lớn hơn $90°$ và nhỏ hơn $180°$.`, d: 'thong_hieu' },
    { c: `Kim đồng hồ chỉ $3$ giờ đúng. Hai kim tạo góc bao nhiêu độ?`, a: `$90°$.`, s: `$12$ và $3$: $\\frac{1}{4}$ vòng $= 90°$.`, d: 'van_dung' },
    { c: `Kim đồng hồ chỉ $6$ giờ đúng. Hai kim tạo góc gì?`, a: `Góc bẹt ($180°$).`, s: `$12$ và $6$: $\\frac{1}{2}$ vòng $= 180°$.`, d: 'van_dung' },
    { c: `Hình tam giác có $3$ góc nhọn là tam giác gì?`, a: `Tam giác nhọn.`, s: `$3$ góc đều nhỏ hơn $90°$: tam giác nhọn.`, d: 'van_dung_cao' },
    { c: `Tổng $3$ góc trong tam giác bằng bao nhiêu?`, a: `$180°$.`, s: `Tính chất: Tổng ba góc trong một tam giác luôn bằng $180°$.`, d: 'van_dung_cao' },
  ]},
  // ======== G5 - Bài 1: Ôn tập số tự nhiên ========
  { id: 'a23198c9-114e-46ff-bc2b-0b666ddd5de4', p: 'T5-B1', g: 5, t: 'dai_so', q: [
    { c: `Viết các số tự nhiên từ $0$ đến $5$.`, a: `$0, 1, 2, 3, 4, 5$.`, s: `$\\mathbb{N} = \\{0, 1, 2, 3, 4, 5, \\ldots\\}$.`, d: 'nhan_biet' },
    { c: `Số chẵn là gì? Cho ví dụ.`, a: `Số chia hết cho $2$. VD: $0, 2, 4, 6, 8$.`, s: `Chữ số tận cùng: $0, 2, 4, 6, 8$.`, d: 'nhan_biet' },
    { c: `Số lẻ là gì? Cho ví dụ.`, a: `Số không chia hết cho $2$. VD: $1, 3, 5, 7, 9$.`, s: `Chữ số tận cùng: $1, 3, 5, 7, 9$.`, d: 'nhan_biet' },
    { c: `Dấu hiệu chia hết cho $5$?`, a: `Chữ số tận cùng $0$ hoặc $5$.`, s: `VD: $15, 20, 25$ chia hết cho $5$.`, d: 'thong_hieu' },
    { c: `Dấu hiệu chia hết cho $9$?`, a: `Tổng các chữ số chia hết cho $9$.`, s: `VD: $279$: $2+7+9=18$ chia hết cho $9$ ✓.`, d: 'thong_hieu' },
    { c: `Số $4\\,536$ có chia hết cho $3$ không?`, a: `Có.`, s: `$4+5+3+6 = 18$. $18 : 3 = 6$ ✓. Chia hết cho $3$.`, d: 'thong_hieu' },
    { c: `Tìm số tự nhiên chẵn nhỏ nhất có $4$ chữ số.`, a: `$1\\,000$.`, s: `Nhỏ nhất $4$ chữ số: $1\\,000$. Chẵn (tận cùng $0$) ✓.`, d: 'van_dung' },
    { c: `Tìm chữ số $a$ để $\\overline{35a}$ chia hết cho $3$.`, a: `$a \\in \\{1, 4, 7\\}$.`, s: `$3+5+a = 8+a$ chia hết cho $3$. $a = 1$ ($9$), $a = 4$ ($12$), $a = 7$ ($15$).`, d: 'van_dung' },
    { c: `Liệt kê các số nguyên tố nhỏ hơn $20$.`, a: `$2, 3, 5, 7, 11, 13, 17, 19$.`, s: `$8$ số nguyên tố nhỏ hơn $20$.`, d: 'van_dung_cao' },
    { c: `Phân tích $60$ ra thừa số nguyên tố.`, a: `$60 = 2^2 \\times 3 \\times 5$.`, s: `$60 = 2 \\times 30 = 2 \\times 2 \\times 15 = 2^2 \\times 3 \\times 5$.`, d: 'van_dung_cao' },
  ]},
  // ======== G5 - Bài 25: Hình tam giác. Diện tích hình tam giác ========
  { id: '291d6a79-a192-413a-9178-d0c71f8ea1ee', p: 'T5-B25', g: 5, t: 'hinh_hoc', q: [
    { c: `Tam giác có mấy cạnh, mấy đỉnh?`, a: `$3$ cạnh, $3$ đỉnh.`, s: `Tam giác $ABC$ có $3$ đỉnh ($A, B, C$) và $3$ cạnh ($AB, BC, CA$).`, d: 'nhan_biet' },
    { c: `CT tính diện tích tam giác?`, a: `$S = \\frac{a \\times h}{2}$.`, s: `$S = \\frac{\\text{đáy} \\times \\text{chiều cao}}{2}$.`, d: 'nhan_biet' },
    { c: `Tam giác đáy $8$ cm, chiều cao $5$ cm. Tính diện tích.`, a: `$20$ cm².`, s: `$S = \\frac{8 \\times 5}{2} = 20$ cm².`, d: 'nhan_biet' },
    { c: `Tam giác đáy $12$ cm, chiều cao $7$ cm. Tính diện tích.`, a: `$42$ cm².`, s: `$S = \\frac{12 \\times 7}{2} = 42$ cm².`, d: 'thong_hieu' },
    { c: `Tam giác vuông có hai cạnh góc vuông $6$ cm và $8$ cm. Tính diện tích.`, a: `$24$ cm².`, s: `Lấy $1$ cạnh góc vuông làm đáy, cạnh kia là chiều cao: $S = \\frac{6 \\times 8}{2} = 24$ cm².`, d: 'thong_hieu' },
    { c: `Tam giác $S = 36$ cm², đáy $9$ cm. Tính chiều cao.`, a: `$h = 8$ cm.`, s: `$h = \\frac{2S}{a} = \\frac{2 \\times 36}{9} = 8$ cm.`, d: 'thong_hieu' },
    { c: `Mảnh vườn tam giác đáy $15$ m, cao $8$ m. Tính diện tích.`, a: `$60$ m².`, s: `$S = \\frac{15 \\times 8}{2} = 60$ m².`, d: 'van_dung' },
    { c: `HCN dài $10$ cm, rộng $6$ cm. Kẻ đường chéo chia HCN thành $2$ tam giác. Tính $S$ mỗi tam giác.`, a: `$30$ cm².`, s: `$S_{HCN} = 60$ cm². Mỗi tam giác: $\\frac{60}{2} = 30$ cm².`, d: 'van_dung' },
    { c: `Tam giác đáy $14$ cm, $S = 63$ cm². Tính chiều cao.`, a: `$h = 9$ cm.`, s: `$h = \\frac{2 \\times 63}{14} = \\frac{126}{14} = 9$ cm.`, d: 'van_dung_cao' },
    { c: `Tam giác đều cạnh $6$ cm. Tính chu vi.`, a: `$18$ cm.`, s: `$C = 3 \\times 6 = 18$ cm.`, d: 'van_dung_cao' },
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
