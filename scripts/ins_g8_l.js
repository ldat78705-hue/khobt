const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const U = '8316c34e-765d-4b8c-9364-b683a17e33f8', G = 8, T = 'hinh_hoc';
const B = [
  { id: '5de34a26-19d4-4f96-89ab-705cd64af7d2', p: 'T8-C9B33', q: [
    { c: `Hai tam giác đồng dạng khi nào?`, a: `Góc bằng, cạnh tỉ lệ.`, s: `$\\triangle ABC \\sim \\triangle A'B'C'$ khi $3$ góc bằng nhau và $3$ cạnh tương ứng tỉ lệ.`, d: 'nhan_biet' },
    { c: `Tỉ số đồng dạng là gì?`, a: `Tỉ số cạnh tương ứng.`, s: `$k = \\frac{AB}{A'B'} = \\frac{BC}{B'C'} = \\frac{CA}{C'A'}$.`, d: 'nhan_biet' },
    { c: `$\\triangle ABC \\sim \\triangle DEF$, $k=2$. $AB=6$. Tìm $DE$.`, a: `$3$.`, s: `$DE = \\frac{AB}{k} = \\frac{6}{2} = 3$.`, d: 'nhan_biet' },
    { c: `Tỉ số diện tích hai tam giác đồng dạng với tỉ số $k$?`, a: `$k^2$.`, s: `$\\frac{S_1}{S_2} = k^2$.`, d: 'thong_hieu' },
    { c: `$\\triangle ABC \\sim \\triangle DEF$, $k=3$, $S_{DEF}=5$. Tính $S_{ABC}$.`, a: `$45$.`, s: `$S_{ABC} = k^2 \\cdot S_{DEF} = 9 \\times 5 = 45$.`, d: 'thong_hieu' },
    { c: `$\\triangle ABC$ có $AB=3, BC=4, CA=5$. $\\triangle DEF$ có $DE=6, EF=8, FD=10$. Hai tam giác có đồng dạng không?`, a: `Có, $k=2$.`, s: `$\\frac{DE}{AB}=\\frac{EF}{BC}=\\frac{FD}{CA}=2$. Đồng dạng, $k=2$.`, d: 'thong_hieu' },
    { c: `Tỉ số chu vi hai tam giác đồng dạng với $k$?`, a: `$k$.`, s: `Chu vi tỉ lệ theo $k$: $\\frac{C_1}{C_2}=k$.`, d: 'van_dung' },
    { c: `$\\triangle ABC \\sim \\triangle DEF$, $AB=4, DE=6, S_{ABC}=12$. Tính $S_{DEF}$.`, a: `$27$.`, s: `$k=\\frac{AB}{DE}=\\frac{2}{3}$. $\\frac{S_{ABC}}{S_{DEF}}=k^2=\\frac{4}{9}$. $S_{DEF}=\\frac{12 \\times 9}{4}=27$.`, d: 'van_dung' },
    { c: `Hai tam giác đồng dạng, tỉ số đồng dạng $k=\\frac{1}{2}$. Chu vi tam giác lớn $= 24$. Tìm chu vi tam giác nhỏ.`, a: `$12$.`, s: `$C_2 = k \\cdot C_1 = \\frac{1}{2} \\times 24 = 12$.`, d: 'van_dung_cao' },
    { c: `CMR nếu $\\triangle ABC \\sim \\triangle DEF$ thì $\\frac{h_a}{h_d} = k$ (tỉ số đường cao).`, a: `Dùng diện tích.`, s: `$\\frac{S_1}{S_2}=k^2$. $S=\\frac{1}{2}ah$. $\\frac{a_1 h_1}{a_2 h_2}=k^2$, $\\frac{a_1}{a_2}=k$ → $\\frac{h_1}{h_2}=k$. $\\blacksquare$`, d: 'van_dung_cao' },
  ]},
  { id: '981f5327-f5fe-4bc3-8643-5e08713bdc79', p: 'T8-C9B34', q: [
    { c: `Trường hợp đồng dạng thứ nhất (c.c.c)?`, a: `$3$ cạnh tỉ lệ.`, s: `$\\frac{AB}{DE}=\\frac{BC}{EF}=\\frac{CA}{FD}$ → $\\triangle ABC \\sim \\triangle DEF$.`, d: 'nhan_biet' },
    { c: `Trường hợp đồng dạng thứ hai (c.g.c)?`, a: `$2$ cạnh tỉ lệ, góc xen giữa bằng nhau.`, s: `$\\frac{AB}{DE}=\\frac{AC}{DF}$, $\\widehat{A}=\\widehat{D}$ → đồng dạng.`, d: 'nhan_biet' },
    { c: `Trường hợp đồng dạng thứ ba (g.g)?`, a: `$2$ góc bằng nhau.`, s: `$\\widehat{A}=\\widehat{D}$, $\\widehat{B}=\\widehat{E}$ → $\\triangle ABC \\sim \\triangle DEF$.`, d: 'nhan_biet' },
    { c: `$\\triangle ABC$: $AB=3, AC=6, \\widehat{A}=50°$. $\\triangle DEF$: $DE=6, DF=12, \\widehat{D}=50°$. Đồng dạng?`, a: `Có (c.g.c).`, s: `$\\frac{AB}{DE}=\\frac{AC}{DF}=\\frac{1}{2}$, $\\widehat{A}=\\widehat{D}=50°$ → đồng dạng (c.g.c).`, d: 'thong_hieu' },
    { c: `$\\triangle ABC$: $\\widehat{A}=40°, \\widehat{B}=70°$. $\\triangle DEF$: $\\widehat{D}=40°, \\widehat{F}=70°$. Đồng dạng?`, a: `Có (g.g).`, s: `$\\widehat{C}=70°, \\widehat{E}=70°$. $\\widehat{A}=\\widehat{D}=40°$, $\\widehat{B}=\\widehat{E}=70°$ → đồng dạng (g.g).`, d: 'thong_hieu' },
    { c: `$\\triangle ABC$: $3, 4, 5$. $\\triangle DEF$: $6, 8, 9$. Đồng dạng?`, a: `Không.`, s: `$\\frac{3}{6}=\\frac{1}{2}$, $\\frac{4}{8}=\\frac{1}{2}$, $\\frac{5}{9} \\neq \\frac{1}{2}$. Không tỉ lệ → không đồng dạng.`, d: 'thong_hieu' },
    { c: `$\\triangle ABC$, $D \\in AB$, $E \\in AC$, $DE \\parallel BC$. CMR $\\triangle ADE \\sim \\triangle ABC$.`, a: `g.g.`, s: `$\\widehat{A}$ chung. $\\widehat{ADE}=\\widehat{B}$ (đồng vị). → $\\triangle ADE \\sim \\triangle ABC$ (g.g). $\\blacksquare$`, d: 'van_dung' },
    { c: `$\\triangle ABC$ vuông tại $A$, $AH \\perp BC$. CMR $\\triangle ABH \\sim \\triangle CBA$.`, a: `g.g.`, s: `$\\widehat{AHB}=\\widehat{BAC}=90°$, $\\widehat{B}$ chung → $\\triangle ABH \\sim \\triangle CBA$ (g.g). $\\blacksquare$`, d: 'van_dung' },
    { c: `$\\triangle ABC$, $AB=4, BC=6, \\widehat{B}=60°$. $\\triangle DEF$, $DE=8, EF=12, \\widehat{E}=60°$. Tìm tỉ số đồng dạng.`, a: `$k=\\frac{1}{2}$.`, s: `$\\frac{AB}{DE}=\\frac{BC}{EF}=\\frac{1}{2}$, $\\widehat{B}=\\widehat{E}$. c.g.c → $k=\\frac{1}{2}$.`, d: 'van_dung_cao' },
    { c: `$\\triangle ABC$ vuông tại $A$, $AH \\perp BC$. CMR $AH^2 = BH \\cdot HC$.`, a: `Dùng tam giác đồng dạng.`, s: `$\\triangle ABH \\sim \\triangle CAH$ (g.g). $\\frac{AH}{CH}=\\frac{BH}{AH}$ → $AH^2=BH \\cdot HC$. $\\blacksquare$`, d: 'van_dung_cao' },
  ]},
  { id: '314a5710-b105-4d0b-91a3-38804b557f65', p: 'T8-C9B35', q: [
    { c: `Phát biểu định lí Pythagore.`, a: `$a^2 = b^2 + c^2$ trong tam giác vuông.`, s: `Trong $\\triangle$ vuông, bình phương cạnh huyền bằng tổng bình phương hai cạnh góc vuông.`, d: 'nhan_biet' },
    { c: `$\\triangle ABC$ vuông tại $A$, $AB=3, AC=4$. Tính $BC$.`, a: `$5$.`, s: `$BC=\\sqrt{9+16}=5$.`, d: 'nhan_biet' },
    { c: `Phát biểu định lí Pythagore đảo.`, a: `Nếu $a^2=b^2+c^2$ thì tam giác vuông.`, s: `Nếu $a^2=b^2+c^2$ thì $\\triangle$ vuông tại đỉnh đối diện cạnh $a$.`, d: 'nhan_biet' },
    { c: `$\\triangle$ có cạnh $5, 12, 13$. Có vuông không?`, a: `Có.`, s: `$13^2=169=25+144=5^2+12^2$. Vuông tại đỉnh đối cạnh $13$.`, d: 'thong_hieu' },
    { c: `$\\triangle$ có cạnh $6, 8, 11$. Có vuông không?`, a: `Không.`, s: `$11^2=121 \\neq 36+64=100$. Không vuông.`, d: 'thong_hieu' },
    { c: `HCN $ABCD$, $AB=5, BC=12$. Tính đường chéo.`, a: `$13$.`, s: `$AC=\\sqrt{25+144}=13$.`, d: 'thong_hieu' },
    { c: `Thang dựa tường cao $4$ m, chân thang cách tường $3$ m. Tính chiều dài thang.`, a: `$5$ m.`, s: `$l=\\sqrt{16+9}=5$ m.`, d: 'van_dung' },
    { c: `$\\triangle ABC$ vuông tại $A$, $AB=6, BC=10$. Tính $AC$ và diện tích.`, a: `$AC=8, S=24$.`, s: `$AC=\\sqrt{100-36}=8$. $S=\\frac{1}{2} \\times 6 \\times 8=24$.`, d: 'van_dung' },
    { c: `Hình thoi cạnh $10$, một đường chéo $12$. Tính đường chéo còn lại.`, a: `$16$.`, s: `Nửa đường chéo: $6$. Nửa kia $=\\sqrt{100-36}=8$. Đường chéo $=16$.`, d: 'van_dung_cao' },
    { c: `$\\triangle ABC$, $AB=7, BC=24, CA=25$. Tính diện tích.`, a: `$84$.`, s: `$25^2=625=49+576=7^2+24^2$. Vuông tại $B$. $S=\\frac{1}{2} \\times 7 \\times 24=84$.`, d: 'van_dung_cao' },
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
