import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);

async function insertGrade7Batch1() {
  console.log('Khởi tạo kết nối CSDL...');
  
  const users = await sql`SELECT user_id FROM public.questions WHERE user_id IS NOT NULL LIMIT 1`;
  const defaultUserId = users.length > 0 ? users[0].user_id : '00000000-0000-0000-0000-000000000000';

  const topics = [
    {
      name: 'Luyện tập chung.',
      questions: [
        { q: 'T7-C1LTC-001', c: 'Tập hợp các số hữu tỉ được kí hiệu là:', a: '$\\mathbb{Q}$', s: 'Tập hợp số hữu tỉ được kí hiệu là $\\mathbb{Q}$.', d: 'nhan_biet', o: ['$\\mathbb{N}$', '$\\mathbb{Z}$', '$\\mathbb{Q}$', '$\\mathbb{R}$'] },
        { q: 'T7-C1LTC-002', c: 'Số đối của số hữu tỉ $-\\frac{3}{4}$ là:', a: '$\\frac{3}{4}$', s: 'Số đối của $-a$ là $a$, vậy số đối của $-\\frac{3}{4}$ là $\\frac{3}{4}$.', d: 'thong_hieu', o: ['$\\frac{-3}{4}$', '$\\frac{4}{3}$', '$\\frac{-4}{3}$', '$\\frac{3}{4}$'] },
        { q: 'T7-C1LTC-003', c: 'Kết quả của phép tính $\\frac{1}{2} - \\frac{3}{4}$ là:', a: '$-\\frac{1}{4}$', s: 'Quy đồng mẫu 4: $\\frac{2}{4} - \\frac{3}{4} = -\\frac{1}{4}$.', d: 'thong_hieu', o: ['$\\frac{1}{4}$', '$-\\frac{1}{4}$', '$\\frac{1}{2}$', '$-\\frac{1}{2}$'] },
        { q: 'T7-C1LTC-004', c: 'Tích của $\\frac{-2}{5} \\times \\frac{15}{4}$ là:', a: '$-\\frac{3}{2}$', s: '$\\frac{-2}{5} \\times \\frac{15}{4} = \\frac{-2 \\times 15}{5 \\times 4} = \\frac{-30}{20} = -\\frac{3}{2}$.', d: 'thong_hieu', o: ['$\\frac{3}{2}$', '$-\\frac{3}{2}$', '$\\frac{5}{2}$', '$-\\frac{5}{2}$'] },
        { q: 'T7-C1LTC-005', c: 'Tính giá trị của biểu thức $\\frac{3}{4} + \\frac{1}{4} \\times \\frac{-2}{3}$:', a: '$\\frac{7}{12}$', s: 'Nhân trước cộng sau: $\\frac{1}{4} \\times \\frac{-2}{3} = -\\frac{2}{12} = -\\frac{1}{6}$. Sau đó: $\\frac{3}{4} - \\frac{1}{6} = \\frac{9}{12} - \\frac{2}{12} = \\frac{7}{12}$.', d: 'van_dung', o: ['$\\frac{5}{12}$', '$\\frac{7}{12}$', '$\\frac{1}{4}$', '$-\\frac{1}{4}$'] }
      ]
    },
    {
      name: 'Bài 3. Luỹ thừa với số mũ tự nhiên của một số hữu tỉ.',
      questions: [
        { q: 'T7-C1B3-001', c: 'Luỹ thừa bậc $n$ của số hữu tỉ $x$ (với $n$ là số tự nhiên, $n > 1$) là:', a: 'Tích của $n$ thừa số $x$', s: '$x^n = x \\cdot x \\cdots x$ ($n$ thừa số $x$).', d: 'nhan_biet', o: ['Tổng của $n$ số hạng $x$', 'Tích của $n$ thừa số $x$', 'Tích của $x$ và $n$', 'Thương của $x$ và $n$'] },
        { q: 'T7-C1B3-002', c: 'Quy tắc nhân hai luỹ thừa cùng cơ số là:', a: '$x^m \\cdot x^n = x^{m+n}$', s: 'Khi nhân hai luỹ thừa cùng cơ số, ta giữ nguyên cơ số và cộng các số mũ.', d: 'nhan_biet', o: ['$x^m \\cdot x^n = x^{m \\cdot n}$', '$x^m \\cdot x^n = x^{m+n}$', '$x^m \\cdot x^n = x^{m-n}$', '$x^m \\cdot x^n = (x \\cdot x)^{m+n}$'] },
        { q: 'T7-C1B3-003', c: 'Giá trị của $\\left( \\frac{-1}{2} \\right)^3$ bằng:', a: '$\\frac{-1}{8}$', s: '$\\left( \\frac{-1}{2} \\right)^3 = \\frac{(-1)^3}{2^3} = \\frac{-1}{8}$.', d: 'thong_hieu', o: ['$\\frac{-1}{8}$', '$\\frac{1}{8}$', '$\\frac{-3}{8}$', '$\\frac{-1}{6}$'] },
        { q: 'T7-C1B3-004', c: 'Quy tắc tính luỹ thừa của luỹ thừa là:', a: '$(x^m)^n = x^{m \\cdot n}$', s: 'Khi tính luỹ thừa của một luỹ thừa, ta giữ nguyên cơ số và nhân các số mũ.', d: 'thong_hieu', o: ['$(x^m)^n = x^{m + n}$', '$(x^m)^n = x^{m \\cdot n}$', '$(x^m)^n = x^{m^n}$', '$(x^m)^n = x^{m - n}$'] },
        { q: 'T7-C1B3-005', c: 'Viết gọn biểu thức $2^3 \\cdot 2^4 : 2^5$ ta được kết quả là:', a: '$4$', s: '$2^3 \\cdot 2^4 = 2^7$. Sau đó $2^7 : 2^5 = 2^{7-5} = 2^2 = 4$.', d: 'van_dung', o: ['$2$', '$4$', '$8$', '$16$'] }
      ]
    },
    {
      name: 'Bài 4. Thứ tự thực hiện các phép tính. Quy tắc chuyển vế.',
      questions: [
        { q: 'T7-C1B4-001', c: 'Đối với biểu thức không có dấu ngoặc, chỉ có phép cộng và phép trừ, ta thực hiện các phép tính theo thứ tự nào?', a: 'Từ trái sang phải', s: 'Quy tắc thực hiện phép tính: Chỉ có cộng trừ thì làm từ trái sang phải.', d: 'nhan_biet', o: ['Từ phải sang trái', 'Cộng trước, trừ sau', 'Từ trái sang phải', 'Trừ trước, cộng sau'] },
        { q: 'T7-C1B4-002', c: 'Theo quy tắc chuyển vế, khi chuyển một số hạng từ vế này sang vế kia của một đẳng thức ta phải làm gì?', a: 'Đổi dấu số hạng đó', s: 'Khi chuyển vế một số hạng ta phải đổi dấu số hạng đó.', d: 'nhan_biet', o: ['Giữ nguyên dấu số hạng đó', 'Đổi dấu số hạng đó', 'Nhân số hạng đó với $-1$', 'Nghịch đảo số hạng đó'] },
        { q: 'T7-C1B4-003', c: 'Tính giá trị biểu thức: $10 - 2 \\cdot 3^2$', a: '$-8$', s: 'Thực hiện luỹ thừa trước: $3^2 = 9$. Sau đó nhân: $2 \\cdot 9 = 18$. Cuối cùng: $10 - 18 = -8$.', d: 'thong_hieu', o: ['$72$', '$-8$', '$28$', '$64$'] },
        { q: 'T7-C1B4-004', c: 'Tìm $x$, biết: $x + \\frac{1}{2} = 3$', a: '$x = \\frac{5}{2}$', s: 'Chuyển vế: $x = 3 - \\frac{1}{2} = \\frac{6}{2} - \\frac{1}{2} = \\frac{5}{2}$.', d: 'thong_hieu', o: ['$x = \\frac{7}{2}$', '$x = \\frac{5}{2}$', '$x = \\frac{1}{2}$', '$x = \\frac{-5}{2}$'] },
        { q: 'T7-C1B4-005', c: 'Tìm $x$ biết $2x - 3 = \\frac{1}{2}$:', a: '$x = \\frac{7}{4}$', s: 'Ta có $2x = \\frac{1}{2} + 3 = \\frac{7}{2}$. Suy ra $x = \\frac{7}{2} : 2 = \\frac{7}{4}$.', d: 'van_dung', o: ['$x = \\frac{5}{4}$', '$x = \\frac{7}{2}$', '$x = \\frac{7}{4}$', '$x = \\frac{5}{2}$'] }
      ]
    },
    {
      name: 'Bài tập cuối chương I.',
      questions: [
        { q: 'T7-C1OT-001', c: 'Khẳng định nào sau đây là ĐÚNG?', a: 'Số hữu tỉ âm luôn nhỏ hơn $0$', s: 'Mọi số hữu tỉ âm đều nhỏ hơn 0 và nhỏ hơn số hữu tỉ dương.', d: 'nhan_biet', o: ['Số hữu tỉ âm luôn lớn hơn $0$', 'Số hữu tỉ âm luôn bằng $0$', 'Số hữu tỉ âm luôn nhỏ hơn $0$', 'Số hữu tỉ âm luôn lớn hơn số hữu tỉ dương'] },
        { q: 'T7-C1OT-002', c: 'Tìm số hữu tỉ $x$ biết $x^2 = \\frac{4}{9}$:', a: '$x = \\frac{2}{3}$ hoặc $x = -\\frac{2}{3}$', s: 'Ta có $\\left(\\frac{2}{3}\\right)^2 = \\frac{4}{9}$ và $\\left(-\\frac{2}{3}\\right)^2 = \\frac{4}{9}$.', d: 'thong_hieu', o: ['$x = \\frac{2}{3}$', '$x = -\\frac{2}{3}$', '$x = \\frac{16}{81}$', '$x = \\frac{2}{3}$ hoặc $x = -\\frac{2}{3}$'] },
        { q: 'T7-C1OT-003', c: 'So sánh hai số hữu tỉ $\\frac{-2}{3}$ và $\\frac{-3}{4}$:', a: '$\\frac{-2}{3} > \\frac{-3}{4}$', s: 'Quy đồng mẫu $12$: $\\frac{-8}{12}$ và $\\frac{-9}{12}$. Vì $-8 > -9$ nên $\\frac{-2}{3} > \\frac{-3}{4}$.', d: 'thong_hieu', o: ['$\\frac{-2}{3} < \\frac{-3}{4}$', '$\\frac{-2}{3} > \\frac{-3}{4}$', '$\\frac{-2}{3} = \\frac{-3}{4}$', 'Không so sánh được'] },
        { q: 'T7-C1OT-004', c: 'Số hữu tỉ $\\frac{5}{4}$ viết dưới dạng số thập phân là:', a: '$1,25$', s: 'Ta có $5 : 4 = 1,25$.', d: 'thong_hieu', o: ['$1,5$', '$1,25$', '$0,8$', '$1,2$'] },
        { q: 'T7-C1OT-005', c: 'Giá trị của biểu thức $\\left(\\frac{-1}{3}\\right)^2 + \\frac{5}{9}$ là:', a: '$\\frac{2}{3}$', s: '$\\left(\\frac{-1}{3}\\right)^2 = \\frac{1}{9}$. Sau đó $\\frac{1}{9} + \\frac{5}{9} = \\frac{6}{9} = \\frac{2}{3}$.', d: 'van_dung', o: ['$\\frac{4}{9}$', '$\\frac{2}{3}$', '$\\frac{6}{9}$', '$\\frac{1}{3}$'] }
      ]
    },
    {
      name: 'Bài 7. Tập hợp các số thực.',
      questions: [
        { q: 'T7-C2B7-001', c: 'Tập hợp các số thực được kí hiệu là:', a: '$\\mathbb{R}$', s: 'Kí hiệu của tập số thực là $\\mathbb{R}$.', d: 'nhan_biet', o: ['$\\mathbb{Q}$', '$\\mathbb{I}$', '$\\mathbb{R}$', '$\\mathbb{Z}$'] },
        { q: 'T7-C2B7-002', c: 'Tập hợp số thực bao gồm những loại số nào?', a: 'Số hữu tỉ và số vô tỉ', s: 'Tập hợp số thực $\\mathbb{R}$ gồm tất cả các số hữu tỉ và số vô tỉ.', d: 'nhan_biet', o: ['Chỉ số nguyên', 'Chỉ số hữu tỉ', 'Số hữu tỉ và số vô tỉ', 'Số tự nhiên và số vô tỉ'] },
        { q: 'T7-C2B7-003', c: 'Khẳng định nào sau đây là ĐÚNG về số thực?', a: 'Mỗi số thực được biểu diễn bởi một điểm trên trục số', s: 'Trục số là trục số thực, mỗi điểm trên trục biểu diễn một số thực và ngược lại.', d: 'thong_hieu', o: ['Có số thực không biểu diễn được trên trục số', 'Mỗi số thực được biểu diễn bởi một điểm trên trục số', 'Số vô tỉ không thể biểu diễn trên trục số', 'Chỉ số hữu tỉ mới nằm trên trục số'] },
        { q: 'T7-C2B7-004', c: 'Số đối của số thực $\\sqrt{2}$ là:', a: '$-\\sqrt{2}$', s: 'Số đối của $a$ là $-a$, do đó số đối của $\\sqrt{2}$ là $-\\sqrt{2}$.', d: 'thong_hieu', o: ['$\\frac{1}{\\sqrt{2}}$', '$-\\sqrt{2}$', '$\\sqrt{2}$', '$-2$'] },
        { q: 'T7-C2B7-005', c: 'So sánh $1,5$ và $\\sqrt{2}$ ta được:', a: '$1,5 > \\sqrt{2}$', s: 'Ta có $\\sqrt{2} \\approx 1,414$. Nên $1,5 > \\sqrt{2}$.', d: 'van_dung', o: ['$1,5 < \\sqrt{2}$', '$1,5 > \\sqrt{2}$', '$1,5 = \\sqrt{2}$', 'Không thể so sánh'] }
      ]
    },
    {
      name: 'Bài tập cuối chương II.',
      questions: [
        { q: 'T7-C2OT-001', c: 'Giá trị của căn bậc hai số học $\\sqrt{16}$ là:', a: '$4$', s: 'Căn bậc hai số học của một số không âm $a$ là số không âm $x$ sao cho $x^2 = a$. Ta có $4^2 = 16$ và $4 > 0$.', d: 'nhan_biet', o: ['$4$', '$-4$', '$\\pm 4$', '$8$'] },
        { q: 'T7-C2OT-002', c: 'Trong các số sau, số nào là số vô tỉ?', a: '$\\sqrt{3}$', s: '$\\sqrt{3}$ là số thập phân vô hạn không tuần hoàn nên nó là số vô tỉ. Các số còn lại là số hữu tỉ.', d: 'thong_hieu', o: ['$\\frac{1}{2}$', '$0$', '$1,5$', '$\\sqrt{3}$'] },
        { q: 'T7-C2OT-003', c: 'Giá trị tuyệt đối của số $-3,5$ là:', a: '$3,5$', s: '$|-3,5| = 3,5$.', d: 'thong_hieu', o: ['$-3,5$', '$3,5$', '$\\pm 3,5$', '$0$'] },
        { q: 'T7-C2OT-004', c: 'Làm tròn số $\\sqrt{5} \\approx 2,23606...$ đến chữ số thập phân thứ hai ta được:', a: '$2,24$', s: 'Chữ số thập phân thứ ba là $6 > 5$ nên cộng 1 vào hàng phần trăm, ta được $2,24$.', d: 'thong_hieu', o: ['$2,23$', '$2,24$', '$2,236$', '$2,2$'] },
        { q: 'T7-C2OT-005', c: 'Tìm $x$ biết $|x - 1| = 2$:', a: '$x = 3$ hoặc $x = -1$', s: '$|x - 1| = 2 \\Rightarrow x - 1 = 2$ (tức $x = 3$) hoặc $x - 1 = -2$ (tức $x = -1$).', d: 'van_dung', o: ['$x = 3$', '$x = -1$', '$x = 3$ hoặc $x = -1$', '$x = 1$ hoặc $x = -3$'] }
      ]
    },
    {
      name: 'Bài 10. Tiên đề Euclid. Tính chất của hai đường thẳng song song.',
      questions: [
        { q: 'T7-C3B10-001', c: 'Tiên đề Euclid về đường thẳng song song phát biểu như thế nào?', a: 'Qua một điểm nằm ngoài một đường thẳng, chỉ có một đường thẳng song song với đường thẳng đó', s: 'Đây là nội dung của Tiên đề Euclid nổi tiếng.', d: 'nhan_biet', o: ['Qua một điểm, có vô số đường thẳng song song với đường thẳng cho trước', 'Qua một điểm nằm ngoài một đường thẳng, chỉ có một đường thẳng song song với đường thẳng đó', 'Hai đường thẳng phân biệt cùng vuông góc với đường thẳng thứ ba thì cắt nhau', 'Hai đường thẳng song song thì không bao giờ cắt nhau'] },
        { q: 'T7-C3B10-002', c: 'Nếu một đường thẳng cắt hai đường thẳng song song thì hai góc so le trong:', a: 'Bằng nhau', s: 'Tính chất của hai đường thẳng song song: Cặp góc so le trong bằng nhau, đồng vị bằng nhau.', d: 'nhan_biet', o: ['Phụ nhau', 'Kề bù', 'Bằng nhau', 'Bù nhau'] },
        { q: 'T7-C3B10-003', c: 'Nếu một đường thẳng cắt hai đường thẳng song song thì hai góc đồng vị:', a: 'Bằng nhau', s: 'Tính chất hai đường thẳng song song: Cặp góc đồng vị bằng nhau.', d: 'thong_hieu', o: ['Kề bù', 'Bằng nhau', 'Phụ nhau', 'Bù nhau'] },
        { q: 'T7-C3B10-004', c: 'Nếu đường thẳng $a$ song song với $b$ ($a \\parallel b$) và đường thẳng $c$ vuông góc với $a$ ($c \\perp a$) thì:', a: '$c \\perp b$', s: 'Một đường thẳng vuông góc với một trong hai đường thẳng song song thì nó cũng vuông góc với đường thẳng kia.', d: 'thong_hieu', o: ['$c \\parallel b$', '$c \\perp b$', '$c$ không cắt $b$', '$c$ trùng $b$'] },
        { q: 'T7-C3B10-005', c: 'Cho đường thẳng $a \\parallel b$. Một cát tuyến cắt $a, b$ tạo thành một góc so le trong bằng $45^\\circ$. Góc đồng vị tương ứng của nó có số đo bằng bao nhiêu?', a: '$45^\\circ$', s: 'Góc so le trong bằng $45^\\circ$ thì góc kia ở đỉnh kia cũng là $45^\\circ$. Các góc đồng vị, so le trong của hệ này đều có số đo bằng góc đã cho.', d: 'van_dung', o: ['$45^\\circ$', '$90^\\circ$', '$135^\\circ$', '$180^\\circ$'] }
      ]
    },
    {
      name: 'Bài 11. Định lí và chứng minh định lí.',
      questions: [
        { q: 'T7-C3B11-001', c: 'Một định lí thường được phát biểu dưới dạng "Nếu ... thì ...", định lí gồm mấy phần chính?', a: '$2$ phần (Giả thiết và Kết luận)', s: 'Định lí gồm 2 phần: Giả thiết (điều cho trước) và Kết luận (điều cần chứng minh).', d: 'nhan_biet', o: ['$1$ phần', '$2$ phần (Giả thiết và Kết luận)', '$3$ phần', '$4$ phần'] },
        { q: 'T7-C3B11-002', c: 'Phần điều kiện cho trước của một định lí được gọi là gì?', a: 'Giả thiết', s: 'Điều kiện cho trước gọi là Giả thiết.', d: 'nhan_biet', o: ['Chứng minh', 'Giải thích', 'Giả thiết', 'Kết luận'] },
        { q: 'T7-C3B11-003', c: 'Chứng minh định lí là quá trình gì?', a: 'Dùng lập luận toán học để từ giả thiết suy ra kết luận', s: 'Chứng minh định lí là việc sử dụng các tính chất, định lí đã biết để lập luận từ giả thiết ra kết luận.', d: 'thong_hieu', o: ['Vẽ hình thật chính xác để đo', 'Đo đạc thực tế để kiểm tra', 'Dùng lập luận toán học để từ giả thiết suy ra kết luận', 'Dự đoán kết quả'] },
        { q: 'T7-C3B11-004', c: 'Trong định lí "Hai góc đối đỉnh thì bằng nhau", giả thiết là gì?', a: 'Hai góc đối đỉnh', s: 'Nếu [hai góc đối đỉnh] thì [bằng nhau]. Vậy giả thiết là "Hai góc đối đỉnh".', d: 'thong_hieu', o: ['Hai góc bằng nhau', 'Hai góc đối đỉnh', 'Hai góc kề bù', 'Hai đường thẳng cắt nhau'] },
        { q: 'T7-C3B11-005', c: 'Dựa vào định lí "Hai góc kề bù có tổng số đo bằng $180^\\circ$", nếu biết một góc có số đo bằng $60^\\circ$ thì góc kề bù với nó có số đo bằng:', a: '$120^\\circ$', s: 'Hai góc kề bù có tổng là $180^\\circ$. Góc kia là $180^\\circ - 60^\\circ = 120^\\circ$.', d: 'van_dung', o: ['$60^\\circ$', '$90^\\circ$', '$120^\\circ$', '$30^\\circ$'] }
      ]
    },
    {
      name: 'Bài tập cuối chương III.',
      questions: [
        { q: 'T7-C3OT-001', c: 'Hai góc đối đỉnh là hai góc thoả mãn điều kiện gì?', a: 'Mỗi cạnh của góc này là tia đối của một cạnh của góc kia', s: 'Đây là định nghĩa chuẩn của hai góc đối đỉnh.', d: 'nhan_biet', o: ['Có chung đỉnh', 'Có cùng số đo', 'Mỗi cạnh của góc này là tia đối của một cạnh của góc kia', 'Kề nhau và tạo thành đường thẳng'] },
        { q: 'T7-C3OT-002', c: 'Tia phân giác của một góc $60^\\circ$ sẽ chia góc đó thành hai góc có số đo là:', a: '$30^\\circ$', s: 'Tia phân giác chia góc thành hai góc bằng nhau: $60^\\circ : 2 = 30^\\circ$.', d: 'thong_hieu', o: ['$30^\\circ$', '$60^\\circ$', '$15^\\circ$', '$120^\\circ$'] },
        { q: 'T7-C3OT-003', c: 'Hai đường thẳng phân biệt cùng vuông góc với đường thẳng thứ ba thì chúng:', a: 'Song song với nhau', s: 'Từ vuông góc đến song song: Hai đường thẳng phân biệt cùng vuông góc với đường thẳng thứ ba thì song song với nhau.', d: 'thong_hieu', o: ['Cắt nhau', 'Vuông góc với nhau', 'Trùng nhau', 'Song song với nhau'] },
        { q: 'T7-C3OT-004', c: 'Dấu hiệu nào sau đây nhận biết hai đường thẳng song song?', a: 'Một đường thẳng cắt hai đường thẳng tạo thành một cặp góc so le trong bằng nhau', s: 'Đây là một trong các dấu hiệu nhận biết hai đường thẳng song song.', d: 'thong_hieu', o: ['Một đường thẳng cắt hai đường thẳng tạo thành hai góc kề bù', 'Một đường thẳng cắt hai đường thẳng tạo thành một cặp góc so le trong bằng nhau', 'Hai đường thẳng không có điểm chung', 'Cả ba phương án trên đều đúng'] },
        { q: 'T7-C3OT-005', c: 'Cho hai góc đối đỉnh $\\widehat{O_1}$ và $\\widehat{O_3}$. Nếu $\\widehat{O_1} = 45^\\circ$ thì tổng số đo hai góc đó là:', a: '$90^\\circ$', s: 'Hai góc đối đỉnh thì bằng nhau nên $\\widehat{O_3} = 45^\\circ$. Tổng là $45^\\circ + 45^\\circ = 90^\\circ$.', d: 'van_dung', o: ['$45^\\circ$', '$90^\\circ$', '$180^\\circ$', '$135^\\circ$'] }
      ]
    }
  ];

  for (const topic of topics) {
    const cats = await sql`SELECT id, name FROM public.categories WHERE name ILIKE ${'%' + topic.name + '%'} AND grade = 7 LIMIT 1`;
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
            ${q.d}, 'trac_nghiem', ${JSON.stringify(q.o)}::jsonb, ${q.a}, 'approved', 7, ${cats[0].name}, ${defaultUserId}
          )
        `;
        console.log(`Đã chèn: ${q.q}`);
      } else {
        console.log(`Bỏ qua: ${q.q}`);
      }
      await new Promise(r => setTimeout(r, 500));
    }
  }
  
  console.log('\n✅ Hoàn thành Batch 1 Lớp 7');
}

insertGrade7Batch1().catch(console.error);
