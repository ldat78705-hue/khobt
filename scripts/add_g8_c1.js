const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const crypto = require('crypto');

async function main() {
  const cats = await sql`
    SELECT id, name FROM public.categories 
    WHERE grade = 8 AND parent_id IS NOT NULL 
    AND (name ILIKE '%Đơn thức%' OR name ILIKE '%Đa thức%' OR name ILIKE '%Phép cộng và phép trừ đa thức%' OR name ILIKE '%Phép nhân đa thức%' OR name ILIKE '%Phép chia đa thức%')
    LIMIT 5
  `;
  
  const id1 = cats.find(c => c.name.includes('Đơn thức') && !c.name.includes('chia'))?.id;
  const id2 = cats.find(c => c.name.includes('Bài 2. Đa thức'))?.id;
  const id3 = cats.find(c => c.name.includes('cộng và phép trừ'))?.id;
  const id4 = cats.find(c => c.name.includes('Phép nhân'))?.id;
  const id5 = cats.find(c => c.name.includes('chia'))?.id;

  const grade = 8;
  const user_id = '8316c34e-765d-4b8c-9364-b683a17e33f8';
  let allQS = [];

  // If we can't find specific IDs, we'll just skip adding to them or use the first one as fallback.
  const fallbackId = cats[0]?.id;

  // Bài 1. Đơn thức
  allQS.push(
    { cat: id1 || fallbackId, code: 'T8-P1-NEW1', content: 'Trong các biểu thức đại số sau, biểu thức nào là đơn thức: $3x^2y; \\dfrac{x+y}{2}; -5; x\\sqrt{y}; \\dfrac{2}{3}xy^3z$.', answer: '$3x^2y; -5; \\dfrac{2}{3}xy^3z$.', solution: 'Đơn thức là biểu thức đại số chỉ gồm một số, hoặc một biến, hoặc một tích giữa các số và các biến.\n- $3x^2y$ là đơn thức.\n- $\\dfrac{x+y}{2}$ có chứa phép cộng nên không phải đơn thức.\n- $-5$ là đơn thức (một số).\n- $x\\sqrt{y}$ có chứa căn bậc hai của biến nên không phải đơn thức.\n- $\\dfrac{2}{3}xy^3z$ là đơn thức.' },
    { cat: id1 || fallbackId, code: 'T8-P1-NEW2', content: 'Thu gọn đơn thức sau và chỉ ra phần hệ số, phần biến, bậc của đơn thức: $A = \\left(-\\dfrac{1}{3}x^2y\\right) \\times (6xy^3)$.', answer: '$A = -2x^3y^4$. Hệ số: $-2$. Bậc: $7$.', solution: '**Bước 1: Thu gọn đơn thức**\n$A = \\left(-\\dfrac{1}{3} \\times 6\\right) \\times (x^2 \\cdot x) \\times (y \\cdot y^3)$\n$A = -2x^3y^4$\n\n**Bước 2: Xác định các thành phần**\n- Hệ số: $-2$\n- Phần biến: $x^3y^4$\n- Bậc của đơn thức: Tổng số mũ của các biến là $3 + 4 = 7$.' },
    { cat: id1 || fallbackId, code: 'T8-P1-NEW3', content: 'Tính giá trị của đơn thức $M = 5x^2y^3$ tại $x = -1, y = 2$.', answer: '$M = 40$.', solution: 'Thay $x = -1$ và $y = 2$ vào đơn thức $M$:\n$M = 5 \\times (-1)^2 \\times 2^3$\n$M = 5 \\times 1 \\times 8$\n$M = 40$.\nVậy giá trị của đơn thức tại $x = -1, y = 2$ là $40$.' },
    { cat: id1 || fallbackId, code: 'T8-P1-NEW4', content: 'Thực hiện phép nhân hai đơn thức: $B = (2x^2y^3z) \\times \\left(\\dfrac{-3}{4}xy^2\\right)$.', answer: '$B = \\dfrac{-3}{2}x^3y^5z$.', solution: 'Nhân hệ số với hệ số, phần biến với phần biến:\n$B = \\left(2 \\times \\dfrac{-3}{4}\\right) \\times (x^2 \\cdot x) \\times (y^3 \\cdot y^2) \\times z$\n$B = \\dfrac{-6}{4} x^3y^5z = \\dfrac{-3}{2}x^3y^5z$.' },
    { cat: id1 || fallbackId, code: 'T8-P1-NEW5', content: 'Cho hai đơn thức đồng dạng: $3x^2y$ và $-5x^2y$. Hãy tính tổng và hiệu của hai đơn thức này.', answer: 'Tổng: $-2x^2y$. Hiệu: $8x^2y$.', solution: '- Tổng: $3x^2y + (-5x^2y) = (3 - 5)x^2y = -2x^2y$.\n- Hiệu: $3x^2y - (-5x^2y) = 3x^2y + 5x^2y = (3 + 5)x^2y = 8x^2y$.' }
  );

  // Bài 2. Đa thức
  allQS.push(
    { cat: id2 || fallbackId, code: 'T8-P2-NEW1', content: 'Thu gọn đa thức sau và tìm bậc của nó: $P = 3x^2y - 5xy^2 + 2x^2y - 4 + 5xy^2$.', answer: '$P = 5x^2y - 4$. Bậc là 3.', solution: '**Bước 1: Thu gọn đa thức**\nNhóm các hạng tử đồng dạng:\n$P = (3x^2y + 2x^2y) + (-5xy^2 + 5xy^2) - 4$\n$P = 5x^2y + 0 - 4 = 5x^2y - 4$\n\n**Bước 2: Tìm bậc**\n- Hạng tử $5x^2y$ có bậc là $2 + 1 = 3$.\n- Hạng tử $-4$ có bậc là $0$.\nBậc cao nhất là $3$, vậy đa thức có bậc là $3$.' },
    { cat: id2 || fallbackId, code: 'T8-P2-NEW2', content: 'Tính giá trị của đa thức $Q = x^3 - 3x^2y + 3xy^2 - y^3$ tại $x = 2, y = -1$.', answer: '$Q = 27$.', solution: 'Thay $x = 2$ và $y = -1$ vào đa thức $Q$:\n$Q = 2^3 - 3 \\times 2^2 \\times (-1) + 3 \\times 2 \\times (-1)^2 - (-1)^3$\n$Q = 8 - 3 \\times 4 \\times (-1) + 3 \\times 2 \\times 1 - (-1)$\n$Q = 8 + 12 + 6 + 1 = 27$.\n\n*(Mở rộng: Học sinh khá có thể nhận ra Hằng đẳng thức $(x-y)^3$, khi đó $(2 - (-1))^3 = 3^3 = 27$).*' },
    { cat: id2 || fallbackId, code: 'T8-P2-NEW3', content: 'Viết một đa thức bậc $4$ có $3$ biến $x, y, z$ và có $4$ hạng tử.', answer: 'Ví dụ: $x^2y^2 + 3xyz - x^3z + 5$.', solution: 'Có rất nhiều cách viết. Đa thức cần thỏa mãn 3 điều kiện:\n- Có $3$ biến $x, y, z$.\n- Có $4$ hạng tử.\n- Bậc cao nhất của các hạng tử là $4$.\nVí dụ: $A = 2x^2y^2 - 5xyz + z^3 - 10$. (Hạng tử $2x^2y^2$ có bậc $4$, các hạng tử khác có bậc nhỏ hơn hoặc bằng $4$).' },
    { cat: id2 || fallbackId, code: 'T8-P2-NEW4', content: 'Cho đa thức $M = x^2y + xy^2 - xy$. Hãy chứng minh rằng giá trị của đa thức $M$ bằng $0$ khi $x = 0$ hoặc $y = 0$.', answer: 'Xem lời giải.', solution: '- Nếu $x = 0$: $M = 0^2 \\cdot y + 0 \\cdot y^2 - 0 \\cdot y = 0$.\n- Nếu $y = 0$: $M = x^2 \\cdot 0 + x \\cdot 0^2 - x \\cdot 0 = 0$.\nVậy đa thức $M$ luôn có giá trị bằng $0$ khi một trong hai biến bằng $0$.' },
    { cat: id2 || fallbackId, code: 'T8-P2-NEW5', content: 'Thu gọn đa thức $N = \\dfrac{1}{2}x^3 + 2xy - x^3 - \\dfrac{1}{2}xy + 5$.', answer: '$N = -\\dfrac{1}{2}x^3 + \\dfrac{3}{2}xy + 5$.', solution: 'Nhóm các đơn thức đồng dạng:\n$N = \\left(\\dfrac{1}{2}x^3 - x^3\\right) + \\left(2xy - \\dfrac{1}{2}xy\\right) + 5$\n$N = -\\dfrac{1}{2}x^3 + \\left(\\dfrac{4}{2}xy - \\dfrac{1}{2}xy\\right) + 5$\n$N = -\\dfrac{1}{2}x^3 + \\dfrac{3}{2}xy + 5$.' }
  );

  // Bài 3. Phép cộng và trừ đa thức
  allQS.push(
    { cat: id3 || fallbackId, code: 'T8-P3-NEW1', content: 'Cho hai đa thức $A = 2x^2 - 3xy + y^2$ và $B = x^2 + 3xy - 2y^2$. Tính $A + B$.', answer: '$A + B = 3x^2 - y^2$.', solution: '$A + B = (2x^2 - 3xy + y^2) + (x^2 + 3xy - 2y^2)$\n$= 2x^2 - 3xy + y^2 + x^2 + 3xy - 2y^2$\nNhóm hạng tử đồng dạng:\n$= (2x^2 + x^2) + (-3xy + 3xy) + (y^2 - 2y^2)$\n$= 3x^2 + 0 - y^2 = 3x^2 - y^2$.' },
    { cat: id3 || fallbackId, code: 'T8-P3-NEW2', content: 'Cho đa thức $M = 5x^3 - x^2y + 2xy^2$ và $N = 2x^3 - 3x^2y - xy^2$. Tính $M - N$.', answer: '$M - N = 3x^3 + 2x^2y + 3xy^2$.', solution: '$M - N = (5x^3 - x^2y + 2xy^2) - (2x^3 - 3x^2y - xy^2)$\nBỏ ngoặc, đổi dấu đa thức $N$:\n$= 5x^3 - x^2y + 2xy^2 - 2x^3 + 3x^2y + xy^2$\nNhóm hạng tử:\n$= (5x^3 - 2x^3) + (-x^2y + 3x^2y) + (2xy^2 + xy^2)$\n$= 3x^3 + 2x^2y + 3xy^2$.' },
    { cat: id3 || fallbackId, code: 'T8-P3-NEW3', content: 'Tìm đa thức $P$ biết: $P + (x^2 - 2y^2) = x^2 - y^2 + 3y$.', answer: '$P = y^2 + 3y$.', solution: 'Sử dụng quy tắc chuyển vế:\n$P = (x^2 - y^2 + 3y) - (x^2 - 2y^2)$\n$P = x^2 - y^2 + 3y - x^2 + 2y^2$\n$P = (x^2 - x^2) + (-y^2 + 2y^2) + 3y$\n$P = 0 + y^2 + 3y = y^2 + 3y$.' },
    { cat: id3 || fallbackId, code: 'T8-P3-NEW4', content: 'Cho tam giác có độ dài ba cạnh lần lượt là $x+y$, $2x-y$ và $x+2y$. Viết biểu thức đại số biểu thị chu vi tam giác đó và thu gọn.', answer: 'Chu vi $= 4x + 2y$.', solution: 'Chu vi tam giác bằng tổng độ dài ba cạnh:\n$C = (x+y) + (2x-y) + (x+2y)$\n$C = x + y + 2x - y + x + 2y$\nNhóm hạng tử:\n$C = (x + 2x + x) + (y - y + 2y)$\n$C = 4x + 2y$.' },
    { cat: id3 || fallbackId, code: 'T8-P3-NEW5', content: 'Chứng minh rằng tổng của hai đa thức $A = 3x^2 - 2xy + y^2$ và $B = -3x^2 + 2xy + y^2$ luôn không âm với mọi giá trị của $x, y$.', answer: 'Xem lời giải.', solution: 'Ta tính tổng $A + B$:\n$A + B = (3x^2 - 2xy + y^2) + (-3x^2 + 2xy + y^2)$\n$= (3x^2 - 3x^2) + (-2xy + 2xy) + (y^2 + y^2)$\n$= 2y^2$.\nVì $y^2 \\geq 0$ với mọi $y$, nên $2y^2 \\geq 0$ với mọi $y$.\nVậy tổng $A + B$ luôn không âm với mọi giá trị của $x, y$.' }
  );

  // Bài 4. Phép nhân đa thức
  allQS.push(
    { cat: id4 || fallbackId, code: 'T8-P4-NEW1', content: 'Thực hiện phép nhân đơn thức với đa thức: $3x(2x^2 - 5x + 1)$.', answer: '$6x^3 - 15x^2 + 3x$.', solution: 'Áp dụng tính chất phân phối:\n$3x(2x^2 - 5x + 1)$\n$= (3x \\cdot 2x^2) + (3x \\cdot (-5x)) + (3x \\cdot 1)$\n$= 6x^3 - 15x^2 + 3x$.' },
    { cat: id4 || fallbackId, code: 'T8-P4-NEW2', content: 'Thực hiện phép nhân đa thức với đa thức: $(x - 2)(x^2 + 2x + 4)$.', answer: '$x^3 - 8$.', solution: 'Nhân từng hạng tử của đa thức thứ nhất với từng hạng tử của đa thức thứ hai:\n$(x - 2)(x^2 + 2x + 4)$\n$= x(x^2 + 2x + 4) - 2(x^2 + 2x + 4)$\n$= x^3 + 2x^2 + 4x - 2x^2 - 4x - 8$\nNhóm hạng tử:\n$= x^3 + (2x^2 - 2x^2) + (4x - 4x) - 8\n= x^3 - 8$.' },
    { cat: id4 || fallbackId, code: 'T8-P4-NEW3', content: 'Rút gọn biểu thức sau: $A = 2x(x - 1) - (2x^2 + 3x - 5)$.', answer: '$A = -5x + 5$.', solution: 'Thực hiện phép nhân và bỏ ngoặc:\n$A = (2x^2 - 2x) - 2x^2 - 3x + 5$\nNhóm hạng tử đồng dạng:\n$A = (2x^2 - 2x^2) + (-2x - 3x) + 5$\n$A = -5x + 5$.' },
    { cat: id4 || fallbackId, code: 'T8-P4-NEW4', content: 'Tìm $x$, biết: $3x(x - 2) - 3x^2 + 12 = 0$.', answer: '$x = 2$.', solution: 'Khai triển vế trái:\n$(3x^2 - 6x) - 3x^2 + 12 = 0$\n$3x^2 - 6x - 3x^2 + 12 = 0$\n$-6x + 12 = 0$\n$6x = 12$\n$x = 2$.' },
    { cat: id4 || fallbackId, code: 'T8-P4-NEW5', content: 'Chứng minh biểu thức sau không phụ thuộc vào giá trị của biến $x$: $B = x(x^2 + x + 1) - x^2(x + 1) - x + 5$.', answer: '$B = 5$.', solution: 'Ta khai triển và rút gọn biểu thức $B$:\n$B = (x^3 + x^2 + x) - (x^3 + x^2) - x + 5$\n$B = x^3 + x^2 + x - x^3 - x^2 - x + 5$\n$B = (x^3 - x^3) + (x^2 - x^2) + (x - x) + 5$\n$B = 5$.\nVì $B = 5$ (một hằng số) nên giá trị của biểu thức không phụ thuộc vào $x$.' }
  );

  console.log(`Inserting ${allQS.length} new questions for Grade 8 (Polynomials)...`);

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
