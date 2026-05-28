import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);

async function insertGrade7Batch2() {
  console.log('Khởi tạo kết nối CSDL...');
  
  const users = await sql`SELECT user_id FROM public.questions WHERE user_id IS NOT NULL LIMIT 1`;
  const defaultUserId = users.length > 0 ? users[0].user_id : '00000000-0000-0000-0000-000000000000';

  const topics = [
    {
      name: 'Bài 12. Tổng các góc trong một tam giác.',
      questions: [
        { q: 'T7-C4B12-001', c: 'Tổng ba góc trong một tam giác bằng bao nhiêu?', a: '$180^\\circ$', s: 'Định lí: Tổng ba góc của một tam giác bằng $180^\\circ$.', d: 'nhan_biet', o: ['$90^\\circ$', '$180^\\circ$', '$270^\\circ$', '$360^\\circ$'] },
        { q: 'T7-C4B12-002', c: 'Tam giác $ABC$ có $\\widehat{A} = 50^\\circ, \\widehat{B} = 60^\\circ$. Số đo góc $C$ là:', a: '$70^\\circ$', s: '$\\widehat{C} = 180^\\circ - (50^\\circ + 60^\\circ) = 70^\\circ$.', d: 'thong_hieu', o: ['$60^\\circ$', '$70^\\circ$', '$80^\\circ$', '$90^\\circ$'] },
        { q: 'T7-C4B12-003', c: 'Trong một tam giác vuông, tổng hai góc nhọn bằng bao nhiêu?', a: '$90^\\circ$', s: 'Tam giác vuông có một góc bằng $90^\\circ$, nên tổng hai góc nhọn còn lại là $180^\\circ - 90^\\circ = 90^\\circ$.', d: 'thong_hieu', o: ['$45^\\circ$', '$60^\\circ$', '$90^\\circ$', '$180^\\circ$'] },
        { q: 'T7-C4B12-004', c: 'Góc ngoài của một tam giác bằng:', a: 'Tổng hai góc trong không kề với nó', s: 'Tính chất góc ngoài của tam giác.', d: 'thong_hieu', o: ['Tổng ba góc trong của tam giác', 'Tổng hai góc trong không kề với nó', 'Góc trong kề với nó', 'Hiệu hai góc trong không kề với nó'] },
        { q: 'T7-C4B12-005', c: 'Tam giác $DEF$ có $\\widehat{D} = \\widehat{E} = 45^\\circ$. Tam giác $DEF$ là tam giác gì?', a: 'Tam giác vuông cân', s: '$\\widehat{F} = 180^\\circ - 45^\\circ - 45^\\circ = 90^\\circ$. Tam giác có một góc vuông và hai góc nhọn bằng nhau là tam giác vuông cân.', d: 'van_dung', o: ['Tam giác đều', 'Tam giác vuông', 'Tam giác cân', 'Tam giác vuông cân'] }
      ]
    },
    {
      name: 'Bài 13. Hai tam giác bằng nhau. Trường hợp bằng nhau thứ nhất của tam giác.',
      questions: [
        { q: 'T7-C4B13-001', c: 'Hai tam giác bằng nhau là hai tam giác có:', a: 'Các cạnh tương ứng bằng nhau, các góc tương ứng bằng nhau', s: 'Định nghĩa: Hai tam giác bằng nhau là hai tam giác có các cạnh tương ứng bằng nhau và các góc tương ứng bằng nhau.', d: 'nhan_biet', o: ['Các cạnh bằng nhau', 'Các góc bằng nhau', 'Các cạnh tương ứng bằng nhau, các góc tương ứng bằng nhau', 'Chu vi bằng nhau'] },
        { q: 'T7-C4B13-002', c: 'Trường hợp bằng nhau thứ nhất của tam giác (cạnh - cạnh - cạnh) được phát biểu như thế nào?', a: 'Nếu ba cạnh của tam giác này bằng ba cạnh của tam giác kia thì hai tam giác đó bằng nhau', s: 'Nội dung định lí trường hợp c-c-c.', d: 'nhan_biet', o: ['Nếu hai cạnh và một góc của tam giác này bằng hai cạnh và một góc của tam giác kia thì hai tam giác đó bằng nhau', 'Nếu ba góc của tam giác này bằng ba góc của tam giác kia thì hai tam giác đó bằng nhau', 'Nếu ba cạnh của tam giác này bằng ba cạnh của tam giác kia thì hai tam giác đó bằng nhau', 'Nếu ba cạnh của tam giác này tỉ lệ với ba cạnh của tam giác kia thì bằng nhau'] },
        { q: 'T7-C4B13-003', c: 'Cho $\\Delta ABC = \\Delta MNP$. Khẳng định nào sau đây SAI?', a: '$AB = MP$', s: 'Theo thứ tự đỉnh tương ứng, ta có $AB = MN$, $AC = MP$, $BC = NP$. Vậy $AB = MP$ là sai.', d: 'thong_hieu', o: ['$AB = MN$', '$BC = NP$', '$AB = MP$', '$\\widehat{A} = \\widehat{M}$'] },
        { q: 'T7-C4B13-004', c: 'Cho $\\Delta ABC = \\Delta DEF$. Biết $AB = 3$cm, $AC = 4$cm, $EF = 5$cm. Chu vi $\\Delta DEF$ là:', a: '$12$cm', s: 'Vì $\\Delta ABC = \\Delta DEF$ nên $DE = AB = 3$cm, $DF = AC = 4$cm. Chu vi $\\Delta DEF = DE + EF + DF = 3 + 5 + 4 = 12$cm.', d: 'thong_hieu', o: ['$10$cm', '$12$cm', '$14$cm', '$15$cm'] },
        { q: 'T7-C4B13-005', c: 'Cho hai tam giác $ABC$ và $MNP$ có $AB=MN, BC=NP, CA=PM$. Khẳng định nào ĐÚNG?', a: '$\\Delta ABC = \\Delta MNP$', s: 'Hai tam giác có 3 cặp cạnh bằng nhau thì bằng nhau theo trường hợp (c-c-c). Các đỉnh phải được viết theo đúng thứ tự tương ứng.', d: 'van_dung', o: ['$\\Delta ABC = \\Delta MPN$', '$\\Delta ABC = \\Delta NPM$', '$\\Delta ABC = \\Delta MNP$', '$\\Delta ABC = \\Delta PNM$'] }
      ]
    },
    {
      name: 'Bài 14. Trường hợp bằng nhau thứ hai và thứ ba của tam giác.',
      questions: [
        { q: 'T7-C4B14-001', c: 'Trường hợp bằng nhau cạnh - góc - cạnh (c.g.c) phát biểu:', a: 'Nếu hai cạnh và góc xen giữa của tam giác này bằng hai cạnh và góc xen giữa của tam giác kia', s: 'Định lí c.g.c yêu cầu góc phải xen giữa hai cạnh.', d: 'nhan_biet', o: ['Nếu hai cạnh và một góc của tam giác này bằng hai cạnh và một góc của tam giác kia', 'Nếu hai cạnh và góc xen giữa của tam giác này bằng hai cạnh và góc xen giữa của tam giác kia', 'Nếu một cạnh và hai góc của tam giác này bằng một cạnh và hai góc của tam giác kia', 'Nếu ba góc của tam giác này bằng ba góc của tam giác kia'] },
        { q: 'T7-C4B14-002', c: 'Trường hợp bằng nhau góc - cạnh - góc (g.c.g) yêu cầu cạnh phải như thế nào so với hai góc?', a: 'Cạnh xen giữa hai góc', s: 'Định lí g.c.g: Nếu một cạnh và hai góc kề của tam giác này bằng một cạnh và hai góc kề của tam giác kia.', d: 'nhan_biet', o: ['Cạnh bất kì', 'Cạnh đối diện với góc lớn nhất', 'Cạnh xen giữa hai góc', 'Cạnh đối diện với góc vuông'] },
        { q: 'T7-C4B14-003', c: 'Cho $\\Delta ABC$ và $\\Delta DEF$ có $AB=DE, \\widehat{A}=\\widehat{D}$. Cần thêm điều kiện gì để $\\Delta ABC = \\Delta DEF$ theo trường hợp c.g.c?', a: '$AC = DF$', s: 'Góc xen giữa $AB$ và $AC$ là $\\widehat{A}$, góc xen giữa $DE$ và $DF$ là $\\widehat{D}$. Cần $AC=DF$.', d: 'thong_hieu', o: ['$BC = EF$', '$\\widehat{B} = \\widehat{E}$', '$AC = DF$', '$\\widehat{C} = \\widehat{F}$'] },
        { q: 'T7-C4B14-004', c: 'Cho $\\Delta ABC$ và $\\Delta MNP$ có $\\widehat{B}=\\widehat{N}, BC=NP, \\widehat{C}=\\widehat{P}$. Khi đó hai tam giác bằng nhau theo trường hợp nào?', a: 'Góc - cạnh - góc (g.c.g)', s: 'Hai góc và cạnh xen giữa bằng nhau nên là g.c.g.', d: 'thong_hieu', o: ['Cạnh - cạnh - cạnh (c.c.c)', 'Cạnh - góc - cạnh (c.g.c)', 'Góc - cạnh - góc (g.c.g)', 'Cạnh huyền - góc nhọn'] },
        { q: 'T7-C4B14-005', c: 'Cho $\\Delta ABC$ có $AB=AC$. Kẻ phân giác $AD$ của góc $A$ ($D \\in BC$). $\\Delta ABD = \\Delta ACD$ theo trường hợp nào?', a: 'Cạnh - góc - cạnh (c.g.c)', s: 'Ta có $AB=AC$ (gt), $\\widehat{BAD}=\\widehat{CAD}$ (phân giác), $AD$ chung. Nên $\\Delta ABD = \\Delta ACD$ (c.g.c).', d: 'van_dung', o: ['Góc - góc - góc (g.g.g)', 'Góc - cạnh - góc (g.c.g)', 'Cạnh - góc - cạnh (c.g.c)', 'Cạnh - cạnh - cạnh (c.c.c)'] }
      ]
    },
    {
      name: 'Bài 15. Các trường hợp bằng nhau của tam giác vuông.',
      questions: [
        { q: 'T7-C4B15-001', c: 'Hai tam giác vuông bằng nhau (theo trường hợp hai cạnh góc vuông) nếu:', a: 'Hai cạnh góc vuông của tam giác này bằng hai cạnh góc vuông của tam giác kia', s: 'Đây là hệ quả của trường hợp c.g.c (vì góc vuông xen giữa 2 cạnh góc vuông luôn bằng $90^\\circ$).', d: 'nhan_biet', o: ['Cạnh huyền và một cạnh góc vuông bằng nhau', 'Cạnh huyền và một góc nhọn bằng nhau', 'Hai cạnh góc vuông của tam giác này bằng hai cạnh góc vuông của tam giác kia', 'Hai góc nhọn bằng nhau'] },
        { q: 'T7-C4B15-002', c: 'Trường hợp bằng nhau chỉ dành riêng cho tam giác vuông là:', a: 'Cạnh huyền - góc nhọn và Cạnh huyền - cạnh góc vuông', s: 'Ngoài các trường hợp chung, tam giác vuông có 2 trường hợp đặc biệt này.', d: 'nhan_biet', o: ['Cạnh - cạnh - cạnh', 'Cạnh - góc - cạnh', 'Cạnh huyền - góc nhọn và Cạnh huyền - cạnh góc vuông', 'Góc - cạnh - góc'] },
        { q: 'T7-C4B15-003', c: '$\\Delta ABC$ ($\\widehat{A}=90^\\circ$) và $\\Delta DEF$ ($\\widehat{D}=90^\\circ$). Biết $BC = EF, \\widehat{B} = \\widehat{E}$. Hai tam giác bằng nhau theo trường hợp?', a: 'Cạnh huyền - góc nhọn', s: '$BC, EF$ là cạnh huyền, $\\widehat{B}, \\widehat{E}$ là góc nhọn tương ứng.', d: 'thong_hieu', o: ['Cạnh huyền - cạnh góc vuông', 'Cạnh huyền - góc nhọn', 'Hai cạnh góc vuông', 'Cạnh - góc - cạnh'] },
        { q: 'T7-C4B15-004', c: 'Để hai tam giác vuông $\\Delta ABC$ ($\\widehat{A}=90^\\circ$) và $\\Delta DEF$ ($\\widehat{D}=90^\\circ$) bằng nhau theo trường hợp cạnh huyền - cạnh góc vuông, biết $BC = EF$, ta cần thêm điều kiện gì?', a: '$AB=DE$ hoặc $AC=DF$', s: 'Cần thêm một cặp cạnh góc vuông bằng nhau.', d: 'thong_hieu', o: ['$\\widehat{B} = \\widehat{E}$', '$\\widehat{C} = \\widehat{F}$', '$AB=DE$ hoặc $AC=DF$', 'Cả A và B đều đúng'] },
        { q: 'T7-C4B15-005', c: 'Cho điểm $M$ nằm trên tia phân giác của góc $xOy$. Kẻ $MA \\perp Ox$ tại $A$, $MB \\perp Oy$ tại $B$. Khẳng định nào sau đây ĐÚNG?', a: '$MA = MB$', s: 'Hai tam giác vuông $\\Delta OAM = \\Delta OBM$ (cạnh huyền - góc nhọn) $\\Rightarrow MA = MB$. Tính chất điểm nằm trên phân giác.', d: 'van_dung', o: ['$MA > MB$', '$MA < MB$', '$MA = MB$', '$OA = MB$'] }
      ]
    },
    {
      name: 'Bài 16. Tam giác cân. Đường trung trực của đoạn thẳng.',
      questions: [
        { q: 'T7-C4B16-001', c: 'Tam giác cân là tam giác có:', a: 'Hai cạnh bằng nhau', s: 'Định nghĩa: Tam giác cân là tam giác có hai cạnh bằng nhau.', d: 'nhan_biet', o: ['Ba cạnh bằng nhau', 'Một góc vuông', 'Hai cạnh bằng nhau', 'Ba góc bằng nhau'] },
        { q: 'T7-C4B16-002', c: 'Đường trung trực của đoạn thẳng là:', a: 'Đường thẳng đi qua trung điểm của đoạn thẳng và vuông góc với đoạn thẳng đó', s: 'Định nghĩa đường trung trực.', d: 'nhan_biet', o: ['Đường thẳng đi qua trung điểm của đoạn thẳng', 'Đường thẳng vuông góc với đoạn thẳng', 'Đường thẳng đi qua trung điểm của đoạn thẳng và vuông góc với đoạn thẳng đó', 'Đường thẳng song song với đoạn thẳng'] },
        { q: 'T7-C4B16-003', c: 'Trong tam giác cân, hai góc ở đáy có tính chất gì?', a: 'Bằng nhau', s: 'Định lí: Trong một tam giác cân, hai góc ở đáy bằng nhau.', d: 'thong_hieu', o: ['Bù nhau', 'Phụ nhau', 'Bằng nhau', 'Kề bù'] },
        { q: 'T7-C4B16-004', c: 'Điểm nằm trên đường trung trực của một đoạn thẳng thì có tính chất gì?', a: 'Cách đều hai đầu mút của đoạn thẳng đó', s: 'Định lí: Điểm nằm trên trung trực của đoạn thẳng thì cách đều hai đầu mút của nó.', d: 'thong_hieu', o: ['Cách đều hai đường thẳng song song', 'Cách đều hai đầu mút của đoạn thẳng đó', 'Nằm trên đoạn thẳng đó', 'Chia đoạn thẳng thành $3$ phần bằng nhau'] },
        { q: 'T7-C4B16-005', c: 'Tam giác $ABC$ cân tại $A$ có $\\widehat{A} = 40^\\circ$. Số đo góc $B$ là:', a: '$70^\\circ$', s: '$\\widehat{B} = \\widehat{C} = \\frac{180^\\circ - 40^\\circ}{2} = \\frac{140^\\circ}{2} = 70^\\circ$.', d: 'van_dung', o: ['$40^\\circ$', '$70^\\circ$', '$140^\\circ$', '$100^\\circ$'] }
      ]
    },
    {
      name: 'Bài tập cuối chương IV.',
      questions: [
        { q: 'T7-C4OT-001', c: 'Tổng ba góc của một tam giác luôn bằng bao nhiêu?', a: '$180^\\circ$', s: 'Định lí tổng ba góc của một tam giác.', d: 'nhan_biet', o: ['$90^\\circ$', '$180^\\circ$', '$360^\\circ$', '$270^\\circ$'] },
        { q: 'T7-C4OT-002', c: 'Nếu tam giác $ABC$ có $\\widehat{A} = 90^\\circ, \\widehat{B} = 45^\\circ$ thì $\\Delta ABC$ là tam giác gì?', a: 'Tam giác vuông cân', s: 'Có một góc vuông và một góc bằng $45^\\circ$ nên góc còn lại cũng là $45^\\circ$. Đó là tam giác vuông cân.', d: 'thong_hieu', o: ['Tam giác cân', 'Tam giác vuông', 'Tam giác đều', 'Tam giác vuông cân'] },
        { q: 'T7-C4OT-003', c: 'Điểm $M$ cách đều hai điểm $A$ và $B$. Khi đó điểm $M$ nằm ở đâu?', a: 'Trên đường trung trực của đoạn thẳng $AB$', s: 'Theo định lí đảo, điểm cách đều hai mút của đoạn thẳng thì nằm trên trung trực của đoạn thẳng đó.', d: 'thong_hieu', o: ['Trên tia đối của tia $AB$', 'Trên đường trung trực của đoạn thẳng $AB$', 'Trùng với trung điểm của $AB$', 'Trên đường vuông góc với $AB$ tại $A$'] },
        { q: 'T7-C4OT-004', c: 'Khẳng định "Nếu hai cạnh và một góc của tam giác này bằng hai cạnh và một góc của tam giác kia thì hai tam giác đó bằng nhau" đúng hay sai?', a: 'Sai', s: 'Sai vì góc phải là góc xen giữa hai cạnh thì mới thỏa mãn trường hợp c.g.c.', d: 'thong_hieu', o: ['Đúng', 'Sai', 'Luôn đúng với tam giác vuông', 'Luôn đúng với tam giác cân'] },
        { q: 'T7-C4OT-005', c: 'Tam giác cân $MNP$ (cân tại $M$) có chu vi là $20$cm, biết cạnh đáy $NP = 6$cm. Độ dài cạnh $MN$ là:', a: '$7$cm', s: 'Chu vi $= 2 \\cdot MN + NP \\Rightarrow 2 \\cdot MN = 20 - 6 = 14 \\Rightarrow MN = 7$ (cm).', d: 'van_dung', o: ['$7$cm', '$8$cm', '$6$cm', '$14$cm'] }
      ]
    },
    {
      name: 'Bài 17. Thu thập và phân loại dữ liệu.',
      questions: [
        { q: 'T7-C5B17-001', c: 'Dữ liệu thu thập được thường chia làm mấy loại chính?', a: '$2$ loại (dữ liệu số và dữ liệu không phải là số)', s: 'Dữ liệu được chia thành dữ liệu định lượng (số liệu) và dữ liệu định tính (không phải số liệu).', d: 'nhan_biet', o: ['$1$ loại', '$2$ loại (dữ liệu số và dữ liệu không phải là số)', '$3$ loại', '$4$ loại'] },
        { q: 'T7-C5B17-002', c: 'Phương pháp nào sau đây là phương pháp thu thập dữ liệu gián tiếp?', a: 'Thu thập từ sách báo, Internet', s: 'Việc lấy dữ liệu có sẵn từ các nguồn tài liệu được gọi là thu thập gián tiếp.', d: 'nhan_biet', o: ['Phát phiếu khảo sát', 'Phỏng vấn trực tiếp', 'Làm thí nghiệm', 'Thu thập từ sách báo, Internet'] },
        { q: 'T7-C5B17-003', c: 'Trong các dữ liệu sau, đâu là dữ liệu định lượng (số liệu)?', a: 'Chiều cao của các bạn trong lớp', s: 'Chiều cao được đo bằng số đo nên là dữ liệu định lượng.', d: 'thong_hieu', o: ['Nơi sinh của học sinh', 'Sở thích âm nhạc', 'Chiều cao của các bạn trong lớp', 'Màu sắc yêu thích'] },
        { q: 'T7-C5B17-004', c: 'Dữ liệu "Mức độ hài lòng của khách hàng (Rất hài lòng, Hài lòng, Bình thường, Không hài lòng)" là loại dữ liệu gì?', a: 'Dữ liệu không phải là số (có thể sắp thứ tự)', s: 'Đây là dữ liệu định tính, nhưng có thể xếp hạng (từ rất hài lòng đến không hài lòng).', d: 'thong_hieu', o: ['Dữ liệu số liệu', 'Dữ liệu không phải là số (không thể sắp thứ tự)', 'Dữ liệu không phải là số (có thể sắp thứ tự)', 'Dữ liệu liên tục'] },
        { q: 'T7-C5B17-005', c: 'Để tìm hiểu về môn học yêu thích nhất của toàn bộ học sinh khối 7 trong trường, phương pháp thu thập dữ liệu nào tối ưu nhất?', a: 'Phát phiếu điều tra (hoặc biểu mẫu trực tuyến)', s: 'Đối với số lượng lớn (toàn khối), phát phiếu điều tra/form online là nhanh và chính xác nhất.', d: 'van_dung', o: ['Quan sát lén từng bạn', 'Phát phiếu điều tra (hoặc biểu mẫu trực tuyến)', 'Phỏng vấn trực tiếp từng người', 'Làm thí nghiệm'] }
      ]
    },
    {
      name: 'Bài 18. Biểu đồ hình quạt tròn.',
      questions: [
        { q: 'T7-C5B18-001', c: 'Biểu đồ hình quạt tròn dùng để làm gì?', a: 'Biểu diễn tỉ lệ phần trăm của từng loại số liệu so với toàn thể', s: 'Biểu đồ hình quạt tròn rất trực quan trong việc thể hiện tỉ lệ phần trăm các thành phần so với tổng thể.', d: 'nhan_biet', o: ['Biểu diễn sự thay đổi theo thời gian', 'Biểu diễn tỉ lệ phần trăm của từng loại số liệu so với toàn thể', 'So sánh trực tiếp số lượng cụ thể', 'Biểu diễn các đại lượng liên tục'] },
        { q: 'T7-C5B18-002', c: 'Trong biểu đồ hình quạt tròn, tổng các tỉ lệ phần trăm của tất cả các hình quạt là bao nhiêu?', a: '$100\\%$', s: 'Tổng toàn bộ các phần luôn luôn bằng $100\\%$.', d: 'nhan_biet', o: ['$50\\%$', '$90\\%$', '$100\\%$', '$360\\%$'] },
        { q: 'T7-C5B18-003', c: 'Một hình quạt tròn có góc ở tâm là $90^\\circ$ sẽ tương ứng với bao nhiêu phần trăm?', a: '$25\\%$', s: 'Một vòng tròn là $360^\\circ$ ứng với $100\\%$. $90^\\circ$ là $1/4$ vòng tròn nên tương ứng với $25\\%$.', d: 'thong_hieu', o: ['$20\\%$', '$25\\%$', '$45\\%$', '$90\\%$'] },
        { q: 'T7-C5B18-004', c: 'Trong một biểu đồ quạt biểu diễn số lượng $40$ học sinh, phần hình quạt chiếm $20\\%$ tương ứng với bao nhiêu học sinh?', a: '$8$ học sinh', s: '$40 \\times 20\\% = 40 \\times 0,2 = 8$ (học sinh).', d: 'thong_hieu', o: ['$2$ học sinh', '$4$ học sinh', '$8$ học sinh', '$20$ học sinh'] },
        { q: 'T7-C5B18-005', c: 'Nếu tỉ lệ học sinh thích $3$ loại quả Cam, Xoài, Nhãn lần lượt là $50\\%, 30\\%, 20\\%$. Hình quạt biểu diễn số học sinh thích Cam có góc ở tâm là bao nhiêu độ?', a: '$180^\\circ$', s: '$50\\%$ là một nửa, nên góc ở tâm là $360^\\circ \\times 50\\% = 180^\\circ$.', d: 'van_dung', o: ['$90^\\circ$', '$120^\\circ$', '$180^\\circ$', '$360^\\circ$'] }
      ]
    },
    {
      name: 'Bài 19. Biểu đồ đoạn thẳng.',
      questions: [
        { q: 'T7-C5B19-001', c: 'Biểu đồ đoạn thẳng thường dùng để làm gì?', a: 'Biểu diễn sự thay đổi của một đại lượng theo thời gian', s: 'Biểu đồ đoạn thẳng trực quan cho thấy xu hướng tăng/giảm theo thời gian.', d: 'nhan_biet', o: ['So sánh tỉ lệ phần trăm', 'Biểu diễn sự thay đổi của một đại lượng theo thời gian', 'Biểu diễn cơ cấu thành phần', 'Thống kê số lượng một cách tĩnh lập'] },
        { q: 'T7-C5B19-002', c: 'Các điểm trên biểu đồ đoạn thẳng được nối với nhau bằng gì?', a: 'Các đoạn thẳng', s: 'Đúng như tên gọi, các điểm số liệu được nối bằng đoạn thẳng để thấy xu hướng.', d: 'nhan_biet', o: ['Đường cong', 'Các đoạn thẳng', 'Hình chữ nhật', 'Đường tròn'] },
        { q: 'T7-C5B19-003', c: 'Trục ngang của biểu đồ đoạn thẳng thông thường biểu diễn đại lượng nào?', a: 'Thời gian', s: 'Trục ngang biểu diễn thời gian (ngày, tháng, năm...), trục dọc biểu diễn giá trị số liệu.', d: 'thong_hieu', o: ['Thời gian', 'Giá trị số liệu', 'Tỉ lệ phần trăm', 'Số thứ tự'] },
        { q: 'T7-C5B19-004', c: 'Nếu đoạn thẳng nối hai điểm liên tiếp trên biểu đồ hướng đi lên, điều đó chứng tỏ đại lượng đang:', a: 'Tăng lên', s: 'Đoạn thẳng đi lên nghĩa là giá trị sau lớn hơn giá trị trước, tức là đang tăng.', d: 'thong_hieu', o: ['Giảm đi', 'Tăng lên', 'Đứng yên', 'Bằng không'] },
        { q: 'T7-C5B19-005', c: 'Nhìn vào biểu đồ đoạn thẳng biểu diễn nhiệt độ các ngày trong tuần, để tìm ngày có nhiệt độ cao nhất ta tìm điểm nào?', a: 'Điểm cao nhất trên biểu đồ', s: 'Điểm nằm cao nhất so với trục tung ứng với giá trị lớn nhất.', d: 'van_dung', o: ['Điểm thấp nhất trên biểu đồ', 'Điểm đầu tiên', 'Điểm cuối cùng', 'Điểm cao nhất trên biểu đồ'] }
      ]
    },
    {
      name: 'Bài tập cuối chương V.',
      questions: [
        { q: 'T7-C5OT-001', c: 'Biểu đồ nào phù hợp nhất để biểu diễn tỉ lệ học sinh đạt học lực Tốt, Khá, Đạt, Chưa đạt của lớp 7A?', a: 'Biểu đồ hình quạt tròn', s: 'Vì biểu diễn tỉ lệ phần trăm (cơ cấu) của tổng thể, nên dùng biểu đồ hình quạt tròn.', d: 'nhan_biet', o: ['Biểu đồ cột', 'Biểu đồ đoạn thẳng', 'Biểu đồ hình quạt tròn', 'Biểu đồ cột kép'] },
        { q: 'T7-C5OT-002', c: 'Dữ liệu "số đo giày của các bạn nam lớp 7A" thuộc loại dữ liệu nào?', a: 'Dữ liệu định lượng (số liệu)', s: 'Số đo giày (ví dụ $38, 39, 40$) là những con số nên là dữ liệu định lượng.', d: 'thong_hieu', o: ['Dữ liệu định lượng (số liệu)', 'Dữ liệu định tính', 'Dữ liệu không phải là số', 'Dữ liệu hình ảnh'] },
        { q: 'T7-C5OT-003', c: 'Để biểu diễn trực quan sự thay đổi dân số Việt Nam từ năm 2010 đến 2020, loại biểu đồ nào là thích hợp nhất?', a: 'Biểu đồ đoạn thẳng', s: 'Thể hiện sự thay đổi theo thời gian nên biểu đồ đoạn thẳng là tối ưu nhất.', d: 'thong_hieu', o: ['Biểu đồ tranh', 'Biểu đồ hình quạt tròn', 'Biểu đồ đoạn thẳng', 'Bảng thống kê'] },
        { q: 'T7-C5OT-004', c: 'Dữ liệu "ý kiến đánh giá của người tiêu dùng (tốt, khá, trung bình, kém)" là dữ liệu loại nào?', a: 'Dữ liệu không phải số (định tính) và có thể sắp thứ tự', s: 'Đó là những nhận xét (không phải số) nhưng có mức độ từ cao xuống thấp nên sắp thứ tự được.', d: 'thong_hieu', o: ['Số liệu', 'Dữ liệu không phải số (định tính) và không thể sắp thứ tự', 'Dữ liệu không phải số (định tính) và có thể sắp thứ tự', 'Không phải là dữ liệu'] },
        { q: 'T7-C5OT-005', c: 'Biểu đồ quạt tròn cho biết học sinh đi xe đạp chiếm $40\\%$, đi bộ chiếm $30\\%$, đi xe buýt chiếm $30\\%$. Nếu có $500$ học sinh thì số học sinh đi xe đạp là:', a: '$200$ học sinh', s: 'Số học sinh đi xe đạp = $500 \\times 40\\% = 200$.', d: 'van_dung', o: ['$150$ học sinh', '$200$ học sinh', '$300$ học sinh', '$250$ học sinh'] }
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
  
  console.log('\n✅ Hoàn thành Batch 2 Lớp 7');
}

insertGrade7Batch2().catch(console.error);
