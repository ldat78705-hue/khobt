import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);

async function insertGrade5Batch2() {
  console.log('Khởi tạo kết nối CSDL...');
  
  const users = await sql`SELECT user_id FROM public.questions WHERE user_id IS NOT NULL LIMIT 1`;
  const defaultUserId = users.length > 0 ? users[0].user_id : '00000000-0000-0000-0000-000000000000';

  const topics = [
    {
      name: 'Bài 15: Ki-lô-mét vuông. Héc-ta',
      questions: [
        { q: 'T5-B15-001', c: 'Kí hiệu của đơn vị ki-lô-mét vuông là gì?', a: '$\\text{km}^2$', s: 'Cách viết tắt.', d: 'nhan_biet', o: ['$\\text{km}$', '$\\text{km}^2$', '$\\text{m}^2$', '$\\text{ha}$'] },
        { q: 'T5-B15-002', c: '$1$ héc-ta (ha) bằng bao nhiêu mét vuông?', a: '$10 000\\text{ m}^2$', s: '$1\\text{ ha} = 1\\text{ hm}^2 = 10 000\\text{ m}^2$.', d: 'nhan_biet', o: ['$1 000\\text{ m}^2$', '$10 000\\text{ m}^2$', '$100\\text{ m}^2$', '$100 000\\text{ m}^2$'] },
        { q: 'T5-B15-003', c: '$1\\text{ km}^2$ bằng bao nhiêu héc-ta (ha)?', a: '$100\\text{ ha}$', s: '$1\\text{ km}^2 = 100\\text{ hm}^2 = 100\\text{ ha}$.', d: 'thong_hieu', o: ['$10\\text{ ha}$', '$100\\text{ ha}$', '$1000\\text{ ha}$', '$10 000\\text{ ha}$'] },
        { q: 'T5-B15-004', c: 'Một khu rừng có diện tích $3\\text{ km}^2$. Hỏi diện tích khu rừng đó là bao nhiêu mét vuông?', a: '$3 000 000\\text{ m}^2$', s: '$1\\text{ km}^2 = 1 000 000\\text{ m}^2$.', d: 'thong_hieu', o: ['$300 000\\text{ m}^2$', '$3 000 000\\text{ m}^2$', '$30 000\\text{ m}^2$', '$3 000\\text{ m}^2$'] },
        { q: 'T5-B15-005', c: 'Diện tích một khu đất là $2,5\\text{ ha}$. Hỏi diện tích khu đất đó là bao nhiêu mét vuông?', a: '$25 000\\text{ m}^2$', s: '$2,5 \\times 10 000 = 25 000$.', d: 'van_dung', o: ['$2 500\\text{ m}^2$', '$25 000\\text{ m}^2$', '$250 000\\text{ m}^2$', '$250\\text{ m}^2$'] }
      ]
    },
    {
      name: 'Bài 16: Các đơn vị đo diện tích',
      questions: [
        { q: 'T5-B16-001', c: 'Hai đơn vị đo diện tích liền kề nhau thì đơn vị lớn gấp bao nhiêu lần đơn vị bé?', a: '$100$ lần', s: 'Ví dụ $1\\text{m}^2 = 100\\text{dm}^2$.', d: 'nhan_biet', o: ['$10$ lần', '$100$ lần', '$1000$ lần', '$2$ lần'] },
        { q: 'T5-B16-002', c: 'Thứ tự các đơn vị đo diện tích từ lớn đến bé là:', a: '$\\text{km}^2, \\text{hm}^2, \\text{dam}^2, \\text{m}^2, \\text{dm}^2, \\text{cm}^2, \\text{mm}^2$', s: 'Bảng đơn vị đo diện tích.', d: 'nhan_biet', o: ['$\\text{km}^2, \\text{m}^2, \\text{cm}^2, \\text{mm}^2$', '$\\text{km}^2, \\text{hm}^2, \\text{dam}^2, \\text{m}^2, \\text{dm}^2, \\text{cm}^2, \\text{mm}^2$', '$\\text{km}, \\text{hm}, \\text{dam}, \\text{m}, \\text{dm}, \\text{cm}, \\text{mm}$', '$\\text{m}^2, \\text{dm}^2, \\text{cm}^2, \\text{mm}^2, \\text{km}^2$'] },
        { q: 'T5-B16-003', c: '$5\\text{ m}^2\\ 4\\text{ dm}^2$ bằng bao nhiêu đề-xi-mét vuông?', a: '$504\\text{ dm}^2$', s: '$5 \\times 100 + 4 = 504$.', d: 'thong_hieu', o: ['$54\\text{ dm}^2$', '$504\\text{ dm}^2$', '$540\\text{ dm}^2$', '$5004\\text{ dm}^2$'] },
        { q: 'T5-B16-004', c: '$1250\\text{ cm}^2$ bằng bao nhiêu $\\text{dm}^2$ và $\\text{cm}^2$?', a: '$12\\text{ dm}^2$ và $50\\text{ cm}^2$', s: '$1250 = 1200 + 50 = 12\\text{dm}^2\\ 50\\text{cm}^2$.', d: 'thong_hieu', o: ['$1\\text{ dm}^2$ và $250\\text{ cm}^2$', '$12\\text{ dm}^2$ và $50\\text{ cm}^2$', '$125\\text{ dm}^2$ và $0\\text{ cm}^2$', '$12\\text{ dm}^2$ và $5\\text{ cm}^2$'] },
        { q: 'T5-B16-005', c: 'Điền số thích hợp: $3\\text{ m}^2\\ 15\\text{ cm}^2 = ... \\text{ cm}^2$:', a: '$30 015$', s: '$3\\text{m}^2 = 30000\\text{cm}^2$, cộng thêm $15$ là $30015$.', d: 'van_dung', o: ['$315$', '$3015$', '$30 015$', '$3 150$'] }
      ]
    },
    {
      name: 'Bài 19: Phép cộng số thập phân',
      questions: [
        { q: 'T5-B19-001', c: 'Khi đặt tính cộng hai số thập phân, ta phải đặt như thế nào?', a: 'Các chữ số cùng hàng thẳng cột với nhau và dấu phẩy thẳng cột với dấu phẩy', s: 'Nguyên tắc đặt tính.', d: 'nhan_biet', o: ['Căn lề bên phải', 'Căn lề bên trái', 'Các chữ số cùng hàng thẳng cột với nhau và dấu phẩy thẳng cột với dấu phẩy', 'Dấu phẩy không cần thẳng cột'] },
        { q: 'T5-B19-002', c: 'Tính: $2,5 + 3,4 = ?$?', a: '$5,9$', s: '$2+3=5, 5+4=9$.', d: 'thong_hieu', o: ['$5,8$', '$5,9$', '$6,0$', '$6,9$'] },
        { q: 'T5-B19-003', c: 'Tính: $15,6 + 4,25 = ?$?', a: '$19,85$', s: '$15,60 + 4,25 = 19,85$.', d: 'thong_hieu', o: ['$19,31$', '$19,85$', '$20,85$', '$19,65$'] },
        { q: 'T5-B19-004', c: 'Tính: $0,75 + 1,5 = ?$?', a: '$2,25$', s: '$0,75 + 1,50 = 2,25$.', d: 'van_dung', o: ['$1,80$', '$2,25$', '$1,25$', '$1,90$'] },
        { q: 'T5-B19-005', c: 'Một quả dưa nặng $2,5\\text{kg}$, quả thứ hai nặng $1,75\\text{kg}$. Cả hai quả nặng bao nhiêu ki-lô-gam?', a: '$4,25\\text{kg}$', s: '$2,5 + 1,75 = 4,25$.', d: 'van_dung', o: ['$3,80\\text{kg}$', '$4,25\\text{kg}$', '$4,05\\text{kg}$', '$3,25\\text{kg}$'] }
      ]
    },
    {
      name: 'Bài 20: Phép trừ số thập phân',
      questions: [
        { q: 'T5-B20-001', c: 'Khi đặt tính trừ hai số thập phân, dấu phẩy của số bị trừ và số trừ phải đặt như thế nào?', a: 'Thẳng cột với nhau', s: 'Nguyên tắc đặt tính.', d: 'nhan_biet', o: ['Không cần quan tâm dấu phẩy', 'Thẳng cột với nhau', 'Thẳng hàng với chữ số cuối cùng', 'Căn lề trái'] },
        { q: 'T5-B20-002', c: 'Tính: $5,8 - 2,4 = ?$?', a: '$3,4$', s: '$5-2=3, 8-4=4$.', d: 'thong_hieu', o: ['$3,4$', '$2,4$', '$3,2$', '$8,2$'] },
        { q: 'T5-B20-003', c: 'Tính: $10 - 4,5 = ?$?', a: '$5,5$', s: '$10,0 - 4,5 = 5,5$.', d: 'thong_hieu', o: ['$6,5$', '$5,5$', '$4,5$', '$14,5$'] },
        { q: 'T5-B20-004', c: 'Tính: $12,3 - 5,45 = ?$?', a: '$6,85$', s: '$12,30 - 5,45 = 6,85$.', d: 'van_dung', o: ['$7,15$', '$6,85$', '$7,85$', '$6,15$'] },
        { q: 'T5-B20-005', c: 'Có một sợi dây dài $15\\text{m}$, người ta cắt đi $3,75\\text{m}$. Sợi dây còn lại dài bao nhiêu?', a: '$11,25\\text{m}$', s: '$15,00 - 3,75 = 11,25$.', d: 'van_dung', o: ['$11,75\\text{m}$', '$11,25\\text{m}$', '$12,25\\text{m}$', '$12,75\\text{m}$'] }
      ]
    },
    {
      name: 'Bài 21: Phép nhân số thập phân',
      questions: [
        { q: 'T5-B21-001', c: 'Khi nhân một số thập phân với một số thập phân, ta đếm số chữ số sau dấu phẩy của cả hai thừa số để làm gì?', a: 'Để đánh dấu phẩy ở tích', s: 'Đếm tổng số chữ số sau phẩy ở thừa số để đặt phẩy ở tích.', d: 'nhan_biet', o: ['Để bỏ đi các chữ số $0$', 'Để đánh dấu phẩy ở tích', 'Để quy đồng mẫu số', 'Để trừ đi'] },
        { q: 'T5-B21-002', c: 'Tính: $1,2 \\times 3 = ?$?', a: '$3,6$', s: '$12 \\times 3 = 36$, có $1$ chữ số sau phẩy $\\Rightarrow 3,6$.', d: 'thong_hieu', o: ['$3,2$', '$3,6$', '$36$', '$0,36$'] },
        { q: 'T5-B21-003', c: 'Tính: $0,5 \\times 0,4 = ?$?', a: '$0,2$', s: '$5 \\times 4 = 20$, có $2$ chữ số phẩy $\\Rightarrow 0,20 = 0,2$.', d: 'thong_hieu', o: ['$2,0$', '$0,2$', '$0,02$', '$0,9$'] },
        { q: 'T5-B21-004', c: 'Diện tích hình chữ nhật có chiều dài $2,5\\text{m}$, chiều rộng $1,2\\text{m}$ là:', a: '$3\\text{ m}^2$', s: '$2,5 \\times 1,2 = 3,00 = 3$.', d: 'van_dung', o: ['$30\\text{ m}^2$', '$3\\text{ m}^2$', '$0,3\\text{ m}^2$', '$3,7\\text{ m}^2$'] },
        { q: 'T5-B21-005', c: 'Mua $1,5\\text{kg}$ gạo, giá mỗi ki-lô-gam là $20 000$ đồng. Hỏi hết bao nhiêu tiền?', a: '$30 000$ đồng', s: '$1,5 \\times 20 000 = 30 000$.', d: 'van_dung', o: ['$30 000$ đồng', '$35 000$ đồng', '$25 000$ đồng', '$40 000$ đồng'] }
      ]
    },
    {
      name: 'Bài 22: Phép chia số thập phân',
      questions: [
        { q: 'T5-B22-001', c: 'Khi chia số thập phân cho một số tự nhiên, ta đánh dấu phẩy vào thương khi nào?', a: 'Khi bắt đầu chia đến chữ số đầu tiên của phần thập phân', s: 'Quy tắc chia.', d: 'nhan_biet', o: ['Sau khi chia xong', 'Khi bắt đầu chia đến chữ số đầu tiên của phần thập phân', 'Ở vị trí giữa thương', 'Không cần đánh dấu phẩy'] },
        { q: 'T5-B22-002', c: 'Tính: $4,8 : 2 = ?$?', a: '$2,4$', s: '$4:2=2, 8:2=4$.', d: 'thong_hieu', o: ['$24$', '$2,4$', '$0,24$', '$2,8$'] },
        { q: 'T5-B22-003', c: 'Tính: $0,75 : 5 = ?$?', a: '$0,15$', s: '$75:5=15$, đánh $2$ phẩy.', d: 'thong_hieu', o: ['$1,5$', '$0,15$', '$0,015$', '$15$'] },
        { q: 'T5-B22-004', c: 'Tính: $1,5 : 0,5 = ?$?', a: '$3$', s: 'Nhân cả hai cho $10$ thành $15 : 5 = 3$.', d: 'van_dung', o: ['$30$', '$3$', '$0,3$', '$5$'] },
        { q: 'T5-B22-005', c: '$4,5$ lít dầu cân nặng $3,6\\text{kg}$. Hỏi $1$ lít dầu cân nặng bao nhiêu ki-lô-gam?', a: '$0,8\\text{kg}$', s: '$3,6 : 4,5 = 36 : 45 = 0,8$.', d: 'van_dung', o: ['$0,9\\text{kg}$', '$0,8\\text{kg}$', '$1,25\\text{kg}$', '$1,2\\text{kg}$'] }
      ]
    },
    {
      name: 'Bài 23: Nhân, chia số thập phân với 10, 100, 1000, ... hoặc với 0,1 ; 0,01 ; 0,001 ; ...',
      questions: [
        { q: 'T5-B23-001', c: 'Muốn nhân một số thập phân với $10$, ta làm thế nào?', a: 'Chuyển dấu phẩy của số đó sang bên phải một chữ số', s: 'Quy tắc nhân với $10$.', d: 'nhan_biet', o: ['Chuyển dấu phẩy sang trái một chữ số', 'Chuyển dấu phẩy sang phải một chữ số', 'Thêm một chữ số $0$ vào tận cùng bên phải', 'Bỏ dấu phẩy đi'] },
        { q: 'T5-B23-002', c: 'Muốn chia một số thập phân cho $100$, ta làm thế nào?', a: 'Chuyển dấu phẩy của số đó sang bên trái hai chữ số', s: 'Quy tắc chia cho $100$.', d: 'nhan_biet', o: ['Chuyển dấu phẩy sang trái hai chữ số', 'Chuyển dấu phẩy sang phải hai chữ số', 'Bớt đi hai chữ số ở cuối', 'Nhân số đó với $100$'] },
        { q: 'T5-B23-003', c: 'Tính: $3,45 \\times 10 = ?$?', a: '$34,5$', s: 'Chuyển phẩy sang phải $1$ số.', d: 'thong_hieu', o: ['$345$', '$34,5$', '$0,345$', '$3450$'] },
        { q: 'T5-B23-004', c: 'Tính: $125,4 : 100 = ?$?', a: '$1,254$', s: 'Chuyển phẩy sang trái $2$ số.', d: 'thong_hieu', o: ['$12,54$', '$1,254$', '$12540$', '$0,1254$'] },
        { q: 'T5-B23-005', c: 'Tính: $2,5 \\times 0,1 = ?$?', a: '$0,25$', s: 'Nhân với $0,1$ tương đương chia $10$.', d: 'van_dung', o: ['$25$', '$0,25$', '$0,025$', '$2,5$'] }
      ]
    },
    {
      name: 'Bài 25: Hình tam giác. Diện tích hình tam giác',
      questions: [
        { q: 'T5-B25-001', c: 'Công thức tính diện tích hình tam giác khi biết đáy $a$ và chiều cao $h$ tương ứng là gì?', a: '$S = \\frac{a \\times h}{2}$', s: 'Đáy nhân chiều cao chia 2.', d: 'nhan_biet', o: ['$S = a \\times h$', '$S = (a+h) \\times 2$', '$S = \\frac{a \\times h}{2}$', '$S = a \\times a$'] },
        { q: 'T5-B25-002', c: 'Hình tam giác có độ dài đáy là $5\\text{cm}$, chiều cao $4\\text{cm}$. Diện tích là bao nhiêu?', a: '$10\\text{ cm}^2$', s: '$(5 \\times 4) / 2 = 10$.', d: 'thong_hieu', o: ['$20\\text{ cm}^2$', '$10\\text{ cm}^2$', '$9\\text{ cm}^2$', '$18\\text{ cm}^2$'] },
        { q: 'T5-B25-003', c: 'Diện tích tam giác vuông có hai cạnh góc vuông là $3\\text{cm}$ và $4\\text{cm}$ là bao nhiêu?', a: '$6\\text{ cm}^2$', s: '$(3 \\times 4) / 2 = 6$.', d: 'thong_hieu', o: ['$12\\text{ cm}^2$', '$6\\text{ cm}^2$', '$7\\text{ cm}^2$', '$3,5\\text{ cm}^2$'] },
        { q: 'T5-B25-004', c: 'Hình tam giác có diện tích là $12\\text{ cm}^2$, độ dài đáy là $6\\text{cm}$. Chiều cao tương ứng là bao nhiêu?', a: '$4\\text{ cm}$', s: '$h = (12 \\times 2) / 6 = 4$.', d: 'van_dung', o: ['$2\\text{ cm}$', '$4\\text{ cm}$', '$8\\text{ cm}$', '$3\\text{ cm}$'] },
        { q: 'T5-B25-005', c: 'Hình tam giác có diện tích $15\\text{ m}^2$, chiều cao $5\\text{m}$. Độ dài đáy là:', a: '$6\\text{ m}$', s: '$a = (15 \\times 2) / 5 = 6$.', d: 'van_dung', o: ['$3\\text{ m}$', '$6\\text{ m}$', '$7,5\\text{ m}$', '$10\\text{ m}$'] }
      ]
    },
    {
      name: 'Bài 26: Hình thang. Diện tích hình thang',
      questions: [
        { q: 'T5-B26-001', c: 'Hình thang có đặc điểm gì nổi bật?', a: 'Có một cặp cạnh đối diện song song', s: 'Định nghĩa hình thang.', d: 'nhan_biet', o: ['Có hai cặp cạnh song song', 'Có một cặp cạnh đối diện song song', 'Bốn cạnh bằng nhau', 'Bốn góc vuông'] },
        { q: 'T5-B26-002', c: 'Công thức tính diện tích hình thang khi biết đáy lớn $a$, đáy bé $b$ và chiều cao $h$ là gì?', a: '$S = \\frac{(a+b) \\times h}{2}$', s: 'Tổng hai đáy nhân chiều cao chia 2.', d: 'nhan_biet', o: ['$S = a \\times b \\times h$', '$S = \\frac{a \\times b}{2} \\times h$', '$S = \\frac{(a+b) \\times h}{2}$', '$S = (a+b) \\times h$'] },
        { q: 'T5-B26-003', c: 'Đáy lớn $6\\text{cm}$, đáy bé $4\\text{cm}$, chiều cao $5\\text{cm}$. Diện tích hình thang là bao nhiêu?', a: '$25\\text{ cm}^2$', s: '$(6+4) \\times 5 / 2 = 25$.', d: 'thong_hieu', o: ['$25\\text{ cm}^2$', '$50\\text{ cm}^2$', '$20\\text{ cm}^2$', '$15\\text{ cm}^2$'] },
        { q: 'T5-B26-004', c: 'Hình thang có đáy lớn $10$, đáy bé $6$, diện tích bằng $32$. Chiều cao của hình thang là bao nhiêu?', a: '$4$', s: '$h = (32 \\times 2) / (10+6) = 64 / 16 = 4$.', d: 'van_dung', o: ['$2$', '$4$', '$8$', '$16$'] },
        { q: 'T5-B26-005', c: 'Một hình thang có trung bình cộng hai đáy là $15\\text{m}$, chiều cao là $10\\text{m}$. Diện tích hình thang là:', a: '$150\\text{ m}^2$', s: '$S = \\text{TBC đáy} \\times \\text{cao} = 15 \\times 10 = 150$.', d: 'van_dung', o: ['$75\\text{ m}^2$', '$150\\text{ m}^2$', '$300\\text{ m}^2$', '$15\\text{ m}^2$'] }
      ]
    },
    {
      name: 'Bài 27: Đường tròn. Chu vi và diện tích hình tròn',
      questions: [
        { q: 'T5-B27-001', c: 'Công thức tính chu vi hình tròn có đường kính $d$ là gì?', a: '$C = d \\times 3,14$', s: 'Chu vi bằng đường kính nhân pi.', d: 'nhan_biet', o: ['$C = d \\times 2 \\times 3,14$', '$C = d \\times 3,14$', '$C = d \\times d \\times 3,14$', '$C = d \\times \\pi \\div 2$'] },
        { q: 'T5-B27-002', c: 'Công thức tính diện tích hình tròn có bán kính $r$ là gì?', a: '$S = r \\times r \\times 3,14$', s: 'Diện tích bằng bán kính nhân bán kính nhân pi.', d: 'nhan_biet', o: ['$S = r \\times 2 \\times 3,14$', '$S = r \\times r \\times 3,14$', '$S = r \\times 3,14$', '$S = r \\times r$'] },
        { q: 'T5-B27-003', c: 'Hình tròn có bán kính $5\\text{cm}$ thì đường kính là bao nhiêu?', a: '$10\\text{ cm}$', s: '$d = 2 \\times r = 10$.', d: 'thong_hieu', o: ['$5\\text{ cm}$', '$10\\text{ cm}$', '$2,5\\text{ cm}$', '$15\\text{ cm}$'] },
        { q: 'T5-B27-004', c: 'Chu vi hình tròn có bán kính $2\\text{cm}$ là bao nhiêu?', a: '$12,56\\text{ cm}$', s: '$d = 4$. $C = 4 \\times 3,14 = 12,56$.', d: 'thong_hieu', o: ['$6,28\\text{ cm}$', '$12,56\\text{ cm}$', '$3,14\\text{ cm}$', '$9,42\\text{ cm}$'] },
        { q: 'T5-B27-005', c: 'Diện tích hình tròn có bán kính $10\\text{cm}$ là bao nhiêu?', a: '$314\\text{ cm}^2$', s: '$S = 10 \\times 10 \\times 3,14 = 314$.', d: 'van_dung', o: ['$31,4\\text{ cm}^2$', '$314\\text{ cm}^2$', '$62,8\\text{ cm}^2$', '$3140\\text{ cm}^2$'] }
      ]
    }
  ];

  for (const topic of topics) {
    const cats = await sql`SELECT id, name FROM public.categories WHERE name ILIKE ${'%' + topic.name + '%'} AND grade = 5 LIMIT 1`;
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
            ${q.d}, 'trac_nghiem', ${JSON.stringify(q.o)}::jsonb, ${q.a}, 'approved', 5, ${cats[0].name}, ${defaultUserId}
          )
        `;
        console.log(`Đã chèn: ${q.q}`);
      } else {
        console.log(`Bỏ qua: ${q.q}`);
      }
      await new Promise(r => setTimeout(r, 500));
    }
  }
  
  console.log('\n✅ Hoàn thành Batch 2 Lớp 5');
}

insertGrade5Batch2().catch(console.error);
