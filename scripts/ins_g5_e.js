const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const U = '8316c34e-765d-4b8c-9364-b683a17e33f8', G = 5, T = 'dai_so';

const B = [
  // ======== Bài 27: Đường tròn. Chu vi và DT hình tròn ========
  { id: '8d922880-2370-4179-a87c-b2ebf0ef6b23', p: 'T5-B27', t: 'hinh_hoc', q: [
    { c: `Đường kính hình tròn $= 10$ cm. Bán kính $= ?$`, a: `$5$ cm.`, s: `$r = d : 2 = 10 : 2 = 5$ cm.`, d: 'nhan_biet' },
    { c: `Công thức chu vi hình tròn?`, a: `$C = d \\times \\pi$ hoặc $C = 2 \\times r \\times \\pi$.`, s: `$\\pi \\approx 3,14$.`, d: 'nhan_biet' },
    { c: `Tính chu vi hình tròn có $d = 6$ cm.`, a: `$18,84$ cm.`, s: `$C = 6 \\times 3,14 = 18,84$ cm.`, d: 'thong_hieu' },
    { c: `Tính DT hình tròn có $r = 5$ cm.`, a: `$78,5\\text{ cm}^2$.`, s: `$S = r \\times r \\times \\pi = 5 \\times 5 \\times 3,14 = 78,5\\text{ cm}^2$.`, d: 'thong_hieu' },
    { c: `Hình tròn có $d = 8$ cm. Tính DT.`, a: `$50,24\\text{ cm}^2$.`, s: `$r = 4$ cm. $S = 4 \\times 4 \\times 3,14 = 50,24\\text{ cm}^2$.`, d: 'thong_hieu' },
    { c: `Bánh xe có $d = 50$ cm. Xe lăn $1$ vòng đi được bao xa?`, a: `$157$ cm.`, s: `$C = 50 \\times 3,14 = 157$ cm.`, d: 'van_dung' },
    { c: `Bồn hoa tròn $r = 3$ m. Tính DT bồn hoa.`, a: `$28,26\\text{ m}^2$.`, s: `$S = 3 \\times 3 \\times 3,14 = 28,26\\text{ m}^2$.`, d: 'van_dung' },
    { c: `Hình tròn có chu vi $31,4$ cm. Tính bán kính.`, a: `$5$ cm.`, s: `$r = C : (2 \\times 3,14) = 31,4 : 6,28 = 5$ cm.`, d: 'van_dung_cao' },
    { c: `HV cạnh $10$ cm. Vẽ hình tròn nội tiếp. Tính DT phần HV ngoài hình tròn.`, a: `$21,5\\text{ cm}^2$.`, s: `$S_{HV} = 100$. $r = 5$, $S_{tròn} = 78,5$. Phần ngoài: $100 - 78,5 = 21,5\\text{ cm}^2$.`, d: 'van_dung_cao' },
    { c: `Sân tròn $r = 7$ m. Rào xung quanh, giá $50\\,000$ đ/m. Tổng chi phí?`, a: `$2\\,198\\,000$ đồng.`, s: `$C = 2 \\times 7 \\times 3,14 = 43,96$ m. Chi phí: $43,96 \\times 50\\,000 = 2\\,198\\,000$ đ.`, d: 'van_dung_cao' },
  ]},
  // ======== Bài 28: Thực hành đo, vẽ, lắp ghép ========
  { id: '10c623f5-8ce1-4507-a949-0aaf35cd779b', p: 'T5-B28', t: 'hinh_hoc', q: [
    { c: `Dùng dụng cụ gì để vẽ đường tròn?`, a: `Com-pa.`, s: `Com-pa để vẽ đường tròn.`, d: 'nhan_biet' },
    { c: `Vẽ hình tròn $r = 3$ cm. Đường kính bao nhiêu?`, a: `$d = 6$ cm.`, s: `$d = 2r = 6$ cm.`, d: 'nhan_biet' },
    { c: `Ghép $2$ hình tam giác bằng nhau thành hình gì?`, a: `HCN hoặc hình bình hành.`, s: `Tuỳ cách ghép.`, d: 'thong_hieu' },
    { c: `Gấp $1$ tờ giấy HCN thành $4$ phần bằng nhau. Mỗi phần chiếm bao nhiêu?`, a: `$\\dfrac{1}{4}$ tờ giấy.`, s: `$4$ phần bằng nhau, mỗi phần $\\dfrac{1}{4}$.`, d: 'thong_hieu' },
    { c: `Đo cạnh HV được $4,5$ cm. Tính chu vi.`, a: `$18$ cm.`, s: `$C = 4 \\times 4,5 = 18$ cm.`, d: 'thong_hieu' },
    { c: `Dùng com-pa vẽ nửa đường tròn $r = 4$ cm. Tính chu vi nửa hình tròn.`, a: `$20,56$ cm.`, s: `Nửa chu vi tròn $= 4 \\times 3,14 = 12,56$ cm. Cộng $d = 8$ cm: $20,56$ cm.`, d: 'van_dung' },
    { c: `Ghép $4$ HV cạnh $2$ cm thành $1$ HV lớn. Cạnh HV lớn?`, a: `$4$ cm.`, s: `$2$ HV xếp mỗi hàng → $4$ cm.`, d: 'van_dung' },
    { c: `Cắt $1$ hình thang thành $1$ tam giác và $1$ HCN. Mô tả cách cắt.`, a: `Cắt từ đỉnh trên xuống chân đáy lớn vuông góc.`, s: `Kẻ đường cao từ $1$ đỉnh trên → chia HT thành tam giác vuông và HCN.`, d: 'van_dung' },
    { c: `DT hình tròn lớn $r = 6$ cm, hình tròn nhỏ $r = 4$ cm (đồng tâm). DT hình vành khăn?`, a: `$62,8\\text{ cm}^2$.`, s: `$S_{lớn} = 36 \\times 3,14 = 113,04$. $S_{nhỏ} = 16 \\times 3,14 = 50,24$. Vành khăn: $62,8\\text{ cm}^2$.`, d: 'van_dung_cao' },
    { c: `Lắp $8$ hình tam giác đều cạnh $3$ cm thành hình lục giác đều. Tính chu vi lục giác.`, a: `$18$ cm.`, s: `Lục giác đều cạnh $= 3$ cm, $6$ cạnh: $C = 6 \\times 3 = 18$ cm.`, d: 'van_dung_cao' },
  ]},
  // ======== Bài 29: LT chung CĐ5 ========
  { id: 'fe6267f6-285f-4c32-9e52-29e0a7664ed9', p: 'T5-B29', t: 'hinh_hoc', q: [
    { c: `Tam giác đáy $8$ cm, cao $5$ cm. Tính DT.`, a: `$20\\text{ cm}^2$.`, s: `$S = \\dfrac{8 \\times 5}{2} = 20\\text{ cm}^2$.`, d: 'nhan_biet' },
    { c: `HT đáy $10$, $6$ cm, cao $4$ cm. Tính DT.`, a: `$32\\text{ cm}^2$.`, s: `$S = \\dfrac{(10+6) \\times 4}{2} = 32\\text{ cm}^2$.`, d: 'nhan_biet' },
    { c: `Hình tròn $r = 3$ cm. Tính chu vi.`, a: `$18,84$ cm.`, s: `$C = 2 \\times 3 \\times 3,14 = 18,84$ cm.`, d: 'thong_hieu' },
    { c: `Hình tròn $d = 14$ cm. Tính DT.`, a: `$153,86\\text{ cm}^2$.`, s: `$r = 7$. $S = 7 \\times 7 \\times 3,14 = 153,86\\text{ cm}^2$.`, d: 'thong_hieu' },
    { c: `HCN $12 \\times 8$ cm. Cắt tam giác vuông (cạnh $4$, $8$ cm). Phần còn lại HT. Tính DT HT.`, a: `$80\\text{ cm}^2$.`, s: `$S_{HCN} = 96$. $S_{\\triangle} = \\dfrac{4 \\times 8}{2} = 16$. $S_{HT} = 80\\text{ cm}^2$.`, d: 'van_dung' },
    { c: `Bồn hoa tam giác đáy $6$ m, cao $4$ m. Giá trồng hoa $25\\,000$ đ/$\\text{m}^2$. Tổng tiền?`, a: `$300\\,000$ đồng.`, s: `$S = 12\\text{ m}^2$. $12 \\times 25\\,000 = 300\\,000$ đ.`, d: 'van_dung' },
    { c: `HT đáy lớn hơn đáy bé $4$ cm, tổng $2$ đáy $= 16$ cm, cao $5$ cm. Tính DT.`, a: `$40\\text{ cm}^2$.`, s: `Đáy bé $= 6$, đáy lớn $= 10$. $S = \\dfrac{16 \\times 5}{2} = 40\\text{ cm}^2$.`, d: 'van_dung' },
    { c: `Sân hình tròn $r = 10$ m. Lát gạch $150\\,000$ đ/$\\text{m}^2$. Tổng tiền?`, a: `$47\\,100\\,000$ đồng.`, s: `$S = 100 \\times 3,14 = 314\\text{ m}^2$. $314 \\times 150\\,000 = 47\\,100\\,000$ đ.`, d: 'van_dung_cao' },
    { c: `Tam giác có DT $= 24\\text{ cm}^2$, đáy $= 8$ cm. Tính chiều cao.`, a: `$6$ cm.`, s: `$h = 2S : a = 48 : 8 = 6$ cm.`, d: 'van_dung_cao' },
    { c: `Hình thang $S = 45\\text{ cm}^2$, cao $5$ cm, đáy bé $= 7$ cm. Tính đáy lớn.`, a: `$11$ cm.`, s: `$a + b = 2S : h = 18$. Đáy lớn $= 18 - 7 = 11$ cm.`, d: 'van_dung_cao' },
  ]},
  // ======== CĐ6 - Bài 30: Ôn tập STP ========
  { id: 'ba9f6d9a-20c1-4c38-973c-7d92613a7ab2', p: 'T5-B30', q: [
    { c: `Đọc: $4,025$.`, a: `Bốn phẩy không hai mươi lăm.`, s: `$4,025$.`, d: 'nhan_biet' },
    { c: `$\\dfrac{7}{100} = ?$ (STP).`, a: `$0,07$.`, s: `$\\dfrac{7}{100} = 0,07$.`, d: 'nhan_biet' },
    { c: `So sánh $3,09$ và $3,1$.`, a: `$3,09 < 3,1$.`, s: `$3,09 < 3,10$.`, d: 'thong_hieu' },
    { c: `Chuyển $\\dfrac{3}{4}$ thành STP.`, a: `$0,75$.`, s: `$\\dfrac{3}{4} = \\dfrac{75}{100} = 0,75$.`, d: 'thong_hieu' },
    { c: `Làm tròn $5,678$ đến hàng phần mười.`, a: `$5,7$.`, s: `$7 \\geq 5$ → $5,7$.`, d: 'thong_hieu' },
    { c: `Sắp xếp tăng dần: $2,05$; $2,5$; $2,005$.`, a: `$2,005 < 2,05 < 2,5$.`, s: `$2,005 < 2,050 < 2,500$.`, d: 'van_dung' },
    { c: `$5$ m $3$ mm $= ?$ m (STP).`, a: `$5,003$ m.`, s: `$3$ mm $= 0,003$ m.`, d: 'van_dung' },
    { c: `Viết $3$ STP giữa $0,1$ và $0,2$.`, a: `VD: $0,12$; $0,15$; $0,18$.`, s: `Bất kỳ STP trong $(0,1; 0,2)$.`, d: 'van_dung' },
    { c: `Chuyển $2,375$ thành phân số tối giản.`, a: `$\\dfrac{19}{8}$.`, s: `$2,375 = \\dfrac{2375}{1000} = \\dfrac{19}{8}$.`, d: 'van_dung_cao' },
    { c: `STP $x$ có $2$ chữ số TP, $1 < x < 2$, tổng các chữ số $= 5$. Tìm $x$.`, a: `$1,04$; $1,13$; $1,22$; $1,31$; $1,40$.`, s: `$x = 1,ab$ với $a + b = 4$: $(0,4); (1,3); (2,2); (3,1); (4,0)$.`, d: 'van_dung_cao' },
  ]},
  // ======== Bài 31: Ôn tập phép tính STP ========
  { id: '9c84becd-edd3-4689-b45b-8bd38328671f', p: 'T5-B31', q: [
    { c: `Tính: $3,4 + 2,7$.`, a: `$6,1$.`, s: `$3,4 + 2,7 = 6,1$.`, d: 'nhan_biet' },
    { c: `Tính: $8,5 - 3,25$.`, a: `$5,25$.`, s: `$8,50 - 3,25 = 5,25$.`, d: 'nhan_biet' },
    { c: `Tính: $2,5 \\times 4$.`, a: `$10$.`, s: `$2,5 \\times 4 = 10$.`, d: 'nhan_biet' },
    { c: `Tính: $6,3 : 0,9$.`, a: `$7$.`, s: `$63 : 9 = 7$.`, d: 'thong_hieu' },
    { c: `Tính: $4,8 + 3,2 \\times 0,5$.`, a: `$6,4$.`, s: `$3,2 \\times 0,5 = 1,6$. $4,8 + 1,6 = 6,4$.`, d: 'thong_hieu' },
    { c: `Tìm $x$: $x \\times 0,3 = 1,5$.`, a: `$x = 5$.`, s: `$x = 1,5 : 0,3 = 5$.`, d: 'thong_hieu' },
    { c: `Tính nhanh: $7,5 \\times 8 + 7,5 \\times 2$.`, a: `$75$.`, s: `$7,5 \\times (8+2) = 7,5 \\times 10 = 75$.`, d: 'van_dung' },
    { c: `Tính: $(5,4 - 2,7) \\times (3,6 + 1,4)$.`, a: `$13,5$.`, s: `$2,7 \\times 5 = 13,5$.`, d: 'van_dung' },
    { c: `Tính nhanh: $9,8 \\times 25 - 9,8 \\times 15$.`, a: `$98$.`, s: `$9,8 \\times (25-15) = 9,8 \\times 10 = 98$.`, d: 'van_dung_cao' },
    { c: `Tìm $x$: $x : 0,4 - 1,5 = 3,5$.`, a: `$x = 2$.`, s: `$x : 0,4 = 5$. $x = 5 \\times 0,4 = 2$.`, d: 'van_dung_cao' },
  ]},
  // ======== Bài 32: Ôn tập hình phẳng ========
  { id: '8463f857-3754-4c78-97d5-d7b030feda49', p: 'T5-B32', t: 'hinh_hoc', q: [
    { c: `Hình vuông có bao nhiêu cạnh bằng nhau?`, a: `$4$ cạnh.`, s: `Hình vuông $4$ cạnh bằng nhau, $4$ góc vuông.`, d: 'nhan_biet' },
    { c: `Hình bình hành có đặc điểm gì?`, a: `$2$ cặp cạnh đối song song và bằng nhau.`, s: `HBH: cạnh đối song song, bằng nhau.`, d: 'nhan_biet' },
    { c: `Hình thoi có bao nhiêu cạnh bằng nhau?`, a: `$4$ cạnh.`, s: `Hình thoi: $4$ cạnh bằng nhau.`, d: 'nhan_biet' },
    { c: `Hình nào vừa là HCN vừa là hình thoi?`, a: `Hình vuông.`, s: `HV có $4$ cạnh bằng nhau (như thoi) và $4$ góc vuông (như HCN).`, d: 'thong_hieu' },
    { c: `Hình thang có bao nhiêu cặp cạnh song song?`, a: `$1$ cặp.`, s: `$1$ cặp cạnh đối song song (hai đáy).`, d: 'thong_hieu' },
    { c: `HBH đáy $8$ cm, cao $5$ cm. Tính DT.`, a: `$40\\text{ cm}^2$.`, s: `$S = 8 \\times 5 = 40\\text{ cm}^2$.`, d: 'thong_hieu' },
    { c: `Hình thoi có $2$ đường chéo $6$ cm và $8$ cm. Tính DT.`, a: `$24\\text{ cm}^2$.`, s: `$S = \\dfrac{6 \\times 8}{2} = 24\\text{ cm}^2$.`, d: 'van_dung' },
    { c: `Tam giác đáy $10$ cm, cao $7$ cm. Tính DT.`, a: `$35\\text{ cm}^2$.`, s: `$S = \\dfrac{10 \\times 7}{2} = 35\\text{ cm}^2$.`, d: 'van_dung' },
    { c: `Viên gạch HV cạnh $20$ cm. Lát phòng $4 \\times 5$ m. Cần bao nhiêu viên?`, a: `$500$ viên.`, s: `$S_{phòng} = 20\\text{ m}^2 = 200\\,000\\text{ cm}^2$. $S_{gạch} = 400\\text{ cm}^2$. $200\\,000 : 400 = 500$.`, d: 'van_dung_cao' },
    { c: `HCN $10 \\times 6$ cm. Vẽ tam giác nhọn trong HCN sao cho DT tam giác lớn nhất. DT $= ?$`, a: `$30\\text{ cm}^2$.`, s: `DT max $= \\dfrac{S_{HCN}}{2} = \\dfrac{60}{2} = 30\\text{ cm}^2$.`, d: 'van_dung_cao' },
  ]},
  // ======== Bài 33: Ôn tập DT, chu vi ========
  { id: '153d922f-6024-4102-9e1a-a4f6b306a19a', p: 'T5-B33', t: 'hinh_hoc', q: [
    { c: `Chu vi HCN dài $12$ cm, rộng $5$ cm?`, a: `$34$ cm.`, s: `$C = (12+5) \\times 2 = 34$ cm.`, d: 'nhan_biet' },
    { c: `DT HV cạnh $9$ cm?`, a: `$81\\text{ cm}^2$.`, s: `$S = 9 \\times 9 = 81\\text{ cm}^2$.`, d: 'nhan_biet' },
    { c: `DT HCN $14 \\times 8$ cm?`, a: `$112\\text{ cm}^2$.`, s: `$S = 14 \\times 8 = 112\\text{ cm}^2$.`, d: 'thong_hieu' },
    { c: `Chu vi hình tròn $r = 7$ cm?`, a: `$43,96$ cm.`, s: `$C = 2 \\times 7 \\times 3,14 = 43,96$ cm.`, d: 'thong_hieu' },
    { c: `DT tam giác đáy $12$ cm, cao $9$ cm?`, a: `$54\\text{ cm}^2$.`, s: `$S = \\dfrac{12 \\times 9}{2} = 54\\text{ cm}^2$.`, d: 'thong_hieu' },
    { c: `HCN có $S = 60\\text{ cm}^2$, dài $10$ cm. Tính chu vi.`, a: `$32$ cm.`, s: `Rộng $= 6$ cm. $C = (10+6) \\times 2 = 32$ cm.`, d: 'van_dung' },
    { c: `HV có $C = 28$ cm. Tính DT.`, a: `$49\\text{ cm}^2$.`, s: `Cạnh $= 7$ cm. $S = 49\\text{ cm}^2$.`, d: 'van_dung' },
    { c: `Hình tròn $r = 5$ cm. Tính DT.`, a: `$78,5\\text{ cm}^2$.`, s: `$S = 5 \\times 5 \\times 3,14 = 78,5\\text{ cm}^2$.`, d: 'van_dung' },
    { c: `Sân HCN $30 \\times 20$ m. Chạy $5$ vòng. Tổng quãng đường?`, a: `$500$ m.`, s: `$C = 100$ m. $5$ vòng: $500$ m.`, d: 'van_dung_cao' },
    { c: `HV cạnh $a$, tăng cạnh $2$ cm → DT tăng $28\\text{ cm}^2$. Tìm $a$.`, a: `$a = 6$ cm.`, s: `$(a+2)^2 - a^2 = 28$. $4a + 4 = 28$. $a = 6$.`, d: 'van_dung_cao' },
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
