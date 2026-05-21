const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

const USER_ID = '8316c34e-765d-4b8c-9364-b683a17e33f8';
const GRADE = 6;
const TOPIC = 'so_hoc';

// ===== BÀI 6: Luỹ thừa với số mũ tự nhiên =====
const bai6 = {
  categoryId: '9c21dcf7-01fa-4879-99c5-921e7490dd33',
  prefix: 'T6-C1B6',
  questions: [
    { content: `Tính: $2^5$.`, answer: `$32$`, solution: `$2^5 = 2 \\times 2 \\times 2 \\times 2 \\times 2 = \\boxed{32}$\n\nỞ đây $2$ là cơ số, $5$ là số mũ. Luỹ thừa $2^5$ là tích của $5$ thừa số, mỗi thừa số bằng $2$.`, difficulty: 'nhan_biet', question_type: 'tu_luan' },
    { content: `Viết gọn bằng luỹ thừa: $7 \\times 7 \\times 7 \\times 7$.`, answer: `$7^4$`, solution: `Tích gồm $4$ thừa số, mỗi thừa số bằng $7$.\n$$7 \\times 7 \\times 7 \\times 7 = \\boxed{7^4}$$\n\nCơ số là $7$, số mũ là $4$.`, difficulty: 'nhan_biet', question_type: 'tu_luan' },
    { content: `So sánh: $3^4$ và $4^3$.`, answer: `$3^4 > 4^3$.`, solution: `Tính:\n- $3^4 = 81$\n- $4^3 = 64$\n\nVì $81 > 64$ nên $\\boxed{3^4 > 4^3}$.`, difficulty: 'nhan_biet', question_type: 'tu_luan' },
    { content: `Tính: $2^3 \\times 2^4$.`, answer: `$128$`, solution: `Áp dụng quy tắc nhân hai luỹ thừa cùng cơ số:\n$$2^3 \\times 2^4 = 2^{3+4} = 2^7 = \\boxed{128}$$`, difficulty: 'thong_hieu', question_type: 'tu_luan' },
    { content: `Tính: $5^8 : 5^5$.`, answer: `$125$`, solution: `Áp dụng quy tắc chia hai luỹ thừa cùng cơ số ($m > n$):\n$$5^8 : 5^5 = 5^{8-5} = 5^3 = \\boxed{125}$$`, difficulty: 'thong_hieu', question_type: 'tu_luan' },
    { content: `Tìm số tự nhiên $n$ biết: $2^n = 64$.`, answer: `$n = 6$.`, solution: `Ta có: $64 = 2^6$.\n\nVậy $2^n = 2^6 \\Rightarrow n = \\boxed{6}$.\n\nKiểm tra: $2^6 = 64$ ✓.`, difficulty: 'thong_hieu', question_type: 'tu_luan' },
    { content: `Tìm số tự nhiên $n$ biết: $3^n \\times 3^2 = 729$.`, answer: `$n = 4$.`, solution: `Ta có: $3^n \\times 3^2 = 3^{n+2}$ và $729 = 3^6$.\n\nVậy $3^{n+2} = 3^6 \\Rightarrow n + 2 = 6 \\Rightarrow n = \\boxed{4}$.\n\nKiểm tra: $3^4 \\times 3^2 = 81 \\times 9 = 729$ ✓.`, difficulty: 'van_dung', question_type: 'tu_luan' },
    { content: `Tính giá trị biểu thức: $10^3 - 2 \\times 10^2 + 3 \\times 10 - 5$.`, answer: `$825$`, solution: `$$10^3 - 2 \\times 10^2 + 3 \\times 10 - 5$$\n$$= 1000 - 2 \\times 100 + 30 - 5$$\n$$= 1000 - 200 + 30 - 5$$\n$$= \\boxed{825}$$`, difficulty: 'van_dung', question_type: 'tu_luan' },
    { content: `Chứng minh rằng: $11^{10} - 1$ chia hết cho $100$.`, answer: `$11^{10} - 1 \\vdots 100$.`, solution: `Ta có $11 = 10 + 1$, nên $11^{10} = (10 + 1)^{10}$.\n\nKhi khai triển $(10+1)^{10}$, tất cả các số hạng trừ số hạng cuối đều chứa thừa số $10^k$ ($k \\ge 1$).\n\nCụ thể: $(10+1)^{10} = 10^{10} + \\binom{10}{1}10^9 + \\ldots + \\binom{10}{8}10^2 + \\binom{10}{9}10 + 1$.\n\nCác số hạng có $10^k$ với $k \\ge 2$ đều chia hết cho $100$.\n\nSố hạng $\\binom{10}{9}10 = 100$, cũng chia hết cho $100$.\n\nVậy $11^{10} - 1 = (\\text{các số hạng chia hết cho } 100) + 100 \\vdots 100$. $\\blacksquare$`, difficulty: 'van_dung_cao', question_type: 'tu_luan' },
    { content: `Tìm chữ số tận cùng của $7^{2025}$.`, answer: `Chữ số tận cùng là $7$.`, solution: `Xét chu kỳ chữ số tận cùng của luỹ thừa $7$:\n- $7^1 = 7$ → tận cùng $7$\n- $7^2 = 49$ → tận cùng $9$\n- $7^3 = 343$ → tận cùng $3$\n- $7^4 = 2401$ → tận cùng $1$\n- $7^5 → $ tận cùng $7$\n\nChu kỳ lặp lại sau mỗi $4$ số: $7, 9, 3, 1$.\n\nChia $2025$ cho $4$: $2025 = 4 \\times 506 + 1$.\n\nSố dư là $1$, ứng với $7^1 \\to$ tận cùng $\\boxed{7}$.`, difficulty: 'van_dung_cao', question_type: 'tu_luan' },
  ]
};

