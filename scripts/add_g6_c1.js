const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const crypto = require('crypto');

async function main() {
  const cats = await sql`
    SELECT id, name FROM public.categories 
    WHERE grade = 6 AND parent_id IS NOT NULL 
    ORDER BY sort_order LIMIT 2
  `;
  
  if (cats.length < 2) {
    console.log('Categories not found!');
    return;
  }
  
  const id1 = cats[0].id;
  const id2 = cats[1].id;
  console.log('Cat 1:', cats[0].name);
  console.log('Cat 2:', cats[1].name);

  const grade = 6;
  const user_id = '8316c34e-765d-4b8c-9364-b683a17e33f8';
  let allQS = [];

  // Grade 6: Bài 1: Tập hợp (Tập hợp các số tự nhiên)
  allQS.push(
    { cat: id1, code: 'T6-B1-NEW1', content: 'Viết tập hợp $A$ các số tự nhiên lớn hơn $8$ và nhỏ hơn $14$ bằng hai cách.', answer: '$A = \\{9; 10; 11; 12; 13\\}$ hoặc $A = \\{x \\in \\mathbb{N} \\mid 8 < x < 14\\}$.', solution: '**Cách 1: Liệt kê các phần tử**\nCác số tự nhiên lớn hơn $8$ và nhỏ hơn $14$ là $9, 10, 11, 12, 13$.\nVậy $A = \\{9; 10; 11; 12; 13\\}$.\n\n**Cách 2: Chỉ ra tính chất đặc trưng**\nCác phần tử $x$ thuộc tập hợp số tự nhiên $\\mathbb{N}$, thỏa mãn điều kiện $8 < x < 14$.\nVậy $A = \\{x \\in \\mathbb{N} \\mid 8 < x < 14\\}$.' },
    { cat: id1, code: 'T6-B1-NEW2', content: 'Cho tập hợp $M = \\{x \\in \\mathbb{N} \\mid 15 \\leq x < 21\\}$. Hãy liệt kê các phần tử của tập hợp $M$ và cho biết $M$ có bao nhiêu phần tử?', answer: '$M = \\{15; 16; 17; 18; 19; 20\\}$. Tập hợp có $6$ phần tử.', solution: '**Bước 1: Liệt kê các phần tử**\nĐiều kiện là số tự nhiên $x$ sao cho $15 \\leq x < 21$.\nCác giá trị thỏa mãn là $15, 16, 17, 18, 19, 20$.\nVậy $M = \\{15; 16; 17; 18; 19; 20\\}$.\n\n**Bước 2: Đếm số phần tử**\nSố phần tử của tập hợp $M$ là: $(20 - 15) : 1 + 1 = 6$ (phần tử).\n\n**Kết luận:** Tập hợp $M$ có $6$ phần tử.' },
    { cat: id1, code: 'T6-B1-NEW3', content: 'Viết tập hợp $P$ các chữ cái có trong từ "TOÁN HỌC".', answer: '$P = \\{\\text{T}; \\text{O}; \\text{A}; \\text{N}; \\text{H}; \\text{C}\\}$.', solution: 'Các chữ cái có trong từ "TOÁN HỌC" là: T, O, A, N, H, O, C.\nTheo quy tắc viết tập hợp, mỗi phần tử chỉ được liệt kê một lần.\nChữ cái "O" xuất hiện hai lần nên ta chỉ viết một lần.\nVậy tập hợp $P = \\{\\text{T}; \\text{O}; \\text{A}; \\text{N}; \\text{H}; \\text{C}\\}$.' },
    { cat: id1, code: 'T6-B1-NEW4', content: 'Cho hai tập hợp $A = \\{1; 2; 3; 4\\}$ và $B = \\{3; 4; 5; 6\\}$. Viết tập hợp $C$ gồm các phần tử vừa thuộc $A$ vừa thuộc $B$.', answer: '$C = \\{3; 4\\}$.', solution: 'Ta tìm các phần tử xuất hiện ở cả hai tập hợp $A$ và $B$.\nQuan sát ta thấy:\n- Phần tử $3$ nằm trong cả $A$ và $B$.\n- Phần tử $4$ nằm trong cả $A$ và $B$.\nCác phần tử $1, 2$ chỉ thuộc $A$. Các phần tử $5, 6$ chỉ thuộc $B$.\nVậy tập hợp $C$ (tập hợp giao của $A$ và $B$) là: $C = \\{3; 4\\}$.' },
    { cat: id1, code: 'T6-B1-NEW5', content: 'Gọi $X$ là tập hợp các số tự nhiên chẵn nhỏ hơn $10$. Điền kí hiệu $\\in$ hoặc $\\notin$ thích hợp vào chỗ trống: $4 \\dots X$ ; $7 \\dots X$ ; $10 \\dots X$.', answer: '$4 \\in X$; $7 \\notin X$; $10 \\notin X$.', solution: 'Tập hợp các số tự nhiên chẵn nhỏ hơn $10$ là: $X = \\{0; 2; 4; 6; 8\\}$.\nXét các số đề bài cho:\n- Số $4$ có trong tập hợp $X$ nên: $4 \\in X$.\n- Số $7$ không có trong tập hợp $X$ (vì $7$ là số lẻ) nên: $7 \\notin X$.\n- Số $10$ không có trong tập hợp $X$ (vì yêu cầu nhỏ hơn $10$) nên: $10 \\notin X$.' }
  );

  // Grade 6: Bài 2: Cách ghi số tự nhiên
  allQS.push(
    { cat: id2, code: 'T6-B2-NEW1', content: 'Đọc và viết số sau thành tổng giá trị các chữ số: $34509$.', answer: '$34509 = 3 \\times 10000 + 4 \\times 1000 + 5 \\times 100 + 9$.', solution: '**Bước 1: Đọc số**\n$34509$ đọc là: Ba mươi tư nghìn năm trăm linh chín.\n\n**Bước 2: Viết thành tổng giá trị các chữ số**\nSố $34509$ gồm: $3$ chục nghìn, $4$ nghìn, $5$ trăm, $0$ chục, $9$ đơn vị.\nPhân tích: $34509 = 30000 + 4000 + 500 + 9$.\nHoặc viết dưới dạng: $34509 = 3 \\times 10000 + 4 \\times 1000 + 5 \\times 100 + 9$.' },
    { cat: id2, code: 'T6-B2-NEW2', content: 'Cho ba chữ số $4, 7, 9$. Hãy viết tất cả các số tự nhiên có ba chữ số khác nhau từ các chữ số đó.', answer: '$479, 497, 749, 794, 947, 974$.', solution: 'Để không bị sót, ta chọn lần lượt từng chữ số làm hàng trăm:\n- Chọn $4$ làm hàng trăm, ta có: $479, 497$.\n- Chọn $7$ làm hàng trăm, ta có: $749, 794$.\n- Chọn $9$ làm hàng trăm, ta có: $947, 974$.\nVậy có tất cả $6$ số tự nhiên được tạo thành: $479, 497, 749, 794, 947, 974$.' },
    { cat: id2, code: 'T6-B2-NEW3', content: 'Tìm số tự nhiên lớn nhất và nhỏ nhất có $4$ chữ số khác nhau được lập từ các chữ số $0, 2, 5, 8$.', answer: 'Lớn nhất: $8520$. Nhỏ nhất: $2058$.', solution: '**Bước 1: Tìm số lớn nhất**\nĐể số là lớn nhất, các chữ số phải được xếp theo thứ tự giảm dần từ trái qua phải.\nDo đó ta xếp: $8, 5, 2, 0$. Số lớn nhất là $8520$.\n\n**Bước 2: Tìm số nhỏ nhất**\nĐể số là nhỏ nhất, các chữ số phải được xếp theo thứ tự tăng dần. Tuy nhiên chữ số hàng cao nhất (hàng nghìn) không thể bằng $0$.\nTa chọn số nhỏ nhất khác $0$ làm hàng nghìn, đó là số $2$.\nCác chữ số còn lại xếp theo thứ tự tăng dần: $0, 5, 8$.\nSố nhỏ nhất là $2058$.' },
    { cat: id2, code: 'T6-B2-NEW4', content: 'Viết số La Mã của các số sau: $14, 27, 29$.', answer: 'XIV, XXVII, XXIX.', solution: 'Theo quy tắc viết số La Mã:\n- Số $14 = 10 + 4$. Kí hiệu là: $\\text{XIV}$.\n- Số $27 = 10 + 10 + 5 + 1 + 1$. Kí hiệu là: $\\text{XXVII}$.\n- Số $29 = 10 + 10 + 9$. Kí hiệu là: $\\text{XXIX}$.\nVậy các số La Mã tương ứng là $\\text{XIV}$, $\\text{XXVII}$, $\\text{XXIX}$.' },
    { cat: id2, code: 'T6-B2-NEW5', content: 'Một cuốn sách có $256$ trang. Hỏi để đánh số trang cuốn sách đó (từ trang $1$ đến trang $256$), người ta phải dùng tất cả bao nhiêu chữ số?', answer: '$660$ chữ số.', solution: 'Cuốn sách từ trang $1$ đến $256$ gồm các trang có $1, 2, 3$ chữ số.\n\n**Bước 1: Trang có $1$ chữ số**\nTừ trang $1$ đến trang $9$ có: $(9 - 1) : 1 + 1 = 9$ trang.\nSố chữ số cần dùng: $9 \\times 1 = 9$ (chữ số).\n\n**Bước 2: Trang có $2$ chữ số**\nTừ trang $10$ đến trang $99$ có: $(99 - 10) : 1 + 1 = 90$ trang.\nSố chữ số cần dùng: $90 \\times 2 = 180$ (chữ số).\n\n**Bước 3: Trang có $3$ chữ số**\nTừ trang $100$ đến trang $256$ có: $(256 - 100) : 1 + 1 = 157$ trang.\nSố chữ số cần dùng: $157 \\times 3 = 471$ (chữ số).\n\n**Bước 4: Tính tổng số chữ số**\nTổng cộng cần dùng: $9 + 180 + 471 = 660$ (chữ số).\n\n**Kết luận:** Cần dùng $660$ chữ số.' }
  );

  console.log(`Inserting ${allQS.length} new questions for Grade 6 Chapter 1...`);

  for (const q of allQS) {
    const qid = crypto.randomUUID();
    await sql`
      INSERT INTO public.questions (id, category_id, question_code, content, answer, solution, difficulty, grade, topic, question_type, user_id, status, is_public)
      VALUES (${qid}, ${q.cat}, ${q.code}, ${q.content}, ${q.answer}, ${q.solution}, 'van_dung', ${grade}, 'so_hoc', 'tu_luan', ${user_id}, 'approved', true)
    `;
    console.log(`Inserted ${q.code}`);
  }

  console.log('Done!');
}

main().catch(console.error);
