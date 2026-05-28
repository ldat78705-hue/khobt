import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);

async function insertGrade6Batch4() {
  console.log('Khởi tạo kết nối CSDL...');
  
  const users = await sql`SELECT user_id FROM public.questions WHERE user_id IS NOT NULL LIMIT 1`;
  const defaultUserId = users.length > 0 ? users[0].user_id : '00000000-0000-0000-0000-000000000000';

  const topics = [
    {
      name: 'Bài 38. Dữ liệu và thu thập dữ liệu',
      questions: [
        { q: 'T6-C9B38-001', c: 'Dữ liệu được chia thành mấy loại chính?', a: '$2$ loại (số liệu và không phải số liệu)', s: 'Dữ liệu thường được chia làm hai loại: số liệu (dữ liệu định lượng) và dữ liệu không phải là số (dữ liệu định tính).', d: 'nhan_biet', o: ['$1$ loại', '$2$ loại (số liệu và không phải số liệu)', '$3$ loại', '$4$ loại'] },
        { q: 'T6-C9B38-002', c: 'Thu thập dữ liệu KHÔNG thể thực hiện qua cách nào sau đây?', a: 'Đoán mò', s: 'Thu thập dữ liệu phải có cơ sở thực tế như: Quan sát, làm thí nghiệm, lập phiếu hỏi, thu thập từ các nguồn có sẵn. Không thể đoán mò.', d: 'nhan_biet', o: ['Lập phiếu hỏi', 'Quan sát', 'Đoán mò', 'Làm thí nghiệm'] },
        { q: 'T6-C9B38-003', c: 'Trong các dữ liệu sau, dữ liệu nào là số liệu?', a: 'Chiều cao của học sinh', s: 'Chiều cao được đo bằng số (ví dụ: 150cm) nên là số liệu.', d: 'thong_hieu', o: ['Sở thích môn học', 'Màu sắc yêu thích', 'Loại quả yêu thích', 'Chiều cao của học sinh'] },
        { q: 'T6-C9B38-004', c: 'Trong các dữ liệu sau, dữ liệu nào KHÔNG phải số liệu?', a: 'Sở thích về màu sắc', s: 'Sở thích màu sắc (đỏ, xanh, vàng...) không phải là số lượng đo đếm.', d: 'thong_hieu', o: ['Cân nặng của bạn cùng bàn', 'Sở thích về màu sắc', 'Điểm thi môn Toán', 'Số học sinh vắng mặt'] },
        { q: 'T6-C9B38-005', c: 'Muốn biết môn thể thao yêu thích của các bạn học sinh lớp 6A, cách thu thập dữ liệu phù hợp nhất là gì?', a: 'Lập phiếu hỏi (phỏng vấn)', s: 'Để biết ý kiến hay sở thích của một nhóm người, lập phiếu hỏi hoặc phỏng vấn trực tiếp là hiệu quả nhất.', d: 'van_dung', o: ['Quan sát lén lút', 'Đo đạc', 'Lập phiếu hỏi (phỏng vấn)', 'Làm thí nghiệm'] }
      ]
    },
    {
      name: 'Bài 39. Bảng thống kê và biểu đồ tranh',
      questions: [
        { q: 'T6-C9B39-001', c: 'Bảng thống kê dùng để làm gì?', a: 'Trình bày các dữ liệu thu thập được một cách khoa học, rõ ràng', s: 'Bảng thống kê giúp phân loại, sắp xếp các dữ liệu thu thập được một cách khoa học để dễ dàng nhận xét.', d: 'nhan_biet', o: ['Chỉ để tính tổng', 'Trình bày các dữ liệu thu thập được một cách khoa học, rõ ràng', 'Để vẽ hình học', 'Để làm thí nghiệm'] },
        { q: 'T6-C9B39-002', c: 'Biểu đồ tranh sử dụng yếu tố nào để thể hiện dữ liệu?', a: 'Hình ảnh hoặc biểu tượng', s: 'Biểu đồ tranh dùng các hình ảnh hoặc biểu tượng để trực quan hóa số lượng các đối tượng.', d: 'nhan_biet', o: ['Các cột hình chữ nhật', 'Hình ảnh hoặc biểu tượng', 'Các điểm nối với nhau', 'Các đường thẳng'] },
        { q: 'T6-C9B39-003', c: 'Trong biểu đồ tranh, nếu một biểu tượng mặt cười đại diện cho $10$ học sinh thì $3$ biểu tượng mặt cười đại diện cho bao nhiêu học sinh?', a: '$30$ học sinh', s: 'Số học sinh = $3 \\times 10 = 30$ (học sinh).', d: 'thong_hieu', o: ['$3$ học sinh', '$10$ học sinh', '$13$ học sinh', '$30$ học sinh'] },
        { q: 'T6-C9B39-004', c: 'Trong biểu đồ tranh, nếu $1$ biểu tượng ngôi sao tương ứng với $5$ điểm tốt. Để biểu diễn $20$ điểm tốt cần bao nhiêu ngôi sao?', a: '$4$ ngôi sao', s: 'Số ngôi sao = $20 : 5 = 4$.', d: 'thong_hieu', o: ['$3$ ngôi sao', '$4$ ngôi sao', '$5$ ngôi sao', '$20$ ngôi sao'] },
        { q: 'T6-C9B39-005', c: 'Một bảng thống kê ghi lại số sách bán được trong $4$ ngày. Để biểu diễn trực quan dữ liệu đó sinh động nhất cho học sinh tiểu học, ta nên dùng:', a: 'Biểu đồ tranh', s: 'Biểu đồ tranh sử dụng hình ảnh sinh động, phù hợp để minh họa trực quan.', d: 'van_dung', o: ['Đoạn thẳng', 'Biểu đồ tranh', 'Lời văn mô tả', 'Các phép tính'] }
      ]
    },
    {
      name: 'Bài 40. Biểu đồ cột',
      questions: [
        { q: 'T6-C9B40-001', c: 'Trong biểu đồ cột, các cột hình chữ nhật dùng để vẽ biểu đồ có đặc điểm gì về bề rộng?', a: 'Bề rộng bằng nhau', s: 'Trong biểu đồ cột, các cột có bề rộng bằng nhau, chiều cao tỉ lệ với số liệu cần biểu diễn.', d: 'nhan_biet', o: ['Bề rộng thay đổi tùy số liệu', 'Bề rộng bằng nhau', 'Bề rộng tăng dần', 'Bề rộng bằng chiều cao'] },
        { q: 'T6-C9B40-002', c: 'Trong biểu đồ cột, chiều cao của cột thể hiện yếu tố nào?', a: 'Số liệu thống kê của đối tượng', s: 'Chiều cao của cột biểu diễn đại lượng (số lượng) của đối tượng tương ứng.', d: 'nhan_biet', o: ['Tên đối tượng', 'Số liệu thống kê của đối tượng', 'Đơn vị đo', 'Số thứ tự của đối tượng'] },
        { q: 'T6-C9B40-003', c: 'Biểu đồ cột thường được dùng để làm gì?', a: 'So sánh các số liệu thống kê của các đối tượng', s: 'Biểu đồ cột giúp người xem dễ dàng so sánh quy mô, số lượng của các đối tượng khác nhau.', d: 'thong_hieu', o: ['Theo dõi sự thay đổi theo thời gian', 'So sánh các số liệu thống kê của các đối tượng', 'Tính toán số liệu', 'Vẽ hình học'] },
        { q: 'T6-C9B40-004', c: 'Trục ngang của biểu đồ cột thông thường biểu diễn gì?', a: 'Các đối tượng thống kê', s: 'Trục ngang thường ghi tên các đối tượng thống kê, trục đứng ghi số liệu.', d: 'thong_hieu', o: ['Các đối tượng thống kê', 'Số liệu thống kê', 'Thời gian (nếu không có tiêu chí)', 'Độ dài của cột'] },
        { q: 'T6-C9B40-005', c: 'Nhìn vào biểu đồ cột, cột cao nhất tương ứng với điều gì?', a: 'Đối tượng có số lượng (hoặc giá trị) lớn nhất', s: 'Vì chiều cao cột tỉ lệ với số liệu, cột cao nhất ứng với số liệu lớn nhất.', d: 'van_dung', o: ['Đối tượng có số lượng (hoặc giá trị) bé nhất', 'Đối tượng có số lượng trung bình', 'Đối tượng có số lượng (hoặc giá trị) lớn nhất', 'Không mang ý nghĩa so sánh'] }
      ]
    },
    {
      name: 'Bài 41. Biểu đồ cột kép',
      questions: [
        { q: 'T6-C9B41-001', c: 'Biểu đồ cột kép thường được dùng để làm gì?', a: 'So sánh từng cặp số liệu của hai tập dữ liệu cùng loại', s: 'Biểu đồ cột kép ghép hai biểu đồ cột lại để so sánh trực tiếp hai tập dữ liệu (ví dụ điểm Toán của 2 lớp).', d: 'nhan_biet', o: ['Biểu diễn một tập dữ liệu duy nhất', 'So sánh từng cặp số liệu của hai tập dữ liệu cùng loại', 'Chỉ biểu diễn dữ liệu không phải là số', 'Làm cho biểu đồ đẹp hơn'] },
        { q: 'T6-C9B41-002', c: 'Trong biểu đồ cột kép, mỗi đối tượng thống kê được biểu diễn bằng:', a: 'Hai cột hình chữ nhật ghép sát nhau', s: 'Với mỗi đối tượng, ta dùng 2 cột liền kề nhau để biểu diễn 2 loại số liệu cần so sánh.', d: 'nhan_biet', o: ['Một cột hình chữ nhật', 'Hai cột hình chữ nhật ghép sát nhau', 'Ba cột hình chữ nhật', 'Hai đường thẳng'] },
        { q: 'T6-C9B41-003', c: 'Để phân biệt hai cột trong cùng một đối tượng của biểu đồ cột kép, người ta thường dùng yếu tố nào?', a: 'Màu sắc hoặc họa tiết khác nhau kèm theo bảng chú giải', s: 'Cần có chú giải màu sắc/họa tiết để biết cột nào thuộc tập dữ liệu nào.', d: 'thong_hieu', o: ['Độ rộng của cột khác nhau', 'Màu sắc hoặc họa tiết khác nhau kèm theo bảng chú giải', 'Khoảng cách giữa hai cột', 'Không cần phân biệt'] },
        { q: 'T6-C9B41-004', c: 'Chiều cao các cột trong biểu đồ cột kép tỉ lệ với yếu tố nào?', a: 'Số liệu thống kê tương ứng', s: 'Cũng giống như biểu đồ cột, chiều cao của mỗi cột tỉ lệ thuận với giá trị số liệu.', d: 'thong_hieu', o: ['Bề rộng của cột', 'Số liệu thống kê tương ứng', 'Tên đối tượng', 'Màu sắc của cột'] },
        { q: 'T6-C9B41-005', c: 'Khi muốn so sánh số học sinh nam và số học sinh nữ của các tổ trong lớp, ta nên dùng loại biểu đồ nào?', a: 'Biểu đồ cột kép', s: 'Biểu đồ cột kép rất thích hợp để so sánh 2 đại lượng (Nam và Nữ) ở các tổ.', d: 'van_dung', o: ['Biểu đồ cột', 'Biểu đồ tranh', 'Biểu đồ cột kép', 'Chỉ dùng bảng thống kê'] }
      ]
    },
    {
      name: 'Bài 42. Kết quả có thể và sự kiện trong trò chơi, thí nghiệm',
      questions: [
        { q: 'T6-C9B42-001', c: 'Khi tung một đồng xu, có những kết quả nào có thể xảy ra?', a: 'Sấp hoặc Ngửa', s: 'Đồng xu có 2 mặt là Sấp (S) và Ngửa (N), nên khi tung chỉ có thể ra 1 trong 2 kết quả này.', d: 'nhan_biet', o: ['Chỉ ra mặt Sấp', 'Chỉ ra mặt Ngửa', 'Sấp hoặc Ngửa', 'Không ra mặt nào'] },
        { q: 'T6-C9B42-002', c: 'Trong hộp có bút xanh và bút đỏ, lấy ngẫu nhiên $1$ chiếc bút. Sự kiện "Lấy được bút màu vàng" là:', a: 'Sự kiện không thể xảy ra', s: 'Vì trong hộp không có bút màu vàng.', d: 'nhan_biet', o: ['Sự kiện chắc chắn xảy ra', 'Sự kiện không thể xảy ra', 'Sự kiện có thể xảy ra', 'Kết quả tất yếu'] },
        { q: 'T6-C9B42-003', c: 'Tung một con xúc xắc $6$ mặt, có bao nhiêu kết quả có thể xảy ra đối với số chấm trên mặt xuất hiện?', a: '$6$ kết quả', s: 'Xúc xắc có 6 mặt đánh số từ 1 đến 6 chấm, nên có 6 kết quả có thể xảy ra.', d: 'thong_hieu', o: ['$1$ kết quả', '$2$ kết quả', '$6$ kết quả', '$12$ kết quả'] },
        { q: 'T6-C9B42-004', c: 'Chọn ngẫu nhiên $1$ số tự nhiên từ $1$ đến $5$. Sự kiện "Chọn được số tự nhiên nhỏ hơn 10" là sự kiện gì?', a: 'Chắc chắn xảy ra', s: 'Tất cả các số 1, 2, 3, 4, 5 đều nhỏ hơn 10, nên sự kiện này chắc chắn xảy ra.', d: 'thong_hieu', o: ['Không thể xảy ra', 'Có thể xảy ra nhưng không chắc chắn', 'Chắc chắn xảy ra', 'Không xác định được'] },
        { q: 'T6-C9B42-005', c: 'Một hộp có $3$ viên bi đỏ và $2$ viên bi xanh. Rút ngẫu nhiên $1$ viên bi. Sự kiện nào sau đây là "Có thể xảy ra nhưng không chắc chắn"?', a: 'Rút được bi đỏ', s: 'Có thể rút được bi đỏ (vì có bi đỏ) nhưng không chắc chắn (vì có thể rút phải bi xanh).', d: 'van_dung', o: ['Rút được bi vàng', 'Rút được bi đỏ', 'Rút được bi (bất kể màu gì)', 'Rút được $2$ viên bi cùng lúc'] }
      ]
    },
    {
      name: 'Bài 43. Xác suất thực nghiệm',
      questions: [
        { q: 'T6-C9B43-001', c: 'Xác suất thực nghiệm của sự kiện A sau n lần thực hiện phép thử là tỉ số giữa:', a: 'Số lần sự kiện A xảy ra và tổng số lần thực hiện phép thử', s: 'Xác suất thực nghiệm = (Số lần sự kiện xảy ra) / (Tổng số lần thực hiện).', d: 'nhan_biet', o: ['Số lần sự kiện A không xảy ra và tổng số lần thực hiện phép thử', 'Số lần sự kiện A xảy ra và tổng số lần thực hiện phép thử', 'Tổng số lần thực hiện phép thử và số lần sự kiện A xảy ra', 'Số lần xảy ra chia cho số lần không xảy ra'] },
        { q: 'T6-C9B43-002', c: 'Xác suất thực nghiệm luôn nhận giá trị trong khoảng nào?', a: 'Từ $0$ đến $1$ (hoặc từ $0\\%$ đến $100\\%$)', s: 'Tỉ số luôn $\\ge 0$ và $\\le 1$.', d: 'nhan_biet', o: ['Từ $0$ đến $1$ (hoặc từ $0\\%$ đến $100\\%$)', 'Từ $-1$ đến $1$', 'Lớn hơn $1$', 'Nhỏ hơn $0$'] },
        { q: 'T6-C9B43-003', c: 'Tung đồng xu $10$ lần, có $4$ lần ra mặt Sấp. Xác suất thực nghiệm ra mặt Ngửa là bao nhiêu?', a: '$\\frac{6}{10}$', s: 'Số lần mặt Ngửa là $10 - 4 = 6$. Xác suất thực nghiệm mặt Ngửa là $\\frac{6}{10}$ (hay $0,6$).', d: 'thong_hieu', o: ['$\\frac{4}{10}$', '$\\frac{6}{10}$', '$\\frac{1}{2}$', '$\\frac{10}{4}$'] },
        { q: 'T6-C9B43-004', c: 'Gieo xúc xắc $20$ lần, có $5$ lần xuất hiện mặt $6$ chấm. Xác suất thực nghiệm xuất hiện mặt $6$ chấm là:', a: '$\\frac{1}{4}$', s: 'Xác suất thực nghiệm = $\\frac{5}{20} = \\frac{1}{4}$.', d: 'thong_hieu', o: ['$\\frac{1}{6}$', '$\\frac{1}{5}$', '$\\frac{1}{4}$', '$\\frac{5}{6}$'] },
        { q: 'T6-C9B43-005', c: 'Bốc ngẫu nhiên một viên bi từ hộp rồi trả lại. Sau $100$ lần bốc, được bi xanh $35$ lần. Xác suất thực nghiệm lấy được bi xanh (dưới dạng phần trăm) là:', a: '$35\\%$', s: 'Xác suất thực nghiệm = $\\frac{35}{100} = 35\\%$.', d: 'van_dung', o: ['$35\\%$', '$65\\%$', '$0,35\\%$', '$100\\%$'] }
      ]
    },
    {
      name: 'Ôn tập chương IX',
      questions: [
        { q: 'T6-C9OT-001', c: 'Mục đích của việc thu thập và phân loại dữ liệu là gì?', a: 'Để có thông tin hữu ích phục vụ cho việc thống kê, phân tích, ra quyết định', s: 'Dữ liệu được thu thập để tính toán, thống kê và hỗ trợ ra quyết định.', d: 'nhan_biet', o: ['Để ghi chép cho đủ sổ sách', 'Để có thông tin hữu ích phục vụ cho việc thống kê, phân tích, ra quyết định', 'Để loại bỏ những số liệu xấu', 'Chỉ dùng để kiểm tra trí nhớ'] },
        { q: 'T6-C9OT-002', c: 'Loại biểu đồ nào thích hợp nhất để so sánh dân số của $2$ thành phố trong $5$ năm liên tiếp?', a: 'Biểu đồ cột kép', s: 'Vì cần so sánh 2 đại lượng (dân số 2 thành phố) qua các năm, biểu đồ cột kép là phù hợp nhất.', d: 'thong_hieu', o: ['Biểu đồ tranh', 'Biểu đồ cột kép', 'Biểu đồ cột', 'Không thể dùng biểu đồ nào'] },
        { q: 'T6-C9OT-003', c: 'Sự kiện "Chắc chắn xảy ra" có xác suất thực nghiệm là bao nhiêu?', a: '$1$ (hoặc $100\\%$)', s: 'Nếu sự kiện luôn xảy ra trong mọi lần thử thì số lần xảy ra bằng tổng số lần thử $\\Rightarrow$ Tỉ số = 1.', d: 'thong_hieu', o: ['$0$', '$\\frac{1}{2}$', '$1$ (hoặc $100\\%$)', 'Không thể xác định'] },
        { q: 'T6-C9OT-004', c: 'Sự kiện "Không thể xảy ra" có xác suất thực nghiệm bằng bao nhiêu?', a: '$0$', s: 'Sự kiện không thể xảy ra thì số lần xuất hiện = 0 $\\Rightarrow$ Xác suất thực nghiệm = 0.', d: 'thong_hieu', o: ['$0$', '$1$', '$\\frac{1}{2}$', '$-1$'] },
        { q: 'T6-C9OT-005', c: 'Có $5$ lá thăm ghi số $1, 2, 3, 4, 5$. Rút ngẫu nhiên $1$ lá thăm. Sự kiện "Rút được lá thăm ghi số chẵn" có bao nhiêu kết quả thuận lợi?', a: '$2$ kết quả', s: 'Các số chẵn trong tập là $2$ và $4$. Vậy có 2 kết quả thuận lợi.', d: 'van_dung', o: ['$1$ kết quả', '$2$ kết quả', '$3$ kết quả', '$5$ kết quả'] }
      ]
    },
    {
      name: 'Bài tập ôn tập cuối năm',
      questions: [
        { q: 'T6-ONTC-001', c: 'Tập hợp các số nguyên $\\mathbb{Z}$ bao gồm:', a: 'Số nguyên âm, số $0$ và số nguyên dương', s: 'Tập số nguyên $\\mathbb{Z} = \\{..., -2, -1, 0, 1, 2, ...\\}$ gồm nguyên âm, số 0 và nguyên dương.', d: 'nhan_biet', o: ['Số nguyên dương và số nguyên âm', 'Số nguyên âm, số $0$ và số nguyên dương', 'Số tự nhiên và số nguyên dương', 'Số tự nhiên và phân số'] },
        { q: 'T6-ONTC-002', c: 'Giá trị tuyệt đối của một số nguyên âm luôn là:', a: 'Một số nguyên dương', s: 'Ví dụ: $|-5| = 5$. Giá trị tuyệt đối của một số nguyên âm luôn là số nguyên dương.', d: 'thong_hieu', o: ['Một số nguyên âm', 'Số $0$', 'Một số nguyên dương', 'Một số hữu tỉ âm'] },
        { q: 'T6-ONTC-003', c: 'Hai phân số $\\frac{a}{b}$ và $\\frac{c}{d}$ bằng nhau khi:', a: '$a \\times d = b \\times c$', s: 'Tính chất hai phân số bằng nhau.', d: 'thong_hieu', o: ['$a \\times c = b \\times d$', '$a \\times d = b \\times c$', '$a + d = b + c$', '$a : b = d : c$'] },
        { q: 'T6-ONTC-004', c: 'Số đo của góc bẹt là:', a: '$180^\\circ$', s: 'Góc bẹt có số đo bằng $180^\\circ$.', d: 'thong_hieu', o: ['$90^\\circ$', '$180^\\circ$', '$360^\\circ$', '$0^\\circ$'] },
        { q: 'T6-ONTC-005', c: 'Một hình chữ nhật có diện tích $24$ m$^2$, chiều dài $6$ m. Chu vi của hình chữ nhật đó là:', a: '$20$ m', s: 'Chiều rộng là $24 : 6 = 4$ (m). Chu vi là $(6 + 4) \\times 2 = 20$ (m).', d: 'van_dung', o: ['$10$ m', '$20$ m', '$24$ m', '$48$ m'] }
      ]
    }
  ];

  for (const topic of topics) {
    const cats = await sql`SELECT id, name FROM public.categories WHERE name ILIKE ${'%' + topic.name + '%'} AND grade = 6 LIMIT 1`;
    if (cats.length === 0) {
      console.log(`Bỏ qua: Không tìm thấy ${topic.name}`);
      continue;
    }
    const catId = cats[0].id;
    console.log(`\nĐang bơm cho ${topic.name}...`);
    
    for (const q of topic.questions) {
      const existing = await sql`SELECT id FROM public.questions WHERE question_code = ${q.q}`;
      if (existing.length === 0) {
        await sql`
          INSERT INTO public.questions (
            category_id, question_code, content, answer, solution, 
            difficulty, question_type, options, correct_answer, status, grade, topic, user_id
          ) VALUES (
            ${catId}, ${q.q}, ${q.c}, ${q.a}, ${q.s},
            ${q.d}, 'trac_nghiem', ${JSON.stringify(q.o)}::jsonb, ${q.a}, 'approved', 6, ${cats[0].name}, ${defaultUserId}
          )
        `;
        console.log(`Đã chèn: ${q.q}`);
      } else {
        console.log(`Bỏ qua: ${q.q}`);
      }
      await new Promise(r => setTimeout(r, 500));
    }
  }
  
  console.log('\n✅ Hoàn thành Batch 4 Lớp 6');
}

insertGrade6Batch4().catch(console.error);
