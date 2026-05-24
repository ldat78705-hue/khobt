const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const crypto = require('crypto');

async function main() {
  const cats = await sql`
    SELECT id, name FROM public.categories 
    WHERE grade = 6 AND parent_id IS NOT NULL 
    AND (name ILIKE '%Bài 28%' OR name ILIKE '%Bài 29%' OR name ILIKE '%Bài 30%')
  `;
  
  if (cats.length < 3) {
    console.log('Categories not found!');
    return;
  }
  
  const id28 = cats.find(c => c.name.includes('Bài 28'))?.id;
  const id29 = cats.find(c => c.name.includes('Bài 29'))?.id;
  const id30 = cats.find(c => c.name.includes('Bài 30'))?.id;

  const grade = 6;
  const user_id = '8316c34e-765d-4b8c-9364-b683a17e33f8';
  let allQS = [];

  // Bài 28. Số thập phân
  allQS.push(
    { cat: id28, code: 'T6-D-NEW1', content: 'Viết các số thập phân sau: "Âm ba phẩy mười lăm"; "Không phẩy không không tám". Viết phân số $\\dfrac{-45}{100}$ dưới dạng số thập phân.', answer: '$-3,15$; $0,008$; $-0,45$.', solution: '- "Âm ba phẩy mười lăm" viết là: $-3,15$.\n- "Không phẩy không không tám" viết là: $0,008$.\n- Phân số thập phân $\\dfrac{-45}{100}$ viết dưới dạng số thập phân là $-0,45$.' },
    { cat: id28, code: 'T6-D-NEW2', content: 'Nêu số đối của các số thập phân sau: $12,5$; $-3,14$; $0$.', answer: '$-12,5$; $3,14$; $0$.', solution: 'Số đối của một số thập phân $x$ là $-x$.\n- Số đối của $12,5$ là $-12,5$.\n- Số đối của $-3,14$ là $3,14$.\n- Số đối của $0$ là $0$.' },
    { cat: id28, code: 'T6-D-NEW3', content: 'Sắp xếp các số thập phân sau theo thứ tự tăng dần: $4,2$; $-3,5$; $0$; $-3,8$; $4,15$.', answer: '$-3,8 < -3,5 < 0 < 4,15 < 4,2$.', solution: '- Các số âm nhỏ hơn $0$ và nhỏ hơn các số dương.\n- So sánh các số âm: $-3,8$ nhỏ hơn $-3,5$ (vì $3,8 > 3,5$).\n- So sánh các số dương: $4,15$ nhỏ hơn $4,20$ (hay $4,2$).\nThứ tự tăng dần là: $-3,8 < -3,5 < 0 < 4,15 < 4,2$.' },
    { cat: id28, code: 'T6-D-NEW4', content: 'Hãy tìm một số thập phân $x$ sao cho: $3,5 < x < 3,6$.', answer: 'Ví dụ $x = 3,55$.', solution: 'Ta có thể thêm các chữ số $0$ vào tận cùng bên phải của phần thập phân mà không làm thay đổi giá trị của nó.\n$3,5 = 3,50$\n$3,6 = 3,60$\nKhoảng giữa $3,50$ và $3,60$ có rất nhiều số thập phân, ví dụ: $3,51; 3,52; 3,55; 3,59...$\nVậy một giá trị thỏa mãn là $x = 3,55$.' },
    { cat: id28, code: 'T6-D-NEW5', content: 'Mực nước sông đang ở mức $-1,5$m so với mức báo động lũ. Sau một đêm mưa lớn, mực nước sông dâng thêm $0,8$m. Hỏi mực nước lúc này là bao nhiêu mét so với mức báo động?', answer: '$-0,7$m.', solution: 'Mực nước hiện tại là $-1,5$m. Việc "dâng thêm" tương ứng với phép cộng.\nMực nước mới là: $(-1,5) + 0,8 = -(1,5 - 0,8) = -0,7$ (m).\n\n**Kết luận:** Mực nước lúc này là $-0,7$m so với mức báo động (vẫn còn dưới mức báo động $0,7$m).' }
  );

  // Bài 29. Tính toán với số thập phân
  allQS.push(
    { cat: id29, code: 'T6-D-NEW6', content: 'Thực hiện phép tính: $4,5 + (-3,2)$ và $(-1,2) + (-2,8)$.', answer: '$1,3$ và $-4,0$.', solution: '- Phép cộng hai số thập phân khác dấu: $4,5 + (-3,2) = 4,5 - 3,2 = 1,3$.\n- Phép cộng hai số thập phân cùng âm: $(-1,2) + (-2,8) = -(1,2 + 2,8) = -4,0$ (hoặc $-4$).' },
    { cat: id29, code: 'T6-D-NEW7', content: 'Tính giá trị biểu thức: $12,5 - 5,4 \\times 2$.', answer: '$1,7$.', solution: 'Theo thứ tự thực hiện phép tính, ta nhân trước trừ sau:\n$12,5 - (5,4 \\times 2)$\n$= 12,5 - 10,8$\n$= 1,7$.' },
    { cat: id29, code: 'T6-D-NEW8', content: 'Một mảnh vườn hình chữ nhật có chiều dài $15,2$m và chiều rộng $10,5$m. Tính chu vi và diện tích mảnh vườn.', answer: 'Chu vi $51,4$m; Diện tích $159,6\\text{ m}^2$.', solution: '**Bước 1: Tính chu vi**\nChu vi = (Chiều dài + Chiều rộng) $\\times 2$\n$= (15,2 + 10,5) \\times 2 = 25,7 \\times 2 = 51,4$ (m).\n\n**Bước 2: Tính diện tích**\nDiện tích = Chiều dài $\\times$ Chiều rộng\n$= 15,2 \\times 10,5 = 159,6$ ($\\text{m}^2$).' },
    { cat: id29, code: 'T6-D-NEW9', content: 'Tính nhanh: $4,5 \\times 12,3 + 4,5 \\times 87,7$.', answer: '$450$.', solution: 'Áp dụng tính chất phân phối của phép nhân đối với phép cộng:\n$4,5 \\times 12,3 + 4,5 \\times 87,7$\n$= 4,5 \\times (12,3 + 87,7)$\n$= 4,5 \\times 100$\n$= 450$.' },
    { cat: id29, code: 'T6-D-NEW10', content: 'Tìm $x$, biết: $x - 3,14 = -1,86$.', answer: '$x = 1,28$.', solution: 'Trong phép trừ này, $x$ là số bị trừ. Ta lấy hiệu cộng với số trừ:\n$x = -1,86 + 3,14$\n$x = 3,14 - 1,86$\n$x = 1,28$.' }
  );

  // Bài 30. Làm tròn và ước lượng
  allQS.push(
    { cat: id30, code: 'T6-D-NEW11', content: 'Làm tròn số $123,4567$ đến chữ số thập phân thứ hai và làm tròn đến hàng đơn vị.', answer: '$123,46$ và $123$.', solution: '- Làm tròn đến chữ số thập phân thứ hai: Chữ số sau nó là $6 > 5$, nên ta cộng $1$ vào chữ số thứ hai. Kết quả là $123,46$.\n- Làm tròn đến hàng đơn vị: Chữ số sau dấu phẩy là $4 < 5$, nên ta giữ nguyên phần nguyên. Kết quả là $123$.' },
    { cat: id30, code: 'T6-D-NEW12', content: 'Dân số của một thành phố là $1 \\, 234 \\, 567$ người. Hãy làm tròn số này đến hàng chục nghìn.', answer: '$1 \\, 230 \\, 000$ người.', solution: 'Chữ số hàng chục nghìn của số $1 \\, 234 \\, 567$ là $3$. Chữ số ngay sau nó (hàng nghìn) là $4$.\nVì $4 < 5$ nên ta giữ nguyên chữ số hàng chục nghìn và thay các chữ số phía sau bằng các chữ số $0$.\nKết quả làm tròn: $1 \\, 230 \\, 000$.' },
    { cat: id30, code: 'T6-D-NEW13', content: 'Ước lượng kết quả phép tính sau bằng cách làm tròn các số đến hàng đơn vị: $14,8 \\times 3,1$. Tính kết quả chính xác để so sánh với số ước lượng.', answer: 'Ước lượng: $45$. Chính xác: $45,88$.', solution: '**Bước 1: Ước lượng**\n- $14,8$ làm tròn đến hàng đơn vị thành $15$.\n- $3,1$ làm tròn đến hàng đơn vị thành $3$.\nPhép tính ước lượng: $15 \\times 3 = 45$.\n\n**Bước 2: Tính chính xác**\n$14,8 \\times 3,1 = 45,88$.\nKết quả ước lượng ($45$) khá gần với kết quả chính xác ($45,88$).' },
    { cat: id30, code: 'T6-D-NEW14', content: 'Một chiếc áo có giá $149,99$ đô la. Nếu một người mua $3$ chiếc thì phải trả khoảng bao nhiêu tiền? (Hãy dùng phương pháp làm tròn để tính nhẩm).', answer: 'Khoảng $450$ đô la.', solution: 'Để tính nhẩm nhanh, ta làm tròn giá mỗi chiếc áo:\n$149,99$ đô la rất sát với $150$ đô la.\nSố tiền phải trả khoảng: $150 \\times 3 = 450$ (đô la).\n\n*(Tính chính xác sẽ là $449,97$ đô la, nên kết quả ước lượng $450$ là hoàn toàn hợp lý).*' },
    { cat: id30, code: 'T6-D-NEW15', content: 'Làm tròn số thập phân $-3,14159$ đến chữ số thập phân thứ ba.', answer: '$-3,142$.', solution: 'Chữ số thập phân thứ ba của số $-3,14159$ là $1$. Chữ số ngay sau nó là $5$.\nTheo quy tắc làm tròn, vì chữ số sau là $5$ (từ $5$ trở lên), ta cộng thêm $1$ vào chữ số thứ ba.\n$1 + 1 = 2$.\nKết quả làm tròn là: $-3,142$.' }
  );

  console.log(`Inserting ${allQS.length} new questions for Grade 6 (So Thap Phan)...`);

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
