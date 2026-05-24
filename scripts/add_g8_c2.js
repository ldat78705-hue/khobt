const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const crypto = require('crypto');

async function main() {
  const id6 = '30c01eff-1da3-4f14-b256-cc498f1e9055'; // Bài 6. Bình phương
  const id7 = '6ffe5599-48df-4f13-ae23-3c00e719029b'; // Bài 7. Lập phương
  const id9 = '5caed3e1-26b6-4b92-88b0-3738dc803d09'; // Bài 9. Phân tích thành nhân tử

  const grade = 8;
  const user_id = '8316c34e-765d-4b8c-9364-b683a17e33f8';
  let allQS = [];

  // Bài 6. Bình phương của một tổng/hiệu. Hiệu hai bình phương
  allQS.push(
    { cat: id6, code: 'T8-HDT-NEW1', content: 'Khai triển các hằng đẳng thức sau: $(2x + 3y)^2$ và $(x - 5)^2$.', answer: '$4x^2 + 12xy + 9y^2$ và $x^2 - 10x + 25$.', solution: '- Áp dụng hằng đẳng thức $(A + B)^2 = A^2 + 2AB + B^2$:\n$(2x + 3y)^2 = (2x)^2 + 2(2x)(3y) + (3y)^2 = 4x^2 + 12xy + 9y^2$.\n- Áp dụng hằng đẳng thức $(A - B)^2 = A^2 - 2AB + B^2$:\n$(x - 5)^2 = x^2 - 2(x)(5) + 5^2 = x^2 - 10x + 25$.' },
    { cat: id6, code: 'T8-HDT-NEW2', content: 'Tính nhanh giá trị của biểu thức: $101^2$ và $99^2$.', answer: '$10201$ và $9801$.', solution: '- Tính $101^2 = (100 + 1)^2 = 100^2 + 2 \\times 100 \\times 1 + 1^2 = 10000 + 200 + 1 = 10201$.\n- Tính $99^2 = (100 - 1)^2 = 100^2 - 2 \\times 100 \\times 1 + 1^2 = 10000 - 200 + 1 = 9801$.' },
    { cat: id6, code: 'T8-HDT-NEW3', content: 'Viết biểu thức sau dưới dạng bình phương của một tổng hoặc một hiệu: $4x^2 + 12xy + 9y^2$.', answer: '$(2x + 3y)^2$.', solution: 'Ta nhận thấy:\n- Hạng tử thứ nhất $4x^2 = (2x)^2$.\n- Hạng tử thứ ba $9y^2 = (3y)^2$.\n- Hạng tử giữa $12xy = 2 \\times (2x) \\times (3y)$.\nBiểu thức có dạng $A^2 + 2AB + B^2$ với $A = 2x, B = 3y$.\nVậy $4x^2 + 12xy + 9y^2 = (2x + 3y)^2$.' },
    { cat: id6, code: 'T8-HDT-NEW4', content: 'Khai triển và rút gọn biểu thức: $A = (x+2)^2 - (x-2)^2$.', answer: '$A = 8x$.', solution: '**Cách 1: Khai triển từng ngoặc**\n$A = (x^2 + 4x + 4) - (x^2 - 4x + 4) = x^2 + 4x + 4 - x^2 + 4x - 4 = 8x$.\n**Cách 2: Áp dụng hiệu hai bình phương $A^2 - B^2 = (A-B)(A+B)$**\n$A = [(x+2) - (x-2)][(x+2) + (x-2)] = (x + 2 - x + 2)(x + 2 + x - 2) = 4 \\times 2x = 8x$.' },
    { cat: id6, code: 'T8-HDT-NEW5', content: 'Tìm $x$, biết: $(x-3)^2 - x(x+5) = 0$.', answer: '$x = \\dfrac{9}{11}$.', solution: 'Khai triển vế trái:\n$(x^2 - 6x + 9) - (x^2 + 5x) = 0$\n$x^2 - 6x + 9 - x^2 - 5x = 0$\nThu gọn:\n$-11x + 9 = 0$\n$11x = 9 \\Rightarrow x = \\dfrac{9}{11}$.' }
  );

  // Bài 7. Lập phương của một tổng/hiệu
  allQS.push(
    { cat: id7, code: 'T8-HDT-NEW6', content: 'Khai triển hằng đẳng thức: $(x + 2)^3$.', answer: '$x^3 + 6x^2 + 12x + 8$.', solution: 'Áp dụng hằng đẳng thức $(A + B)^3 = A^3 + 3A^2B + 3AB^2 + B^3$ với $A = x, B = 2$:\n$(x + 2)^3 = x^3 + 3x^2(2) + 3x(2^2) + 2^3$\n$= x^3 + 6x^2 + 3x(4) + 8$\n$= x^3 + 6x^2 + 12x + 8$.' },
    { cat: id7, code: 'T8-HDT-NEW7', content: 'Khai triển hằng đẳng thức: $(2x - 1)^3$.', answer: '$8x^3 - 12x^2 + 6x - 1$.', solution: 'Áp dụng hằng đẳng thức $(A - B)^3 = A^3 - 3A^2B + 3AB^2 - B^3$ với $A = 2x, B = 1$:\n$(2x - 1)^3 = (2x)^3 - 3(2x)^2(1) + 3(2x)(1^2) - 1^3$\n$= 8x^3 - 3(4x^2) + 6x - 1$\n$= 8x^3 - 12x^2 + 6x - 1$.' },
    { cat: id7, code: 'T8-HDT-NEW8', content: 'Viết biểu thức sau dưới dạng lập phương của một tổng: $x^3 + 6x^2y + 12xy^2 + 8y^3$.', answer: '$(x + 2y)^3$.', solution: 'Ta phân tích biểu thức:\n$x^3 + 6x^2y + 12xy^2 + 8y^3$\n$= x^3 + 3 \\cdot x^2 \\cdot (2y) + 3 \\cdot x \\cdot (2y)^2 + (2y)^3$\nĐây là dạng khai triển của $(A + B)^3$ với $A = x$ và $B = 2y$.\nVậy biểu thức được viết lại là $(x + 2y)^3$.' },
    { cat: id7, code: 'T8-HDT-NEW9', content: 'Rút gọn biểu thức: $M = (x-y)^3 + 3xy(x-y)$.', answer: '$M = x^3 - y^3$.', solution: 'Khai triển $(x-y)^3 = x^3 - 3x^2y + 3xy^2 - y^3$.\nKhai triển $3xy(x-y) = 3x^2y - 3xy^2$.\nCộng hai biểu thức lại:\n$M = (x^3 - 3x^2y + 3xy^2 - y^3) + (3x^2y - 3xy^2)$\n$M = x^3 + (-3x^2y + 3x^2y) + (3xy^2 - 3xy^2) - y^3$\n$M = x^3 - y^3$.\n*(Đây cũng chính là cách chứng minh dạng mở rộng của hiệu hai lập phương).*' },
    { cat: id7, code: 'T8-HDT-NEW10', content: 'Tính giá trị biểu thức $A = x^3 - 3x^2 + 3x - 1$ tại $x = 101$.', answer: '$A = 1\\,000\\,000$.', solution: 'Ta nhận thấy biểu thức $A$ chính là dạng khai triển của hằng đẳng thức lập phương của một hiệu:\n$A = x^3 - 3x^2 \\cdot 1 + 3x \\cdot 1^2 - 1^3 = (x - 1)^3$.\nThay $x = 101$ vào biểu thức đã thu gọn:\n$A = (101 - 1)^3 = 100^3 = 1\\,000\\,000$.' }
  );

  // Bài 9. Phân tích đa thức thành nhân tử
  allQS.push(
    { cat: id9, code: 'T8-PTNT-NEW11', content: 'Phân tích đa thức thành nhân tử (đặt nhân tử chung): $5x^2y - 10xy^2 + 5xy$.', answer: '$5xy(x - 2y + 1)$.', solution: 'Quan sát $3$ hạng tử, ta thấy chúng có chung hệ số là $5$, và phần biến chung là $xy$.\nTa đặt $5xy$ làm nhân tử chung:\n$5x^2y - 10xy^2 + 5xy = 5xy(x) - 5xy(2y) + 5xy(1) = 5xy(x - 2y + 1)$.' },
    { cat: id9, code: 'T8-PTNT-NEW12', content: 'Phân tích đa thức thành nhân tử (dùng hằng đẳng thức): $x^2 - 16y^2$.', answer: '$(x - 4y)(x + 4y)$.', solution: 'Ta có biểu thức là hiệu của hai bình phương:\n$x^2 - 16y^2 = x^2 - (4y)^2$\nÁp dụng hằng đẳng thức $A^2 - B^2 = (A - B)(A + B)$:\n$= (x - 4y)(x + 4y)$.' },
    { cat: id9, code: 'T8-PTNT-NEW13', content: 'Phân tích đa thức thành nhân tử (nhóm hạng tử): $x^2 - xy + x - y$.', answer: '$(x - y)(x + 1)$.', solution: 'Ta nhóm hai hạng tử đầu với nhau, hai hạng tử sau với nhau:\n$x^2 - xy + x - y = (x^2 - xy) + (x - y)$\n$= x(x - y) + 1(x - y)$\nTiếp tục đặt nhân tử chung là $(x - y)$:\n$= (x - y)(x + 1)$.' },
    { cat: id9, code: 'T8-PTNT-NEW14', content: 'Phân tích đa thức thành nhân tử (phối hợp nhiều phương pháp): $3x^3 - 12x$.', answer: '$3x(x - 2)(x + 2)$.', solution: '**Bước 1: Đặt nhân tử chung**\nTa thấy hai hạng tử có chung $3x$:\n$3x^3 - 12x = 3x(x^2 - 4)$\n**Bước 2: Dùng hằng đẳng thức**\nBiểu thức trong ngoặc là hiệu hai bình phương:\n$x^2 - 4 = x^2 - 2^2 = (x - 2)(x + 2)$\n**Kết luận:** $3x^3 - 12x = 3x(x - 2)(x + 2)$.' },
    { cat: id9, code: 'T8-PTNT-NEW15', content: 'Phân tích đa thức thành nhân tử: $x^2 - 4x + 4 - y^2$.', answer: '$(x - 2 - y)(x - 2 + y)$.', solution: 'Ta nhóm $3$ hạng tử đầu lại để tạo thành hằng đẳng thức:\n$x^2 - 4x + 4 - y^2 = (x^2 - 4x + 4) - y^2$\n$= (x - 2)^2 - y^2$\nÁp dụng hằng đẳng thức hiệu hai bình phương $A^2 - B^2$:\n$= (x - 2 - y)(x - 2 + y)$.' },
    { cat: id9, code: 'T8-PTNT-NEW16', content: 'Tìm $x$, biết: $x(x - 3) + 2(x - 3) = 0$.', answer: '$x = 3$ hoặc $x = -2$.', solution: 'Ta phân tích vế trái thành nhân tử bằng cách đặt nhân tử chung là $(x - 3)$:\n$x(x - 3) + 2(x - 3) = 0$\n$(x - 3)(x + 2) = 0$\nMột tích bằng $0$ khi một trong hai thừa số bằng $0$:\nTrường hợp 1: $x - 3 = 0 \\Rightarrow x = 3$.\nTrường hợp 2: $x + 2 = 0 \\Rightarrow x = -2$.\nVậy $x = 3$ hoặc $x = -2$.' },
    { cat: id9, code: 'T8-PTNT-NEW17', content: 'Tính nhanh giá trị của biểu thức: $73^2 - 27^2$.', answer: '$4600$.', solution: 'Áp dụng hằng đẳng thức hiệu hai bình phương:\n$73^2 - 27^2 = (73 - 27)(73 + 27)$\n$= 46 \\times 100\n= 4600$.' },
    { cat: id9, code: 'T8-PTNT-NEW18', content: 'Phân tích đa thức bậc hai thành nhân tử (tách hạng tử): $x^2 - 5x + 6$.', answer: '$(x - 2)(x - 3)$.', solution: 'Ta tìm hai số có tổng bằng $-5$ và tích bằng $6$. Đó là $-2$ và $-3$.\nTách hạng tử giữa $-5x = -2x - 3x$:\n$x^2 - 5x + 6 = x^2 - 2x - 3x + 6$\nNhóm hạng tử:\n$= (x^2 - 2x) - (3x - 6)$\n$= x(x - 2) - 3(x - 2)$\n$= (x - 2)(x - 3)$.' },
    { cat: id9, code: 'T8-PTNT-NEW19', content: 'Tìm giá trị nhỏ nhất của biểu thức: $A = x^2 - 6x + 10$.', answer: 'Giá trị nhỏ nhất là $1$, khi $x = 3$.', solution: 'Ta thêm bớt để tạo thành bình phương của một hiệu:\n$A = x^2 - 6x + 9 + 1$\n$A = (x - 3)^2 + 1$\nVì $(x - 3)^2 \\geq 0$ với mọi $x$, nên $A = (x - 3)^2 + 1 \\geq 1$ với mọi $x$.\nDấu "=" xảy ra khi $x - 3 = 0 \\Rightarrow x = 3$.\nVậy giá trị nhỏ nhất của biểu thức là $1$, đạt được khi $x = 3$.' },
    { cat: id9, code: 'T8-PTNT-NEW20', content: 'Phân tích đa thức thành nhân tử: $x^3 + 2x^2 + x$.', answer: '$x(x + 1)^2$.', solution: 'Bước 1: Đặt $x$ làm nhân tử chung.\n$x^3 + 2x^2 + x = x(x^2 + 2x + 1)$\nBước 2: Phân tích biểu thức trong ngoặc thành hằng đẳng thức.\n$x(x^2 + 2x + 1) = x(x + 1)^2$.' }
  );

  console.log(`Inserting ${allQS.length} new questions for Grade 8 (Hang Dang Thuc)...`);

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
