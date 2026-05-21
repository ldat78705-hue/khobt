const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const U = '8316c34e-765d-4b8c-9364-b683a17e33f8', G = 6;

const B = [
  { id: '194d9d53-56c4-4aeb-9139-0a2335921e5b', p: 'T6-C4B20', t: 'hinh_hoc', q: [
    { c: `Tính chu vi hình chữ nhật có chiều dài $12$ cm, chiều rộng $8$ cm.`, a: `$40$ cm.`, s: `$C = 2(12 + 8) = 2 \\times 20 = 40$ cm.`, d: 'nhan_biet' },
    { c: `Tính diện tích hình vuông có cạnh $7$ cm.`, a: `$49\\; cm^2$.`, s: `$S = 7^2 = 49\\; cm^2$.`, d: 'nhan_biet' },
    { c: `Tính diện tích hình thang có đáy lớn $10$ cm, đáy nhỏ $6$ cm, chiều cao $5$ cm.`, a: `$40\\; cm^2$.`, s: `$S = \\dfrac{(10+6) \\times 5}{2} = \\dfrac{80}{2} = 40\\; cm^2$.`, d: 'nhan_biet' },
    { c: `Hình chữ nhật có chu vi $36$ cm, chiều dài gấp đôi chiều rộng. Tính diện tích.`, a: `$72\\; cm^2$.`, s: `$2(d + r) = 36$, $d = 2r$. Suy ra $2(2r+r)=36 \\Rightarrow 6r=36 \\Rightarrow r=6$, $d=12$.\n$S = 12 \\times 6 = 72\\; cm^2$.`, d: 'thong_hieu' },
    { c: `Tính diện tích hình bình hành có đáy $15$ cm và chiều cao ứng với đáy đó bằng $8$ cm.`, a: `$120\\; cm^2$.`, s: `$S = 15 \\times 8 = 120\\; cm^2$.`, d: 'thong_hieu' },
    { c: `Hình thoi có hai đường chéo $d_1 = 10$ cm, $d_2 = 24$ cm. Tính diện tích và cạnh.`, a: `$S = 120\\; cm^2$, cạnh $= 13$ cm.`, s: `$S = \\dfrac{d_1 \\times d_2}{2} = \\dfrac{10 \\times 24}{2} = 120\\; cm^2$.\nNửa đường chéo: $5$ và $12$. Cạnh $= \\sqrt{5^2+12^2} = \\sqrt{169} = 13$ cm.`, d: 'thong_hieu' },
    { c: `Một mảnh đất hình chữ nhật $25$ m $\\times$ $18$ m. Người ta đào ở giữa một hồ vuông cạnh $6$ m. Tính diện tích phần đất còn lại.`, a: `$414\\; m^2$.`, s: `$S_{\\text{đất}} = 25 \\times 18 - 6^2 = 450 - 36 = 414\\; m^2$.`, d: 'van_dung' },
    { c: `Hình chữ nhật có diện tích $180\\; cm^2$. Nếu tăng chiều dài thêm $3$ cm và giảm chiều rộng $2$ cm thì diện tích không đổi. Tìm kích thước ban đầu.`, a: `Chiều dài $15$ cm, rộng $12$ cm.`, s: `$dr = 180$ và $(d+3)(r-2) = 180$.\n$dr + 3r - 2d - 6 = 180 \\Rightarrow 3r - 2d = 6$.\n$r = \\frac{180}{d}$, thay vào: $\\frac{540}{d} - 2d = 6 \\Rightarrow 540 - 2d^2 = 6d \\Rightarrow 2d^2 + 6d - 540 = 0 \\Rightarrow d^2 + 3d - 270 = 0$.\n$(d+18)(d-15) = 0 \\Rightarrow d = 15$, $r = 12$.`, d: 'van_dung' },
    { c: `Hình vuông có cạnh $a$. Nếu tăng cạnh thêm $20\\%$ thì diện tích tăng bao nhiêu phần trăm?`, a: `Tăng $44\\%$.`, s: `Cạnh mới: $1{,}2a$. $S_{\\text{mới}} = (1{,}2a)^2 = 1{,}44a^2$.\nTăng: $\\dfrac{1{,}44a^2 - a^2}{a^2} = 0{,}44 = 44\\%$.`, d: 'van_dung_cao' },
    { c: `Hình chữ nhật $ABCD$ có $AB = 12$ cm, $BC = 9$ cm. $M$ là trung điểm $AB$. Tính diện tích tam giác $MCD$.`, a: `$54\\; cm^2$.`, s: `$S_{MCD} = S_{ABCD} - S_{MAD} - S_{MBC}$.\n$S_{ABCD} = 108$. $S_{MAD} = \\frac{1}{2} \\times 6 \\times 9 = 27$. $S_{MBC} = \\frac{1}{2} \\times 6 \\times 9 = 27$.\n$S_{MCD} = 108 - 27 - 27 = 54\\; cm^2$.`, d: 'van_dung_cao' },
  ]},
  { id: '2a3c4ae3-2153-40c3-9cb8-47b4395f4991', p: 'T6-C5B22', t: 'hinh_hoc', q: [
    { c: `Chữ cái nào sau đây có tâm đối xứng: O, H, N, A, S?`, a: `O, H, N, S.`, s: `- O: có tâm đối xứng (tâm chữ O) ✓\n- H: có tâm đối xứng (giao hai nét) ✓\n- N: có tâm đối xứng ✓\n- A: chỉ có trục đối xứng, không có tâm ✗\n- S: có tâm đối xứng ✓`, d: 'nhan_biet' },
    { c: `Hình chữ nhật có mấy tâm đối xứng? Đó là điểm nào?`, a: `$1$ tâm đối xứng, là giao điểm hai đường chéo.`, s: `Hình chữ nhật có đúng $1$ tâm đối xứng là giao điểm hai đường chéo.`, d: 'nhan_biet' },
    { c: `Hình bình hành có tâm đối xứng không? Giải thích.`, a: `Có. Tâm đối xứng là giao hai đường chéo.`, s: `Trong hình bình hành, giao điểm hai đường chéo là trung điểm mỗi đường chéo. Qua điểm này, mỗi đỉnh đối xứng với đỉnh đối diện. Vậy đó là tâm đối xứng.`, d: 'nhan_biet' },
    { c: `Cho đoạn thẳng $AB$. Tìm điểm đối xứng của $A$ qua trung điểm $M$ của $AB$.`, a: `Đó là điểm $B$.`, s: `$M$ là trung điểm $AB$ nên $MA = MB$. Điểm đối xứng của $A$ qua $M$ là $B$.`, d: 'thong_hieu' },
    { c: `Hình nào sau đây vừa có tâm đối xứng vừa có trục đối xứng: hình vuông, hình bình hành, hình thang cân?`, a: `Hình vuông.`, s: `- Hình vuông: có $4$ trục đối xứng và $1$ tâm đối xứng ✓\n- Hình bình hành: có tâm nhưng không có trục đối xứng (trừ khi là HCN)\n- Hình thang cân: có trục nhưng không có tâm đối xứng`, d: 'thong_hieu' },
    { c: `Vẽ hình đối xứng của tam giác $ABC$ qua tâm $O$ (cho $O$ nằm ngoài tam giác). Mô tả cách vẽ.`, a: `Vẽ $A', B', C'$ đối xứng từng đỉnh qua $O$.`, s: `Với mỗi đỉnh, nối với $O$ rồi kéo dài qua $O$ một đoạn bằng khoảng cách từ đỉnh đến $O$.\n$OA' = OA$, $OB' = OB$, $OC' = OC$ với $O$ là trung điểm $AA'$, $BB'$, $CC'$.`, d: 'thong_hieu' },
    { c: `Chứng minh rằng nếu hình có hai trục đối xứng vuông góc thì hình đó có tâm đối xứng.`, a: `Tâm đối xứng là giao của hai trục.`, s: `Gọi $O$ là giao hai trục vuông góc. Với điểm $M$ bất kỳ thuộc hình, phép đối xứng trục lần lượt qua hai trục biến $M$ thành $M'$ sao cho $O$ là trung điểm $MM'$. Vậy $O$ là tâm đối xứng.`, d: 'van_dung' },
    { c: `Hình lục giác đều có bao nhiêu tâm đối xứng và bao nhiêu trục đối xứng?`, a: `$1$ tâm, $6$ trục.`, s: `Hình lục giác đều có:\n- $1$ tâm đối xứng (tâm hình)\n- $6$ trục đối xứng ($3$ trục qua đỉnh đối diện, $3$ trục qua trung điểm cạnh đối diện)`, d: 'van_dung' },
    { c: `Tìm tất cả các chữ số (kiểu đồng hồ số) có tâm đối xứng.`, a: `$0, 8$.`, s: `Trong các chữ số hiển thị kiểu LED: $0$ và $8$ có tâm đối xứng. Số $1, 2, 3, 4, 5, 6, 7, 9$ không có tâm đối xứng.`, d: 'van_dung_cao' },
    { c: `Cho hình vuông $ABCD$ tâm $O$. Chứng minh rằng tam giác $OAB$ bằng tam giác $OCD$.`, a: `Dùng tính đối xứng tâm.`, s: `$O$ là tâm đối xứng. $A$ đối xứng với $C$, $B$ đối xứng với $D$ qua $O$.\nNên $OA = OC$, $OB = OD$, $AB = CD$ (cạnh hình vuông).\nVậy $\\triangle OAB = \\triangle OCD$ (c.c.c). $\\blacksquare$`, d: 'van_dung_cao' },
  ]},
  { id: '2f1d95e4-231c-4067-8aaa-94394fe5fa0e', p: 'T6-C7B29', t: 'so_thap_phan', q: [
    { c: `Tính: $3{,}25 + 1{,}7$.`, a: `$4{,}95$`, s: `$3{,}25 + 1{,}70 = 4{,}95$.`, d: 'nhan_biet' },
    { c: `Tính: $5{,}03 - 2{,}8$.`, a: `$2{,}23$`, s: `$5{,}03 - 2{,}80 = 2{,}23$.`, d: 'nhan_biet' },
    { c: `Tính: $2{,}5 \\times 0{,}4$.`, a: `$1$`, s: `$2{,}5 \\times 0{,}4 = 1{,}00 = 1$.`, d: 'nhan_biet' },
    { c: `Tính: $7{,}2 : 0{,}8$.`, a: `$9$`, s: `$7{,}2 : 0{,}8 = 72 : 8 = 9$.`, d: 'thong_hieu' },
    { c: `Tính nhanh: $3{,}7 \\times 5{,}5 + 3{,}7 \\times 4{,}5$.`, a: `$37$`, s: `$= 3{,}7 \\times (5{,}5 + 4{,}5) = 3{,}7 \\times 10 = 37$.`, d: 'thong_hieu' },
    { c: `Viết phân số $\\dfrac{7}{8}$ dưới dạng số thập phân.`, a: `$0{,}875$`, s: `$7 : 8 = 0{,}875$.`, d: 'thong_hieu' },
    { c: `Tính: $0{,}1 + 0{,}01 + 0{,}001 + \\ldots$ (vô hạn).`, a: `$\\dfrac{1}{9}$`, s: `$S = \\dfrac{0{,}1}{1 - 0{,}1} = \\dfrac{0{,}1}{0{,}9} = \\dfrac{1}{9}$ (cấp số nhân vô hạn, $|q|<1$).`, d: 'van_dung' },
    { c: `Tìm $x$: $2{,}5x - 1{,}3 = 3{,}7$.`, a: `$x = 2$.`, s: `$2{,}5x = 3{,}7 + 1{,}3 = 5{,}0$. $x = 5 : 2{,}5 = 2$.`, d: 'van_dung' },
    { c: `Viết $0{,}\\overline{36}$ dưới dạng phân số tối giản.`, a: `$\\dfrac{4}{11}$`, s: `$x = 0{,}363636...$\n$100x = 36{,}3636...$\n$99x = 36 \\Rightarrow x = \\dfrac{36}{99} = \\dfrac{4}{11}$.`, d: 'van_dung_cao' },
    { c: `So sánh $0{,}\\overline{9}$ và $1$.`, a: `$0{,}\\overline{9} = 1$.`, s: `$x = 0{,}999...$\n$10x = 9{,}999...$\n$9x = 9 \\Rightarrow x = 1$.\nVậy $0{,}\\overline{9} = 1$.`, d: 'van_dung_cao' },
  ]},
  { id: 'bf9c99be-8921-4b4e-ba14-20440912d320', p: 'T6-C7B30', t: 'so_thap_phan', q: [
    { c: `Làm tròn $3{,}847$ đến hàng phần mười.`, a: `$3{,}8$`, s: `Chữ số hàng phần trăm là $4 < 5$, nên giữ nguyên hàng phần mười.\n$3{,}847 \\approx 3{,}8$.`, d: 'nhan_biet' },
    { c: `Làm tròn $12{,}965$ đến hàng phần trăm.`, a: `$12{,}97$`, s: `Chữ số hàng phần nghìn là $5 \\ge 5$, nên tăng hàng phần trăm lên $1$.\n$12{,}965 \\approx 12{,}97$.`, d: 'nhan_biet' },
    { c: `Ước lượng: $49{,}8 \\times 5{,}03$.`, a: `$\\approx 250$.`, s: `$49{,}8 \\approx 50$, $5{,}03 \\approx 5$. Ước lượng: $50 \\times 5 = 250$.`, d: 'nhan_biet' },
    { c: `Làm tròn $7{,}045$ đến hàng đơn vị.`, a: `$7$`, s: `Chữ số phần mười $= 0 < 5$ → giữ nguyên. $7{,}045 \\approx 7$.`, d: 'thong_hieu' },
    { c: `Ước lượng kết quả: $\\dfrac{198 \\times 31}{49}$.`, a: `$\\approx 120$.`, s: `$198 \\approx 200$, $31 \\approx 30$, $49 \\approx 50$.\n$\\dfrac{200 \\times 30}{50} = \\dfrac{6000}{50} = 120$.`, d: 'thong_hieu' },
    { c: `Một phép đo cho kết quả $15{,}236$ m. Làm tròn đến cm.`, a: `$15{,}24$ m.`, s: `Hàng mm ($= $ hàng phần nghìn mét) là $6 \\ge 5$ → tăng hàng cm.\n$15{,}236 \\approx 15{,}24$ m.`, d: 'thong_hieu' },
    { c: `Ước lượng: $\\sqrt{50}$.`, a: `$\\approx 7{,}1$.`, s: `$7^2 = 49$, $7{,}1^2 = 50{,}41$. Vì $50$ gần $49$ hơn nên $\\sqrt{50} \\approx 7{,}07 \\approx 7{,}1$.`, d: 'van_dung' },
    { c: `Làm tròn rồi ước lượng: $(3{,}14 \\times 7{,}8^2)$.`, a: `$\\approx 192$.`, s: `$3{,}14 \\approx 3$, $7{,}8 \\approx 8$. $3 \\times 64 = 192$.\nGiá trị chính xác: $3{,}14 \\times 60{,}84 \\approx 191$.`, d: 'van_dung' },
    { c: `Giải thích tại sao làm tròn có thể gây sai số lớn khi nhân nhiều số.`, a: `Sai số tích lũy.`, s: `Khi nhân $n$ số, mỗi số có sai số $\\varepsilon$, sai số tổng cộng có thể lên tới khoảng $n\\varepsilon$ (tương đối). Ví dụ: $1{,}5^{10} = 57{,}67$ nhưng $2^{10} = 1024$ → sai rất lớn nếu làm tròn $1{,}5$ thành $2$.`, d: 'van_dung_cao' },
    { c: `Tính gần đúng $\\pi$ bằng phân số $\\dfrac{355}{113}$. So sánh sai số với $\\dfrac{22}{7}$.`, a: `$\\dfrac{355}{113}$ chính xác hơn.`, s: `$\\dfrac{22}{7} = 3{,}142857...$ → sai số $\\approx 0{,}0013$.\n$\\dfrac{355}{113} = 3{,}1415929...$ → sai số $\\approx 0{,}0000003$.\nVậy $\\dfrac{355}{113}$ chính xác gấp hàng nghìn lần.`, d: 'van_dung_cao' },
  ]},
];

async function main() {
  let total = 0;
  for (const b of B) {
    console.log('=== ' + b.p + ' ===');
    let c = 0;
    for (const q of b.q) {
      const code = b.p + '-' + String(c+1).padStart(3,'0');
      await sql`INSERT INTO public.questions (content,answer,solution,grade,topic,difficulty,question_type,category_id,status,is_public,question_code,user_id) VALUES (${q.c},${q.a},${q.s},${G},${b.t},${q.d},'tu_luan',${b.id},'approved',true,${code},${U})`;
      c++; console.log('OK: '+code);
    }
    total += c;
  }
  console.log('Total: '+total);
}
main().catch(console.error);
