const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const U = '8316c34e-765d-4b8c-9364-b683a17e33f8', G = 8, T = 'hinh_hoc';
const B = [
  { id: 'b13e67c9-7224-47f3-b473-913eb1cfe1a6', p: 'T8-C4B15', q: [
    { c: `Phát biểu định lí Thalès trong tam giác.`, a: `Đường thẳng song song với một cạnh cắt hai cạnh còn lại tạo ra tỉ số bằng nhau.`, s: `Nếu $MN \\parallel BC$ ($M \\in AB, N \\in AC$) thì $\\frac{AM}{MB} = \\frac{AN}{NC}$.`, d: 'nhan_biet' },
    { c: `$\\triangle ABC$, $M \\in AB$, $N \\in AC$, $MN \\parallel BC$. Biết $AM=3, MB=6$. Tính $\\frac{AN}{NC}$.`, a: `$\\frac{1}{2}$.`, s: `Theo Thalès: $\\frac{AN}{NC} = \\frac{AM}{MB} = \\frac{3}{6} = \\frac{1}{2}$.`, d: 'nhan_biet' },
    { c: `Phát biểu định lí Thalès đảo.`, a: `Nếu $\\frac{AM}{MB} = \\frac{AN}{NC}$ thì $MN \\parallel BC$.`, s: `Nếu $M \\in AB, N \\in AC$ và $\\frac{AM}{MB} = \\frac{AN}{NC}$ thì $MN \\parallel BC$.`, d: 'nhan_biet' },
    { c: `$\\triangle ABC$, $M \\in AB$ sao cho $AM = 4, AB = 12$. $MN \\parallel BC$, $N \\in AC$, $AC = 9$. Tính $AN$.`, a: `$AN = 3$.`, s: `$\\frac{AM}{AB} = \\frac{4}{12} = \\frac{1}{3}$. $\\frac{AN}{AC} = \\frac{1}{3}$ → $AN = 3$.`, d: 'thong_hieu' },
    { c: `$\\triangle ABC$, $D \\in AB$, $E \\in AC$, $\\frac{AD}{DB} = \\frac{2}{3}$. CMR $DE \\parallel BC$ khi $\\frac{AE}{EC} = \\frac{2}{3}$.`, a: `Thalès đảo.`, s: `$\\frac{AD}{DB} = \\frac{AE}{EC} = \\frac{2}{3}$ → theo Thalès đảo: $DE \\parallel BC$. $\\blacksquare$`, d: 'thong_hieu' },
    { c: `$\\triangle ABC$, $DE \\parallel BC$, $D \\in AB$, $E \\in AC$. $AD=5, DB=3, DE=4$. Tính $BC$.`, a: `$BC = 6{,}4$.`, s: `$\\frac{DE}{BC} = \\frac{AD}{AB} = \\frac{5}{8}$. $BC = \\frac{4 \\times 8}{5} = 6{,}4$.`, d: 'thong_hieu' },
    { c: `Ba đường thẳng song song cắt hai cát tuyến. Đoạn trên cát tuyến 1 là $4, 6$. Đoạn tương ứng trên cát tuyến 2 là $x, 9$. Tìm $x$.`, a: `$x = 6$.`, s: `Theo hệ quả Thalès: $\\frac{4}{6} = \\frac{x}{9}$ → $x = 6$.`, d: 'van_dung' },
    { c: `$\\triangle ABC$, $D$ trung điểm $AB$, $E \\in AC$ sao cho $DE \\parallel BC$. CMR $E$ là trung điểm $AC$.`, a: `Thalès.`, s: `$DE \\parallel BC$, $\\frac{AD}{DB} = 1$ → $\\frac{AE}{EC} = 1$ → $AE = EC$. $\\blacksquare$`, d: 'van_dung' },
    { c: `Hình thang $ABCD$ ($AB \\parallel CD$), $M, N$ chia $AD, BC$ sao cho $\\frac{AM}{MD} = \\frac{BN}{NC} = \\frac{2}{3}$. CMR $MN \\parallel AB$.`, a: `Tỉ số bằng nhau → song song.`, s: `Kẻ đường chéo $AC$ cắt $MN$ tại $P$. Áp dụng Thalès trong $\\triangle ACD$ và $\\triangle ABC$ → $MN \\parallel AB \\parallel CD$. $\\blacksquare$`, d: 'van_dung_cao' },
    { c: `$\\triangle ABC$, $D \\in AB$, $E \\in BC$, $F \\in CA$ sao cho $DE \\parallel AC$, $EF \\parallel AB$. CMR $\\frac{AD}{AB} + \\frac{CF}{CA} = 1$.`, a: `Tỉ số Thalès.`, s: `$DE \\parallel AC$: $\\frac{BD}{BA} = \\frac{BE}{BC}$. $EF \\parallel AB$: $\\frac{CE}{CB} = \\frac{CF}{CA}$. $\\frac{BD}{BA} + \\frac{AD}{AB} = 1$ và $\\frac{BE}{BC} + \\frac{CE}{CB} = 1$. Kết hợp: $\\frac{AD}{AB} + \\frac{CF}{CA} = 1$. $\\blacksquare$`, d: 'van_dung_cao' },
  ]},
  { id: '335e427c-405e-4140-8abe-b96feeb8cce1', p: 'T8-C4B16', q: [
    { c: `Đường trung bình của tam giác là gì?`, a: `Đoạn nối trung điểm hai cạnh.`, s: `Đường trung bình của tam giác là đoạn thẳng nối trung điểm hai cạnh của tam giác.`, d: 'nhan_biet' },
    { c: `Đường trung bình của tam giác có tính chất gì?`, a: `Song song và bằng nửa cạnh thứ ba.`, s: `Đường TB song song với cạnh thứ ba và bằng nửa cạnh đó.`, d: 'nhan_biet' },
    { c: `$\\triangle ABC$, $M, N$ trung điểm $AB, AC$. $BC=10$. Tính $MN$.`, a: `$MN=5$.`, s: `$MN$ là đường TB → $MN = \\frac{BC}{2} = 5$.`, d: 'nhan_biet' },
    { c: `Đường trung bình của hình thang là gì?`, a: `Đoạn nối trung điểm hai cạnh bên.`, s: `Đường TB hình thang nối trung điểm hai cạnh bên, song song hai đáy và bằng nửa tổng hai đáy.`, d: 'thong_hieu' },
    { c: `Hình thang có hai đáy $6$ và $14$. Tính đường trung bình.`, a: `$10$.`, s: `ĐTB $= \\frac{6+14}{2} = 10$.`, d: 'thong_hieu' },
    { c: `$\\triangle ABC$, $D, E, F$ trung điểm $BC, CA, AB$. Tính tỉ số diện tích $\\triangle DEF$ và $\\triangle ABC$.`, a: `$\\frac{1}{4}$.`, s: `$\\triangle DEF$ có cạnh bằng nửa cạnh $\\triangle ABC$ → $\\frac{S_{DEF}}{S_{ABC}} = \\frac{1}{4}$.`, d: 'thong_hieu' },
    { c: `$\\triangle ABC$, $M$ trung điểm $AB$, $N$ trung điểm $AC$. CMR $MN \\parallel BC$.`, a: `Đường trung bình.`, s: `$MN$ là đường trung bình tam giác $ABC$ → $MN \\parallel BC$. $\\blacksquare$`, d: 'van_dung' },
    { c: `Hình thang $ABCD$ ($AB \\parallel CD$), đường TB $= 8$, $AB = 5$. Tính $CD$.`, a: `$CD = 11$.`, s: `$\\frac{AB+CD}{2} = 8$ → $CD = 16-5 = 11$.`, d: 'van_dung' },
    { c: `$\\triangle ABC$ có trung tuyến $AM$. $D, E$ trung điểm $AB, AC$. CMR $BCED$ hình thang có $DE$ là đường trung bình.`, a: `$DE \\parallel BC$, nối trung điểm cạnh bên.`, s: `$DE$ là đường TB $\\triangle ABC$ → $DE \\parallel BC$. $BCED$ là hình thang. $M$ trung điểm $BC$, và $DE$ nối trung điểm hai cạnh → $DE$ đường TB. $\\blacksquare$`, d: 'van_dung_cao' },
    { c: `Tứ giác $ABCD$, $M, N, P, Q$ trung điểm $AB, BC, CD, DA$. CMR $MNPQ$ là HBH.`, a: `Đường TB tam giác.`, s: `Trong $\\triangle ABC$: $MN$ đường TB → $MN \\parallel AC$, $MN = \\frac{AC}{2}$. Trong $\\triangle ACD$: $QP$ đường TB → $QP \\parallel AC$, $QP = \\frac{AC}{2}$. Vậy $MN \\parallel QP$ và $MN = QP$ → $MNPQ$ HBH. $\\blacksquare$`, d: 'van_dung_cao' },
  ]},
  { id: '3cae486a-a910-4b74-8e03-92b1184e79b4', p: 'T8-C4B17', q: [
    { c: `Phát biểu tính chất đường phân giác của tam giác.`, a: `Phân giác chia cạnh đối thành tỉ lệ với hai cạnh kề.`, s: `Trong $\\triangle ABC$, phân giác $AD$: $\\frac{DB}{DC} = \\frac{AB}{AC}$.`, d: 'nhan_biet' },
    { c: `$\\triangle ABC$, $AD$ phân giác $\\widehat{A}$. $AB=6, AC=9, BC=10$. Tính $BD$.`, a: `$BD = 4$.`, s: `$\\frac{BD}{DC} = \\frac{AB}{AC} = \\frac{6}{9} = \\frac{2}{3}$. $BD = \\frac{2}{5} \\times 10 = 4$.`, d: 'nhan_biet' },
    { c: `$\\triangle ABC$, $AD$ phân giác $\\widehat{A}$, $D \\in BC$. Biết $AB=8, AC=12, BD=4$. Tính $DC$.`, a: `$DC = 6$.`, s: `$\\frac{BD}{DC} = \\frac{AB}{AC} = \\frac{8}{12} = \\frac{2}{3}$. $DC = \\frac{3}{2} \\times 4 = 6$.`, d: 'nhan_biet' },
    { c: `$\\triangle ABC$, $AB=5, AC=7, BC=8$. Phân giác $AD$ ($D \\in BC$). Tính $BD, DC$.`, a: `$BD = \\frac{10}{3}, DC = \\frac{14}{3}$.`, s: `$\\frac{BD}{DC} = \\frac{5}{7}$. $BD + DC = 8$. $BD = \\frac{5}{12} \\times 8 = \\frac{10}{3}$, $DC = \\frac{14}{3}$.`, d: 'thong_hieu' },
    { c: `$\\triangle ABC$ cân tại $A$, $AB=AC=10, BC=12$. $AD$ phân giác $\\widehat{A}$. Tính $BD$.`, a: `$BD = 6$.`, s: `$\\frac{BD}{DC} = \\frac{AB}{AC} = 1$ → $BD = DC = 6$. Phân giác đỉnh tam giác cân cũng là trung tuyến.`, d: 'thong_hieu' },
    { c: `$\\triangle ABC$ vuông tại $A$, $AB=3, AC=4$. Phân giác $AD$ ($D \\in BC$). Tính $BD$.`, a: `$BD = \\frac{15}{7}$.`, s: `$BC = 5$. $\\frac{BD}{DC} = \\frac{3}{4}$. $BD = \\frac{3}{7} \\times 5 = \\frac{15}{7}$.`, d: 'thong_hieu' },
    { c: `$\\triangle ABC$, phân giác trong $AD$ và phân giác ngoài $AE$ ($D, E \\in BC$). CMR $BD \\cdot BE = BA \\cdot ... $ (dạng tổng quát). `, a: `Liên hệ phân giác trong và ngoài.`, s: `Phân giác trong: $\\frac{BD}{DC} = \\frac{AB}{AC}$. Phân giác ngoài: $\\frac{BE}{EC} = \\frac{AB}{AC}$. $(D, E)$ chia điều hòa đoạn $BC$.`, d: 'van_dung' },
    { c: `$\\triangle ABC$, $AB=6, AC=8, BC=7$. $AD$ phân giác $\\widehat{A}$. Tính $AD$.`, a: `Dùng CT Stewart hoặc diện tích.`, s: `$BD = \\frac{6}{14} \\times 7 = 3$, $DC = 4$. CT: $AD^2 = AB \\cdot AC - BD \\cdot DC = 48-12 = 36$. $AD = 6$.`, d: 'van_dung' },
    { c: `CMR ba đường phân giác trong tam giác đồng quy.`, a: `Giao $2$ phân giác cách đều $3$ cạnh.`, s: `Giao $I$ của $2$ phân giác cách đều $2$ cạnh tương ứng → cách đều cả $3$ cạnh → nằm trên phân giác thứ $3$. $\\blacksquare$`, d: 'van_dung_cao' },
    { c: `$\\triangle ABC$, $AB=5, AC=8$. Phân giác ngoài $\\widehat{A}$ cắt $BC$ kéo dài tại $E$. $BC=7$. Tính $BE, CE$.`, a: `$BE = \\frac{35}{3}, CE = \\frac{56}{3}$... `, s: `$\\frac{BE}{CE} = \\frac{AB}{AC} = \\frac{5}{8}$. $E$ nằm ngoài $BC$: $BE - CE = BC = 7$ hoặc $CE - BE = 7$. $\\frac{BE}{CE}=\\frac{5}{8}$, $CE - BE = 7$ → $BE = \\frac{35}{3}$, $CE = \\frac{56}{3}$.`, d: 'van_dung_cao' },
  ]},
  { id: '4aefb019-2b6e-49c2-981a-8bc2ddec8838', p: 'T8-C4BTC', q: [
    { c: `$\\triangle ABC$, $MN \\parallel BC$, $AM=4, AB=10, AN=3$. Tính $AC$.`, a: `$AC = 7{,}5$.`, s: `$\\frac{AM}{AB} = \\frac{AN}{AC}$. $\\frac{4}{10} = \\frac{3}{AC}$ → $AC = 7{,}5$.`, d: 'nhan_biet' },
    { c: `Đường TB tam giác có cạnh đáy $16$. Tính đường TB.`, a: `$8$.`, s: `ĐTB $= \\frac{16}{2} = 8$.`, d: 'nhan_biet' },
    { c: `$\\triangle ABC$, $AD$ phân giác $\\widehat{A}$, $AB=9, AC=6, BC=10$. Tính $BD$.`, a: `$BD = 6$.`, s: `$\\frac{BD}{DC} = \\frac{9}{6} = \\frac{3}{2}$. $BD = \\frac{3}{5} \\times 10 = 6$.`, d: 'thong_hieu' },
    { c: `Ba đường thẳng song song cắt hai cát tuyến tạo đoạn $3, 5$ trên cát tuyến 1. Đoạn đầu trên cát tuyến 2 là $6$. Tìm đoạn sau.`, a: `$10$.`, s: `$\\frac{3}{5} = \\frac{6}{x}$ → $x = 10$.`, d: 'thong_hieu' },
    { c: `$\\triangle ABC$, $D, E$ trung điểm $AB, AC$. $DE = 7$. Tính $BC$.`, a: `$BC = 14$.`, s: `ĐTB: $BC = 2 \\times DE = 14$.`, d: 'thong_hieu' },
    { c: `Hình thang $ABCD$, $AB \\parallel CD$, $AB=5, CD=11$. $E, F$ trung điểm $AD, BC$. Tính $EF$.`, a: `$8$.`, s: `ĐTB hình thang $= \\frac{5+11}{2} = 8$.`, d: 'van_dung' },
    { c: `$\\triangle ABC$, $MN \\parallel BC$, $M \\in AB$, $N \\in AC$. $AM = 3, MB = 5, MN = 6$. Tính $BC$.`, a: `$BC = 16$.`, s: `$\\frac{MN}{BC} = \\frac{AM}{AB} = \\frac{3}{8}$. $BC = \\frac{6 \\times 8}{3} = 16$.`, d: 'van_dung' },
    { c: `$\\triangle ABC$, $D \\in AB$, $E \\in AC$ sao cho $\\frac{AD}{AB} = \\frac{AE}{AC} = \\frac{3}{7}$. $S_{ADE} = 9$. Tính $S_{ABC}$.`, a: `$\\frac{49}{9} \\times 9 = 49$.`, s: `$\\frac{S_{ADE}}{S_{ABC}} = \\frac{AD}{AB} \\times \\frac{AE}{AC} = \\frac{9}{49}$. $S_{ABC} = 49$.`, d: 'van_dung' },
    { c: `$\\triangle ABC$, phân giác $AD$. $M$ trung điểm $BC$. $AB = 6, AC = 10$. So sánh $DM$ và $AM$.`, a: `Tính $BD, DC$ rồi tính.`, s: `$BD = \\frac{6}{16}BC$, $DC = \\frac{10}{16}BC$. $M$ trung điểm: $DM = |BM - BD| = |\\frac{BC}{2} - \\frac{6BC}{16}| = \\frac{BC}{8}$. $DM$ rất ngắn.`, d: 'van_dung_cao' },
    { c: `$\\triangle ABC$, $D, E, F$ trung điểm $BC, CA, AB$. CMR $4$ tam giác con bằng nhau.`, a: `Đường TB → HBH.`, s: `$EF$ đường TB → $EF \\parallel BC$, $EF = \\frac{BC}{2} = BD$. $BDEF$ HBH → $\\triangle BDF = \\triangle DEF$. Tương tự $\\triangle AEF = \\triangle DEF = \\triangle BDF = \\triangle DEC$. $\\blacksquare$`, d: 'van_dung_cao' },
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
