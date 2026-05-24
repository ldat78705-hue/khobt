const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const crypto = require('crypto');

async function main() {
  const id13 = '45f9f700-53ca-43dc-8651-ac4f4baaaced'; // Bài 13
  const id14 = 'adb5c68f-4fd7-481e-8132-36e96dfaa7bd'; // Bài 14
  const id15 = '1e0412bd-0c9c-49a5-9508-7e785d00e63c'; // Bài 15
  const id16 = 'efc2618a-4c5b-4483-8d2d-818d3ed639ba'; // Bài 16

  const grade = 6;
  const user_id = '8316c34e-765d-4b8c-9364-b683a17e33f8';
  let allQS = [];

  // Bài 13. Tập hợp các số nguyên
  allQS.push(
    { cat: id13, code: 'T6-Z-NEW1', content: 'Vẽ trục số và nêu vị trí của các số nguyên sau so với điểm gốc $0$: $-3; 2; -1; 4$.', answer: 'Xem lời giải.', solution: '- Số $-3$: Nằm bên trái điểm $0$, cách điểm $0$ ba đơn vị.\n- Số $-1$: Nằm bên trái điểm $0$, cách điểm $0$ một đơn vị.\n- Số $2$: Nằm bên phải điểm $0$, cách điểm $0$ hai đơn vị.\n- Số $4$: Nằm bên phải điểm $0$, cách điểm $0$ bốn đơn vị.' },
    { cat: id13, code: 'T6-Z-NEW2', content: 'Hãy nêu số đối của các số nguyên sau: $5; -8; 0$.', answer: '$-5; 8; 0$.', solution: 'Số đối của một số nguyên $a$ là $-a$, sao cho tổng của chúng bằng $0$.\n- Số đối của $5$ là $-5$.\n- Số đối của $-8$ là $8$.\n- Số đối của $0$ là chính nó ($0$).' },
    { cat: id13, code: 'T6-Z-NEW3', content: 'Nhiệt độ ban đêm ở một trạm quan sát là $-5^\\circ C$, nhiệt độ ban ngày cao hơn ban đêm $3^\\circ C$. Hỏi nhiệt độ ban ngày là bao nhiêu?', answer: '$-2^\\circ C$.', solution: 'Nhiệt độ ban ngày cao hơn ban đêm $3^\\circ C$, tức là ta thực hiện phép cộng:\n$-5 + 3 = -2$ ($^\\circ C$).\n\n**Kết luận:** Nhiệt độ ban ngày là $-2^\\circ C$.' },
    { cat: id13, code: 'T6-Z-NEW4', content: 'Sắp xếp các số nguyên sau theo thứ tự tăng dần: $7; -5; 0; -2; 3$.', answer: '$-5 < -2 < 0 < 3 < 7$.', solution: '- Các số nguyên âm luôn nhỏ hơn $0$ và nhỏ hơn số nguyên dương. Trong hai số nguyên âm, số nào có phần tự nhiên lớn hơn thì nhỏ hơn.\nNên $-5 < -2$.\n- Các số nguyên dương sắp xếp bình thường: $3 < 7$.\n\nThứ tự tăng dần là: $-5 < -2 < 0 < 3 < 7$.' },
    { cat: id13, code: 'T6-Z-NEW5', content: 'Liệt kê các số nguyên $x$ thỏa mãn: $-4 < x \\leq 2$. Tính tổng các số nguyên đó.', answer: 'Tổng bằng $-3$.', solution: '**Bước 1: Liệt kê các số nguyên x**\nVì $-4 < x \\leq 2$ nên $x \\in \\{-3; -2; -1; 0; 1; 2\\}$.\n\n**Bước 2: Tính tổng**\nTổng $= (-3) + (-2) + (-1) + 0 + 1 + 2$\n$= (-3) + [(-2) + 2] + [(-1) + 1] + 0$\n$= -3 + 0 + 0 + 0 = -3$.\n\n**Kết luận:** Tổng các số nguyên là $-3$.' }
  );

  // Bài 14. Phép cộng và phép trừ số nguyên
  allQS.push(
    { cat: id14, code: 'T6-Z-NEW6', content: 'Thực hiện phép tính: $(-15) + 25$ và $(-12) + (-8)$.', answer: '$10$ và $-20$.', solution: '- Phép cộng hai số nguyên khác dấu: Lấy số lớn trừ số bé, đặt dấu của số có phần tự nhiên lớn hơn trước kết quả.\n$(-15) + 25 = +(25 - 15) = 10$.\n- Phép cộng hai số nguyên cùng âm: Cộng hai phần tự nhiên rồi đặt dấu trừ trước kết quả.\n$(-12) + (-8) = -(12 + 8) = -20$.' },
    { cat: id14, code: 'T6-Z-NEW7', content: 'Thực hiện phép trừ: $10 - (-5)$ và $(-20) - 15$.', answer: '$15$ và $-35$.', solution: '- Phép trừ số nguyên $a - b = a + (-b)$.\n- $10 - (-5) = 10 + 5 = 15$.\n- $(-20) - 15 = (-20) + (-15) = -(20 + 15) = -35$.' },
    { cat: id14, code: 'T6-Z-NEW8', content: 'Một tàu ngầm đang ở độ sâu $40$m so với mực nước biển (biểu diễn là $-40$m). Tàu nổi lên $15$m. Độ cao mới của tàu so với mực nước biển là bao nhiêu?', answer: '$-25$m.', solution: 'Tàu đang ở vị trí $-40$m. Việc "nổi lên $15$m" tương ứng với phép cộng thêm $15$.\nĐộ cao mới của tàu là:\n$(-40) + 15 = -(40 - 15) = -25$ (m).\n\n**Kết luận:** Tàu đang ở độ cao $-25$m (tức là độ sâu $25$m dưới mực nước biển).' },
    { cat: id14, code: 'T6-Z-NEW9', content: 'Tính nhanh: $45 + (-12) + (-45) + 12$.', answer: '$0$.', solution: 'Áp dụng tính chất giao hoán và kết hợp để nhóm các cặp số đối nhau:\n$45 + (-12) + (-45) + 12$\n$= [45 + (-45)] + [(-12) + 12]$\n$= 0 + 0$\n$= 0$.' },
    { cat: id14, code: 'T6-Z-NEW10', content: 'Tìm số nguyên $x$, biết: $x - (-5) = -10$.', answer: '$x = -15$.', solution: 'Biến đổi phép trừ thành phép cộng:\n$x + 5 = -10$\nTa coi $x$ là một số hạng chưa biết. Muốn tìm số hạng chưa biết, ta lấy tổng trừ đi số hạng đã biết:\n$x = -10 - 5$\n$x = -15$.\n\n**Kết luận:** $x = -15$.' }
  );

  // Bài 15. Quy tắc dấu ngoặc
  allQS.push(
    { cat: id15, code: 'T6-Z-NEW11', content: 'Bỏ dấu ngoặc rồi tính: $(25 - 45) - (25 - 45 + 10)$.', answer: '$-10$.', solution: 'Áp dụng quy tắc bỏ dấu ngoặc (trước ngoặc có dấu trừ thì đổi dấu các số hạng bên trong):\n$(25 - 45) - (25 - 45 + 10)$\n$= 25 - 45 - 25 + 45 - 10$\nNhóm các số hạng đối nhau:\n$= (25 - 25) + (-45 + 45) - 10$\n$= 0 + 0 - 10 = -10$.' },
    { cat: id15, code: 'T6-Z-NEW12', content: 'Tính giá trị biểu thức: $-( -15 + 20 ) + ( 15 - 5 )$.', answer: '$5$.', solution: 'Có hai cách giải (tính trong ngoặc trước hoặc bỏ ngoặc). Ta dùng cách bỏ ngoặc:\n$-( -15 + 20 ) + ( 15 - 5 )$\n$= 15 - 20 + 15 - 5$\n$= (15 + 15) - (20 + 5)$\n$= 30 - 25 = 5$.' },
    { cat: id15, code: 'T6-Z-NEW13', content: 'Đơn giản biểu thức: $(a - b + c) - (a + b - c)$.', answer: '$-2b + 2c$.', solution: 'Áp dụng quy tắc bỏ dấu ngoặc:\n$(a - b + c) - (a + b - c)$\n$= a - b + c - a - b + c$\n$= (a - a) + (-b - b) + (c + c)$\n$= 0 - 2b + 2c$\n$= -2b + 2c$.' },
    { cat: id15, code: 'T6-Z-NEW14', content: 'Tính hợp lý: $125 - (125 - 86) + (-86)$.', answer: '$0$.', solution: 'Áp dụng quy tắc bỏ dấu ngoặc:\n$125 - (125 - 86) + (-86)$\n$= 125 - 125 + 86 - 86$\n$= (125 - 125) + (86 - 86)$\n$= 0 + 0 = 0$.' },
    { cat: id15, code: 'T6-Z-NEW15', content: 'Tìm $x$, biết: $-(x - 5) = 15$.', answer: '$x = -10$.', solution: 'Áp dụng quy tắc bỏ dấu ngoặc:\n$-x + 5 = 15$\nTìm $-x$ (coi là một số hạng):\n$-x = 15 - 5$\n$-x = 10$\nĐổi dấu cả hai vế:\n$x = -10$.\n\n*(Hoặc giải cách khác: $-(x - 5) = 15 \\Rightarrow x - 5 = -15 \\Rightarrow x = -15 + 5 = -10$).*' }
  );

  // Bài 16. Phép nhân số nguyên
  allQS.push(
    { cat: id16, code: 'T6-Z-NEW16', content: 'Thực hiện phép tính: $(-5) \\times 8$ và $(-12) \\times (-5)$.', answer: '$-40$ và $60$.', solution: '- Nhân hai số nguyên khác dấu (kết quả mang dấu âm):\n$(-5) \\times 8 = -(5 \\times 8) = -40$.\n- Nhân hai số nguyên cùng dấu (kết quả mang dấu dương):\n$(-12) \\times (-5) = +(12 \\times 5) = 60$.' },
    { cat: id16, code: 'T6-Z-NEW17', content: 'Tính nhanh: $(-25) \\times 13 \\times (-4)$.', answer: '$1300$.', solution: 'Áp dụng tính chất giao hoán và kết hợp để nhóm các thừa số tròn trăm:\n$(-25) \\times 13 \\times (-4)$\n$= [(-25) \\times (-4)] \\times 13$\n$= 100 \\times 13$\n$= 1300$.' },
    { cat: id16, code: 'T6-Z-NEW18', content: 'Tính giá trị của biểu thức: $(-2)^3 \\times 5$.', answer: '$-40$.', solution: '**Bước 1: Tính lũy thừa**\n$(-2)^3 = (-2) \\times (-2) \\times (-2) = -8$.\n\n**Bước 2: Thực hiện phép nhân**\n$(-8) \\times 5 = -40$.\n\n**Kết luận:** Giá trị biểu thức là $-40$.' },
    { cat: id16, code: 'T6-Z-NEW19', content: 'Một kho đông lạnh mỗi giờ nhiệt độ giảm $2^\\circ C$. Nếu ban đầu là $0^\\circ C$, hỏi sau $4$ giờ nhiệt độ là bao nhiêu? (Giải bằng phép nhân số nguyên).', answer: '$-8^\\circ C$.', solution: 'Nhiệt độ giảm $2^\\circ C$ mỗi giờ được biểu diễn bằng số nguyên là $-2$.\nSự thay đổi nhiệt độ sau $4$ giờ là:\n$(-2) \\times 4 = -8$ ($^\\circ C$).\nVì nhiệt độ ban đầu là $0^\\circ C$, nên nhiệt độ lúc sau là:\n$0 + (-8) = -8$ ($^\\circ C$).\n\n**Kết luận:** Nhiệt độ trong kho là $-8^\\circ C$.' },
    { cat: id16, code: 'T6-Z-NEW20', content: 'Tìm số nguyên $x$, biết: $3 \\times x = -27$.', answer: '$x = -9$.', solution: 'Trong phép nhân này, $x$ là một thừa số chưa biết. Ta lấy tích chia cho thừa số đã biết:\n$x = (-27) : 3$\nChia hai số nguyên khác dấu, kết quả mang dấu âm:\n$x = -9$.\n\n**Kết luận:** $x = -9$.' }
  );

  console.log(`Inserting ${allQS.length} new questions for Grade 6 (So Nguyen)...`);

  for (const q of allQS) {
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
