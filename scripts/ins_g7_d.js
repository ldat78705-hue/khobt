const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const U = '8316c34e-765d-4b8c-9364-b683a17e33f8', G = 7, T = 'hinh_hoc';
const B = [
  { id: '50250f72-84b2-4112-9a86-1ab6bbb998a5', p: 'T7-C9B32', q: [
    { c: `Từ điểm $A$ ngoài đường thẳng $d$, kẻ $AH \\perp d$ và $AB$ xiên ($B \\in d$). So sánh $AH$ và $AB$.`, a: `$AH < AB$.`, s: `Đường vuông góc ngắn nhất: $AH < AB$ với mọi đường xiên $AB$.`, d: 'nhan_biet' },
    { c: `Khoảng cách từ điểm đến đường thẳng là gì?`, a: `Độ dài đoạn vuông góc.`, s: `Khoảng cách từ điểm $M$ đến $d$ = độ dài đoạn $MH$ với $MH \\perp d$, $H \\in d$.`, d: 'nhan_biet' },
    { c: `$AH \\perp d$, $AH = 3$. $B \\in d$, $AB = 5$. Tính $HB$.`, a: `$HB = 4$.`, s: `$HB = \\sqrt{AB^2 - AH^2} = \\sqrt{25-9} = 4$ (Pythagore).`, d: 'nhan_biet' },
    { c: `$AH \\perp d$ tại $H$. $B, C \\in d$ sao cho $HB < HC$. So sánh $AB$ và $AC$.`, a: `$AB < AC$.`, s: `$AB^2 = AH^2 + HB^2 < AH^2 + HC^2 = AC^2$. Nên $AB < AC$.`, d: 'thong_hieu' },
    { c: `$AH = 5$, $AB = 13$ ($H$ chân đường vuông góc). Tính $HB$.`, a: `$HB = 12$.`, s: `$HB = \\sqrt{13^2-5^2} = \\sqrt{144} = 12$.`, d: 'thong_hieu' },
    { c: `Cho tam giác $ABC$ vuông tại $A$, $AB = 6$, $AC = 8$. Tính khoảng cách từ $A$ đến $BC$.`, a: `$AH = 4{,}8$.`, s: `$BC = \\sqrt{36+64} = 10$. $S = \\frac{1}{2} \\times 6 \\times 8 = 24$.\n$AH = \\frac{2S}{BC} = \\frac{48}{10} = 4{,}8$.`, d: 'thong_hieu' },
    { c: `$M$ nằm ngoài $d$. Hai đường xiên $MA = 10$, $MB = 17$. Hình chiếu $HA = 6$, $HB = 15$. Kiểm tra $MH \\perp d$.`, a: `$MH = 8$ từ cả hai → đúng.`, s: `$MH = \\sqrt{10^2-6^2} = 8$ và $MH = \\sqrt{17^2-15^2} = \\sqrt{64} = 8$. Khớp → $MH \\perp d$ ✓.`, d: 'van_dung' },
    { c: `CMR trong tam giác, đường xiên lớn hơn ứng với hình chiếu lớn hơn.`, a: `Dùng Pythagore.`, s: `$AH \\perp d$. $AB^2 = AH^2 + HB^2$ và $AC^2 = AH^2 + HC^2$.\n$AB > AC \\Leftrightarrow HB^2 > HC^2 \\Leftrightarrow HB > HC$ (vì $HB, HC > 0$). $\\blacksquare$`, d: 'van_dung' },
    { c: `Tam giác $ABC$, $AH \\perp BC$. Biết $AB = 15$, $BH = 9$, $CH = 16$. Tính $AC$.`, a: `$AC = 20$.`, s: `$AH = \\sqrt{15^2-9^2} = \\sqrt{144} = 12$.\n$AC = \\sqrt{AH^2+CH^2} = \\sqrt{144+256} = \\sqrt{400} = 20$.`, d: 'van_dung_cao' },
    { c: `CMR trong tam giác cân, khoảng cách từ đỉnh đến đáy bằng đường cao ứng đáy.`, a: `Hiển nhiên từ định nghĩa.`, s: `Đường cao từ đỉnh của tam giác cân hạ xuống đáy chính là đoạn vuông góc → bằng khoảng cách từ đỉnh đến đường chứa đáy.`, d: 'van_dung_cao' },
  ]},
  { id: 'c3425308-a38e-4a1c-9157-d8f6af9a3d6d', p: 'T7-C9B34', q: [
    { c: `Ba đường trung tuyến của tam giác đồng quy tại điểm gọi là gì?`, a: `Trọng tâm $G$.`, s: `Ba trung tuyến đồng quy tại **trọng tâm** $G$, chia mỗi trung tuyến theo tỉ lệ $2:1$ tính từ đỉnh.`, d: 'nhan_biet' },
    { c: `Ba đường phân giác trong tam giác đồng quy tại điểm gọi là gì?`, a: `Tâm đường tròn nội tiếp $I$.`, s: `Ba phân giác đồng quy tại tâm $I$ của đường tròn nội tiếp tam giác.`, d: 'nhan_biet' },
    { c: `$\\triangle ABC$ có trung tuyến $AM = 9$. Trọng tâm $G$. Tính $AG$.`, a: `$AG = 6$.`, s: `$AG = \\frac{2}{3} AM = \\frac{2}{3} \\times 9 = 6$.`, d: 'nhan_biet' },
    { c: `$\\triangle ABC$ có $G$ là trọng tâm, $M$ trung điểm $BC$. $GM = 3$. Tính $AM$.`, a: `$AM = 9$.`, s: `$GM = \\frac{1}{3}AM \\Rightarrow AM = 3 \\times 3 = 9$.`, d: 'thong_hieu' },
    { c: `$\\triangle ABC$, $I$ tâm nội tiếp. CMR $I$ cách đều ba cạnh.`, a: `$I$ nằm trên cả ba phân giác.`, s: `$I$ thuộc phân giác $\\widehat{A}$ → cách $AB, AC$ bằng nhau.\n$I$ thuộc phân giác $\\widehat{B}$ → cách $BA, BC$ bằng nhau.\nVậy $I$ cách đều ba cạnh.`, d: 'thong_hieu' },
    { c: `$\\triangle ABC$ cân tại $A$. CMR trọng tâm nằm trên trung tuyến ứng đáy.`, a: `Trọng tâm luôn nằm trên mọi trung tuyến.`, s: `Trọng tâm là giao 3 trung tuyến → luôn nằm trên trung tuyến $AM$ (ứng đáy $BC$).`, d: 'thong_hieu' },
    { c: `$G$ trọng tâm $\\triangle ABC$. CMR $\\vec{GA}+\\vec{GB}+\\vec{GC}=\\vec{0}$.`, a: `Dùng trung điểm.`, s: `$M$ trung điểm $BC$: $\\vec{GB}+\\vec{GC} = 2\\vec{GM}$.\n$G$ chia $AM$ tỉ lệ $2:1$: $\\vec{GA} = -2\\vec{GM}$.\nVậy $\\vec{GA}+\\vec{GB}+\\vec{GC} = -2\\vec{GM}+2\\vec{GM} = \\vec{0}$. $\\blacksquare$`, d: 'van_dung' },
    { c: `$\\triangle ABC$, $AB = 8, AC = 6, BC = 10$. Tính độ dài trung tuyến $AM$.`, a: `$AM = 5$.`, s: `Công thức: $AM^2 = \\frac{2AB^2+2AC^2-BC^2}{4} = \\frac{128+72-100}{4} = \\frac{100}{4} = 25$.\n$AM = 5$.`, d: 'van_dung' },
    { c: `$\\triangle ABC$ vuông tại $A$, $BC = 10$. Tính $AM$ (trung tuyến ứng cạnh huyền).`, a: `$AM = 5$.`, s: `Trong tam giác vuông, trung tuyến ứng cạnh huyền $= \\frac{BC}{2} = 5$.`, d: 'van_dung_cao' },
    { c: `CMR trọng tâm chia mỗi trung tuyến theo tỉ lệ $2:1$ từ đỉnh.`, a: `Dùng phép đồng dạng hoặc tọa độ.`, s: `Đặt $A(x_1,y_1)$, $B(x_2,y_2)$, $C(x_3,y_3)$.\n$M = (\\frac{x_2+x_3}{2}, \\frac{y_2+y_3}{2})$. $G = (\\frac{x_1+x_2+x_3}{3}, \\frac{y_1+y_2+y_3}{3})$.\n$AG = \\frac{2}{3}AM$ (tính trực tiếp từ tọa độ). $\\blacksquare$`, d: 'van_dung_cao' },
  ]},
  { id: 'a399e53c-27e4-44f7-a5e5-3ede009b1f62', p: 'T7-C9B35', q: [
    { c: `Ba đường trung trực của tam giác đồng quy tại điểm gọi là gì?`, a: `Tâm đường tròn ngoại tiếp $O$.`, s: `Ba trung trực đồng quy tại **tâm đường tròn ngoại tiếp** $O$, cách đều ba đỉnh.`, d: 'nhan_biet' },
    { c: `Ba đường cao của tam giác đồng quy tại điểm gọi là gì?`, a: `Trực tâm $H$.`, s: `Ba đường cao đồng quy tại **trực tâm** $H$.`, d: 'nhan_biet' },
    { c: `Tâm đường tròn ngoại tiếp tam giác vuông nằm ở đâu?`, a: `Trung điểm cạnh huyền.`, s: `Trong tam giác vuông, tâm đường tròn ngoại tiếp là trung điểm cạnh huyền.`, d: 'nhan_biet' },
    { c: `$\\triangle ABC$ có $O$ là tâm ngoại tiếp. $OA = OB = OC = R$. Biết $R = 5$, $BC = 6$. Tính khoảng cách từ $O$ đến $BC$.`, a: `$4$.`, s: `$M$ trung điểm $BC$: $BM = 3$. $OM \\perp BC$.\n$OM = \\sqrt{R^2 - BM^2} = \\sqrt{25-9} = 4$.`, d: 'thong_hieu' },
    { c: `Trực tâm tam giác nhọn nằm trong hay ngoài tam giác?`, a: `Trong tam giác.`, s: `Tam giác nhọn: trực tâm nằm **bên trong**. Tam giác tù: nằm bên ngoài. Tam giác vuông: tại đỉnh góc vuông.`, d: 'thong_hieu' },
    { c: `$\\triangle ABC$ đều cạnh $a$. Tìm bán kính đường tròn ngoại tiếp.`, a: `$R = \\dfrac{a\\sqrt{3}}{3}$.`, s: `Đường cao $h = \\frac{a\\sqrt{3}}{2}$. Tâm ngoại tiếp = trọng tâm: $R = \\frac{2}{3}h = \\frac{a\\sqrt{3}}{3}$.`, d: 'thong_hieu' },
    { c: `CMR trung trực đoạn $AB$ là tập hợp các điểm cách đều $A$ và $B$.`, a: `Dùng tam giác bằng nhau.`, s: `$M$ thuộc trung trực → $MA = MB$ (tam giác cân). Ngược lại: $MA = MB$ → $M$ nằm trên trung trực (tam giác $MAB$ cân, $MH$ vừa trung tuyến vừa đường cao). $\\blacksquare$`, d: 'van_dung' },
    { c: `$\\triangle ABC$ vuông tại $A$. Tìm vị trí trực tâm.`, a: `Trực tâm $= A$.`, s: `$AB \\perp AC$ nên $AB$ là đường cao từ $B$ gặp $AC$ tại $A$, $AC$ là đường cao từ $C$ gặp $AB$ tại $A$. Trực tâm $= A$.`, d: 'van_dung' },
    { c: `$\\triangle ABC$ cân tại $A$. CMR trọng tâm, trực tâm, tâm ngoại tiếp, tâm nội tiếp đều nằm trên trung tuyến $AM$.`, a: `Tính đối xứng.`, s: `Tam giác cân đối xứng qua $AM$. Mọi "tâm" đều bất biến qua phép đối xứng trục $AM$ → phải nằm trên $AM$. $\\blacksquare$`, d: 'van_dung_cao' },
    { c: `$\\triangle ABC$ có $AB=13, BC=14, AC=15$. Tính bán kính đường tròn ngoại tiếp.`, a: `$R = \\dfrac{65}{8}$.`, s: `$p = 21$. $S = \\sqrt{21 \\times 8 \\times 7 \\times 6} = \\sqrt{7056} = 84$.\n$R = \\frac{abc}{4S} = \\frac{13 \\times 14 \\times 15}{4 \\times 84} = \\frac{2730}{336} = \\frac{65}{8}$.`, d: 'van_dung_cao' },
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
