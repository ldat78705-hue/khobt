const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const U = '8316c34e-765d-4b8c-9364-b683a17e33f8', G = 5, T = 'hinh_hoc';

const B = [
  { id: '48058a92-41f6-4f76-9ee2-ea4b81b46446', p: 'T5-B49', t: 'hinh_hoc', q: [
    { c: `Hình khai triển của hình lập phương gồm bao nhiêu hình vuông?`, a: `$6$ hình vuông.`, s: `Hình lập phương có 6 mặt là các hình vuông bằng nhau.`, d: 'nhan_biet' },
    { c: `Hình khai triển của hình hộp chữ nhật gồm bao nhiêu hình chữ nhật?`, a: `$6$ hình chữ nhật.`, s: `Hình hộp chữ nhật có 6 mặt đều là hình chữ nhật.`, d: 'nhan_biet' },
    { c: `Hình khai triển của hình trụ gồm những hình gì?`, a: `Hai hình tròn và một hình chữ nhật (hoặc hình vuông).`, s: `Hai đáy là hai hình tròn, mặt xung quanh trải phẳng là hình chữ nhật.`, d: 'nhan_biet' },
    { c: `Nếu cắt dọc theo một đường sinh của hình trụ và trải phẳng ra, ta được hình gì?`, a: `Hình chữ nhật (hoặc hình vuông).`, s: `Mặt xung quanh của hình trụ trải phẳng ra là hình chữ nhật.`, d: 'thong_hieu' },
    { c: `Hình lập phương có bao nhiêu đỉnh?`, a: `$8$ đỉnh.`, s: `Hình lập phương có 8 đỉnh.`, d: 'nhan_biet' },
    { c: `Một hình khai triển gồm 4 hình vuông và 2 hình vuông nữa ở hai bên. Đó là khai triển của hình gì?`, a: `Hình lập phương.`, s: `Đó là một trong các dạng khai triển của hình lập phương.`, d: 'thong_hieu' },
    { c: `Chiều dài hình chữ nhật khi trải phẳng mặt xung quanh hình trụ bằng gì của đáy hình trụ?`, a: `Chu vi đáy.`, s: `Chiều dài mặt phẳng trải ra quấn vừa đủ một vòng đáy, nên bằng chu vi đáy.`, d: 'van_dung' },
    { c: `Hình hộp chữ nhật có bao nhiêu cạnh?`, a: `$12$ cạnh.`, s: `Hình hộp chữ nhật có 4 cạnh dài, 4 cạnh rộng, 4 cạnh cao.`, d: 'nhan_biet' },
    { c: `Một hình hộp chữ nhật có $3$ kích thước đôi một khác nhau. Trong khai triển, có tối đa bao nhiêu cặp hình chữ nhật bằng nhau?`, a: `$3$ cặp.`, s: `Các mặt đối diện bằng nhau nên có 3 cặp mặt bằng nhau.`, d: 'thong_hieu' },
    { c: `Khai triển của hình chóp tứ giác đều (không có trong bài, nhưng nếu là hình có 1 đáy hình vuông và 4 tam giác thì là hình gì?)`, a: `Hình chóp tứ giác.`, s: `(Câu hỏi tư duy thêm).`, d: 'van_dung_cao' },
  ]},
  { id: 'bf95ea48-164c-4f8a-bc02-019deb60fd09', p: 'T5-B50', t: 'hinh_hoc', q: [
    { c: `Hộp chữ nhật có chiều dài $5$ cm, rộng $3$ cm, cao $4$ cm. Diện tích xung quanh là?`, a: `$64\\text{ cm}^2$.`, s: `$S_{xq} = (5 + 3) \\times 2 \\times 4 = 64\\text{ cm}^2$.`, d: 'thong_hieu' },
    { c: `Cùng kích thước trên (dài $5$ cm, rộng $3$ cm, cao $4$ cm). Diện tích toàn phần là?`, a: `$94\\text{ cm}^2$.`, s: `$S_{tp} = S_{xq} + 2 \\times S_{\\text{đáy}} = 64 + 2 \\times (5 \\times 3) = 64 + 30 = 94\\text{ cm}^2$.`, d: 'thong_hieu' },
    { c: `Công thức tính diện tích xung quanh của hình hộp chữ nhật?`, a: `Chu vi đáy nhân với chiều cao.`, s: `$S_{xq} = (a + b) \\times 2 \\times c$.`, d: 'nhan_biet' },
    { c: `Một phòng học dài $8$ m, rộng $6$ m, cao $3,5$ m. Tính diện tích bốn bức tường (không trừ cửa).`, a: `$98\\text{ m}^2$.`, s: `$S_{xq} = (8 + 6) \\times 2 \\times 3,5 = 98\\text{ m}^2$.`, d: 'van_dung' },
    { c: `Hình hộp chữ nhật có đáy là hình vuông cạnh $4$ cm, cao $5$ cm. Tính diện tích toàn phần.`, a: `$112\\text{ cm}^2$.`, s: `$S_{xq} = (4+4)\\times 2 \\times 5 = 80$. $S_{tp} = 80 + 2 \\times (4\\times 4) = 112\\text{ cm}^2$.`, d: 'van_dung' },
    { c: `Tính diện tích giấy cần để làm một hộp chữ nhật không nắp, dài $10$ cm, rộng $6$ cm, cao $5$ cm.`, a: `$220\\text{ cm}^2$.`, s: `$S = S_{xq} + 1 \\times S_{\\text{đáy}} = (10+6)\\times 2\\times 5 + 10\\times 6 = 160 + 60 = 220\\text{ cm}^2$.`, d: 'van_dung_cao' },
    { c: `Hình hộp có tổng diện tích hai đáy là $40\\text{ m}^2$, diện tích toàn phần là $140\\text{ m}^2$. Diện tích xung quanh là?`, a: `$100\\text{ m}^2$.`, s: `$S_{xq} = S_{tp} - S_{2\\text{ đáy}} = 140 - 40 = 100\\text{ m}^2$.`, d: 'thong_hieu' },
    { c: `Diện tích xung quanh của hình hộp là $120\\text{ cm}^2$, chiều cao là $6$ cm. Tính chu vi đáy.`, a: `$20$ cm.`, s: `Chu vi đáy $= S_{xq} : h = 120 : 6 = 20$ cm.`, d: 'van_dung' },
    { c: `Chu vi đáy là $30$ cm, chiều cao $5$ cm. Tính diện tích xung quanh.`, a: `$150\\text{ cm}^2$.`, s: `$30 \\times 5 = 150\\text{ cm}^2$.`, d: 'nhan_biet' },
    { c: `Người ta quét vôi một căn phòng $5 \\times 4 \\times 3$ (m). Trừ cửa $4\\text{ m}^2$. Diện tích quét vôi (gồm 4 tường và trần)?`, a: `$70\\text{ m}^2$.`, s: `$S_{xq} = (5+4)\\times 2\\times 3 = 54$. Trần: $5\\times 4 = 20$. Quét vôi: $54 + 20 - 4 = 70\\text{ m}^2$.`, d: 'van_dung_cao' },
  ]},
  { id: 'b2fd92a5-42ae-4b7c-924a-172f3046f921', p: 'T5-B51', t: 'hinh_hoc', q: [
    { c: `Diện tích xung quanh hình lập phương cạnh $3$ cm là bao nhiêu?`, a: `$36\\text{ cm}^2$.`, s: `$S_{xq} = a \\times a \\times 4 = 3 \\times 3 \\times 4 = 36\\text{ cm}^2$.`, d: 'thong_hieu' },
    { c: `Diện tích toàn phần hình lập phương cạnh $3$ cm là bao nhiêu?`, a: `$54\\text{ cm}^2$.`, s: `$S_{tp} = a \\times a \\times 6 = 3 \\times 3 \\times 6 = 54\\text{ cm}^2$.`, d: 'thong_hieu' },
    { c: `Diện tích một mặt của hình lập phương là $16\\text{ cm}^2$. Tính diện tích toàn phần.`, a: `$96\\text{ cm}^2$.`, s: `$16 \\times 6 = 96\\text{ cm}^2$.`, d: 'nhan_biet' },
    { c: `Diện tích xung quanh hình lập phương là $100\\text{ cm}^2$. Tính diện tích một mặt.`, a: `$25\\text{ cm}^2$.`, s: `$100 : 4 = 25\\text{ cm}^2$.`, d: 'thong_hieu' },
    { c: `Nếu gấp cạnh hình lập phương lên $2$ lần thì diện tích toàn phần gấp lên mấy lần?`, a: `$4$ lần.`, s: `Diện tích tỉ lệ với bình phương cạnh. $2^2 = 4$ lần.`, d: 'van_dung_cao' },
    { c: `Hình lập phương không có nắp cạnh $5$ cm. Diện tích các mặt ngoài là bao nhiêu?`, a: `$125\\text{ cm}^2$.`, s: `Hộp không nắp có 5 mặt. $5 \\times 5 \\times 5 = 125\\text{ cm}^2$.`, d: 'van_dung' },
    { c: `Diện tích toàn phần hình lập phương là $216\\text{ cm}^2$. Cạnh hình lập phương là bao nhiêu?`, a: `$6$ cm.`, s: `Diện tích 1 mặt: $216 : 6 = 36$. Cạnh: $6$ cm (vì $6 \\times 6 = 36$).`, d: 'van_dung_cao' },
    { c: `Một khối rubik hình lập phương có diện tích toàn phần $54\\text{ cm}^2$. Diện tích xung quanh là?`, a: `$36\\text{ cm}^2$.`, s: `Diện tích 1 mặt: $54 : 6 = 9$. $S_{xq} = 9 \\times 4 = 36\\text{ cm}^2$.`, d: 'van_dung' },
    { c: `Tổng độ dài tất cả các cạnh của hình lập phương là $48$ cm. Diện tích toàn phần là?`, a: `$96\\text{ cm}^2$.`, s: `Cạnh: $48 : 12 = 4$ cm. $S_{tp} = 4 \\times 4 \\times 6 = 96\\text{ cm}^2$.`, d: 'van_dung_cao' },
    { c: `Tính diện tích xung quanh HLP có cạnh $1,5$ m.`, a: `$9\\text{ m}^2$.`, s: `$1,5 \\times 1,5 \\times 4 = 9\\text{ m}^2$.`, d: 'van_dung' },
  ]},
  { id: 'd154a404-4552-4d3e-b4cb-da1764244023', p: 'T5-B52', t: 'hinh_hoc', q: [
    { c: `Công thức tính thể tích hình hộp chữ nhật?`, a: `$V = a \\times b \\times c$.`, s: `Thể tích bằng chiều dài nhân chiều rộng nhân chiều cao.`, d: 'nhan_biet' },
    { c: `Hộp chữ nhật dài $5$ cm, rộng $4$ cm, cao $3$ cm. Thể tích là?`, a: `$60\\text{ cm}^3$.`, s: `$V = 5 \\times 4 \\times 3 = 60\\text{ cm}^3$.`, d: 'thong_hieu' },
    { c: `Diện tích đáy hình hộp là $20\\text{ cm}^2$, chiều cao $6$ cm. Thể tích?`, a: `$120\\text{ cm}^3$.`, s: `$V = S_{\\text{đáy}} \\times h = 20 \\times 6 = 120\\text{ cm}^3$.`, d: 'nhan_biet' },
    { c: `Một bể bơi dài $20$ m, rộng $10$ m, sâu $1,5$ m. Thể tích bể là bao nhiêu?`, a: `$300\\text{ m}^3$.`, s: `$20 \\times 10 \\times 1,5 = 300\\text{ m}^3$.`, d: 'van_dung' },
    { c: `Thể tích hình hộp chữ nhật là $120\\text{ cm}^3$, đáy dài $6$ cm, rộng $5$ cm. Chiều cao?`, a: `$4$ cm.`, s: `Chiều cao $= V : (a \\times b) = 120 : 30 = 4$ cm.`, d: 'van_dung' },
    { c: `Nếu gấp đôi cả chiều dài, chiều rộng và chiều cao thì thể tích gấp lên mấy lần?`, a: `$8$ lần.`, s: `$2 \\times 2 \\times 2 = 8$ lần.`, d: 'van_dung_cao' },
    { c: `Một viên gạch hình hộp chữ nhật có thể tích $1\\,200\\text{ cm}^3$, dài $20$ cm, rộng $10$ cm. Tính chiều cao.`, a: `$6$ cm.`, s: `$1\\,200 : (20 \\times 10) = 6$ cm.`, d: 'thong_hieu' },
    { c: `Thể tích $V=0,5\\text{ m}^3$. Đổi ra $\\text{dm}^3$?`, a: `$500\\text{ dm}^3$.`, s: `$0,5 \\times 1\\,000 = 500\\text{ dm}^3$.`, d: 'nhan_biet' },
    { c: `Bể có kích thước $1,2$ m x $0,8$ m x $0,5$ m. Bể chứa được bao nhiêu lít nước?`, a: `$480$ lít.`, s: `$V = 1,2 \\times 0,8 \\times 0,5 = 0,48\\text{ m}^3 = 480\\text{ dm}^3 = 480$ lít.`, d: 'van_dung_cao' },
    { c: `Một cái thùng chứa đầy $60$ lít nước. Biết thùng rộng $3$ dm, dài $4$ dm. Tính chiều cao thùng.`, a: `$5$ dm.`, s: `$60$ lít $= 60\\text{ dm}^3$. Cao $= 60 : (3 \\times 4) = 5$ dm.`, d: 'van_dung' },
  ]},
  { id: '5e2512e2-5062-4870-b4a9-620de93bee9b', p: 'T5-B53', t: 'hinh_hoc', q: [
    { c: `Công thức tính thể tích hình lập phương cạnh $a$?`, a: `$V = a \\times a \\times a$.`, s: `Thể tích HLP bằng cạnh nhân cạnh nhân cạnh.`, d: 'nhan_biet' },
    { c: `HLP có cạnh $4$ cm. Thể tích là bao nhiêu?`, a: `$64\\text{ cm}^3$.`, s: `$V = 4 \\times 4 \\times 4 = 64\\text{ cm}^3$.`, d: 'thong_hieu' },
    { c: `Diện tích một mặt của HLP là $25\\text{ cm}^2$. Thể tích HLP là?`, a: `$125\\text{ cm}^3$.`, s: `Cạnh $= 5$ cm (vì $5 \\times 5 = 25$). $V = 5 \\times 5 \\times 5 = 125\\text{ cm}^3$.`, d: 'van_dung' },
    { c: `Tổng độ dài các cạnh HLP là $36$ cm. Thể tích là bao nhiêu?`, a: `$27\\text{ cm}^3$.`, s: `Cạnh $= 36 : 12 = 3$ cm. $V = 3 \\times 3 \\times 3 = 27\\text{ cm}^3$.`, d: 'van_dung_cao' },
    { c: `Thể tích HLP là $8\\text{ cm}^3$. Tính diện tích toàn phần của nó.`, a: `$24\\text{ cm}^2$.`, s: `Cạnh $= 2$ cm (vì $2 \\times 2 \\times 2 = 8$). $S_{tp} = 2 \\times 2 \\times 6 = 24\\text{ cm}^2$.`, d: 'van_dung_cao' },
    { c: `Nếu gấp cạnh HLP lên $3$ lần thì thể tích gấp lên bao nhiêu lần?`, a: `$27$ lần.`, s: `$3 \\times 3 \\times 3 = 27$ lần.`, d: 'van_dung' },
    { c: `Một khối kim loại HLP cạnh $0,2$ m. Biết $1\\text{ dm}^3$ nặng $5$ kg. Khối kim loại nặng bao nhiêu?`, a: `$40$ kg.`, s: `$0,2\\text{ m} = 2\\text{ dm}$. $V = 2^3 = 8\\text{ dm}^3$. Nặng: $8 \\times 5 = 40$ kg.`, d: 'van_dung_cao' },
    { c: `HLP có cạnh $0,5$ m. Tính thể tích.`, a: `$0,125\\text{ m}^3$.`, s: `$0,5 \\times 0,5 \\times 0,5 = 0,125\\text{ m}^3$.`, d: 'thong_hieu' },
    { c: `Thể tích HLP là $1\\text{ m}^3$. Cạnh của nó là?`, a: `$1$ m.`, s: `$1 \\times 1 \\times 1 = 1$.`, d: 'nhan_biet' },
    { c: `Một bể nước hình lập phương có cạnh $1,5$ m chứa đầy nước. Lượng nước trong bể là?`, a: `$3\\,375$ lít.`, s: `$V = 1,5^3 = 3,375\\text{ m}^3 = 3\\,375$ lít.`, d: 'van_dung' },
  ]},
  { id: '31aa8371-bf4d-422c-9ff4-26be20dc70a0', p: 'T5-B54', t: 'hinh_hoc', q: [
    { c: `Một cái hộp kích thước $10\\text{ cm} \\times 8\\text{ cm} \\times 5\\text{ cm}$. Hỏi xếp được bao nhiêu khối lập phương cạnh $1$ cm vào đầy hộp?`, a: `$400$ khối.`, s: `$V = 10 \\times 8 \\times 5 = 400\\text{ cm}^3$. Mỗi khối $1\\text{ cm}^3$ nên xếp được $400$ khối.`, d: 'van_dung' },
    { c: `Hộp lập phương cạnh $1$ dm. Xếp các viên gạch lập phương cạnh $2$ cm vào hộp. Cần bao nhiêu viên?`, a: `$125$ viên.`, s: `$1\\text{ dm} = 10\\text{ cm}$. $10 : 2 = 5$ viên dọc mỗi cạnh. Số viên: $5 \\times 5 \\times 5 = 125$.`, d: 'van_dung_cao' },
    { c: `Một khối gỗ HHCN dài $8$ cm, rộng $5$ cm, cao $6$ cm được sơn các mặt ngoài. Cắt thành các khối LP $1$ cm. Có bao nhiêu khối không được sơn mặt nào?`, a: `$72$ khối.`, s: `Kích thước phần bên trong: $(8-2)\\times(5-2)\\times(6-2) = 6 \\times 3 \\times 4 = 72$.`, d: 'van_dung_cao' },
    { c: `Ước lượng thể tích một cái chai nước khoáng thường gặp.`, a: `$500\\text{ cm}^3$ (hoặc $500$ ml).`, s: `Chai nước trung bình khoảng $500$ ml.`, d: 'nhan_biet' },
    { c: `Một phòng học có thể tích $150\\text{ m}^3$, chiều cao $3$ m. Diện tích mặt sàn là bao nhiêu?`, a: `$50\\text{ m}^2$.`, s: `$150 : 3 = 50\\text{ m}^2$.`, d: 'thong_hieu' },
    { c: `Mực nước trong bể cá HHCN kích thước $40 \\times 30 \\times 20$ (cm) đang cao $15$ cm. Thể tích nước là bao nhiêu?`, a: `$18\\,000\\text{ cm}^3$.`, s: `$V_{\\text{nước}} = 40 \\times 30 \\times 15 = 18\\,000\\text{ cm}^3$.`, d: 'van_dung' },
    { c: `Bỏ một hòn đá chìm hẳn vào bể nước thì mực nước dâng lên thêm $2$ cm. Biết đáy bể dài $30$ cm, rộng $20$ cm. Thể tích hòn đá?`, a: `$1\\,200\\text{ cm}^3$.`, s: `$V_{\\text{đá}} = 30 \\times 20 \\times 2 = 1\\,200\\text{ cm}^3$.`, d: 'van_dung_cao' },
    { c: `Thùng hàng $2 \\times 1,5 \\times 1,2$ (m) chứa các hộp xà phòng $20 \\times 15 \\times 10$ (cm). Chứa được tối đa bao nhiêu hộp?`, a: `$1\\,200$ hộp.`, s: `$200:20=10$; $150:15=10$; $120:10=12$. $10\\times 10\\times 12 = 1\\,200$ hộp.`, d: 'van_dung_cao' },
    { c: `Tính thể tích hòn non bộ biết khi vớt nó ra khỏi bể (đáy $40 \\times 40$ cm) thì mực nước giảm đi $5$ cm.`, a: `$8\\,000\\text{ cm}^3$.`, s: `$V = 40 \\times 40 \\times 5 = 8\\,000\\text{ cm}^3$.`, d: 'van_dung' },
    { c: `Thể tích một cục tẩy khoảng bao nhiêu? ($10\\text{ cm}^3$, $1\\text{ m}^3$, $10\\text{ dm}^3$)`, a: `$10\\text{ cm}^3$.`, s: `Cục tẩy nhỏ gọn, cỡ $2 \\times 2 \\times 2,5$ cm.`, d: 'nhan_biet' },
  ]},
  { id: 'd9aec7b0-7a11-4845-8663-1077a6574f8e', p: 'T5-B55', t: 'hinh_hoc', q: [
    { c: `HHCN dài $4$ m, rộng $3$ m, cao $2$ m. Tính $S_{tp}$.`, a: `$52\\text{ m}^2$.`, s: `$S_{xq} = 28$. $S_{tp} = 28 + 2 \\times 12 = 52\\text{ m}^2$.`, d: 'thong_hieu' },
    { c: `Tính thể tích HLP có chu vi đáy $24$ cm.`, a: `$216\\text{ cm}^3$.`, s: `Cạnh $= 24 : 4 = 6$ cm. $V = 6 \\times 6 \\times 6 = 216\\text{ cm}^3$.`, d: 'van_dung' },
    { c: `HLP có thể tích $125\\text{ cm}^3$. Diện tích toàn phần?`, a: `$150\\text{ cm}^2$.`, s: `Cạnh $5$ cm. $S_{tp} = 5 \\times 5 \\times 6 = 150\\text{ cm}^2$.`, d: 'van_dung' },
    { c: `Hộp không nắp HLP cạnh $10$ cm. Tính diện tích các mặt ngoài.`, a: `$500\\text{ cm}^2$.`, s: `Hộp không nắp có 5 mặt. $10 \\times 10 \\times 5 = 500\\text{ cm}^2$.`, d: 'thong_hieu' },
    { c: `Thể tích HHCN là $240\\text{ dm}^3$, chiều dài $8$ dm, chiều rộng $6$ dm. Tính diện tích xung quanh.`, a: `$140\\text{ dm}^2$.`, s: `Cao $= 240 : 48 = 5$ dm. $S_{xq} = (8+6) \\times 2 \\times 5 = 140\\text{ dm}^2$.`, d: 'van_dung_cao' },
    { c: `Mực nước cao $12$ cm. Bỏ 1 viên gạch $20 \\times 10 \\times 5$ (cm) vào thì mực nước dâng thêm bao nhiêu? Biết đáy bể dài $40$ cm, rộng $25$ cm.`, a: `$1$ cm.`, s: `Thể tích viên gạch $= 1\\,000\\text{ cm}^3$. Mực nước dâng $= 1\\,000 : (40 \\times 25) = 1$ cm.`, d: 'van_dung_cao' },
    { c: `Một mảnh tôn HCN $60 \\times 40$ (cm). Cắt 4 góc 4 hình vuông cạnh $5$ cm rồi gập thành hộp không nắp. Tính thể tích hộp.`, a: `$7\\,500\\text{ cm}^3$.`, s: `Dài đáy $= 60 - 10 = 50$. Rộng đáy $= 40 - 10 = 30$. Cao $= 5$. $V = 50 \\times 30 \\times 5 = 7\\,500\\text{ cm}^3$.`, d: 'van_dung_cao' },
    { c: `Hai HLP có tỉ số cạnh là $1/2$. Tỉ số thể tích là?`, a: `$1/8$.`, s: `Tỉ số thể tích là $(1/2)^3 = 1/8$.`, d: 'thong_hieu' },
    { c: `Phòng học dài $10$ m, rộng $6$ m, cao $4$ m. Cần ít nhất bao nhiêu lít không khí cho $40$ học sinh, biết mỗi học sinh cần tối thiểu $5\\text{ m}^3$? (Có đủ không?)`, a: `Cần $200\\text{ m}^3$, phòng có $240\\text{ m}^3$ nên đủ.`, s: `Phòng có $V = 240\\text{ m}^3$. Cần $40 \\times 5 = 200\\text{ m}^3$.`, d: 'van_dung' },
    { c: `Khối chóp (không tính) hay khối trụ có đáy là hình gì?`, a: `Khối trụ có đáy là hình tròn.`, s: `Nhận biết khối trụ.`, d: 'nhan_biet' },
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
