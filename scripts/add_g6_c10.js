const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const crypto = require('crypto');

async function main() {
  const id39 = 'ddeebaff-2083-4584-b4e4-c6e3b16edc2c'; // Bảng thống kê và biểu đồ tranh
  const id40 = 'cd8d3aa6-af49-40c3-a137-41e435c7ca60'; // Biểu đồ cột
  const id42 = '2db00700-438a-4f62-add0-43a0e5dd4cd8'; // Kết quả có thể và sự kiện
  const id43 = '403d31c7-c02c-4c0a-9e17-d6ee84990d69'; // Xác suất thực nghiệm

  const grade = 6;
  const user_id = '8316c34e-765d-4b8c-9364-b683a17e33f8';
  let allQS = [];

  // Bài 39. Bảng thống kê và biểu đồ tranh
  allQS.push(
    { cat: id39, code: 'T6-TK-NEW1', content: 'Bạn Lan muốn tìm hiểu về môn thể thao yêu thích của $40$ bạn trong lớp. Lan có thể thu thập dữ liệu bằng những phương pháp nào? Dữ liệu thu được thuộc loại nào?', answer: 'Dùng phiếu hỏi, phỏng vấn. Dữ liệu không phải số liệu.', solution: '- Phương pháp thu thập: Lan có thể phát phiếu khảo sát (phiếu hỏi), phỏng vấn trực tiếp hoặc cho các bạn giơ tay biểu quyết.\n- Loại dữ liệu: Môn thể thao (như Bóng đá, Cầu lông, Bơi lội...) là các chữ/tên gọi, nên đây là dữ liệu **không phải là số liệu**.' },
    { cat: id39, code: 'T6-TK-NEW2', content: 'Một cửa hàng bán được $30$ quả táo, $50$ quả cam và $20$ quả lê. Lập bảng thống kê biểu diễn số lượng các loại quả đó.', answer: 'Xem lời giải chi tiết.', solution: 'Bảng thống kê số lượng các loại quả bán được:\n| Loại quả | Số lượng (quả) |\n|---|---|\n| Táo | 30 |\n| Cam | 50 |\n| Lê | 20 |\nTổng số quả bán được là $100$ quả.' },
    { cat: id39, code: 'T6-TK-NEW3', content: 'Trong biểu đồ tranh, mỗi biểu tượng hình "một cuốn sách" tương ứng với $10$ cuốn sách thật. Nếu một lớp quyên góp được $45$ cuốn sách, ta phải dùng bao nhiêu biểu tượng để vẽ lên biểu đồ?', answer: '$4,5$ biểu tượng (4 biểu tượng nguyên và 1 nửa biểu tượng).', solution: 'Số biểu tượng cần dùng là:\n$45 : 10 = 4,5$ (biểu tượng).\n\n**Kết luận:** Ta phải dùng $4$ biểu tượng cuốn sách nguyên vẹn và $1$ nửa biểu tượng cuốn sách.' },
    { cat: id39, code: 'T6-TK-NEW4', content: 'Đọc bảng thống kê điểm kiểm tra Toán của lớp 6A: Điểm $7$ ($5$ bạn), Điểm $8$ ($12$ bạn), Điểm $9$ ($8$ bạn), Điểm $10$ ($5$ bạn). Tính tổng số học sinh của lớp 6A.', answer: '$30$ học sinh.', solution: 'Để tìm tổng số học sinh của lớp 6A, ta cộng số lượng học sinh đạt các điểm lại với nhau:\nTổng số học sinh = $5 + 12 + 8 + 5 = 30$ (học sinh).\n\n**Kết luận:** Lớp 6A có $30$ học sinh.' },
    { cat: id39, code: 'T6-TK-NEW5', content: 'Một biểu đồ tranh thể hiện số cây trồng được của $3$ lớp. Lớp 6A có $4$ biểu tượng cây, Lớp 6B có $3,5$ biểu tượng cây. Biết mỗi biểu tượng ứng với $10$ cây xanh. Hỏi lớp 6B trồng được bao nhiêu cây và ít hơn lớp 6A bao nhiêu cây?', answer: 'Lớp 6B trồng $35$ cây. Ít hơn 6A là $5$ cây.', solution: '- Số cây lớp 6B trồng được: $3,5 \\times 10 = 35$ (cây).\n- Số cây lớp 6A trồng được: $4 \\times 10 = 40$ (cây).\n- Lớp 6B trồng ít hơn lớp 6A số cây là: $40 - 35 = 5$ (cây).\n*(Hoặc tính nhanh chênh lệch: $(4 - 3,5) \\times 10 = 0,5 \\times 10 = 5$ cây).*' }
  );

  // Bài 40. Biểu đồ cột
  allQS.push(
    { cat: id40, code: 'T6-TK-NEW6', content: 'Biểu đồ cột thể hiện điểm thi môn Ngữ Văn của các tổ. Trục ngang biểu diễn gì, trục dọc biểu diễn gì? Nếu cột của Tổ $1$ cao đến vạch $8$, điều đó có ý nghĩa gì?', answer: 'Xem lời giải.', solution: '- Trục ngang biểu diễn các đối tượng thống kê (ở đây là các Tổ: Tổ 1, Tổ 2...).\n- Trục dọc biểu diễn tiêu chí thống kê (ở đây là Điểm thi trung bình môn Ngữ Văn).\n- Cột của Tổ $1$ cao đến vạch $8$ có nghĩa là: Điểm thi của Tổ $1$ đạt $8$ điểm.' },
    { cat: id40, code: 'T6-TK-NEW7', content: 'Cho bảng số liệu về số học sinh nam và nữ của $3$ lớp 6A, 6B, 6C. Để so sánh số học sinh nam và nữ của từng lớp một cách trực quan nhất, ta nên dùng loại biểu đồ nào? Giải thích.', answer: 'Biểu đồ cột kép.', solution: 'Ta nên dùng **Biểu đồ cột kép**.\n**Giải thích:** Vì mỗi đối tượng (một lớp) có hai tiêu chí dữ liệu đi kèm (số học sinh nam và số học sinh nữ). Việc vẽ cột nam và cột nữ đứng cạnh nhau của từng lớp sẽ giúp ta so sánh trực quan và dễ dàng nhất.' },
    { cat: id40, code: 'T6-TK-NEW8', content: 'Từ biểu đồ cột thể hiện số lượng huy chương của $4$ đội thể thao, làm thế nào để biết đội nào giành nhiều huy chương nhất và đội nào giành ít huy chương nhất?', answer: 'Quan sát chiều cao của các cột.', solution: 'Trong biểu đồ cột, chiều cao của cột tỉ lệ thuận với số liệu thống kê.\n- Đội giành **nhiều** huy chương nhất tương ứng với cột **cao nhất** trên biểu đồ.\n- Đội giành **ít** huy chương nhất tương ứng với cột **thấp nhất** trên biểu đồ.' },
    { cat: id40, code: 'T6-TK-NEW9', content: 'Một biểu đồ cột kép thể hiện lượng mưa trung bình tháng $7$ và tháng $8$. Tại một thành phố, cột màu xanh (tháng $7$) cao $120$ mm, cột màu đỏ (tháng $8$) cao $150$ mm. Lượng mưa đã tăng hay giảm và chênh lệch bao nhiêu?', answer: 'Tăng $30$ mm.', solution: 'Cột tháng $8$ cao hơn cột tháng $7$ ($150 > 120$) nên lượng mưa đã **tăng**.\nMức độ chênh lệch lượng mưa giữa hai tháng là:\n$150 - 120 = 30$ (mm).\n\n**Kết luận:** Lượng mưa tháng $8$ đã tăng $30$ mm so với tháng $7$.' },
    { cat: id40, code: 'T6-TK-NEW10', content: 'Một biểu đồ cột bị thiếu một cột của quý $4$. Biết tổng doanh thu $4$ quý là $500$ triệu. Doanh thu quý $1, 2, 3$ lần lượt là $120, 150, 100$ triệu. Hãy tìm chiều cao của cột quý $4$.', answer: '$130$ triệu.', solution: 'Tổng doanh thu của ba quý đầu là:\n$120 + 150 + 100 = 370$ (triệu).\nDoanh thu của quý $4$ là:\n$500 - 370 = 130$ (triệu).\n\n**Kết luận:** Chiều cao của cột quý $4$ tương ứng với vạch chỉ $130$ triệu.' }
  );

  // Bài 42. Kết quả có thể và sự kiện
  allQS.push(
    { cat: id42, code: 'T6-TK-NEW11', content: 'Gieo một con xúc xắc $6$ mặt. Liệt kê tập hợp các kết quả có thể xảy ra đối với số chấm xuất hiện ở mặt trên.', answer: '$\\{1, 2, 3, 4, 5, 6\\}$.', solution: 'Con xúc xắc có $6$ mặt được đánh số chấm từ $1$ đến $6$.\nKhi gieo xúc xắc, mặt trên có thể xuất hiện bất kỳ số chấm nào trong số này.\nTập hợp các kết quả có thể xảy ra là: $\\{1; 2; 3; 4; 5; 6\\}$.' },
    { cat: id42, code: 'T6-TK-NEW12', content: 'Trong một hộp kín có $3$ quả bóng màu đỏ, $2$ quả bóng màu xanh. Không nhìn vào hộp, lấy ngẫu nhiên $1$ quả bóng. Liệt kê các kết quả có thể xảy ra về màu sắc của quả bóng được lấy ra.', answer: 'Bóng màu đỏ hoặc bóng màu xanh.', solution: 'Vì trong hộp chỉ chứa hai loại màu sắc bóng là đỏ và xanh.\nNên khi lấy ngẫu nhiên $1$ quả, các kết quả có thể xảy ra về màu sắc là:\n- Lấy được bóng màu Đỏ.\n- Lấy được bóng màu Xanh.' },
    { cat: id42, code: 'T6-TK-NEW13', content: 'Gieo một đồng xu $1$ lần. Có hai sự kiện: A = "Đồng xu xuất hiện mặt sấp" và B = "Đồng xu xuất hiện mặt ngửa". Các kết quả có thể xảy ra là gì?', answer: 'Xuất hiện mặt sấp (S) hoặc mặt ngửa (N).', solution: 'Đồng xu có $2$ mặt: mặt Sấp (S) và mặt Ngửa (N).\nKhi gieo đồng xu $1$ lần, kết quả có thể xảy ra là xuất hiện mặt Sấp (sự kiện A xảy ra) hoặc xuất hiện mặt Ngửa (sự kiện B xảy ra).\nTập hợp kết quả: $\\{S, N\\}$.' },
    { cat: id42, code: 'T6-TK-NEW14', content: 'Gieo một con xúc xắc $6$ mặt. Sự kiện "Gieo được mặt có số chấm lớn hơn $6$" có thể xảy ra không? Đây là sự kiện gì?', answer: 'Không thể xảy ra. Là sự kiện không thể.', solution: 'Con xúc xắc tiêu chuẩn chỉ có tối đa là $6$ chấm.\nDo đó, việc gieo được mặt có số chấm lớn hơn $6$ là điều **không bao giờ xảy ra**.\nNgười ta gọi đây là **Sự kiện không thể**.' },
    { cat: id42, code: 'T6-TK-NEW15', content: 'Rút một lá bài từ bộ bài tây $52$ lá. Sự kiện "Rút được một lá bài màu đỏ" có phải là một sự kiện chắc chắn xảy ra không? Vì sao?', answer: 'Không phải. Vì bộ bài có cả lá màu đen.', solution: 'Sự kiện "Rút được lá bài màu đỏ" **không phải** là sự kiện chắc chắn.\n**Lý do:** Bộ bài tây $52$ lá bao gồm $26$ lá màu đỏ (Cơ, Rô) và $26$ lá màu đen (Chuồn, Bích). Ta hoàn toàn có thể rút trúng một lá màu đen. Vậy sự kiện rút được lá màu đỏ chỉ là sự kiện **có thể xảy ra**.' }
  );

  // Bài 43. Xác suất thực nghiệm
  allQS.push(
    { cat: id43, code: 'T6-TK-NEW16', content: 'Bạn Minh gieo một đồng xu $20$ lần và thấy có $12$ lần xuất hiện mặt ngửa. Tính xác suất thực nghiệm của sự kiện "Gieo được mặt ngửa".', answer: '$\\dfrac{3}{5}$ (hoặc 60%).', solution: 'Xác suất thực nghiệm = Số lần sự kiện xảy ra / Tổng số lần thực hiện.\n- Tổng số lần gieo: $n = 20$.\n- Số lần mặt ngửa xuất hiện: $k = 12$.\nXác suất thực nghiệm là: $\\dfrac{12}{20} = \\dfrac{3}{5}$.\n*(Nếu đổi ra phần trăm: $60\\%$).*' },
    { cat: id43, code: 'T6-TK-NEW17', content: 'Một cầu thủ thực hiện ném phạt $10$ quả, có $7$ quả trúng rổ. Tính xác suất thực nghiệm của sự kiện "Cầu thủ đó ném trúng rổ".', answer: '$\\dfrac{7}{10}$ (hoặc 70%).', solution: '- Tổng số lần ném: $10$ lần.\n- Số lần ném trúng rổ: $7$ lần.\nXác suất thực nghiệm của sự kiện cầu thủ ném trúng rổ là: $\\dfrac{7}{10}$ (tương đương $70\\%$).' },
    { cat: id43, code: 'T6-TK-NEW18', content: 'Lấy ngẫu nhiên $1$ viên bi từ hộp $50$ lần (mỗi lần lấy xong trả lại), có $15$ lần lấy được bi xanh. Tính xác suất thực nghiệm lấy được bi xanh. Nếu lấy thêm $50$ lần nữa, xác suất này có thay đổi không?', answer: '$\\dfrac{3}{10}$. Có thể thay đổi.', solution: '**Bước 1: Tính xác suất thực nghiệm**\nXác suất = $15 : 50 = \\dfrac{15}{50} = \\dfrac{3}{10}$ (hay $30\\%$).\n\n**Bước 2: Giải thích**\nNếu lấy thêm $50$ lần nữa, số lần lấy được bi xanh có thể sẽ khác $15$ lần (do mang tính ngẫu nhiên).\nVì vậy, xác suất thực nghiệm ở lần thử nghiệm sau **có thể thay đổi**.' },
    { cat: id43, code: 'T6-TK-NEW19', content: 'Quay một vòng quay may mắn $40$ lần, kim chỉ vào ô "Phần thưởng A" $8$ lần. Xác suất thực nghiệm của việc trúng "Phần thưởng A" là bao nhiêu (viết dưới dạng phần trăm)?', answer: '$20\\%$.', solution: 'Xác suất thực nghiệm của việc trúng "Phần thưởng A" là tỉ số giữa số lần trúng thưởng và tổng số lần quay:\n$P = \\dfrac{8}{40} = \\dfrac{1}{5}$.\nĐổi ra phần trăm: $\\dfrac{1}{5} \\times 100\\% = 20\\%$.\n\n**Kết luận:** Xác suất thực nghiệm trúng thưởng là $20\\%$.' },
    { cat: id43, code: 'T6-TK-NEW20', content: 'Tung một con xúc xắc $30$ lần, mặt $6$ chấm xuất hiện $5$ lần. Hãy tính xác suất thực nghiệm của sự kiện "Mặt $6$ chấm xuất hiện". Rút gọn phân số.', answer: '$\\dfrac{1}{6}$.', solution: '- Tổng số lần tung: $30$ lần.\n- Số lần xuất hiện mặt 6 chấm: $5$ lần.\nXác suất thực nghiệm là tỉ số: $\\dfrac{5}{30}$.\nRút gọn phân số (chia cả tử và mẫu cho $5$):\n$\\dfrac{5}{30} = \\dfrac{1}{6}$.' }
  );

  console.log(`Inserting ${allQS.length} new questions for Grade 6 (Thong ke & Xac suat)...`);

  for (const q of allQS) {
    const qid = crypto.randomUUID();
    await sql`
      INSERT INTO public.questions (id, category_id, question_code, content, answer, solution, difficulty, grade, topic, question_type, user_id, status, is_public)
      VALUES (${qid}, ${q.cat}, ${q.code}, ${q.content}, ${q.answer}, ${q.solution}, 'van_dung', ${grade}, 'dai_so', 'tu_luan', ${user_id}, 'approved', true)
    `;
    console.log(`Inserted ${q.code}`);
  }

  console.log('Done!');
}

main().catch(console.error);
