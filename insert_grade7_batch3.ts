import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);

async function insertGrade7Batch3() {
  console.log('Khởi tạo kết nối CSDL...');
  
  const users = await sql`SELECT user_id FROM public.questions WHERE user_id IS NOT NULL LIMIT 1`;
  const defaultUserId = users.length > 0 ? users[0].user_id : '00000000-0000-0000-0000-000000000000';

  const topics = [
    {
      name: 'Bài 20. Tỉ lệ thức.',
      questions: [
        { q: 'T7-C6B20-001', c: 'Tỉ lệ thức là gì?', a: 'Đẳng thức của hai tỉ số', s: 'Tỉ lệ thức là đẳng thức của hai tỉ số $\\frac{a}{b} = \\frac{c}{d}$.', d: 'nhan_biet', o: ['Một tổng của hai tỉ số', 'Đẳng thức của hai tỉ số', 'Một hiệu của hai tỉ số', 'Tích của hai tỉ số'] },
        { q: 'T7-C6B20-002', c: 'Từ tỉ lệ thức $\\frac{a}{b} = \\frac{c}{d}$ ta suy ra được đẳng thức nào sau đây?', a: '$a \\cdot d = b \\cdot c$', s: 'Tính chất cơ bản của tỉ lệ thức (tích chéo).', d: 'nhan_biet', o: ['$a \\cdot b = c \\cdot d$', '$a \\cdot c = b \\cdot d$', '$a \\cdot d = b \\cdot c$', '$a + d = b + c$'] },
        { q: 'T7-C6B20-003', c: 'Các cặp tỉ số nào sau đây lập thành một tỉ lệ thức?', a: '$\\frac{2}{3}$ và $\\frac{4}{6}$', s: 'Vì $\\frac{4}{6}$ rút gọn bằng $\\frac{2}{3}$.', d: 'thong_hieu', o: ['$\\frac{1}{2}$ và $\\frac{2}{3}$', '$\\frac{2}{3}$ và $\\frac{4}{6}$', '$\\frac{3}{5}$ và $\\frac{5}{3}$', '$\\frac{1}{4}$ và $\\frac{2}{5}$'] },
        { q: 'T7-C6B20-004', c: 'Tìm $x$ trong tỉ lệ thức $\\frac{x}{4} = \\frac{3}{2}$:', a: '$x = 6$', s: 'Nhân chéo: $2 \\cdot x = 4 \\cdot 3 = 12 \\Rightarrow x = 6$.', d: 'thong_hieu', o: ['$x = 3$', '$x = 6$', '$x = 8$', '$x = 2$'] },
        { q: 'T7-C6B20-005', c: 'Cho tỉ lệ thức $\\frac{x}{y} = \\frac{3}{5}$ và $y = 15$. Tính $x$?', a: '$x = 9$', s: 'Thay $y = 15$ vào: $\\frac{x}{15} = \\frac{3}{5} \\Rightarrow x = \\frac{15 \\cdot 3}{5} = 9$.', d: 'van_dung', o: ['$x = 9$', '$x = 10$', '$x = 12$', '$x = 6$'] }
      ]
    },
    {
      name: 'Bài 21. Tính chất của dãy tỉ số bằng nhau.',
      questions: [
        { q: 'T7-C6B21-001', c: 'Tính chất dãy tỉ số bằng nhau phát biểu rằng từ $\\frac{a}{b} = \\frac{c}{d}$ ta suy ra điều gì?', a: '$\\frac{a}{b} = \\frac{c}{d} = \\frac{a+c}{b+d}$', s: 'Theo tính chất dãy tỉ số bằng nhau: $\\frac{a}{b} = \\frac{c}{d} = \\frac{a \\pm c}{b \\pm d}$.', d: 'nhan_biet', o: ['$\\frac{a}{b} = \\frac{c}{d} = \\frac{a \\cdot c}{b \\cdot d}$', '$\\frac{a}{b} = \\frac{c}{d} = \\frac{a+c}{b+d}$', '$\\frac{a}{b} = \\frac{c}{d} = a+b+c+d$', '$\\frac{a}{b} = \\frac{c}{d} = \\frac{a+b}{c+d}$'] },
        { q: 'T7-C6B21-002', c: 'Từ dãy tỉ số $\\frac{x}{2} = \\frac{y}{3}$ áp dụng tính chất dãy tỉ số bằng nhau ta có thể tạo ra tỉ số nào?', a: '$\\frac{x+y}{2+3}$', s: 'Áp dụng tính chất, ta có $\\frac{x}{2} = \\frac{y}{3} = \\frac{x+y}{2+3}$.', d: 'nhan_biet', o: ['$\\frac{x \\cdot y}{2 \\cdot 3}$', '$\\frac{x+y}{2+3}$', '$\\frac{x+2}{y+3}$', '$\\frac{x-y}{2+3}$'] },
        { q: 'T7-C6B21-003', c: 'Tìm $x, y$ biết $\\frac{x}{3} = \\frac{y}{4}$ và $x + y = 14$:', a: '$x = 6, y = 8$', s: '$\\frac{x}{3} = \\frac{y}{4} = \\frac{x+y}{3+4} = \\frac{14}{7} = 2$. Do đó $x = 3 \\cdot 2 = 6, y = 4 \\cdot 2 = 8$.', d: 'thong_hieu', o: ['$x = 8, y = 6$', '$x = 3, y = 11$', '$x = 6, y = 8$', '$x = 7, y = 7$'] },
        { q: 'T7-C6B21-004', c: 'Tìm $a, b$ biết $\\frac{a}{5} = \\frac{b}{2}$ và $a - b = 6$:', a: '$a = 10, b = 4$', s: '$\\frac{a}{5} = \\frac{b}{2} = \\frac{a-b}{5-2} = \\frac{6}{3} = 2$. Suy ra $a=10, b=4$.', d: 'thong_hieu', o: ['$a = 12, b = 6$', '$a = 10, b = 4$', '$a = 5, b = -1$', '$a = 8, b = 2$'] },
        { q: 'T7-C6B21-005', c: 'Số học sinh $3$ lớp 7A, 7B, 7C tỉ lệ thuận với $8; 9; 10$. Tổng số học sinh của ba lớp là $108$. Lớp 7B có bao nhiêu học sinh?', a: '$36$ học sinh', s: 'Gọi số HS 3 lớp là $a,b,c$. $\\frac{a}{8} = \\frac{b}{9} = \\frac{c}{10} = \\frac{108}{27} = 4$. Vậy $b = 9 \\cdot 4 = 36$.', d: 'van_dung', o: ['$32$ học sinh', '$36$ học sinh', '$40$ học sinh', '$45$ học sinh'] }
      ]
    },
    {
      name: 'Bài 22. Đại lượng tỉ lệ thuận.',
      questions: [
        { q: 'T7-C6B22-001', c: 'Hai đại lượng $y$ và $x$ tỉ lệ thuận với nhau nếu liên hệ với nhau bởi công thức nào?', a: '$y = kx$ ($k \\neq 0$)', s: 'Định nghĩa đại lượng tỉ lệ thuận.', d: 'nhan_biet', o: ['$y = \\frac{k}{x}$', '$y = x + k$', '$y = kx$ ($k \\neq 0$)', '$y = x^k$'] },
        { q: 'T7-C6B22-002', c: 'Nếu $y$ tỉ lệ thuận với $x$ theo hệ số tỉ lệ $k$ thì $x$ tỉ lệ thuận với $y$ theo hệ số tỉ lệ nào?', a: '$\\frac{1}{k}$', s: 'Vì $y = kx$ suy ra $x = \\frac{1}{k} y$.', d: 'nhan_biet', o: ['$-k$', '$k$', '$\\frac{1}{k}$', '$1-k$'] },
        { q: 'T7-C6B22-003', c: 'Cho $y = 3x$. Khi $x=2$ thì $y$ bằng:', a: '$6$', s: 'Thay $x=2$ vào ta có $y = 3 \\cdot 2 = 6$.', d: 'thong_hieu', o: ['$3$', '$5$', '$6$', '$1.5$'] },
        { q: 'T7-C6B22-004', c: 'Biết $x$ và $y$ tỉ lệ thuận. Khi $x=4$ thì $y=12$. Hệ số tỉ lệ của $y$ đối với $x$ là:', a: '$3$', s: 'Hệ số tỉ lệ $k = \\frac{y}{x} = \\frac{12}{4} = 3$.', d: 'thong_hieu', o: ['$3$', '$4$', '$\\frac{1}{3}$', '$48$'] },
        { q: 'T7-C6B22-005', c: 'Một xưởng may, $5$ công nhân (năng suất như nhau) may được $20$ áo trong một ngày. Hỏi $8$ công nhân may được bao nhiêu áo trong một ngày?', a: '$32$ áo', s: 'Số công nhân và số áo là hai đại lượng tỉ lệ thuận. 1 công nhân may được $20/5 = 4$ áo. 8 công nhân may được $8 \\times 4 = 32$ áo.', d: 'van_dung', o: ['$24$ áo', '$32$ áo', '$40$ áo', '$28$ áo'] }
      ]
    },
    {
      name: 'Bài 23. Đại lượng tỉ lệ nghịch.',
      questions: [
        { q: 'T7-C6B23-001', c: 'Hai đại lượng $y$ và $x$ tỉ lệ nghịch với nhau nếu liên hệ với nhau bởi công thức nào?', a: '$y = \\frac{a}{x}$ ($a \\neq 0$)', s: 'Định nghĩa đại lượng tỉ lệ nghịch.', d: 'nhan_biet', o: ['$y = ax$', '$y = \\frac{a}{x}$ ($a \\neq 0$)', '$y = x + a$', '$y = a - x$'] },
        { q: 'T7-C6B23-002', c: 'Tính chất đặc trưng của hai đại lượng $x$ và $y$ tỉ lệ nghịch là:', a: 'Tích hai giá trị tương ứng luôn không đổi ($x \\cdot y = a$)', s: 'Trong tỉ lệ nghịch, tích $x \\cdot y$ luôn bằng hằng số $a$.', d: 'nhan_biet', o: ['Thương hai giá trị tương ứng luôn không đổi', 'Tổng hai giá trị tương ứng luôn không đổi', 'Tích hai giá trị tương ứng luôn không đổi ($x \\cdot y = a$)', 'Hiệu hai giá trị tương ứng luôn không đổi'] },
        { q: 'T7-C6B23-003', c: 'Biết $y$ tỉ lệ nghịch với $x$ theo hệ số $a=12$. Khi $x=3$ thì $y$ bằng:', a: '$4$', s: '$y = \\frac{12}{3} = 4$.', d: 'thong_hieu', o: ['$36$', '$4$', '$15$', '$9$'] },
        { q: 'T7-C6B23-004', c: 'Biết $x, y$ tỉ lệ nghịch. Khi $x=2$ thì $y=10$. Khi $x=5$ thì $y$ bằng bao nhiêu?', a: '$4$', s: 'Hệ số tỉ lệ $a = x \\cdot y = 2 \\cdot 10 = 20$. Khi $x=5$ thì $y = \\frac{20}{5} = 4$.', d: 'thong_hieu', o: ['$4$', '$25$', '$2$', '$20$'] },
        { q: 'T7-C6B23-005', c: '$4$ người thợ (năng suất như nhau) xây xong một ngôi nhà trong $15$ ngày. Nếu có $6$ người thợ thì xây xong ngôi nhà đó trong bao nhiêu ngày?', a: '$10$ ngày', s: 'Số thợ và số ngày là hai đại lượng tỉ lệ nghịch. $a = 4 \\cdot 15 = 60$. Với 6 thợ: $y = 60 : 6 = 10$ ngày.', d: 'van_dung', o: ['$12$ ngày', '$10$ ngày', '$8$ ngày', '$22.5$ ngày'] }
      ]
    },
    {
      name: 'Bài tập cuối chương VI.',
      questions: [
        { q: 'T7-C6OT-001', c: 'Từ đẳng thức $2 \\cdot 6 = 3 \\cdot 4$, ta lập được tỉ lệ thức nào sau đây?', a: '$\\frac{2}{3} = \\frac{4}{6}$', s: 'Từ $ad=bc$, ta có $\\frac{a}{b} = \\frac{c}{d}$ hay $\\frac{2}{3} = \\frac{4}{6}$.', d: 'nhan_biet', o: ['$\\frac{2}{4} = \\frac{6}{3}$', '$\\frac{2}{3} = \\frac{4}{6}$', '$\\frac{3}{2} = \\frac{4}{6}$', '$\\frac{6}{4} = \\frac{2}{3}$'] },
        { q: 'T7-C6OT-002', c: 'Tìm $x > 0$ biết $\\frac{x}{2} = \\frac{18}{x}$:', a: '$x = 6$', s: 'Nhân chéo: $x^2 = 36 \\Rightarrow x = 6$ (vì $x > 0$).', d: 'thong_hieu', o: ['$x = 9$', '$x = 6$', '$x = 36$', '$x = -6$'] },
        { q: 'T7-C6OT-003', c: 'Cho $x, y$ tỉ lệ thuận, khi $x=5$ thì $y=-10$. Công thức liên hệ là:', a: '$y = -2x$', s: 'Hệ số tỉ lệ $k = \\frac{-10}{5} = -2 \\Rightarrow y = -2x$.', d: 'thong_hieu', o: ['$y = 2x$', '$y = -2x$', '$y = \\frac{-50}{x}$', '$x = -2y$'] },
        { q: 'T7-C6OT-004', c: 'Nếu $y$ tỉ lệ nghịch với $x$ theo hệ số tỉ lệ $-6$. Khi $x=-2$ thì $y$ là:', a: '$3$', s: '$y = \\frac{-6}{-2} = 3$.', d: 'thong_hieu', o: ['$12$', '$3$', '$-3$', '$\\frac{1}{3}$'] },
        { q: 'T7-C6OT-005', c: 'Chia số $150$ thành $3$ phần tỉ lệ thuận với $2; 3; 5$. Phần lớn nhất có giá trị là:', a: '$75$', s: 'Gọi 3 phần là $a,b,c$. $\\frac{a}{2} = \\frac{b}{3} = \\frac{c}{5} = \\frac{150}{10} = 15$. Phần lớn nhất $c = 5 \\times 15 = 75$.', d: 'van_dung', o: ['$30$', '$45$', '$50$', '$75$'] }
      ]
    },
    {
      name: 'Bài 24. Biểu thức đại số.',
      questions: [
        { q: 'T7-C7B24-001', c: 'Biểu thức đại số là biểu thức bao gồm những gì?', a: 'Các số, các biến và các phép toán', s: 'Biểu thức đại số chứa các số, biến và phép toán (cộng, trừ, nhân, chia, lũy thừa).', d: 'nhan_biet', o: ['Chỉ gồm các số', 'Chỉ gồm các biến', 'Các số, các biến và các phép toán', 'Chỉ gồm các phép toán'] },
        { q: 'T7-C7B24-002', c: 'Biểu thức đại số biểu thị chu vi của một hình chữ nhật có chiều dài $a$ và chiều rộng $b$ là:', a: '$2(a+b)$', s: 'Chu vi = (dài + rộng) $\\times 2 = 2(a+b)$.', d: 'nhan_biet', o: ['$a \\cdot b$', '$2(a+b)$', '$a+b$', '$2ab$'] },
        { q: 'T7-C7B24-003', c: 'Giá trị của biểu thức $A = 2x + 1$ tại $x=3$ là:', a: '$7$', s: 'Thay $x=3$ vào ta được $2 \\times 3 + 1 = 7$.', d: 'thong_hieu', o: ['$5$', '$6$', '$7$', '$8$'] },
        { q: 'T7-C7B24-004', c: 'Biểu thức biểu thị quãng đường đi được trong thời gian $t$ với vận tốc $v$ là:', a: '$v \\cdot t$', s: 'Quãng đường $S = v \\cdot t$.', d: 'thong_hieu', o: ['$v + t$', '$\\frac{v}{t}$', '$v \\cdot t$', '$\\frac{t}{v}$'] },
        { q: 'T7-C7B24-005', c: 'Tính giá trị của biểu thức $x^2 - 2xy + y^2$ tại $x=3, y=1$:', a: '$4$', s: '$3^2 - 2 \\cdot 3 \\cdot 1 + 1^2 = 9 - 6 + 1 = 4$.', d: 'van_dung', o: ['$2$', '$4$', '$16$', '$-4$'] }
      ]
    },
    {
      name: 'Bài 25. Đa thức một biến.',
      questions: [
        { q: 'T7-C7B25-001', c: 'Đa thức một biến là gì?', a: 'Tổng của những đơn thức của cùng một biến', s: 'Định nghĩa đa thức một biến.', d: 'nhan_biet', o: ['Tích của những đơn thức của cùng một biến', 'Tổng của những đơn thức của nhiều biến khác nhau', 'Tổng của những đơn thức của cùng một biến', 'Hiệu của các biến số'] },
        { q: 'T7-C7B25-002', c: 'Bậc của đa thức một biến (thu gọn, khác đa thức $0$) là gì?', a: 'Số mũ lớn nhất của biến trong đa thức đó', s: 'Bậc của đa thức một biến là số mũ cao nhất của biến.', d: 'nhan_biet', o: ['Số mũ nhỏ nhất của biến', 'Số mũ lớn nhất của biến trong đa thức đó', 'Hệ số lớn nhất trong đa thức', 'Số hạng tử của đa thức'] },
        { q: 'T7-C7B25-003', c: 'Bậc của đa thức $P(x) = 3x^4 - 2x^2 + 5$ là:', a: '$4$', s: 'Số mũ lớn nhất là $4$.', d: 'thong_hieu', o: ['$2$', '$3$', '$4$', '$5$'] },
        { q: 'T7-C7B25-004', c: 'Hệ số tự do của đa thức $Q(x) = x^3 - 4x + 7$ là:', a: '$7$', s: 'Hạng tử không chứa biến $x$ (hoặc $x^0$) là $7$.', d: 'thong_hieu', o: ['$1$', '$-4$', '$3$', '$7$'] },
        { q: 'T7-C7B25-005', c: 'Tìm nghiệm của đa thức $P(x) = 2x - 6$:', a: '$x = 3$', s: '$P(x) = 0 \\Rightarrow 2x - 6 = 0 \\Rightarrow x = 3$.', d: 'van_dung', o: ['$x = 3$', '$x = -3$', '$x = 6$', '$x = 2$'] }
      ]
    },
    {
      name: 'Bài 26. Phép cộng và phép trừ đa thức một biến.',
      questions: [
        { q: 'T7-C7B26-001', c: 'Để cộng, trừ hai đa thức một biến, ta thực hiện cộng, trừ các hạng tử nào?', a: 'Cộng, trừ các hệ số của các hạng tử cùng bậc', s: 'Quy tắc: Nhóm hạng tử cùng bậc rồi cộng/trừ hệ số.', d: 'nhan_biet', o: ['Cộng, trừ tất cả các hệ số với nhau', 'Cộng, trừ các số mũ với nhau', 'Cộng, trừ các hệ số của các hạng tử cùng bậc', 'Nhân các hệ số với nhau'] },
        { q: 'T7-C7B26-002', c: 'Khi bỏ dấu ngoặc có dấu trừ đằng trước để trừ đa thức, ta phải làm gì?', a: 'Đổi dấu tất cả các hạng tử trong ngoặc', s: 'Quy tắc bỏ dấu ngoặc có dấu trừ.', d: 'nhan_biet', o: ['Giữ nguyên dấu tất cả các hạng tử', 'Đổi dấu tất cả các hạng tử trong ngoặc', 'Chỉ đổi dấu hạng tử đầu tiên', 'Bỏ đi hạng tử cuối cùng'] },
        { q: 'T7-C7B26-003', c: 'Cho $A(x) = 2x+1$ và $B(x) = x-3$. Tổng $A(x) + B(x)$ bằng:', a: '$3x - 2$', s: '$(2x+x) + (1-3) = 3x - 2$.', d: 'thong_hieu', o: ['$3x + 2$', '$3x - 4$', '$3x - 2$', '$x + 4$'] },
        { q: 'T7-C7B26-004', c: 'Cho $P(x) = x^2 + x$ và $Q(x) = x^2 - x$. Hiệu $P(x) - Q(x)$ bằng:', a: '$2x$', s: '$(x^2+x) - (x^2-x) = x^2 + x - x^2 + x = 2x$.', d: 'thong_hieu', o: ['$0$', '$2x$', '$2x^2$', '$-2x$'] },
        { q: 'T7-C7B26-005', c: 'Tính $A(x) + B(x)$ biết $A(x) = 3x^2 - 4x + 1, B(x) = -3x^2 + 5x - 2$:', a: '$x - 1$', s: '$(3x^2 - 3x^2) + (-4x + 5x) + (1 - 2) = x - 1$.', d: 'van_dung', o: ['$x - 1$', '$6x^2 - 9x + 3$', '$-x + 1$', '$x + 1$'] }
      ]
    },
    {
      name: 'Bài 27. Phép nhân đa thức một biến.',
      questions: [
        { q: 'T7-C7B27-001', c: 'Khi nhân đơn thức $ax^m$ với đơn thức $bx^n$ ta được kết quả là:', a: '$(a \\cdot b)x^{m+n}$', s: 'Nhân hệ số với hệ số, luỹ thừa biến với luỹ thừa biến.', d: 'nhan_biet', o: ['$(a+b)x^{m \\cdot n}$', '$(a \\cdot b)x^{m+n}$', '$(a \\cdot b)x^{m-n}$', '$(a+b)x^{m+n}$'] },
        { q: 'T7-C7B27-002', c: 'Nhân một đơn thức với một đa thức ta áp dụng tính chất nào?', a: 'Phân phối của phép nhân đối với phép cộng', s: 'Nhân đơn thức với từng hạng tử của đa thức rồi cộng lại.', d: 'nhan_biet', o: ['Giao hoán của phép nhân', 'Kết hợp của phép nhân', 'Phân phối của phép nhân đối với phép cộng', 'Giao hoán của phép cộng'] },
        { q: 'T7-C7B27-003', c: 'Tích của $2x$ và $(x^2 - 3)$ là:', a: '$2x^3 - 6x$', s: '$2x \\cdot x^2 - 2x \\cdot 3 = 2x^3 - 6x$.', d: 'thong_hieu', o: ['$2x^3 - 3$', '$2x^3 - 6x$', '$2x^2 - 6x$', '$x^3 - 6x$'] },
        { q: 'T7-C7B27-004', c: 'Kết quả của phép nhân đa thức $(x - 1)(x + 2)$ là:', a: '$x^2 + x - 2$', s: '$x(x) + x(2) - 1(x) - 1(2) = x^2 + 2x - x - 2 = x^2 + x - 2$.', d: 'thong_hieu', o: ['$x^2 - 2$', '$x^2 + 2x - 2$', '$x^2 + x - 2$', '$x^2 - x - 2$'] },
        { q: 'T7-C7B27-005', c: 'Rút gọn biểu thức $x(x - 2) - x^2 + 3x$ ta được:', a: '$x$', s: '$x^2 - 2x - x^2 + 3x = x$.', d: 'van_dung', o: ['$x$', '$5x$', '$-x$', '$2x^2 + x$'] }
      ]
    },
    {
      name: 'Bài 28. Phép chia đa thức một biến.',
      questions: [
        { q: 'T7-C7B28-001', c: 'Đơn thức $A$ chia hết cho đơn thức $B$ (khác $0$) nếu:', a: 'Bậc của biến trong $B$ nhỏ hơn hoặc bằng bậc của biến đó trong $A$', s: 'Quy tắc chia đơn thức cho đơn thức.', d: 'nhan_biet', o: ['Bậc của $B$ lớn hơn bậc của $A$', 'Bậc của biến trong $B$ nhỏ hơn hoặc bằng bậc của biến đó trong $A$', 'Hệ số của $B$ chia hết cho hệ số của $A$', 'Hai đơn thức có cùng hệ số'] },
        { q: 'T7-C7B28-002', c: 'Khi chia $x^m$ cho $x^n$ ($m \\ge n > 0$), kết quả là:', a: '$x^{m-n}$', s: 'Quy tắc chia hai luỹ thừa cùng cơ số.', d: 'nhan_biet', o: ['$x^{m+n}$', '$x^{m-n}$', '$x^{m \\cdot n}$', '$x^{m:n}$'] },
        { q: 'T7-C7B28-003', c: 'Chia đơn thức $6x^4$ cho $2x^2$ được kết quả là:', a: '$3x^2$', s: '$(6:2) x^{4-2} = 3x^2$.', d: 'thong_hieu', o: ['$3x^6$', '$4x^2$', '$3x^2$', '$12x^6$'] },
        { q: 'T7-C7B28-004', c: 'Kết quả phép chia đa thức $(4x^3 - 2x^2)$ cho $2x^2$ là:', a: '$2x - 1$', s: '$(4x^3 : 2x^2) - (2x^2 : 2x^2) = 2x - 1$.', d: 'thong_hieu', o: ['$2x - 2$', '$2x - 1$', '$2x^2 - 1$', '$2x$'] },
        { q: 'T7-C7B28-005', c: 'Chia đa thức $x^2 - 4x + 3$ cho $x - 1$ được thương là:', a: '$x - 3$', s: 'Ta có $x^2 - 4x + 3 = (x-1)(x-3)$. Nên chia cho $(x-1)$ được $(x-3)$.', d: 'van_dung', o: ['$x + 3$', '$x - 3$', '$x - 1$', '$x + 1$'] }
      ]
    },
    {
      name: 'Bài tập cuối chương VII.',
      questions: [
        { q: 'T7-C7OT-001', c: 'Đa thức $P(x) = x - 5$ có bậc là:', a: '$1$', s: 'Mũ cao nhất của $x$ là $1$.', d: 'nhan_biet', o: ['$0$', '$1$', '$2$', '$5$'] },
        { q: 'T7-C7OT-002', c: 'Nghiệm của đa thức $P(x) = 3x + 9$ là:', a: '$x = -3$', s: '$3x + 9 = 0 \\Rightarrow 3x = -9 \\Rightarrow x = -3$.', d: 'thong_hieu', o: ['$x = 3$', '$x = -3$', '$x = 9$', '$x = -9$'] },
        { q: 'T7-C7OT-003', c: 'Rút gọn biểu thức $(x+2)(x-2)$ ta được:', a: '$x^2 - 4$', s: '$(x+2)(x-2) = x^2 - 2x + 2x - 4 = x^2 - 4$.', d: 'thong_hieu', o: ['$x^2 - 4$', '$x^2 + 4$', '$x^2 - 4x$', '$x^2 + 4x$'] },
        { q: 'T7-C7OT-004', c: 'Phép chia $(x^3 - 8) : (x-2)$ là phép chia như thế nào?', a: 'Phép chia hết', s: 'Đa thức $x^3-8$ có nghiệm $x=2$ nên chia hết cho $x-2$.', d: 'thong_hieu', o: ['Phép chia hết', 'Phép chia có dư $1$', 'Phép chia có dư $2$', 'Phép chia có dư $8$'] },
        { q: 'T7-C7OT-005', c: 'Tìm đa thức $A(x)$ biết $A(x) + (x^2 - 3x) = 2x^2 + x - 1$:', a: '$A(x) = x^2 + 4x - 1$', s: '$A(x) = (2x^2 + x - 1) - (x^2 - 3x) = 2x^2 + x - 1 - x^2 + 3x = x^2 + 4x - 1$.', d: 'van_dung', o: ['$A(x) = 3x^2 - 2x - 1$', '$A(x) = x^2 - 2x - 1$', '$A(x) = x^2 + 4x - 1$', '$A(x) = -x^2 - 4x + 1$'] }
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
  
  console.log('\n✅ Hoàn thành Batch 3 Lớp 7');
}

insertGrade7Batch3().catch(console.error);
