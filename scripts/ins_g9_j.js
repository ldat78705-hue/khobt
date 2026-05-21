const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const U = '8316c34e-765d-4b8c-9364-b683a17e33f8', G = 9, T = 'hinh_hoc';
const B = [
  { id: '8e983753-201a-4a9f-857f-4fac0eb3cbc1', p: 'T9-C10B31', q: [
    { c: `CT diện tích xung quanh hình trụ?`, a: `$S_{xq} = 2\\pi Rh$.`, s: `$S_{xq} = 2\\pi Rh$ ($R$: bán kính đáy, $h$: chiều cao).`, d: 'nhan_biet' },
    { c: `CT thể tích hình trụ?`, a: `$V = \\pi R^2 h$.`, s: `$V = S_{đáy} \\cdot h = \\pi R^2 h$.`, d: 'nhan_biet' },
    { c: `CT diện tích xung quanh hình nón?`, a: `$S_{xq} = \\pi R l$.`, s: `$S_{xq} = \\pi R l$ ($l$: đường sinh).`, d: 'nhan_biet' },
    { c: `CT thể tích hình nón?`, a: `$V = \\frac{1}{3}\\pi R^2 h$.`, s: `$V = \\frac{1}{3}\\pi R^2 h$.`, d: 'thong_hieu' },
    { c: `Hình trụ $R = 3$ cm, $h = 10$ cm. Tính $V$.`, a: `$90\\pi$ cm³.`, s: `$V = \\pi \\cdot 9 \\cdot 10 = 90\\pi \\approx 282{,}7$ cm³.`, d: 'thong_hieu' },
    { c: `Hình nón $R = 4$ cm, $h = 9$ cm. Tính $V$.`, a: `$48\\pi$ cm³.`, s: `$V = \\frac{1}{3}\\pi \\cdot 16 \\cdot 9 = 48\\pi \\approx 150{,}8$ cm³.`, d: 'thong_hieu' },
    { c: `Hình trụ $R = 5$ cm, $h = 8$ cm. Tính $S_{xq}$ và $S_{tp}$.`, a: `$S_{xq} = 80\\pi$ cm², $S_{tp} = 130\\pi$ cm².`, s: `$S_{xq} = 2\\pi \\cdot 5 \\cdot 8 = 80\\pi$. $S_{tp} = 80\\pi + 2\\pi \\cdot 25 = 130\\pi \\approx 408{,}4$ cm².`, d: 'van_dung' },
    { c: `Hình nón $R = 3$ cm, $l = 5$ cm. Tính $h$ và $V$.`, a: `$h = 4$ cm, $V = 12\\pi$ cm³.`, s: `$h = \\sqrt{l^2-R^2} = \\sqrt{25-9} = 4$ cm. $V = \\frac{1}{3}\\pi \\cdot 9 \\cdot 4 = 12\\pi \\approx 37{,}7$ cm³.`, d: 'van_dung' },
    { c: `Lon nước hình trụ $R = 3{,}5$ cm, $h = 12$ cm. Tính dung tích (ml, $1$ ml $= 1$ cm³).`, a: `$\\approx 462$ ml.`, s: `$V = \\pi(3{,}5)^2 \\cdot 12 = 147\\pi \\approx 461{,}8$ ml.`, d: 'van_dung_cao' },
    { c: `Hình trụ và hình nón cùng $R, h$. Tính tỉ số thể tích.`, a: `$\\frac{V_{nón}}{V_{trụ}} = \\frac{1}{3}$.`, s: `$\\frac{V_{nón}}{V_{trụ}} = \\frac{\\frac{1}{3}\\pi R^2 h}{\\pi R^2 h} = \\frac{1}{3}$.`, d: 'van_dung_cao' },
  ]},
  { id: '90fb47e3-2e8b-4936-8b67-a55051e1fbe4', p: 'T9-C10B32', q: [
    { c: `CT diện tích mặt cầu?`, a: `$S = 4\\pi R^2$.`, s: `$S = 4\\pi R^2$.`, d: 'nhan_biet' },
    { c: `CT thể tích hình cầu?`, a: `$V = \\frac{4}{3}\\pi R^3$.`, s: `$V = \\frac{4}{3}\\pi R^3$.`, d: 'nhan_biet' },
    { c: `Hình cầu $R = 3$ cm. Tính $S$.`, a: `$36\\pi$ cm².`, s: `$S = 4\\pi \\cdot 9 = 36\\pi \\approx 113{,}1$ cm².`, d: 'nhan_biet' },
    { c: `Hình cầu $R = 3$ cm. Tính $V$.`, a: `$36\\pi$ cm³.`, s: `$V = \\frac{4}{3}\\pi \\cdot 27 = 36\\pi \\approx 113{,}1$ cm³.`, d: 'thong_hieu' },
    { c: `Hình cầu $R = 6$ cm. Tính $V$.`, a: `$288\\pi$ cm³.`, s: `$V = \\frac{4}{3}\\pi \\cdot 216 = 288\\pi \\approx 904{,}8$ cm³.`, d: 'thong_hieu' },
    { c: `Quả bóng đường kính $22$ cm. Tính diện tích bề mặt.`, a: `$484\\pi \\approx 1520{,}5$ cm².`, s: `$R = 11$ cm. $S = 4\\pi \\cdot 121 = 484\\pi \\approx 1520{,}5$ cm².`, d: 'thong_hieu' },
    { c: `Quả bóng đường kính $22$ cm. Tính thể tích.`, a: `$\\frac{5324}{3}\\pi \\approx 5575{,}3$ cm³.`, s: `$V = \\frac{4}{3}\\pi \\cdot 11^3 = \\frac{5324}{3}\\pi \\approx 5575{,}3$ cm³.`, d: 'van_dung' },
    { c: `Bán kính cầu tăng gấp đôi. $V$ tăng mấy lần?`, a: `$8$ lần.`, s: `$V' = \\frac{4}{3}\\pi(2R)^3 = 8 \\cdot \\frac{4}{3}\\pi R^3 = 8V$.`, d: 'van_dung' },
    { c: `Bể nước hình cầu $R = 1{,}5$ m. Chứa được bao nhiêu lít? ($1$ lít $= 1$ dm³).`, a: `$\\approx 14137$ lít.`, s: `$V = \\frac{4}{3}\\pi(1{,}5)^3 = \\frac{4}{3}\\pi \\cdot 3{,}375 = 4{,}5\\pi$ m³ $= 4500\\pi$ dm³ $\\approx 14137$ lít.`, d: 'van_dung_cao' },
    { c: `Hình cầu ngoại tiếp hình trụ ($R_{trụ} = R_{cầu}$, $h = 2R$). Tỉ số $\\frac{V_{trụ}}{V_{cầu}}$?`, a: `$\\frac{2}{3}$... kiểm tra: Archimedes.`, s: `$V_{trụ} = \\pi R^2 \\cdot 2R = 2\\pi R^3$. $V_{cầu} = \\frac{4}{3}\\pi R^3$. $\\frac{V_{cầu}}{V_{trụ}} = \\frac{2}{3}$. Hệ thức Archimedes nổi tiếng. $\\blacksquare$`, d: 'van_dung_cao' },
  ]},
  { id: 'b1ff7e16-00c7-484d-8352-569a384be669', p: 'T9-C10BTC', q: [
    { c: `Hình trụ $R = 4$ cm, $h = 5$ cm. Tính $V$.`, a: `$80\\pi$ cm³.`, s: `$V = \\pi \\cdot 16 \\cdot 5 = 80\\pi \\approx 251{,}3$ cm³.`, d: 'nhan_biet' },
    { c: `Hình cầu $R = 2$ cm. Tính $S$.`, a: `$16\\pi$ cm².`, s: `$S = 4\\pi \\cdot 4 = 16\\pi \\approx 50{,}3$ cm².`, d: 'nhan_biet' },
    { c: `Hình nón $R = 6$ cm, $h = 8$ cm. Tính $l$.`, a: `$l = 10$ cm.`, s: `$l = \\sqrt{R^2+h^2} = \\sqrt{36+64} = 10$ cm.`, d: 'thong_hieu' },
    { c: `Hình nón câu trên. Tính $V$.`, a: `$96\\pi$ cm³.`, s: `$V = \\frac{1}{3}\\pi \\cdot 36 \\cdot 8 = 96\\pi \\approx 301{,}6$ cm³.`, d: 'thong_hieu' },
    { c: `Hình cầu $V = 36\\pi$ cm³. Tính $R$.`, a: `$R = 3$ cm.`, s: `$\\frac{4}{3}\\pi R^3 = 36\\pi$. $R^3 = 27$. $R = 3$ cm.`, d: 'thong_hieu' },
    { c: `Hình trụ $S_{xq} = 100\\pi$ cm², $R = 5$ cm. Tính $h$.`, a: `$h = 10$ cm.`, s: `$2\\pi \\cdot 5 \\cdot h = 100\\pi$. $h = 10$ cm.`, d: 'van_dung' },
    { c: `Nón kem $R = 2{,}5$ cm, $h = 10$ cm. Tính thể tích kem.`, a: `$\\frac{62{,}5}{3}\\pi \\approx 65{,}4$ cm³.`, s: `$V = \\frac{1}{3}\\pi \\cdot 6{,}25 \\cdot 10 = \\frac{62{,}5\\pi}{3} \\approx 65{,}4$ cm³.`, d: 'van_dung' },
    { c: `$S$ mặt cầu tăng $4$ lần. $R$ tăng mấy lần?`, a: `$2$ lần.`, s: `$S' = 4S \\Rightarrow 4\\pi R'^2 = 4 \\cdot 4\\pi R^2 \\Rightarrow R' = 2R$.`, d: 'van_dung' },
    { c: `Hình trụ $R = 3$ cm, $h = 7$ cm. Tính $S_{tp}$.`, a: `$60\\pi$ cm².`, s: `$S_{xq} = 2\\pi \\cdot 3 \\cdot 7 = 42\\pi$. $S_{tp} = 42\\pi + 2\\pi \\cdot 9 = 60\\pi \\approx 188{,}5$ cm².`, d: 'van_dung_cao' },
    { c: `Bể hình trụ $R = 2$ m, $h = 3$ m đầy nước. Đổ sang bể hình cầu. Tính $R$ cầu tối thiểu.`, a: `$R_{cầu} = \\sqrt[3]{9} \\approx 2{,}08$ m.`, s: `$V_{trụ} = \\pi \\cdot 4 \\cdot 3 = 12\\pi$. $\\frac{4}{3}\\pi R^3 = 12\\pi$. $R^3 = 9$. $R = \\sqrt[3]{9} \\approx 2{,}08$ m.`, d: 'van_dung_cao' },
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
