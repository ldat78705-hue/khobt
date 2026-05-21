const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const U = '8316c34e-765d-4b8c-9364-b683a17e33f8', G = 9, T = 'xac_suat';
const B = [
  { id: '364d9a49-21a0-4e3e-8691-21a5f2f2932d', p: 'T9-C8B25', q: [
    { c: `Phép thử ngẫu nhiên là gì?`, a: `Phép thử không đoán trước kết quả.`, s: `Phép thử có kết quả không thể biết trước, dù lặp lại trong cùng điều kiện.`, d: 'nhan_biet' },
    { c: `Không gian mẫu là gì?`, a: `Tập hợp tất cả kết quả có thể.`, s: `Kí hiệu $\\Omega$, là tập hợp mọi kết quả có thể xảy ra của phép thử.`, d: 'nhan_biet' },
    { c: `Gieo xúc xắc $1$ lần. Tìm $\\Omega$.`, a: `$\\Omega = \\{1,2,3,4,5,6\\}$.`, s: `$|\\Omega| = 6$.`, d: 'nhan_biet' },
    { c: `Tung $2$ đồng xu. Tìm $\\Omega$.`, a: `$\\Omega = \\{SS, SN, NS, NN\\}$.`, s: `$|\\Omega| = 4$.`, d: 'thong_hieu' },
    { c: `Gieo $2$ xúc xắc. $|\\Omega| = ?$`, a: `$36$.`, s: `$6 \\times 6 = 36$.`, d: 'thong_hieu' },
    { c: `Rút $1$ thẻ từ $10$ thẻ ($1$-$10$). $|\\Omega| = ?$`, a: `$10$.`, s: `$10$ thẻ → $10$ kết quả.`, d: 'thong_hieu' },
    { c: `Tung $3$ đồng xu. Tìm $|\\Omega|$.`, a: `$8$.`, s: `$2^3 = 8$.`, d: 'van_dung' },
    { c: `Chọn $2$ HS từ $5$ HS. Số cách chọn?`, a: `$10$.`, s: `$C_5^2 = \\frac{5!}{2!3!} = 10$.`, d: 'van_dung' },
    { c: `Gieo xúc xắc $3$ lần. $|\\Omega| = ?$`, a: `$216$.`, s: `$6^3 = 216$.`, d: 'van_dung_cao' },
    { c: `Xếp $4$ HS vào hàng ngang. Số cách xếp?`, a: `$24$.`, s: `$4! = 24$.`, d: 'van_dung_cao' },
  ]},
  { id: '6761ba97-621a-4a08-8f08-dbb218ce7df2', p: 'T9-C8B26', q: [
    { c: `CT tính xác suất cổ điển?`, a: `$P(A) = \\frac{m}{n}$.`, s: `$P(A) = \\frac{\\text{số KQ thuận lợi}}{\\text{tổng số KQ}} = \\frac{m}{n}$.`, d: 'nhan_biet' },
    { c: `Gieo xúc xắc. $P$(mặt $6$)?`, a: `$\\frac{1}{6}$.`, s: `$P = \\frac{1}{6}$.`, d: 'nhan_biet' },
    { c: `$0 \\leq P(A) \\leq 1$. Đúng hay sai?`, a: `Đúng.`, s: `XS luôn nằm trong $[0; 1]$.`, d: 'nhan_biet' },
    { c: `Gieo xúc xắc. $P$(mặt chẵn)?`, a: `$\\frac{1}{2}$.`, s: `$3$ mặt chẵn: $\\{2,4,6\\}$. $P = \\frac{3}{6} = \\frac{1}{2}$.`, d: 'thong_hieu' },
    { c: `Rút $1$ thẻ từ $10$ thẻ ($1$-$10$). $P$(thẻ chia hết cho $3$)?`, a: `$\\frac{3}{10}$.`, s: `$\\{3,6,9\\}$. $P = \\frac{3}{10}$.`, d: 'thong_hieu' },
    { c: `Hộp $5$ bi đỏ, $3$ bi xanh. $P$(rút bi đỏ)?`, a: `$\\frac{5}{8}$.`, s: `$P = \\frac{5}{8}$.`, d: 'thong_hieu' },
    { c: `Gieo $2$ xúc xắc. $P$(tổng $= 7$)?`, a: `$\\frac{1}{6}$.`, s: `$6$ cặp thuận lợi / $36$. $P = \\frac{6}{36} = \\frac{1}{6}$.`, d: 'van_dung' },
    { c: `Tung $3$ đồng xu. $P$(ít nhất $1$ ngửa)?`, a: `$\\frac{7}{8}$.`, s: `$P = 1 - P$(cả $3$ sấp)$ = 1 - \\frac{1}{8} = \\frac{7}{8}$.`, d: 'van_dung' },
    { c: `Rút $2$ thẻ từ $5$ thẻ ($1$-$5$). $P$(tổng chẵn)?`, a: `$\\frac{2}{5}$.`, s: `$C_5^2=10$. Tổng chẵn: cùng chẵn $C_2^2=1$ + cùng lẻ $C_3^2=3$ $=4$. $P=\\frac{4}{10}=\\frac{2}{5}$.`, d: 'van_dung_cao' },
    { c: `Gieo xúc xắc $2$ lần. $P$(lần $1$ > lần $2$)?`, a: `$\\frac{5}{12}$.`, s: `Thuận lợi: $0+1+2+3+4+5=15$. $P=\\frac{15}{36}=\\frac{5}{12}$.`, d: 'van_dung_cao' },
  ]},
  { id: '8b1f8370-f431-4fa2-8bd2-0131daea6319', p: 'T9-C8BTC', q: [
    { c: `Tung đồng xu. $P$(ngửa)?`, a: `$\\frac{1}{2}$.`, s: `$P = \\frac{1}{2}$.`, d: 'nhan_biet' },
    { c: `Gieo xúc xắc. $P$(mặt > $4$)?`, a: `$\\frac{1}{3}$.`, s: `$\\{5,6\\}$. $P = \\frac{2}{6} = \\frac{1}{3}$.`, d: 'nhan_biet' },
    { c: `Rút $1$ bi từ $4$ đỏ, $6$ xanh. $P$(xanh)?`, a: `$\\frac{3}{5}$.`, s: `$P = \\frac{6}{10} = \\frac{3}{5}$.`, d: 'thong_hieu' },
    { c: `Tung $2$ đồng xu. $P$(cả $2$ ngửa)?`, a: `$\\frac{1}{4}$.`, s: `$P = \\frac{1}{4}$.`, d: 'thong_hieu' },
    { c: `Gieo xúc xắc. $P$(mặt nguyên tố)?`, a: `$\\frac{1}{2}$.`, s: `Nguyên tố: $\\{2,3,5\\}$. $P = \\frac{3}{6} = \\frac{1}{2}$.`, d: 'thong_hieu' },
    { c: `Chọn ngẫu nhiên $1$ số từ $1$-$20$. $P$(chia hết cho $4$)?`, a: `$\\frac{1}{4}$.`, s: `$\\{4,8,12,16,20\\}$. $P=\\frac{5}{20}=\\frac{1}{4}$.`, d: 'van_dung' },
    { c: `Gieo $2$ xúc xắc. $P$(tổng $> 10$)?`, a: `$\\frac{1}{12}$.`, s: `Tổng $11$: $(5,6),(6,5)=2$. Tổng $12$: $(6,6)=1$. $P=\\frac{3}{36}=\\frac{1}{12}$.`, d: 'van_dung' },
    { c: `Lớp $15$ nam, $20$ nữ. Chọn $1$ HS. $P$(nam)?`, a: `$\\frac{3}{7}$.`, s: `$P = \\frac{15}{35} = \\frac{3}{7}$.`, d: 'van_dung' },
    { c: `Rút $2$ bi từ $3$ đỏ, $2$ xanh. $P$(cả $2$ cùng màu)?`, a: `$\\frac{2}{5}$.`, s: `$C_5^2=10$. Cùng đỏ: $C_3^2=3$. Cùng xanh: $C_2^2=1$. $P=\\frac{4}{10}=\\frac{2}{5}$.`, d: 'van_dung_cao' },
    { c: `Mật khẩu gồm $3$ chữ số ($0$-$9$). $P$(đoán đúng)?`, a: `$\\frac{1}{1000}$.`, s: `$|\\Omega|=10^3=1000$. $P=\\frac{1}{1000}=0{,}1\\%$.`, d: 'van_dung_cao' },
  ]},
];
async function main() {
  let total = 0;
  for (const b of B) {
    console.log('=== '+b.p+' ===');
    let c = 0;
    for (const q of b.q) {
      const code = b.p+'-'+String(c+1).padStart(3,'0');
      await sql`INSERT INTO public.questions (content,answer,solution,grade,topic,difficulty,question_type,category_id,status,is_public,question_code,user_id) VALUES (${q.c},${q.a},${q.s},${G},${T},${q.d},'tu_luan',${b.id},'approved',true,${code},${U})`;
      c++; console.log('OK: '+code);
    }
    total += c;
  }
  console.log('Total: '+total);
}
main().catch(console.error);
