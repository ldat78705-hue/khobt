const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const U = '8316c34e-765d-4b8c-9364-b683a17e33f8', G = 8, T = 'thong_ke';
const B = [
  { id: '68427d92-877e-46bb-91e1-ac42abab3274', p: 'T8-C5B18', q: [
    { c: `Thu thập dữ liệu là gì?`, a: `Quá trình tìm kiếm, ghi nhận thông tin.`, s: `Thu thập dữ liệu là quá trình tìm kiếm, ghi nhận các thông tin liên quan đến vấn đề cần khảo sát.`, d: 'nhan_biet' },
    { c: `Nêu hai phương pháp thu thập dữ liệu.`, a: `Quan sát, điều tra (bảng hỏi).`, s: `1) Quan sát trực tiếp. 2) Điều tra bằng bảng hỏi/phiếu khảo sát.`, d: 'nhan_biet' },
    { c: `Dữ liệu định lượng và dữ liệu định tính khác nhau thế nào?`, a: `Định lượng: số. Định tính: không phải số.`, s: `Dữ liệu định lượng biểu diễn bằng số (chiều cao, điểm). Dữ liệu định tính biểu diễn bằng thuộc tính (màu sắc, giới tính).`, d: 'nhan_biet' },
    { c: `Lớp 8A khảo sát môn thể thao yêu thích: Bóng đá (15), Cầu lông (8), Bóng rổ (10), Bơi lội (7). Tổng bao nhiêu HS?`, a: `$40$.`, s: `$15+8+10+7 = 40$ HS.`, d: 'thong_hieu' },
    { c: `Dữ liệu sau thuộc loại nào: "Điểm thi toán: 7; 8; 9; 6; 10"?`, a: `Định lượng.`, s: `Đây là dữ liệu định lượng vì biểu diễn bằng số.`, d: 'thong_hieu' },
    { c: `Khi nào nên dùng phương pháp điều tra bằng bảng hỏi?`, a: `Khi cần thu thập ý kiến từ nhiều người.`, s: `Dùng bảng hỏi khi đối tượng khảo sát đông, cần thu thập ý kiến hàng loạt, có thể gửi qua nhiều kênh.`, d: 'thong_hieu' },
    { c: `Khảo sát $50$ HS, ghi nhận thời gian đi học (phút): $5, 10, 15, 20, 25, 30$. Hãy phân loại thành các nhóm phù hợp.`, a: `$[5;15), [15;25), [25;35)$.`, s: `Chia nhóm: $[5;15)$: đi gần; $[15;25)$: trung bình; $[25;35)$: xa. Cách chia tùy mục đích.`, d: 'van_dung' },
    { c: `Lớp khảo sát sở thích: Đọc sách (12), Xem phim (18), Nghe nhạc (15), Thể thao (5). Tính tỉ lệ từng sở thích.`, a: `$24\\%, 36\\%, 30\\%, 10\\%$.`, s: `Tổng $= 50$. Đọc sách: $\\frac{12}{50}=24\\%$. Xem phim: $36\\%$. Nghe nhạc: $30\\%$. Thể thao: $10\\%$.`, d: 'van_dung' },
    { c: `Thiết kế bảng hỏi khảo sát mức độ hài lòng của HS về căng tin trường (ít nhất $3$ câu hỏi).`, a: `Câu hỏi mẫu.`, s: `1) Bạn ăn ở căng tin mấy lần/tuần? 2) Đánh giá chất lượng (1-5 sao). 3) Giá cả hợp lý không? (Có/Không). 4) Gợi ý cải thiện?`, d: 'van_dung_cao' },
    { c: `Cho bảng dữ liệu nhiệt độ $7$ ngày. Phân tích và nhận xét xu hướng: $25, 27, 26, 28, 30, 29, 31$.`, a: `Xu hướng tăng.`, s: `Nhiệt độ có xu hướng tăng từ $25°C$ đến $31°C$. TB $= \\frac{25+27+26+28+30+29+31}{7} = \\frac{196}{7} = 28°C$. Biến động nhẹ nhưng tổng thể tăng.`, d: 'van_dung_cao' },
  ]},
  { id: '91f95929-15c0-4d2c-98bb-37149b0638fe', p: 'T8-C5B19', q: [
    { c: `Bảng tần số dùng để làm gì?`, a: `Thống kê số lần xuất hiện của mỗi giá trị.`, s: `Bảng tần số ghi lại số lần xuất hiện (tần số) của mỗi giá trị trong tập dữ liệu.`, d: 'nhan_biet' },
    { c: `Biểu đồ cột dùng để biểu diễn loại dữ liệu nào?`, a: `Dữ liệu rời rạc, so sánh giữa các nhóm.`, s: `Biểu đồ cột phù hợp dữ liệu rời rạc, so sánh tần số/giá trị giữa các nhóm khác nhau.`, d: 'nhan_biet' },
    { c: `Biểu đồ hình quạt dùng khi nào?`, a: `Khi muốn biểu diễn tỉ lệ phần trăm.`, s: `Biểu đồ hình quạt biểu diễn tỉ lệ phần của từng phần so với tổng thể.`, d: 'nhan_biet' },
    { c: `Điểm thi: $5,6,7,7,8,8,8,9,9,10$. Lập bảng tần số.`, a: `$5:1, 6:1, 7:2, 8:3, 9:2, 10:1$.`, s: `| Điểm | $5$ | $6$ | $7$ | $8$ | $9$ | $10$ |\\n| Tần số | $1$ | $1$ | $2$ | $3$ | $2$ | $1$ |`, d: 'thong_hieu' },
    { c: `Biểu đồ đoạn thẳng khác biểu đồ cột ở điểm nào?`, a: `Dùng điểm nối bằng đoạn thẳng, thể hiện xu hướng biến đổi.`, s: `Biểu đồ đoạn thẳng dùng các điểm nối liền, phù hợp dữ liệu theo thời gian, thể hiện xu hướng tăng/giảm.`, d: 'thong_hieu' },
    { c: `Khảo sát $40$ HS: Giỏi ($10$), Khá ($18$), TB ($8$), Yếu ($4$). Tính góc quạt mỗi loại.`, a: `$90°, 162°, 72°, 36°$.`, s: `Giỏi: $\\frac{10}{40} \\times 360° = 90°$. Khá: $162°$. TB: $72°$. Yếu: $36°$.`, d: 'thong_hieu' },
    { c: `Từ bảng tần số điểm toán: $4(2), 5(5), 6(8), 7(10), 8(7), 9(5), 10(3)$. Tính điểm TB.`, a: `$\\approx 6{,}9$.`, s: `$\\bar{x} = \\frac{4 \\times 2+5 \\times 5+6 \\times 8+7 \\times 10+8 \\times 7+9 \\times 5+10 \\times 3}{40} = \\frac{276}{40} = 6{,}9$.`, d: 'van_dung' },
    { c: `Vẽ biểu đồ nào phù hợp cho: doanh thu $4$ quý trong năm?`, a: `Biểu đồ cột hoặc đoạn thẳng.`, s: `Biểu đồ cột: so sánh doanh thu giữa các quý. Biểu đồ đoạn thẳng: thể hiện xu hướng biến đổi.`, d: 'van_dung' },
    { c: `Bảng lương $10$ nhân viên (triệu): $5, 5, 6, 6, 6, 7, 7, 8, 10, 15$. Nhận xét về giá trị bất thường.`, a: `$15$ triệu là giá trị bất thường.`, s: `TB $= 7{,}5$. $15$ cao bất thường, xa trung bình. Trung vị $= 6{,}5$ phản ánh tốt hơn TB trong trường hợp này.`, d: 'van_dung_cao' },
    { c: `So sánh ưu nhược điểm của biểu đồ cột, biểu đồ quạt, và biểu đồ đoạn thẳng.`, a: `Tùy mục đích sử dụng.`, s: `Cột: so sánh trực quan giữa các nhóm, không tốt cho tỉ lệ. Quạt: tỉ lệ, không tốt khi nhiều nhóm. Đoạn thẳng: xu hướng theo thời gian, không tốt cho dữ liệu rời rạc.`, d: 'van_dung_cao' },
  ]},
  { id: 'ba196aef-2160-41d8-af98-12f8d59b2de0', p: 'T8-C5B20', q: [
    { c: `Số trung bình cộng (mean) là gì?`, a: `Tổng các giá trị chia cho số giá trị.`, s: `$\\bar{x} = \\frac{x_1+x_2+...+x_n}{n}$.`, d: 'nhan_biet' },
    { c: `Số trung vị (median) là gì?`, a: `Giá trị ở giữa khi sắp xếp tăng dần.`, s: `Trung vị là giá trị chia dãy đã sắp thành hai phần bằng nhau.`, d: 'nhan_biet' },
    { c: `Mốt (mode) là gì?`, a: `Giá trị xuất hiện nhiều nhất.`, s: `Mốt là giá trị có tần số lớn nhất trong tập dữ liệu.`, d: 'nhan_biet' },
    { c: `Dãy số: $3, 5, 7, 8, 9$. Tìm trung vị.`, a: `$7$.`, s: `$5$ số, sắp xếp: $3,5,7,8,9$. Trung vị $= 7$ (vị trí thứ $3$).`, d: 'thong_hieu' },
    { c: `Dãy: $2, 4, 4, 5, 6, 6, 6, 7, 8$. Tìm mốt.`, a: `$6$.`, s: `$6$ xuất hiện $3$ lần (nhiều nhất) → mốt $= 6$.`, d: 'thong_hieu' },
    { c: `Dãy: $10, 12, 14, 16$. Tìm trung vị.`, a: `$13$.`, s: `$4$ số (chẵn). Trung vị $= \\frac{12+14}{2} = 13$.`, d: 'thong_hieu' },
    { c: `Điểm $10$ HS: $4, 5, 5, 6, 7, 7, 7, 8, 9, 10$. Tính TB, trung vị, mốt.`, a: `TB $= 6{,}8$, trung vị $= 7$, mốt $= 7$.`, s: `TB $= \\frac{68}{10} = 6{,}8$. Trung vị $= \\frac{7+7}{2} = 7$. Mốt $= 7$ (xuất hiện $3$ lần).`, d: 'van_dung' },
    { c: `Lương $5$ người: $5, 6, 7, 8, 50$ (triệu). Tính TB và trung vị. Nên dùng đại lượng nào?`, a: `TB $= 15{,}2$, trung vị $= 7$. Nên dùng trung vị.`, s: `TB $= \\frac{76}{5} = 15{,}2$ (bị ảnh hưởng bởi $50$). Trung vị $= 7$. Trung vị phản ánh tốt hơn mức lương đa số.`, d: 'van_dung' },
    { c: `Chiều cao ($cm$) $8$ HS: $155, 158, 160, 160, 162, 165, 168, 170$. Tính khoảng biến thiên.`, a: `$15$ cm.`, s: `Khoảng biến thiên $= 170-155 = 15$ cm.`, d: 'van_dung_cao' },
    { c: `Hai lớp có điểm TB Toán bằng nhau ($7{,}0$). Lớp A: $5,6,7,7,8,9$. Lớp B: $3,5,7,7,9,11$. So sánh độ phân tán.`, a: `Lớp B phân tán hơn.`, s: `Lớp A: khoảng biến thiên $= 4$. Lớp B: khoảng biến thiên $= 8$. Lớp B phân tán hơn dù TB bằng nhau. Độ lệch chuẩn lớp B lớn hơn.`, d: 'van_dung_cao' },
  ]},
  { id: 'b9673cb6-7d68-4d4e-81af-e202c0f63761', p: 'T8-C5BTC', q: [
    { c: `Dữ liệu "Nhóm máu: A, B, O, AB" thuộc loại nào?`, a: `Định tính.`, s: `Nhóm máu là thuộc tính, không phải số → dữ liệu định tính.`, d: 'nhan_biet' },
    { c: `Nêu $3$ loại biểu đồ thường dùng trong thống kê.`, a: `Cột, quạt, đoạn thẳng.`, s: `1) Biểu đồ cột. 2) Biểu đồ hình quạt. 3) Biểu đồ đoạn thẳng.`, d: 'nhan_biet' },
    { c: `$8$ HS có điểm: $6,7,7,8,8,8,9,10$. Tính TB.`, a: `$7{,}875$.`, s: `TB $= \\frac{6+7+7+8+8+8+9+10}{8} = \\frac{63}{8} = 7{,}875$.`, d: 'thong_hieu' },
    { c: `Từ bảng tần số: $5(3), 6(5), 7(8), 8(4)$. Tìm mốt.`, a: `$7$.`, s: `$7$ có tần số cao nhất ($8$) → mốt $= 7$.`, d: 'thong_hieu' },
    { c: `Dãy $12$ số: $2,3,4,4,5,5,5,6,6,7,8,9$. Tìm trung vị.`, a: `$5$.`, s: `$12$ số, trung vị $= \\frac{x_6+x_7}{2} = \\frac{5+5}{2} = 5$.`, d: 'thong_hieu' },
    { c: `Khảo sát $50$ HS về thời gian tự học/ngày (giờ): $1(8), 1{,}5(12), 2(18), 2{,}5(7), 3(5)$. Tính TB.`, a: `$\\approx 1{,}88$ giờ.`, s: `$\\bar{x} = \\frac{1 \\times 8+1{,}5 \\times 12+2 \\times 18+2{,}5 \\times 7+3 \\times 5}{50} = \\frac{94}{50} = 1{,}88$.`, d: 'van_dung' },
    { c: `Biểu đồ quạt cho: A ($25\\%$), B ($35\\%$), C ($20\\%$), D ($20\\%$). Tính góc quạt mỗi phần.`, a: `$90°, 126°, 72°, 72°$.`, s: `A: $0{,}25 \\times 360° = 90°$. B: $126°$. C: $72°$. D: $72°$.`, d: 'van_dung' },
    { c: `Nhiệt độ $5$ ngày: $28, 30, 29, 31, 27$ (°C). Tính TB, trung vị, khoảng biến thiên.`, a: `TB $= 29$, trung vị $= 29$, KBT $= 4$.`, s: `TB $= \\frac{145}{5} = 29°C$. Sắp xếp: $27,28,29,30,31$. Trung vị $= 29$. KBT $= 31-27 = 4$.`, d: 'van_dung' },
    { c: `Cửa hàng bán áo ($30$ chiếc): S($5$), M($12$), L($8$), XL($5$). Nhập hàng $60$ áo, nên nhập bao nhiêu mỗi size?`, a: `S: $10$, M: $24$, L: $16$, XL: $10$.`, s: `Tỉ lệ: S: $\\frac{5}{30}$, M: $\\frac{12}{30}$, L: $\\frac{8}{30}$, XL: $\\frac{5}{30}$. Nhập $60$: S $= 10$, M $= 24$, L $= 16$, XL $= 10$.`, d: 'van_dung_cao' },
    { c: `Hai cách tính TB cho kết quả rất khác nhau khi dữ liệu có ngoại lai. Giải thích và đề xuất cách xử lý.`, a: `Dùng trung vị hoặc loại bỏ ngoại lai.`, s: `TB bị kéo lệch bởi giá trị cực đại/cực tiểu. Cách xử lý: 1) Dùng trung vị. 2) Dùng TB cắt xén (loại $x\\%$ hai đầu). 3) Kiểm tra và loại ngoại lai nếu là sai số.`, d: 'van_dung_cao' },
  ]},
];
async function main() {
  let total = 0;
  for (const b of B) {
    console.log('=== '+b.p+' ===');
    let c = 0;
    for (const q of b.q) {
      const code = b.p+'-'+String(c+1).padStart(3,'0');
      await sql`INSERT INTO public.questions (content,answer,solution,grade,topic,difficulty,question_type,category_id,status,is_public,question_code,user_id) VALUES (${q.c},${q.a},${q.s},${G},${T},${q.d},'tu_luan',${b.id},'approved',true,${code},${U})`;
      c++; console.log('OK: '+code);
    }
    total += c;
  }
  console.log('Total: '+total);
}
main().catch(console.error);
