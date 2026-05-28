import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);

async function insertGrade9Batch2() {
  console.log('Khởi tạo kết nối CSDL...');
  
  const users = await sql`SELECT user_id FROM public.questions WHERE user_id IS NOT NULL LIMIT 1`;
  const defaultUserId = users.length > 0 ? users[0].user_id : '00000000-0000-0000-0000-000000000000';

  const topics = [
    {
      name: 'Bài 12. Một số hệ thức giữa cạnh, góc trong tam giác vuông và ứng dụng.',
      questions: [
        { q: 'T9-C4B12-001', c: 'Trong tam giác $ABC$ vuông tại $A$, cạnh góc vuông $b$ được tính theo cạnh huyền $a$ và sin góc đối như thế nào?', a: '$b = a \\cdot \\sin B$', s: 'Trong tam giác vuông, mỗi cạnh góc vuông bằng cạnh huyền nhân với sin góc đối.', d: 'nhan_biet', o: ['$b = a \\cdot \\cos B$', '$b = a \\cdot \\sin B$', '$b = a \\cdot \\tan B$', '$b = a \\cdot \\cot B$'] },
        { q: 'T9-C4B12-002', c: 'Trong tam giác $ABC$ vuông tại $A$, hệ thức nào sau đây biểu diễn mối liên hệ giữa hai cạnh góc vuông?', a: '$b = c \\cdot \\tan B$', s: 'Mỗi cạnh góc vuông bằng cạnh góc vuông kia nhân với tan góc đối.', d: 'nhan_biet', o: ['$b = c \\cdot \\sin B$', '$b = c \\cdot \\cos B$', '$b = c \\cdot \\tan B$', '$b = a \\cdot \\tan B$'] },
        { q: 'T9-C4B12-003', c: 'Một tam giác vuông có cạnh huyền bằng $10$, một góc nhọn bằng $30^\\circ$. Độ dài cạnh góc vuông đối diện với góc $30^\\circ$ là:', a: '$5$', s: '$b = a \\cdot \\sin 30^\\circ = 10 \\cdot \\frac{1}{2} = 5$.', d: 'thong_hieu', o: ['$5$', '$10$', '$5\\sqrt{3}$', '$10\\sqrt{3}$'] },
        { q: 'T9-C4B12-004', c: 'Nếu biết hai cạnh góc vuông của một tam giác vuông, ta có thể tính được góc nhọn bằng tỉ số lượng giác nào?', a: '$\\tan$ hoặc $\\cot$', s: 'Vì $\\tan = \\frac{\\text{đối}}{\\text{kề}}$ và $\\cot = \\frac{\\text{kề}}{\\text{đối}}$.', d: 'thong_hieu', o: ['$\\sin$ hoặc $\\cos$', '$\\tan$ hoặc $\\cot$', 'Chỉ có $\\sin$', 'Chỉ có $\\cos$'] },
        { q: 'T9-C4B12-005', c: 'Một chiếc thang dài $3$m dựa vào tường, tạo với mặt đất một góc $60^\\circ$. Hỏi chân thang cách chân tường bao nhiêu mét?', a: '$1,5$m', s: 'Khoảng cách $d = 3 \\cdot \\cos 60^\\circ = 3 \\cdot \\frac{1}{2} = 1,5$m.', d: 'van_dung', o: ['$3$m', '$1,5$m', '$1,5\\sqrt{3}$m', '$2$m'] }
      ]
    },
    {
      name: 'Bài tập cuối chương IV.',
      questions: [
        { q: 'T9-C4OT-001', c: 'Giá trị của $\\sin 45^\\circ$ bằng bao nhiêu?', a: '$\\frac{\\sqrt{2}}{2}$', s: 'Theo bảng tỉ số lượng giác của góc đặc biệt.', d: 'nhan_biet', o: ['$\\frac{1}{2}$', '$\\frac{\\sqrt{2}}{2}$', '$\\frac{\\sqrt{3}}{2}$', '$1$'] },
        { q: 'T9-C4OT-002', c: 'Trong tam giác vuông, $\\sin$ của một góc nhọn luôn nhận giá trị trong khoảng nào?', a: '$(0; 1)$', s: 'Vì cạnh đối luôn nhỏ hơn cạnh huyền nên $\\sin < 1$ và độ dài lớn hơn $0$.', d: 'thong_hieu', o: ['$(-1; 1)$', '$(0; 1)$', '$(1; +\\infty)$', '$[0; 1]$'] },
        { q: 'T9-C4OT-003', c: 'Nếu $\\tan \\alpha = 1$ thì góc nhọn $\\alpha$ bằng bao nhiêu độ?', a: '$45^\\circ$', s: 'Theo bảng giá trị lượng giác, $\\tan 45^\\circ = 1$.', d: 'thong_hieu', o: ['$30^\\circ$', '$45^\\circ$', '$60^\\circ$', '$90^\\circ$'] },
        { q: 'T9-C4OT-004', c: 'Cho $\\Delta ABC$ vuông tại $A, AC = 3, AB = 4$. Giá trị của $\\sin B$ là:', a: '$\\frac{3}{5}$', s: 'Cạnh huyền $BC = \\sqrt{3^2+4^2} = 5$. $\\sin B = \\frac{AC}{BC} = \\frac{3}{5}$.', d: 'thong_hieu', o: ['$\\frac{4}{5}$', '$\\frac{3}{4}$', '$\\frac{3}{5}$', '$\\frac{4}{3}$'] },
        { q: 'T9-C4OT-005', c: 'Một cột cờ cao $5$m có bóng trên mặt đất dài $5$m. Góc tạo bởi tia nắng mặt trời và mặt đất là:', a: '$45^\\circ$', s: '$\\tan \\alpha = \\frac{5}{5} = 1 \\Rightarrow \\alpha = 45^\\circ$.', d: 'van_dung', o: ['$30^\\circ$', '$45^\\circ$', '$60^\\circ$', '$90^\\circ$'] }
      ]
    },
    {
      name: 'Bài 14. Cung và dây của một đường tròn.',
      questions: [
        { q: 'T9-C5B14-001', c: 'Trong một đường tròn, hai dây bằng nhau thì căng hai cung như thế nào?', a: 'Bằng nhau', s: 'Định lí liên hệ giữa cung và dây: Hai dây bằng nhau căng hai cung bằng nhau.', d: 'nhan_biet', o: ['Vuông góc', 'Bằng nhau', 'Bù nhau', 'Gấp đôi nhau'] },
        { q: 'T9-C5B14-002', c: 'Trong một đường tròn, đường kính vuông góc với một dây thì sẽ đi qua điểm nào của dây đó?', a: 'Đi qua trung điểm của dây đó', s: 'Định lí quan hệ vuông góc giữa đường kính và dây.', d: 'nhan_biet', o: ['Đi qua trung điểm của dây đó', 'Chia dây đó thành tỉ lệ $1:2$', 'Không cắt dây đó', 'Trùng với dây đó'] },
        { q: 'T9-C5B14-003', c: 'Trong một đường tròn, dây lớn hơn căng cung nhỏ như thế nào so với dây nhỏ hơn?', a: 'Căng cung lớn hơn', s: 'Định lí: Dây lớn hơn thì căng cung lớn hơn.', d: 'thong_hieu', o: ['Căng cung nhỏ hơn', 'Căng cung bằng nhau', 'Căng cung lớn hơn', 'Không có mối liên hệ'] },
        { q: 'T9-C5B14-004', c: 'Cho đường tròn tâm $O$, bán kính $R = 5$cm. Dây $AB$ dài $8$cm. Khoảng cách từ tâm $O$ đến dây $AB$ là:', a: '$3$cm', s: 'Khoảng cách $d = \\sqrt{R^2 - (AB/2)^2} = \\sqrt{5^2 - 4^2} = \\sqrt{9} = 3$cm.', d: 'thong_hieu', o: ['$3$cm', '$4$cm', '$5$cm', '$6$cm'] },
        { q: 'T9-C5B14-005', c: 'Trong một đường tròn, nếu hai dây song song với nhau thì hai cung chắn giữa hai dây đó có tính chất gì?', a: 'Bằng nhau', s: 'Tính chất: Hai cung bị chắn giữa hai dây song song thì bằng nhau.', d: 'van_dung', o: ['Vuông góc', 'Bằng nhau', 'Bù nhau', 'Kề bù'] }
      ]
    },
    {
      name: 'Bài 15. Độ dài của cung tròn. Diện tích hình quạt tròn và hình vành khuyên.',
      questions: [
        { q: 'T9-C5B15-001', c: 'Công thức tính chu vi đường tròn bán kính $R$ là:', a: '$C = 2\\pi R$', s: 'Công thức cơ bản.', d: 'nhan_biet', o: ['$C = \\pi R^2$', '$C = 2\\pi R$', '$C = \\pi d^2$', '$C = 4\\pi R$'] },
        { q: 'T9-C5B15-002', c: 'Diện tích hình tròn bán kính $R$ được tính bằng công thức nào?', a: '$S = \\pi R^2$', s: 'Công thức diện tích hình tròn.', d: 'nhan_biet', o: ['$S = 2\\pi R$', '$S = \\pi R^2$', '$S = 2\\pi R^2$', '$S = \\frac{4}{3}\\pi R^3$'] },
        { q: 'T9-C5B15-003', c: 'Độ dài $l$ của cung $n^\\circ$ của đường tròn bán kính $R$ là:', a: '$l = \\frac{\\pi R n}{180}$', s: 'Công thức độ dài cung tròn.', d: 'thong_hieu', o: ['$l = \\frac{\\pi R^2 n}{360}$', '$l = \\frac{\\pi R n}{180}$', '$l = \\frac{\\pi R n}{360}$', '$l = \\pi R n$'] },
        { q: 'T9-C5B15-004', c: 'Diện tích hình quạt tròn bán kính $R$, cung $n^\\circ$ là:', a: '$S = \\frac{\\pi R^2 n}{360}$', s: 'Công thức diện tích hình quạt tròn.', d: 'thong_hieu', o: ['$S = \\frac{\\pi R n}{180}$', '$S = \\frac{\\pi R^2 n}{360}$', '$S = \\frac{\\pi R^2 n}{180}$', '$S = \\pi R^2 n$'] },
        { q: 'T9-C5B15-005', c: 'Tính diện tích hình tròn có đường kính $10$cm:', a: '$25\\pi$ cm$^2$', s: 'Bán kính $R = 5$cm. $S = \\pi \\cdot 5^2 = 25\\pi$.', d: 'van_dung', o: ['$100\\pi$ cm$^2$', '$50\\pi$ cm$^2$', '$25\\pi$ cm$^2$', '$10\\pi$ cm$^2$'] }
      ]
    },
    {
      name: 'Bài 16. Vị trí tương đối của đường thẳng và đường tròn.',
      questions: [
        { q: 'T9-C5B16-001', c: 'Khi đường thẳng $a$ và đường tròn $(O; R)$ cắt nhau thì số điểm chung là bao nhiêu?', a: '$2$ điểm', s: 'Đường thẳng cắt đường tròn tại $2$ điểm phân biệt.', d: 'nhan_biet', o: ['$0$ điểm', '$1$ điểm', '$2$ điểm', 'Vô số điểm'] },
        { q: 'T9-C5B16-002', c: 'Đường thẳng tiếp xúc với đường tròn khi khoảng cách $d$ từ tâm $O$ đến đường thẳng có độ dài bằng:', a: '$d = R$', s: 'Điều kiện để đường thẳng là tiếp tuyến.', d: 'nhan_biet', o: ['$d > R$', '$d = R$', '$d < R$', '$d = 0$'] },
        { q: 'T9-C5B16-003', c: 'Nếu khoảng cách từ tâm đến đường thẳng là $d > R$ thì đường thẳng và đường tròn có bao nhiêu điểm chung?', a: '$0$ điểm', s: 'Khi đó đường thẳng và đường tròn không giao nhau.', d: 'thong_hieu', o: ['$0$ điểm', '$1$ điểm', '$2$ điểm', 'Vô số điểm'] },
        { q: 'T9-C5B16-004', c: 'Tiếp tuyến của đường tròn luôn vuông góc với đại lượng nào tại tiếp điểm?', a: 'Bán kính đi qua tiếp điểm', s: 'Tính chất tiếp tuyến của đường tròn.', d: 'thong_hieu', o: ['Một dây cung bất kì', 'Đường kính không qua tiếp điểm', 'Bán kính đi qua tiếp điểm', 'Tâm đường tròn'] },
        { q: 'T9-C5B16-005', c: 'Cho đường tròn $(O; 5\\text{cm})$. Đường thẳng $a$ cách $O$ một khoảng bằng $3$cm cắt đường tròn tạo thành một dây cung có độ dài bao nhiêu?', a: '$8$cm', s: 'Nửa dây cung bằng $\\sqrt{5^2-3^2}=4$. Cả dây bằng $8$cm.', d: 'van_dung', o: ['$4$cm', '$6$cm', '$8$cm', '$10$cm'] }
      ]
    },
    {
      name: 'Bài 17. Vị trí tương đối của hai đường tròn.',
      questions: [
        { q: 'T9-C5B17-001', c: 'Hai đường tròn phân biệt cắt nhau thì có tối đa bao nhiêu điểm chung?', a: '$2$ điểm', s: 'Hai đường tròn cắt nhau tại tối đa 2 điểm phân biệt.', d: 'nhan_biet', o: ['$1$ điểm', '$2$ điểm', '$3$ điểm', 'Vô số điểm'] },
        { q: 'T9-C5B17-002', c: 'Khoảng cách giữa hai tâm $O$ và $O\'$ của hai đường tròn được gọi là gì?', a: 'Đoạn nối tâm', s: 'Tên gọi của $OO\'$.', d: 'nhan_biet', o: ['Bán kính', 'Đường kính', 'Đoạn nối tâm', 'Dây cung chung'] },
        { q: 'T9-C5B17-003', c: 'Hai đường tròn $(O; 5)$ và $(O\'; 3)$ cắt nhau. Điều kiện của độ dài đoạn nối tâm $d = OO\'$ là:', a: '$2 < d < 8$', s: 'Điều kiện cắt nhau: $|R-r| < d < R+r \\Rightarrow 5-3 < d < 5+3 \\Rightarrow 2 < d < 8$.', d: 'thong_hieu', o: ['$d < 2$', '$d = 8$', '$2 < d < 8$', '$d > 8$'] },
        { q: 'T9-C5B17-004', c: 'Nếu đoạn nối tâm $d = R + r$ thì hai đường tròn $(O; R)$ và $(O\'; r)$ có vị trí tương đối như thế nào?', a: 'Tiếp xúc ngoài', s: 'Điều kiện để hai đường tròn tiếp xúc ngoài.', d: 'thong_hieu', o: ['Tiếp xúc trong', 'Tiếp xúc ngoài', 'Cắt nhau', 'Không giao nhau'] },
        { q: 'T9-C5B17-005', c: 'Cho hai đường tròn $(O; 4)$ và $(O\'; 1)$ tiếp xúc ngoài. Khoảng cách $OO\'$ là:', a: '$5$', s: '$OO\' = R + r = 4 + 1 = 5$.', d: 'van_dung', o: ['$3$', '$4$', '$5$', '$1$'] }
      ]
    },
    {
      name: 'Bài 19. Phương trình bậc hai một ẩn.',
      questions: [
        { q: 'T9-C6B19-001', c: 'Phương trình bậc hai một ẩn có dạng tổng quát như thế nào?', a: '$ax^2 + bx + c = 0$ ($a \\neq 0$)', s: 'Định nghĩa PT bậc 2.', d: 'nhan_biet', o: ['$ax + b = 0$', '$ax^2 + bx + c = 0$ ($a \\neq 0$)', '$ax^3 + bx^2 = 0$', '$x^2 + y = 0$'] },
        { q: 'T9-C6B19-002', c: 'Biệt thức $\\Delta$ của phương trình $ax^2 + bx + c = 0$ là:', a: '$\\Delta = b^2 - 4ac$', s: 'Công thức tính Delta.', d: 'nhan_biet', o: ['$\\Delta = b - 4ac$', '$\\Delta = b^2 + 4ac$', '$\\Delta = b^2 - 4ac$', '$\\Delta = -b - 4ac$'] },
        { q: 'T9-C6B19-003', c: 'Phương trình bậc hai một ẩn có nghiệm kép khi biệt thức $\\Delta$ thỏa mãn điều kiện gì?', a: '$\\Delta = 0$', s: 'Nghiệm kép xảy ra khi $\\Delta = 0$.', d: 'thong_hieu', o: ['$\\Delta > 0$', '$\\Delta = 0$', '$\\Delta < 0$', '$\\Delta \\ge 0$'] },
        { q: 'T9-C6B19-004', c: 'Phương trình vô nghiệm khi biệt thức $\\Delta$ thỏa mãn điều kiện gì?', a: '$\\Delta < 0$', s: 'Do căn $\\Delta$ không xác định trong tập số thực.', d: 'thong_hieu', o: ['$\\Delta > 0$', '$\\Delta = 0$', '$\\Delta < 0$', '$\\Delta \\neq 0$'] },
        { q: 'T9-C6B19-005', c: 'Tính biệt thức $\\Delta$ của phương trình $x^2 - 5x + 6 = 0$:', a: '$1$', s: '$\\Delta = (-5)^2 - 4 \\cdot 1 \\cdot 6 = 25 - 24 = 1$.', d: 'van_dung', o: ['$-1$', '$1$', '$25$', '$49$'] }
      ]
    },
    {
      name: 'Bài 20. Định lí Viète và ứng dụng.',
      questions: [
        { q: 'T9-C6B20-001', c: 'Theo định lí Viète, nếu phương trình $ax^2 + bx + c = 0$ ($a \\neq 0$) có hai nghiệm $x_1, x_2$ thì tổng $x_1 + x_2$ bằng:', a: '$-\\frac{b}{a}$', s: 'Hệ thức Vi-ét cho tổng hai nghiệm.', d: 'nhan_biet', o: ['$\\frac{b}{a}$', '$-\\frac{b}{a}$', '$\\frac{c}{a}$', '$-\\frac{c}{a}$'] },
        { q: 'T9-C6B20-002', c: 'Theo định lí Viète, nếu phương trình $ax^2 + bx + c = 0$ ($a \\neq 0$) có hai nghiệm $x_1, x_2$ thì tích $x_1 \\cdot x_2$ bằng:', a: '$\\frac{c}{a}$', s: 'Hệ thức Vi-ét cho tích hai nghiệm.', d: 'nhan_biet', o: ['$\\frac{b}{a}$', '$-\\frac{b}{a}$', '$\\frac{c}{a}$', '$-\\frac{c}{a}$'] },
        { q: 'T9-C6B20-003', c: 'Tổng hai nghiệm của phương trình $2x^2 - 7x + 3 = 0$ là:', a: '$\\frac{7}{2}$', s: '$x_1 + x_2 = -\\frac{b}{a} = -\\frac{-7}{2} = \\frac{7}{2}$.', d: 'thong_hieu', o: ['$\\frac{7}{2}$', '$-\\frac{7}{2}$', '$\\frac{3}{2}$', '$-\\frac{3}{2}$'] },
        { q: 'T9-C6B20-004', c: 'Tích hai nghiệm của phương trình $x^2 + 5x - 6 = 0$ là:', a: '$-6$', s: '$x_1 \\cdot x_2 = \\frac{c}{a} = \\frac{-6}{1} = -6$.', d: 'thong_hieu', o: ['$5$', '$-5$', '$6$', '$-6$'] },
        { q: 'T9-C6B20-005', c: 'Tìm hai số biết tổng của chúng bằng $5$ và tích bằng $6$:', a: '$2$ và $3$', s: 'Hai số là nghiệm của phương trình $x^2 - 5x + 6 = 0 \\Rightarrow x_1 = 2, x_2 = 3$.', d: 'van_dung', o: ['$1$ và $6$', '$-2$ và $-3$', '$2$ và $3$', '$4$ và $1$'] }
      ]
    },
    {
      name: 'Bài 21. Giải bài toán bằng cách lập phương trình.',
      questions: [
        { q: 'T9-C6B21-001', c: 'Khi giải bài toán bằng cách lập phương trình, điều kiện đặt cho ẩn số phải thỏa mãn điều gì?', a: 'Phù hợp với ý nghĩa thực tế của đại lượng', s: 'Ví dụ số người phải là số tự nhiên lớn hơn 0, chiều dài phải dương.', d: 'nhan_biet', o: ['Luôn lớn hơn $0$', 'Phù hợp với ý nghĩa thực tế của đại lượng', 'Luôn là số nguyên', 'Luôn nhỏ hơn $100$'] },
        { q: 'T9-C6B21-002', c: 'Công thức tính diện tích hình chữ nhật khi biết chiều dài $a$ và chiều rộng $b$ là:', a: '$S = a \\cdot b$', s: 'Diện tích bằng dài nhân rộng.', d: 'nhan_biet', o: ['$S = 2(a+b)$', '$S = a \\cdot b$', '$S = \\frac{1}{2}ab$', '$S = a^2+b^2$'] },
        { q: 'T9-C6B21-003', c: 'Nếu chiều dài hình chữ nhật là $x$, chiều rộng kém chiều dài $2$m thì biểu thức tính diện tích là:', a: '$x(x-2)$', s: 'Chiều rộng là $x-2$. Diện tích $= x(x-2)$.', d: 'thong_hieu', o: ['$x(x+2)$', '$x(x-2)$', '$2x - 2$', '$x^2 - 2$'] },
        { q: 'T9-C6B21-004', c: 'Đại lượng vận tốc trung bình $v$, quãng đường $S$ và thời gian $t$ liên hệ với nhau bởi công thức nào?', a: '$v = \\frac{S}{t}$', s: 'Vận tốc bằng quãng đường chia thời gian.', d: 'thong_hieu', o: ['$v = S \\cdot t$', '$v = S + t$', '$v = \\frac{t}{S}$', '$v = \\frac{S}{t}$'] },
        { q: 'T9-C6B21-005', c: 'Một mảnh đất hình chữ nhật có diện tích $24$m$^2$, chiều dài hơn chiều rộng $2$m. Kích thước của mảnh đất là:', a: 'Chiều dài $6$m, chiều rộng $4$m', s: 'Gọi chiều rộng là $x>0 \\Rightarrow$ chiều dài $x+2$. $x(x+2)=24 \\Rightarrow x^2+2x-24=0 \\Rightarrow x=4$. Dài là $6$.', d: 'van_dung', o: ['Chiều dài $8$m, chiều rộng $3$m', 'Chiều dài $6$m, chiều rộng $4$m', 'Chiều dài $12$m, chiều rộng $2$m', 'Chiều dài $4$m, chiều rộng $6$m'] }
      ]
    },
    {
      name: 'Bài tập cuối chương VI.',
      questions: [
        { q: 'T9-C6OT-001', c: 'Hàm số $y = ax^2$ với $a > 0$ đồng biến khi nào?', a: 'Khi $x > 0$', s: 'Đồ thị bề lõm hướng lên, đồng biến bên phải trục tung ($x>0$).', d: 'nhan_biet', o: ['Khi $x < 0$', 'Khi $x > 0$', 'Luôn đồng biến với mọi $x$', 'Khi $x = 0$'] },
        { q: 'T9-C6OT-002', c: 'Đồ thị hàm số $y = 2x^2$ đi qua điểm nào sau đây?', a: '$(1; 2)$', s: 'Thay $x=1 \\Rightarrow y=2(1)^2=2$.', d: 'thong_hieu', o: ['$(1; 2)$', '$(2; 4)$', '$(-1; -2)$', '$(0; 2)$'] },
        { q: 'T9-C6OT-003', c: 'Phương trình $x^2 - x - 2 = 0$ có các nghiệm là:', a: '$-1$ và $2$', s: '$a - b + c = 1 - (-1) - 2 = 0$. Có nghiệm $-1$ và $-\\frac{c}{a} = 2$.', d: 'thong_hieu', o: ['$1$ và $-2$', '$-1$ và $2$', '$-1$ và $-2$', '$1$ và $2$'] },
        { q: 'T9-C6OT-004', c: 'Nếu phương trình $ax^2 + bx + c = 0$ ($a \\neq 0$) có $a+b+c=0$ thì phương trình có một nghiệm là:', a: '$1$', s: 'Theo tính chất nhẩm nghiệm.', d: 'thong_hieu', o: ['$-1$', '$1$', '$0$', '$2$'] },
        { q: 'T9-C6OT-005', c: 'Phương trình $3x^2 + 5x + 2 = 0$ có nghiệm là:', a: '$-1$ và $-\\frac{2}{3}$', s: 'Có $a-b+c = 3-5+2=0$ nên $x_1=-1, x_2=-\\frac{c}{a} = -2/3$.', d: 'van_dung', o: ['$1$ và $\\frac{2}{3}$', '$-1$ và $-\\frac{2}{3}$', '$-1$ và $2$', '$1$ và $-2$'] }
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
  
  console.log('\n✅ Hoàn thành Batch 2 Lớp 9');
}

insertGrade9Batch2().catch(console.error);
