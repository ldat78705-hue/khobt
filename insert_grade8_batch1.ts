import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);

async function insertGrade8Batch1() {
  console.log('Khởi tạo kết nối CSDL...');
  
  const users = await sql`SELECT user_id FROM public.questions WHERE user_id IS NOT NULL LIMIT 1`;
  const defaultUserId = users.length > 0 ? users[0].user_id : '00000000-0000-0000-0000-000000000000';

  const topics = [
    {
      name: 'Bài 2. Đa thức.',
      questions: [
        { q: 'T8-C1B2-001', c: 'Đa thức là gì?', a: 'Một tổng của những đơn thức', s: 'Định nghĩa đa thức: là một tổng của những đơn thức, mỗi đơn thức trong tổng gọi là một hạng tử của đa thức đó.', d: 'nhan_biet', o: ['Một tích của những đơn thức', 'Một tổng của những đơn thức', 'Một thương của hai đơn thức', 'Một hằng số'] },
        { q: 'T8-C1B2-002', c: 'Bậc của đa thức (khác đa thức không, đã thu gọn) là:', a: 'Bậc của hạng tử có bậc cao nhất trong dạng thu gọn của đa thức đó', s: 'Định nghĩa bậc của đa thức.', d: 'nhan_biet', o: ['Tổng các bậc của các hạng tử', 'Bậc của hạng tử có bậc cao nhất trong dạng thu gọn của đa thức đó', 'Bậc của hạng tử có bậc thấp nhất', 'Số lượng hạng tử của đa thức'] },
        { q: 'T8-C1B2-003', c: 'Đa thức $x^2y + 2xy - 3$ có bậc là bao nhiêu?', a: '$3$', s: 'Hạng tử $x^2y$ có bậc là $2+1=3$. Hạng tử $2xy$ có bậc $2$. Số $-3$ có bậc $0$. Bậc lớn nhất là $3$.', d: 'thong_hieu', o: ['$2$', '$3$', '$4$', '$1$'] },
        { q: 'T8-C1B2-004', c: 'Thu gọn đa thức $2xy + x^2 - xy$ ta được kết quả là:', a: '$xy + x^2$', s: '$(2xy - xy) + x^2 = xy + x^2$.', d: 'thong_hieu', o: ['$3xy + x^2$', '$xy - x^2$', '$xy + x^2$', '$x^2$'] },
        { q: 'T8-C1B2-005', c: 'Tính giá trị của đa thức $x^2 + 2xy$ tại $x=1, y=-1$:', a: '$-1$', s: '$1^2 + 2 \\cdot 1 \\cdot (-1) = 1 - 2 = -1$.', d: 'van_dung', o: ['$1$', '$-1$', '$3$', '$-3$'] }
      ]
    },
    {
      name: 'Bài 3. Phép cộng và phép trừ đa thức.',
      questions: [
        { q: 'T8-C1B3-001', c: 'Để cộng hai đa thức ta làm thế nào?', a: 'Viết liên tiếp các hạng tử của 2 đa thức cùng với dấu của chúng rồi thu gọn các hạng tử đồng dạng', s: 'Quy tắc cộng hai đa thức.', d: 'nhan_biet', o: ['Cộng các hệ số bất kì lại với nhau', 'Viết liên tiếp các hạng tử của 2 đa thức cùng với dấu của chúng rồi thu gọn các hạng tử đồng dạng', 'Chỉ cộng các hạng tử có bậc cao nhất', 'Nhân các hạng tử với nhau'] },
        { q: 'T8-C1B3-002', c: 'Khi thực hiện phép trừ đa thức, ta cần lưu ý điều gì đối với đa thức bị trừ (đứng sau dấu trừ)?', a: 'Đổi dấu tất cả các hạng tử của đa thức đó', s: 'Quy tắc bỏ dấu ngoặc có dấu trừ đằng trước.', d: 'nhan_biet', o: ['Giữ nguyên dấu của các hạng tử', 'Đổi dấu tất cả các hạng tử của đa thức đó', 'Chỉ đổi dấu hạng tử đầu tiên', 'Đổi dấu các hạng tử mang dấu âm'] },
        { q: 'T8-C1B3-003', c: 'Cho $A = x+y, B = x-y$. Tính tổng $A+B$:', a: '$2x$', s: '$(x+y) + (x-y) = 2x$.', d: 'thong_hieu', o: ['$2y$', '$2x$', '$x^2 - y^2$', '$0$'] },
        { q: 'T8-C1B3-004', c: 'Cho $P = x^2 - y^2, Q = x^2 + y^2$. Tính hiệu $P-Q$:', a: '$-2y^2$', s: '$(x^2 - y^2) - (x^2 + y^2) = x^2 - y^2 - x^2 - y^2 = -2y^2$.', d: 'thong_hieu', o: ['$2x^2$', '$-2y^2$', '$0$', '$2y^2$'] },
        { q: 'T8-C1B3-005', c: 'Tìm đa thức $M$ biết $M + (x^2 - 2xy) = 3x^2 + xy$:', a: '$2x^2 + 3xy$', s: '$M = (3x^2 + xy) - (x^2 - 2xy) = 3x^2 + xy - x^2 + 2xy = 2x^2 + 3xy$.', d: 'van_dung', o: ['$4x^2 - xy$', '$2x^2 - xy$', '$2x^2 + 3xy$', '$4x^2 + 3xy$'] }
      ]
    },
    {
      name: 'Bài 4. Phép nhân đa thức.',
      questions: [
        { q: 'T8-C1B4-001', c: 'Muốn nhân một đa thức với một đa thức ta làm thế nào?', a: 'Nhân mỗi hạng tử của đa thức này với từng hạng tử của đa thức kia rồi cộng các tích với nhau', s: 'Quy tắc nhân đa thức với đa thức.', d: 'nhan_biet', o: ['Nhân hạng tử đầu của đa thức này với đa thức kia', 'Nhân mỗi hạng tử của đa thức này với từng hạng tử của đa thức kia rồi cộng các tích với nhau', 'Nhân các hệ số với nhau và giữ nguyên phần biến', 'Chỉ nhân các hạng tử đồng dạng'] },
        { q: 'T8-C1B4-002', c: 'Khi nhân hai đơn thức $-2x^2y$ và $3xy^2$, hệ số của phần biến tích là bao nhiêu?', a: '$-6$', s: '$-2 \\times 3 = -6$.', d: 'nhan_biet', o: ['$6$', '$-6$', '$-5$', '$1$'] },
        { q: 'T8-C1B4-003', c: 'Nhân đơn thức $x$ với đa thức $(x+y)$ ta được kết quả là:', a: '$x^2 + xy$', s: '$x(x+y) = x^2 + xy$.', d: 'thong_hieu', o: ['$x^2 + y$', '$x + xy$', '$x^2 + xy$', '$2x + y$'] },
        { q: 'T8-C1B4-004', c: 'Tích của hai đa thức $(x-1)$ và $(x+1)$ bằng:', a: '$x^2 - 1$', s: '$(x-1)(x+1) = x^2 + x - x - 1 = x^2 - 1$.', d: 'thong_hieu', o: ['$x^2 - 2x + 1$', '$x^2 + 2x + 1$', '$x^2 - 1$', '$x^2 + 1$'] },
        { q: 'T8-C1B4-005', c: 'Rút gọn biểu thức $(x+2)(x-3) - x^2$ ta được:', a: '$-x - 6$', s: '$(x^2 - 3x + 2x - 6) - x^2 = x^2 - x - 6 - x^2 = -x - 6$.', d: 'van_dung', o: ['$x - 6$', '$-x - 6$', '$-5x - 6$', '$x + 6$'] }
      ]
    },
    {
      name: 'Bài 5. Phép chia đa thức cho đơn thức.',
      questions: [
        { q: 'T8-C1B5-001', c: 'Muốn chia đa thức $A$ cho đơn thức $B$ (trường hợp $A$ chia hết cho $B$) ta làm thế nào?', a: 'Chia từng hạng tử của $A$ cho $B$ rồi cộng các kết quả với nhau', s: 'Quy tắc chia đa thức cho đơn thức.', d: 'nhan_biet', o: ['Chia hệ số lớn nhất của $A$ cho $B$', 'Chia từng hạng tử của $A$ cho $B$ rồi cộng các kết quả với nhau', 'Giữ nguyên đa thức $A$', 'Chia tổng các hệ số của $A$ cho $B$'] },
        { q: 'T8-C1B5-002', c: 'Điều kiện để đa thức $A$ chia hết cho đơn thức $B$ là gì?', a: 'Mọi hạng tử của $A$ đều chia hết cho $B$', s: 'Mỗi hạng tử của $A$ phải chia hết cho $B$ thì $A$ mới chia hết cho $B$.', d: 'nhan_biet', o: ['Có ít nhất một hạng tử của $A$ chia hết cho $B$', 'Mọi hạng tử của $A$ đều chia hết cho $B$', 'Bậc của $A$ bằng bậc của $B$', 'Đa thức $A$ có số hạng tử nhiều hơn $B$'] },
        { q: 'T8-C1B5-003', c: 'Phép chia đa thức $4x^2 + 2x$ cho đơn thức $2x$ có kết quả là:', a: '$2x + 1$', s: '$(4x^2 : 2x) + (2x : 2x) = 2x + 1$.', d: 'thong_hieu', o: ['$2x$', '$2x + 1$', '$x + 1$', '$2x^2 + 1$'] },
        { q: 'T8-C1B5-004', c: 'Kết quả của phép chia $(x^3y^2 - x^2y^3) : x^2y^2$ là:', a: '$x - y$', s: '$(x^3y^2 : x^2y^2) - (x^2y^3 : x^2y^2) = x - y$.', d: 'thong_hieu', o: ['$x - y$', '$x + y$', '$x^2 - y^2$', '$xy$'] },
        { q: 'T8-C1B5-005', c: 'Tìm đa thức $M$ biết $M \\cdot (3x) = 6x^3 - 9x^2$:', a: '$2x^2 - 3x$', s: '$M = (6x^3 - 9x^2) : 3x = 2x^2 - 3x$.', d: 'van_dung', o: ['$3x^2 - 3x$', '$2x^2 - 3x$', '$2x^2 + 3x$', '$2x - 3$'] }
      ]
    },
    {
      name: 'Bài tập cuối chương 1.',
      questions: [
        { q: 'T8-C1OT-001', c: 'Biểu thức nào sau đây KHÔNG PHẢI là đa thức?', a: '$\\frac{1}{x}$', s: 'Đa thức không được chứa biến ở mẫu.', d: 'nhan_biet', o: ['$x+y$', '$\\frac{1}{x}$', '$x^2$', '$5$'] },
        { q: 'T8-C1OT-002', c: 'Bậc của đa thức $x^3y^2 - 5x^4y + 2$ là bao nhiêu?', a: '$5$', s: 'Hạng tử $x^3y^2$ có bậc $5$, $-5x^4y$ có bậc $5$. Vậy bậc của đa thức là $5$.', d: 'thong_hieu', o: ['$4$', '$5$', '$6$', '$3$'] },
        { q: 'T8-C1OT-003', c: 'Đa thức $x^2 - y^2$ là kết quả của phép nhân nào sau đây?', a: '$(x-y)(x+y)$', s: 'Hằng đẳng thức hiệu hai bình phương.', d: 'thong_hieu', o: ['$(x-y)^2$', '$(x+y)^2$', '$(x-y)(x+y)$', '$x(x-y)$'] },
        { q: 'T8-C1OT-004', c: 'Tìm đa thức $M$ thỏa mãn $M + x^2 = 3x^2 - 1$:', a: '$2x^2 - 1$', s: '$M = 3x^2 - 1 - x^2 = 2x^2 - 1$.', d: 'thong_hieu', o: ['$4x^2 - 1$', '$2x^2 - 1$', '$2x^2 + 1$', '$-2x^2 - 1$'] },
        { q: 'T8-C1OT-005', c: 'Tính nhanh giá trị của biểu thức $x^2 + 2x + 1$ tại $x=99$:', a: '$10000$', s: '$x^2 + 2x + 1 = (x+1)^2$. Khi $x=99$ thì $(99+1)^2 = 100^2 = 10000$.', d: 'van_dung', o: ['$100$', '$1000$', '$10000$', '$9801$'] }
      ]
    },
    {
      name: 'Bài 7. Lập phương của một tổng hay một hiệu.',
      questions: [
        { q: 'T8-C2B7-001', c: 'Khai triển hằng đẳng thức $(A+B)^3$ bằng:', a: '$A^3 + 3A^2B + 3AB^2 + B^3$', s: 'Hằng đẳng thức lập phương của một tổng.', d: 'nhan_biet', o: ['$A^3 + B^3$', '$A^3 + 3A^2B + 3AB^2 + B^3$', '$A^3 + 3AB + B^3$', '$A^3 - 3A^2B + 3AB^2 - B^3$'] },
        { q: 'T8-C2B7-002', c: 'Khai triển hằng đẳng thức $(A-B)^3$ bằng:', a: '$A^3 - 3A^2B + 3AB^2 - B^3$', s: 'Hằng đẳng thức lập phương của một hiệu.', d: 'nhan_biet', o: ['$A^3 - B^3$', '$A^3 + 3A^2B + 3AB^2 + B^3$', '$A^3 - 3A^2B + 3AB^2 - B^3$', '$A^3 - 3AB^2 - B^3$'] },
        { q: 'T8-C2B7-003', c: 'Biểu thức $x^3 + 3x^2 + 3x + 1$ viết dưới dạng lập phương của một tổng là:', a: '$(x+1)^3$', s: 'Dựa vào hằng đẳng thức $(x+1)^3$.', d: 'thong_hieu', o: ['$(x+1)^3$', '$(x-1)^3$', '$(x+3)^3$', '$(3x+1)^3$'] },
        { q: 'T8-C2B7-004', c: 'Khai triển biểu thức $(x-2)^3$ ta được:', a: '$x^3 - 6x^2 + 12x - 8$', s: '$x^3 - 3x^2(2) + 3x(2^2) - 2^3 = x^3 - 6x^2 + 12x - 8$.', d: 'thong_hieu', o: ['$x^3 - 8$', '$x^3 - 6x^2 + 12x - 8$', '$x^3 + 6x^2 + 12x + 8$', '$x^3 - 6x^2 - 12x - 8$'] },
        { q: 'T8-C2B7-005', c: 'Tính giá trị của biểu thức $x^3 - 3x^2 + 3x - 1$ tại $x=11$:', a: '$1000$', s: '$x^3 - 3x^2 + 3x - 1 = (x-1)^3$. Thay $x=11 \\Rightarrow 10^3 = 1000$.', d: 'van_dung', o: ['$100$', '$1000$', '$1331$', '$10000$'] }
      ]
    },
    {
      name: 'Bài 8. Tổng và hiệu hai lập hương.',
      questions: [
        { q: 'T8-C2B8-001', c: 'Hằng đẳng thức tổng hai lập phương $A^3 + B^3$ bằng:', a: '$(A+B)(A^2 - AB + B^2)$', s: 'Công thức hằng đẳng thức.', d: 'nhan_biet', o: ['$(A+B)^3$', '$(A+B)(A^2 - AB + B^2)$', '$(A-B)(A^2 + AB + B^2)$', '$(A+B)(A^2 + AB + B^2)$'] },
        { q: 'T8-C2B8-002', c: 'Hằng đẳng thức hiệu hai lập phương $A^3 - B^3$ bằng:', a: '$(A-B)(A^2 + AB + B^2)$', s: 'Công thức hằng đẳng thức.', d: 'nhan_biet', o: ['$(A-B)^3$', '$(A-B)(A^2 - AB + B^2)$', '$(A-B)(A^2 + AB + B^2)$', '$(A+B)(A^2 - AB + B^2)$'] },
        { q: 'T8-C2B8-003', c: 'Biểu thức $(x-1)(x^2 + x + 1)$ bằng:', a: '$x^3 - 1$', s: 'Theo hằng đẳng thức hiệu hai lập phương.', d: 'thong_hieu', o: ['$x^3 + 1$', '$x^3 - 1$', '$(x-1)^3$', '$x^2 - 1$'] },
        { q: 'T8-C2B8-004', c: 'Khai triển $x^3 + 8$ ta được:', a: '$(x+2)(x^2 - 2x + 4)$', s: '$x^3 + 2^3 = (x+2)(x^2 - x\\cdot 2 + 2^2) = (x+2)(x^2 - 2x + 4)$.', d: 'thong_hieu', o: ['$(x+2)^3$', '$(x+2)(x^2 - 2x + 4)$', '$(x+2)(x^2 + 2x + 4)$', '$(x-2)(x^2 + 2x + 4)$'] },
        { q: 'T8-C2B8-005', c: 'Tính nhanh $10^3 - 9^3$:', a: '$271$', s: '$1000 - 729 = 271$ hoặc $(10-9)(100 + 90 + 81) = 271$.', d: 'van_dung', o: ['$1$', '$271$', '$190$', '$371$'] }
      ]
    },
    {
      name: 'Bài 9. Phân tích đa thức thành nhân tử.',
      questions: [
        { q: 'T8-C2B9-001', c: 'Phân tích đa thức thành nhân tử là quá trình gì?', a: 'Biến đổi đa thức đó thành một tích của những đa thức', s: 'Định nghĩa việc phân tích đa thức thành nhân tử.', d: 'nhan_biet', o: ['Cộng các đa thức lại với nhau', 'Biến đổi đa thức đó thành một tích của những đa thức', 'Tìm bậc của đa thức', 'Biến đổi đa thức thành một phân số'] },
        { q: 'T8-C2B9-002', c: 'Phương pháp đặt nhân tử chung dựa vào tính chất nào của phép toán?', a: 'Tính chất phân phối của phép nhân đối với phép cộng', s: 'Tức là $ab + ac = a(b+c)$.', d: 'nhan_biet', o: ['Tính chất giao hoán', 'Tính chất kết hợp', 'Tính chất phân phối của phép nhân đối với phép cộng', 'Quy tắc dấu ngoặc'] },
        { q: 'T8-C2B9-003', c: 'Phân tích đa thức $x^2 - 4$ thành nhân tử ta được:', a: '$(x-2)(x+2)$', s: 'Sử dụng hằng đẳng thức hiệu hai bình phương.', d: 'thong_hieu', o: ['$(x-4)(x+1)$', '$(x-2)(x+2)$', '$(x-2)^2$', '$(x+2)^2$'] },
        { q: 'T8-C2B9-004', c: 'Đa thức $2x^2 + 4x$ phân tích thành nhân tử được:', a: '$2x(x+2)$', s: 'Đặt $2x$ làm nhân tử chung: $2x(x+2)$.', d: 'thong_hieu', o: ['$2x(x+4)$', '$x(2x+4)$', '$2(x^2+2x)$', '$2x(x+2)$'] },
        { q: 'T8-C2B9-005', c: 'Phân tích đa thức $x^2 - 2x + 1 - y^2$ thành nhân tử:', a: '$(x - 1 - y)(x - 1 + y)$', s: '$(x^2 - 2x + 1) - y^2 = (x-1)^2 - y^2 = (x - 1 - y)(x - 1 + y)$.', d: 'van_dung', o: ['$(x - y - 1)(x + y - 1)$', '$(x - 1 - y)(x - 1 + y)$', '$(x-y)^2 - 1$', '$(x+1-y)(x+1+y)$'] }
      ]
    },
    {
      name: 'Luyện tập chung.',
      questions: [
        { q: 'T8-C2LTC-001', c: 'Đơn thức là gì?', a: 'Là biểu thức đại số chỉ gồm một số, một biến hoặc một tích giữa các số và các biến', s: 'Định nghĩa chuẩn của đơn thức.', d: 'nhan_biet', o: ['Là biểu thức đại số có chứa phép cộng', 'Là biểu thức đại số chỉ gồm một số, một biến hoặc một tích giữa các số và các biến', 'Là biểu thức chỉ chứa số', 'Là biểu thức chỉ chứa biến'] },
        { q: 'T8-C2LTC-002', c: 'Kết quả của phép nhân $(x-y)(x+y)$ là:', a: '$x^2 - y^2$', s: 'Hằng đẳng thức hiệu hai bình phương.', d: 'thong_hieu', o: ['$x^2 + y^2$', '$(x-y)^2$', '$x^2 - y^2$', '$x^2 - 2xy + y^2$'] },
        { q: 'T8-C2LTC-003', c: 'Bậc của đơn thức $5x^2y^3$ là bao nhiêu?', a: '$5$', s: 'Tổng số mũ của các biến là $2 + 3 = 5$.', d: 'thong_hieu', o: ['$2$', '$3$', '$5$', '$6$'] },
        { q: 'T8-C2LTC-004', c: 'Phân tích đa thức $x^3 - 4x$ thành nhân tử ta được:', a: '$x(x-2)(x+2)$', s: '$x(x^2 - 4) = x(x-2)(x+2)$.', d: 'thong_hieu', o: ['$x(x-4)$', '$x(x^2-4)$', '$x(x-2)(x+2)$', '$(x-2)^3$'] },
        { q: 'T8-C2LTC-005', c: 'Tìm $x$ biết $x^2 - 9 = 0$:', a: '$x = 3$ hoặc $x = -3$', s: '$x^2 - 9 = (x-3)(x+3) = 0 \\Rightarrow x=3$ hoặc $x=-3$.', d: 'van_dung', o: ['$x = 3$', '$x = -3$', '$x = 9$', '$x = 3$ hoặc $x = -3$'] }
      ]
    },
    {
      name: 'Bài tập cuối chương II.',
      questions: [
        { q: 'T8-C2OT-001', c: 'Khẳng định nào sau đây là SAI?', a: '$(A-B)^2 = A^2 - B^2$', s: '$(A-B)^2 = A^2 - 2AB + B^2$. Khẳng định $(A-B)^2 = A^2 - B^2$ là sai.', d: 'nhan_biet', o: ['$(A+B)^2 = A^2 + 2AB + B^2$', '$(A-B)^2 = A^2 - B^2$', '$(A-B)(A+B) = A^2 - B^2$', '$(A+B)^3 = A^3 + 3A^2B + 3AB^2 + B^3$'] },
        { q: 'T8-C2OT-002', c: 'Khai triển $(x+2)^2$ ta được kết quả là:', a: '$x^2 + 4x + 4$', s: '$(x+2)^2 = x^2 + 2\\cdot x \\cdot 2 + 2^2 = x^2 + 4x + 4$.', d: 'thong_hieu', o: ['$x^2 + 2x + 4$', '$x^2 + 4x + 4$', '$x^2 + 4$', '$x^2 - 4x + 4$'] },
        { q: 'T8-C2OT-003', c: 'Rút gọn biểu thức $(x+1)^2 - (x-1)^2$ ta được:', a: '$4x$', s: '$(x^2+2x+1) - (x^2-2x+1) = 4x$. Hoặc $(x+1-x+1)(x+1+x-1) = 2(2x) = 4x$.', d: 'thong_hieu', o: ['$2x^2 + 2$', '$4x$', '$2x$', '$0$'] },
        { q: 'T8-C2OT-004', c: 'Phân tích đa thức $x^2 + 6x + 9$ thành nhân tử:', a: '$(x+3)^2$', s: 'Đây là hằng đẳng thức bình phương của một tổng: $x^2 + 2\\cdot x \\cdot 3 + 3^2 = (x+3)^2$.', d: 'thong_hieu', o: ['$(x+3)(x-3)$', '$(x+3)^2$', '$(x-3)^2$', '$(x+9)^2$'] },
        { q: 'T8-C2OT-005', c: 'Tính nhanh $101^2$ ta được:', a: '$10201$', s: '$(100+1)^2 = 100^2 + 2\\cdot 100 \\cdot 1 + 1 = 10000 + 200 + 1 = 10201$.', d: 'van_dung', o: ['$10100$', '$10001$', '$10201$', '$10200$'] }
      ]
    }
  ];

  for (const topic of topics) {
    const cats = await sql`SELECT id, name FROM public.categories WHERE name ILIKE ${'%' + topic.name + '%'} AND grade = 8 LIMIT 1`;
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
            ${q.d}, 'trac_nghiem', ${JSON.stringify(q.o)}::jsonb, ${q.a}, 'approved', 8, ${cats[0].name}, ${defaultUserId}
          )
        `;
        console.log(`Đã chèn: ${q.q}`);
      } else {
        console.log(`Bỏ qua: ${q.q}`);
      }
      await new Promise(r => setTimeout(r, 500));
    }
  }
  
  console.log('\n✅ Hoàn thành Batch 1 Lớp 8');
}

insertGrade8Batch1().catch(console.error);
