const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const U = '8316c34e-765d-4b8c-9364-b683a17e33f8', G = 5, T = 'dai_so';

const B = [
  // ======== Bài 2: Ôn tập các phép tính với số tự nhiên ========
  { id: '1e6d3626-7630-47ae-98a1-eff190359dc1', p: 'T5-B2', q: [
    { c: `Tính: $3\\,456 + 2\\,318$.`, a: `$5\\,774$.`, s: `$3\\,456 + 2\\,318 = 5\\,774$.`, d: 'nhan_biet' },
    { c: `Tính: $9\\,000 - 4\\,567$.`, a: `$4\\,433$.`, s: `$9\\,000 - 4\\,567 = 4\\,433$.`, d: 'nhan_biet' },
    { c: `Tính: $125 \\times 8$.`, a: `$1\\,000$.`, s: `$125 \\times 8 = 1\\,000$.`, d: 'nhan_biet' },
    { c: `Tính: $7\\,236 : 4$.`, a: `$1\\,809$.`, s: `$7\\,236 : 4 = 1\\,809$.`, d: 'thong_hieu' },
    { c: `Tính giá trị biểu thức: $25 \\times 4 + 300$.`, a: `$400$.`, s: `$25 \\times 4 = 100$. $100 + 300 = 400$.`, d: 'thong_hieu' },
    { c: `Tìm $x$: $x \\times 6 = 4\\,218$.`, a: `$x = 703$.`, s: `$x = 4\\,218 : 6 = 703$.`, d: 'thong_hieu' },
    { c: `Một cửa hàng bán $125$ kg gạo mỗi ngày. Hỏi $8$ ngày bán bao nhiêu kg gạo?`, a: `$1\\,000$ kg.`, s: `$125 \\times 8 = 1\\,000$ kg.`, d: 'van_dung' },
    { c: `Có $2\\,480$ quyển vở chia đều cho $4$ lớp. Mỗi lớp nhận bao nhiêu quyển?`, a: `$620$ quyển.`, s: `$2\\,480 : 4 = 620$ quyển.`, d: 'van_dung' },
    { c: `Tính nhanh: $25 \\times 36 \\times 4$.`, a: `$3\\,600$.`, s: `$25 \\times 4 = 100$. $100 \\times 36 = 3\\,600$.`, d: 'van_dung_cao' },
    { c: `Tìm hai số biết tổng bằng $540$ và số lớn gấp $4$ lần số bé.`, a: `Số bé: $108$, số lớn: $432$.`, s: `Số bé: $540 : (4+1) = 108$. Số lớn: $108 \\times 4 = 432$.`, d: 'van_dung_cao' },
  ]},
  // ======== Bài 3: Ôn tập phân số ========
  { id: '6ef8d5d5-545b-43be-b2cb-14ab978a3765', p: 'T5-B3', q: [
    { c: `Đọc phân số $\\dfrac{3}{5}$.`, a: `Ba phần năm.`, s: `Tử số $3$, mẫu số $5$. Đọc: ba phần năm.`, d: 'nhan_biet' },
    { c: `Viết phân số có tử số là $7$, mẫu số là $10$.`, a: `$\\dfrac{7}{10}$.`, s: `$\\dfrac{7}{10}$.`, d: 'nhan_biet' },
    { c: `Phân số nào bằng $1$? $\\dfrac{3}{3}$ hay $\\dfrac{3}{4}$?`, a: `$\\dfrac{3}{3} = 1$.`, s: `Phân số có tử bằng mẫu thì bằng $1$.`, d: 'nhan_biet' },
    { c: `Rút gọn phân số $\\dfrac{6}{8}$.`, a: `$\\dfrac{3}{4}$.`, s: `$\\dfrac{6}{8} = \\dfrac{6:2}{8:2} = \\dfrac{3}{4}$.`, d: 'thong_hieu' },
    { c: `So sánh: $\\dfrac{3}{5}$ và $\\dfrac{4}{5}$.`, a: `$\\dfrac{3}{5} < \\dfrac{4}{5}$.`, s: `Cùng mẫu, tử $3 < 4$ nên $\\dfrac{3}{5} < \\dfrac{4}{5}$.`, d: 'thong_hieu' },
    { c: `Quy đồng: $\\dfrac{1}{3}$ và $\\dfrac{1}{4}$.`, a: `$\\dfrac{4}{12}$ và $\\dfrac{3}{12}$.`, s: `MSC $= 12$. $\\dfrac{1}{3} = \\dfrac{4}{12}$; $\\dfrac{1}{4} = \\dfrac{3}{12}$.`, d: 'thong_hieu' },
    { c: `Lớp có $40$ học sinh, trong đó $\\dfrac{3}{8}$ là nữ. Tính số HS nữ.`, a: `$15$ học sinh.`, s: `$40 \\times \\dfrac{3}{8} = \\dfrac{120}{8} = 15$.`, d: 'van_dung' },
    { c: `So sánh $\\dfrac{2}{3}$ và $\\dfrac{5}{7}$.`, a: `$\\dfrac{2}{3} < \\dfrac{5}{7}$.`, s: `QĐ mẫu $21$: $\\dfrac{14}{21}$ và $\\dfrac{15}{21}$. Vậy $\\dfrac{2}{3} < \\dfrac{5}{7}$.`, d: 'van_dung' },
    { c: `Sắp xếp tăng dần: $\\dfrac{1}{2}$; $\\dfrac{2}{5}$; $\\dfrac{3}{4}$.`, a: `$\\dfrac{2}{5} < \\dfrac{1}{2} < \\dfrac{3}{4}$.`, s: `QĐ mẫu $20$: $\\dfrac{8}{20}$; $\\dfrac{10}{20}$; $\\dfrac{15}{20}$.`, d: 'van_dung_cao' },
    { c: `Tìm phân số $\\dfrac{a}{6}$ biết $\\dfrac{2}{3} < \\dfrac{a}{6} < \\dfrac{5}{6}$.`, a: `$a = 5$, phân số $\\dfrac{5}{6}$. Sửa: $a = 5$ không thỏa dấu $<$. Vậy không có phân số nào thỏa mãn.`, s: `$\\dfrac{2}{3} = \\dfrac{4}{6}$. Cần $\\dfrac{4}{6} < \\dfrac{a}{6} < \\dfrac{5}{6}$, tức $4 < a < 5$. Không có STN nào. Vậy không tồn tại.`, d: 'van_dung_cao' },
  ]},
  // ======== Bài 4: Phân số thập phân ========
  { id: '988ec511-7952-4a5f-95bf-acada95a10b9', p: 'T5-B4', q: [
    { c: `Phân số thập phân là phân số có mẫu số là bao nhiêu?`, a: `$10$, $100$, $1\\,000$, ...`, s: `Phân số thập phân có mẫu số là $10$, $100$, $1\\,000$, ...`, d: 'nhan_biet' },
    { c: `$\\dfrac{3}{10}$ có phải phân số thập phân không?`, a: `Có.`, s: `Mẫu số $10$ → phân số thập phân.`, d: 'nhan_biet' },
    { c: `Viết phân số thập phân: $\\dfrac{7}{100}$.`, a: `$\\dfrac{7}{100}$ (đã là phân số thập phân).`, s: `Mẫu $= 100$, đã là PSTP.`, d: 'nhan_biet' },
    { c: `Chuyển $\\dfrac{1}{5}$ thành phân số thập phân.`, a: `$\\dfrac{2}{10}$.`, s: `$\\dfrac{1}{5} = \\dfrac{1 \\times 2}{5 \\times 2} = \\dfrac{2}{10}$.`, d: 'thong_hieu' },
    { c: `Chuyển $\\dfrac{3}{4}$ thành phân số thập phân.`, a: `$\\dfrac{75}{100}$.`, s: `$\\dfrac{3}{4} = \\dfrac{3 \\times 25}{4 \\times 25} = \\dfrac{75}{100}$.`, d: 'thong_hieu' },
    { c: `Chuyển $\\dfrac{7}{20}$ thành phân số thập phân.`, a: `$\\dfrac{35}{100}$.`, s: `$\\dfrac{7}{20} = \\dfrac{7 \\times 5}{20 \\times 5} = \\dfrac{35}{100}$.`, d: 'thong_hieu' },
    { c: `Phân số $\\dfrac{2}{3}$ có chuyển được thành phân số thập phân không?`, a: `Không.`, s: `$\\dfrac{2}{3}$: mẫu $3$ không thể nhân thành $10, 100, ...$`, d: 'van_dung' },
    { c: `Viết các phân số sau thành PSTP: $\\dfrac{1}{2}$; $\\dfrac{3}{5}$; $\\dfrac{9}{25}$.`, a: `$\\dfrac{5}{10}$; $\\dfrac{6}{10}$; $\\dfrac{36}{100}$.`, s: `Nhân tử và mẫu cho cùng số để mẫu thành $10$ hoặc $100$.`, d: 'van_dung' },
    { c: `Trong các phân số $\\dfrac{3}{5}$; $\\dfrac{2}{7}$; $\\dfrac{11}{25}$; $\\dfrac{5}{6}$, phân số nào chuyển được thành PSTP?`, a: `$\\dfrac{3}{5}$ và $\\dfrac{11}{25}$.`, s: `Mẫu $5$ và $25$ nhân được thành $10$, $100$. Mẫu $7$, $6$ không.`, d: 'van_dung_cao' },
    { c: `Tìm phân số thập phân bằng $\\dfrac{12}{15}$ (nếu có).`, a: `Không có.`, s: `$\\dfrac{12}{15} = \\dfrac{4}{5} = \\dfrac{8}{10}$. Vậy có! $\\dfrac{8}{10}$.`, d: 'van_dung_cao' },
  ]},
  // ======== Bài 5: Ôn tập các phép tính với phân số ========
  { id: '1b05710b-a722-4568-ae4b-5f750ed3026b', p: 'T5-B5', q: [
    { c: `Tính: $\\dfrac{2}{7} + \\dfrac{3}{7}$.`, a: `$\\dfrac{5}{7}$.`, s: `Cùng mẫu: $\\dfrac{2+3}{7} = \\dfrac{5}{7}$.`, d: 'nhan_biet' },
    { c: `Tính: $\\dfrac{5}{6} - \\dfrac{1}{6}$.`, a: `$\\dfrac{4}{6} = \\dfrac{2}{3}$.`, s: `$\\dfrac{5-1}{6} = \\dfrac{4}{6} = \\dfrac{2}{3}$.`, d: 'nhan_biet' },
    { c: `Tính: $\\dfrac{2}{5} \\times \\dfrac{3}{4}$.`, a: `$\\dfrac{6}{20} = \\dfrac{3}{10}$.`, s: `$\\dfrac{2 \\times 3}{5 \\times 4} = \\dfrac{6}{20} = \\dfrac{3}{10}$.`, d: 'nhan_biet' },
    { c: `Tính: $\\dfrac{3}{4} : \\dfrac{1}{2}$.`, a: `$\\dfrac{3}{2}$.`, s: `$\\dfrac{3}{4} \\times \\dfrac{2}{1} = \\dfrac{6}{4} = \\dfrac{3}{2}$.`, d: 'thong_hieu' },
    { c: `Tính: $\\dfrac{1}{3} + \\dfrac{1}{4}$.`, a: `$\\dfrac{7}{12}$.`, s: `QĐ mẫu $12$: $\\dfrac{4}{12} + \\dfrac{3}{12} = \\dfrac{7}{12}$.`, d: 'thong_hieu' },
    { c: `Tìm $x$: $x + \\dfrac{2}{5} = \\dfrac{4}{5}$.`, a: `$x = \\dfrac{2}{5}$.`, s: `$x = \\dfrac{4}{5} - \\dfrac{2}{5} = \\dfrac{2}{5}$.`, d: 'thong_hieu' },
    { c: `Một sợi dây dài $\\dfrac{3}{4}$ m. Cắt đi $\\dfrac{1}{3}$ sợi dây. Đoạn cắt dài bao nhiêu?`, a: `$\\dfrac{1}{4}$ m.`, s: `$\\dfrac{3}{4} \\times \\dfrac{1}{3} = \\dfrac{3}{12} = \\dfrac{1}{4}$ m.`, d: 'van_dung' },
    { c: `Tính: $\\dfrac{2}{3} + \\dfrac{1}{6} - \\dfrac{1}{2}$.`, a: `$\\dfrac{1}{3}$.`, s: `QĐ mẫu $6$: $\\dfrac{4}{6} + \\dfrac{1}{6} - \\dfrac{3}{6} = \\dfrac{2}{6} = \\dfrac{1}{3}$.`, d: 'van_dung' },
    { c: `Tính: $\\dfrac{5}{7} \\times \\dfrac{14}{15}$.`, a: `$\\dfrac{2}{3}$.`, s: `Rút gọn: $\\dfrac{5 \\times 14}{7 \\times 15} = \\dfrac{70}{105} = \\dfrac{2}{3}$.`, d: 'van_dung_cao' },
    { c: `Tìm $x$: $\\dfrac{2}{3} \\times x = \\dfrac{4}{9}$.`, a: `$x = \\dfrac{2}{3}$.`, s: `$x = \\dfrac{4}{9} : \\dfrac{2}{3} = \\dfrac{4}{9} \\times \\dfrac{3}{2} = \\dfrac{12}{18} = \\dfrac{2}{3}$.`, d: 'van_dung_cao' },
  ]},
  // ======== Bài 6: Cộng, trừ hai phân số ========
  { id: 'ceb4c63d-6de8-4ad9-893c-e8e359e271a6', p: 'T5-B6', q: [
    { c: `Tính: $\\dfrac{5}{9} + \\dfrac{2}{9}$.`, a: `$\\dfrac{7}{9}$.`, s: `$\\dfrac{5+2}{9} = \\dfrac{7}{9}$.`, d: 'nhan_biet' },
    { c: `Tính: $\\dfrac{7}{8} - \\dfrac{3}{8}$.`, a: `$\\dfrac{4}{8} = \\dfrac{1}{2}$.`, s: `$\\dfrac{7-3}{8} = \\dfrac{4}{8} = \\dfrac{1}{2}$.`, d: 'nhan_biet' },
    { c: `Tính: $\\dfrac{1}{2} + \\dfrac{1}{3}$.`, a: `$\\dfrac{5}{6}$.`, s: `QĐ mẫu $6$: $\\dfrac{3}{6} + \\dfrac{2}{6} = \\dfrac{5}{6}$.`, d: 'nhan_biet' },
    { c: `Tính: $\\dfrac{5}{6} - \\dfrac{1}{3}$.`, a: `$\\dfrac{1}{2}$.`, s: `$\\dfrac{5}{6} - \\dfrac{2}{6} = \\dfrac{3}{6} = \\dfrac{1}{2}$.`, d: 'thong_hieu' },
    { c: `Tính: $\\dfrac{3}{4} + \\dfrac{5}{12}$.`, a: `$\\dfrac{14}{12} = \\dfrac{7}{6}$.`, s: `QĐ mẫu $12$: $\\dfrac{9}{12} + \\dfrac{5}{12} = \\dfrac{14}{12} = \\dfrac{7}{6}$.`, d: 'thong_hieu' },
    { c: `Tính: $1 - \\dfrac{3}{7}$.`, a: `$\\dfrac{4}{7}$.`, s: `$1 = \\dfrac{7}{7}$. $\\dfrac{7}{7} - \\dfrac{3}{7} = \\dfrac{4}{7}$.`, d: 'thong_hieu' },
    { c: `Tìm $x$: $x - \\dfrac{1}{4} = \\dfrac{1}{2}$.`, a: `$x = \\dfrac{3}{4}$.`, s: `$x = \\dfrac{1}{2} + \\dfrac{1}{4} = \\dfrac{2}{4} + \\dfrac{1}{4} = \\dfrac{3}{4}$.`, d: 'van_dung' },
    { c: `An ăn $\\dfrac{1}{4}$ cái bánh, Bình ăn $\\dfrac{1}{3}$ cái bánh. Hai bạn ăn bao nhiêu?`, a: `$\\dfrac{7}{12}$ cái bánh.`, s: `$\\dfrac{1}{4} + \\dfrac{1}{3} = \\dfrac{3}{12} + \\dfrac{4}{12} = \\dfrac{7}{12}$.`, d: 'van_dung' },
    { c: `Tính: $\\dfrac{2}{3} + \\dfrac{1}{4} + \\dfrac{1}{12}$.`, a: `$1$.`, s: `QĐ mẫu $12$: $\\dfrac{8}{12} + \\dfrac{3}{12} + \\dfrac{1}{12} = \\dfrac{12}{12} = 1$.`, d: 'van_dung_cao' },
    { c: `Tính: $\\dfrac{7}{15} - \\dfrac{1}{5} + \\dfrac{2}{3}$.`, a: `$\\dfrac{14}{15}$.`, s: `QĐ mẫu $15$: $\\dfrac{7}{15} - \\dfrac{3}{15} + \\dfrac{10}{15} = \\dfrac{14}{15}$.`, d: 'van_dung_cao' },
  ]},
];

async function main() {
  let total = 0;
  for (const b of B) {
    console.log('=== '+b.p+' ===');
    let c = 0;
    const topic = b.t || T;
    for (const q of b.q) {
      const code = b.p+'-'+String(c+1).padStart(3,'0');
      await sql`INSERT INTO public.questions (content,answer,solution,grade,topic,difficulty,question_type,category_id,status,is_public,question_code,user_id) VALUES (${q.c},${q.a},${q.s},${G},${topic},${q.d},'tu_luan',${b.id},'approved',true,${code},${U})`;
      c++; console.log('OK: '+code);
    }
    total += c;
  }
  console.log('Total inserted: '+total);
}
main().catch(console.error);
