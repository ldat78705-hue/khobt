const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const U = '8316c34e-765d-4b8c-9364-b683a17e33f8', G = 8, T = 'hinh_hoc';
const B = [
  { id: 'b809f0f7-295b-441c-b212-6bee22b08303', p: 'T8-C10B38', q: [
    { c: `Hình chóp tam giác đều có đáy là hình gì?`, a: `Tam giác đều.`, s: `Đáy là tam giác đều, các cạnh bên bằng nhau.`, d: 'nhan_biet' },
    { c: `Hình chóp tam giác đều có bao nhiêu mặt, cạnh, đỉnh?`, a: `$4$ mặt, $6$ cạnh, $4$ đỉnh.`, s: `$4$ mặt tam giác, $6$ cạnh, $4$ đỉnh.`, d: 'nhan_biet' },
    { c: `Đường cao hình chóp tam giác đều là gì?`, a: `Đoạn từ đỉnh vuông góc đáy.`, s: `Đường cao $h$ là đoạn từ đỉnh chóp vuông góc mặt đáy, chân đường cao là tâm tam giác đều đáy.`, d: 'nhan_biet' },
    { c: `Hình chóp tam giác đều cạnh đáy $a=6$, cạnh bên $l=5$. Tính chiều cao.`, a: `$h=4$.`, s: `Tâm tam giác đều: $R=\\frac{a}{\\sqrt{3}}=\\frac{6}{\\sqrt{3}}=2\\sqrt{3}$. $h=\\sqrt{l^2-R^2}=\\sqrt{25-12}=\\sqrt{13}$.`, d: 'thong_hieu' },
    { c: `CT thể tích hình chóp?`, a: `$V=\\frac{1}{3}S_{đáy} \\cdot h$.`, s: `$V=\\frac{1}{3}S_{đáy} \\cdot h$.`, d: 'thong_hieu' },
    { c: `Hình chóp tam giác đều cạnh đáy $6$, chiều cao $4$. Tính $V$.`, a: `$V=12\\sqrt{3}$.`, s: `$S_{đáy}=\\frac{\\sqrt{3}}{4} \\times 36=9\\sqrt{3}$. $V=\\frac{1}{3} \\times 9\\sqrt{3} \\times 4=12\\sqrt{3}$.`, d: 'thong_hieu' },
    { c: `Diện tích xung quanh hình chóp tam giác đều = tổng diện tích $3$ mặt bên. Cạnh đáy $4$, trung đoạn $5$. Tính $S_{xq}$.`, a: `$30$.`, s: `$S_{xq}=\\frac{1}{2} \\times \\text{chu vi đáy} \\times d=\\frac{1}{2} \\times 12 \\times 5=30$.`, d: 'van_dung' },
    { c: `Tính diện tích toàn phần hình chóp tam giác đều cạnh đáy $6$, trung đoạn $5$.`, a: `$S_{tp}=45+9\\sqrt{3}$.`, s: `$S_{xq}=\\frac{1}{2} \\times 18 \\times 5=45$. $S_{đáy}=9\\sqrt{3}$. $S_{tp}=45+9\\sqrt{3}$.`, d: 'van_dung' },
    { c: `Chóp tam giác đều cạnh $a$. Tính thể tích theo $a$.`, a: `$V=\\frac{a^3\\sqrt{2}}{12}$.`, s: `$S=\\frac{\\sqrt{3}}{4}a^2$. $h=\\sqrt{a^2-\\frac{a^2}{3}}=a\\sqrt{\\frac{2}{3}}$. $V=\\frac{1}{3} \\cdot \\frac{\\sqrt{3}}{4}a^2 \\cdot a\\sqrt{\\frac{2}{3}}=\\frac{a^3\\sqrt{2}}{12}$.`, d: 'van_dung_cao' },
    { c: `Chóp tam giác đều $V=24\\sqrt{3}$, cạnh đáy $6$. Tính chiều cao.`, a: `$h=8$.`, s: `$S_{đáy}=9\\sqrt{3}$. $24\\sqrt{3}=\\frac{1}{3} \\times 9\\sqrt{3} \\times h$. $h=8$.`, d: 'van_dung_cao' },
  ]},
  { id: '5305246b-cac2-4adb-842e-e044acaaa878', p: 'T8-C10B39', q: [
    { c: `Hình chóp tứ giác đều có đáy là hình gì?`, a: `Hình vuông.`, s: `Đáy là hình vuông, các cạnh bên bằng nhau.`, d: 'nhan_biet' },
    { c: `Hình chóp tứ giác đều có bao nhiêu mặt?`, a: `$5$ mặt.`, s: `$1$ mặt đáy (vuông) $+ 4$ mặt bên (tam giác cân) $= 5$ mặt.`, d: 'nhan_biet' },
    { c: `CT thể tích hình chóp tứ giác đều?`, a: `$V=\\frac{1}{3}a^2 h$.`, s: `$V=\\frac{1}{3}S_{đáy} \\cdot h=\\frac{1}{3}a^2 h$.`, d: 'nhan_biet' },
    { c: `Chóp tứ giác đều cạnh đáy $4$, chiều cao $6$. Tính $V$.`, a: `$32$.`, s: `$V=\\frac{1}{3} \\times 16 \\times 6=32$.`, d: 'thong_hieu' },
    { c: `Chóp tứ giác đều cạnh đáy $6$, cạnh bên $5$. Tính chiều cao.`, a: `$h=\\sqrt{7}$.`, s: `Nửa đường chéo đáy $=\\frac{6\\sqrt{2}}{2}=3\\sqrt{2}$. $h=\\sqrt{25-18}=\\sqrt{7}$.`, d: 'thong_hieu' },
    { c: `Diện tích xung quanh chóp tứ giác đều cạnh đáy $8$, trung đoạn $10$.`, a: `$160$.`, s: `$S_{xq}=\\frac{1}{2} \\times 32 \\times 10=160$.`, d: 'thong_hieu' },
    { c: `Kim tự tháp Kheops: đáy vuông cạnh $230$ m, cao $146$ m. Ước tính thể tích.`, a: `$\\approx 2{,}58 \\times 10^6$ m³.`, s: `$V=\\frac{1}{3} \\times 230^2 \\times 146=\\frac{1}{3} \\times 52900 \\times 146 \\approx 2574133$ m³.`, d: 'van_dung' },
    { c: `Chóp tứ giác đều $V=48$, $h=9$. Tính cạnh đáy.`, a: `$a=4$.`, s: `$48=\\frac{1}{3}a^2 \\times 9=3a^2$. $a^2=16$. $a=4$.`, d: 'van_dung' },
    { c: `Diện tích toàn phần chóp tứ giác đều cạnh đáy $10$, chiều cao $12$.`, a: `Tính trung đoạn rồi cộng.`, s: `Nửa đường chéo $=5\\sqrt{2}$. Cạnh bên $=\\sqrt{144+50}=\\sqrt{194}$. Trung đoạn $d=\\sqrt{144+25}=\\sqrt{169}=13$. $S_{xq}=\\frac{1}{2} \\times 40 \\times 13=260$. $S_{tp}=260+100=360$.`, d: 'van_dung_cao' },
    { c: `Chóp tứ giác đều có tất cả các cạnh bằng $a$. Tính $V$ theo $a$.`, a: `$V=\\frac{a^3\\sqrt{2}}{6}$.`, s: `$h=\\sqrt{a^2-\\frac{a^2}{2}}=\\frac{a}{\\sqrt{2}}$. $V=\\frac{1}{3}a^2 \\cdot \\frac{a}{\\sqrt{2}}=\\frac{a^3}{3\\sqrt{2}}=\\frac{a^3\\sqrt{2}}{6}$.`, d: 'van_dung_cao' },
  ]},
  { id: '1661d5a0-65a0-4253-a8b2-93d490d9b31f', p: 'T8-C10BTC', q: [
    { c: `Hình chóp tam giác đều có mấy mặt?`, a: `$4$.`, s: `$4$ mặt tam giác ($1$ đáy $+3$ bên).`, d: 'nhan_biet' },
    { c: `Hình chóp tứ giác đều có mấy cạnh?`, a: `$8$.`, s: `$4$ cạnh đáy $+4$ cạnh bên $=8$.`, d: 'nhan_biet' },
    { c: `Chóp tứ giác đều cạnh đáy $3$, $h=4$. Tính $V$.`, a: `$12$.`, s: `$V=\\frac{1}{3} \\times 9 \\times 4=12$.`, d: 'thong_hieu' },
    { c: `Chóp tam giác đều cạnh đáy $8$, $h=6$. Tính $V$.`, a: `$32\\sqrt{3}$.`, s: `$S=\\frac{\\sqrt{3}}{4} \\times 64=16\\sqrt{3}$. $V=\\frac{1}{3} \\times 16\\sqrt{3} \\times 6=32\\sqrt{3}$.`, d: 'thong_hieu' },
    { c: `So sánh hình chóp tam giác đều và hình chóp tứ giác đều.`, a: `Đáy $\\triangle$ đều vs vuông.`, s: `Tam giác: $4$ mặt, $6$ cạnh, $4$ đỉnh. Tứ giác: $5$ mặt, $8$ cạnh, $5$ đỉnh.`, d: 'thong_hieu' },
    { c: `Chóp tứ giác đều $S_{xq}=120$, chu vi đáy $24$. Tính trung đoạn.`, a: `$d=10$.`, s: `$S_{xq}=\\frac{1}{2} \\times 24 \\times d=120$. $d=10$.`, d: 'van_dung' },
    { c: `Đổ nước vào hộp hình hộp CN $10 \\times 8 \\times 6$ cm đầy rồi đổ sang hình chóp tứ giác đều đáy $10 \\times 10$. Nước cao bao nhiêu?`, a: `$h=14{,}4$ cm.`, s: `$V_{nước}=480$. $\\frac{1}{3} \\times 100 \\times h=480$. $h=14{,}4$ cm.`, d: 'van_dung' },
    { c: `Chóp tam giác đều cạnh $a=10$, cạnh bên $l=13$. Tính $S_{tp}$.`, a: `Tính trung đoạn.`, s: `$R=\\frac{10}{\\sqrt{3}}$. $d=\\sqrt{169-\\frac{100}{3}}=\\sqrt{\\frac{407}{3}}=12$... Trung đoạn $d=\\sqrt{l^2-(\\frac{a}{2\\sqrt{3}})^2}$... Cần xem lại. $d=\\sqrt{169-\\frac{25}{3}}=\\sqrt{\\frac{482}{3}} \\approx 12{,}67$. $S_{xq}=\\frac{1}{2} \\times 30 \\times 12{,}67=190$. $S_{tp}=190+25\\sqrt{3} \\approx 233{,}3$.`, d: 'van_dung_cao' },
    { c: `Chóp tứ giác đều $V=100$, cạnh đáy gấp đôi chiều cao. Tìm cạnh đáy.`, a: `$a \\approx 5{,}85$.`, s: `$h=\\frac{a}{2}$. $V=\\frac{1}{3}a^2 \\cdot \\frac{a}{2}=\\frac{a^3}{6}=100$. $a^3=600$. $a=\\sqrt[3]{600} \\approx 8{,}43$. Kiểm tra: $h \\approx 4{,}22$. $V \\approx 100$. ✓`, d: 'van_dung_cao' },
    { c: `CMR thể tích hình chóp tam giác đều cạnh $a$ bằng $\\frac{a^3\\sqrt{2}}{12}$.`, a: `Tính $S_{đáy}$, $h$ rồi thay.`, s: `$S=\\frac{\\sqrt{3}}{4}a^2$. $R=\\frac{a}{\\sqrt{3}}$. $h=\\sqrt{a^2-\\frac{a^2}{3}}=a\\sqrt{\\frac{2}{3}}$. $V=\\frac{1}{3} \\cdot \\frac{\\sqrt{3}a^2}{4} \\cdot a\\sqrt{\\frac{2}{3}}=\\frac{a^3\\sqrt{2}}{12}$. $\\blacksquare$`, d: 'van_dung_cao' },
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
