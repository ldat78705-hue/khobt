const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const U = '8316c34e-765d-4b8c-9364-b683a17e33f8', G = 5, T = 'dai_so';

const B = [
  // ======== CĐ4 - Bài 19: Phép cộng STP ========
  { id: '88a5e557-aeca-476e-a3b2-38670d0d2588', p: 'T5-B19', q: [
    { c: `Tính: $2,5 + 3,4$.`, a: `$5,9$.`, s: `$2,5 + 3,4 = 5,9$.`, d: 'nhan_biet' },
    { c: `Tính: $15,6 + 4,08$.`, a: `$19,68$.`, s: `Đặt cột: $15,60 + 4,08 = 19,68$.`, d: 'nhan_biet' },
    { c: `Tính: $0,35 + 0,65$.`, a: `$1$.`, s: `$0,35 + 0,65 = 1,00 = 1$.`, d: 'thong_hieu' },
    { c: `Tính: $7,8 + 2,15 + 0,05$.`, a: `$10$.`, s: `$7,8 + 2,15 = 9,95$. $9,95 + 0,05 = 10$.`, d: 'thong_hieu' },
    { c: `Tìm $x$: $x - 3,5 = 2,8$.`, a: `$x = 6,3$.`, s: `$x = 2,8 + 3,5 = 6,3$.`, d: 'thong_hieu' },
    { c: `Mua $2,5$ kg cam giá $35\\,000$ đ/kg và $1,8$ kg quýt. Tổng cân nặng?`, a: `$4,3$ kg.`, s: `$2,5 + 1,8 = 4,3$ kg.`, d: 'van_dung' },
    { c: `Tính nhanh: $3,7 + 5,8 + 6,3 + 4,2$.`, a: `$20$.`, s: `$(3,7 + 6,3) + (5,8 + 4,2) = 10 + 10 = 20$.`, d: 'van_dung' },
    { c: `Đoạn đường $A$ dài $3,75$ km, đoạn $B$ dài hơn $A$ là $1,25$ km. Tổng hai đoạn?`, a: `$8,75$ km.`, s: `$B = 3,75 + 1,25 = 5$ km. Tổng: $3,75 + 5 = 8,75$ km.`, d: 'van_dung_cao' },
    { c: `Tính: $0,1 + 0,2 + 0,3 + ... + 0,9$.`, a: `$4,5$.`, s: `$(0,1 + 0,9) \\times 9 : 2 = 1 \\times 4,5 = 4,5$.`, d: 'van_dung_cao' },
    { c: `Tìm $a$ biết $a + 1,5 + 2,5 = 10$.`, a: `$a = 6$.`, s: `$1,5 + 2,5 = 4$. $a = 10 - 4 = 6$.`, d: 'van_dung' },
  ]},
  // ======== Bài 20: Phép trừ STP ========
  { id: '125a81c4-8d11-404c-81fc-b8e76125053f', p: 'T5-B20', q: [
    { c: `Tính: $8,6 - 3,2$.`, a: `$5,4$.`, s: `$8,6 - 3,2 = 5,4$.`, d: 'nhan_biet' },
    { c: `Tính: $10 - 4,75$.`, a: `$5,25$.`, s: `$10,00 - 4,75 = 5,25$.`, d: 'nhan_biet' },
    { c: `Tính: $15,8 - 7,36$.`, a: `$8,44$.`, s: `$15,80 - 7,36 = 8,44$.`, d: 'thong_hieu' },
    { c: `Tìm $x$: $x + 4,7 = 12,3$.`, a: `$x = 7,6$.`, s: `$x = 12,3 - 4,7 = 7,6$.`, d: 'thong_hieu' },
    { c: `Tính: $20,5 - 3,25 - 7,25$.`, a: `$10$.`, s: `$20,5 - 3,25 = 17,25$. $17,25 - 7,25 = 10$.`, d: 'thong_hieu' },
    { c: `Một sợi dây $8,4$ m. Cắt đi $3,75$ m. Còn bao nhiêu?`, a: `$4,65$ m.`, s: `$8,4 - 3,75 = 4,65$ m.`, d: 'van_dung' },
    { c: `Hùng cao $1,52$ m, Dũng cao $1,45$ m. Hùng cao hơn Dũng bao nhiêu?`, a: `$0,07$ m (hay $7$ cm).`, s: `$1,52 - 1,45 = 0,07$ m.`, d: 'van_dung' },
    { c: `Tính nhanh: $12,5 - 3,7 - 6,3$.`, a: `$2,5$.`, s: `$3,7 + 6,3 = 10$. $12,5 - 10 = 2,5$.`, d: 'van_dung_cao' },
    { c: `Tìm $x$: $15 - x = 8,64$.`, a: `$x = 6,36$.`, s: `$x = 15 - 8,64 = 6,36$.`, d: 'van_dung_cao' },
    { c: `Bình có $5$ lít nước. Đổ ra lần 1: $1,5$ lít, lần 2: $2,25$ lít. Còn?`, a: `$1,25$ lít.`, s: `$5 - 1,5 - 2,25 = 1,25$ lít.`, d: 'van_dung' },
  ]},
  // ======== Bài 21: Phép nhân STP ========
  { id: '421aaa27-bdd1-4cb1-a5d9-fa9c131075f1', p: 'T5-B21', q: [
    { c: `Tính: $2,5 \\times 3$.`, a: `$7,5$.`, s: `$2,5 \\times 3 = 7,5$.`, d: 'nhan_biet' },
    { c: `Tính: $1,4 \\times 0,6$.`, a: `$0,84$.`, s: `$14 \\times 6 = 84$. Có $2$ chữ số TP → $0,84$.`, d: 'nhan_biet' },
    { c: `Tính: $3,25 \\times 4$.`, a: `$13$.`, s: `$3,25 \\times 4 = 13,00 = 13$.`, d: 'thong_hieu' },
    { c: `Tính: $0,5 \\times 0,5$.`, a: `$0,25$.`, s: `$5 \\times 5 = 25$. $2$ chữ số TP → $0,25$.`, d: 'thong_hieu' },
    { c: `Tính: $2,4 \\times 1,5$.`, a: `$3,6$.`, s: `$24 \\times 15 = 360$. $2$ chữ số TP → $3,60 = 3,6$.`, d: 'thong_hieu' },
    { c: `$1$ m vải giá $45\\,500$ đồng. Mua $2,5$ m. Tính tiền.`, a: `$113\\,750$ đồng.`, s: `$45\\,500 \\times 2,5 = 113\\,750$ đồng.`, d: 'van_dung' },
    { c: `HCN dài $3,5$ cm, rộng $2,4$ cm. Tính diện tích.`, a: `$8,4\\text{ cm}^2$.`, s: `$S = 3,5 \\times 2,4 = 8,4\\text{ cm}^2$.`, d: 'van_dung' },
    { c: `Tính nhanh: $2,5 \\times 4 \\times 7,3$.`, a: `$73$.`, s: `$2,5 \\times 4 = 10$. $10 \\times 7,3 = 73$.`, d: 'van_dung_cao' },
    { c: `Tính: $0,25 \\times 3,7 \\times 40$.`, a: `$37$.`, s: `$0,25 \\times 40 = 10$. $10 \\times 3,7 = 37$.`, d: 'van_dung_cao' },
    { c: `Ô tô đi $42,5$ km/h trong $3,2$ giờ. Quãng đường?`, a: `$136$ km.`, s: `$S = 42,5 \\times 3,2 = 136$ km.`, d: 'van_dung' },
  ]},
  // ======== Bài 22: Phép chia STP ========
  { id: '5501e15b-66b4-4bb1-afd6-f00ba6ec2a4a', p: 'T5-B22', q: [
    { c: `Tính: $8,4 : 2$.`, a: `$4,2$.`, s: `$8,4 : 2 = 4,2$.`, d: 'nhan_biet' },
    { c: `Tính: $7,5 : 0,5$.`, a: `$15$.`, s: `$7,5 : 0,5 = 75 : 5 = 15$.`, d: 'nhan_biet' },
    { c: `Tính: $12,6 : 4$.`, a: `$3,15$.`, s: `$12,6 : 4 = 3,15$.`, d: 'thong_hieu' },
    { c: `Tính: $9 : 3,6$.`, a: `$2,5$.`, s: `$9 : 3,6 = 90 : 36 = 2,5$.`, d: 'thong_hieu' },
    { c: `Tìm $x$: $x \\times 0,4 = 3,2$.`, a: `$x = 8$.`, s: `$x = 3,2 : 0,4 = 32 : 4 = 8$.`, d: 'thong_hieu' },
    { c: `$27$ m vải chia đều $4$ người. Mỗi người bao nhiêu mét?`, a: `$6,75$ m.`, s: `$27 : 4 = 6,75$ m.`, d: 'van_dung' },
    { c: `HCN có $S = 18,6\\text{ cm}^2$, rộng $3$ cm. Tính dài.`, a: `$6,2$ cm.`, s: `Dài $= 18,6 : 3 = 6,2$ cm.`, d: 'van_dung' },
    { c: `Tính: $100 : 0,25$.`, a: `$400$.`, s: `$100 : 0,25 = 10\\,000 : 25 = 400$.`, d: 'van_dung_cao' },
    { c: `Mua $3,5$ kg cam hết $122\\,500$ đ. Giá $1$ kg?`, a: `$35\\,000$ đồng.`, s: `$122\\,500 : 3,5 = 35\\,000$ đồng.`, d: 'van_dung_cao' },
    { c: `Tính: $1 : 0,125$.`, a: `$8$.`, s: `$1 : 0,125 = 1\\,000 : 125 = 8$.`, d: 'van_dung_cao' },
  ]},
  // ======== Bài 23: Nhân, chia STP với 10, 100, ... ========
  { id: '9a65de80-be20-46e4-8056-aba12f71e9e5', p: 'T5-B23', q: [
    { c: `$3,456 \\times 10 = ?$`, a: `$34,56$.`, s: `Dời dấu phẩy sang phải $1$ chữ số.`, d: 'nhan_biet' },
    { c: `$0,78 \\times 100 = ?$`, a: `$78$.`, s: `Dời phải $2$ chữ số: $78$.`, d: 'nhan_biet' },
    { c: `$25,6 : 10 = ?$`, a: `$2,56$.`, s: `Dời dấu phẩy sang trái $1$ chữ số.`, d: 'nhan_biet' },
    { c: `$45 \\times 0,1 = ?$`, a: `$4,5$.`, s: `Nhân $0,1$ tương đương chia $10$: $45 : 10 = 4,5$.`, d: 'thong_hieu' },
    { c: `$8,3 : 0,01 = ?$`, a: `$830$.`, s: `Chia $0,01$ tương đương nhân $100$: $8,3 \\times 100 = 830$.`, d: 'thong_hieu' },
    { c: `$0,056 \\times 1\\,000 = ?$`, a: `$56$.`, s: `Dời phải $3$ chữ số: $56$.`, d: 'thong_hieu' },
    { c: `$250 \\times 0,01 = ?$`, a: `$2,5$.`, s: `Nhân $0,01$ = chia $100$: $250 : 100 = 2,5$.`, d: 'van_dung' },
    { c: `$7,5$ m $= ?$ cm.`, a: `$750$ cm.`, s: `$7,5 \\times 100 = 750$ cm.`, d: 'van_dung' },
    { c: `Tìm $x$: $x \\times 100 = 56,7$.`, a: `$x = 0,567$.`, s: `$x = 56,7 : 100 = 0,567$.`, d: 'van_dung_cao' },
    { c: `Tính nhanh: $3,6 \\times 100 : 10 \\times 0,1$.`, a: `$3,6$.`, s: `$\\times 100 : 10 \\times 0,1 = \\times 100 : 10 : 10 = \\times 1$. KQ $= 3,6$.`, d: 'van_dung_cao' },
  ]},
  // ======== Bài 24: LT chung CĐ4 ========
  { id: '0361c970-1c8e-4a19-8d30-1d5da5670885', p: 'T5-B24', q: [
    { c: `Tính: $6,7 + 3,8$.`, a: `$10,5$.`, s: `$6,7 + 3,8 = 10,5$.`, d: 'nhan_biet' },
    { c: `Tính: $15,2 - 8,75$.`, a: `$6,45$.`, s: `$15,20 - 8,75 = 6,45$.`, d: 'nhan_biet' },
    { c: `Tính: $4,5 \\times 0,6$.`, a: `$2,7$.`, s: `$45 \\times 6 = 270$. $2$ chữ số TP → $2,70 = 2,7$.`, d: 'thong_hieu' },
    { c: `Tính: $9,6 : 0,8$.`, a: `$12$.`, s: `$96 : 8 = 12$.`, d: 'thong_hieu' },
    { c: `Tính: $3,5 + 2,5 \\times 4$.`, a: `$13,5$.`, s: `Nhân trước: $2,5 \\times 4 = 10$. $3,5 + 10 = 13,5$.`, d: 'thong_hieu' },
    { c: `Tìm $x$: $x : 0,5 = 8,4$.`, a: `$x = 4,2$.`, s: `$x = 8,4 \\times 0,5 = 4,2$.`, d: 'van_dung' },
    { c: `Xe chạy $55,5$ km/h. Đi $2,4$ h. Quãng đường?`, a: `$133,2$ km.`, s: `$S = 55,5 \\times 2,4 = 133,2$ km.`, d: 'van_dung' },
    { c: `Tính nhanh: $6,5 \\times 3 + 6,5 \\times 7$.`, a: `$65$.`, s: `$6,5 \\times (3+7) = 6,5 \\times 10 = 65$.`, d: 'van_dung_cao' },
    { c: `Mua $3$ loại trái cây: $2,5$ kg cam ($30\\,000$ đ/kg), $1,5$ kg táo ($50\\,000$ đ/kg), $0,8$ kg nho ($80\\,000$ đ/kg). Tổng tiền?`, a: `$214\\,000$ đồng.`, s: `$75\\,000 + 75\\,000 + 64\\,000 = 214\\,000$ đồng.`, d: 'van_dung_cao' },
    { c: `Tính: $(8,4 - 3,2) \\times (5,6 + 4,4) : 2$.`, a: `$26$.`, s: `$5,2 \\times 10 : 2 = 52 : 2 = 26$.`, d: 'van_dung' },
  ]},
  // ======== CĐ5 - Bài 26: Hình thang. DT hình thang ========
  { id: '14c9eb86-0772-44f9-acd9-0f8557395c0c', p: 'T5-B26', t: 'hinh_hoc', q: [
    { c: `Hình thang có mấy cạnh?`, a: `$4$ cạnh.`, s: `Hình thang là tứ giác có $1$ cặp cạnh đối song song.`, d: 'nhan_biet' },
    { c: `Công thức tính DT hình thang?`, a: `$S = \\dfrac{(a + b) \\times h}{2}$.`, s: `$a, b$: đáy lớn, đáy bé; $h$: chiều cao.`, d: 'nhan_biet' },
    { c: `Hình thang đáy $8$ cm, $6$ cm, cao $5$ cm. Tính DT.`, a: `$35\\text{ cm}^2$.`, s: `$S = \\dfrac{(8+6) \\times 5}{2} = \\dfrac{70}{2} = 35\\text{ cm}^2$.`, d: 'nhan_biet' },
    { c: `Hình thang đáy $10$ cm, $4$ cm, cao $6$ cm. Tính DT.`, a: `$42\\text{ cm}^2$.`, s: `$S = \\dfrac{(10+4) \\times 6}{2} = 42\\text{ cm}^2$.`, d: 'thong_hieu' },
    { c: `Hình thang vuông đáy $12$ cm, $8$ cm, cạnh bên vuông góc $= 5$ cm. Tính DT.`, a: `$50\\text{ cm}^2$.`, s: `$h = 5$ cm. $S = \\dfrac{(12+8) \\times 5}{2} = 50\\text{ cm}^2$.`, d: 'thong_hieu' },
    { c: `HT có $S = 36\\text{ cm}^2$, chiều cao $6$ cm, đáy lớn $8$ cm. Tính đáy bé.`, a: `$4$ cm.`, s: `$a + b = 2S : h = 72 : 6 = 12$. Đáy bé $= 12 - 8 = 4$ cm.`, d: 'thong_hieu' },
    { c: `Mảnh đất hình thang đáy $25$ m, $15$ m, cao $12$ m. Tính DT.`, a: `$240\\text{ m}^2$.`, s: `$S = \\dfrac{(25+15) \\times 12}{2} = 240\\text{ m}^2$.`, d: 'van_dung' },
    { c: `HT có đáy lớn gấp đôi đáy bé, đáy bé $5$ cm, cao $8$ cm. Tính DT.`, a: `$60\\text{ cm}^2$.`, s: `Đáy lớn $= 10$ cm. $S = \\dfrac{(10+5) \\times 8}{2} = 60\\text{ cm}^2$.`, d: 'van_dung' },
    { c: `HT có $S = 54\\text{ cm}^2$, tổng hai đáy $= 18$ cm. Tính chiều cao.`, a: `$6$ cm.`, s: `$h = 2S : (a+b) = 108 : 18 = 6$ cm.`, d: 'van_dung_cao' },
    { c: `HCN dài $10$ cm, rộng $6$ cm. Cắt $1$ tam giác vuông ở góc (cạnh $3$ cm, $6$ cm). Phần còn lại là HT. Tính DT hình thang.`, a: `$51\\text{ cm}^2$.`, s: `$S_{HCN} = 60$. $S_{\\triangle} = \\dfrac{3 \\times 6}{2} = 9$. $S_{HT} = 60 - 9 = 51\\text{ cm}^2$.`, d: 'van_dung_cao' },
  ]},
];

async function main() {
  let total = 0;
  for (const b of B) {
    console.log('=== '+b.p+' ===');
    let c = 0;
    const topic = b.t || T;
    for (const q of b.q) {
      const code = b.p+'-'+String(c+1).padStart(3,'0');
      await sql`INSERT INTO public.questions (content,answer,solution,grade,topic,difficulty,question_type,category_id,status,is_public,question_code,user_id) VALUES (${q.c},${q.a},${q.s},${G},${topic},${q.d},'tu_luan',${b.id},'approved',true,${code},${U})`;
      c++; console.log('OK: '+code);
    }
    total += c;
  }
  console.log('Total inserted: '+total);
}
main().catch(console.error);
