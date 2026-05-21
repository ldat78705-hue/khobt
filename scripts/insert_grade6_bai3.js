const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

const USER_ID = '8316c34e-765d-4b8c-9364-b683a17e33f8';
const CATEGORY_ID = 'b89132d0-27fb-481b-a80b-7fecf91d1107';
const GRADE = 6;
const TOPIC = 'so_hoc';
const CODE_PREFIX = 'T6-C1B3';

const questions = [
  {
    content: `Sắp xếp các số sau theo thứ tự tăng dần: $2024;\\; 2042;\\; 2004;\\; 2204$.`,
    answer: `$2004 < 2024 < 2042 < 2204$.`,
    solution: `So sánh các số tự nhiên cùng có bốn chữ số, ta so từ hàng nghìn:\n- Hàng nghìn đều bằng $2$.\n- So hàng trăm: $2004$ và $2024$ và $2042$ có hàng trăm $= 0$; $2204$ có hàng trăm $= 2$. Nên $2204$ lớn nhất.\n- Với $2004, 2024, 2042$: so hàng chục: $0 < 2 < 4$.\n\nVậy: $\\boxed{2004 < 2024 < 2042 < 2204}$.`,
    difficulty: 'nhan_biet',
    question_type: 'tu_luan',
  },
  {
    content: `Tìm số tự nhiên $x$ biết $125 < x < 127$.`,
    answer: `$x = 126$.`,
    solution: `Vì $x$ là số tự nhiên và $125 < x < 127$, nên $x$ là số tự nhiên nằm giữa $125$ và $127$.\n\nSố tự nhiên liên tiếp sau $125$ là $126$. Kiểm tra: $125 < 126 < 127$ ✓.\n\nVậy $x = \\boxed{126}$.`,
    difficulty: 'nhan_biet',
    question_type: 'tu_luan',
  },
  {
    content: `Cho tập hợp $A = \\{x \\in \\mathbb{N} \\mid 5 \\le x \\le 10\\}$. Liệt kê các phần tử của tập hợp $A$.`,
    answer: `$A = \\{5;\\; 6;\\; 7;\\; 8;\\; 9;\\; 10\\}$.`,
    solution: `Tập hợp $A$ gồm các số tự nhiên $x$ thỏa mãn $5 \\le x \\le 10$.\n\nLiệt kê: $x$ nhận các giá trị $5, 6, 7, 8, 9, 10$.\n\nVậy $A = \\{5;\\; 6;\\; 7;\\; 8;\\; 9;\\; 10\\}$.`,
    difficulty: 'nhan_biet',
    question_type: 'tu_luan',
  },
  {
    content: `Tìm số tự nhiên $x$ lớn nhất sao cho $x < 2024$.`,
    answer: `$x = 2023$.`,
    solution: `Vì $x$ là số tự nhiên và $x < 2024$, ta cần tìm số tự nhiên lớn nhất nhỏ hơn $2024$.\n\nSố tự nhiên liền trước $2024$ là $2024 - 1 = 2023$.\n\nKiểm tra: $2023 < 2024$ ✓ và không có số tự nhiên nào nằm giữa $2023$ và $2024$.\n\nVậy $x = \\boxed{2023}$.`,
    difficulty: 'thong_hieu',
    question_type: 'tu_luan',
  },
  {
    content: `Tìm tất cả số tự nhiên $x$ sao cho $2x + 1 < 12$.`,
    answer: `$x \\in \\{0;\\; 1;\\; 2;\\; 3;\\; 4;\\; 5\\}$.`,
    solution: `Ta có: $2x + 1 < 12$\n$$2x < 11$$\n$$x < 5{,}5$$\n\nVì $x$ là số tự nhiên nên $x \\in \\{0;\\; 1;\\; 2;\\; 3;\\; 4;\\; 5\\}$.\n\nKiểm tra: $x = 5 \\Rightarrow 2(5)+1 = 11 < 12$ ✓; $x = 6 \\Rightarrow 2(6)+1 = 13 \\not< 12$ ✗.`,
    difficulty: 'thong_hieu',
    question_type: 'tu_luan',
  },
  {
    content: `Cho các số $A = 3^{10}$, $B = 5^7$, $C = 2^{15}$. So sánh $A$, $B$, $C$.`,
    answer: `$C < A < B$.`,
    solution: `Ta so sánh bằng cách đưa về cùng số mũ:\n\n- $A = 3^{10} = (3^2)^5 = 9^5$\n- $B = 5^7$: khó so trực tiếp, ta tính:\n  - $3^{10} = 59\\,049$\n  - $5^7 = 78\\,125$\n  - $2^{15} = 32\\,768$\n\nSo sánh: $32\\,768 < 59\\,049 < 78\\,125$.\n\nVậy $C < A < B$, tức $\\boxed{2^{15} < 3^{10} < 5^7}$.`,
    difficulty: 'thong_hieu',
    question_type: 'tu_luan',
  },
  {
    content: `Tìm số tự nhiên có ba chữ số nhỏ nhất sao cho tổng các chữ số bằng $20$.`,
    answer: `$299$.`,
    solution: `Gọi số cần tìm là $\\overline{abc}$ với $1 \\le a \\le 9$, $0 \\le b, c \\le 9$ và $a + b + c = 20$.\n\nĐể $\\overline{abc}$ nhỏ nhất, ta cần $a$ nhỏ nhất, rồi $b$ nhỏ nhất.\n\n- $a = 2$: $b + c = 18$. Vì $b, c \\le 9$ nên $b = c = 9$. Số là $299$.\n- $a = 1$: $b + c = 19$. Tối đa $b + c = 9 + 9 = 18 < 19$. Không thỏa mãn.\n\nVậy số cần tìm là $\\boxed{299}$.`,
    difficulty: 'van_dung',
    question_type: 'tu_luan',
  },
  {
    content: `Có bao nhiêu số tự nhiên có ba chữ số mà chữ số hàng trăm lớn hơn chữ số hàng chục và chữ số hàng chục lớn hơn chữ số hàng đơn vị?`,
    answer: `$120$ số.`,
    solution: `Gọi số cần tìm là $\\overline{abc}$ với $a > b > c$ và $1 \\le a \\le 9$, $0 \\le b, c \\le 9$.\n\nĐiều kiện $a > b > c \\ge 0$ với $a \\ge 1$.\n\nTa cần chọn $3$ chữ số **khác nhau** từ $\\{0, 1, 2, ..., 9\\}$ rồi sắp giảm dần.\n\nMỗi bộ $3$ chữ số khác nhau cho đúng $1$ cách sắp giảm. Nhưng cần $a \\ge 1$, tức chữ số lớn nhất $\\ge 1$ (luôn đúng vì chọn 3 số khác nhau từ $\\{0,...,9\\}$ thì số lớn nhất $\\ge 2$).\n\nSố cách chọn: $C_{10}^{3} = \\dfrac{10!}{3! \\cdot 7!} = \\dfrac{10 \\times 9 \\times 8}{6} = 120$.\n\nVậy có $\\boxed{120}$ số.`,
    difficulty: 'van_dung',
    question_type: 'tu_luan',
  },
  {
    content: `Cho $a, b$ là các chữ số. Tìm tất cả các số $\\overline{ab}$ sao cho $\\overline{ab} = 3a + 4b$.`,
    answer: `$\\overline{ab} = 10$ hoặc $\\overline{ab} = 24$.`,
    solution: `Ta có: $\\overline{ab} = 10a + b = 3a + 4b$\n$$10a + b = 3a + 4b$$\n$$7a = 3b$$\n$$\\frac{a}{b} = \\frac{3}{7}$$\n\nVì $a, b$ là chữ số ($1 \\le a \\le 9$, $0 \\le b \\le 9$) và $\\frac{a}{b} = \\frac{3}{7}$:\n\nĐặt $a = 3k$, $b = 7k$ với $k$ nguyên dương.\n\n- $k = 1$: $a = 3, b = 7$ → $\\overline{ab} = 37$. Kiểm tra: $3(3) + 4(7) = 9 + 28 = 37$ ✓\n\nChờ đã, ta kiểm tra lại: $10(3) + 7 = 37$ và $3(3) + 4(7) = 37$. Đúng!\n\n- $k = 2$: $a = 6, b = 14$ → $b > 9$, loại.\n\nĐáp án: $\\overline{ab} = \\boxed{37}$.\n\n*Lưu ý: Cũng kiểm tra $b = 0$: $7a = 0 \\Rightarrow a = 0$, không thỏa mãn vì $a \\ge 1$.*`,
    difficulty: 'van_dung_cao',
    question_type: 'tu_luan',
  },
  {
    content: `Tìm tất cả số tự nhiên $n$ sao cho $n < n^2 < 2n + 3$.`,
    answer: `Không có số tự nhiên nào thỏa mãn (ngoại trừ nếu tính cả $n = 2$, kiểm tra: $2 < 4 < 7$ ✓).`,
    solution: `Ta cần đồng thời:\n- $(1)$: $n < n^2 \\Leftrightarrow n(n - 1) > 0 \\Leftrightarrow n > 1$ (vì $n \\ge 0$).\n- $(2)$: $n^2 < 2n + 3 \\Leftrightarrow n^2 - 2n - 3 < 0 \\Leftrightarrow (n-3)(n+1) < 0$.\n\nTừ $(2)$: vì $n \\ge 0$ nên $n + 1 > 0$, suy ra $n - 3 < 0$, tức $n < 3$.\n\nKết hợp $(1)$ và $(2)$: $1 < n < 3$.\n\nSố tự nhiên thỏa mãn: $n = 2$.\n\nKiểm tra: $2 < 2^2 = 4 < 2(2) + 3 = 7$ ✓.\n\nVậy $n = \\boxed{2}$.`,
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
