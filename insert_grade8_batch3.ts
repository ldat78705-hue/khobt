import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);

async function insertGrade8Batch3() {
  console.log('Khởi tạo kết nối CSDL...');
  
  const users = await sql`SELECT user_id FROM public.questions WHERE user_id IS NOT NULL LIMIT 1`;
  const defaultUserId = users.length > 0 ? users[0].user_id : '00000000-0000-0000-0000-000000000000';

  const topics = [
    {
      name: 'Bài 18. Thu thập và phân loại dữ liệu.',
      questions: [
        { q: 'T8-C5B18-001', c: 'Dữ liệu được chia thành mấy loại chính?', a: '$2$ loại: Dữ liệu là số (số liệu) và Dữ liệu không là số', s: 'Theo chương trình, dữ liệu gồm 2 loại chính.', d: 'nhan_biet', o: ['$1$ loại', '$2$ loại: Dữ liệu là số (số liệu) và Dữ liệu không là số', '$3$ loại', '$4$ loại'] },
        { q: 'T8-C5B18-002', c: 'Dữ liệu không là số còn được gọi là gì?', a: 'Dữ liệu định tính', s: 'Dữ liệu định tính thể hiện tính chất, đặc điểm không đo lường được bằng số.', d: 'nhan_biet', o: ['Dữ liệu định lượng', 'Dữ liệu định tính', 'Số liệu rời rạc', 'Số liệu liên tục'] },
        { q: 'T8-C5B18-003', c: 'Màu sắc yêu thích của các bạn trong lớp (xanh, đỏ, tím, vàng...) là loại dữ liệu gì?', a: 'Dữ liệu không là số (định tính)', s: 'Vì nó biểu thị bằng chữ/màu sắc chứ không phải con số đo đếm.', d: 'thong_hieu', o: ['Dữ liệu là số (số liệu)', 'Dữ liệu không là số (định tính)', 'Số liệu liên tục', 'Dữ liệu dạng bảng'] },
        { q: 'T8-C5B18-004', c: 'Cân nặng của các bạn học sinh trong lớp (kg) là loại dữ liệu gì?', a: 'Dữ liệu là số (số liệu)', s: 'Cân nặng là đại lượng đo lường bằng con số.', d: 'thong_hieu', o: ['Dữ liệu không là số', 'Dữ liệu định tính', 'Dữ liệu là số (số liệu)', 'Văn bản'] },
        { q: 'T8-C5B18-005', c: 'Một bảng khảo sát có 2 cột "Họ và tên" và "Điểm kiểm tra Toán". Cột nào chứa số liệu?', a: 'Cột "Điểm kiểm tra Toán"', s: 'Điểm số là dữ liệu định lượng (số liệu). Họ tên là dữ liệu định tính.', d: 'van_dung', o: ['Cột "Họ và tên"', 'Cột "Điểm kiểm tra Toán"', 'Cả 2 cột', 'Không có cột nào'] }
      ]
    },
    {
      name: 'Bài 19. Biểu diễn dữ liệu bằng bảng, biểu đồ.',
      questions: [
        { q: 'T8-C5B19-001', c: 'Để biểu diễn sự thay đổi của một đại lượng theo thời gian ta thường dùng biểu đồ nào?', a: 'Biểu đồ đoạn thẳng', s: 'Biểu đồ đoạn thẳng thích hợp nhất để xem xu hướng tăng giảm theo thời gian.', d: 'nhan_biet', o: ['Biểu đồ cột kép', 'Biểu đồ hình quạt tròn', 'Biểu đồ đoạn thẳng', 'Biểu đồ tranh'] },
        { q: 'T8-C5B19-002', c: 'Để biểu diễn tỉ lệ phần trăm của các thành phần trong một tổng thể ta thường dùng biểu đồ nào?', a: 'Biểu đồ hình quạt tròn', s: 'Biểu đồ hình quạt thể hiện rõ cơ cấu, tỉ lệ phần trăm.', d: 'nhan_biet', o: ['Biểu đồ hình quạt tròn', 'Biểu đồ đoạn thẳng', 'Biểu đồ cột', 'Biểu đồ cột kép'] },
        { q: 'T8-C5B19-003', c: 'Khi so sánh số lượng của hai hay nhiều đại lượng khác nhau có cùng chung tiêu chí, biểu đồ nào là thích hợp nhất?', a: 'Biểu đồ cột hoặc cột kép', s: 'Biểu đồ cột dễ dàng so sánh độ cao (số lượng) của các nhóm.', d: 'thong_hieu', o: ['Biểu đồ hình quạt tròn', 'Biểu đồ cột hoặc cột kép', 'Biểu đồ đoạn thẳng', 'Bảng tần số'] },
        { q: 'T8-C5B19-004', c: 'Bảng thống kê là cách trình bày dữ liệu bằng hình thức nào?', a: 'Các hàng và các cột', s: 'Bảng luôn có dạng các hàng và cột.', d: 'thong_hieu', o: ['Các điểm và đường thẳng', 'Các hình tròn chia lát', 'Các cột hình chữ nhật', 'Các hàng và các cột'] },
        { q: 'T8-C5B19-005', c: 'Một lớp có $20$ học sinh giỏi, $15$ khá, $5$ trung bình. Tỉ lệ học sinh giỏi của lớp đó là bao nhiêu phần trăm?', a: '$50\\%$', s: 'Tổng số HS $= 40$. Tỉ lệ giỏi $= 20/40 = 0,5 = 50\\%$.', d: 'van_dung', o: ['$20\\%$', '$40\\%$', '$50\\%$', '$60\\%$'] }
      ]
    },
    {
      name: 'Bài 20. Phân tích số liệu thống kê dựa vào biểu đồ.',
      questions: [
        { q: 'T8-C5B20-001', c: 'Mục đích của việc phân tích số liệu thống kê là gì?', a: 'Tìm ra các quy luật, xu hướng và rút ra kết luận', s: 'Phân tích để hiểu ý nghĩa đằng sau các con số.', d: 'nhan_biet', o: ['Chỉ để vẽ biểu đồ cho đẹp', 'Tìm ra các quy luật, xu hướng và rút ra kết luận', 'Đếm số lượng dữ liệu', 'Chỉ để sắp xếp dữ liệu'] },
        { q: 'T8-C5B20-002', c: 'Tính hợp lí của số liệu thống kê thể hiện ở điểm nào?', a: 'Số liệu không mâu thuẫn với thực tế hoặc tổng các thành phần phải bằng $100\\%$ (nếu xét tỉ lệ)', s: 'Kiểm tra tính hợp lí là xem số liệu có vô lí hay sai tổng không.', d: 'nhan_biet', o: ['Số liệu luôn là số nguyên', 'Số liệu luôn dương', 'Số liệu không mâu thuẫn với thực tế hoặc tổng các thành phần phải bằng $100\\%$', 'Số liệu phải nhỏ hơn $100$'] },
        { q: 'T8-C5B20-003', c: 'Một biểu đồ hình quạt tròn có $3$ thành phần chiếm tỉ lệ $40\\%, 30\\%, 40\\%$. Bộ số liệu này có hợp lí không?', a: 'Không hợp lí vì tổng các tỉ lệ là $110\\%$', s: 'Tổng các phần trăm trong biểu đồ quạt luôn phải bằng $100\\%$.', d: 'thong_hieu', o: ['Có hợp lí vì các số đều lớn hơn $0$', 'Có hợp lí vì $40+30+40$ là các số tròn chục', 'Không hợp lí vì có hai số $40\\%$ giống nhau', 'Không hợp lí vì tổng các tỉ lệ là $110\\%$'] },
        { q: 'T8-C5B20-004', c: 'Nhìn vào biểu đồ đoạn thẳng thấy đường biểu diễn đi lên theo thời gian, ta có thể kết luận gì về đại lượng đó?', a: 'Đang có xu hướng tăng', s: 'Đường đi lên ứng với giá trị lớn dần.', d: 'thong_hieu', o: ['Đang có xu hướng tăng', 'Đang có xu hướng giảm', 'Không thay đổi', 'Đang thay đổi không ổn định'] },
        { q: 'T8-C5B20-005', c: 'Trung bình mỗi tháng một cửa hàng bán được $100$ sản phẩm. Số lượng bán trong $3$ tháng lần lượt là $90, 110, x$. Tìm $x$?', a: '$100$', s: '$(90+110+x)/3 = 100 \\Rightarrow 200+x = 300 \\Rightarrow x = 100$.', d: 'van_dung', o: ['$90$', '$100$', '$110$', '$300$'] }
      ]
    },
    {
      name: 'Bài tập cuối chương V.',
      questions: [
        { q: 'T8-C5OT-001', c: 'Dữ liệu "số lượng xe máy bán được trong tháng" thuộc loại dữ liệu nào?', a: 'Số liệu (Dữ liệu định lượng)', s: 'Số lượng là con số đo đếm được.', d: 'nhan_biet', o: ['Dữ liệu định tính', 'Số liệu (Dữ liệu định lượng)', 'Dữ liệu không là số', 'Dữ liệu liên tục'] },
        { q: 'T8-C5OT-002', c: 'Khi vẽ biểu đồ hình quạt tròn, $25\\%$ tương ứng với góc ở tâm bằng bao nhiêu độ?', a: '$90^\\circ$', s: '$25\\%$ của $360^\\circ$ là $0,25 \\times 360^\\circ = 90^\\circ$.', d: 'thong_hieu', o: ['$45^\\circ$', '$90^\\circ$', '$120^\\circ$', '$180^\\circ$'] },
        { q: 'T8-C5OT-003', c: 'Biểu đồ cột kép thường được dùng để làm gì?', a: 'So sánh hai tập dữ liệu cùng loại', s: 'Hai cột đứng cạnh nhau dễ dàng cho việc so sánh.', d: 'thong_hieu', o: ['Biểu diễn tỉ lệ phần trăm', 'Xem xét xu hướng thay đổi', 'So sánh hai tập dữ liệu cùng loại', 'Biểu diễn dữ liệu định tính duy nhất'] },
        { q: 'T8-C5OT-004', c: 'Trong thống kê, tính đại diện của mẫu là gì?', a: 'Phản ánh đúng đặc điểm của tổng thể', s: 'Mẫu được chọn phải mang tính ngẫu nhiên và phản ánh được tổng thể.', d: 'thong_hieu', o: ['Kích thước mẫu lớn nhất có thể', 'Phản ánh đúng đặc điểm của tổng thể', 'Mẫu chỉ gồm những người xuất sắc', 'Chỉ chọn mẫu theo sở thích'] },
        { q: 'T8-C5OT-005', c: 'Trong một cuộc khảo sát, điểm số môn Toán của $5$ học sinh là: $7, 8, 8, 9, 10$. Số trung bình cộng là:', a: '$8,4$', s: '$(7+8+8+9+10)/5 = 42/5 = 8,4$.', d: 'van_dung', o: ['$8,0$', '$8,2$', '$8,4$', '$8,5$'] }
      ]
    },
    {
      name: 'Bài 22. Tính chất cơ bản của phân thức đại số.',
      questions: [
        { q: 'T8-C6B22-001', c: 'Tính chất cơ bản của phân thức: Nếu nhân cả tử và mẫu của một phân thức với cùng một đa thức khác đa thức không thì ta được?', a: 'Một phân thức bằng phân thức đã cho', s: 'Tính chất tương tự phân số.', d: 'nhan_biet', o: ['Một phân thức lớn hơn phân thức đã cho', 'Một phân thức bằng phân thức đã cho', 'Một phân thức nhỏ hơn phân thức đã cho', 'Phân thức đảo'] },
        { q: 'T8-C6B22-002', c: 'Đẳng thức $\\frac{A}{B} = \\frac{A \\cdot M}{B \\cdot M}$ đúng với điều kiện gì?', a: '$M$ là một đa thức khác đa thức $0$', s: 'Theo tính chất cơ bản của phân thức.', d: 'nhan_biet', o: ['$M$ là đa thức bất kì', '$M$ là một đa thức khác đa thức $0$', '$M$ phải lớn hơn $0$', '$M$ phải là hằng số'] },
        { q: 'T8-C6B22-003', c: 'Rút gọn phân thức $\\frac{2x}{4x^2}$ ta được kết quả là:', a: '$\\frac{1}{2x}$', s: 'Chia cả tử và mẫu cho $2x$ (với $x \\neq 0$).', d: 'thong_hieu', o: ['$\\frac{1}{2x}$', '$\\frac{x}{2}$', '$2x$', '$\\frac{1}{2}$'] },
        { q: 'T8-C6B22-004', c: 'Biểu thức $\\frac{x-y}{y-x}$ ($x \\neq y$) rút gọn bằng bao nhiêu?', a: '$-1$', s: '$y-x = -(x-y)$, nên $\\frac{x-y}{-(x-y)} = -1$.', d: 'thong_hieu', o: ['$1$', '$-1$', '$0$', '$x-y$'] },
        { q: 'T8-C6B22-005', c: 'Rút gọn phân thức $\\frac{x^2-1}{x^2+x}$ ta được:', a: '$\\frac{x-1}{x}$', s: '$\\frac{(x-1)(x+1)}{x(x+1)} = \\frac{x-1}{x}$.', d: 'van_dung', o: ['$\\frac{x-1}{x}$', '$\\frac{x+1}{x}$', '$\\frac{x-1}{x+1}$', '$-1$'] }
      ]
    },
    {
      name: 'Bài 23. Phép cộng và phép trừ phân thức đại số.',
      questions: [
        { q: 'T8-C6B23-001', c: 'Muốn cộng hai phân thức có cùng mẫu thức ta làm thế nào?', a: 'Cộng các tử thức với nhau và giữ nguyên mẫu thức', s: 'Quy tắc cộng phân thức cùng mẫu.', d: 'nhan_biet', o: ['Cộng các tử thức với nhau và cộng các mẫu thức với nhau', 'Cộng các tử thức với nhau và giữ nguyên mẫu thức', 'Nhân các tử thức với nhau', 'Quy đồng mẫu thức rồi mới cộng'] },
        { q: 'T8-C6B23-002', c: 'Phân thức đối của phân thức $\\frac{A}{B}$ là:', a: '$\\frac{-A}{B}$ (hoặc $-\\frac{A}{B}$)', s: 'Hai phân thức đối nhau có tổng bằng $0$.', d: 'nhan_biet', o: ['$\\frac{B}{A}$', '$\\frac{-B}{-A}$', '$\\frac{-A}{B}$', '$\\frac{A}{-B}$ (sai dấu)'] },
        { q: 'T8-C6B23-003', c: 'Thực hiện phép tính $\\frac{x}{x-1} + \\frac{-1}{x-1}$ có kết quả là:', a: '$1$', s: '$\\frac{x + (-1)}{x-1} = \\frac{x-1}{x-1} = 1$.', d: 'thong_hieu', o: ['$-1$', '$1$', '$\\frac{x+1}{x-1}$', '$0$'] },
        { q: 'T8-C6B23-004', c: 'Thực hiện phép trừ $\\frac{x}{y} - \\frac{x-y}{y}$ ta được:', a: '$1$', s: '$\\frac{x - (x-y)}{y} = \\frac{y}{y} = 1$.', d: 'thong_hieu', o: ['$1$', '$\\frac{2x-y}{y}$', '$-1$', '$\\frac{-y}{y}$'] },
        { q: 'T8-C6B23-005', c: 'Thực hiện phép tính $\\frac{1}{x} + \\frac{1}{x^2}$ ($x \\neq 0$) ta được:', a: '$\\frac{x+1}{x^2}$', s: 'Mẫu thức chung là $x^2$. Ta có $\\frac{x}{x^2} + \\frac{1}{x^2} = \\frac{x+1}{x^2}$.', d: 'van_dung', o: ['$\\frac{2}{x^3}$', '$\\frac{x+1}{x^2}$', '$\\frac{2}{x^2}$', '$\\frac{x+1}{x}$'] }
      ]
    },
    {
      name: 'Bài 24. Phép nhân và phép chia phân thức đại số.',
      questions: [
        { q: 'T8-C6B24-001', c: 'Muốn nhân hai phân thức ta làm thế nào?', a: 'Nhân tử với tử, nhân mẫu với mẫu', s: 'Quy tắc nhân hai phân thức: $\\frac{A}{B} \\cdot \\frac{C}{D} = \\frac{A \\cdot C}{B \\cdot D}$.', d: 'nhan_biet', o: ['Nhân tử này với mẫu kia', 'Nhân tử với tử, nhân mẫu với mẫu', 'Quy đồng mẫu thức rồi nhân', 'Giữ nguyên mẫu, nhân hai tử'] },
        { q: 'T8-C6B24-002', c: 'Phân thức nghịch đảo của phân thức $\\frac{A}{B}$ ($A \\neq 0, B \\neq 0$) là:', a: '$\\frac{B}{A}$', s: 'Tích của hai phân thức nghịch đảo bằng $1$.', d: 'nhan_biet', o: ['$-\\frac{A}{B}$', '$\\frac{B}{A}$', '$\\frac{-B}{-A}$', '$\\frac{1}{A \\cdot B}$'] },
        { q: 'T8-C6B24-003', c: 'Tích của hai phân thức $\\frac{x}{y} \\cdot \\frac{y^2}{x^2}$ là:', a: '$\\frac{y}{x}$', s: '$\\frac{x \\cdot y^2}{y \\cdot x^2} = \\frac{y}{x}$.', d: 'thong_hieu', o: ['$\\frac{x}{y}$', '$\\frac{y^2}{x^2}$', '$\\frac{y}{x}$', '$1$'] },
        { q: 'T8-C6B24-004', c: 'Thương của phép chia $\\frac{2x}{y} : \\frac{x}{y^2}$ là:', a: '$2y$', s: '$\\frac{2x}{y} \\cdot \\frac{y^2}{x} = 2y$.', d: 'thong_hieu', o: ['$\\frac{2x^2}{y^3}$', '$\\frac{2}{y}$', '$2y$', '$\\frac{y}{2}$'] },
        { q: 'T8-C6B24-005', c: 'Thực hiện phép tính $\\frac{x^2-4}{x} \\cdot \\frac{x^2}{x-2}$ ta được:', a: '$x(x+2)$', s: '$\\frac{(x-2)(x+2)}{x} \\cdot \\frac{x^2}{x-2} = (x+2) \\cdot x = x(x+2)$.', d: 'van_dung', o: ['$x(x-2)$', '$x+2$', '$x(x+2)$', '$\\frac{x+2}{x}$'] }
      ]
    },
    {
      name: 'Bài tập cuối chương VI.',
      questions: [
        { q: 'T8-C6OT-001', c: 'Điều kiện xác định của phân thức $\\frac{A}{B}$ là gì?', a: '$B \\neq 0$', s: 'Mẫu thức phải khác đa thức $0$.', d: 'nhan_biet', o: ['$A \\neq 0$', '$B = 0$', '$B \\neq 0$', '$A$ và $B \\neq 0$'] },
        { q: 'T8-C6OT-002', c: 'Điều kiện xác định của phân thức $\\frac{x+1}{x-2}$ là:', a: '$x \\neq 2$', s: '$x-2 \\neq 0 \\Rightarrow x \\neq 2$.', d: 'thong_hieu', o: ['$x \\neq -1$', '$x \\neq 2$', '$x > 2$', '$x < 2$'] },
        { q: 'T8-C6OT-003', c: 'Rút gọn phân thức $\\frac{3x^2y}{6xy^2}$ ta được:', a: '$\\frac{x}{2y}$', s: 'Chia cả tử và mẫu cho $3xy$.', d: 'thong_hieu', o: ['$\\frac{x}{2y}$', '$\\frac{y}{2x}$', '$\\frac{2x}{y}$', '$\\frac{3x}{6y}$'] },
        { q: 'T8-C6OT-004', c: 'Phép tính $\\frac{1}{x-1} - \\frac{1}{x+1}$ có kết quả là:', a: '$\\frac{2}{x^2-1}$', s: '$\\frac{x+1 - (x-1)}{(x-1)(x+1)} = \\frac{2}{x^2-1}$.', d: 'thong_hieu', o: ['$\\frac{2x}{x^2-1}$', '$\\frac{2}{x^2-1}$', '$\\frac{-2}{x^2-1}$', '$0$'] },
        { q: 'T8-C6OT-005', c: 'Tính giá trị của phân thức $\\frac{x^2-1}{x-1}$ tại $x = 10$:', a: '$11$', s: '$\\frac{(x-1)(x+1)}{x-1} = x+1$. Khi $x=10$, giá trị là $10+1=11$.', d: 'van_dung', o: ['$9$', '$10$', '$11$', '$99/9$'] }
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
  
  console.log('\n✅ Hoàn thành Batch 3 Lớp 8');
}

insertGrade8Batch3().catch(console.error);
