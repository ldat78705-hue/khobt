const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

const USER_ID = '8316c34e-765d-4b8c-9364-b683a17e33f8';
const GRADE = 6;
const TOPIC = 'so_hoc';

const batches = [
  // ===== BÀI 8: Quan hệ chia hết và tính chất =====
  {
    categoryId: '010ee270-e8a7-440f-b9ec-188042821190',
    prefix: 'T6-C2B8',
    questions: [
      { content: `Trong các số $12, 15, 20, 25$, số nào chia hết cho $5$?`, answer: `$15$ và $25$.`, solution: `Số chia hết cho $5$ là số có chữ số tận cùng bằng $0$ hoặc $5$.\n- $12$: tận cùng $2$ → không chia hết cho $5$.\n- $15$: tận cùng $5$ → chia hết cho $5$. ✓\n- $20$: tận cùng $0$ → chia hết cho $5$. ✓\n- $25$: tận cùng $5$ → chia hết cho $5$. ✓\n\nVậy $\\boxed{15, 20, 25}$ chia hết cho $5$.`, difficulty: 'nhan_biet', question_type: 'tu_luan' },
      { content: `Cho $a = 24$ và $b = 6$. Kiểm tra $a$ có chia hết cho $b$ không. Tìm thương.`, answer: `$24 \\vdots 6$, thương bằng $4$.`, solution: `$24 : 6 = 4$ (chia hết, dư $0$).\n\nVậy $24$ chia hết cho $6$, ta viết $24 \\vdots 6$. Thương là $\\boxed{4}$.`, difficulty: 'nhan_biet', question_type: 'tu_luan' },
      { content: `Biết $12 \\vdots 4$ và $20 \\vdots 4$. Hỏi $(12 + 20)$ có chia hết cho $4$ không?`, answer: `Có. $32 \\vdots 4$.`, solution: `Áp dụng tính chất: Nếu $a \\vdots m$ và $b \\vdots m$ thì $(a + b) \\vdots m$.\n\nVì $12 \\vdots 4$ và $20 \\vdots 4$ nên $(12 + 20) = 32 \\vdots 4$.\n\nKiểm tra: $32 : 4 = 8$ ✓.`, difficulty: 'nhan_biet', question_type: 'tu_luan' },
      { content: `Biết $15 \\vdots 3$ và $7$ không chia hết cho $3$. Hỏi $(15 + 7)$ có chia hết cho $3$ không?`, answer: `Không. $22$ không chia hết cho $3$.`, solution: `Áp dụng tính chất: Nếu $a \\vdots m$ và $b$ không chia hết cho $m$ thì $(a + b)$ không chia hết cho $m$.\n\nVì $15 \\vdots 3$ nhưng $7$ không chia hết cho $3$, nên $15 + 7 = 22$ không chia hết cho $3$.\n\nKiểm tra: $22 = 3 \\times 7 + 1$ (dư $1$) ✓.`, difficulty: 'thong_hieu', question_type: 'tu_luan' },
      { content: `Tìm các số tự nhiên $x$ sao cho $(x + 3) \\vdots 5$ và $x < 20$.`, answer: `$x \\in \\{2, 7, 12, 17\\}$.`, solution: `$(x + 3) \\vdots 5$ tức $x + 3 \\in \\{0, 5, 10, 15, 20, ...\\}$.\n\nSuy ra $x \\in \\{-3, 2, 7, 12, 17, 22, ...\\}$.\n\nVì $x$ là số tự nhiên và $x < 20$: $x \\in \\{2, 7, 12, 17\\}$.`, difficulty: 'thong_hieu', question_type: 'tu_luan' },
      { content: `Chứng minh rằng tổng của ba số tự nhiên liên tiếp luôn chia hết cho $3$.`, answer: `$n + (n+1) + (n+2) = 3n + 3 = 3(n+1) \\vdots 3$.`, solution: `Gọi ba số tự nhiên liên tiếp là $n, n+1, n+2$.\n\nTổng:\n$$n + (n+1) + (n+2) = 3n + 3 = 3(n + 1)$$\n\nVì $3(n+1)$ có thừa số $3$ nên chia hết cho $3$. $\\blacksquare$`, difficulty: 'thong_hieu', question_type: 'tu_luan' },
      { content: `Tìm $n \\in \\mathbb{N}$ để $(2n + 7) \\vdots (n + 1)$.`, answer: `$n \\in \\{0, 4\\}$.`, solution: `Ta có:\n$$2n + 7 = 2(n + 1) + 5$$\n\nĐể $(2n + 7) \\vdots (n + 1)$ thì $5 \\vdots (n + 1)$.\n\nCác ước dương của $5$: $1, 5$.\n\n- $n + 1 = 1 \\Rightarrow n = 0$\n- $n + 1 = 5 \\Rightarrow n = 4$\n\nVậy $n \\in \\{0, 4\\}$.`, difficulty: 'van_dung', question_type: 'tu_luan' },
      { content: `Chứng minh: $n^2 + 3n$ chia hết cho $2$ với mọi $n \\in \\mathbb{N}$.`, answer: `$n^2 + 3n = n(n+3) \\vdots 2$.`, solution: `$$n^2 + 3n = n(n + 3)$$\n\n**Trường hợp 1:** $n$ chẵn → $n \\vdots 2$ → $n(n+3) \\vdots 2$.\n\n**Trường hợp 2:** $n$ lẻ → $n + 3$ chẵn → $(n+3) \\vdots 2$ → $n(n+3) \\vdots 2$.\n\nTrong mọi trường hợp, $n(n+3) \\vdots 2$. $\\blacksquare$`, difficulty: 'van_dung', question_type: 'tu_luan' },
      { content: `Chứng minh rằng tích của hai số tự nhiên liên tiếp chia hết cho $2$, tích của ba số tự nhiên liên tiếp chia hết cho $6$.`, answer: `$n(n+1) \\vdots 2$ và $n(n+1)(n+2) \\vdots 6$.`, solution: `**Phần 1:** Trong hai số liên tiếp $n$ và $n+1$, luôn có đúng một số chẵn nên $n(n+1) \\vdots 2$.\n\n**Phần 2:** Cần CM $n(n+1)(n+2) \\vdots 6 = 2 \\times 3$.\n- $n(n+1)(n+2) \\vdots 2$: trong $3$ số liên tiếp có ít nhất $1$ số chẵn.\n- $n(n+1)(n+2) \\vdots 3$: trong $3$ số liên tiếp có đúng $1$ số chia hết cho $3$.\n\nVì $\\gcd(2, 3) = 1$ nên $n(n+1)(n+2) \\vdots 6$. $\\blacksquare$`, difficulty: 'van_dung_cao', question_type: 'tu_luan' },
      { content: `Tìm tất cả $n \\in \\mathbb{N}$ để $n^2 + n + 6$ chia hết cho $n + 1$.`, answer: `$n \\in \\{0, 1, 4\\}$.`, solution: `$$n^2 + n + 6 = n(n + 1) + 6$$\n\nVì $n(n+1) \\vdots (n+1)$, nên $(n^2 + n + 6) \\vdots (n+1) \\Leftrightarrow 6 \\vdots (n+1)$.\n\nCác ước dương của $6$: $1, 2, 3, 6$.\n\n- $n + 1 = 1 \\Rightarrow n = 0$\n- $n + 1 = 2 \\Rightarrow n = 1$\n- $n + 1 = 3 \\Rightarrow n = 2$\n- $n + 1 = 6 \\Rightarrow n = 5$\n\nVậy $n \\in \\{0, 1, 2, 5\\}$.`, difficulty: 'van_dung_cao', question_type: 'tu_luan' },
    ]
  },
  // ===== BÀI 9: Dấu hiệu chia hết =====
  {
    categoryId: 'e508496c-7b5e-4dd9-9c40-025a2c885747',
    prefix: 'T6-C2B9',
    questions: [
      { content: `Trong các số $234, 345, 450, 567$, số nào chia hết cho $2$? Số nào chia hết cho $5$?`, answer: `Chia hết cho $2$: $234, 450$. Chia hết cho $5$: $345, 450$.`, solution: `**Dấu hiệu chia hết cho $2$:** Chữ số tận cùng chẵn ($0, 2, 4, 6, 8$).\n- $234$: tận cùng $4$ ✓\n- $345$: tận cùng $5$ ✗\n- $450$: tận cùng $0$ ✓\n- $567$: tận cùng $7$ ✗\n\n**Dấu hiệu chia hết cho $5$:** Chữ số tận cùng $0$ hoặc $5$.\n- $234$: tận cùng $4$ ✗\n- $345$: tận cùng $5$ ✓\n- $450$: tận cùng $0$ ✓\n- $567$: tận cùng $7$ ✗`, difficulty: 'nhan_biet', question_type: 'tu_luan' },
      { content: `Kiểm tra $2034$ có chia hết cho $3$ không? Có chia hết cho $9$ không?`, answer: `$2034 \\vdots 3$ nhưng $2034$ không chia hết cho $9$.`, solution: `Tổng chữ số: $2 + 0 + 3 + 4 = 9$.\n- Chia hết cho $3$: $9 \\vdots 3$ ✓ → $2034 \\vdots 3$.\n- Chia hết cho $9$: $9 \\vdots 9$ ✓ → $2034 \\vdots 9$ cũng đúng!\n\nKiểm tra: $2034 : 9 = 226$ ✓.\n\nVậy $2034$ chia hết cho cả $3$ **và** $9$.`, difficulty: 'nhan_biet', question_type: 'tu_luan' },
      { content: `Tìm chữ số $a$ để $\\overline{25a}$ chia hết cho $3$.`, answer: `$a \\in \\{2, 5, 8\\}$.`, solution: `Tổng chữ số: $2 + 5 + a = 7 + a$.\n\nĐể $\\overline{25a} \\vdots 3$ cần $(7 + a) \\vdots 3$.\n\nVới $0 \\le a \\le 9$: $7 \\le 7 + a \\le 16$.\n\nCác giá trị $(7+a)$ chia hết cho $3$: $9, 12, 15$.\n- $7 + a = 9 \\Rightarrow a = 2$\n- $7 + a = 12 \\Rightarrow a = 5$\n- $7 + a = 15 \\Rightarrow a = 8$\n\nVậy $a \\in \\{2, 5, 8\\}$.`, difficulty: 'nhan_biet', question_type: 'tu_luan' },
      { content: `Tìm chữ số $x$ để $\\overline{3x5}$ chia hết cho cả $5$ và $9$.`, answer: `$x = 1$.`, solution: `**Chia hết cho $5$:** Chữ số tận cùng $5$ ✓ (luôn thỏa).\n\n**Chia hết cho $9$:** Tổng chữ số $(3 + x + 5) = 8 + x$ phải chia hết cho $9$.\n\nVới $0 \\le x \\le 9$: $8 \\le 8 + x \\le 17$.\n\n$8 + x = 9 \\Rightarrow x = 1$.\n$8 + x = 18 \\Rightarrow x = 10$ (loại).\n\nVậy $x = \\boxed{1}$. Số là $315$.`, difficulty: 'thong_hieu', question_type: 'tu_luan' },
      { content: `Tìm các chữ số $a, b$ để $\\overline{a5b}$ chia hết cho cả $2$ và $3$.`, answer: `Nhiều cặp $(a,b)$ thỏa mãn, ví dụ $(1,0), (1,6), (2,2), ...$.`, solution: `**Chia hết cho $2$:** $b$ chẵn, tức $b \\in \\{0, 2, 4, 6, 8\\}$.\n\n**Chia hết cho $3$:** $(a + 5 + b) \\vdots 3$.\n\nVới mỗi $b$ chẵn, tìm $a$ ($1 \\le a \\le 9$) sao cho $(a + 5 + b) \\vdots 3$:\n\n- $b = 0$: $a + 5 \\vdots 3 \\Rightarrow a \\in \\{1, 4, 7\\}$\n- $b = 2$: $a + 7 \\vdots 3 \\Rightarrow a \\in \\{2, 5, 8\\}$\n- $b = 4$: $a + 9 \\vdots 3 \\Rightarrow a \\in \\{3, 6, 9\\}$\n- $b = 6$: $a + 11 \\vdots 3 \\Rightarrow a \\in \\{1, 4, 7\\}$\n- $b = 8$: $a + 13 \\vdots 3 \\Rightarrow a \\in \\{2, 5, 8\\}$\n\nTổng cộng có $15$ số thỏa mãn.`, difficulty: 'thong_hieu', question_type: 'tu_luan' },
      { content: `Chứng minh số $A = \\overline{abcabc}$ chia hết cho $7$, $11$ và $13$.`, answer: `$A = \\overline{abc} \\times 1001 = \\overline{abc} \\times 7 \\times 11 \\times 13$.`, solution: `$$A = \\overline{abc} \\times 1000 + \\overline{abc} = \\overline{abc} \\times 1001$$\n\nPhân tích: $1001 = 7 \\times 11 \\times 13$.\n\nVậy $A = \\overline{abc} \\times 7 \\times 11 \\times 13$, nên $A$ chia hết cho $7$, $11$ và $13$. $\\blacksquare$`, difficulty: 'thong_hieu', question_type: 'tu_luan' },
      { content: `Chứng minh: Một số tự nhiên chia hết cho $6$ khi và chỉ khi nó chia hết cho cả $2$ và $3$.`, answer: `Dùng tính chất chia hết và $\\gcd(2,3) = 1$.`, solution: `**Chiều thuận:** $n \\vdots 6 \\Rightarrow n \\vdots 2$ và $n \\vdots 3$ (vì $6 = 2 \\times 3$).\n\n**Chiều đảo:** $n \\vdots 2$ và $n \\vdots 3$. Vì $\\gcd(2, 3) = 1$ (nguyên tố cùng nhau), nên $n \\vdots (2 \\times 3) = 6$.\n\nVậy $n \\vdots 6 \\Leftrightarrow n \\vdots 2$ và $n \\vdots 3$. $\\blacksquare$`, difficulty: 'van_dung', question_type: 'tu_luan' },
      { content: `Tìm số tự nhiên nhỏ nhất có bốn chữ số khác nhau và chia hết cho cả $2$, $3$ và $5$.`, answer: `$1020$.`, solution: `Số cần tìm chia hết cho $\\text{lcm}(2, 3, 5) = 30$.\n\nSố có $4$ chữ số nhỏ nhất là $1000$. Bội của $30$ gần $1000$: $1020, 1050, 1080, ...$\n\n- $1020$: chữ số $1, 0, 2, 0$ — chữ số $0$ lặp lại! → loại.\n- $1050$: chữ số $1, 0, 5, 0$ — $0$ lặp → loại.\n- $1080$: chữ số $1, 0, 8, 0$ — $0$ lặp → loại.\n- $1230$: chữ số $1, 2, 3, 0$ — khác nhau ✓\n\nVậy đáp án là $\\boxed{1230}$.`, difficulty: 'van_dung', question_type: 'tu_luan' },
      { content: `Chứng minh: $10^n + 18n - 1$ chia hết cho $27$ với mọi $n \\in \\mathbb{N}^*$.`, answer: `Chứng minh bằng quy nạp.`, solution: `**Chứng minh bằng quy nạp:**\n\n**Bước cơ sở:** $n = 1$: $10 + 18 - 1 = 27 \\vdots 27$ ✓.\n\n**Giả thiết quy nạp:** Giả sử $10^k + 18k - 1 \\vdots 27$ đúng.\n\n**Bước quy nạp:** Xét $n = k + 1$:\n$$10^{k+1} + 18(k+1) - 1 = 10 \\cdot 10^k + 18k + 17$$\n$$= 10(10^k + 18k - 1) - 180k + 10 + 18k + 17$$\n$$= 10(10^k + 18k - 1) - 162k + 27$$\n$$= 10(10^k + 18k - 1) - 27(6k - 1)$$\n\nTheo GTQN: $10^k + 18k - 1 \\vdots 27$, và $27(6k-1) \\vdots 27$.\n\nVậy $10^{k+1} + 18(k+1) - 1 \\vdots 27$. $\\blacksquare$`, difficulty: 'van_dung_cao', question_type: 'tu_luan' },
      { content: `Tìm tất cả số tự nhiên $\\overline{abc}$ chia hết cho $36$ sao cho $a + b + c = 9$ và $a = 2c$.`, answer: `$\\overline{abc} = 612$.`, solution: `**Chia hết cho $36 = 4 \\times 9$:**\n- Chia hết cho $9$: $a + b + c = 9$ ✓ (đã cho).\n- Chia hết cho $4$: $\\overline{bc} \\vdots 4$.\n\n**Từ $a = 2c$ và $a + b + c = 9$:**\n$2c + b + c = 9 \\Rightarrow b = 9 - 3c$.\n\nĐiều kiện: $1 \\le a \\le 9$, $0 \\le b, c \\le 9$, $a \\ge 1$.\n- $a = 2c \\ge 1 \\Rightarrow c \\ge 1$.\n- $b = 9 - 3c \\ge 0 \\Rightarrow c \\le 3$.\n\nCác giá trị:\n- $c = 1$: $a = 2, b = 6$ → $\\overline{bc} = 61$. $61 : 4 = 15$ dư $1$ ✗\n- $c = 2$: $a = 4, b = 3$ → $\\overline{bc} = 32$. $32 : 4 = 8$ ✓ → $\\overline{abc} = 432$\n- $c = 3$: $a = 6, b = 0$ → $\\overline{bc} = 03 = 3$. $3 : 4$ ✗\n\nKiểm tra: $432 : 36 = 12$ ✓.\n\nVậy $\\overline{abc} = \\boxed{432}$.`, difficulty: 'van_dung_cao', question_type: 'tu_luan' },
    ]
  },
];

async function main() {
  let total = 0;
  for (const batch of batches) {
    console.log('=== ' + batch.prefix + ' ===');
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
    total += count;
  }
  console.log('\nTotal: ' + total + ' questions inserted.');
}
main().catch(console.error);
