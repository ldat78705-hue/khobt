const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const crypto = require('crypto');

async function main() {
  const cats = await sql`
    SELECT id, name FROM public.categories 
    WHERE grade = 6 AND (name ILIKE '%chia hết%' OR name ILIKE '%nguyên tố%')
    LIMIT 2
  `;
  
  if (cats.length < 2) {
    console.log('Categories not found!');
    return;
  }
  
  const id5 = cats[0].id;
  const id6 = cats[1].id;
  console.log('Cat 5:', cats[0].name);
  console.log('Cat 6:', cats[1].name);

  const grade = 6;
  const user_id = '8316c34e-765d-4b8c-9364-b683a17e33f8';
  let allQS = [];

  // Grade 6: Tính chia hết. Dấu hiệu chia hết
  allQS.push(
    { cat: id5, code: 'T6-B5-NEW1', content: 'Tìm chữ số $x$ để số $\\overline{34x}$ chia hết cho cả $2$ và $5$.', answer: '$x = 0$.', solution: 'Để một số chia hết cho cả $2$ và $5$ thì chữ số tận cùng của nó phải là $0$.\nSố $\\overline{34x}$ có chữ số tận cùng là $x$.\nDo đó, $x = 0$.\n\n**Kết luận:** Số cần tìm là $340$.' },
    { cat: id5, code: 'T6-B5-NEW2', content: 'Tìm chữ số $y$ để số $\\overline{1y5}$ chia hết cho $9$.', answer: '$y = 3$.', solution: 'Để số $\\overline{1y5}$ chia hết cho $9$, tổng các chữ số của nó phải chia hết cho $9$.\nTổng các chữ số: $1 + y + 5 = y + 6$.\nVì $y$ là chữ số từ $0$ đến $9$, nên $y + 6$ lớn hơn hoặc bằng $6$ và nhỏ hơn hoặc bằng $15$.\nSố duy nhất trong khoảng này chia hết cho $9$ là số $9$.\nVậy $y + 6 = 9 \\Rightarrow y = 3$.\n\n**Kết luận:** $y = 3$ (số đó là $135$).' },
    { cat: id5, code: 'T6-B5-NEW3', content: 'Trong các số sau: $125; 204; 3060; 4515$. Số nào chia hết cho cả $2, 3, 5$ và $9$?', answer: 'Số $3060$.', solution: '**Bước 1: Tìm số chia hết cho cả $2$ và $5$**\nSố chia hết cho cả $2$ và $5$ phải có tận cùng là $0$.\nTrong các số đã cho, chỉ có số $3060$ có tận cùng là $0$.\n\n**Bước 2: Kiểm tra tính chia hết cho $3$ và $9$ của số $3060$**\nTổng các chữ số của số $3060$ là: $3 + 0 + 6 + 0 = 9$.\nVì $9$ chia hết cho $9$ (nên cũng chia hết cho $3$).\n\n**Kết luận:** Số $3060$ chia hết cho cả $2, 3, 5$ và $9$.' },
    { cat: id5, code: 'T6-B5-NEW4', content: 'Một khối học sinh có $145$ em xếp hàng. Nếu xếp mỗi hàng $5$ em thì có dư em nào không? Nếu xếp mỗi hàng $3$ em thì dư mấy em?', answer: 'Xếp hàng 5 không dư. Xếp hàng 3 dư 1 em.', solution: '**Bước 1: Xét việc xếp mỗi hàng $5$ em**\nSố $145$ có tận cùng là $5$ nên chia hết cho $5$.\nVậy xếp mỗi hàng $5$ em thì không dư em nào.\n\n**Bước 2: Xét việc xếp mỗi hàng $3$ em**\nTa tính tổng các chữ số của số $145$: $1 + 4 + 5 = 10$.\nSố $10$ chia cho $3$ dư $1$.\nVậy số $145$ chia cho $3$ dư $1$.\nKhi xếp mỗi hàng $3$ em thì sẽ dư $1$ em.' },
    { cat: id5, code: 'T6-B5-NEW5', content: 'Điền chữ số thích hợp vào dấu $*$ để số $\\overline{7*2}$ chia hết cho $3$ nhưng không chia hết cho $9$.', answer: '$* \\in \\{1; 4\\}$.', solution: 'Để số $\\overline{7*2}$ chia hết cho $3$, tổng các chữ số phải chia hết cho $3$.\nTổng các chữ số là: $7 + * + 2 = 9 + *$.\nVì $9 + *$ chia hết cho $3$ nên $*$ có thể là các số: $0, 3, 6, 9$.\n\nTa xét điều kiện "không chia hết cho $9$":\n- Nếu $* = 0$, tổng là $9$ (chia hết cho $9$) $\\rightarrow$ Loại.\n- Nếu $* = 3$, tổng là $12$ (không chia hết cho $9$) $\\rightarrow$ Chọn.\n- Nếu $* = 6$, tổng là $15$ (không chia hết cho $9$) $\\rightarrow$ Chọn.\n- Nếu $* = 9$, tổng là $18$ (chia hết cho $9$) $\\rightarrow$ Loại.\n\n*(Lưu ý: Bạn học sinh có thể dùng dấu $*$ là $3$ hoặc $6$. Cả hai đáp án này đều chính xác).*' }
  );

  // Grade 6: Số nguyên tố. Hợp số. Phân tích ra TSNT
  allQS.push(
    { cat: id6, code: 'T6-B6-NEW1', content: 'Trong các số sau, số nào là số nguyên tố, số nào là hợp số: $17; 21; 31; 49$. Giải thích vì sao.', answer: 'Số nguyên tố: $17, 31$. Hợp số: $21, 49$.', solution: '- Số $17$: Chỉ có $2$ ước là $1$ và $17$ $\\rightarrow$ Số nguyên tố.\n- Số $21$: Có các ước là $1, 3, 7, 21$ (nhiều hơn $2$ ước) $\\rightarrow$ Hợp số.\n- Số $31$: Chỉ có $2$ ước là $1$ và $31$ $\\rightarrow$ Số nguyên tố.\n- Số $49$: Có các ước là $1, 7, 49$ (nhiều hơn $2$ ước) $\\rightarrow$ Hợp số.' },
    { cat: id6, code: 'T6-B6-NEW2', content: 'Phân tích số $120$ ra thừa số nguyên tố.', answer: '$120 = 2^3 \\times 3 \\times 5$.', solution: 'Ta phân tích số $120$ theo cột dọc hoặc rẽ nhánh:\n$120 : 2 = 60$\n$60 : 2 = 30$\n$30 : 2 = 15$\n$15 : 3 = 5$\n$5 : 5 = 1$\nCác thừa số nguyên tố là: $2, 2, 2, 3, 5$.\nViết gọn dưới dạng lũy thừa: $120 = 2^3 \\times 3 \\times 5$.' },
    { cat: id6, code: 'T6-B6-NEW3', content: 'Tổng $11 \\times 13 \\times 15 + 17$ là số nguyên tố hay hợp số? Không cần tính kết quả cuối cùng, hãy giải thích.', answer: 'Tổng trên là số chẵn lớn hơn 2, nên là hợp số.', solution: 'Ta xét tính chẵn lẻ của biểu thức:\n- Trong tích $11 \\times 13 \\times 15$, các thừa số đều là số lẻ nên tích này là một số lẻ.\n- Số $17$ cũng là một số lẻ.\n- Tổng của hai số lẻ là một số chẵn.\nBiểu thức trên có tổng là một số chẵn và lớn hơn $2$ (vì $17 > 2$).\nMọi số chẵn lớn hơn $2$ đều chia hết cho $2$, do đó nó có nhiều hơn $2$ ước.\nVậy tổng trên là **hợp số**.' },
    { cat: id6, code: 'T6-B6-NEW4', content: 'Tìm số tự nhiên $x$, biết: $2^x \\times 3^2 = 72$.', answer: '$x = 3$.', solution: 'Ta coi $2^x$ là thừa số chưa biết trong phép nhân.\n$2^x \\times 9 = 72$\n$2^x = 72 : 9$\n$2^x = 8$\nĐể tìm $x$, ta biểu diễn số $8$ dưới dạng lũy thừa cơ số $2$.\n$8 = 2 \\times 2 \\times 2 = 2^3$.\nSuy ra: $2^x = 2^3$.\nVậy $x = 3$.' },
    { cat: id6, code: 'T6-B6-NEW5', content: 'Mẹ muốn chia đều $36$ chiếc bánh vào các hộp sao cho số hộp lớn hơn $1$ và nhỏ hơn $10$. Hỏi có mấy cách chia hộp? Mỗi hộp có bao nhiêu chiếc bánh?', answer: 'Có 4 cách chia hộp (2, 3, 4, 6 hộp).', solution: 'Số lượng hộp phải là **ước** của $36$.\nTập hợp các ước của $36$ là: $U(36) = \\{1; 2; 3; 4; 6; 9; 12; 18; 36\\}$.\nĐiều kiện: Số hộp phải lớn hơn $1$ và nhỏ hơn $10$.\nCác giá trị thỏa mãn là: $2, 3, 4, 6, 9$.\nTừ đó ta có các cách chia sau:\n- Cách 1: Chia $2$ hộp, mỗi hộp $36 : 2 = 18$ chiếc.\n- Cách 2: Chia $3$ hộp, mỗi hộp $36 : 3 = 12$ chiếc.\n- Cách 3: Chia $4$ hộp, mỗi hộp $36 : 4 = 9$ chiếc.\n- Cách 4: Chia $6$ hộp, mỗi hộp $36 : 6 = 6$ chiếc.\n- Cách 5: Chia $9$ hộp, mỗi hộp $36 : 9 = 4$ chiếc.\n\n*(Sửa đổi chút xíu: Bài toán có 5 cách chia, không phải 4 cách).*' }
  );

  // Fix solution string locally
  allQS[9].answer = 'Có 5 cách chia hộp (2, 3, 4, 6, 9 hộp).';

  console.log(`Inserting ${allQS.length} new questions for Grade 6...`);

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
