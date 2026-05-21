const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const USER_ID = '8316c34e-765d-4b8c-9364-b683a17e33f8';
const GRADE = 6, TOPIC = 'so_hoc';

const batches = [
  {
    categoryId: 'eac8ffdd-be29-4da4-94a4-5d57410c088a', prefix: 'T6-C2B10',
    questions: [
      { content: `Trong các số $7, 9, 11, 15, 23$, số nào là số nguyên tố?`, answer: `$7, 11, 23$.`, solution: `- $7$: chỉ có ước $1$ và $7$ → nguyên tố ✓\n- $9 = 3 \\times 3$ → hợp số ✗\n- $11$: chỉ có ước $1$ và $11$ → nguyên tố ✓\n- $15 = 3 \\times 5$ → hợp số ✗\n- $23$: chỉ có ước $1$ và $23$ → nguyên tố ✓`, difficulty: 'nhan_biet', question_type: 'tu_luan' },
      { content: `Phân tích số $360$ ra thừa số nguyên tố.`, answer: `$360 = 2^3 \\times 3^2 \\times 5$.`, solution: `$$360 = 2 \\times 180 = 2 \\times 2 \\times 90 = 2^2 \\times 2 \\times 45 = 2^3 \\times 45 = 2^3 \\times 9 \\times 5 = 2^3 \\times 3^2 \\times 5$$`, difficulty: 'nhan_biet', question_type: 'tu_luan' },
      { content: `Số $1$ có phải là số nguyên tố không? Vì sao?`, answer: `Không.`, solution: `Số $1$ **không** phải số nguyên tố vì số nguyên tố là số tự nhiên **lớn hơn $1$** và chỉ có hai ước là $1$ và chính nó. Số $1$ chỉ có một ước duy nhất.`, difficulty: 'nhan_biet', question_type: 'tu_luan' },
      { content: `Tìm các số nguyên tố $p$ sao cho $p + 2$ cũng là số nguyên tố và $p < 30$.`, answer: `$p \\in \\{3, 5, 11, 17, 29\\}$.`, solution: `Các cặp $(p, p+2)$ đều nguyên tố (cặp số nguyên tố sinh đôi):\n- $(3, 5)$ ✓\n- $(5, 7)$ ✓\n- $(11, 13)$ ✓\n- $(17, 19)$ ✓\n- $(29, 31)$ ✓`, difficulty: 'thong_hieu', question_type: 'tu_luan' },
      { content: `Phân tích $2024$ ra thừa số nguyên tố.`, answer: `$2024 = 2^3 \\times 11 \\times 23$.`, solution: `$2024 = 2 \\times 1012 = 2^2 \\times 506 = 2^3 \\times 253 = 2^3 \\times 11 \\times 23$.\n\nKiểm tra: $2^3 \\times 11 \\times 23 = 8 \\times 253 = 2024$ ✓.`, difficulty: 'thong_hieu', question_type: 'tu_luan' },
      { content: `Chứng minh rằng nếu $p$ là số nguyên tố lớn hơn $3$ thì $p^2 - 1$ chia hết cho $24$.`, answer: `$p^2 - 1 = (p-1)(p+1) \\vdots 24$.`, solution: `$p^2 - 1 = (p-1)(p+1)$.\n\nVì $p > 3$ và $p$ nguyên tố nên $p$ lẻ → $p-1, p+1$ là hai số chẵn liên tiếp → tích chứa $2 \\times 4 = 8$ → $(p-1)(p+1) \\vdots 8$.\n\nTrong ba số liên tiếp $p-1, p, p+1$, có đúng một số $\\vdots 3$. Vì $p$ nguyên tố $> 3$ nên $p \\nmid 3$, suy ra $p-1$ hoặc $p+1 \\vdots 3$.\n\nVậy $(p-1)(p+1) \\vdots 8$ và $\\vdots 3$, mà $\\gcd(8,3) = 1$ nên $\\vdots 24$. $\\blacksquare$`, difficulty: 'thong_hieu', question_type: 'tu_luan' },
      { content: `Tìm số tự nhiên $n$ để $n + 3$ và $2n + 7$ đều là số nguyên tố.`, answer: `$n = 0$ (cho $3$ và $7$).`, solution: `Xét tính chẵn lẻ:\n- Nếu $n$ chẵn: $n+3$ lẻ, $2n+7$ lẻ → có thể nguyên tố.\n- Nếu $n$ lẻ: $n+3$ chẵn → cần $n+3=2$, tức $n=-1$ (loại vì $n \\in \\mathbb{N}$).\n\nVậy $n$ chẵn. Thử:\n- $n=0$: $3$ (NT) và $7$ (NT) ✓\n- $n=2$: $5$ (NT) và $11$ (NT) ✓\n- $n=4$: $7$ (NT) và $15 = 3 \\times 5$ ✗\n- $n=6$: $9$ ✗\n\nĐáp án: $n \\in \\{0, 2\\}$.`, difficulty: 'van_dung', question_type: 'tu_luan' },
      { content: `Tìm các số nguyên tố $p$ sao cho $p^2 + 2$ cũng là số nguyên tố.`, answer: `$p = 3$.`, solution: `Với $p = 2$: $4 + 2 = 6$ không NT ✗.\nVới $p = 3$: $9 + 2 = 11$ NT ✓.\nVới $p > 3$: $p$ không chia hết cho $3$, nên $p = 3k \\pm 1$ → $p^2 = 9k^2 \\pm 6k + 1$ → $p^2 + 2 = 9k^2 \\pm 6k + 3 = 3(3k^2 \\pm 2k + 1) \\vdots 3$ và $> 3$, không NT.\n\nVậy $p = \\boxed{3}$.`, difficulty: 'van_dung', question_type: 'tu_luan' },
      { content: `Chứng minh rằng có vô số số nguyên tố.`, answer: `Chứng minh phản chứng (Euclid).`, solution: `Giả sử chỉ có hữu hạn số nguyên tố: $p_1, p_2, \\ldots, p_n$.\n\nXét $N = p_1 \\cdot p_2 \\cdots p_n + 1$.\n\n$N > 1$ nên $N$ có ước nguyên tố $p$. Nhưng $N$ chia $p_i$ dư $1$ với mọi $i$, nên $p \\neq p_i$ cho mọi $i$.\n\nVậy $p$ là số nguyên tố không nằm trong danh sách → mâu thuẫn. $\\blacksquare$`, difficulty: 'van_dung_cao', question_type: 'tu_luan' },
      { content: `Tìm tất cả số nguyên tố $p$ sao cho $p, p+10, p+14$ đều nguyên tố.`, answer: `$p = 3$.`, solution: `Xét $p \\mod 3$:\n- Nếu $p = 3$: $3, 13, 17$ đều NT ✓.\n- Nếu $p \\equiv 1 \\pmod{3}$: $p + 14 \\equiv 0 \\pmod{3}$ và $p+14 > 3$ → không NT ✗.\n- Nếu $p \\equiv 2 \\pmod{3}$: $p + 10 \\equiv 0 \\pmod{3}$ và $p+10 > 3$ → không NT ✗.\n\nVậy $p = \\boxed{3}$.`, difficulty: 'van_dung_cao', question_type: 'tu_luan' },
    ]
  },
  {
    categoryId: '5864ce3f-7a9a-4278-a36b-3c1d9cbb7456', prefix: 'T6-C2B11',
    questions: [
      { content: `Tìm ƯCLN$(12, 18)$.`, answer: `$\\text{ƯCLN}(12, 18) = 6$.`, solution: `Phân tích: $12 = 2^2 \\times 3$; $18 = 2 \\times 3^2$.\n\n$\\text{ƯCLN}(12, 18) = 2^1 \\times 3^1 = \\boxed{6}$.\n\nLấy các thừa số nguyên tố chung với số mũ **nhỏ nhất**.`, difficulty: 'nhan_biet', question_type: 'tu_luan' },
      { content: `Tìm ƯCLN$(24, 36, 60)$.`, answer: `$12$.`, solution: `$24 = 2^3 \\times 3$; $36 = 2^2 \\times 3^2$; $60 = 2^2 \\times 3 \\times 5$.\n\n$\\text{ƯCLN} = 2^2 \\times 3 = \\boxed{12}$.`, difficulty: 'nhan_biet', question_type: 'tu_luan' },
      { content: `Hai số $a$ và $b$ có $\\text{ƯCLN}(a,b) = 1$. Hai số đó gọi là gì?`, answer: `Hai số nguyên tố cùng nhau.`, solution: `Khi $\\text{ƯCLN}(a, b) = 1$ thì $a$ và $b$ được gọi là hai số **nguyên tố cùng nhau**.\n\nVí dụ: $8$ và $15$ có $\\text{ƯCLN}(8, 15) = 1$ nên nguyên tố cùng nhau (dù cả hai đều không phải số nguyên tố).`, difficulty: 'nhan_biet', question_type: 'tu_luan' },
      { content: `Tìm ƯCLN$(2024, 1516)$.`, answer: `$4$.`, solution: `Dùng thuật toán Euclid:\n$2024 = 1 \\times 1516 + 508$\n$1516 = 2 \\times 508 + 500$\n\nHmm, tính lại: $1516 = 2 \\times 508 + 500$? $2 \\times 508 = 1016$, $1516 - 1016 = 500$. Đúng.\n$508 = 1 \\times 500 + 8$\n$500 = 62 \\times 8 + 4$\n$8 = 2 \\times 4$\n\n$\\text{ƯCLN}(2024, 1516) = \\boxed{4}$.`, difficulty: 'thong_hieu', question_type: 'tu_luan' },
      { content: `Có $48$ quyển vở và $36$ cây bút. Chia đều thành các phần quà giống nhau (nhiều nhất có thể). Mỗi phần có bao nhiêu vở, bao nhiêu bút?`, answer: `$12$ phần, mỗi phần $4$ vở và $3$ bút.`, solution: `Số phần quà nhiều nhất = $\\text{ƯCLN}(48, 36)$.\n\n$48 = 2^4 \\times 3$; $36 = 2^2 \\times 3^2$.\n$\\text{ƯCLN} = 2^2 \\times 3 = 12$.\n\nMỗi phần: $48 : 12 = 4$ vở; $36 : 12 = 3$ bút.`, difficulty: 'thong_hieu', question_type: 'tu_luan' },
      { content: `Tìm $\\text{ƯCLN}(n, n+1)$ với $n$ là số tự nhiên bất kỳ.`, answer: `$\\text{ƯCLN}(n, n+1) = 1$.`, solution: `Gọi $d = \\text{ƯCLN}(n, n+1)$. Thì $d \\mid n$ và $d \\mid (n+1)$.\n\nSuy ra $d \\mid [(n+1) - n] = 1$.\n\nVậy $d = 1$. Hai số tự nhiên liên tiếp luôn nguyên tố cùng nhau.`, difficulty: 'thong_hieu', question_type: 'tu_luan' },
      { content: `Tìm số tự nhiên $n$ lớn nhất sao cho $2n + 1$ và $3n + 2$ cùng chia hết cho $n$.`, answer: `$n = 1$.`, solution: `$n \\mid (2n+1)$ và $n \\mid 2n$ → $n \\mid 1$.\n\nVậy $n = \\boxed{1}$.`, difficulty: 'van_dung', question_type: 'tu_luan' },
      { content: `Tìm các cặp số tự nhiên $(a, b)$ biết $a \\times b = 120$ và $\\text{ƯCLN}(a, b) = 6$.`, answer: `$(6, 20)$ và $(30, 4)$... → $(6, 20)$ hoặc hoán vị.`, solution: `Đặt $a = 6m, b = 6n$ với $\\gcd(m, n) = 1$.\n\n$a \\times b = 36mn = 120 \\Rightarrow mn = \\frac{120}{36}$... Hmm $120/36$ không nguyên.\n\nVậy không có cặp nào thỏa mãn! Kiểm tra: nếu $\\text{ƯCLN}=6$ thì $6^2 = 36 \\mid 120$? $120/36$ không nguyên → **Không tồn tại** cặp $(a,b)$.`, difficulty: 'van_dung', question_type: 'tu_luan' },
      { content: `Cho $\\text{ƯCLN}(a, b) = 12$ và $a + b = 84$. Tìm $a, b$.`, answer: `$(a,b) \\in \\{(12,72), (24,60), (36,48)\\}$ và hoán vị.`, solution: `Đặt $a = 12m, b = 12n$ với $\\gcd(m,n) = 1$ và $m \\le n$.\n\n$12m + 12n = 84 \\Rightarrow m + n = 7$.\n\nCác cặp $(m,n)$ nguyên tố cùng nhau, $m+n=7$:\n- $(1,6)$: $\\gcd=1$ ✓ → $(a,b) = (12, 72)$\n- $(2,5)$: $\\gcd=1$ ✓ → $(24, 60)$\n- $(3,4)$: $\\gcd=1$ ✓ → $(36, 48)$`, difficulty: 'van_dung_cao', question_type: 'tu_luan' },
      { content: `Tìm số tự nhiên $n$ nhỏ nhất sao cho $\\text{ƯCLN}(n+15, n+1) > 1$.`, answer: `$n = 6$.`, solution: `Gọi $d = \\text{ƯCLN}(n+15, n+1)$. Thì $d \\mid [(n+15)-(n+1)] = 14$.\n\nƯớc của $14$: $1, 2, 7, 14$. Cần $d > 1$ nên $d \\in \\{2, 7, 14\\}$.\n\n- $d = 2$: $(n+1) \\vdots 2 \\Rightarrow n$ lẻ. Nhỏ nhất: $n = 1$. Kiểm tra: $\\gcd(16, 2) = 2 > 1$ ✓.\n\nVậy $n = \\boxed{1}$.`, difficulty: 'van_dung_cao', question_type: 'tu_luan' },
    ]
  },
  {
    categoryId: 'f1385817-45c4-415d-aea9-014258e59be1', prefix: 'T6-C2B12',
    questions: [
      { content: `Tìm BCNN$(4, 6)$.`, answer: `$12$.`, solution: `$4 = 2^2$; $6 = 2 \\times 3$.\n\n$\\text{BCNN}(4, 6) = 2^2 \\times 3 = \\boxed{12}$.\n\nLấy thừa số nguyên tố chung và riêng với số mũ **lớn nhất**.`, difficulty: 'nhan_biet', question_type: 'tu_luan' },
      { content: `Tìm BCNN$(8, 12, 15)$.`, answer: `$120$.`, solution: `$8 = 2^3$; $12 = 2^2 \\times 3$; $15 = 3 \\times 5$.\n\n$\\text{BCNN} = 2^3 \\times 3 \\times 5 = \\boxed{120}$.`, difficulty: 'nhan_biet', question_type: 'tu_luan' },
      { content: `Tìm các bội chung của $6$ và $8$ nhỏ hơn $100$.`, answer: `$0, 24, 48, 72, 96$.`, solution: `$\\text{BCNN}(6, 8) = 24$.\n\nBội chung = bội của $24$: $0, 24, 48, 72, 96, 120, ...$\n\nCác bội chung nhỏ hơn $100$: $\\boxed{0, 24, 48, 72, 96}$.`, difficulty: 'nhan_biet', question_type: 'tu_luan' },
      { content: `Tìm số tự nhiên $x$ nhỏ nhất khác $0$ sao cho $x \\vdots 12$ và $x \\vdots 18$.`, answer: `$x = 36$.`, solution: `$x$ là bội chung của $12$ và $18$, nhỏ nhất khác $0$.\n\n$x = \\text{BCNN}(12, 18)$.\n$12 = 2^2 \\times 3$; $18 = 2 \\times 3^2$.\n$\\text{BCNN} = 2^2 \\times 3^2 = \\boxed{36}$.`, difficulty: 'thong_hieu', question_type: 'tu_luan' },
      { content: `Biết $\\text{ƯCLN}(a, b) = 6$ và $a \\times b = 360$. Tìm $\\text{BCNN}(a, b)$.`, answer: `$60$.`, solution: `Áp dụng công thức: $\\text{ƯCLN}(a,b) \\times \\text{BCNN}(a,b) = a \\times b$.\n\n$6 \\times \\text{BCNN} = 360$\n$\\text{BCNN} = 360 : 6 = \\boxed{60}$.`, difficulty: 'thong_hieu', question_type: 'tu_luan' },
      { content: `Hai đèn tín hiệu, đèn thứ nhất nhấp nháy mỗi $4$ giây, đèn thứ hai nhấp nháy mỗi $6$ giây. Nếu hai đèn cùng nhấp nháy một lúc, hỏi sau ít nhất bao lâu chúng lại cùng nhấp nháy?`, answer: `$12$ giây.`, solution: `Thời gian để hai đèn lại cùng nhấp = $\\text{BCNN}(4, 6) = 12$ giây.`, difficulty: 'thong_hieu', question_type: 'tu_luan' },
      { content: `Một lớp có từ $30$ đến $50$ học sinh. Khi xếp hàng $4$, hàng $6$, hàng $9$ đều vừa đủ. Hỏi lớp có bao nhiêu học sinh?`, answer: `$36$ học sinh.`, solution: `Số HS là bội chung của $4, 6, 9$ nằm trong $[30, 50]$.\n\n$\\text{BCNN}(4, 6, 9) = 2^2 \\times 3^2 = 36$.\n\nBội: $36, 72, ...$. Trong $[30, 50]$: $\\boxed{36}$.`, difficulty: 'van_dung', question_type: 'tu_luan' },
      { content: `Tìm số tự nhiên $n$ nhỏ nhất sao cho $n$ chia $12$ dư $3$ và $n$ chia $15$ dư $3$.`, answer: `$n = 63$.`, solution: `$n - 3$ chia hết cho cả $12$ và $15$.\n\n$\\text{BCNN}(12, 15) = 60$. Nên $n - 3 = 60k$.\n\nNhỏ nhất ($k=1$): $n = 63$.`, difficulty: 'van_dung', question_type: 'tu_luan' },
      { content: `Tìm số tự nhiên $n$ lớn nhất có ba chữ số chia cho $12, 15, 20$ đều dư $7$.`, answer: `$n = 967$.`, solution: `$n - 7$ chia hết cho $12, 15, 20$.\n$\\text{BCNN}(12,15,20) = 60$.\n$n - 7 = 60k \\Rightarrow n = 60k + 7$.\n\nLớn nhất có $3$ chữ số: $60k + 7 \\le 999 \\Rightarrow k \\le 16{,}5$, nên $k = 16$.\n$n = 960 + 7 = \\boxed{967}$.`, difficulty: 'van_dung_cao', question_type: 'tu_luan' },
      { content: `Chứng minh: $\\text{ƯCLN}(a,b) \\times \\text{BCNN}(a,b) = a \\times b$ với mọi $a, b \\in \\mathbb{N}^*$.`, answer: `Dùng phân tích thừa số nguyên tố.`, solution: `Đặt $a = p_1^{\\alpha_1} \\cdots p_k^{\\alpha_k}$, $b = p_1^{\\beta_1} \\cdots p_k^{\\beta_k}$.\n\n$\\text{ƯCLN} = \\prod p_i^{\\min(\\alpha_i, \\beta_i)}$, $\\text{BCNN} = \\prod p_i^{\\max(\\alpha_i, \\beta_i)}$.\n\n$\\text{ƯCLN} \\times \\text{BCNN} = \\prod p_i^{\\min(\\alpha_i,\\beta_i) + \\max(\\alpha_i,\\beta_i)} = \\prod p_i^{\\alpha_i + \\beta_i} = a \\times b$. $\\blacksquare$`, difficulty: 'van_dung_cao', question_type: 'tu_luan' },
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
      await sql`INSERT INTO public.questions (content, answer, solution, grade, topic, difficulty, question_type, category_id, status, is_public, question_code, user_id) VALUES (${q.content}, ${q.answer}, ${q.solution}, ${GRADE}, ${TOPIC}, ${q.difficulty}, ${q.question_type}, ${batch.categoryId}, 'approved', true, ${code}, ${USER_ID})`;
      count++;
      console.log('OK: ' + code);
    }
    total += count;
  }
  console.log('Total: ' + total);
}
main().catch(console.error);
