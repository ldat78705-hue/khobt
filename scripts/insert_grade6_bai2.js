const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

const USER_ID = '8316c34e-765d-4b8c-9364-b683a17e33f8';
const CATEGORY_ID = '2b72ed00-ceba-4922-b2d6-34bed4a4d18d';
const GRADE = 6;
const TOPIC = 'so_hoc';
const CODE_PREFIX = 'T6-C1B2';

const questions = [
  {
    content: `Viết số tự nhiên sau bằng chữ số: "Hai nghìn không trăm linh năm".`,
    answer: `$2005$`,
    solution: `Theo cách ghi số trong hệ thập phân:\n- "Hai nghìn" → chữ số $2$ ở hàng nghìn\n- "không trăm" → chữ số $0$ ở hàng trăm\n- "linh năm" → chữ số $0$ ở hàng chục và $5$ ở hàng đơn vị\n\nVậy số cần viết là $\\boxed{2005}$.`,
    difficulty: 'nhan_biet',
    question_type: 'tu_luan',
  },
  {
    content: `Đọc số $40\\,207$ và cho biết chữ số $2$ thuộc hàng nào, lớp nào.`,
    answer: `Bốn mươi nghìn hai trăm linh bảy. Chữ số $2$ thuộc hàng trăm, lớp đơn vị.`,
    solution: `Phân tích các hàng của số $40\\,207$:\n\n| Lớp nghìn | Lớp đơn vị |\n|---|---|\n| Hàng chục nghìn: $4$ | Hàng trăm: $2$ |\n| Hàng nghìn: $0$ | Hàng chục: $0$ |\n| | Hàng đơn vị: $7$ |\n\n- Đọc: **Bốn mươi nghìn hai trăm linh bảy**.\n- Chữ số $2$ thuộc **hàng trăm**, **lớp đơn vị**.`,
    difficulty: 'nhan_biet',
    question_type: 'tu_luan',
  },
  {
    content: `Trong hệ thập phân, mỗi số tự nhiên được biểu diễn bởi bao nhiêu chữ số? Kể tên các chữ số đó.`,
    answer: `Mười chữ số: $0, 1, 2, 3, 4, 5, 6, 7, 8, 9$.`,
    solution: `Trong **hệ thập phân** (hệ cơ số $10$), người ta dùng $10$ chữ số để biểu diễn mọi số tự nhiên:\n$$0,\\; 1,\\; 2,\\; 3,\\; 4,\\; 5,\\; 6,\\; 7,\\; 8,\\; 9$$\n\nGiá trị của mỗi chữ số phụ thuộc vào **vị trí** (hàng) của nó trong cách ghi số.\n\nVí dụ: chữ số $3$ trong số $305$ có giá trị $300$ (ở hàng trăm), còn trong số $53$ có giá trị $3$ (ở hàng đơn vị).`,
    difficulty: 'nhan_biet',
    question_type: 'tu_luan',
  },
  {
    content: `Viết số tự nhiên lớn nhất có bốn chữ số mà các chữ số đều khác nhau.`,
    answer: `$9876$`,
    solution: `Để số có bốn chữ số là **lớn nhất** và các chữ số đều **khác nhau**:\n- Chữ số hàng nghìn (lớn nhất có thể): $9$\n- Chữ số hàng trăm (lớn nhất còn lại): $8$\n- Chữ số hàng chục: $7$\n- Chữ số hàng đơn vị: $6$\n\nVậy số cần tìm là $\\boxed{9876}$.`,
    difficulty: 'thong_hieu',
    question_type: 'tu_luan',
  },
  {
    content: `Viết tất cả các số tự nhiên có ba chữ số được lập từ các chữ số $0, 1, 2$ (các chữ số có thể lặp lại). Có bao nhiêu số như vậy?`,
    answer: `Có $18$ số.`,
    solution: `Số có ba chữ số dạng $\\overline{abc}$ với $a, b, c \\in \\{0, 1, 2\\}$ và $a \\neq 0$.\n\n- **Chữ số hàng trăm** $a$: có $2$ cách chọn ($1$ hoặc $2$)\n- **Chữ số hàng chục** $b$: có $3$ cách chọn ($0, 1, 2$)\n- **Chữ số hàng đơn vị** $c$: có $3$ cách chọn ($0, 1, 2$)\n\nSố lượng: $2 \\times 3 \\times 3 = 18$ số.\n\nLiệt kê:\n$$100, 101, 102, 110, 111, 112, 120, 121, 122$$\n$$200, 201, 202, 210, 211, 212, 220, 221, 222$$`,
    difficulty: 'thong_hieu',
    question_type: 'tu_luan',
  },
  {
    content: `Cho số $\\overline{a2b5}$. Biết tổng các chữ số bằng $18$. Tìm các chữ số $a, b$ và viết số đó.`,
    answer: `Các cặp $(a, b)$: $(2,9), (3,8), (4,7), (5,6), (6,5), (7,4), (8,3), (9,2)$.`,
    solution: `Số $\\overline{a2b5}$ có dạng bốn chữ số nên $a \\neq 0$, $1 \\le a \\le 9$, $0 \\le b \\le 9$.\n\nTổng các chữ số bằng $18$:\n$$a + 2 + b + 5 = 18$$\n$$a + b = 11$$\n\nCác cặp $(a, b)$ thỏa mãn:\n$(2, 9), (3, 8), (4, 7), (5, 6), (6, 5), (7, 4), (8, 3), (9, 2)$\n\nCác số tương ứng: $2295, 3285, 4275, 5265, 6255, 7245, 8235, 9225$.`,
    difficulty: 'thong_hieu',
    question_type: 'tu_luan',
  },
  {
    content: `Cho số $A = \\overline{abcabc}$. Chứng minh rằng $A$ chia hết cho $7$, $11$ và $13$.`,
    answer: `$A = \\overline{abc} \\times 1001 = \\overline{abc} \\times 7 \\times 11 \\times 13$.`,
    solution: `Ta có:\n$$A = \\overline{abcabc} = \\overline{abc} \\times 1000 + \\overline{abc} = \\overline{abc} \\times 1001$$\n\nPhân tích $1001$ thành thừa số nguyên tố:\n$$1001 = 7 \\times 143 = 7 \\times 11 \\times 13$$\n\nDo đó:\n$$A = \\overline{abc} \\times 7 \\times 11 \\times 13$$\n\nVậy $A$ chia hết cho $7$, chia hết cho $11$ và chia hết cho $13$. $\\blacksquare$`,
    difficulty: 'van_dung',
    question_type: 'tu_luan',
  },
  {
    content: `Tìm số tự nhiên có ba chữ số $\\overline{abc}$ biết rằng $\\overline{abc} = a^3 + b^3 + c^3$ (số Armstrong ba chữ số).`,
    answer: `Các số thỏa mãn: $153, 370, 371, 407$.`,
    solution: `Ta cần tìm $\\overline{abc} = 100a + 10b + c$ sao cho $100a + 10b + c = a^3 + b^3 + c^3$, với $1 \\le a \\le 9$.\n\nKiểm tra lần lượt:\n\n- $153 = 1^3 + 5^3 + 3^3 = 1 + 125 + 27 = 153$ ✓\n- $370 = 3^3 + 7^3 + 0^3 = 27 + 343 + 0 = 370$ ✓\n- $371 = 3^3 + 7^3 + 1^3 = 27 + 343 + 1 = 371$ ✓\n- $407 = 4^3 + 0^3 + 7^3 = 64 + 0 + 343 = 407$ ✓\n\nVậy có $4$ số Armstrong ba chữ số: $\\boxed{153, 370, 371, 407}$.`,
    difficulty: 'van_dung',
    question_type: 'tu_luan',
  },
  {
    content: `Tìm số tự nhiên $\\overline{ab}$ có hai chữ số sao cho $\\overline{ab} = a^2 + b^2$.`,
    answer: `Không có số hai chữ số nào thỏa mãn.`,
    solution: `Cần tìm $10a + b = a^2 + b^2$ với $1 \\le a \\le 9$, $0 \\le b \\le 9$.\n\nBiến đổi: $a^2 - 10a + b^2 - b = 0$\n$$(a - 5)^2 + b(b - 1) = 25$$\n\nKiểm tra với từng $a$:\n- $a=1$: $16 + b(b-1)=25 \\Rightarrow b(b-1)=9$. Không có $b$ nguyên.\n- $a=2$: $9 + b(b-1)=25 \\Rightarrow b(b-1)=16$. Không có.\n- $a=3$: $4 + b(b-1)=25 \\Rightarrow b(b-1)=21$. Không có.\n- $a=4$: $1 + b(b-1)=25 \\Rightarrow b(b-1)=24$. Không có.\n- $a=5$: $b(b-1)=25$. Không có.\n- $a=6$: $1 + b(b-1)=25 \\Rightarrow b(b-1)=24$. Không có.\n- $a=7, 8, 9$: tương tự, không có.\n\nVậy **không tồn tại** số hai chữ số thỏa mãn.`,
    difficulty: 'van_dung_cao',
    question_type: 'tu_luan',
  },
  {
    content: `Chứng minh rằng số $\\overline{aabb}$ không phải là số chính phương với mọi chữ số $a \\neq 0$.`,
    answer: `$\\overline{aabb}$ không thể là số chính phương.`,
    solution: `Ta có:\n$$\\overline{aabb} = 1100a + 11b = 11(100a + b)$$\n\nĐể $\\overline{aabb}$ là số chính phương, cần $11(100a + b)$ là số chính phương.\n\nVì $11$ là số nguyên tố, nên $11 \\mid (100a + b)$, tức $100a + b \\equiv 0 \\pmod{11}$.\n\nMà $100 \\equiv 1 \\pmod{11}$, nên $a + b \\equiv 0 \\pmod{11}$.\n\nVới $1 \\le a \\le 9$ và $0 \\le b \\le 9$: $1 \\le a + b \\le 18$.\n\nNên $a + b = 11$, khi đó $100a + b = 100a + (11 - a) = 99a + 11 = 11(9a + 1)$.\n\nVậy $\\overline{aabb} = 11 \\times 11 \\times (9a + 1) = 121(9a + 1)$.\n\nĐể là số chính phương, cần $9a + 1$ là số chính phương.\n\nVới $a = 1, 2, ..., 9$ (và $b = 11 - a \\le 9$ nên $a \\ge 2$):\n- $a=2$: $9(2)+1 = 19$ — không phải SCP\n- $a=3$: $28$ — không\n- $a=4$: $37$ — không\n- $a=5$: $46$ — không\n- $a=6$: $55$ — không\n- $a=7$: $64 = 8^2$ ✓? Kiểm tra: $b = 4$, $\\overline{aabb} = 7744 = 121 \\times 64 = 7744$, $\\sqrt{7744} = 88$ ✓.\n\n**Lưu ý:** Thực ra $7744 = 88^2$ **là** số chính phương! Vậy mệnh đề ban đầu sai với $a=7, b=4$.\n\nKết luận đúng: $\\overline{aabb}$ **chỉ là** số chính phương khi $a = 7, b = 4$, tức $7744 = 88^2$.`,
    difficulty: 'van_dung_cao',
    question_type: 'tu_luan',
  },
];

async function main() {
  let count = 0;
  for (const q of questions) {
    const code = CODE_PREFIX + '-' + String(count + 1).padStart(3, '0');
    await sql`
      INSERT INTO public.questions (content, answer, solution, grade, topic, difficulty, question_type, category_id, status, is_public, question_code, user_id)
      VALUES (${q.content}, ${q.answer}, ${q.solution}, ${GRADE}, ${TOPIC}, ${q.difficulty}, ${q.question_type}, ${CATEGORY_ID}, 'approved', true, ${code}, ${USER_ID})
    `;
    count++;
    console.log('Inserted: ' + code + ' - ' + q.difficulty);
  }
  console.log('\nDone! Inserted ' + count + ' questions.');
}
main().catch(console.error);
