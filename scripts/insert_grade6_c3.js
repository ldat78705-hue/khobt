const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const USER_ID = '8316c34e-765d-4b8c-9364-b683a17e33f8';
const GRADE = 6, TOPIC = 'so_hoc';

const batches = [
  {
    categoryId: 'adb5c68f-4fd7-481e-8132-36e96dfaa7bd', prefix: 'T6-C3B14',
    questions: [
      { content: `Tính: $(-3) + (-5)$.`, answer: `$-8$`, solution: `Cộng hai số nguyên âm: cộng hai giá trị tuyệt đối rồi đặt dấu âm.\n$|{-3}| + |{-5}| = 3 + 5 = 8$.\nKết quả: $\\boxed{-8}$.`, difficulty: 'nhan_biet', question_type: 'tu_luan' },
      { content: `Tính: $12 + (-7)$.`, answer: `$5$`, solution: `Cộng hai số khác dấu: lấy hiệu hai GTTĐ, mang dấu của số có GTTĐ lớn hơn.\n$|12| - |{-7}| = 12 - 7 = 5$. Vì $|12| > |{-7}|$ và $12 > 0$ nên kết quả dương.\nĐáp án: $\\boxed{5}$.`, difficulty: 'nhan_biet', question_type: 'tu_luan' },
      { content: `Tính: $15 - 23$.`, answer: `$-8$`, solution: `$15 - 23 = 15 + (-23) = -(23 - 15) = \\boxed{-8}$.`, difficulty: 'nhan_biet', question_type: 'tu_luan' },
      { content: `Tính: $(-8) + 12 + (-4) + 7 + (-15)$.`, answer: `$-8$`, solution: `Nhóm số dương và số âm:\n- Tổng dương: $12 + 7 = 19$\n- Tổng âm: $(-8) + (-4) + (-15) = -27$\n\nKết quả: $19 + (-27) = -(27 - 19) = \\boxed{-8}$.`, difficulty: 'thong_hieu', question_type: 'tu_luan' },
      { content: `Tính: $25 - (13 - 40) + (-12)$.`, answer: `$40$`, solution: `$= 25 - 13 + 40 + (-12)$\n$= 25 - 13 + 40 - 12$\n$= (25 + 40) - (13 + 12)$\n$= 65 - 25 = \\boxed{40}$.`, difficulty: 'thong_hieu', question_type: 'tu_luan' },
      { content: `Tìm $x$ biết: $x + 7 = -3$.`, answer: `$x = -10$.`, solution: `$x = -3 - 7 = \\boxed{-10}$.\n\nKiểm tra: $-10 + 7 = -3$ ✓.`, difficulty: 'thong_hieu', question_type: 'tu_luan' },
      { content: `Tính nhanh: $(-99) + (-1) + 100 + (-200) + 201$.`, answer: `$1$`, solution: `Nhóm:\n$[(-99) + (-1) + 100] + [(-200) + 201]$\n$= 0 + 1 = \\boxed{1}$.`, difficulty: 'van_dung', question_type: 'tu_luan' },
      { content: `Tính: $1 - 2 + 3 - 4 + 5 - 6 + \\ldots + 99 - 100$.`, answer: `$-50$`, solution: `Nhóm theo cặp: $(1-2) + (3-4) + \\ldots + (99-100)$.\nMỗi cặp bằng $-1$. Có $50$ cặp.\nTổng $= 50 \\times (-1) = \\boxed{-50}$.`, difficulty: 'van_dung', question_type: 'tu_luan' },
      { content: `Tìm tất cả $x \\in \\mathbb{Z}$ sao cho $|x - 3| + |x + 2| = 7$.`, answer: `$x \\in \\{-3, -2, -1, 0, 1, 2, 3, 4\\}$... → cần phân tích kỹ.`, solution: `Theo bất đẳng thức tam giác: $|x-3| + |x+2| \\ge |(x-3) - (x+2)| = 5$.\n\nDấu "=" khi $-2 \\le x \\le 3$, lúc đó $|x-3|+|x+2| = (3-x)+(x+2) = 5 < 7$.\n\nKhi $x > 3$: $(x-3) + (x+2) = 2x - 1 = 7 \\Rightarrow x = 4$.\nKhi $x < -2$: $(3-x) + (-x-2) = -2x+1 = 7 \\Rightarrow x = -3$.\n\nVậy $x \\in \\{-3, 4\\}$.`, difficulty: 'van_dung_cao', question_type: 'tu_luan' },
      { content: `Chứng minh: $|a + b| \\le |a| + |b|$ với mọi $a, b \\in \\mathbb{Z}$.`, answer: `Bất đẳng thức tam giác.`, solution: `Ta có $(|a| + |b|)^2 = a^2 + 2|a||b| + b^2$ và $(a+b)^2 = a^2 + 2ab + b^2$.\n\nVì $|a||b| \\ge ab$ (luôn đúng), nên $(|a|+|b|)^2 \\ge (a+b)^2$.\n\nDo $|a|+|b| \\ge 0$ nên $|a|+|b| \\ge |a+b|$. $\\blacksquare$`, difficulty: 'van_dung_cao', question_type: 'tu_luan' },
    ]
  },
  {
    categoryId: '1e0412bd-0c9c-49a5-9508-7e785d00e63c', prefix: 'T6-C3B15',
    questions: [
      { content: `Bỏ ngoặc: $a - (b - c + d)$.`, answer: `$a - b + c - d$.`, solution: `Khi bỏ ngoặc có dấu "$-$" đằng trước, đổi dấu tất cả các số hạng trong ngoặc:\n$$a - (b - c + d) = a - b + c - d$$`, difficulty: 'nhan_biet', question_type: 'tu_luan' },
      { content: `Tính: $35 - (20 - 8)$.`, answer: `$23$`, solution: `Cách 1: $35 - (20 - 8) = 35 - 12 = 23$.\nCách 2 (bỏ ngoặc): $35 - 20 + 8 = 23$.\nĐáp án: $\\boxed{23}$.`, difficulty: 'nhan_biet', question_type: 'tu_luan' },
      { content: `Tính: $(-5) - (7 - 12)$.`, answer: `$0$`, solution: `$(-5) - (7 - 12) = -5 - 7 + 12 = 12 - 12 = \\boxed{0}$.`, difficulty: 'nhan_biet', question_type: 'tu_luan' },
      { content: `Tính: $128 - (- 72) - 28 - 72$.`, answer: `$100$`, solution: `$= 128 + 72 - 28 - 72 = (128 - 28) + (72 - 72) = 100 + 0 = \\boxed{100}$.`, difficulty: 'thong_hieu', question_type: 'tu_luan' },
      { content: `Tính: $-2025 - (37 - 2025) + 37$.`, answer: `$0$`, solution: `$= -2025 - 37 + 2025 + 37 = (-2025+2025) + (-37+37) = \\boxed{0}$.`, difficulty: 'thong_hieu', question_type: 'tu_luan' },
      { content: `Tìm $x$: $x - (25 - x) = 11$.`, answer: `$x = 18$.`, solution: `$x - 25 + x = 11 \\Rightarrow 2x = 36 \\Rightarrow x = \\boxed{18}$.`, difficulty: 'thong_hieu', question_type: 'tu_luan' },
      { content: `Tính: $(1 - 2) - (3 - 4) + (5 - 6) - \\ldots - (99 - 100)$.`, answer: `$0$`, solution: `$= -1 + 1 - 1 + \\ldots + 1$. Có $50$ cặp ngoặc, bỏ ngoặc xen kẽ $-1, +1$ → tổng $= \\boxed{0}$.`, difficulty: 'van_dung', question_type: 'tu_luan' },
      { content: `Tính: $1 - 3 + 5 - 7 + 9 - 11 + \\ldots + 97 - 99$.`, answer: `$-50$`, solution: `Nhóm: $(1-3) + (5-7) + \\ldots + (97-99) = (-2) \\times 25 = \\boxed{-50}$.`, difficulty: 'van_dung', question_type: 'tu_luan' },
      { content: `Tìm $x$: $(x - 3)(x + 5) = 0$.`, answer: `$x = 3$ hoặc $x = -5$.`, solution: `Tích bằng $0$ khi ít nhất một thừa số bằng $0$:\n- $x - 3 = 0 \\Rightarrow x = 3$\n- $x + 5 = 0 \\Rightarrow x = -5$\n\nVậy $x \\in \\{3, -5\\}$.`, difficulty: 'van_dung_cao', question_type: 'tu_luan' },
      { content: `Tính tổng: $S = (-1) + 2 + (-3) + 4 + \\ldots + (-2023) + 2024 + (-2025)$.`, answer: `$-1013$`, solution: `Nhóm: $[(-1)+2] + [(-3)+4] + \\ldots + [(-2023)+2024] + (-2025)$.\nCó $1012$ cặp, mỗi cặp bằng $1$. Còn dư $-2025$.\n$S = 1012 + (-2025) = 1012 - 2025 = \\boxed{-1013}$.`, difficulty: 'van_dung_cao', question_type: 'tu_luan' },
    ]
  },
  {
    categoryId: 'efc2618a-4c5b-4483-8d2d-818d3ed639ba', prefix: 'T6-C3B16',
    questions: [
      { content: `Tính: $(-4) \\times 7$.`, answer: `$-28$`, solution: `Nhân hai số khác dấu: tích mang dấu âm.\n$4 \\times 7 = 28$ → $(-4) \\times 7 = \\boxed{-28}$.`, difficulty: 'nhan_biet', question_type: 'tu_luan' },
      { content: `Tính: $(-6) \\times (-8)$.`, answer: `$48$`, solution: `Nhân hai số âm: tích mang dấu dương.\n$6 \\times 8 = 48$ → $(-6) \\times (-8) = \\boxed{48}$.`, difficulty: 'nhan_biet', question_type: 'tu_luan' },
      { content: `Tính: $(-5)^3$.`, answer: `$-125$`, solution: `$(-5)^3 = (-5) \\times (-5) \\times (-5) = 25 \\times (-5) = \\boxed{-125}$.\n\nLuỹ thừa bậc lẻ của số âm → kết quả âm.`, difficulty: 'nhan_biet', question_type: 'tu_luan' },
      { content: `Tính: $(-3) \\times 5 \\times (-2) \\times (-4)$.`, answer: `$-120$`, solution: `Đếm số thừa số âm: $3$ (lẻ) → tích âm.\n$3 \\times 5 \\times 2 \\times 4 = 120$.\nKết quả: $\\boxed{-120}$.`, difficulty: 'thong_hieu', question_type: 'tu_luan' },
      { content: `Tính nhanh: $(-25) \\times 8 \\times (-4) \\times (-5)$.`, answer: `$-4000$`, solution: `Nhóm: $[(-25) \\times (-4)] \\times [8 \\times (-5)] = 100 \\times (-40) = \\boxed{-4000}$.`, difficulty: 'thong_hieu', question_type: 'tu_luan' },
      { content: `Tìm $x$: $(-3) \\times x = 27$.`, answer: `$x = -9$.`, solution: `$x = 27 : (-3) = \\boxed{-9}$.\nKiểm tra: $(-3) \\times (-9) = 27$ ✓.`, difficulty: 'thong_hieu', question_type: 'tu_luan' },
      { content: `So sánh $(-3)^4$ và $(-4)^3$.`, answer: `$(-3)^4 > (-4)^3$.`, solution: `$(-3)^4 = 81 > 0$ (mũ chẵn → dương).\n$(-4)^3 = -64 < 0$ (mũ lẻ → âm).\nVậy $(-3)^4 > (-4)^3$.`, difficulty: 'van_dung', question_type: 'tu_luan' },
      { content: `Tính: $(-1) \\times (-2) \\times (-3) \\times \\ldots \\times (-10)$.`, answer: `$3\\,628\\,800$`, solution: `$= (-1)^{10} \\times (1 \\times 2 \\times \\ldots \\times 10) = 1 \\times 10! = \\boxed{3\\,628\\,800}$.\nCó $10$ thừa số âm (chẵn) → tích dương.`, difficulty: 'van_dung', question_type: 'tu_luan' },
      { content: `Chứng minh: $(-1)^{2n} = 1$ và $(-1)^{2n+1} = -1$ với mọi $n \\in \\mathbb{N}$.`, answer: `Luỹ thừa chẵn của $-1$ bằng $1$, luỹ thừa lẻ bằng $-1$.`, solution: `$(-1)^{2n} = [(-1)^2]^n = 1^n = 1$.\n$(-1)^{2n+1} = (-1)^{2n} \\times (-1) = 1 \\times (-1) = -1$. $\\blacksquare$`, difficulty: 'van_dung_cao', question_type: 'tu_luan' },
      { content: `Tìm $n \\in \\mathbb{Z}$ sao cho $n^2 = n$.`, answer: `$n \\in \\{0, 1\\}$.`, solution: `$n^2 = n \\Rightarrow n^2 - n = 0 \\Rightarrow n(n - 1) = 0$.\n$n = 0$ hoặc $n = 1$.\n\nVậy $n \\in \\{0, 1\\}$.`, difficulty: 'van_dung_cao', question_type: 'tu_luan' },
    ]
  },
  {
    categoryId: '238ab61c-029c-4bda-a9b2-dd3866f975aa', prefix: 'T6-C3B17',
    questions: [
      { content: `Tìm tất cả ước nguyên của $6$.`, answer: `$\\pm 1, \\pm 2, \\pm 3, \\pm 6$.`, solution: `Ước tự nhiên của $6$: $1, 2, 3, 6$.\nƯớc nguyên gồm cả số đối: $\\boxed{\\pm 1, \\pm 2, \\pm 3, \\pm 6}$.`, difficulty: 'nhan_biet', question_type: 'tu_luan' },
      { content: `Trong phép chia $17$ cho $(-5)$, tìm thương và số dư.`, answer: `Thương $-3$, dư $2$.`, solution: `$17 = (-5) \\times (-3) + 2$.\nThương: $-3$, dư: $2$ (với $0 \\le 2 < 5$).`, difficulty: 'nhan_biet', question_type: 'tu_luan' },
      { content: `Liệt kê $5$ bội của $(-3)$.`, answer: `$0, \\pm 3, \\pm 6$.`, solution: `Bội của $-3$: $(-3) \\times k$ với $k \\in \\mathbb{Z}$.\nVD: $0, -3, 3, -6, 6$.`, difficulty: 'nhan_biet', question_type: 'tu_luan' },
      { content: `Tìm số nguyên $x$ biết $x \\vdots 4$ và $-10 < x < 10$.`, answer: `$x \\in \\{-8, -4, 0, 4, 8\\}$.`, solution: `Bội của $4$ trong $(-10, 10)$: $\\boxed{-8, -4, 0, 4, 8}$.`, difficulty: 'thong_hieu', question_type: 'tu_luan' },
      { content: `Tìm số nguyên $a$ biết $(a + 3) \\vdots (a - 1)$ với $a \\neq 1$.`, answer: `$a \\in \\{-1, 0, 2, 3, 5\\}$.`, solution: `$a + 3 = (a - 1) + 4$. Nên $(a+3) \\vdots (a-1) \\Leftrightarrow 4 \\vdots (a-1)$.\nƯớc nguyên của $4$: $\\pm 1, \\pm 2, \\pm 4$.\n$a - 1 \\in \\{-4,-2,-1,1,2,4\\}$, suy ra $a \\in \\{-3,-1,0,2,3,5\\}$.`, difficulty: 'thong_hieu', question_type: 'tu_luan' },
      { content: `Tìm $x \\in \\mathbb{Z}$: $|x| = 5$.`, answer: `$x = 5$ hoặc $x = -5$.`, solution: `$|x| = 5$ nghĩa là $x$ cách $0$ khoảng $5$ đơn vị.\nVậy $x = 5$ hoặc $x = -5$.`, difficulty: 'thong_hieu', question_type: 'tu_luan' },
      { content: `Tìm các số nguyên $x, y$ biết $xy = 12$ và $x + y = 7$.`, answer: `$(x,y) = (3,4)$ hoặc $(4,3)$.`, solution: `$x, y$ là nghiệm của $t^2 - 7t + 12 = 0$.\n$(t-3)(t-4) = 0 \\Rightarrow t = 3$ hoặc $t = 4$.\nVậy $(x,y) \\in \\{(3,4), (4,3)\\}$.`, difficulty: 'van_dung', question_type: 'tu_luan' },
      { content: `Tìm $x \\in \\mathbb{Z}$: $|2x - 1| = 5$.`, answer: `$x = 3$ hoặc $x = -2$.`, solution: `$2x - 1 = 5 \\Rightarrow x = 3$.\n$2x - 1 = -5 \\Rightarrow x = -2$.\nVậy $x \\in \\{3, -2\\}$.`, difficulty: 'van_dung', question_type: 'tu_luan' },
      { content: `Tìm tất cả $n \\in \\mathbb{Z}$ sao cho $\\dfrac{n + 5}{n - 2}$ là số nguyên.`, answer: `$n \\in \\{-5, -1, 1, 3, 4, 9\\}$.`, solution: `$\\frac{n+5}{n-2} = \\frac{(n-2)+7}{n-2} = 1 + \\frac{7}{n-2}$.\nCần $7 \\vdots (n-2)$. Ước của $7$: $\\pm 1, \\pm 7$.\n$n - 2 \\in \\{-7,-1,1,7\\}$ → $n \\in \\{-5, 1, 3, 9\\}$.`, difficulty: 'van_dung_cao', question_type: 'tu_luan' },
      { content: `Tìm tất cả cặp $(x, y) \\in \\mathbb{Z}^2$ sao cho $xy + 2x - 3y = 11$.`, answer: `Phân tích nhân tử.`, solution: `$xy + 2x - 3y = 11$\n$x(y+2) - 3y - 6 = 11 - 6 = 5$\n$(y+2)(x-3) = 5$.\nCác cặp ước của $5$:\n- $(1,5)$: $y=-1, x=8$\n- $(5,1)$: $y=3, x=4$\n- $(-1,-5)$: $y=-3, x=-2$\n- $(-5,-1)$: $y=-7, x=2$`, difficulty: 'van_dung_cao', question_type: 'tu_luan' },
    ]
  },
];

async function main() {
  let total = 0;
  for (const batch of batches) {
    console.log('=== ' + batch.prefix + ' ===');
    let c = 0;
    for (const q of batch.questions) {
      const code = batch.prefix + '-' + String(c + 1).padStart(3, '0');
      await sql`INSERT INTO public.questions (content, answer, solution, grade, topic, difficulty, question_type, category_id, status, is_public, question_code, user_id) VALUES (${q.content}, ${q.answer}, ${q.solution}, ${GRADE}, ${TOPIC}, ${q.difficulty}, ${q.question_type}, ${batch.categoryId}, 'approved', true, ${code}, ${USER_ID})`;
      c++; console.log('OK: ' + code);
    }
    total += c;
  }
  console.log('Total: ' + total);
}
main().catch(console.error);
