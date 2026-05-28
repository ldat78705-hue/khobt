import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);

async function insertGrade8Batch4() {
  console.log('Khởi tạo kết nối CSDL...');
  
  const users = await sql`SELECT user_id FROM public.questions WHERE user_id IS NOT NULL LIMIT 1`;
  const defaultUserId = users.length > 0 ? users[0].user_id : '00000000-0000-0000-0000-000000000000';

  const topics = [
    {
      name: 'Bài 26. Giải bài toán bằng cách lập phương trình.',
      questions: [
        { q: 'T8-C7B26-001', c: 'Bước đầu tiên trong các bước giải bài toán bằng cách lập phương trình là gì?', a: 'Lập phương trình (chọn ẩn, đặt điều kiện, biểu diễn đại lượng)', s: 'Quy trình giải toán bằng cách lập phương trình bắt đầu bằng việc lập phương trình.', d: 'nhan_biet', o: ['Giải phương trình', 'Kiểm tra điều kiện', 'Trả lời kết quả', 'Lập phương trình (chọn ẩn, đặt điều kiện, biểu diễn đại lượng)'] },
        { q: 'T8-C7B26-002', c: 'Số tự nhiên có hai chữ số, biết chữ số hàng chục là $x$, chữ số hàng đơn vị là $y$. Giá trị của số đó biểu diễn là:', a: '$10x + y$', s: 'Số $\\overline{xy} = 10x + y$.', d: 'nhan_biet', o: ['$xy$', '$x+y$', '$10x + y$', '$10y + x$'] },
        { q: 'T8-C7B26-003', c: 'Gọi vận tốc là $v$, thời gian là $t$. Quãng đường $S$ đi được tính bằng công thức nào?', a: '$S = v \\cdot t$', s: 'Quãng đường bằng vận tốc nhân thời gian.', d: 'thong_hieu', o: ['$S = v + t$', '$S = v \\cdot t$', '$S = \\frac{v}{t}$', '$S = \\frac{t}{v}$'] },
        { q: 'T8-C7B26-004', c: 'Một người đi xe máy từ A đến B với vận tốc $30$ km/h. Nếu gọi thời gian đi là $x$ (giờ) thì quãng đường AB biểu diễn là:', a: '$30x$ km', s: '$S = v \\cdot t = 30x$.', d: 'thong_hieu', o: ['$\\frac{x}{30}$ km', '$\\frac{30}{x}$ km', '$30x$ km', '$30+x$ km'] },
        { q: 'T8-C7B26-005', c: 'Hai kho chứa $100$ tấn hàng. Nếu chuyển $10$ tấn từ kho 1 sang kho 2 thì số hàng hai kho bằng nhau. Hỏi lúc đầu kho 1 có bao nhiêu tấn hàng?', a: '$60$ tấn', s: 'Gọi kho 1 là $x$, kho 2 là $100-x$. Sau khi chuyển: $x-10 = (100-x)+10 \\Rightarrow 2x = 120 \\Rightarrow x=60$.', d: 'van_dung', o: ['$50$ tấn', '$60$ tấn', '$40$ tấn', '$70$ tấn'] }
      ]
    },
    {
      name: 'Bài 27. Khái niệm hàm số và đô thị của hàm số.',
      questions: [
        { q: 'T8-C7B27-001', c: 'Nếu đại lượng $y$ phụ thuộc vào đại lượng thay đổi $x$ sao cho với mỗi giá trị của $x$ ta luôn xác định được chỉ một giá trị tương ứng của $y$ thì $y$ được gọi là:', a: 'Hàm số của $x$', s: 'Định nghĩa hàm số.', d: 'nhan_biet', o: ['Biến số của $x$', 'Hàm số của $x$', 'Hằng số', 'Hệ số của $x$'] },
        { q: 'T8-C7B27-002', c: 'Đồ thị của hàm số $y=f(x)$ trên mặt phẳng tọa độ là tập hợp tất cả các điểm có tọa độ như thế nào?', a: '$(x; f(x))$', s: 'Tập hợp các điểm biểu diễn giá trị của hàm số.', d: 'nhan_biet', o: ['$(f(x); x)$', '$(x; y)$ bất kì', '$(x; f(x))$', '$(0; x)$'] },
        { q: 'T8-C7B27-003', c: 'Cho hàm số $y = 2x - 1$. Giá trị của $y$ khi $x = 3$ là:', a: '$5$', s: '$y = 2 \\times 3 - 1 = 5$.', d: 'thong_hieu', o: ['$2$', '$5$', '$6$', '$7$'] },
        { q: 'T8-C7B27-004', c: 'Điểm nào sau đây thuộc đồ thị hàm số $y = 3x$?', a: '$M(1; 3)$', s: 'Thay $x=1 \\Rightarrow y = 3 \\times 1 = 3$.', d: 'thong_hieu', o: ['$N(3; 1)$', '$P(0; 3)$', '$Q(-1; 3)$', '$M(1; 3)$'] },
        { q: 'T8-C7B27-005', c: 'Cho hàm số $y = f(x) = x^2 - 1$. Tìm các giá trị của $x$ để $f(x) = 3$:', a: '$x=2$ hoặc $x=-2$', s: '$x^2 - 1 = 3 \\Rightarrow x^2 = 4 \\Rightarrow x=2$ hoặc $x=-2$.', d: 'van_dung', o: ['$x=2$', '$x=-2$', '$x=4$', '$x=2$ hoặc $x=-2$'] }
      ]
    },
    {
      name: 'Bài 28. Hàm số bậc nhất và đô thị của hàm số bậc nhất.',
      questions: [
        { q: 'T8-C7B28-001', c: 'Hàm số bậc nhất là hàm số được cho bởi công thức nào?', a: '$y = ax + b$ (với $a \\neq 0$)', s: 'Định nghĩa hàm số bậc nhất.', d: 'nhan_biet', o: ['$y = ax^2 + bx + c$', '$y = ax + b$ (với $a \\neq 0$)', '$y = \\frac{a}{x}$', '$y = ax + b$ (với $a=0$)'] },
        { q: 'T8-C7B28-002', c: 'Đồ thị của hàm số bậc nhất $y = ax + b$ ($a \\neq 0$) là:', a: 'Một đường thẳng', s: 'Đồ thị hàm bậc nhất là một đường thẳng.', d: 'nhan_biet', o: ['Một đường cong', 'Một parabol', 'Một đoạn thẳng', 'Một đường thẳng'] },
        { q: 'T8-C7B28-003', c: 'Hàm số $y = 2x - 3$ là hàm số đồng biến hay nghịch biến?', a: 'Đồng biến', s: 'Hệ số $a=2 > 0$ nên hàm số đồng biến.', d: 'thong_hieu', o: ['Nghịch biến', 'Đồng biến', 'Không đồng biến cũng không nghịch biến', 'Vừa đồng biến vừa nghịch biến'] },
        { q: 'T8-C7B28-004', c: 'Đồ thị hàm số $y = -3x + 1$ đi qua điểm nào trên trục tung?', a: '$(0; 1)$', s: 'Cắt trục tung tại điểm có hoành độ bằng 0, tung độ bằng 1.', d: 'thong_hieu', o: ['$(1; 0)$', '$(0; 1)$', '$(0; -3)$', '$(-3; 1)$'] },
        { q: 'T8-C7B28-005', c: 'Tìm hàm số bậc nhất có đồ thị đi qua gốc tọa độ và điểm $A(1; 2)$:', a: '$y = 2x$', s: 'Đi qua gốc tọa độ nên $b=0 \\Rightarrow y=ax$. Qua $A(1;2) \\Rightarrow 2=a \\cdot 1 \\Rightarrow a=2$.', d: 'van_dung', o: ['$y = x + 1$', '$y = 2x$', '$y = \\frac{1}{2}x$', '$y = -2x$'] }
      ]
    },
    {
      name: 'Bài 29. Hệ số góc của đường thẳng.',
      questions: [
        { q: 'T8-C7B29-001', c: 'Trong phương trình đường thẳng $y = ax + b$ ($a \\neq 0$), đại lượng $a$ được gọi là gì?', a: 'Hệ số góc của đường thẳng', s: 'Hệ số của $x$ chính là hệ số góc.', d: 'nhan_biet', o: ['Tung độ gốc', 'Hoành độ gốc', 'Hệ số góc của đường thẳng', 'Hằng số tự do'] },
        { q: 'T8-C7B29-002', c: 'Hai đường thẳng $y = ax + b$ và $y = a\'x + b\'$ song song với nhau khi nào?', a: '$a = a\'$ và $b \\neq b\'$', s: 'Điều kiện để hai đường thẳng song song.', d: 'nhan_biet', o: ['$a = a\'$ và $b = b\'$', '$a \\neq a\'$', '$a = a\'$ và $b \\neq b\'$', '$a \\cdot a\' = -1$'] },
        { q: 'T8-C7B29-003', c: 'Đường thẳng $y = 2x + 1$ và đường thẳng $y = 2x - 3$ có vị trí tương đối như thế nào?', a: 'Song song', s: 'Cùng hệ số góc $a=2$, khác tung độ gốc.', d: 'thong_hieu', o: ['Cắt nhau', 'Vuông góc', 'Trùng nhau', 'Song song'] },
        { q: 'T8-C7B29-004', c: 'Hệ số góc của đường thẳng đi qua hai điểm $A(0; 2)$ và $B(1; 5)$ là:', a: '$3$', s: 'Hệ số góc $a = \\frac{y_B - y_A}{x_B - x_A} = \\frac{5-2}{1-0} = 3$.', d: 'thong_hieu', o: ['$3$', '$\\frac{1}{3}$', '$-3$', '$7$'] },
        { q: 'T8-C7B29-005', c: 'Tìm $m$ để hai đường thẳng $y = mx + 2$ và $y = (2-m)x + 1$ cắt nhau:', a: '$m \\neq 1$', s: 'Hai đường thẳng cắt nhau $\\Leftrightarrow m \\neq 2-m \\Leftrightarrow 2m \\neq 2 \\Leftrightarrow m \\neq 1$.', d: 'van_dung', o: ['$m = 1$', '$m \\neq 2$', '$m \\neq 1$', '$m = 0$'] }
      ]
    },
    {
      name: 'Bài tập cuối chương VII.',
      questions: [
        { q: 'T8-C7OT-001', c: 'Hàm số nào sau đây là hàm số bậc nhất?', a: '$y=2x-1$', s: 'Có dạng $ax+b$.', d: 'nhan_biet', o: ['$y=x^2$', '$y=\\frac{1}{x}$', '$y=2x-1$', '$y=\\sqrt{x}$'] },
        { q: 'T8-C7OT-002', c: 'Giao điểm của đường thẳng $y = 2x - 4$ với trục hoành có tọa độ là:', a: '$(2; 0)$', s: 'Giao trục hoành thì $y=0 \\Rightarrow 2x-4=0 \\Rightarrow x=2$.', d: 'thong_hieu', o: ['$(0; -4)$', '$(2; 0)$', '$(0; 2)$', '$(-4; 0)$'] },
        { q: 'T8-C7OT-003', c: 'Đường thẳng $y = -x + 3$ tạo với trục $Ox$ một góc có đặc điểm gì?', a: 'Góc tù', s: 'Hệ số góc $a = -1 < 0$ nên góc tạo với $Ox$ là góc tù.', d: 'thong_hieu', o: ['Góc nhọn', 'Góc vuông', 'Góc bẹt', 'Góc tù'] },
        { q: 'T8-C7OT-004', c: 'Hệ số góc của đường thẳng $y = -5x + 7$ là:', a: '$-5$', s: 'Hệ số góc là hệ số của $x$.', d: 'thong_hieu', o: ['$7$', '$-5$', '$5$', '$\\frac{7}{5}$'] },
        { q: 'T8-C7OT-005', c: 'Cho đường thẳng $d: y = ax + b$. Biết $d$ song song với $y = 3x$ và đi qua điểm $M(0; -2)$. Phương trình $d$ là:', a: '$y = 3x - 2$', s: 'Song song với $y=3x \\Rightarrow a=3$. Đi qua $M(0;-2) \\Rightarrow b=-2$.', d: 'van_dung', o: ['$y = 3x + 2$', '$y = -3x - 2$', '$y = 3x - 2$', '$y = -2x + 3$'] }
      ]
    },
    {
      name: 'Bài 31. Cách tính xác suất của biến cố bằng tỉ số.',
      questions: [
        { q: 'T8-C8B31-001', c: 'Xác suất của một biến cố $E$ trong phép thử với các kết quả đồng khả năng được tính bằng tỉ số nào?', a: 'Số kết quả thuận lợi cho biến cố $E$ chia cho tổng số kết quả có thể xảy ra', s: 'Quy tắc cơ bản tính xác suất lí thuyết.', d: 'nhan_biet', o: ['Số kết quả thuận lợi chia cho số kết quả không thuận lợi', 'Tổng số kết quả có thể xảy ra chia cho số kết quả thuận lợi', 'Số kết quả thuận lợi cho biến cố $E$ chia cho tổng số kết quả có thể xảy ra', 'Bằng số kết quả thuận lợi'] },
        { q: 'T8-C8B31-002', c: 'Nếu một phép thử có $n$ kết quả đồng khả năng và biến cố $A$ có $k$ kết quả thuận lợi thì xác suất của $A$ là:', a: '$\\frac{k}{n}$', s: 'Công thức tính xác suất.', d: 'nhan_biet', o: ['$k \\cdot n$', '$\\frac{n}{k}$', '$\\frac{k}{n}$', '$n - k$'] },
        { q: 'T8-C8B31-003', c: 'Chọn ngẫu nhiên một số từ các số tự nhiên từ $1$ đến $10$. Xác suất để chọn được số chẵn là:', a: '$\\frac{1}{2}$', s: 'Có 5 số chẵn trên tổng số 10 số, tỉ lệ là $5/10 = 1/2$.', d: 'thong_hieu', o: ['$\\frac{1}{5}$', '$\\frac{1}{2}$', '$\\frac{2}{5}$', '$\\frac{1}{10}$'] },
        { q: 'T8-C8B31-004', c: 'Rút ngẫu nhiên một thẻ từ $5$ thẻ đánh số $1, 2, 3, 4, 5$. Xác suất rút được thẻ ghi số nhỏ hơn $3$ là:', a: '$\\frac{2}{5}$', s: 'Các số nhỏ hơn 3 là 1 và 2. Có 2 kết quả thuận lợi trên 5.', d: 'thong_hieu', o: ['$\\frac{1}{5}$', '$\\frac{2}{5}$', '$\\frac{3}{5}$', '$\\frac{1}{2}$'] },
        { q: 'T8-C8B31-005', c: 'Trong hộp có $3$ bi đỏ, $4$ bi xanh, $5$ bi vàng. Lấy ngẫu nhiên $1$ bi. Xác suất để lấy được bi KHÔNG phải màu đỏ là:', a: '$\\frac{3}{4}$', s: 'Tổng số bi là 12. Bi không đỏ (xanh hoặc vàng) là 9. Xác suất $= 9/12 = 3/4$.', d: 'van_dung', o: ['$\\frac{1}{4}$', '$\\frac{1}{3}$', '$\\frac{3}{4}$', '$\\frac{7}{12}$'] }
      ]
    },
    {
      name: 'Bài 32. Mối liên hệ giữa xác suất thực nghiệm với xác suất và ứng dụng.',
      questions: [
        { q: 'T8-C8B32-001', c: 'Khi số lần thực hiện phép thử ngày càng lớn thì xác suất thực nghiệm của một biến cố sẽ có xu hướng thế nào?', a: 'Tiến ngày càng gần đến xác suất lí thuyết của biến cố đó', s: 'Quy luật số lớn trong xác suất thống kê.', d: 'nhan_biet', o: ['Trở thành $0$', 'Trở thành $1$', 'Tiến ngày càng gần đến xác suất lí thuyết của biến cố đó', 'Dao động mạnh hơn'] },
        { q: 'T8-C8B32-002', c: 'Nếu tung một đồng xu $100$ lần và thấy có $52$ lần mặt sấp thì tỉ số $\\frac{52}{100}$ được gọi là gì?', a: 'Xác suất thực nghiệm của biến cố "Xuất hiện mặt sấp"', s: 'Tỉ số giữa số lần xuất hiện và tổng số lần tung là xác suất thực nghiệm.', d: 'nhan_biet', o: ['Xác suất lí thuyết của mặt sấp', 'Xác suất thực nghiệm của biến cố "Xuất hiện mặt sấp"', 'Tần số của mặt ngửa', 'Số kết quả thuận lợi'] },
        { q: 'T8-C8B32-003', c: 'Trong $200$ lần gieo một con xúc xắc, mặt $6$ chấm xuất hiện $35$ lần. Xác suất thực nghiệm xuất hiện mặt $6$ chấm là:', a: '$0,175$', s: '$\\frac{35}{200} = 0,175$.', d: 'thong_hieu', o: ['$0,15$', '$0,175$', '$0,2$', '$0,6$'] },
        { q: 'T8-C8B32-004', c: 'Xác suất lí thuyết để xuất hiện mặt sấp khi tung đồng xu là $0,5$. Nếu tung đồng xu $1000$ lần thì số lần xuất hiện mặt sấp sẽ rơi vào khoảng nào?', a: 'Xấp xỉ $500$ lần', s: 'Do xác suất thực nghiệm tiến gần đến $0,5$ khi số lần tung lớn.', d: 'thong_hieu', o: ['Chính xác $500$ lần', 'Xấp xỉ $500$ lần', 'Khoảng $250$ lần', 'Chắc chắn là $1000$ lần'] },
        { q: 'T8-C8B32-005', c: 'Kiểm tra ngẫu nhiên $500$ sản phẩm của một xưởng thì thấy có $10$ phế phẩm. Ước lượng xác suất sản xuất ra phế phẩm của xưởng đó là:', a: '$2\\%$', s: 'Xác suất thực nghiệm $= \\frac{10}{500} = 0,02 = 2\\%$.', d: 'van_dung', o: ['$1\\%$', '$2\\%$', '$5\\%$', '$10\\%$'] }
      ]
    },
    {
      name: 'Bài tập cuối chương VIII.',
      questions: [
        { q: 'T8-C8OT-001', c: 'Trong $10$ tấm thẻ đánh số từ $1$ đến $10$, biến cố "Lấy được thẻ ghi số chẵn" có bao nhiêu kết quả thuận lợi?', a: '$5$', s: 'Các số chẵn là 2, 4, 6, 8, 10 (có 5 số).', d: 'nhan_biet', o: ['$4$', '$5$', '$6$', '$10$'] },
        { q: 'T8-C8OT-002', c: 'Xác suất của biến cố không thể (biến cố chắc chắn không xảy ra) bằng bao nhiêu?', a: '$0$', s: 'Biến cố không thể có xác suất bằng $0$.', d: 'thong_hieu', o: ['$0$', '$1$', '$0,5$', '$-1$'] },
        { q: 'T8-C8OT-003', c: 'Rút ngẫu nhiên một lá bài từ bộ bài tú lơ khơ $52$ lá. Xác suất để rút được lá Át (A) là:', a: '$\\frac{1}{13}$', s: 'Có 4 lá Át. Xác suất $= 4/52 = 1/13$.', d: 'thong_hieu', o: ['$\\frac{1}{52}$', '$\\frac{4}{13}$', '$\\frac{1}{13}$', '$\\frac{1}{4}$'] },
        { q: 'T8-C8OT-004', c: 'Gieo $2$ đồng xu cân đối. Xác suất để $2$ đồng xu đều xuất hiện mặt sấp là:', a: '$\\frac{1}{4}$', s: 'Không gian mẫu có 4 kết quả: SS, SN, NS, NN. Hai mặt sấp là 1 kết quả (SS).', d: 'thong_hieu', o: ['$\\frac{1}{2}$', '$\\frac{1}{3}$', '$\\frac{1}{4}$', '$1$'] },
        { q: 'T8-C8OT-005', c: 'Gieo đồng thời hai con xúc xắc cân đối. Xác suất để tổng số chấm trên hai mặt xuất hiện bằng $7$ là:', a: '$\\frac{1}{6}$', s: 'Các cặp có tổng = 7: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) -> 6 kết quả. Xác suất = 6/36 = 1/6.', d: 'van_dung', o: ['$\\frac{1}{7}$', '$\\frac{1}{12}$', '$\\frac{1}{6}$', '$\\frac{7}{36}$'] }
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
  
  console.log('\n✅ Hoàn thành Batch 4 Lớp 8');
}

insertGrade8Batch4().catch(console.error);
