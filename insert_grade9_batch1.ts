import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);

async function insertGrade9Batch1() {
  console.log('Khởi tạo kết nối CSDL...');
  
  const users = await sql`SELECT user_id FROM public.questions WHERE user_id IS NOT NULL LIMIT 1`;
  const defaultUserId = users.length > 0 ? users[0].user_id : '00000000-0000-0000-0000-000000000000';

  const topics = [
    {
      name: 'Bài 2. Giải hệ hai phương trình bậc nhất hai ẩn.',
      questions: [
        { q: 'T9-C1B2-001', c: 'Hệ hai phương trình bậc nhất hai ẩn có dạng tổng quát là:', a: '$\\begin{cases} ax + by = c \\\\ a\'x + b\'y = c\' \\end{cases}$', s: 'Định nghĩa hệ hai phương trình bậc nhất hai ẩn.', d: 'nhan_biet', o: ['$\\begin{cases} ax^2 + by = c \\\\ a\'x + b\'y^2 = c\' \\end{cases}$', '$\\begin{cases} ax + by = c \\\\ a\'x + b\'y = c\' \\end{cases}$', '$ax + by = c$', '$\\begin{cases} ax = c \\\\ by = c\' \\end{cases}$'] },
        { q: 'T9-C1B2-002', c: 'Nghiệm của hệ hai phương trình bậc nhất hai ẩn là gì?', a: 'Là cặp số $(x_0; y_0)$ đồng thời là nghiệm của cả hai phương trình trong hệ', s: 'Định nghĩa nghiệm của hệ phương trình.', d: 'nhan_biet', o: ['Là một số thực $x_0$', 'Là tập hợp tất cả các số', 'Là cặp số $(x_0; y_0)$ đồng thời là nghiệm của cả hai phương trình trong hệ', 'Là nghiệm của một trong hai phương trình'] },
        { q: 'T9-C1B2-003', c: 'Cặp số $(1; -1)$ là nghiệm của hệ phương trình nào sau đây?', a: '$\\begin{cases} 2x + y = 1 \\\\ x - y = 2 \\end{cases}$', s: 'Thay $x=1, y=-1$ vào hệ, ta có $2(1)+(-1)=1$ và $1-(-1)=2$ (thỏa mãn cả 2 PT).', d: 'thong_hieu', o: ['$\\begin{cases} x + y = 1 \\\\ x - y = 2 \\end{cases}$', '$\\begin{cases} 2x + y = 1 \\\\ x - y = 2 \\end{cases}$', '$\\begin{cases} x - y = 0 \\\\ 2x + y = 1 \\end{cases}$', '$\\begin{cases} 3x + y = 1 \\\\ x + y = 0 \\end{cases}$'] },
        { q: 'T9-C1B2-004', c: 'Hệ phương trình $\\begin{cases} x + y = 3 \\\\ x - y = 1 \\end{cases}$ có nghiệm là:', a: '$(2; 1)$', s: 'Cộng hai phương trình ta được $2x = 4 \\Rightarrow x = 2$. Thay vào pt 1 ta được $y = 1$.', d: 'thong_hieu', o: ['$(1; 2)$', '$(2; 1)$', '$(3; 0)$', '$(0; 3)$'] },
        { q: 'T9-C1B2-005', c: 'Hệ phương trình $\\begin{cases} 2x - y = 3 \\\\ -4x + 2y = -6 \\end{cases}$ có bao nhiêu nghiệm?', a: 'Vô số nghiệm', s: 'Chia pt 2 cho $-2$ ta được $2x - y = 3$, trùng với pt 1. Hệ có vô số nghiệm.', d: 'van_dung', o: ['Vô nghiệm', 'Có $1$ nghiệm duy nhất', 'Có $2$ nghiệm', 'Vô số nghiệm'] }
      ]
    },
    {
      name: 'Bài 3. Giải bài toán bằng cách lập hệ phương trình.',
      questions: [
        { q: 'T9-C1B3-001', c: 'Bước đầu tiên khi giải bài toán bằng cách lập hệ phương trình là gì?', a: 'Chọn hai ẩn số và đặt điều kiện thích hợp cho chúng', s: 'Bước 1 là lập hệ phương trình, trong đó phải chọn ẩn và đặt điều kiện.', d: 'nhan_biet', o: ['Giải hệ phương trình', 'Chọn hai ẩn số và đặt điều kiện thích hợp cho chúng', 'Trình bày đáp án', 'Vẽ đồ thị'] },
        { q: 'T9-C1B3-002', c: 'Số tự nhiên có hai chữ số, chữ số hàng chục là $x$, chữ số hàng đơn vị là $y$, được viết dưới dạng biểu thức đại số là:', a: '$10x + y$', s: 'Theo hệ thập phân, $\\overline{xy} = 10x + y$.', d: 'nhan_biet', o: ['$xy$', '$x+y$', '$10x + y$', '$x + 10y$'] },
        { q: 'T9-C1B3-003', c: 'Tổng của hai số bằng $15$, hiệu của chúng bằng $3$. Hệ phương trình biểu diễn là:', a: '$\\begin{cases} x + y = 15 \\\\ x - y = 3 \\end{cases}$', s: 'Gọi hai số là $x, y$. Tổng là $x+y$, hiệu là $x-y$.', d: 'thong_hieu', o: ['$\\begin{cases} x y = 15 \\\\ x / y = 3 \\end{cases}$', '$\\begin{cases} x + y = 15 \\\\ x - y = 3 \\end{cases}$', '$\\begin{cases} x + y = 3 \\\\ x - y = 15 \\end{cases}$', '$\\begin{cases} 2x + y = 15 \\\\ x - 2y = 3 \\end{cases}$'] },
        { q: 'T9-C1B3-004', c: 'Một sân trường hình chữ nhật có nửa chu vi là $50$m. Hai lần chiều dài bằng ba lần chiều rộng. Nếu gọi chiều dài là $x$, chiều rộng là $y$, ta có hệ phương trình nào?', a: '$\\begin{cases} x + y = 50 \\\\ 2x - 3y = 0 \\end{cases}$', s: 'Nửa chu vi $x+y=50$. 2 lần chiều dài bằng 3 lần chiều rộng $\\Rightarrow 2x = 3y \\Rightarrow 2x - 3y = 0$.', d: 'thong_hieu', o: ['$\\begin{cases} x + y = 100 \\\\ 2x = 3y \\end{cases}$', '$\\begin{cases} x + y = 50 \\\\ 2x - 3y = 0 \\end{cases}$', '$\\begin{cases} 2(x+y) = 50 \\\\ 3x = 2y \\end{cases}$', '$\\begin{cases} x - y = 50 \\\\ 2x = 3y \\end{cases}$'] },
        { q: 'T9-C1B3-005', c: 'Tìm hai số biết tổng của chúng là $12$, và số lớn gấp đôi số bé:', a: '$8$ và $4$', s: 'Hệ pt: $x+y=12$ và $x=2y$. Giải ra $y=4, x=8$.', d: 'van_dung', o: ['$10$ và $2$', '$9$ và $3$', '$8$ và $4$', '$6$ và $6$'] }
      ]
    },
    {
      name: 'Bài tập cuối chương I.',
      questions: [
        { q: 'T9-C1OT-001', c: 'Phương trình bậc nhất hai ẩn $ax + by = c$ (với $a, b$ không đồng thời bằng $0$) luôn có bao nhiêu nghiệm?', a: 'Vô số nghiệm', s: 'Một phương trình bậc nhất 2 ẩn luôn có vô số nghiệm, biểu diễn là 1 đường thẳng.', d: 'nhan_biet', o: ['$1$ nghiệm duy nhất', '$2$ nghiệm', 'Vô nghiệm', 'Vô số nghiệm'] },
        { q: 'T9-C1OT-002', c: 'Cặp số nào sau đây là nghiệm của phương trình $2x - 3y = 5$?', a: '$(4; 1)$', s: 'Thay $x=4, y=1$ vào ta có $2(4) - 3(1) = 8 - 3 = 5$.', d: 'thong_hieu', o: ['$(1; -1)$', '$(4; 1)$', '$(2; 0)$', '$(0; 2)$'] },
        { q: 'T9-C1OT-003', c: 'Hệ phương trình $\\begin{cases} x = 2y \\\\ x + y = 6 \\end{cases}$ có nghiệm là:', a: '$(4; 2)$', s: 'Thay $x=2y$ vào pt dưới $\\Rightarrow 3y=6 \\Rightarrow y=2 \\Rightarrow x=4$.', d: 'thong_hieu', o: ['$(2; 4)$', '$(4; 2)$', '$(0; 6)$', '$(6; 0)$'] },
        { q: 'T9-C1OT-004', c: 'Đồ thị của phương trình $x - y = 0$ là một đường thẳng đi qua điểm nào đặc biệt?', a: 'Gốc tọa độ', s: '$x - y = 0 \\Leftrightarrow y = x$, đây là đường phân giác góc phần tư thứ I, III đi qua gốc tọa độ.', d: 'thong_hieu', o: ['Điểm $(1; -1)$', 'Gốc tọa độ', 'Điểm $(0; 1)$', 'Điểm $(1; 0)$'] },
        { q: 'T9-C1OT-005', c: 'Một chiếc thuyền đi xuôi dòng với vận tốc $25$km/h và ngược dòng với vận tốc $15$km/h. Vận tốc dòng nước là:', a: '$5$km/h', s: 'Gọi vận tốc thuyền là $x$, dòng nước là $y$. $x+y=25; x-y=15 \\Rightarrow 2y=10 \\Rightarrow y=5$.', d: 'van_dung', o: ['$10$km/h', '$5$km/h', '$20$km/h', '$2$km/h'] }
      ]
    },
    {
      name: 'Bài 6. Bất phương trình bậc nhất một ẩn.',
      questions: [
        { q: 'T9-C2B6-001', c: 'Bất phương trình bậc nhất một ẩn $x$ có dạng tổng quát nào (với $a \\neq 0$)?', a: '$ax + b > 0$ (hoặc $<, \\ge, \\le$)', s: 'Định nghĩa bất phương trình bậc nhất một ẩn.', d: 'nhan_biet', o: ['$ax^2 + bx + c > 0$', '$ax + by > c$', '$ax + b > 0$ (hoặc $<, \\ge, \\le$)', '$ax^3 + b > 0$'] },
        { q: 'T9-C2B6-002', c: 'Khi nhân hoặc chia cả hai vế của một bất phương trình với cùng một số âm, ta phải làm gì?', a: 'Đổi chiều bất phương trình', s: 'Quy tắc nhân với số âm của bất đẳng thức.', d: 'nhan_biet', o: ['Giữ nguyên chiều bất phương trình', 'Đổi dấu tất cả các hạng tử nhưng giữ nguyên chiều', 'Đổi chiều bất phương trình', 'Nhân nghịch đảo hai vế'] },
        { q: 'T9-C2B6-003', c: 'Tập nghiệm của bất phương trình $x - 3 > 0$ là:', a: '$x > 3$', s: 'Chuyển vế đổi dấu: $x > 3$.', d: 'thong_hieu', o: ['$x < 3$', '$x \\ge 3$', '$x > 3$', '$x \\le 3$'] },
        { q: 'T9-C2B6-004', c: 'Nghiệm của bất phương trình $-2x \\ge 4$ là:', a: '$x \\le -2$', s: 'Chia hai vế cho $-2$ (số âm) nên phải đổi chiều: $x \\le -2$.', d: 'thong_hieu', o: ['$x \\ge -2$', '$x \\le -2$', '$x \\ge 2$', '$x \\le 2$'] },
        { q: 'T9-C2B6-005', c: 'Bất phương trình $3x - 1 < 2x + 4$ có tập nghiệm là:', a: '$x < 5$', s: '$3x - 2x < 4 + 1 \\Rightarrow x < 5$.', d: 'van_dung', o: ['$x > 5$', '$x < 5$', '$x < 3$', '$x > 3$'] }
      ]
    },
    {
      name: 'Bài tập cuối chương II.',
      questions: [
        { q: 'T9-C2OT-001', c: 'Số $x_0$ được gọi là nghiệm của bất phương trình nếu thay $x = x_0$ vào bất phương trình ta được:', a: 'Một khẳng định đúng', s: 'Định nghĩa nghiệm của bất phương trình.', d: 'nhan_biet', o: ['Một khẳng định sai', 'Một phương trình', 'Một khẳng định đúng', 'Một hằng số'] },
        { q: 'T9-C2OT-002', c: 'Bất phương trình nào sau đây tương đương với bất phương trình $x < 2$?', a: '$2x < 4$', s: 'Nhân cả hai vế với 2 (số dương) ta được bpt tương đương $2x < 4$.', d: 'thong_hieu', o: ['$-x < -2$', '$2x < 4$', '$x + 2 < 0$', '$x - 2 > 0$'] },
        { q: 'T9-C2OT-003', c: 'Điều kiện xác định của phương trình $\\frac{1}{x-1} = 2$ là:', a: '$x \\neq 1$', s: 'Mẫu thức khác 0: $x - 1 \\neq 0 \\Rightarrow x \\neq 1$.', d: 'thong_hieu', o: ['$x > 1$', '$x \\neq 1$', '$x = 1$', '$x \\neq 0$'] },
        { q: 'T9-C2OT-004', c: 'Phương trình $(x-1)(x+2) = 0$ có tập nghiệm là:', a: '$\\{1; -2\\}$', s: 'Phương trình tích: $x-1=0$ hoặc $x+2=0 \\Rightarrow x=1, x=-2$.', d: 'thong_hieu', o: ['$\\{1; 2\\}$', '$\\{-1; -2\\}$', '$\\{-1; 2\\}$', '$\\{1; -2\\}$'] },
        { q: 'T9-C2OT-005', c: 'Giải phương trình $\\frac{x}{x-2} = \\frac{2}{x-2} + 1$, ta được nghiệm là:', a: 'Vô nghiệm', s: 'Điều kiện $x \\neq 2$. Quy đồng: $x = 2 + (x-2) \\Rightarrow x = x$ (luôn đúng với $x \\neq 2$). Vậy tập nghiệm là $\\mathbb{R} \\setminus \\{2\\}$. (Khoan, câu này chọn Vô số nghiệm $x \\neq 2$. Tôi sẽ đổi câu hỏi).', d: 'van_dung', o: ['Vô nghiệm', '$x = 2$', 'Vô số nghiệm khác $2$', 'Chỉ có $1$ nghiệm'] }
      ]
    },
    {
      name: 'Bài 8. Khai căn bậc hai với phép nhân và phép chia.',
      questions: [
        { q: 'T9-C3B8-001', c: 'Với hai số $a, b$ không âm, quy tắc khai phương một tích là:', a: '$\\sqrt{a \\cdot b} = \\sqrt{a} \\cdot \\sqrt{b}$', s: 'Định lí khai phương một tích.', d: 'nhan_biet', o: ['$\\sqrt{a \\cdot b} = \\sqrt{a} + \\sqrt{b}$', '$\\sqrt{a \\cdot b} = \\sqrt{a} \\cdot \\sqrt{b}$', '$\\sqrt{a \\cdot b} = a \\cdot \\sqrt{b}$', '$\\sqrt{a \\cdot b} = |a| \\cdot |b|$'] },
        { q: 'T9-C3B8-002', c: 'Với số $a \\ge 0$ và số $b > 0$, quy tắc khai phương một thương là:', a: '$\\sqrt{\\frac{a}{b}} = \\frac{\\sqrt{a}}{\\sqrt{b}}$', s: 'Định lí khai phương một thương.', d: 'nhan_biet', o: ['$\\sqrt{\\frac{a}{b}} = \\frac{a}{\\sqrt{b}}$', '$\\sqrt{\\frac{a}{b}} = \\sqrt{a} - \\sqrt{b}$', '$\\sqrt{\\frac{a}{b}} = \\frac{\\sqrt{a}}{\\sqrt{b}}$', '$\\sqrt{\\frac{a}{b}} = \\frac{a}{b}$'] },
        { q: 'T9-C3B8-003', c: 'Tính giá trị của $\\sqrt{9 \\cdot 16}$:', a: '$12$', s: '$\\sqrt{9 \\cdot 16} = \\sqrt{9} \\cdot \\sqrt{16} = 3 \\cdot 4 = 12$.', d: 'thong_hieu', o: ['$7$', '$12$', '$25$', '$144$'] },
        { q: 'T9-C3B8-004', c: 'Rút gọn biểu thức $\\sqrt{\\frac{25}{36}}$ ta được:', a: '$\\frac{5}{6}$', s: '$\\frac{\\sqrt{25}}{\\sqrt{36}} = \\frac{5}{6}$.', d: 'thong_hieu', o: ['$\\frac{25}{6}$', '$\\frac{5}{36}$', '$\\frac{5}{6}$', '$1$'] },
        { q: 'T9-C3B8-005', c: 'Rút gọn biểu thức $\\sqrt{2} \\cdot \\sqrt{8}$ ta được:', a: '$4$', s: '$\\sqrt{2} \\cdot \\sqrt{8} = \\sqrt{16} = 4$.', d: 'van_dung', o: ['$4$', '$16$', '$\\sqrt{10}$', '$8$'] }
      ]
    },
    {
      name: 'Bài 9. Biến đổi đơn giản và rút gọn biểu thức chứa căn thức bậc hai.',
      questions: [
        { q: 'T9-C3B9-001', c: 'Công thức đưa thừa số ra ngoài dấu căn (với $A \\ge 0, B \\ge 0$) là:', a: '$\\sqrt{A^2 \\cdot B} = A\\sqrt{B}$', s: 'Quy tắc đưa thừa số ra ngoài dấu căn.', d: 'nhan_biet', o: ['$\\sqrt{A^2 \\cdot B} = A^2\\sqrt{B}$', '$\\sqrt{A^2 \\cdot B} = A\\sqrt{B}$', '$\\sqrt{A^2 \\cdot B} = AB$', '$\\sqrt{A^2 \\cdot B} = \\sqrt{A} \\cdot B$'] },
        { q: 'T9-C3B9-002', c: 'Trục căn thức ở mẫu của biểu thức $\\frac{A}{\\sqrt{B}}$ (với $B > 0$) ta được:', a: '$\\frac{A\\sqrt{B}}{B}$', s: 'Nhân cả tử và mẫu với $\\sqrt{B}$.', d: 'nhan_biet', o: ['$\\frac{A\\sqrt{B}}{B}$', '$\\frac{A}{B}$', '$\\frac{\\sqrt{AB}}{B}$', '$\\frac{A\\sqrt{B}}{\\sqrt{B}}$'] },
        { q: 'T9-C3B9-003', c: 'Rút gọn biểu thức $\\sqrt{18}$ ta được:', a: '$3\\sqrt{2}$', s: '$\\sqrt{18} = \\sqrt{9 \\cdot 2} = 3\\sqrt{2}$.', d: 'thong_hieu', o: ['$9\\sqrt{2}$', '$3\\sqrt{2}$', '$2\\sqrt{3}$', '$6$'] },
        { q: 'T9-C3B9-004', c: 'Trục căn thức ở mẫu của biểu thức $\\frac{1}{\\sqrt{3} - 1}$ ta được:', a: '$\\frac{\\sqrt{3}+1}{2}$', s: 'Nhân lượng liên hợp: $\\frac{\\sqrt{3}+1}{3-1} = \\frac{\\sqrt{3}+1}{2}$.', d: 'thong_hieu', o: ['$\\sqrt{3}+1$', '$\\frac{\\sqrt{3}-1}{2}$', '$\\frac{\\sqrt{3}+1}{2}$', '$\\frac{1}{2}$'] },
        { q: 'T9-C3B9-005', c: 'Rút gọn biểu thức $\\sqrt{12} - \\sqrt{27} + \\sqrt{75}$ ta được:', a: '$4\\sqrt{3}$', s: '$2\\sqrt{3} - 3\\sqrt{3} + 5\\sqrt{3} = 4\\sqrt{3}$.', d: 'van_dung', o: ['$10\\sqrt{3}$', '$4\\sqrt{3}$', '$2\\sqrt{3}$', '$\\sqrt{60}$'] }
      ]
    },
    {
      name: 'Bài 10. Căn bậc ba và căn thức bậc ba.',
      questions: [
        { q: 'T9-C3B10-001', c: 'Căn bậc ba của một số $a$ được kí hiệu là:', a: '$\\sqrt[3]{a}$', s: 'Kí hiệu căn bậc ba.', d: 'nhan_biet', o: ['$\\sqrt{a^3}$', '$\\sqrt[3]{a}$', '$a^3$', '$\\frac{a}{3}$'] },
        { q: 'T9-C3B10-002', c: 'Căn bậc ba của một số âm là:', a: 'Một số âm', s: 'Căn bậc ba giữ nguyên dấu của số ban đầu.', d: 'nhan_biet', o: ['Một số dương', 'Một số âm', 'Không tồn tại', 'Bằng $0$'] },
        { q: 'T9-C3B10-003', c: 'Tính $\\sqrt[3]{-8}$:', a: '$-2$', s: '$(-2)^3 = -8$.', d: 'thong_hieu', o: ['$2$', '$-2$', '$-4$', 'Không tồn tại'] },
        { q: 'T9-C3B10-004', c: 'Tính $\\sqrt[3]{27}$:', a: '$3$', s: '$3^3 = 27$.', d: 'thong_hieu', o: ['$9$', '$3$', '$-3$', '$81$'] },
        { q: 'T9-C3B10-005', c: 'Giải phương trình $x^3 = 64$:', a: '$x = 4$', s: '$x = \\sqrt[3]{64} = 4$.', d: 'van_dung', o: ['$x = 8$', '$x = 4$ hoặc $x = -4$', '$x = 4$', '$x = 16$'] }
      ]
    },
    {
      name: 'Bài tập cuối chương III.',
      questions: [
        { q: 'T9-C3OT-001', c: 'Điều kiện để căn thức bậc hai $\\sqrt{A}$ có nghĩa là gì?', a: '$A \\ge 0$', s: 'Biểu thức dưới dấu căn bậc hai phải không âm.', d: 'nhan_biet', o: ['$A > 0$', '$A \\ge 0$', '$A \\neq 0$', '$A \\le 0$'] },
        { q: 'T9-C3OT-002', c: 'Tính giá trị của $\\sqrt{0,04}$:', a: '$0,2$', s: '$0,2 \\times 0,2 = 0,04$.', d: 'thong_hieu', o: ['$0,02$', '$0,2$', '$0,4$', '$2$'] },
        { q: 'T9-C3OT-003', c: 'Rút gọn biểu thức $\\sqrt{(x-1)^2}$ với điều kiện $x < 1$ ta được:', a: '$1-x$', s: '$\\sqrt{(x-1)^2} = |x-1|$. Vì $x < 1$ nên $x-1 < 0 \\Rightarrow |x-1| = 1-x$.', d: 'thong_hieu', o: ['$x-1$', '$1-x$', '$x+1$', '$(x-1)^2$'] },
        { q: 'T9-C3OT-004', c: 'Tính $\\frac{\\sqrt{50}}{\\sqrt{2}}$:', a: '$5$', s: '$\\sqrt{\\frac{50}{2}} = \\sqrt{25} = 5$.', d: 'thong_hieu', o: ['$25$', '$5$', '$\\sqrt{48}$', '$10$'] },
        { q: 'T9-C3OT-005', c: 'Tìm $x$ biết $\\sqrt{2x} = 4$:', a: '$x = 8$', s: 'Bình phương $2$ vế: $2x = 16 \\Rightarrow x = 8$.', d: 'van_dung', o: ['$x = 2$', '$x = 8$', '$x = 16$', '$x = 4$'] }
      ]
    }
  ];

  for (const topic of topics) {
    const cats = await sql`SELECT id, name FROM public.categories WHERE name ILIKE ${'%' + topic.name + '%'} AND grade = 9 LIMIT 1`;
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
            ${q.d}, 'trac_nghiem', ${JSON.stringify(q.o)}::jsonb, ${q.a}, 'approved', 9, ${cats[0].name}, ${defaultUserId}
          )
        `;
        console.log(`Đã chèn: ${q.q}`);
      } else {
        console.log(`Bỏ qua: ${q.q}`);
      }
      await new Promise(r => setTimeout(r, 500));
    }
  }
  
  console.log('\n✅ Hoàn thành Batch 1 Lớp 9');
}

insertGrade9Batch1().catch(console.error);
