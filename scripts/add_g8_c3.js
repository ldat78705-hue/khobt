const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const crypto = require('crypto');

async function main() {
  const id22 = 'e8623ea1-37ef-42c0-b688-59d745a29994'; // Bài 22. Tính chất cơ bản
  const id23 = '4a63ce27-01de-4f2a-ae68-03882cde1043'; // Bài 23. Phép cộng và trừ
  const id24 = '9193d24c-c98d-4af1-90d2-2ab3874c3954'; // Bài 24. Phép nhân và chia

  const grade = 8;
  const user_id = '8316c34e-765d-4b8c-9364-b683a17e33f8';
  let allQS = [];

  // Bài 22. Tính chất cơ bản của phân thức đại số
  allQS.push(
    { cat: id22, code: 'T8-PT-NEW1', content: 'Rút gọn phân thức đại số sau: $\\dfrac{5x^2y}{10xy^2}$.', answer: '$\\dfrac{x}{2y}$.', solution: 'Chia cả tử và mẫu cho nhân tử chung lớn nhất là $5xy$:\n$\\dfrac{5x^2y}{10xy^2} = \\dfrac{5xy \\cdot x}{5xy \\cdot 2y} = \\dfrac{x}{2y}$.' },
    { cat: id22, code: 'T8-PT-NEW2', content: 'Rút gọn phân thức: $\\dfrac{x^2 - 4x}{x^2 - 16}$.', answer: '$\\dfrac{x}{x + 4}$.', solution: 'Phân tích tử và mẫu thành nhân tử:\n- Tử số: $x^2 - 4x = x(x - 4)$.\n- Mẫu số: $x^2 - 16 = x^2 - 4^2 = (x - 4)(x + 4)$.\nBiểu thức trở thành:\n$\\dfrac{x(x - 4)}{(x - 4)(x + 4)}$.\nChia cả tử và mẫu cho nhân tử chung $(x - 4)$:\nKết quả: $\\dfrac{x}{x + 4}$.' },
    { cat: id22, code: 'T8-PT-NEW3', content: 'Rút gọn phân thức: $\\dfrac{x^2 + 2x + 1}{x^2 - 1}$.', answer: '$\\dfrac{x + 1}{x - 1}$.', solution: 'Sử dụng hằng đẳng thức để phân tích:\n- Tử số: $x^2 + 2x + 1 = (x + 1)^2$.\n- Mẫu số: $x^2 - 1 = (x - 1)(x + 1)$.\nTa có:\n$\\dfrac{(x + 1)^2}{(x - 1)(x + 1)} = \\dfrac{x + 1}{x - 1}$.' },
    { cat: id22, code: 'T8-PT-NEW4', content: 'Rút gọn phân thức: $\\dfrac{x^3 - 8}{x^2 - 4}$.', answer: '$\\dfrac{x^2 + 2x + 4}{x + 2}$.', solution: 'Áp dụng hằng đẳng thức hiệu hai lập phương và hiệu hai bình phương:\n- Tử số: $x^3 - 8 = x^3 - 2^3 = (x - 2)(x^2 + 2x + 4)$.\n- Mẫu số: $x^2 - 4 = (x - 2)(x + 2)$.\nTriệt tiêu nhân tử chung $(x - 2)$:\n$\\dfrac{(x - 2)(x^2 + 2x + 4)}{(x - 2)(x + 2)} = \\dfrac{x^2 + 2x + 4}{x + 2}$.' },
    { cat: id22, code: 'T8-PT-NEW5', content: 'Tìm điều kiện xác định của phân thức: $\\dfrac{x+3}{x^2 - 9}$.', answer: '$x \\neq 3$ và $x \\neq -3$.', solution: 'Phân thức xác định khi mẫu số khác $0$:\n$x^2 - 9 \\neq 0$\n$(x - 3)(x + 3) \\neq 0$\nSuy ra: $x - 3 \\neq 0$ và $x + 3 \\neq 0$\n$x \\neq 3$ và $x \\neq -3$.\nVậy điều kiện xác định là $x \\neq 3$ và $x \\neq -3$.' },
    { cat: id22, code: 'T8-PT-NEW6', content: 'Rút gọn phân thức: $\\dfrac{2x^2 + 4x}{x^3 + 8}$.', answer: '$\\dfrac{2x}{x^2 - 2x + 4}$.', solution: 'Phân tích tử và mẫu:\n- Tử: $2x^2 + 4x = 2x(x + 2)$.\n- Mẫu: $x^3 + 8 = x^3 + 2^3 = (x + 2)(x^2 - 2x + 4)$.\nRút gọn cho nhân tử $(x + 2)$:\n$\\dfrac{2x(x + 2)}{(x + 2)(x^2 - 2x + 4)} = \\dfrac{2x}{x^2 - 2x + 4}$.' }
  );

  // Bài 23. Phép cộng và trừ
  allQS.push(
    { cat: id23, code: 'T8-PT-NEW7', content: 'Thực hiện phép tính: $\\dfrac{2x}{x+1} + \\dfrac{2}{x+1}$.', answer: '$2$.', solution: 'Hai phân thức cùng mẫu, ta cộng tử với tử, giữ nguyên mẫu:\n$\\dfrac{2x + 2}{x+1}$\nPhân tích tử thành nhân tử:\n$\\dfrac{2(x + 1)}{x+1}$\nRút gọn nhân tử $(x + 1)$:\nKết quả bằng $2$.' },
    { cat: id23, code: 'T8-PT-NEW8', content: 'Thực hiện phép tính: $\\dfrac{3}{x-2} - \\dfrac{2}{x+2}$.', answer: '$\\dfrac{x + 10}{x^2 - 4}$.', solution: 'Quy đồng mẫu số chung là $(x-2)(x+2) = x^2 - 4$:\n$= \\dfrac{3(x+2)}{(x-2)(x+2)} - \\dfrac{2(x-2)}{(x-2)(x+2)}$\n$= \\dfrac{3x + 6 - (2x - 4)}{x^2 - 4}$\n$= \\dfrac{3x + 6 - 2x + 4}{x^2 - 4} = \\dfrac{x + 10}{x^2 - 4}$.' },
    { cat: id23, code: 'T8-PT-NEW9', content: 'Rút gọn biểu thức: $\\dfrac{x}{x^2 - y^2} - \\dfrac{y}{x^2 - y^2}$.', answer: '$\\dfrac{1}{x + y}$.', solution: 'Cùng mẫu số, ta trừ hai tử số cho nhau:\n$\\dfrac{x - y}{x^2 - y^2}$\nPhân tích mẫu số theo hằng đẳng thức:\n$\\dfrac{x - y}{(x - y)(x + y)}$\nRút gọn $(x - y)$:\nKết quả là $\\dfrac{1}{x + y}$.' },
    { cat: id23, code: 'T8-PT-NEW10', content: 'Tính giá trị biểu thức sau khi rút gọn: $A = \\dfrac{x^2}{x-1} - \\dfrac{1}{x-1}$ tại $x = 5$.', answer: '$A = 6$.', solution: '**Bước 1: Rút gọn biểu thức**\n$A = \\dfrac{x^2 - 1}{x - 1} = \\dfrac{(x - 1)(x + 1)}{x - 1} = x + 1$.\n**Bước 2: Tính giá trị**\nThay $x = 5$ vào biểu thức rút gọn:\n$A = 5 + 1 = 6$.' },
    { cat: id23, code: 'T8-PT-NEW11', content: 'Thực hiện phép trừ: $\\dfrac{1}{x} - \\dfrac{1}{x+1}$.', answer: '$\\dfrac{1}{x(x+1)}$.', solution: 'Quy đồng mẫu thức chung là $x(x+1)$:\n$= \\dfrac{1 \\cdot (x+1)}{x(x+1)} - \\dfrac{1 \\cdot x}{x(x+1)}$\n$= \\dfrac{x + 1 - x}{x(x+1)} = \\dfrac{1}{x(x+1)}$.' },
    { cat: id23, code: 'T8-PT-NEW12', content: 'Rút gọn: $\\dfrac{x+1}{2x-2} + \\dfrac{-2x}{x^2-1}$.', answer: '$\\dfrac{x-1}{2(x+1)}$.', solution: 'Ta phân tích các mẫu số:\n$2x - 2 = 2(x - 1)$\n$x^2 - 1 = (x - 1)(x + 1)$\nMẫu chung: $2(x - 1)(x + 1)$.\nBiểu thức:\n$= \\dfrac{(x+1)(x+1)}{2(x-1)(x+1)} + \\dfrac{-2x \\cdot 2}{2(x-1)(x+1)}$\n$= \\dfrac{x^2 + 2x + 1 - 4x}{2(x-1)(x+1)}$\n$= \\dfrac{x^2 - 2x + 1}{2(x-1)(x+1)} = \\dfrac{(x-1)^2}{2(x-1)(x+1)} = \\dfrac{x-1}{2(x+1)}$.' }
  );

  // Bài 24. Phép nhân và phép chia
  allQS.push(
    { cat: id24, code: 'T8-PT-NEW13', content: 'Thực hiện phép nhân: $\\dfrac{x^2 - 1}{x^2 + x} \\times \\dfrac{2x}{x - 1}$.', answer: '$2$.', solution: 'Phân tích các đa thức thành nhân tử:\n$\\dfrac{(x - 1)(x + 1)}{x(x + 1)} \\times \\dfrac{2x}{x - 1}$\nNhân tử với tử, mẫu với mẫu:\n$= \\dfrac{(x - 1)(x + 1) \\cdot 2x}{x(x + 1)(x - 1)}$\nRút gọn các nhân tử chung $(x - 1), (x + 1), x$:\nKết quả bằng $2$.' },
    { cat: id24, code: 'T8-PT-NEW14', content: 'Thực hiện phép chia: $\\dfrac{x+2}{x-3} : \\dfrac{x^2 + 4x + 4}{x^2 - 9}$.', answer: '$\\dfrac{x + 3}{x + 2}$.', solution: 'Chia phân thức bằng nhân nghịch đảo:\n$\\dfrac{x+2}{x-3} \\times \\dfrac{x^2 - 9}{x^2 + 4x + 4}$\nPhân tích thành nhân tử:\n$= \\dfrac{x+2}{x-3} \\times \\dfrac{(x-3)(x+3)}{(x+2)^2}$\nRút gọn nhân tử chung $(x-3)$ và $(x+2)$:\n$= \\dfrac{x+3}{x+2}$.' },
    { cat: id24, code: 'T8-PT-NEW15', content: 'Rút gọn biểu thức: $\\left( \\dfrac{x}{x+1} \\times \\dfrac{x+1}{x-1} \\right) : \\dfrac{x^2}{x^2 - 1}$.', answer: '$\\dfrac{x+1}{x}$.', solution: '**Bước 1: Tính trong ngoặc trước**\n$\\dfrac{x}{x+1} \\times \\dfrac{x+1}{x-1} = \\dfrac{x}{x-1}$.\n**Bước 2: Thực hiện phép chia**\n$\\dfrac{x}{x-1} : \\dfrac{x^2}{(x-1)(x+1)} = \\dfrac{x}{x-1} \\times \\dfrac{(x-1)(x+1)}{x^2}$\nRút gọn $x$ và $(x-1)$:\n$= \\dfrac{x+1}{x}$.' },
    { cat: id24, code: 'T8-PT-NEW16', content: 'Một ô tô đi quãng đường $120$ km với vận tốc $x$ km/h. Viết biểu thức thời gian ô tô đi. Nếu vận tốc tăng thêm $10$ km/h, thời gian đi sẽ là bao nhiêu?', answer: 'Thời gian ban đầu: $\\dfrac{120}{x}$ (giờ). Thời gian lúc sau: $\\dfrac{120}{x+10}$ (giờ).', solution: '- Vận tốc ban đầu là $x$, quãng đường $120$ km. Thời gian đi là: $\\dfrac{120}{x}$ (giờ).\n- Vận tốc sau khi tăng là $x + 10$ (km/h).\n- Thời gian đi với vận tốc mới là: $\\dfrac{120}{x + 10}$ (giờ).' },
    { cat: id24, code: 'T8-PT-NEW17', content: 'Rút gọn biểu thức: $\\dfrac{x^3 + 1}{x^2 - x + 1} \\times \\dfrac{x - 1}{x^2 - 1}$.', answer: '$1$.', solution: 'Phân tích các biểu thức bằng hằng đẳng thức:\n- $x^3 + 1 = (x + 1)(x^2 - x + 1)$.\n- $x^2 - 1 = (x - 1)(x + 1)$.\nTa có:\n$\\dfrac{(x + 1)(x^2 - x + 1)}{x^2 - x + 1} \\times \\dfrac{x - 1}{(x - 1)(x + 1)}$\nRút gọn các phân thức:\n$= (x + 1) \\times \\dfrac{1}{x + 1} = 1$.' },
    { cat: id24, code: 'T8-PT-NEW18', content: 'Tính giá trị biểu thức: $B = \\dfrac{x^2 - 25}{x^2 + 5x} \\times \\dfrac{3x}{x - 5}$ tại $x = 100$.', answer: '$3$.', solution: '**Bước 1: Rút gọn biểu thức**\n$B = \\dfrac{(x-5)(x+5)}{x(x+5)} \\times \\dfrac{3x}{x-5}$\nTriệt tiêu $(x-5)$, $(x+5)$, và $x$:\n$B = \\dfrac{1}{1} \\times 3 = 3$.\n**Bước 2: Tính giá trị**\nBiểu thức có giá trị không đổi bằng $3$ với mọi $x$ thỏa mãn điều kiện xác định ($x \\neq 0, 5, -5$).\nVậy tại $x = 100$, $B = 3$.' }
  );

  console.log(`Inserting ${allQS.length} new questions for Grade 8 (Phan thuc dai so)...`);

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
