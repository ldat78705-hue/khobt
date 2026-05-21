const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

const USER_ID = '8316c34e-765d-4b8c-9364-b683a17e33f8';
const CATEGORY_ID = 'f3347891-e482-44db-ad23-7e0685486a97';
const GRADE = 6;
const TOPIC = 'so_hoc';
const CODE_PREFIX = 'T6-C1B4';

const questions = [
  {
    content: `Tính: $1247 + 3856$.`,
    answer: `$5103$`,
    solution: `Đặt tính cộng:\n$$1247 + 3856 = 5103$$\n\nCách đặt tính theo cột:\n- Hàng đơn vị: $7 + 6 = 13$, viết $3$ nhớ $1$.\n- Hàng chục: $4 + 5 + 1 = 10$, viết $0$ nhớ $1$.\n- Hàng trăm: $2 + 8 + 1 = 11$, viết $1$ nhớ $1$.\n- Hàng nghìn: $1 + 3 + 1 = 5$.\n\nKết quả: $\\boxed{5103}$.`,
    difficulty: 'nhan_biet',
    question_type: 'tu_luan',
  },
  {
    content: `Tính: $5000 - 1728$.`,
    answer: `$3272$`,
    solution: `Đặt tính trừ:\n$$5000 - 1728 = 3272$$\n\nKiểm tra: $3272 + 1728 = 5000$ ✓.\n\nKết quả: $\\boxed{3272}$.`,
    difficulty: 'nhan_biet',
    question_type: 'tu_luan',
  },
  {
    content: `Tính nhanh: $47 + 135 + 53 + 65$.`,
    answer: `$300$`,
    solution: `Áp dụng tính chất giao hoán và kết hợp của phép cộng, nhóm các số có tổng tròn chục:\n$$(47 + 53) + (135 + 65) = 100 + 200 = \\boxed{300}$$`,
    difficulty: 'nhan_biet',
    question_type: 'tu_luan',
  },
  {
    content: `Tính nhanh: $2025 - 37 - 63$.`,
    answer: `$1925$`,
    solution: `Áp dụng tính chất: $a - b - c = a - (b + c)$.\n$$2025 - 37 - 63 = 2025 - (37 + 63) = 2025 - 100 = \\boxed{1925}$$`,
    difficulty: 'thong_hieu',
    question_type: 'tu_luan',
  },
  {
    content: `Tìm số tự nhiên $x$ biết: $x + 125 = 301$.`,
    answer: `$x = 176$.`,
    solution: `Ta có:\n$$x + 125 = 301$$\n$$x = 301 - 125$$\n$$x = \\boxed{176}$$\n\nKiểm tra: $176 + 125 = 301$ ✓.`,
    difficulty: 'thong_hieu',
    question_type: 'tu_luan',
  },
  {
    content: `Tính nhanh: $1 + 2 + 3 + \\ldots + 49 + 50$.`,
    answer: `$1275$`,
    solution: `Áp dụng công thức tính tổng dãy số tự nhiên liên tiếp:\n$$S = 1 + 2 + 3 + \\ldots + 50 = \\frac{50 \\times (50 + 1)}{2} = \\frac{50 \\times 51}{2} = \\boxed{1275}$$\n\nCách khác (Gauss): nhóm các cặp đầu–cuối:\n$$(1 + 50) + (2 + 49) + \\ldots + (25 + 26) = 51 \\times 25 = 1275$$`,
    difficulty: 'thong_hieu',
    question_type: 'tu_luan',
  },
  {
    content: `Tính nhanh: $25 + 27 + 29 + \\ldots + 73 + 75$.`,
    answer: `$1300$`,
    solution: `Đây là tổng dãy số lẻ liên tiếp từ $25$ đến $75$.\n\nSố các số hạng: $\\dfrac{75 - 25}{2} + 1 = 26$ số.\n\nTổng: $S = \\dfrac{(25 + 75) \\times 26}{2} = \\dfrac{100 \\times 26}{2} = \\boxed{1300}$`,
    difficulty: 'van_dung',
    question_type: 'tu_luan',
  },
  {
    content: `Tìm số tự nhiên $x$ biết: $315 + (125 - x) = 400$.`,
    answer: `$x = 40$.`,
    solution: `$$315 + (125 - x) = 400$$\n$$125 - x = 400 - 315$$\n$$125 - x = 85$$\n$$x = 125 - 85$$\n$$x = \\boxed{40}$$\n\nKiểm tra: $315 + (125 - 40) = 315 + 85 = 400$ ✓.`,
    difficulty: 'van_dung',
    question_type: 'tu_luan',
  },
  {
    content: `Tìm tổng: $S = 1 + 2 - 3 - 4 + 5 + 6 - 7 - 8 + \\ldots + 2021 + 2022 - 2023 - 2024$.`,
    answer: `$S = -2024$`,
    solution: `Nhóm các số hạng theo bộ bốn:\n$$(1 + 2 - 3 - 4) + (5 + 6 - 7 - 8) + \\ldots + (2021 + 2022 - 2023 - 2024)$$\n\nMỗi nhóm: $(4k+1) + (4k+2) - (4k+3) - (4k+4) = -4$ với mọi $k$.\n\nSố nhóm: $\\dfrac{2024}{4} = 506$ nhóm.\n\nVậy $S = 506 \\times (-4) = \\boxed{-2024}$.\n\n*Lưu ý: Kết quả âm vì dãy liên quan đến số nguyên, phù hợp với mở rộng kiến thức.*`,
    difficulty: 'van_dung_cao',
    question_type: 'tu_luan',
  },
  {
    content: `An nghĩ một số tự nhiên, nhân với $3$ rồi cộng thêm $15$, sau đó trừ đi số đã nghĩ, được kết quả là $99$. Hỏi An đã nghĩ số nào?`,
    answer: `$42$`,
    solution: `Gọi số An nghĩ là $x$.\n\nTheo đề bài:\n$$3x + 15 - x = 99$$\n$$2x + 15 = 99$$\n$$2x = 84$$\n$$x = \\boxed{42}$$\n\nKiểm tra: $3 \\times 42 + 15 - 42 = 126 + 15 - 42 = 99$ ✓.`,
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
