const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const U = '8316c34e-765d-4b8c-9364-b683a17e33f8', G = 5, T = 'dai_so';

const B = [
  // ======== Bài 7: Hỗn số ========
  { id: '0bac9ff6-3971-4b85-a7be-40ed9e8a76b3', p: 'T5-B7', q: [
    { c: `Đọc hỗn số $2\\dfrac{3}{4}$.`, a: `Hai và ba phần tư.`, s: `Phần nguyên $2$, phần phân số $\\dfrac{3}{4}$.`, d: 'nhan_biet' },
    { c: `Viết hỗn số: phần nguyên $5$, phần phân số $\\dfrac{1}{3}$.`, a: `$5\\dfrac{1}{3}$.`, s: `Ghép: $5\\dfrac{1}{3}$.`, d: 'nhan_biet' },
    { c: `Chuyển $\\dfrac{7}{3}$ thành hỗn số.`, a: `$2\\dfrac{1}{3}$.`, s: `$7 : 3 = 2$ dư $1$. Hỗn số: $2\\dfrac{1}{3}$.`, d: 'nhan_biet' },
    { c: `Chuyển $3\\dfrac{2}{5}$ thành phân số.`, a: `$\\dfrac{17}{5}$.`, s: `$3\\dfrac{2}{5} = \\dfrac{3 \\times 5 + 2}{5} = \\dfrac{17}{5}$.`, d: 'thong_hieu' },
    { c: `So sánh: $1\\dfrac{1}{2}$ và $1\\dfrac{2}{3}$.`, a: `$1\\dfrac{1}{2} < 1\\dfrac{2}{3}$.`, s: `Phần nguyên bằng nhau. $\\dfrac{1}{2} = \\dfrac{3}{6} < \\dfrac{4}{6} = \\dfrac{2}{3}$.`, d: 'thong_hieu' },
    { c: `Chuyển $\\dfrac{23}{4}$ thành hỗn số.`, a: `$5\\dfrac{3}{4}$.`, s: `$23 : 4 = 5$ dư $3$. Hỗn số: $5\\dfrac{3}{4}$.`, d: 'thong_hieu' },
    { c: `Tính: $2\\dfrac{1}{3} + 1\\dfrac{1}{6}$.`, a: `$3\\dfrac{1}{2}$.`, s: `$\\dfrac{7}{3} + \\dfrac{7}{6} = \\dfrac{14}{6} + \\dfrac{7}{6} = \\dfrac{21}{6} = \\dfrac{7}{2} = 3\\dfrac{1}{2}$.`, d: 'van_dung' },
    { c: `Tính: $4\\dfrac{3}{4} - 2\\dfrac{1}{2}$.`, a: `$2\\dfrac{1}{4}$.`, s: `$\\dfrac{19}{4} - \\dfrac{5}{2} = \\dfrac{19}{4} - \\dfrac{10}{4} = \\dfrac{9}{4} = 2\\dfrac{1}{4}$.`, d: 'van_dung' },
    { c: `Sắp xếp giảm dần: $2\\dfrac{1}{2}$; $\\dfrac{11}{4}$; $2\\dfrac{3}{5}$.`, a: `$\\dfrac{11}{4} > 2\\dfrac{3}{5} > 2\\dfrac{1}{2}$.`, s: `$2\\dfrac{1}{2} = \\dfrac{50}{20}$; $\\dfrac{11}{4} = \\dfrac{55}{20}$; $2\\dfrac{3}{5} = \\dfrac{52}{20}$.`, d: 'van_dung_cao' },
    { c: `Tìm $x$: $x + 1\\dfrac{1}{3} = 3\\dfrac{5}{6}$.`, a: `$x = 2\\dfrac{1}{2}$.`, s: `$x = \\dfrac{23}{6} - \\dfrac{4}{3} = \\dfrac{23}{6} - \\dfrac{8}{6} = \\dfrac{15}{6} = \\dfrac{5}{2} = 2\\dfrac{1}{2}$.`, d: 'van_dung_cao' },
  ]},
  // ======== Bài 8: Ôn tập hình học và đo lường ========
  { id: 'fdf09b06-606e-4a0d-9edc-5fcec45ba368', p: 'T5-B8', t: 'hinh_hoc', q: [
    { c: `Chu vi hình vuông cạnh $6$ cm?`, a: `$24$ cm.`, s: `$C = 4 \\times 6 = 24$ cm.`, d: 'nhan_biet' },
    { c: `Diện tích HCN dài $8$ cm, rộng $5$ cm?`, a: `$40\\text{ cm}^2$.`, s: `$S = 8 \\times 5 = 40\\text{ cm}^2$.`, d: 'nhan_biet' },
    { c: `$1$ m $= ?$ cm.`, a: `$100$ cm.`, s: `$1$ m $= 100$ cm.`, d: 'nhan_biet' },
    { c: `$3$ km $= ?$ m.`, a: `$3\\,000$ m.`, s: `$1$ km $= 1\\,000$ m. $3$ km $= 3\\,000$ m.`, d: 'thong_hieu' },
    { c: `$5\\text{ dm}^2 = ?\\text{ cm}^2$.`, a: `$500\\text{ cm}^2$.`, s: `$1\\text{ dm}^2 = 100\\text{ cm}^2$. $5 \\times 100 = 500$.`, d: 'thong_hieu' },
    { c: `Chu vi HCN dài $12$ cm, rộng $7$ cm?`, a: `$38$ cm.`, s: `$C = (12 + 7) \\times 2 = 38$ cm.`, d: 'thong_hieu' },
    { c: `Hình vuông có chu vi $32$ cm. Tính diện tích.`, a: `$64\\text{ cm}^2$.`, s: `Cạnh $= 32 : 4 = 8$ cm. $S = 8 \\times 8 = 64\\text{ cm}^2$.`, d: 'van_dung' },
    { c: `HCN có diện tích $48\\text{ cm}^2$, chiều rộng $6$ cm. Tính chu vi.`, a: `$28$ cm.`, s: `Dài $= 48 : 6 = 8$ cm. $C = (8+6) \\times 2 = 28$ cm.`, d: 'van_dung' },
    { c: `Mảnh vườn HCN dài $25$ m, rộng $18$ m. Tính diện tích bằng $\\text{m}^2$ và $\\text{dm}^2$.`, a: `$450\\text{ m}^2 = 45\\,000\\text{ dm}^2$.`, s: `$S = 25 \\times 18 = 450\\text{ m}^2$. $1\\text{ m}^2 = 100\\text{ dm}^2$ → $45\\,000\\text{ dm}^2$.`, d: 'van_dung_cao' },
    { c: `Hình vuông và HCN có cùng chu vi $24$ cm. HCN dài $8$ cm. So sánh diện tích.`, a: `Hình vuông: $36\\text{ cm}^2$, HCN: $32\\text{ cm}^2$. HV lớn hơn.`, s: `HV: cạnh $= 6$, $S = 36$. HCN: rộng $= 4$, $S = 32$. HV lớn hơn.`, d: 'van_dung_cao' },
  ]},
  // ======== Bài 9: Luyện tập chung ========
  { id: '5e91cf7b-b2ff-4a25-b178-8763a39d6a95', p: 'T5-B9', q: [
    { c: `Tính: $4\\,567 + 3\\,298$.`, a: `$7\\,865$.`, s: `$4\\,567 + 3\\,298 = 7\\,865$.`, d: 'nhan_biet' },
    { c: `Rút gọn phân số $\\dfrac{12}{18}$.`, a: `$\\dfrac{2}{3}$.`, s: `$\\dfrac{12}{18} = \\dfrac{12:6}{18:6} = \\dfrac{2}{3}$.`, d: 'nhan_biet' },
    { c: `Chuyển $\\dfrac{11}{4}$ thành hỗn số.`, a: `$2\\dfrac{3}{4}$.`, s: `$11 : 4 = 2$ dư $3$. Hỗn số: $2\\dfrac{3}{4}$.`, d: 'nhan_biet' },
    { c: `Tính: $\\dfrac{5}{8} + \\dfrac{1}{4}$.`, a: `$\\dfrac{7}{8}$.`, s: `$\\dfrac{5}{8} + \\dfrac{2}{8} = \\dfrac{7}{8}$.`, d: 'thong_hieu' },
    { c: `$2$ giờ $15$ phút $= ?$ phút.`, a: `$135$ phút.`, s: `$2 \\times 60 + 15 = 135$ phút.`, d: 'thong_hieu' },
    { c: `Tính: $\\dfrac{3}{5} \\times \\dfrac{10}{9}$.`, a: `$\\dfrac{2}{3}$.`, s: `$\\dfrac{3 \\times 10}{5 \\times 9} = \\dfrac{30}{45} = \\dfrac{2}{3}$.`, d: 'thong_hieu' },
    { c: `Một tấm vải dài $20$ m. Đã bán $\\dfrac{3}{5}$ tấm vải. Còn lại bao nhiêu mét?`, a: `$8$ m.`, s: `Đã bán: $20 \\times \\dfrac{3}{5} = 12$ m. Còn: $20 - 12 = 8$ m.`, d: 'van_dung' },
    { c: `HCN dài $15$ cm, rộng bằng $\\dfrac{2}{3}$ dài. Tính diện tích.`, a: `$150\\text{ cm}^2$.`, s: `Rộng $= 15 \\times \\dfrac{2}{3} = 10$ cm. $S = 15 \\times 10 = 150\\text{ cm}^2$.`, d: 'van_dung' },
    { c: `Tìm $x$: $\\dfrac{x}{6} = \\dfrac{3}{4}$.`, a: `$x = \\dfrac{9}{2} = 4\\dfrac{1}{2}$. Sửa: $x = 4,5$ (không phải STN). Nếu đề yêu cầu STN thì không có.`, s: `$x = \\dfrac{3}{4} \\times 6 = \\dfrac{18}{4} = \\dfrac{9}{2}$.`, d: 'van_dung_cao' },
    { c: `Tính nhanh: $\\dfrac{1}{2} + \\dfrac{1}{6} + \\dfrac{1}{12} + \\dfrac{1}{20}$.`, a: `$\\dfrac{4}{5}$.`, s: `$\\dfrac{1}{1 \\times 2} + \\dfrac{1}{2 \\times 3} + \\dfrac{1}{3 \\times 4} + \\dfrac{1}{4 \\times 5} = 1 - \\dfrac{1}{5} = \\dfrac{4}{5}$.`, d: 'van_dung_cao' },
  ]},
  // ======== CĐ2 - Bài 10: Khái niệm số thập phân ========
  { id: '35892667-3778-464c-a123-09916b12d120', p: 'T5-B10', q: [
    { c: `Đọc số thập phân $0,7$.`, a: `Không phẩy bảy.`, s: `$0,7 = \\dfrac{7}{10}$.`, d: 'nhan_biet' },
    { c: `Viết số thập phân: \"Năm phẩy hai mươi ba\".`, a: `$5,23$.`, s: `$5,23$.`, d: 'nhan_biet' },
    { c: `$0,5 = \\dfrac{?}{10}$.`, a: `$\\dfrac{5}{10}$.`, s: `$0,5 = \\dfrac{5}{10}$.`, d: 'nhan_biet' },
    { c: `Chuyển $\\dfrac{3}{10}$ thành số thập phân.`, a: `$0,3$.`, s: `$\\dfrac{3}{10} = 0,3$.`, d: 'thong_hieu' },
    { c: `Chuyển $\\dfrac{47}{100}$ thành số thập phân.`, a: `$0,47$.`, s: `$\\dfrac{47}{100} = 0,47$.`, d: 'thong_hieu' },
    { c: `Số thập phân $3,05$ gồm mấy đơn vị và mấy phần trăm?`, a: `$3$ đơn vị và $5$ phần trăm.`, s: `$3,05 = 3 + \\dfrac{5}{100}$.`, d: 'thong_hieu' },
    { c: `Viết $2\\dfrac{7}{10}$ dưới dạng số thập phân.`, a: `$2,7$.`, s: `$2\\dfrac{7}{10} = 2 + 0,7 = 2,7$.`, d: 'van_dung' },
    { c: `Chuyển $\\dfrac{1}{4}$ thành số thập phân.`, a: `$0,25$.`, s: `$\\dfrac{1}{4} = \\dfrac{25}{100} = 0,25$.`, d: 'van_dung' },
    { c: `Viết $8$ m $5$ cm dưới dạng số thập phân (đơn vị mét).`, a: `$8,05$ m.`, s: `$5$ cm $= 0,05$ m. $8 + 0,05 = 8,05$ m.`, d: 'van_dung_cao' },
    { c: `Tìm chữ số thích hợp: $0,\\square 5 = \\dfrac{\\square 5}{100}$.`, a: `Chữ số $\\square$ bất kỳ từ $0$ đến $9$, ví dụ $0,35 = \\dfrac{35}{100}$.`, s: `$0,\\square 5$ có phần thập phân $2$ chữ số → $\\dfrac{\\square 5}{100}$.`, d: 'van_dung_cao' },
  ]},
  // ======== Bài 11: So sánh các số thập phân ========
  { id: '073f9523-dcc2-4a4b-a77b-65d175e75f53', p: 'T5-B11', q: [
    { c: `So sánh: $3,5$ và $3,8$.`, a: `$3,5 < 3,8$.`, s: `Phần nguyên bằng nhau ($3$). Hàng phần mười: $5 < 8$.`, d: 'nhan_biet' },
    { c: `So sánh: $7,2$ và $6,9$.`, a: `$7,2 > 6,9$.`, s: `Phần nguyên: $7 > 6$.`, d: 'nhan_biet' },
    { c: `So sánh: $0,45$ và $0,5$.`, a: `$0,45 < 0,5$.`, s: `$0,5 = 0,50$. Hàng phần mười: $4 < 5$.`, d: 'nhan_biet' },
    { c: `Sắp xếp tăng dần: $4,3$; $4,12$; $4,21$.`, a: `$4,12 < 4,21 < 4,3$.`, s: `$4,12 < 4,21 < 4,30$.`, d: 'thong_hieu' },
    { c: `So sánh: $9,100$ và $9,1$.`, a: `$9,100 = 9,1$.`, s: `$9,100 = 9,1$ (thêm số $0$ sau cùng không đổi giá trị).`, d: 'thong_hieu' },
    { c: `Tìm số thập phân $x$ biết $3,4 < x < 3,6$ ($x$ có $1$ chữ số thập phân).`, a: `$x = 3,5$.`, s: `$3,4 < 3,5 < 3,6$. Vậy $x = 3,5$.`, d: 'thong_hieu' },
    { c: `Sắp xếp giảm dần: $5,6$; $5,06$; $5,61$; $5,016$.`, a: `$5,61 > 5,6 > 5,06 > 5,016$.`, s: `So sánh lần lượt từng hàng.`, d: 'van_dung' },
    { c: `Lan cao $1,42$ m, Mai cao $1,4$ m. Ai cao hơn?`, a: `Lan cao hơn.`, s: `$1,42 > 1,40$. Lan cao hơn.`, d: 'van_dung' },
    { c: `Tìm $2$ số thập phân nằm giữa $3,1$ và $3,2$.`, a: `Ví dụ $3,12$ và $3,15$.`, s: `$3,1 < 3,12 < 3,15 < 3,2$.`, d: 'van_dung_cao' },
    { c: `Viết tất cả STP có $1$ chữ số thập phân lớn hơn $2$ và nhỏ hơn $3$.`, a: `$2,1$; $2,2$; $2,3$; ...; $2,9$.`, s: `$9$ số: $2,1$ đến $2,9$.`, d: 'van_dung_cao' },
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
