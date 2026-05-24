const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const crypto = require('crypto');

async function main() {
  const cats = await sql`
    SELECT id, name FROM public.categories 
    WHERE grade = 5 AND (
      name LIKE '%Bài 8%' OR 
      name LIKE '%Bài 9%' OR 
      name LIKE '%Bài 10%' OR 
      name LIKE '%Bài 11%'
    )
  `;
  
  const id8 = cats.find(c => c.name.includes('Bài 8'))?.id;
  const id9 = cats.find(c => c.name.includes('Bài 9'))?.id;
  const id10 = cats.find(c => c.name.includes('Bài 10'))?.id;
  const id11 = cats.find(c => c.name.includes('Bài 11'))?.id;

  if (!id8 || !id9 || !id10 || !id11) {
    console.log('Categories not found!');
    return;
  }

  const grade = 5;
  const user_id = '8316c34e-765d-4b8c-9364-b683a17e33f8';
  let allQS = [];

  // Bài 8
  allQS.push(
    { cat: id8, code: 'T5-B8-NEW1', content: 'Viết các phân số thập phân $\\dfrac{7}{10}$ và $\\dfrac{45}{100}$ dưới dạng số thập phân.', answer: '$0,7$ và $0,45$.', solution: 'Phân số thập phân $\\dfrac{7}{10}$ có $1$ chữ số $0$ ở mẫu số nên phần thập phân có $1$ chữ số. Ta viết được $0,7$.\nPhân số thập phân $\\dfrac{45}{100}$ có $2$ chữ số $0$ ở mẫu số nên phần thập phân có $2$ chữ số. Ta viết được $0,45$.' },
    { cat: id8, code: 'T5-B8-NEW2', content: 'Viết hỗn số $3 \\dfrac{5}{10}$ và $12 \\dfrac{8}{100}$ dưới dạng số thập phân.', answer: '$3,5$ và $12,08$.', solution: 'Với hỗn số $3 \\dfrac{5}{10}$, phần nguyên là $3$, phần phân số là $\\dfrac{5}{10}$ (bằng $0,5$). Ta ghép lại được $3,5$.\nVới hỗn số $12 \\dfrac{8}{100}$, phần nguyên là $12$, phần phân số là $\\dfrac{8}{100}$ (bằng $0,08$). Ta ghép lại được $12,08$.' },
    { cat: id8, code: 'T5-B8-NEW3', content: 'Đổi số đo chiều dài $5$ dm thành mét (viết dưới dạng phân số thập phân và số thập phân).', answer: '$\\dfrac{5}{10}$ m và $0,5$ m.', solution: 'Ta có $1$ m = $10$ dm. Do đó $1$ dm = $\\dfrac{1}{10}$ m.\nSuy ra $5$ dm = $\\dfrac{5}{10}$ m.\nViết dưới dạng số thập phân: $\\dfrac{5}{10}$ m = $0,5$ m.' },
    { cat: id8, code: 'T5-B8-NEW4', content: 'Biểu diễn số thập phân $0,7$ và $0,25$ thành phân số thập phân.', answer: '$\\dfrac{7}{10}$ và $\\dfrac{25}{100}$.', solution: 'Số thập phân $0,7$ có $1$ chữ số sau dấu phẩy, nên ta viết thành phân số thập phân có mẫu số là $10$: $\\dfrac{7}{10}$.\nSố thập phân $0,25$ có $2$ chữ số sau dấu phẩy, nên ta viết thành phân số thập phân có mẫu số là $100$: $\\dfrac{25}{100}$.' },
    { cat: id8, code: 'T5-B8-NEW5', content: 'Một số gồm có phần nguyên là $4$, phần thập phân là ba mươi lăm phần trăm được viết như thế nào?', answer: '$4,35$.', solution: 'Phần nguyên được viết trước dấu phẩy, ta có chữ số $4$.\nDấu phẩy ngăn cách phần nguyên và phần thập phân.\nPhần thập phân là ba mươi lăm phần trăm (tức là $\\dfrac{35}{100}$ hay $0,35$), ta viết ngay sau dấu phẩy là $35$.\nKết quả ta được số $4,35$.' }
  );

  // Bài 9
  allQS.push(
    { cat: id9, code: 'T5-B9-NEW1', content: 'Nêu giá trị của chữ số $5$ trong các số thập phân sau: $14,56$ ; $3,052$ ; $52,19$.', answer: '$\\dfrac{5}{10}$, $\\dfrac{5}{100}$, $50$.', solution: 'Xét vị trí của chữ số $5$ trong từng số:\n- Trong số $14,56$: Chữ số $5$ nằm ở hàng phần mười, giá trị là $\\dfrac{5}{10}$ (hay $0,5$).\n- Trong số $3,052$: Chữ số $5$ nằm ở hàng phần trăm, giá trị là $\\dfrac{5}{100}$ (hay $0,05$).\n- Trong số $52,19$: Chữ số $5$ nằm ở hàng chục, giá trị là $50$.' },
    { cat: id9, code: 'T5-B9-NEW2', content: 'Đọc các số thập phân sau: $105,203$ và $0,089$.', answer: 'Xem lời giải.', solution: 'Khi đọc số thập phân, ta đọc phần nguyên trước, đọc dấu "phẩy", rồi đọc phần thập phân.\n- $105,203$: Một trăm linh năm phẩy hai trăm linh ba.\n- $0,089$: Không phẩy không trăm tám mươi chín.' },
    { cat: id9, code: 'T5-B9-NEW3', content: 'Viết số thập phân gồm: hai mươi bốn đơn vị, một phần mười, tám phần trăm.', answer: '$24,18$.', solution: 'Phần nguyên là "hai mươi bốn", ta viết $24$.\nPhần thập phân bắt đầu từ hàng phần mười là $1$, hàng phần trăm là $8$.\nGhép lại ta viết được số thập phân là $24,18$.' },
    { cat: id9, code: 'T5-B9-NEW4', content: 'Viết số thập phân gồm: không đơn vị, bốn phần trăm, ba phần nghìn.', answer: '$0,043$.', solution: 'Phần nguyên là "không", ta viết chữ số $0$ và đặt dấu phẩy.\nỞ phần thập phân, đề bài không nhắc đến hàng phần mười, nên chữ số hàng phần mười là $0$.\nHàng phần trăm là $4$, hàng phần nghìn là $3$.\nGhép lại ta được số $0,043$.' },
    { cat: id9, code: 'T5-B9-NEW5', content: 'Từ các chữ số $0, 1, 3, 5$, hãy viết số thập phân lớn nhất có một chữ số ở phần nguyên và ba chữ số ở phần thập phân (các chữ số khác nhau).', answer: '$5,310$.', solution: 'Để số thập phân là lớn nhất, chữ số ở phần nguyên (hàng cao nhất) phải lớn nhất. Trong các chữ số $0, 1, 3, 5$, chữ số lớn nhất là $5$.\nPhần thập phân có $3$ chữ số, để số thập phân lớn nhất thì các chữ số phần thập phân cũng phải được sắp xếp theo thứ tự giảm dần từ trái qua phải.\nCác chữ số còn lại là $3, 1, 0$.\nVậy số thập phân lớn nhất lập được là $5,310$.' }
  );

  // Bài 10
  allQS.push(
    { cat: id10, code: 'T5-B10-NEW1', content: 'Viết ba số thập phân bằng với số $12,5$.', answer: '$12,50$ ; $12,500$ ; $12,5000$.', solution: 'Theo quy tắc: "Nếu viết thêm chữ số $0$ vào tận cùng bên phải phần thập phân của một số thập phân thì được một số thập phân bằng nó".\nTa viết thêm lần lượt một, hai, ba chữ số $0$ vào sau số $12,5$ ta được:\n$12,50$\n$12,500$\n$12,5000$' },
    { cat: id10, code: 'T5-B10-NEW2', content: 'Bỏ các chữ số $0$ ở tận cùng bên phải phần thập phân để các số sau viết gọn hơn: $3,500$ ; $14,020$ ; $0,8000$.', answer: '$3,5$ ; $14,02$ ; $0,8$.', solution: 'Theo quy tắc: "Nếu một số thập phân có chữ số $0$ ở tận cùng bên phải phần thập phân thì khi bỏ chữ số $0$ đó đi, ta được một số thập phân bằng nó".\n- $3,500$ bỏ hai số $0$ tận cùng thành $3,5$.\n- $14,020$ bỏ một số $0$ tận cùng thành $14,02$.\n- $0,8000$ bỏ ba số $0$ tận cùng thành $0,8$.' },
    { cat: id10, code: 'T5-B10-NEW3', content: 'Hãy thêm chữ số $0$ vào bên phải phần thập phân để các số sau có $3$ chữ số ở phần thập phân: $4,5$ ; $24,12$ ; $100$.', answer: '$4,500$ ; $24,120$ ; $100,000$.', solution: '- Số $4,5$ có $1$ chữ số ở phần thập phân, cần thêm hai chữ số $0$ thành $4,500$.\n- Số $24,12$ có $2$ chữ số ở phần thập phân, cần thêm một chữ số $0$ thành $24,120$.\n- Số tự nhiên $100$ có thể hiểu là $100,0$. Thêm ba chữ số $0$ thành $100,000$.' },
    { cat: id10, code: 'T5-B10-NEW4', content: 'Bạn Lan viết: $0,5 = \\dfrac{5}{10} = \\dfrac{50}{100} = 0,50$. Hỏi bạn Lan viết đúng hay sai? Hãy giải thích.', answer: 'Viết đúng.', solution: 'Bạn Lan viết đúng.\nVì $\\dfrac{5}{10}$ nhân cả tử và mẫu với $10$ sẽ được $\\dfrac{50}{100}$.\nMà $0,5 = \\dfrac{5}{10}$ và $0,50 = \\dfrac{50}{100}$. Do đó $0,5 = 0,50$.\nĐiều này hoàn toàn phù hợp với tính chất của số thập phân bằng nhau (thêm số $0$ vào cuối phần thập phân).' },
    { cat: id10, code: 'T5-B10-NEW5', content: 'Tìm số thập phân $y$ bằng $4,12$ sao cho $y$ có đúng $4$ chữ số ở phần thập phân.', answer: '$y = 4,1200$.', solution: 'Số ban đầu là $4,12$ (có $2$ chữ số ở phần thập phân).\nĐể có $4$ chữ số ở phần thập phân mà giá trị không thay đổi, ta cần viết thêm hai chữ số $0$ vào tận cùng bên phải của phần thập phân.\nKhi đó ta được số: $4,1200$.\nVậy $y = 4,1200$.' }
  );

  // Bài 11
  allQS.push(
    { cat: id11, code: 'T5-B11-NEW1', content: 'So sánh hai số thập phân: $45,89$ và $45,9$.', answer: '$45,89 < 45,9$.', solution: 'Hai số có phần nguyên bằng nhau (đều là $45$). Ta so sánh phần thập phân.\nỞ hàng phần mười, số $45,89$ có chữ số $8$, còn số $45,9$ có chữ số $9$.\nVì $8 < 9$ nên $45,89 < 45,9$.\n*(Hoặc có thể viết $45,9 = 45,90$, sau đó so sánh $45,89$ và $45,90$, thấy $89 < 90$ nên $45,89 < 45,90$).*' },
    { cat: id11, code: 'T5-B11-NEW2', content: 'Sắp xếp các số thập phân sau theo thứ tự từ bé đến lớn: $3,45$ ; $3,054$ ; $3,54$ ; $3,405$.', answer: '$3,054 < 3,405 < 3,45 < 3,54$.', solution: 'Tất cả các số đều có phần nguyên là $3$. Ta xét phần thập phân, từ trái sang phải:\n- Hàng phần mười: $3,054$ có chữ số $0$ nhỏ nhất nên nó là số bé nhất.\n- Tiếp theo xét $3,45$ và $3,405$ (đều có hàng phần mười là $4$). Xét sang hàng phần trăm: $3,405$ có chữ số $0$, còn $3,45$ có chữ số $5$. Vì $0 < 5$ nên $3,405 < 3,45$.\n- Số còn lại $3,54$ có hàng phần mười là $5$ (lớn nhất) nên nó lớn nhất.\nThứ tự từ bé đến lớn là: $3,054 < 3,405 < 3,45 < 3,54$.' },
    { cat: id11, code: 'T5-B11-NEW3', content: 'Tìm chữ số $x$ biết: $9,7x8 < 9,718$.', answer: '$x = 0$.', solution: 'Hai số có phần nguyên là $9$ bằng nhau, chữ số hàng phần mười là $7$ bằng nhau.\nĐể $9,7x8 < 9,718$, chữ số hàng phần trăm $x$ phải nhỏ hơn hoặc bằng chữ số $1$.\nNghĩa là $x = 0$ hoặc $x = 1$.\n- Nếu $x = 1$, ta có $9,718 < 9,718$ (sai).\n- Nếu $x = 0$, ta có $9,708 < 9,718$ (đúng).\nVậy chữ số cần tìm là $x = 0$.' },
    { cat: id11, code: 'T5-B11-NEW4', content: 'Tìm hai số tự nhiên liên tiếp $a$ và $b$ sao cho: $a < 12,34 < b$.', answer: '$a = 12, b = 13$.', solution: 'Số $12,34$ có phần nguyên là $12$ và phần thập phân là $0,34$.\nDo đó, $12 < 12,34 < 13$.\nVì $a$ và $b$ là hai số tự nhiên liên tiếp nên $a = 12$ và $b = 13$.' },
    { cat: id11, code: 'T5-B11-NEW5', content: 'Mẹ mua $1$ kg cam với giá $25,5$ nghìn đồng, $1$ kg táo với giá $25,45$ nghìn đồng. Hỏi loại quả nào đắt tiền hơn?', answer: 'Cam đắt tiền hơn.', solution: 'Ta cần so sánh hai số thập phân $25,5$ và $25,45$.\nHai số có phần nguyên bằng nhau (là $25$).\nXét chữ số hàng phần mười: số $25,5$ có chữ số $5$, số $25,45$ có chữ số $4$.\nVì $5 > 4$ nên $25,5 > 25,45$.\nVậy $1$ kg cam có giá tiền cao hơn $1$ kg táo, hay cam đắt hơn.' }
  );

  console.log(`Inserting ${allQS.length} new questions for Chapter 2...`);

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
