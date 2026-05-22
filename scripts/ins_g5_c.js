const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const U = '8316c34e-765d-4b8c-9364-b683a17e33f8', G = 5, T = 'dai_so';

const B = [
  // ======== Bài 12: Viết số đo đại lượng dưới dạng STP ========
  { id: '2636380c-a4f9-4008-94c6-6886e7f74c0e', p: 'T5-B12', q: [
    { c: `Viết $3$ m $5$ dm dưới dạng STP (đơn vị mét).`, a: `$3,5$ m.`, s: `$5$ dm $= 0,5$ m. Vậy $3,5$ m.`, d: 'nhan_biet' },
    { c: `Viết $7$ kg $500$ g dưới dạng STP (đơn vị kg).`, a: `$7,5$ kg.`, s: `$500$ g $= 0,5$ kg.`, d: 'nhan_biet' },
    { c: `$4$ km $250$ m $= ?$ km.`, a: `$4,250$ km.`, s: `$250$ m $= 0,250$ km.`, d: 'thong_hieu' },
    { c: `$8$ m $3$ cm $= ?$ m.`, a: `$8,03$ m.`, s: `$3$ cm $= 0,03$ m. Vậy $8,03$ m.`, d: 'thong_hieu' },
    { c: `$2$ tấn $75$ kg $= ?$ tấn.`, a: `$2,075$ tấn.`, s: `$75$ kg $= 0,075$ tấn.`, d: 'thong_hieu' },
    { c: `Viết $5,6$ m thành đơn vị m và dm.`, a: `$5$ m $6$ dm.`, s: `$0,6$ m $= 6$ dm.`, d: 'van_dung' },
    { c: `$3,08$ km $= ?$ m.`, a: `$3\\,080$ m.`, s: `$3,08 \\times 1\\,000 = 3\\,080$ m.`, d: 'van_dung' },
    { c: `$0,5$ tấn $= ?$ kg.`, a: `$500$ kg.`, s: `$0,5 \\times 1\\,000 = 500$ kg.`, d: 'van_dung' },
    { c: `Sợi dây dài $2$ m $45$ cm. Viết dưới dạng STP rồi đổi sang dm.`, a: `$2,45$ m $= 24,5$ dm.`, s: `$45$ cm $= 0,45$ m → $2,45$ m. $2,45 \\times 10 = 24,5$ dm.`, d: 'van_dung_cao' },
    { c: `$3,005$ km $= ?$ m.`, a: `$3\\,005$ m.`, s: `$3,005 \\times 1\\,000 = 3\\,005$ m.`, d: 'van_dung_cao' },
  ]},
  // ======== Bài 13: Làm tròn số thập phân ========
  { id: '5ede24ca-dc0c-4052-8233-ea85933b1ecc', p: 'T5-B13', q: [
    { c: `Làm tròn $3,7$ đến hàng đơn vị.`, a: `$4$.`, s: `$7 \\geq 5$ → làm tròn lên: $4$.`, d: 'nhan_biet' },
    { c: `Làm tròn $5,24$ đến hàng phần mười.`, a: `$5,2$.`, s: `Chữ số hàng phần trăm $= 4 < 5$ → giữ nguyên: $5,2$.`, d: 'nhan_biet' },
    { c: `Làm tròn $8,35$ đến hàng phần mười.`, a: `$8,4$.`, s: `$5 \\geq 5$ → làm tròn lên: $8,4$.`, d: 'nhan_biet' },
    { c: `Làm tròn $12,456$ đến hàng phần trăm.`, a: `$12,46$.`, s: `Hàng phần nghìn $= 6 \\geq 5$ → $12,46$.`, d: 'thong_hieu' },
    { c: `Làm tròn $9,95$ đến hàng phần mười.`, a: `$10,0$ (hay $10$).`, s: `$5 \\geq 5$: $9,9$ → $10,0$.`, d: 'thong_hieu' },
    { c: `Làm tròn $6,049$ đến hàng phần mười.`, a: `$6,0$ (hay $6$).`, s: `Hàng phần trăm $= 4 < 5$ → $6,0$.`, d: 'thong_hieu' },
    { c: `Thanh sắt dài $2,347$ m. Làm tròn đến hàng phần mười.`, a: `$2,3$ m.`, s: `$4 < 5$ → $2,3$ m.`, d: 'van_dung' },
    { c: `Giá $1$ kg táo: $35\\,600$ đồng. Mua $2,3$ kg. Tính tiền (làm tròn đến hàng nghìn).`, a: `$82\\,000$ đồng.`, s: `$35\\,600 \\times 2,3 = 81\\,880$. Làm tròn: $82\\,000$ đồng.`, d: 'van_dung' },
    { c: `$\\dfrac{1}{3} \\approx ?$ (làm tròn đến hàng phần trăm).`, a: `$\\approx 0,33$.`, s: `$\\dfrac{1}{3} = 0,333...$ Làm tròn: $0,33$.`, d: 'van_dung_cao' },
    { c: `$\\dfrac{2}{7} \\approx ?$ (làm tròn đến hàng phần nghìn).`, a: `$\\approx 0,286$.`, s: `$\\dfrac{2}{7} = 0,2857...$ Làm tròn: $0,286$.`, d: 'van_dung_cao' },
  ]},
  // ======== Bài 14: Luyện tập chung (CĐ2) ========
  { id: 'e6dd0973-b0d9-4167-b5be-46557fda543f', p: 'T5-B14', q: [
    { c: `Đọc số $12,05$.`, a: `Mười hai phẩy không năm.`, s: `$12,05$.`, d: 'nhan_biet' },
    { c: `Viết STP: \"Không phẩy bảy trăm linh ba\".`, a: `$0,703$.`, s: `$0,703$.`, d: 'nhan_biet' },
    { c: `So sánh $4,5$ và $4,50$.`, a: `$4,5 = 4,50$.`, s: `Thêm $0$ sau cùng không đổi giá trị.`, d: 'thong_hieu' },
    { c: `Sắp xếp tăng dần: $0,8$; $0,75$; $0,9$.`, a: `$0,75 < 0,8 < 0,9$.`, s: `$0,75 < 0,80 < 0,90$.`, d: 'thong_hieu' },
    { c: `Chuyển $\\dfrac{3}{8}$ thành STP.`, a: `$0,375$.`, s: `$\\dfrac{3}{8} = \\dfrac{375}{1000} = 0,375$.`, d: 'thong_hieu' },
    { c: `Làm tròn $7,846$ đến hàng phần mười.`, a: `$7,8$.`, s: `$4 < 5$ → giữ: $7,8$.`, d: 'van_dung' },
    { c: `$6$ m $8$ mm $= ?$ m.`, a: `$6,008$ m.`, s: `$8$ mm $= 0,008$ m.`, d: 'van_dung' },
    { c: `Bình chứa $2,5$ lít nước. Đã dùng $0,75$ lít. Còn bao nhiêu?`, a: `$1,75$ lít.`, s: `$2,5 - 0,75 = 1,75$ lít.`, d: 'van_dung' },
    { c: `Viết $3$ STP liên tiếp nằm giữa $5,1$ và $5,2$ (có $2$ chữ số thập phân).`, a: `VD: $5,11$; $5,12$; $5,13$.`, s: `Bất kỳ $3$ STP trong khoảng $(5,10; 5,20)$.`, d: 'van_dung_cao' },
    { c: `Tìm STP $x$ có $1$ chữ số thập phân biết $3 < x < 4$ và $x$ lớn nhất.`, a: `$x = 3,9$.`, s: `STP $1$ chữ số TP: $3,1; 3,2; ...; 3,9$. Lớn nhất: $3,9$.`, d: 'van_dung_cao' },
  ]},
  // ======== CĐ3 - Bài 15: Ki-lô-mét vuông. Héc-ta ========
  { id: 'ff814959-32e6-49b4-a53a-9f2d1c0f8d17', p: 'T5-B15', t: 'hinh_hoc', q: [
    { c: `$1\\text{ km}^2 = ?\\text{ m}^2$.`, a: `$1\\,000\\,000\\text{ m}^2$.`, s: `$1$ km $= 1\\,000$ m. $1\\text{ km}^2 = 1\\,000 \\times 1\\,000 = 1\\,000\\,000\\text{ m}^2$.`, d: 'nhan_biet' },
    { c: `$1$ ha $= ?\\text{ m}^2$.`, a: `$10\\,000\\text{ m}^2$.`, s: `$1$ ha $= 10\\,000\\text{ m}^2$.`, d: 'nhan_biet' },
    { c: `$1\\text{ km}^2 = ?$ ha.`, a: `$100$ ha.`, s: `$1\\,000\\,000 : 10\\,000 = 100$ ha.`, d: 'nhan_biet' },
    { c: `$5$ ha $= ?\\text{ m}^2$.`, a: `$50\\,000\\text{ m}^2$.`, s: `$5 \\times 10\\,000 = 50\\,000\\text{ m}^2$.`, d: 'thong_hieu' },
    { c: `$3\\text{ km}^2 = ?$ ha.`, a: `$300$ ha.`, s: `$3 \\times 100 = 300$ ha.`, d: 'thong_hieu' },
    { c: `$40\\,000\\text{ m}^2 = ?$ ha.`, a: `$4$ ha.`, s: `$40\\,000 : 10\\,000 = 4$ ha.`, d: 'thong_hieu' },
    { c: `Mảnh đất HCN dài $200$ m, rộng $150$ m. Tính diện tích bằng ha.`, a: `$3$ ha.`, s: `$S = 200 \\times 150 = 30\\,000\\text{ m}^2 = 3$ ha.`, d: 'van_dung' },
    { c: `Thành phố có diện tích $25\\text{ km}^2$. Đổi ra ha.`, a: `$2\\,500$ ha.`, s: `$25 \\times 100 = 2\\,500$ ha.`, d: 'van_dung' },
    { c: `Nông trường có $120$ ha trồng lúa và $3,5\\text{ km}^2$ trồng cà phê. Tổng bao nhiêu ha?`, a: `$470$ ha.`, s: `$3,5\\text{ km}^2 = 350$ ha. Tổng: $120 + 350 = 470$ ha.`, d: 'van_dung_cao' },
    { c: `Ruộng HV cạnh $500$ m. Mỗi ha thu $6$ tấn lúa. Cả ruộng thu bao nhiêu tấn?`, a: `$150$ tấn.`, s: `$S = 500 \\times 500 = 250\\,000\\text{ m}^2 = 25$ ha. Thu: $25 \\times 6 = 150$ tấn.`, d: 'van_dung_cao' },
  ]},
  // ======== Bài 16: Các đơn vị đo diện tích ========
  { id: '598e17b5-5b87-4aba-aa9e-e1379a50eed8', p: 'T5-B16', t: 'hinh_hoc', q: [
    { c: `$1\\text{ m}^2 = ?\\text{ dm}^2$.`, a: `$100\\text{ dm}^2$.`, s: `$1\\text{ m}^2 = 100\\text{ dm}^2$.`, d: 'nhan_biet' },
    { c: `$1\\text{ dm}^2 = ?\\text{ cm}^2$.`, a: `$100\\text{ cm}^2$.`, s: `$1\\text{ dm}^2 = 100\\text{ cm}^2$.`, d: 'nhan_biet' },
    { c: `$1\\text{ cm}^2 = ?\\text{ mm}^2$.`, a: `$100\\text{ mm}^2$.`, s: `$1\\text{ cm}^2 = 100\\text{ mm}^2$.`, d: 'nhan_biet' },
    { c: `$5\\text{ m}^2 = ?\\text{ dm}^2$.`, a: `$500\\text{ dm}^2$.`, s: `$5 \\times 100 = 500$.`, d: 'thong_hieu' },
    { c: `$3\\text{ m}^2 50\\text{ dm}^2 = ?\\text{ dm}^2$.`, a: `$350\\text{ dm}^2$.`, s: `$3\\text{ m}^2 = 300\\text{ dm}^2$. $300 + 50 = 350$.`, d: 'thong_hieu' },
    { c: `$7\\,200\\text{ cm}^2 = ?\\text{ dm}^2$.`, a: `$72\\text{ dm}^2$.`, s: `$7\\,200 : 100 = 72$.`, d: 'thong_hieu' },
    { c: `Viết $2\\text{ m}^2 35\\text{ dm}^2$ dưới dạng STP (đơn vị $\\text{m}^2$).`, a: `$2,35\\text{ m}^2$.`, s: `$35\\text{ dm}^2 = 0,35\\text{ m}^2$. Vậy $2,35\\text{ m}^2$.`, d: 'van_dung' },
    { c: `$0,5\\text{ m}^2 = ?\\text{ cm}^2$.`, a: `$5\\,000\\text{ cm}^2$.`, s: `$0,5\\text{ m}^2 = 50\\text{ dm}^2 = 5\\,000\\text{ cm}^2$.`, d: 'van_dung' },
    { c: `Mảnh bìa HCN $2$ m $\\times$ $1,5$ m. Tính S bằng $\\text{dm}^2$.`, a: `$300\\text{ dm}^2$.`, s: `$S = 2 \\times 1,5 = 3\\text{ m}^2 = 300\\text{ dm}^2$.`, d: 'van_dung_cao' },
    { c: `$4\\text{ m}^2 5\\text{ cm}^2 = ?\\text{ cm}^2$.`, a: `$40\\,005\\text{ cm}^2$.`, s: `$4\\text{ m}^2 = 40\\,000\\text{ cm}^2$. Cộng: $40\\,005\\text{ cm}^2$.`, d: 'van_dung_cao' },
  ]},
  // ======== Bài 17: Thực hành ĐL ========
  { id: '6465a84b-3cfb-4ddd-8b43-336680af9adb', p: 'T5-B17', t: 'hinh_hoc', q: [
    { c: `$5$ kg $= ?$ g.`, a: `$5\\,000$ g.`, s: `$1$ kg $= 1\\,000$ g. $5 \\times 1\\,000 = 5\\,000$ g.`, d: 'nhan_biet' },
    { c: `$2$ tấn $= ?$ kg.`, a: `$2\\,000$ kg.`, s: `$1$ tấn $= 1\\,000$ kg.`, d: 'nhan_biet' },
    { c: `$3\\,500$ g $= ?$ kg $?$ g.`, a: `$3$ kg $500$ g.`, s: `$3\\,500 : 1\\,000 = 3$ dư $500$.`, d: 'thong_hieu' },
    { c: `$2,5$ tấn $= ?$ kg.`, a: `$2\\,500$ kg.`, s: `$2,5 \\times 1\\,000 = 2\\,500$ kg.`, d: 'thong_hieu' },
    { c: `$1$ giờ $30$ phút $= ?$ phút.`, a: `$90$ phút.`, s: `$60 + 30 = 90$ phút.`, d: 'thong_hieu' },
    { c: `Ước lượng: Bàn học rộng khoảng $?$ $\\text{dm}^2$.`, a: `Khoảng $24\\text{ dm}^2$ (tuỳ kích thước).`, s: `Bàn học khoảng $6$ dm $\\times$ $4$ dm $= 24\\text{ dm}^2$.`, d: 'van_dung' },
    { c: `Sân trường HCN dài $50$ m, rộng $30$ m. Tính diện tích bằng $\\text{m}^2$ và ha.`, a: `$1\\,500\\text{ m}^2 = 0,15$ ha.`, s: `$S = 50 \\times 30 = 1\\,500\\text{ m}^2 = 0,15$ ha.`, d: 'van_dung' },
    { c: `Bao gạo nặng $50$ kg. Xe chở $3,5$ tấn hàng. Chở được tối đa bao nhiêu bao?`, a: `$70$ bao.`, s: `$3,5$ tấn $= 3\\,500$ kg. $3\\,500 : 50 = 70$ bao.`, d: 'van_dung_cao' },
    { c: `Thửa ruộng HCN dài $120$ m, rộng $80$ m. $1\\text{ m}^2$ thu $0,5$ kg thóc. Tính tổng kg thóc.`, a: `$4\\,800$ kg.`, s: `$S = 120 \\times 80 = 9\\,600\\text{ m}^2$. Thóc: $9\\,600 \\times 0,5 = 4\\,800$ kg.`, d: 'van_dung_cao' },
    { c: `$0,025\\text{ km}^2 = ?$ ha $= ?\\text{ m}^2$.`, a: `$2,5$ ha $= 25\\,000\\text{ m}^2$.`, s: `$0,025 \\times 100 = 2,5$ ha. $2,5 \\times 10\\,000 = 25\\,000\\text{ m}^2$.`, d: 'van_dung_cao' },
  ]},
  // ======== Bài 18: LT chung CĐ3 ========
  { id: '1919a9b2-62cc-452f-ab10-afa2454a3f59', p: 'T5-B18', t: 'hinh_hoc', q: [
    { c: `$1$ ha $= ?\\text{ m}^2$.`, a: `$10\\,000\\text{ m}^2$.`, s: `$1$ ha $= 10\\,000\\text{ m}^2$.`, d: 'nhan_biet' },
    { c: `$2\\text{ km}^2 = ?\\text{ m}^2$.`, a: `$2\\,000\\,000\\text{ m}^2$.`, s: `$2 \\times 1\\,000\\,000 = 2\\,000\\,000$.`, d: 'nhan_biet' },
    { c: `$500\\text{ dm}^2 = ?\\text{ m}^2$.`, a: `$5\\text{ m}^2$.`, s: `$500 : 100 = 5$.`, d: 'thong_hieu' },
    { c: `$3,5$ ha $= ?\\text{ m}^2$.`, a: `$35\\,000\\text{ m}^2$.`, s: `$3,5 \\times 10\\,000 = 35\\,000$.`, d: 'thong_hieu' },
    { c: `$0,08\\text{ km}^2 = ?$ ha.`, a: `$8$ ha.`, s: `$0,08 \\times 100 = 8$ ha.`, d: 'thong_hieu' },
    { c: `HCN dài $400$ m, rộng $250$ m. Tính S bằng ha.`, a: `$10$ ha.`, s: `$S = 400 \\times 250 = 100\\,000\\text{ m}^2 = 10$ ha.`, d: 'van_dung' },
    { c: `Đổi: $4\\text{ m}^2 8\\text{ dm}^2 = ?\\text{ dm}^2$.`, a: `$408\\text{ dm}^2$.`, s: `$4\\text{ m}^2 = 400\\text{ dm}^2$. $400 + 8 = 408$.`, d: 'van_dung' },
    { c: `Viết $5\\text{ m}^2 6\\text{ dm}^2$ dưới dạng STP (đơn vị $\\text{m}^2$).`, a: `$5,06\\text{ m}^2$.`, s: `$6\\text{ dm}^2 = 0,06\\text{ m}^2$.`, d: 'van_dung' },
    { c: `Khu đất $2,4$ ha. Dùng $\\dfrac{3}{4}$ trồng cây. Phần trồng cây bao nhiêu $\\text{m}^2$?`, a: `$18\\,000\\text{ m}^2$.`, s: `$2,4$ ha $= 24\\,000\\text{ m}^2$. $24\\,000 \\times \\dfrac{3}{4} = 18\\,000\\text{ m}^2$.`, d: 'van_dung_cao' },
    { c: `So sánh: $5,6$ ha và $56\\,500\\text{ m}^2$.`, a: `$5,6$ ha $< 56\\,500\\text{ m}^2$.`, s: `$5,6$ ha $= 56\\,000\\text{ m}^2 < 56\\,500\\text{ m}^2$.`, d: 'van_dung_cao' },
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
