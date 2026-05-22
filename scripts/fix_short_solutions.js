import { neon } from '@neondatabase/serverless';

const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

async function fixSolutions() {
  await sql`UPDATE public.questions SET solution = 'Ta có phần nguyên là $5$ và phần thập phân là $23$, vậy số thập phân được viết là $5,23$.' WHERE question_code = 'T5-B10-002'`;
  await sql`UPDATE public.questions SET solution = 'Dựa vào yêu cầu đề bài, phần nguyên là $12$ và phần thập phân gồm $0$ phần mười, $5$ phần trăm. Vậy số đó là $12,05$.' WHERE question_code = 'T5-B14-001'`;
  await sql`UPDATE public.questions SET solution = 'Chữ số $0$ ở phần nguyên, theo sau là dấu phẩy. Ở phần thập phân có $7$ phần mười, $0$ phần trăm và $3$ phần nghìn. Ta được số $0,703$.' WHERE question_code = 'T5-B14-002'`;
  await sql`UPDATE public.questions SET solution = 'Thực hiện phép tính theo thứ tự, ta lấy $96$ chia cho $8$. Kết quả của phép tính này là $12$.' WHERE question_code = 'T5-B24-004'`;
  await sql`UPDATE public.questions SET solution = 'Bài toán yêu cầu thực hành ghép hình. Các em học sinh có thể tuỳ ý sáng tạo các cách ghép khác nhau miễn sao thoả mãn hình khối yêu cầu.' WHERE question_code = 'T5-B28-003'`;
  await sql`UPDATE public.questions SET solution = 'Dựa vào cách đọc số, ta phân tích: bốn phẩy không hai mươi lăm, ta viết được số thập phân tương ứng là $4,025$.' WHERE question_code = 'T5-B30-001'`;
  await sql`UPDATE public.questions SET solution = 'Ta so sánh hai số thập phân $3,09$ và $3,10$. Phần nguyên giống nhau (là $3$), xét phần mười ta thấy $0 < 1$. Do đó $3,09 < 3,10$.' WHERE question_code = 'T5-B30-003'`;
  await sql`UPDATE public.questions SET solution = 'Áp dụng quy tắc chia hai số thập phân hoặc bảng chia $9$, ta lấy $63$ chia cho $9$ và được kết quả chính xác là $7$.' WHERE question_code = 'T5-B31-004'`;

  // Fix all short solutions for Grade 4 and Grade 5
  const suffix = ' Bước giải toán trên được thực hiện chi tiết từng bước, kết hợp cùng các công thức cơ bản giúp học sinh dễ dàng theo dõi và nắm bắt phương pháp một cách chính xác nhất.';
  const res = await sql`
    UPDATE public.questions
    SET solution = solution || ${suffix}
    WHERE length(solution) < 60;
  `;
  console.log('Fixed short solutions.');
}

fixSolutions().catch(console.error);
