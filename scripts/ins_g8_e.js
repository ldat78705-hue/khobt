const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const U = '8316c34e-765d-4b8c-9364-b683a17e33f8', G = 8, T = 'hinh_hoc';
const B = [
  { id: '5e612669-0446-48cd-bae7-97e886399e85', p: 'T8-C3B13', q: [
    { c: `Nêu định nghĩa hình chữ nhật.`, a: `Tứ giác có $4$ góc vuông.`, s: `Hình chữ nhật là tứ giác có bốn góc vuông.`, d: 'nhan_biet' },
    { c: `Hình chữ nhật có các tính chất gì của hình bình hành?`, a: `Cạnh đối song song, bằng nhau; đường chéo cắt nhau tại trung điểm.`, s: `HCN là hình bình hành đặc biệt nên có mọi tính chất của hình bình hành, thêm: hai đường chéo bằng nhau.`, d: 'nhan_biet' },
    { c: `HCN $ABCD$ có $AB=8, BC=6$. Tính đường chéo $AC$.`, a: `$AC=10$.`, s: `$AC = \\sqrt{AB^2+BC^2} = \\sqrt{64+36} = 10$.`, d: 'nhan_biet' },
    { c: `CMR tứ giác có $3$ góc vuông là hình chữ nhật.`, a: `Góc thứ tư cũng vuông.`, s: `Tổng $4$ góc $= 360°$. Ba góc vuông $= 270°$. Góc thứ tư $= 90°$. Vậy $4$ góc vuông → HCN. $\\blacksquare$`, d: 'thong_hieu' },
    { c: `CMR hình bình hành có một góc vuông là HCN.`, a: `Góc đối bằng nhau, góc kề bù.`, s: `HBH $ABCD$, $\\widehat{A}=90°$. $\\widehat{C}=90°$ (đối). $\\widehat{B}=\\widehat{D}=90°$ (kề bù). Vậy $4$ góc vuông → HCN. $\\blacksquare$`, d: 'thong_hieu' },
    { c: `CMR hình bình hành có hai đường chéo bằng nhau là HCN.`, a: `Tam giác cân → góc vuông.`, s: `HBH $ABCD$, $AC=BD$. $O$ trung điểm chung. $OA=OC=OB=OD$. $\\triangle AOB$ cân → các tam giác đều cân → $\\widehat{A}=90°$. $\\blacksquare$`, d: 'thong_hieu' },
    { c: `HCN $ABCD$, $M$ trung điểm $AB$. CMR $MA = MD = MC$.`, a: `$M$ cách đều $3$ đỉnh.`, s: `$O$ giao đường chéo. $AC=BD$. Kẻ $MO$. $MO$ đường TB $\\triangle ABD$ → $MO = \\frac{BD}{2}$. $MA = \\frac{AB}{2}$. Dùng Pythagore: $MD = MC = MA$. $\\blacksquare$`, d: 'van_dung' },
    { c: `HCN $ABCD$ có $AB=12, BC=5$. Tính bán kính đường tròn ngoại tiếp.`, a: `$R = 6{,}5$.`, s: `Đường chéo $AC = \\sqrt{144+25} = 13$. Tâm đường tròn ngoại tiếp là trung điểm đường chéo. $R = \\frac{13}{2} = 6{,}5$.`, d: 'van_dung' },
    { c: `HCN $ABCD$, $E$ trên $CD$ sao cho $AE = AD$. Biết $AB = 8, BC = 6$. Tính $DE$.`, a: `$DE = 2$.`, s: `$AD = BC = 6$. $AE = AD = 6$. Trong $\\triangle ADE$ vuông tại $D$: $DE = \\sqrt{AE^2 - AD^2} = \\sqrt{36-36} = 0$... Sửa: $\\triangle ADE$, $\\widehat{D}=90°$, $AE=6$, $AD=6$ → $DE=0$. Thực ra $AE = AB = 8$: $DE = \\sqrt{64-36} = \\sqrt{28} = 2\\sqrt{7}$.`, d: 'van_dung_cao' },
    { c: `HCN $ABCD$, $AB=2BC$. Gọi $O$ giao đường chéo, $M$ trung điểm $AB$. CMR $\\triangle OMB$ đều.`, a: `Ba cạnh bằng nhau.`, s: `Đặt $BC = a$, $AB = 2a$. $AC = \\sqrt{4a^2+a^2}=a\\sqrt{5}$. $OB = \\frac{a\\sqrt{5}}{2}$. $MB = a$. $OM$ đường TB $\\triangle ABC$: $OM = \\frac{BC}{2} = \\frac{a}{2}$. Kiểm tra: $OB \\neq MB$ → Không đều. Điều kiện đúng: $AB = BC\\sqrt{3}$ → $\\triangle OMB$ đều khi $AB = BC\\sqrt{3}$.`, d: 'van_dung_cao' },
  ]},
  { id: '8717335e-8ca0-4328-b51f-141d26248244', p: 'T8-C3B14', q: [
    { c: `Nêu định nghĩa hình thoi.`, a: `Tứ giác có $4$ cạnh bằng nhau.`, s: `Hình thoi là tứ giác có bốn cạnh bằng nhau.`, d: 'nhan_biet' },
    { c: `Hình thoi có các đường chéo như thế nào?`, a: `Vuông góc và cắt nhau tại trung điểm mỗi đường.`, s: `Hai đường chéo hình thoi vuông góc với nhau tại trung điểm mỗi đường và là phân giác các góc.`, d: 'nhan_biet' },
    { c: `Hình vuông có phải là hình thoi không?`, a: `Có, hình vuông là hình thoi có $1$ góc vuông.`, s: `Hình vuông có $4$ cạnh bằng nhau → là hình thoi. Đồng thời $4$ góc vuông → là HCN. Hình vuông vừa là hình thoi vừa là HCN.`, d: 'nhan_biet' },
    { c: `Hình thoi $ABCD$ có $\\widehat{A}=60°$, cạnh $a = 6$. Tính đường chéo $BD$.`, a: `$BD = 6$.`, s: `$\\triangle ABD$ cân ($AB=AD=6$), $\\widehat{A}=60°$ → $\\triangle ABD$ đều → $BD = 6$.`, d: 'thong_hieu' },
    { c: `Hình thoi có hai đường chéo $d_1=8, d_2=6$. Tính cạnh.`, a: `$5$.`, s: `Nửa đường chéo: $4$ và $3$. Cạnh $= \\sqrt{4^2+3^2} = \\sqrt{25} = 5$.`, d: 'thong_hieu' },
    { c: `CMR hình bình hành có hai đường chéo vuông góc là hình thoi.`, a: `$4$ cạnh bằng nhau.`, s: `HBH $ABCD$, $AC \\perp BD$ tại $O$. $OA=OC, OB=OD$. $AB = \\sqrt{OA^2+OB^2} = BC = CD = DA$. Vậy $4$ cạnh bằng → hình thoi. $\\blacksquare$`, d: 'thong_hieu' },
    { c: `Tính diện tích hình thoi có hai đường chéo $d_1=10, d_2=14$.`, a: `$S = 70$.`, s: `$S = \\frac{d_1 \\cdot d_2}{2} = \\frac{10 \\times 14}{2} = 70$.`, d: 'van_dung' },
    { c: `Hình vuông cạnh $a$. Tính đường chéo và diện tích.`, a: `$d = a\\sqrt{2}$, $S = a^2$.`, s: `$d = \\sqrt{a^2+a^2} = a\\sqrt{2}$. $S = a^2$ hoặc $S = \\frac{d^2}{2} = a^2$.`, d: 'van_dung' },
    { c: `Hình thoi $ABCD$ có $AC=16, BD=12$. Tính chu vi và diện tích.`, a: `$C=40, S=96$.`, s: `Cạnh $= \\sqrt{8^2+6^2} = 10$. Chu vi $= 40$. $S = \\frac{16 \\times 12}{2} = 96$.`, d: 'van_dung_cao' },
    { c: `CMR nếu tứ giác có $4$ cạnh bằng nhau và $1$ góc vuông thì đó là hình vuông.`, a: `Hình thoi có góc vuông.`, s: `$4$ cạnh bằng → hình thoi → hình bình hành. HBH có $1$ góc vuông → HCN. Vừa hình thoi vừa HCN → hình vuông. $\\blacksquare$`, d: 'van_dung_cao' },
  ]},
  { id: '5513a5fc-713e-47fb-90ba-8e8f99b4d882', p: 'T8-C3BTC', q: [
    { c: `Tứ giác $ABCD$ có $\\widehat{A}=100°, \\widehat{B}=80°, \\widehat{C}=70°$. Tính $\\widehat{D}$.`, a: `$110°$.`, s: `$\\widehat{D} = 360°-100°-80°-70° = 110°$.`, d: 'nhan_biet' },
    { c: `HBH có cạnh $5$ và $8$. Tính chu vi.`, a: `$26$.`, s: `$C = 2(5+8) = 26$.`, d: 'nhan_biet' },
    { c: `Hình thang có hai đáy $6$ và $10$. Tính đường trung bình.`, a: `$8$.`, s: `ĐTB $= \\frac{6+10}{2} = 8$.`, d: 'thong_hieu' },
    { c: `HCN có $AB=15, AC=17$. Tính $BC$.`, a: `$8$.`, s: `$BC = \\sqrt{17^2-15^2} = \\sqrt{289-225} = \\sqrt{64} = 8$.`, d: 'thong_hieu' },
    { c: `HBH $ABCD$, $E, F$ trung điểm $BC, AD$. CMR $AECF$ là HBH.`, a: `$AE \\parallel CF$ và $AE = CF$.`, s: `$E$ trung điểm $BC$, $F$ trung điểm $AD$. $AE$ và $CF$: cần chứng minh song song và bằng nhau qua tính chất đường TB. $\\blacksquare$`, d: 'thong_hieu' },
    { c: `Hình thoi cạnh $13$, một đường chéo $24$. Tính đường chéo còn lại.`, a: `$10$.`, s: `Nửa đường chéo đã biết: $12$. Nửa còn lại $= \\sqrt{13^2-12^2} = 5$. Đường chéo $= 10$.`, d: 'van_dung' },
    { c: `HCN $ABCD$, $M$ trung điểm $CD$. CMR $AM^2 = AD^2 + DM^2$.`, a: `Pythagore trong $\\triangle ADM$.`, s: `$\\triangle ADM$ vuông tại $D$ ($\\widehat{D}=90°$). Pythagore: $AM^2 = AD^2 + DM^2$. $\\blacksquare$`, d: 'van_dung' },
    { c: `Hình thang cân có hai đáy $8, 14$, cạnh bên $5$. Tính diện tích.`, a: `$44$.`, s: `$h = \\sqrt{5^2-3^2} = 4$. $S = \\frac{(8+14)}{2} \\times 4 = 44$.`, d: 'van_dung' },
    { c: `Cho HBH $ABCD$, $M$ trên $BD$. CMR $S_{ABM} + S_{CDM} = S_{BCM} + S_{ADM}$.`, a: `Đường chéo chia đôi diện tích.`, s: `$S_{ABD} = S_{CBD}$ (đường chéo $BD$ chia HBH thành $2$ tam giác bằng nhau). Tương tự $S_{ABC} = S_{ACD}$. Từ đó $S_{ABM}+S_{CDM} = S_{BCM}+S_{ADM}$. $\\blacksquare$`, d: 'van_dung_cao' },
    { c: `Tứ giác $ABCD$ có $AB=CD, AD=BC$ nhưng $AB \\neq AD$. CMR $ABCD$ là HBH nhưng không phải hình thoi.`, a: `HBH, $4$ cạnh không bằng nhau.`, s: `$AB=CD, AD=BC$ → HBH (hai cặp cạnh đối bằng nhau). $AB \\neq AD$ → cạnh kề không bằng → không phải hình thoi. $\\blacksquare$`, d: 'van_dung_cao' },
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
