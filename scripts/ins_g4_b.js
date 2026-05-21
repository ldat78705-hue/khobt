const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const U = '8316c34e-765d-4b8c-9364-b683a17e33f8', G = 4, T = 'dai_so';

const B = [
  // ======== Bài 33. Ôn tập các số đến lớp triệu ========
  { id: '159204fd-0ee2-4dd6-a685-61c87ccc3cef', p: 'T4-B33', q: [
    { c: `Lớp triệu gồm những hàng nào?`, a: `Hàng triệu, chục triệu, trăm triệu.`, s: `Lớp triệu: triệu, chục triệu, trăm triệu.`, d: 'nhan_biet' },
    { c: `Đọc số: $7\\,432\\,560$.`, a: `Bảy triệu bốn trăm ba mươi hai nghìn năm trăm sáu mươi.`, s: `$7$ triệu, $432$ nghìn, $560$.`, d: 'nhan_biet' },
    { c: `Viết số: "Hai mươi ba triệu một trăm linh năm nghìn".`, a: `$23\\,105\\,000$.`, s: `$23\\,105\\,000$.`, d: 'nhan_biet' },
    { c: `Giá trị chữ số $4$ trong $34\\,567\\,890$?`, a: `$4\\,000\\,000$.`, s: `Chữ số $4$ ở hàng triệu: $4 \\times 1\\,000\\,000 = 4\\,000\\,000$.`, d: 'thong_hieu' },
    { c: `So sánh: $9\\,999\\,999$ và $10\\,000\\,000$.`, a: `$9\\,999\\,999 < 10\\,000\\,000$.`, s: `$9\\,999\\,999$ có $7$ chữ số, $10\\,000\\,000$ có $8$ chữ số. $7 < 8$ chữ số → nhỏ hơn.`, d: 'thong_hieu' },
    { c: `Số lớn nhất có $7$ chữ số là bao nhiêu?`, a: `$9\\,999\\,999$.`, s: `$7$ chữ số $9$: $9\\,999\\,999$.`, d: 'thong_hieu' },
    { c: `Dân số tỉnh A là $2\\,315\\,400$ người, tỉnh B là $1\\,987\\,600$ người. Tỉnh nào đông hơn?`, a: `Tỉnh A đông hơn.`, s: `$2\\,315\\,400 > 1\\,987\\,600$ → Tỉnh A đông hơn.`, d: 'van_dung' },
    { c: `Làm tròn $4\\,567\\,823$ đến hàng triệu.`, a: `$5\\,000\\,000$.`, s: `Hàng trăm nghìn $= 5 \\geq 5$ → làm tròn lên: $5\\,000\\,000$.`, d: 'van_dung' },
    { c: `Tìm số tự nhiên $x$ biết $3\\,000\\,000 < x < 3\\,000\\,003$ ($x$ chẵn).`, a: `$x = 3\\,000\\,002$.`, s: `$x \\in \\{3\\,000\\,001; 3\\,000\\,002\\}$. $x$ chẵn → $x = 3\\,000\\,002$.`, d: 'van_dung_cao' },
    { c: `Viết $5$ số có $7$ chữ số mà tổng các chữ số bằng $10$.`, a: `VD: $1\\,000\\,009$; $1\\,000\\,090$; $1\\,000\\,900$; $1\\,009\\,000$; $1\\,090\\,000$.`, s: `Nhiều đáp án. VD: dùng $1$ ở hàng triệu, $9$ ở một hàng bất kỳ, còn lại $0$.`, d: 'van_dung_cao' },
  ]},
  // ======== Bài 38. Nhân với số có một chữ số ========
  { id: '32bbf955-2094-4f7c-940c-5943ca689cd8', p: 'T4-B38', q: [
    { c: `Tính: $1\\,324 \\times 2$.`, a: `$2\\,648$.`, s: `$4 \\times 2 = 8$. $2 \\times 2 = 4$. $3 \\times 2 = 6$. $1 \\times 2 = 2$. KQ: $2\\,648$.`, d: 'nhan_biet' },
    { c: `Tính: $2\\,045 \\times 3$.`, a: `$6\\,135$.`, s: `$5 \\times 3 = 15$ (viết $5$ nhớ $1$). $4 \\times 3 + 1 = 13$ (viết $3$ nhớ $1$). $0 \\times 3 + 1 = 1$. $2 \\times 3 = 6$. KQ: $6\\,135$.`, d: 'nhan_biet' },
    { c: `Tính: $12\\,546 \\times 4$.`, a: `$50\\,184$.`, s: `$12\\,546 \\times 4 = 50\\,184$.`, d: 'nhan_biet' },
    { c: `Tính: $125\\,000 \\times 8$.`, a: `$1\\,000\\,000$.`, s: `$125 \\times 8 = 1\\,000$. $125\\,000 \\times 8 = 1\\,000\\,000$.`, d: 'thong_hieu' },
    { c: `$a \\times 1 = ?$ và $a \\times 0 = ?$`, a: `$a \\times 1 = a$; $a \\times 0 = 0$.`, s: `Nhân với $1$ giữ nguyên. Nhân với $0$ bằng $0$.`, d: 'thong_hieu' },
    { c: `Tính nhanh: $99\\,999 \\times 5$.`, a: `$499\\,995$.`, s: `$100\\,000 \\times 5 - 5 = 500\\,000 - 5 = 499\\,995$.`, d: 'thong_hieu' },
    { c: `Mỗi hộp có $1\\,250$ viên kẹo. Hỏi $6$ hộp có bao nhiêu viên?`, a: `$7\\,500$ viên.`, s: `$1\\,250 \\times 6 = 7\\,500$ viên.`, d: 'van_dung' },
    { c: `Ô tô chạy mỗi giờ $65$ km. Hỏi $4$ giờ chạy được bao nhiêu km?`, a: `$260$ km.`, s: `$65 \\times 4 = 260$ km.`, d: 'van_dung' },
    { c: `Tìm $x$: $x : 7 = 15\\,324$.`, a: `$x = 107\\,268$.`, s: `$x = 15\\,324 \\times 7 = 107\\,268$.`, d: 'van_dung_cao' },
    { c: `Tìm số bé nhất có $5$ chữ số chia hết cho $9$.`, a: `$10\\,008$.`, s: `Số bé nhất $5$ chữ số: $10\\,000$. $10\\,000 : 9 = 1\\,111$ dư $1$. $10\\,000 + (9-1) = 10\\,008$. Kiểm tra: $10\\,008 : 9 = 1\\,112$ ✓.`, d: 'van_dung_cao' },
  ]},
  // ======== Bài 49. Dãy số liệu ========
  { id: 'f54e0fe2-5287-4353-ae5b-76c1fd2118f9', p: 'T4-B49', t: 'xac_suat', q: [
    { c: `Dãy số liệu là gì?`, a: `Các số được ghi lại theo thứ tự từ điều tra, đo đạc.`, s: `Dãy số liệu là tập hợp các số thu được từ việc thu thập dữ liệu.`, d: 'nhan_biet' },
    { c: `Cho dãy: $3, 5, 7, 5, 3, 8$. Có bao nhiêu số liệu?`, a: `$6$.`, s: `Đếm: $6$ số liệu.`, d: 'nhan_biet' },
    { c: `Cho dãy: $4, 7, 4, 9, 7, 4$. Số $4$ xuất hiện mấy lần?`, a: `$3$ lần.`, s: `$4$ xuất hiện ở vị trí $1, 3, 6$: $3$ lần.`, d: 'nhan_biet' },
    { c: `Cho dãy: $10, 15, 20, 15, 10, 25$. Tìm giá trị lớn nhất và nhỏ nhất.`, a: `Lớn nhất: $25$, nhỏ nhất: $10$.`, s: `Sắp xếp: $10, 10, 15, 15, 20, 25$. Min $= 10$, Max $= 25$.`, d: 'thong_hieu' },
    { c: `Cân nặng $5$ bạn: $28$ kg, $32$ kg, $30$ kg, $35$ kg, $25$ kg. Tìm TB cộng.`, a: `$30$ kg.`, s: `$(28+32+30+35+25) : 5 = 150 : 5 = 30$ kg.`, d: 'thong_hieu' },
    { c: `Cho dãy: $5, 8, 5, 6, 8, 5$. Số nào xuất hiện nhiều nhất?`, a: `Số $5$ (xuất hiện $3$ lần).`, s: `$5$: $3$ lần; $8$: $2$ lần; $6$: $1$ lần. Số $5$ xuất hiện nhiều nhất.`, d: 'thong_hieu' },
    { c: `Điểm thi $6$ bạn: $8, 7, 9, 10, 6, 8$. Tính điểm trung bình.`, a: `$8$ điểm.`, s: `$(8+7+9+10+6+8) : 6 = 48 : 6 = 8$ điểm.`, d: 'van_dung' },
    { c: `$4$ tổ trồng cây: $35, 42, 38, 45$ cây. Tổng và TB?`, a: `Tổng $160$ cây. TB $40$ cây.`, s: `$35+42+38+45 = 160$. $160 : 4 = 40$ cây.`, d: 'van_dung' },
    { c: `Chuỗi $5$ số có TB $24$. Bỏ số lớn nhất ($36$) thì TB $4$ số còn lại?`, a: `$21$.`, s: `Tổng $5$ số $= 24 \\times 5 = 120$. Bỏ $36$: $120 - 36 = 84$. TB $= 84 : 4 = 21$.`, d: 'van_dung_cao' },
    { c: `TB cộng $3$ số là $45$. Thêm số $57$ thì TB $4$ số?`, a: `$48$.`, s: `Tổng $3$ số $= 45 \\times 3 = 135$. Tổng $4$ số $= 135 + 57 = 192$. TB $= 192 : 4 = 48$.`, d: 'van_dung_cao' },
  ]},
  // ======== Bài 53. Khái niệm phân số ========
  { id: 'df04d252-0f42-4ca2-8499-d4a759def530', p: 'T4-B53', q: [
    { c: `Phân số $\\frac{3}{4}$ đọc là gì?`, a: `Ba phần tư.`, s: `Tử số: $3$. Mẫu số: $4$. Đọc: "Ba phần tư".`, d: 'nhan_biet' },
    { c: `Mẫu số cho biết gì? Tử số cho biết gì?`, a: `Mẫu số: tổng số phần bằng nhau. Tử số: số phần đã lấy.`, s: `Mẫu số: chia thành bao nhiêu phần. Tử số: lấy bao nhiêu phần.`, d: 'nhan_biet' },
    { c: `Viết phân số: "Năm phần chín".`, a: `$\\frac{5}{9}$.`, s: `Tử $= 5$, mẫu $= 9$. $\\frac{5}{9}$.`, d: 'nhan_biet' },
    { c: `Một băng giấy chia $5$ phần bằng nhau, tô màu $2$ phần. Viết phân số chỉ phần tô màu.`, a: `$\\frac{2}{5}$.`, s: `Tô $2$ trên $5$ phần: $\\frac{2}{5}$.`, d: 'thong_hieu' },
    { c: `$\\frac{3}{3} = ?$`, a: `$1$.`, s: `$\\frac{3}{3} = 1$ (lấy tất cả các phần).`, d: 'thong_hieu' },
    { c: `$\\frac{0}{7} = ?$`, a: `$0$.`, s: `Tử $= 0$: $\\frac{0}{7} = 0$ (không lấy phần nào).`, d: 'thong_hieu' },
    { c: `Bánh chia $8$ phần. An ăn $3$ phần. Viết phân số bánh còn lại.`, a: `$\\frac{5}{8}$.`, s: `Còn: $8 - 3 = 5$ phần. Phân số: $\\frac{5}{8}$.`, d: 'van_dung' },
    { c: `Lớp $30$ HS, $18$ nữ. Viết phân số HS nữ.`, a: `$\\frac{18}{30} = \\frac{3}{5}$.`, s: `$\\frac{18}{30} = \\frac{18:6}{30:6} = \\frac{3}{5}$.`, d: 'van_dung' },
    { c: `$\\frac{7}{1} = ?$`, a: `$7$.`, s: `$\\frac{7}{1} = 7$ (mẫu $= 1$ → phân số = tử số).`, d: 'van_dung_cao' },
    { c: `Viết số $3$ dưới dạng phân số có mẫu $5$.`, a: `$\\frac{15}{5}$.`, s: `$3 = \\frac{3 \\times 5}{5} = \\frac{15}{5}$.`, d: 'van_dung_cao' },
  ]},
  // ======== Bài 60. Phép cộng phân số ========
  { id: 'c92bead8-7a4e-412b-9147-455accbed7ec', p: 'T4-B60', q: [
    { c: `Tính: $\\frac{2}{7} + \\frac{3}{7}$.`, a: `$\\frac{5}{7}$.`, s: `Cùng mẫu: $\\frac{2+3}{7} = \\frac{5}{7}$.`, d: 'nhan_biet' },
    { c: `Tính: $\\frac{1}{5} + \\frac{2}{5}$.`, a: `$\\frac{3}{5}$.`, s: `$\\frac{1+2}{5} = \\frac{3}{5}$.`, d: 'nhan_biet' },
    { c: `Muốn cộng hai phân số cùng mẫu thì làm thế nào?`, a: `Cộng tử số, giữ nguyên mẫu số.`, s: `$\\frac{a}{c} + \\frac{b}{c} = \\frac{a+b}{c}$.`, d: 'nhan_biet' },
    { c: `Tính: $\\frac{1}{3} + \\frac{1}{6}$.`, a: `$\\frac{1}{2}$.`, s: `Quy đồng: $\\frac{1}{3} = \\frac{2}{6}$. $\\frac{2}{6} + \\frac{1}{6} = \\frac{3}{6} = \\frac{1}{2}$.`, d: 'thong_hieu' },
    { c: `Tính: $\\frac{2}{5} + \\frac{1}{10}$.`, a: `$\\frac{1}{2}$.`, s: `$\\frac{2}{5} = \\frac{4}{10}$. $\\frac{4}{10} + \\frac{1}{10} = \\frac{5}{10} = \\frac{1}{2}$.`, d: 'thong_hieu' },
    { c: `Tính: $\\frac{3}{8} + \\frac{1}{4}$.`, a: `$\\frac{5}{8}$.`, s: `$\\frac{1}{4} = \\frac{2}{8}$. $\\frac{3}{8} + \\frac{2}{8} = \\frac{5}{8}$.`, d: 'thong_hieu' },
    { c: `Buổi sáng An đọc $\\frac{1}{4}$ quyển sách, buổi chiều đọc $\\frac{2}{4}$. Cả ngày đọc bao nhiêu?`, a: `$\\frac{3}{4}$ quyển sách.`, s: `$\\frac{1}{4} + \\frac{2}{4} = \\frac{3}{4}$ quyển sách.`, d: 'van_dung' },
    { c: `Tính: $\\frac{1}{2} + \\frac{1}{3}$.`, a: `$\\frac{5}{6}$.`, s: `MC $= 6$. $\\frac{3}{6} + \\frac{2}{6} = \\frac{5}{6}$.`, d: 'van_dung' },
    { c: `Tính: $\\frac{1}{2} + \\frac{1}{3} + \\frac{1}{6}$.`, a: `$1$.`, s: `$\\frac{3}{6} + \\frac{2}{6} + \\frac{1}{6} = \\frac{6}{6} = 1$.`, d: 'van_dung_cao' },
    { c: `Tìm $x$: $\\frac{3}{8} + x = \\frac{7}{8}$.`, a: `$x = \\frac{1}{2}$.`, s: `$x = \\frac{7}{8} - \\frac{3}{8} = \\frac{4}{8} = \\frac{1}{2}$.`, d: 'van_dung_cao' },
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
