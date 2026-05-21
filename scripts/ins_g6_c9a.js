const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const U = '8316c34e-765d-4b8c-9364-b683a17e33f8', G = 6, T = 'thong_ke';
const B = [
  { id: '9f922dcc-a465-4caa-a4ef-6440430f21b1', p: 'T6-C9B38', q: [
    { c: `Nêu hai ví dụ về dữ liệu định lượng và hai ví dụ về dữ liệu định tính.`, a: `Định lượng: chiều cao, điểm thi. Định tính: màu sắc, sở thích.`, s: `**Dữ liệu định lượng** (biểu diễn bằng số): chiều cao HS, điểm kiểm tra.\n**Dữ liệu định tính** (không phải số): màu mắt, môn học yêu thích.`, d: 'nhan_biet' },
    { c: `Thu thập dữ liệu bằng cách nào? Kể ít nhất 3 cách.`, a: `Khảo sát, quan sát, thí nghiệm.`, s: `Các cách thu thập: (1) Khảo sát/phỏng vấn, (2) Quan sát trực tiếp, (3) Thí nghiệm, (4) Thu thập từ tài liệu có sẵn.`, d: 'nhan_biet' },
    { c: `Bảng dữ liệu sau có bao nhiêu đơn vị dữ liệu? Dữ liệu: $5, 8, 3, 7, 9, 2, 6, 4$.`, a: `$8$ đơn vị.`, s: `Đếm số giá trị trong dãy: có $8$ giá trị → $8$ đơn vị dữ liệu.`, d: 'nhan_biet' },
    { c: `Dữ liệu "Số con trong gia đình" là dữ liệu định lượng hay định tính? Giải thích.`, a: `Định lượng.`, s: `Đây là dữ liệu **định lượng** vì biểu diễn bằng số và có thể thực hiện phép tính (tính trung bình, so sánh...).`, d: 'thong_hieu' },
    { c: `Một bạn khảo sát món ăn yêu thích của 20 bạn. Kết quả: Phở (8), Bún (5), Cơm (4), Mì (3). Hãy kiểm tra dữ liệu này có hợp lệ không.`, a: `Hợp lệ vì tổng $= 20$.`, s: `$8+5+4+3 = 20$ bằng tổng số bạn khảo sát → hợp lệ ✓.`, d: 'thong_hieu' },
    { c: `Hãy thiết kế một phiếu khảo sát về thời gian học bài ở nhà mỗi ngày của học sinh lớp 6.`, a: `Phiếu gồm câu hỏi + các lựa chọn.`, s: `VD phiếu:\n- Họ tên: ...\n- Lớp: ...\n- Mỗi ngày bạn học bài ở nhà bao lâu?\n  □ Dưới 1 giờ  □ 1-2 giờ  □ 2-3 giờ  □ Trên 3 giờ`, d: 'thong_hieu' },
    { c: `Dữ liệu điểm Toán: $7, 8, 5, 9, 7, 6, 8, 7, 10, 8$. Sắp xếp tăng dần và tìm giá trị xuất hiện nhiều nhất.`, a: `Sắp xếp: $5,6,7,7,7,8,8,8,9,10$. Mốt: $7$ và $8$.`, s: `Sắp xếp: $5, 6, 7, 7, 7, 8, 8, 8, 9, 10$.\nGiá trị $7$ xuất hiện $3$ lần, $8$ xuất hiện $3$ lần → hai mốt.`, d: 'van_dung' },
    { c: `Dữ liệu thu thập từ internet có luôn đáng tin cậy không? Giải thích.`, a: `Không luôn đáng tin.`, s: `Không luôn đáng tin vì: (1) Nguồn có thể không chính thống, (2) Dữ liệu có thể đã cũ, (3) Có thể bị sai lệch do mục đích tuyên truyền. Cần kiểm tra nguồn gốc và thời điểm thu thập.`, d: 'van_dung' },
    { c: `Hãy nêu sự khác biệt giữa tổng thể và mẫu trong thống kê.`, a: `Tổng thể là toàn bộ, mẫu là một phần.`, s: `**Tổng thể**: Toàn bộ đối tượng cần nghiên cứu.\n**Mẫu**: Một phần được chọn từ tổng thể để khảo sát.\nVD: Tổng thể = tất cả HS lớp 6 cả nước; Mẫu = 100 HS lớp 6 được chọn.`, d: 'van_dung_cao' },
    { c: `Giải thích tại sao khi khảo sát, cỡ mẫu lớn hơn thì kết quả đáng tin cậy hơn.`, a: `Mẫu lớn đại diện tốt hơn cho tổng thể.`, s: `Cỡ mẫu lớn giúp giảm sai số ngẫu nhiên, mẫu đại diện tốt hơn cho tổng thể. Theo quy luật số lớn, khi $n$ tăng, tỷ lệ mẫu tiến gần đến tỷ lệ thực của tổng thể.`, d: 'van_dung_cao' },
  ]},
  { id: 'ddeebaff-2083-4584-b4e4-c6e3b16edc2c', p: 'T6-C9B39', q: [
    { c: `Đọc bảng thống kê sau và cho biết có bao nhiêu loại trái cây: Cam (5), Táo (3), Xoài (7), Chuối (4).`, a: `$4$ loại.`, s: `Có $4$ loại trái cây: Cam, Táo, Xoài, Chuối.`, d: 'nhan_biet' },
    { c: `Biểu đồ tranh dùng để làm gì?`, a: `Biểu diễn dữ liệu bằng hình ảnh trực quan.`, s: `Biểu đồ tranh dùng các hình ảnh (icon, biểu tượng) để biểu diễn dữ liệu, giúp so sánh trực quan và dễ hiểu.`, d: 'nhan_biet' },
    { c: `Bảng: Lớp 6A (32 HS), 6B (35 HS), 6C (30 HS). Tổng bao nhiêu HS?`, a: `$97$ HS.`, s: `$32 + 35 + 30 = 97$ HS.`, d: 'nhan_biet' },
    { c: `Từ bảng: Giỏi (8), Khá (15), TB (12), Yếu (5). Tính tỉ lệ % HS giỏi.`, a: `$20\\%$.`, s: `Tổng: $8+15+12+5=40$. Tỉ lệ giỏi: $\\frac{8}{40} = 0{,}2 = 20\\%$.`, d: 'thong_hieu' },
    { c: `Biểu đồ tranh: mỗi hình 🍎 = 5 quả. Có 3 hình. Hỏi có bao nhiêu quả táo?`, a: `$15$ quả.`, s: `$3 \\times 5 = 15$ quả táo.`, d: 'thong_hieu' },
    { c: `Bảng: Thứ 2 (120 khách), T3 (95), T4 (110), T5 (130), T6 (150). Ngày nào đông nhất? Ít nhất?`, a: `Đông nhất: T6. Ít nhất: T3.`, s: `So sánh: $95 < 110 < 120 < 130 < 150$. Đông nhất: Thứ 6 ($150$), ít nhất: Thứ 3 ($95$).`, d: 'thong_hieu' },
    { c: `Lập bảng thống kê từ dữ liệu: A, B, A, C, B, A, B, C, A, B. Đếm tần số mỗi giá trị.`, a: `A: 4, B: 4, C: 2.`, s: `Đếm: A xuất hiện $4$ lần, B xuất hiện $4$ lần, C xuất hiện $2$ lần. Tổng: $10$.`, d: 'van_dung' },
    { c: `Từ bảng thống kê điểm: 5(2), 6(5), 7(8), 8(10), 9(4), 10(1). Tính trung bình.`, a: `$7{,}1$.`, s: `$\\bar{x} = \\frac{5 \\times 2 + 6 \\times 5 + 7 \\times 8 + 8 \\times 10 + 9 \\times 4 + 10 \\times 1}{30} = \\frac{213}{30} = 7{,}1$.`, d: 'van_dung' },
    { c: `Nhận xét ưu và nhược điểm của biểu đồ tranh so với bảng số liệu.`, a: `Ưu: trực quan. Nhược: không chính xác tuyệt đối.`, s: `**Ưu điểm**: Trực quan, dễ so sánh, hấp dẫn.\n**Nhược điểm**: Khó biểu diễn chính xác số lẻ, tốn không gian, khó dùng với dữ liệu phức tạp.`, d: 'van_dung_cao' },
    { c: `Thiết kế bảng thống kê và vẽ biểu đồ tranh cho: Số sách đọc trong tháng của 5 bạn: An(4), Bình(6), Chi(3), Dung(5), Em(2).`, a: `Bảng + biểu đồ tranh.`, s: `| Tên | Số sách |\n|---|---|\n| An | 4 |\n| Bình | 6 |\n| Chi | 3 |\n| Dung | 5 |\n| Em | 2 |\n\nBiểu đồ tranh: mỗi 📖 = 1 quyển.\nAn: 📖📖📖📖\nBình: 📖📖📖📖📖📖\nChi: 📖📖📖\nDung: 📖📖📖📖📖\nEm: 📖📖`, d: 'van_dung_cao' },
  ]},
  { id: 'cd8d3aa6-af49-40c3-a137-41e435c7ca60', p: 'T6-C9B40', q: [
    { c: `Biểu đồ cột dùng để biểu diễn loại dữ liệu nào?`, a: `Dữ liệu rời rạc, so sánh các nhóm.`, s: `Biểu đồ cột thích hợp để biểu diễn và so sánh dữ liệu rời rạc giữa các nhóm/hạng mục.`, d: 'nhan_biet' },
    { c: `Đọc biểu đồ: cột A cao 15, cột B cao 25, cột C cao 10. Tổng?`, a: `$50$.`, s: `$15 + 25 + 10 = 50$.`, d: 'nhan_biet' },
    { c: `Trục tung, trục hoành trong biểu đồ cột biểu diễn gì?`, a: `Trục hoành: hạng mục. Trục tung: tần số/giá trị.`, s: `**Trục hoành** (ngang): các hạng mục/nhóm.\n**Trục tung** (dọc): tần số hoặc giá trị số liệu.\nMỗi cột ứng với một hạng mục, chiều cao = giá trị.`, d: 'nhan_biet' },
    { c: `Điểm Toán lớp 6A: 5(3), 6(5), 7(10), 8(8), 9(3), 10(1). Vẽ biểu đồ cột.`, a: `Biểu đồ cột 6 cột.`, s: `Trục hoành: điểm ($5, 6, 7, 8, 9, 10$).\nTrục tung: số HS.\nCột cao nhất: điểm $7$ ($10$ HS), thấp nhất: điểm $10$ ($1$ HS).`, d: 'thong_hieu' },
    { c: `Biểu đồ cột cho thấy: T1(100), T2(120), T3(90), T4(150). Tháng nào bán nhiều nhất? Tăng/giảm thế nào?`, a: `T4 nhiều nhất. Giảm T3, tăng mạnh T4.`, s: `Bán nhiều nhất: T4 ($150$). Xu hướng: tăng T1→T2, giảm T2→T3, tăng mạnh T3→T4.`, d: 'thong_hieu' },
    { c: `Khi nào nên dùng biểu đồ cột thay vì biểu đồ tranh?`, a: `Khi cần chính xác và dữ liệu nhiều.`, s: `Dùng biểu đồ cột khi: (1) Cần độ chính xác cao, (2) Dữ liệu có nhiều hạng mục, (3) Giá trị lớn khó biểu diễn bằng hình ảnh.`, d: 'thong_hieu' },
    { c: `Số HS giỏi qua các năm: 2021(25), 2022(30), 2023(28), 2024(35). Vẽ biểu đồ và nhận xét xu hướng.`, a: `Xu hướng tăng chung.`, s: `Biểu đồ cột 4 năm. Xu hướng: tăng chung dù giảm nhẹ năm 2023. Tăng mạnh nhất 2023→2024 ($+7$).`, d: 'van_dung' },
    { c: `Từ biểu đồ cột, tính trung bình cộng: A(12), B(18), C(15), D(9).`, a: `$13{,}5$.`, s: `TB $= \\frac{12+18+15+9}{4} = \\frac{54}{4} = 13{,}5$.`, d: 'van_dung' },
    { c: `So sánh biểu đồ cột ngang và biểu đồ cột dọc. Khi nào nên dùng cột ngang?`, a: `Khi tên hạng mục dài.`, s: `Biểu đồ cột ngang nên dùng khi: tên hạng mục dài (dễ đọc), số hạng mục nhiều, hoặc muốn nhấn mạnh thứ tự xếp hạng.`, d: 'van_dung_cao' },
    { c: `Hai biểu đồ cột cùng dữ liệu nhưng trục tung bắt đầu từ $0$ và từ $50$. Biểu đồ nào có thể gây hiểu lầm? Giải thích.`, a: `Trục bắt đầu từ $50$ có thể phóng đại sự khác biệt.`, s: `Biểu đồ trục tung bắt đầu từ $50$ sẽ phóng đại sự chênh lệch giữa các cột, có thể gây hiểu lầm rằng khác biệt rất lớn. Biểu đồ trung thực nên bắt đầu từ $0$ hoặc ghi chú rõ.`, d: 'van_dung_cao' },
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