// ===== BÀI 7: Thứ tự thực hiện các phép tính =====
const bai7 = {
  categoryId: '4b603ccb-3fc7-46b3-a76b-8948ede004aa',
  prefix: 'T6-C1B7',
  questions: [
    { content: `Tính: $5 + 3 \\times 2$.`, answer: `$11$`, solution: `Theo quy tắc thứ tự phép tính, nhân trước cộng sau:\n$$5 + 3 \\times 2 = 5 + 6 = \\boxed{11}$$`, difficulty: 'nhan_biet', question_type: 'tu_luan' },
    { content: `Tính: $48 : 6 \\times 2$.`, answer: `$16$`, solution: `Nhân và chia có cùng thứ tự ưu tiên, thực hiện từ trái sang phải:\n$$48 : 6 \\times 2 = 8 \\times 2 = \\boxed{16}$$`, difficulty: 'nhan_biet', question_type: 'tu_luan' },
    { content: `Tính: $3 \\times (12 - 4) + 2^3$.`, answer: `$32$`, solution: `Thực hiện theo thứ tự: ngoặc → luỹ thừa → nhân/chia → cộng/trừ.\n$$3 \\times (12 - 4) + 2^3 = 3 \\times 8 + 8 = 24 + 8 = \\boxed{32}$$`, difficulty: 'nhan_biet', question_type: 'tu_luan' },
    { content: `Tính: $100 - [50 - (30 - 10)]$.`, answer: `$70$`, solution: `Tính từ ngoặc trong ra ngoài:\n$$100 - [50 - (30 - 10)] = 100 - [50 - 20] = 100 - 30 = \\boxed{70}$$`, difficulty: 'thong_hieu', question_type: 'tu_luan' },
    { content: `Tính: $5 \\times 4^2 - 3 \\times (10 - 2^3)$.`, answer: `$74$`, solution: `Thứ tự: luỹ thừa → ngoặc → nhân → trừ.\n\n- $4^2 = 16$; $2^3 = 8$\n- $5 \\times 16 - 3 \\times (10 - 8) = 80 - 3 \\times 2 = 80 - 6 = \\boxed{74}$`, difficulty: 'thong_hieu', question_type: 'tu_luan' },
    { content: `Tìm $x$ biết: $3 \\times (x - 5) = 36$.`, answer: `$x = 17$.`, solution: `$$3(x - 5) = 36$$\n$$x - 5 = 36 : 3 = 12$$\n$$x = 12 + 5 = \\boxed{17}$$\n\nKiểm tra: $3 \\times (17 - 5) = 3 \\times 12 = 36$ ✓.`, difficulty: 'thong_hieu', question_type: 'tu_luan' },
    { content: `Tính: $\\dfrac{120}{5 \\times 2^3 - 10 \\times 3}$.`, answer: `$12$`, solution: `Tính mẫu số trước:\n$$5 \\times 2^3 - 10 \\times 3 = 5 \\times 8 - 30 = 40 - 30 = 10$$\n\nVậy: $\\dfrac{120}{10} = \\boxed{12}$.`, difficulty: 'van_dung', question_type: 'tu_luan' },
    { content: `Tìm $x$ biết: $2^x + 2^{x+1} + 2^{x+2} = 56$.`, answer: `$x = 3$.`, solution: `Đặt $2^x$ làm nhân tử chung:\n$$2^x + 2^x \\cdot 2 + 2^x \\cdot 4 = 56$$\n$$2^x(1 + 2 + 4) = 56$$\n$$2^x \\times 7 = 56$$\n$$2^x = 8 = 2^3$$\n$$x = \\boxed{3}$$\n\nKiểm tra: $8 + 16 + 32 = 56$ ✓.`, difficulty: 'van_dung', question_type: 'tu_luan' },
    { content: `Tìm $x$ biết: $(2x - 1)^3 = 125$.`, answer: `$x = 3$.`, solution: `$$( 2x - 1)^3 = 125 = 5^3$$\n$$2x - 1 = 5$$\n$$2x = 6$$\n$$x = \\boxed{3}$$\n\nKiểm tra: $(2 \\times 3 - 1)^3 = 5^3 = 125$ ✓.`, difficulty: 'van_dung_cao', question_type: 'tu_luan' },
    { content: `Tính: $1^3 + 2^3 + 3^3 + \\ldots + 10^3$.`, answer: `$3025$`, solution: `Áp dụng công thức:\n$$1^3 + 2^3 + 3^3 + \\ldots + n^3 = \\left(\\frac{n(n+1)}{2}\\right)^2$$\n\nVới $n = 10$:\n$$S = \\left(\\frac{10 \\times 11}{2}\\right)^2 = 55^2 = \\boxed{3025}$$\n\nNhận xét: Tổng các lập phương liên tiếp bằng bình phương của tổng các số tự nhiên tương ứng.`, difficulty: 'van_dung_cao', question_type: 'tu_luan' },
  ]
};

async function insertBatch(batch) {
  let count = 0;
  for (const q of batch.questions) {
    const code = batch.prefix + '-' + String(count + 1).padStart(3, '0');
    await sql`
      INSERT INTO public.questions (content, answer, solution, grade, topic, difficulty, question_type, category_id, status, is_public, question_code, user_id)
      VALUES (${q.content}, ${q.answer}, ${q.solution}, ${GRADE}, ${TOPIC}, ${q.difficulty}, ${q.question_type}, ${batch.categoryId}, 'approved', true, ${code}, ${USER_ID})
    `;
    count++;
    console.log('Inserted: ' + code + ' - ' + q.difficulty);
  }
  return count;
}

async function main() {
  let total = 0;
  console.log('=== Bài 6: Luỹ thừa ===');
  total += await insertBatch(bai6);
  console.log('\n=== Bài 7: Thứ tự phép tính ===');
  total += await insertBatch(bai7);
  console.log('\nTotal: ' + total + ' questions inserted.');
}
main().catch(console.error);
