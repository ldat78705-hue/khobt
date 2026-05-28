import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);

async function insertGrade4Batch4() {
  console.log('Khởi tạo kết nối CSDL...');
  
  const users = await sql`SELECT user_id FROM public.questions WHERE user_id IS NOT NULL LIMIT 1`;
  const defaultUserId = users.length > 0 ? users[0].user_id : '00000000-0000-0000-0000-000000000000';

  const topics = [
    {
      name: 'Bài 53. Khái niệm phân số',
      questions: [
        { q: 'T4-B53-001', c: 'Mỗi phân số gồm có hai phần là gì?', a: 'Tử số và mẫu số', s: 'Cấu tạo của phân số.', d: 'nhan_biet', o: ['Tử số và phân số', 'Tử số và mẫu số', 'Mẫu số và số dư', 'Phần nguyên và phần thập phân'] },
        { q: 'T4-B53-002', c: 'Tử số của một phân số được viết ở vị trí nào?', a: 'Trên gạch ngang', s: 'Tử số viết trên, mẫu số viết dưới.', d: 'nhan_biet', o: ['Trên gạch ngang', 'Dưới gạch ngang', 'Bên trái gạch ngang', 'Bên phải gạch ngang'] },
        { q: 'T4-B53-003', c: 'Phân số chỉ "ba phần tư" được viết là gì?', a: '$\\frac{3}{4}$', s: 'Ba phần tư viết là $\\frac{3}{4}$.', d: 'thong_hieu', o: ['$\\frac{4}{3}$', '$\\frac{3}{4}$', '$3.4$', '$4.3$'] },
        { q: 'T4-B53-004', c: 'Mẫu số của một phân số phải thỏa mãn điều kiện gì?', a: 'Khác $0$', s: 'Không thể chia cho $0$ nên mẫu khác $0$.', d: 'thong_hieu', o: ['Lớn hơn $0$', 'Lớn hơn hoặc bằng $0$', 'Khác $0$', 'Là số chẵn'] },
        { q: 'T4-B53-005', c: 'Một hình tròn được chia làm $5$ phần bằng nhau, đã tô màu $2$ phần. Phân số chỉ số phần đã tô màu là:', a: '$\\frac{2}{5}$', s: 'Tô $2$ phần trên tổng $5$ phần.', d: 'van_dung', o: ['$\\frac{2}{5}$', '$\\frac{5}{2}$', '$\\frac{3}{5}$', '$\\frac{2}{3}$'] }
      ]
    },
    {
      name: 'Bài 54. Phân số và phép chia số tự nhiên',
      questions: [
        { q: 'T4-B54-001', c: 'Mọi phép chia số tự nhiên cho số tự nhiên (khác $0$) đều có thể viết dưới dạng nào?', a: 'Phân số', s: 'Mối quan hệ giữa phép chia và phân số.', d: 'nhan_biet', o: ['Số tự nhiên', 'Phân số', 'Số la mã', 'Số đo độ dài'] },
        { q: 'T4-B54-002', c: 'Phép chia $3 : 4$ được viết dưới dạng phân số là gì?', a: '$\\frac{3}{4}$', s: 'Số bị chia là tử số, số chia là mẫu số.', d: 'nhan_biet', o: ['$\\frac{4}{3}$', '$\\frac{3}{4}$', '$\\frac{1}{4}$', '$\\frac{3}{7}$'] },
        { q: 'T4-B54-003', c: 'Phân số $\\frac{7}{5}$ tương ứng với phép chia nào sau đây?', a: '$7 : 5$', s: 'Tử chia mẫu.', d: 'thong_hieu', o: ['$5 : 7$', '$7 : 5$', '$7 \\times 5$', '$7 - 5$'] },
        { q: 'T4-B54-004', c: 'Mọi số tự nhiên đều có thể viết thành phân số có mẫu số bằng mấy?', a: '$1$', s: 'Ví dụ $5 = \\frac{5}{1}$.', d: 'thong_hieu', o: ['$0$', '$1$', '$10$', '$100$'] },
        { q: 'T4-B54-005', c: 'Số $5$ viết dưới dạng phân số có mẫu số là $2$ là phân số nào?', a: '$\\frac{10}{2}$', s: '$5 = 10 : 2 = \\frac{10}{2}$.', d: 'van_dung', o: ['$\\frac{5}{2}$', '$\\frac{10}{2}$', '$\\frac{2}{5}$', '$\\frac{20}{2}$'] }
      ]
    },
    {
      name: 'Bài 55. Tính chất cơ bản của phân số',
      questions: [
        { q: 'T4-B55-001', c: 'Nếu nhân cả tử số và mẫu số của một phân số với cùng một số tự nhiên khác $0$ thì ta được một phân số như thế nào?', a: 'Bằng phân số đã cho', s: 'Tính chất cơ bản của phân số.', d: 'nhan_biet', o: ['Lớn hơn phân số đã cho', 'Bé hơn phân số đã cho', 'Bằng phân số đã cho', 'Bằng $1$'] },
        { q: 'T4-B55-002', c: 'Nếu chia cả tử số và mẫu số của một phân số cho cùng một số tự nhiên lớn hơn $1$ mà chúng cùng chia hết thì ta được phân số mới như thế nào?', a: 'Bằng phân số đã cho', s: 'Tính chất cơ bản của phân số (rút gọn).', d: 'nhan_biet', o: ['Bằng phân số đã cho', 'Bé hơn phân số đã cho', 'Lớn hơn phân số đã cho', 'Bằng $0$'] },
        { q: 'T4-B55-003', c: 'Phân số $\\frac{1}{2}$ bằng phân số nào sau đây?', a: '$\\frac{2}{4}$', s: 'Nhân cả tử và mẫu với 2.', d: 'thong_hieu', o: ['$\\frac{1}{4}$', '$\\frac{2}{4}$', '$\\frac{3}{5}$', '$\\frac{2}{3}$'] },
        { q: 'T4-B55-004', c: 'Phân số $\\frac{2}{5}$ bằng phân số nào có mẫu số là $15$?', a: '$\\frac{6}{15}$', s: 'Nhân cả tử và mẫu với 3.', d: 'thong_hieu', o: ['$\\frac{2}{15}$', '$\\frac{5}{15}$', '$\\frac{6}{15}$', '$\\frac{10}{15}$'] },
        { q: 'T4-B55-005', c: 'Tìm số $x$ biết $\\frac{3}{4} = \\frac{x}{12}$:', a: '$9$', s: '$12 = 4 \\times 3$, nên tử $= 3 \\times 3 = 9$.', d: 'van_dung', o: ['$6$', '$9$', '$10$', '$8$'] }
      ]
    },
    {
      name: 'Bài 56. Rút gọn phân số',
      questions: [
        { q: 'T4-B56-001', c: 'Rút gọn phân số là làm cho phân số như thế nào nhưng vẫn bằng phân số ban đầu?', a: 'Có tử số và mẫu số bé đi', s: 'Định nghĩa rút gọn phân số.', d: 'nhan_biet', o: ['Có tử số và mẫu số lớn lên', 'Có tử số và mẫu số bé đi', 'Chỉ mẫu số bé đi', 'Chỉ tử số bé đi'] },
        { q: 'T4-B56-002', c: 'Phân số không thể rút gọn được nữa gọi là gì?', a: 'Phân số tối giản', s: 'Định nghĩa phân số tối giản.', d: 'nhan_biet', o: ['Phân số lớn nhất', 'Phân số tối giản', 'Phân số thập phân', 'Phân số cơ bản'] },
        { q: 'T4-B56-003', c: 'Phân số nào sau đây là phân số tối giản?', a: '$\\frac{3}{5}$', s: 'Tử và mẫu không cùng chia hết cho số nào ngoài 1.', d: 'thong_hieu', o: ['$\\frac{2}{4}$', '$\\frac{3}{6}$', '$\\frac{3}{5}$', '$\\frac{4}{8}$'] },
        { q: 'T4-B56-004', c: 'Rút gọn phân số $\\frac{6}{8}$ ta được phân số nào?', a: '$\\frac{3}{4}$', s: 'Chia cả tử và mẫu cho $2$.', d: 'thong_hieu', o: ['$\\frac{2}{4}$', '$\\frac{3}{4}$', '$\\frac{1}{2}$', '$\\frac{3}{5}$'] },
        { q: 'T4-B56-005', c: 'Rút gọn phân số $\\frac{15}{25}$ đến tối giản ta được phân số nào?', a: '$\\frac{3}{5}$', s: 'Chia cả tử và mẫu cho $5$.', d: 'van_dung', o: ['$\\frac{3}{5}$', '$\\frac{5}{10}$', '$\\frac{1}{5}$', '$\\frac{5}{3}$'] }
      ]
    },
    {
      name: 'Bài 57. Quy đồng mẫu số các phân số',
      questions: [
        { q: 'T4-B57-001', c: 'Quy đồng mẫu số các phân số là làm cho các phân số đó có chung đại lượng nào?', a: 'Mẫu số', s: 'Quy đồng mẫu số là làm cho mẫu số giống nhau.', d: 'nhan_biet', o: ['Tử số', 'Mẫu số', 'Thương', 'Số dư'] },
        { q: 'T4-B57-002', c: 'Mẫu số chung của hai phân số thường được chọn như thế nào so với các mẫu số ban đầu?', a: 'Cùng chia hết cho các mẫu số ban đầu', s: 'Nguyên tắc chọn mẫu số chung.', d: 'nhan_biet', o: ['Lớn hơn tử số', 'Cùng chia hết cho các mẫu số ban đầu', 'Nhỏ hơn các mẫu số ban đầu', 'Chỉ chia hết cho một mẫu số'] },
        { q: 'T4-B57-003', c: 'Quy đồng mẫu số hai phân số $\\frac{1}{2}$ và $\\frac{1}{3}$, mẫu số chung nhỏ nhất nên chọn là bao nhiêu?', a: '$6$', s: '6 chia hết cho 2 và 3.', d: 'thong_hieu', o: ['$5$', '$6$', '$12$', '$24$'] },
        { q: 'T4-B57-004', c: 'Quy đồng mẫu số $\\frac{2}{3}$ và $\\frac{3}{4}$ (chọn mẫu chung là $12$), ta được hai phân số nào?', a: '$\\frac{8}{12}$ và $\\frac{9}{12}$', s: 'Nhân cả tử mẫu PS1 với 4, PS2 với 3.', d: 'thong_hieu', o: ['$\\frac{8}{12}$ và $\\frac{6}{12}$', '$\\frac{8}{12}$ và $\\frac{9}{12}$', '$\\frac{6}{12}$ và $\\frac{9}{12}$', '$\\frac{9}{12}$ và $\\frac{8}{12}$'] },
        { q: 'T4-B57-005', c: 'Khi quy đồng mẫu số ba phân số $\\frac{1}{2}, \\frac{1}{3}, \\frac{1}{4}$, mẫu số chung nhỏ nhất nên chọn là bao nhiêu?', a: '$12$', s: '12 chia hết cho 2, 3 và 4.', d: 'van_dung', o: ['$6$', '$8$', '$12$', '$24$'] }
      ]
    },
    {
      name: 'Bài 58. So sánh phân số',
      questions: [
        { q: 'T4-B58-001', c: 'Trong hai phân số có cùng mẫu số, phân số nào có tử số bé hơn thì phân số đó như thế nào?', a: 'Bé hơn', s: 'Quy tắc so sánh phân số cùng mẫu.', d: 'nhan_biet', o: ['Lớn hơn', 'Bé hơn', 'Bằng nhau', 'Không so sánh được'] },
        { q: 'T4-B58-002', c: 'Phân số có tử số lớn hơn mẫu số thì phân số đó như thế nào so với $1$?', a: 'Lớn hơn $1$', s: 'Đặc điểm phân số so với 1.', d: 'nhan_biet', o: ['Bé hơn $1$', 'Lớn hơn $1$', 'Bằng $1$', 'Bằng $0$'] },
        { q: 'T4-B58-003', c: 'So sánh $\\frac{3}{5}$ và $\\frac{4}{5}$, dấu thích hợp điền vào chỗ chấm là:', a: '$<$', s: 'Cùng mẫu $5$, $3 < 4$ nên $\\frac{3}{5} < \\frac{4}{5}$.', d: 'thong_hieu', o: ['$<$', '$>$', '$=$', '$\\ge$'] },
        { q: 'T4-B58-004', c: 'So sánh hai phân số $\\frac{3}{4}$ và $\\frac{2}{3}$, ta có:', a: '$\\frac{3}{4} > \\frac{2}{3}$', s: 'Quy đồng: $9/12 > 8/12$.', d: 'thong_hieu', o: ['$\\frac{3}{4} < \\frac{2}{3}$', '$\\frac{3}{4} > \\frac{2}{3}$', '$\\frac{3}{4} = \\frac{2}{3}$', 'Không so sánh được'] },
        { q: 'T4-B58-005', c: 'Phân số nào bé nhất trong các phân số $\\frac{1}{2}, \\frac{1}{3}, \\frac{1}{4}$?', a: '$\\frac{1}{4}$', s: 'Cùng tử số, mẫu lớn hơn thì phân số bé hơn.', d: 'van_dung', o: ['$\\frac{1}{2}$', '$\\frac{1}{3}$', '$\\frac{1}{4}$', 'Cả ba phân số bằng nhau'] }
      ]
    },
    {
      name: 'Bài 60. Phép cộng phân số',
      questions: [
        { q: 'T4-B60-001', c: 'Muốn cộng hai phân số cùng mẫu số, ta cộng hai tử số với nhau và làm gì với mẫu số?', a: 'Giữ nguyên mẫu số', s: 'Quy tắc cộng phân số cùng mẫu.', d: 'nhan_biet', o: ['Cộng hai mẫu số', 'Giữ nguyên mẫu số', 'Nhân hai mẫu số', 'Trừ hai mẫu số'] },
        { q: 'T4-B60-002', c: 'Muốn cộng hai phân số khác mẫu số, bước đầu tiên ta phải làm gì?', a: 'Quy đồng mẫu số hai phân số', s: 'Để đưa về cùng mẫu số.', d: 'nhan_biet', o: ['Cộng ngay tử số và mẫu số', 'Quy đồng mẫu số hai phân số', 'Rút gọn phân số', 'Đảo ngược phân số'] },
        { q: 'T4-B60-003', c: 'Tính: $\\frac{1}{5} + \\frac{2}{5} = ?$?', a: '$\\frac{3}{5}$', s: '$(1+2)/5 = 3/5$.', d: 'thong_hieu', o: ['$\\frac{3}{10}$', '$\\frac{3}{5}$', '$\\frac{2}{25}$', '$\\frac{2}{5}$'] },
        { q: 'T4-B60-004', c: 'Tính: $\\frac{1}{2} + \\frac{1}{3} = ?$?', a: '$\\frac{5}{6}$', s: 'Quy đồng $3/6 + 2/6 = 5/6$.', d: 'thong_hieu', o: ['$\\frac{2}{5}$', '$\\frac{5}{6}$', '$\\frac{1}{6}$', '$\\frac{1}{5}$'] },
        { q: 'T4-B60-005', c: 'Tính: $\\frac{3}{4} + 1 = ?$?', a: '$\\frac{7}{4}$', s: '$1 = 4/4 \\Rightarrow 3/4 + 4/4 = 7/4$.', d: 'van_dung', o: ['$\\frac{4}{4}$', '$\\frac{7}{4}$', '$\\frac{4}{3}$', '$\\frac{3}{4}$'] }
      ]
    },
    {
      name: 'Bài 61. Phép trừ phân số',
      questions: [
        { q: 'T4-B61-001', c: 'Muốn trừ hai phân số cùng mẫu số, ta trừ hai tử số cho nhau và làm gì với mẫu số?', a: 'Giữ nguyên mẫu số', s: 'Quy tắc trừ hai phân số cùng mẫu.', d: 'nhan_biet', o: ['Trừ hai mẫu số', 'Giữ nguyên mẫu số', 'Cộng hai mẫu số', 'Rút gọn mẫu số'] },
        { q: 'T4-B61-002', c: 'Muốn trừ hai phân số khác mẫu số, ta phải làm gì trước?', a: 'Quy đồng mẫu số hai phân số', s: 'Đưa về cùng mẫu để thực hiện.', d: 'nhan_biet', o: ['Quy đồng mẫu số hai phân số', 'Trừ ngay các tử số và mẫu số', 'Đảo ngược phân số thứ hai', 'Rút gọn phân số'] },
        { q: 'T4-B61-003', c: 'Tính: $\\frac{5}{7} - \\frac{2}{7} = ?$?', a: '$\\frac{3}{7}$', s: '$(5-2)/7 = 3/7$.', d: 'thong_hieu', o: ['$\\frac{3}{0}$', '$\\frac{7}{7}$', '$\\frac{3}{7}$', '$\\frac{1}{7}$'] },
        { q: 'T4-B61-004', c: 'Tính: $\\frac{1}{2} - \\frac{1}{3} = ?$?', a: '$\\frac{1}{6}$', s: 'Quy đồng $3/6 - 2/6 = 1/6$.', d: 'thong_hieu', o: ['$\\frac{0}{1}$', '$\\frac{1}{6}$', '$\\frac{1}{5}$', '$\\frac{5}{6}$'] },
        { q: 'T4-B61-005', c: 'Tìm $x$ biết $x + \\frac{1}{2} = \\frac{3}{4}$:', a: '$\\frac{1}{4}$', s: '$x = 3/4 - 1/2 = 3/4 - 2/4 = 1/4$.', d: 'van_dung', o: ['$\\frac{5}{4}$', '$\\frac{1}{4}$', '$\\frac{1}{2}$', '$\\frac{2}{4}$'] }
      ]
    },
    {
      name: 'Bài 63. Phép nhân phân số',
      questions: [
        { q: 'T4-B63-001', c: 'Muốn nhân hai phân số, ta thực hiện như thế nào?', a: 'Nhân tử số với tử số, nhân mẫu số với mẫu số', s: 'Quy tắc nhân phân số.', d: 'nhan_biet', o: ['Quy đồng mẫu số rồi cộng', 'Nhân tử số với tử số, giữ nguyên mẫu số', 'Nhân tử số với tử số, nhân mẫu số với mẫu số', 'Nhân chéo'] },
        { q: 'T4-B63-002', c: 'Khi nhân một số tự nhiên với một phân số, ta có thể viết số tự nhiên đó dưới dạng phân số có mẫu số bằng mấy?', a: '$1$', s: 'Biết số tự nhiên thành phân số.', d: 'nhan_biet', o: ['$0$', '$1$', 'Chính số đó', '$10$'] },
        { q: 'T4-B63-003', c: 'Tính: $\\frac{2}{3} \\times \\frac{4}{5} = ?$?', a: '$\\frac{8}{15}$', s: '$(2 \\times 4) / (3 \\times 5) = 8 / 15$.', d: 'thong_hieu', o: ['$\\frac{6}{8}$', '$\\frac{8}{15}$', '$\\frac{10}{12}$', '$\\frac{8}{8}$'] },
        { q: 'T4-B63-004', c: 'Tính: $\\frac{3}{4} \\times 2 = ?$?', a: '$\\frac{6}{4}$ (hoặc $\\frac{3}{2}$)', s: '$(3 \\times 2) / 4 = 6/4 = 3/2$.', d: 'thong_hieu', o: ['$\\frac{3}{8}$', '$\\frac{6}{8}$', '$\\frac{6}{4}$ (hoặc $\\frac{3}{2}$)', '$\\frac{5}{4}$'] },
        { q: 'T4-B63-005', c: 'Tính diện tích hình chữ nhật có chiều dài $\\frac{4}{5}\\text{m}$, chiều rộng $\\frac{1}{2}\\text{m}$:', a: '$\\frac{2}{5}\\text{ m}^2$', s: '$4/5 \\times 1/2 = 4/10 = 2/5$.', d: 'van_dung', o: ['$\\frac{4}{10}\\text{ m}^2$ (hay $\\frac{2}{5}$)', '$\\frac{5}{7}\\text{ m}^2$', '$\\frac{8}{5}\\text{ m}^2$', '$\\frac{3}{10}\\text{ m}^2$'] }
      ]
    },
    {
      name: 'Bài 64. Phép chia phân số',
      questions: [
        { q: 'T4-B64-001', c: 'Muốn chia một phân số cho một phân số khác $0$, ta làm như thế nào?', a: 'Lấy phân số thứ nhất nhân với phân số thứ hai đảo ngược', s: 'Quy tắc chia phân số.', d: 'nhan_biet', o: ['Chia tử cho tử, chia mẫu cho mẫu', 'Lấy phân số thứ nhất nhân với phân số thứ hai đảo ngược', 'Cộng hai phân số', 'Nhân hai mẫu số với nhau'] },
        { q: 'T4-B64-002', c: 'Phân số đảo ngược của phân số $\\frac{3}{4}$ là phân số nào?', a: '$\\frac{4}{3}$', s: 'Đảo ngược vị trí tử và mẫu.', d: 'nhan_biet', o: ['$\\frac{3}{4}$', '$\\frac{4}{3}$', '$\\frac{1}{4}$', '$\\frac{1}{3}$'] },
        { q: 'T4-B64-003', c: 'Tính: $\\frac{1}{2} : \\frac{1}{3} = ?$?', a: '$\\frac{3}{2}$', s: '$1/2 \\times 3/1 = 3/2$.', d: 'thong_hieu', o: ['$\\frac{1}{6}$', '$\\frac{2}{3}$', '$\\frac{3}{2}$', '$\\frac{5}{6}$'] },
        { q: 'T4-B64-004', c: 'Tính: $2 : \\frac{1}{5} = ?$?', a: '$10$', s: '$2 \\times 5/1 = 10$.', d: 'thong_hieu', o: ['$\\frac{2}{5}$', '$10$', '$\\frac{5}{2}$', '$\\frac{1}{10}$'] },
        { q: 'T4-B64-005', c: 'Tìm $x$ biết $x \\times \\frac{2}{3} = \\frac{4}{5}$:', a: '$\\frac{6}{5}$', s: '$x = 4/5 : 2/3 = 4/5 \\times 3/2 = 12/10 = 6/5$.', d: 'van_dung', o: ['$\\frac{8}{15}$', '$\\frac{6}{5}$', '$\\frac{5}{6}$', '$\\frac{2}{15}$'] }
      ]
    },
    {
      name: 'Bài 65. Tìm phân số của một số',
      questions: [
        { q: 'T4-B65-001', c: 'Muốn tìm $\\frac{2}{3}$ của $15$, ta làm phép tính gì?', a: '$15 \\times \\frac{2}{3}$', s: 'Quy tắc tìm phân số của một số.', d: 'nhan_biet', o: ['$15 : \\frac{2}{3}$', '$15 + \\frac{2}{3}$', '$15 \\times \\frac{2}{3}$', '$15 - \\frac{2}{3}$'] },
        { q: 'T4-B65-002', c: 'Để tìm $\\frac{1}{4}$ của một số, ta có thể lấy số đó chia cho mấy?', a: 'Chia cho $4$', s: 'Nhân $1/4$ bằng chia $4$.', d: 'nhan_biet', o: ['Chia cho $1$', 'Chia cho $4$', 'Nhân với $4$', 'Cộng với $4$'] },
        { q: 'T4-B65-003', c: 'Tính: $\\frac{1}{4}$ của $20$ là bao nhiêu?', a: '$5$', s: '$20 : 4 = 5$.', d: 'thong_hieu', o: ['$4$', '$5$', '$6$', '$10$'] },
        { q: 'T4-B65-004', c: 'Lớp 4A có $30$ học sinh, trong đó $\\frac{1}{3}$ số học sinh là nam. Hỏi lớp 4A có bao nhiêu học sinh nam?', a: '$10$ học sinh', s: '$30 \\times 1/3 = 10$.', d: 'thong_hieu', o: ['$10$ học sinh', '$20$ học sinh', '$15$ học sinh', '$5$ học sinh'] },
        { q: 'T4-B65-005', c: 'Một đoạn đường dài $10\\text{km}$, người ta đã trải nhựa được $\\frac{2}{5}$ đoạn đường đó. Hỏi đã trải nhựa được bao nhiêu ki-lô-mét?', a: '$4\\text{ km}$', s: '$10 \\times 2/5 = 4$.', d: 'van_dung', o: ['$2\\text{ km}$', '$4\\text{ km}$', '$5\\text{ km}$', '$6\\text{ km}$'] }
      ]
    }
  ];

  for (const topic of topics) {
    const cats = await sql`SELECT id, name FROM public.categories WHERE name ILIKE ${'%' + topic.name + '%'} AND grade = 4 LIMIT 1`;
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
            ${q.d}, 'trac_nghiem', ${JSON.stringify(q.o)}::jsonb, ${q.a}, 'approved', 4, ${cats[0].name}, ${defaultUserId}
          )
        `;
        console.log(`Đã chèn: ${q.q}`);
      } else {
        console.log(`Bỏ qua: ${q.q}`);
      }
      await new Promise(r => setTimeout(r, 500));
    }
  }
  
  console.log('\n✅ Hoàn thành Batch 4 Lớp 4');
}

insertGrade4Batch4().catch(console.error);
