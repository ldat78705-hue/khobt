const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const crypto = require('crypto');

async function main() {
  const id25 = 'a573d790-eeab-4cce-8435-238ea39bbdf9'; // Bài 25. Phương trình
  const id26 = 'd67ec853-e283-4b22-b32b-945eab72aed2'; // Bài 26. Giải bài toán bằng cách lập PT
  const id27 = 'f06eba8b-9f39-442f-a758-ceafe95ec4d4'; // Bài 27. Khái niệm hàm số
  const id28 = 'f487b483-14ef-4260-aea9-8cd1a0af3bd5'; // Bài 28. Hàm số bậc nhất
  const id29 = '11b6192b-c396-424e-b272-96e96868be55'; // Bài 29. Hệ số góc

  const grade = 8;
  const user_id = '8316c34e-765d-4b8c-9364-b683a17e33f8';
  let allQS = [];

  // Bài 25. Phương trình bậc nhất một ẩn
  allQS.push(
    { cat: id25, code: 'T8-EQ-NEW1', content: 'Giải phương trình: $3x - 12 = 0$.', answer: '$x = 4$.', solution: 'Chuyển hạng tử tự do sang vế phải và đổi dấu:\n$3x = 12$\nChia cả hai vế cho 3:\n$x = 12 : 3 = 4$.\nVậy tập nghiệm của phương trình là $S = \\{4\\}$.' },
    { cat: id25, code: 'T8-EQ-NEW2', content: 'Giải phương trình: $5x + 3 = 2x - 9$.', answer: '$x = -4$.', solution: 'Chuyển các hạng tử chứa $x$ sang vế trái, các số hạng tự do sang vế phải:\n$5x - 2x = -9 - 3$\n$3x = -12$\n$x = -12 : 3 = -4$.\nVậy tập nghiệm của phương trình là $S = \\{-4\\}$.' },
    { cat: id25, code: 'T8-EQ-NEW3', content: 'Giải phương trình: $2(x - 3) = 4x - 10$.', answer: '$x = 2$.', solution: 'Nhân phá ngoặc ở vế trái:\n$2x - 6 = 4x - 10$\nChuyển vế:\n$2x - 4x = -10 + 6$\n$-2x = -4$\n$x = (-4) : (-2) = 2$.\nVậy tập nghiệm của phương trình là $S = \\{2\\}$.' },
    { cat: id25, code: 'T8-EQ-NEW4', content: 'Giải phương trình: $\\dfrac{x+1}{3} = \\dfrac{x-2}{2}$.', answer: '$x = 8$.', solution: 'Quy đồng mẫu hai vế với mẫu chung là $6$:\n$\\dfrac{2(x+1)}{6} = \\dfrac{3(x-2)}{6}$\nKhử mẫu:\n$2(x + 1) = 3(x - 2)$\n$2x + 2 = 3x - 6$\nChuyển vế:\n$2x - 3x = -6 - 2$\n$-x = -8 \\Rightarrow x = 8$.' },
    { cat: id25, code: 'T8-EQ-NEW5', content: 'Giải phương trình: $\\dfrac{x-1}{2} + \\dfrac{x-2}{3} = 1$.', answer: '$x = \\dfrac{14}{5}$.', solution: 'Quy đồng mẫu với mẫu chung là $6$:\n$\\dfrac{3(x-1)}{6} + \\dfrac{2(x-2)}{6} = \\dfrac{6}{6}$\nKhử mẫu:\n$3(x - 1) + 2(x - 2) = 6$\n$3x - 3 + 2x - 4 = 6$\n$5x - 7 = 6$\n$5x = 13 \\Rightarrow x = \\dfrac{13}{5} = 2,6$.' }
  );

  // Bài 26. Giải bài toán bằng cách lập phương trình
  allQS.push(
    { cat: id26, code: 'T8-EQ-NEW6', content: 'Tổng của hai số là $45$. Nếu lấy số lớn chia cho số bé thì được thương là $2$ dư $3$. Tìm hai số đó.', answer: '$31$ và $14$.', solution: 'Gọi số bé là $x$ ($0 < x < 45$).\nKhi đó số lớn là $45 - x$.\nVì số lớn chia số bé được $2$ dư $3$, nên ta có phương trình:\n$45 - x = 2x + 3$\nChuyển vế:\n$45 - 3 = 2x + x$\n$3x = 42 \\Rightarrow x = 14$.\nSố bé là $14$, số lớn là $45 - 14 = 31$.\n**Kết luận:** Hai số cần tìm là $31$ và $14$.' },
    { cat: id26, code: 'T8-EQ-NEW7', content: 'Một mảnh vườn hình chữ nhật có chu vi $60$m. Chiều dài hơn chiều rộng $10$m. Tính diện tích mảnh vườn.', answer: '$200\\text{ m}^2$.', solution: 'Gọi chiều rộng mảnh vườn là $x$ (m) ($x > 0$).\nChiều dài mảnh vườn là $x + 10$ (m).\nChu vi là $60$m nên ta có phương trình:\n$(x + x + 10) \\times 2 = 60$\n$2x + 10 = 30$\n$2x = 20 \\Rightarrow x = 10$ (m).\nChiều rộng là $10$m, chiều dài là $20$m.\nDiện tích mảnh vườn: $S = 10 \\times 20 = 200$ ($\\text{m}^2$).' },
    { cat: id26, code: 'T8-EQ-NEW8', content: 'Một ô tô đi từ A đến B với vận tốc $40$ km/h. Lúc về ô tô đi với vận tốc $50$ km/h. Thời gian đi nhiều hơn thời gian về là $30$ phút. Tính độ dài quãng đường AB.', answer: '$100$ km.', solution: 'Đổi $30$ phút = $0,5$ giờ.\nGọi quãng đường AB là $x$ (km) ($x > 0$).\nThời gian lúc đi là $\\dfrac{x}{40}$ (giờ).\nThời gian lúc về là $\\dfrac{x}{50}$ (giờ).\nTa có phương trình:\n$\\dfrac{x}{40} - \\dfrac{x}{50} = 0,5$\nQuy đồng mẫu số chung là $200$:\n$\\dfrac{5x - 4x}{200} = 0,5$\n$x = 200 \\times 0,5 = 100$ (km).\n**Kết luận:** Quãng đường AB dài $100$ km.' },
    { cat: id26, code: 'T8-EQ-NEW9', content: 'Tuổi của bố hiện nay gấp $3$ lần tuổi con. $5$ năm sau, tổng số tuổi của hai bố con là $50$ tuổi. Tính tuổi hiện nay của mỗi người.', answer: 'Bố $30$ tuổi, con $10$ tuổi.', solution: 'Gọi tuổi con hiện nay là $x$ (tuổi) ($x \\in \\mathbb{N}^*$).\nTuổi bố hiện nay là $3x$ (tuổi).\nSau 5 năm, tuổi con là $x + 5$ và tuổi bố là $3x + 5$.\nTa có phương trình:\n$(x + 5) + (3x + 5) = 50$\n$4x + 10 = 50$\n$4x = 40 \\Rightarrow x = 10$.\nVậy hiện nay con $10$ tuổi, bố $30$ tuổi.' },
    { cat: id26, code: 'T8-EQ-NEW10', content: 'Một tổ sản xuất theo kế hoạch mỗi ngày phải may $50$ bộ quần áo. Nhờ cải tiến kĩ thuật, mỗi ngày xưởng may được $60$ bộ. Do đó xưởng hoàn thành trước kế hoạch $2$ ngày và còn may thêm được $10$ bộ. Hỏi theo kế hoạch xưởng phải may bao nhiêu bộ quần áo?', answer: '$650$ bộ.', solution: 'Gọi số bộ quần áo phải may theo kế hoạch là $x$ ($x > 0$).\nThời gian dự định: $\\dfrac{x}{50}$ (ngày).\nSố áo thực tế may được: $x + 10$ (bộ).\nThời gian thực tế: $\\dfrac{x + 10}{60}$ (ngày).\nTa có phương trình:\n$\\dfrac{x}{50} - \\dfrac{x + 10}{60} = 2$\nQuy đồng mẫu $300$:\n$6x - 5(x + 10) = 600$\n$x - 50 = 600 \\Rightarrow x = 650$.\nVậy kế hoạch phải may $650$ bộ.' }
  );

  // Bài 27. Khái niệm hàm số
  allQS.push(
    { cat: id27, code: 'T8-FN-NEW11', content: 'Cho hàm số $y = f(x) = 2x - 3$. Tính $f(0), f(2), f(-1)$.', answer: '$-3, 1, -5$.', solution: 'Ta thay các giá trị của $x$ vào công thức hàm số:\n- $f(0) = 2(0) - 3 = -3$.\n- $f(2) = 2(2) - 3 = 4 - 3 = 1$.\n- $f(-1) = 2(-1) - 3 = -2 - 3 = -5$.' },
    { cat: id27, code: 'T8-FN-NEW12', content: 'Biểu diễn các điểm $A(1; 2), B(-2; 3), C(0; -1)$ trên cùng một mặt phẳng toạ độ Oxy. Điểm nào nằm trên trục tung?', answer: 'Điểm $C(0; -1)$.', solution: '- Điểm $C$ có hoành độ $x = 0$, do đó nó nằm trên trục tung (trục $Oy$).\n- Việc biểu diễn: Điểm $A$ sang phải $1$ lên $2$. Điểm $B$ sang trái $2$ lên $3$.' },
    { cat: id27, code: 'T8-FN-NEW13', content: 'Kiểm tra xem điểm $M(2; 5)$ có thuộc đồ thị hàm số $y = 3x - 1$ không? Vì sao?', answer: 'Có thuộc đồ thị.', solution: 'Thay toạ độ điểm $M(2; 5)$ vào công thức hàm số (thay $x = 2, y = 5$):\n$5 = 3(2) - 1$\n$5 = 6 - 1 = 5$ (Đây là mệnh đề đúng).\nVậy điểm $M(2; 5)$ thuộc đồ thị hàm số $y = 3x - 1$.' },
    { cat: id27, code: 'T8-FN-NEW14', content: 'Tìm toạ độ giao điểm của đồ thị hàm số $y = 2x - 4$ với trục hoành và trục tung.', answer: '$(2; 0)$ và $(0; -4)$.', solution: '- Giao điểm với trục tung (cho $x = 0$): $y = 2(0) - 4 = -4$. Điểm $(0; -4)$.\n- Giao điểm với trục hoành (cho $y = 0$): $0 = 2x - 4 \\Rightarrow x = 2$. Điểm $(2; 0)$.' },
    { cat: id27, code: 'T8-FN-NEW15', content: 'Tìm $m$ để đồ thị hàm số $y = f(x) = mx + 2$ đi qua điểm $A(-1; 5)$.', answer: '$m = -3$.', solution: 'Vì đồ thị đi qua $A(-1; 5)$, ta thay $x = -1, y = 5$ vào hàm số:\n$5 = m(-1) + 2$\n$-m + 2 = 5$\n$-m = 3 \\Rightarrow m = -3$.\nVậy $m = -3$.' }
  );

  // Bài 28. Hàm số bậc nhất
  allQS.push(
    { cat: id28, code: 'T8-FN-NEW16', content: 'Trong các hàm số sau, hàm số nào là hàm số bậc nhất: $y = 3x + 1$, $y = \\dfrac{2}{x}$, $y = -5x$, $y = 2x^2 + 1$.', answer: '$y = 3x + 1$ và $y = -5x$.', solution: 'Hàm số bậc nhất có dạng $y = ax + b$ (với $a \\neq 0$).\n- $y = 3x + 1$ là hàm số bậc nhất ($a=3, b=1$).\n- $y = -5x$ là hàm số bậc nhất ($a=-5, b=0$).\n- $y = \\dfrac{2}{x}$ có biến $x$ ở mẫu nên không phải.\n- $y = 2x^2 + 1$ là hàm số bậc hai.' },
    { cat: id28, code: 'T8-FN-NEW17', content: 'Xác định điều kiện của $m$ để hàm số $y = (2m-1)x + 3$ là hàm số bậc nhất.', answer: '$m \\neq \\dfrac{1}{2}$.', solution: 'Để hàm số trên là hàm số bậc nhất, hệ số $a$ phải khác $0$:\n$2m - 1 \\neq 0$\n$2m \\neq 1 \\Rightarrow m \\neq \\dfrac{1}{2}$.' },
    { cat: id28, code: 'T8-FN-NEW18', content: 'Xác định hàm số bậc nhất $y = ax + b$ biết đồ thị hàm số đi qua điểm $A(1; 3)$ và cắt trục tung tại điểm có tung độ bằng $1$.', answer: '$y = 2x + 1$.', solution: 'Cắt trục tung tại tung độ bằng $1$ nên $b = 1$.\nHàm số có dạng $y = ax + 1$.\nĐồ thị đi qua $A(1; 3)$, thay $x = 1, y = 3$:\n$3 = a(1) + 1 \\Rightarrow a = 2$.\nVậy hàm số là $y = 2x + 1$.' },
    { cat: id28, code: 'T8-FN-NEW19', content: 'Hàm số $y = -3x + 5$ đồng biến hay nghịch biến trên $\\mathbb{R}$? Vì sao?', answer: 'Nghịch biến vì $a = -3 < 0$.', solution: 'Hàm số bậc nhất $y = ax + b$ nghịch biến trên $\\mathbb{R}$ khi $a < 0$.\nỞ đây, $a = -3 < 0$, do đó hàm số $y = -3x + 5$ nghịch biến trên $\\mathbb{R}$.' },
    { cat: id28, code: 'T8-FN-NEW20', content: 'Vẽ đồ thị của hàm số $y = 2x + 4$. (Trình bày cách vẽ)', answer: 'Xem lời giải.', solution: '**Các bước vẽ đồ thị:**\n- Cho $x = 0 \\Rightarrow y = 4$. Đồ thị đi qua điểm $A(0; 4)$ trên trục tung.\n- Cho $y = 0 \\Rightarrow 2x + 4 = 0 \\Rightarrow x = -2$. Đồ thị đi qua điểm $B(-2; 0)$ trên trục hoành.\nKẻ đường thẳng đi qua hai điểm $A$ và $B$, ta được đồ thị hàm số $y = 2x + 4$.' }
  );

  // Bài 29. Hệ số góc
  allQS.push(
    { cat: id29, code: 'T8-FN-NEW21', content: 'Tìm hệ số góc của đường thẳng $y = 4x - 3$. Đường thẳng này tạo với trục $Ox$ một góc nhọn hay góc tù?', answer: 'Hệ số góc $4$. Tạo góc nhọn.', solution: '- Đường thẳng $y = ax + b$ có hệ số góc là $a$. Ở đây hệ số góc bằng $4$.\n- Vì $a = 4 > 0$ nên góc tạo bởi đường thẳng và trục $Ox$ là góc nhọn.' },
    { cat: id29, code: 'T8-FN-NEW22', content: 'Cho hai đường thẳng $d_1: y = 2x + 1$ và $d_2: y = 2x - 3$. Hai đường thẳng này có vị trí tương đối như thế nào với nhau?', answer: 'Song song với nhau.', solution: 'Đường thẳng $d_1$ có $a_1 = 2, b_1 = 1$.\nĐường thẳng $d_2$ có $a_2 = 2, b_2 = -3$.\nVì $a_1 = a_2$ ($2 = 2$) và $b_1 \\neq b_2$ ($1 \\neq -3$) nên hai đường thẳng song song với nhau.' },
    { cat: id29, code: 'T8-FN-NEW23', content: 'Viết phương trình đường thẳng đi qua điểm $M(1; -2)$ và song song với đường thẳng $y = -3x + 5$.', answer: '$y = -3x + 1$.', solution: 'Vì đường thẳng cần tìm song song với $y = -3x + 5$ nên nó có hệ số góc $a = -3$.\nPhương trình có dạng: $y = -3x + b$.\nĐường thẳng đi qua $M(1; -2)$, thay vào:\n$-2 = -3(1) + b \\Rightarrow b = -2 + 3 = 1$.\nVậy đường thẳng cần tìm là $y = -3x + 1$.' },
    { cat: id29, code: 'T8-FN-NEW24', content: 'Viết phương trình đường thẳng đi qua gốc toạ độ và có hệ số góc bằng $2$.', answer: '$y = 2x$.', solution: 'Đường thẳng đi qua gốc toạ độ $O(0; 0)$ có phương trình dạng $y = ax$.\nVì hệ số góc $a = 2$, nên phương trình đường thẳng là $y = 2x$.' },
    { cat: id29, code: 'T8-FN-NEW25', content: 'Cho đường thẳng $y = (m-1)x + 2$. Tìm $m$ để đường thẳng có hệ số góc bằng $3$.', answer: '$m = 4$.', solution: 'Đường thẳng $y = (m-1)x + 2$ có hệ số góc là $(m - 1)$.\nTheo đề bài, hệ số góc bằng $3$:\n$m - 1 = 3 \\Rightarrow m = 4$.\nVậy $m = 4$.' }
  );

  console.log(`Inserting ${allQS.length} new questions for Grade 8 (Equations & Functions)...`);

  for (const q of allQS) {
    if (!q.cat) continue;
    const qid = crypto.randomUUID();
    await sql`
      INSERT INTO public.questions (id, category_id, question_code, content, answer, solution, difficulty, grade, topic, question_type, user_id, status, is_public)
      VALUES (${qid}, ${q.cat}, ${q.code}, ${q.content}, ${q.answer}, ${q.solution}, 'van_dung', ${grade}, 'dai_so', 'tu_luan', ${user_id}, 'approved', true)
    `;
    console.log(`Inserted ${q.code}`);
  }

  console.log('Done!');
}

main().catch(console.error);
