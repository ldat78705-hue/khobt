import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);

async function insertGrade9Batch3() {
  console.log('Khởi tạo kết nối CSDL...');
  
  const users = await sql`SELECT user_id FROM public.questions WHERE user_id IS NOT NULL LIMIT 1`;
  const defaultUserId = users.length > 0 ? users[0].user_id : '00000000-0000-0000-0000-000000000000';

  const topics = [
    {
      name: 'Bài 22. Bảng tần số và biểu đồ tần số.',
      questions: [
        { q: 'T9-C7B22-001', c: 'Tần số của một giá trị trong mẫu số liệu là gì?', a: 'Số lần xuất hiện của giá trị đó trong mẫu số liệu', s: 'Định nghĩa tần số.', d: 'nhan_biet', o: ['Giá trị lớn nhất của mẫu', 'Số lần xuất hiện của giá trị đó trong mẫu số liệu', 'Tỉ lệ phần trăm của giá trị đó', 'Số lượng các giá trị khác nhau'] },
        { q: 'T9-C7B22-002', c: 'Tổng các tần số của tất cả các giá trị trong mẫu số liệu bằng đại lượng nào?', a: 'Kích thước mẫu (số lượng các số liệu trong mẫu)', s: 'Tính chất cơ bản của tần số.', d: 'nhan_biet', o: ['Kích thước mẫu (số lượng các số liệu trong mẫu)', '$100$', '$1$', 'Trung bình cộng của mẫu'] },
        { q: 'T9-C7B22-003', c: 'Trong mẫu số liệu: $1, 2, 2, 3, 2, 4$. Tần số của giá trị $2$ là bao nhiêu?', a: '$3$', s: 'Số $2$ xuất hiện $3$ lần.', d: 'thong_hieu', o: ['$1$', '$2$', '$3$', '$4$'] },
        { q: 'T9-C7B22-004', c: 'Biểu đồ tần số thường được vẽ dưới dạng nào để quan sát mức độ tập trung của số liệu?', a: 'Biểu đồ cột hoặc biểu đồ đoạn thẳng', s: 'Các loại biểu đồ biểu diễn tần số phổ biến.', d: 'thong_hieu', o: ['Biểu đồ hình quạt tròn', 'Biểu đồ tranh', 'Biểu đồ cột hoặc biểu đồ đoạn thẳng', 'Biểu đồ Venn'] },
        { q: 'T9-C7B22-005', c: 'Một bảng tần số có các tần số lần lượt là $2, 5, x, 3$ và kích thước mẫu $N = 15$. Giá trị của $x$ là:', a: '$5$', s: '$2 + 5 + x + 3 = 15 \\Rightarrow 10 + x = 15 \\Rightarrow x = 5$.', d: 'van_dung', o: ['$4$', '$5$', '$6$', '$10$'] }
      ]
    },
    {
      name: 'Bài 23. Bảng tần số tương đối và biểu đồ tần số tương đối.',
      questions: [
        { q: 'T9-C7B23-001', c: 'Tần số tương đối $f_i$ của một giá trị được tính bằng công thức nào (với $n_i$ là tần số, $N$ là kích thước mẫu)?', a: '$f_i = \\frac{n_i}{N} \\cdot 100\\%$', s: 'Công thức tính tần số tương đối.', d: 'nhan_biet', o: ['$f_i = n_i \\cdot N$', '$f_i = \\frac{N}{n_i} \\cdot 100\\%$', '$f_i = \\frac{n_i}{N} \\cdot 100\\%$', '$f_i = n_i + N$'] },
        { q: 'T9-C7B23-002', c: 'Tổng các tần số tương đối của tất cả các giá trị trong mẫu số liệu bằng bao nhiêu?', a: '$100\\%$', s: 'Tổng các phần trăm luôn bằng $100\\%$.', d: 'nhan_biet', o: ['$1\\%$', '$10\\%$', '$100\\%$', '$N$'] },
        { q: 'T9-C7B23-003', c: 'Trong một mẫu kích thước $N = 50$, giá trị $x$ có tần số là $10$. Tần số tương đối của $x$ là:', a: '$20\\%$', s: '$\\frac{10}{50} \\cdot 100\\% = 20\\%$.', d: 'thong_hieu', o: ['$10\\%$', '$20\\%$', '$50\\%$', '$5\\%$'] },
        { q: 'T9-C7B23-004', c: 'Biểu đồ tần số tương đối thường được dùng là biểu đồ nào để thể hiện cơ cấu phần trăm?', a: 'Biểu đồ hình quạt tròn', s: 'Biểu đồ quạt rất thích hợp để thể hiện tỉ lệ phần trăm.', d: 'thong_hieu', o: ['Biểu đồ đoạn thẳng', 'Biểu đồ điểm', 'Biểu đồ hình quạt tròn', 'Biểu đồ tranh'] },
        { q: 'T9-C7B23-005', c: 'Một bảng tần số tương đối có $3$ giá trị, tần số tương đối của hai giá trị đầu là $30\\%$ và $45\\%$. Tần số tương đối của giá trị thứ ba là:', a: '$25\\%$', s: '$100\\% - (30\\% + 45\\%) = 25\\%$.', d: 'van_dung', o: ['$15\\%$', '$25\\%$', '$35\\%$', '$45\\%$'] }
      ]
    },
    {
      name: 'Bài 24. Bảng tần số, tần số tương đối ghép nhóm và biểu đồ.',
      questions: [
        { q: 'T9-C7B24-001', c: 'Khi nào ta cần sử dụng bảng tần số ghép nhóm?', a: 'Khi số liệu có nhiều giá trị khác nhau, trải rộng trên một khoảng lớn', s: 'Ghép nhóm giúp số liệu gọn gàng, dễ phân tích hơn.', d: 'nhan_biet', o: ['Khi mẫu số liệu có rất ít giá trị', 'Khi số liệu chỉ có một giá trị', 'Khi số liệu có nhiều giá trị khác nhau, trải rộng trên một khoảng lớn', 'Khi muốn tính chính xác từng giá trị'] },
        { q: 'T9-C7B24-002', c: 'Nhóm $[a; b)$ gồm các giá trị $x$ như thế nào?', a: '$a \\le x < b$', s: 'Nửa khoảng lấy $a$, không lấy $b$.', d: 'nhan_biet', o: ['$a < x < b$', '$a \\le x \\le b$', '$a < x \\le b$', '$a \\le x < b$'] },
        { q: 'T9-C7B24-003', c: 'Số liệu $15$ thuộc nhóm nào trong các nhóm sau: $[0; 10), [10; 15), [15; 20)$?', a: '$[15; 20)$', s: 'Vì nhóm $[10; 15)$ không lấy $15$, nhóm $[15; 20)$ lấy $15$.', d: 'thong_hieu', o: ['$[0; 10)$', '$[10; 15)$', '$[15; 20)$', 'Không thuộc nhóm nào'] },
        { q: 'T9-C7B24-004', c: 'Độ dài của nhóm $[10; 20)$ là bao nhiêu?', a: '$10$', s: 'Độ dài = $20 - 10 = 10$.', d: 'thong_hieu', o: ['$10$', '$15$', '$20$', '$30$'] },
        { q: 'T9-C7B24-005', c: 'Tần số của nhóm $[0; 10)$ là $5$, kích thước mẫu là $25$. Tần số tương đối ghép nhóm của nhóm này là:', a: '$20\\%$', s: '$\\frac{5}{25} \\cdot 100\\% = 20\\%$.', d: 'van_dung', o: ['$5\\%$', '$10\\%$', '$20\\%$', '$25\\%$'] }
      ]
    },
    {
      name: 'Bài tập cuối chương VII.',
      questions: [
        { q: 'T9-C7OT-001', c: 'Giá trị có tần số lớn nhất trong mẫu số liệu được gọi là gì?', a: 'Mốt (Mode)', s: 'Định nghĩa Mốt.', d: 'nhan_biet', o: ['Số trung bình cộng', 'Trung vị', 'Mốt (Mode)', 'Khoảng tứ phân vị'] },
        { q: 'T9-C7OT-002', c: 'Để tính số trung bình cộng từ bảng tần số ghép nhóm, ta sử dụng giá trị nào của mỗi nhóm?', a: 'Giá trị đại diện (trung bình cộng của hai mút)', s: 'Sử dụng trung bình cộng của giới hạn dưới và giới hạn trên làm giá trị đại diện.', d: 'thong_hieu', o: ['Giới hạn dưới của nhóm', 'Giới hạn trên của nhóm', 'Giá trị lớn nhất trong mẫu', 'Giá trị đại diện (trung bình cộng của hai mút)'] },
        { q: 'T9-C7OT-003', c: 'Giá trị đại diện của nhóm $[20; 30)$ là bao nhiêu?', a: '$25$', s: '$(20 + 30) / 2 = 25$.', d: 'thong_hieu', o: ['$20$', '$25$', '$30$', '$50$'] },
        { q: 'T9-C7OT-004', c: 'Cho mẫu số liệu: $1, 2, 2, 3, 3, 3, 4, 4, 5, 5$. Mốt của mẫu số liệu là:', a: '$3$', s: 'Số $3$ xuất hiện nhiều nhất ($3$ lần).', d: 'thong_hieu', o: ['$2$', '$3$', '$4$', '$5$'] },
        { q: 'T9-C7OT-005', c: 'Một mẫu ghép nhóm có hai nhóm: Nhóm 1 có tần số 10, giá trị đại diện 5; Nhóm 2 có tần số 20, giá trị đại diện 8. Số trung bình cộng của mẫu xấp xỉ là:', a: '$7$', s: '$\\bar{x} = \\frac{10 \\times 5 + 20 \\times 8}{30} = \\frac{210}{30} = 7$.', d: 'van_dung', o: ['$6,5$', '$7$', '$7,5$', '$8$'] }
      ]
    },
    {
      name: 'Bài 26. Xác suất của biến cố liên quan tới phép thử.',
      questions: [
        { q: 'T9-C8B26-001', c: 'Kí hiệu thường dùng cho không gian mẫu của một phép thử là gì?', a: '$\\Omega$', s: 'Kí hiệu không gian mẫu.', d: 'nhan_biet', o: ['$\\Sigma$', '$\\Omega$', '$\\Delta$', '$\\Phi$'] },
        { q: 'T9-C8B26-002', c: 'Xác suất của một biến cố $A$ là $P(A)$ luôn nằm trong khoảng nào?', a: '$[0; 1]$', s: 'Tính chất cơ bản của xác suất.', d: 'nhan_biet', o: ['$(0; 1)$', '$[-1; 1]$', '$[0; 1]$', '$[0; 100]$'] },
        { q: 'T9-C8B26-003', c: 'Tung hai đồng xu cân đối, số phần tử của không gian mẫu $n(\\Omega)$ là bao nhiêu?', a: '$4$', s: 'Có $2 \\times 2 = 4$ kết quả: SS, SN, NS, NN.', d: 'thong_hieu', o: ['$2$', '$3$', '$4$', '$8$'] },
        { q: 'T9-C8B26-004', c: 'Tung một con xúc xắc cân đối, gọi $A$ là biến cố "Mặt xuất hiện có số chấm chẵn". Xác suất $P(A)$ là:', a: '$\\frac{1}{2}$', s: 'Các mặt chẵn: 2, 4, 6. Xác suất: $3/6 = 1/2$.', d: 'thong_hieu', o: ['$\\frac{1}{3}$', '$\\frac{1}{2}$', '$\\frac{1}{6}$', '$\\frac{2}{3}$'] },
        { q: 'T9-C8B26-005', c: 'Chọn ngẫu nhiên $1$ số từ các số tự nhiên có $2$ chữ số. Xác suất chọn được số chia hết cho $10$ là:', a: '$\\frac{1}{10}$', s: 'Có 90 số có 2 chữ số. Các số chia hết cho 10: 10, 20,..., 90 (có 9 số). Xác suất $9/90 = 1/10$.', d: 'van_dung', o: ['$\\frac{1}{9}$', '$\\frac{1}{10}$', '$\\frac{9}{100}$', '$\\frac{1}{5}$'] }
      ]
    },
    {
      name: 'Bài tập cuối chương VIII.',
      questions: [
        { q: 'T9-C8OT-001', c: 'Phép thử ngẫu nhiên là phép thử thỏa mãn điều kiện nào?', a: 'Không thể đoán trước kết quả nào sẽ xảy ra nhưng có thể biết được tập hợp tất cả các kết quả có thể', s: 'Khái niệm phép thử.', d: 'nhan_biet', o: ['Có thể biết trước chắc chắn kết quả', 'Không thể đoán trước kết quả nào sẽ xảy ra nhưng có thể biết được tập hợp tất cả các kết quả có thể', 'Không thể biết tập hợp các kết quả', 'Chỉ có đúng $1$ kết quả có thể xảy ra'] },
        { q: 'T9-C8OT-002', c: 'Gieo $1$ xúc xắc $2$ lần. Không gian mẫu có bao nhiêu phần tử?', a: '$36$', s: '$6 \\times 6 = 36$.', d: 'thong_hieu', o: ['$6$', '$12$', '$36$', '$18$'] },
        { q: 'T9-C8OT-003', c: 'Xác suất của biến cố chắc chắn (luôn xảy ra) bằng bao nhiêu?', a: '$1$', s: 'Biến cố chắc chắn có xác suất bằng 1.', d: 'thong_hieu', o: ['$0$', '$0,5$', '$1$', '$100$'] },
        { q: 'T9-C8OT-004', c: 'Một hộp có $5$ bi xanh, $3$ bi đỏ. Rút ngẫu nhiên $1$ bi. Xác suất rút được bi xanh là:', a: '$\\frac{5}{8}$', s: 'Tổng số bi là 8. Số bi xanh là 5. $P = 5/8$.', d: 'thong_hieu', o: ['$\\frac{3}{8}$', '$\\frac{5}{8}$', '$\\frac{1}{5}$', '$\\frac{1}{8}$'] },
        { q: 'T9-C8OT-005', c: 'Trong hộp có các thẻ đánh số từ $1$ đến $15$. Rút ngẫu nhiên một thẻ. Xác suất để rút được thẻ mang số nguyên tố là:', a: '$\\frac{2}{5}$', s: 'Số nguyên tố: 2, 3, 5, 7, 11, 13 (6 số). Xác suất $6/15 = 2/5$.', d: 'van_dung', o: ['$\\frac{1}{3}$', '$\\frac{2}{5}$', '$\\frac{7}{15}$', '$\\frac{1}{5}$'] }
      ]
    },
    {
      name: 'Bài 28. Đường tròn ngoại tiếp và đường tròn nội tiếp của một tam giác.',
      questions: [
        { q: 'T9-C9B28-001', c: 'Tâm đường tròn ngoại tiếp tam giác là giao điểm của các đường nào?', a: 'Đường trung trực của các cạnh', s: 'Tâm đường tròn ngoại tiếp cách đều 3 đỉnh nên là giao 3 trung trực.', d: 'nhan_biet', o: ['Đường phân giác', 'Đường trung tuyến', 'Đường trung trực của các cạnh', 'Đường cao'] },
        { q: 'T9-C9B28-002', c: 'Tâm đường tròn nội tiếp tam giác là giao điểm của các đường nào?', a: 'Đường phân giác trong của các góc', s: 'Tâm đường tròn nội tiếp cách đều 3 cạnh nên là giao 3 phân giác.', d: 'nhan_biet', o: ['Đường phân giác trong của các góc', 'Đường trung tuyến', 'Đường trung trực', 'Đường cao'] },
        { q: 'T9-C9B28-003', c: 'Tâm đường tròn ngoại tiếp tam giác vuông nằm ở vị trí nào?', a: 'Trung điểm của cạnh huyền', s: 'Theo tính chất đường trung tuyến ứng với cạnh huyền bằng nửa cạnh huyền.', d: 'thong_hieu', o: ['Trực tâm tam giác', 'Trọng tâm tam giác', 'Đỉnh góc vuông', 'Trung điểm của cạnh huyền'] },
        { q: 'T9-C9B28-004', c: 'Bán kính đường tròn ngoại tiếp tam giác vuông có cạnh huyền bằng $10$cm là:', a: '$5$cm', s: 'Bán kính $R = \\frac{\\text{cạnh huyền}}{2} = 5$.', d: 'thong_hieu', o: ['$5$cm', '$10$cm', '$20$cm', '$2,5$cm'] },
        { q: 'T9-C9B28-005', c: 'Cho tam giác đều cạnh $a$. Bán kính đường tròn ngoại tiếp tam giác là:', a: '$\\frac{a\\sqrt{3}}{3}$', s: 'Chiều cao $h = \\frac{a\\sqrt{3}}{2}$. Bán kính $R = \\frac{2}{3}h = \\frac{a\\sqrt{3}}{3}$.', d: 'van_dung', o: ['$\\frac{a\\sqrt{3}}{2}$', '$\\frac{a\\sqrt{3}}{3}$', '$\\frac{a\\sqrt{3}}{6}$', '$a\\sqrt{3}$'] }
      ]
    },
    {
      name: 'Bài 29. Tứ giác nội tiếp.',
      questions: [
        { q: 'T9-C9B29-001', c: 'Một tứ giác được gọi là tứ giác nội tiếp nếu?', a: 'Cả bốn đỉnh của nó cùng nằm trên một đường tròn', s: 'Định nghĩa tứ giác nội tiếp.', d: 'nhan_biet', o: ['Có hai góc đối bằng nhau', 'Cả bốn đỉnh của nó cùng nằm trên một đường tròn', 'Có hai đường chéo vuông góc', 'Có một đường tròn tiếp xúc với 4 cạnh'] },
        { q: 'T9-C9B29-002', c: 'Dấu hiệu nhận biết tứ giác nội tiếp liên quan đến góc đối là gì?', a: 'Tổng số đo hai góc đối diện bằng $180^\\circ$', s: 'Định lí tứ giác nội tiếp.', d: 'nhan_biet', o: ['Tổng số đo hai góc đối diện bằng $90^\\circ$', 'Hai góc đối diện bằng nhau', 'Tổng số đo hai góc đối diện bằng $180^\\circ$', 'Bốn góc bằng nhau'] },
        { q: 'T9-C9B29-003', c: 'Tứ giác $ABCD$ nội tiếp đường tròn, biết $\\widehat{A} = 70^\\circ$. Số đo góc đối diện $\\widehat{C}$ là:', a: '$110^\\circ$', s: '$\\widehat{A} + \\widehat{C} = 180^\\circ \\Rightarrow \\widehat{C} = 110^\\circ$.', d: 'thong_hieu', o: ['$70^\\circ$', '$110^\\circ$', '$20^\\circ$', '$90^\\circ$'] },
        { q: 'T9-C9B29-004', c: 'Tứ giác nào sau đây luôn nội tiếp được trong một đường tròn?', a: 'Hình chữ nhật', s: 'Hình chữ nhật có tổng 2 góc đối bằng $180^\\circ$ ($90+90$).', d: 'thong_hieu', o: ['Hình thoi', 'Hình bình hành', 'Hình thang vuông', 'Hình chữ nhật'] },
        { q: 'T9-C9B29-005', c: 'Tứ giác $ABCD$ có $\\widehat{ABD} = \\widehat{ACD} = 90^\\circ$. Tứ giác $ABCD$ có nội tiếp không?', a: 'Có', s: 'Hai đỉnh B, C kề nhau cùng nhìn cạnh AD dưới một góc $90^\\circ$.', d: 'van_dung', o: ['Có', 'Không', 'Chỉ khi ABCD là hình vuông', 'Chỉ khi ABCD là hình thoi'] }
      ]
    },
    {
      name: 'Bài 30. Đa giác đều.',
      questions: [
        { q: 'T9-C9B30-001', c: 'Đa giác đều là đa giác có tính chất gì?', a: 'Tất cả các cạnh bằng nhau và tất cả các góc bằng nhau', s: 'Định nghĩa đa giác đều.', d: 'nhan_biet', o: ['Tất cả các cạnh bằng nhau', 'Tất cả các góc bằng nhau', 'Tất cả các cạnh bằng nhau và tất cả các góc bằng nhau', 'Có số cạnh là số chẵn'] },
        { q: 'T9-C9B30-002', c: 'Ngũ giác đều có bao nhiêu trục đối xứng?', a: '$5$', s: 'Đa giác đều n cạnh có n trục đối xứng.', d: 'nhan_biet', o: ['$1$', '$2$', '$5$', '$10$'] },
        { q: 'T9-C9B30-003', c: 'Lục giác đều có bao nhiêu tâm đối xứng?', a: '$1$ tâm đối xứng', s: 'Đa giác đều có số cạnh chẵn thì có $1$ tâm đối xứng.', d: 'thong_hieu', o: ['$0$ tâm đối xứng', '$1$ tâm đối xứng', '$3$ tâm đối xứng', '$6$ tâm đối xứng'] },
        { q: 'T9-C9B30-004', c: 'Số đo mỗi góc trong của ngũ giác đều là bao nhiêu?', a: '$108^\\circ$', s: 'Góc trong $= \\frac{(5-2) \\times 180^\\circ}{5} = 108^\\circ$.', d: 'thong_hieu', o: ['$120^\\circ$', '$108^\\circ$', '$90^\\circ$', '$72^\\circ$'] },
        { q: 'T9-C9B30-005', c: 'Hình vuông ngoại tiếp đường tròn $(O; R)$. Độ dài cạnh của hình vuông là:', a: '$2R$', s: 'Cạnh hình vuông bằng đường kính đường tròn nội tiếp.', d: 'van_dung', o: ['$R$', '$R\\sqrt{2}$', '$2R$', '$4R$'] }
      ]
    },
    {
      name: 'Bài tập cuối chương IX.',
      questions: [
        { q: 'T9-C9OT-001', c: 'Tâm đường tròn bàng tiếp tam giác là giao điểm của các đường nào?', a: 'Một đường phân giác trong và hai đường phân giác ngoài', s: 'Định nghĩa tâm bàng tiếp.', d: 'nhan_biet', o: ['Ba đường phân giác ngoài', 'Ba đường phân giác trong', 'Một đường phân giác trong và hai đường phân giác ngoài', 'Đường cao và đường trung trực'] },
        { q: 'T9-C9OT-002', c: 'Tứ giác nào vừa có đường tròn ngoại tiếp vừa có đường tròn nội tiếp?', a: 'Hình vuông', s: 'Hình vuông là đa giác đều $4$ cạnh nên có cả hai đường tròn.', d: 'thong_hieu', o: ['Hình thoi', 'Hình chữ nhật', 'Hình bình hành', 'Hình vuông'] },
        { q: 'T9-C9OT-003', c: 'Lục giác đều nội tiếp đường tròn $(O; R)$ có cạnh bằng bao nhiêu?', a: '$R$', s: 'Được ghép từ 6 tam giác đều cạnh $R$.', d: 'thong_hieu', o: ['$R\\sqrt{2}$', '$R\\sqrt{3}$', '$R$', '$2R$'] },
        { q: 'T9-C9OT-004', c: 'Tổng các góc trong của một tứ giác lồi luôn bằng:', a: '$360^\\circ$', s: 'Định lí tổng các góc của đa giác n cạnh: $(n-2) \\times 180 = 360$.', d: 'thong_hieu', o: ['$180^\\circ$', '$270^\\circ$', '$360^\\circ$', '$540^\\circ$'] },
        { q: 'T9-C9OT-005', c: 'Cho $\\Delta ABC$ nội tiếp đường tròn tâm $O$. Số đo $\\widehat{BOC} = 120^\\circ$. Số đo $\\widehat{BAC}$ (với $A$ nằm trên cung lớn) là:', a: '$60^\\circ$', s: 'Góc nội tiếp bằng nửa góc ở tâm chắn cùng một cung.', d: 'van_dung', o: ['$60^\\circ$', '$120^\\circ$', '$240^\\circ$', '$30^\\circ$'] }
      ]
    },
    {
      name: 'Bài 32. Hình cầu.',
      questions: [
        { q: 'T9-C10B32-001', c: 'Mặt cầu tâm $O$ bán kính $R$ là tập hợp các điểm trong không gian cách tâm $O$ một khoảng bằng đại lượng nào?', a: '$R$', s: 'Định nghĩa mặt cầu.', d: 'nhan_biet', o: ['$R/2$', '$2R$', '$R$', 'Nhỏ hơn $R$'] },
        { q: 'T9-C10B32-002', c: 'Thiết diện của một hình cầu cắt bởi một mặt phẳng luôn là hình gì?', a: 'Hình tròn', s: 'Tính chất thiết diện của hình cầu.', d: 'nhan_biet', o: ['Hình elip', 'Hình tròn', 'Đường tròn', 'Hình đa giác'] },
        { q: 'T9-C10B32-003', c: 'Thể tích hình cầu bán kính $R$ được tính bằng công thức nào?', a: '$V = \\frac{4}{3}\\pi R^3$', s: 'Công thức thể tích hình cầu.', d: 'thong_hieu', o: ['$V = 4\\pi R^2$', '$V = \\frac{1}{3}\\pi R^3$', '$V = \\frac{4}{3}\\pi R^3$', '$V = \\pi R^3$'] },
        { q: 'T9-C10B32-004', c: 'Diện tích mặt cầu bán kính $R$ là:', a: '$S = 4\\pi R^2$', s: 'Công thức diện tích mặt cầu.', d: 'thong_hieu', o: ['$S = 4\\pi R^2$', '$S = 2\\pi R^2$', '$S = \\frac{4}{3}\\pi R^2$', '$S = \\pi R^2$'] },
        { q: 'T9-C10B32-005', c: 'Một hình cầu có đường kính là $6$cm. Thể tích hình cầu là:', a: '$36\\pi$ cm$^3$', s: '$R = 3$. $V = \\frac{4}{3} \\pi \\cdot 3^3 = 36\\pi$.', d: 'van_dung', o: ['$12\\pi$ cm$^3$', '$36\\pi$ cm$^3$', '$108\\pi$ cm$^3$', '$288\\pi$ cm$^3$'] }
      ]
    },
    {
      name: 'Bài tập cuối chương X.',
      questions: [
        { q: 'T9-C10OT-001', c: 'Trong hình trụ, đường sinh có vị trí tương đối như thế nào so với trục của nó?', a: 'Song song', s: 'Các đường sinh của hình trụ luôn song song với trục.', d: 'nhan_biet', o: ['Cắt nhau', 'Vuông góc', 'Song song', 'Chéo nhau'] },
        { q: 'T9-C10OT-002', c: 'Thiết diện qua trục của hình trụ là hình gì?', a: 'Hình chữ nhật', s: 'Mặt phẳng qua trục cắt hình trụ tạo thành hình chữ nhật.', d: 'thong_hieu', o: ['Hình vuông', 'Hình chữ nhật', 'Tam giác cân', 'Hình tròn'] },
        { q: 'T9-C10OT-003', c: 'Thiết diện qua trục của hình nón là hình gì?', a: 'Tam giác cân', s: 'Mặt phẳng qua trục cắt hình nón tạo thành tam giác cân có cạnh bên là 2 đường sinh.', d: 'thong_hieu', o: ['Tam giác cân', 'Tam giác vuông', 'Hình chữ nhật', 'Hình thang'] },
        { q: 'T9-C10OT-004', c: 'Công thức tính diện tích xung quanh của hình trụ có bán kính đáy $r$ và chiều cao $h$ là:', a: '$S_{xq} = 2\\pi rh$', s: 'Chu vi đáy nhân chiều cao.', d: 'thong_hieu', o: ['$S_{xq} = \\pi rh$', '$S_{xq} = 2\\pi rh$', '$S_{xq} = \\pi r^2 h$', '$S_{xq} = 2\\pi r(r+h)$'] },
        { q: 'T9-C10OT-005', c: 'Một hình nón có bán kính đáy $r=3$, đường sinh $l=5$. Chiều cao $h$ của nón là:', a: '$4$', s: '$h = \\sqrt{l^2 - r^2} = \\sqrt{25 - 9} = 4$.', d: 'van_dung', o: ['$2$', '$8$', '$4$', '$16$'] }
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
  
  console.log('\n✅ Hoàn thành Batch 3 Lớp 9');
}

insertGrade9Batch3().catch(console.error);
