const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const U = '8316c34e-765d-4b8c-9364-b683a17e33f8', G = 5, T = 'thong_ke_xac_suat';

const B = [
  { id: 'b2d97e27-7bea-4dea-bd5c-e5358c7b364d', p: 'T5-B63', t: 'thong_ke_xac_suat', q: [
    { c: `Có các điểm kiểm tra: 8, 9, 7, 10, 8. Sắp xếp theo thứ tự tăng dần.`, a: `$7, 8, 8, 9, 10$.`, s: `Sắp xếp từ bé đến lớn: $7, 8, 8, 9, 10$.`, d: 'nhan_biet' },
    { c: `Trong lớp có $15$ nam và $20$ nữ. Phân loại theo giới tính, số lượng mỗi loại là?`, a: `Nam: $15$, Nữ: $20$.`, s: `Phân loại thành 2 nhóm nam và nữ.`, d: 'nhan_biet' },
    { c: `Thu thập số liệu chiều cao của $5$ học sinh (cm): 130, 135, 132, 140, 135. Chiều cao lớn nhất là bao nhiêu?`, a: `$140$ cm.`, s: `Trong các số liệu, 140 là số lớn nhất.`, d: 'thong_hieu' },
    { c: `Dãy số liệu: 2, 4, 6, 8, 10. Số trung bình cộng là bao nhiêu?`, a: `$6$.`, s: `$(2+4+6+8+10) : 5 = 30 : 5 = 6$.`, d: 'thong_hieu' },
    { c: `Trong $1$ tuần lễ, số ngày mưa là 2, số ngày nắng là 5. Phân loại thời tiết có bao nhiêu ngày mưa?`, a: `$2$ ngày mưa.`, s: `Theo số liệu đã thu thập, có 2 ngày mưa.`, d: 'nhan_biet' },
    { c: `Điểm thi của 10 học sinh: 8, 9, 9, 10, 8, 7, 10, 9, 8, 8. Có bao nhiêu điểm 8?`, a: `$4$ điểm 8.`, s: `Đếm số lượng điểm 8 trong dãy số liệu.`, d: 'thong_hieu' },
    { c: `Bảng số liệu cho biết: Cam (10), Quýt (15), Bưởi (5). Tổng số quả là?`, a: `$30$ quả.`, s: `$10 + 15 + 5 = 30$.`, d: 'van_dung' },
    { c: `Bạn An ghi chép màu sắc xe chạy qua: Xanh, Đỏ, Trắng, Đỏ, Đỏ. Màu nào xuất hiện nhiều nhất?`, a: `Màu đỏ.`, s: `Đỏ xuất hiện 3 lần, nhiều nhất.`, d: 'thong_hieu' },
    { c: `Một cửa hàng bán được trong 4 ngày: 15, 20, 18, 25 (sản phẩm). Trung bình mỗi ngày bán được bao nhiêu?`, a: `$19,5$ sản phẩm.`, s: `$(15+20+18+25) : 4 = 78 : 4 = 19,5$.`, d: 'van_dung' },
    { c: `Khi sắp xếp một dãy số liệu để tìm quy luật, người ta thường sắp xếp theo chiều nào?`, a: `Tăng dần hoặc giảm dần.`, s: `Sắp xếp có thứ tự để dễ quan sát.`, d: 'nhan_biet' },
  ]},
  { id: 'a9dea3e8-be03-4939-9dc6-2653be7f92ff', p: 'T5-B64', t: 'thong_ke_xac_suat', q: [
    { c: `Biểu đồ hình quạt tròn dùng để làm gì?`, a: `Thể hiện tỉ số phần trăm của các thành phần so với tổng thể.`, s: `Biểu đồ quạt tròn trực quan hóa tỉ lệ phần trăm.`, d: 'nhan_biet' },
    { c: `Toàn bộ hình tròn biểu diễn bao nhiêu phần trăm?`, a: `$100\\%$.`, s: `Hình tròn tương đương với 100% của tổng thể.`, d: 'nhan_biet' },
    { c: `Biểu đồ quạt biểu diễn số học sinh giỏi $25\\%$, khá $50\\%$, trung bình $25\\%$. Nếu lớp có 40 học sinh thì có bao nhiêu học sinh khá?`, a: `$20$ học sinh.`, s: `$40 \\times 50\\% = 20$ học sinh.`, d: 'thong_hieu' },
    { c: `Một phần tư hình tròn tương ứng với bao nhiêu phần trăm?`, a: `$25\\%$.`, s: `$100\\% : 4 = 25\\%$.`, d: 'thong_hieu' },
    { c: `Nửa hình tròn tương ứng với bao nhiêu phần trăm?`, a: `$50\\%$.`, s: `$100\\% : 2 = 50\\%$.`, d: 'nhan_biet' },
    { c: `Biểu đồ cho biết lúa $40\\%$, hoa màu $60\\%$. Diện tích lúa so với hoa màu thì như thế nào?`, a: `Lúa ít hơn hoa màu.`, s: `$40\\% < 60\\%$.`, d: 'thong_hieu' },
    { c: `Tổng diện tích $200$ ha. Đất trồng cây công nghiệp chiếm $30\\%$ trên biểu đồ. Diện tích đất trồng cây công nghiệp là?`, a: `$60$ ha.`, s: `$200 \\times 30\\% = 60$ ha.`, d: 'van_dung' },
    { c: `Trên biểu đồ quạt, phần diện tích vườn là $15\\%$, phần ao là $20\\%$. Hai phần này chiếm bao nhiêu phần trăm?`, a: `$35\\%$.`, s: `$15\\% + 20\\% = 35\\%$.`, d: 'van_dung' },
    { c: `Lớp có 32 học sinh. Biểu đồ quạt cho thấy $12,5\\%$ học sinh thích bơi. Số học sinh thích bơi là bao nhiêu?`, a: `$4$ học sinh.`, s: `$32 \\times 12,5\\% = 4$ học sinh.`, d: 'van_dung_cao' },
    { c: `Nếu 1 phần quạt tròn có góc ở tâm là $90^\\circ$ thì nó chiếm bao nhiêu phần trăm?`, a: `$25\\%$.`, s: `$90^\\circ / 360^\\circ = 1/4 = 25\\%$.`, d: 'van_dung_cao' },
  ]},
  { id: '4fae91ad-c8de-46f0-864a-c9ec81cbe8d1', p: 'T5-B65', t: 'thong_ke_xac_suat', q: [
    { c: `Tung đồng xu 10 lần, có 4 lần xuất hiện mặt sấp. Tỉ số của số lần xuất hiện mặt sấp là?`, a: `$\\dfrac{4}{10} = \\dfrac{2}{5}$.`, s: `Tỉ số bằng số lần sấp chia tổng số lần tung.`, d: 'nhan_biet' },
    { c: `Lấy bóng 20 lần, được bóng xanh 8 lần. Tỉ số số lần lấy được bóng xanh so với tổng số lần lấy?`, a: `$\\dfrac{8}{20} = \\dfrac{2}{5}$.`, s: `$8 : 20 = 2/5$.`, d: 'thong_hieu' },
    { c: `Gieo xúc xắc 15 lần, có 3 lần ra mặt 6 chấm. Tỉ số số lần ra mặt 6 chấm?`, a: `$\\dfrac{3}{15} = \\dfrac{1}{5}$.`, s: `$3 : 15 = 1/5$.`, d: 'thong_hieu' },
    { c: `Trong 50 ngày, có 10 ngày mưa. Tỉ số ngày mưa so với tổng số ngày theo dõi?`, a: `$\\dfrac{10}{50} = \\dfrac{1}{5}$ (hay $20\\%$).`, s: `$10 : 50 = 1/5$.`, d: 'van_dung' },
    { c: `Rút thẻ 30 lần, 12 lần được thẻ đỏ. Tỉ số phần trăm lần rút được thẻ đỏ?`, a: `$40\\%$.`, s: `$12 : 30 = 0,4 = 40\\%$.`, d: 'van_dung' },
    { c: `Chơi vòng quay 40 lần, trúng thưởng 5 lần. Tỉ số lần không trúng thưởng?`, a: `$\\dfrac{35}{40} = \\dfrac{7}{8}$.`, s: `Không trúng: $40 - 5 = 35$. Tỉ số: $35/40 = 7/8$.`, d: 'van_dung_cao' },
    { c: `Tung đồng xu nhiều lần, tỉ số mặt sấp thường xấp xỉ bao nhiêu?`, a: `$\\dfrac{1}{2}$.`, s: `Xác suất thực tế tiến tới $1/2$.`, d: 'van_dung_cao' },
    { c: `Kiểm tra 100 sản phẩm, có 5 sản phẩm lỗi. Tỉ số sản phẩm lỗi?`, a: `$\\dfrac{5}{100} = 5\\%$.`, s: `$5 / 100$.`, d: 'nhan_biet' },
    { c: `Lấy ngẫu nhiên kẹo 10 lần, 7 lần được kẹo dâu. Tỉ số kẹo dâu?`, a: `$\\dfrac{7}{10}$.`, s: `$7/10$.`, d: 'nhan_biet' },
    { c: `Gieo xúc xắc 60 lần, mặt 1 chấm xuất hiện 10 lần. Tỉ số là?`, a: `$\\dfrac{10}{60} = \\dfrac{1}{6}$.`, s: `$10 : 60 = 1/6$.`, d: 'thong_hieu' },
  ]},
  { id: '2105d30b-d51e-4e3e-ba54-654814e05e7a', p: 'T5-B66', t: 'thong_ke_xac_suat', q: [
    { c: `Làm một thí nghiệm: Thả vật rơi tự do 5 lần và đo thời gian. Đó là hoạt động gì?`, a: `Thực hành thu thập số liệu.`, s: `Quá trình làm thực nghiệm để lấy số liệu.`, d: 'nhan_biet' },
    { c: `Nếu bạn ghi lại nhiệt độ mỗi ngày trong 1 tuần, bạn đang làm gì?`, a: `Thu thập dữ liệu thống kê.`, s: `Quá trình thu thập số liệu theo thời gian.`, d: 'nhan_biet' },
    { c: `Tung đồng xu 20 lần để xem bao nhiêu lần sấp, bao nhiêu ngửa. Số lần sấp + số lần ngửa bằng bao nhiêu?`, a: `$20$ lần.`, s: `Tổng số lần các kết quả có thể luôn bằng tổng số lần thử nghiệm.`, d: 'thong_hieu' },
    { c: `Một trò chơi: Chọn 1 bóng trong hộp có bóng xanh và đỏ. Lặp lại 10 lần. Có thể bóng xanh ra 11 lần không?`, a: `Không.`, s: `Vì chỉ lặp lại 10 lần.`, d: 'thong_hieu' },
    { c: `Xếp 5 số liệu 12, 15, 11, 14, 13 theo thứ tự giảm dần.`, a: `$15, 14, 13, 12, 11$.`, s: `Sắp xếp từ lớn đến bé.`, d: 'van_dung' },
    { c: `Trong thí nghiệm gieo xúc xắc, có mấy kết quả có thể xảy ra cho mỗi lần gieo?`, a: `$6$ kết quả (từ 1 đến 6 chấm).`, s: `Xúc xắc có 6 mặt.`, d: 'thong_hieu' },
    { c: `Tung 2 đồng xu cùng lúc. Các kết quả có thể là gì?`, a: `(Sấp, Sấp), (Sấp, Ngửa), (Ngửa, Sấp), (Ngửa, Ngửa).`, s: `Có 4 kết quả có thể xảy ra.`, d: 'van_dung_cao' },
    { c: `Sau khi thực hành, để thể hiện số liệu thu được một cách trực quan, ta thường làm gì?`, a: `Vẽ biểu đồ (biểu đồ cột, quạt...).`, s: `Trình bày dữ liệu.`, d: 'van_dung' },
    { c: `Lấy 1 viên bi trong hộp chỉ có bi đỏ. Bi lấy ra chắc chắn có màu gì?`, a: `Màu đỏ.`, s: `Sự kiện chắc chắn xảy ra.`, d: 'nhan_biet' },
    { c: `Lấy 1 viên bi trong hộp chỉ có bi đỏ. Lấy được bi xanh là sự kiện gì?`, a: `Sự kiện không thể xảy ra.`, s: `Không có bi xanh nên không thể lấy được.`, d: 'nhan_biet' },
  ]},
  { id: '105f3123-6f2d-426d-a6c4-79552e7c277a', p: 'T5-B67', t: 'thong_ke_xac_suat', q: [
    { c: `Dãy: 5, 8, 3, 9, 2. Tìm giá trị trung bình.`, a: `$5,4$.`, s: `$(5+8+3+9+2) : 5 = 27 : 5 = 5,4$.`, d: 'thong_hieu' },
    { c: `Biểu đồ quạt có phần A chiếm $30\\%$, B chiếm $40\\%$. Phần C còn lại chiếm bao nhiêu phần trăm?`, a: `$30\\%$.`, s: `$100\\% - (30\\% + 40\\%) = 30\\%$.`, d: 'thong_hieu' },
    { c: `Trong 40 lần bắn cung, xạ thủ trúng đích 36 lần. Tỉ số bắn trượt là bao nhiêu?`, a: `$\\dfrac{4}{40} = \\dfrac{1}{10}$ (hoặc $10\\%$).`, s: `Trượt $4$ lần. $4 : 40 = 10\\%$.`, d: 'van_dung' },
    { c: `Khảo sát 200 người, $45\\%$ thích màu xanh. Có bao nhiêu người thích màu xanh?`, a: `$90$ người.`, s: `$200 \\times 45\\% = 90$ người.`, d: 'van_dung' },
    { c: `Biểu đồ cột biểu diễn gì?`, a: `Sự so sánh số lượng giữa các đại lượng.`, s: `Cột cao hay thấp biểu diễn số lượng nhiều hay ít.`, d: 'nhan_biet' },
    { c: `Biểu đồ quạt tròn biểu diễn gì?`, a: `Tỉ lệ phần trăm các thành phần so với tổng thể.`, s: `Quạt tròn thể hiện cấu trúc tổng thể.`, d: 'nhan_biet' },
    { c: `Tổng số áo bán được trong 4 tuần là 120 chiếc. Trung bình mỗi tuần bán được?`, a: `$30$ chiếc.`, s: `$120 : 4 = 30$.`, d: 'thong_hieu' },
    { c: `Bỏ 3 quả bóng xanh, 2 quả đỏ vào hộp. Xác suất (tỉ số) bốc được bóng đỏ trong 1 lần bốc là?`, a: `$\\dfrac{2}{5}$.`, s: `Có 2 đỏ trong tổng số 5 bóng.`, d: 'van_dung_cao' },
    { c: `Tỉ số của số lần mặt ngửa là $3/5$ sau 50 lần tung. Có bao nhiêu lần ngửa?`, a: `$30$ lần.`, s: `$50 \\times 3/5 = 30$.`, d: 'van_dung' },
    { c: `Cửa hàng có 500 khách, 150 khách mua hàng. Tỉ lệ khách mua hàng?`, a: `$30\\%$.`, s: `$150 / 500 = 0,3 = 30\\%$.`, d: 'van_dung_cao' },
  ]},
  { id: '6ad04426-8de0-4ea2-848a-c725fdadada3', p: 'T5-B68', t: 'dai_so', q: [
    { c: `Đọc số: $1\\,234\\,567$.`, a: `Một triệu hai trăm ba mươi tư nghìn năm trăm sáu mươi bảy.`, s: `Đọc theo các lớp.`, d: 'nhan_biet' },
    { c: `Phân số $\\dfrac{3}{4}$ có mẫu số là bao nhiêu?`, a: `$4$.`, s: `Tử là $3$, mẫu là $4$.`, d: 'nhan_biet' },
    { c: `Số thập phân $12,345$ phần thập phân có mấy chữ số?`, a: `$3$ chữ số.`, s: `Phần thập phân là $345$, có $3$ chữ số.`, d: 'nhan_biet' },
    { c: `Sắp xếp tăng dần: $3,5$; $3,05$; $3,45$.`, a: `$3,05 < 3,45 < 3,5$.`, s: `So sánh hàng phần mười, phần trăm.`, d: 'thong_hieu' },
    { c: `Viết phân số $\\dfrac{4}{5}$ dưới dạng số thập phân.`, a: `$0,8$.`, s: `$4 : 5 = 0,8$.`, d: 'thong_hieu' },
    { c: `Rút gọn phân số $\\dfrac{18}{24}$.`, a: `$\\dfrac{3}{4}$.`, s: `Chia cả tử và mẫu cho $6$.`, d: 'thong_hieu' },
    { c: `Số tự nhiên lớn nhất có 4 chữ số khác nhau là?`, a: `$9876$.`, s: `Chọn các chữ số lớn nhất từ trái sang phải: 9, 8, 7, 6.`, d: 'van_dung' },
    { c: `Tìm chữ số $x$ để $\\overline{3x5}$ chia hết cho $3$.`, a: `$x \\in \\{1; 4; 7\\}$.`, s: `Tổng $3+x+5 = 8+x$ chia hết cho $3$.`, d: 'van_dung_cao' },
    { c: `Chuyển hỗn số $2\\dfrac{3}{4}$ thành phân số.`, a: `$\\dfrac{11}{4}$.`, s: `$(2\\times 4 + 3) / 4 = 11/4$.`, d: 'thong_hieu' },
    { c: `Tìm số nguyên $x$ biết $3,4 < x < 4,5$.`, a: `$x = 4$.`, s: `Số nguyên duy nhất giữa 3,4 và 4,5 là 4.`, d: 'van_dung' },
  ]},
  { id: 'abe91fef-ec49-4f52-9151-b10b02eea76d', p: 'T5-B69', t: 'dai_so', q: [
    { c: `Tính: $12\\,345 + 6\\,789$.`, a: `$19\\,134$.`, s: `Cộng số tự nhiên.`, d: 'nhan_biet' },
    { c: `Tính: $\\dfrac{2}{3} + \\dfrac{1}{4}$.`, a: `$\\dfrac{11}{12}$.`, s: `Quy đồng mẫu: $8/12 + 3/12 = 11/12$.`, d: 'thong_hieu' },
    { c: `Tính: $4,5 \\times 2,4$.`, a: `$10,8$.`, s: `$4,5 \\times 2,4 = 10,80 = 10,8$.`, d: 'thong_hieu' },
    { c: `Tính: $15 : 0,5$.`, a: `$30$.`, s: `$15 : 0,5 = 15 \\times 2 = 30$.`, d: 'van_dung' },
    { c: `Tính: $\\dfrac{5}{6} \\times \\dfrac{3}{10}$.`, a: `$\\dfrac{1}{4}$.`, s: `$(5 \\times 3) / (6 \\times 10) = 15 / 60 = 1/4$.`, d: 'van_dung' },
    { c: `Tính: $2,4 + 3,5 \\times 2$.`, a: `$9,4$.`, s: `$3,5 \\times 2 = 7$. $2,4 + 7 = 9,4$.`, d: 'thong_hieu' },
    { c: `Tìm $x$: $x - 3,5 = 4,2$.`, a: `$x = 7,7$.`, s: `$x = 4,2 + 3,5 = 7,7$.`, d: 'nhan_biet' },
    { c: `Tìm $x$: $x \\times \\dfrac{2}{3} = \\dfrac{4}{5}$.`, a: `$x = \\dfrac{6}{5}$.`, s: `$x = \\dfrac{4}{5} : \\dfrac{2}{3} = \\dfrac{4}{5} \\times \\dfrac{3}{2} = \\dfrac{12}{10} = \\dfrac{6}{5}$.`, d: 'van_dung_cao' },
    { c: `Tính bằng cách thuận tiện: $4,25 \\times 0,5 \\times 4 \\times 2$.`, a: `$17$.`, s: `$4,25 \\times 4 \\times 0,5 \\times 2 = 17 \\times 1 = 17$.`, d: 'van_dung_cao' },
    { c: `Tính: $100 - 9,5 \\times 8$.`, a: `$24$.`, s: `$9,5 \\times 8 = 76$. $100 - 76 = 24$.`, d: 'van_dung' },
  ]},
  { id: '269c83be-2447-4a36-b2ef-006a83d6f46e', p: 'T5-B70', t: 'dai_so', q: [
    { c: `Tỉ số của 5 và 8 viết thế nào?`, a: `$\\dfrac{5}{8}$ hoặc $5:8$.`, s: `Cách viết tỉ số của hai số.`, d: 'nhan_biet' },
    { c: `$0,45$ viết thành tỉ số phần trăm?`, a: `$45\\%$.`, s: `$0,45 = 45/100 = 45\\%$.`, d: 'nhan_biet' },
    { c: `Lớp có 40 học sinh, 25 học sinh khá. Tỉ số phần trăm học sinh khá?`, a: `$62,5\\%$.`, s: `$25 : 40 = 0,625 = 62,5\\%$.`, d: 'thong_hieu' },
    { c: `Tìm $20\\%$ của $250$.`, a: `$50$.`, s: `$250 \\times 0,2 = 50$.`, d: 'thong_hieu' },
    { c: `Tìm một số biết $30\\%$ của nó là $60$.`, a: `$200$.`, s: `$60 : 0,3 = 200$.`, d: 'van_dung' },
    { c: `Tổng 2 số là $120$, tỉ số là $1/3$. Tìm số lớn.`, a: `$90$.`, s: `$120 : (1+3) \\times 3 = 90$.`, d: 'van_dung' },
    { c: `Hiệu 2 số là $40$, số lớn bằng $5/3$ số bé. Tìm số bé.`, a: `$60$.`, s: `$40 : (5-3) \\times 3 = 60$.`, d: 'van_dung' },
    { c: `Giá bán $100\\,000$ đ, giảm giá $15\\%$. Giá sau khi giảm?`, a: `$85\\,000$ đồng.`, s: `Giảm $15\\,000$ đ, còn $85\\,000$ đ.`, d: 'van_dung_cao' },
    { c: `Lãi suất tiết kiệm $0,5\\%$/tháng. Gửi 20 triệu thì sau 1 tháng lãi bao nhiêu?`, a: `$100\\,000$ đồng.`, s: `$20\\,000\\,000 \\times 0,005 = 100\\,000$.`, d: 'van_dung_cao' },
    { c: `$3/4$ viết thành phần trăm?`, a: `$75\\%$.`, s: `$3:4 = 0,75 = 75\\%$.`, d: 'nhan_biet' },
  ]},
  { id: 'bad7020c-db05-4e08-9553-0078055a3f11', p: 'T5-B71', t: 'hinh_hoc', q: [
    { c: `Công thức tính diện tích hình chữ nhật?`, a: `$S = a \\times b$.`, s: `Chiều dài nhân chiều rộng.`, d: 'nhan_biet' },
    { c: `Tính chu vi hình tròn đường kính $4$ cm.`, a: `$12,56$ cm.`, s: `$C = d \\times 3,14 = 4 \\times 3,14 = 12,56$.`, d: 'thong_hieu' },
    { c: `Tính diện tích hình tam giác đáy $5$ cm, cao $4$ cm.`, a: `$10\\text{ cm}^2$.`, s: `$S = (5 \\times 4) / 2 = 10$.`, d: 'thong_hieu' },
    { c: `Tính diện tích hình thang đáy lớn $6$ cm, đáy bé $4$ cm, cao $3$ cm.`, a: `$15\\text{ cm}^2$.`, s: `$S = (6+4)\\times 3 / 2 = 15$.`, d: 'van_dung' },
    { c: `Tính thể tích hình hộp chữ nhật có kích thước $5 \\times 4 \\times 2$ (cm).`, a: `$40\\text{ cm}^3$.`, s: `$V = 5 \\times 4 \\times 2 = 40$.`, d: 'van_dung' },
    { c: `Diện tích hình tròn bán kính $3$ cm.`, a: `$28,26\\text{ cm}^2$.`, s: `$S = r \\times r \\times 3,14 = 3 \\times 3 \\times 3,14 = 28,26$.`, d: 'van_dung_cao' },
    { c: `Chu vi hình vuông là $20$ cm. Tính diện tích.`, a: `$25\\text{ cm}^2$.`, s: `Cạnh $5$ cm. Diện tích $25\\text{ cm}^2$.`, d: 'van_dung' },
    { c: `Thể tích hình lập phương cạnh $4$ cm.`, a: `$64\\text{ cm}^3$.`, s: `$V = 4 \\times 4 \\times 4 = 64$.`, d: 'thong_hieu' },
    { c: `Hình hộp chữ nhật có $S_{\\text{đáy}} = 15\\text{ cm}^2$, chiều cao $4$ cm. Tính thể tích.`, a: `$60\\text{ cm}^3$.`, s: `$V = S \\times h = 15 \\times 4 = 60$.`, d: 'van_dung' },
    { c: `Chu vi bánh xe là $1,57$ m. Bán kính bánh xe là?`, a: `$0,25$ m.`, s: `$d = 1,57 : 3,14 = 0,5$ m $\\rightarrow r = 0,25$ m.`, d: 'van_dung_cao' },
  ]},
  { id: '2d13c910-9f91-4fb4-91cc-5d2321c1de8f', p: 'T5-B72', t: 'dai_so', q: [
    { c: `$3$ km $15$ m bằng bao nhiêu km?`, a: `$3,015$ km.`, s: `$15$ m $= 0,015$ km.`, d: 'thong_hieu' },
    { c: `$4,5$ tấn bằng bao nhiêu kg?`, a: `$4\\,500$ kg.`, s: `$4,5 \\times 1\\,000 = 4\\,500$.`, d: 'thong_hieu' },
    { c: `$2\\text{ m}^2$ $50\\text{ dm}^2$ bằng bao nhiêu $\\text{m}^2$?`, a: `$2,5\\text{ m}^2$.`, s: `$50\\text{ dm}^2 = 0,5\\text{ m}^2$.`, d: 'van_dung' },
    { c: `$3\\text{ m}^3$ bằng bao nhiêu $\\text{dm}^3$?`, a: `$3\\,000\\text{ dm}^3$.`, s: `$3 \\times 1\\,000 = 3\\,000$.`, d: 'nhan_biet' },
    { c: `$2$ giờ $15$ phút bằng bao nhiêu phút?`, a: `$135$ phút.`, s: `$2 \\times 60 + 15 = 135$.`, d: 'thong_hieu' },
    { c: `$1$ tuần $2$ ngày bằng bao nhiêu ngày?`, a: `$9$ ngày.`, s: `$7 + 2 = 9$.`, d: 'nhan_biet' },
    { c: `$45\\,000\\text{ cm}^3$ bằng bao nhiêu $\\text{dm}^3$?`, a: `$45\\text{ dm}^3$.`, s: `$45\\,000 : 1\\,000 = 45$.`, d: 'van_dung' },
    { c: `Cộng $3$ giờ $40$ phút + $2$ giờ $35$ phút.`, a: `$6$ giờ $15$ phút.`, s: `$5$ giờ $75$ phút $= 6$ giờ $15$ phút.`, d: 'van_dung_cao' },
    { c: `Nhân $1,5$ giờ với $4$.`, a: `$6$ giờ.`, s: `$1,5 \\times 4 = 6$.`, d: 'van_dung' },
    { c: `Chia $12$ phút $30$ giây cho $5$.`, a: `$2$ phút $30$ giây.`, s: `$10$ phút : $5 = 2$ phút. $150$ giây : $5 = 30$ giây.`, d: 'van_dung_cao' },
  ]},
  { id: 'be8fd73e-cf6b-48a0-9672-f20ee373c135', p: 'T5-B73', t: 'toan_chuyen_dong', q: [
    { c: `Quãng đường $s = 100$ km, thời gian $t = 2$ h. Tính $v$.`, a: `$50$ km/h.`, s: `$100 : 2 = 50$.`, d: 'nhan_biet' },
    { c: `$v = 40$ km/h, $t = 1,5$ h. Tính $s$.`, a: `$60$ km.`, s: `$40 \\times 1,5 = 60$.`, d: 'thong_hieu' },
    { c: `$s = 120$ km, $v = 60$ km/h. Tính $t$.`, a: `$2$ giờ.`, s: `$120 : 60 = 2$.`, d: 'thong_hieu' },
    { c: `Hai xe ngược chiều $40$ km/h và $50$ km/h. Cách nhau $180$ km. Sau bao lâu gặp nhau?`, a: `$2$ giờ.`, s: `$180 : (40+50) = 2$.`, d: 'van_dung' },
    { c: `Xe đuổi nhau cùng chiều, cách nhau $30$ km, $v_1 = 50$, $v_2 = 35$. Bao lâu đuổi kịp?`, a: `$2$ giờ.`, s: `$30 : (50-35) = 2$.`, d: 'van_dung' },
    { c: `Ca nô xuôi dòng với vận tốc thực $20$ km/h, nước chảy $3$ km/h. Vận tốc xuôi dòng?`, a: `$23$ km/h.`, s: `$20+3=23$.`, d: 'van_dung' },
    { c: `Đi bộ $5$ km/h, đi xe đạp $15$ km/h. Cùng đi $15$ km. Ai đến trước và trước bao lâu?`, a: `Xe đạp đến trước $2$ giờ.`, s: `Đi bộ hết $3$ h, xe đạp hết $1$ h.`, d: 'van_dung_cao' },
    { c: `Một tàu dài $100$ m qua cầu dài $400$ m với $v = 10$ m/s. Mất bao lâu?`, a: `$50$ giây.`, s: `Quãng đường $100+400=500$ m. $500:10 = 50$ s.`, d: 'van_dung_cao' },
    { c: `Điểm khởi hành lúc $6$ giờ, đến đích $100$ km lúc $8$ giờ $30$ phút. Tính $v$.`, a: `$40$ km/h.`, s: `Thời gian $2,5$ giờ. $100:2,5 = 40$.`, d: 'van_dung' },
    { c: `Âm thanh truyền trong không khí $340$ m/s. Quãng đường âm thanh đi trong $3$ giây?`, a: `$1\\,020$ m.`, s: `$340 \\times 3 = 1\\,020$.`, d: 'thong_hieu' },
  ]},
  { id: 'b7e5ff2f-2e9c-4db3-abeb-76486b707bbb', p: 'T5-B74', t: 'thong_ke_xac_suat', q: [
    { c: `Điểm toán: 7, 8, 9, 8, 10. Điểm trung bình?`, a: `$8,4$.`, s: `$(7+8+9+8+10):5 = 8,4$.`, d: 'thong_hieu' },
    { c: `Biểu đồ quạt: Đọc sách chiếm $25\\%$. Nghĩa là nó chiếm bao nhiêu phần của hình tròn?`, a: `$\\dfrac{1}{4}$ hình tròn.`, s: `$25\\% = 1/4$.`, d: 'nhan_biet' },
    { c: `Biểu đồ quạt: Môn Toán $40\\%$, môn Tiếng Việt $35\\%$, còn lại môn Khoa học. Môn Khoa học chiếm bao nhiêu $\\%$?`, a: `$25\\%$.`, s: `$100 - 40 - 35 = 25\\%$.`, d: 'thong_hieu' },
    { c: `Rút 1 lá bài trong bộ 52 lá. Khả năng rút được lá màu đỏ là bao nhiêu?`, a: `$\\dfrac{1}{2}$ (hoặc $50\\%$).`, s: `Có 26 lá đỏ. $26/52 = 1/2$.`, d: 'van_dung' },
    { c: `Gieo xúc xắc 1 lần. Khả năng được mặt chẵn là?`, a: `$\\dfrac{1}{2}$.`, s: `Mặt 2, 4, 6 là 3 mặt. $3/6 = 1/2$.`, d: 'van_dung' },
    { c: `Một hộp có 3 bi xanh, 2 bi đỏ. Lấy 1 viên. Khả năng lấy được bi đỏ là?`, a: `$\\dfrac{2}{5}$.`, s: `$2$ viên đỏ trên tổng $5$ viên.`, d: 'van_dung_cao' },
    { c: `Trong 1 tuần có mấy ngày cuối tuần (T7, CN)? Tỉ số ngày cuối tuần so với 1 tuần?`, a: `$\\dfrac{2}{7}$.`, s: `Có 2 ngày cuối tuần trong 7 ngày.`, d: 'thong_hieu' },
    { c: `Thu thập tuổi của 5 bạn: 10, 11, 10, 10, 12. Tuổi nào xuất hiện nhiều nhất?`, a: `$10$ tuổi.`, s: `$10$ xuất hiện $3$ lần.`, d: 'nhan_biet' },
    { c: `Nếu biểu đồ cột biểu diễn số cây trồng các lớp, lớp nào có cột cao nhất thì lớp đó trồng được?`, a: `Nhiều cây nhất.`, s: `Cột cao thể hiện số lượng lớn.`, d: 'nhan_biet' },
    { c: `Thống kê 200 bạn thì có 50 bạn cận thị. Tỉ lệ cận thị là?`, a: `$25\\%$.`, s: `$50 : 200 = 0,25 = 25\\%$.`, d: 'van_dung_cao' },
  ]},
  { id: 'fcab08df-8879-4634-9ee3-faa25d8042a9', p: 'T5-B75', t: 'dai_so', q: [
    { c: `Tính: $1,25 \\times 8$.`, a: `$10$.`, s: `$1,25 \\times 8 = 10$.`, d: 'nhan_biet' },
    { c: `Tìm $x$: $x \\times 0,1 = 25$.`, a: `$250$.`, s: `$x = 25 : 0,1 = 250$.`, d: 'thong_hieu' },
    { c: `Chu vi HCN có dài $5$ m, rộng $3$ m.`, a: `$16$ m.`, s: `$(5+3)\\times 2 = 16$.`, d: 'nhan_biet' },
    { c: `Diện tích tam giác vuông có 2 cạnh góc vuông $3$ cm và $4$ cm.`, a: `$6\\text{ cm}^2$.`, s: `$(3 \\times 4) / 2 = 6$.`, d: 'thong_hieu' },
    { c: `Quãng đường xe máy đi $40$ km/h trong $2,5$ giờ.`, a: `$100$ km.`, s: `$40 \\times 2,5 = 100$.`, d: 'van_dung' },
    { c: `$5\\%$ của $2\\,000$ là bao nhiêu?`, a: `$100$.`, s: `$2\\,000 \\times 0,05 = 100$.`, d: 'van_dung' },
    { c: `Tính giá trị: $(2,5 + 3,5) \\times 4$.`, a: `$24$.`, s: `$6 \\times 4 = 24$.`, d: 'van_dung_cao' },
    { c: `Đổi $3,5\\text{ m}^3$ sang $\\text{dm}^3$.`, a: `$3\\,500\\text{ dm}^3$.`, s: `$3,5 \\times 1\\,000 = 3\\,500$.`, d: 'thong_hieu' },
    { c: `Tổng $2$ số $150$, tỉ số $2/3$. Tìm số bé.`, a: `$60$.`, s: `$150 : 5 \\times 2 = 60$.`, d: 'van_dung_cao' },
    { c: `Một cái ao hình tròn bán kính $5$ m. Diện tích ao?`, a: `$78,5\\text{ m}^2$.`, s: `$5 \\times 5 \\times 3,14 = 78,5$.`, d: 'van_dung_cao' },
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
