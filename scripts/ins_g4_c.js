const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const U = '8316c34e-765d-4b8c-9364-b683a17e33f8', G = 4;

const B = [
  { id: '240d8d6d-f31f-4f2b-a5ab-5df3e38709fc', p: 'T4-B16', t: 'dai_so', q: [
    { c: `Đọc số sau: $345\\,678$.`, a: `Ba trăm bốn mươi lăm nghìn sáu trăm bảy mươi tám.`, s: `Đọc theo lớp nghìn và đơn vị.`, d: 'nhan_biet' },
    { c: `Viết số: Tám trăm chín mươi nghìn không trăm linh tư.`, a: `$890\\,004$.`, s: `$890$ ở lớp nghìn, $004$ ở lớp đơn vị.`, d: 'thong_hieu' },
    { c: `Sắp xếp các số $456\\,789; 457\\,689; 456\\,879$ theo thứ tự giảm dần.`, a: `$457\\,689 > 456\\,879 > 456\\,789$.`, s: `So sánh các chữ số từ trái sang phải.`, d: 'van_dung' },
    { c: `Làm tròn số $234\\,567$ đến hàng chục nghìn.`, a: `$230\\,000$.`, s: `Hàng nghìn là 4 < 5 nên làm tròn xuống.`, d: 'thong_hieu' },
    { c: `Viết số La Mã của $24$.`, a: `$XXIV$.`, s: `$20 + 4 = XXIV$.`, d: 'van_dung' }
  ]},
  { id: 'ca1ca755-e775-4158-a444-94d41ece1ad5', p: 'T4-B18', t: 'dai_so', q: [
    { c: `$1\\text{ m}^2$ bằng bao nhiêu $\\text{dm}^2$?`, a: `$100\\text{ dm}^2$.`, s: `$1\\text{ m} = 10\\text{ dm}$, nên $1\\text{ m}^2 = 100\\text{ dm}^2$.`, d: 'nhan_biet' },
    { c: `$500\\text{ dm}^2$ bằng bao nhiêu $\\text{m}^2$?`, a: `$5\\text{ m}^2$.`, s: `$500 : 100 = 5$.`, d: 'thong_hieu' },
    { c: `$1\\text{ cm}^2$ bằng bao nhiêu $\\text{mm}^2$?`, a: `$100\\text{ mm}^2$.`, s: `$1\\text{ cm} = 10\\text{ mm}$, nên $1\\text{ cm}^2 = 100\\text{ mm}^2$.`, d: 'nhan_biet' },
    { c: `$3\\text{ m}^2$ $15\\text{ dm}^2$ bằng bao nhiêu $\\text{dm}^2$?`, a: `$315\\text{ dm}^2$.`, s: `$300 + 15 = 315$.`, d: 'van_dung' },
    { c: `Diện tích hình chữ nhật dài $4$ m, rộng $2$ m. Tính ra $\\text{dm}^2$.`, a: `$800\\text{ dm}^2$.`, s: `Diện tích $= 8\\text{ m}^2 = 800\\text{ dm}^2$.`, d: 'van_dung' }
  ]},
  { id: '91fb04ca-0f8f-4e61-82b4-f7144528e030', p: 'T4-B20', t: 'dai_so', q: [
    { c: `$1$ phút bằng bao nhiêu giây?`, a: `$60$ giây.`, s: `Một phút có 60 giây.`, d: 'nhan_biet' },
    { c: `$1$ thế kỉ bằng bao nhiêu năm?`, a: `$100$ năm.`, s: `Một thế kỉ bằng 100 năm.`, d: 'nhan_biet' },
    { c: `$3$ phút $15$ giây bằng bao nhiêu giây?`, a: `$195$ giây.`, s: `$3 \\times 60 + 15 = 195$.`, d: 'thong_hieu' },
    { c: `Năm $2024$ thuộc thế kỉ thứ mấy?`, a: `Thế kỉ XXI (21).`, s: `Thế kỉ XXI bắt đầu từ 2001 đến 2100.`, d: 'thong_hieu' },
    { c: `Bác Hồ sinh năm $1890$. Năm đó thuộc thế kỉ nào?`, a: `Thế kỉ XIX (19).`, s: `Thế kỉ XIX bắt đầu từ 1801 đến 1900.`, d: 'van_dung' }
  ]},
  { id: 'c8be6339-522d-4c7c-a0f4-55a4894bb724', p: 'T4-B21', t: 'dai_so', q: [
    { c: `Đổi: $4\\text{ m}^2$ $= \\dots \\text{ dm}^2$.`, a: `$400$.`, s: `$4 \\times 100 = 400$.`, d: 'nhan_biet' },
    { c: `Năm $1010$ Lý Thái Tổ dời đô về Thăng Long. Năm đó thuộc thế kỉ nào?`, a: `Thế kỉ XI.`, s: `Thế kỉ XI bắt đầu từ 1001 đến 1100.`, d: 'thong_hieu' },
    { c: `Đổi: $5$ phút $20$ giây $= \\dots$ giây.`, a: `$320$.`, s: `$5 \\times 60 + 20 = 320$.`, d: 'thong_hieu' },
    { c: `Tính diện tích hình vuông cạnh $5$ dm.`, a: `$25\\text{ dm}^2$.`, s: `$5 \\times 5 = 25$.`, d: 'van_dung' },
    { c: `Mảnh vườn hình chữ nhật dài $12$ m, rộng $8$ m. Tính diện tích.`, a: `$96\\text{ m}^2$.`, s: `$12 \\times 8 = 96$.`, d: 'van_dung' }
  ]},
  { id: '017a1a26-8378-4255-834e-1566f4becf31', p: 'T4-B23', t: 'dai_so', q: [
    { c: `Tính: $56\\,789 - 12\\,345$.`, a: `$44\\,444$.`, s: `Thực hiện phép trừ.`, d: 'nhan_biet' },
    { c: `Tính: $100\\,000 - 45\\,678$.`, a: `$54\\,322$.`, s: `Thực hiện phép trừ có nhớ.`, d: 'thong_hieu' },
    { c: `Một nhà máy sản xuất được $45\\,500$ sản phẩm. Đã bán $23\\,400$ sản phẩm. Còn lại bao nhiêu?`, a: `$22\\,100$ sản phẩm.`, s: `$45\\,500 - 23\\,400 = 22\\,100$.`, d: 'van_dung' },
    { c: `Tìm $x$: $120\\,500 - x = 80\\,200$.`, a: `$x = 40\\,300$.`, s: `$x = 120\\,500 - 80\\,200 = 40\\,300$.`, d: 'van_dung' },
    { c: `Tính: $256\\,000 - 142\\,000 - 14\\,000$.`, a: `$100\\,000$.`, s: `$256\\,000 - 156\\,000 = 100\\,000$.`, d: 'van_dung_cao' }
  ]},
  { id: '56825326-7a3f-4cce-8eb5-cb285e4902fe', p: 'T4-B24', t: 'dai_so', q: [
    { c: `Tính chất giao hoán của phép cộng: $a + b = ?$`, a: `$b + a$.`, s: `Đổi chỗ các số hạng thì tổng không đổi.`, d: 'nhan_biet' },
    { c: `Tính chất kết hợp của phép cộng: $(a + b) + c = ?$`, a: `$a + (b + c)$.`, s: `Tính chất kết hợp.`, d: 'nhan_biet' },
    { c: `Tính nhanh: $45 + 18 + 55$.`, a: `$118$.`, s: `$(45 + 55) + 18 = 100 + 18 = 118$.`, d: 'thong_hieu' },
    { c: `Tính bằng cách thuận tiện: $125 + 34 + 75 + 66$.`, a: `$300$.`, s: `$(125 + 75) + (34 + 66) = 200 + 100 = 300$.`, d: 'van_dung' },
    { c: `Tính tổng của: $1 + 2 + 3 + 4 + 96 + 97 + 98 + 99$.`, a: `$400$.`, s: `Gép cặp $(1+99) + (2+98) + (3+97) + (4+96) = 100 \\times 4 = 400$.`, d: 'van_dung_cao' }
  ]},
  { id: 'bf55691a-0366-4bf0-936d-4b79d93c2152', p: 'T4-B25', t: 'dai_so', q: [
    { c: `Công thức tìm hai số khi biết tổng và hiệu: Số lớn = ?`, a: `(Tổng + Hiệu) : $2$.`, s: `Công thức tìm số lớn.`, d: 'nhan_biet' },
    { c: `Tổng hai số là $50$, hiệu là $10$. Tìm hai số đó.`, a: `Số lớn: $30$, số bé: $20$.`, s: `Số lớn: $(50 + 10) : 2 = 30$. Số bé: $50 - 30 = 20$.`, d: 'thong_hieu' },
    { c: `Lớp có $35$ học sinh, số nam nhiều hơn nữ $5$ em. Hỏi có bao nhiêu nam, bao nhiêu nữ?`, a: `Nam: $20$, nữ: $15$.`, s: `Nam: $(35+5)/2 = 20$. Nữ: $35-20=15$.`, d: 'van_dung' },
    { c: `Hai thửa ruộng thu hoạch được $5$ tấn thóc. Thửa thứ nhất thu hoạch nhiều hơn thửa thứ hai $800$ kg. Thửa thứ nhất thu được bao nhiêu kg thóc?`, a: `$2\\,900$ kg.`, s: `Tổng $= 5\\,000$ kg. Thửa 1: $(5000+800)/2 = 2\\,900$ kg.`, d: 'van_dung_cao' },
    { c: `Tổng của hai số lẻ liên tiếp là $40$. Tìm hai số đó.`, a: `$19$ và $21$.`, s: `Hiệu 2 số lẻ liên tiếp là 2. Số lớn: $(40+2)/2 = 21$. Số bé: 19.`, d: 'van_dung_cao' }
  ]},
  { id: '3dd39f4d-85a9-4b46-a760-b5a14d651b55', p: 'T4-B26', t: 'dai_so', q: [
    { c: `Tính nhanh: $450 + 125 + 550 + 875$.`, a: `$2\\,000$.`, s: `$(450+550) + (125+875) = 1\\,000 + 1\\,000 = 2\\,000$.`, d: 'thong_hieu' },
    { c: `Tổng hai số là $100$, hiệu là $20$. Tìm số bé.`, a: `$40$.`, s: `$(100 - 20) : 2 = 40$.`, d: 'thong_hieu' },
    { c: `Mẹ hơn con 28 tuổi. Tổng số tuổi của mẹ và con là 44 tuổi. Tính tuổi mẹ.`, a: `$36$ tuổi.`, s: `$(44 + 28) : 2 = 36$.`, d: 'van_dung' },
    { c: `Tính: $15\\,000 - (5\\,000 + 2\\,500)$.`, a: `$7\\,500$.`, s: `$15\\,000 - 7\\,500 = 7\\,500$.`, d: 'van_dung' },
    { c: `Trong $1$ ngày, một cửa hàng bán được $2\\,500$ quyển vở. Biết sáng bán nhiều hơn chiều $500$ quyển. Sáng bán được bao nhiêu?`, a: `$1\\,500$ quyển.`, s: `$(2500+500)/2 = 1\\,500$.`, d: 'van_dung' }
  ]},
  { id: '4950c969-1237-41f6-a7ee-f6fc82b584c6', p: 'T4-B28', t: 'hinh_hoc', q: [
    { c: `Hai đường thẳng vuông góc tạo ra mấy góc vuông?`, a: `$4$ góc vuông.`, s: `Giao nhau vuông góc tạo thành 4 góc vuông.`, d: 'nhan_biet' },
    { c: `Dùng dụng cụ nào để kiểm tra hai đường thẳng vuông góc?`, a: `Ê-ke.`, s: `Ê-ke có góc vuông để kiểm tra.`, d: 'nhan_biet' },
    { c: `Hình chữ nhật có mấy cặp cạnh vuông góc với nhau?`, a: `$4$ góc vuông (hay 4 cặp cạnh vuông góc).`, s: `Hình chữ nhật có 4 góc vuông.`, d: 'thong_hieu' },
    { c: `Hình vuông có hai đường chéo như thế nào với nhau?`, a: `Vuông góc với nhau.`, s: `Tính chất hình vuông: hai đường chéo vuông góc.`, d: 'thong_hieu' },
    { c: `Để vẽ đường cao của tam giác từ 1 đỉnh, ta kẻ đường thẳng như thế nào với cạnh đối diện?`, a: `Vuông góc.`, s: `Đường cao là đoạn vuông góc kẻ từ đỉnh xuống đáy.`, d: 'van_dung' }
  ]},
  { id: '2f7d1659-2df7-4f8d-83fb-09b73655cd3b', p: 'T4-B29', t: 'hinh_hoc', q: [
    { c: `Hai đường thẳng song song có cắt nhau không?`, a: `Không cắt nhau.`, s: `Hai đường thẳng song song không có điểm chung.`, d: 'nhan_biet' },
    { c: `Cạnh trên và cạnh dưới của hình chữ nhật có song song với nhau không?`, a: `Có.`, s: `Các cặp cạnh đối của HCN song song với nhau.`, d: 'nhan_biet' },
    { c: `Hình bình hành có bao nhiêu cặp cạnh song song?`, a: `$2$ cặp cạnh.`, s: `Hai cặp cạnh đối diện song song.`, d: 'thong_hieu' },
    { c: `Hình thang có bao nhiêu cặp cạnh song song?`, a: `$1$ cặp cạnh.`, s: `Hình thang chỉ có 1 cặp cạnh đáy song song.`, d: 'thong_hieu' },
    { c: `Đường ray xe lửa là hình ảnh của hai đường thẳng gì?`, a: `Song song.`, s: `Chúng luôn cách nhau một khoảng không đổi.`, d: 'van_dung' }
  ]}
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
