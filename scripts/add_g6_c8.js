const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const crypto = require('crypto');

async function main() {
  const id23 = '444b0570-e454-4530-82bf-973bf3440ec2'; // Bài 23
  const id24 = '8480acc9-bdbf-4600-9867-eba32069284c'; // Bài 24
  const id25 = 'c671d1eb-d0c6-4f6a-93af-fbc9988f2776'; // Bài 25
  const id26 = '47b9033c-f98b-4902-9b1e-54b6b094720f'; // Bài 26

  const grade = 6;
  const user_id = '8316c34e-765d-4b8c-9364-b683a17e33f8';
  let allQS = [];

  // Bài 23. Mở rộng phân số. Phân số bằng nhau
  allQS.push(
    { cat: id23, code: 'T6-F-NEW1', content: 'Viết các phân số sau: "Ba phần âm năm"; "Âm hai phần bảy". Điều kiện để phân số $\\dfrac{a}{b}$ tồn tại là gì?', answer: '$\\dfrac{3}{-5}$; $\\dfrac{-2}{7}$. Điều kiện $b \\neq 0$.', solution: '- Phân số "Ba phần âm năm" viết là: $\\dfrac{3}{-5}$.\n- Phân số "Âm hai phần bảy" viết là: $\\dfrac{-2}{7}$.\n- Điều kiện để phân số $\\dfrac{a}{b}$ (với $a, b \\in \\mathbb{Z}$) tồn tại là mẫu số phải khác $0$, tức là $b \\neq 0$.' },
    { cat: id23, code: 'T6-F-NEW2', content: 'Trong các cặp phân số sau, cặp nào bằng nhau: $\\dfrac{-3}{4}$ và $\\dfrac{6}{-8}$; $\\dfrac{2}{5}$ và $\\dfrac{-4}{10}$. Giải thích.', answer: 'Cả hai cặp đều không bằng nhau (Cặp 1 bằng nhau, cặp 2 không bằng).', solution: 'Hai phân số $\\dfrac{a}{b}$ và $\\dfrac{c}{d}$ bằng nhau nếu $a \\times d = b \\times c$.\n- Xét cặp $\\dfrac{-3}{4}$ và $\\dfrac{6}{-8}$: Ta có $(-3) \\times (-8) = 24$ và $4 \\times 6 = 24$. Hai tích chéo bằng nhau nên $\\dfrac{-3}{4} = \\dfrac{6}{-8}$.\n- Xét cặp $\\dfrac{2}{5}$ và $\\dfrac{-4}{10}$: Ta có $2 \\times 10 = 20$ và $5 \\times (-4) = -20$. Hai tích chéo không bằng nhau ($20 \\neq -20$) nên $\\dfrac{2}{5} \\neq \\dfrac{-4}{10}$.\n\n*(Lưu ý: Đáp án vắn tắt: Cặp 1 bằng nhau, cặp 2 không bằng).*' },
    { cat: id23, code: 'T6-F-NEW3', content: 'Tìm số nguyên $x$, biết: $\\dfrac{x}{15} = \\dfrac{-4}{5}$.', answer: '$x = -12$.', solution: 'Áp dụng tính chất phân số bằng nhau (tích chéo bằng nhau):\n$\\dfrac{x}{15} = \\dfrac{-4}{5}$\nSuy ra: $x \\times 5 = 15 \\times (-4)$\n$x \\times 5 = -60$\n$x = (-60) : 5$\n$x = -12$.' },
    { cat: id23, code: 'T6-F-NEW4', content: 'Rút gọn phân số $\\dfrac{-36}{84}$ về phân số tối giản.', answer: '$\\dfrac{-3}{7}$.', solution: 'Để rút gọn phân số, ta chia cả tử và mẫu cho Ước chung lớn nhất (ƯCLN) của chúng.\nTa có: ƯCLN$(36, 84) = 12$.\nChia cả tử và mẫu cho $12$:\n$\\dfrac{-36}{84} = \\dfrac{-36 : 12}{84 : 12} = \\dfrac{-3}{7}$.\nPhân số tối giản là $\\dfrac{-3}{7}$.' },
    { cat: id23, code: 'T6-F-NEW5', content: 'Biểu diễn số nguyên $-5$ dưới dạng phân số có mẫu số là $3$.', answer: '$\\dfrac{-15}{3}$.', solution: 'Mọi số nguyên $a$ đều có thể viết dưới dạng phân số là $\\dfrac{a}{1}$.\nDo đó: $-5 = \\dfrac{-5}{1}$.\nĐể mẫu số là $3$, ta nhân cả tử và mẫu với $3$:\n$\\dfrac{-5}{1} = \\dfrac{-5 \\times 3}{1 \\times 3} = \\dfrac{-15}{3}$.' }
  );

  // Bài 24. So sánh phân số. Hỗn số dương
  allQS.push(
    { cat: id24, code: 'T6-F-NEW6', content: 'So sánh hai phân số: $\\dfrac{-5}{8}$ và $\\dfrac{-7}{12}$.', answer: '$\\dfrac{-5}{8} < \\dfrac{-7}{12}$.', solution: '**Bước 1: Quy đồng mẫu số hai phân số**\nTìm Mẫu chung nhỏ nhất của $8$ và $12$ là $24$.\n- $\\dfrac{-5}{8} = \\dfrac{-5 \\times 3}{8 \\times 3} = \\dfrac{-15}{24}$.\n- $\\dfrac{-7}{12} = \\dfrac{-7 \\times 2}{12 \\times 2} = \\dfrac{-14}{24}$.\n\n**Bước 2: So sánh tử số**\nVì $-15 < -14$ nên $\\dfrac{-15}{24} < \\dfrac{-14}{24}$.\n\n**Kết luận:** $\\dfrac{-5}{8} < \\dfrac{-7}{12}$.' },
    { cat: id24, code: 'T6-F-NEW7', content: 'So sánh phân số $\\dfrac{-3}{4}$ với $0$ và $\\dfrac{2}{-5}$ với $0$.', answer: 'Cả hai phân số đều nhỏ hơn $0$.', solution: 'Một phân số nhỏ hơn $0$ (phân số âm) khi tử số và mẫu số khác dấu.\n- Phân số $\\dfrac{-3}{4}$ có tử là $-3$ (âm) và mẫu là $4$ (dương), khác dấu nên $\\dfrac{-3}{4} < 0$.\n- Phân số $\\dfrac{2}{-5}$ có tử là $2$ (dương) và mẫu là $-5$ (âm), khác dấu nên $\\dfrac{2}{-5} < 0$.' },
    { cat: id24, code: 'T6-F-NEW8', content: 'Viết hỗn số $3 \\dfrac{1}{4}$ dưới dạng phân số và viết phân số $\\dfrac{17}{5}$ dưới dạng hỗn số.', answer: '$\\dfrac{13}{4}$ và $3 \\dfrac{2}{5}$.', solution: '- Chuyển hỗn số $3 \\dfrac{1}{4}$ thành phân số:\n$3 \\dfrac{1}{4} = \\dfrac{3 \\times 4 + 1}{4} = \\dfrac{13}{4}$.\n- Chuyển phân số $\\dfrac{17}{5}$ thành hỗn số:\nLấy $17$ chia $5$ được $3$ dư $2$.\nPhần nguyên là $3$, phần phân số là $\\dfrac{2}{5}$. Ta được hỗn số $3 \\dfrac{2}{5}$.' },
    { cat: id24, code: 'T6-F-NEW9', content: 'Sắp xếp các phân số sau theo thứ tự tăng dần: $\\dfrac{1}{2}; \\dfrac{-2}{3}; \\dfrac{5}{6}; \\dfrac{-3}{4}$.', answer: '$\\dfrac{-3}{4} < \\dfrac{-2}{3} < \\dfrac{1}{2} < \\dfrac{5}{6}$.', solution: '**Bước 1: Tách nhóm**\n- Phân số âm: $\\dfrac{-2}{3}$ và $\\dfrac{-3}{4}$.\n- Phân số dương: $\\dfrac{1}{2}$ và $\\dfrac{5}{6}$.\n\n**Bước 2: So sánh trong từng nhóm**\n- Nhóm âm: Quy đồng mẫu $12$. $\\dfrac{-2}{3} = \\dfrac{-8}{12}$; $\\dfrac{-3}{4} = \\dfrac{-9}{12}$. Vì $-9 < -8$ nên $\\dfrac{-3}{4} < \\dfrac{-2}{3}$.\n- Nhóm dương: Quy đồng mẫu $6$. $\\dfrac{1}{2} = \\dfrac{3}{6}$. Vì $3 < 5$ nên $\\dfrac{1}{2} < \\dfrac{5}{6}$.\n\n**Bước 3: Kết luận thứ tự**\n$\\dfrac{-3}{4} < \\dfrac{-2}{3} < \\dfrac{1}{2} < \\dfrac{5}{6}$.' },
    { cat: id24, code: 'T6-F-NEW10', content: 'Tìm số nguyên $x$ sao cho $\\dfrac{-1}{3} < \\dfrac{x}{12} < \\dfrac{1}{4}$.', answer: '$x \\in \\{-3; -2; -1; 0; 1; 2\\}$.', solution: '**Bước 1: Quy đồng mẫu số chung là $12$**\n- $\\dfrac{-1}{3} = \\dfrac{-4}{12}$.\n- $\\dfrac{1}{4} = \\dfrac{3}{12}$.\n\n**Bước 2: Viết lại bất đẳng thức**\nTa có: $\\dfrac{-4}{12} < \\dfrac{x}{12} < \\dfrac{3}{12}$.\nSuy ra: $-4 < x < 3$.\nVì $x$ là số nguyên nên $x \\in \\{-3; -2; -1; 0; 1; 2\\}$.' }
  );

  // Bài 25. Phép cộng và phép trừ phân số
  allQS.push(
    { cat: id25, code: 'T6-F-NEW11', content: 'Thực hiện phép tính: $\\dfrac{-3}{8} + \\dfrac{5}{12}$.', answer: '$\\dfrac{1}{24}$.', solution: '**Bước 1: Quy đồng mẫu số chung là $24$**\n- $\\dfrac{-3}{8} = \\dfrac{-3 \\times 3}{8 \\times 3} = \\dfrac{-9}{24}$.\n- $\\dfrac{5}{12} = \\dfrac{5 \\times 2}{12 \\times 2} = \\dfrac{10}{24}$.\n\n**Bước 2: Thực hiện phép cộng**\n$\\dfrac{-9}{24} + \\dfrac{10}{24} = \\dfrac{-9 + 10}{24} = \\dfrac{1}{24}$.' },
    { cat: id25, code: 'T6-F-NEW12', content: 'Thực hiện phép trừ: $\\dfrac{4}{9} - \\dfrac{7}{6}$.', answer: '$\\dfrac{-13}{18}$.', solution: '**Bước 1: Quy đồng mẫu số chung là $18$**\n- $\\dfrac{4}{9} = \\dfrac{8}{18}$.\n- $\\dfrac{7}{6} = \\dfrac{21}{18}$.\n\n**Bước 2: Thực hiện phép trừ**\n$\\dfrac{8}{18} - \\dfrac{21}{18} = \\dfrac{8 - 21}{18} = \\dfrac{-13}{18}$.' },
    { cat: id25, code: 'T6-F-NEW13', content: 'Tính hợp lý: $\\left( \\dfrac{-3}{7} + \\dfrac{5}{11} \\right) + \\dfrac{-4}{7}$.', answer: '$\\dfrac{5}{11} - 1 = \\dfrac{-6}{11}$.', solution: 'Áp dụng tính chất giao hoán và kết hợp của phép cộng phân số để nhóm các phân số cùng mẫu:\n$\\left( \\dfrac{-3}{7} + \\dfrac{5}{11} \\right) + \\dfrac{-4}{7}$\n$= \\left( \\dfrac{-3}{7} + \\dfrac{-4}{7} \\right) + \\dfrac{5}{11}$\n$= \\dfrac{-7}{7} + \\dfrac{5}{11}$\n$= -1 + \\dfrac{5}{11} = \\dfrac{-11}{11} + \\dfrac{5}{11} = \\dfrac{-6}{11}$.' },
    { cat: id25, code: 'T6-F-NEW14', content: 'Tìm $x$, biết: $x - \\dfrac{1}{4} = \\dfrac{-5}{8}$.', answer: '$x = \\dfrac{-3}{8}$.', solution: 'Trong phép trừ này, $x$ là số bị trừ. Ta lấy hiệu cộng với số trừ:\n$x = \\dfrac{-5}{8} + \\dfrac{1}{4}$\nQuy đồng mẫu $8$:\n$x = \\dfrac{-5}{8} + \\dfrac{2}{8}$\n$x = \\dfrac{-3}{8}$.' },
    { cat: id25, code: 'T6-F-NEW15', content: 'Một vòi nước chảy vào bể. Giờ thứ nhất chảy được $\\dfrac{1}{3}$ bể, giờ thứ hai chảy được $\\dfrac{1}{4}$ bể. Hỏi cả hai giờ vòi nước chảy được bao nhiêu phần bể?', answer: '$\\dfrac{7}{12}$ bể.', solution: 'Ta thực hiện phép cộng số phần bể nước chảy được trong hai giờ:\n$\\dfrac{1}{3} + \\dfrac{1}{4}$\nQuy đồng mẫu số chung là $12$:\n$= \\dfrac{4}{12} + \\dfrac{3}{12} = \\dfrac{7}{12}$ (bể).\n\n**Kết luận:** Cả hai giờ vòi chảy được $\\dfrac{7}{12}$ bể.' }
  );

  // Bài 26. Phép nhân và phép chia phân số
  allQS.push(
    { cat: id26, code: 'T6-F-NEW16', content: 'Thực hiện phép tính: $\\dfrac{-5}{9} \\times \\dfrac{12}{25}$.', answer: '$\\dfrac{-4}{15}$.', solution: 'Ta nhân tử với tử, mẫu với mẫu và rút gọn chéo trước khi tính để đơn giản hóa:\n$\\dfrac{-5}{9} \\times \\dfrac{12}{25} = \\dfrac{-5 \\times 12}{9 \\times 25}$\nRút gọn: $-5$ và $25$ cùng chia cho $5$ (còn $-1$ và $5$). $12$ và $9$ cùng chia cho $3$ (còn $4$ và $3$).\n$= \\dfrac{-1 \\times 4}{3 \\times 5} = \\dfrac{-4}{15}$.' },
    { cat: id26, code: 'T6-F-NEW17', content: 'Tính: $\\dfrac{-7}{15} : \\dfrac{14}{-5}$.', answer: '$\\dfrac{1}{6}$.', solution: 'Chia cho một phân số bằng nhân với phân số đảo ngược:\n$\\dfrac{-7}{15} : \\dfrac{14}{-5} = \\dfrac{-7}{15} \\times \\dfrac{-5}{14}$\n$= \\dfrac{(-7) \\times (-5)}{15 \\times 14}$\nRút gọn chéo: $-7$ và $14$ chia cho $7$ (còn $-1$ và $2$). $-5$ và $15$ chia cho $5$ (còn $-1$ và $3$).\n$= \\dfrac{(-1) \\times (-1)}{3 \\times 2} = \\dfrac{1}{6}$.' },
    { cat: id26, code: 'T6-F-NEW18', content: 'Tính hợp lý: $\\dfrac{3}{5} \\times \\dfrac{4}{7} + \\dfrac{3}{5} \\times \\dfrac{3}{7}$.', answer: '$\\dfrac{3}{5}$.', solution: 'Áp dụng tính chất phân phối của phép nhân đối với phép cộng (rút thừa số chung):\n$\\dfrac{3}{5} \\times \\dfrac{4}{7} + \\dfrac{3}{5} \\times \\dfrac{3}{7}$\n$= \\dfrac{3}{5} \\times \\left( \\dfrac{4}{7} + \\dfrac{3}{7} \\right)$\n$= \\dfrac{3}{5} \\times \\dfrac{7}{7}$\n$= \\dfrac{3}{5} \\times 1 = \\dfrac{3}{5}$.' },
    { cat: id26, code: 'T6-F-NEW19', content: 'Tìm $x$, biết: $x \\times \\dfrac{-2}{3} = \\dfrac{4}{9}$.', answer: '$x = \\dfrac{-2}{3}$.', solution: 'Ta coi $x$ là thừa số chưa biết. Ta lấy tích chia cho thừa số đã biết:\n$x = \\dfrac{4}{9} : \\dfrac{-2}{3}$\n$x = \\dfrac{4}{9} \\times \\dfrac{3}{-2}$\n$x = \\dfrac{4 \\times 3}{9 \\times (-2)}$\nRút gọn chéo:\n$x = \\dfrac{2 \\times 1}{3 \\times (-1)} = \\dfrac{2}{-3} = \\dfrac{-2}{3}$.' },
    { cat: id26, code: 'T6-F-NEW20', content: 'Một tấm bìa hình chữ nhật có diện tích là $\\dfrac{4}{5} \\text{ m}^2$, chiều rộng là $\\dfrac{2}{3}$ m. Tính chiều dài của tấm bìa đó.', answer: '$\\dfrac{6}{5}$ m.', solution: 'Chiều dài tấm bìa bằng diện tích chia cho chiều rộng:\n$\\dfrac{4}{5} : \\dfrac{2}{3} = \\dfrac{4}{5} \\times \\dfrac{3}{2}$\n$= \\dfrac{12}{10}$\nRút gọn phân số (chia cho $2$):\n$= \\dfrac{6}{5}$ (m).\n\n**Kết luận:** Chiều dài tấm bìa là $\\dfrac{6}{5}$ m.' }
  );

  console.log(`Inserting ${allQS.length} new questions for Grade 6 (Phan So)...`);

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
