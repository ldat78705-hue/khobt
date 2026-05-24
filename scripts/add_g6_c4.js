const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const crypto = require('crypto');

async function main() {
  const cats = await sql`
    SELECT id, name FROM public.categories 
    WHERE grade = 6 AND (name ILIKE '%Ước chung%' OR name ILIKE '%Bội chung%')
    LIMIT 2
  `;
  
  if (cats.length < 2) {
    console.log('Categories not found!');
    return;
  }
  
  const id7 = cats[0].id;
  const id8 = cats[1].id;
  console.log('Cat 7:', cats[0].name);
  console.log('Cat 8:', cats[1].name);

  const grade = 6;
  const user_id = '8316c34e-765d-4b8c-9364-b683a17e33f8';
  let allQS = [];

  // Grade 6: Ước chung và Ước chung lớn nhất (ƯCLN)
  allQS.push(
    { cat: id7, code: 'T6-B7-NEW1', content: 'Tìm ƯCLN của hai số $24$ và $36$. Sau đó tìm các ước chung của $24$ và $36$.', answer: '$\\text{ƯCLN}(24, 36) = 12$; ƯC$(24, 36) = \\{1; 2; 3; 4; 6; 12\\}$.', solution: '**Bước 1: Phân tích ra thừa số nguyên tố**\n$24 = 2^3 \\times 3$\n$36 = 2^2 \\times 3^2$\n\n**Bước 2: Tìm ƯCLN**\nCác thừa số nguyên tố chung là $2$ và $3$. Số mũ nhỏ nhất của $2$ là $2$, của $3$ là $1$.\n$\\text{ƯCLN}(24, 36) = 2^2 \\times 3 = 12$.\n\n**Bước 3: Tìm các ước chung**\nƯC$(24, 36) = \\text{Ư}(12) = \\{1; 2; 3; 4; 6; 12\\}$.' },
    { cat: id7, code: 'T6-B7-NEW2', content: 'Cô giáo muốn chia $48$ cây bút và $32$ quyển vở thành các phần thưởng sao cho số bút và số vở ở mỗi phần thưởng là như nhau. Hỏi cô giáo có thể chia được nhiều nhất bao nhiêu phần thưởng? Khi đó mỗi phần thưởng có mấy cây bút, mấy quyển vở?', answer: 'Chia nhiều nhất $16$ phần thưởng. Mỗi phần có $3$ bút, $2$ vở.', solution: '**Bước 1: Lập luận**\nĐể chia đều bút và vở vào các phần thưởng và số phần thưởng là nhiều nhất, số phần thưởng chính là ƯCLN của $48$ và $32$.\n\n**Bước 2: Tìm ƯCLN$(48, 32)$**\n$48 = 2^4 \\times 3$\n$32 = 2^5$\n$\\text{ƯCLN}(48, 32) = 2^4 = 16$.\nVậy có thể chia nhiều nhất được $16$ phần thưởng.\n\n**Bước 3: Số vật phẩm trong mỗi phần**\n- Số bút: $48 : 16 = 3$ (cây)\n- Số vở: $32 : 16 = 2$ (quyển).' },
    { cat: id7, code: 'T6-B7-NEW3', content: 'Rút gọn phân số $\\dfrac{45}{60}$ về phân số tối giản bằng cách chia cả tử và mẫu cho ƯCLN của chúng.', answer: '$\\dfrac{3}{4}$.', solution: '**Bước 1: Tìm ƯCLN của tử số và mẫu số**\n$45 = 3^2 \\times 5$\n$60 = 2^2 \\times 3 \\times 5$\n$\\text{ƯCLN}(45, 60) = 3 \\times 5 = 15$.\n\n**Bước 2: Rút gọn phân số**\nChia cả tử và mẫu cho $15$:\n$\\dfrac{45 : 15}{60 : 15} = \\dfrac{3}{4}$.\nVậy phân số tối giản là $\\dfrac{3}{4}$.' },
    { cat: id7, code: 'T6-B7-NEW4', content: 'Tìm số tự nhiên $x$ lớn nhất biết rằng $120 \\,\\vdots\\, x$ và $150 \\,\\vdots\\, x$.', answer: '$x = 30$.', solution: 'Vì $120 \\,\\vdots\\, x$ và $150 \\,\\vdots\\, x$ nên $x$ là ước chung của $120$ và $150$.\nMặt khác, đề bài yêu cầu $x$ là số tự nhiên lớn nhất.\nSuy ra $x$ chính là $\\text{ƯCLN}(120, 150)$.\n\nPhân tích:\n$120 = 2^3 \\times 3 \\times 5$\n$150 = 2 \\times 3 \\times 5^2$\n$\\text{ƯCLN}(120, 150) = 2 \\times 3 \\times 5 = 30$.\nVậy $x = 30$.' },
    { cat: id7, code: 'T6-B7-NEW5', content: 'Đội văn nghệ có $60$ nam và $72$ nữ được chia thành các nhóm sao cho số nam và nữ ở các nhóm đều nhau. Hỏi có thể chia nhiều nhất bao nhiêu nhóm?', answer: 'Chia nhiều nhất $12$ nhóm.', solution: 'Số nhóm nhiều nhất có thể chia chính là $\\text{ƯCLN}(60, 72)$.\nPhân tích ra thừa số nguyên tố:\n$60 = 2^2 \\times 3 \\times 5$\n$72 = 2^3 \\times 3^2$\n$\\text{ƯCLN}(60, 72) = 2^2 \\times 3 = 4 \\times 3 = 12$.\nVậy có thể chia nhiều nhất thành $12$ nhóm.' }
  );

  // Grade 6: Bội chung và Bội chung nhỏ nhất (BCNN)
  allQS.push(
    { cat: id8, code: 'T6-B8-NEW1', content: 'Tìm BCNN của $15, 20$ và $30$.', answer: '$\\text{BCNN}(15, 20, 30) = 60$.', solution: '**Bước 1: Phân tích các số ra thừa số nguyên tố**\n$15 = 3 \\times 5$\n$20 = 2^2 \\times 5$\n$30 = 2 \\times 3 \\times 5$\n\n**Bước 2: Tìm BCNN**\nCác thừa số nguyên tố chung và riêng là $2, 3, 5$.\nLấy số mũ lớn nhất của mỗi thừa số:\n- Của $2$ là $2$\n- Của $3$ là $1$\n- Của $5$ là $1$\n$\\text{BCNN}(15, 20, 30) = 2^2 \\times 3 \\times 5 = 4 \\times 3 \\times 5 = 60$.' },
    { cat: id8, code: 'T6-B8-NEW2', content: 'Số học sinh của lớp 6A khi xếp hàng $3$, hàng $4$, hàng $6$ đều vừa đủ hàng. Biết số học sinh trong khoảng từ $30$ đến $40$. Tính số học sinh của lớp 6A.', answer: '$36$ học sinh.', solution: '**Bước 1: Lập luận**\nVì xếp hàng $3, 4, 6$ đều vừa đủ nên số học sinh lớp 6A là Bội chung (BC) của $3, 4, 6$.\n\n**Bước 2: Tìm BCNN**\n$3 = 3$\n$4 = 2^2$\n$6 = 2 \\times 3$\n$\\text{BCNN}(3, 4, 6) = 2^2 \\times 3 = 12$.\n\n**Bước 3: Tìm Bội chung thỏa mãn điều kiện**\nCác Bội chung của $3, 4, 6$ là: $B(12) = \\{0; 12; 24; 36; 48; ...\\}$.\nVì số học sinh nằm trong khoảng từ $30$ đến $40$, nên số học sinh thỏa mãn là $36$.\n\n**Kết luận:** Lớp 6A có $36$ học sinh.' },
    { cat: id8, code: 'T6-B8-NEW3', content: 'Hai bạn An và Bình cùng trực nhật vào một ngày. Biết rằng An cứ $6$ ngày trực nhật một lần, Bình cứ $8$ ngày trực nhật một lần. Hỏi sau ít nhất bao nhiêu ngày thì hai bạn lại cùng trực nhật?', answer: 'Sau ít nhất $24$ ngày.', solution: 'Số ngày ít nhất để hai bạn cùng trực nhật lại chính là Bội chung nhỏ nhất (BCNN) của chu kỳ trực nhật của từng bạn (tức là $6$ và $8$).\n\nPhân tích:\n$6 = 2 \\times 3$\n$8 = 2^3$\n\nTìm BCNN:\n$\\text{BCNN}(6, 8) = 2^3 \\times 3 = 8 \\times 3 = 24$.\nVậy sau ít nhất $24$ ngày thì hai bạn lại cùng trực nhật.' },
    { cat: id8, code: 'T6-B8-NEW4', content: 'Quy đồng mẫu số của hai phân số $\\dfrac{5}{12}$ và $\\dfrac{7}{18}$ bằng cách tìm Mẫu số chung nhỏ nhất.', answer: '$\\dfrac{15}{36}$ và $\\dfrac{14}{36}$.', solution: '**Bước 1: Tìm Mẫu số chung nhỏ nhất (chính là BCNN của $12$ và $18$)**\n$12 = 2^2 \\times 3$\n$18 = 2 \\times 3^2$\n$\\text{BCNN}(12, 18) = 2^2 \\times 3^2 = 4 \\times 9 = 36$.\n\n**Bước 2: Quy đồng**\n- Phân số thứ nhất: $\\dfrac{5}{12} = \\dfrac{5 \\times 3}{12 \\times 3} = \\dfrac{15}{36}$.\n- Phân số thứ hai: $\\dfrac{7}{18} = \\dfrac{7 \\times 2}{18 \\times 2} = \\dfrac{14}{36}$.' },
    { cat: id8, code: 'T6-B8-NEW5', content: 'Một số sách nếu xếp thành từng bó $10$ quyển, $12$ quyển hay $15$ quyển đều dư $2$ quyển. Tính số sách đó, biết số sách nằm trong khoảng từ $100$ đến $150$ quyển.', answer: '$122$ quyển.', solution: '**Bước 1: Lập luận**\nGọi số sách là $x$ ($100 \\leq x \\leq 150$).\nVì xếp thành bó $10, 12, 15$ đều dư $2$ quyển nên $(x - 2)$ sẽ chia hết cho $10, 12$ và $15$.\nDo đó, $(x - 2)$ là Bội chung của $10, 12, 15$.\n\n**Bước 2: Tìm BCNN**\n$10 = 2 \\times 5$\n$12 = 2^2 \\times 3$\n$15 = 3 \\times 5$\n$\\text{BCNN}(10, 12, 15) = 2^2 \\times 3 \\times 5 = 60$.\n\n**Bước 3: Tìm x**\nBội chung của $10, 12, 15$ là các số: $0, 60, 120, 180, ...$\nTa có: $(x - 2) \\in \\{0; 60; 120; 180; ...\\}$.\nSuy ra: $x \\in \\{2; 62; 122; 182; ...\\}$.\nVì $100 \\leq x \\leq 150$ nên $x = 122$.\n\n**Kết luận:** Số sách đó là $122$ quyển.' }
  );

  console.log(`Inserting ${allQS.length} new questions for Grade 6 (UCLN, BCNN)...`);

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
