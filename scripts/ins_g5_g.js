const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const U = '8316c34e-765d-4b8c-9364-b683a17e33f8', G = 5, T = 'dai_so';

const B = [
  { id: '41180bdd-d615-4516-9627-73250e3714f0', p: 'T5-B40', t: 'dai_so', q: [
    { c: `Tỉ số phần trăm của $3$ và $4$ là?`, a: `$75\\%$.`, s: `$3 : 4 = 0,75 = 75\\%$.`, d: 'nhan_biet' },
    { c: `$15$ là bao nhiêu phần trăm của $50$?`, a: `$30\\%$.`, s: `$15 : 50 = 0,3 = 30\\%$.`, d: 'nhan_biet' },
    { c: `Lớp có $40$ học sinh, trong đó có $18$ học sinh nữ. Hỏi học sinh nữ chiếm bao nhiêu phần trăm số học sinh cả lớp?`, a: `$45\\%$.`, s: `$18 : 40 = 0,45 = 45\\%$.`, d: 'thong_hieu' },
    { c: `Một vườn cây có $120$ cây, trong đó có $48$ cây cam. Tỉ số phần trăm của cây cam so với tổng số cây trong vườn là?`, a: `$40\\%$.`, s: `$48 : 120 = 0,4 = 40\\%$.`, d: 'thong_hieu' },
    { c: `Khối $5$ có $200$ học sinh, trong đó $150$ học sinh đạt điểm giỏi. Tỉ lệ phần trăm học sinh giỏi là?`, a: `$75\\%$.`, s: `$150 : 200 = 0,75 = 75\\%$.`, d: 'thong_hieu' },
    { c: `Tỉ số phần trăm của $0,6$ và $1,5$ là?`, a: `$40\\%$.`, s: `$0,6 : 1,5 = 0,4 = 40\\%$.`, d: 'van_dung' },
    { c: `Lớp 5A có $32$ học sinh. Hôm nay có $2$ học sinh nghỉ học. Số học sinh đi học chiếm bao nhiêu phần trăm số học sinh cả lớp?`, a: `$93,75\\%$.`, s: `Số học sinh đi học là $32 - 2 = 30$. Tỉ lệ: $30 : 32 = 0,9375 = 93,75\\%$.`, d: 'van_dung_cao' },
    { c: `Giá chiếc áo là $250\\,000$ đ. Người mua được giảm $25\\,000$ đ. Hỏi giá chiếc áo được giảm bao nhiêu phần trăm?`, a: `$10\\%$.`, s: `$25\\,000 : 250\\,000 = 0,1 = 10\\%$.`, d: 'van_dung' },
    { c: `Một trại chăn nuôi có $500$ con gà, trong đó có $300$ con gà mái. Tỉ số phần trăm gà trống so với tổng số gà là?`, a: `$40\\%$.`, s: `Gà trống: $500 - 300 = 200$. Tỉ lệ: $200 : 500 = 0,4 = 40\\%$.`, d: 'van_dung_cao' },
    { c: `Tìm tỉ số phần trăm của $75$ và $300$.`, a: `$25\\%$.`, s: `$75 : 300 = 0,25 = 25\\%$.`, d: 'nhan_biet' },
  ]},
  { id: '69af4dec-f4e5-4db6-be78-7defbe6ef645', p: 'T5-B41', t: 'dai_so', q: [
    { c: `$20\\%$ của $150$ là bao nhiêu?`, a: `$30$.`, s: `$150 \\times \\dfrac{20}{100} = 30$.`, d: 'nhan_biet' },
    { c: `Một lớp có $40$ học sinh, số học sinh giỏi chiếm $35\\%$. Hỏi lớp có bao nhiêu học sinh giỏi?`, a: `$14$ học sinh.`, s: `$40 \\times 0,35 = 14$ học sinh.`, d: 'thong_hieu' },
    { c: `$45\\%$ của $200$ kg là bao nhiêu?`, a: `$90$ kg.`, s: `$200 \\times 0,45 = 90$ kg.`, d: 'nhan_biet' },
    { c: `Lãi suất tiết kiệm là $0,5\\%$ một tháng. Gửi $10\\,000\\,000$ đồng thì sau $1$ tháng nhận được bao nhiêu tiền lãi?`, a: `$50\\,000$ đồng.`, s: `$10\\,000\\,000 \\times 0,005 = 50\\,000$ đồng.`, d: 'thong_hieu' },
    { c: `$75\\%$ của $80$ lít là bao nhiêu?`, a: `$60$ lít.`, s: `$80 \\times 0,75 = 60$ lít.`, d: 'nhan_biet' },
    { c: `Quãng đường dài $120$ km. Ô tô đã đi được $60\\%$ quãng đường. Ô tô đã đi được bao nhiêu km?`, a: `$72$ km.`, s: `$120 \\times 0,6 = 72$ km.`, d: 'thong_hieu' },
    { c: `Một mảnh vườn có diện tích $500\\text{ m}^2$. Người ta dành $25\\%$ diện tích để trồng hoa. Diện tích trồng hoa là?`, a: `$125\\text{ m}^2$.`, s: `$500 \\times 0,25 = 125\\text{ m}^2$.`, d: 'van_dung' },
    { c: `Một cửa hàng có $300$ chiếc áo, đã bán được $80\\%$ số áo. Cửa hàng còn lại bao nhiêu chiếc áo?`, a: `$60$ chiếc.`, s: `Số áo đã bán: $300 \\times 0,8 = 240$. Số áo còn lại: $300 - 240 = 60$. Hoặc: $300 \\times 0,2 = 60$.`, d: 'van_dung_cao' },
    { c: `$12,5\\%$ của $400$ là bao nhiêu?`, a: `$50$.`, s: `$400 \\times 0,125 = 50$.`, d: 'van_dung' },
    { c: `Tính $30\\%$ của $2,5$.`, a: `$0,75$.`, s: `$2,5 \\times 0,3 = 0,75$.`, d: 'van_dung' },
  ]},
  { id: '2f743a5d-122a-4b5e-ab2e-f6d76b061dbc', p: 'T5-B42', t: 'dai_so', q: [
    { c: `Nút "ON/C" trên máy tính cầm tay dùng để làm gì?`, a: `Bật máy hoặc Xoá (Clear).`, s: `Nút ON/C dùng để bật nguồn hoặc xóa toàn bộ phép tính vừa nhập.`, d: 'nhan_biet' },
    { c: `Nút "CE" trên máy tính cầm tay có chức năng gì?`, a: `Xóa số vừa nhập sai.`, s: `Nút CE (Clear Entry) dùng để xóa số vừa nhập sai mà không xóa toàn bộ phép tính.`, d: 'nhan_biet' },
    { c: `Để thực hiện phép tính $15 + 24$ trên máy tính, ta bấm các nút theo thứ tự nào?`, a: `$1$, $5$, $+$, $2$, $4$, $=$.`, s: `Bấm $15$, sau đó dấu $+$, sau đó $24$, và dấu $=$.`, d: 'thong_hieu' },
    { c: `Khi bấm "$25 \\times 4 =$" trên máy tính, màn hình sẽ hiển thị kết quả bao nhiêu?`, a: `$100$.`, s: `Kết quả của $25 \\times 4$ là $100$.`, d: 'thong_hieu' },
    { c: `Nút có kí hiệu "$\\%$" trên máy tính cầm tay dùng để làm gì?`, a: `Tính phần trăm.`, s: `Nút $\\%$ giúp tính toán tỉ số phần trăm một cách nhanh chóng.`, d: 'nhan_biet' },
    { c: `Để tính $20\\%$ của $50$, ta có thể bấm theo thứ tự nào?`, a: `$5$, $0$, $\\times$, $2$, $0$, $\\%$.`, s: `Bấm $50 \\times 20\\%$ sẽ cho ra kết quả $10$.`, d: 'thong_hieu' },
    { c: `Nếu bấm nhầm một chữ số ở số hạng thứ hai, ta có thể dùng nút nào để xóa đi mà không ảnh hưởng đến phép tính hiện tại?`, a: `Nút CE.`, s: `Nút CE giúp xóa đi hạng tử vừa nhập.`, d: 'van_dung' },
    { c: `Kết quả của phép tính "$144 \\div 12 =$" trên màn hình máy tính là?`, a: `$12$.`, s: `$144$ chia $12$ bằng $12$.`, d: 'thong_hieu' },
    { c: `Dấu chấm (.) trên bàn phím máy tính cầm tay dùng để nhập gì?`, a: `Dấu phẩy thập phân.`, s: `Trên máy tính, dấu chấm tương ứng với dấu phẩy thập phân ở Việt Nam.`, d: 'nhan_biet' },
    { c: `Nếu màn hình hiển thị "ERROR", điều đó có nghĩa là gì?`, a: `Phép tính không hợp lệ (ví dụ: chia cho $0$).`, s: `ERROR báo lỗi khi máy tính không thể thực hiện được phép toán.`, d: 'van_dung' },
  ]},
  { id: 'daafc496-6f57-4e0d-8ec5-0c057b362cbb', p: 'T5-B43', t: 'dai_so', q: [
    { c: `Sử dụng máy tính cầm tay, hãy tính kết quả của: $1\\,234 + 5\\,678$.`, a: `$6\\,912$.`, s: `$1\\,234 + 5\\,678 = 6\\,912$.`, d: 'nhan_biet' },
    { c: `Sử dụng máy tính cầm tay, hãy tính kết quả của: $9\\,876 - 5\\,432$.`, a: `$4\\,444$.`, s: `$9\\,876 - 5\\,432 = 4\\,444$.`, d: 'nhan_biet' },
    { c: `Dùng máy tính cầm tay tính giá trị của: $14,5 \\times 2,4$.`, a: `$34,8$.`, s: `$14,5 \\times 2,4 = 34,8$.`, d: 'thong_hieu' },
    { c: `Dùng máy tính cầm tay tính kết quả: $500 \\div 8$.`, a: `$62,5$.`, s: `$500 : 8 = 62,5$.`, d: 'thong_hieu' },
    { c: `Sử dụng máy tính cầm tay, tính $15\\%$ của $1\\,200$.`, a: `$180$.`, s: `$1\\,200 \\times 0,15 = 180$.`, d: 'thong_hieu' },
    { c: `Tính: $(15,2 + 4,8) \\times 3,5$ bằng máy tính.`, a: `$70$.`, s: `$15,2 + 4,8 = 20$. $20 \\times 3,5 = 70$.`, d: 'van_dung' },
    { c: `Tìm số thập phân khi bấm "$3 \\div 4 =$" trên máy tính.`, a: `$0,75$.`, s: `$3 : 4 = 0,75$.`, d: 'van_dung' },
    { c: `Một mặt hàng giá $450\\,000$ đ, giảm giá $12\\%$. Sử dụng máy tính để tính số tiền được giảm.`, a: `$54\\,000$ đ.`, s: `$450\\,000 \\times 0,12 = 54\\,000$ đ.`, d: 'van_dung_cao' },
    { c: `Dùng máy tính tính diện tích hình chữ nhật có chiều dài $12,5$ m và chiều rộng $8,4$ m.`, a: `$105\\text{ m}^2$.`, s: `$S = 12,5 \\times 8,4 = 105\\text{ m}^2$.`, d: 'van_dung' },
    { c: `Sử dụng máy tính tính kết quả của $35 \\times 35$.`, a: `$1\\,225$.`, s: `$35 \\times 35 = 1\\,225$.`, d: 'van_dung' },
  ]},
  { id: '9902215e-6cf5-44d8-bca1-7a65bf4574eb', p: 'T5-B44', t: 'dai_so', q: [
    { c: `Tỉ số phần trăm của $18$ và $72$ là bao nhiêu?`, a: `$25\\%$.`, s: `$18 : 72 = 0,25 = 25\\%$.`, d: 'nhan_biet' },
    { c: `Tìm $40\\%$ của $150$.`, a: `$60$.`, s: `$150 \\times 0,4 = 60$.`, d: 'nhan_biet' },
    { c: `Một sản phẩm giá $1\\,200\\,000$ đồng, sau khi giảm giá còn $900\\,000$ đồng. Hỏi sản phẩm đã được giảm bao nhiêu phần trăm?`, a: `$25\\%$.`, s: `Số tiền giảm: $300\\,000$. Tỉ lệ: $300\\,000 : 1\\,200\\,000 = 0,25 = 25\\%$.`, d: 'van_dung_cao' },
    { c: `Một vườn có $200$ cây, trong đó $65\\%$ là cây ăn quả, còn lại là cây lấy gỗ. Có bao nhiêu cây lấy gỗ?`, a: `$70$ cây.`, s: `Tỉ lệ cây lấy gỗ: $100\\% - 65\\% = 35\\%$. Số cây lấy gỗ: $200 \\times 0,35 = 70$.`, d: 'van_dung_cao' },
    { c: `Tiền vốn là $50\\,000$ đ, tiền bán là $60\\,000$ đ. Hỏi tiền lãi bằng bao nhiêu phần trăm tiền vốn?`, a: `$20\\%$.`, s: `Tiền lãi: $10\\,000$. Tỉ lệ: $10\\,000 : 50\\,000 = 0,2 = 20\\%$.`, d: 'van_dung_cao' },
    { c: `Tìm một số biết $25\\%$ của nó là $100$.`, a: `$400$.`, s: `$100 : 0,25 = 400$.`, d: 'van_dung' },
    { c: `Một lớp học có $24$ nữ và $16$ nam. Tỉ số phần trăm của số nam so với số học sinh cả lớp là bao nhiêu?`, a: `$40\\%$.`, s: `Cả lớp: $40$ HS. Nam: $16$. Tỉ số: $16 : 40 = 0,4 = 40\\%$.`, d: 'thong_hieu' },
    { c: `Lãi suất tiết kiệm là $0,6\\%$/tháng. Gửi $50$ triệu đồng thì sau $1$ tháng nhận được bao nhiêu tiền lãi?`, a: `$300\\,000$ đồng.`, s: `$50\\,000\\,000 \\times 0,006 = 300\\,000$ đồng.`, d: 'thong_hieu' },
    { c: `Tính $12,5\\%$ của $80$.`, a: `$10$.`, s: `$80 \\times 0,125 = 10$.`, d: 'nhan_biet' },
    { c: `Dùng máy tính tính kết quả: $345,6 \\times 0,15$.`, a: `$51,84$.`, s: `$345,6 \\times 0,15 = 51,84$.`, d: 'van_dung' },
  ]},
  { id: '5cfa965e-6118-4ee1-b685-06b83abd7aff', p: 'T5-B45', t: 'hinh_hoc', q: [
    { c: `Thể tích là gì?`, a: `Là khoảng không gian mà một vật chiếm chỗ.`, s: `Thể tích của một hình là lượng không gian mà hình đó chiếm chỗ.`, d: 'nhan_biet' },
    { c: `Có hai hình hộp A và B. Hình A gồm 6 hình lập phương nhỏ bằng nhau, hình B gồm 8 hình lập phương nhỏ bằng nhau. Hình nào có thể tích lớn hơn?`, a: `Hình B.`, s: `Hình B chứa nhiều khối hơn nên có thể tích lớn hơn.`, d: 'thong_hieu' },
    { c: `Nếu ghép hai hình lập phương nhỏ thành một hình hộp chữ nhật, thể tích hình hộp bằng tổng thể tích hai hình lập phương nhỏ, đúng hay sai?`, a: `Đúng.`, s: `Thể tích hình ghép bằng tổng thể tích các hình thành phần.`, d: 'thong_hieu' },
    { c: `Một hình hộp chữ nhật được xếp từ 12 khối lập phương $1\\text{ cm}^3$. Thể tích hình đó là bao nhiêu?`, a: `$12\\text{ cm}^3$.`, s: `Mỗi khối có thể tích $1\\text{ cm}^3$, $12$ khối có thể tích $12\\text{ cm}^3$.`, d: 'nhan_biet' },
    { c: `Người ta xếp 8 hình lập phương nhỏ thành một hình lập phương lớn. Nếu mỗi hình lập phương nhỏ có thể tích 1 đơn vị, thể tích hình lập phương lớn là bao nhiêu?`, a: `$8$ đơn vị.`, s: `Thể tích lớn $= 8 \\times 1 = 8$ đơn vị.`, d: 'thong_hieu' },
    { c: `Hai hình có hình dạng khác nhau thì thể tích có thể bằng nhau không?`, a: `Có thể.`, s: `Hai hình có thể xếp từ cùng số lượng các khối lập phương giống nhau nên thể tích bằng nhau.`, d: 'van_dung' },
    { c: `Một bể rỗng, đổ 10 lít nước vào thì bể đầy. Thể tích trong của bể là bao nhiêu?`, a: `$10$ lít.`, s: `Sức chứa của bể chính là thể tích phần bên trong của nó, bằng $10$ lít.`, d: 'van_dung' },
    { c: `Hình A được tạo từ 5 khối lập phương, hình B từ 4 khối lập phương. Thể tích hình A bằng bao nhiêu phần thể tích hình B?`, a: `$\\dfrac{5}{4}$.`, s: `Thể tích A là $5$, B là $4$. Tỉ số là $\\dfrac{5}{4}$.`, d: 'van_dung_cao' },
    { c: `Thể tích của một vật phụ thuộc vào màu sắc hay không gian mà nó chiếm chỗ?`, a: `Không gian mà nó chiếm chỗ.`, s: `Thể tích là số đo không gian vật chiếm chỗ, không phụ thuộc màu sắc.`, d: 'nhan_biet' },
    { c: `Để so sánh thể tích hai hình được xếp bằng các khối lập phương nhỏ bằng nhau, ta có thể đếm số khối gì?`, a: `Số khối lập phương nhỏ.`, s: `Hình nào có nhiều khối lập phương nhỏ hơn thì có thể tích lớn hơn.`, d: 'thong_hieu' },
  ]},
  { id: '6bf22d7d-da47-4acd-8875-766d9d5f1fb7', p: 'T5-B46', t: 'hinh_hoc', q: [
    { c: `Xăng-ti-mét khối là thể tích của hình lập phương có cạnh dài bao nhiêu?`, a: `$1$ cm.`, s: `Xăng-ti-mét khối ($1\\text{ cm}^3$) là thể tích hình lập phương cạnh $1$ cm.`, d: 'nhan_biet' },
    { c: `Đề-xi-mét khối là thể tích của hình lập phương có cạnh dài bao nhiêu?`, a: `$1$ dm.`, s: `Đề-xi-mét khối ($1\\text{ dm}^3$) là thể tích hình lập phương cạnh $1$ dm.`, d: 'nhan_biet' },
    { c: `$1\\text{ dm}^3$ bằng bao nhiêu $\\text{cm}^3$?`, a: `$1\\,000\\text{ cm}^3$.`, s: `$1\\text{ dm}^3 = 10\\text{ cm} \\times 10\\text{ cm} \\times 10\\text{ cm} = 1\\,000\\text{ cm}^3$.`, d: 'thong_hieu' },
    { c: `$5\\text{ dm}^3$ bằng bao nhiêu $\\text{cm}^3$?`, a: `$5\\,000\\text{ cm}^3$.`, s: `$5 \\times 1\\,000 = 5\\,000\\text{ cm}^3$.`, d: 'thong_hieu' },
    { c: `$3\\,000\\text{ cm}^3$ bằng bao nhiêu $\\text{dm}^3$?`, a: `$3\\text{ dm}^3$.`, s: `$3\\,000 : 1\\,000 = 3\\text{ dm}^3$.`, d: 'thong_hieu' },
    { c: `$2,5\\text{ dm}^3$ bằng bao nhiêu $\\text{cm}^3$?`, a: `$2\\,500\\text{ cm}^3$.`, s: `$2,5 \\times 1\\,000 = 2\\,500\\text{ cm}^3$.`, d: 'van_dung' },
    { c: `Đổi $\\dfrac{1}{2}\\text{ dm}^3$ sang $\\text{cm}^3$.`, a: `$500\\text{ cm}^3$.`, s: `$\\dfrac{1}{2} \\times 1\\,000 = 500\\text{ cm}^3$.`, d: 'van_dung' },
    { c: `$4\\text{ dm}^3$ $35\\text{ cm}^3$ bằng bao nhiêu $\\text{cm}^3$?`, a: `$4\\,035\\text{ cm}^3$.`, s: `$4\\text{ dm}^3 = 4\\,000\\text{ cm}^3$. Thêm $35\\text{ cm}^3$ nữa là $4\\,035\\text{ cm}^3$.`, d: 'van_dung_cao' },
    { c: `$12,3\\text{ dm}^3$ bằng bao nhiêu $\\text{cm}^3$?`, a: `$12\\,300\\text{ cm}^3$.`, s: `$12,3 \\times 1\\,000 = 12\\,300\\text{ cm}^3$.`, d: 'van_dung' },
    { c: `$750\\text{ cm}^3$ bằng bao nhiêu $\\text{dm}^3$?`, a: `$0,75\\text{ dm}^3$.`, s: `$750 : 1\\,000 = 0,75\\text{ dm}^3$.`, d: 'van_dung_cao' },
  ]},
  { id: '4528f7a6-e28c-4c08-ba58-cdc227c476d1', p: 'T5-B47', t: 'hinh_hoc', q: [
    { c: `Mét khối là thể tích của hình lập phương có cạnh dài bao nhiêu?`, a: `$1$ m.`, s: `Mét khối ($1\\text{ m}^3$) là thể tích hình lập phương cạnh $1$ m.`, d: 'nhan_biet' },
    { c: `$1\\text{ m}^3$ bằng bao nhiêu $\\text{dm}^3$?`, a: `$1\\,000\\text{ dm}^3$.`, s: `$1\\text{ m}^3 = 10\\text{ dm} \\times 10\\text{ dm} \\times 10\\text{ dm} = 1\\,000\\text{ dm}^3$.`, d: 'nhan_biet' },
    { c: `$1\\text{ m}^3$ bằng bao nhiêu $\\text{cm}^3$?`, a: `$1\\,000\\,000\\text{ cm}^3$.`, s: `$1\\text{ m}^3 = 1\\,000\\text{ dm}^3 = 1\\,000\\,000\\text{ cm}^3$.`, d: 'thong_hieu' },
    { c: `$4\\text{ m}^3$ bằng bao nhiêu $\\text{dm}^3$?`, a: `$4\\,000\\text{ dm}^3$.`, s: `$4 \\times 1\\,000 = 4\\,000\\text{ dm}^3$.`, d: 'thong_hieu' },
    { c: `$0,5\\text{ m}^3$ bằng bao nhiêu $\\text{dm}^3$?`, a: `$500\\text{ dm}^3$.`, s: `$0,5 \\times 1\\,000 = 500\\text{ dm}^3$.`, d: 'thong_hieu' },
    { c: `$2,15\\text{ m}^3$ bằng bao nhiêu $\\text{dm}^3$?`, a: `$2\\,150\\text{ dm}^3$.`, s: `$2,15 \\times 1\\,000 = 2\\,150\\text{ dm}^3$.`, d: 'van_dung' },
    { c: `$3\\,000\\text{ dm}^3$ bằng bao nhiêu $\\text{m}^3$?`, a: `$3\\text{ m}^3$.`, s: `$3\\,000 : 1\\,000 = 3\\text{ m}^3$.`, d: 'van_dung' },
    { c: `$\\dfrac{3}{4}\\text{ m}^3$ bằng bao nhiêu $\\text{dm}^3$?`, a: `$750\\text{ dm}^3$.`, s: `$\\dfrac{3}{4} \\times 1\\,000 = 750\\text{ dm}^3$.`, d: 'van_dung_cao' },
    { c: `Đổi $2\\text{ m}^3$ $50\\text{ dm}^3$ sang $\\text{dm}^3$.`, a: `$2\\,050\\text{ dm}^3$.`, s: `$2\\text{ m}^3 = 2\\,000\\text{ dm}^3$. Thêm $50$ là $2\\,050\\text{ dm}^3$.`, d: 'van_dung_cao' },
    { c: `$1$ triệu $\\text{cm}^3$ bằng bao nhiêu $\\text{m}^3$?`, a: `$1\\text{ m}^3$.`, s: `$1\\,000\\,000\\text{ cm}^3 = 1\\text{ m}^3$.`, d: 'van_dung' },
  ]},
  { id: '7ec69afb-7e13-4775-818d-35fcc741866f', p: 'T5-B48', t: 'hinh_hoc', q: [
    { c: `Đổi $3,2\\text{ m}^3$ sang $\\text{dm}^3$.`, a: `$3\\,200\\text{ dm}^3$.`, s: `$3,2 \\times 1\\,000 = 3\\,200\\text{ dm}^3$.`, d: 'nhan_biet' },
    { c: `Đổi $4\\,500\\text{ cm}^3$ sang $\\text{dm}^3$.`, a: `$4,5\\text{ dm}^3$.`, s: `$4\\,500 : 1\\,000 = 4,5\\text{ dm}^3$.`, d: 'nhan_biet' },
    { c: `$1,5\\text{ dm}^3$ bằng bao nhiêu $\\text{cm}^3$?`, a: `$1\\,500\\text{ cm}^3$.`, s: `$1,5 \\times 1\\,000 = 1\\,500\\text{ cm}^3$.`, d: 'thong_hieu' },
    { c: `Một bể cá có thể tích $2,5\\text{ m}^3$. Bể chứa được tối đa bao nhiêu lít nước? (Biết $1\\text{ dm}^3 = 1$ lít)`, a: `$2\\,500$ lít.`, s: `$2,5\\text{ m}^3 = 2\\,500\\text{ dm}^3 = 2\\,500$ lít.`, d: 'van_dung_cao' },
    { c: `$12\\text{ m}^3$ $8\\text{ dm}^3$ bằng bao nhiêu $\\text{dm}^3$?`, a: `$12\\,008\\text{ dm}^3$.`, s: `$12\\text{ m}^3 = 12\\,000\\text{ dm}^3$. Cộng thêm $8$ là $12\\,008\\text{ dm}^3$.`, d: 'van_dung' },
    { c: `Tính tổng: $1,2\\text{ m}^3 + 300\\text{ dm}^3$ bằng bao nhiêu $\\text{dm}^3$?`, a: `$1\\,500\\text{ dm}^3$.`, s: `$1,2\\text{ m}^3 = 1\\,200\\text{ dm}^3$. Tổng: $1\\,200 + 300 = 1\\,500\\text{ dm}^3$.`, d: 'van_dung' },
    { c: `Một căn phòng có thể tích $40\\text{ m}^3$. Biết $1\\text{ m}^3$ chứa được $1\\,000$ lít không khí. Căn phòng chứa bao nhiêu lít không khí?`, a: `$40\\,000$ lít.`, s: `$40 \\times 1\\,000 = 40\\,000$ lít.`, d: 'van_dung' },
    { c: `Số thích hợp điền vào chỗ chấm: $0,05\\text{ m}^3 = \\dots\\text{ cm}^3$.`, a: `$50\\,000$.`, s: `$0,05 \\times 1\\,000\\,000 = 50\\,000\\text{ cm}^3$.`, d: 'van_dung_cao' },
    { c: `So sánh: $4,5\\text{ dm}^3$ và $450\\text{ cm}^3$.`, a: `$4,5\\text{ dm}^3 > 450\\text{ cm}^3$.`, s: `$4,5\\text{ dm}^3 = 4\\,500\\text{ cm}^3 > 450\\text{ cm}^3$.`, d: 'thong_hieu' },
    { c: `Sắp xếp tăng dần: $2\\,000\\text{ cm}^3$; $2\\text{ m}^3$; $20\\text{ dm}^3$.`, a: `$2\\,000\\text{ cm}^3 < 20\\text{ dm}^3 < 2\\text{ m}^3$.`, s: `$2\\,000\\text{ cm}^3 = 2\\text{ dm}^3$. Nên $2\\text{ dm}^3 < 20\\text{ dm}^3 < 2\\,000\\text{ dm}^3$.`, d: 'van_dung_cao' },
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
