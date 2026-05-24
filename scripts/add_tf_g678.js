const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const crypto = require('crypto');

async function main() {
  const cats = await sql`SELECT id, name, grade FROM public.categories`;
  
  const getCatId = (grade, keyword) => {
    const matched = cats.filter(c => c.grade === grade && c.name.toLowerCase().includes(keyword.toLowerCase()));
    if (matched.length > 0) return matched[0].id;
    const fallback = cats.find(c => c.grade === grade && c.parent_id !== null);
    return fallback ? fallback.id : cats.find(c => c.grade === grade).id;
  };

  const user_id = '8316c34e-765d-4b8c-9364-b683a17e33f8';
  let allQS = [];

  const addTF = (grade, topic_kw, content, isTrue, solution, topic) => {
    allQS.push({
      cat: getCatId(grade, topic_kw),
      code: `G${grade}-TF-${crypto.randomBytes(2).toString('hex').toUpperCase()}`,
      grade, topic,
      content,
      options: JSON.stringify([
        { key: 'Đúng', value: 'Khẳng định trên là Đúng.' },
        { key: 'Sai', value: 'Khẳng định trên là Sai.' }
      ]),
      correct_answer: isTrue ? 'Đúng' : 'Sai',
      solution
    });
  };

  // ================= LỚP 8 (10 câu) =================
  addTF(8, 'hằng đẳng', 'Biểu thức $x^2 - 4x + 4$ có thể viết dưới dạng bình phương của một hiệu là $(x - 2)^2$.', true, 'Đúng. Ta có $x^2 - 4x + 4 = x^2 - 2\\cdot x\\cdot 2 + 2^2 = (x - 2)^2$.', 'bieu_thuc');
  addTF(8, 'hằng đẳng', 'Khai triển của $(x + 3)^3$ là $x^3 + 9x^2 + 27x + 27$.', true, 'Đúng. Áp dụng $(A+B)^3 = A^3 + 3A^2B + 3AB^2 + B^3$, thay $A=x, B=3$ ta được kết quả chính xác.', 'bieu_thuc');
  addTF(8, 'phân thức', 'Hai phân thức $\\dfrac{A}{B}$ và $\\dfrac{C}{D}$ bằng nhau nếu $A\\cdot C = B\\cdot D$.', false, 'Sai. Định nghĩa hai phân thức bằng nhau là: $\\dfrac{A}{B} = \\dfrac{C}{D}$ nếu $A\\cdot D = B\\cdot C$.', 'bieu_thuc');
  addTF(8, 'tam giác đồng dạng', 'Hai tam giác đều bất kỳ thì luôn đồng dạng với nhau.', true, 'Đúng. Tam giác đều có 3 góc bằng nhau và bằng $60^\\circ$. Theo trường hợp Góc-Góc, hai tam giác đều luôn đồng dạng.', 'hinh_hoc');
  addTF(8, 'diện tích', 'Tỉ số diện tích của hai tam giác đồng dạng bằng tỉ số đồng dạng.', false, 'Sai. Tỉ số diện tích của hai tam giác đồng dạng bằng BÌNH PHƯƠNG tỉ số đồng dạng ($k^2$).', 'hinh_hoc');
  addTF(8, 'hàm số', 'Hàm số $y = 3x - 5$ là hàm số bậc nhất đồng biến trên $\\mathbb{R}$.', true, 'Đúng. Hàm số bậc nhất $y = ax + b$ có $a = 3 > 0$ nên đồng biến.', 'ham_so');
  addTF(8, 'phương trình', 'Phương trình bậc nhất một ẩn luôn có duy nhất một nghiệm.', true, 'Đúng. Phương trình có dạng $ax + b = 0$ ($a \\neq 0$) luôn có nghiệm duy nhất $x = -\\dfrac{b}{a}$.', 'phuong_trinh');
  addTF(8, 'đa giác', 'Hình bát giác đều có tất cả các đường chéo bằng nhau.', false, 'Sai. Khác với ngũ giác đều, đa giác đều từ 6 cạnh trở lên sẽ có các đường chéo với độ dài khác nhau (đường chéo đi qua tâm và đường chéo không qua tâm).', 'hinh_hoc');
  addTF(8, 'xác suất', 'Biến cố chắc chắn có xác suất bằng 1.', true, 'Đúng. Xác suất của biến cố chắc chắn luôn bằng 1.', 'xac_suat');
  addTF(8, 'thống kê', 'Biểu đồ hình quạt tròn dùng để so sánh số liệu tuyệt đối của các đối tượng.', false, 'Sai. Biểu đồ hình quạt tròn thường dùng để biểu diễn tỉ lệ phần trăm (số liệu tương đối) của các phần so với tổng thể.', 'thong_ke');

  // ================= LỚP 7 (10 câu) =================
  addTF(7, 'tỉ lệ thức', 'Nếu $\\dfrac{a}{b} = \\dfrac{c}{d}$ thì $\\dfrac{a+c}{b+d} = \\dfrac{a-c}{b-d}$.', true, 'Đúng. Đây là tính chất mở rộng của dãy tỉ số bằng nhau (với điều kiện mẫu số khác 0).', 'dai_so');
  addTF(7, 'tỉ lệ nghịch', 'Diện tích hình chữ nhật cố định, chiều dài và chiều rộng là hai đại lượng tỉ lệ nghịch.', true, 'Đúng. Ta có $a \\times b = S$ (hằng số), nên $a$ và $b$ là hai đại lượng tỉ lệ nghịch.', 'dai_so');
  addTF(7, 'số vô tỉ', 'Căn bậc hai của 2 ($\\sqrt{2}$) là một số hữu tỉ.', false, 'Sai. $\\sqrt{2}$ là số thập phân vô hạn không tuần hoàn, nên nó là số vô tỉ.', 'so_hoc');
  addTF(7, 'trị tuyệt đối', 'Giá trị tuyệt đối của một số thực luôn là một số dương.', false, 'Sai. Giá trị tuyệt đối của số 0 là 0. Số 0 không phải là số dương cũng không phải số âm. Khẳng định đúng phải là "luôn không âm".', 'so_hoc');
  addTF(7, 'tam giác', 'Tổng độ dài hai cạnh bất kỳ của một tam giác luôn lớn hơn độ dài cạnh còn lại.', true, 'Đúng. Đây là bất đẳng thức tam giác.', 'tam_giac');
  addTF(7, 'tam giác', 'Tam giác cân có một góc bằng $60^\\circ$ thì nó là tam giác đều.', true, 'Đúng. Nếu góc ở đỉnh là $60^\\circ$ thì 2 góc ở đáy là $(180-60)/2=60^\\circ$. Nếu góc ở đáy là $60^\\circ$ thì góc ở đỉnh là $180-2\\times 60=60^\\circ$.', 'tam_giac');
  addTF(7, 'đường trung trực', 'Điểm nằm trên đường trung trực của một đoạn thẳng thì cách đều hai đầu mút của đoạn thẳng đó.', true, 'Đúng. Đây là tính chất cơ bản của đường trung trực.', 'hinh_hoc');
  addTF(7, 'đa thức', 'Đa thức $P(x) = x^2 + 1$ không có nghiệm thực.', true, 'Đúng. Vì $x^2 \\ge 0 \\Rightarrow x^2 + 1 \\ge 1 > 0$ với mọi $x$. Đa thức không bao giờ bằng 0.', 'da_thuc');
  addTF(7, 'xác suất', 'Tung một đồng xu cân đối, xác suất xuất hiện mặt ngửa là 0,5.', true, 'Đúng. Có 2 mặt sấp và ngửa có khả năng xuất hiện như nhau nên xác suất là $1/2 = 0,5$.', 'xac_suat');
  addTF(7, 'hình lăng trụ', 'Hình hộp chữ nhật có 6 mặt đều là hình vuông.', false, 'Sai. Hình có 6 mặt đều là hình vuông gọi là hình lập phương. Hình hộp chữ nhật chỉ có các mặt là hình chữ nhật.', 'hinh_khong_gian');

  // ================= LỚP 6 (10 câu) =================
  addTF(6, 'chia hết', 'Mọi số có chữ số tận cùng là 3 đều chia hết cho 3.', false, 'Sai. Dấu hiệu chia hết cho 3 là "Tổng các chữ số chia hết cho 3", không phụ thuộc vào chữ số tận cùng. Ví dụ 13 không chia hết cho 3.', 'so_hoc');
  addTF(6, 'số nguyên tố', 'Số 2 là số nguyên tố chẵn duy nhất.', true, 'Đúng. Tất cả các số nguyên tố khác 2 đều là số lẻ vì nếu chẵn sẽ chia hết cho 2.', 'so_hoc');
  addTF(6, 'ước chung', 'Hai số nguyên tố cùng nhau là hai số có ƯCLN bằng 1.', true, 'Đúng. Theo định nghĩa, hai số nguyên tố cùng nhau có ước chung lớn nhất là 1.', 'so_hoc');
  addTF(6, 'số nguyên', 'Tổng của hai số nguyên âm luôn nhỏ hơn mỗi số hạng của tổng.', true, 'Đúng. Khi cộng hai số âm, giá trị của tổng sẽ càng âm (càng nhỏ hơn trên trục số). Ví dụ $(-2) + (-3) = -5$, $-5 < -2$ và $-5 < -3$.', 'so_hoc');
  addTF(6, 'phân số', 'Nhân cả tử và mẫu của một phân số với cùng một số nguyên bất kỳ ta luôn được một phân số mới bằng phân số đã cho.', false, 'Sai. Số nguyên đó phải KHÁC 0. Nếu nhân với 0 mẫu số sẽ bằng 0 (vô nghĩa).', 'phan_so');
  addTF(6, 'hình thang', 'Hình bình hành là một trường hợp đặc biệt của hình thang.', true, 'Đúng. Hình thang có hai cạnh đáy song song. Hình bình hành có hai cặp cạnh đối song song, thoả mãn điều kiện của hình thang.', 'hinh_hoc');
  addTF(6, 'trục đối xứng', 'Hình thoi có 2 trục đối xứng.', true, 'Đúng. Hai trục đối xứng của hình thoi chính là hai đường chéo của nó.', 'hinh_hoc');
  addTF(6, 'tâm đối xứng', 'Tam giác đều có tâm đối xứng.', false, 'Sai. Tam giác đều chỉ có 3 trục đối xứng chứ không có tâm đối xứng. Quay $180^\\circ$ quanh tâm, hình tam giác đều sẽ bị úp ngược, không trùng với ban đầu.', 'hinh_hoc');
  addTF(6, 'xác suất', 'Khi gieo một con xúc xắc 6 mặt, biến cố "Gieo được mặt 7 chấm" là biến cố không thể.', true, 'Đúng. Xúc xắc chỉ có các mặt từ 1 đến 6 chấm nên biến cố này có xác suất bằng 0.', 'xac_suat');
  addTF(6, 'số thập phân', 'Số $0,25$ viết dưới dạng phân số tối giản là $\\dfrac{1}{4}$.', true, 'Đúng. $0,25 = \\dfrac{25}{100} = \\dfrac{1}{4}$.', 'so_thap_phan');

  console.log(`Bắt đầu nạp ${allQS.length} câu hỏi Đúng/Sai cho Lớp 6, 7, 8...`);

  for (const q of allQS) {
    const qid = crypto.randomUUID();
    await sql`
      INSERT INTO public.questions (id, category_id, question_code, content, options, correct_answer, solution, difficulty, grade, topic, question_type, user_id, status, is_public)
      VALUES (${qid}, ${q.cat}, ${q.code}, ${q.content}, ${q.options}::jsonb, ${q.correct_answer}, ${q.solution}, 'thong_hieu', ${q.grade}, ${q.topic}, 'dung_sai', ${user_id}, 'approved', true)
    `;
  }

  console.log('Thành công! Đã nạp phủ kín định dạng Đúng/Sai cho tất cả các khối THCS.');
}

main().catch(console.error);
