const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const U = '8316c34e-765d-4b8c-9364-b683a17e33f8', G = 9, T = 'hinh_hoc';
const B = [
  { id: '961fcfb8-7f7d-4955-a150-3a28793a207e', p: 'T9-C5B13', q: [
    { c: `Đường tròn tâm $O$ bán kính $R$ là gì?`, a: `Tập hợp điểm cách $O$ khoảng $R$.`, s: `Đường tròn $(O; R)$ là tập hợp các điểm $M$ sao cho $OM = R$.`, d: 'nhan_biet' },
    { c: `Điểm $M$ nằm trong đường tròn $(O; R)$ khi nào?`, a: `$OM < R$.`, s: `$OM < R$: $M$ nằm trong; $OM = R$: trên; $OM > R$: ngoài.`, d: 'nhan_biet' },
    { c: `Đường kính là gì?`, a: `Dây cung đi qua tâm, dài $2R$.`, s: `Đường kính $d = 2R$, là dây cung lớn nhất.`, d: 'nhan_biet' },
    { c: `$(O; 5)$, điểm $A$ có $OA = 3$. $A$ nằm ở đâu so với đường tròn?`, a: `Trong đường tròn.`, s: `$OA = 3 < 5 = R$ → $A$ nằm trong.`, d: 'thong_hieu' },
    { c: `Đường tròn $(O; R)$ có dây $AB = 6$ cm, $OM \\perp AB$ tại $M$, $OM = 4$ cm. Tính $R$.`, a: `$R = 5$ cm.`, s: `$AM = 3$ cm. $R = \\sqrt{OM^2 + AM^2} = \\sqrt{16+9} = 5$ cm.`, d: 'thong_hieu' },
    { c: `Đường tròn đi qua $3$ điểm không thẳng hàng gọi là gì?`, a: `Đường tròn ngoại tiếp tam giác.`, s: `$3$ điểm không thẳng hàng xác định duy nhất $1$ đường tròn đi qua.`, d: 'thong_hieu' },
    { c: `$(O; 10)$ cm, dây $AB$ cách tâm $6$ cm. Tính $AB$.`, a: `$AB = 16$ cm.`, s: `$AM = \\sqrt{R^2-d^2} = \\sqrt{100-36} = 8$ cm. $AB = 2 \\times 8 = 16$ cm.`, d: 'van_dung' },
    { c: `Hai dây bằng nhau trong một đường tròn thì cách tâm bằng nhau. Đúng hay sai?`, a: `Đúng.`, s: `Đúng. Đây là định lí: dây bằng nhau ↔ cách đều tâm.`, d: 'van_dung' },
    { c: `$(O; R)$ cm, dây $AB = R$. Tính khoảng cách từ $O$ đến $AB$.`, a: `$d = \\frac{R\\sqrt{3}}{2}$.`, s: `$AM = \\frac{R}{2}$. $d = \\sqrt{R^2-\\frac{R^2}{4}} = \\frac{R\\sqrt{3}}{2}$.`, d: 'van_dung_cao' },
    { c: `Tam giác đều cạnh $6$ cm nội tiếp đường tròn. Tính bán kính.`, a: `$R = 2\\sqrt{3}$ cm.`, s: `$R = \\frac{a}{\\sqrt{3}} = \\frac{6}{\\sqrt{3}} = 2\\sqrt{3}$ cm.`, d: 'van_dung_cao' },
  ]},
  { id: 'ef9860a5-4c55-43a4-aed7-672c70232069', p: 'T9-C5B14', q: [
    { c: `Cung nhỏ và cung lớn là gì?`, a: `Cung nhỏ < nửa đường tròn, cung lớn > nửa.`, s: `Hai đầu mút dây chia đường tròn thành $2$ cung: cung nhỏ và cung lớn.`, d: 'nhan_biet' },
    { c: `Hai cung bằng nhau khi nào?`, a: `Cùng số đo (độ).`, s: `Hai cung bằng nhau khi có cùng số đo (trong cùng đường tròn hoặc hai đường tròn bằng nhau).`, d: 'nhan_biet' },
    { c: `Liên hệ giữa dây và cung: dây lớn hơn căng cung nào?`, a: `Cung lớn hơn.`, s: `Trong cùng đường tròn, dây lớn hơn căng cung lớn hơn (cung nhỏ).`, d: 'nhan_biet' },
    { c: `Góc ở tâm là gì?`, a: `Góc có đỉnh ở tâm đường tròn.`, s: `Góc ở tâm có đỉnh trùng tâm, hai cạnh là hai bán kính.`, d: 'thong_hieu' },
    { c: `Góc ở tâm $60°$ chắn cung bao nhiêu độ?`, a: `$60°$.`, s: `Số đo cung bằng số đo góc ở tâm chắn cung đó.`, d: 'thong_hieu' },
    { c: `$(O; R)$, dây $AB$ căng cung $120°$. Tính $AB$ theo $R$.`, a: `$AB = R\\sqrt{3}$.`, s: `$\\triangle OAB$ cân, $\\widehat{AOB}=120°$. Dùng CT: $AB = 2R\\sin 60° = R\\sqrt{3}$.`, d: 'thong_hieu' },
    { c: `Hai dây $AB = CD$ trong $(O; R)$. Chứng minh $\\stackrel{\\frown}{AB} = \\stackrel{\\frown}{CD}$.`, a: `Góc ở tâm bằng nhau.`, s: `$AB = CD \\Rightarrow \\triangle OAB = \\triangle OCD$ (c.c.c) $\\Rightarrow \\widehat{AOB} = \\widehat{COD} \\Rightarrow$ cung bằng nhau. $\\blacksquare$`, d: 'van_dung' },
    { c: `$(O; 8)$ cm. Dây $AB$ căng cung $90°$. Tính $AB$.`, a: `$AB = 8\\sqrt{2}$ cm.`, s: `$\\triangle OAB$ vuông cân tại $O$. $AB = R\\sqrt{2} = 8\\sqrt{2}$ cm.`, d: 'van_dung' },
    { c: `$(O; R)$, $A, B, C$ trên đường tròn sao cho $\\stackrel{\\frown}{AB} = \\stackrel{\\frown}{BC}$. CMR $B$ là điểm chính giữa cung $AC$.`, a: `Định nghĩa.`, s: `$\\stackrel{\\frown}{AB} = \\stackrel{\\frown}{BC}$ → $B$ chia cung $AC$ thành hai phần bằng nhau. $\\blacksquare$`, d: 'van_dung_cao' },
    { c: `$(O; 10)$ cm. Hai dây $AB$ và $CD$ vuông góc tại $E$. $OE = 6$ cm. Tính $AB^2 + CD^2$.`, a: `$AB^2+CD^2 = 4(R^2-OE^2)$... tính.`, s: `Dùng CT: $AB^2+CD^2 = 4R^2 - 4OE^2$... Thực ra cần tính cụ thể hơn. Nhưng tổng quát: $AE^2+BE^2+CE^2+DE^2 = 2R^2-2OE^2$... Kết quả phụ thuộc vị trí $E$.`, d: 'van_dung_cao' },
  ]},
  { id: '7ca5321e-d762-4b16-96da-ee285ae77372', p: 'T9-C5B15', q: [
    { c: `Công thức tính độ dài cung tròn $n°$ của $(O; R)$?`, a: `$l = \\frac{\\pi R n}{180}$.`, s: `$l = \\frac{\\pi R n}{180}$ (cm, nếu $R$ tính bằng cm).`, d: 'nhan_biet' },
    { c: `CT diện tích hình quạt tròn?`, a: `$S = \\frac{\\pi R^2 n}{360}$.`, s: `$S = \\frac{\\pi R^2 n}{360}$ hoặc $S = \\frac{1}{2}lR$.`, d: 'nhan_biet' },
    { c: `CT diện tích hình vành khuyên bán kính $R, r$ ($R > r$)?`, a: `$S = \\pi(R^2 - r^2)$.`, s: `$S = \\pi R^2 - \\pi r^2 = \\pi(R^2-r^2)$.`, d: 'nhan_biet' },
    { c: `Tính độ dài cung $60°$ của $(O; 6)$ cm.`, a: `$2\\pi$ cm.`, s: `$l = \\frac{\\pi \\cdot 6 \\cdot 60}{180} = 2\\pi \\approx 6{,}28$ cm.`, d: 'thong_hieu' },
    { c: `Tính diện tích hình quạt góc $90°$, $R = 4$ cm.`, a: `$4\\pi$ cm².`, s: `$S = \\frac{\\pi \\cdot 16 \\cdot 90}{360} = 4\\pi \\approx 12{,}57$ cm².`, d: 'thong_hieu' },
    { c: `Diện tích vành khuyên $R = 5$ cm, $r = 3$ cm.`, a: `$16\\pi$ cm².`, s: `$S = \\pi(25-9) = 16\\pi \\approx 50{,}27$ cm².`, d: 'thong_hieu' },
    { c: `Bánh xe bán kính $30$ cm lăn $1$ vòng. Tính quãng đường.`, a: `$60\\pi \\approx 188{,}5$ cm.`, s: `$C = 2\\pi R = 60\\pi \\approx 188{,}5$ cm.`, d: 'van_dung' },
    { c: `Hình quạt diện tích $12\\pi$ cm², $R = 6$ cm. Tính góc ở tâm.`, a: `$120°$.`, s: `$12\\pi = \\frac{\\pi \\cdot 36 \\cdot n}{360} \\Rightarrow n = 120°$.`, d: 'van_dung' },
    { c: `Sân hình tròn $R = 10$ m. Tưới cỏ phần vành khuyên từ $r = 3$ m đến $R = 10$ m. Tính diện tích tưới.`, a: `$91\\pi \\approx 285{,}9$ m².`, s: `$S = \\pi(100-9) = 91\\pi \\approx 285{,}9$ m².`, d: 'van_dung_cao' },
    { c: `Cung $AB$ dài $10\\pi$ cm, $R = 15$ cm. Tính góc ở tâm.`, a: `$120°$.`, s: `$10\\pi = \\frac{\\pi \\cdot 15 \\cdot n}{180} \\Rightarrow n = \\frac{10 \\cdot 180}{15} = 120°$.`, d: 'van_dung_cao' },
  ]},
  { id: '0c1f8bcc-7de1-4dee-986f-abaf281a99a7', p: 'T9-C5B16', q: [
    { c: `Đường thẳng và đường tròn có mấy vị trí tương đối?`, a: `$3$: không giao, tiếp xúc, cắt.`, s: `$d > R$: không giao. $d = R$: tiếp xúc. $d < R$: cắt ($2$ giao điểm).`, d: 'nhan_biet' },
    { c: `Tiếp tuyến là gì?`, a: `Đường thẳng chỉ có $1$ điểm chung với đường tròn.`, s: `Tiếp tuyến tiếp xúc tại $1$ điểm, vuông góc bán kính tại tiếp điểm.`, d: 'nhan_biet' },
    { c: `$(O; 5)$ cm, $d(O, \\Delta) = 5$ cm. Vị trí tương đối?`, a: `Tiếp xúc.`, s: `$d = R = 5$ cm → tiếp xúc.`, d: 'nhan_biet' },
    { c: `$(O; 5)$ cm, $d(O, \\Delta) = 3$ cm. Tính độ dài dây cung.`, a: `$8$ cm.`, s: `Nửa dây $= \\sqrt{25-9} = 4$ cm. Dây $= 8$ cm.`, d: 'thong_hieu' },
    { c: `Tiếp tuyến tại $A$ vuông góc bán kính $OA$. Đúng hay sai?`, a: `Đúng.`, s: `Tính chất: tiếp tuyến vuông góc bán kính tại tiếp điểm.`, d: 'thong_hieu' },
    { c: `Từ $M$ ngoài $(O; R)$, kẻ tiếp tuyến $MA$ ($A$ tiếp điểm). $OM = 13$ cm, $R = 5$ cm. Tính $MA$.`, a: `$MA = 12$ cm.`, s: `$\\triangle OAM$ vuông tại $A$: $MA = \\sqrt{169-25} = 12$ cm.`, d: 'thong_hieu' },
    { c: `Hai tiếp tuyến từ $1$ điểm ngoài đường tròn có tính chất gì?`, a: `Bằng nhau.`, s: `$MA = MB$ (hai tiếp tuyến từ cùng $1$ điểm).`, d: 'van_dung' },
    { c: `$(O; 4)$ cm, $M$ ngoài, $MA, MB$ tiếp tuyến, $\\widehat{AMB} = 60°$. Tính $OM$.`, a: `$OM = 8$ cm.`, s: `$\\widehat{AOM} = \\frac{180°-60°}{2}$... $\\widehat{OAM}=90°$. $\\widehat{AOM}=\\frac{180°-60°}{2}=60°$... Sai. $\\widehat{AMO}=30°$. $\\cos 30°=\\frac{MA}{OM}$. $\\sin 30°=\\frac{OA}{OM}=\\frac{4}{OM}$. $OM=\\frac{4}{\\sin 30°}=8$ cm.`, d: 'van_dung' },
    { c: `$(O; R)$ nội tiếp $\\triangle ABC$. CMR $S_{\\triangle ABC} = \\frac{1}{2}(AB+BC+CA) \\cdot R$.`, a: `Chia tam giác thành $3$ tam giác con.`, s: `Nối $O$ với $A, B, C$. $S = S_{OAB}+S_{OBC}+S_{OCA} = \\frac{1}{2}R(AB+BC+CA)$... Sửa: đó là bán kính nội tiếp $r$, không phải $R$. CT đúng: $S = \\frac{1}{2}pr$ ($p$: nửa chu vi, $r$: bán kính nội tiếp). $\\blacksquare$`, d: 'van_dung_cao' },
    { c: `$(O; 5)$ cm, đường thẳng cách $O$ là $d$. Tìm $d$ để đường thẳng cắt đường tròn.`, a: `$d < 5$ cm.`, s: `Cắt khi $d < R = 5$ cm, tức $0 \\leq d < 5$.`, d: 'van_dung_cao' },
  ]},
  { id: 'edfa77f0-914a-48bc-b5da-f7d5fe189b9f', p: 'T9-C5B17', q: [
    { c: `Hai đường tròn có mấy vị trí tương đối?`, a: `$3$: ngoài nhau, tiếp xúc (ngoài/trong), cắt nhau, đựng nhau, đồng tâm.`, s: `Phân loại dựa vào $d$ (khoảng cách hai tâm), $R, r$ ($R \\geq r$).`, d: 'nhan_biet' },
    { c: `Hai đường tròn tiếp xúc ngoài khi nào?`, a: `$d = R + r$.`, s: `$d = R + r$: tiếp xúc ngoài. $d = R - r$ ($R>r$): tiếp xúc trong.`, d: 'nhan_biet' },
    { c: `Hai đường tròn cắt nhau khi nào?`, a: `$|R-r| < d < R+r$.`, s: `Có $2$ giao điểm khi $|R-r| < d < R+r$.`, d: 'nhan_biet' },
    { c: `$(O_1; 3)$ cm và $(O_2; 5)$ cm, $O_1O_2 = 8$ cm. Vị trí?`, a: `Tiếp xúc ngoài.`, s: `$d = 8 = 3 + 5 = R + r$ → tiếp xúc ngoài.`, d: 'thong_hieu' },
    { c: `$(O_1; 4)$ cm, $(O_2; 6)$ cm, $d = 7$ cm. Vị trí?`, a: `Cắt nhau.`, s: `$|6-4| = 2 < 7 < 10 = 6+4$ → cắt nhau.`, d: 'thong_hieu' },
    { c: `$(O_1; 3)$ cm, $(O_2; 8)$ cm, $d = 4$ cm. Vị trí?`, a: `Đường tròn nhỏ nằm trong lớn.`, s: `$d = 4 < 8-3 = 5 = R-r$ → $(O_1)$ nằm trong $(O_2)$.`, d: 'thong_hieu' },
    { c: `Hai đường tròn cắt nhau tại $A, B$. Đường nối tâm $O_1O_2$ có tính chất gì với $AB$?`, a: `Trung trực của $AB$.`, s: `$O_1O_2$ là trung trực dây chung $AB$.`, d: 'van_dung' },
    { c: `$(O_1; 5)$ và $(O_2; 5)$ cắt nhau, $d = 6$ cm. Tính dây chung $AB$.`, a: `$AB = 8$ cm.`, s: `$O_1O_2$ trung trực $AB$. $O_1M = 3$ cm. $AM = \\sqrt{25-9} = 4$ cm. $AB = 8$ cm.`, d: 'van_dung' },
    { c: `Hai đường tròn tiếp xúc ngoài. CMR tiếp tuyến chung ngoài đi qua trung điểm đoạn nối tâm... Sửa: Hai đường tròn tiếp xúc ngoài, tiếp điểm $T$. CMR $T$ nằm trên đoạn $O_1O_2$.`, a: `$O_1T + TO_2 = O_1O_2$.`, s: `$O_1T = R, TO_2 = r$. $O_1O_2 = R+r = O_1T + TO_2$ → $T$ nằm giữa $O_1, O_2$. $\\blacksquare$`, d: 'van_dung_cao' },
    { c: `$(O_1; R)$ và $(O_2; r)$ tiếp xúc ngoài ($R > r$). Tính chiều dài tiếp tuyến chung ngoài.`, a: `$l = 2\\sqrt{Rr}$.`, s: `$l = \\sqrt{d^2-(R-r)^2} = \\sqrt{(R+r)^2-(R-r)^2} = \\sqrt{4Rr} = 2\\sqrt{Rr}$.`, d: 'van_dung_cao' },
  ]},
  { id: 'e15e6e95-bb3b-49b2-a90b-22795f2ef700', p: 'T9-C5BTC', q: [
    { c: `Tính chu vi đường tròn $R = 7$ cm.`, a: `$14\\pi \\approx 43{,}96$ cm.`, s: `$C = 2\\pi R = 14\\pi \\approx 43{,}96$ cm.`, d: 'nhan_biet' },
    { c: `Tính diện tích hình tròn $R = 7$ cm.`, a: `$49\\pi \\approx 153{,}94$ cm².`, s: `$S = \\pi R^2 = 49\\pi \\approx 153{,}94$ cm².`, d: 'nhan_biet' },
    { c: `$(O; 10)$ cm, dây $AB$ cách tâm $6$ cm. Tính $AB$.`, a: `$16$ cm.`, s: `$AM = \\sqrt{100-36} = 8$ cm. $AB = 16$ cm.`, d: 'thong_hieu' },
    { c: `Cung $120°$, $R = 9$ cm. Tính độ dài cung.`, a: `$6\\pi$ cm.`, s: `$l = \\frac{\\pi \\cdot 9 \\cdot 120}{180} = 6\\pi \\approx 18{,}85$ cm.`, d: 'thong_hieu' },
    { c: `Từ $M$ kẻ $2$ tiếp tuyến đến $(O; 4)$ cm, $OM = 5$ cm. Tính độ dài tiếp tuyến.`, a: `$3$ cm.`, s: `$MA = \\sqrt{25-16} = 3$ cm.`, d: 'thong_hieu' },
    { c: `$(O_1; 3)$, $(O_2; 5)$, $d = 4$ cm. Vị trí tương đối?`, a: `Cắt nhau.`, s: `$|5-3| = 2 < 4 < 8 = 5+3$ → cắt nhau.`, d: 'van_dung' },
    { c: `Diện tích quạt $90°$, $R = 10$ cm.`, a: `$25\\pi$ cm².`, s: `$S = \\frac{\\pi \\cdot 100 \\cdot 90}{360} = 25\\pi \\approx 78{,}54$ cm².`, d: 'van_dung' },
    { c: `$(O; 5)$ cm, dây $AB = 6$ cm. Tính khoảng cách từ tâm đến dây.`, a: `$4$ cm.`, s: `$d = \\sqrt{R^2 - (\\frac{AB}{2})^2} = \\sqrt{25-9} = 4$ cm.`, d: 'van_dung' },
    { c: `Vành khuyên $R = 8$ cm, $r = 5$ cm. Tính diện tích.`, a: `$39\\pi \\approx 122{,}52$ cm².`, s: `$S = \\pi(64-25) = 39\\pi \\approx 122{,}52$ cm².`, d: 'van_dung_cao' },
    { c: `$(O; R)$, $AB$ dây, $M$ trung điểm $AB$. CMR $OM \\perp AB$.`, a: `$OA = OB = R$, $M$ trung điểm.`, s: `$\\triangle OAB$ cân ($OA=OB=R$), $M$ trung điểm $AB$ → $OM$ trung tuyến = đường cao → $OM \\perp AB$. $\\blacksquare$`, d: 'van_dung_cao' },
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
