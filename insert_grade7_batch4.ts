import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);

async function insertGrade7Batch4() {
  console.log('Khởi tạo kết nối CSDL...');
  
  const users = await sql`SELECT user_id FROM public.questions WHERE user_id IS NOT NULL LIMIT 1`;
  const defaultUserId = users.length > 0 ? users[0].user_id : '00000000-0000-0000-0000-000000000000';

  const topics = [
    {
      name: 'Bài 29. Làm quen với biến cố.',
      questions: [
        { q: 'T7-C8B29-001', c: 'Trong xác suất, biến cố ngẫu nhiên là gì?', a: 'Một sự kiện có thể xảy ra hoặc không xảy ra sau một phép thử', s: 'Biến cố ngẫu nhiên phụ thuộc vào kết quả của phép thử, không thể biết trước chắc chắn.', d: 'nhan_biet', o: ['Một sự kiện luôn luôn xảy ra', 'Một sự kiện không bao giờ xảy ra', 'Một sự kiện có thể xảy ra hoặc không xảy ra sau một phép thử', 'Kết quả duy nhất của một phép thử'] },
        { q: 'T7-C8B29-002', c: 'Biến cố chắc chắn là biến cố có đặc điểm gì?', a: 'Luôn luôn xảy ra', s: 'Biến cố chắc chắn là sự kiện lúc nào cũng xảy ra khi thực hiện phép thử.', d: 'nhan_biet', o: ['Không bao giờ xảy ra', 'Luôn luôn xảy ra', 'Có lúc xảy ra, có lúc không', 'Xảy ra với xác suất bằng $0$'] },
        { q: 'T7-C8B29-003', c: 'Khi tung một đồng xu, biến cố "Đồng xu xuất hiện mặt sấp" là loại biến cố nào?', a: 'Biến cố ngẫu nhiên', s: 'Đồng xu có thể ra sấp hoặc ngửa, nên ra mặt sấp là biến cố ngẫu nhiên.', d: 'thong_hieu', o: ['Biến cố chắc chắn', 'Biến cố không thể', 'Biến cố ngẫu nhiên', 'Biến cố cố định'] },
        { q: 'T7-C8B29-004', c: 'Gieo một xúc xắc $6$ mặt, biến cố "Xuất hiện mặt $7$ chấm" là loại biến cố nào?', a: 'Biến cố không thể', s: 'Xúc xắc chỉ có từ 1 đến 6 chấm nên không thể ra 7 chấm.', d: 'thong_hieu', o: ['Biến cố chắc chắn', 'Biến cố không thể', 'Biến cố ngẫu nhiên', 'Biến cố độc lập'] },
        { q: 'T7-C8B29-005', c: 'Trong hộp có $3$ bi xanh, $2$ bi đỏ. Lấy ngẫu nhiên $1$ bi. Biến cố "Lấy được bi xanh hoặc bi đỏ" là:', a: 'Biến cố chắc chắn', s: 'Vì trong hộp chỉ có bi xanh và bi đỏ nên lấy ra chắc chắn phải là một trong hai màu này.', d: 'van_dung', o: ['Biến cố ngẫu nhiên', 'Biến cố không thể', 'Biến cố độc lập', 'Biến cố chắc chắn'] }
      ]
    },
    {
      name: 'Bài 30. Làm quen với xác suất của biến cố.',
      questions: [
        { q: 'T7-C8B30-001', c: 'Xác suất của một biến cố là một con số nằm trong khoảng nào?', a: 'Từ $0$ đến $1$', s: 'Xác suất luôn nằm trong đoạn $[0, 1]$.', d: 'nhan_biet', o: ['Từ $0$ đến $1$', 'Từ $-1$ đến $1$', 'Lớn hơn $1$', 'Nhỏ hơn $0$'] },
        { q: 'T7-C8B30-002', c: 'Xác suất của biến cố chắc chắn bằng bao nhiêu?', a: '$1$', s: 'Biến cố chắc chắn luôn xảy ra nên xác suất bằng $1$ (hoặc $100\\%$).', d: 'nhan_biet', o: ['$0$', '$0,5$', '$1$', '$100$'] },
        { q: 'T7-C8B30-003', c: 'Xác suất của biến cố không thể bằng bao nhiêu?', a: '$0$', s: 'Biến cố không thể không bao giờ xảy ra nên xác suất bằng $0$.', d: 'thong_hieu', o: ['$1$', '$0,5$', '$0$', '$-1$'] },
        { q: 'T7-C8B30-004', c: 'Gieo một con xúc xắc cân đối. Xác suất của biến cố "Xuất hiện mặt chẵn" là:', a: '$\\frac{1}{2}$', s: 'Có 3 mặt chẵn (2, 4, 6) trong 6 mặt. Xác suất là $\\frac{3}{6} = \\frac{1}{2}$.', d: 'thong_hieu', o: ['$\\frac{1}{6}$', '$\\frac{1}{3}$', '$\\frac{1}{2}$', '$\\frac{2}{3}$'] },
        { q: 'T7-C8B30-005', c: 'Tung một đồng xu cân đối, xác suất xuất hiện mặt ngửa là:', a: '$\\frac{1}{2}$', s: 'Đồng xu có 2 mặt có khả năng xuất hiện như nhau. Ngửa là 1 trong 2 mặt.', d: 'van_dung', o: ['$1$', '$\\frac{1}{2}$', '$0$', '$\\frac{1}{4}$'] }
      ]
    },
    {
      name: 'Bài tập cuối chương VIII.',
      questions: [
        { q: 'T7-C8OT-001', c: 'Biến cố "Mặt trời mọc ở hướng Đông" là:', a: 'Biến cố chắc chắn', s: 'Đây là sự thật hiển nhiên, luôn luôn xảy ra.', d: 'nhan_biet', o: ['Biến cố ngẫu nhiên', 'Biến cố chắc chắn', 'Biến cố không thể', 'Cả ba đều sai'] },
        { q: 'T7-C8OT-002', c: 'Chọn ngẫu nhiên $1$ ngày trong tuần. Xác suất để chọn được ngày Chủ nhật là:', a: '$\\frac{1}{7}$', s: 'Một tuần có 7 ngày, Chủ nhật là 1 ngày trong đó.', d: 'thong_hieu', o: ['$\\frac{1}{5}$', '$\\frac{1}{7}$', '$\\frac{2}{7}$', '$\\frac{1}{365}$'] },
        { q: 'T7-C8OT-003', c: 'Trong hộp có $5$ viên bi xanh. Rút ngẫu nhiên $1$ viên. Xác suất của biến cố "Rút được viên bi đỏ" là:', a: '$0$', s: 'Trong hộp không có bi đỏ nên biến cố này là không thể, xác suất bằng 0.', d: 'thong_hieu', o: ['$1$', '$\\frac{1}{5}$', '$0$', '$\\frac{1}{2}$'] },
        { q: 'T7-C8OT-004', c: 'Trong hộp có $4$ viên kẹo cam. Rút $1$ viên. Biến cố "Rút được viên kẹo cam" là biến cố gì?', a: 'Chắc chắn', s: 'Hộp chỉ toàn kẹo cam nên rút ra chắc chắn là kẹo cam.', d: 'thong_hieu', o: ['Chắc chắn', 'Ngẫu nhiên', 'Không thể', 'Không xác định được'] },
        { q: 'T7-C8OT-005', c: 'Lấy ngẫu nhiên một thẻ từ $10$ thẻ đánh số từ $1$ đến $10$. Xác suất lấy được thẻ là số chia hết cho $5$ là:', a: '$\\frac{1}{5}$', s: 'Các số chia hết cho 5 là 5 và 10 (có 2 số). Xác suất là $\\frac{2}{10} = \\frac{1}{5}$.', d: 'van_dung', o: ['$\\frac{1}{5}$', '$\\frac{1}{10}$', '$\\frac{2}{5}$', '$\\frac{1}{2}$'] }
      ]
    },
    {
      name: 'Bài 31. Quan hệ giữa góc và cạnh đối diện trong một tam giác.',
      questions: [
        { q: 'T7-C9B31-001', c: 'Trong một tam giác, góc đối diện với cạnh lớn hơn thì:', a: 'Lớn hơn', s: 'Định lí: Trong một tam giác, góc đối diện với cạnh lớn hơn là góc lớn hơn.', d: 'nhan_biet', o: ['Bằng nhau', 'Nhỏ hơn', 'Lớn hơn', 'Không xác định được'] },
        { q: 'T7-C9B31-002', c: 'Trong một tam giác, cạnh đối diện với góc lớn hơn thì:', a: 'Lớn hơn', s: 'Định lí: Cạnh đối diện với góc lớn hơn là cạnh lớn hơn.', d: 'nhan_biet', o: ['Lớn hơn', 'Nhỏ hơn', 'Bằng nhau', 'Vuông góc'] },
        { q: 'T7-C9B31-003', c: 'Tam giác $ABC$ có $AB=3$cm, $AC=4$cm, $BC=5$cm. Góc lớn nhất của tam giác là:', a: '$\\widehat{A}$', s: 'Cạnh $BC$ lớn nhất ($5$cm) nên góc đối diện với nó là góc $A$ lớn nhất.', d: 'thong_hieu', o: ['$\\widehat{A}$', '$\\widehat{B}$', '$\\widehat{C}$', 'Không có góc lớn nhất'] },
        { q: 'T7-C9B31-004', c: 'Tam giác $ABC$ có $\\widehat{A}=60^\\circ, \\widehat{B}=70^\\circ$. Cạnh nhỏ nhất của tam giác là:', a: 'Cạnh $AB$', s: '$\\widehat{C} = 180^\\circ - (60^\\circ + 70^\\circ) = 50^\\circ$. Góc $C$ nhỏ nhất nên cạnh đối diện $AB$ nhỏ nhất.', d: 'thong_hieu', o: ['Cạnh $AB$', 'Cạnh $BC$', 'Cạnh $AC$', 'Ba cạnh bằng nhau'] },
        { q: 'T7-C9B31-005', c: 'Trong tam giác vuông, cạnh nào luôn là cạnh lớn nhất?', a: 'Cạnh huyền', s: 'Góc vuông là góc lớn nhất trong tam giác vuông, nên cạnh huyền đối diện góc vuông là cạnh lớn nhất.', d: 'van_dung', o: ['Cạnh góc vuông thứ nhất', 'Cạnh góc vuông thứ hai', 'Đường cao', 'Cạnh huyền'] }
      ]
    },
    {
      name: 'Bài 32. Quan hệ giữa đường vuông góc và đường xiên.',
      questions: [
        { q: 'T7-C9B32-001', c: 'Khoảng cách từ một điểm nằm ngoài một đường thẳng đến đường thẳng đó là độ dài đoạn thẳng nào?', a: 'Đoạn vuông góc kẻ từ điểm đó đến đường thẳng', s: 'Khoảng cách luôn được đo bằng đoạn vuông góc (đoạn ngắn nhất).', d: 'nhan_biet', o: ['Đường xiên bất kì', 'Đoạn vuông góc kẻ từ điểm đó đến đường thẳng', 'Đường thẳng song song', 'Đoạn nối từ điểm đó tới một điểm bất kì'] },
        { q: 'T7-C9B32-002', c: 'Hình chiếu của một điểm $A$ lên đường thẳng $d$ là:', a: 'Chân đường vuông góc kẻ từ $A$ đến $d$', s: 'Định nghĩa hình chiếu.', d: 'nhan_biet', o: ['Một điểm bất kì trên $d$', 'Chân đường vuông góc kẻ từ $A$ đến $d$', 'Trung điểm của đoạn vuông góc', 'Một đường thẳng đi qua $A$'] },
        { q: 'T7-C9B32-003', c: 'Cho đường thẳng $d$ và điểm $A$ nằm ngoài $d$. Kẻ $AH \\perp d$ tại $H$, lấy $B \\in d$. Khẳng định nào ĐÚNG?', a: '$AH \\le AB$', s: 'Đường vuông góc luôn ngắn hơn hoặc bằng mọi đường xiên. Bằng nhau khi $B$ trùng $H$.', d: 'thong_hieu', o: ['$AH > AB$', '$AH \\ge AB$', '$AH \\le AB$', '$AH = AB$'] },
        { q: 'T7-C9B32-004', c: 'Nếu hai đường xiên kẻ từ một điểm đến một đường thẳng bằng nhau thì hai hình chiếu tương ứng của chúng:', a: 'Bằng nhau', s: 'Theo quan hệ đường xiên và hình chiếu, đường xiên bằng nhau thì hình chiếu bằng nhau.', d: 'thong_hieu', o: ['Bằng nhau', 'Đường xiên nào có góc lớn hơn thì hình chiếu lớn hơn', 'Không bằng nhau', 'Song song với nhau'] },
        { q: 'T7-C9B32-005', c: 'Từ điểm $A$ ngoài đường thẳng $d$, kẻ $AH \\perp d$ tại $H$. Nếu lấy $B, C \\in d$ sao cho $HB < HC$ thì khẳng định nào ĐÚNG?', a: '$AB < AC$', s: 'Hình chiếu nhỏ hơn thì đường xiên nhỏ hơn.', d: 'van_dung', o: ['$AB > AC$', '$AB < AC$', '$AB = AC$', 'Không so sánh được'] }
      ]
    },
    {
      name: 'Bài 33. Quan hệ giữa ba cạnh của một tam giác.',
      questions: [
        { q: 'T7-C9B33-001', c: 'Bất đẳng thức tam giác phát biểu rằng tổng độ dài hai cạnh bất kì của một tam giác luôn:', a: 'Lớn hơn độ dài cạnh còn lại', s: 'Nội dung định lí bất đẳng thức tam giác.', d: 'nhan_biet', o: ['Bằng độ dài cạnh còn lại', 'Nhỏ hơn độ dài cạnh còn lại', 'Lớn hơn độ dài cạnh còn lại', 'Bằng tổng hai góc còn lại'] },
        { q: 'T7-C9B33-002', c: 'Trong tam giác $ABC$, hệ thức nào sau đây thể hiện đúng bất đẳng thức tam giác đối với cạnh $BC$?', a: '$|AB - AC| < BC < AB + AC$', s: 'Độ dài một cạnh luôn lớn hơn hiệu và nhỏ hơn tổng hai cạnh kia.', d: 'nhan_biet', o: ['$BC > AB + AC$', '$|AB - AC| < BC < AB + AC$', '$BC < |AB - AC|$', '$BC = AB + AC$'] },
        { q: 'T7-C9B33-003', c: 'Bộ ba độ dài đoạn thẳng nào sau đây CÓ THỂ là ba cạnh của một tam giác?', a: '$3$cm, $4$cm, $5$cm', s: '$3+4=7>5$, thỏa mãn bất đẳng thức tam giác.', d: 'thong_hieu', o: ['$2$cm, $3$cm, $6$cm', '$3$cm, $4$cm, $5$cm', '$1$cm, $2$cm, $3$cm', '$3$cm, $3$cm, $7$cm'] },
        { q: 'T7-C9B33-004', c: 'Tam giác $ABC$ có $AB = 3$cm, $AC = 7$cm. Độ dài $BC$ (là số nguyên) CÓ THỂ nhận giá trị nào sau đây?', a: '$5$cm', s: 'Ta có $7 - 3 < BC < 7 + 3 \\Rightarrow 4 < BC < 10$. Số nguyên thỏa mãn trong các đáp án là 5.', d: 'thong_hieu', o: ['$3$cm', '$4$cm', '$5$cm', '$11$cm'] },
        { q: 'T7-C9B33-005', c: 'Một tam giác cân có độ dài hai cạnh là $2$cm và $5$cm. Chu vi của tam giác đó là:', a: '$12$cm', s: 'Cạnh thứ ba phải là $5$ (vì nếu là $2$ thì $2+2 < 5$ loại). Vậy ba cạnh là $2, 5, 5$. Chu vi là $12$cm.', d: 'van_dung', o: ['$9$cm', '$12$cm', '$10$cm', '$14$cm'] }
      ]
    },
    {
      name: 'Bài 34. Sự đồng quy của ba trung tuyến, ba đường phân giác trong một tam giác.',
      questions: [
        { q: 'T7-C9B34-001', c: 'Ba đường trung tuyến của tam giác đồng quy tại một điểm gọi là:', a: 'Trọng tâm', s: 'Giao điểm của ba đường trung tuyến là trọng tâm.', d: 'nhan_biet', o: ['Trực tâm', 'Trọng tâm', 'Tâm đường tròn ngoại tiếp', 'Tâm đường tròn nội tiếp'] },
        { q: 'T7-C9B34-002', c: 'Ba đường phân giác của một tam giác đồng quy tại một điểm có tính chất gì?', a: 'Cách đều ba cạnh của tam giác', s: 'Giao điểm của ba phân giác là tâm đường tròn nội tiếp, cách đều ba cạnh.', d: 'nhan_biet', o: ['Cách đều ba đỉnh của tam giác', 'Cách đều ba cạnh của tam giác', 'Nằm trên đường cao', 'Trùng với trọng tâm'] },
        { q: 'T7-C9B34-003', c: 'Trọng tâm $G$ của tam giác cách mỗi đỉnh một khoảng bằng bao nhiêu phần độ dài đường trung tuyến đi qua đỉnh đó?', a: '$\\frac{2}{3}$', s: 'Khoảng cách từ đỉnh đến trọng tâm bằng 2/3 trung tuyến.', d: 'thong_hieu', o: ['$\\frac{1}{2}$', '$\\frac{1}{3}$', '$\\frac{2}{3}$', '$\\frac{3}{4}$'] },
        { q: 'T7-C9B34-004', c: 'Giao điểm của ba đường phân giác của tam giác là tâm của đường tròn nào?', a: 'Đường tròn nội tiếp tam giác', s: 'Điểm này cách đều ba cạnh nên là tâm đường tròn nội tiếp.', d: 'thong_hieu', o: ['Đường tròn nội tiếp tam giác', 'Đường tròn ngoại tiếp tam giác', 'Đường tròn đi qua 3 trung điểm', 'Đường tròn Euler'] },
        { q: 'T7-C9B34-005', c: 'Tam giác $ABC$ có đường trung tuyến $AM = 9$cm, $G$ là trọng tâm. Tính độ dài $AG$?', a: '$6$cm', s: '$AG = \\frac{2}{3} AM = \\frac{2}{3} \\times 9 = 6$cm.', d: 'van_dung', o: ['$3$cm', '$4.5$cm', '$6$cm', '$9$cm'] }
      ]
    },
    {
      name: 'Bài 35. Sự đồng quy của ba đường trung trực, ba đường cao trong một tam giác.',
      questions: [
        { q: 'T7-C9B35-001', c: 'Ba đường trung trực của tam giác đồng quy tại một điểm có tính chất gì?', a: 'Cách đều ba đỉnh của tam giác', s: 'Giao điểm 3 trung trực là tâm đường tròn ngoại tiếp, cách đều 3 đỉnh.', d: 'nhan_biet', o: ['Cách đều ba cạnh của tam giác', 'Cách đều ba đỉnh của tam giác', 'Thuộc ba đường cao', 'Trùng với trực tâm'] },
        { q: 'T7-C9B35-002', c: 'Ba đường cao của tam giác đồng quy tại một điểm gọi là:', a: 'Trực tâm', s: 'Định nghĩa trực tâm.', d: 'nhan_biet', o: ['Trọng tâm', 'Trực tâm', 'Tâm đường tròn ngoại tiếp', 'Tâm đường tròn nội tiếp'] },
        { q: 'T7-C9B35-003', c: 'Trong tam giác nhọn, trực tâm nằm ở đâu?', a: 'Bên trong tam giác', s: 'Tam giác nhọn có trực tâm nằm bên trong.', d: 'thong_hieu', o: ['Bên trong tam giác', 'Bên ngoài tam giác', 'Trên một đỉnh của tam giác', 'Trên trung điểm một cạnh'] },
        { q: 'T7-C9B35-004', c: 'Trong tam giác vuông, giao điểm của ba đường trung trực nằm ở đâu?', a: 'Trung điểm của cạnh huyền', s: 'Trong tam giác vuông, tâm ngoại tiếp chính là trung điểm cạnh huyền.', d: 'thong_hieu', o: ['Trùng với đỉnh góc vuông', 'Trung điểm của cạnh huyền', 'Bên ngoài tam giác', 'Trọng tâm tam giác'] },
        { q: 'T7-C9B35-005', c: 'Trong một tam giác đều, trực tâm, trọng tâm, tâm đường tròn ngoại tiếp, nội tiếp có đặc điểm gì?', a: 'Trùng nhau', s: 'Tính chất đặc biệt của tam giác đều.', d: 'van_dung', o: ['Nằm trên $4$ đỉnh khác nhau', 'Tạo thành một đường thẳng', 'Trùng nhau', 'Không tồn tại'] }
      ]
    },
    {
      name: 'Bài tập cuối chương IX.',
      questions: [
        { q: 'T7-C9OT-001', c: 'Điểm cách đều ba đỉnh của một tam giác là giao điểm của:', a: 'Ba đường trung trực', s: 'Giao điểm 3 trung trực cách đều 3 đỉnh.', d: 'nhan_biet', o: ['Ba đường cao', 'Ba đường trung tuyến', 'Ba đường trung trực', 'Ba đường phân giác'] },
        { q: 'T7-C9OT-002', c: 'Một tam giác có trọng tâm trùng với trực tâm thì tam giác đó là:', a: 'Tam giác đều', s: 'Nếu một tam giác có 2 trong 4 điểm đặc biệt trùng nhau thì nó là tam giác đều.', d: 'thong_hieu', o: ['Tam giác vuông', 'Tam giác cân', 'Tam giác đều', 'Tam giác vuông cân'] },
        { q: 'T7-C9OT-003', c: 'Trong tam giác cân, đường phân giác kẻ từ đỉnh góc ở đáy thì có trùng với đường cao không?', a: 'Không nhất thiết (chỉ trùng khi là tam giác đều)', s: 'Chỉ có đường phân giác từ đỉnh cân mới trùng đường cao.', d: 'thong_hieu', o: ['Luôn trùng', 'Không nhất thiết (chỉ trùng khi là tam giác đều)', 'Luôn vuông góc', 'Trùng với trung trực cạnh bên'] },
        { q: 'T7-C9OT-004', c: 'Đường trung trực của đoạn thẳng $AB$ cắt $AB$ tại $I$. Khẳng định nào đúng?', a: '$I$ là trung điểm của $AB$', s: 'Đường trung trực vuông góc với đoạn thẳng tại trung điểm của nó.', d: 'thong_hieu', o: ['$I$ chia $AB$ theo tỉ lệ $1:2$', '$I$ là trung điểm của $AB$', '$I$ nằm ngoài đoạn $AB$', '$I$ trùng với $A$'] },
        { q: 'T7-C9OT-005', c: 'Tam giác vuông có một góc nhọn bằng $30^\\circ$. Cạnh góc vuông đối diện với góc $30^\\circ$ bằng:', a: 'Nửa cạnh huyền', s: 'Tính chất: Trong tam giác vuông, cạnh đối diện góc $30^\\circ$ bằng nửa cạnh huyền.', d: 'van_dung', o: ['Nửa cạnh huyền', 'Bằng cạnh huyền', 'Bằng cạnh góc vuông kia', 'Gấp đôi cạnh huyền'] }
      ]
    },
    {
      name: 'Bài 36. Hình hộp chữ nhật và hình lập phương.',
      questions: [
        { q: 'T7-C10B36-001', c: 'Hình hộp chữ nhật có bao nhiêu mặt và bao nhiêu đỉnh?', a: '$6$ mặt, $8$ đỉnh', s: 'Hình hộp chữ nhật có 6 mặt, 8 đỉnh, 12 cạnh.', d: 'nhan_biet', o: ['$4$ mặt, $6$ đỉnh', '$6$ mặt, $8$ đỉnh', '$8$ mặt, $6$ đỉnh', '$6$ mặt, $12$ đỉnh'] },
        { q: 'T7-C10B36-002', c: 'Các mặt của hình lập phương là những hình gì?', a: 'Các hình vuông bằng nhau', s: 'Định nghĩa hình lập phương: 6 mặt là 6 hình vuông bằng nhau.', d: 'nhan_biet', o: ['Các hình chữ nhật', 'Các hình thoi', 'Các hình vuông bằng nhau', 'Các hình bình hành'] },
        { q: 'T7-C10B36-003', c: 'Công thức tính thể tích của hình hộp chữ nhật có ba kích thước $a, b, c$ là:', a: '$V = a \\cdot b \\cdot c$', s: 'Thể tích hình hộp chữ nhật bằng tích 3 kích thước.', d: 'thong_hieu', o: ['$V = a + b + c$', '$V = 2(a+b)c$', '$V = a \\cdot b \\cdot c$', '$V = (a+b) \\cdot c$'] },
        { q: 'T7-C10B36-004', c: 'Thể tích của hình lập phương có cạnh $a$ bằng:', a: '$a^3$', s: 'Thể tích hình lập phương $V = a \\cdot a \\cdot a = a^3$.', d: 'thong_hieu', o: ['$3a$', '$a^2$', '$6a^2$', '$a^3$'] },
        { q: 'T7-C10B36-005', c: 'Tính thể tích hình hộp chữ nhật có các kích thước $2$cm, $3$cm, $4$cm:', a: '$24$cm$^3$', s: '$V = 2 \\cdot 3 \\cdot 4 = 24$cm$^3$.', d: 'van_dung', o: ['$9$cm$^3$', '$14$cm$^3$', '$24$cm$^3$', '$48$cm$^3$'] }
      ]
    },
    {
      name: 'Bài 37. Hình lăng trụ đứng tam giác và hình lăng trụ đứng tứ giác.',
      questions: [
        { q: 'T7-C10B37-001', c: 'Các mặt bên của hình lăng trụ đứng là hình gì?', a: 'Hình chữ nhật', s: 'Tính chất lăng trụ đứng: các mặt bên đều là hình chữ nhật.', d: 'nhan_biet', o: ['Hình vuông', 'Hình chữ nhật', 'Hình bình hành', 'Hình tam giác'] },
        { q: 'T7-C10B37-002', c: 'Hình lăng trụ đứng tam giác có hai mặt đáy là hình gì?', a: 'Hình tam giác', s: 'Tên gọi chỉ ra đáy là hình tam giác.', d: 'nhan_biet', o: ['Hình chữ nhật', 'Hình tứ giác', 'Hình tam giác', 'Hình vuông'] },
        { q: 'T7-C10B37-003', c: 'Diện tích xung quanh của lăng trụ đứng được tính bằng công thức:', a: 'Chu vi đáy nhân với chiều cao', s: '$S_{xq} = C_{đáy} \\cdot h$.', d: 'thong_hieu', o: ['Diện tích đáy nhân với chiều cao', 'Chu vi đáy nhân với chiều cao', 'Tổng diện tích $2$ đáy', 'Chu vi đáy cộng chiều cao'] },
        { q: 'T7-C10B37-004', c: 'Thể tích của hình lăng trụ đứng được tính bằng công thức:', a: 'Diện tích đáy nhân với chiều cao', s: '$V = S_{đáy} \\cdot h$.', d: 'thong_hieu', o: ['Chu vi đáy nhân chiều cao', 'Diện tích đáy nhân với chiều cao', 'Tích ba kích thước', 'Một phần ba diện tích đáy nhân chiều cao'] },
        { q: 'T7-C10B37-005', c: 'Một lăng trụ đứng tam giác có diện tích đáy $10$cm$^2$, chiều cao $5$cm. Thể tích của lăng trụ là:', a: '$50$cm$^3$', s: '$V = 10 \\cdot 5 = 50$cm$^3$.', d: 'van_dung', o: ['$15$cm$^3$', '$50$cm$^3$', '$100$cm$^3$', '$25$cm$^3$'] }
      ]
    },
    {
      name: 'Bài tập cuối chương X.',
      questions: [
        { q: 'T7-C10OT-001', c: 'Hình hộp chữ nhật có bao nhiêu cạnh?', a: '$12$ cạnh', s: 'Hình hộp chữ nhật có $12$ cạnh ($4$ cạnh dài, $4$ cạnh rộng, $4$ cạnh cao).', d: 'nhan_biet', o: ['$6$ cạnh', '$8$ cạnh', '$10$ cạnh', '$12$ cạnh'] },
        { q: 'T7-C10OT-002', c: 'Hình lăng trụ đứng tứ giác có bao nhiêu mặt (cả mặt bên và mặt đáy)?', a: '$6$ mặt', s: 'Gồm $2$ đáy (tứ giác) và $4$ mặt bên (hình chữ nhật) tổng cộng $6$ mặt.', d: 'thong_hieu', o: ['$4$ mặt', '$5$ mặt', '$6$ mặt', '$8$ mặt'] },
        { q: 'T7-C10OT-003', c: 'Công thức $V = S_{đáy} \\cdot h$ áp dụng để tính thể tích của:', a: 'Mọi hình lăng trụ đứng', s: 'Công thức này áp dụng chung cho mọi lăng trụ (đứng, tam giác, tứ giác...).', d: 'thong_hieu', o: ['Chỉ hình hộp chữ nhật', 'Chỉ hình lập phương', 'Mọi hình lăng trụ đứng', 'Hình chóp'] },
        { q: 'T7-C10OT-004', c: 'Diện tích toàn phần của hình lập phương có cạnh bằng $a$ là:', a: '$6a^2$', s: 'Gồm $6$ mặt là hình vuông cạnh $a$, nên tổng diện tích là $6a^2$.', d: 'thong_hieu', o: ['$4a^2$', '$6a^2$', '$a^3$', '$8a^2$'] },
        { q: 'T7-C10OT-005', c: 'Một hình hộp chữ nhật có $3$ kích thước lần lượt là $3$cm, $4$cm, $5$cm. Diện tích toàn phần của hình hộp là:', a: '$94$cm$^2$', s: '$S_{tp} = 2(3 \\cdot 4 + 4 \\cdot 5 + 3 \\cdot 5) = 2(12 + 20 + 15) = 2 \\cdot 47 = 94$cm$^2$.', d: 'van_dung', o: ['$60$cm$^2$', '$47$cm$^2$', '$94$cm$^2$', '$120$cm$^2$'] }
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
  
  console.log('\n✅ Hoàn thành Batch 4 Lớp 7');
}

insertGrade7Batch4().catch(console.error);
