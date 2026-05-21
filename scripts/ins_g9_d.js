const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const U = '8316c34e-765d-4b8c-9364-b683a17e33f8', G = 9, T = 'hinh_hoc';
const B = [
  { id: 'a36de566-3c04-439f-9997-2f2e0af98edd', p: 'T9-C4B11', q: [
    { c: `$\\sin\\alpha$ trong tam giác vuông bằng gì?`, a: `$\\frac{\\text{cạnh đối}}{\\text{cạnh huyền}}$.`, s: `$\\sin\\alpha = \\frac{\\text{cạnh đối}}{\\text{cạnh huyền}}$.`, d: 'nhan_biet' },
    { c: `$\\cos\\alpha$ trong tam giác vuông bằng gì?`, a: `$\\frac{\\text{cạnh kề}}{\\text{cạnh huyền}}$.`, s: `$\\cos\\alpha = \\frac{\\text{cạnh kề}}{\\text{cạnh huyền}}$.`, d: 'nhan_biet' },
    { c: `$\\tan\\alpha = ?$`, a: `$\\frac{\\sin\\alpha}{\\cos\\alpha} = \\frac{\\text{cạnh đối}}{\\text{cạnh kề}}$.`, s: `$\\tan\\alpha = \\frac{\\text{cạnh đối}}{\\text{cạnh kề}}$.`, d: 'nhan_biet' },
    { c: `Tính $\\sin 30°, \\cos 30°, \\tan 30°$.`, a: `$\\frac{1}{2}$; $\\frac{\\sqrt{3}}{2}$; $\\frac{\\sqrt{3}}{3}$.`, s: `$\\sin 30°=\\frac{1}{2}$. $\\cos 30°=\\frac{\\sqrt{3}}{2}$. $\\tan 30°=\\frac{1}{\\sqrt{3}}=\\frac{\\sqrt{3}}{3}$.`, d: 'thong_hieu' },
    { c: `$\\triangle ABC$ vuông tại $A$, $AB = 3$ cm, $BC = 5$ cm. Tính $\\sin B$.`, a: `$\\sin B = \\frac{4}{5}$.`, s: `$AC = \\sqrt{25-9} = 4$ cm. $\\sin B = \\frac{AC}{BC} = \\frac{4}{5}$.`, d: 'thong_hieu' },
    { c: `Nếu $\\alpha + \\beta = 90°$ thì $\\sin\\alpha = ?$`, a: `$\\cos\\beta$.`, s: `Hai góc phụ nhau: $\\sin\\alpha = \\cos\\beta$, $\\cos\\alpha = \\sin\\beta$.`, d: 'thong_hieu' },
    { c: `$\\triangle ABC$ vuông tại $A$, $\\widehat{B} = 40°$, $BC = 10$ cm. Tính $AB$.`, a: `$AB \\approx 7{,}66$ cm.`, s: `$AB = BC \\cdot \\cos B = 10 \\cdot \\cos 40° \\approx 10 \\times 0{,}766 = 7{,}66$ cm.`, d: 'van_dung' },
    { c: `$\\triangle ABC$ vuông tại $A$, $AB = 6$ cm, $AC = 8$ cm. Tính $\\tan B, \\tan C$.`, a: `$\\tan B = \\frac{4}{3}, \\tan C = \\frac{3}{4}$.`, s: `$\\tan B = \\frac{AC}{AB} = \\frac{8}{6} = \\frac{4}{3}$. $\\tan C = \\frac{AB}{AC} = \\frac{3}{4}$.`, d: 'van_dung' },
    { c: `CMR $\\sin^2\\alpha + \\cos^2\\alpha = 1$.`, a: `Pythagore.`, s: `$\\sin^2\\alpha + \\cos^2\\alpha = \\frac{a^2}{c^2}+\\frac{b^2}{c^2}=\\frac{a^2+b^2}{c^2}=\\frac{c^2}{c^2}=1$. $\\blacksquare$`, d: 'van_dung_cao' },
    { c: `Cho $\\sin\\alpha = \\frac{3}{5}$ ($0°<\\alpha<90°$). Tính $\\cos\\alpha$ và $\\tan\\alpha$.`, a: `$\\cos\\alpha=\\frac{4}{5}$, $\\tan\\alpha=\\frac{3}{4}$.`, s: `$\\cos\\alpha = \\sqrt{1-\\frac{9}{25}}=\\frac{4}{5}$. $\\tan\\alpha=\\frac{3/5}{4/5}=\\frac{3}{4}$.`, d: 'van_dung_cao' },
  ]},
  { id: '9fc7a175-90cf-4a55-808c-60a000bfd400', p: 'T9-C4B12', q: [
    { c: `Trong $\\triangle ABC$ vuông tại $A$: $a = b \\cdot \\tan B$ đúng không?`, a: `Sai. $a = \\frac{b}{\\cos B}$... Kiểm lại.`, s: `$\\tan B = \\frac{AC}{AB}=\\frac{b}{c}$. Vậy $b = c \\cdot \\tan B$. Hệ thức đúng: cạnh đối $= $ cạnh kề $\\times \\tan$(góc).`, d: 'nhan_biet' },
    { c: `$\\triangle ABC$ vuông tại $A$, $\\widehat{B}=35°$, $AB=10$ cm. Tính $AC$.`, a: `$AC \\approx 7{,}00$ cm.`, s: `$AC = AB \\cdot \\tan B = 10 \\cdot \\tan 35° \\approx 10 \\times 0{,}700 = 7{,}00$ cm.`, d: 'nhan_biet' },
    { c: `$\\triangle ABC$ vuông tại $A$, $\\widehat{C}=50°$, $BC=12$ cm. Tính $AC$.`, a: `$AC \\approx 7{,}71$ cm.`, s: `$AC = BC \\cdot \\cos C = 12 \\cdot \\cos 50° \\approx 12 \\times 0{,}643 = 7{,}71$ cm.`, d: 'nhan_biet' },
    { c: `Thang dựa tường, chân thang cách tường $2$ m, thang dài $5$ m. Tính góc thang tạo với mặt đất.`, a: `$\\alpha \\approx 66°$.`, s: `$\\cos\\alpha = \\frac{2}{5} = 0{,}4 \\Rightarrow \\alpha \\approx 66°$.`, d: 'thong_hieu' },
    { c: `Tháp cao $h$, từ điểm $A$ cách chân tháp $50$ m nhìn đỉnh tháp dưới góc $60°$. Tính $h$.`, a: `$h \\approx 86{,}6$ m.`, s: `$h = 50 \\cdot \\tan 60° = 50\\sqrt{3} \\approx 86{,}6$ m.`, d: 'thong_hieu' },
    { c: `$\\triangle ABC$ vuông tại $A$, $AB=5$ cm, $AC=12$ cm. Tính $\\widehat{B}$.`, a: `$\\widehat{B} \\approx 67°$.`, s: `$\\tan B = \\frac{12}{5} = 2{,}4 \\Rightarrow \\widehat{B} \\approx 67°24'$.`, d: 'thong_hieu' },
    { c: `Đỉnh núi cao $300$ m so với chân. Đường đi lên dốc $20°$. Tính chiều dài đường đi.`, a: `$\\approx 877$ m.`, s: `$\\sin 20° = \\frac{300}{d} \\Rightarrow d = \\frac{300}{\\sin 20°} = \\frac{300}{0{,}342} \\approx 877$ m.`, d: 'van_dung' },
    { c: `$\\triangle ABC$ vuông tại $A$, $AH \\perp BC$, $AB = 6$ cm, $AC = 8$ cm. Tính $AH$.`, a: `$AH = 4{,}8$ cm.`, s: `$BC = 10$ cm. $S = \\frac{1}{2} \\cdot 6 \\cdot 8 = 24$. $AH = \\frac{2S}{BC} = \\frac{48}{10} = 4{,}8$ cm.`, d: 'van_dung' },
    { c: `Cột điện cao $8$ m, bóng dài $6$ m. Tính góc nâng mặt trời.`, a: `$\\alpha \\approx 53°$.`, s: `$\\tan\\alpha = \\frac{8}{6} = \\frac{4}{3} \\approx 1{,}333 \\Rightarrow \\alpha \\approx 53°8'$.`, d: 'van_dung_cao' },
    { c: `Hai điểm $A, B$ ở hai bên sông. Từ $A$ đo $AC = 100$ m (bờ bên này), $\\widehat{ACB} = 90°$, $\\widehat{CAB} = 60°$. Tính $AB$.`, a: `$AB = 200$ m.`, s: `$\\cos 60° = \\frac{AC}{AB} = \\frac{100}{AB} \\Rightarrow AB = \\frac{100}{0{,}5} = 200$ m.`, d: 'van_dung_cao' },
  ]},
  { id: '8b7dcc3d-aa7d-44cd-b756-4de1bfdf71b7', p: 'T9-C4BTC', q: [
    { c: `Tính $\\sin 45°$.`, a: `$\\frac{\\sqrt{2}}{2}$.`, s: `$\\sin 45° = \\frac{\\sqrt{2}}{2}$.`, d: 'nhan_biet' },
    { c: `$\\tan 45° = ?$`, a: `$1$.`, s: `$\\tan 45° = 1$.`, d: 'nhan_biet' },
    { c: `$\\triangle$ vuông, cạnh huyền $13$ cm, cạnh góc vuông $5$ cm. Tính cạnh kia và các góc nhọn.`, a: `Cạnh $= 12$ cm; $\\widehat{B} \\approx 22{,}6°$, $\\widehat{C} \\approx 67{,}4°$.`, s: `Cạnh $= \\sqrt{169-25}=12$ cm. $\\sin B=\\frac{5}{13} \\Rightarrow \\widehat{B} \\approx 22{,}6°$. $\\widehat{C}=90°-22{,}6°=67{,}4°$.`, d: 'thong_hieu' },
    { c: `$\\cos 60° = ?$`, a: `$\\frac{1}{2}$.`, s: `$\\cos 60° = \\frac{1}{2}$.`, d: 'thong_hieu' },
    { c: `$\\triangle$ vuông tại $A$, $\\widehat{B}=30°$, $BC=20$ cm. Tính $AB$ và $AC$.`, a: `$AB = 10\\sqrt{3}$ cm, $AC = 10$ cm.`, s: `$AC = BC \\cdot \\sin B = 20 \\cdot \\sin 30° = 10$ cm. $AB = BC \\cdot \\cos B = 20 \\cdot \\cos 30° = 10\\sqrt{3}$ cm.`, d: 'thong_hieu' },
    { c: `Cho $\\cos\\alpha = 0{,}6$. Tính $\\sin\\alpha$ và $\\tan\\alpha$.`, a: `$\\sin\\alpha = 0{,}8$, $\\tan\\alpha = \\frac{4}{3}$.`, s: `$\\sin\\alpha = \\sqrt{1-0{,}36}=0{,}8$. $\\tan\\alpha = \\frac{0{,}8}{0{,}6}=\\frac{4}{3}$.`, d: 'van_dung' },
    { c: `Tháp nghiêng Pisa: chiều dài $56$ m, nghiêng $4°$ so với phương thẳng đứng. Tính chiều cao thẳng đứng.`, a: `$\\approx 55{,}86$ m.`, s: `$h = 56 \\cdot \\cos 4° \\approx 56 \\times 0{,}9976 \\approx 55{,}86$ m.`, d: 'van_dung' },
    { c: `$\\triangle ABC$ vuông tại $A$, $AH \\perp BC$, $BH = 4$ cm, $CH = 9$ cm. Tính $AH$ và $AB$.`, a: `$AH = 6$ cm, $AB = 2\\sqrt{13}$ cm.`, s: `$AH = \\sqrt{BH \\cdot CH} = \\sqrt{36} = 6$ cm. $AB = \\sqrt{BH \\cdot BC} = \\sqrt{4 \\cdot 13} = 2\\sqrt{13}$ cm.`, d: 'van_dung' },
    { c: `Máy bay bay ở độ cao $10\\,000$ m. Từ mặt đất, góc nâng nhìn máy bay là $30°$. Tính khoảng cách từ người quan sát đến điểm ngay bên dưới máy bay.`, a: `$10\\,000\\sqrt{3} \\approx 17\\,320$ m.`, s: `$d = \\frac{10000}{\\tan 30°} = \\frac{10000}{\\frac{\\sqrt{3}}{3}} = 10000\\sqrt{3} \\approx 17\\,320$ m.`, d: 'van_dung_cao' },
    { c: `CMR trong $\\triangle$ vuông tại $A$: $\\frac{1}{AB^2}+\\frac{1}{AC^2}=\\frac{1}{AH^2}$ ($AH$ đường cao từ $A$).`, a: `Dùng $AH = \\frac{AB \\cdot AC}{BC}$.`, s: `$AH = \\frac{AB \\cdot AC}{BC}$. $\\frac{1}{AH^2}=\\frac{BC^2}{AB^2 \\cdot AC^2}=\\frac{AB^2+AC^2}{AB^2 \\cdot AC^2}=\\frac{1}{AC^2}+\\frac{1}{AB^2}$. $\\blacksquare$`, d: 'van_dung_cao' },
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
