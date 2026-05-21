const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

const USER_ID = '8316c34e-765d-4b8c-9364-b683a17e33f8';
const CATEGORY_ID = '114c29c4-b3ae-4725-8b58-b395c23247a6';
const GRADE = 6;
const TOPIC = 'so_hoc';
const CODE_PREFIX = 'T6-C1B5';

const questions = [
  {
    content: `Tính: $125 \\times 8$.`,
    answer: `$1000$`,
    solution: `$$125 \\times 8 = \\boxed{1000}$$\n\nĐây là phép nhân cơ bản cần nhớ: $125 \\times 8 = 1000$.`,
    difficulty: 'nhan_biet',
    question_type: 'tu_luan',
  },
  {
    content: `Thực hiện phép chia: $2024 : 8$.`,
    answer: `$253$`,
    solution: `Đặt tính chia:\n$$2024 : 8 = 253$$\n\nKiểm tra: $253 \\times 8 = 2024$ ✓.\n\nKết quả: $\\boxed{253}$.`,
    difficulty: 'nhan_biet',
    question_type: 'tu_luan',
  },
  {
    content: `Tính nhanh: $25 \\times 32 \\times 125$.`,
    answer: `$100\\,000$`,
    solution: `Áp dụng tính chất giao hoán và kết hợp:\n$$25 \\times 32 \\times 125 = (25 \\times 4) \\times (8 \\times 125) = 100 \\times 1000 = \\boxed{100\\,000}$$\n\nTa tách $32 = 4 \\times 8$ để nhóm các thừa số cho tròn.`,
    difficulty: 'nhan_biet',
    question_type: 'tu_luan',
  },
  {
    content: `Tính nhanh bằng cách áp dụng tính chất phân phối: $37 \\times 64 + 37 \\times 36$.`,
    answer: `$3700$`,
    solution: `Áp dụng tính chất phân phối của phép nhân đối với phép cộng:\n$$37 \\times 64 + 37 \\times 36 = 37 \\times (64 + 36) = 37 \\times 100 = \\boxed{3700}$$`,
    difficulty: 'thong_hieu',
    question_type: 'tu_luan',
  },
  {
    content: `Tính nhanh: $125 \\times 72$.`,
    answer: `$9000$`,
    solution: `Tách $72 = 8 \\times 9$:\n$$125 \\times 72 = 125 \\times 8 \\times 9 = 1000 \\times 9 = \\boxed{9000}$$`,
    difficulty: 'thong_hieu',
    question_type: 'tu_luan',
  },
  {
    content: `Tìm số tự nhiên $x$ biết: $15 \\times x - 35 = 55$.`,
    answer: `$x = 6$.`,
    solution: `$$15x - 35 = 55$$\n$$15x = 55 + 35 = 90$$\n$$x = 90 : 15 = \\boxed{6}$$\n\nKiểm tra: $15 \\times 6 - 35 = 90 - 35 = 55$ ✓.`,
    difficulty: 'thong_hieu',
    question_type: 'tu_luan',
  },
  {
    content: `Tính nhanh: $76 \\times 25 + 25 \\times 23 + 25$.`,
    answer: `$2500$`,
    solution: `Viết lại $25 = 25 \\times 1$:\n$$76 \\times 25 + 23 \\times 25 + 1 \\times 25 = 25 \\times (76 + 23 + 1) = 25 \\times 100 = \\boxed{2500}$$`,
    difficulty: 'van_dung',
    question_type: 'tu_luan',
  },
  {
    content: `Tìm số tự nhiên $x$ biết: $2x + 3x + x = 150$.`,
    answer: `$x = 25$.`,
    solution: `$$2x + 3x + x = 150$$\n$$(2 + 3 + 1)x = 150$$\n$$6x = 150$$\n$$x = 150 : 6 = \\boxed{25}$$\n\nKiểm tra: $2(25) + 3(25) + 25 = 50 + 75 + 25 = 150$ ✓.`,
    difficulty: 'van_dung',
    question_type: 'tu_luan',
  },
  {
    content: `Tính: $1 \\times 2 + 2 \\times 3 + 3 \\times 4 + \\ldots + 99 \\times 100$.`,
    answer: `$328\\,350$`,
    solution: `Nhận xét: $k(k+1) = \\dfrac{k(k+1)(k+2) - (k-1)k(k+1)}{3}$.\n\nVậy:\n$$\\sum_{k=1}^{99} k(k+1) = \\frac{1}{3}\\sum_{k=1}^{99}[k(k+1)(k+2) - (k-1)k(k+1)]$$\n\nĐây là tổng telescoping:\n$$= \\frac{1}{3} \\times 99 \\times 100 \\times 101 = \\frac{999\\,900}{3} \\cdot \\frac{101}{1}$$\n\nTính: $\\dfrac{99 \\times 100 \\times 101}{3} = 33 \\times 100 \\times 101 = 333\\,300$.\n\nChờ, tính lại: $\\dfrac{99 \\times 100 \\times 101}{3} = 33 \\times 100 \\times 101 = 3300 \\times 101 = 333\\,300$.\n\nHoặc dùng công thức: $\\sum_{k=1}^{n} k(k+1) = \\dfrac{n(n+1)(n+2)}{3}$.\n\nVới $n = 99$: $S = \\dfrac{99 \\times 100 \\times 101}{3} = \\boxed{333\\,300}$.`,
    difficulty: 'van_dung_cao',
    question_type: 'tu_luan',
  },
  {
    content: `Chứng minh rằng tích của bốn số tự nhiên liên tiếp cộng thêm $1$ luôn là một số chính phương.`,
    answer: `$n(n+1)(n+2)(n+3) + 1 = (n^2 + 3n + 1)^2$.`,
    solution: `Gọi bốn số tự nhiên liên tiếp là $n, n+1, n+2, n+3$.\n\nTa cần chứng minh: $P = n(n+1)(n+2)(n+3) + 1$ là số chính phương.\n\n**Bước 1:** Nhóm các thừa số:\n$$P = [n(n+3)] \\cdot [(n+1)(n+2)] + 1$$\n$$= (n^2 + 3n)(n^2 + 3n + 2) + 1$$\n\n**Bước 2:** Đặt $t = n^2 + 3n + 1$:\n- $n^2 + 3n = t - 1$\n- $n^2 + 3n + 2 = t + 1$\n\n$$P = (t-1)(t+1) + 1 = t^2 - 1 + 1 = t^2$$\n\nVậy $P = (n^2 + 3n + 1)^2$ là số chính phương. $\\blacksquare$\n\n*Ví dụ:* $1 \\times 2 \\times 3 \\times 4 + 1 = 24 + 1 = 25 = 5^2$ ✓.`,
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
