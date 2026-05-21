const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const U = '8316c34e-765d-4b8c-9364-b683a17e33f8', G = 8, T = 'hinh_hoc';
const B = [
  { id: '182ce417-de7e-45cb-b7f2-df65ab184e71', p: 'T8-C9B36', q: [
    { c: `Nêu trường hợp đồng dạng đặc biệt của hai tam giác vuông.`, a: `Cạnh huyền - cạnh góc vuông tỉ lệ, hoặc góc nhọn bằng nhau.`, s: `Hai $\\triangle$ vuông đồng dạng nếu: 1) Một góc nhọn bằng nhau. 2) Hai cạnh góc vuông tỉ lệ. 3) Cạnh huyền và cạnh góc vuông tỉ lệ.`, d: 'nhan_biet' },
    { c: `$\\triangle ABC$ vuông $A$, $AB=3, AC=4$. $\\triangle DEF$ vuông $D$, $DE=6, DF=8$. Đồng dạng?`, a: `Có.`, s: `$\\frac{AB}{DE}=\\frac{AC}{DF}=\\frac{1}{2}$. Cạnh góc vuông tỉ lệ → đồng dạng.`, d: 'nhan_biet' },
    { c: `$\\triangle$ vuông có $\\widehat{B}=30°$. $\\triangle$ vuông khác có $\\widehat{E}=30°$. Đồng dạng?`, a: `Có (g.g).`, s: `Cả hai có $1$ góc vuông và $1$ góc $30°$ → $\\widehat{C}=\\widehat{F}=60°$ → đồng dạng.`, d: 'nhan_biet' },
    { c: `$\\triangle ABC$ vuông $A$, $\\widehat{B}=60°$, $AB=5$. Tính $AC, BC$.`, a: `$AC=5\\sqrt{3}, BC=10$.`, s: `$AC=AB\\tan 60°=5\\sqrt{3}$. $BC=\\frac{AB}{\\cos 60°}=10$.`, d: 'thong_hieu' },
    { c: `$\\triangle$ vuông cạnh huyền $10$, cạnh góc vuông $6$. Tính cạnh còn lại.`, a: `$8$.`, s: `$c=\\sqrt{10^2-6^2}=\\sqrt{64}=8$.`, d: 'thong_hieu' },
    { c: `$\\triangle ABC$ vuông $A$, $AH \\perp BC$. CMR $\\triangle ABH \\sim \\triangle ACB$ rồi suy ra $AB^2=BH \\cdot BC$.`, a: `g.g rồi tỉ lệ.`, s: `$\\widehat{AHB}=\\widehat{A}=90°$, $\\widehat{B}$ chung → $\\triangle ABH \\sim \\triangle CBA$. $\\frac{AB}{CB}=\\frac{BH}{BA}$ → $AB^2=BH \\cdot BC$. $\\blacksquare$`, d: 'thong_hieu' },
    { c: `$\\triangle$ vuông cạnh $3,4,5$. $\\triangle$ vuông cạnh huyền $15$, một cạnh $9$. Đồng dạng?`, a: `Cạnh còn lại $=12$. $\\frac{3}{9}=\\frac{4}{12}=\\frac{5}{15}=\\frac{1}{3}$. Có.`, s: `Cạnh $=\\sqrt{225-81}=12$. Tỉ lệ $\\frac{1}{3}$ → đồng dạng.`, d: 'van_dung' },
    { c: `$\\triangle ABC$ vuông $A$, $AH \\perp BC$, $BH=4, HC=9$. Tính $AH, AB, AC$.`, a: `$AH=6, AB=2\\sqrt{13}, AC=3\\sqrt{13}$.`, s: `$AH=\\sqrt{BH \\cdot HC}=\\sqrt{36}=6$. $AB=\\sqrt{BH \\cdot BC}=\\sqrt{4 \\times 13}=2\\sqrt{13}$. $AC=\\sqrt{HC \\cdot BC}=3\\sqrt{13}$.`, d: 'van_dung' },
    { c: `CMR mọi tam giác vuông cân đều đồng dạng với nhau.`, a: `Đều có góc $45°$.`, s: `Mọi $\\triangle$ vuông cân có góc $90°, 45°, 45°$ → g.g → đồng dạng. $\\blacksquare$`, d: 'van_dung_cao' },
    { c: `$\\triangle ABC$ vuông $A$, $AH \\perp BC$. CMR $\\frac{1}{AH^2}=\\frac{1}{AB^2}+\\frac{1}{AC^2}$.`, a: `Dùng hệ thức lượng.`, s: `$AH^2=BH \\cdot HC$. $S=\\frac{1}{2}AB \\cdot AC=\\frac{1}{2}BC \\cdot AH$. $AH=\\frac{AB \\cdot AC}{BC}$. $\\frac{1}{AH^2}=\\frac{BC^2}{AB^2 \\cdot AC^2}=\\frac{AB^2+AC^2}{AB^2 \\cdot AC^2}=\\frac{1}{AC^2}+\\frac{1}{AB^2}$. $\\blacksquare$`, d: 'van_dung_cao' },
  ]},
  { id: '8094b1c5-28a5-43e5-832c-d8e68ab1037e', p: 'T8-C9B37', q: [
    { c: `Hình đồng dạng là gì?`, a: `Hai hình có cùng dạng, kích thước tỉ lệ.`, s: `Hình $H'$ đồng dạng với $H$ nếu $H'$ nhận được từ $H$ qua phép đồng dạng (phóng to/thu nhỏ + phép dời hình).`, d: 'nhan_biet' },
    { c: `Nêu ví dụ về hình đồng dạng trong thực tế.`, a: `Bản đồ, ảnh thu nhỏ, mô hình.`, s: `Bản đồ tỉ lệ, ảnh chụp phóng to/thu nhỏ, mô hình kiến trúc.`, d: 'nhan_biet' },
    { c: `Hai hình tròn bất kỳ có đồng dạng không?`, a: `Có.`, s: `Mọi hình tròn đều đồng dạng (tỉ số bán kính là tỉ số đồng dạng).`, d: 'nhan_biet' },
    { c: `Hai hình vuông bất kỳ có đồng dạng không?`, a: `Có.`, s: `Mọi hình vuông đều đồng dạng với nhau (tỉ số cạnh).`, d: 'thong_hieu' },
    { c: `HCN $3 \\times 5$ và HCN $6 \\times 10$ có đồng dạng không?`, a: `Có, $k=2$.`, s: `$\\frac{6}{3}=\\frac{10}{5}=2$. Đồng dạng.`, d: 'thong_hieu' },
    { c: `HCN $3 \\times 5$ và HCN $6 \\times 8$ có đồng dạng không?`, a: `Không.`, s: `$\\frac{6}{3}=2 \\neq \\frac{8}{5}=1{,}6$. Không đồng dạng.`, d: 'thong_hieu' },
    { c: `Bản đồ tỉ lệ $1:50000$. Khoảng cách trên bản đồ $4$ cm. Khoảng cách thực?`, a: `$2$ km.`, s: `$4 \\times 50000 = 200000$ cm $= 2$ km.`, d: 'van_dung' },
    { c: `Mô hình tòa nhà tỉ lệ $1:100$. Mô hình cao $50$ cm. Tòa nhà thực cao?`, a: `$50$ m.`, s: `$50 \\times 100 = 5000$ cm $= 50$ m.`, d: 'van_dung' },
    { c: `Hai tam giác đều bất kỳ có đồng dạng không? Giải thích.`, a: `Có.`, s: `Mọi $\\triangle$ đều có $3$ góc $60°$. Theo g.g, mọi $\\triangle$ đều đồng dạng. $\\blacksquare$`, d: 'van_dung_cao' },
    { c: `CMR hai đa giác đều cùng loại ($n$ cạnh) luôn đồng dạng.`, a: `Các góc bằng, cạnh tỉ lệ.`, s: `Đa giác đều $n$ cạnh có $n$ góc bằng $\\frac{(n-2)180°}{n}$ và $n$ cạnh bằng nhau. Hai đa giác đều cùng loại: góc bằng, cạnh tỉ lệ → đồng dạng. $\\blacksquare$`, d: 'van_dung_cao' },
  ]},
  { id: 'fe4cf590-d812-4754-b525-7cf469ded7f8', p: 'T8-C9BTC', q: [
    { c: `$\\triangle ABC \\sim \\triangle DEF$, $\\frac{AB}{DE}=\\frac{3}{5}$. $BC=9$. Tính $EF$.`, a: `$15$.`, s: `$\\frac{BC}{EF}=\\frac{3}{5}$. $EF=15$.`, d: 'nhan_biet' },
    { c: `$\\triangle$ vuông cạnh $5, 12$. Tính cạnh huyền.`, a: `$13$.`, s: `$c=\\sqrt{25+144}=13$.`, d: 'nhan_biet' },
    { c: `$\\triangle$ có cạnh $8, 15, 17$. Vuông không?`, a: `Có.`, s: `$17^2=289=64+225$. Vuông.`, d: 'thong_hieu' },
    { c: `Hai $\\triangle$ đồng dạng, $k=4$, $S_1=32$. Tính $S_2$.`, a: `$2$.`, s: `$\\frac{S_1}{S_2}=k^2=16$. $S_2=2$.`, d: 'thong_hieu' },
    { c: `$\\triangle ABC$ vuông $A$, $AH \\perp BC$, $AB=6, AC=8$. Tính $BH$.`, a: `$3{,}6$.`, s: `$BC=10$. $AB^2=BH \\cdot BC$. $BH=\\frac{36}{10}=3{,}6$.`, d: 'thong_hieu' },
    { c: `$\\triangle ABC$, $DE \\parallel BC$, $AD=3, DB=5, DE=6$. Tính $BC$.`, a: `$16$.`, s: `$\\frac{DE}{BC}=\\frac{AD}{AB}=\\frac{3}{8}$. $BC=16$.`, d: 'van_dung' },
    { c: `Tỉ lệ bản đồ $1:25000$. Hai điểm cách nhau $8$ cm trên bản đồ. Khoảng cách thực?`, a: `$2$ km.`, s: `$8 \\times 25000=200000$ cm $=2$ km.`, d: 'van_dung' },
    { c: `$\\triangle ABC$ vuông $A$, $AH \\perp BC$, $BH=3, HC=12$. Tính $AB, AC, AH$.`, a: `$AH=6, AB=\\sqrt{45}, AC=\\sqrt{180}$.`, s: `$AH=\\sqrt{3 \\times 12}=6$. $AB=\\sqrt{3 \\times 15}=3\\sqrt{5}$. $AC=\\sqrt{12 \\times 15}=6\\sqrt{5}$.`, d: 'van_dung_cao' },
    { c: `$\\triangle ABC$, $M$ trên $AB$, $N$ trên $AC$, $\\widehat{AMN}=\\widehat{B}$. CMR $\\triangle AMN \\sim \\triangle ABC$.`, a: `g.g.`, s: `$\\widehat{A}$ chung, $\\widehat{AMN}=\\widehat{B}$ → g.g → $\\triangle AMN \\sim \\triangle ABC$. $\\blacksquare$`, d: 'van_dung_cao' },
    { c: `$\\triangle ABC$ vuông $A$, đường cao $AH$. CMR $AH \\cdot BC = AB \\cdot AC$.`, a: `Diện tích.`, s: `$S=\\frac{1}{2}AB \\cdot AC=\\frac{1}{2}BC \\cdot AH$ → $AB \\cdot AC=BC \\cdot AH$. $\\blacksquare$`, d: 'van_dung_cao' },
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
