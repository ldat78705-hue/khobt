const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const U = '8316c34e-765d-4b8c-9364-b683a17e33f8', G = 6, T = 'phan_so';

const B = [
  { id: '8480acc9-bdbf-4600-9867-eba32069284c', p: 'T6-C6B24', q: [
    { c: `So sánh hai phân số: $\\dfrac{3}{5}$ và $\\dfrac{2}{3}$.`, a: `$\\dfrac{3}{5} < \\dfrac{2}{3}$.`, s: `Quy đồng mẫu: $\\dfrac{3}{5} = \\dfrac{9}{15}$, $\\dfrac{2}{3} = \\dfrac{10}{15}$.\nVì $9 < 10$ nên $\\dfrac{9}{15} < \\dfrac{10}{15}$, tức $\\dfrac{3}{5} < \\dfrac{2}{3}$.`, d: 'nhan_biet' },
    { c: `Viết hỗn số $2\\dfrac{3}{4}$ dưới dạng phân số.`, a: `$\\dfrac{11}{4}$`, s: `$2\\dfrac{3}{4} = \\dfrac{2 \\times 4 + 3}{4} = \\dfrac{11}{4}$.`, d: 'nhan_biet' },
    { c: `Sắp xếp theo thứ tự tăng dần: $\\dfrac{1}{3},\\; \\dfrac{2}{5},\\; \\dfrac{3}{10}$.`, a: `$\\dfrac{3}{10} < \\dfrac{1}{3} < \\dfrac{2}{5}$.`, s: `Quy đồng mẫu $30$: $\\dfrac{1}{3}=\\dfrac{10}{30}$, $\\dfrac{2}{5}=\\dfrac{12}{30}$, $\\dfrac{3}{10}=\\dfrac{9}{30}$.\nVì $9<10<12$ nên $\\dfrac{3}{10}<\\dfrac{1}{3}<\\dfrac{2}{5}$.`, d: 'nhan_biet' },
    { c: `So sánh $\\dfrac{11}{13}$ và $\\dfrac{14}{15}$ mà không quy đồng.`, a: `$\\dfrac{11}{13} < \\dfrac{14}{15}$.`, s: `$\\dfrac{11}{13}$ thiếu $\\dfrac{2}{13}$ để bằng $1$.\n$\\dfrac{14}{15}$ thiếu $\\dfrac{1}{15}$ để bằng $1$.\nVì $\\dfrac{2}{13} > \\dfrac{1}{15}$ nên $\\dfrac{11}{13}$ xa $1$ hơn → $\\dfrac{11}{13} < \\dfrac{14}{15}$.`, d: 'thong_hieu' },
    { c: `Tìm phân số $\\dfrac{a}{b}$ biết $\\dfrac{a}{b} = \\dfrac{3}{7}$ và $a + b = 20$.`, a: `$\\dfrac{6}{14}$.`, s: `$\\dfrac{a}{b} = \\dfrac{3}{7}$ nên $a = 3k, b = 7k$.\n$a+b = 10k = 20 \\Rightarrow k = 2$.\nVậy $\\dfrac{a}{b} = \\dfrac{6}{14}$.`, d: 'thong_hieu' },
    { c: `Tìm số nguyên $x$ biết $\\dfrac{x}{6} = \\dfrac{-5}{3}$.`, a: `$x = -10$.`, s: `$\\dfrac{x}{6} = \\dfrac{-5}{3} = \\dfrac{-10}{6} \\Rightarrow x = -10$.`, d: 'thong_hieu' },
    { c: `Tìm tất cả phân số $\\dfrac{a}{12}$ ($a$ nguyên) sao cho $\\dfrac{1}{4} < \\dfrac{a}{12} < \\dfrac{2}{3}$.`, a: `$a \\in \\{4, 5, 6, 7\\}$.`, s: `$\\dfrac{1}{4} = \\dfrac{3}{12}$ và $\\dfrac{2}{3} = \\dfrac{8}{12}$.\nCần $3 < a < 8$, tức $a \\in \\{4, 5, 6, 7\\}$.`, d: 'van_dung' },
    { c: `Tìm phân số $\\dfrac{a}{b}$ tối giản biết $\\dfrac{a}{b} = \\dfrac{2}{5}$ và $a \\times b = 40$.`, a: `$\\dfrac{4}{10}$ → tối giản $\\dfrac{2}{5}$.`, s: `$a = 2k, b = 5k$. $ab = 10k^2 = 40 \\Rightarrow k^2 = 4 \\Rightarrow k = 2$.\n$\\dfrac{a}{b} = \\dfrac{4}{10}$, tối giản: $\\dfrac{2}{5}$.`, d: 'van_dung' },
    { c: `Chứng minh: $\\dfrac{1}{1 \\times 2} + \\dfrac{1}{2 \\times 3} + \\ldots + \\dfrac{1}{n(n+1)} = \\dfrac{n}{n+1}$.`, a: `Dùng phân tích $\\dfrac{1}{k(k+1)} = \\dfrac{1}{k} - \\dfrac{1}{k+1}$.`, s: `$\\dfrac{1}{k(k+1)} = \\dfrac{1}{k} - \\dfrac{1}{k+1}$ (telescoping).\nTổng $= (1 - \\frac{1}{2}) + (\\frac{1}{2} - \\frac{1}{3}) + \\ldots + (\\frac{1}{n} - \\frac{1}{n+1}) = 1 - \\frac{1}{n+1} = \\frac{n}{n+1}$.`, d: 'van_dung_cao' },
    { c: `So sánh $A = \\dfrac{2025}{2026}$ và $B = \\dfrac{2024}{2025}$.`, a: `$A > B$.`, s: `$A = 1 - \\frac{1}{2026}$, $B = 1 - \\frac{1}{2025}$.\nVì $\\frac{1}{2026} < \\frac{1}{2025}$ nên $A = 1 - \\frac{1}{2026} > 1 - \\frac{1}{2025} = B$.`, d: 'van_dung_cao' },
  ]},
  { id: 'c671d1eb-d0c6-4f6a-93af-fbc9988f2776', p: 'T6-C6B25', q: [
    { c: `Tính: $\\dfrac{2}{5} + \\dfrac{1}{5}$.`, a: `$\\dfrac{3}{5}$`, s: `Cùng mẫu: $\\dfrac{2}{5} + \\dfrac{1}{5} = \\dfrac{2+1}{5} = \\dfrac{3}{5}$.`, d: 'nhan_biet' },
    { c: `Tính: $\\dfrac{3}{4} - \\dfrac{1}{6}$.`, a: `$\\dfrac{7}{12}$`, s: `Quy đồng mẫu $12$: $\\dfrac{3}{4} = \\dfrac{9}{12}$, $\\dfrac{1}{6} = \\dfrac{2}{12}$.\n$\\dfrac{9}{12} - \\dfrac{2}{12} = \\dfrac{7}{12}$.`, d: 'nhan_biet' },
    { c: `Tính: $\\dfrac{-2}{3} + \\dfrac{5}{6}$.`, a: `$\\dfrac{1}{6}$`, s: `$\\dfrac{-2}{3} = \\dfrac{-4}{6}$. Vậy $\\dfrac{-4}{6} + \\dfrac{5}{6} = \\dfrac{1}{6}$.`, d: 'nhan_biet' },
    { c: `Tính: $\\dfrac{5}{12} + \\dfrac{7}{18}$.`, a: `$\\dfrac{29}{36}$`, s: `BCNN$(12,18) = 36$. $\\dfrac{5}{12} = \\dfrac{15}{36}$, $\\dfrac{7}{18} = \\dfrac{14}{36}$.\nTổng: $\\dfrac{29}{36}$.`, d: 'thong_hieu' },
    { c: `Tìm $x$: $x + \\dfrac{3}{7} = \\dfrac{5}{14}$.`, a: `$x = \\dfrac{-1}{14}$.`, s: `$x = \\dfrac{5}{14} - \\dfrac{3}{7} = \\dfrac{5}{14} - \\dfrac{6}{14} = \\dfrac{-1}{14}$.`, d: 'thong_hieu' },
    { c: `Tính: $\\dfrac{1}{2} - \\dfrac{1}{3} + \\dfrac{1}{4} - \\dfrac{1}{6}$.`, a: `$\\dfrac{1}{4}$`, s: `$= (\\frac{1}{2} - \\frac{1}{3} - \\frac{1}{6}) + \\frac{1}{4} = (\\frac{3-2-1}{6}) + \\frac{1}{4} = 0 + \\frac{1}{4} = \\frac{1}{4}$.`, d: 'thong_hieu' },
    { c: `Tính: $\\dfrac{1}{1 \\times 3} + \\dfrac{1}{3 \\times 5} + \\dfrac{1}{5 \\times 7} + \\dfrac{1}{7 \\times 9}$.`, a: `$\\dfrac{4}{9}$`, s: `$\\dfrac{1}{(2k-1)(2k+1)} = \\dfrac{1}{2}\\left(\\dfrac{1}{2k-1} - \\dfrac{1}{2k+1}\\right)$.\nTổng $= \\frac{1}{2}(1 - \\frac{1}{9}) = \\frac{1}{2} \\times \\frac{8}{9} = \\frac{4}{9}$.`, d: 'van_dung' },
    { c: `Tìm $x$: $\\dfrac{x-1}{3} + \\dfrac{x+1}{5} = \\dfrac{2}{15}$.`, a: `$x = 0$.`, s: `Quy đồng mẫu $15$: $\\dfrac{5(x-1) + 3(x+1)}{15} = \\dfrac{2}{15}$.\n$5x - 5 + 3x + 3 = 2 \\Rightarrow 8x - 2 = 2 \\Rightarrow x = \\frac{1}{2}$.\n\nKiểm tra lại: $\\frac{-1/2}{3} + \\frac{3/2}{5} = \\frac{-1}{6} + \\frac{3}{10} = \\frac{-5+9}{30} = \\frac{4}{30} = \\frac{2}{15}$ ✓.\nVậy $x = \\frac{1}{2}$.`, d: 'van_dung' },
    { c: `Tính: $\\dfrac{1}{2!} + \\dfrac{1}{3!} + \\dfrac{1}{4!} + \\dfrac{1}{5!}$ (với $n! = 1 \\times 2 \\times \\ldots \\times n$).`, a: `$\\dfrac{17}{20}$... → tính cụ thể.`, s: `$\\frac{1}{2} + \\frac{1}{6} + \\frac{1}{24} + \\frac{1}{120}$. Quy đồng mẫu $120$:\n$= \\frac{60+20+5+1}{120} = \\frac{86}{120} = \\frac{43}{60}$.`, d: 'van_dung_cao' },
    { c: `Cho $S = \\dfrac{1}{1 \\times 2 \\times 3} + \\dfrac{1}{2 \\times 3 \\times 4} + \\ldots + \\dfrac{1}{n(n+1)(n+2)}$. Tính $S$.`, a: `$S = \\dfrac{n(n+3)}{4(n+1)(n+2)}$.`, s: `$\\frac{1}{k(k+1)(k+2)} = \\frac{1}{2}\\left(\\frac{1}{k(k+1)} - \\frac{1}{(k+1)(k+2)}\\right)$.\nTổng telescoping: $S = \\frac{1}{2}\\left(\\frac{1}{1 \\times 2} - \\frac{1}{(n+1)(n+2)}\\right) = \\frac{1}{2} \\cdot \\frac{(n+1)(n+2) - 2}{2(n+1)(n+2)} = \\frac{n^2+3n}{4(n+1)(n+2)}$.`, d: 'van_dung_cao' },
  ]},
  { id: '47b9033c-f98b-4902-9b1e-54b6b094720f', p: 'T6-C6B26', q: [
    { c: `Tính: $\\dfrac{2}{3} \\times \\dfrac{9}{14}$.`, a: `$\\dfrac{3}{7}$`, s: `$\\dfrac{2}{3} \\times \\dfrac{9}{14} = \\dfrac{2 \\times 9}{3 \\times 14} = \\dfrac{18}{42} = \\dfrac{3}{7}$.`, d: 'nhan_biet' },
    { c: `Tính: $\\dfrac{5}{6} : \\dfrac{10}{3}$.`, a: `$\\dfrac{1}{4}$`, s: `$\\dfrac{5}{6} : \\dfrac{10}{3} = \\dfrac{5}{6} \\times \\dfrac{3}{10} = \\dfrac{15}{60} = \\dfrac{1}{4}$.`, d: 'nhan_biet' },
    { c: `Tính: $\\dfrac{-3}{5} \\times \\dfrac{10}{-9}$.`, a: `$\\dfrac{2}{3}$`, s: `$\\dfrac{-3}{5} \\times \\dfrac{10}{-9} = \\dfrac{(-3) \\times 10}{5 \\times (-9)} = \\dfrac{-30}{-45} = \\dfrac{30}{45} = \\dfrac{2}{3}$.`, d: 'nhan_biet' },
    { c: `Tính nhanh: $\\dfrac{7}{13} \\times \\dfrac{5}{9} + \\dfrac{7}{13} \\times \\dfrac{4}{9}$.`, a: `$\\dfrac{7}{13}$`, s: `$= \\dfrac{7}{13} \\times \\left(\\dfrac{5}{9} + \\dfrac{4}{9}\\right) = \\dfrac{7}{13} \\times 1 = \\dfrac{7}{13}$.`, d: 'thong_hieu' },
    { c: `Tìm $x$: $\\dfrac{2}{3} \\times x = \\dfrac{4}{15}$.`, a: `$x = \\dfrac{2}{5}$.`, s: `$x = \\dfrac{4}{15} : \\dfrac{2}{3} = \\dfrac{4}{15} \\times \\dfrac{3}{2} = \\dfrac{12}{30} = \\dfrac{2}{5}$.`, d: 'thong_hieu' },
    { c: `Tính: $\\left(\\dfrac{-3}{4}\\right)^2$.`, a: `$\\dfrac{9}{16}$`, s: `$\\left(\\dfrac{-3}{4}\\right)^2 = \\dfrac{(-3)^2}{4^2} = \\dfrac{9}{16}$.`, d: 'thong_hieu' },
    { c: `Tính: $\\dfrac{2}{3} \\times \\dfrac{3}{4} \\times \\dfrac{4}{5} \\times \\ldots \\times \\dfrac{99}{100}$.`, a: `$\\dfrac{2}{100} = \\dfrac{1}{50}$`, s: `Tích telescoping: tử $= 2 \\times 3 \\times 4 \\times \\ldots \\times 99$, mẫu $= 3 \\times 4 \\times \\ldots \\times 100$.\nRút gọn: $\\dfrac{2}{100} = \\dfrac{1}{50}$.`, d: 'van_dung' },
    { c: `Tìm $x$: $\\dfrac{x+1}{3} = \\dfrac{2}{x-1}$ ($x \\neq 1$).`, a: `$x = -1 + \\sqrt{7}$ hoặc tương đương.`, s: `$(x+1)(x-1) = 6 \\Rightarrow x^2 - 1 = 6 \\Rightarrow x^2 = 7$.\nTrong $\\mathbb{Z}$: không có nghiệm nguyên.\nNếu mở rộng: $x = \\pm\\sqrt{7}$.`, d: 'van_dung' },
    { c: `Tính: $\\left(1 - \\dfrac{1}{2}\\right)\\left(1 - \\dfrac{1}{3}\\right)\\left(1 - \\dfrac{1}{4}\\right) \\cdots \\left(1 - \\dfrac{1}{100}\\right)$.`, a: `$\\dfrac{1}{100}$`, s: `$= \\dfrac{1}{2} \\times \\dfrac{2}{3} \\times \\dfrac{3}{4} \\times \\ldots \\times \\dfrac{99}{100} = \\dfrac{1}{100}$ (telescoping).`, d: 'van_dung_cao' },
    { c: `Chứng minh: $\\dfrac{1}{n} - \\dfrac{1}{n+1} = \\dfrac{1}{n(n+1)}$ và áp dụng tính $\\dfrac{1}{1 \\times 2} + \\dfrac{1}{2 \\times 3} + \\ldots + \\dfrac{1}{99 \\times 100}$.`, a: `$\\dfrac{99}{100}$`, s: `$\\frac{1}{n} - \\frac{1}{n+1} = \\frac{n+1-n}{n(n+1)} = \\frac{1}{n(n+1)}$ ✓.\n\nTổng $= (1-\\frac{1}{2})+(\\frac{1}{2}-\\frac{1}{3})+\\ldots+(\\frac{1}{99}-\\frac{1}{100}) = 1 - \\frac{1}{100} = \\frac{99}{100}$.`, d: 'van_dung_cao' },
  ]},
  { id: '4e8b8dd3-9667-46dd-9db2-a80c58c39bc7', p: 'T6-C6B27', q: [
    { c: `Tìm $\\dfrac{2}{3}$ của $45$.`, a: `$30$`, s: `$\\dfrac{2}{3} \\times 45 = \\dfrac{2 \\times 45}{3} = \\dfrac{90}{3} = 30$.`, d: 'nhan_biet' },
    { c: `Một lớp có $40$ học sinh, trong đó $\\dfrac{3}{5}$ là nữ. Hỏi lớp có bao nhiêu nữ?`, a: `$24$ nữ.`, s: `Số nữ $= \\dfrac{3}{5} \\times 40 = 24$.`, d: 'nhan_biet' },
    { c: `Biết $\\dfrac{2}{5}$ của một số bằng $18$. Tìm số đó.`, a: `$45$`, s: `Gọi số cần tìm là $x$: $\\dfrac{2}{5} \\times x = 18 \\Rightarrow x = 18 : \\dfrac{2}{5} = 18 \\times \\dfrac{5}{2} = 45$.`, d: 'nhan_biet' },
    { c: `Một cửa hàng giảm giá $20\\%$. Một áo có giá gốc $250\\,000$ đồng. Tính giá sau giảm.`, a: `$200\\,000$ đồng.`, s: `Giảm: $\\dfrac{20}{100} \\times 250\\,000 = 50\\,000$.\nGiá sau: $250\\,000 - 50\\,000 = 200\\,000$ đồng.`, d: 'thong_hieu' },
    { c: `Nam đọc được $\\dfrac{2}{5}$ cuốn sách trong ngày đầu, $\\dfrac{1}{3}$ cuốn sách trong ngày thứ hai. Hỏi còn lại bao nhiêu phần cuốn sách?`, a: `$\\dfrac{4}{15}$.`, s: `Đã đọc: $\\dfrac{2}{5} + \\dfrac{1}{3} = \\dfrac{6+5}{15} = \\dfrac{11}{15}$.\nCòn lại: $1 - \\dfrac{11}{15} = \\dfrac{4}{15}$.`, d: 'thong_hieu' },
    { c: `Một bể nước đầy. Vòi A xả hết bể trong $6$ giờ, vòi B xả hết trong $4$ giờ. Mở cả hai vòi, bao lâu hết bể?`, a: `$\\dfrac{12}{5}$ giờ $= 2$ giờ $24$ phút.`, s: `Mỗi giờ A xả $\\frac{1}{6}$, B xả $\\frac{1}{4}$ bể.\nCả hai: $\\frac{1}{6} + \\frac{1}{4} = \\frac{5}{12}$ bể/giờ.\nThời gian: $1 : \\frac{5}{12} = \\frac{12}{5} = 2{,}4$ giờ $= 2$ giờ $24$ phút.`, d: 'thong_hieu' },
    { c: `Chia $120$ viên kẹo cho ba bạn A, B, C sao cho A được $\\dfrac{1}{3}$, B được $\\dfrac{1}{4}$ tổng. Hỏi C được bao nhiêu?`, a: `$50$ viên.`, s: `A: $\\frac{1}{3} \\times 120 = 40$. B: $\\frac{1}{4} \\times 120 = 30$.\nC: $120 - 40 - 30 = 50$.`, d: 'van_dung' },
    { c: `Một miếng đất hình chữ nhật có chu vi $120$ m. Chiều dài bằng $\\dfrac{3}{2}$ chiều rộng. Tính diện tích.`, a: `$864\\; m^2$.`, s: `Gọi chiều rộng $= a$, chiều dài $= \\frac{3}{2}a$.\n$2(a + \\frac{3}{2}a) = 120 \\Rightarrow 2 \\times \\frac{5}{2}a = 120 \\Rightarrow 5a = 120 \\Rightarrow a = 24$.\nDài $= 36$. $S = 24 \\times 36 = 864\\;m^2$.`, d: 'van_dung' },
    { c: `Ba vòi nước cùng chảy vào bể. Vòi 1 chảy đầy bể trong $10$ giờ, vòi 2 trong $12$ giờ, vòi 3 trong $15$ giờ. Mở cả ba, bao lâu đầy bể?`, a: `$4$ giờ.`, s: `Mỗi giờ: $\\frac{1}{10}+\\frac{1}{12}+\\frac{1}{15} = \\frac{6+5+4}{60} = \\frac{15}{60} = \\frac{1}{4}$.\nThời gian: $4$ giờ.`, d: 'van_dung_cao' },
    { c: `Hai công nhân cùng làm xong việc trong $12$ ngày. Nếu người thứ nhất làm một mình hết $20$ ngày. Hỏi người thứ hai làm một mình hết bao nhiêu ngày?`, a: `$30$ ngày.`, s: `Mỗi ngày hai người làm $\\frac{1}{12}$, người 1 làm $\\frac{1}{20}$.\nNgười 2: $\\frac{1}{12} - \\frac{1}{20} = \\frac{5-3}{60} = \\frac{2}{60} = \\frac{1}{30}$.\nVậy người 2 làm một mình hết $30$ ngày.`, d: 'van_dung_cao' },
  ]},
];

async function main() {
  let total = 0;
  for (const b of B) {
    console.log('=== ' + b.p + ' ===');
    let c = 0;
    for (const q of b.q) {
      const code = b.p + '-' + String(c+1).padStart(3,'0');
      await sql`INSERT INTO public.questions (content,answer,solution,grade,topic,difficulty,question_type,category_id,status,is_public,question_code,user_id) VALUES (${q.c},${q.a},${q.s},${G},${T},${q.d},'tu_luan',${b.id},'approved',true,${code},${U})`;
      c++; console.log('OK: '+code);
    }
    total += c;
  }
  console.log('Total: '+total);
}
main().catch(console.error);
