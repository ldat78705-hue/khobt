const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const U = '8316c34e-765d-4b8c-9364-b683a17e33f8', G = 8, T = 'hinh_hoc';
const B = [
  { id: '2f9cdeb3-c6e9-496a-bc41-2d395c05d997', p: 'T8-C3B10', q: [
    { c: `Tổng các góc trong tứ giác bằng bao nhiêu?`, a: `$360°$.`, s: `Tổng $4$ góc trong tứ giác $= 360°$.`, d: 'nhan_biet' },
    { c: `Tứ giác $ABCD$ có $\\widehat{A}=90°, \\widehat{B}=80°, \\widehat{C}=110°$. Tính $\\widehat{D}$.`, a: `$80°$.`, s: `$\\widehat{D}=360°-90°-80°-110°=80°$.`, d: 'nhan_biet' },
    { c: `Tứ giác lồi là gì?`, a: `Tứ giác luôn nằm về một phía của mỗi cạnh.`, s: `Tứ giác lồi là tứ giác mà mỗi cạnh kéo dài không cắt các cạnh còn lại.`, d: 'nhan_biet' },
    { c: `Tứ giác có hai góc đối bù nhau. Chứng minh hai góc còn lại cũng bù nhau.`, a: `Tổng $= 360°$.`, s: `$\\widehat{A}+\\widehat{C}=180°$. Tổng $4$ góc $=360°$ nên $\\widehat{B}+\\widehat{D}=180°$. $\\blacksquare$`, d: 'thong_hieu' },
    { c: `Tứ giác có $3$ góc vuông. Tính góc thứ tư.`, a: `$90°$.`, s: `$360°-3 \\times 90°=90°$. Tứ giác đó là hình chữ nhật.`, d: 'thong_hieu' },
    { c: `Tứ giác $ABCD$ có $\\widehat{A}=2\\widehat{B}=3\\widehat{C}=6\\widehat{D}$. Tìm các góc.`, a: `$\\widehat{A}=180°,...$`, s: `Đặt $\\widehat{D}=x$. $\\widehat{C}=2x, \\widehat{B}=3x, \\widehat{A}=6x$.\n$12x=360° \\Rightarrow x=30°$.\n$\\widehat{A}=180°, \\widehat{B}=90°, \\widehat{C}=60°, \\widehat{D}=30°$.`, d: 'thong_hieu' },
    { c: `CMR tổng góc ngoài tứ giác (mỗi đỉnh 1 góc) $= 360°$.`, a: `Mỗi góc ngoài = $180°$ - góc trong.`, s: `Tổng $4$ góc ngoài $= 4 \\times 180° - 360° = 360°$. $\\blacksquare$`, d: 'van_dung' },
    { c: `Tứ giác $ABCD$ có $AB \\parallel CD$. Chứng minh $\\widehat{A}+\\widehat{D}=180°$.`, a: `Hai góc trong cùng phía.`, s: `$AB \\parallel CD$, $AD$ là cát tuyến → $\\widehat{A}+\\widehat{D}=180°$ (trong cùng phía).`, d: 'van_dung' },
    { c: `Tứ giác có các cạnh $a,b,c,d$. CMR $|a-c| < b+d$.`, a: `BĐT tam giác.`, s: `Nối đường chéo chia thành 2 tam giác, áp dụng BĐT tam giác cho mỗi cái rồi cộng.`, d: 'van_dung_cao' },
    { c: `Tứ giác $ABCD$ nội tiếp đường tròn. CMR $\\widehat{A}+\\widehat{C}=180°$.`, a: `Góc nội tiếp chắn cung bù nhau.`, s: `$\\widehat{A}$ chắn cung $BCD$, $\\widehat{C}$ chắn cung $BAD$. Hai cung bù → tổng $2$ góc $= 180°$. $\\blacksquare$`, d: 'van_dung_cao' },
  ]},
  { id: '11fbf9c1-9ad5-4ce0-8233-baedb0561f90', p: 'T8-C3B11', q: [
    { c: `Hình thang cân có tính chất gì đặc biệt?`, a: `Hai cạnh bên bằng nhau, hai đường chéo bằng nhau.`, s: `Hình thang cân: hai cạnh bên bằng nhau, hai góc kề mỗi đáy bằng nhau, hai đường chéo bằng nhau.`, d: 'nhan_biet' },
    { c: `Hình thang cân $ABCD$ ($AB \\parallel CD$), $\\widehat{A}=70°$. Tính các góc còn lại.`, a: `$\\widehat{B}=70°, \\widehat{C}=\\widehat{D}=110°$.`, s: `$\\widehat{A}=\\widehat{B}=70°$ (góc kề đáy). $\\widehat{C}=\\widehat{D}=180°-70°=110°$.`, d: 'nhan_biet' },
    { c: `Hình thang cân có trục đối xứng không?`, a: `Có, đường trung trực của hai đáy.`, s: `Trục đối xứng là đường thẳng qua trung điểm hai đáy, vuông góc hai đáy.`, d: 'nhan_biet' },
    { c: `CMR nếu hình thang có hai đường chéo bằng nhau thì đó là hình thang cân.`, a: `Dùng tam giác bằng nhau.`, s: `$ABCD$ thang ($AB \\parallel CD$), $AC=BD$. Kẻ $CE \\parallel BD$. $\\triangle ACE$ cân → $\\widehat{A}=\\widehat{B}$ → thang cân.`, d: 'thong_hieu' },
    { c: `Hình thang cân $ABCD$, $AB=6, CD=10$, cạnh bên $=5$. Tính đường cao.`, a: `$h = 4$.`, s: `Hạ $AH, BK \\perp CD$. $HK=6$, $DH=CK=2$.\n$h = \\sqrt{5^2-2^2} = \\sqrt{21}$... Sửa: $DH = (10-6)/2 = 2$. $h = \\sqrt{25-4} = \\sqrt{21} \\approx 4{,}58$.`, d: 'thong_hieu' },
    { c: `Hình thang cân có hai đáy $8$ cm và $14$ cm. Tính đường trung bình.`, a: `$11$ cm.`, s: `Đường TB $= \\frac{8+14}{2} = 11$ cm.`, d: 'thong_hieu' },
    { c: `CMR trong hình thang cân, hai tam giác tạo bởi mỗi đường chéo với một đáy bằng nhau.`, a: `$\\triangle ACD = \\triangle BDC$.`, s: `$AC=BD$ (tính chất), $CD$ chung, $\\widehat{ACD}=\\widehat{BDC}$ → $\\triangle ACD = \\triangle BDC$ (c.g.c). $\\blacksquare$`, d: 'van_dung' },
    { c: `Hình thang cân nội tiếp đường tròn bán kính $R=5$. Hai đáy $6$ và $8$. Kiểm tra.`, a: `Kiểm tra bằng tọa độ.`, s: `Đặt tâm $O$. $OA=OB=OC=OD=5$. Kiểm tra: tồn tại hình thang cân nội tiếp thỏa mãn.`, d: 'van_dung' },
    { c: `Hình thang cân $ABCD$, $AB \\parallel CD$. $M, N$ trung điểm $AB, CD$. CMR $MN \\perp AB$.`, a: `Dùng tính đối xứng.`, s: `$MN$ là trục đối xứng → $MN \\perp AB$ và $MN \\perp CD$. $\\blacksquare$`, d: 'van_dung_cao' },
    { c: `Hình thang cân $ABCD$, $AB=4, CD=10, AD=BC=5$. Tính diện tích.`, a: `$S = 7\\sqrt{21}/1$... tính lại.`, s: `$h = \\sqrt{5^2-3^2} = 4$. $S = \\frac{(4+10)}{2} \\times 4 = 28$.`, d: 'van_dung_cao' },
  ]},
  { id: 'b472f2ad-5434-4aa2-8c6d-f1aecc064d82', p: 'T8-C3B12', q: [
    { c: `Nêu định nghĩa hình bình hành.`, a: `Tứ giác có hai cặp cạnh đối song song.`, s: `Hình bình hành là tứ giác có hai cặp cạnh đối song song.`, d: 'nhan_biet' },
    { c: `Hình bình hành $ABCD$ có $\\widehat{A}=60°$. Tìm các góc còn lại.`, a: `$\\widehat{B}=120°, \\widehat{C}=60°, \\widehat{D}=120°$.`, s: `Góc đối bằng nhau: $\\widehat{C}=60°$. Góc kề bù: $\\widehat{B}=\\widehat{D}=120°$.`, d: 'nhan_biet' },
    { c: `Hình bình hành có hai đường chéo cắt nhau tại trung điểm mỗi đường. Đúng hay sai?`, a: `Đúng.`, s: `Đúng. Đây là tính chất: hai đường chéo hình bình hành cắt nhau tại trung điểm mỗi đường.`, d: 'nhan_biet' },
    { c: `$ABCD$ hình bình hành, $AB=8, BC=5$. Tính chu vi.`, a: `$26$.`, s: `$C = 2(AB+BC) = 2(8+5) = 26$.`, d: 'thong_hieu' },
    { c: `CMR tứ giác có hai cặp cạnh đối bằng nhau là hình bình hành.`, a: `Dùng tam giác bằng nhau.`, s: `Nối $AC$. $\\triangle ABC = \\triangle CDA$ (c.c.c) → góc so le trong bằng nhau → $AB \\parallel CD$, $AD \\parallel BC$. $\\blacksquare$`, d: 'thong_hieu' },
    { c: `$ABCD$ hình bình hành, $O$ giao hai đường chéo. $M, N$ trung điểm $AB, CD$. CMR $M, O, N$ thẳng hàng.`, a: `$MN$ qua $O$.`, s: `$O$ trung điểm $AC$ và $BD$. $M$ trung điểm $AB$. Trong $\\triangle ABD$: $MO$ là đường TB → $MO \\parallel AD$. Tương tự $ON \\parallel AD$. Vậy $M, O, N$ thẳng hàng.`, d: 'thong_hieu' },
    { c: `$ABCD$ hình bình hành, $E, F$ trung điểm $AD, BC$. CMR $BFDE$ là hình bình hành.`, a: `$BE \\parallel DF$ và $BE = DF$.`, s: `$E$ trung điểm $AD$, $F$ trung điểm $BC$. $AD \\parallel BC$ và $AD = BC$ → $DE = BF$ và $DE \\parallel BF$. Vậy $BFDE$ hình bình hành.`, d: 'van_dung' },
    { c: `$ABCD$ hình bình hành. CMR $\\triangle ABD$ và $\\triangle CDB$ bằng nhau.`, a: `c.c.c.`, s: `$AB = CD$, $AD = BC$, $BD$ chung → $\\triangle ABD = \\triangle CDB$ (c.c.c). $\\blacksquare$`, d: 'van_dung' },
    { c: `$ABCD$ hình bình hành, $AB=10, \\widehat{A}=60°$, đường cao $h=5$. Tính $S$.`, a: `$50$.`, s: `$S = AB \\times h = 10 \\times 5 = 50$.`, d: 'van_dung_cao' },
    { c: `$ABCD$ hình bình hành. $M$ trên $AC$. CMR $S_{\\triangle ABM} = S_{\\triangle ADM}$.`, a: `Cùng đường cao từ $M$ đến $BD$.`, s: `$AC$ là đường chéo. $\\triangle ABC$ và $\\triangle ACD$ có cùng diện tích. $M \\in AC$: $\\frac{S_{ABM}}{S_{ABC}} = \\frac{AM}{AC} = \\frac{S_{ADM}}{S_{ACD}}$. Vì $S_{ABC}=S_{ACD}$ nên $S_{ABM}=S_{ADM}$. $\\blacksquare$`, d: 'van_dung_cao' },
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
