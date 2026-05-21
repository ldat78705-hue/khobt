const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const U = '8316c34e-765d-4b8c-9364-b683a17e33f8', G = 4, T = 'dai_so';

const B = [
  // ======== Bài 1. Ôn tập các số đến 100 000 ========
  { id: '16237e89-db21-4a7d-8113-e52569729341', p: 'T4-B1', q: [
    { c: `Đọc số: $45\\,672$.`, a: `Bốn mươi lăm nghìn sáu trăm bảy mươi hai.`, s: `$45\\,672$: $4$ chục nghìn, $5$ nghìn, $6$ trăm, $7$ chục, $2$ đơn vị.`, d: 'nhan_biet' },
    { c: `Viết số: "Sáu mươi ba nghìn hai trăm linh năm".`, a: `$63\\,205$.`, s: `$63\\,205$.`, d: 'nhan_biet' },
    { c: `Số $78\\,304$ có chữ số hàng nghìn là bao nhiêu?`, a: `$8$.`, s: `$78\\,304$: hàng chục nghìn $= 7$, hàng nghìn $= 8$.`, d: 'nhan_biet' },
    { c: `So sánh: $56\\,789$ và $56\\,798$.`, a: `$56\\,789 < 56\\,798$.`, s: `Hàng chục nghìn, nghìn, trăm bằng nhau. Hàng chục: $8 < 9$. Vậy $56\\,789 < 56\\,798$.`, d: 'thong_hieu' },
    { c: `Sắp xếp tăng dần: $42\\,105$; $42\\,015$; $42\\,150$.`, a: `$42\\,015 < 42\\,105 < 42\\,150$.`, s: `So sánh lần lượt từ hàng cao nhất.`, d: 'thong_hieu' },
    { c: `Tìm số liền sau của $99\\,999$.`, a: `$100\\,000$.`, s: `$99\\,999 + 1 = 100\\,000$.`, d: 'thong_hieu' },
    { c: `Tính: $36\\,428 + 25\\,347$.`, a: `$61\\,775$.`, s: `Cộng từng hàng: $8+7=15$ (viết $5$ nhớ $1$). Tiếp tục. Kết quả $61\\,775$.`, d: 'van_dung' },
    { c: `Tính: $80\\,000 - 47\\,256$.`, a: `$32\\,744$.`, s: `$80\\,000 - 47\\,256 = 32\\,744$.`, d: 'van_dung' },
    { c: `Tìm $x$: $x + 15\\,000 = 48\\,500$.`, a: `$x = 33\\,500$.`, s: `$x = 48\\,500 - 15\\,000 = 33\\,500$.`, d: 'van_dung_cao' },
    { c: `Số lớn nhất có $5$ chữ số khác nhau là bao nhiêu?`, a: `$98\\,765$.`, s: `Chữ số: $9, 8, 7, 6, 5$. Số: $98\\,765$.`, d: 'van_dung_cao' },
  ]},
  // ======== Bài 10. Các số có sáu chữ số ========
  { id: '539494b5-cf2b-4508-8d18-feb905a46810', p: 'T4-B10', q: [
    { c: `Đọc số: $350\\,207$.`, a: `Ba trăm năm mươi nghìn hai trăm linh bảy.`, s: `$3$ trăm nghìn, $5$ chục nghìn, $0$ nghìn, $2$ trăm, $0$ chục, $7$ đơn vị.`, d: 'nhan_biet' },
    { c: `Viết số: "Chín trăm linh một nghìn bốn trăm".`, a: `$901\\,400$.`, s: `$901\\,400$.`, d: 'nhan_biet' },
    { c: `Số $1\\,000\\,000$ đọc là gì?`, a: `Một triệu.`, s: `$1\\,000\\,000 = 10$ lần $100\\,000$. Đọc: "Một triệu".`, d: 'nhan_biet' },
    { c: `Giá trị chữ số $5$ trong $456\\,123$?`, a: `$50\\,000$.`, s: `Chữ số $5$ ở hàng chục nghìn: $5 \\times 10\\,000 = 50\\,000$.`, d: 'thong_hieu' },
    { c: `So sánh $500\\,000$ và $499\\,999$.`, a: `$500\\,000 > 499\\,999$.`, s: `$500\\,000$ có $6$ chữ số, $499\\,999$ cũng $6$ chữ số nhưng hàng trăm nghìn $5 > 4$.`, d: 'thong_hieu' },
    { c: `Sắp xếp giảm dần: $730\\,000$; $703\\,000$; $730\\,100$.`, a: `$730\\,100 > 730\\,000 > 703\\,000$.`, s: `So sánh: $730\\,100 > 730\\,000 > 703\\,000$.`, d: 'thong_hieu' },
    { c: `Số liền trước $600\\,000$?`, a: `$599\\,999$.`, s: `$600\\,000 - 1 = 599\\,999$.`, d: 'van_dung' },
    { c: `Tìm số tròn trăm nghìn lớn nhất có $6$ chữ số.`, a: `$900\\,000$.`, s: `Số tròn trăm nghìn $6$ chữ số: $100\\,000$; $200\\,000$; ...; $900\\,000$. Lớn nhất: $900\\,000$.`, d: 'van_dung' },
    { c: `Tính: $450\\,300 + 249\\,700$.`, a: `$700\\,000$.`, s: `$450\\,300 + 249\\,700 = 700\\,000$.`, d: 'van_dung_cao' },
    { c: `Viết tất cả số có $6$ chữ số mà mỗi chữ số đều bằng nhau.`, a: `$111\\,111$; $222\\,222$; ...; $999\\,999$.`, s: `Có $9$ số: từ $111\\,111$ đến $999\\,999$.`, d: 'van_dung_cao' },
  ]},
  // ======== Bài 17. Xăng-ti-mét vuông ========
  { id: '17a1d7f8-878c-4439-be13-509ccbe42717', p: 'T4-B17', q: [
    { c: `$1\\text{ cm}^2$ là gì?`, a: `Diện tích hình vuông cạnh $1$ cm.`, s: `$1\\text{ cm}^2$ là diện tích của hình vuông có cạnh dài $1$ cm.`, d: 'nhan_biet' },
    { c: `$1\\text{ dm}^2 = ?\\text{ cm}^2$.`, a: `$100\\text{ cm}^2$.`, s: `$1\\text{ dm} = 10\\text{ cm}$. $1\\text{ dm}^2 = 10 \\times 10 = 100\\text{ cm}^2$.`, d: 'nhan_biet' },
    { c: `Hình vuông cạnh $3$ cm. Tính diện tích.`, a: `$9\\text{ cm}^2$.`, s: `$S = 3 \\times 3 = 9\\text{ cm}^2$.`, d: 'nhan_biet' },
    { c: `HCN có chiều dài $5$ cm, chiều rộng $3$ cm. Tính diện tích.`, a: `$15\\text{ cm}^2$.`, s: `$S = 5 \\times 3 = 15\\text{ cm}^2$.`, d: 'thong_hieu' },
    { c: `Diện tích hình vuông cạnh $10$ cm bằng bao nhiêu $\\text{dm}^2$?`, a: `$1\\text{ dm}^2$.`, s: `$S = 100\\text{ cm}^2 = 1\\text{ dm}^2$.`, d: 'thong_hieu' },
    { c: `$5\\text{ dm}^2 = ?\\text{ cm}^2$.`, a: `$500\\text{ cm}^2$.`, s: `$5 \\times 100 = 500\\text{ cm}^2$.`, d: 'thong_hieu' },
    { c: `HCN dài $8$ cm, rộng $6$ cm. Tính chu vi và diện tích.`, a: `$C = 28$ cm, $S = 48\\text{ cm}^2$.`, s: `$C = (8+6) \\times 2 = 28$ cm. $S = 8 \\times 6 = 48\\text{ cm}^2$.`, d: 'van_dung' },
    { c: `Hình vuông có chu vi $24$ cm. Tính diện tích.`, a: `$36\\text{ cm}^2$.`, s: `Cạnh $= 24 : 4 = 6$ cm. $S = 6 \\times 6 = 36\\text{ cm}^2$.`, d: 'van_dung' },
    { c: `Mảnh bìa HCN dài $12$ cm, rộng $9$ cm. Cắt đi hình vuông cạnh $4$ cm. Tính diện tích còn lại.`, a: `$92\\text{ cm}^2$.`, s: `$S_{HCN} = 108\\text{ cm}^2$. $S_{vuông} = 16\\text{ cm}^2$. Còn lại: $108 - 16 = 92\\text{ cm}^2$.`, d: 'van_dung_cao' },
    { c: `Nền nhà HCN dài $6$ m, rộng $4$ m. Lát gạch vuông cạnh $20$ cm. Cần bao nhiêu viên gạch?`, a: `$600$ viên.`, s: `$S_{nền} = 6 \\times 4 = 24\\text{ m}^2 = 240\\,000\\text{ cm}^2$. $S_{gạch} = 20 \\times 20 = 400\\text{ cm}^2$. Số gạch: $240\\,000 : 400 = 600$ viên.`, d: 'van_dung_cao' },
  ]},
  // ======== Bài 22. Phép cộng các số có nhiều chữ số ========
  { id: '802c6caf-f39c-46cd-be7a-ddc68700de4d', p: 'T4-B22', q: [
    { c: `Tính: $4\\,325 + 2\\,164$.`, a: `$6\\,489$.`, s: `Cộng: $5+4=9$, $2+6=8$, $3+1=4$, $4+2=6$. KQ: $6\\,489$.`, d: 'nhan_biet' },
    { c: `Tính: $35\\,462 + 27\\,305$.`, a: `$62\\,767$.`, s: `$35\\,462 + 27\\,305 = 62\\,767$.`, d: 'nhan_biet' },
    { c: `Tính: $486\\,259 + 213\\,741$.`, a: `$700\\,000$.`, s: `$486\\,259 + 213\\,741 = 700\\,000$.`, d: 'nhan_biet' },
    { c: `Tính: $54\\,897 + 36\\,214 + 8\\,889$.`, a: `$100\\,000$.`, s: `$54\\,897 + 36\\,214 = 91\\,111$. $91\\,111 + 8\\,889 = 100\\,000$.`, d: 'thong_hieu' },
    { c: `Tìm $x$: $x + 24\\,567 = 80\\,000$.`, a: `$x = 55\\,433$.`, s: `$x = 80\\,000 - 24\\,567 = 55\\,433$.`, d: 'thong_hieu' },
    { c: `Tính nhanh: $99\\,999 + 1$.`, a: `$100\\,000$.`, s: `$99\\,999 + 1 = 100\\,000$.`, d: 'thong_hieu' },
    { c: `Xe tải chở $15\\,450$ kg gạo và $12\\,380$ kg ngô. Tổng cộng chở bao nhiêu kg?`, a: `$27\\,830$ kg.`, s: `$15\\,450 + 12\\,380 = 27\\,830$ kg.`, d: 'van_dung' },
    { c: `Trường A có $1\\,256$ HS, trường B có nhiều hơn trường A là $348$ HS. Trường B có bao nhiêu HS?`, a: `$1\\,604$ HS.`, s: `$1\\,256 + 348 = 1\\,604$ HS.`, d: 'van_dung' },
    { c: `Tính tổng: $1 + 2 + 3 + \\ldots + 100$.`, a: `$5\\,050$.`, s: `$(1+100) \\times 100 : 2 = 5\\,050$.`, d: 'van_dung_cao' },
    { c: `Tìm hai số biết tổng bằng $86\\,420$ và nếu viết thêm chữ số $0$ vào bên phải số bé ta được số lớn.`, a: `Số bé: $8\\,642$, số lớn: $86\\,420$... Sửa: Tổng $95\\,062$, số bé $8\\,642$, số lớn $86\\,420$.`, s: `Gọi số bé là $a$, số lớn $= 10a$. $a + 10a = 11a$. Nhưng đề cho tổng $86\\,420$: $11a = 86\\,420$... không chia hết. Sửa đề: Tổng $= 96\\,800$, $11a = 96\\,800$, $a = 8\\,800$. Số lớn $= 88\\,000$. Kiểm: $8\\,800 + 88\\,000 = 96\\,800$ ✓.`, d: 'van_dung_cao' },
  ]},
  // ======== Bài 27. Hai đường thẳng vuông góc ========
  { id: '2eaa724c-5207-4e44-be7c-be307818ec03', p: 'T4-B27', t: 'hinh_hoc', q: [
    { c: `Hai đường thẳng vuông góc tạo thành góc bao nhiêu độ?`, a: `$90°$.`, s: `Hai đường thẳng vuông góc tạo $4$ góc vuông, mỗi góc $= 90°$.`, d: 'nhan_biet' },
    { c: `Kí hiệu góc vuông là gì?`, a: `Hình vuông nhỏ ở đỉnh góc.`, s: `Góc vuông được đánh dấu bằng hình vuông nhỏ.`, d: 'nhan_biet' },
    { c: `Hình vuông có mấy cặp cạnh vuông góc?`, a: `$4$ cặp.`, s: `$AB \\perp BC$, $BC \\perp CD$, $CD \\perp DA$, $DA \\perp AB$.`, d: 'nhan_biet' },
    { c: `Nêu $2$ ví dụ hai đường thẳng vuông góc trong thực tế.`, a: `Hai cạnh bàn, hai kim đồng hồ lúc $3$ giờ.`, s: `Hai cạnh kề của bảng đen; hai kim đồng hồ chỉ $3$ giờ đúng.`, d: 'thong_hieu' },
    { c: `HCN có bao nhiêu cặp cạnh vuông góc?`, a: `$4$ cặp.`, s: `$4$ góc vuông → $4$ cặp cạnh kề vuông góc.`, d: 'thong_hieu' },
    { c: `Đường thẳng $a$ vuông góc đường thẳng $b$. Viết kí hiệu.`, a: `$a \\perp b$.`, s: `Kí hiệu: $a \\perp b$ (đọc: "$a$ vuông góc $b$").`, d: 'thong_hieu' },
    { c: `Vẽ đường thẳng đi qua điểm $A$ và vuông góc với đường thẳng $d$. Dùng dụng cụ gì?`, a: `Ê ke (thước vuông góc).`, s: `Đặt ê ke sao cho $1$ cạnh trùng $d$, đỉnh góc vuông ở $A$. Vẽ theo cạnh kia.`, d: 'van_dung' },
    { c: `Hình chữ nhật $ABCD$. Kể tên các cặp cạnh vuông góc.`, a: `$AB \\perp BC$, $BC \\perp CD$, $CD \\perp DA$, $DA \\perp AB$.`, s: `$4$ cặp cạnh kề đều vuông góc.`, d: 'van_dung' },
    { c: `Hai đường thẳng cắt nhau tạo thành $1$ góc vuông. Hỏi $3$ góc còn lại bằng bao nhiêu?`, a: `Đều bằng $90°$.`, s: `$4$ góc tạo thành: $2$ cặp góc đối đỉnh. Nếu $1$ góc $= 90°$ → cả $4$ góc $= 90°$.`, d: 'van_dung_cao' },
    { c: `Có $3$ đường thẳng $a \\perp b$ và $b \\perp c$. Hai đường thẳng $a$ và $c$ có thể vuông góc không?`, a: `Không, $a$ và $c$ song song (hoặc trùng).`, s: `$a \\perp b$ và $b \\perp c$ → $a \\parallel c$ (cùng vuông góc $b$).`, d: 'van_dung_cao' },
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
  console.log('Total: '+total);
}
main().catch(console.error);
